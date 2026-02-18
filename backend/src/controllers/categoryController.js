const {Category, Product, ProductImage} = require("../models");

// GET /api/categories pour recuperer toutes les categories

exports.getAllCategories = async(req, res, next)=>{
    try{
        const categories = await Category.findAll({
            order: [["createdAt", "DESC"]]
        });
        res.status(200).json(categories);
    } catch(err){
        res.status(500).json({error: err.message})
    }
};

// GET api/categories/:slug/products retourner les produit d'une categorie

exports.getProductsByCategory = async(req, res, next) => {
    try{
        const {slug} = req.params;
        const category = await Category.findOne({
            where: {slug},
            include:{
                model: Product,
                include: [ProductImage]
            }
        });
        if(!category){
            return res.status(404).json({message: "Categorie non trouvee"});

        }
        res.status(200).json(category.Products)
    }catch(error){
        next(error);
    }
}
const {Category, Product, Image} = require("../models");

// GET /api/categories pour recuperer toutes les categories

exports.getAllCategories = async(req, res, next)=>{
    try{
        const categories = await Category.findAll({
            order: [["createdAt", "DESC"]]
        });
        res.status(200).json(categories);
    } catch(err){
        next(err);
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
                include: [Image]
            }
        });
        if(!category){
            return res.status(404).json({message: "Categorie non trouvee"});

        }
        res.status(200).json(category.Products)
    }catch(error){
        next(error);
    }
};




exports.create = async (req, res, next) => {
    try {

        const category = await Category.create(req.body);
        res.status(201).json(category);
    } catch (err) {
        next(err);
    }
};

exports.remove = async (req, res, next) => {
    try {
        const { id } = req.params;
        const deleted = await Category.destroy({
            where: { id: id }
        });

        if (deleted === 0) {
            return res.status(404).json({ message: "Catégorie non trouvée" });
        }

        res.json({ message: "Catégorie supprimée avec succès" });
    } catch (err) {
        next(err);
    }
};

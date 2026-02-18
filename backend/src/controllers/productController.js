const {Product, Category, ProductImage} = require("../models");

// GET /api/products retourner tous les produits

exports.getAllProduct = async(req, res, next) =>{
    try{
        const products = await Product.findAll({
            include:[Category , ProductImage],
            order: [["createdAt" , "DESC"]]
        });
        res.status(200).json(products);
    }catch(error){
        next(error);
    }
};

// GET /api/products/:slug retourne les details d un produit

exports.getProductBySlug = async(req, res, next) =>{
    try{
        const {slug} = req.params;
        const product = await Product.findOne({
            where:{slug},
            include: [Category , ProductImage]
        });

        if(!product){
            return res.status(404).json({message: "Produit non trouve"});

        }
        res.status(200).json(product);
    }catch(error){
        next(error)
    }
}
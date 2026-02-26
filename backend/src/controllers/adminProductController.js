const Product = require("../models/Product");
const image = require("../models/Image");
const cloudinary = require("../config/cloudinary");

exports.create = async (req, res, next) => {
    try {
        
        const product = await Product.create(req.body);

       
        if (req.files && req.files.length > 0) {
            const imagesData = req.files.map(file => ({
                url: file.path,           
                public_id: file.filename, 
                product_id: product.id    
            }));
            
            await image.bulkCreate(imagesData);
        }
        res.status(201).json({
            message: "Produit créé avec succès",
            product
        });
    } catch (err) {

        next(err);
    }
};

exports.update = async (req, res, next) => {
    try {
        const productId = req.params.id;

        const product = await Product.findByPk(productId);
        
        if (!product) {
            return res.status(404).json({ message: "Produit non trouvé. Impossible de le modifier." });
        }

        await product.update(req.body);

        if (req.files && req.files.length > 0) {
            const imagesData = req.files.map(file => ({
                url: file.path,
                public_id: file.filename,
                product_id: productId 
            }));
            
            await image.bulkCreate(imagesData);
        }

        res.json({ message: "Produit mis à jour avec succès" });
    } catch (err) {
        next(err);
    }
};


exports.remove = async (req, res, next) => {
    try {
      
        const images = await image.findAll({
            where: { product_id: req.params.id } 
        });

        for (let img of images) {
            if (img.public_id) {
                await cloudinary.uploader.destroy(img.public_id);
            }
        }


        const deleted = await Product.destroy({ 
            where: { id: req.params.id } 
        });

        if (deleted === 0) {
            return res.status(404).json({ message: "Produit non trouvé" });
        }

        res.json({ message: "Produit et images associés supprimés" });
    } catch (err) {
        next(err);
    }
};

exports.deleteImage = async (req, res, next) => {
    try {
        const { imageId } = req.params;
        const img = await image.findByPk(imageId); 
        if (!img) {
            return res.status(404).json({ message: "Image non trouvée" });
        }
        if (img.public_id) {
            await cloudinary.uploader.destroy(img.public_id);
        }
        await img.destroy();

        res.json({ message: "Image supprimée avec succès" });
    } catch (err) {
        next(err);
    }
};
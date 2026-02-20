const {Product, Image} = require("../models");
const cloudinary = require("../config/cloudinary");

exports.create = async (req, res, next) =>{
    try{
        const product = await Product.create(req.body);
        if(req.files){
            const images = req.files.map(file =>({
                url: file.path,
                public_id: file.filename,
                product_id: product.id
            }));
            await Image.bulkCreate(images);
        }
        res.status(201).json(product);
    } catch(err){
        next(err);
    }
};

exports.remove = async (req, res, next) => {
  try {
    const images = await Image.findAll({
      where: { productId: req.params.id }
    });

    for (let img of images) {
      await cloudinary.uploader.destroy(img.public_id);
    }

    await Product.destroy({ where: { id: req.params.id } });

    res.json({ message: "Produit supprimé" });
  } catch (err) {
    next(err);
  }
};
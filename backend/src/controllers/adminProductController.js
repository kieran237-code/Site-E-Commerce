const {Product} = require("../models");

exports.create = async (req, res, next)=>{
    try{
        const product = await Product.create(req.body);
        res.status(201).json(product);
    } catch(err){
        next(err);
    }
};

exports.update = async (req, res, next) =>{
    try{
        await Product.update(req.body, {
            where: {id: req.params.id}
        });
        res.json({message:"Produit modifie"});
    }catch(err){
        next(err);
    }
};

exports.remove = async (req, res, next) =>{
    try{
        await Product.destroy({
            where: {id: req.params.id}
        });
        res.json({message:"Produit Supprime"})
    }catch(err){
        next(err);
    }
};
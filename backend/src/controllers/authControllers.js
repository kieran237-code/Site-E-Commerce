const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {Admin} = require("../models");
const { where } = require("sequelize");

exports.login = async (req, res, next) =>{
    try{
        const {email , password} = req.body;
        const admin = await Admin.findOne(
            {
                where:{email}
            }
        );
        if(!admin){
            return res.status(401).json({mesage: "Acces refuse votre Email"});
        }
        const isMatch = await bcrypt.compare(password, admin.password);
        if(!isMatch){
            return res.status(401).json({message: "Acces refuse verifier votre mot de passe"})
        }
        const token = jwt.sign(
            {
                id: admin.id
            },
            process.env.JWT_SECRET,
            {
                expiresIn : "1d"
            }
        );
        res.json({token});
    } catch(err){
        next(err);
    }
}
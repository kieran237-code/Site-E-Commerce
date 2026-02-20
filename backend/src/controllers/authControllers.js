const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin");
exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const admin = await Admin.findOne({
            where: { email }
        });

        if (!admin) {
            return res.status(401).json({ message: "Accès refusé : vérifiez vos identifiants" });
        }

        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Accès refusé : vérifiez vos identifiants" });
        }

        const token = jwt.sign(
            {
                email: admin.email, 
                role: 'admin'       
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1d"
            }
        );

        res.json({ token });

    } catch (err) {
        console.error("Erreur lors du login :", err);
        next(err);
    }
};
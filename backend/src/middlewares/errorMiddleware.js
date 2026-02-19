module.exports= (err, req, res , next) =>{
    console.error("ERROR:", err);
    // erreur sequelize (validation, contraintes)
    if(err.name === "SequelizevalidationError"){
        res.status(400).json({
            status:"error",
            message:"Erreur d validation",
            errors: err.errors.map(e => e.message)
        });
    }
    //Erreur Sequelize unique (slug, etc.)
    if(err.name === "SequelizeUniqueContrainteError"){
        return res.status(400).json({
            status:"error",
            message:"Valeur deja existante",
            errors: err.errors.map(e => e.message)
        });
    }
    // Erreur personnalisee
    if(err.statusCode){
        return res.status(err.statusCode).json({
            status : "error",
            message: err.message
        });

    }
    // Erreur serveur inconnue
    return res.status(500).json({
        status:"error",
        message:"Erreur interne du serveur"
    });
};
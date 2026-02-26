module.exports = (err, req, res, next) => {
  
    if (process.env.NODE_ENV !== 'test') {
        console.error("ERROR:", err);
    }

    if (err.name === "SequelizeValidationError") {
        return res.status(400).json({
            status: "error",
            message: "Erreur de validation",
            errors: err.errors.map(e => e.message)
        });
    }

    
    if (err.name === "SequelizeUniqueConstraintError") {
        return res.status(400).json({
            status: "error",
            message: "Valeur déjà existante",
            errors: err.errors.map(e => e.message)
        });
    }

    
    if (err.statusCode) {
        return res.status(err.statusCode).json({
            status: "error",
            message: err.message
        });
    }

    return res.status(500).json({
        status: "error",
        message: "Erreur interne du serveur"
    });
};
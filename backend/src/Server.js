const app = require("./app");
const sequelize = require("./config/database");
require("dotenv").config();
require("./models")
require("./models/Admin");
require("./models/Image");

(async () => {
    try{
        await sequelize.authenticate();
        console.log("Connexion a la base de donne MYSQL reussie");
        await sequelize.sync({ force: false }) 
            .then(() => console.log("Base de données réinitialisée"))
            .catch(err => console.log(err));
        console.log("Base de donnees Synchronisee");

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Serveur démarré sur le port ${PORT}`);
});

    }catch(error){
        console.error("Erreur de Connexion a la base de donnee:", error);
    }

})();

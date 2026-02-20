const app = require("./app");
const sequelize = require("./config/database");
require("dotenv").config();
require("./models")
require("./models/Admin");
const PORT = process.env.PORT|| 5000;
(async () => {
    try{
        await sequelize.authenticate();
        console.log("Connexion a la base de donne MYSQL reussie");
        await sequelize.sync({ force: false }) 
            .then(() => console.log("Base de données réinitialisée"))
            .catch(err => console.log(err));
        console.log("Base de donnees Synchronisee");

        app.listen(PORT,() =>{
            console.log(`Serveur lance sur http://localhost:${PORT}`);
        })

    }catch(error){
        console.error("Erreur de Connexion a la base de donnee:", error);
    }

})();
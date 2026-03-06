const { Sequelize } = require("sequelize");
require("dotenv").config();

const config = {
    username: process.env.MYSQLUSER,
    password: process.env.MYSQLPASSWORD,  
    database: process.env.MYSQLDATABASE, 
    host: process.env.MYSQLHOST,          
    port: process.env.MYSQLPORT,         
    dialect: "mysql",
    logging: false
};

const sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
);

sequelize.development = config;
sequelize.production = config;
sequelize.test = config;

module.exports = sequelize;

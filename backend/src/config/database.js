const { Sequelize } = require("sequelize");
require("dotenv").config();

const config = {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT || "mysql",
    logging: false
};

const sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
);
module.exports = sequelize;

module.exports.development = config;
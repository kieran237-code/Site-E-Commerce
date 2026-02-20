const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

    const Image = sequelize.define("Image", {
        url:{
            type: DataTypes.STRING,
            allowNull: false
        },
        public_id:{
            type: DataTypes.STRING,
            allowNull: false
        }
    });

    Image.associate = models =>{
        Image.belongsTo(models.Product, {
            foreignKey: "product_id",
            onDelete : "CASCADE"
        })
    };


    module.exports = Image ;
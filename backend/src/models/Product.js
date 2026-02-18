const {DataTypes} = require("sequelize");
const sequelize = require("../config/database");

const Product = sequelize.define ("Product", {
    name:{
        type: DataTypes.STRING,
        allowNull: false
    },
    slug:{
        type:DataTypes.STRING,
        allowNull:false,
        unique: true
    },
    description:{
        type: DataTypes.TEXT
    },
    price:{
        type:DataTypes.INTEGER,
        allowNull: false
    },
    color:{
        type:DataTypes.STRING,
        allowNull:false
    },
    stock: {
        type: DataTypes.STRING,
        defaultValue: 0
    },
    is_new:{
        type:DataTypes.BOOLEAN,
        defaultValue: false
    },
    is_promo:{
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
});

module.exports = Product;

const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const slugify = require("../utils/slugify")

const Category = sequelize.define("Category", {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    slug: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true 
    }
}, {
    hooks: {
        beforeValidate: (category) => {
            if (category.name) {
                category.slug = slugify(category.name, { lower: true, strict: true });
            }
        }
    }
});

module.exports = Category;
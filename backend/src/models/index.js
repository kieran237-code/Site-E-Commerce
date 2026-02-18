const Category = require("./Category");
const Product = require("./Product");
const ProductImage = require("./ProductImage");

Category.hasMany(Product, {foreignKey:"category_id"});
Product.belongsTo(Category,{foreignKey:"category_id"});
Product.hasMany(ProductImage, {foreignKey:"product_id"});
ProductImage.belongsTo(Product,{foreignKey:"product_id"});

module.exports={
    Category,
    Product,
    ProductImage
};
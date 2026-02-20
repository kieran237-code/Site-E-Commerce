const Category = require("./Category");
const Product = require("./Product");
const ProductImage = require("./ProductImage");
const Image = require("./Image")
Category.hasMany(Product, {foreignKey:"category_id"});
Product.belongsTo(Category,{foreignKey:"category_id"});
Product.hasMany(ProductImage, {foreignKey:"product_id"});
Product.hasMany(Image, {foreignKey:"product_id"});
ProductImage.belongsTo(Product,{foreignKey:"product_id"});

module.exports={
    Category,
    Product,
    Image,
    ProductImage
};
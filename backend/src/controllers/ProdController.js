const { Product, Image, Category } = require("../models");
const { Op } = require("sequelize");

exports.search = async (req, res, next) => {
  try {
    const { q, color, minPrice, maxPrice } = req.query;

    const where = {};
    if (q) {
      where.name = { [Op.like]: `%${q}%` };
    }
    if (color) {
      where.color = color;
    }
    if (minPrice || maxPrice) {
      where.price = {};
      if (minPrice) where.price[Op.gte] = minPrice;
      if (maxPrice) where.price[Op.lte] = maxPrice;
    }

    const products = await Product.findAll({
      where,
      include: [
        {
          model: Image,
          attributes: ["url"]
        },
        {
          model: Category,
          attributes: ["name", "slug"]
        }
      ],
      order: [["createdAt", "DESC"]]
    });

    res.json(products);
  } catch (err) {
    next(err);
  }
};
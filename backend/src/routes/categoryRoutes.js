const express = require("express");
const router = express.Router();
const categoryController =require("../controllers/categoryController");

router.get("/", categoryController.getAllCategories);
router.get("/:slug/products", categoryController.getProductsByCategory);

module.exports = router;
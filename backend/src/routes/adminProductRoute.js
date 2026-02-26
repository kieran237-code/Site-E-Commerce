const express = require("express");
const router = express.Router();
const auth = require("../middlewares/authMiddleware");
const controller = require("../controllers/adminProductController");
const categoryController = require("../controllers/categoryController");
const uploader = require("../middlewares/uploadMiddleware"); 
const ProductController = require("../controllers/productController")
router.post(
    "/products", 
    auth, 
    uploader.array("images", 5), 
    controller.create
);

router.put(
    "/products/:id", 
    auth, 
    uploader.array("images", 5), 
    controller.update
);

router.delete("/products/:id", auth, controller.remove);

router.post("/categories", auth, categoryController.create);
router.get("/produit", auth, ProductController.getAllProduct);
router.delete("/images/:imageId", auth, controller.deleteImage);
router.delete("/categories/:id", auth, categoryController.remove);;
module.exports = router;
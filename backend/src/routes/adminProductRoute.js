const express = require("express");
const router = express.Router();
const auth = require("../middlewares/authMiddleware");
const controller = require("../controllers/adminProductController");
const categoryController = require("../controllers/categoryController");
const uploader = require("../middlewares/uploadMiddleware"); 

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

module.exports = router;
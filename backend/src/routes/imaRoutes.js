const express = require("express");
const router = express.Router();
const ImaRoute=require("../controllers/ImaController");


router.post("/", auth , uploader.array("images", 5) ,ImaRoute.create);

module.exports = router;
const router = require("express").Router();
const controller = require("../controllers/ProdController");

router.get("/search", controller.search);

module.exports = router;
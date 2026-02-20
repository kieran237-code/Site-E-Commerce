const router = require("express").Router();
const auth = require("../middlewares/authMiddleware");
const controller = require("../controllers/adminProductController");

router.post("/", auth , controller.create);
router.put("/:id", auth, controller.update);
router.delete("/:id" , auth, controller.remove);
const express = require("express");
const isAuth = require("../middleware/auth");
const productController = require("../controllers/product");

const router = express.Router();

router.post("/create", isAuth, productController.addProduct);
router.post("/udpate", isAuth, productController.updateProduct);
router.get("/remove/:id", isAuth, productController.removeProduct);

module.exports = router;

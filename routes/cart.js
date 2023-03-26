const express = require("express");
const isAuth = require("../middleware/authentication");

const cartController = require("../controllers/cart");

const router = express.Router();

router.post("/add-to-cart/:cartId", isAuth, cartController.addToCart);
router.post("/add-to-cart", isAuth, cartController.addToCart);
router.post("/update-cart/:cartId", isAuth, cartController.udpateCart);

module.exports = router;

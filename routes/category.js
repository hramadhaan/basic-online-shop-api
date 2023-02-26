const express = require("express");
// const { body } = require("express-validator");

// const Category = require("../models/category");

const categoryController = require("../controllers/category");

const router = express.Router();

router.post("/create", categoryController.createCategory);

module.exports = router;

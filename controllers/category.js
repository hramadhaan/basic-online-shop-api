const Category = require("../models/category");
const { errorHandler } = require("../utils/error-handler");

exports.createCategory = async function (req, res, next) {
  errorHandler(req);

  const { name, description, subParent, parentCategory } = req.body;

  try {
    const category = new Category({
      name,
      description,
      isSubParent: subParent,
      parentCategory,
    });

    const responseCategory = await category.save();

    res.status(201).json({
      success: true,
      message: "Category saved successfully",
      data: responseCategory,
    });
  } catch (err) {
    if (!res.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

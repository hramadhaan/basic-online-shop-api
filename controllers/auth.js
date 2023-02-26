const Auth = require("../models/auth");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
require("dotenv").config();

exports.registration = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error("Validation Failed");
    error.statusCode = 422;
    error.data = errors.array();
    throw error;
  }

  const { username, email, password } = req.body;

  try {
    const encryptedPassword = await bcryptjs.hash(password, 12);
    const dataAuth = new Auth({ username, email, password: encryptedPassword });
    const authResponse = await dataAuth.save();

    res.status(201).json({
      success: true,
      message: "Registration Success",
      data: authResponse,
    });
  } catch (err) {
    if (!res.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

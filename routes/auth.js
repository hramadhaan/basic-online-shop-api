const express = require("express");
const { body } = require("express-validator");

const Auth = require("../models/auth");

const authControllers = require("../controllers/auth");

const router = express.Router();

router.post(
  "/register",
  [
    body("password")
      .trim()
      .isLength({ min: 5 })
      .withMessage("Minimum password 5 length"),
    body("username")
      .trim()
      .custom((value) => {
        return Auth.findOne({ username: value }).then((user) => {
          if (user) {
            const error = new Error("Email is already registered");
            error.statusCode = 422;
            error.data = errors.array();
            throw error;
          }
        });
      }),
    body("email")
      .trim()
      .custom((value) => {
        return Auth.findOne({ email: value }).then((user) => {
          if (user) {
            return Promise.reject("Email already exists");
          }
        });
      }),
  ],
  authControllers.registration
);

router.post("/login", authControllers.login);

module.exports = router;

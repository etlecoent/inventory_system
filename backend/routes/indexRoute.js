const express = require("express");
const router = express.Router();
require("dotenv").config({ path: "../.env" });
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { ErrorHandler } = require("../helpers/errorsHelper");

module.exports = ({ getUserByEmail }) => {
  router.get("/", (req, res) => {
    res.send("Hello World!");
  });

  router.post("/login", (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) next(new ErrorHandler(400, "Missing field(s)"));
    getUserByEmail(email)
      .then((result) => {
        if (!result.length)
          throw new ErrorHandler(401, "Invalid password or email address");
        const hashedPassword = result[0].password;
        const isValid = bcrypt.compareSync(password, hashedPassword);
        if (!isValid)
          throw new ErrorHandler(401, "Invalid password or email address");
        const token = jwt.sign(
          {
            data: result[0].id,
          },
          process.env.JWT_KEY,
          { expiresIn: "24h" }
        );
        res.json({ token });
      })
      .catch((err) => next(err));
  });

  return router;
};

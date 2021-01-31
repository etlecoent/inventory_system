require("dotenv").config({ path: "../.env" });
const jwt = require("jsonwebtoken");
const { ErrorHandler } = require("../helpers/errorsHelper");

const authMiddleware = (req, res, next) => {
  const { authorization } = req.headers;

  jwt.verify(authorization, process.env.JWT_KEY, (err, decoded) => {
    if (err && err.message === "jwt expired") {
      next(new ErrorHandler(401, "Session expired"));
    } else if (err) {
      next(new ErrorHandler(401, "Unauthorized"));
    } else {
      next();
    }
  });
};

module.exports = {
  authMiddleware,
};

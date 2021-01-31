const express = require("express");
const router = express.Router();
const { ErrorHandler } = require("../helpers/errorsHelper");

const send404 = (req, res, next) => {
  next(new ErrorHandler(404, "Not found"));
};

router.all("/", send404);

module.exports = router;

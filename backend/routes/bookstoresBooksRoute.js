const express = require("express");
const router = express.Router();
const { ErrorHandler } = require("../helpers/errorsHelper");

module.exports = ({ getBookstoresBooks }) => {
  router.get("/", (req, res, next) => {
    getBookstoresBooks()
      .then((result) => {
        res.json(result);
      })
      .catch((err) => next(err));
  });

  return router;
};

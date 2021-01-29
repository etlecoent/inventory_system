const express = require("express");
const router = express.Router();
const { ErrorHandler } = require("../helpers/errorsHelper");

module.exports = ({ getBooks }) => {
  router.get("/", (req, res) => {
    getBooks().then((books) => res.json(books));
  });

  return router;
};

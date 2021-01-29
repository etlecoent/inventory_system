const express = require("express");
const router = express.Router();

module.exports = ({ getBooks }) => {
  router.get("/", (req, res) => {
    getBooks().then((books) => res.json(books));
  });

  return router;
};

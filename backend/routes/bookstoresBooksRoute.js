const express = require("express");
const router = express.Router();
const { ErrorHandler } = require("../helpers/errorsHelper");

module.exports = ({ getBookstoresBooks, updateBookstoresBooks }) => {
  router.get("/", (req, res, next) => {
    getBookstoresBooks()
      .then((result) => {
        res.json(result);
      })
      .catch((err) => next(err));
  });

  router.put("/", (req, res, next) => {
    const {} = req.params;
    const { book_id, bookstore_id, quantity } = req.body;

    if (!book_id || !bookstore_id || !quantity) {
      next(new ErrorHandler(400, "Missing field"));
    } else {
      updateBookstoresBooks(book_id, bookstore_id, quantity)
        .then((result) => {
          if (result.length) {
            res.json(result[0]);
          } else {
            res.status(501).json({ message: "Not found" });
          }
        })
        .catch((err) => next(err));
    }
  });

  return router;
};

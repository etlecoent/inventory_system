const express = require("express");
const router = express.Router();
const { ErrorHandler } = require("../helpers/errorsHelper");

module.exports = ({
  getBookstoresBooks,
  createBookstoresBooks,
  getBookstoresBooksById,
  updateBookstoresBooks,
  deleteBookstoresBooksById,
}) => {
  router.get("/", (req, res, next) => {
    getBookstoresBooks()
      .then((result) => {
        res.json(result);
      })
      .catch((err) => next(err));
  });

  router.post("/", (req, res, next) => {
    const { book_id, bookstore_id, quantity } = req.body;
    if (!book_id || !bookstore_id || !quantity) {
      next(new ErrorHandler(400, "Missing field(s)"));
    } else {
      createBookstoresBooks(book_id, bookstore_id, quantity)
        .then((result) => {
          if (result.length) {
            res.status(201).json(result[0]);
          } else {
            throw new ErrorHandler(403, "Already existing resource");
          }
        })
        .catch((err) => next(err));
    }
  });

  router.get("/:id", (req, res, next) => {
    const { id } = req.params;
    getBookstoresBooksById(id)
      .then((result) => {
        if (result.length) {
          res.json(result[0]);
        } else {
          throw new ErrorHandler(404, "Not found");
        }
      })
      .catch((err) => next(err));
  });

  router.patch("/:id", (req, res, next) => {
    const { id } = req.params;
    const { quantity } = req.body;

    if (!quantity) {
      next(new ErrorHandler(400, "Missing field(s)"));
    } else {
      updateBookstoresBooks(id, quantity)
        .then((result) => {
          if (result.length) {
            res.json(result[0]);
          } else {
            throw new ErrorHandler(404, "Not found");
          }
        })
        .catch((err) => next(err));
    }
  });

  router.delete("/:id", (req, res, next) => {
    const { id } = req.params;
    deleteBookstoresBooksById(id)
      .then((result) => {
        if (result.length) {
          res.status(202).json(result[0]);
        } else {
          throw new ErrorHandler(404, "Not found");
        }
      })
      .catch((err) => next(err));
  });

  return router;
};

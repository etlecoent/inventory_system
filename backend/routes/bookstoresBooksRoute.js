const express = require("express");
const router = express.Router();
const regex = require("../helpers/regex");
const { ErrorHandler } = require("../helpers/errorsHelper");

module.exports = (
  { getBookById },
  { getBookstoreById },
  {
    getBookstoresBooks,
    createBookstoresBooks,
    getBookstoresBooksById,
    getBookstoresBooksByContent,
    updateBookstoresBooks,
    deleteBookstoresBooksById,
  }
) => {
  router.get("/", (req, res, next) => {
    getBookstoresBooks()
      .then((result) => {
        res.json(result);
      })
      .catch((err) => next(err));
  });

  router.post("/", (req, res, next) => {
    const { book_id, bookstore_id, quantity } = req.body;
    console.log(typeof quantity);
    if (!book_id || !bookstore_id || !quantity || Number(quantity) < 0) {
      next(new ErrorHandler(400, "Invalid field(s)"));
    } else {
      const validations = [
        getBookById(book_id),
        getBookstoreById(bookstore_id),
        getBookstoresBooksByContent(book_id, bookstore_id),
      ];
      Promise.all(validations)
        .then((result) => {
          if (!result[0].length || !result[1].length)
            throw new ErrorHandler(400, "Invalid book_id and/or bookstore_id");
          if (result[2].length)
            throw new ErrorHandler(403, "Already existing resource");
          createBookstoresBooks(book_id, bookstore_id, quantity).then(
            (result) => {
              res.status(201).json(result[0]);
            }
          );
        })
        .catch((err) => next(err));
    }
  });

  router.get(`/:id(${regex.id})`, (req, res, next) => {
    const { id } = req.params;
    getBookstoresBooksById(id)
      .then((result) => {
        if (!result.length) throw new ErrorHandler(404, "Not found");
        res.json(result[0]);
      })
      .catch((err) => next(err));
  });

  router.patch(`/:id(${regex.id})`, (req, res, next) => {
    const { id } = req.params;
    const { quantity } = req.body;

    if (!quantity || quantity < 0) {
      next(new ErrorHandler(400, "Invalid field(s)"));
    } else {
      getBookstoresBooksById(id)
        .then((result) => {
          if (!result.length) throw new ErrorHandler(404, "Not found");
          updateBookstoresBooks(id, quantity).then((result) => {
            res.json(result[0]);
          });
        })
        .catch((err) => next(err));
    }
  });

  router.delete(`/:id(${regex.id})`, (req, res, next) => {
    const { id } = req.params;
    getBookstoresBooksById(id)
      .then((result) => {
        if (!result.length) throw new ErrorHandler(404, "Not found");
        deleteBookstoresBooksById(id).then((result) => {
          res.status(202).json(result[0]);
        });
      })
      .catch((err) => next(err));
  });

  return router;
};

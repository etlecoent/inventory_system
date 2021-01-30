const express = require("express");
const router = express.Router();
const { ErrorHandler } = require("../helpers/errorsHelper");

module.exports = ({
  getBookstores,
  createBookstore,
  getBookstoreById,
  deleteBookstoreById,
  getBooksForBookstoreById,
}) => {
  router.get("/", (req, res, next) => {
    getBookstores()
      .then((bookstores) => {
        if (bookstores.length) {
          res.json(bookstores);
        } else {
          throw new ErrorHandler(404, "Not found");
        }
      })
      .catch((err) => next(err));
  });

  router.post("/", (req, res, next) => {
    const { name } = req.body;

    if (!name) {
      next(new ErrorHandler(400, "Missing field(s)"));
    } else {
      createBookstore(name)
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

  router.get("/:bookstore_id", (req, res, next) => {
    const { bookstore_id } = req.params;
    getBookstoreById(bookstore_id)
      .then((result) => {
        if (result.length) {
          res.json(result[0]);
        } else {
          throw new ErrorHandler(404, "Not found");
        }
      })
      .catch((err) => next(err));
  });

  router.delete("/:bookstore_id", (req, res, next) => {
    const { bookstore_id } = req.params;
    deleteBookstoreById(bookstore_id)
      .then((result) => {
        if (result.length) {
          res.status(202).json(result[0]);
        } else {
          throw new ErrorHandler(404, "Not found");
        }
      })
      .catch((err) => next(err));
  });

  router.get("/:bookstore_id/books", (req, res, next) => {
    const { bookstore_id } = req.params;

    getBooksForBookstoreById(bookstore_id)
      .then((result) => {
        if (result.length) {
          res.json(result);
        } else {
          throw new ErrorHandler(404, "Not found");
        }
      })
      .catch((err) => next(err));
  });

  return router;
};

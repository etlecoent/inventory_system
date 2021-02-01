const express = require("express");
const router = express.Router();
const regex = require("../helpers/regex");
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
        res.json(bookstores);
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

  router.get(`/:id(${regex.id})`, (req, res, next) => {
    const { id } = req.params;
    getBookstoreById(id)
      .then((result) => {
        if (result.length) {
          res.json(result[0]);
        } else {
          throw new ErrorHandler(404, "Not found");
        }
      })
      .catch((err) => next(err));
  });

  router.delete(`/:id(${regex.id})`, (req, res, next) => {
    const { id } = req.params;
    deleteBookstoreById(id)
      .then((result) => {
        if (result.length) {
          res.status(202).json(result[0]);
        } else {
          throw new ErrorHandler(404, "Not found");
        }
      })
      .catch((err) => next(err));
  });

  router.get(`/:id(${regex.id})/books`, (req, res, next) => {
    const { id } = req.params;

    getBooksForBookstoreById(id)
      .then((result) => {
        res.json(result);
      })
      .catch((err) => next(err));
  });

  return router;
};

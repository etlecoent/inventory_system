const express = require("express");
const router = express.Router();
const regex = require("../helpers/regex");
const { ErrorHandler } = require("../helpers/errorsHelper");
const { get } = require("./404Route");

module.exports = ({
  getBooks,
  createBook,
  getBookById,
  getBookByContent,
  deleteBookById,
  getBookstoresForBookById,
}) => {
  router.get("/", (req, res, next) => {
    getBooks()
      .then((books) => {
        res.json(books);
      })
      .catch((err) => next(err));
  });

  router.post("/", (req, res, next) => {
    const { title, author, summary } = req.body;
    if (!title || !author || !summary) {
      next(new ErrorHandler(400, "Missing field(s)"));
    } else {
      getBookByContent(title, author)
        .then((result) => {
          if (result.length)
            throw new ErrorHandler(403, "Already existing resource");
          createBook(title, author, summary).then((result) => {
            res.status(201).json(result[0]);
          });
        })
        .catch((err) => next(err));
    }
  });

  router.get(`/:id(${regex.id})`, (req, res, next) => {
    const { id } = req.params;
    getBookById(id)
      .then((result) => {
        if (!result.length) throw new ErrorHandler(404, "Not found");
        res.json(result[0]);
      })
      .catch((err) => next(err));
  });

  router.delete(`/:id(${regex.id})`, (req, res, next) => {
    const { id } = req.params;
    getBookById(id)
      .then((result) => {
        if (!result.length) throw new ErrorHandler(404, "Not found");
        deleteBookById(id).then((result) => {
          res.status(202).json(result[0]);
        });
      })
      .catch((err) => next(err));
  });

  router.get(`/:id(${regex.id})/bookstores`, (req, res, next) => {
    const { id } = req.params;
    getBookById(id)
      .then((result) => {
        if (!result.length) throw new ErrorHandler(404, "Not found");
        getBookstoresForBookById(id).then((result) => {
          res.json(result);
        });
      })
      .catch((err) => next(err));
  });

  return router;
};

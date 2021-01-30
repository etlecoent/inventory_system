const express = require("express");
const router = express.Router();
const { ErrorHandler } = require("../helpers/errorsHelper");

module.exports = ({
  getBookstores,
  getBookstoreById,
  addBookToBookstoreById,
  getBookByIdForBookstoreById,
  updateStoredBookByIdForBookstoreById,
  deleteStoredBookByIdForBookstoreById,
  getBooksForBookstoreById,
}) => {
  router.get("/", (req, res, next) => {
    res.send("bookstores-books");
  });

  return router;
};

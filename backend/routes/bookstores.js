const express = require("express");
const router = express.Router();

module.exports = ({
  getBookstores,
  getBookstoreById,
  getBooksForBookstoreById,
  getBookByIdForBookstoreById,
}) => {
  router.get("/", (req, res) => {
    getBookstores()
      .then((bookstores) => {
        res.json(bookstores);
      })
      .catch((err) => res.send(err));
  });

  router.get("/:bookstore_id", (req, res) => {
    getBookstoreById(req.params.bookstore_id)
      .then((bookstore) => {
        res.json(bookstore);
      })
      .catch((err) => res.send(err));
  });

  router.get("/:bookstore_id/books", (req, res) => {
    getBooksForBookstoreById(req.params.bookstore_id)
      .then((books) => {
        res.json(books);
      })
      .catch((err) => res.send(err));
  });

  router.post("/:bookstore_id/books/", (req, res) => {
    // Create book table in DB
    // Create stored_book table
  });

  return router;
};

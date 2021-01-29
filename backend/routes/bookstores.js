const express = require("express");
const router = express.Router();

module.exports = ({
  getBookstores,
  getBookstoreById,
  addBookToBookstoreById,
  getBooksForBookstoreById,
  updateStoredBookByIdForBookstoreById,
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

  router.post("/:bookstore_id/books/", (req, res) => {
    const { book_id, quantity } = req.body;
    addBookToBookstoreById(book_id, req.params.bookstore_id, quantity)
      .then((result) => {
        res.json(result);
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

  router.put("/:bookstore_id/books/:book_id", (req, res) => {
    const { book_id, bookstore_id } = req.params;
    const { quantity } = req.body;
    updateStoredBookByIdForBookstoreById(book_id, bookstore_id, quantity)
      .then((updatedStoredBook) => {
        if (updatedStoredBook) {
          res.json(updatedStoredBook);
        } else {
          res.status(501).json({ message: "Not found" });
        }
      })
      .catch((err) => res.send(err));
  });

  return router;
};

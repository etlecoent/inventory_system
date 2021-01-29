const express = require("express");
const router = express.Router();

module.exports = ({
  getBookstores,
  getBookstoreById,
  addBookToBookstoreById,
  getBookByIdForBookstoreById,
  updateStoredBookByIdForBookstoreById,
  deleteStoredBookByIdForBookstoreById,
  getBooksForBookstoreById,
}) => {
  router.get("/", (req, res) => {
    getBookstores()
      .then((bookstores) => {
        if (bookstores.length) {
          res.json(bookstores);
        } else {
          res.status(501).json({ message: "Not found" });
        }
      })
      .catch((err) => res.send(err));
  });

  router.get("/:bookstore_id", (req, res) => {
    getBookstoreById(req.params.bookstore_id)
      .then((bookstore) => {
        if (bookstore.length) {
          res.json(bookstore[0]);
        } else {
          res.status(404).json({ message: "Not found" });
        }
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
    const { book_id, quantity } = req.body;
    addBookToBookstoreById(book_id, req.params.bookstore_id, quantity)
      .then((book) => {
        if (book.length) {
          res.json(book[0]);
        } else {
          res.status(501).json({ message: "Not found" });
        }
      })
      .catch((err) => res.send(err));
  });

  router.get("/:bookstore_id/books/:book_id", (req, res) => {
    const { bookstore_id, book_id } = req.params;
    getBookByIdForBookstoreById(book_id, bookstore_id)
      .then((book) => {
        if (book.length) {
          res.json(book[0]);
        } else {
          res.status(404).json({ message: "Not found" });
        }
      })
      .catch((err) => res.send(err));
  });

  router.put("/:bookstore_id/books/:book_id", (req, res) => {
    const { book_id, bookstore_id } = req.params;
    const { quantity } = req.body;
    updateStoredBookByIdForBookstoreById(book_id, bookstore_id, quantity)
      .then((updatedStoredBook) => {
        if (updatedStoredBook.length) {
          res.json(updatedStoredBook[0]);
        } else {
          res.status(501).json({ message: "Not found" });
        }
      })
      .catch((err) => res.send(err));
  });

  router.delete("/:bookstore_id/books/:book_id", (req, res) => {
    const { book_id, bookstore_id } = req.params;
    deleteStoredBookByIdForBookstoreById(book_id, bookstore_id)
      .then((updatedStoredBook) => {
        if (updatedStoredBook.length) {
          res.json(updatedStoredBook[0]);
        } else {
          res.status(501).json({ message: "Not found" });
        }
      })
      .catch((err) => res.send(err));
  });

  return router;
};

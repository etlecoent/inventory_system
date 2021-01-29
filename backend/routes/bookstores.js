const express = require("express");
const router = express.Router();

module.exports = (
  { ErrorHandler },
  {
    getBookstores,
    getBookstoreById,
    addBookToBookstoreById,
    getBookByIdForBookstoreById,
    updateStoredBookByIdForBookstoreById,
    deleteStoredBookByIdForBookstoreById,
    getBooksForBookstoreById,
  }
) => {
  router.get("/", (req, res) => {
    getBookstores()
      .then((bookstores) => {
        if (bookstores.length) {
          res.json(bookstores);
        } else {
          throw new ErrorHandler(404, "Not found");
        }
      })
      .catch((err) => {
        throw err;
      });
  });

  router.get("/:bookstore_id", (req, res) => {
    const { bookstore_id } = req.params;
    getBookstoreById(bookstore_id)
      .then((bookstore) => {
        if (bookstore.length) {
          res.json(bookstore[0]);
        } else {
          throw new ErrorHandler(
            400,
            `Bookstore with id ${bookstore_id} doesn't exist`
          );
        }
      })
      .catch((err) => {
        throw err;
      });
  });

  router.get("/:bookstore_id/books", (req, res) => {
    const { bookstore_id } = req.params;

    getBooksForBookstoreById(bookstore_id)
      .then((books) => {
        res.json(books);
      })
      .catch((err) => {
        throw err;
      });
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
      .catch((err) => {
        throw err;
      });
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
      .catch((err) => {
        throw err;
      });
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
      .catch((err) => {
        throw err;
      });
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
      .catch((err) => {
        throw err;
      });
  });

  return router;
};

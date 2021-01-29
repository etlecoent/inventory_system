module.exports = (db) => {
  const getUsers = () => {
    return db
      .select("*")
      .from("users")
      .then((result) => result)
      .catch((err) => {
        console.log(err);
        throw err;
      });
  };

  const getBooks = () => {
    return db
      .select("*")
      .from("books")
      .then((result) => result)
      .catch((err) => {
        console.log(err);
        throw err;
      });
  };

  const getBookstores = () => {
    return db
      .select("*")
      .from("bookstores")
      .then((result) => result)
      .catch((err) => {
        console.log(err);
        throw err;
      });
  };

  const getBookstoreById = (id) => {
    return db
      .select("*")
      .from("bookstores")
      .where("id", id)
      .then((result) => result)
      .catch((err) => {
        console.log(err);
        throw err;
      });
  };

  const addBookToBookstoreById = (book_id, bookstore_id, quantity) => {
    return db("stored_books")
      .insert({
        book_id,
        bookstore_id,
        quantity,
      })
      .returning("*")
      .then((result) => result)
      .catch((err) => {
        console.log(err);
        throw err;
      });
  };

  const updateStoredBookByIdForBookstoreById = (
    book_id,
    bookstore_id,
    quantity
  ) => {
    return db("stored_books")
      .where({
        book_id,
        bookstore_id,
      })
      .update({ quantity })
      .returning("*")
      .then((result) => result)
      .catch((err) => {
        console.log(err);
        throw err;
      });
  };

  const getBooksForBookstoreById = (id) => {
    return db
      .select("*")
      .from("books")
      .innerJoin("stored_books", "books.id", "stored_books.book_id")
      .where("bookstore_id", id)
      .then((result) => result)
      .catch((err) => {
        console.log(err);
        throw err;
      });
  };

  return {
    getUsers,
    getBooks,
    getBookstores,
    getBookstoreById,
    addBookToBookstoreById,
    updateStoredBookByIdForBookstoreById,
    getBooksForBookstoreById,
  };
};

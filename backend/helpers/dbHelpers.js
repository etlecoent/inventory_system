module.exports = (db) => {
  const getUsers = () => {
    return db
      .select("*")
      .from("users")
      .then((result) => result)
      .catch((err) => console.log(err));
  };

  const getBooks = () => {
    return db
      .select("*")
      .from("books")
      .then((result) => result)
      .catch((err) => console.log(err));
  };

  const getBookstores = () => {
    return db
      .select("*")
      .from("bookstores")
      .then((result) => result)
      .catch((err) => console.log(err));
  };

  const getBookstoreById = (id) => {
    return db
      .select("*")
      .from("bookstores")
      .where("id", id)
      .then((result) => result[0])
      .catch((err) => console.log(err));
  };

  const getBooksForBookstoreById = (id) => {
    return db
      .select("*")
      .from("books")
      .innerJoin("stored_books", "books.id", "stored_books.book_id")
      .where("bookstore_id", id)
      .then((result) => result)
      .catch((err) => console.log(err));
  };

  const getBookByIdForBookstoreById = (bookstore_id, book_id) => {
    return db
      .select("*")
      .from("books")
      .innerJoin("stored_books", "books.id", "stored_books.book_id")
      .where("bookstore_id", bookstore_id)
      .where("book_id", book_id)
      .then((result) => result[0])
      .catch((err) => console.log(err));
  };

  return {
    getUsers,
    getBooks,
    getBookstores,
    getBookstoreById,
    getBooksForBookstoreById,
    getBookByIdForBookstoreById,
  };
};

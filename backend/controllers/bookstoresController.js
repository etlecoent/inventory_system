module.exports = (db) => {
  const getBookstores = () => {
    return db
      .select("*")
      .from("bookstores")
      .orderBy("id")
      .then((result) => result);
  };

  const getBookstoreById = (id) => {
    return db
      .select("*")
      .from("bookstores")
      .where("id", id)
      .then((result) => result);
  };

  const getBooksForBookstoreById = (id) => {
    return db
      .select([
        "books.id",
        "books.title",
        "books.author",
        "books.summary",
        "stored_books.quantity",
        "stored_books.created_at",
        "stored_books.updated_at",
      ])
      .from("books")
      .innerJoin("stored_books", "books.id", "stored_books.book_id")
      .where("bookstore_id", id)
      .orderBy("id")
      .then((result) => result);
  };

  const addBookToBookstoreById = (book_id, bookstore_id, quantity) => {
    return db("stored_books")
      .insert({
        book_id,
        bookstore_id,
        quantity,
      })
      .returning("*")
      .then((result) => result);
  };

  const getBookByIdForBookstoreById = (book_id, bookstore_id) => {
    return db
      .select([
        "books.id",
        "books.title",
        "books.author",
        "books.summary",
        "stored_books.quantity",
        "stored_books.created_at",
        "stored_books.updated_at",
      ])
      .from("books")
      .innerJoin("stored_books", "books.id", "stored_books.book_id")
      .where({ book_id, bookstore_id })
      .orderBy("id")
      .then((result) => result);
  };

  return {
    getBookstores,
    getBookstoreById,
    getBooksForBookstoreById,
    addBookToBookstoreById,
    getBookByIdForBookstoreById,
  };
};

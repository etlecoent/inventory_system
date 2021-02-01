module.exports = (db) => {
  const getBookstoresBooks = () => {
    return db
      .select("*")
      .from("bookstores_books")
      .orderBy("id")
      .then((result) => result);
  };

  const createBookstoresBooks = (book_id, bookstore_id, quantity) => {
    return db("bookstores_books")
      .insert({
        book_id,
        bookstore_id,
        quantity,
      })
      .returning("*")
      .then((result) => result);
  };

  const getBookstoresBooksById = (id) => {
    return db
      .select("*")
      .from("bookstores_books")
      .where({ id })
      .orderBy("id")
      .then((result) => result);
  };

  const getBookstoresBooksByContent = (book_id, bookstore_id) => {
    return db
      .select("*")
      .from("bookstores_books")
      .where({ book_id, bookstore_id })
      .then((result) => result);
  };

  const updateBookstoresBooks = (id, quantity) => {
    return db("bookstores_books")
      .where({ id })
      .update({ quantity, updated_at: new Date().toISOString() })
      .returning("*")
      .then((result) => result);
  };

  const deleteBookstoresBooksById = (id) => {
    return db("bookstores_books")
      .where({ id })
      .del()
      .returning("*")
      .then((result) => result);
  };

  return {
    getBookstoresBooks,
    createBookstoresBooks,
    getBookstoresBooksById,
    getBookstoresBooksByContent,
    updateBookstoresBooks,
    deleteBookstoresBooksById,
  };
};

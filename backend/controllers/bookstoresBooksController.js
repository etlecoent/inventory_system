module.exports = (db) => {
  const getBookstoresBooks = () => {
    return db
      .select("*")
      .from("bookstores_books")
      .orderBy("id")
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

  const updateBookstoresBooks = (book_id, bookstore_id, quantity) => {
    return db("bookstores_books")
      .where({ book_id, bookstore_id })
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
    getBookstoresBooksById,
    updateBookstoresBooks,
    deleteBookstoresBooksById,
  };
};

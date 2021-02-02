module.exports = (db) => {
  const getBookstores = () => {
    return db
      .select("*")
      .from("bookstores")
      .orderBy("id")
      .then((result) => result);
  };

  const createBookstore = (name) => {
    return db("bookstores")
      .insert({
        name,
      })
      .returning("*")
      .then((result) => result);
  };

  const getBookstoreById = (id) => {
    return db
      .select("*")
      .from("bookstores")
      .where("id", id)
      .then((result) => result);
  };

  const getBookstoreByContent = (name) => {
    return db
      .select("*")
      .from("bookstores")
      .where({ name })
      .then((result) => result);
  };

  const deleteBookstoreById = (id) => {
    return db("bookstores")
      .where({ id })
      .del()
      .returning("*")
      .then((result) => result);
  };

  const getBooksForBookstoreById = (id) => {
    return db
      .select([
        "books.*",
        "bookstores_books.id as stock_id",
        "bookstores_books.quantity",
      ])
      .from("books")
      .innerJoin("bookstores_books", "books.id", "bookstores_books.book_id")
      .where("bookstore_id", id)
      .orderBy("books.id")
      .then((result) => result);
  };

  return {
    getBookstores,
    createBookstore,
    getBookstoreById,
    getBookstoreByContent,
    deleteBookstoreById,
    getBooksForBookstoreById,
  };
};

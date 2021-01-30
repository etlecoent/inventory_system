module.exports = (db) => {
  const getBooks = () => {
    return db
      .select("*")
      .from("books")
      .orderBy("id")
      .then((result) => result);
  };

  const createBook = (title, author, summary) => {
    return db("books")
      .insert({
        title,
        author,
        summary,
      })
      .returning("*")
      .then((result) => result);
  };

  const getBookById = (id) => {
    return db
      .select("*")
      .from("books")
      .where("id", id)
      .then((result) => result);
  };

  const deleteBookById = (id) => {
    return db("books")
      .where({ id })
      .del()
      .returning("*")
      .then((result) => result);
  };

  const getBookstoresForBookById = (id) => {
    return db
      .select("*")
      .from("bookstores")
      .innerJoin(
        "bookstores_books",
        "bookstores.id",
        "bookstores_books.bookstore_id"
      )
      .where("bookstore_id", id)
      .orderBy("bookstores.id")
      .then((result) => result);
  };

  return {
    getBooks,
    createBook,
    getBookById,
    deleteBookById,
    getBookstoresForBookById,
  };
};

module.exports = (db) => {
  const getBookstoresBooksStatus = () => {
    return (
      db
        .select([
          "bookstores_books.*",
          "bookstores.name as bookstore_name",
          "books.title as book_title",
          "books.author as book_author",
        ])
        .from("bookstores_books")
        .innerJoin(
          "bookstores",
          "bookstores_books.bookstore_id",
          "bookstores.id"
        )
        .innerJoin("books", "bookstores_books.book_id", "books.id")
        .where("quantity", "<=", 0)
        // .groupBy("bookstores_books")
        .then((result) => result)
    );
  };

  return {
    getBookstoresBooksStatus,
  };
};

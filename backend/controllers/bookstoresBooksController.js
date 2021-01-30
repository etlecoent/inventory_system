module.exports = (db) => {
  const getBookstoresBooks = () => {
    return db
      .select("*")
      .from("bookstores_books")
      .orderBy("id")
      .then((result) => result);
  };

  return {
    getBookstoresBooks,
  };
};

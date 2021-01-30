module.exports = (db) => {
  const getBooks = () => {
    return db
      .select("*")
      .from("books")
      .orderBy("id")
      .then((result) => result);
  };

  return {
    getBooks,
  };
};

module.exports = (db) => {
  const getBooks = () => {
    return db
      .select("*")
      .from("books")
      .orderBy("id")
      .then((result) => result)
      .catch((err) => {
        console.log(err);
        throw err;
      });
  };

  return {
    getBooks,
  };
};

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

  return {
    getUsers,
    getBooks,
  };
};

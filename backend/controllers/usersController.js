module.exports = (db) => {
  const getUsers = () => {
    return db
      .select("*")
      .from("users")
      .orderBy("id")
      .then((result) => result)
      .catch((err) => {
        console.log(err);
        throw err;
      });
  };

  return {
    getUsers,
  };
};

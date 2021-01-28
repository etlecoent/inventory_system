module.exports = (db) => {
  const getUsers = () => {
    return db
      .select("*")
      .from("users")
      .then((result) => result)
      .catch((err) => console.log(err));
  };

  return {
    getUsers,
  };
};

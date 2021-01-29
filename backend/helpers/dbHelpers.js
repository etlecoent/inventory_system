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

  const getBookstores = () => {
    return db
      .select("*")
      .from("bookstores")
      .orderBy("id")
      .then((result) => result)
      .catch((err) => {
        console.log(err);
        throw err;
      });
  };

  const getBookstoreById = (id) => {
    return db
      .select("*")
      .from("bookstores")
      .where("id", id)
      .then((result) => result)
      .catch((err) => {
        console.log(err);
        throw err;
      });
  };

  const addBookToBookstoreById = (book_id, bookstore_id, quantity) => {
    return db("stored_books")
      .insert({
        book_id,
        bookstore_id,
        quantity,
      })
      .returning("*")
      .then((result) => result)
      .catch((err) => {
        console.log(err);
        throw err;
      });
  };

  const getBookByIdForBookstoreById = (book_id, bookstore_id) => {
    return db
      .select([
        "books.id",
        "books.title",
        "books.author",
        "books.summary",
        "stored_books.quantity",
        "stored_books.created_at",
        "stored_books.updated_at",
      ])
      .from("books")
      .innerJoin("stored_books", "books.id", "stored_books.book_id")
      .where({ book_id, bookstore_id })
      .orderBy("id")
      .then((result) => result)
      .catch((err) => {
        console.log(err);
        throw err;
      });
  };

  const getBooksForBookstoreById = (id) => {
    return db
      .select([
        "books.id",
        "books.title",
        "books.author",
        "books.summary",
        "stored_books.quantity",
        "stored_books.created_at",
        "stored_books.updated_at",
      ])
      .from("books")
      .innerJoin("stored_books", "books.id", "stored_books.book_id")
      .where("bookstore_id", id)
      .orderBy("id")
      .then((result) => result)
      .catch((err) => {
        console.log(err);
        throw err;
      });
  };

  const updateStoredBookByIdForBookstoreById = (
    book_id,
    bookstore_id,
    quantity
  ) => {
    return db("stored_books")
      .where({ book_id, bookstore_id })
      .modify((queryBuilder) => {
        if (quantity < 0) {
          queryBuilder.andWhere("quantity", ">=", Math.abs(quantity));
        }
      })
      .increment("quantity", quantity)
      .update({ updated_at: new Date().toISOString() })
      .returning("*")
      .then((result) => result)
      .catch((err) => {
        console.log(err);
        throw err;
      });
  };

  const deleteStoredBookByIdForBookstoreById = (book_id, bookstore_id) => {
    return db("stored_books")
      .where({ book_id, bookstore_id })
      .del()
      .returning("*")
      .then((result) => result)
      .catch((err) => {
        console.log(err);
        throw err;
      });
  };

  return {
    getUsers,
    getBooks,
    getBookstores,
    getBookstoreById,
    getBooksForBookstoreById,
    addBookToBookstoreById,
    getBookByIdForBookstoreById,
    updateStoredBookByIdForBookstoreById,
    deleteStoredBookByIdForBookstoreById,
  };
};

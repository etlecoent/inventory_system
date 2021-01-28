const faker = require("faker");

const createFakeStoredBooks = (n) => {
  const storedBookstores = [];
  for (let i = 1; i <= n; i++) {
    storedBookstores.push({
      book_id: i,
      bookstore_id: i,
      quantity: Math.floor(Math.random() * 10) + 1,
    });
  }
  return storedBookstores;
};

exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("stored_books")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("stored_books").insert(createFakeStoredBooks(5));
    });
};

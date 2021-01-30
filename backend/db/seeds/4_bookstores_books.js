const faker = require("faker");

const createFakeBookstoresBooks = (n) => {
  const bookstoresBooks = [];
  for (let i = 1; i <= n; i++) {
    bookstoresBooks.push({
      book_id: i,
      bookstore_id: i,
      quantity: Math.floor(Math.random() * 10) + 1,
    });
  }
  return bookstoresBooks;
};

exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("bookstores_books")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("bookstores_books").insert(createFakeBookstoresBooks(5));
    });
};

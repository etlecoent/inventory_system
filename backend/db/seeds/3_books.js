const faker = require("faker");

const createFakeBooks = (n) => {
  const books = [];
  for (let i = 0; i < n; i++) {
    books.push({
      title: faker.company.catchPhrase(),
      author: faker.name.firstName(),
      summary: faker.lorem.sentence(),
    });
  }
  return books;
};

exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("books")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("books").insert(createFakeBooks(5));
    });
};

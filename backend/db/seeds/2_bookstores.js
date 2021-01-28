const faker = require("faker");

const createFakeBookstores = (n) => {
  const bookstores = [];
  for (let i = 0; i < n; i++) {
    bookstores.push({
      name: faker.company.companyName(),
    });
  }
  return bookstores;
};

exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("bookstores")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("bookstores").insert(createFakeBookstores(5));
    });
};

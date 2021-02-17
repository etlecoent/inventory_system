const faker = require("faker");
const bcrypt = require("bcrypt");

const createFakeUsers = (n) => {
  const users = [];
  const salt = bcrypt.genSaltSync(13);
  const hash = bcrypt.hashSync("test", salt);
  for (let i = 0; i < n; i++) {
    users.push({
      username: faker.internet.userName(),
      password: hash,
      email: faker.internet.email(),
    });
  }
  return users;
};

exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("users")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("users").insert(createFakeUsers(5));
    });
};

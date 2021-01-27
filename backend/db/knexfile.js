require("dotenv").config();

const knexConfig = {
  client: "pg",
  connection: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
  },
  migrations: {
    directory: "./migrations",
  },
  seeds: {
    directory: "./seeds",
  },
};

const knex = require("knex")(knexConfig);

module.exports = knex;

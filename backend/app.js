const express = require("express");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
const port = process.env.PORT || 3001;

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
  const logger = require("morgan");
  app.use(logger("dev"));
}

const knex = require("knex")({
  client: "pg",
  version: "7.2",
  connection: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
  },
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

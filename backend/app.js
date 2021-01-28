// Express setup
const express = require("express");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Environment setup
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
  const logger = require("morgan");
  app.use(logger("dev"));
}

// Database setup
const knexfile = require("./db/knexfile");
const knex = require("knex")(knexfile[process.env.NODE_ENV]);
// const dbHelpers = require("./helpers/dbHelpers")(db);

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

// Routes setup
const indexRouter = require("./routes/index");
app.use("/", indexRouter);

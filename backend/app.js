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
const db = require("knex")(knexfile[process.env.NODE_ENV]);

//Middlewars
const { authMiddleware } = require("./middlewares/authMiddleware");
const { errorMiddleware } = require("./middlewares/errorMiddleware");

// Routes setup
const indexRouter = require("./routes/indexRoute");
const usersController = require("./controllers/usersController")(db);
app.use("/", indexRouter(usersController));

const usersRouter = require("./routes/usersRoute");
app.use("/users", authMiddleware, usersRouter(usersController));

const bookstoresRouter = require("./routes/bookstoresRoute");
const bookstoresController = require("./controllers/bookstoresController")(db);
app.use("/bookstores", authMiddleware, bookstoresRouter(bookstoresController));

const booksRouter = require("./routes/booksRoute");
const booksController = require("./controllers/booksController")(db);
app.use("/books", authMiddleware, booksRouter(booksController));

const bookstoresBooksRouter = require("./routes/bookstoresBooksRoute");
const bookstoresBooksController = require("./controllers/bookstoresBooksController")(
  db
);
app.use(
  "/bookstores-books",
  authMiddleware,
  bookstoresBooksRouter(bookstoresBooksController)
);

const statusRouter = require("./routes/statusRoute");
const statusController = require("./controllers/statusController")(db);
app.use("/status", authMiddleware, statusRouter(statusController));

const Router404 = require("./routes/404Route");
app.use("*", Router404);

// Error middleware
app.use(errorMiddleware);

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

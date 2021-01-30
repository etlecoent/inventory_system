const express = require("express");
const router = express.Router();
const { ErrorHandler } = require("../helpers/errorsHelper");

module.exports = ({ getUsers, getUser }) => {
  router.get("/", (req, res, next) => {
    getUsers()
      .then((users) => {
        if (users.length) {
          res.json(users);
        } else {
          throw new ErrorHandler(404, "Not found");
        }
      })
      .catch((err) => next(err));
  });

  router.get("/:id", (req, res, next) => {
    const { id } = req.params;
    getUser(id)
      .then((result) => {
        if (result.length) {
          res.json(result[0]);
        } else {
          throw new ErrorHandler(404, "Not found");
        }
      })
      .catch((err) => next(err));
  });

  return router;
};

const express = require("express");
const router = express.Router();
const regex = require("../helpers/regex");
const { ErrorHandler } = require("../helpers/errorsHelper");

module.exports = ({ getUsers, getUserById }) => {
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

  router.get(`/:id(${regex.id})`, (req, res, next) => {
    const { id } = req.params;
    getUserById(id)
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

const express = require("express");
const router = express.Router();
const { ErrorHandler } = require("../helpers/errorsHelper");

module.exports = ({ getUsers }) => {
  router.get("/", (req, res) => {
    getUsers().then((users) => res.json(users));
  });

  return router;
};

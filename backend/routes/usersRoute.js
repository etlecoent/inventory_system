const express = require("express");
const router = express.Router();

module.exports = ({ ErrorHandler }, { getUsers }) => {
  router.get("/", (req, res) => {
    getUsers().then((users) => res.json(users));
  });

  return router;
};

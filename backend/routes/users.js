const express = require("express");
const router = express.Router();

module.exports = ({
  getUsers,
  // get blahblah
}) => {
  router.get("/", (req, res) => {
    getUsers().then((users) => res.json(users));
  });

  return router;
};

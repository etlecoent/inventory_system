const express = require("express");
const router = express.Router();

module.exports = ({
  getBookstores,
  // get blahblah
}) => {
  router.get("/", (req, res) => {
    getBookstores().then((bookstores) => res.json(bookstores));
  });

  return router;
};

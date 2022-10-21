const { gridData } = require("../data");
const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.json(gridData);
});

router.get("/");
module.exports = router;

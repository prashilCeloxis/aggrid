const { gridData } = require("../data");
const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.json(gridData);
});

router.get("/oid", (req, res) => {
  if (req.query.id === "g1") {
    res.send({
      isEdit: false,
    });
  } else {
    res.send({
      isEdit: true,
    });
  }
});

router.get("/");
module.exports = router;

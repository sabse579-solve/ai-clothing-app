const express = require("express");
const router = express.Router();

router.get("/suggestions", (req, res) => {
  res.json({ list: [] });
});

module.exports = router;

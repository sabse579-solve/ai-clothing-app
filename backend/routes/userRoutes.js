const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const router = express.Router();

router.get("/me", protect, (req, res) => {
  res.json({ userId: req.user.id });
});

module.exports = router;

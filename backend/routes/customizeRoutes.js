const express = require("express");
const router = express.Router();

// -------------------------------
// COLOR
// -------------------------------
router.post("/color", async (req, res) => {
  try {
    const { color } = req.body;
    res.status(200).json({ success: true, color });
  } catch (err) {
    res.status(500).json({ error: "Color update failed" });
  }
});

// -------------------------------
// FABRIC
// -------------------------------
router.post("/fabric", async (req, res) => {
  try {
    const { fabric } = req.body;
    res.status(200).json({ success: true, fabric });
  } catch (err) {
    res.status(500).json({ error: "Fabric update failed" });
  }
});

// -------------------------------
// PATTERN
// -------------------------------
router.post("/pattern", async (req, res) => {
  try {
    const { pattern } = req.body;
    res.status(200).json({ success: true, pattern });
  } catch (err) {
    res.status(500).json({ error: "Pattern update failed" });
  }
});

// -------------------------------
// LENGTH
// -------------------------------
router.post("/length", async (req, res) => {
  try {
    const { length } = req.body;
    res.status(200).json({ success: true, length });
  } catch (err) {
    res.status(500).json({ error: "Length update failed" });
  }
});

// -------------------------------
// NECKLINE
// -------------------------------
router.post("/neckline", async (req, res) => {
  try {
    const { neckline } = req.body;
    res.status(200).json({ success: true, neckline });
  } catch (err) {
    res.status(500).json({ error: "Neckline update failed" });
  }
});

// -------------------------------
// SLEEVE
// -------------------------------
router.post("/sleeve", async (req, res) => {
  try {
    const { sleeve } = req.body;
    res.status(200).json({ success: true, sleeve });
  } catch (err) {
    res.status(500).json({ error: "Sleeve update failed" });
  }
});

// -------------------------------
// ACCESSORIES
// -------------------------------
router.post("/accessories", async (req, res) => {
  try {
    const { accessories } = req.body;
    res.status(200).json({ success: true, accessories });
  } catch (err) {
    res.status(500).json({ error: "Accessories update failed" });
  }
});

// -------------------------------
// FIT
// -------------------------------
router.post("/fit", async (req, res) => {
  try {
    const { fitType } = req.body;
    res.status(200).json({ success: true, fitType });
  } catch (err) {
    res.status(500).json({ error: "Fit update failed" });
  }
});

module.exports = router;

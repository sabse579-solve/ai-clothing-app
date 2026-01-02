// backend/routes/tryonRoutes.js
const express = require("express");
const router = express.Router();

const tryon = require("../tryon");

// Apply Try-On (sync MVP)
router.post("/apply", async (req, res) => {
  try {
    const { avatarImage, garmentImage } = req.body;

    if (!avatarImage || !garmentImage) {
      return res.status(400).json({ error: "Missing avatarImage or garmentImage" });
    }

    // Call your actual pipeline
    const result = await tryon.applyTryon(avatarImage, garmentImage);

    return res.json({ result });

  } catch (err) {
    console.error("Try-On error:", err);
    res.status(500).json({ error: "Try-On failed" });
  }
});

// OPTIONAL: job-based async VTO
router.get("/result/:jobId", async (req, res) => {
  try {
    const result = await tryon.getTryonResult?.(req.params.jobId);

    if (!result)
      return res.status(404).json({ error: "Result not found" });

    res.json({ result });

  } catch (err) {
    console.error("Try-On fetch error:", err);
    res.status(500).json({ error: "Could not fetch try-on result" });
  }
});

module.exports = router;

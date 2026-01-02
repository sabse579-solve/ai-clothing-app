// backend/routes/designRoutes.js
const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");

const { createDesign } = require("../services/resilientDesignService");

// Temp JSON store (replace with MongoDB later)
const STORE_FILE = path.join(__dirname, "../data/designs.json");

// ensure folder exists
if (!fs.existsSync(path.join(__dirname, "../data"))) {
  fs.mkdirSync(path.join(__dirname, "../data"));
}
// ensure file exists
if (!fs.existsSync(STORE_FILE)) {
  fs.writeFileSync(STORE_FILE, JSON.stringify([]));
}

const saveDesign = (record) => {
  const data = JSON.parse(fs.readFileSync(STORE_FILE));
  data.push(record);
  fs.writeFileSync(STORE_FILE, JSON.stringify(data, null, 2));
};

// -------------------------------
// POST /api/outfits/generate
// -------------------------------
router.post("/generate", async (req, res) => {
  const { prompt } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: "Prompt is required" });
  }

  try {
    let imageUrl = await createDesign(prompt);

    // Convert local fallback path to absolute URL
    if (!imageUrl.startsWith("data:") && imageUrl.startsWith("/")) {
      imageUrl = `http://localhost:5000${imageUrl}`;
    }

    const newDesign = {
      _id: Date.now().toString(),
      prompt,
      imageUrl,
      createdAt: new Date(),
    };

    saveDesign(newDesign);

    return res.json({ images: [imageUrl] });

  } catch (err) {
    console.error("Design generation error:", err);
    return res.status(500).json({ error: "Failed to generate design" });
  }
});

// -------------------------------
// GET /api/outfits/list
// -------------------------------
router.get("/list", async (req, res) => {
  try {
    const data = JSON.parse(fs.readFileSync(STORE_FILE));

    return res.json(data);
  } catch (err) {
    console.error("Error listing outfits:", err);
    return res.status(500).json({ error: "Failed to load store items" });
  }
});

module.exports = router;

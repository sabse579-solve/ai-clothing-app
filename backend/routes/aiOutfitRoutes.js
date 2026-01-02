// backend/routes/aiOutfitRoutes.js
const express = require("express");
const router = express.Router();

const { generateOutfitConfig } = require("../services/outfitConfigGenerator");
const { createDesign } = require("../services/resilientDesignService");
const { validateOutfitConfig } = require("../ai/validateOutfit");

router.post("/generate-outfit", async (req, res) => {
  try {
    const payload = req.body;

    // 1️⃣ Generate canonical OutfitConfig
    const config = await generateOutfitConfig(payload);

    // 2️⃣ Hard validation (schema lock)
    validateOutfitConfig(config);

    // 3️⃣ Generate image from SAME config
    const image = await createDesign(config.imagePrompt);

    // 4️⃣ Unified response (🔥 same outfit → two worlds)
    return res.json({
      image,
      config,
    });
  } catch (err) {
    console.error("❌ AI outfit generation failed:", err.message);
    return res.status(400).json({ error: err.message });
  }
});

module.exports = router;

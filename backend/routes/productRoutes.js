import express from 'express';
import { generateDesign } from "../services/geminiService.js";
import Product from "../models/Product.js";

const router = express.Router();

router.post("/generate", async (req, res) => {
  try {
    const { prompt } = req.body;
    const imageUrl = await generateDesign(prompt);

    const product = await Product.create({ prompt, imageUrl });

    res.json({ success: true, product });
  } catch (err) {
    res.status(500).json({ error: "AI design generation failed" });
  }
});

export default router;
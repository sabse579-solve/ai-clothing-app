// backend/routes/outfitRoutes.js
import express from "express";
const router = express.Router();

import outfitController from "../controllers/outfitController.js";
import draftController from "../controllers/outfitDraftController.js";

/* --------------------------------------------------
   🤖 AI OUTFIT ROUTES (UNCHANGED)
-------------------------------------------------- */
router.post("/generate", outfitController.generateOutfits);
router.get("/list", outfitController.listOutfits);
router.get("/suggestions", outfitController.suggestions);

/* --------------------------------------------------
   💾 OUTFIT DRAFT ROUTES (NEW)
-------------------------------------------------- */

// Save or update live customized outfit
router.post("/draft/save", draftController.saveDraft);

// Get current draft for user
router.get("/draft/:userId", draftController.getDraft);

// Convert draft to order
router.post("/order/:draftId", draftController.placeOrder);

export default router;

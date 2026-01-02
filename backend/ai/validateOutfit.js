// backend/ai/validateOutfit.js
import {
  ALLOWED_OUTFITS,
  ALLOWED_BODY_FITS,
  ALLOWED_GARMENT_FITS,
} from "./outfitSchema.js";

/**
 * 🔒 HARD VALIDATOR — NO AI ESCAPE
 * Schema:
 * {
 *   meta: {...},
 *   garment: {...},
 *   accessories: [],
 *   imagePrompt: string
 * }
 */
export function validateOutfitConfig(config) {
  if (!config || typeof config !== "object") {
    throw new Error("Invalid or empty outfit config");
  }

  const { meta, garment, accessories, imagePrompt } = config;

  /* ------------------------------------
     1️⃣ META VALIDATION (CORE)
  ------------------------------------ */
  if (!meta) throw new Error("Missing meta section");

  const { gender, outfitType, bodyFit, occasion } = meta;

  if (!["male", "female"].includes(gender)) {
    throw new Error("Invalid gender");
  }

  const allowedForGender = ALLOWED_OUTFITS[gender];
  if (!allowedForGender || !allowedForGender.includes(outfitType)) {
    throw new Error(
      `Outfit "${outfitType}" not allowed for gender "${gender}"`
    );
  }

  if (!ALLOWED_BODY_FITS.includes(bodyFit)) {
    throw new Error(
      `Invalid bodyFit "${bodyFit}". Allowed: ${ALLOWED_BODY_FITS.join(", ")}`
    );
  }

  /* ------------------------------------
     2️⃣ GARMENT VALIDATION (STITCHED)
  ------------------------------------ */
  if (!garment) throw new Error("Missing garment section");

  const {
    color,
    fabric,
    pattern,
    sleeve,
    neckline,
    length,
    garmentFit,
  } = garment;

  if (!/^#([0-9A-F]{6})$/i.test(color)) {
    throw new Error("Color must be hex (#RRGGBB)");
  }

  if (
    garmentFit &&
    !ALLOWED_GARMENT_FITS.includes(garmentFit)
  ) {
    throw new Error(`Invalid garmentFit "${garmentFit}"`);
  }

  const ENUMS = {
    fabric: [
      "cotton",
      "linen",
      "silk",
      "satin",
      "velvet",
      "chiffon",
      "georgette",
      "crepe",
      "organza",
      "khadi",
      "banarasi silk",
      "kanjivaram silk",
    ],
    pattern: [
      "plain",
      "solid",
      "embroidered",
      "printed",
      "jacquard",
      "zari",
      "block print",
      "bandhani",
      "ikat",
    ],
    sleeve: ["sleeveless", "short", "threeQuarter", "long"],
    neckline: ["round", "v", "square", "boat", "collar"],
    length: ["short", "knee", "regular", "long", "full"],
    occasion: ["wedding", "festive", "casual", "party", "formal"],
  };

  for (const key in ENUMS) {
    if (garment[key] && !ENUMS[key].includes(garment[key])) {
      throw new Error(`Invalid ${key}: ${garment[key]}`);
    }
  }

  /* ------------------------------------
     3️⃣ ACCESSORIES
  ------------------------------------ */
  if (accessories && !Array.isArray(accessories)) {
    throw new Error("Accessories must be an array");
  }

  /* ------------------------------------
     4️⃣ IMAGE PROMPT (MANDATORY)
  ------------------------------------ */
  if (!imagePrompt || typeof imagePrompt !== "string") {
    throw new Error("imagePrompt must be a string");
  }

  return true; // ✅ LOCKED & SAFE
}

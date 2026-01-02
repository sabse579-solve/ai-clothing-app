// backend/services/outfitConfigGenerator.js
const { BasePatterns } = require("../patterns/basePatterns");
const { PatternDeltas } = require("../patterns/patternDeltas");
const { aiDeltaSelector } = require("../ai/aiDeltaSelector");

/**
 * Generates CANONICAL OutfitConfig
 * Pattern-safe • Tailor-safe • Production-safe
 */
async function generateOutfitConfig({
  prompt,
  gender,
  garmentType,
  fabric,
}) {
  /* ------------------------------------
     1️⃣ SELECT BASE PATTERN
  -------------------------------------*/
  const basePattern = Object.values(BasePatterns).find(
    (p) =>
      p.gender === gender &&
      p.garmentType === garmentType &&
      p.status === "ACTIVE"
  );

  if (!basePattern) {
    throw new Error(`No base pattern for ${garmentType}`);
  }

  /* ------------------------------------
     2️⃣ RESOLVE ALLOWED DELTAS
  -------------------------------------*/
  let allowedDeltas = basePattern.allowedDeltas
    .map((key) => PatternDeltas[key])
    .filter(Boolean);

  /* ------------------------------------
     3️⃣ APPLY FABRIC CONSTRAINTS
  -------------------------------------*/
  const fabricRules = basePattern.fabricConstraints?.[fabric];
  if (fabricRules) {
    allowedDeltas = allowedDeltas.map((d) => {
      const copy = { ...d };

      if (fabricRules.maxFlare && d.key.includes("flare")) {
        copy.max = Math.min(copy.max, fabricRules.maxFlare);
      }

      if (fabricRules.minEase && d.key.includes("fit")) {
        copy.min = Math.max(copy.min ?? 0, fabricRules.minEase);
      }

      return copy;
    });
  }

  /* ------------------------------------
     4️⃣ AI SELECTS PATTERN DELTAS
  -------------------------------------*/
  const selectedDeltas = await aiDeltaSelector({
    prompt,
    basePattern,
    allowedDeltas,
  });
 
  /* ------------------------------------
     5️⃣ DERIVE BODY FIT (DETERMINISTIC)
  -------------------------------------*/
  const derivedBodyFit =
    selectedDeltas.kurti_fit ||
    selectedDeltas.dress_fit ||
    selectedDeltas.suit_fit ||
    "regular";

  /* ------------------------------------
     6️⃣ BUILD CANONICAL OUTFIT CONFIG
  -------------------------------------*/
  return {
    meta: {
      gender,
      outfitType: garmentType,
      occasion: "custom",
      bodyFit: derivedBodyFit,
    },

    basePatternId: basePattern.id,

    garment: {
      fabric: fabric || "cotton",
    },

    patternDeltas: selectedDeltas,

    accessories: [],
  };
}

module.exports = { generateOutfitConfig };

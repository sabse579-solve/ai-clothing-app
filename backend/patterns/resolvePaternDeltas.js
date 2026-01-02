// backend/patterns/resolvePatternDeltas.js
const { BasePatterns } = require("./basePatterns");

/**
 * Convert pattern deltas into concrete measurement adjustments
 * Tailor-accurate, stitch-safe
 */
function resolvePatternDeltas({
  basePatternId,
  measurements,
  patternDeltas,
}) {
  const basePattern = BasePatterns[basePatternId];
  if (!basePattern) {
    throw new Error("Invalid basePatternId");
  }

  const resolved = { ...measurements };

  for (const [deltaKey, value] of Object.entries(patternDeltas)) {
    switch (deltaKey) {
      /* ================= LEHENGA ================= */
      case "lehenga_length":
        resolved.length = measurements.length + value;
        break;

      case "lehenga_waist_fit":
        if (value === "snug") resolved.waist -= 2;
        if (value === "comfort") resolved.waist += 2;
        break;

      /* ================= KURTI ================= */
      case "kurti_length":
        resolved.length =
          value === "short"
            ? measurements.height * 0.45
            : value === "knee"
            ? measurements.height * 0.55
            : measurements.height * 0.65;
        break;

      case "kurti_fit":
        if (value === "slim") resolved.bust -= 2;
        if (value === "comfort") resolved.bust += 3;
        break;

      /* ================= SUIT ================= */
      case "suit_fit":
        if (value === "slim") resolved.chest -= 3;
        if (value === "tailored") resolved.chest -= 1;
        break;

      default:
        // safe ignore
        break;
    }
  }

  return resolved;
}

module.exports = { resolvePatternDeltas };

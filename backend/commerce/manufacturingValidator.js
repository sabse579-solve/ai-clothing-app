// backend/commerce/manufacturingValidator.js
const Rules = require("./manufacturingRules");

function validateManufacturing(outfitConfig) {
  const { garment, patternDeltas } = outfitConfig;

  if (
    Object.keys(patternDeltas || {}).length >
    Rules.maxDeltasPerOrder
  ) {
    return {
      valid: false,
      reason: "Too many customizations for one garment",
    };
  }

  for (const rule of Rules.forbiddenCombinations) {
    if (
      garment.fabric === rule.fabric &&
      patternDeltas?.[rule.delta] > rule.max
    ) {
      return {
        valid: false,
        reason: `Fabric ${rule.fabric} cannot support this customization`,
      };
    }
  }

  return { valid: true };
}

module.exports = { validateManufacturing };

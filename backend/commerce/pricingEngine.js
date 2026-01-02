// backend/commerce/pricingEngine.js
const PricingRules = require("./pricingRules");

function calculatePrice(outfitConfig) {
  const { meta, garment, patternDeltas, accessories } = outfitConfig;

  let price = PricingRules.basePrices[meta.outfitType] || 0;

  // Fabric multiplier
  const fabricMultiplier =
    PricingRules.fabricMultipliers[garment.fabric] || 1;

  price *= fabricMultiplier;

  // Pattern delta costs
  for (const [key, value] of Object.entries(patternDeltas || {})) {
    const rule = PricingRules.deltaCosts[key];

    if (typeof rule === "function") {
      price += rule(value);
    } else if (typeof rule === "object") {
      price += rule[value] || 0;
    }
  }

  // Accessories
  (accessories || []).forEach((a) => {
    price += PricingRules.accessoryCosts[a] || 0;
  });

  return Math.round(price);
}

module.exports = { calculatePrice };

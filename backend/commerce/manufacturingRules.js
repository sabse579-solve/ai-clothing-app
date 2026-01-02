// backend/commerce/manufacturingRules.js

module.exports = {
  maxDeltasPerOrder: 6,

  forbiddenCombinations: [
    {
      fabric: "chiffon",
      delta: "lehenga_flare",
      max: 3.0,
    },
    {
      fabric: "linen",
      delta: "dress_skirt_volume",
      max: 1.4,
    },
  ],

  measurementLimits: {
    maxBust: 140,
    maxWaist: 130,
    maxHip: 150,
  },

  leadTimeByComplexity: {
    LOW: 5,
    MEDIUM: 8,
    HIGH: 14,
  },
};

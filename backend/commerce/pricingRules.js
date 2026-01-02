// backend/commerce/pricingRules.js

module.exports = {
  basePrices: {
    lehenga: 4500,
    kurti: 1800,
    dress: 3500,
    skirt: 1600,
    suit: 8000,
  },

  fabricMultipliers: {
    cotton: 1.0,
    linen: 1.1,
    silk: 1.4,
    chiffon: 1.35,
    velvet: 1.6,
    wool: 1.5,
    tweed: 1.6,
  },

  deltaCosts: {
    lehenga_flare: (value) => (value > 2.5 ? 800 : 400),
    lehenga_length: (cm) => Math.max(0, cm) * 30,

    kurti_side_slit: (cm) => cm * 20,
    dress_skirt_volume: (ratio) => ratio > 1.5 ? 600 : 300,

    suit_lapel: {
      notch: 0,
      peak: 1200,
      shawl: 1800,
    },

    suit_vent: {
      none: 0,
      single: 600,
      double: 900,
    },
  },

  accessoryCosts: {
    dupatta: 1200,
    belt: 400,
    brooch: 600,
    scarf: 500,
  },

  laborCostPerHour: 350,
};

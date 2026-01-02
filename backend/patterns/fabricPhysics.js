// backend/patterns/fabricPhysics.js
module.exports = {
  silk: {
    stretch: 0.15,
    drape: 0.85,
    stiffness: 0.25,
    weight: 0.4,
    friction: 0.3,
    requiresEase: true,
  },

  cotton: {
    stretch: 0.05,
    drape: 0.55,
    stiffness: 0.45,
    weight: 0.6,
    friction: 0.6,
    requiresEase: true,
  },

  linen: {
    stretch: 0.02,
    drape: 0.35,
    stiffness: 0.65,
    weight: 0.7,
    friction: 0.8,
  },

  chiffon: {
    stretch: 0.2,
    drape: 0.95,
    stiffness: 0.15,
    weight: 0.25,
    requiresLining: true,
  },

  velvet: {
    stretch: 0.03,
    drape: 0.4,
    stiffness: 0.7,
    weight: 0.9,
    friction: 0.9,
  },

  wool: {
    stretch: 0.08,
    drape: 0.6,
    stiffness: 0.55,
    weight: 0.75,
  },
};

// frontend/src/patterns/patternRegistry.js
// 🔒 READ-ONLY mirror of backend tailoring rules

export const BasePatterns = {
  lehenga: {
    id: "lehenga_basic_v1",
    allowedDeltas: [
      "lehenga_length",
      "lehenga_flare",
      "lehenga_waist_fit",
    ],
  },

  kurti: {
    id: "kurti_basic_v1",
    allowedDeltas: [
      "kurti_length",
      "kurti_sleeve",
      "kurti_neckline",
      "kurti_side_slit",
      "kurti_fit",
    ],
  },

  dress: {
    id: "dress_basic_v1",
    allowedDeltas: [
      "dress_length",
      "dress_sleeve",
      "dress_neckline",
      "dress_skirt_volume",
      "dress_fit",
    ],
  },

  skirt: {
    allowedDeltas: [
      "skirt_length",
      "skirt_flare",
      "skirt_slit",
    ],
  },

  suit: {
    allowedDeltas: [
      "suit_fit",
      "suit_lapel",
      "suit_jacket_length",
      "suit_sleeve",
      "suit_vent",
    ],
  },
};

export const PatternDeltas = {
  kurti_sleeve: {
    type: "enum",
    values: ["sleeveless", "short", "three_quarter", "long"],
    mapTo: { target: "garment", key: "sleeve" },
  },

  kurti_neckline: {
    type: "enum",
    values: ["round", "v", "boat", "square"],
    mapTo: { target: "garment", key: "neckline" },
  },

  kurti_length: {
    type: "enum",
    values: ["short", "knee", "calf"],
    mapTo: { target: "garment", key: "length" },
  },

  kurti_fit: {
    type: "enum",
    values: ["slim", "regular", "comfort"],
    mapTo: { target: "meta", key: "bodyFit" },
  },

  lehenga_flare: {
    type: "ratio",
    min: 1.8,
    max: 3.5,
    mapTo: { target: "garment", key: "flare" },
  },

  // You will extend this progressively
};

// backend/patterns/patternDeltas.js
// 🔒 Only stitch-valid deltas allowed

export const PatternDeltas = {
  /* ---------------- LEHENGA ---------------- */
  lehenga_length: {
    key: "lehenga_length",
    type: "numeric",
    unit: "cm",
    min: -10,
    max: 20,
  },

  lehenga_flare: {
    key: "lehenga_flare",
    type: "ratio",
    min: 1.8,
    max: 3.5,
  },

  lehenga_waist_fit: {
    key: "lehenga_waist_fit",
    type: "enum",
    values: ["snug", "regular", "comfort"],
  },

  /* ---------------- KURTI ---------------- */
  kurti_length: {
    key: "kurti_length",
    type: "enum",
    values: ["short", "knee", "calf"],
    ui: { control: "select", label: "Length" }
  },

  kurti_sleeve: {
    key: "kurti_sleeve",
    type: "enum",
    values: ["sleeveless", "short", "three_quarter", "long"],
  },

  kurti_neckline: {
    key: "kurti_neckline",
    type: "enum",
    values: ["round", "v", "boat", "square"],
  },

  kurti_side_slit: {
    key: "kurti_side_slit",
    type: "numeric",
    unit: "cm",
    min: 0,
    max: 40,
  },

  kurti_fit: {
    key: "kurti_fit",
    type: "enum",
    values: ["slim", "regular", "comfort"],
  },

  /* ---------------- DRESS ---------------- */
  dress_length: {
    key: "dress_length",
    type: "enum",
    values: ["knee", "midi", "floor"],
  },

  dress_sleeve: {
    key: "dress_sleeve",
    type: "enum",
    values: ["sleeveless", "short", "long"],
  },

  dress_neckline: {
    key: "dress_neckline",
    type: "enum",
    values: ["round", "v", "square", "sweetheart"],
  },

  dress_skirt_volume: {
    key: "dress_skirt_volume",
    type: "ratio",
    min: 1.0,
    max: 2.0,
  },

  dress_fit: {
    key: "dress_fit",
    type: "enum",
    values: ["slim", "regular"],
  },

  /* ---------------- SKIRT ---------------- */
  skirt_length: {
    key: "skirt_length",
    type: "numeric",
    unit: "cm",
    min: -10,
    max: 25,
  },

  skirt_flare: {
    key: "skirt_flare",
    type: "ratio",
    min: 1.2,
    max: 2.5,
  },

  skirt_slit: {
    key: "skirt_slit",
    type: "numeric",
    unit: "cm",
    min: 0,
    max: 30,
  },

  /* ---------------- MEN SUIT ---------------- */
  suit_fit: {
    key: "suit_fit",
    type: "enum",
    values: ["slim", "regular", "tailored"],
  },

  suit_lapel: {
    key: "suit_lapel",
    type: "enum",
    values: ["notch", "peak", "shawl"],
  },

  suit_jacket_length: {
    key: "suit_jacket_length",
    type: "numeric",
    unit: "cm",
    min: -4,
    max: 6,
  },

  suit_sleeve: {
    key: "suit_sleeve",
    type: "numeric",
    unit: "cm",
    min: -3,
    max: 5,
  },

  suit_vent: {
    key: "suit_vent",
    type: "enum",
    values: ["single", "double", "none"],
  },
};

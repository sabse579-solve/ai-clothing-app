// backend/ai/outfitSchema.js
// Defines EXACTLY what AI is allowed to generate
// ❌ No readymade garments
// ✅ Only stitched / tailored outfits

/* ------------------------------------
   1️⃣ ALLOWED STITCHED OUTFITS
-------------------------------------*/
const ALLOWED_OUTFITS = {
  male: [
    "Kurta",
    "Sherwani",
    "Bandhgala",
    "Achkan",
    "IndoWestern",
    "TailoredSuit",
  ],
  female: [
    "Lehenga",
    "Gown",
    "Anarkali",
    "KurtaSet",
    "SareeBlouseSet",
    "TailoredDress",
  ],
};

/* ------------------------------------
   2️⃣ BODY FIT (HOW CLOSE TO BODY)
-------------------------------------*/
const ALLOWED_BODY_FITS = [
  "slim",
  "regular",
  "relaxed",
  "tailored",
  "comfort",
];

/* ------------------------------------
   3️⃣ GARMENT FIT (SILHOUETTE / CUT)
-------------------------------------*/
const ALLOWED_GARMENT_FITS = [
  // Generic tailored
  "regular-fit",
  "tailored-fit",
  "straight-fit",
  "comfort-fit",

  // Ethnic silhouettes
  "anarkali-fit",
  "flared-lehenga-fit",
  "layered-lehenga-fit",
  "sharara-fit",
  "gharara-fit",

  // Structured dresses
  "mermaid-fit",
  "trumpet-fit",
  "ball-gown-fit",
];

/* ------------------------------------
   4️⃣ FINAL OUTFIT SCHEMA (CANONICAL)
-------------------------------------*/
const OUTFIT_SCHEMA = {
  gender: ["male", "female"],

  // 🔒 Must match ALLOWED_OUTFITS[gender]
  outfitType: "string",

  // 🔑 CORE FIT LOGIC
  bodyFit: ALLOWED_BODY_FITS,
  garmentFit: ALLOWED_GARMENT_FITS,

  // 🎨 Visual customizations
  color: "hex",

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
    "solid",
    "embroidered",
    "printed",
    "jacquard",
    "textured",
    "zari",
    "block print",
    "bandhani",
    "ikat",
  ],

  sleeve: [
    "sleeveless",
    "short",
    "threeQuarter",
    "long",
  ],

  neckline: [
    "round",
    "v",
    "square",
    "boat",
    "collar",
  ],

  length: [
    "short",
    "regular",
    "long",
    "full",
  ],

  accessories: [
    "dupatta",
    "belt",
    "buttons",
    "brooch",
    "scarf",
  ],

  occasion: [
    "wedding",
    "festive",
    "casual",
    "party",
    "formal",
  ],
};

/* ------------------------------------
   EXPORT (COMMONJS)
-------------------------------------*/
module.exports = {
  ALLOWED_OUTFITS,
  ALLOWED_BODY_FITS,
  ALLOWED_GARMENT_FITS,
  OUTFIT_SCHEMA,
};


// backend/patterns/basePatterns.js
// 🔒 Canonical tailoring base blocks (stitch-safe)

export const BasePatterns = {
  /* =====================================================
     A️⃣ WOMEN — LEHENGA
  ===================================================== */
  lehenga_basic_v1: {
    id: "lehenga_basic_v1",
    garmentType: "lehenga",
    gender: "female",

    anchors: {
      waist: "circumference",
      hip: "circumference",
      length: "vertical",
    },

    requiredMeasurements: ["waist", "hips", "height"],

    easeAllowance: {
      waist: 4,
      hips: 6,
    },

    allowedDeltas: [
      "lehenga_length",
      "lehenga_flare",
      "lehenga_waist_fit",
    ],

    fabricConstraints: {
      silk: { minEase: 4, maxFlare: 3.0 },
      velvet: { minEase: 5, maxFlare: 2.2 },
      georgette: { minEase: 3, maxFlare: 3.5 },
    },

    approvedBy: "MasterTailor_v1",
    status: "ACTIVE",
  },

  /* =====================================================
     B️⃣ WOMEN — KURTI / KURTA
  ===================================================== */
  kurti_basic_v1: {
    id: "kurti_basic_v1",
    garmentType: "kurti",
    gender: "female",

    anchors: {
      bust: "circumference",
      waist: "circumference",
      hips: "circumference",
      shoulders: "horizontal",
      armhole: "curve",
      length: "vertical",
    },

    requiredMeasurements: [
      "bust",
      "waist",
      "hips",
      "shoulders",
      "arm_length",
      "height",
    ],

    easeAllowance: {
      bust: 6,
      waist: 5,
      hips: 6,
    },

    allowedDeltas: [
      "kurti_length",
      "kurti_sleeve",
      "kurti_neckline",
      "kurti_side_slit",
      "kurti_fit",
    ],

    fabricConstraints: {
      cotton: { minEase: 6 },
      linen: { minEase: 7 },
      silk: { minEase: 5 },
    },

    approvedBy: "MasterTailor_v1",
    status: "ACTIVE",
  },

  /* =====================================================
     C️⃣ WOMEN — GOWN / STITCHED DRESS
  ===================================================== */
  dress_basic_v1: {
    id: "dress_basic_v1",
    garmentType: "dress",
    gender: "female",

    anchors: {
      bust: "circumference",
      waist: "circumference",
      hips: "circumference",
      shoulders: "horizontal",
      length: "vertical",
    },

    requiredMeasurements: [
      "bust",
      "waist",
      "hips",
      "shoulders",
      "arm_length",
      "height",
    ],

    easeAllowance: {
      bust: 5,
      waist: 4,
      hips: 5,
    },

    allowedDeltas: [
      "dress_length",
      "dress_sleeve",
      "dress_neckline",
      "dress_skirt_volume",
      "dress_fit",
    ],

    fabricConstraints: {
      satin: { minEase: 4 },
      chiffon: { minEase: 5, requiresLining: true },
      velvet: { minEase: 6, maxVolume: 1.6 },
    },

    approvedBy: "MasterTailor_v1",
    status: "ACTIVE",
  },

  /* =====================================================
     D️⃣ WOMEN — SKIRT (NON-LEHENGA)
  ===================================================== */
  skirt_basic_v1: {
    id: "skirt_basic_v1",
    garmentType: "skirt",
    gender: "female",

    anchors: {
      waist: "circumference",
      hips: "circumference",
      length: "vertical",
    },

    requiredMeasurements: ["waist", "hips", "height"],

    easeAllowance: {
      waist: 3,
      hips: 4,
    },

    allowedDeltas: [
      "skirt_length",
      "skirt_flare",
      "skirt_slit",
    ],

    approvedBy: "MasterTailor_v1",
    status: "ACTIVE",
  },

  /* =====================================================
     E️⃣ MEN — SUIT (ALL TYPES)
  ===================================================== */
  mens_suit_basic_v1: {
    id: "mens_suit_basic_v1",
    garmentType: "suit",
    gender: "male",

    anchors: {
      chest: "circumference",
      waist: "circumference",
      hips: "circumference",
      shoulders: "horizontal",
      sleeve: "vertical",
      jacketLength: "vertical",
    },

    requiredMeasurements: [
      "chest",
      "waist",
      "hips",
      "shoulders",
      "arm_length",
      "height",
    ],

    easeAllowance: {
      chest: 6,
      waist: 4,
      hips: 5,
    },

    allowedDeltas: [
      "suit_fit",
      "suit_lapel",
      "suit_jacket_length",
      "suit_sleeve",
      "suit_vent",
    ],

    fabricConstraints: {
      wool: { minEase: 6 },
      tweed: { minEase: 7 },
      linen: { minEase: 8 },
    },

    approvedBy: "MasterTailor_v1",
    status: "ACTIVE",
  },
};

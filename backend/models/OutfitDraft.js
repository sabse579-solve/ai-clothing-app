const mongoose = require("mongoose");

/* =====================================================
   OUTFIT DRAFT — SINGLE SOURCE OF TRUTH
===================================================== */
const OutfitDraftSchema = new mongoose.Schema(
  {
    /* ------------------------------------
       USER
    -------------------------------------*/
    userId: {
      type: String,
      required: true,
      index: true,
    },

    /* ------------------------------------
       CONSENT SNAPSHOT (LEGAL)
    -------------------------------------*/
    consent: {
      accepted: { type: Boolean, default: false },
      acceptedAt: Date,
      version: String, // privacy policy version
    },

    /* ------------------------------------
       AVATAR CONTEXT
    -------------------------------------*/
    avatar: {
      avatarUrl: String,
      gender: {
        type: String,
        enum: ["male", "female"],
      },
      measurements: Object, // frozen snapshot
      scale: {
        x: Number,
        y: Number,
        z: Number,
      },
    },

    /* ------------------------------------
       CANONICAL OUTFIT CONFIG (🔥 CORE)
    -------------------------------------*/
    outfitConfig: {
      meta: {
        gender: { type: String, enum: ["male", "female"] },
        outfitType: String, // lehenga, gown, suit
        occasion: String,
        bodyFit: String,
      },

      garment: {
        color: String,
        fabric: String,
        pattern: String,
        sleeve: String,
        neckline: String,
        length: String,
      },

      accessories: [String],

      imagePrompt: String, // AI reproducibility
    },

    /* ------------------------------------
       2D WORLD (PHOTO-REAL)
    -------------------------------------*/
    visuals2D: {
      designImage: String,   // AI generated design
      tryOnImage: String,    // 2D try-on result
    },

    /* ------------------------------------
       3D WORLD (AVATAR)
    -------------------------------------*/
    visuals3D: {
      applied: { type: Boolean, default: false },
      lastAppliedAt: Date,
    },

    /* ------------------------------------
       PRICING (TAILOR READY)
    -------------------------------------*/
    pricing: {
      basePrice: Number,
      fabricCost: Number,
      tailoringCost: Number,
      tax: Number,
      total: Number,
      currency: { type: String, default: "INR" },
    },

    /* ------------------------------------
       STATUS FLOW
    -------------------------------------*/
    status: {
      type: String,
      enum: [
        "DRAFT",        // customizing
        "FINALIZED",    // user locked design
        "ORDERED",      // payment done
        "IN_PRODUCTION",
        "DELIVERED",
        "CANCELLED",
      ],
      default: "DRAFT",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("OutfitDraft", OutfitDraftSchema);

// backend/routes/patternRoutes.js
const express = require("express");
const router = express.Router();

const { BasePatterns } = require("../patterns/basePatterns");
const { PatternDeltas } = require("../patterns/patternDeltas");
const {FabricPhysics }= require("../patterns/fabricPhysics");


/**
 * GET /api/patterns/allowed
 * Query params:
 *  - garmentType (lehenga | kurti | dress | skirt | suit)
 *  - gender (female | male)
 *  - fabric (optional)
 */
router.get("/allowed", (req, res) => {
  try {
    const { garmentType, gender, fabric } = req.query;

    if (!garmentType || !gender) {
      return res.status(400).json({
        error: "garmentType and gender are required",
      });
    }

    /* ------------------------------------
       1️⃣ SELECT BASE PATTERN
    -------------------------------------*/
    const basePattern = Object.values(BasePatterns).find(
      (p) =>
        p.garmentType === garmentType &&
        p.gender === gender &&
        p.status === "ACTIVE"
    );

    if (!basePattern) {
      return res.status(404).json({
        error: "No active base pattern found",
      });
    }

    /* ------------------------------------
       2️⃣ RESOLVE ALLOWED DELTAS
    -------------------------------------*/
    let allowedDeltas = basePattern.allowedDeltas
      .map((deltaKey) => PatternDeltas[deltaKey])
      .filter(Boolean);

    /* ------------------------------------
       3️⃣ APPLY FABRIC CONSTRAINTS
    -------------------------------------*/
    if (fabric && basePattern.fabricConstraints?.[fabric]) {
      const constraints = basePattern.fabricConstraints[fabric];

      allowedDeltas = allowedDeltas.map((delta) => {
        const constrained = { ...delta };

        if (constraints.maxFlare && delta.key.includes("flare")) {
          constrained.max = Math.min(delta.max, constraints.maxFlare);
        }

        if (constraints.maxVolume && delta.key.includes("volume")) {
          constrained.max = Math.min(delta.max, constraints.maxVolume);
        }

        return constrained;
      });
    }

    /* ------------------------------------
       4️⃣ UI-SAFE RESPONSE
    -------------------------------------*/
    allowedDeltas = allowedDeltas.map(d => Object.freeze(d));

    return res.json({
      basePatternId: basePattern.id,
      garmentType: basePattern.garmentType,
      requiredMeasurements: basePattern.requiredMeasurements,
      fabricPhysics: FabricPhysics[fabric] || null,
      deltas: allowedDeltas,
    });
  } catch (err) {
    console.error("❌ patternRoutes error:", err);
    res.status(500).json({ error: "Pattern resolution failed" });
  }
});

module.exports = router;

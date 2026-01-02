// backend/routes/avatarRoutes.js
const express = require("express");
const router = express.Router();
const avatar = require("../avatar");

const {
  snapshotExists,
} = require("../services/avatarSnapshotService");

const {
  getCachedScale,
} = require("../services/avatarScaleService");


/* =====================================================
   1️⃣ GET FINAL AVATAR (GLB URL ONLY)
   GET /api/avatar/my-avatar?userId=xxx
===================================================== */
router.get("/my-avatar", async (req, res) => {
  try {
    const userId = req.query.userId || req.headers["x-user-id"];

    if (!userId) {
      return res.status(400).json({ error: "userId is required" });
    }

    // Must return:
    // { avatarURL: "https://models.readyplayer.me/xxxx.glb" }
    const avatarData = await avatar.avatarGenerator.getFinalAvatar(userId);

    if (!avatarData?.avatarURL) {
      return res.json({ avatarURL: null });
    }

    return res.json(avatarData);

  } catch (err) {
    console.error("❌ Get avatar error:", err);
    return res.status(500).json({ error: "Failed to fetch avatar" });
  }
});

/* =====================================================
   2️⃣ SAVE BODY MEASUREMENTS
   POST /api/avatar/:userId/create
===================================================== */
router.post("/:userId/create", async (req, res) => {
  try {
    const { userId } = req.params;

    const normalized = {
      userId,
      height: req.body.height,
      weight: req.body.weight,
      chest: req.body.chest,
      waist: req.body.waist,
      hips: req.body.hips,
      shoulders: req.body.shoulders,
      armLength: req.body.arm_length,
      legLength: req.body.inseam,
    };

    const UserMeasurement = require("../models/UserMeasurement");

    await UserMeasurement.findOneAndUpdate(
      { userId },
      normalized,
      { upsert: true, new: true }
    );

    await avatar.measurementProcessor.processMeasurements(
      userId,
      normalized
    );

    return res.json({
      success: true,
      message: "Measurements saved successfully",
    });

  } catch (err) {
    console.error("❌ Measurement save error:", err);
    return res.status(500).json({ error: "Failed to save measurements" });
  }
});

/* =====================================================
   3️⃣ UPLOAD PHOTOS (NO AVATAR CREATION HERE)
   POST /api/avatar/:userId/upload-photos
===================================================== */
router.post("/:userId/upload-photos", async (req, res) => {
  try {
    const { userId } = req.params;

    if (!req.files || !req.files.front_photo) {
      return res.status(400).json({ error: "Front photo missing" });
    }

    const front = req.files.front_photo;
    const side = req.files.side_photo || null;

    console.log("📸 Photos uploaded for:", userId);

    await avatar.photoProcessor.processPhotos(userId, front, side);

    // ❌ DO NOT generate avatar here
    // RPM avatar comes ONLY from frontend iframe

    return res.json({
      success: true,
      message: "Photos uploaded successfully",
    });

  } catch (err) {
    console.error("❌ Photo upload error:", err);
    return res.status(500).json({ error: "Photo upload failed" });
  }
});

/* =====================================================
   4️⃣ SAVE READY PLAYER ME AVATAR URL
   POST /api/avatar/rpm
===================================================== */
router.post("/rpm", async (req, res) => {
  try {
    const { userId, avatarUrl } = req.body;

    if (!userId || !avatarUrl) {
      return res.status(400).json({
        error: "userId and avatarUrl are required",
      });
    }

    // avatarUrl MUST be:
    // https://models.readyplayer.me/xxxxx.glb
    if (!avatarUrl.endsWith(".glb")) {
      return res.status(400).json({
        error: "Invalid avatar URL (must be .glb)",
      });
    }

    const result = await avatar.avatarGenerator.saveRPMAvatar(
      userId,
      avatarUrl
    );

    return res.json({
      success: true,
      avatarURL: avatarUrl,
    });

  } catch (err) {
    console.error("❌ RPM save error:", err);
    return res.status(500).json({ error: "Failed to save RPM avatar" });
  }
});

/* =====================================================
   5️⃣ AVATAR STATUS
   GET /api/avatar/:userId/status
===================================================== */
router.get("/:userId/status", async (req, res) => {
  try {
    const { userId } = req.params;

    const status = await avatar.avatarGenerator.getStatus(userId);

    /* ------------------------------------
       1️⃣ GENDER RESOLUTION
    -------------------------------------*/
    const gender = status?.gender || "female";

    /* ------------------------------------
       2️⃣ BODY FIT (FUTURE SAFE)
    -------------------------------------*/
    const bodyFit = status?.bodyFit || "regular";

    /* ------------------------------------
       3️⃣ CHECK CACHED SNAPSHOT (FAST PATH)
    -------------------------------------*/
    if (snapshotExists(userId, gender, bodyFit)) {
      const scaleCache = await getCachedScale(userId, gender, bodyFit);

      return res.json({
        ready: true,
        cached: true,
        gender,
        bodyFit,
        avatarURL: `http://localhost:5000/avatars/cached/${userId}/${gender}_${bodyFit}.glb`,
        preview_url: status?.preview_url || null,
        scaleCache: scaleCache?.scale || null,
      });
    }

    /* ------------------------------------
       4️⃣ FALLBACK: RPM → BASE AVATAR
    -------------------------------------*/
    const baseAvatarUrl =
      gender === "male"
        ? "http://localhost:5000/avatars/base/male.glb"
        : "http://localhost:5000/avatars/base/female.glb";

    const finalAvatarUrl = status?.avatarURL || baseAvatarUrl;

    /* ------------------------------------
       5️⃣ OPTIONAL SCALE CACHE (RPM CASE)
    -------------------------------------*/
    const scaleCache = await getCachedScale(userId, gender, bodyFit);

    return res.json({
      ready: !!status?.avatarURL,
      cached: false,
      gender,
      bodyFit,
      avatarURL: finalAvatarUrl,
      preview_url: status?.preview_url || null,
      scaleCache: scaleCache?.scale || null,
    });
  } catch (err) {
    console.error("❌ Status error:", err);
    return res.status(500).json({ error: "Failed to fetch status" });
  }
});


/* =====================================================
   6️⃣ SAVE AVATAR SCALE CACHE
   POST /api/avatar/:userId/save-scale
===================================================== */
router.post("/:userId/save-scale", async (req, res) => {
  try {
    const { userId } = req.params;
    const { gender, bodyFit, scale } = req.body;

    if (!scale || !scale.x || !scale.y || !scale.z) {
      return res.status(400).json({ error: "Invalid scale data" });
    }

    const { saveScale } = require("../services/avatarScaleService");

    await saveScale(
      userId,
      gender || "female",
      bodyFit || "regular",
      scale
    );

    return res.json({ success: true });
  } catch (err) {
    console.error("❌ Save scale error:", err);
    return res.status(500).json({ error: "Failed to save scale" });
  }
});




module.exports = router;

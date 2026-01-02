// backend/avatar/avatarGenerator.js
const fs = require("fs");
const path = require("path");
const rpm = require("./readyPlayerMe");
const { getCachedScale } = require("../services/avatarScaleService");


const DATA_DIR = path.join(__dirname, "data");
const FALLBACK_AVATAR_URL = "/avatars/fallback-avatar.glb";

// Ensure data folder exists
if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });

/* ---------------------------------------
   Helpers
----------------------------------------*/
function readUserFile(userId) {
  const file = path.join(DATA_DIR, `${userId}.json`);
  if (!fs.existsSync(file)) return null;

  try {
    return JSON.parse(fs.readFileSync(file, "utf8"));
  } catch (err) {
    console.error("❌ Error parsing user data:", err);
    return null;
  }
}

function writeUserFile(userId, data) {
  const file = path.join(DATA_DIR, `${userId}.json`);
  fs.writeFileSync(file, JSON.stringify(data, null, 2));
}

/* ---------------------------------------
   finalizeAvatar(userId)
   (NO RPM generation here)
----------------------------------------*/
module.exports.generateAvatar = async (userId) => {
  const userData = readUserFile(userId);

  if (!userData) {
    throw new Error("User data not found.");
  }

  try {
    // ----------------------------
    // 🔄 STATE → GENERATING
    // ----------------------------
    userData.status = "AVATAR_GENERATING";
    userData.updatedAt = new Date();
    writeUserFile(userId, userData);

    // ----------------------------
    // ✅ USE RPM AVATAR IF PRESENT
    // ----------------------------
    let avatarURL = null;

    if (userData.avatarURL) {
      avatarURL = await rpm.useRPMAvatar({
        avatarUrl: userData.avatarURL,
      });
    }

    // ----------------------------
    // 🛟 FALLBACK IF NEEDED
    // ----------------------------
    if (!avatarURL) {
      avatarURL = await rpm.getFallbackAvatar();
    }

    // ----------------------------
    // ✅ AVATAR READY
    // ----------------------------
    userData.status = "AVATAR_READY";
    userData.avatarURL = avatarURL;
    userData.preview_url = avatarURL;
    userData.updatedAt = new Date();
    delete userData.error;

    writeUserFile(userId, userData);

    return { success: true, avatarURL };

  } catch (err) {
    console.error("❌ generateAvatar error:", err.message);

    userData.status = "ERROR";
    userData.error = err.message;
    userData.updatedAt = new Date();
    writeUserFile(userId, userData);

    throw err;
  }
};

/* ---------------------------------------
   saveRPMAvatar(userId, avatarUrl)
   (called from RPM iframe route)
----------------------------------------*/
module.exports.saveRPMAvatar = async (userId, avatarUrl) => {
  const userData = readUserFile(userId) || {};

  userData.avatarURL = avatarUrl;
  userData.status = "AVATAR_UPLOADED";
  userData.updatedAt = new Date();

  writeUserFile(userId, userData);

  return { success: true, avatarURL: avatarUrl };
};

/* ---------------------------------------
   getStatus(userId)
----------------------------------------*/
module.exports.getStatus = async (userId) => {
  const userData = readUserFile(userId);

  if (!userData) {
    return { status: "NOT_FOUND" };
  }

  const gender = userData.gender || "female";
  const bodyFit = userData.bodyFit || "regular";

  const scaleCache = await getCachedScale(userId, gender, bodyFit);

  return {
    status: userData.status || "NOT_STARTED",
    preview_url: userData.preview_url || FALLBACK_AVATAR_URL,
    avatarURL: userData.avatarURL || FALLBACK_AVATAR_URL,
    scale: scaleCache?.scale || { x: 1, y: 1, z: 1 },
    error: userData.error || null,
  };
};


/* ---------------------------------------
   getFinalAvatar(userId)
----------------------------------------*/
module.exports.getFinalAvatar = async (userId) => {
  const userData = readUserFile(userId);

  return {
    avatarURL: userData?.avatarURL || FALLBACK_AVATAR_URL,
  };
};


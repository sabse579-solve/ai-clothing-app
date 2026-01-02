// backend/avatar/photoProcessor.js
const fs = require("fs");
const path = require("path");

const DATA_DIR = path.join(__dirname, "data");
const PHOTO_DIR = path.join(__dirname, "photos");

// Ensure folders exist
if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR);
if (!fs.existsSync(PHOTO_DIR)) fs.mkdirSync(PHOTO_DIR);

module.exports.processPhotos = async (userId, frontPhoto, sidePhoto) => {
  try {
    // ----------------------------
    // 1️⃣ Create user photo folder
    // ----------------------------
    const userDir = path.join(PHOTO_DIR, userId);
    if (!fs.existsSync(userDir)) fs.mkdirSync(userDir, { recursive: true });

    let savedPhotos = {};

    // ----------------------------
    // 2️⃣ Save FRONT photo
    // ----------------------------
    if (frontPhoto) {
      const frontPath = path.join(userDir, "front.jpg");
      fs.writeFileSync(frontPath, frontPhoto.data);

      savedPhotos.front = frontPath;
    }

    // ----------------------------
    // 3️⃣ Save SIDE photo (optional)
    // ----------------------------
    if (sidePhoto) {
      const sidePath = path.join(userDir, "side.jpg");
      fs.writeFileSync(sidePath, sidePhoto.data);

      savedPhotos.side = sidePath;
    }

    // ----------------------------
    // 4️⃣ Convert local paths → URLs
    // ----------------------------
    const publicPhotos = {};
    if (savedPhotos.front) {
      publicPhotos.front = `/avatar/photos/${userId}/front.jpg`;
    }
    if (savedPhotos.side) {
      publicPhotos.side = `/avatar/photos/${userId}/side.jpg`;
    }

    // ----------------------------
    // 5️⃣ Update avatar data JSON
    // ----------------------------
    const dataFile = path.join(DATA_DIR, `${userId}.json`);

    let existing = {};
    if (fs.existsSync(dataFile)) {
      try {
        existing = JSON.parse(fs.readFileSync(dataFile, "utf8"));
      } catch (err) {
        console.error("JSON parse error:", err);
      }
    }

    const updated = {
      ...existing,
      photos: publicPhotos,
      preview_url: publicPhotos.front || null, // AvatarProgress uses this
      status: "PHOTOS_UPLOADED",
      updatedAt: new Date(),
    };

    fs.writeFileSync(dataFile, JSON.stringify(updated, null, 2));

    // ----------------------------
    // 6️⃣ Return values for avatarGenerator
    // ----------------------------
    return {
      photos: publicPhotos,
      faceEmbedding: null,
      skinTone: null,
      preview_url: publicPhotos.front || null,
    };

  } catch (err) {
    console.error("PhotoProcessor error:", err);
    throw err;
  }
};

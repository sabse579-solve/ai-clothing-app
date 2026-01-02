// backend/tryon/applyTryon.js

/**
 * MVP Try-On
 * For now: return garment image over avatar preview
 * (Real VTO models come later)
 */
module.exports = async function applyTryon(avatarImage, garmentImage, scale) {
  // 🔴 REAL AI VTO NOT YET WIRED
  // This is a SAFE MVP passthrough

  if (!avatarImage || !garmentImage) {
    throw new Error("Missing avatar or garment image");
  }

  // For MVP: just return garment image
  // (You already render 2D preview correctly)
   return {
    image: garmentImage,
    scale,
  };

};


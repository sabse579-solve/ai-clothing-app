// backend/services/avatarScaleService.js
// Handles caching of avatar scale to avoid re-scaling every load

const AvatarScaleCache = require("../models/AvatarScaleCache");

/**
 * Save scale for a user (after applyMeasurements)
 */
async function saveScale(userId, gender, bodyFit, scale) {
  if (!userId || !scale) return;

  return AvatarScaleCache.findOneAndUpdate(
    { userId, gender, bodyFit },
    {
      userId,
      gender,
      bodyFit,
      scale,
      updatedAt: new Date(),
    },
    { upsert: true, new: true }
  );
}

/**
 * Fetch cached scale (if exists)
 */
async function getCachedScale(userId, gender, bodyFit) {
  if (!userId) return null;

  return AvatarScaleCache.findOne({
    userId,
    gender,
    bodyFit,
  });
}

module.exports = {
  saveScale,
  getCachedScale,
};

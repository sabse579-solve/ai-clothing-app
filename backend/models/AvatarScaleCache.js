const mongoose = require("mongoose");

const AvatarScaleCacheSchema = new mongoose.Schema({
  userId: { type: String, required: true, index: true },
  gender: { type: String, required: true },
  bodyFit: { type: String, default: "regular" },

  scale: {
    x: Number,
    y: Number,
    z: Number,
  },

  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model(
  "AvatarScaleCache",
  AvatarScaleCacheSchema
);

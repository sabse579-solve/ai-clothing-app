const mongoose = require("mongoose");

const AvatarSchema = new mongoose.Schema({
  userId: String,
  avatarURL: String,
  measurements: Object,
  photos: Array,
});

module.exports = mongoose.model("Avatar", AvatarSchema);

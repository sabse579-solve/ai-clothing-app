const mongoose = require("mongoose");

const OutfitDesignSchema = new mongoose.Schema({
  userId: String,
  prompt: String,
  images: Array,
  metadata: Object,
});

module.exports = mongoose.model("OutfitDesign", OutfitDesignSchema);

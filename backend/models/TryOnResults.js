const mongoose = require("mongoose");

const TryOnSchema = new mongoose.Schema({
  userId: String,
  avatarImage: String,
  outfitImage: String,
  tryonResult: String,
});

module.exports = mongoose.model("TryOnResult", TryOnSchema);

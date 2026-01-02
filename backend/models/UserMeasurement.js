const mongoose = require("mongoose");

const UserMeasurementSchema = new mongoose.Schema({
  userId: String,
  height: Number,
  weight: Number,
  chest: Number,
  waist: Number,
  hips: Number,
  shoulders: Number,
  armLength: Number,
  legLength: Number,
});

module.exports = mongoose.model("UserMeasurement", UserMeasurementSchema);

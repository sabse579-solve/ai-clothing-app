// backend/avatar/measurementProcessor.js
const fs = require("fs");
const path = require("path");

const DATA_DIR = path.join(__dirname, "data");
if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });

module.exports.processMeasurements = async (userId, data) => {
  try {
    const filePath = path.join(DATA_DIR, `${userId}.json`);

    // Load existing user file if it exists
    let existing = {};
    if (fs.existsSync(filePath)) {
      try {
        existing = JSON.parse(fs.readFileSync(filePath, "utf8"));
      } catch (err) {
        console.error("Failed to parse existing user file:", err);
      }
    }

    // Extract measurement fields
    const {
      height,
      weight,
      chest,
      waist,
      hips,
      shoulders,
      armLength,
      legLength,
    } = data;

    const updated = {
      ...existing, // keep previously saved photos or status
      measurements: {
        height,
        weight,
        chest,
        waist,
        hips,
        shoulders,
        armLength,
        legLength,
      },
      status: "MEASUREMENTS_SAVED",
      updatedAt: new Date(),
    };

    fs.writeFileSync(filePath, JSON.stringify(updated, null, 2));

    return updated;
  } catch (err) {
    console.error("MeasurementProcessor error:", err);
    throw err;
  }
};

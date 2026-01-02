// backend/customization/colorController.js

module.exports.changeColor = async (req, res) => {
  try {
    const { color } = req.body;

    if (!color) {
      return res.status(400).json({ error: "color is required" });
    }

    // Optional: persist color to DB later
    return res.status(200).json({
      success: true,
      color
    });

  } catch (err) {
    console.error("Color update failed:", err);
    res.status(500).json({ error: "Color update failed" });
  }
};

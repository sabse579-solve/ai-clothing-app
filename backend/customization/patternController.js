// backend/customization/patternController.js

module.exports.changePattern = async (req, res) => {
  try {
    const { pattern } = req.body;

    if (!pattern) {
      return res.status(400).json({ error: "pattern is required" });
    }

    // Optional: persist pattern choice later
    return res.status(200).json({
      success: true,
      pattern
    });

  } catch (err) {
    console.error("Pattern update failed:", err);
    res.status(500).json({ error: "Pattern update failed" });
  }
};

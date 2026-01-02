// backend/customization/fitAdjuster.js

/**
 * Fit metadata controller
 * Fit types: tight | regular | loose | oversized
 */

module.exports.adjustFit = async (req, res) => {
  try {
    const { fitType } = req.body;

    if (!fitType) {
      return res.status(400).json({ error: "fitType is required" });
    }

    return res.status(200).json({
      success: true,
      fitType
    });

  } catch (err) {
    console.error("Fit update failed:", err);
    res.status(500).json({ error: "Fit update failed" });
  }
};

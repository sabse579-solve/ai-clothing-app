// backend/customization/sleeveController.js

/**
 * Sleeve metadata controller
 * sleeveless | short | long | puff | bell | etc.
 */

module.exports.changeSleeve = async (req, res) => {
  try {
    const { sleeveType } = req.body;

    if (!sleeveType) {
      return res.status(400).json({ error: "sleeveType is required" });
    }

    return res.status(200).json({
      success: true,
      sleeveType
    });

  } catch (err) {
    console.error("Sleeve update failed:", err);
    res.status(500).json({ error: "Sleeve update failed" });
  }
};

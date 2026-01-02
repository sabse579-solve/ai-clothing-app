// backend/customization/accessoriesController.js

/**
 * Accessories metadata controller
 * necklace | bag | belt | watch | earrings | etc.
 */

module.exports.updateAccessories = async (req, res) => {
  try {
    const { accessory } = req.body;

    if (!accessory) {
      return res.status(400).json({ error: "accessory is required" });
    }

    return res.status(200).json({
      success: true,
      accessory
    });

  } catch (err) {
    console.error("Accessories update failed:", err);
    res.status(500).json({ error: "Accessories update failed" });
  }
};

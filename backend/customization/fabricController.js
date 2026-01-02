// backend/customization/fabricController.js

module.exports.changeFabric = async (req, res) => {
  try {
    const { fabric, pattern } = req.body;

    if (!fabric) {
      return res.status(400).json({ error: "fabric is required" });
    }

    return res.status(200).json({
      success: true,
      fabric,
      pattern: pattern || null
    });

  } catch (err) {
    console.error("Fabric update failed:", err);
    res.status(500).json({ error: "Fabric update failed" });
  }
};

// backend/customization/lengthController.js

/**
 * Length metadata controller
 * crop | mini | mid | full | maxi | etc.
 */

module.exports.changeLength = async (req, res) => {
  try {
    const { lengthType } = req.body;

    if (!lengthType) {
      return res.status(400).json({ error: "lengthType is required" });
    }

    return res.status(200).json({
      success: true,
      lengthType
    });

  } catch (err) {
    console.error("Length update failed:", err);
    res.status(500).json({ error: "Length update failed" });
  }
};

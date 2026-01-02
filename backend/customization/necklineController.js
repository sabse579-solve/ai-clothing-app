// backend/customization/necklineController.js

/**
 * Neckline metadata controller
 * v-neck | round | square | boat | off-shoulder | collar
 */

module.exports.changeNeckline = async (req, res) => {
  try {
    const { necklineType } = req.body;

    if (!necklineType) {
      return res.status(400).json({ error: "necklineType is required" });
    }

    return res.status(200).json({
      success: true,
      necklineType
    });

  } catch (err) {
    console.error("Neckline update failed:", err);
    res.status(500).json({ error: "Neckline update failed" });
  }
};

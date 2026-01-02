import OutfitDraft from "../models/OutfitDraft.js";

/* ----------------------------------
   SAVE / UPDATE DRAFT
---------------------------------- */
export const saveDraft = async (req, res) => {
  try {
    const data = req.body;

    const draft = await OutfitDraft.findOneAndUpdate(
      { userId: data.userId, status: "DRAFT" },
      data,
      { upsert: true, new: true }
    );

    res.json({ success: true, draftId: draft._id });
  } catch (err) {
    console.error("Save draft error:", err);
    res.status(500).json({ error: "Failed to save draft" });
  }
};

/* ----------------------------------
   GET USER DRAFT
---------------------------------- */
export const getDraft = async (req, res) => {
  try {
    const draft = await OutfitDraft.findOne({
      userId: req.params.userId,
      status: "DRAFT",
    });

    res.json(draft);
  } catch (err) {
    console.error("Get draft error:", err);
    res.status(500).json({ error: "Failed to load draft" });
  }
};

/* ----------------------------------
   PLACE ORDER
---------------------------------- */
export const placeOrder = async (req, res) => {
  try {
    await OutfitDraft.findByIdAndUpdate(req.params.draftId, {
      status: "ORDERED",
    });

    res.json({ success: true });
  } catch (err) {
    console.error("Place order error:", err);
    res.status(500).json({ error: "Failed to place order" });
  }
};

export default {
  saveDraft,
  getDraft,
  placeOrder,
};

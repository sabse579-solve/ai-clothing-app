// controllers/userController.js
import User from "../models/User.js";

export const getMe = async (req, res) => {
  const user = await User.findOne({ userId: req.userId }).select("-passwordHash");
  res.json(user);
};

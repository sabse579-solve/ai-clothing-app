import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  prompt: String,
  imageUrl: String,
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Product", ProductSchema);


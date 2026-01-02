import Product from "../models/Product.js";
import Order from "../models/Order.js";

export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: "Could not fetch products" });
  }
};

export const createOrder = async (req, res) => {
  try {
    const { productId, size, quantity, customerName, address } = req.body;

    const order = await Order.create({
      productId,
      size,
      quantity,
      customerName,
      address,
    });

    res.json({ success: true, order });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Order creation failed" });
  }
};

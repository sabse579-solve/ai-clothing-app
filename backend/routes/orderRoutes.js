// backend/routes/orderRoutes.js
const express = require("express");
const router = express.Router();

const orderController = require("../commerce/orderController");
const { calculatePrice } = require("../commerce/pricingEngine");
const { validateManufacturing } = require("../commerce/manufacturingValidator");

router.post("/quote", (req, res) => {
  const { outfitConfig } = req.body;

  const validation = validateManufacturing(outfitConfig);
  if (!validation.valid) {
    return res.status(400).json(validation);
  }

  const price = calculatePrice(outfitConfig);

  res.json({
    price,
    currency: "INR",
    manufacturable: true,
  });
});


// 1️⃣ Create local order
router.post("/create", orderController.createOrder);

// 2️⃣ Create Razorpay order
router.post("/pay", orderController.createRazorpayOrder);

// 3️⃣ Verify payment
router.post("/verify", orderController.verifyPayment);

// 4️⃣ Get order status
router.get("/status/:orderId", orderController.getOrderStatus);

// 5️⃣ Order history
router.get("/history", orderController.orderHistory);

module.exports = router;

const fs = require("fs");
const path = require("path");
const Razorpay = require("razorpay");
const crypto = require("crypto");
const { v4: uuidv4 } = require("uuid");

// ───────────────────────────────────────────
// FOLDERS
// ───────────────────────────────────────────
const ORDERS_DIR = path.join(__dirname, "orders");
if (!fs.existsSync(ORDERS_DIR)) fs.mkdirSync(ORDERS_DIR, { recursive: true });

// ───────────────────────────────────────────
// RAZORPAY CLIENT
// ───────────────────────────────────────────
const razor = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// ───────────────────────────────────────────
// HELPER FUNCTIONS
// ───────────────────────────────────────────
const getOrderFile = (id) => path.join(ORDERS_DIR, `${id}.json`);

function readOrder(id) {
  const file = getOrderFile(id);
  if (!fs.existsSync(file)) return null;
  return JSON.parse(fs.readFileSync(file, "utf8"));
}

function writeOrder(id, data) {
  const file = getOrderFile(id);
  fs.writeFileSync(file, JSON.stringify(data, null, 2));
}

// ───────────────────────────────────────────
// 1️⃣ CREATE LOCAL ORDER  (/api/order/create)
// ───────────────────────────────────────────
module.exports.createOrder = async (req, res) => {
  try {
    const { userId, itemImage, shipping, price } = req.body;

    if (!userId || !itemImage) {
      return res.status(400).json({
        error: "userId and itemImage are required",
      });
    }

    const orderId = uuidv4();

    const orderData = {
      orderId,
      userId,
      itemImage,
      shipping: shipping || {},
      price: price || 500, // fallback
      status: "PENDING_PAYMENT",
      createdAt: new Date(),
    };

    writeOrder(orderId, orderData);

    return res.json({
      success: true,
      orderId,
    });

  } catch (err) {
    console.error("Order creation error:", err);
    return res.status(500).json({ error: "Failed to create order" });
  }
};

// ───────────────────────────────────────────
// 2️⃣ CREATE RAZORPAY ORDER  (/api/order/pay)
// Frontend sends: { orderId }
// ───────────────────────────────────────────
module.exports.createRazorpayOrder = async (req, res) => {
  try {
    const { orderId } = req.body;

    const orderData = readOrder(orderId);
    if (!orderData)
      return res.status(404).json({ error: "Order not found" });

    const amount = (orderData.price || 500) * 100; // Razorpay requires paise

    const rpOrder = await razor.orders.create({
      amount,
      currency: "INR",
      receipt: orderId,
    });

    // Save Razorpay order details
    orderData.razorpayOrderId = rpOrder.id;
    writeOrder(orderId, orderData);

    return res.json({
      success: true,
      order: rpOrder,
    });

  } catch (err) {
    console.error("Razorpay order error:", err);
    return res.status(500).json({ error: "Failed to create Razorpay order" });
  }
};

// ───────────────────────────────────────────
// 3️⃣ VERIFY PAYMENT (/api/order/verify)
// Frontend sends:
// { razorpay_order_id, razorpay_payment_id, razorpay_signature, orderId }
// ───────────────────────────────────────────
module.exports.verifyPayment = async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      orderId,
    } = req.body;

    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body.toString())
      .digest("hex");

    const valid = expectedSignature === razorpay_signature;

    const orderData = readOrder(orderId);

    if (!orderData)
      return res.status(404).json({ error: "Order not found" });

    orderData.payment = {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      verified: valid,
      paidAt: new Date(),
    };

    orderData.status = valid ? "PAID" : "PAYMENT_FAILED";
    writeOrder(orderId, orderData);

    return res.json({
      success: valid,
      orderId,
      status: orderData.status,
    });

  } catch (err) {
    console.error("Verify payment error:", err);
    return res.status(500).json({ error: "Verification failed" });
  }
};

// ───────────────────────────────────────────
// 4️⃣ GET ORDER STATUS (/api/order/status/:id)
// ───────────────────────────────────────────
module.exports.getOrderStatus = async (req, res) => {
  try {
    const { orderId } = req.params;
    const order = readOrder(orderId);

    if (!order)
      return res.status(404).json({ error: "Order not found" });

    return res.json(order);

  } catch (err) {
    console.error("Get order status error:", err);
    return res.status(500).json({ error: "Failed to fetch order" });
  }
};

// ───────────────────────────────────────────
// 5️⃣ ORDER HISTORY (/api/order/history)
// VERY simple: return all order files
// ───────────────────────────────────────────
module.exports.orderHistory = async (req, res) => {
  try {
    const files = fs.readdirSync(ORDERS_DIR);
    const orders = files.map((f) => {
      const data = JSON.parse(fs.readFileSync(path.join(ORDERS_DIR, f), "utf8"));
      return data;
    });

    res.json(orders);
  } catch (err) {
    console.error("Order history error:", err);
    res.status(500).json({ error: "Failed to load history" });
  }
};

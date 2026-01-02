// frontend/src/components/PaymentButton.jsx
import React from "react";
import axios from "axios";

const PaymentButton = ({ orderId, amount, onSuccess }) => {

  const handlePay = async () => {
    try {
      // 1️⃣ Create Razorpay Order from backend
      const res = await axios.post("/api/order/pay", {
        orderId,
        amount
      });

      const { razorpayOrderId, key, currency } = res.data;

      // 2️⃣ Open Razorpay Checkout
      const options = {
        key: key,
        amount: amount * 100, // convert rupees to paise
        currency: currency,
        name: "ANSUIYA AI Fashion",
        description: "Order Payment",
        order_id: razorpayOrderId,

        handler: async function (response) {
          // 3️⃣ Verify signature
          const verifyRes = await axios.post("/api/order/verify", {
            orderId,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_order_id: response.razorpay_order_id,
            razorpay_signature: response.razorpay_signature,
          });

          if (verifyRes.data.success) {
            alert("Payment Successful!");
            onSuccess();
          } else {
            alert("Payment verification failed.");
          }
        },
        theme: {
          color: "#000000",
        },
      };

      const razor = new window.Razorpay(options);
      razor.open();

    } catch (err) {
      console.error(err);
      alert("Payment initiation failed");
    }
  };

  return (
    <button
      onClick={handlePay}
      className="bg-green-600 text-white px-5 py-2 rounded-lg"
    >
      Pay Now
    </button>
  );
};

export default PaymentButton;

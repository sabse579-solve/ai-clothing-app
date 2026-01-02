import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSearchParams, useNavigate } from "react-router-dom";

export default function PaymentPage() {
  const [params] = useSearchParams();
  const navigate = useNavigate();

  const orderId = params.get("orderId");
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load order status
  useEffect(() => {
    if (!orderId) return;

    const loadOrder = async () => {
      try {
        const res = await axios.get(`/api/order/status/${orderId}`);
        setOrder(res.data);
      } catch (err) {
        console.error(err);
      }
      setLoading(false);
    };

    loadOrder();
  }, [orderId]);

  const payNow = async () => {
    try {
      // STEP 2 — Request Razorpay order
      const rp = await axios.post("/api/order/pay", { orderId });

      const { id, amount } = rp.data.order;

      const options = {
        key: process.env.REACT_APP_RAZORPAY_KEY,
        amount,
        currency: "INR",
        name: "ANSUIYA Fashion",
        order_id: id,

        handler: async function (response) {
          // STEP 3 — Verify Payment
          await axios.post("/api/order/verify", {
            orderId,
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
          });

          alert("Payment Successful!");
          navigate("/order-success?orderId=" + orderId);
        },
      };

      const razor = new window.Razorpay(options);
      razor.open();
    } catch (err) {
      console.error("Payment failed", err);
    }
  };

  if (loading) return <p>Loading order...</p>;

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold">Checkout</h1>

      <img
        src={order?.itemImage}
        alt="outfit"
        className="w-60 rounded-lg mt-4 shadow"
      />

      <p className="text-xl mt-4">
        Price: <strong>₹{order?.price}</strong>
      </p>

      <button
        onClick={payNow}
        className="mt-6 bg-black text-white px-6 py-3 rounded-lg"
      >
        Pay Now
      </button>
    </div>
  );
}

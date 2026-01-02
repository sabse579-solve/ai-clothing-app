// frontend/src/pages/Checkout.jsx
import { useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

export default function Checkout() {
  const navigate = useNavigate();
  const location = useLocation();

  const item = new URLSearchParams(location.search).get("item"); // outfit image URL
  const userId = localStorage.getItem("userId");

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const placeOrder = async () => {
    if (!name || !address || !phone) {
      setError("Please complete all details.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const res = await axios.post("/api/order/create", {
        userId,
        itemImage: item,
        shipping: { name, address, phone }
      });

      const orderId = res.data.orderId;

      alert("Order created! Proceeding to payment...");

      navigate(`/payment?orderId=${orderId}`);

    } catch (err) {
      console.error(err);
      setError("Checkout failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <h1 className="text-3xl font-bold mb-6">Checkout</h1>

      {error && <p className="text-red-400">{error}</p>}

      <div className="space-y-4 max-w-xl">

        {/* Outfit Preview */}
        {item && (
          <img
            src={item}
            alt="Selected Outfit"
            className="w-60 rounded mb-4 shadow"
          />
        )}

        <input
          className="w-full p-3 bg-neutral-900 rounded-lg"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <textarea
          className="w-full p-3 bg-neutral-900 rounded-lg"
          placeholder="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          rows={3}
        />

        <input
          className="w-full p-3 bg-neutral-900 rounded-lg"
          placeholder="Phone Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />

        <button
          onClick={placeOrder}
          className="bg-green-600 px-6 py-3 rounded-lg w-full"
          disabled={loading}
        >
          {loading ? "Processing..." : "Place Order"}
        </button>
      </div>
    </div>
  );
}

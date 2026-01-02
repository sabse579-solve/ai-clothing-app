import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Measurements() {
  const navigate = useNavigate();


  // 🔥 FIX: ensure userId always exists
  const getOrCreateUserId = () => {
    let uid = localStorage.getItem("userId");
    if (!uid) {
      uid = crypto.randomUUID();
      localStorage.setItem("userId", uid);
    }
    return uid;
  };

  const userId = getOrCreateUserId();

  const [form, setForm] = useState({
    height: "",
    weight: "",
    chest: "",
    waist: "",
    hips: "",
    shoulders: "",
    torso_length: "",
    arm_length: "",
    inseam: "",
  });




  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    console.log("🔥 handleSubmit fired");

    const userId = localStorage.getItem("userId");
    console.log("🧑 userId:", userId);
    console.log("📦 form payload:", form);

    setLoading(true);
    setError("");

    if (!userId) {
      setError("User ID missing. Please login again.");
      setLoading(false);
      return;
    }

    if (!form.height || !form.chest || !form.waist || !form.hips) {
      setError("Please fill all required fields.");
      setLoading(false);
      return;
    }

    try {
      console.log("🚀 Sending request to backend...");

      const res = await axios.post(
        `/api/avatar/${userId}/create`,
        form
      );

      console.log("✅ Backend response:", res.data);

      navigate("/photo-upload");
    } catch (err) {
      console.error("❌ Axios error:", err);
      setError("Failed to save measurements. Try again.");
    } finally {
      setLoading(false);
    }
  }


  return (
    <div className="min-h-screen bg-gray-100 flex justify-center p-6">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-xl p-6 w-full max-w-xl"
      >
        <h2 className="text-3xl font-bold mb-4 text-gray-800">
          Enter Your Measurements
        </h2>

        {error && (
          <p className="text-red-600 font-semibold mb-4">{error}</p>
        )}
        <select
          value={gender}
          onChange={(e) => setGender(e.target.value)}
        >
          <option value="">Select Gender</option>
          <option value="female">Female</option>
          <option value="male">Male</option>
        </select>


        {Object.keys(form).map((field) => (
          <div key={field} className="mb-4">
            <label className="block text-gray-700 font-medium mb-1 capitalize">
              {field.replace("_", " ")}
              {["height", "chest", "waist", "hips"].includes(field) && (
                <span className="text-red-500">*</span>
              )}
            </label>

            <input
              type="number"
              step="0.1"
              name={field}
              required={["height", "chest", "waist", "hips"].includes(field)}
              className="w-full border rounded-md px-3 py-2 
                         focus:outline-none focus:ring-2 focus:ring-black/40"
              value={form[field]}
              onChange={handleChange}
            />
          </div>
        ))}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-black text-white py-3 rounded-md shadow hover:bg-gray-900 transition"
        >
          {loading ? "Saving..." : "Save & Continue"}
        </button>
      </form>
    </div>
  );
}

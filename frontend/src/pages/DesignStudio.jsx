// frontend/src/pages/DesignStudio.jsx
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const DesignStudio = () => {
  const [prompt, setPrompt] = useState("");
  const [result, setResult] = useState(null); // { image, config }
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      alert("Please enter a valid outfit prompt.");
      return;
    }

    setLoading(true);
    setResult(null);

    try {
      const res = await axios.post("/api/ai/generate-outfit", {
        prompt,
        userId: localStorage.getItem("userId"),
      });

      if (!res.data?.image || !res.data?.config) {
        throw new Error("Invalid AI response");
      }

      setResult(res.data);
    } catch (error) {
      console.error("Error generating outfit:", error);
      alert("Failed to generate design.");
    } finally {
      setLoading(false);
    }
  };

  const openTryOn = () => {
    navigate("/tryon", {
      state: {
        image: result.image,
        config: result.config, // 🔑 SAME CONFIG
      },
    });
  };

  return (
    <div className="p-8 min-h-screen bg-gray-50">
      <h1 className="text-4xl font-bold mb-4">AI Fashion Design Studio</h1>

      <div className="flex gap-3 mb-6">
        <input
          type="text"
          placeholder="Describe the outfit you want"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          className="flex-1 border p-2 rounded-lg"
        />
        <button
          onClick={handleGenerate}
          className="px-6 py-2 bg-black text-white rounded-lg"
          disabled={loading}
        >
          {loading ? "Generating..." : "Generate"}
        </button>
      </div>

      {loading && (
        <p className="text-center text-gray-500">Generating design...</p>
      )}

      {result && (
        <div
          className="max-w-sm cursor-pointer hover:scale-105 transition"
          onClick={openTryOn}
        >
          <img
            src={result.image}
            alt="AI Generated Outfit"
            className="rounded-xl shadow border"
          />
          <p className="mt-2 text-center font-medium">
            Click to try on
          </p>
        </div>
      )}
    </div>
  );
};

export default DesignStudio;

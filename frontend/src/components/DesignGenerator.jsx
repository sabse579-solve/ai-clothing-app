// frontend/src/components/DesignGenerator.jsx
import { useState } from "react";
import axios from "axios";

export default function DesignGenerator({ onGenerated }) {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const generate = async () => {
    if (!prompt.trim()) {
      setError("Please enter a valid prompt.");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const res = await axios.post("/api/outfits/generate", { prompt });

      const images = res.data.images || [];

      if (!images.length) {
        setError("No designs were generated. Try a more detailed prompt.");
      } else {
        onGenerated(images); // <-- Corrected output handler
      }
    } catch (err) {
      console.error("Generation error:", err);
      setError("Failed to generate design. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 border rounded shadow bg-white">
      <h3 className="text-xl font-semibold mb-3">AI Design Generator</h3>

      <textarea
        className="border p-3 w-full rounded resize-none"
        placeholder="Describe your outfit design (e.g., red silk lehenga with gold embroidery)..."
        rows={3}
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />

      {error && <p className="text-red-600 mt-2">{error}</p>}

      <button
        onClick={generate}
        disabled={loading}
        className={`bg-black text-white px-4 py-2 mt-3 rounded w-full ${
          loading ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        {loading ? "Generating..." : "Generate Design"}
      </button>
    </div>
  );
}

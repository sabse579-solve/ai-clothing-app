import React, { useState } from "react";

const OutfitPrompt = ({ onGenerate }) => {
  const [prompt, setPrompt] = useState("");

  return (
    <div className="flex gap-2 mt-4">
      <input
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Describe your outfit..."
        className="border p-2 flex-1"
      />
      <button
        onClick={() => onGenerate(prompt)}
        className="bg-black text-white px-4 py-2 rounded"
      >
        Generate AI Outfit
      </button>
    </div>
  );
};

export default OutfitPrompt;

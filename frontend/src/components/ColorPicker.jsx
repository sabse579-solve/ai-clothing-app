// frontend/src/components/ColorPicker.jsx
import React from "react";

// 🎨 1. Fashion Colors (Distinct only)
const FASHION_COLORS = [
  "#000000", "#FFFFFF", "#C0C0C0", "#8D5524",
  "#FF0000", "#E63946", "#FF8C00", "#FFD60A",
  "#2A9D8F", "#008000", "#1D3557", "#457B9D",
  "#6A0572", "#9D4EDD", "#FF69B4", "#FFC0CB",
];

// 🧵 2. Fabric Colors (Distinct)
const FABRIC_SAFE_COLORS = [
  "#101820", "#F2AA4C", "#B56576", "#6D6875",
  "#0FA3B1", "#F7A072", "#E71D36", "#2EC4B6", "#EDE7E3",
];

// 🇮🇳 3. Indian Ethnic Colors (Distinct)
const INDIAN_ETHNIC_COLORS = [
  "#800000", "#C9A86A", "#DC143C", "#FF9933",
  "#006400", "#4B0082", "#8A2BE2", "#0F52BA",
];

// 🪐 4. Metallic
const METALLIC_COLORS = [
  "#D4AF37", "#B87333", "#C0C0C0", "#E5E4E2", "#A97142",
];

// 🌈 5. Gradients (unchanged)
const GRADIENT_COLORS = [
  ["#ff9a9e", "#fad0c4"],
  ["#a18cd1", "#fbc2eb"],
  ["#f6d365", "#fda085"],
  ["#84fab0", "#8fd3f4"],
  ["#cfd9df", "#e2ebf0"],
];

const ColorPicker = ({ onChange }) => {

  const renderColorRow = (colors) => (
    <div className="flex flex-wrap gap-3 mb-4">
      {colors.map((c) => (
        <div
          key={c}
          className="w-8 h-8 rounded-full cursor-pointer border shadow-sm hover:scale-110 transition"
          style={{ background: c }}
          onClick={() => onChange(c)}
        ></div>
      ))}
    </div>
  );

  const renderGradientRow = () => (
    <div className="flex flex-wrap gap-3 mb-4">
      {GRADIENT_COLORS.map((g, i) => (
        <div
          key={i}
          className="w-10 h-10 rounded-full cursor-pointer border shadow-sm hover:scale-110 transition"
          style={{ background: `linear-gradient(135deg, ${g[0]}, ${g[1]})` }}
          onClick={() => onChange(g)}
        ></div>
      ))}
    </div>
  );

  return (
    <div className="mb-6">
      <h3 className="font-semibold text-lg mb-3">Choose Color</h3>

      <h4 className="font-medium text-sm mb-1 text-gray-600">Fashion Colors</h4>
      {renderColorRow(FASHION_COLORS)}

      <h4 className="font-medium text-sm mb-1 text-gray-600">Fabric Colors</h4>
      {renderColorRow(FABRIC_SAFE_COLORS)}

      <h4 className="font-medium text-sm mb-1 text-gray-600">Ethnic Colors</h4>
      {renderColorRow(INDIAN_ETHNIC_COLORS)}

      <h4 className="font-medium text-sm mb-1 text-gray-600">Metallic Colors</h4>
      {renderColorRow(METALLIC_COLORS)}

      <h4 className="font-medium text-sm mb-1 text-gray-600">Gradients</h4>
      {renderGradientRow()}
    </div>
  );
};

export default ColorPicker;

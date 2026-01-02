// frontend/src/components/PatternSelector.jsx
import React from "react";

const PATTERNS = ["Solid",
  "Striped",
  "Checked",
  "Floral",
  "Paisley",
  "Geometric",
  "Polka Dots",
  "Digital Prints",
  "Embroidery",
  "Zari",
  "Tie Dye",
  "Ikat",
  "Bandhani",
  "Block Print",
  "Abstract",
  "Ombre",];

const PatternSelector = ({ onSelect }) => {
  return (
    <div>
      <h3 className="font-semibold mb-2">Pattern</h3>
      <select
        className="border p-2 rounded"
        onChange={(e) => onSelect(e.target.value)}
      >
        <option value="">Select Pattern</option>
        {PATTERNS.map((p) => (
          <option key={p}>{p}</option>
        ))}
      </select>
    </div>
  );
};

export default PatternSelector;

// frontend/src/components/FabricSelector.jsx
import React from "react";

const FABRICS = [ "Cotton",
  "Linen",
  "Silk",
  "Satin",
  "Velvet",
  "Chiffon",
  "Georgette",
  "Crepe",
  "Organza",
  "Denim",
  "Wool",
  "Leather",
  "Rayon",
  "Nylon",
  "Polyester",
  "Chambray",
  "Khadi",
  "Banarasi Silk",
  "Kanjivaram Silk",];

const FabricSelector = ({ onSelect }) => {
  return (
    <div>
      <h3 className="font-semibold mb-2">Fabric</h3>
      <select
        className="border p-2 rounded"
        onChange={(e) => onSelect(e.target.value)}
      >
        <option value="">Select Fabric</option>
        {FABRICS.map((f) => (
          <option key={f}>{f}</option>
        ))}
      </select>
    </div>
  );
};

export default FabricSelector;

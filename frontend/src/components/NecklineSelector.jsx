// frontend/src/components/NecklineSelector.jsx
import React from "react";

const NECKLINES = [
  // Basic
  "Round Neck",
  "Crew Neck",
  "Scoop Neck",
  "Boat Neck",
  "V Neck",
  "Deep V Neck",
  "Square Neck",
  "U-Neck",
  "Sweetheart Neck",

  // Trendy / Modern
  "Halter Neck",
  "Cowl Neck",
  "Off-Shoulder",
  "Cold Shoulder",
  "One Shoulder",
  "Asymmetric Neck",
  "Keyhole Neck",
  "Mock Neck",
  "Turtle Neck",
  "Strapless",
  "Plunge Neck",
  "Wrap Neck (Surplice)",

  // Formal / Designer
  "Illusion Neck",
  "Queen Anne Neckline",
  "Portrait Neck",
  "Jewel Neck",
  "Bardot Neck",
  "Corset Neckline",
  "Empire Neckline",

  // Indian Ethnic
  "Potli Neck",
  "Paan Neck",
  "Leaf Neck",
  "Choli Neck",
  "Angrakha Neck",
  "Mandarin Collar",
  "Deep Back Neck",
  "Princess Neck",
  "Sabyasachi Style Neck",

  // Modern Artistic
  "Cut-Out Neckline",
  "Cage Neckline",
  "Mesh Panel Neck",
  "Twist Front Neck",
  "Draped Neck",
];

export default function NecklineSelector({ onSelect }) {
  return (
    <div>
      <h3 className="font-semibold mb-2">Neckline</h3>

      <select
        className="border p-2 rounded"
        onChange={(e) => onSelect(e.target.value)}
      >
        <option value="">Select Neckline</option>
        {NECKLINES.map((n) => (
          <option key={n}>{n}</option>
        ))}
      </select>
    </div>
  );
}

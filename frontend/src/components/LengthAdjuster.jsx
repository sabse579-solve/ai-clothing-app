// frontend/src/components/LengthAdjuster.jsx
import React from "react";

const LENGTHS = {
  "Top Lengths": [
    "Crop Length",
    "Waist Length",
    "Hip Length",
    "Regular Length",
    "Longline",
    "Tunic Length",
    "Peplum Length",
  ],

  "Dress Lengths": [
    "Mini",
    "Above Knee",
    "Knee Length",
    "Midi",
    "Tea Length",
    "Ankle Length",
    "Maxi",
    "Gown Length",
    "High-Low",
    "Asymmetric",
    "Slit Dress Length",
    "Train",
  ],

  "Skirt Lengths": [
    "Mini Skirt",
    "Knee-Length Skirt",
    "Midi Skirt",
    "Tea Length Skirt",
    "Maxi Skirt",
    "High-Low Skirt",
    "Asymmetric Skirt",
    "Slit Maxi Skirt",
  ],

  "Ethnic Wear Lengths": [
    "Short Kurti",
    "Hip-Length Kurti",
    "Knee-Length Kurti",
    "Calf-Length Kurti",
    "Ankle-Length Kurti",
    "Floor-Length Kurti",
    "Anarkali Floor Length",
    "Lehenga Floor Length",
    "Long Choli",
    "Peplum Blouse",
  ],

  "Pant / Trouser Lengths": [
    "Shorts",
    "Bermuda Shorts",
    "Capri",
    "Cropped Pants",
    "Ankle-Length Pants",
    "Full-Length Pants",
    "Floor-Length Pants",
    "Puddle Pants",
    "Cargo Pant Length",
    "Palazzo Length",
    "Sharara Length",
    "Gharara Length",
  ],

  "Jacket / Outerwear Lengths": [
    "Bolero",
    "Crop Jacket",
    "Waist-Length Jacket",
    "Hip-Length Jacket",
    "Mid-Length Jacket",
    "Longline Coat",
    "Trench Coat Length",
    "Overcoat Length",
    "Cape-Length",
  ],
};

export default function LengthAdjuster({ onChange }) {
  return (
    <div>
      <h3 className="font-semibold mb-2">Length</h3>

      <select
        className="border p-2 "
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="">Select Length</option>

        {Object.keys(LENGTHS).map((category) => (
          <optgroup key={category} label={category}>
            {LENGTHS[category].map((item) => (
              <option key={item} value={item.toLowerCase().replace(/ /g, "-")}>
                {item}
              </option>
            ))}
          </optgroup>
        ))}
      </select>
    </div>
  );
}

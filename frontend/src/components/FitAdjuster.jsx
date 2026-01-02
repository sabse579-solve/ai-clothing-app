// frontend/src/components/FitAdjuster.jsx
import React from "react";

const FITS = {
  "Basic Fits": [
    "Slim Fit",
    "Regular Fit",
    "Relaxed Fit",
    "Loose Fit",
    "Oversized Fit",
    "Bodycon Fit",
    "Tailored Fit",
    "Straight Fit",
    "Comfort Fit",
  ],

  "Western Fashion Fits": [
    "Skinny Fit",
    "Tapered Fit",
    "Bootcut Fit",
    "Flared Fit",
    "A-Line Fit",
    "Empire Fit",
    "Sheath Fit",
    "Shift Fit",
    "Princess Fit",
    "Hourglass Fit",
    "Peplum Fit",
    "High-Waisted Fit",
    "Low-Rise Fit",
    "Wrap Fit",
    "Draped Fit",
    "Ruched Fit",
    "Contour Fit",
  ],

  "Designer & Couture Fits": [
    "Mermaid Fit",
    "Trumpet Fit",
    "Ball Gown Fit",
    "Corset Fit",
    "Structured Fit",
    "Sculpted Fit",
    "Layered Couture Fit",
    "Cascading Fit",
  ],

  "Streetwear Fits": [
    "Baggy Fit",
    "Boxy Fit",
    "Oversized Box Fit",
    "Drop-Shoulder Fit",
    "Cropped Fit",
    "Longline Fit",
    "Cargo Fit",
    "Utility Fit",
    "Skater Fit",
  ],

  "Ethnic Wear (Women)": [
    "Straight Kurti Fit",
    "A-Line Kurti Fit",
    "Anarkali Fit",
    "Peplum Fit",
    "Choli Fit",
    "Princess Cut Fit",
    "Flared Lehenga Fit",
    "Layered Lehenga Fit",
    "Sharara Fit",
    "Gharara Fit",
  ],

  "Ethnic Wear (Men)": [
    "Regular Kurta Fit",
    "Tailored Kurta Fit",
    "Straight Kurta Fit",
    "Pathani Fit",
    "Asymmetric Kurta Fit",
    "Slim Sherwani Fit",
    "Structured Sherwani Fit",
  ],

  "Athleisure / Sports Fits": [
    "Compression Fit",
    "Performance Fit",
    "Active Fit",
    "Muscle Fit",
    "Jogger Fit",
    "Yoga Fit",
  ],

  "Outerwear Fits": [
    "Trench Fit",
    "Overcoat Fit",
    "Puffer Fit",
    "Quilted Fit",
    "Bomber Fit",
    "Cape Fit",
    "Poncho Fit",
  ],
};

export default function FitAdjuster({ onChange }) {
  return (
    <div>
      <h3 className="font-semibold mb-2">Fit</h3>

      <select
        className="border p-2 "
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="">Select Fit</option>

        {Object.keys(FITS).map((category) => (
          <optgroup key={category} label={category}>
            {FITS[category].map((fit) => (
              <option key={fit} value={fit.toLowerCase().replace(/ /g, "-")}>
                {fit}
              </option>
            ))}
          </optgroup>
        ))}
      </select>
    </div>
  );
}

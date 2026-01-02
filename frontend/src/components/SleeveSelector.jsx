// frontend/src/components/SleeveSelector.jsx
import React from "react";

const SLEEVES = {
  "Basic Sleeves": [
    "Sleeveless",
    "Cap Sleeve",
    "Short Sleeve",
    "Half Sleeve",
    "Elbow Sleeve",
    "3/4 Sleeve",
    "Long Sleeve",
  ],

  "Classic Tailoring Sleeves": [
    "Set-In Sleeve",
    "Raglan Sleeve",
    "Kimono Sleeve",
    "Dolman Sleeve",
    "Drop Shoulder Sleeve",
    "Peasant Sleeve",
    "Fitted Sleeve",
  ],

  "Trendy & Fashion Forward": [
    "Puff Sleeve",
    "Balloon Sleeve",
    "Bubble Sleeve",
    "Bishop Sleeve",
    "Bell Sleeve",
    "Flutter Sleeve",
    "Tulip Sleeve",
    "Petal Sleeve",
    "Ruffle Sleeve",
    "Layered Sleeve",
    "Tiered Sleeve",
    "Cold Shoulder Sleeve",
    "Split Sleeve",
    "Open Sleeve",
    "Cuff Sleeve",
    "Gathered Sleeve",
    "Ruched Sleeve",
    "Slit Sleeve",
    "Poet Sleeve",
    "Juliet Sleeve",
  ],

  "Designer / Western Style Sleeves": [
    "Lantern Sleeve",
    "Pagoda Sleeve",
    "Angel Sleeve",
    "Trumpet Sleeve",
    "Cape Sleeve",
    "Batwing Sleeve",
    "Kimono Wide Sleeve",
    "Kaftan Sleeve",
    "Gigot Sleeve (Leg of Mutton)",
    "Sheer Sleeve",
    "Mesh Sleeve",
    "Glove Sleeve",
    "Ball Gown Sleeve",
    "Oversized Sleeve",
    "Structured Sleeve",
  ],

  "Indian / Ethnic Wear Sleeves": [
    "Choli Sleeve",
    "Angrakha Sleeve",
    "Padded Sleeve",
    "Saree Blouse Sleeve",
    "Mughal Sleeve",
    "Anarkali Sleeve",
    "Kurti Straight Sleeve",
    "Kurti Bell Sleeve",
    "Lehenga Puff Sleeve",
    "Ruffled Ethnic Sleeve",
    "Organza Sleeve",
  ],

  "Modern / Streetwear Sleeves": [
    "Hooded Sleeve",
    "Zipper Sleeve",
    "Thumbhole Sleeve",
    "Cut-Out Sleeve",
    "Strappy Sleeve",
    "Shoulder Strap Sleeve",
    "One-Sleeve Design",
    "Off-Shoulder Sleeve",
    "Asymmetric Sleeve",
    "Cargo Pocket Sleeve",
    "Sports Raglan Sleeve",
    "Baseball Sleeve",
    "Moto Sleeve",
  ],

  "Outerwear / Winter Sleeves": [
    "Cuffed Jacket Sleeve",
    "Sherpa Sleeve",
    "Puffer Sleeve",
    "Quilted Sleeve",
    "Overcoat Sleeve",
    "Trench Coat Strap Sleeve",
    "Button-Tab Sleeve",
    "Elastic Hem Sleeve",
  ],

  "High Fashion / Couture Sleeves": [
    "Feather Sleeve",
    "Beaded Sleeve",
    "Embroidered Sleeve",
    "Frill Sleeve",
    "Balloon Ruched Sleeve",
    "Cape-Overlay Sleeve",
    "One-Loop Sleeve",
    "Illusion Sleeve",
    "Transparent Mesh Sleeve",
    "Structured Couture Sleeve",
    "Origami Sleeve",
    "Wing Sleeve",
  ],
};

export default function SleeveSelector({ onSelect }) {
  return (
    <div>
      <h3 className="font-semibold mb-2">Sleeve Type</h3>

      <select
        className="border p-2 rounded "
        onChange={(e) => onSelect(e.target.value)}
      >
        <option value="">Select Sleeve Type</option>

        {Object.keys(SLEEVES).map((category) => (
          <optgroup key={category} label={category}>
            {SLEEVES[category].map((item) => (
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

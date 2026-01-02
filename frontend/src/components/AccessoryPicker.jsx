// frontend/src/components/AccessoryPicker.jsx
import React from "react";

const ACCESSORIES = {
  "Jewelry (Female)": [
    "Necklace",
    "Choker",
    "Pendant",
    "Layered Necklace",
    "Mangalsutra",
    "Earrings",
    "Hoops",
    "Jhumkas",
    "Chandbali",
    "Drop Earrings",
    "Ear Cuffs",
    "Nose Ring",
    "Nath",
    "Nose Stud",
    "Bracelet",
    "Bangles",
    "Kada",
    "Cuff Bracelet",
    "Anklet",
    "Toe Rings",
    "Waist Belt (Kamarbandh)",
  ],

  "Jewelry (Male)": [
    "Chain",
    "Pendant",
    "Bracelet",
    "Kada",
    "Signet Ring",
    "Stud Earrings",
    "Beaded Necklace",
    "Cufflinks",
    "Tie Pin",
    "Brooch",
    "Pocket Chain",
  ],

  "Bags": [
    "Handbag",
    "Clutch",
    "Potli Bag",
    "Sling Bag",
    "Crossbody Bag",
    "Tote Bag",
    "Mini Backpack",
    "Wallet",
    "Card Holder",
    "Laptop Bag",
    "Envelope Clutch",
    "Waist Bag / Fanny Pack",
  ],

  "Footwear": [
    "Heels",
    "Block Heels",
    "Stilettos",
    "Juttis",
    "Mojaris",
    "Kolhapuri Sandals",
    "Sneakers",
    "Running Shoes",
    "Boots",
    "Chelsea Boots",
    "Loafers",
    "Dress Shoes",
    "Sandals",
    "Slippers",
    "Flats",
    "Gladiator Sandals",
    "Socks",
    "Stockings",
    "Ankle Boots",
  ],

  "Head & Hair Accessories": [
    "Sunglasses",
    "Eyeglasses",
    "Bandana",
    "Headband",
    "Hair Clips",
    "Hair Pins",
    "Scrunchie",
    "Tiara",
    "Matha Patti",
    "Maang Tikka",
    "Pagdi",
    "Hat",
    "Bucket Hat",
    "Beret",
    "Hijab Scarf",
    "Dupatta",
  ],

  "Clothing Add-ons": [
    "Belt",
    "Corset Belt",
    "Fabric Belt",
    "Suspenders",
    "Bow Tie",
    "Necktie",
    "Scarf",
    "Shawl",
    "Stole",
    "Cape",
    "Poncho",
    "Jacket",
    "Shrug",
    "Blazer",
    "Cardigan",
    "Overcoat",
    "Waistcoat",
  ],

  "Indian Ethnic Accessories": [
    "Dupatta",
    "Banarasi Dupatta",
    "Kamarbandh",
    "Maang Tikka",
    "Passa",
    "Nath",
    "Toe Rings",
    "Payal",
    "Potli Bag",
    "Sheila",
    "Sherwani Brooch",
    "Safaa",
  ],

  "Winter Accessories": [
    "Beanie",
    "Gloves",
    "Wool Scarf",
    "Earmuffs",
    "Muffler",
    "Shawl",
    "Poncho",
    "Trench Coat",
    "Windcheater",
    "Leg Warmers",
  ],

  "Functional Accessories": [
    "Backpack",
    "Gym Bag",
    "Travel Bag",
    "Laptop Sleeve",
    "Phone Strap",
    "Keychain",
    "AirPods Case",
    "Utility Pouch",
    "Bottle Holder",
  ],

  "Fashion Styling Add-ons": [
    "Brooch",
    "Lapel Pin",
    "Pocket Square",
    "Detachable Collar",
    "Detachable Sleeves",
    "Embroidery Patch",
    "Fabric Flowers",
    "Feather Add-on",
    "Sequin Add-on",
    "Ribbons",
    "Bows",
  ],

  "Bridal Accessories": [
    "Veil",
    "Bridal Gloves",
    "Garter",
    "Bridal Belt",
    "Kaleere",
    "Seeshphool",
    "Bridal Anklet",
    "Bridal Dupatta",
    "Choker Set",
    "Bridal Nose Ring",
  ],

  "Menswear Styling": [
    "Tie",
    "Bow Tie",
    "Pocket Square",
    "Cufflinks",
    "Brooch",
    "Sherwani Buttons",
    "Lapel Pin",
    "Bracelet",
    "Chain",
    "Watch",
    "Safaa",
  ],
};

const AccessoryPicker = ({ onSelect }) => {
  return (
    <div>
      <h3 className="font-semibold mb-2">Accessories</h3>

      <select
        className="border p-2 rounded "
        onChange={(e) => onSelect(e.target.value)}
      >
        <option value="">Select Accessory</option>

        {Object.keys(ACCESSORIES).map((category) => (
          <optgroup key={category} label={category}>
            {ACCESSORIES[category].map((item) => (
              <option key={item} value={item.toLowerCase().replace(/ /g, "-")}>
                {item}
              </option>
            ))}
          </optgroup>
        ))}
      </select>
    </div>
  );
};

export default AccessoryPicker;

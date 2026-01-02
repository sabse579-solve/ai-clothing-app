// frontend/src/components/ProductPreview.jsx
import React, { useState } from "react";
import Product3D from "./Product3d";
import { useNavigate } from "react-router-dom";

export default function ProductPreview({ product, enable3D = false }) {
  const navigate = useNavigate();

  if (!product) return null;

  const { imageUrl, prompt, title, description } = product;

  const [show3D, setShow3D] = useState(false);

  const handleCustomize = () => {
    navigate(`/customize?img=${encodeURIComponent(imageUrl)}`);
  };

  const handleBuy = () => {
    navigate(`/checkout?item=${encodeURIComponent(imageUrl)}`);
  };

  return (
    <div className="p-6 mt-6 text-center bg-white rounded-xl shadow-md max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-3">Preview</h2>

      {/* 3D View Toggle */}
      {enable3D && (
        <button
          onClick={() => setShow3D((prev) => !prev)}
          className="mb-3 px-4 py-1 bg-gray-900 text-white rounded-md"
        >
          {show3D ? "Show Image" : "Show 3D Preview"}
        </button>
      )}

      {/* IMAGE OR 3D PREVIEW */}
      {show3D && enable3D ? (
        <div className="w-full h-64 mb-4">
          <Product3D textureUrl={imageUrl} shape="plane" />
        </div>
      ) : (
        <img
          src={imageUrl || "/placeholder.jpg"}
          className="w-80 h-auto mx-auto border rounded-xl shadow"
          alt="Generated outfit"
        />
      )}

      {/* TITLE */}
      {title && (
        <p className="mt-4 text-lg font-semibold text-gray-900">{title}</p>
      )}

      {/* PROMPT / DESCRIPTION */}
      <p className="mt-2 text-gray-700 text-sm">
        {prompt || description || "AI-generated fashion design"}
      </p>

      {/* ACTION BUTTONS */}
      <div className="mt-6 flex justify-center gap-4">
        <button
          onClick={handleCustomize}
          className="px-5 py-2 bg-black text-white rounded-lg shadow hover:bg-gray-900 transition"
        >
          Customize
        </button>

        <button
          onClick={handleBuy}
          className="px-5 py-2 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 transition"
        >
          Buy Now
        </button>
      </div>
    </div>
  );
}

import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Store() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("/api/outfits/list");

        // Convert relative URLs → absolute URLs
        const fixedProducts = res.data.map((p) => ({
          ...p,
          imageUrl: p.imageUrl?.startsWith("/")
            ? `http://localhost:5000${p.imageUrl}`
            : p.imageUrl,
        }));

        setProducts(fixedProducts || []);
      } catch (err) {
        console.error(err);
        setError("Failed to load store items.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const goToCheckout = (item) => {
    navigate(`/checkout?item=${encodeURIComponent(item.imageUrl)}`);
  };

  return (
    <div className="p-10 min-h-screen bg-gray-50">
      <h1 className="text-4xl font-bold mb-6">Fashion Store</h1>
      <p className="text-gray-600 mb-8">
        Browse AI-designed and curated fashion outfits.
      </p>

      {loading && (
        <p className="text-gray-500 text-lg animate-pulse">Loading store...</p>
      )}

      {error && (
        <p className="text-red-600 font-semibold mb-4">{error}</p>
      )}

      {/* Store Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">

        {products.map((p) => (
          <div
            key={p._id}
            className="border rounded-xl shadow hover:shadow-xl transition bg-white"
          >
            <img
              src={p.imageUrl}
              alt={p.prompt || "AI Outfit"}
              className="w-full h-72 object-cover rounded-t-xl"
            />

            <div className="p-4">
              <p className="font-semibold">{p.title || p.prompt || "AI Outfit"}</p>

              <p className="text-gray-600 text-sm mt-1">
                {p.description || "AI-generated fashion outfit"}
              </p>

              <button
                onClick={() => goToCheckout(p)}
                className="mt-4 w-full bg-black text-white py-2 rounded-lg hover:bg-gray-900 transition"
              >
                Buy / Customize
              </button>
            </div>
          </div>
        ))}

        {!loading && products.length === 0 && (
          <p className="text-gray-500 col-span-full text-center">
            No items available yet.
          </p>
        )}
      </div>
    </div>
  );
}

// frontend/src/pages/TryOn.jsx
import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import AvatarViewer from "../components/AvatarViewer";

const TryOn = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const avatarViewerRef = useRef(null);

  const userId = localStorage.getItem("userId");

  const query = new URLSearchParams(location.search);
  const outfitImage = query.get("img");
  const encodedConfig = query.get("config");

  const [outfitConfig, setOutfitConfig] = useState(null);
  const [avatarUrl, setAvatarUrl] = useState(null);
  const [scaleCache, setScaleCache] = useState(null);

  const [tryonResult, setTryonResult] = useState(null);
  const [loading, setLoading] = useState(false);

  /* ------------------------------------
     AUTH + PARAM VALIDATION
  -------------------------------------*/
  useEffect(() => {
    if (!userId) {
      navigate("/login");
      return;
    }

    if (!outfitImage || !encodedConfig) {
      navigate("/design");
      return;
    }

    try {
      const parsed = JSON.parse(decodeURIComponent(encodedConfig));
      setOutfitConfig(parsed);
    } catch (err) {
      console.error("Invalid outfit config:", err);
      navigate("/design");
    }
  }, [userId, outfitImage, encodedConfig, navigate]);

  /* ------------------------------------
     LOAD AVATAR
  -------------------------------------*/
  useEffect(() => {
    const loadAvatar = async () => {
      try {
        const res = await axios.get(`/api/avatar/${userId}/status`);
        setAvatarUrl(res.data.avatarURL);
        setScaleCache(res.data.scaleCache || null);
      } catch (err) {
        console.error("Avatar load failed:", err);
      }
    };

    if (userId) loadAvatar();
  }, [userId]);

  /* ------------------------------------
     APPLY CONFIG TO AVATAR (ONCE)
  -------------------------------------*/
  useEffect(() => {
    if (avatarViewerRef.current && outfitConfig) {
      avatarViewerRef.current.applyOutfitConfig(outfitConfig);
    }
  }, [outfitConfig]);

  /* ------------------------------------
     2D TRY-ON (SAME CONFIG)
  -------------------------------------*/
  const handleTryOn = async () => {
    setLoading(true);

    try {
      const res = await axios.post("/api/tryon/apply", {
        userPhoto: null, // future
        outfitImage,
        outfitConfig,
      });

      setTryonResult(res.data?.image || outfitImage);
    } catch (err) {
      console.error("2D try-on failed:", err);
      setTryonResult(outfitImage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 min-h-screen bg-gray-50">
      <h1 className="text-4xl font-bold mb-6">Virtual Try-On</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* =======================
            3D AVATAR
        ======================= */}
        <div>
          <h3 className="text-xl font-semibold mb-3">3D Avatar</h3>

          {avatarUrl && outfitConfig && (
            <AvatarViewer
              ref={avatarViewerRef}
              avatarUrl={avatarUrl}
              userId={userId}
              gender={outfitConfig.meta.gender}
              bodyFit={outfitConfig.meta.bodyFit}
              scaleCache={scaleCache}
            />
          )}
        </div>

        {/* =======================
            2D TRY-ON
        ======================= */}
        <div>
          <h3 className="text-xl font-semibold mb-3">2D Preview</h3>

          <img
            src={tryonResult || outfitImage}
            alt="Try-On Result"
            className="rounded-xl shadow mb-4 max-w-sm"
          />

          <button
            onClick={handleTryOn}
            disabled={loading}
            className="px-6 py-2 bg-black text-white rounded-lg"
          >
            {loading ? "Applying..." : "Apply 2D Try-On"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TryOn;

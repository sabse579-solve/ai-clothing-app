// frontend/src/pages/AvatarProgress.jsx
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AvatarViewer from "../components/AvatarViewer";

export default function AvatarProgress() {
  const [status, setStatus] = useState("NOT_STARTED");
  const [preview, setPreview] = useState(null);
  const [avatarUrl, setAvatarUrl] = useState(null);
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");
  const intervalRef = useRef(null);

  useEffect(() => {
    if (!userId) {
      setError("No user ID found. Please restart setup.");
      return;
    }

    const poll = async () => {
      try {
        const res = await axios.get(`/api/avatar/${userId}/status`);
        const { status, preview_url, avatarURL, error } = res.data;

        setStatus(status);

        if (preview_url) {
          const fullPreview = preview_url.startsWith("http")
            ? preview_url
            : `${window.location.origin}${preview_url}`;
          setPreview(fullPreview);
        }

        // ❌ Backend error state
        if (status === "ERROR") {
          setError(error || "Avatar generation failed.");
          clearInterval(intervalRef.current);
          return;
        }

        // ✅ Avatar ready
        if (status === "AVATAR_READY" && avatarURL) {
          setAvatarUrl(avatarURL);
          clearInterval(intervalRef.current);

          // Auto-redirect after short delay
          setTimeout(() => {
            navigate("/design-studio");
          }, 1200);
        }

      } catch (err) {
        console.error("Polling error:", err);
        setError("Unable to fetch avatar status. Retrying...");
      }
    };

    poll();
    intervalRef.current = setInterval(poll, 3000);

    return () => clearInterval(intervalRef.current);
  }, [userId, navigate]);

  const statusMessage = {
    MEASUREMENTS_SAVED: "Measurements saved. Waiting for photos…",
    PHOTOS_UPLOADED: "Photos uploaded. Preparing avatar…",
    AVATAR_GENERATING: "Generating your 3D avatar…",
    AVATAR_READY: "Avatar ready!",
  }[status] || "Starting avatar generation…";

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gray-100">
      <h2 className="text-3xl font-bold mb-4">Creating Your Avatar</h2>

      <p className="mb-4 text-gray-700 text-lg">
        {statusMessage}
      </p>

      {error && (
        <p className="text-red-600 font-semibold mb-4">
          {error}
        </p>
      )}

      {/* Preview image (front photo or avatar) */}
      {preview && (
        <img
          src={preview}
          alt="avatar preview"
          className="rounded-lg shadow mb-6 w-60"
        />
      )}

      {/* Final avatar viewer */}
      {status === "AVATAR_READY" && avatarUrl && (
        <div className="w-full max-w-xl mt-4">
          <AvatarViewer avatarUrl={avatarUrl} />
        </div>
      )}

      {/* Manual continue */}
      {status === "AVATAR_READY" && (
        <button
          onClick={() => navigate("/design-studio")}
          className="mt-6 px-6 py-2 bg-black text-white rounded shadow hover:bg-gray-900 transition"
        >
          Continue to Design Studio
        </button>
      )}
    </div>
  );
}

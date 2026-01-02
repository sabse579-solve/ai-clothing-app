// frontend/src/pages/PhotoUpload.jsx
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function PhotoUpload() {
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");

  const [frontPhoto, setFrontPhoto] = useState(null);
  const [sidePhoto, setSidePhoto] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleFile = (e, setter) => {
    const file = e.target.files[0];
    setter(file);
  };

  // Correct upload function using backend route
const uploadPhotos = async () => {
  const formData = new FormData();
  formData.append("front_photo", frontPhoto);
  if (sidePhoto) formData.append("side_photo", sidePhoto);

  return axios.post(`/api/avatar/${userId}/upload-photos`, formData);
};


  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!frontPhoto) {
      setError("Front photo is required.");
      return;
    }

    try {
      setLoading(true);

      await uploadPhotos();

      // Move to the avatar generation progress screen
      navigate("/avatar-progress");

    } catch (err) {
      console.error(err);
      setError("Photo upload failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center p-6">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-xl p-6 w-full max-w-xl"
      >
        <h2 className="text-3xl font-bold mb-4">Upload Your Photos</h2>

        {error && (
          <p className="text-red-600 font-semibold mb-3">{error}</p>
        )}

        {/* FRONT PHOTO */}
        <div className="mb-6">
          <label className="font-semibold">Front Photo *</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleFile(e, setFrontPhoto)}
            className="block mt-2"
            required
          />

          {frontPhoto && (
            <img
              src={URL.createObjectURL(frontPhoto)}
              alt="front preview"
              className="mt-3 w-40 rounded shadow"
            />
          )}
        </div>

        {/* SIDE PHOTO */}
        <div className="mb-6">
          <label className="font-semibold">Side Photo (optional)</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleFile(e, setSidePhoto)}
            className="block mt-2"
          />

          {sidePhoto && (
            <img
              src={URL.createObjectURL(sidePhoto)}
              alt="side preview"
              className="mt-3 w-40 rounded shadow"
            />
          )}
        </div>

        {/* BUTTON */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-black text-white py-3 rounded-md shadow hover:bg-gray-900 transition"
        >
          {loading ? "Uploading..." : "Upload & Continue"}
        </button>
      </form>
    </div>
  );
}

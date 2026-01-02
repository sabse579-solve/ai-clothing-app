import { useNavigate } from "react-router-dom";

export default function PrivacyConsent() {
  const navigate = useNavigate();

  const acceptConsent = () => {
    localStorage.setItem("privacyConsent", "true");
    navigate("/measurements");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="bg-white p-8 rounded-xl shadow max-w-lg w-full">
        <h1 className="text-2xl font-bold mb-4">Privacy & Data Consent</h1>

        <p className="text-gray-700 mb-4">
          We use your photos and measurements to generate a personalized avatar
          and outfit preview.
        </p>

        <ul className="list-disc pl-5 text-gray-700 mb-4">
          <li>Photos are deleted after avatar creation</li>
          <li>Only body measurements are stored for tailoring</li>
          <li>Your data is never sold or shared</li>
        </ul>

        <button
          onClick={acceptConsent}
          className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-900"
        >
          I Agree & Continue
        </button>
      </div>
    </div>
  );
}

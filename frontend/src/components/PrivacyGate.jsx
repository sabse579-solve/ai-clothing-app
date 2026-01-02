import { Navigate } from "react-router-dom";

export default function PrivacyGate({ children }) {
  const consent = localStorage.getItem("privacyConsent");

  if (!consent) {
    return <Navigate to="/privacy-consent" replace />;
  }

  return children;
}

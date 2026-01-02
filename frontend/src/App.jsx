import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import PrivacyGate from "./components/PrivacyGate";

// Pages
import Home from "./pages/Home";
import PrivacyConsent from "./pages/PrivacyConsent";
import Measurements from "./pages/Measurements";
import PhotoUpload from "./pages/PhotoUpload";
import AvatarProgress from "./pages/AvatarProgress";
import DesignStudio from "./pages/DesignStudio";
import Customize from "./pages/Customize";
import TryOn from "./pages/TryOn";
import Store from "./pages/Store";
import Checkout from "./pages/Checkout";

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        {/* PUBLIC */}
        <Route path="/" element={<Home />} />
        <Route path="/store" element={<Store />} />
        <Route path="/privacy-consent" element={<PrivacyConsent />} />

        {/* PROTECTED (CONSENT REQUIRED) */}
        <Route
          path="/measurements"
          element={
            <PrivacyGate>
              <Measurements />
            </PrivacyGate>
          }
        />

        <Route
          path="/photo-upload"
          element={
            <PrivacyGate>
              <PhotoUpload />
            </PrivacyGate>
          }
        />

        <Route
          path="/avatar-progress"
          element={
            <PrivacyGate>
              <AvatarProgress />
            </PrivacyGate>
          }
        />

        <Route
          path="/design-studio"
          element={
            <PrivacyGate>
              <DesignStudio />
            </PrivacyGate>
          }
        />

        <Route
          path="/customize"
          element={
            <PrivacyGate>
              <Customize />
            </PrivacyGate>
          }
        />

        <Route
          path="/tryon"
          element={
            <PrivacyGate>
              <TryOn />
            </PrivacyGate>
          }
        />

        <Route
          path="/checkout"
          element={
            <PrivacyGate>
              <Checkout />
            </PrivacyGate>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

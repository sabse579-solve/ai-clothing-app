// frontend/src/three/attachClothing.js
// Attaches a clothing mesh to avatar and auto-fits it

import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

/**
 * Attach clothing to avatar with auto-fit
 *
 * @param {THREE.Object3D} avatar
 * @param {string} clothingUrl - .glb file (relative or absolute)
 * @param {Object} options
 */
export function attachClothing(avatar, clothingUrl, options = {}) {
  if (!avatar || !clothingUrl) return null;

  const {
    fit = "regular", // tight | regular | loose
    yOffset = 0,     // vertical adjustment
  } = options;

  // 🔑 ALWAYS load from backend (avoid Vite HTML)
  const BASE_URL = "http://localhost:5000";
  const finalUrl = clothingUrl.startsWith("http")
    ? clothingUrl
    : `${BASE_URL}${clothingUrl}`;

  console.log("👕 Loading clothing from:", finalUrl);

  const loader = new GLTFLoader();

  loader.load(
    finalUrl,
    (gltf) => {
      const clothing = gltf.scene;

      clothing.name = "ACTIVE_CLOTHING";

      // -----------------------------
      // 1️⃣ REMOVE OLD CLOTHING
      // -----------------------------
      const old = avatar.getObjectByName("ACTIVE_CLOTHING");
      if (old) {
        avatar.remove(old);
      }

      // -----------------------------
      // 2️⃣ RESET TRANSFORMS
      // -----------------------------
      clothing.position.set(0, yOffset, 0);
      clothing.rotation.set(0, 0, 0);
      clothing.scale.set(1, 1, 1);

      // -----------------------------
      // 3️⃣ AUTO-FIT SCALE
      // -----------------------------
      clothing.scale.copy(avatar.scale);

      const fitFactor = {
        tight: 0.96,
        regular: 1.0,
        loose: 1.05,
      }[fit] || 1.0;

      clothing.scale.multiplyScalar(fitFactor);

      // -----------------------------
      // 4️⃣ ATTACH TO AVATAR
      // -----------------------------
      avatar.add(clothing);
      clothing.updateMatrixWorld(true);

      console.log("👕 Clothing attached:", {
        url: finalUrl,
        fit,
      });
    },
    undefined,
    (err) => {
      console.error("❌ Clothing GLB load failed");
      console.error("URL:", finalUrl);
      console.error(err);
    }
  );

  return null;
}
  
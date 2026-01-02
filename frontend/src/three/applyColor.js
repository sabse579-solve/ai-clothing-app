// frontend/src/three/applyColor.js
import * as THREE from "three";

/**
 * Applies solid color OR gradient to clothing
 */
export function applyColor(clothing, color) {
  if (!clothing || !color) return;

  clothing.traverse((obj) => {
    if (!obj.isMesh || !obj.material) return;

    // 🟢 SOLID COLOR
    if (typeof color === "string") {
      obj.material.color.set(color);
      obj.material.map = null;
    }

    // 🌈 GRADIENT COLOR
    if (Array.isArray(color)) {
      const canvas = document.createElement("canvas");
      canvas.width = 256;
      canvas.height = 256;

      const ctx = canvas.getContext("2d");
      const grad = ctx.createLinearGradient(0, 0, 256, 256);
      grad.addColorStop(0, color[0]);
      grad.addColorStop(1, color[1]);

      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 256, 256);

      const texture = new THREE.CanvasTexture(canvas);
      obj.material.map = texture;
      obj.material.color.set("#ffffff");
    }

    obj.material.needsUpdate = true;
  });

  console.log("🎨 Color applied:", color);
}

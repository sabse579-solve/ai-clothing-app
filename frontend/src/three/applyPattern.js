// frontend/src/three/applyPattern.js
// Applies fabric patterns using texture maps

import * as THREE from "three";

export function applyPattern(clothing, patternType) {
  if (!clothing || !patternType) return;

  const pattern = patternType.toLowerCase().replace(/ /g, "-");

  // Solid → no texture (keep color)
  if (pattern === "solid") {
    clothing.traverse((obj) => {
      if (obj.isMesh && obj.material?.map) {
        obj.material.map = null;
        obj.material.needsUpdate = true;
      }
    });
    return;
  }

  // 🔹 Pattern → texture mapping
  const texturePath = `/patterns/${pattern}.png`;

  const loader = new THREE.TextureLoader();

  loader.load(
    texturePath,
    (texture) => {
      texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
      texture.repeat.set(2, 2);

      clothing.traverse((obj) => {
        if (!obj.isMesh || !obj.material) return;

        obj.material.map = texture;

        // Embroidery / zari look
        if (pattern === "embroidery" || pattern === "zari") {
          obj.material.metalness = 0.6;
          obj.material.roughness = 0.4;
        }

        // Soft patterns
        if (pattern === "ombre" || pattern === "tie-dye") {
          obj.material.roughness = 0.7;
        }

        obj.material.needsUpdate = true;
      });

      console.log("🎨 Pattern applied:", patternType);
    },
    undefined,
    (err) => {
      console.warn("⚠️ Pattern texture not found:", texturePath);
    }
  );
}

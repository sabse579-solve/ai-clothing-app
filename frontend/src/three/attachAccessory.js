// frontend/src/three/attachAccessory.js
// Attaches accessories to avatar anchor points

import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

export function attachAccessory(avatar, accessoryType) {
  if (!avatar || !accessoryType) return;

  const type = accessoryType.toLowerCase();

  // 🔹 Accessory → file + anchor mapping
  const ACCESSORY_MAP = {
    "necklace": { file: "necklace.glb", anchor: "neck", scale: 0.4 },
    "choker": { file: "necklace.glb", anchor: "neck", scale: 0.35 },
    "earrings": { file: "earrings.glb", anchor: "head", scale: 0.3 },
    "sunglasses": { file: "sunglasses.glb", anchor: "head", scale: 0.35 },
    "handbag": { file: "handbag.glb", anchor: "hips", scale: 0.45 },
    "belt": { file: "belt.glb", anchor: "waist", scale: 0.4 },
    "heels": { file: "heels.glb", anchor: "feet", scale: 0.5 },
    "sneakers": { file: "sneakers.glb", anchor: "feet", scale: 0.5 },
    "watch": { file: "watch.glb", anchor: "left_hand", scale: 0.25 },
    "dupatta": { file: "dupatta.glb", anchor: "shoulders", scale: 1.0 },
  };

  const config = ACCESSORY_MAP[type];
  if (!config) {
    console.warn("⚠️ No accessory config for:", accessoryType);
    return;
  }

  // 🔹 Find anchor in avatar
  let anchor = null;
  avatar.traverse((obj) => {
    if (obj.name.toLowerCase().includes(config.anchor)) {
      anchor = obj;
    }
  });

  if (!anchor) {
    console.warn("⚠️ Anchor not found:", config.anchor);
    return;
  }

  // 🔹 Load accessory
  const loader = new GLTFLoader();
  loader.load(
    `/accessories/${config.file}`,
    (gltf) => {
      const accessory = gltf.scene;
      accessory.name = `ACCESSORY_${type}`;

      // Remove existing same accessory
      const existing = avatar.getObjectByName(accessory.name);
      if (existing) existing.removeFromParent();

      accessory.scale.setScalar(config.scale);
      accessory.position.set(0, 0, 0);
      accessory.rotation.set(0, 0, 0);

      anchor.add(accessory);

      console.log("👜 Accessory attached:", accessoryType);
    },
    undefined,
    (err) => {
      console.error("❌ Failed to load accessory:", err);
    }
  );
}

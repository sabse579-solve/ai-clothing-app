// backend/avatar/exportAvatarSnapshot.js
// Exports a scaled avatar GLB snapshot for caching
// Uses Three.js GLTFExporter (Node-safe)

import fs from "fs";
import path from "path";
import { GLTFExporter } from "three/examples/jsm/exporters/GLTFExporter.js";

/**
 * Export avatar scene as GLB snapshot
 *
 * @param {THREE.Object3D} avatarScene - fully prepared avatar (scaled + outfit)
 * @param {string} userId
 * @param {string} gender
 * @param {string} bodyFit
 */
export async function exportAvatarSnapshot(
  avatarScene,
  userId,
  gender,
  bodyFit = "regular"
) {
  if (!avatarScene || !userId) return null;

  const userDir = path.join(
    process.cwd(),
    "backend/public/avatars/cached",
    userId
  );

  const fileName = `${gender}_${bodyFit}.glb`;
  const filePath = path.join(userDir, fileName);

  // 1️⃣ Avoid re-export (HARD CACHE)
  if (fs.existsSync(filePath)) {
    console.log("🟢 Cached avatar exists, skipping export:", filePath);
    return `/avatars/cached/${userId}/${fileName}`;
  }

  // 2️⃣ Ensure user directory exists
  fs.mkdirSync(userDir, { recursive: true });

  // 3️⃣ Export GLB
  const exporter = new GLTFExporter();

  return new Promise((resolve, reject) => {
    exporter.parse(
      avatarScene,
      (glb) => {
        fs.writeFileSync(filePath, Buffer.from(glb));
        console.log("✅ Avatar snapshot exported:", filePath);
        resolve(`/avatars/cached/${userId}/${fileName}`);
      },
      (err) => {
        console.error("❌ GLB export failed:", err);
        reject(err);
      },
      { binary: true }
    );
  });
}

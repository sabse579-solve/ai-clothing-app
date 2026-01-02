// frontend/src/three/applySleeve.js
// Applies sleeve type by toggling / scaling sleeve meshes

export function applySleeve(clothing, sleeveType) {
  if (!clothing || !sleeveType) return;

  const type = sleeveType.toLowerCase();

  // 🔹 Sleeve behavior map
  const SLEEVE_MAP = {
    // No sleeves
    "sleeveless": { visible: false },

    "cold-shoulder-sleeve": { visible: false },
    "off-shoulder-sleeve": { visible: false },

    // Short sleeves
    "cap-sleeve": { scaleY: 0.6 },
    "short-sleeve": { scaleY: 0.7 },
    "flutter-sleeve": { scaleY: 0.75 },

    // Mid sleeves
    "half-sleeve": { scaleY: 0.85 },
    "elbow-sleeve": { scaleY: 0.9 },
    "3/4-sleeve": { scaleY: 0.95 },

    // Long sleeves
    "long-sleeve": { scaleY: 1.0 },
    "bishop-sleeve": { scaleY: 1.05 },
    "bell-sleeve": { scaleY: 1.1 },
    "lantern-sleeve": { scaleY: 1.15 },

    // Wide / dramatic
    "puff-sleeve": { scaleX: 1.3, scaleY: 0.8 },
    "balloon-sleeve": { scaleX: 1.4, scaleY: 0.9 },
    "batwing-sleeve": { scaleX: 1.5 },

    // Asymmetric
    "one-sleeve-design": { asymmetric: true },
  };

  const config = SLEEVE_MAP[type] || { scaleY: 1.0 };

  clothing.traverse((obj) => {
    if (!obj.isMesh) return;

    const name = obj.name.toLowerCase();

    if (!name.includes("sleeve")) return;

    // ❌ Hide sleeves
    if (config.visible === false) {
      obj.visible = false;
      return;
    }

    // 🔄 Reset visibility
    obj.visible = true;

    // 📐 Scale adjustments
    if (config.scaleX) obj.scale.x = config.scaleX;
    if (config.scaleY) obj.scale.y = config.scaleY;

    // 🔀 Asymmetric sleeve (hide right sleeve)
    if (config.asymmetric && name.includes("right")) {
      obj.visible = false;
    }
  });

  clothing.updateMatrixWorld(true);

  console.log("👕 Sleeve applied:", sleeveType);
}

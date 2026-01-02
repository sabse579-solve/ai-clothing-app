// frontend/src/three/applyFabric.js

export function applyFabric(clothing, fabricName) {
  if (!clothing || !fabricName) return;

  const FABRIC_MAP = {
    "Cotton":      { roughness: 0.9, metalness: 0.0 },
    "Linen":       { roughness: 0.85, metalness: 0.0 },
    "Silk":        { roughness: 0.25, metalness: 0.1 },
    "Satin":       { roughness: 0.2, metalness: 0.15 },
    "Velvet":      { roughness: 0.95, metalness: 0.0 },
    "Chiffon":     { roughness: 0.7, metalness: 0.0 },
    "Georgette":   { roughness: 0.75, metalness: 0.0 },
    "Crepe":       { roughness: 0.8, metalness: 0.0 },
    "Organza":     { roughness: 0.6, metalness: 0.05 },
    "Denim":       { roughness: 0.85, metalness: 0.0 },
    "Wool":        { roughness: 0.9, metalness: 0.0 },
    "Leather":     { roughness: 0.4, metalness: 0.25 },
    "Rayon":       { roughness: 0.65, metalness: 0.0 },
    "Nylon":       { roughness: 0.5, metalness: 0.05 },
    "Polyester":   { roughness: 0.55, metalness: 0.05 },
    "Chambray":    { roughness: 0.8, metalness: 0.0 },
    "Khadi":       { roughness: 0.95, metalness: 0.0 },
    "Banarasi Silk": { roughness: 0.3, metalness: 0.2 },
    "Kanjivaram Silk": { roughness: 0.28, metalness: 0.25 },
  };

  const fabric = FABRIC_MAP[fabricName];
  if (!fabric) return;

  clothing.traverse((obj) => {
    if (obj.isMesh && obj.material) {
      obj.material.roughness = fabric.roughness;
      obj.material.metalness = fabric.metalness;
      obj.material.needsUpdate = true;
    }
  });

  console.log("🧵 Fabric applied:", fabricName);
}

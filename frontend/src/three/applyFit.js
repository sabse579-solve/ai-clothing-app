// frontend/src/three/applyFit.js
// Applies fit adjustment to clothing (runtime, no Blender)

export function applyFit(clothing, fitType) {
  if (!clothing || !fitType) return;

  // 🔹 Normalize incoming fit string
  const fit = fitType.toLowerCase();

  // 🔹 Master fit mapping
  const FIT_MAP = {
    // Tight / body hugging
    "skinny-fit": 0.92,
    "slim-fit": 0.94,
    "bodycon-fit": 0.9,
    "compression-fit": 0.88,
    "contour-fit": 0.92,
    "corset-fit": 0.9,

    // Regular
    "regular-fit": 1.0,
    "tailored-fit": 0.98,
    "straight-fit": 1.0,
    "comfort-fit": 1.02,
    "performance-fit": 0.98,
    "active-fit": 0.98,

    // Relaxed / loose
    "relaxed-fit": 1.05,
    "loose-fit": 1.08,
    "baggy-fit": 1.12,
    "boxy-fit": 1.1,
    "oversized-fit": 1.15,
    "oversized-box-fit": 1.18,

    // Streetwear
    "drop-shoulder-fit": 1.12,
    "cropped-fit": 0.95,
    "longline-fit": 1.1,
    "skater-fit": 1.15,

    // Ethnic / flowing
    "anarkali-fit": 1.15,
    "flared-lehenga-fit": 1.2,
    "layered-lehenga-fit": 1.18,
    "sharara-fit": 1.15,
    "gharara-fit": 1.15,

    // Structured / couture
    "structured-fit": 1.0,
    "sculpted-fit": 0.96,
    "mermaid-fit": 0.95,
    "trumpet-fit": 0.96,
    "ball-gown-fit": 1.2,

    // Outerwear
    "trench-fit": 1.1,
    "overcoat-fit": 1.12,
    "puffer-fit": 1.18,
    "cape-fit": 1.2,
    "poncho-fit": 1.25,
  };

  const scaleFactor = FIT_MAP[fit] || 1.0;

  // 🔹 Apply uniform scale for now
  clothing.scale.multiplyScalar(scaleFactor);

  clothing.updateMatrixWorld(true);

  console.log("👗 Fit applied:", fitType, scaleFactor);
}

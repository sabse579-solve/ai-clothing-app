// frontend/src/three/applyNeckline.js
// Applies neckline style by toggling / adjusting neckline meshes

export function applyNeckline(clothing, necklineType) {
  if (!clothing || !necklineType) return;

  const type = necklineType.toLowerCase().replace(/ /g, "-");

  // 🔹 Neckline behavior map
  const NECKLINE_MAP = {
    // Basic
    "round-neck":        { depth: 1.0 },
    "crew-neck":         { depth: 1.0 },
    "scoop-neck":        { depth: 1.05 },
    "boat-neck":         { width: 1.1 },
    "v-neck":            { depth: 1.15 },
    "deep-v-neck":       { depth: 1.25 },
    "square-neck":       { width: 1.05 },
    "u-neck":            { depth: 1.1 },
    "sweetheart-neck":   { depth: 1.2 },

    // Modern
    "halter-neck":       { hideFront: true },
    "cowl-neck":         { depth: 1.2 },
    "off-shoulder":      { hideCollar: true },
    "cold-shoulder":     { hideCollar: true },
    "one-shoulder":      { asymmetric: true },
    "asymmetric-neck":   { asymmetric: true },
    "keyhole-neck":      { cutout: true },
    "mock-neck":         { raise: true },
    "turtle-neck":       { raise: true },
    "strapless":         { hideCollar: true },
    "plunge-neck":       { depth: 1.3 },
    "wrap-neck-(surplice)": { depth: 1.2 },

    // Formal / Designer
    "illusion-neck":     { transparent: true },
    "queen-anne-neckline": { raise: true },
    "portrait-neck":     { width: 1.1 },
    "jewel-neck":        { depth: 1.0 },
    "bardot-neck":       { hideCollar: true },
    "corset-neckline":   { depth: 1.25 },
    "empire-neckline":   { depth: 1.15 },

    // Ethnic
    "mandarin-collar":   { raise: true },
    "deep-back-neck":    { hideBack: true },
    "princess-neck":    { depth: 1.1 },

    // Artistic
    "cut-out-neckline":  { cutout: true },
    "mesh-panel-neck":   { transparent: true },
    "twist-front-neck":  { depth: 1.15 },
    "draped-neck":       { depth: 1.2 },
  };

  const config = NECKLINE_MAP[type] || {};

  clothing.traverse((obj) => {
    if (!obj.isMesh) return;

    const name = obj.name.toLowerCase();

    // Identify neckline-related meshes
    const isNeck =
      name.includes("neck") ||
      name.includes("collar") ||
      name.includes("upper") ||
      name.includes("panel");

    if (!isNeck) return;

    // Reset visibility
    obj.visible = true;

    // Hide collar/front/back
    if (config.hideCollar && name.includes("collar")) {
      obj.visible = false;
    }
    if (config.hideFront && name.includes("front")) {
      obj.visible = false;
    }
    if (config.hideBack && name.includes("back")) {
      obj.visible = false;
    }

    // Asymmetric neckline
    if (config.asymmetric && name.includes("right")) {
      obj.visible = false;
    }

    // Depth / width adjustments
    if (config.depth) {
      obj.scale.y *= config.depth;
    }
    if (config.width) {
      obj.scale.x *= config.width;
    }

    // Raised necklines
    if (config.raise) {
      obj.position.y += 0.03;
    }

    // Transparency / illusion
    if (config.transparent && obj.material) {
      obj.material.transparent = true;
      obj.material.opacity = 0.5;
    }
  });

  clothing.updateMatrixWorld(true);

  console.log("👗 Neckline applied:", necklineType);
}

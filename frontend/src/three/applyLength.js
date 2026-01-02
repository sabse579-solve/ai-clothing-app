// frontend/src/three/applyLength.js
// Applies garment length adjustment (runtime)

export function applyLength(clothing, lengthType) {
  if (!clothing || !lengthType) return;

  const length = lengthType.toLowerCase();

  // 🔹 Length mapping: scaleY + offsetY
  const LENGTH_MAP = {
    // Tops
    "crop-length":        { scaleY: 0.85, offsetY: 0.05 },
    "waist-length":       { scaleY: 0.9,  offsetY: 0.03 },
    "hip-length":         { scaleY: 0.95, offsetY: 0.02 },
    "regular-length":     { scaleY: 1.0,  offsetY: 0 },
    "longline":            { scaleY: 1.1,  offsetY: -0.03 },
    "tunic-length":       { scaleY: 1.15, offsetY: -0.05 },
    "peplum-length":      { scaleY: 1.05, offsetY: -0.02 },

    // Dresses
    "mini":               { scaleY: 0.85, offsetY: 0.06 },
    "above-knee":         { scaleY: 0.9,  offsetY: 0.04 },
    "knee-length":        { scaleY: 0.95, offsetY: 0.02 },
    "midi":               { scaleY: 1.05, offsetY: -0.02 },
    "tea-length":         { scaleY: 1.1,  offsetY: -0.03 },
    "ankle-length":       { scaleY: 1.15, offsetY: -0.05 },
    "maxi":               { scaleY: 1.2,  offsetY: -0.08 },
    "gown-length":        { scaleY: 1.25, offsetY: -0.1 },
    "high-low":           { scaleY: 1.05, offsetY: -0.03 },
    "asymmetric":         { scaleY: 1.05, offsetY: -0.03 },
    "slit-dress-length":  { scaleY: 1.1,  offsetY: -0.04 },
    "train":              { scaleY: 1.3,  offsetY: -0.12 },

    // Skirts
    "mini-skirt":         { scaleY: 0.85, offsetY: 0.05 },
    "knee-length-skirt":  { scaleY: 0.95, offsetY: 0.02 },
    "midi-skirt":         { scaleY: 1.05, offsetY: -0.02 },
    "tea-length-skirt":   { scaleY: 1.1,  offsetY: -0.03 },
    "maxi-skirt":         { scaleY: 1.2,  offsetY: -0.08 },

    // Ethnic
    "short-kurti":        { scaleY: 0.9,  offsetY: 0.03 },
    "knee-length-kurti":  { scaleY: 1.0,  offsetY: 0 },
    "calf-length-kurti":  { scaleY: 1.1,  offsetY: -0.03 },
    "ankle-length-kurti": { scaleY: 1.2,  offsetY: -0.06 },
    "floor-length-kurti": { scaleY: 1.25, offsetY: -0.08 },
    "lehenga-floor-length": { scaleY: 1.3, offsetY: -0.1 },

    // Pants
    "cropped-pants":      { scaleY: 0.9,  offsetY: 0.04 },
    "ankle-length-pants": { scaleY: 1.0,  offsetY: 0 },
    "full-length-pants":  { scaleY: 1.05, offsetY: -0.02 },
    "floor-length-pants": { scaleY: 1.15, offsetY: -0.04 },
    "palazzo-length":     { scaleY: 1.1,  offsetY: -0.03 },
    "sharara-length":     { scaleY: 1.2,  offsetY: -0.06 },
  };

  const config = LENGTH_MAP[length] || { scaleY: 1.0, offsetY: 0 };

  // 🔹 Apply length scaling
  clothing.scale.y *= config.scaleY;
  clothing.position.y += config.offsetY;

  clothing.updateMatrixWorld(true);

  console.log("📏 Length applied:", lengthType, config);
}

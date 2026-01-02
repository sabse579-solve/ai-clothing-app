// Smart, RPM-safe body scaling
// Optimized for stitched outfit try-on (MVP level realism)

export function applyMeasurements(avatar, measurements = {}) {
  if (!avatar) return;

  /* ------------------------------------
     1️⃣ RESOLVE GENDER
  -------------------------------------*/
  const gender =
    measurements.gender === "male" ? "male" : "female";

  /* ------------------------------------
     2️⃣ BASE BODY REFERENCES
  -------------------------------------*/
  const BASE = {
    male: {
      height: 172,
      shoulders: 45,
      waist: 80,
      hips: 96,
      legRatio: 0.52,
    },
    female: {
      height: 160,
      shoulders: 40,
      waist: 72,
      hips: 98,
      legRatio: 0.54,
    },
  };

  const REF = BASE[gender];

  /* ------------------------------------
     3️⃣ BODY FIT BIAS (MVP)
  -------------------------------------*/
  const BODY_FIT_BIAS = {
    slim: { x: 0.97, z: 0.96 },
    regular: { x: 1.0, z: 1.0 },
    tailored: { x: 0.99, z: 0.99 },
    comfort: { x: 1.02, z: 1.03 },
    relaxed: { x: 1.04, z: 1.05 },
  };

  const bodyFit = measurements.bodyFit || "regular";
  const bias = BODY_FIT_BIAS[bodyFit] || BODY_FIT_BIAS.regular;

  /* ------------------------------------
     4️⃣ SAFE CLAMP
  -------------------------------------*/
  const clamp = (v, min = 0.92, max = 1.08) =>
    Math.min(max, Math.max(min, v));

  /* ------------------------------------
     5️⃣ HEIGHT SCALE
  -------------------------------------*/
  let heightScale = 1;
  if (measurements.height) {
    heightScale = clamp(measurements.height / REF.height);
  }

  /* ------------------------------------
     6️⃣ WIDTH & DEPTH
  -------------------------------------*/
  let widthScale = 1;
  let depthScale = 1;

  if (measurements.shoulders) {
    widthScale = clamp(measurements.shoulders / REF.shoulders);
  }

  if (measurements.waist || measurements.hips) {
    const ratios = [];
    if (measurements.waist) ratios.push(measurements.waist / REF.waist);
    if (measurements.hips) ratios.push(measurements.hips / REF.hips);
    depthScale = clamp(
      ratios.reduce((a, b) => a + b, 0) / ratios.length
    );
  }

  /* ------------------------------------
     7️⃣ APPLY SCALE (ONCE)
  -------------------------------------*/
  avatar.scale.set(
    widthScale * bias.x,
    heightScale,
    depthScale * bias.z
  );

  avatar.updateMatrixWorld(true);

  console.log("🧍 Avatar scaled:", {
    gender,
    bodyFit,
    heightScale,
    widthScale,
    depthScale,
  });
}

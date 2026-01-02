// frontend/three/applyPatternDeltas.js
import * as THREE from "three";

/**
 * Converts resolved measurements into mesh scale
 * This is visual deformation only (safe)
 */
export function applyPatternDeltas({
  avatar,
  baseMeasurements,
  resolvedMeasurements,
}) {
  if (!avatar) return;

  const scale = new THREE.Vector3(
    resolvedMeasurements.waist / baseMeasurements.waist || 1,
    resolvedMeasurements.height / baseMeasurements.height || 1,
    resolvedMeasurements.chest / baseMeasurements.chest || 1
  );

  avatar.scale.lerp(scale, 0.3);
}

// backend/patterns/patternRules.js

import { BasePatterns } from "./basePatterns.js";
import { PatternDeltas } from "./patternDeltas.js";

export function resolvePatternRules(patternId) {
  const base = BasePatterns[patternId];
  if (!base || base.status !== "ACTIVE") return null;

  const resolvedDeltas = {};

  for (const deltaKey of base.allowedDeltas) {
    const delta = PatternDeltas[deltaKey];
    if (!delta) {
      throw new Error(`Delta ${deltaKey} not defined`);
    }
    resolvedDeltas[deltaKey] = delta;
  }

  return {
    id: base.id,
    garmentType: base.garmentType,
    gender: base.gender,

    anchors: base.anchors,
    requiredMeasurements: base.requiredMeasurements,
    easeAllowance: base.easeAllowance,

    fabricConstraints: base.fabricConstraints,

    allowedDeltas: resolvedDeltas,

    approvedBy: base.approvedBy,
    version: base.id,
  };
}

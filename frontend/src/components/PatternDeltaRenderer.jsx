// frontend/components/PatternDeltaRenderer.jsx
import React from "react";

/**
 * Renders ONE pattern-safe delta control
 * 🔒 UI options are 100% driven by backend pattern rules
 */
export default function PatternDeltaRenderer({
  delta,
  value,
  onChange,
  disabled = false,
}) {
  if (!delta) return null;

  const label = delta.ui?.label || delta.key;
  const unit = delta.unit ? ` ${delta.unit}` : "";

  /* =====================================================
     ENUM DELTA (buttons)
  ===================================================== */
  if (delta.type === "enum") {
    return (
      <div className="space-y-2">
        <p className="font-medium text-gray-800">
          {label}
        </p>

        <div className="flex flex-wrap gap-2">
          {delta.values.map((v) => (
            <button
              key={v}
              type="button"
              disabled={disabled}
              onClick={() => onChange(v)}
              className={`
                px-3 py-1 rounded-md border text-sm
                transition
                ${
                  value === v
                    ? "bg-black text-white border-black"
                    : "bg-white text-gray-700 border-gray-300"
                }
                ${
                  disabled
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:bg-gray-100"
                }
              `}
            >
              {v}
            </button>
          ))}
        </div>
      </div>
    );
  }

  /* =====================================================
     NUMERIC / RATIO DELTA (slider)
  ===================================================== */
  if (delta.type === "numeric" || delta.type === "ratio") {
    const step = delta.type === "numeric" ? 1 : 0.1;
    const displayValue = value ?? delta.min;

    return (
      <div className="space-y-2">
        <p className="font-medium text-gray-800">
          {label}:{" "}
          <span className="font-semibold">
            {displayValue}
            {unit}
          </span>
        </p>

        <input
          type="range"
          min={delta.min}
          max={delta.max}
          step={step}
          disabled={disabled}
          value={displayValue}
          onChange={(e) => onChange(Number(e.target.value))}
          className={`
            w-full
            ${disabled ? "opacity-50 cursor-not-allowed" : ""}
          `}
        />
      </div>
    );
  }

  return null;
}

// frontend/src/pages/Customize.jsx
import React, { useState, useMemo, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import ColorPicker from "../components/ColorPicker";
import FabricSelector from "../components/FabricSelector";
import AccessoryPicker from "../components/AccessoryPicker";
import AvatarViewer from "../components/AvatarViewer";
import PatternDeltaRenderer from "../components/PatternDeltaRenderer";

/* ------------------------------------
   CANONICAL OUTFIT CONFIG
-------------------------------------*/
const createInitialConfig = () => ({
  meta: {
    gender: "female",
    outfitType: "lehenga",
  },
  garment: {
    fabric: "silk",
    color: "#800000", // visual only
  },
  patternDeltas: {}, // 🔒 stitch-safe only
  accessories: [],
});

/* ------------------------------------
   2D PREVIEW LABEL
-------------------------------------*/
const build2DPreviewLabel = (config) => {
  const lines = [
    `Outfit: ${config.meta.outfitType}`,
    `Fabric: ${config.garment.fabric}`,
    `Color: ${config.garment.color}`,
  ];

  Object.entries(config.patternDeltas).forEach(([k, v]) => {
    lines.push(`${k}: ${v}`);
  });

  return lines.join("\n");
};

export default function Customize() {
  const navigate = useNavigate();
  const location = useLocation();

  const query = new URLSearchParams(location.search);
  const baseImage = query.get("img");

  const [outfitConfig, setOutfitConfig] = useState(createInitialConfig);
  const [allowedDeltas, setAllowedDeltas] = useState([]);

  /* -----------------------------
     UNDO / REDO (IMMUTABLE)
  ------------------------------*/
  const [history, setHistory] = useState([]);
  const [future, setFuture] = useState([]);

  const commitChange = (updater) => {
    setHistory((h) => [...h, structuredClone(outfitConfig)]);
    setFuture([]);
    setOutfitConfig((prev) =>
      typeof updater === "function" ? updater(prev) : updater
    );
  };

  const undo = () => {
    if (!history.length) return;
    const prev = history[history.length - 1];
    setFuture((f) => [structuredClone(outfitConfig), ...f]);
    setHistory((h) => h.slice(0, -1));
    setOutfitConfig(prev);
  };

  const redo = () => {
    if (!future.length) return;
    const next = future[0];
    setHistory((h) => [...h, structuredClone(outfitConfig)]);
    setFuture((f) => f.slice(1));
    setOutfitConfig(next);
  };

  /* -----------------------------
     FETCH PATTERN RULES
  ------------------------------*/
  useEffect(() => {
    const fetchPatternRules = async () => {
      try {
        const res = await fetch(
          `/api/patterns/allowed?garmentType=${outfitConfig.meta.outfitType}&gender=${outfitConfig.meta.gender}&fabric=${outfitConfig.garment.fabric}`
        );

        const data = await res.json();
        setAllowedDeltas(Array.isArray(data.deltas) ? data.deltas : []);
      } catch (err) {
        console.error("❌ Failed to load pattern rules", err);
        setAllowedDeltas([]);
      }
    };

    fetchPatternRules();
  }, [
    outfitConfig.meta.outfitType,
    outfitConfig.meta.gender,
    outfitConfig.garment.fabric,
  ]);

  /* -----------------------------
     DERIVED PREVIEW
  ------------------------------*/
  const previewLabel = useMemo(
    () => build2DPreviewLabel(outfitConfig),
    [outfitConfig]
  );

  /* -----------------------------
     GO TO TRY-ON
  ------------------------------*/
  const goToTryOn = () => {
    navigate(
      `/tryon?img=${encodeURIComponent(baseImage)}&config=${encodeURIComponent(
        JSON.stringify(outfitConfig)
      )}`
    );
  };

  return (
    <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-10">
      {/* LEFT */}
      <div className="flex flex-col items-center gap-6">
        <h2 className="text-2xl font-bold">Live Preview</h2>

        <div className="relative max-w-md w-full">
          <img src={baseImage} className="rounded-xl shadow-lg w-full" />
          <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-white text-sm p-3 rounded-b-xl whitespace-pre-line">
            {previewLabel}
          </div>
        </div>

        <div className="flex gap-3">
          <button onClick={undo} disabled={!history.length}>
            Undo
          </button>
          <button onClick={redo} disabled={!future.length}>
            Redo
          </button>
        </div>

        <AvatarViewer
          avatarUrl={localStorage.getItem("avatarUrl")}
          userId={localStorage.getItem("userId")}
          outfitConfig={outfitConfig}
        />
      </div>

      {/* RIGHT */}
      <div className="space-y-8">
        {/* Visual-only */}
        <ColorPicker
          onChange={(c) =>
            commitChange((prev) => ({
              ...prev,
              garment: { ...prev.garment, color: c },
            }))
          }
        />

        {/* Fabric changes pattern legality */}
        <FabricSelector
          onSelect={(f) =>
            commitChange((prev) => ({
              ...prev,
              garment: { ...prev.garment, fabric: f },
              patternDeltas: {}, // 🔥 reset invalid deltas
            }))
          }
        />

        {/* 🔒 PATTERN-SAFE CONTROLS */}
        {allowedDeltas.map((delta) => (
          <div key={delta.key}>
            <label className="font-semibold block mb-2">{delta.key}</label>
            <PatternDeltaRenderer
              delta={delta}
              value={outfitConfig.patternDeltas[delta.key]}
              onChange={(value) =>
                commitChange((prev) => ({
                  ...prev,
                  patternDeltas: {
                    ...prev.patternDeltas,
                    [delta.key]: value,
                  },
                }))
              }
            />
          </div>
        ))}

        <AccessoryPicker
          onSelect={(item) =>
            commitChange((prev) => ({
              ...prev,
              accessories: [...new Set([...prev.accessories, item])],
            }))
          }
        />

        <button
          onClick={goToTryOn}
          className="mt-6 px-6 py-3 bg-black text-white rounded-lg shadow"
        >
          Try On This Outfit
        </button>
      </div>
    </div>
  );
}

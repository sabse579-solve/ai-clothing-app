// frontend/src/components/AvatarViewer.jsx
import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import axios from "axios";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

import { applyPatternDeltas } from "../three/applyPatternDeltas";
import { animateScale } from "../three/animateScale";
import { applyColor } from "../three/applyColor";
import { applyFabric } from "../three/applyFabric";
import { applyPattern } from "../three/applyPattern";
import { applySleeve } from "../three/applySleeve";
import { applyNeckline } from "../three/applyNeckline";
import { applyLength } from "../three/applyLength";
import { attachAccessory } from "../three/attachAccessory";

const AvatarViewer = ({
  avatarUrl,
  outfitConfig, // 🔑 SINGLE SOURCE OF TRUTH
  userId,
}) => {
  const containerRef = useRef(null);
  const avatarRef = useRef(null);
  const outfitRef = useRef(null);
  const baseMeasurementsRef = useRef(null);

  /* =====================================================
     INIT SCENE + LOAD AVATAR (ONCE)
  ===================================================== */
  useEffect(() => {
    if (!avatarUrl || !containerRef.current) return;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf4f4f4);

    const width = containerRef.current.clientWidth;
    const height = 500;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 1.6, 3);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(window.devicePixelRatio);

    containerRef.current.innerHTML = "";
    containerRef.current.appendChild(renderer.domElement);

    scene.add(new THREE.AmbientLight(0xffffff, 0.7));
    const dirLight = new THREE.DirectionalLight(0xffffff, 0.8);
    dirLight.position.set(2, 4, 2);
    scene.add(dirLight);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.target.set(0, 1, 0);
    controls.update();

    const loader = new GLTFLoader();
    loader.load(
      avatarUrl,
      async (gltf) => {
        avatarRef.current = gltf.scene;

        outfitRef.current =
          avatarRef.current.getObjectByProperty("type", "SkinnedMesh") ||
          avatarRef.current;

        scene.add(avatarRef.current);

        /* ------------------------------------
           APPLY BASE SCALE (CACHE ONLY)
        ------------------------------------- */
        try {
          const res = await axios.get(`/api/avatar/${userId}/status`);
          const cached = res.data?.scaleCache;

          if (cached?.x && cached?.y && cached?.z) {
            animateScale(
              avatarRef.current,
              new THREE.Vector3(cached.x, cached.y, cached.z),
              300
            );
          }

          baseMeasurementsRef.current = res.data?.measurements || null;
        } catch {
          baseMeasurementsRef.current = null;
        }
      },
      undefined,
      (err) => {
        console.error("❌ Avatar load failed:", err);
      }
    );

    const animate = () => {
      renderer.render(scene, camera);
      controls.update();
      requestAnimationFrame(animate);
    };
    animate();

    return () => {
      controls.dispose();
      renderer.dispose();
      scene.clear();
    };
  }, [avatarUrl, userId]);

  /* =====================================================
     🔥 PATTERN DELTA → BODY DEFORMATION
  ===================================================== */
  useEffect(() => {
    if (
      !outfitConfig?.patternDeltas ||
      !avatarRef.current ||
      !baseMeasurementsRef.current
    )
      return;

    (async () => {
      try {
        const res = await axios.post("/api/avatar/resolve-deltas", {
          basePatternId: outfitConfig.meta.basePatternId,
          measurements: baseMeasurementsRef.current,
          patternDeltas: outfitConfig.patternDeltas,
        });

        applyPatternDeltas({
          avatar: avatarRef.current,
          baseMeasurements: baseMeasurementsRef.current,
          resolvedMeasurements: res.data,
        });
      } catch (err) {
        console.warn("⚠️ Pattern delta deformation failed", err);
      }
    })();
  }, [outfitConfig?.patternDeltas]);

  /* =====================================================
     🎨 VISUAL CUSTOMIZATION (SAFE & INSTANT)
  ===================================================== */
  useEffect(() => {
    if (!outfitConfig || !avatarRef.current || !outfitRef.current) return;

    const { garment, accessories } = outfitConfig;

    if (garment?.color) applyColor(outfitRef.current, garment.color);
    if (garment?.fabric) applyFabric(outfitRef.current, garment.fabric);
    if (garment?.pattern) applyPattern(outfitRef.current, garment.pattern);
    if (garment?.sleeve) applySleeve(outfitRef.current, garment.sleeve);
    if (garment?.neckline) applyNeckline(outfitRef.current, garment.neckline);
    if (garment?.length) applyLength(outfitRef.current, garment.length);

    if (Array.isArray(accessories)) {
      attachAccessory(avatarRef.current, accessories);
    }
  }, [outfitConfig]);

  return (
    <div
      ref={containerRef}
      className="w-full max-w-xl mx-auto rounded-xl overflow-hidden"
      style={{ height: "500px" }}
    />
  );
};

export default AvatarViewer;

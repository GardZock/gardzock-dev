"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { useGLTF, Environment } from "@react-three/drei";
import { Scene } from "../scene/Scene";
import { CustomCamera } from "../scene/Camera";
import { BedPanel } from "../bed/BedPanel";
import { MuteButton } from "../MuteButton";
import { useBenchmarkAndLoad } from "../../hooks/useBenchmarkAndLoad";
import { Desktop3DLoader } from "./Desktop3DLoader";

export function Desktop3DView() {
  const { progress, isComplete, shouldReduceMotion, fps, statusLog } =
    useBenchmarkAndLoad();

  return (
    <main style={{ width: "100vw", height: "100vh", overflow: "hidden", position: "relative" }}>
      <Desktop3DLoader
        progress={progress}
        isComplete={isComplete}
        statusLog={statusLog}
        fps={fps}
        shouldReduceMotion={shouldReduceMotion}
      />

      <Canvas
        dpr={[1, 1.25]}
        frameloop="always"
        gl={{ antialias: true, powerPreference: "high-performance" }}
        style={{ width: "100%", height: "100%" }}
      >
        <Suspense fallback={null}>
          <CustomCamera />
          <Scene path="/models/PortifolioV2.glb" />
          <Environment preset="city" environmentIntensity={0.05} resolution={64} />
          <ambientLight intensity={0.00} color="#c8d0e0" />
        </Suspense>
      </Canvas>
      <BedPanel />
      <MuteButton />
    </main>
  );
}

useGLTF.preload("/models/PortifolioV2.glb");


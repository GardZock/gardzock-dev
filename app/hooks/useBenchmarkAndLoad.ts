"use client";

import { useEffect, useState, useRef } from "react";
import { useProgress } from "@react-three/drei";

export interface BenchmarkResult {
  progress: number;
  isComplete: boolean;
  shouldReduceMotion: boolean;
  fps: number;
  statusLog: string;
}

const getInitialSystemPrefers = () => {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
};

export function useBenchmarkAndLoad(): BenchmarkResult {
  const { progress, active } = useProgress();

  const initialSystemPrefers = useRef<boolean>(false);

  useEffect(() => {
    initialSystemPrefers.current = getInitialSystemPrefers();
  }, []);

  const [benchmarkDone, setBenchmarkDone] = useState(false);
  const [measuredFps, setMeasuredFps] = useState(60);
  const [shouldReduceMotion, setShouldReduceMotion] = useState(getInitialSystemPrefers);

  const [statusLog, setStatusLog] = useState(() =>
    getInitialSystemPrefers()
      ? "[1/3] Preferência do sistema: Movimento Reduzido (Eco Mode)"
      : "[1/3] Inicializando modelos 3D..."
  );

  const frameTimesRef = useRef<number[]>([]);
  const lastTimeRef = useRef<number | null>(null);

  useEffect(() => {
    let animationFrameId: number;
    let sampleCount = 0;
    const MAX_SAMPLES = 35;

    const measureFrame = (time: number) => {
      if (lastTimeRef.current !== null) {
        const delta = time - lastTimeRef.current;
        if (delta > 0 && delta < 200) {
          frameTimesRef.current.push(delta);
        }
      }
      lastTimeRef.current = time;
      sampleCount++;

      if (sampleCount < MAX_SAMPLES) {
        animationFrameId = requestAnimationFrame(measureFrame);
      } else {
        const samples = frameTimesRef.current;
        if (samples.length > 5) {
          const avgDelta = samples.reduce((a, b) => a + b, 0) / samples.length;
          const calculatedFps = Math.min(60, Math.round(1000 / avgDelta));
          setMeasuredFps(calculatedFps);

          const isLowFps = calculatedFps < 40 || avgDelta > 25;
          const finalReduceMotion = initialSystemPrefers.current || isLowFps;

          setShouldReduceMotion(finalReduceMotion);
          setStatusLog(
            finalReduceMotion
              ? `[3/3] Diagnóstico: Desempenho Otimizado (${calculatedFps} FPS - Eco Mode)`
              : `[3/3] Diagnóstico: Desempenho Máximo (${calculatedFps} FPS - Full 3D)`
          );
        }
        setBenchmarkDone(true);
      }
    };

    animationFrameId = requestAnimationFrame((time) => {
      setStatusLog("[2/3] Testando taxa de quadros e suporte a GPU...");
      measureFrame(time);
    });

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, []);

  const displayProgress = Math.round(progress);
  const isComplete = benchmarkDone && !active && displayProgress >= 100;

  return {
    progress: displayProgress,
    isComplete,
    shouldReduceMotion,
    fps: measuredFps,
    statusLog,
  };
}

import * as THREE from "three";
import { useEffect, useMemo, useRef, useState } from "react";
import { CameraControlsImpl, Edges, useCursor } from "@react-three/drei";
import { ThreeEvent, useFrame, useThree } from "@react-three/fiber";
import { Window } from "../window/Window";
import { useBed } from "./BedContext";
import { useResponsiveCamera } from "../../hooks/useResponsiveCamera";

let cachedFabricTexture: THREE.CanvasTexture | null = null;
let cachedNoiseTexture: THREE.CanvasTexture | null = null;

const getFabricTexture = () => {
  if (typeof window === "undefined") return null;
  if (cachedFabricTexture) return cachedFabricTexture;
  const canvas = document.createElement("canvas");
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;

  ctx.fillStyle = "#808080";
  ctx.fillRect(0, 0, 256, 256);

  ctx.fillStyle = "rgba(255, 255, 255, 0.18)";
  for (let i = 0; i < 256; i += 4) {
    ctx.fillRect(i, 0, 2, 256);
    ctx.fillRect(0, i, 256, 2);
  }
  ctx.fillStyle = "rgba(0, 0, 0, 0.18)";
  for (let i = 2; i < 256; i += 4) {
    ctx.fillRect(i, 0, 2, 256);
    ctx.fillRect(0, i, 256, 2);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(12, 12);
  cachedFabricTexture = texture;
  return texture;
};

const getNoiseTexture = () => {
  if (typeof window === "undefined") return null;
  if (cachedNoiseTexture) return cachedNoiseTexture;
  const canvas = document.createElement("canvas");
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;

  ctx.fillStyle = "#808080";
  ctx.fillRect(0, 0, 256, 256);

  const imgData = ctx.getImageData(0, 0, 256, 256);
  const data = imgData.data;
  for (let i = 0; i < data.length; i += 4) {
    const val = (Math.random() - 0.5) * 16;
    data[i] = Math.min(255, Math.max(0, 128 + val));
    data[i + 1] = Math.min(255, Math.max(0, 128 + val));
    data[i + 2] = Math.min(255, Math.max(0, 128 + val));
  }
  ctx.putImageData(imgData, 0, 0);

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(6, 6);
  cachedNoiseTexture = texture;
  return texture;
};

export const Bed = ({ nodes }: { nodes: THREE.Mesh[] }) => {
  const [hovered, setHovered] = useState(false);
  const { isBedLocked: isLocked, setIsBedLocked: setLocked } = useBed();
  const { applyPreset } = useResponsiveCamera();

  useCursor(hovered, "pointer", "auto");
  const controls = useThree((state) => state.controls as CameraControlsImpl);
  const backLightRef = useRef<THREE.PointLight>(null);

  useFrame((_, delta) => {
    if (!backLightRef.current) return;
    const target = hovered ? 3.0 : 0;
    backLightRef.current.intensity = THREE.MathUtils.lerp(
      backLightRef.current.intensity,
      target,
      1 - Math.pow(0.001, delta),
    );
  });

  const handlePointerOver = (e: ThreeEvent<PointerEvent>) => {
    if (isLocked) return;
    e.stopPropagation();
    setHovered(true);
  };

  const handlePointerOut = () => {
    if (isLocked) return;
    setHovered(false);
  };

  const handleClick = (e: ThreeEvent<MouseEvent>) => {
    e.stopPropagation();
    setHovered(false);
    setLocked(true);

    if (controls) {
      controls.normalizeRotations();
      applyPreset(controls, "BED", true);
      controls.normalizeRotations();
    }
  };

  useEffect(() => {
    if (!isLocked) return;

    const unlock = () => {
      setLocked(false);
      if (controls) {
        controls.normalizeRotations();
        applyPreset(controls, "INITIAL", true);
        controls.normalizeRotations();
      }
    };

    const handleWheel = (e: WheelEvent) => {
      if (e.deltaY < 80) return;
      unlock();
    };

    window.addEventListener("wheel", handleWheel, { passive: true });
    return () => window.removeEventListener("wheel", handleWheel);
  }, [isLocked, controls, setLocked, applyPreset]);

  const fabricTexture = useMemo(() => getFabricTexture(), []);
  const noiseTexture = useMemo(() => getNoiseTexture(), []);

  const windowNodes = useMemo(
    () => nodes.filter((node) => node.name.startsWith("WI_")),
    [nodes]
  );
  const bedNodes = useMemo(
    () => nodes.filter((node) => !node.name.startsWith("WI_")),
    [nodes]
  );

  return (
    <group
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}
      onClick={handleClick}
    >
      {windowNodes.length > 0 && <Window nodes={windowNodes} />}

      {bedNodes.map((node) => {
        return (
          <mesh
            key={node.uuid}
            geometry={node.geometry}
            name={node.name}
            position={node.position}
            rotation={node.rotation}
            scale={node.scale}
          >
            {hovered && (
              <Edges linewidth={1} scale={1} threshold={10} color="white" />
            )}

            {node.name === "Bed_Body" ? (
              <meshStandardMaterial
                color="#070b19"
                roughness={0.6}
                metalness={0.1}
                bumpMap={noiseTexture ?? undefined}
                bumpScale={0.005}
              />
            ) : node.name === "Bed_Support" ? (
              <meshStandardMaterial
                color="#18181a"
                roughness={0.7}
                metalness={0.2}
                bumpMap={noiseTexture ?? undefined}
                bumpScale={0.005}
              />
            ) : node.name === "Bed_Pillow" ? (
              <meshStandardMaterial
                color="#f3f3f5"
                roughness={0.9}
                metalness={0.0}
                bumpMap={fabricTexture ?? undefined}
                bumpScale={0.015}
              />
            ) : node.name === "Bed_Spread" ? (
              <meshStandardMaterial
                color="#84c987"
                roughness={0.8}
                metalness={0.0}
                bumpMap={fabricTexture ?? undefined}
                bumpScale={0.02}
              />
            ) : node.name === "Bed_Mattress" ? (
              <meshStandardMaterial
                color="#e5e5e8"
                roughness={0.85}
                metalness={0.0}
                bumpMap={fabricTexture ?? undefined}
                bumpScale={0.015}
              />
            ) : null}
          </mesh>
        );
      })}

      <pointLight
        ref={backLightRef}
        position={[7.1, 1.0, 3.2]}
        color="#ffffff"
        distance={5.5}
        decay={2.8}
      />
    </group>
  );
};
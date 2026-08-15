import {
  Edges,
  GradientTexture,
  GradientType,
  useCursor,
  Html,
} from "@react-three/drei";
import { ThreeEvent, useFrame } from "@react-three/fiber";
import { useRef, useState } from "react";
import * as THREE from "three";

const Base = ({ node }: { node: THREE.Mesh }) => (
  <mesh
    geometry={node.geometry}
    scale={node.scale}
    rotation={node.rotation}
    position={node.position}
  >
    <meshStandardMaterial color="#111111" roughness={0.8} />
  </mesh>
);

const Button = ({
  node,
  isLocked,
  hasGithub,
  onButtonClick,
}: {
  node: THREE.Mesh;
  isLocked: boolean;
  hasGithub: boolean;
  onButtonClick: (name: string) => void;
}) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const [pressed, setPressed] = useState(false);

  const originalZ = useRef(node.position.z);

  const isGithubButton = node.name === "JK_Button_Github";
  const isDisabledGithub = isGithubButton && !hasGithub;

  useCursor(hovered, isDisabledGithub ? "not-allowed" : "pointer", "auto");

  useFrame(() => {
    if (!meshRef.current) return;
    const isSunken = pressed || isDisabledGithub;
    const targetZ = isSunken ? originalZ.current - 0.004 : originalZ.current;
    meshRef.current.position.z = THREE.MathUtils.lerp(
      meshRef.current.position.z,
      targetZ,
      0.3,
    );
  });

  const handlePointerOver = (e: ThreeEvent<PointerEvent>) => {
    if (!isLocked) return;
    e.stopPropagation();
    setHovered(true);
  };

  const handlePointerOut = () => {
    if (!isLocked) return;
    setHovered(false);
  };

  const handleClick = (e: ThreeEvent<MouseEvent>) => {
    if (!isLocked || isDisabledGithub) return;
    e.stopPropagation();
    setPressed(true);
    setTimeout(() => setPressed(false), 200);
    onButtonClick(node.name);
  };

  let gradientColors: string[] = ["#4775ff", "#0040ff"];
  let gradientStops: number[] = [0, 0.85];
  let emissiveColor = "#000000";
  let emissiveIntensity = 0;

  if (isGithubButton) {
    const isLit = hasGithub && (hovered || pressed);
    if (isLit) {
      gradientColors = ["#ffffff", "#3b82f6", "#1c1c1c", "#0d0d0d"];
      gradientStops = [0, 0.18, 0.55, 1];
      emissiveColor = "#1565c0";
      emissiveIntensity = 0.3;
    } else {
      gradientColors = ["#222222", "#0d0d0d"];
      gradientStops = [0, 1];
      emissiveColor = "#000000";
      emissiveIntensity = 0;
    }
  } else if (node.name === "JK_Button_Play") {
    gradientColors = ["#00e676", "#00a152"];
    gradientStops = [0, 0.85];
    emissiveColor = pressed ? "#00e676" : "#000000";
    emissiveIntensity = pressed ? 0.4 : 0;
  } else {
    gradientColors = ["#4775ff", "#0040ff"];
    gradientStops = [0, 0.85];
    emissiveColor = pressed ? "#4775ff" : "#000000";
    emissiveIntensity = pressed ? 0.4 : 0;
  }

  return (
    <mesh
      ref={meshRef}
      geometry={node.geometry}
      scale={node.scale}
      rotation={node.rotation}
      position={node.position}
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}
      onClick={handleClick}
    >
      {isLocked && (
        <Html
          transform
          position={[0.13, -0.05, 0.01]}
          rotation={[1.57, -3.3, 1.57]}
          scale={0.1}
        >
          <div className="relative flex w-30 h-10 overflow-hidden pb-5 px-6 font-mono text-black">
            <p className="text-xl">
              {node.name.split("JK_Button_")[1].toUpperCase()}
            </p>
          </div>
        </Html>
      )}
      {hovered && !isDisabledGithub && (
        <Edges linewidth={2} scale={1} threshold={10} color="white" />
      )}
      <meshStandardMaterial
        roughness={0.5}
        metalness={0.2}
        emissive={emissiveColor}
        emissiveIntensity={emissiveIntensity}
      >
        <GradientTexture
          stops={gradientStops}
          colors={gradientColors}
          size={128}
          width={128}
          type={GradientType.Radial}
        />
      </meshStandardMaterial>
    </mesh>
  );
};

export const Buttons = ({
  nodes,
  isLocked,
  hasGithub,
  prev,
  next,
  select,
  github,
}: {
  nodes: THREE.Mesh[];
  isLocked: boolean;
  hasGithub: boolean;
  prev: () => void;
  next: () => void;
  select: () => void;
  github: () => void;
}) => {
  const handleButtonClick = (name: string) => {
    switch (name) {
      case "JK_Button_Play":
        select();
        break;
      case "JK_Button_Prev":
        prev();
        break;
      case "JK_Button_Github":
        if (hasGithub) {
          github();
        }
        break;
      case "JK_Button_Next":
        next();
        break;
    }
  };

  return (
    <group>
      {nodes.map((node) => {
        if (node.name.includes("JK_Button_Base_")) {
          return <Base key={node.name} node={node} />;
        }
        return (
          <Button
            key={node.name}
            node={node}
            isLocked={isLocked}
            hasGithub={hasGithub}
            onButtonClick={handleButtonClick}
          />
        );
      })}
    </group>
  );
};

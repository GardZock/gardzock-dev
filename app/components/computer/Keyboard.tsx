"use client";

import * as THREE from "three";
import { useRef } from "react";
import { useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useReducedMotion } from "../../hooks/useReducedMotion";

interface KeyboardProps {
  nodes: THREE.Mesh[] | Record<string, THREE.Mesh>;
}

const KeyboardRGB = ({ node }: { node: THREE.Mesh }) => {
  const meshMatRef = useRef<THREE.MeshBasicMaterial>(null);
  const lightRef = useRef<THREE.PointLight>(null);
  const tempColorRef = useRef(new THREE.Color());
  const reducedMotion = useReducedMotion();

  useFrame((state) => {
    if (reducedMotion) {
      if (meshMatRef.current) {
        tempColorRef.current.set("#39ff88");
        meshMatRef.current.color.copy(tempColorRef.current);
      }
      if (lightRef.current) {
        lightRef.current.color.copy(tempColorRef.current);
      }
      return;
    }

    const time = state.clock.elapsedTime;
    const hue = (time * 0.2) % 1;
    tempColorRef.current.setHSL(hue, 1.0, 0.5);

    if (meshMatRef.current) {
      meshMatRef.current.color.copy(tempColorRef.current);
    }
    if (lightRef.current) {
      lightRef.current.color.copy(tempColorRef.current);
    }
  });

  return (
    <group
      position={node.position}
      rotation={node.rotation}
      scale={node.scale}
    >
      <mesh geometry={node.geometry} raycast={() => null}>
        <meshBasicMaterial
          ref={meshMatRef}
          color="#ff0000"
          toneMapped={false}
        />
      </mesh>

      <pointLight
        ref={lightRef}
        position={[0, 0.05, 0]}
        intensity={1.5}
        color="#ff0000"
        distance={0.8}
        decay={2}
      />
    </group>
  );
};

export const Keyboard = ({ nodes }: KeyboardProps) => {
  const alphaMask = useTexture("/models/PC_KB_Keys.jpg", (tex) => {
    if (Array.isArray(tex)) {
      tex.forEach((t) => {
        t.flipY = false;
      });
    } else {
      tex.flipY = false;
    }
  });

  const nodesList = Array.isArray(nodes) ? nodes : Object.values(nodes);

  return (
    <group name="Keyboard">
      {nodesList.map((node) => {
        if (node.name === "PC_KB_RGB") {
          return <KeyboardRGB key={node.uuid} node={node} />;
        }

        return (
          <mesh
            key={node.uuid}
            geometry={node.geometry}
            name={node.name}
            position={node.position}
            rotation={node.rotation}
            scale={node.scale}
          >
            {node.name === "PC_KB_Keys" ? (
              <meshStandardMaterial
                color="#111111"
                roughness={0.6}
                alphaMap={alphaMask}
                alphaTest={0.5}
                side={THREE.DoubleSide}
              />
            ) : node.name === "PC_KB_Acc" ? (
              <meshStandardMaterial color="#111111" roughness={0.5} metalness={0.2} />
            ) : (
              <meshStandardMaterial color="#1a1a1a" roughness={0.8} />
            )}

          </mesh>
        );
      })}
    </group>
  );
};

useTexture.preload("/models/PC_KB_Keys.jpg");

import * as THREE from "three";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useReducedMotion } from "../../hooks/useReducedMotion";

export const RGBController = ({ node }: { node: THREE.Mesh }) => {
  const isFrontal = node.name.toLowerCase().includes("frontal");

  const meshMatRef = useRef<THREE.MeshBasicMaterial>(null);
  const tempColorRef = useRef<THREE.Color>(new THREE.Color());
  const reducedMotion = useReducedMotion();

  useFrame((state) => {
    if (reducedMotion) {
      if (meshMatRef.current) {
        tempColorRef.current.set("#39ff88");
        meshMatRef.current.color.copy(tempColorRef.current);
      }
      return;
    }

    const time = state.clock.elapsedTime;

    if (isFrontal) {
      if (meshMatRef.current) {
        const glowFactor = 1.5 + Math.sin(time * 4) * 0.5;
        meshMatRef.current.color.setRGB(glowFactor * 2.5, 0, 0);
      }
    } else {
      const hue = (time * 0.2) % 1;
      tempColorRef.current.setHSL(hue, 1, 0.5);

      if (meshMatRef.current) {
        meshMatRef.current.color.copy(tempColorRef.current);
      }
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
    </group>
  );
};
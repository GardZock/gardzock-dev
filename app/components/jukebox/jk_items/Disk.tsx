import { Edges } from "@react-three/drei";
import gsap from "gsap";
import { useEffect, useRef } from "react";
import * as THREE from "three";
import { DiskStatus } from "./DisksController";

export const Disk = ({
  node,
  isFocused,
  isLocked,
  state,
  pileTargetY,
  onAnimationEnd,
}: {
  node: THREE.Mesh;
  isFocused: boolean;
  isLocked: boolean;
  state: DiskStatus;
  pileTargetY?: number;
  onAnimationEnd: (diskName: string, finishedStatus: "TO_PILE" | "TO_PLAY") => void;
}) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useEffect(() => {
    if (!meshRef.current) return;
    gsap.killTweensOf(meshRef.current.position);
    gsap.killTweensOf(meshRef.current.rotation);

    if (state === "TO_PILE") {
      gsap.to(meshRef.current.position, {
        keyframes: [
          { y: 1.3180038929, duration: 0.3 },
          { x: 4.608651161193848, duration: 0.5 },
        ],
        onComplete: () => onAnimationEnd(node.name, "TO_PILE"),
      });
    }

    if (state === "TO_PLAY") {
      gsap.to(meshRef.current.position, {
        keyframes: [
          { x: 5.048282623291016, duration: 0.8 },
          { y: 1.182657241821289, duration: 0.5 },
        ],
        onComplete: () => onAnimationEnd(node.name, "TO_PLAY"),
      });
    }

    if (state === "ON_PILE" && pileTargetY !== undefined) {
      gsap.to(meshRef.current.position, {
        y: pileTargetY,
        duration: 0.5,
      });
    }

    if (state === "PLAYING") {
      gsap.to(meshRef.current.rotation, {
        y: `+=${Math.PI * 2}`,
        duration: 2,
        repeat: -1,
        ease: "none",
      });
    }
  }, [state, node.name, onAnimationEnd, pileTargetY]);


  return (
    <mesh
      ref={meshRef}
      key={node.name}
      geometry={node.geometry}
      material={node.material}
      scale={node.scale}
      rotation={node.rotation}
      position={node.position}
    >
      {isFocused && isLocked && (
        <Edges linewidth={2} scale={1} threshold={10} color="white" />
      )}
    </mesh>
  );
};

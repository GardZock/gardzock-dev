import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import gsap from "gsap";
import { PlayArmPhase } from "./DisksController";

export const PlayArm = ({
  bodyNode,
  armNode,
  phase,
  onPhaseComplete,
}: {
  bodyNode: THREE.Mesh;
  armNode: THREE.Mesh;
  phase: PlayArmPhase;
  onPhaseComplete: (phase: PlayArmPhase) => void;
}) => {
  const armRef = useRef<THREE.Mesh>(null);
  const originalY = useMemo(() => armNode.position.y, [armNode]);
  const originalRotY = useMemo(() => armNode.rotation.y, [armNode]);
  const lastPhaseRef = useRef<PlayArmPhase | null>(null);

  const ROT_TO_PLAY = 1.84;
  const DROP_Y = -0.02;

  useEffect(() => {
    if (!armRef.current) return;
    if (lastPhaseRef.current === phase) return;
    lastPhaseRef.current = phase;

    gsap.killTweensOf(armRef.current.position);
    gsap.killTweensOf(armRef.current.rotation);

    if (phase === "IDLE") {
      const tl = gsap.timeline({
        onComplete: () => {
          onPhaseComplete("IDLE");
        },
      });
      tl.to(armRef.current.rotation, { y: originalRotY, duration: 0.4 }, 0)
        .to(armRef.current.position, { y: originalY, duration: 0.4 }, 0);
    }

    if (phase === "TO_PLAY") {
      const tl = gsap.timeline({
        onComplete: () => {
          onPhaseComplete("TO_PLAY");
        },
      });
      tl.to(armRef.current.rotation, {
        y: ROT_TO_PLAY,
        duration: 0.6,
      }).to(armRef.current.position, {
        y: originalY + DROP_Y,
        duration: 0.4,
      });
    }

    if (phase === "PLAYING") {
    }

    if (phase === "RETURN") {
      const tl = gsap.timeline({
        onComplete: () => {
          onPhaseComplete("RETURN");
        },
      });
      tl.to(armRef.current.position, {
        y: originalY,
        duration: 0.4,
      }).to(armRef.current.rotation, {
        y: originalRotY,
        duration: 0.5,
      });
    }
  }, [phase, onPhaseComplete, originalY, originalRotY, DROP_Y]);

  return (
    <group>
      <mesh
        geometry={bodyNode.geometry}
        material={bodyNode.material}
        scale={bodyNode.scale}
        rotation={bodyNode.rotation}
        position={bodyNode.position}
      >
        <meshStandardMaterial color="#1c1c22" metalness={0.9} roughness={0.2} />
      </mesh>
      <mesh
        ref={armRef}
        geometry={armNode.geometry}
        material={armNode.material}
        scale={armNode.scale}
        rotation={armNode.rotation}
        position={armNode.position}
      >
        <meshStandardMaterial color="#1c1c22" metalness={0.9} roughness={0.2} />
      </mesh>
    </group>
  );
};

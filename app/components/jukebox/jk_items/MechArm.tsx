import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { ArmPhase } from "./DisksController";
import gsap from "gsap";
const ROT_TO_PLAYER = 2.16;
const ROT_TO_PILE = 1.25;
const Y_MAX = 1.29;
const Y_MIN = 1.18;
export const MechArm = ({
  armNode,
  needleNode,
  phase,
  hasPlayingDisk,
  pileTopY,
  returnTargetY,
  onPhaseComplete,
}: {
  armNode: THREE.Mesh;
  needleNode: THREE.Mesh;
  phase: ArmPhase;
  hasPlayingDisk: boolean;
  pileTopY: number;
  returnTargetY: number;
  onPhaseComplete: (phase: ArmPhase) => void;
}) => {
  const needleRef = useRef<THREE.Mesh>(null);
  const originalY = useMemo(() => needleNode.position.y, [needleNode]);
  const originalRotY = useMemo(() => needleNode.rotation.y, [needleNode]);
  const lastPhaseRef = useRef<ArmPhase | null>(null);

  useEffect(() => {
    if (!needleRef.current) return;

    if (lastPhaseRef.current === phase) return;
    lastPhaseRef.current = phase;

    gsap.killTweensOf(needleRef.current.position);
    gsap.killTweensOf(needleRef.current.rotation);

    if (phase === "TO_DISK") {
      if (!hasPlayingDisk) {
        onPhaseComplete("TO_DISK");
        return;
      }
      const tl = gsap.timeline({
        onComplete: () => {
          onPhaseComplete("TO_DISK");
        },
      });
      tl.to(needleRef.current.position, { y: Y_MIN, duration: 0.5 })
        .to(needleRef.current.rotation, { y: ROT_TO_PLAYER, duration: 0.3 });
    }

    if (phase === "TO_PILE") {
      const tl = gsap.timeline({
        onComplete: () => {
          onPhaseComplete("TO_PILE");
        },
      });
      tl.to(needleRef.current.position, { y: pileTopY ?? Y_MAX, duration: 0.3 })
        .to(needleRef.current.rotation, { y: ROT_TO_PILE, duration: 0.5 });
    }

    if (phase === "RETURN") {
      gsap.to(needleRef.current.position, {
        y: returnTargetY,
        duration: 0.4,
        onComplete: () => {
          onPhaseComplete("RETURN");
        },
      });
    }

    if (phase === "TO_PLAYER") {
      const tl = gsap.timeline({
        onComplete: () => {
          onPhaseComplete("TO_PLAYER");
        },
      });
      tl.to(needleRef.current.rotation, {
        y: ROT_TO_PLAYER,
        duration: 0.8,
      }).to(needleRef.current.position, {
        y: Y_MIN,
        duration: 0.5,
      });
    }

    if (phase === "IDLE") {
      const tl = gsap.timeline({
        onComplete: () => {
          onPhaseComplete("IDLE");
        },
      });
      tl.to(needleRef.current.position, { y: originalY, duration: 0.4 }, 0)
        .to(needleRef.current.rotation, { y: originalRotY, duration: 0.4 }, 0);
    }
  }, [onPhaseComplete, phase, hasPlayingDisk, pileTopY, returnTargetY, originalY, originalRotY]);

  return (
    <group>
      <mesh geometry={armNode.geometry} material={armNode.material} scale={armNode.scale} rotation={armNode.rotation} position={armNode.position}>
        <meshStandardMaterial color="#1c1c22" metalness={0.9} roughness={0.2} />
      </mesh>
      <mesh ref={needleRef} geometry={needleNode.geometry} material={needleNode.material} scale={needleNode.scale} rotation={needleNode.rotation} position={needleNode.position}>
        <meshStandardMaterial color="#1c1c22" metalness={0.9} roughness={0.2} />
      </mesh>
    </group>
  );
};
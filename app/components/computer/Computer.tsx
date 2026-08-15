import * as THREE from "three";
import { useRef, useState, startTransition } from "react";
import { CameraControlsImpl, Edges, useCursor, Html } from "@react-three/drei";
import { ThreeEvent, useFrame, useThree } from "@react-three/fiber";
import { RGBController } from "./RGB";
import { Keyboard } from "./Keyboard";
import { Mouse } from "./Mouse";
import { ComputerWebContent } from "./ComputerWebContent";
import { useResponsiveCamera } from "../../hooks/useResponsiveCamera";

const monitorScreenMaterial = new THREE.MeshStandardMaterial({ color: "white" });
const pcGlassMaterial = new THREE.MeshStandardMaterial({
  color: "#ffffff",
  transparent: true,
  opacity: 0.5,
  roughness: 0.05,
  metalness: 0.9,
});
const blackMaterial = new THREE.MeshStandardMaterial({ color: "black" });

const getComputerMaterial = (nodeName: string, originalMaterial: THREE.Material | THREE.Material[]) => {
  if (nodeName === "Monitor_Screen") return monitorScreenMaterial;
  if (nodeName === "PC_Glass") return pcGlassMaterial;
  if (nodeName === "Monitor" || nodeName === "MousePad" || nodeName === "Mouse") return blackMaterial;
  return originalMaterial;
};

export const Computer = ({ nodes }: { nodes: THREE.Mesh[] }) => {
  const [hovered, setHovered] = useState(false);
  const [isLocked, setLocked] = useState(true);
  const [pulsed, setPulsed] = useState(false);
  const [milestone, setMilestone] = useState(0);
  const pulseTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const { applyPreset } = useResponsiveCamera();

  useCursor(hovered, "pointer", "auto");
  const controls = useThree((state) => state.controls as CameraControlsImpl);

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const overscrollRef = useRef<number>(0);
  const hasExitedRef = useRef<boolean>(false);
  const backLightRef = useRef<THREE.PointLight>(null);

  useFrame((_, delta) => {
    if (!backLightRef.current) return;
    const target = hovered ? 6 : 0;
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

  const handleClick = () => {
    setHovered(false);
    if (controls) {
      applyPreset(controls, "COMPUTER", true);
    }
    startTransition(() => {
      setLocked(true);
    });
  };

  const handleClose = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    startTransition(() => {
      setLocked(false);
    });
    overscrollRef.current = 0;
    setMilestone(0);
    if (controls) {
      applyPreset(controls, "INITIAL", true);
    }
  };

  const OVERSCROLL_THRESHOLD = 5000;

  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    if (!isLocked) return;
    const container = scrollContainerRef.current;
    if (!container) return;

    const isAtBottom =
      container.scrollHeight - container.scrollTop - container.clientHeight <= 2;

    if (isAtBottom && e.deltaY > 0) {
      const prev = overscrollRef.current;
      overscrollRef.current += e.deltaY;

      const prevStep = Math.floor(prev / 1000);
      const currStep = Math.floor(overscrollRef.current / 1000);
      if (currStep > prevStep) {
        setMilestone(currStep);
        if (pulseTimerRef.current) clearTimeout(pulseTimerRef.current);
        setPulsed(true);
        pulseTimerRef.current = setTimeout(() => setPulsed(false), 600);
      }

      if (overscrollRef.current >= OVERSCROLL_THRESHOLD) {
        overscrollRef.current = 0;
        setMilestone(0);
        setLocked(false);

        if (controls) {
          if (!hasExitedRef.current) {
            hasExitedRef.current = true;
            const originalSmoothTime = controls.smoothTime;
            // eslint-disable-next-line @typescript-eslint/no-explicit-any, react-hooks/immutability
            (controls as any).smoothTime = 3.5;
            applyPreset(controls, "INITIAL", true);
            setTimeout(() => {
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              (controls as any).smoothTime = originalSmoothTime;
            }, 4000);
          } else {
            applyPreset(controls, "INITIAL", true);
          }
        }
      }
    } else {
      overscrollRef.current = 0;
      setMilestone(0);
    }
  };

  const isKeyboardNode = (name: string) =>
    name.startsWith("PC_KB_") || name.toLowerCase().includes("kb");

  const keyboardNodes = nodes.filter((node) => isKeyboardNode(node.name));
  const otherComputerNodes = nodes.filter((node) => !isKeyboardNode(node.name));

  return (
    <group
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}
      onClick={handleClick}
    >
      {keyboardNodes.length > 0 && (
        <Keyboard nodes={keyboardNodes}/>
      )}
      {otherComputerNodes.map((node) => {
        if (node.name.toLowerCase().includes("rgb")) {
          return (<RGBController key={node.uuid} node={node} />)
        }
        if (node.name === "Mouse") {
          return (<Mouse key={node.uuid} node={node}/>)
        }
        return (
          <mesh
            key={node.uuid}
            geometry={node.geometry}
            material={getComputerMaterial(node.name, node.material)}
            name={node.name}
            position={node.position}
            rotation={node.rotation}
            scale={node.scale}
          >
            {hovered && (
              <Edges linewidth={1} scale={1} threshold={10} color="white" />
            )}

            {node.name == "Monitor_Screen" && (
              <>
                <pointLight
                  position={[0, -2, 0]}
                  intensity={3.5}
                  color="#e8f0ff"
                  distance={1.8}
                  decay={2}
                />
                {isLocked && (
                  <Html
                    transform
                    position={[0, -0.01, -0.05]}
                    rotation={[1.57, 0, 1.57]}
                    scale={0.1}
                    style={{
                      opacity: 1,
                      pointerEvents: "auto",
                      transition: "opacity 300ms ease-in-out",
                    }}
                  >
                    <ComputerWebContent
                      is3D={true}
                      onClose={handleClose}
                      scrollContainerRef={scrollContainerRef}
                      onWheel={handleWheel}
                      pulsed={pulsed}
                      milestone={milestone}
                    />
                  </Html>
                )}
              </>
            )}
          </mesh>
        );
      })}
      <pointLight
        ref={backLightRef}
        position={[9, 1.5, 0.85]}
        color="#ffffff"
        intensity={0}
        distance={3.5}
        decay={1.5}
      />
    </group>
  );
};

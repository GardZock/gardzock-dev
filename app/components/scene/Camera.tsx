import { useEffect, useRef } from "react";
import { CameraControls, CameraControlsImpl, PerspectiveCamera } from "@react-three/drei";
import CameraLogger from "../CameraLogger";
import * as THREE from "three";
import { useThree } from "@react-three/fiber";
import { useResponsiveCamera } from "../../hooks/useResponsiveCamera";

function InitialCameraSetup() {
  const controls = useThree((state) => state.controls as CameraControlsImpl);
  const { applyPreset, deviceType } = useResponsiveCamera();

  useEffect(() => {
    if (controls) {
      applyPreset(controls, "COMPUTER", false);
    }
  }, [controls, applyPreset, deviceType]);

  return null;
}

export const CustomCamera = () => {
  const cameraRef = useRef<THREE.PerspectiveCamera>(null);
  const { fov } = useResponsiveCamera();

  return (
    <>
      <PerspectiveCamera
        makeDefault
        ref={cameraRef}
        fov={fov}
        near={0.01}
        far={100}
      />
      <CameraControls
        makeDefault
        mouseButtons={{ left: 0, right: 0, wheel: 0, middle: 0 }}
        touches={{ one: 0, two: 0, three: 0 }}
      />
      <InitialCameraSetup />
      <CameraLogger />
    </>
  );
};


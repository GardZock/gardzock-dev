import { useMemo, useEffect } from "react";
import { useThree } from "@react-three/fiber";
import { CameraControlsImpl } from "@react-three/drei";
import { DeviceType, ViewKey, CameraLookAt, getCameraPreset } from "../config/cameraPresets";
import * as THREE from "three";

const BASE_FOV = 55;
const TARGET_ASPECT = 1.6;
const MAX_MOBILE_FOV = 75;

export interface ResponsiveCameraHook {
  deviceType: DeviceType;
  fov: number;
  aspect: number;
  getPreset: (view: ViewKey) => CameraLookAt;
  applyPreset: (controls: CameraControlsImpl | null, view: ViewKey, enableTransition?: boolean) => void;
}

function updateCameraFov(cam: THREE.PerspectiveCamera, newFov: number) {
  if (cam.fov !== newFov) {
    cam.fov = newFov;
    cam.updateProjectionMatrix();
  }
}

export function useResponsiveCamera(): ResponsiveCameraHook {
  const { size, camera } = useThree();

  const aspect = useMemo(() => {
    return size.height > 0 ? size.width / size.height : 1;
  }, [size.width, size.height]);

  const deviceType = useMemo<DeviceType>(() => {
    if (size.width < 640 || aspect < 0.85) {
      return "mobile";
    }
    if (size.width < 1024 || aspect < 1.2) {
      return "tablet";
    }
    return "desktop";
  }, [size.width, aspect]);

  const fov = useMemo(() => {
    if (aspect >= TARGET_ASPECT) {
      return BASE_FOV;
    }

    const radBaseFov = (BASE_FOV * Math.PI) / 360;
    const tanHalfFov = Math.tan(radBaseFov);
    const adaptiveTan = (tanHalfFov * TARGET_ASPECT) / Math.max(aspect, 0.35);
    const calculatedFov = (2 * Math.atan(adaptiveTan) * 180) / Math.PI;

    return Math.min(MAX_MOBILE_FOV, Math.max(BASE_FOV, Math.round(calculatedFov)));
  }, [aspect]);

  useEffect(() => {
    if (camera && camera instanceof THREE.PerspectiveCamera) {
      updateCameraFov(camera, fov);
    }
  }, [camera, fov]);

  const getPreset = useMemo(() => {
    return (view: ViewKey): CameraLookAt => {
      return getCameraPreset(view, deviceType);
    };
  }, [deviceType]);

  const applyPreset = useMemo(() => {
    return (controls: CameraControlsImpl | null, view: ViewKey, enableTransition = true) => {
      if (!controls) return;
      const preset = getCameraPreset(view, deviceType);
      const [px, py, pz] = preset.position;
      const [tx, ty, tz] = preset.target;
      controls.setLookAt(px, py, pz, tx, ty, tz, enableTransition);
    };
  }, [deviceType]);

  return {
    deviceType,
    fov,
    aspect,
    getPreset,
    applyPreset,
  };
}

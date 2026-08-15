import * as THREE from "three";
import { useEffect } from "react";
import { useThree } from "@react-three/fiber";
import { CameraControlsImpl } from "@react-three/drei";

export default function CameraLogger() {
  const controls = useThree((state) => state.controls as CameraControlsImpl);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "p" || event.key === "P") {
        if (controls) {
          const position = new THREE.Vector3();
          const target = new THREE.Vector3();

          controls.getPosition(position);
          controls.getTarget(target);

          console.log(
            `CÓDIGO PARA O setLookAt:\ncontrols.setLookAt(${position.x.toFixed(2)}, ${position.y.toFixed(2)}, ${position.z.toFixed(2)}, ${target.x.toFixed(2)}, ${target.y.toFixed(2)}, ${target.z.toFixed(2)}, true)`
          );
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [controls]);

  return null;
}
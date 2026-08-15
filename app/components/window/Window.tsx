"use client";

import * as THREE from "three";
import { useMemo } from "react";

interface WindowProps {
  nodes: THREE.Mesh[] | Record<string, THREE.Mesh>;
}

const BackgroundMesh = ({ node }: { node: THREE.Mesh }) => {
  const bgMaterial = useMemo(() => {
    if (!node.material) return undefined;
    const mat = (node.material as THREE.MeshStandardMaterial).clone();
    mat.emissive = new THREE.Color("#ffffff");
    if (mat.map) {
      mat.emissiveMap = mat.map;
    }
    mat.emissiveIntensity = 3.4;
    mat.toneMapped = false;
    return mat;
  }, [node.material]);

  return (
    <mesh
      geometry={node.geometry}
      material={bgMaterial}
      name={node.name}
      position={node.position}
      rotation={node.rotation}
      scale={node.scale}
    />
  );
};

export const Window = ({ nodes }: WindowProps) => {
  const nodesList = Array.isArray(nodes) ? nodes : Object.values(nodes);
  const windowNode = nodesList.find(
    (n) => n.name === "WI_Window" || n.name === "WI_Background"
  );

  const spotTarget = useMemo(() => new THREE.Object3D(), []);

  return (
    <group name="Window">
      {windowNode && (
        <group
          position={windowNode.position}
          rotation={windowNode.rotation}
        >
          <primitive object={spotTarget} position={[3.0, -4.7, -10.0]} />

          <spotLight
            position={[0, 0, 0.2]}
            target={spotTarget}
            angle={0.70}
            penumbra={0.45}
            intensity={12.0}
            color="#89afff"
            distance={17.0}
            decay={1.2}
          />
        </group>
      )}

      {nodesList.map((node) => {
        if (node.name === "WI_Background") {
          return <BackgroundMesh key={node.uuid} node={node} />;
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
            {node.name === "WI_Window" ? (
              <meshStandardMaterial
                color="#cbd5e1"
                transparent
                opacity={0.35}
                roughness={0.15}
                metalness={0.80}
              />
            ) : node.name === "WI_Structure" ? (
              <meshStandardMaterial color="#ffffff" roughness={0.4} />
            ) : node.name === "WI_Divisor" ? (
              <meshStandardMaterial color="#111111" roughness={0.5} />
            ) : null}
          </mesh>
        );
      })}
    </group>
  );
};

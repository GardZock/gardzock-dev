import * as THREE from "three";

const lightBulbMaterial = new THREE.MeshStandardMaterial({ color: "white" });

export function StaticEnvironment({
  nodes,
}: {
  nodes: THREE.Mesh[];
}) {

  return (
    <>
      {nodes.map((node) => {
        if (!node || node.type !== "Mesh") return null;

        return (
          <mesh
            key={node.uuid}
            geometry={node.geometry}
            material={node.name === "LightBulb" ? lightBulbMaterial : node.material}
            name={node.name}
            position={node.position}
            rotation={node.rotation}
            scale={node.scale}
            onPointerOver={(e) => e.stopPropagation()} 
            onPointerOut={() => null}
          />
        );
      })}
    </>
  );
}


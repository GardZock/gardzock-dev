import * as THREE from "three";

export const Mouse = ({ node }: { node: THREE.Mesh; }) => {
  return (
    <mesh
      key={node.uuid}
      geometry={node.geometry}
      material={node.material}
      name={node.name}
      position={node.position}
      rotation={node.rotation}
      scale={node.scale}
    >
      <meshStandardMaterial color="#000000" />
    </mesh>
  );
};
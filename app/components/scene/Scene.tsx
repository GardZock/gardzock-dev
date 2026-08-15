"use client";

import * as THREE from "three";
import { useGLTF } from "@react-three/drei";
import { ObjectMap } from "@react-three/fiber";
import { GLTF } from "three-stdlib";
import { StaticEnvironment } from "./StaticEnv";
import { Computer } from "../computer/Computer";
import { Jukebox } from "../jukebox/Jukebox";
import { Bed } from "../bed/Bed";
import { useMemo } from "react";

type GLTFResult = GLTF &
  ObjectMap & {
    scene: THREE.Group<THREE.Object3DEventMap>;
    nodes: {
      [name: string]: THREE.Mesh;
    };
  };

export const Scene = ({ path }: { path: string }) => {
  const { nodes } = useGLTF(path) as GLTFResult;

  const staticNodes = useMemo(() => {
    const staticNames = [
      "BackWall",
      "Ground",
      "InvisibleWall",
      "LeftWall",
      "Light",
      "LightBulb",
      "RightWall",
      "Top",
      "Console",
    ];
    return Object.values(nodes).filter((node) => staticNames.includes(node.name));
  }, [nodes]);

  const jkNodesArray = useMemo(() => {
    return Object.values(nodes).filter((node) => node.name.includes("JK_"));
  }, [nodes]);

  const bedNodesArray = useMemo(() => {
    return Object.values(nodes).filter(
      (node) => node.name.includes("Bed") || node.name.startsWith("WI_")
    );
  }, [nodes]);

  const computerNodesArray = useMemo(() => {
    return Object.values(nodes).filter(
      (node) =>
        node &&
        (node.type === "Mesh" || (node as THREE.Mesh).isMesh) &&
        (node.name.startsWith("PC") ||
          node.name.startsWith("Monitor") ||
          node.name.startsWith("Mouse") ||
          node.name === "Table")
    );
  }, [nodes]);

  return (
    <group>
      <StaticEnvironment nodes={staticNodes} />
      {computerNodesArray.length > 0 && <Computer nodes={computerNodesArray} />}
      {nodes.JK_Body && <Jukebox nodes={jkNodesArray} />}
      {bedNodesArray.length > 0 && <Bed nodes={bedNodesArray} />}
    </group>
  );
};

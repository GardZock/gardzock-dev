"use client";

import * as THREE from "three";
import { useEffect, useRef, useState, startTransition } from "react";
import { CameraControlsImpl, Edges, useCursor } from "@react-three/drei";
import { ThreeEvent, useFrame, useThree } from "@react-three/fiber";

import { Screen } from "./jk_items/Screen";
import { DisksController } from "./jk_items/DisksController";
import { Buttons } from "./jk_items/Buttons";
import { DISK_DATA } from "./diskData";

import { useResponsiveCamera } from "../../hooks/useResponsiveCamera";
import { useAudio } from "../AudioContext";

export const Jukebox = ({ nodes }: { nodes: THREE.Mesh[] }) => {
  const { playTrack, stopTrack } = useAudio();
  const [hovered, setHovered] = useState(false);
  const [isLocked, setLocked] = useState(false);
  const [currentProj, setCurrent] = useState(0);
  const [showingProj, setShowingProj] = useState<string | null>(null);
  const [selectSignal, setSelectSignal] = useState(0);
  const { applyPreset } = useResponsiveCamera();

  const disks = nodes.filter((node) => node.name.includes("JK_Disk_"));
  const pileSize = showingProj === null ? disks.length : disks.length - 1;

  const browsingDisk =
    [...disks]
      .filter((n) => n.name !== showingProj)
      .sort((a, b) => a.position.y - b.position.y)[currentProj]?.name ?? null;

  useCursor(hovered, "pointer", "auto");
  const controls = useThree((state) => state.controls as CameraControlsImpl);
  const backLightRef = useRef<THREE.PointLight>(null);

  useFrame((_, delta) => {
    if (!backLightRef.current) return;
    const target = hovered ? 6.0 : 0;
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
      applyPreset(controls, "JUKEBOX", true);
    }
    startTransition(() => {
      setLocked(true);
    });
  };

  useEffect(() => {
    if (!isLocked) return;
    const unlock = () => {
      startTransition(() => {
        setLocked(false);
      });
      if (controls) {
        applyPreset(controls, "INITIAL", true);
      }
    };

    const handleWheel = (e: WheelEvent) => {
      if (e.deltaY < 80) return;
      unlock();
    };

    window.addEventListener("wheel", handleWheel, { passive: true });
    return () => window.removeEventListener("wheel", handleWheel);
  }, [isLocked, controls, applyPreset]);

  const prev = () => {
    setCurrent((c) => (c - 1 < 0 ? pileSize - 1 : c - 1));
  };

  const next = () => {
    setCurrent((c) => (c + 1 >= pileSize ? 0 : c + 1));
  };

  const select = () => {
    setSelectSignal((s) => s + 1);
  };
  const github = () => {
    const browseKey = browsingDisk?.replace("JK_Disk_", "") ?? "";
    const browseDiskData = browseKey ? DISK_DATA[browseKey] : undefined;

    if (browseDiskData) {
      window.open(browseDiskData.github, "_blank", "noopener,noreferrer");
    } else {
      window.open(
        "https://github.com/GardZock",
        "_blank",
        "noopener,noreferrer",
      );
    }
  };
  const handlePlayingChange = (diskName: string) => {
    setShowingProj(diskName);
    const diskKey = diskName.replace("JK_Disk_", "");
    const diskData = DISK_DATA[diskKey];
    if (diskData?.youtubeUrl) {
      playTrack(diskData.youtubeUrl);
    }
  };

  const activeDiskKey = (showingProj || browsingDisk)?.replace("JK_Disk_", "") ?? "";
  const activeDiskData = activeDiskKey ? DISK_DATA[activeDiskKey] : undefined;
  const hasGithub = Boolean(activeDiskData?.github);

  return (
    <group
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}
      onClick={handleClick}
    >
      <DisksController
        nodes={disks}
        mechArmNodes={nodes.filter((node) => node.name.includes("JK_Arm"))}
        playArmNodes={nodes.filter((node) => node.name.startsWith("JK_PlayArm"))}
        playingDisk={showingProj}
        currentDisk={currentProj}
        selectSignal={selectSignal}
        isLocked={isLocked}
        onPlayingChangeAction={handlePlayingChange}
        onStopTrackAction={stopTrack}
      />
      <Buttons
        nodes={nodes.filter((node) => node.name.includes("JK_Button"))}
        isLocked={isLocked}
        hasGithub={hasGithub}
        prev={prev}
        next={next}
        select={select}
        github={github}
      />

      {nodes.map((node) => {
        if (
          node.name.includes("JK_Disk_") ||
          node.name.includes("JK_Arm") ||
          node.name.startsWith("JK_PlayArm") ||
          node.name.includes("JK_Button")
        ) {
          return;
        }
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
            {hovered && (
              <Edges linewidth={1} scale={1} threshold={10} color="white" />
            )}

            {node.name == "JK_Screen" ? (
              <meshStandardMaterial color="#000000" />
            ) : node.name === "JK_Body" ? (
              null
            ) : node.name === "JK_Screw" || node.name === "JK_Disks_Base" ? (
              <meshStandardMaterial
                color="#c0c0c0"
                metalness={1}
                roughness={0.15}
              />
            ) : (
              <meshStandardMaterial color="#815438" />
            )}
            {node.name == "JK_Screen" && (
              <>
                <pointLight
                  position={[0, 0, 0.1]}
                  intensity={isLocked ? 1.8 : 0}
                  color="#39ff6b"
                  distance={1.2}
                  decay={2}
                />
                <Screen
                  browsingProj={browsingDisk}
                  playingDisk={showingProj}
                  isLocked={isLocked}
                />
              </>
            )}
          </mesh>
        );
      })}
      <pointLight
        ref={backLightRef}
        position={[4.9, 1.3, -1.1]}
        color="#ffffff"
        distance={3.0}
        decay={1.5}
      />
    </group>
  );
};

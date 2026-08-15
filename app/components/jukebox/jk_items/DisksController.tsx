"use client";

import { useEffect, useState, useMemo, useRef, useCallback } from "react";
import * as THREE from "three";
import { Disk } from "./Disk";
import { MechArm } from "./MechArm";
import { PlayArm } from "./PlayArm";

export type DiskStatus = "ON_PILE" | "PLAYING" | "TO_PLAY" | "TO_PILE";
export type ArmPhase = "IDLE" | "TO_DISK" | "TO_PILE" | "RETURN" | "TO_PLAYER";
export type PlayArmPhase = "IDLE" | "TO_PLAY" | "PLAYING" | "RETURN";

export const DisksController = ({
  nodes,
  mechArmNodes,
  playArmNodes,
  playingDisk,
  currentDisk,
  selectSignal,
  isLocked,
  onPlayingChangeAction,
  onStopTrackAction,
}: {
  nodes: THREE.Mesh[];
  mechArmNodes: THREE.Mesh[];
  playArmNodes: THREE.Mesh[];
  playingDisk: string | null;
  currentDisk: number;
  selectSignal: number;
  isLocked: boolean;
  onPlayingChangeAction: (diskName: string) => void;
  onStopTrackAction?: () => void;
}) => {
  const [pendingPlay, setPendingPlay] = useState<string | null>(null);
  const [armPhase, setArmPhase] = useState<ArmPhase>("IDLE");
  const [playArmPhase, setPlayArmPhase] = useState<PlayArmPhase>("IDLE");
  const armPhaseRef = useRef(armPhase);
  const playArmPhaseRef = useRef(playArmPhase);

  useEffect(() => {
    armPhaseRef.current = armPhase;
  }, [armPhase]);
  useEffect(() => {
    playArmPhaseRef.current = playArmPhase;
  }, [playArmPhase]);

  const [disks, setDisks] = useState<{ name: string; status: DiskStatus }[]>(
    () =>
      [...nodes].map((e) => ({
        name: e.name,
        status: (e.name === playingDisk ? "PLAYING" : "ON_PILE") as DiskStatus,
      })),
  );

  const [pileOrder, setPileOrder] = useState<string[]>(() =>
    [...nodes]
      .filter((n) => playingDisk === null || n.name !== playingDisk)
      .sort((a, b) => a.position.y - b.position.y)
      .map((n) => n.name),
  );

  const allSlotYs = useMemo(
    () => [...nodes].map((n) => n.position.y).sort((a, b) => a - b),
    [nodes],
  );

  const pileRankByName = useMemo(() => {
    const map = new Map<string, number>();
    pileOrder.forEach((name, i) => map.set(name, i));
    return map;
  }, [pileOrder]);

  const statusByName = useMemo(() => {
    const map = new Map<string, DiskStatus>();
    disks.forEach((d) => map.set(d.name, d.status));
    return map;
  }, [disks]);

  const currentDiskRef = useRef(currentDisk);
  const playingDiskRef = useRef(playingDisk);
  const pendingPlayRef = useRef(pendingPlay);
  const pileOrderRef = useRef(pileOrder);
  const onPlayingChangeRef = useRef(onPlayingChangeAction);

  useEffect(() => {
    currentDiskRef.current = currentDisk;
  }, [currentDisk]);
  useEffect(() => {
    playingDiskRef.current = playingDisk;
  }, [playingDisk]);
  useEffect(() => {
    pendingPlayRef.current = pendingPlay;
  }, [pendingPlay]);
  useEffect(() => {
    pileOrderRef.current = pileOrder;
  }, [pileOrder]);
  useEffect(() => {
    onPlayingChangeRef.current = onPlayingChangeAction;
  }, [onPlayingChangeAction]);

  const endedAnim = useCallback(
    (diskName: string, finishedStatus: "TO_PILE" | "TO_PLAY") => {
      if (finishedStatus === "TO_PILE") {
        setDisks((prev) =>
          prev.map((d) =>
            d.name === diskName ? { ...d, status: "ON_PILE" } : d,
          ),
        );
        setPileOrder((prev) => {
          const withoutSelf = prev.filter((n) => n !== diskName);
          return [...withoutSelf, diskName];
        });
  
        return;
      }
      if (finishedStatus === "TO_PLAY") {
        setDisks((prev) =>
          prev.map((d) =>
            d.name === diskName ? { ...d, status: "PLAYING" } : d,
          ),
        );
        setPileOrder((prev) => prev.filter((n) => n !== diskName));
        onPlayingChangeRef.current(diskName);
        setPendingPlay(null);
        setPlayArmPhase("TO_PLAY");
      }
    },
    [],
  );

  const onArmPhaseComplete = useCallback((phase: ArmPhase) => {
    if (phase === "TO_DISK") {
      if (playingDiskRef.current) {
        setDisks((prev) =>
          prev.map((d) =>
            d.name === playingDiskRef.current ? { ...d, status: "TO_PILE" } : d,
          ),
        );
        setArmPhase("TO_PILE");
      } else {
        setPileOrder((prev) => prev.filter((n) => n !== pendingPlayRef.current));
        setArmPhase("RETURN");
      }
    }

    if (phase === "TO_PILE") {
      setArmPhase("RETURN");
    }

    if (phase === "RETURN") {
      const next = pendingPlayRef.current;
      if (next) {
        setDisks((prev) =>
          prev.map((d) => (d.name === next ? { ...d, status: "TO_PLAY" } : d)),
        );
      }
      setArmPhase("TO_PLAYER");
    }

    if (phase === "TO_PLAYER") {
      setArmPhase("IDLE");
    }
  }, []);

  const onPlayArmPhaseComplete = useCallback((phase: PlayArmPhase) => {
    if (phase === "TO_PLAY") {
      setPlayArmPhase("PLAYING");
    }

    if (phase === "RETURN") {
      setPlayArmPhase("IDLE");
      setArmPhase("TO_DISK");
      onStopTrackAction?.();
    }
  }, [onStopTrackAction]);

  useEffect(() => {
    if (selectSignal === 0) return;

    if (pendingPlayRef.current || armPhaseRef.current !== "IDLE") return;

    const order = pileOrderRef.current;
    const target = order[currentDiskRef.current];
    if (!target || target === playingDiskRef.current) return;

    setPendingPlay(target);

    const playArmState = playArmPhaseRef.current;
    if (playArmState === "PLAYING" || playArmState === "TO_PLAY") {
      setPlayArmPhase("RETURN");
      onStopTrackAction?.();
    } else {
      setArmPhase("TO_DISK");
    }
  }, [selectSignal, onStopTrackAction]);

  return (
    <group>
      <MechArm
        armNode={mechArmNodes.find((e) => e.name === "JK_ArmBody")!}
        needleNode={mechArmNodes.find((e) => e.name === "JK_Arm")!}
        phase={armPhase}
        hasPlayingDisk={playingDisk !== null}
        pileTopY={allSlotYs[pileOrder.length - 1]}
        returnTargetY={
          pendingPlay ? allSlotYs[pileRankByName.get(pendingPlay) ?? 0] : 1.18
        }
        onPhaseComplete={onArmPhaseComplete}
      />
      {playArmNodes.length >= 2 && (
        <PlayArm
          bodyNode={playArmNodes.find((e) => e.name === "JK_PlayArm_Body")!}
          armNode={playArmNodes.find((e) => e.name === "JK_PlayArm")!}
          phase={playArmPhase}
          onPhaseComplete={onPlayArmPhaseComplete}
        />
      )}
      <group>
        {nodes.map((node) => {
          const rank = pileRankByName.get(node.name);
          const status = statusByName.get(node.name) ?? "ON_PILE";
          const pileTargetY = rank !== undefined ? allSlotYs[rank] : undefined;

          return (
            <Disk
              key={node.name}
              node={node}
              isFocused={rank === currentDisk}
              isLocked={isLocked}
              state={status}
              pileTargetY={pileTargetY}
              onAnimationEnd={endedAnim}
            />
          );
        })}
      </group>
    </group>
  );
};
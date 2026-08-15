"use client";

import { useState, useEffect, useMemo } from "react";
import { useT } from "next-i18next/client";
import { useReducedMotion } from "@/app/hooks/useReducedMotion";

const NODES_BASE = [
  {
    id: "core",
    label: "GardZock",
    subKey: "GRAPH.SUB_FULLSTACK",
    color: "#39FF88",
    x: 50,
    y: 50,
    r: 10,
  },
  {
    id: "nextjs",
    label: "Next.js",
    subKey: "GRAPH.SUB_WEB_FRAMEWORK",
    color: "#39FF88",
    x: 72,
    y: 23,
    r: 7,
  },
  {
    id: "ts",
    label: "TypeScript",
    subKey: "GRAPH.SUB_LANGUAGE",
    color: "#38BDF8",
    x: 85,
    y: 52,
    r: 7.5,
  },
  {
    id: "threejs",
    label: "Three.js",
    subKey: "GRAPH.SUB_3D_GRAPHICS",
    color: "#FFE66D",
    x: 67,
    y: 80,
    r: 7,
  },
  {
    id: "csharp",
    label: "C#",
    subKey: "GRAPH.SUB_GAME_DEV",
    color: "#B07BFF",
    x: 34,
    y: 80,
    r: 7,
  },
  {
    id: "blender",
    label: "Blender",
    subKey: "GRAPH.SUB_3D_ART",
    color: "#FF9857",
    x: 16,
    y: 55,
    r: 6.5,
  },
  {
    id: "nodejs",
    label: "Node.js",
    subKey: "GRAPH.SUB_RUNTIME",
    color: "#7CFFB2",
    x: 24,
    y: 26,
    r: 6.5,
  },
  {
    id: "postgres",
    label: "PostgreSQL",
    subKey: "GRAPH.SUB_DATABASE",
    color: "#38BDF8",
    x: 50,
    y: 10,
    r: 6,
  },
];

const EDGES = [
  ["core", "nextjs"],
  ["core", "ts"],
  ["core", "threejs"],
  ["core", "csharp"],
  ["core", "blender"],
  ["core", "nodejs"],
  ["nextjs", "ts"],
  ["nextjs", "postgres"],
  ["ts", "threejs"],
  ["threejs", "blender"],
  ["nodejs", "postgres"],
  ["csharp", "blender"],
];

export default function Graph() {
  const { t } = useT("portfolio");
  const [hovered, setHovered] = useState<string | null>(null);
  const [tick, setTick] = useState(0);

  const reducedMotion = useReducedMotion();

  const NODES = useMemo(() => {
    return NODES_BASE.map((n) => ({
      ...n,
      sub: t(n.subKey),
    }));
  }, [t]);

  const ADJ = useMemo(() => {
    const map: Record<string, Set<string>> = {};
    NODES.forEach((n) => (map[n.id] = new Set()));
    EDGES.forEach(([a, b]) => {
      map[a].add(b);
      map[b].add(a);
    });
    return map;
  }, [NODES]);

  useEffect(() => {
    if (reducedMotion) return;

    let t = 0;
    let frameId: number;
    const loop = () => {
      setTick((t += 0.008));
      frameId = requestAnimationFrame(loop);
    };
    frameId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(frameId);
  }, [reducedMotion]);

  const getPos = (n: (typeof NODES)[0]) => {
    const isCore = n.id === "core";
    const bx = isCore || reducedMotion ? 0 : Math.sin(tick * 0.7 + n.x * 0.12) * 1.4;
    const by = isCore || reducedMotion ? 0 : Math.cos(tick * 0.55 + n.y * 0.12) * 1.6;
    return { cx: n.x + bx, cy: n.y + by };
  };


  const isLit = (id: string) =>
    !hovered || id === hovered || ADJ[hovered]?.has(id);
  const nodeMap = Object.fromEntries(NODES.map((n) => [n.id, n]));

  return (
    <div
      className="relative w-full h-full min-h-75 select-none overflow-hidden"
      onMouseLeave={() => setHovered(null)}
    >
      <svg width="0" height="0" className="absolute">
        <defs>
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
      </svg>

      <svg
        viewBox="0 0 100 100"
        className="absolute inset-0 w-full h-full overflow-visible"
      >
        {EDGES.map(([a, b], i) => {
          const na = NODES.find((n) => n.id === a)!;
          const nb = NODES.find((n) => n.id === b)!;
          const pa = getPos(na);
          const pb = getPos(nb);
          const lit = !hovered || hovered === a || hovered === b;

          return (
            <line
              key={i}
              x1={pa.cx}
              y1={pa.cy}
              x2={pb.cx}
              y2={pb.cy}
              stroke={lit ? na.color : "rgba(57,255,136,0.15)"}
              strokeWidth={lit ? 0.25 : 0.1}
              strokeDasharray={lit ? "1 1.8" : "0.4 3"}
              style={{ transition: "stroke 300ms, stroke-width 300ms" }}
            />
          );
        })}

        {NODES.map((node) => {
          const { cx, cy } = getPos(node);
          const isHov = hovered === node.id;
          const dim = hovered && !isLit(node.id);
          const r = node.r * (isHov ? 1.4 : dim ? 0.75 : 1);

          return (
            <g
              key={node.id}
              className={node.id !== "core" ? "cursor-pointer" : ""}
              style={{ opacity: dim ? 0.2 : 1, transition: "opacity 300ms" }}
              onMouseEnter={() => setHovered(node.id)}
            >
              <circle
                cx={cx}
                cy={cy}
                r={r}
                fill={`${node.color}22`}
                stroke={node.color}
                strokeWidth={isHov ? 0.4 : 0.2}
                filter="url(#glow)"
                style={{ transition: "r 300ms, stroke-width 300ms" }}
              />

              <circle
                cx={cx}
                cy={cy}
                r={node.id === "core" ? 3.5 : 2}
                fill={node.color}
              />

              <text
                x={cx}
                y={cy + r + 4.5}
                textAnchor="middle"
                fill={node.color}
                fontSize={node.id === "core" ? 2.6 : 2.3}
                fontFamily="monospace"
                opacity={isHov ? 1 : 0.72}
                style={{
                  transition: "opacity 300ms",
                  userSelect: "none",
                  pointerEvents: "none",
                }}
              >
                {node.label}
              </text>

              <text
                x={cx}
                y={cy + r + 8}
                textAnchor="middle"
                fill={node.color}
                fontSize={1.9}
                fontFamily="monospace"
                opacity={isHov ? 0.8 : 0.35}
                style={{
                  transition: "opacity 300ms",
                  userSelect: "none",
                  pointerEvents: "none",
                }}
              >
                {node.sub}
              </text>
            </g>
          );
        })}
      </svg>
      <div
        className="absolute bottom-4 left-0 right-0 flex justify-center pointer-events-none"
        style={{ transition: "opacity 0.3s", opacity: hovered ? 1 : 0 }}
      >
        {hovered &&
          (() => {
            const n = nodeMap[hovered];
            return (
              <div
                className="font-mono text-center"
                style={{ lineHeight: 1.6 }}
              >
                <span
                  style={{
                    fontSize: 24,
                    fontWeight: 700,
                    color: n.color,
                    textShadow: `0 0 12px`,
                    letterSpacing: "0.06em",
                  }}
                >
                  {n.label}
                </span>
                <span
                  style={{
                    fontSize: 20,
                    color: "rgba(146,169,155,0.55)",
                    marginLeft: 6,
                    letterSpacing: "0.1em",
                  }}
                >
                  · {n.sub}
                </span>
              </div>
            );
          })()}
      </div>
    </div>
  );
}

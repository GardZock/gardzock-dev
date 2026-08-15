import { Html } from "@react-three/drei";
import { useEffect, useRef, useState } from "react";
import { useT } from "next-i18next/client";
import { IoDisc } from "react-icons/io5";
import { MdMusicOff } from "react-icons/md";
import { DISK_DATA } from "../diskData";
import { useAudio } from "../../AudioContext";
import { useReducedMotion } from "../../../hooks/useReducedMotion";

const SEGMENTS = 12;
const BAR_COUNT = 8;

const useEqualizerLevels = (
  active: boolean,
  analyser?: AnalyserNode | null,
): number[] => {
  const reducedMotion = useReducedMotion();
  const [levels, setLevels] = useState<number[]>(() =>
    Array.from({ length: BAR_COUNT }, () => 0.1),
  );
  const targetsRef = useRef<number[]>(
    Array.from({ length: BAR_COUNT }, () => 0.4),
  );
  const frameRef = useRef(0);
  const activeRef = useRef(active);

  useEffect(() => {
    activeRef.current = active;
  });

  useEffect(() => {
    if (!active || reducedMotion) {
      const resetId = requestAnimationFrame(() => {
        setLevels(Array.from({ length: BAR_COUNT }, () => 0.08));
      });
      return () => cancelAnimationFrame(resetId);
    }

    let rafId: number;
    let lastTime = 0;
    const freqData = analyser
      ? new Uint8Array(analyser.frequencyBinCount)
      : null;

    const tick = (time: number) => {
      if (time - lastTime >= 33) {
        lastTime = time;
        frameRef.current++;

        if (analyser && freqData) {
          analyser.getByteFrequencyData(freqData);
          const step = Math.floor(freqData.length / BAR_COUNT);
          setLevels(
            Array.from({ length: BAR_COUNT }, (_, i) => freqData[i * step] / 255),
          );
        } else {
          if (frameRef.current % 14 === 0) {
            targetsRef.current = targetsRef.current.map(
              () => 0.15 + Math.random() * 0.85,
            );
          }
          setLevels((prev) =>
            prev.map((l, i) => {
              const target = targetsRef.current[i];
              const speed = target > l ? 0.22 : 0.04;
              return l + (target - l) * speed;
            }),
          );
        }
      }

      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [active, analyser, reducedMotion]);

  return levels;
};


const EqualizerBars = ({
  active,
  analyser,
}: {
  active: boolean;
  analyser?: AnalyserNode | null;
}) => {
  const { isPlayingTrack } = useAudio();
  const levels = useEqualizerLevels(active || isPlayingTrack, analyser);

  return (
    <div className="flex items-end gap-1.5 h-24">
      {levels.map((level, barIdx) => {
        const litCount = Math.round(level * SEGMENTS);

        return (
          <div key={barIdx} className="flex flex-col gap-0.5">
            {Array.from({ length: SEGMENTS }, (_, seg) => {
              const fromBottom = SEGMENTS - 1 - seg;
              const isLit = fromBottom < litCount;
              const isPeak = fromBottom === litCount - 1 && litCount > 0;

              return (
                <div
                  key={seg}
                  style={{
                    width: "14px",
                    height: "6px",
                    background: isLit
                      ? isPeak
                        ? "#ccffe0"
                        : "#39ff6b"
                      : "#0a1f0e",
                    boxShadow: isLit
                      ? isPeak
                        ? "0 0 6px #ffffff, 0 0 10px #39ff6b"
                        : "0 0 4px #39ff6b88"
                      : "none",

                    opacity: isLit ? (isPeak ? 1 : 0.88) : 0.35,
                    transition: "background 40ms, box-shadow 40ms",
                  }}
                />
              );
            })}

            <div
              style={{
                width: "14px",
                height: `${Math.round(level * 14)}px`,
                background:
                  "linear-gradient(to bottom, #39ff6b33, transparent)",
                borderRadius: "0 0 2px 2px",
                marginTop: "2px",
                transition: "height 80ms",
              }}
            />
          </div>
        );
      })}
    </div>
  );
};

const MarqueeText = ({ text }: { text: string }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const [distance, setDistance] = useState(0);

  useEffect(() => {
    if (containerRef.current && textRef.current) {
      const overflow =
        textRef.current.scrollWidth - containerRef.current.clientWidth;
      setDistance(overflow > 0 ? overflow : 0);
    }
  }, [text]);

  return (
    <div ref={containerRef} className="overflow-hidden w-full">
      <span
        ref={textRef}
        className="inline-block whitespace-nowrap"
        style={
          distance > 0
            ? ({
                animation: "marquee 8s ease-in-out infinite",
                "--marquee-distance": `-${distance}px`,
              } as React.CSSProperties)
            : undefined
        }
      >
        {text}
      </span>
    </div>
  );
};

export const Screen = ({
  browsingProj,
  playingDisk,
  isLocked,
}: {
  browsingProj: string | null;
  playingDisk: string | null;
  isLocked: boolean;
}) => {
  const { t } = useT("jukebox");
  const { isMuted } = useAudio();

  const browseKey = browsingProj?.replace("JK_Disk_", "") ?? "";
  const browseDiskData = browseKey ? DISK_DATA[browseKey] : undefined;

  const playKey = playingDisk?.replace("JK_Disk_", "") ?? "";
  const playDiskData = playKey ? DISK_DATA[playKey] : undefined;
  const isPlaying = playingDisk !== null;

  const currentTrack = playDiskData?.track ?? "";

  if (!isLocked) return null;

  return (
    <Html
      transform
      position={[0, 0.02, 0]}
      rotation={[1.57, -3.3, 1.57]}
      scale={0.1}
      style={{
        opacity: 1,
        pointerEvents: "auto",
        transition: "opacity 300ms ease-in-out",
      }}
    >
      <div
        className="relative flex w-187.5 h-50 overflow-hidden pb-5 px-6 font-mono text-green-400"
        style={{
          background:
            "radial-gradient(ellipse at center, #0d2818 0%, #051208 100%)",
          boxShadow:
            "inset 0 0 24px rgba(57, 255, 136, 0.25), 0 0 15px rgba(57, 255, 136, 0.2)",
          animation:
            "crtPowerOn 0.45s cubic-bezier(0.1, 0.9, 0.2, 1) forwards, crtFlicker 6s infinite 0.45s",
        }}
      >
        <style>{`
          @keyframes marquee {
            0%, 25% { transform: translateX(0); }
            75%, 100% { transform: translateX(var(--marquee-distance)); }
          }
          @keyframes crtPowerOn {
            0% {
              clip-path: inset(50% 0 50% 0);
              filter: brightness(4) contrast(2);
              opacity: 0.1;
            }
            35% {
              clip-path: inset(48% 0 48% 0);
              filter: brightness(2.8) contrast(1.6);
              opacity: 1;
            }
            75% {
              clip-path: inset(0 0 0 0);
              filter: brightness(1.3) contrast(1.1);
            }
            100% {
              clip-path: inset(0 0 0 0);
              filter: brightness(1) contrast(1);
              opacity: 1;
            }
          }
          @keyframes crtFlicker {
            0%, 100% { opacity: 1; }
            28% { opacity: 0.96; }
            30% { opacity: 0.99; }
            64% { opacity: 0.95; }
            65% { opacity: 1; }
            87% { opacity: 0.97; }
          }
        `}</style>

        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "repeating-linear-gradient(to bottom, rgba(0,0,0,0.25) 0px, rgba(0,0,0,0.25) 1px, transparent 1px, transparent 3px)",
          }}
        />

        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.55) 100%)",
          }}
        />

        <div className="relative flex flex-col gap-3 w-3/4 pt-5 pr-6">
          {browsingProj ? (
            <>
              <div
                className="flex items-center gap-2 text-2xl"
                style={{ textShadow: "0 0 4px #4ade80, 0 0 12px #22c55e" }}
              >
                {browseDiskData && browseDiskData.icon ? (
                  <browseDiskData.icon size="1.5rem" className="shrink-0" />
                ) : (
                  <IoDisc size="1.5rem" />
                )}
                <span>{t(`${browseKey}.NAME`)}</span>
              </div>

              <p
                className="text-base opacity-90"
                style={{ textShadow: "0 0 3px #4ade80" }}
              >
                {t(`${browseKey}.DESCRIPTION`)}
              </p>
            </>
          ) : (
            <div className="flex flex-col items-start justify-center h-full gap-2 opacity-60">
              <span
                className="text-xl tracking-widest uppercase"
                style={{ textShadow: "0 0 4px #4ade80" }}
              >
                {t("IDLE.TITLE")}
              </span>
              <span className="text-sm opacity-70">{t("IDLE.SONG")}</span>
            </div>
          )}
        </div>

        <div className="relative flex flex-col items-center justify-center gap-2 w-1/4 pt-5">
          {isPlaying ? (
            <>
              <EqualizerBars active={isLocked && !isMuted} />
              <div
                className="flex items-center gap-2 text-sm w-full"
                style={{ textShadow: "0 0 3px #4ade80" }}
              >
                <IoDisc size="1rem" className="shrink-0" />
                <MarqueeText text={currentTrack} />
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center w-full h-full gap-2 border-l border-green-400/40">
              <MdMusicOff
                size="3.5rem"
                className="text-green-400/60"
                style={{ filter: "drop-shadow(0 0 6px #4ade8066)" }}
              />
              <span
                className="text-xs tracking-widest uppercase opacity-50 text-center"
                style={{ textShadow: "0 0 4px #4ade80" }}
              >
                {t("IDLE.TITLE")}
              </span>
            </div>
          )}
        </div>
      </div>
    </Html>
  );
};

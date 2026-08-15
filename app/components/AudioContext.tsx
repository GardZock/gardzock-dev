"use client";

import React, { createContext, useContext, useEffect, useRef, useState, useCallback } from "react";
import { extractYouTubeId } from "./jukebox/diskData";

declare global {
  interface Window {
    YT?: any;
    onYouTubeIframeAPIReady?: () => void;
  }
}

type AudioCtxValue = {
  isMuted: boolean;
  toggle: () => void;
  playTrack: (url?: string) => void;
  stopTrack: () => void;
  isPlayingTrack: boolean;
  currentTrackUrl: string | null;
  showAdBlockNotice: boolean;
  triggerAdBlockNotice: () => void;
};

const AudioCtx = createContext<AudioCtxValue>({
  isMuted: false,
  toggle: () => {},
  playTrack: () => {},
  stopTrack: () => {},
  isPlayingTrack: false,
  currentTrackUrl: null,
  showAdBlockNotice: false,
  triggerAdBlockNotice: () => {},
});

export const AudioProvider = ({ children }: { children: React.ReactNode }) => {
  const [isMuted, setIsMuted] = useState(false);
  const [isPlayingTrack, setIsPlayingTrack] = useState(false);
  const [currentTrackUrl, setCurrentTrackUrl] = useState<string | null>(null);
  const [showAdBlockNotice, setShowAdBlockNotice] = useState(false);

  const playerRef = useRef<any>(null);
  const isApiLoadedRef = useRef(false);
  const isPlayerReadyRef = useRef(false);
  const pendingVideoIdRef = useRef<string | null>(null);
  const noticeTimerRef = useRef<NodeJS.Timeout | null>(null);

  const triggerAdBlockNotice = useCallback(() => {
    setShowAdBlockNotice(true);
    if (noticeTimerRef.current) clearTimeout(noticeTimerRef.current);
    noticeTimerRef.current = setTimeout(() => {
      setShowAdBlockNotice(false);
    }, 7000);
  }, []);

  const createPlayer = useCallback((videoId: string) => {
    if (typeof window === "undefined" || !window.YT) return;

    if (playerRef.current) {
      if (isPlayerReadyRef.current) {
        try {
          playerRef.current.loadVideoById(videoId);
          playerRef.current.playVideo();
        } catch (e) {
          console.warn("YouTube player load error:", e);
        }
      } else {
        pendingVideoIdRef.current = videoId;
      }
      return;
    }

    playerRef.current = new window.YT.Player("youtube-audio-player", {
      height: "1",
      width: "1",
      videoId: videoId,
      host: "https://www.youtube-nocookie.com",
      playerVars: {
        autoplay: 1,
        controls: 0,
        disablekb: 1,
        fs: 0,
        modestbranding: 1,
        rel: 0,
        loop: 1,
        enablejsapi: 1,
        origin: typeof window !== "undefined" ? window.location.origin : "",
        widget_referrer: typeof window !== "undefined" ? window.location.href : "",
      },
      events: {
        onReady: (event: any) => {
          isPlayerReadyRef.current = true;
          if (isMuted) {
            event.target.mute();
          } else {
            event.target.unMute();
          }
          if (pendingVideoIdRef.current) {
            event.target.loadVideoById(pendingVideoIdRef.current);
            pendingVideoIdRef.current = null;
          } else {
            event.target.playVideo();
          }
        },
        onStateChange: (event: any) => {
          if (event.data === 1) {
            setIsPlayingTrack(true);
            triggerAdBlockNotice();
          } else if (event.data === 2 || event.data === 0) {
            setIsPlayingTrack(false);
          }
        },
      },
    });
  }, [isMuted, triggerAdBlockNotice]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    if (window.YT && window.YT.Player) {
      isApiLoadedRef.current = true;
      return;
    }

    const tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    const firstScriptTag = document.getElementsByTagName("script")[0];
    firstScriptTag?.parentNode?.insertBefore(tag, firstScriptTag);

    window.onYouTubeIframeAPIReady = () => {
      isApiLoadedRef.current = true;
      if (pendingVideoIdRef.current) {
        createPlayer(pendingVideoIdRef.current);
        pendingVideoIdRef.current = null;
      }
    };
  }, [createPlayer]);

  const playTrack = useCallback((url?: string) => {
    if (!url) return;
    const videoId = extractYouTubeId(url);
    if (!videoId) return;

    setCurrentTrackUrl(url);
    triggerAdBlockNotice();

    if (isApiLoadedRef.current && window.YT && window.YT.Player) {
      createPlayer(videoId);
    } else {
      pendingVideoIdRef.current = videoId;
    }
  }, [createPlayer, triggerAdBlockNotice]);

  const stopTrack = useCallback(() => {
    setCurrentTrackUrl(null);
    setIsPlayingTrack(false);
    if (playerRef.current && isPlayerReadyRef.current) {
      try {
        playerRef.current.pauseVideo();
      } catch (e) {
        console.warn("YouTube player pause error:", e);
      }
    }
  }, []);

  const toggleMute = useCallback(() => {
    setIsMuted((prevMuted) => {
      const nextMuted = !prevMuted;
      if (playerRef.current && isPlayerReadyRef.current) {
        try {
          if (nextMuted) {
            playerRef.current.mute();
          } else {
            playerRef.current.unMute();
          }
        } catch (e) {
          console.warn("YouTube player mute toggle error:", e);
        }
      }
      return nextMuted;
    });
  }, []);

  return (
    <AudioCtx.Provider
      value={{
        isMuted,
        toggle: toggleMute,
        playTrack,
        stopTrack,
        isPlayingTrack,
        currentTrackUrl,
        showAdBlockNotice,
        triggerAdBlockNotice,
      }}
    >
      {children}
      <div
        style={{
          position: "fixed",
          top: -9999,
          left: -9999,
          width: 1,
          height: 1,
          opacity: 0,
          pointerEvents: "none",
        }}
      >
        <div id="youtube-audio-player" />
      </div>
    </AudioCtx.Provider>
  );
};

export const useAudio = () => useContext(AudioCtx);

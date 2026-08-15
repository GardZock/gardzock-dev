export type DeviceType = "mobile" | "tablet" | "desktop";

export interface CameraLookAt {
  position: [number, number, number];
  target: [number, number, number];
}

export type ViewKey = "INITIAL" | "COMPUTER" | "BED" | "JUKEBOX";

export interface PresetConfig {
  desktop: CameraLookAt;
  tablet: CameraLookAt;
  mobile: CameraLookAt;
}

export const CAMERA_PRESETS: Record<ViewKey, PresetConfig> = {
  INITIAL: {
    desktop: {
      position: [2.74, 1.36, 0.82],
      target: [3.87, 1.36, 0.83],
    },
    tablet: {
      position: [2.3, 1.36, 0.81],
      target: [3.87, 1.36, 0.83],
    },
    mobile: {
      position: [1.6, 1.36, 0.80],
      target: [3.87, 1.36, 0.83],
    },
  },
  COMPUTER: {
    desktop: {
      position: [6.9, 1.45, 0.85],
      target: [7.0, 1.45, 0.85],
    },
    tablet: {
      position: [6.82, 1.45, 0.85],
      target: [7.0, 1.45, 0.85],
    },
    mobile: {
      position: [6.72, 1.45, 0.85],
      target: [7.0, 1.45, 0.85],
    },
  },
  BED: {
    desktop: {
      position: [7.19, 1.07, 2.42],
      target: [6.86, 1.19, 2.79],
    },
    tablet: {
      position: [7.35, 1.05, 2.22],
      target: [6.86, 1.19, 2.79],
    },
    mobile: {
      position: [7.5, 1.0, 2.0],
      target: [6.86, 1.19, 2.79],
    },
  },
  JUKEBOX: {
    desktop: {
      position: [4.84, 1.49, -0.06],
      target: [4.84, 1.44, -0.13],
    },
    tablet: {
      position: [4.84, 1.52, 0.15],
      target: [4.84, 1.44, -0.13],
    },
    mobile: {
      position: [4.84, 1.55, 0.35],
      target: [4.84, 1.44, -0.13],
    },
  },
};

/**
 * Retorna as coordenadas de olhar (position e target) para a visualização e dispositivo especificados.
 */
export function getCameraPreset(view: ViewKey, device: DeviceType): CameraLookAt {
  return CAMERA_PRESETS[view]?.[device] ?? CAMERA_PRESETS[view].desktop;
}

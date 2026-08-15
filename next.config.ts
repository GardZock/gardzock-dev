import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  transpilePackages: ["three"],
   turbopack: {
    resolveAlias: {
      'three/examples/jsm/inspector/tabs/Settings': 'object-empty',
    },
  },
   allowedDevOrigins: ['192.168.18.3']
};

export default nextConfig;

"use client";

import dynamic from "next/dynamic";

const Ribbons = dynamic(() => import("@/components/Ribbons"), { ssr: false });

export default function GlobalCursor() {
  return (
    <Ribbons
      baseThickness={10}
      colors={['#7c5cfc', '#9b82fd', '#4b28f8', '#2604d5']} // Purple shades matching NXT. theme
      speedMultiplier={0.5}
      maxAge={500}
      enableFade
      enableShaderEffect
    />
  );
}

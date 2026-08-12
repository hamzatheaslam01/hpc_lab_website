import { useEffect, useRef } from "react";
import * as THREE from "three";
import GLOBE from "vanta/src/vanta.globe";

export default function VantaGlobe() {
  const vantaRef = useRef(null);
  const effectRef = useRef(null);

  useEffect(() => {
    if (!effectRef.current) {
      effectRef.current = GLOBE({
        el: vantaRef.current,
        THREE,

        mouseControls: true,
        touchControls: true,
        gyroControls: false,

        minHeight: 200,
        minWidth: 200,

        scale: 1,
        scaleMobile: 1,

        color: 0x3b82f6,
color2: 0xfacc15,    // Light blue
        backgroundColor: 0x000000,

        size: 1.15,

        points: 18,
        spacing: 20,

        showDots: true,
      });
    }

    return () => {
      effectRef.current?.destroy();
      effectRef.current = null;
    };
  }, []);

  return (
    <div
    ref={vantaRef}
    className="absolute inset-0 z-0 overflow-hidden"
    />
  );
}
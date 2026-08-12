import { useEffect, useRef } from "react";
import * as THREE from "three";
import GLOBE from "vanta/src/vanta.globe";

export default function VantaGlobe() {
  const vantaRef = useRef(null);
  const effectRef = useRef(null);

  useEffect(() => {
    if (!vantaRef.current || effectRef.current) return;

    effectRef.current = GLOBE({
      el: vantaRef.current,
      THREE,

      mouseControls: true,
      touchControls: true,
      gyroControls: false,

      minHeight: 200,
      minWidth: 200,

      scale: 1,
      scaleMobile: 0.58,

      color: 0x3b82f6,
      color2: 0xfacc15,
      backgroundColor: 0x000000,

      size: 1.05,

      points: 16,
      spacing: 22,

      showDots: true,
    });

    return () => {
      effectRef.current?.destroy();
      effectRef.current = null;
    };
  }, []);

  return (
    <div
      ref={vantaRef}
      className="
        absolute
        left-0
        right-0
        top-10
        z-0
        h-[350px]

        md:inset-0
        md:h-auto
      "
    />
  );
}
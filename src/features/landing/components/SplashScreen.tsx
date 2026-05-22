"use client";

import { useEffect, useRef } from "react";

interface SplashScreenProps {
  onStart: () => void;
}

export default function SplashScreen({ onStart }: SplashScreenProps) {
  const hasTriggered = useRef(false);

  useEffect(() => {
    const trigger = () => {
      if (hasTriggered.current) return;
      hasTriggered.current = true;
      onStart();
    };
    window.addEventListener("keydown", trigger);
    return () => window.removeEventListener("keydown", trigger);
  }, [onStart]);

  return (
    <div
      onClick={onStart}
      className="relative flex h-full w-full cursor-pointer flex-col items-center justify-center select-none"
    >
      <div className="relative z-10 flex flex-col items-center gap-6 text-center">
        <p className="font-pixel text-[10px] tracking-[0.5em] text-[#22d3ee] uppercase opacity-60">
          Irvin Elbanbuena
        </p>

        <h1 className="font-pixel text-2xl leading-tight tracking-widest text-[#f1f5f9] drop-shadow-[0_0_40px_rgba(34,211,238,0.4)] sm:text-3xl md:text-4xl">
          Full Stack
          <br />
          Developer
        </h1>

        <p className="font-pixel text-[9px] tracking-[0.3em] text-[#94a3b8] uppercase">
          Davao City, Philippines
        </p>

        {/* Blink — add to globals.css: @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} } */}
        <p className="font-pixel xs:text-[8px] mt-8 animate-[blink_1.1s_step-end_infinite] text-[7px] tracking-[0.15em] text-[#22d3ee] uppercase sm:text-[10px] md:text-xs">
          — Press any key or tap to start —
        </p>
      </div>

      <p className="font-pixel absolute bottom-8 text-[8px] tracking-widest text-[#1a2a3a] uppercase">
        v1.0.0 © 2025
      </p>
    </div>
  );
}

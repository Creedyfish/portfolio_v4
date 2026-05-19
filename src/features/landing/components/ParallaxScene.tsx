"use client";

import { useRef, useCallback, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring } from "motion/react"; // 👈 this is the only change
import StarCanvas from "./StarCanvas";
import HeroMenu from "./HeroMenu";
import SplashScreen from "./SplashScreen";

interface ParallaxSceneProps {
  lore: string;
  contentMap: Record<string, React.ReactNode>;
}

export default function ParallaxScene({
  lore,
  contentMap,
}: ParallaxSceneProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({ container: containerRef });

  const starsY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
  const splashY = useTransform(scrollYProgress, [0, 1], ["0%", "-20%"]);
  const splashOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);
  const heroY = useTransform(scrollYProgress, [0.5, 1], ["30%", "0%"]);
  useEffect(() => {
    containerRef.current?.scrollTo({ top: 0 });
  }, []);

  const handleStart = useCallback(() => {
    heroRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative h-svh overflow-y-scroll"
      style={{ scrollSnapType: "y mandatory" }}
    >
      {/* Backdrop: out of flow entirely */}
      <div
        className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
        aria-hidden="true"
      >
        <div className="absolute inset-0 bg-[#050810]" />
        <motion.div style={{ y: starsY }} className="absolute inset-0">
          <StarCanvas />
        </motion.div>
      </div>

      {/* Section 1: Splash */}
      <section
        className="relative z-10 flex h-svh items-center justify-center"
        style={{ scrollSnapAlign: "start" }}
      >
        <motion.div
          style={{ y: splashY, opacity: splashOpacity }}
          className="h-full w-full"
        >
          <SplashScreen onStart={handleStart} />
        </motion.div>
      </section>

      {/* Section 2: HeroMenu */}
      <section
        ref={heroRef}
        className="relative z-10 h-svh"
        style={{ scrollSnapAlign: "start" }}
      >
        <motion.div
          style={{ y: heroY }}
          className="flex h-svh items-center justify-center p-4"
        >
          <HeroMenu lore={lore} contentMap={contentMap} />
        </motion.div>
      </section>
    </div>
  );
}

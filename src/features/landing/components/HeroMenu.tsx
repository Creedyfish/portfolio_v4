"use client";

import { useEffect, useRef } from "react";
import StarCanvas from "./StarCanvas";
import HeroIdentity from "./HeroIdentity";
import { MENU_ITEMS } from "./menu-items";
import MenuRow from "./HeroMenuDialog";

interface HeroMenuProps {
  lore: string;
}

export default function HeroMenu({ lore }: HeroMenuProps) {
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    navRef.current?.focus();
  }, []);

  return (
    <div
      className="relative w-full overflow-hidden rounded-xl border border-[#1a1a2e] bg-[#050810]"
      style={{ height: "100svh", maxHeight: "860px" }}
    >
      <div
        className="absolute inset-0 z-1"
        style={{
          background:
            "radial-gradient(ellipse 60% 70% at 70% 50%, #0d1b3e 0%, transparent 65%), radial-gradient(ellipse 40% 60% at 20% 80%, #0a1628 0%, transparent 60%)",
        }}
      />
      <StarCanvas />

      <div
        className="pointer-events-none absolute inset-0 z-10"
        style={{
          background:
            "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.15) 2px, rgba(0,0,0,0.15) 4px)",
        }}
      />

      <div
        className="pointer-events-none absolute inset-0 z-1000"
        style={{
          background:
            "radial-gradient(ellipse 100% 100% at 50% 50%, transparent 40%, rgba(0,0,0,0.85) 100%)",
        }}
      />

      <div
        className="absolute top-0 right-0 left-0 z-8 h-px opacity-35"
        style={{
          background:
            "linear-gradient(90deg, transparent, #1e4080, #22d3ee, #1e4080, transparent)",
        }}
      />
      <div
        className="absolute right-0 left-0 z-8 h-px opacity-25"
        style={{
          bottom: "44px",
          background:
            "linear-gradient(90deg, transparent, #1e4080, #22d3ee, #1e4080, transparent)",
        }}
      />

      {[
        "top-3 left-3 border-t border-l",
        "top-3 right-3 border-t border-r",
        "bottom-11 left-3 border-b border-l",
        "bottom-11 right-3 border-b border-r",
      ].map((cls, i) => (
        <div
          key={i}
          className={`absolute z-25 size-4 border-[#0f2030] md:size-5 ${cls}`}
        />
      ))}

      <div
        className="relative z-20 flex h-full flex-col items-center justify-center gap-6 overflow-y-auto px-6 py-10 md:grid md:gap-8 md:px-[4vw] md:py-8"
        style={{ gridTemplateColumns: "1fr clamp(260px, 35%, 560px)" }}
      >
        <HeroIdentity lore={lore} />

        <div className="flex w-full flex-col justify-center md:w-auto">
          <p className="font-pixel mb-3 pl-0.5 text-[9px] tracking-[0.18em] text-[#152535] uppercase lg:mb-4 lg:text-[10px] xl:text-[13px] 2xl:text-[15px]">
            — Main Menu —
          </p>

          <nav ref={navRef} tabIndex={-1} className="w-full focus:outline-none">
            {MENU_ITEMS.map(({ id, label, desc, Icon }) => (
              <MenuRow key={id} id={id} label={label} desc={desc} Icon={Icon} />
            ))}
          </nav>
        </div>
      </div>

      <div className="absolute right-0 bottom-0 left-0 z-30 flex items-center justify-between border-t border-[#080f1e] bg-[rgba(5,8,16,0.95)] px-4 py-2 md:px-6 md:py-3">
        <div className="font-pixel ml-auto flex gap-3 text-[8px] tracking-[0.08em] text-[#152535] md:gap-4 lg:text-[9px] xl:text-[11px] 2xl:text-[13px]">
          <span className="flex items-center gap-1">
            <span className="inline-block size-1.5 rounded-full bg-[#22d3ee] md:size-2" />
            Available for hire
          </span>
          <span className="hidden sm:block">Davao City, PH</span>
        </div>
      </div>
    </div>
  );
}

"use client";

import { useEffect, useRef } from "react";
import HeroIdentity from "./HeroIdentity";
import { MENU_ITEMS } from "./menu-items";
import MenuRow from "./HeroMenuDialog";
import StarCanvas from "./StarCanvas";
import Link from "next/link";
interface HeroMenuProps {
  lore: string;
  contentMap: Record<string, React.ReactNode>;
}

export default function HeroMenu({ lore, contentMap }: HeroMenuProps) {
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    navRef.current?.focus();
  }, []);

  return (
    <div
      className="border-border-subtle relative w-full overflow-hidden rounded-xl border bg-transparent"
      style={{ height: "100svh", maxHeight: "860px" }}
    >
      <div
        className="absolute inset-0 z-1"
        style={{
          background:
            "radial-gradient(ellipse 60% 70% at 70% 50%, var(--bg-elevated) 0%, transparent 65%), radial-gradient(ellipse 40% 60% at 20% 80%, var(--bg-deep) 0%, transparent 60%)",
        }}
      />

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
            "linear-gradient(90deg, transparent, var(--border-default), var(--accent), var(--border-default), transparent)",
        }}
      />
      <div
        className="absolute right-0 left-0 z-8 h-px opacity-25"
        style={{
          bottom: "44px",
          background:
            "linear-gradient(90deg, transparent, var(--border-default), var(--accent), var(--border-default), transparent)",
        }}
      />

      <StarCanvas />

      {[
        "top-3 left-3 border-t border-l",
        "top-3 right-3 border-t border-r",
        "bottom-11 left-3 border-b border-l",
        "bottom-11 right-3 border-b border-r",
      ].map((cls, i) => (
        <div
          key={i}
          className={`border-border-subtle absolute z-25 size-4 md:size-5 ${cls}`}
        />
      ))}

      <div
        className="relative z-20 flex h-full flex-col items-center justify-center gap-6 overflow-y-auto px-6 py-10 md:grid md:gap-8 md:px-[4vw] md:py-8"
        style={{ gridTemplateColumns: "1fr clamp(260px, 35%, 560px)" }}
      >
        <HeroIdentity lore={lore} />

        <div className="flex w-full flex-col justify-center md:w-auto">
          <p className="font-pixel text-text-ghost mb-3 pl-0.5 text-[9px] tracking-[0.18em] uppercase lg:mb-4 lg:text-[10px] xl:text-[13px] 2xl:text-[15px]">
            — Main Menu —
          </p>

          <nav ref={navRef} tabIndex={-1} className="w-full focus:outline-none">
            {MENU_ITEMS.map(({ id, label, desc, Icon }) => (
              <MenuRow
                key={id}
                id={id}
                label={label}
                desc={desc}
                Icon={Icon}
                content={contentMap[id]}
              />
            ))}
          </nav>
        </div>
      </div>

      {/* Footer CTA */}
      <div className="border-bg-base bg-bg-deepest/95 absolute right-0 bottom-0 left-0 z-30 flex items-center justify-between gap-3 border-t px-4 py-2 md:px-6 md:py-2.5">
        {/* Availability pulse */}
        <div className="font-pixel text-text-muted flex items-center gap-2 text-[8px] tracking-[0.08em] lg:text-[9px]">
          <span className="relative flex size-1.5 md:size-2">
            <span className="bg-accent absolute inline-flex h-full w-full animate-ping rounded-full opacity-60" />
            <span className="bg-accent relative inline-flex size-1.5 rounded-full md:size-2" />
          </span>
          <span className="text-text-secondary">Open to work</span>
          <span className="text-text-ghost hidden sm:inline">
            · Davao City, PH
          </span>
        </div>

        {/* Resume download */}
        <Link
          href="/resume.pdf"
          download="Irvin-Elbanbuena-Resume.pdf"
          className="font-pixel group relative flex items-center gap-2 overflow-hidden rounded border border-[#1e3448] bg-[#060e1c] px-3 py-1.5 text-[8px] tracking-[0.12em] text-[#4a7090] uppercase transition-all duration-200 hover:border-[#22d3ee]/60 hover:text-[#22d3ee] active:scale-95 lg:text-[9px] xl:text-[10px]"
        >
          <span
            className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-200 group-hover:opacity-100"
            style={{
              background:
                "radial-gradient(ellipse 100% 100% at 50% 50%, rgba(34,211,238,0.06) 0%, transparent 70%)",
            }}
          />
          <span className="relative">Download Resume</span>
          <span className="relative font-mono text-[10px] transition-transform duration-150 group-hover:translate-x-0.5 lg:text-xs">
            ↓
          </span>
        </Link>
      </div>
    </div>
  );
}

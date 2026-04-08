interface HeroIdentityProps {
  lore: string;
}

export default function HeroIdentity({ lore }: HeroIdentityProps) {
  return (
    <div className="flex flex-col items-center gap-4 text-center md:items-start md:text-left lg:gap-5 xl:gap-7">
      {/* Eyebrow */}
      <p className="font-pixel text-[9px] tracking-[0.22em] text-[#2a4060] uppercase lg:text-[10px] xl:text-[13px] 2xl:text-[15px]">
        Portfolio — v4.0.0
      </p>

      {/* Name */}
      <div className="flex flex-col gap-1">
        <h1 className="font-cinzel text-4xl leading-none font-bold tracking-[0.06em] text-[#e8e0d0] uppercase lg:text-5xl xl:text-6xl 2xl:text-7xl">
          Irvin
        </h1>
        <span className="font-cinzel text-2xl font-normal tracking-widest text-[#a8b8cc] uppercase lg:text-3xl xl:text-4xl 2xl:text-5xl">
          Elbanbuena
        </span>
        <p className="font-pixel mt-1 text-[9px] tracking-[0.18em] text-[#2a4a6a] uppercase lg:text-[10px] xl:text-[13px] 2xl:text-[15px]">
          Full Stack Developer
        </p>
      </div>

      {/* Divider — hidden on mobile */}
      <div className="hidden w-full items-center gap-3 md:flex">
        <div className="size-2 rotate-45 bg-[#22d3ee] opacity-50 lg:size-2.5 xl:size-3" />
        <div className="h-px flex-1 bg-linear-to-r from-[#0f2a40] to-transparent" />
      </div>

      {/* Lore */}
      <p className="font-cinzel max-w-sm border-l border-[#0f2a40] pl-3 text-xs leading-relaxed text-[#3a5068] italic lg:text-sm xl:text-base">
        &ldquo;{lore}&rdquo;
      </p>

      {/* Meta — hidden on mobile */}
      <div className="hidden flex-col gap-2 md:flex">
        {[
          "Next.js 16 · Prisma 7 · PostgreSQL",
          "Build 2026.01 · Davao City, PH",
        ].map((line) => (
          <div key={line} className="flex items-center gap-2">
            <div className="size-1 shrink-0 rounded-full bg-[#22d3ee] opacity-60 lg:size-1.5" />
            <span className="font-pixel text-[8px] tracking-[0.08em] text-[#1e3a50] uppercase lg:text-[9px] xl:text-[11px] 2xl:text-[13px]">
              {line}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

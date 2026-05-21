import { MarkdownRenderer } from "@/components/MarkDownRenderer";

interface HeroIdentityProps {
  lore: string;
}

export default function HeroIdentity({ lore }: HeroIdentityProps) {
  return (
    <div className="flex flex-col items-center gap-4 text-center md:items-start md:text-left lg:gap-5 xl:gap-7">
      {/* Eyebrow */}
      <p className="text-text-ghost font-pixel text-[9px] tracking-[0.22em] uppercase lg:text-[10px] xl:text-[13px] 2xl:text-[15px]">
        Portfolio — v4.0.0
      </p>

      {/* Name */}
      <div className="flex flex-col gap-1">
        <h1 className="text-text-bright font-cinzel text-4xl leading-none font-bold tracking-[0.06em] uppercase lg:text-5xl xl:text-6xl 2xl:text-7xl">
          Irvin
        </h1>

        <span className="text-text-primary font-cinzel text-2xl font-normal tracking-widest uppercase lg:text-3xl xl:text-4xl 2xl:text-5xl">
          Elbanbuena
        </span>

        <p className="text-text-faint font-pixel mt-1 text-[9px] tracking-[0.18em] uppercase lg:text-[10px] xl:text-[13px] 2xl:text-[15px]">
          Full Stack Developer
        </p>
      </div>

      {/* Divider — hidden on mobile */}
      <div className="hidden w-full items-center gap-3 md:flex">
        <div className="bg-accent size-2 rotate-45 opacity-50 lg:size-2.5 xl:size-3" />

        <div className="from-border-subtle h-px flex-1 bg-linear-to-r to-transparent" />
      </div>

      {/* Lore */}
      <div className="border-border-subtle max-w-sm border-l pl-3">
        <MarkdownRenderer content={lore} />
      </div>

      {/* Meta — hidden on mobile */}
      <div className="hidden flex-col gap-2 md:flex">
        {[
          "Next.js 16 · Prisma 7 · PostgreSQL",
          "Build 2026.01 · Davao City, PH",
        ].map((line) => (
          <div key={line} className="flex items-center gap-2">
            <div className="bg-accent size-1 shrink-0 rounded-full opacity-60 lg:size-1.5" />

            <span className="text-text-faint font-pixel text-[8px] tracking-[0.08em] uppercase lg:text-[9px] xl:text-[11px] 2xl:text-[13px]">
              {line}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

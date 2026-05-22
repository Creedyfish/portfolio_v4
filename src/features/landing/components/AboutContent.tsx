import { getContentBlockByKey } from "@/actions/content.actions";
import { getSkills } from "@/actions/skill.actions";
import Image from "next/image";
import { MarkdownRenderer } from "@/components/MarkDownRenderer";
// ─── Lore renderer ────────────────────────────────────────────────────────────

function CornerBrackets() {
  return (
    <>
      {" "}
      {[
        "top-0 left-0 border-t border-l",
        "top-0 right-0 border-t border-r",
        "bottom-0 left-0 border-b border-l",
        "bottom-0 right-0 border-b border-r",
      ].map((cls, i) => (
        <div key={i} className={`absolute size-3 border-[#22d3ee55] ${cls}`} />
      ))}{" "}
    </>
  );
}

function SectionHeading({ label }: { label: string }) {
  return (
    <div className="mb-3 flex items-center gap-3">
      <span className="text-accent font-pixel text-xs tracking-[0.25em] uppercase md:text-sm">
        {label}
      </span>

      <div className="bg-border-default h-px flex-1" />
    </div>
  );
}

export default async function AboutContent() {
  const [block, skillsResult] = await Promise.all([
    getContentBlockByKey("about"),
    getSkills(),
  ]);

  const skills = skillsResult.success ? (skillsResult.data ?? []) : [];

  const abilities = [
    {
      icon: "⬡",
      title: "Frontend Development",
      desc: "Building responsive and interactive user interfaces with React and Next.js",
    },
    {
      icon: "⬡",
      title: "Backend Development",
      desc: "Creating robust APIs and database solutions with PostgreSQL and Prisma",
    },
    {
      icon: "⬡",
      title: "Full Stack Projects",
      desc: "End-to-end application development from design to deployment",
    },
  ];

  const fieldData = [
    { label: "Location", val: "Davao City, PH" },
    { label: "Role", val: "Full Stack Developer" },
    { label: "Status", val: "Available for hire", accent: true },
  ];

  return (
    <div className="grid h-full grid-cols-1 md:grid-cols-[1fr_3fr]">
      {/* Left panel */}
      <div className="border-border-default bg-bg-deep flex flex-col gap-5 border-r p-4">
        {/* Portrait */}
        <div className="relative h-fit w-fit self-center">
          <CornerBrackets />

          <div className="from-bg-deep absolute inset-0 z-10 bg-linear-to-t via-transparent to-transparent" />

          <div className="bg-accent/5 absolute inset-0 z-10" />

          <div
            className="absolute inset-0 z-10 opacity-[0.03]"
            style={{
              backgroundImage:
                "repeating-linear-gradient(0deg, #22d3ee 0px, #22d3ee 1px, transparent 1px, transparent 4px)",
            }}
          />

          <Image
            src="/pixelized.webp"
            width={200}
            height={200}
            alt="profile_picture"
            className="block brightness-[1.15] saturate-[1.1]"
          />
        </div>

        {/* Character meta */}
        <div className="flex flex-col gap-1">
          <p className="text-accent font-pixel text-[10px] tracking-widest">
            Full Stack Developer
          </p>

          <p className="text-text-bright font-cinzel text-base font-semibold">
            Irvin Elbanbuena
          </p>

          <p className="text-text-muted font-pixel text-[9px] tracking-wider">
            ◆ Davao City, PH
          </p>
        </div>

        <div className="bg-border-default h-px" />

        {/* Skill tags */}
        {skills.length > 0 && (
          <div className="flex flex-col gap-2">
            <p className="text-accent font-pixel text-[9px] tracking-[0.2em] uppercase">
              Stack
            </p>

            <div className="flex flex-wrap gap-1.5">
              {skills.map(({ id, technology }) => (
                <span
                  key={id}
                  className="border-border-default bg-bg-elevated text-text-secondary font-pixel border px-2 py-1 text-[8px] leading-none tracking-wider uppercase"
                >
                  {technology.name}
                </span>
              ))}
            </div>
          </div>
        )}

        <div className="bg-border-default h-px" />

        {/* Status badge */}
        <div className="border-accent-40 bg-bg-elevated flex w-fit items-center gap-2 border px-3 py-2">
          <div className="bg-accent size-[5px] animate-pulse rounded-full" />

          <span className="text-accent font-pixel text-[9px] tracking-widest uppercase">
            Available for hire
          </span>
        </div>
      </div>

      {/* Right panel */}
      <div className="bg-bg-base flex flex-col gap-6 p-6">
        {/* Lore */}
        <div>
          <SectionHeading label="Lore" />

          <div className="border-accent-40 border-l-2 pl-4">
            <MarkdownRenderer content={block?.content ?? ""} />
          </div>
        </div>

        {/* Abilities */}
        <div>
          <SectionHeading label="Abilities" />

          <div className="flex flex-col gap-2">
            {abilities.map(({ icon, title, desc }) => (
              <div
                key={title}
                className="border-border-default bg-bg-deep flex items-start gap-3 border p-3"
              >
                <span className="text-accent mt-0.5 text-base">{icon}</span>

                <div>
                  <p className="text-text-primary font-pixel mb-1 text-[10px] tracking-wider uppercase">
                    {title}
                  </p>

                  <p className="text-text-muted font-cinzel text-sm leading-relaxed">
                    {desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Field Data */}
        <div>
          <SectionHeading label="Field Data" />

          <div className="grid grid-cols-2 gap-2">
            {fieldData.map(({ label, val, accent }) => (
              <div
                key={label}
                className="border-border-default bg-bg-deep border p-3"
              >
                <p className="text-accent font-pixel mb-1 text-[9px] tracking-[0.2em] uppercase">
                  {label}
                </p>

                <p
                  className={`font-cinzel text-sm tracking-wide ${
                    accent ? "text-accent" : "text-text-primary"
                  }`}
                >
                  {val}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

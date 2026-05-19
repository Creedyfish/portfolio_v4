import { getContentBlockByKey } from "@/actions/content.actions";
import { getSkills } from "@/actions/skill.actions";
import Image from "next/image";

// ─── Lore renderer ────────────────────────────────────────────────────────────

type LoreToken =
  | { type: "heading"; text: string }
  | { type: "bullet"; label: string | null; text: string }
  | { type: "paragraph"; text: string };

function parseLore(raw: string): LoreToken[] {
  const tokens: LoreToken[] = [];

  for (const line of raw.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed) continue;

    // ### Heading
    if (trimmed.startsWith("###")) {
      tokens.push({ type: "heading", text: trimmed.replace(/^#+\s*/, "") });
      continue;
    }

    // - **Label**: text  or  - text
    if (trimmed.startsWith("- ")) {
      const body = trimmed.slice(2);
      const boldLabelMatch = body.match(/^\*\*(.+?)\*\*[:\s]+(.+)$/);
      if (boldLabelMatch) {
        tokens.push({
          type: "bullet",
          label: boldLabelMatch[1],
          text: boldLabelMatch[2],
        });
      } else {
        tokens.push({
          type: "bullet",
          label: null,
          text: body.replace(/\*\*/g, ""),
        });
      }
      continue;
    }

    // Plain paragraph — strip any stray ** markers
    const clean = trimmed.replace(/\*\*/g, "");
    if (clean) tokens.push({ type: "paragraph", text: clean });
  }

  return tokens;
}

function LoreRenderer({ content }: { content: string }) {
  if (!content.trim()) {
    return (
      <p className="font-cinzel text-base leading-relaxed tracking-wide text-[#8aafcc]">
        A developer from Davao, Philippines, with a passion for creating
        intuitive and efficient web applications.
      </p>
    );
  }

  const tokens = parseLore(content);

  return (
    <div className="flex flex-col gap-3">
      {tokens.map((token, i) => {
        if (token.type === "heading") {
          return (
            <div key={i} className="flex items-center gap-2 pt-1">
              <span className="font-pixel text-[8px] tracking-[0.2em] text-[#22d3ee] uppercase">
                {token.text}
              </span>
              <div className="h-px flex-1 bg-[#1e3a5a]" />
            </div>
          );
        }

        if (token.type === "bullet") {
          return (
            <div key={i} className="flex items-baseline gap-2 pl-2">
              <span className="mt-1 text-[10px] text-[#22d3ee55]">◆</span>
              <p className="font-cinzel text-sm leading-relaxed text-[#8aafcc]">
                {token.label && (
                  <span className="font-semibold text-[#c8d8e8]">
                    {token.label}:{" "}
                  </span>
                )}
                {token.text}
              </p>
            </div>
          );
        }

        // paragraph
        return (
          <p
            key={i}
            className="font-cinzel text-base leading-relaxed tracking-wide text-[#8aafcc]"
          >
            {token.text}
          </p>
        );
      })}
    </div>
  );
}

// ─── Corner brackets ──────────────────────────────────────────────────────────

function CornerBrackets() {
  return (
    <>
      {[
        "top-0 left-0 border-t border-l",
        "top-0 right-0 border-t border-r",
        "bottom-0 left-0 border-b border-l",
        "bottom-0 right-0 border-b border-r",
      ].map((cls, i) => (
        <div key={i} className={`absolute size-3 border-[#22d3ee55] ${cls}`} />
      ))}
    </>
  );
}

// ─── Section heading ──────────────────────────────────────────────────────────

function SectionHeading({ label }: { label: string }) {
  return (
    <div className="mb-3 flex items-center gap-3">
      <span className="font-pixel text-[10px] tracking-[0.25em] text-[#22d3ee] uppercase">
        {label}
      </span>
      <div className="h-px flex-1 bg-[#1e3a5a]" />
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

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
      <div className="flex flex-col gap-5 border-r border-[#1e3a5a] bg-[#060b16] p-4">
        {/* Portrait */}
        <div className="relative h-fit w-fit self-center">
          <CornerBrackets />
          <div className="absolute inset-0 z-10 bg-gradient-to-t from-[#060b16] via-transparent to-transparent" />
          <div className="absolute inset-0 z-10 bg-[#22d3ee04]" />
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
            unoptimized
            className="block opacity-100 brightness-[1.15] saturate-[1.1]"
          />
        </div>

        {/* Character meta */}
        <div className="flex flex-col gap-1">
          <p className="font-pixel text-[10px] tracking-widest text-[#22d3ee]">
            Full Stack Developer
          </p>
          <p className="font-cinzel text-base font-semibold text-[#e8f4ff]">
            Irvin Elbanbuena
          </p>
          <p className="font-pixel text-[9px] tracking-wider text-[#6090b0]">
            ◆ Davao City, PH
          </p>
        </div>

        <div className="h-px bg-[#1e3a5a]" />

        {/* Skill tags */}
        {skills.length > 0 && (
          <div className="flex flex-col gap-2">
            <p className="font-pixel text-[9px] tracking-[0.2em] text-[#22d3ee] uppercase">
              Stack
            </p>
            <div className="flex flex-wrap gap-1.5">
              {skills.map(({ id, technology }) => (
                <span
                  key={id}
                  className="font-pixel border border-[#1e3a5a] bg-[#0a1628] px-2 py-1 text-[8px] leading-none tracking-wider text-[#8aafcc] uppercase"
                >
                  {technology.name}
                </span>
              ))}
            </div>
          </div>
        )}

        <div className="h-px bg-[#1e3a5a]" />

        {/* Status badge */}
        <div className="flex w-fit items-center gap-2 border border-[#22d3ee44] bg-[#0d2030] px-3 py-2">
          <div className="size-[5px] animate-pulse rounded-full bg-[#22d3ee]" />
          <span className="font-pixel text-[9px] tracking-widest text-[#22d3ee] uppercase">
            Available for hire
          </span>
        </div>
      </div>

      {/* Right panel */}
      <div className="flex flex-col gap-6 p-6">
        {/* Lore */}
        <div>
          <SectionHeading label="Lore" />
          <div className="border-l-2 border-[#22d3ee33] pl-4">
            <LoreRenderer content={block?.content ?? ""} />
          </div>
        </div>

        {/* Abilities */}
        <div>
          <SectionHeading label="Abilities" />
          <div className="flex flex-col gap-2">
            {abilities.map(({ icon, title, desc }) => (
              <div
                key={title}
                className="flex items-start gap-3 border border-[#1e3a5a] bg-[#060b16] p-3"
              >
                <span className="mt-0.5 text-base text-[#22d3ee]">{icon}</span>
                <div>
                  <p className="font-pixel mb-1 text-[10px] tracking-wider text-[#c8d8e8] uppercase">
                    {title}
                  </p>
                  <p className="font-cinzel text-sm leading-relaxed text-[#6090b0]">
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
                className="border border-[#1e3a5a] bg-[#060b16] p-3"
              >
                <p className="font-pixel mb-1 text-[9px] tracking-[0.2em] text-[#22d3ee] uppercase">
                  {label}
                </p>
                <p
                  className={`font-cinzel text-sm tracking-wide ${accent ? "text-[#22d3ee]" : "text-[#c8d8e8]"}`}
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

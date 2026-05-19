"use client";

import { useState } from "react";
import { Calendar } from "lucide-react";
import EmptyState from "./EmptyState";
import { Experience } from "./ExperienceContent";
import { motion, AnimatePresence } from "motion/react";
interface ExperienceListProps {
  experiences: Experience[];
}

export default function ExperienceList({ experiences }: ExperienceListProps) {
  function formatDateRange(start: Date, end?: Date | null) {
    const fmt = (d: Date) =>
      new Date(d).toLocaleDateString("en-US", {
        month: "short",
        year: "numeric",
      });
    return `${fmt(start)} — ${end ? fmt(end) : "Present"}`;
  }

  const [expanded, setExpanded] = useState<string | null>(null);

  const visible = experiences.filter((e) => e.published);
  if (visible.length === 0) return <EmptyState label="No experience yet" />;

  return (
    <div className="px-6 py-5">
      <div className="relative pl-4">
        {/* Vertical timeline line */}
        <div className="absolute top-0 bottom-0 left-0 w-px bg-[#0a1520]" />

        <div className="space-y-3">
          {visible.map((exp) => {
            const isOpen = expanded === exp.id;
            const isCurrent = !exp.endDate;
            const contributionLines = Array.isArray(exp.contributions)
              ? exp.contributions
              : typeof exp.contributions === "string"
                ? exp.contributions
                    .split(/\n+/)
                    .map((line) => line.trim())
                    .filter(Boolean)
                : [];

            return (
              <div key={exp.id} className="relative">
                {/* Dot */}
                <div
                  className={`absolute top-5 -left-5 size-2.5 rounded-full border transition-colors ${
                    isCurrent || isOpen
                      ? "border-[#22d3ee] bg-[#22d3ee] shadow-[0_0_8px_rgba(34,211,238,0.5)]"
                      : "border-[#122030] bg-[#040710]"
                  }`}
                />

                <button
                  onClick={() => setExpanded(isOpen ? null : exp.id)}
                  className="group w-full cursor-pointer rounded-md border border-[#0a1520] bg-[#040710] p-4 text-left transition-all hover:border-[#1e3448]"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <div className="mb-0.5 flex flex-wrap items-center gap-2">
                        {isCurrent && (
                          <span className="font-pixel rounded border border-[#22d3ee]/30 bg-[#0a1a2e] px-1.5 py-0.5 text-[6px] tracking-widest text-[#22d3ee] uppercase sm:text-[8px] lg:text-[10px]">
                            Current
                          </span>
                        )}
                        <h3 className="font-cinzel text-sm font-bold text-[#a8b8cc] sm:text-base lg:text-lg">
                          {exp.position}
                        </h3>
                      </div>
                      <div className="flex items-center gap-1.5">
                        {exp.companyLogo && (
                          <img
                            src={exp.companyLogo}
                            alt={`${exp.company} logo`}
                            className="size-4 rounded-sm object-contain opacity-60 sm:size-5"
                          />
                        )}
                        <p className="font-cinzel text-xs text-[#3a5878] sm:text-sm lg:text-base">
                          {exp.company}
                        </p>
                      </div>

                      <div className="mt-1 flex items-center gap-1 text-[#152535]">
                        <Calendar strokeWidth={1.5} className="size-3" />
                        <span className="font-pixel text-[7px] tracking-widest sm:text-[9px] lg:text-[11px]">
                          {formatDateRange(exp.startDate, exp.endDate)}
                        </span>
                      </div>
                    </div>
                    <motion.span
                      animate={{ rotate: isOpen ? 90 : 0 }}
                      transition={{ duration: 0.2 }}
                      className="shrink-0 font-mono text-lg text-[#22d3ee] sm:text-xl lg:text-2xl"
                    >
                      ›
                    </motion.span>
                  </div>

                  {/* Expanded detail */}

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        key="content"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: "easeInOut" }}
                        style={{ overflow: "hidden" }}
                      >
                        <div className="mt-4 border-t border-[#080f1e] pt-4 text-left">
                          <div className="mb-4 space-y-2">
                            {exp.description
                              .split(/\n{2,}/)
                              .map((p) =>
                                p
                                  .trim()
                                  .replace(/^[-•*]\s*/, "")
                                  .replace(/^#+\s*/, "")
                                  .replace(/\*\*/g, ""),
                              )
                              .filter(Boolean)
                              .map((p, i) => (
                                <p
                                  key={i}
                                  className="font-cinzel text-xs leading-relaxed text-[#3a5878] sm:text-sm lg:text-base"
                                >
                                  {p}
                                </p>
                              ))}
                          </div>

                          {contributionLines.length > 0 && (
                            <div className="mb-4">
                              <p className="font-pixel mb-2 text-[7px] tracking-[0.15em] text-[#152535] uppercase sm:text-[9px] lg:text-[11px]">
                                Contributions
                              </p>

                              <div className="space-y-1.5">
                                {contributionLines.map((line, i) => (
                                  <div key={i} className="flex gap-2">
                                    <span className="shrink-0 font-mono text-sm text-[#22d3ee] sm:text-base lg:text-lg">
                                      ›
                                    </span>
                                    <p className="font-cinzel text-xs leading-relaxed text-[#3a5878] sm:text-sm lg:text-base">
                                      {line}
                                    </p>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

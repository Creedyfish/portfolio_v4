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
  const [expanded, setExpanded] = useState<string | null>(null);

  function formatDateRange(start: Date, end?: Date | null) {
    const fmt = (d: Date) =>
      new Date(d).toLocaleDateString("en-US", {
        month: "short",
        year: "numeric",
      });
    return `${fmt(start)} — ${end ? fmt(end) : "Present"}`;
  }

  const visible = experiences.filter((e) => e.published);
  if (visible.length === 0) return <EmptyState label="No experience yet" />;

  return (
    <div className="px-6 py-5">
      <div className="relative pl-5">
        {/* Vertical timeline line */}
        <div className="from-accent/40 via-accent/10 absolute top-2 bottom-2 left-0 w-px bg-linear-to-b to-transparent" />

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

            const techs = exp.technologies ?? [];

            return (
              <div key={exp.id} className="relative">
                {/* Timeline dot */}
                <div
                  className={`absolute top-5 -left-6 size-2.5 rounded-full border transition-all duration-300 ${
                    isCurrent
                      ? "border-accent bg-accent shadow-[0_0_10px_rgb(var(--accent)/0.6)]"
                      : isOpen
                        ? "border-accent/60 bg-accent shadow-[0_0_6px_rgb(var(--accent)/0.3)]"
                        : "border-border-default bg-bg-deepest"
                  }`}
                />

                <button
                  onClick={() => setExpanded(isOpen ? null : exp.id)}
                  className={`group w-full cursor-pointer rounded-sm border text-left transition-all duration-200 ${
                    isOpen
                      ? "border-border-default bg-bg-deep"
                      : "border-border-subtle bg-bg-deepest hover:border-border-default hover:bg-bg-deep"
                  }`}
                >
                  {/* Card header */}
                  <div className="flex items-start justify-between gap-3 p-4">
                    <div className="min-w-0 flex-1">
                      {/* Status badge + position */}
                      <div className="mb-1 flex flex-wrap items-center gap-2">
                        <span
                          className={`font-pixel rounded-sm border px-1.5 py-0.5 text-[6px] tracking-widest uppercase sm:text-[8px] lg:text-[9px] ${
                            isCurrent
                              ? "border-accent/40 bg-bg-elevated text-accent"
                              : "border-border-default bg-bg-deepest text-text-ghost"
                          }`}
                        >
                          {isCurrent ? "▶ Active" : "✓ Completed"}
                        </span>

                        <h3 className="text-text-primary font-cinzel text-sm font-bold sm:text-base lg:text-lg">
                          {exp.position}
                        </h3>
                      </div>

                      {/* Company row */}
                      <div className="mb-1.5 flex items-center gap-1.5">
                        {exp.companyLogo && (
                          <img
                            src={exp.companyLogo}
                            alt={`${exp.company} logo`}
                            className="size-4 rounded-sm object-contain opacity-50 sm:size-5"
                          />
                        )}

                        <p className="text-text-ghost font-cinzel text-xs sm:text-sm">
                          {exp.company}
                        </p>
                      </div>

                      {/* Date */}
                      <div className="text-text-faint flex items-center gap-1">
                        <Calendar
                          strokeWidth={1.5}
                          className="size-3 shrink-0"
                        />

                        <span className="font-pixel text-[7px] tracking-widest sm:text-[9px]">
                          {formatDateRange(exp.startDate, exp.endDate)}
                        </span>
                      </div>
                    </div>

                    {/* Chevron */}
                    <motion.span
                      animate={{ rotate: isOpen ? 90 : 0 }}
                      transition={{ duration: 0.2 }}
                      className="text-accent/50 group-hover:text-accent mt-1 shrink-0 font-mono text-lg transition-colors sm:text-xl lg:text-2xl"
                    >
                      ›
                    </motion.span>
                  </div>

                  {/* Expanded content */}
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
                        <div className="border-border-subtle border-t px-4 pt-4 pb-4">
                          {/* Description */}
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
                                  className="text-text-muted font-cinzel text-xs leading-relaxed sm:text-sm"
                                >
                                  {p}
                                </p>
                              ))}
                          </div>

                          {/* Contributions */}
                          {contributionLines.length > 0 && (
                            <div className="mb-4">
                              <div className="mb-3 flex items-center gap-2">
                                <span className="text-accent/40 font-pixel text-[7px] tracking-[0.2em] uppercase sm:text-[9px]">
                                  Contributions
                                </span>

                                <div className="from-accent/20 h-px flex-1 bg-linear-to-r to-transparent" />
                              </div>

                              <div className="space-y-2">
                                {contributionLines.map((line, i) => (
                                  <div key={i} className="flex gap-2.5">
                                    <span className="text-accent/50 mt-0.5 shrink-0 font-mono text-xs">
                                      ›
                                    </span>

                                    <p className="text-text-muted font-cinzel text-xs leading-relaxed sm:text-sm">
                                      {line}
                                    </p>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Tech stack */}
                          {techs.length > 0 && (
                            <div>
                              <div className="mb-2 flex items-center gap-2">
                                <span className="text-accent/40 font-pixel text-[7px] tracking-[0.2em] uppercase sm:text-[9px]">
                                  Stack
                                </span>

                                <div className="from-accent/20 h-px flex-1 bg-linear-to-r to-transparent" />
                              </div>

                              <div className="flex flex-wrap gap-2">
                                {techs.map(({ technology }) => (
                                  <div
                                    key={technology.id}
                                    className="border-border-subtle bg-bg-deepest hover:border-border-default flex items-center gap-1.5 rounded-sm border px-2 py-1 transition-colors"
                                  >
                                    <img
                                      src={technology.iconUrl}
                                      alt={technology.name}
                                      className="size-3.5 object-contain opacity-70"
                                    />

                                    <span className="text-text-ghost font-cinzel text-[10px] sm:text-xs">
                                      {technology.name}
                                    </span>
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

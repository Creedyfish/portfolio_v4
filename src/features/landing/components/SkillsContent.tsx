"use client";

import { useEffect, useState } from "react";

import LoadingState from "@/features/landing/components/LoadingState";

import EmptyState from "./EmptyState";
// ── Server actions ────────────────────────────────────────────────
import { getSkills } from "@/actions/skill.actions";

type Technology = {
  id: string;
  name: string;
  slug: string;
  iconUrl: string;
  category?: string | null;
};

type Skill = {
  id: string;
  level: number;
  order: number;
  visible: boolean;
  technology: Technology;
};

// ── SKILLS ────────────────────────────────────────────────────────
const LEVEL_LABELS = [
  "",
  "Novice",
  "Apprentice",
  "Journeyman",
  "Expert",
  "Master",
];

export default function SkillsContent() {
  const [skills, setSkills] = useState<Skill[] | undefined>(undefined);
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    getSkills().then((res) => {
      if (res.success && res.data) {
        setSkills(res.data as unknown as Skill[]);
      } else {
        setSkills([]);
      }
    });
  }, []);

  if (skills === undefined) return <LoadingState />;

  const visible = skills.filter((s) => s.visible);
  if (visible.length === 0) return <EmptyState label="No skills yet" />;

  const categories = [
    "All",
    ...Array.from(
      new Set(
        visible.map((s) => s.technology.category ?? "Other").filter(Boolean),
      ),
    ),
  ];
  const filtered =
    filter === "All"
      ? visible
      : visible.filter((s) => (s.technology.category ?? "Other") === filter);

  return (
    <div className="px-6 py-5">
      {/* Category filter */}
      <div className="mb-4 flex flex-wrap gap-1.5">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`font-pixel cursor-pointer rounded px-2.5 py-1 text-[7px] tracking-[0.12em] uppercase transition-all ${
              filter === cat
                ? "border border-[#22d3ee] bg-[#0a1a2e] text-[#22d3ee]"
                : "border border-[#122030] bg-[#040710] text-[#1e3448] hover:border-[#1e3448] hover:text-[#3a5878]"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="space-y-2">
        {filtered.map((skill) => (
          <div
            key={skill.id}
            className="flex items-center gap-3 rounded border border-[#0a1520] bg-[#040710] p-3 transition-colors hover:border-[#122030]"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={skill.technology.iconUrl}
              alt={skill.technology.name}
              className="size-5 shrink-0 opacity-60"
            />
            <div className="min-w-0 flex-1">
              <div className="mb-1 flex items-center justify-between">
                <span className="font-cinzel text-xs text-[#a8b8cc]">
                  {skill.technology.name}
                </span>
                <span className="font-pixel text-[7px] tracking-widest text-[#152535] uppercase">
                  {LEVEL_LABELS[skill.level]}
                </span>
              </div>
              <div className="h-1 rounded-full bg-[#080f1e]">
                <div
                  className="h-full rounded-full bg-[#22d3ee] transition-all duration-500"
                  style={{
                    width: `${(skill.level / 5) * 100}%`,
                    boxShadow: "0 0 6px rgba(34,211,238,0.4)",
                  }}
                />
              </div>
            </div>
            <div className="flex shrink-0 gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <div
                  key={i}
                  className={`size-1.5 rounded-full ${
                    i < skill.level ? "bg-[#22d3ee]" : "bg-[#080f1e]"
                  }`}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

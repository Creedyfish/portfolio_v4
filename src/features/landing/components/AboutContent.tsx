"use client";

import { useEffect, useState } from "react";
import LoadingState from "@/features/landing/components/LoadingState";
import { getContentBlockByKey } from "@/actions/content.actions";

type ContentBlock = {
  key: string;
  title?: string | null;
  content: string;
  published: boolean;
};

export default function AboutContent() {
  const [block, setBlock] = useState<ContentBlock | null | undefined>(
    undefined,
  );

  useEffect(() => {
    getContentBlockByKey("about").then((b) => setBlock(b ?? null));
  }, []);

  if (block === undefined) return <LoadingState />;

  const paragraphs = (block?.content ?? "")
    .split(/\n{2,}/)
    .map((p) =>
      p
        .trim()
        .replace(/^#+\s*/, "")
        .replace(/\*\*/g, ""),
    )
    .filter(Boolean);

  return (
    <div className="space-y-4 px-6 py-5">
      {block?.title && (
        <h2 className="font-cinzel text-xl font-bold text-[#e8e0d0] sm:text-2xl lg:text-3xl">
          {block.title}
        </h2>
      )}

      {paragraphs.length > 0 ? (
        paragraphs.map((p, i) => (
          <p
            key={i}
            className="font-cinzel text-sm leading-relaxed text-[#4a6888] sm:text-base lg:text-lg"
          >
            {p}
          </p>
        ))
      ) : (
        <p className="font-cinzel text-sm text-[#4a6888] sm:text-base lg:text-lg">
          Full Stack Developer based in Davao City, PH — building
          database-driven web experiences where every pixel is intentional.
        </p>
      )}

      <div className="mt-2 grid grid-cols-2 gap-2 border-t border-[#080f1e] pt-4">
        {[
          { label: "Location", val: "Davao City, PH" },
          { label: "Role", val: "Full Stack Developer" },
          { label: "Stack", val: "Next.js · Prisma · PostgreSQL" },
          { label: "Status", val: "Available for hire" },
        ].map(({ label, val }) => (
          <div
            key={label}
            className="rounded border border-[#0a1520] bg-[#040710] p-3 sm:p-4"
          >
            <p className="font-pixel mb-1 text-[7px] tracking-[0.15em] text-[#152535] uppercase sm:text-[9px] lg:text-[11px]">
              {label}
            </p>
            <p className="font-cinzel text-xs text-[#3a5878] sm:text-sm lg:text-base">
              {val}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

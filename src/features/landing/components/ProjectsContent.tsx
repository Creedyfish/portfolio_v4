"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ExternalLink, Github } from "lucide-react";
import LoadingState from "@/features/landing/components/LoadingState";
import EmptyState from "./EmptyState";
import { listProjects } from "@/actions/project.actions";

type Technology = {
  id: string;
  name: string;
  slug: string;
  iconUrl: string;
  category?: string | null;
};

type Project = {
  title: string;
  slug: string;
  summary: string;
  description: string;
  role: string;
  imageUrl?: string | null;
  repoUrl?: string | null;
  liveUrl?: string | null;
  featured: boolean;
  published: boolean;
  order: number;
  technologies: Technology[];
};

// ── Skeleton shimmer ──────────────────────────────────────────────
function Skeleton({ className }: { className?: string }) {
  return (
    <div
      className={`animate-pulse rounded bg-[#0d1e30] ${className ?? ""}`}
      style={{
        background:
          "linear-gradient(90deg, #0d1e30 25%, #152535 50%, #0d1e30 75%)",
        backgroundSize: "200% 100%",
        animation: "shimmer 1.4s infinite",
      }}
    />
  );
}

// ── Favicon with loading state ────────────────────────────────────
function FaviconImage({ liveUrl, title }: { liveUrl: string; title: string }) {
  const [status, setStatus] = useState<"loading" | "loaded" | "error">(
    "loading",
  );

  return (
    <div className="relative size-8 shrink-0 overflow-hidden rounded border border-[#0a1520]">
      {status === "loading" && (
        <Skeleton className="absolute inset-0 size-full" />
      )}
      {status !== "error" ? (
        <Image
          src={`${liveUrl.replace(/\/$/, "")}/favicon.ico`}
          alt={title}
          width={32}
          height={32}
          className={`object-contain transition-opacity duration-300 ${
            status === "loaded" ? "opacity-100" : "opacity-0"
          }`}
          onLoad={() => setStatus("loaded")}
          onError={() => setStatus("error")}
          unoptimized
        />
      ) : (
        // <div className="flex size-8 items-center justify-center bg-[#060e1c]">
        //   <span className="font-pixel text-[8px] text-[#3a5878]">
        //     {title[0].toUpperCase()}
        //   </span>
        // </div>
        <Image
          src={`/favicon.ico`}
          alt={title}
          width={32}
          height={32}
          className={`object-contain transition-opacity duration-300`}
          onLoad={() => setStatus("loaded")}
          onError={() => setStatus("error")}
          unoptimized
        />
      )}
    </div>
  );
}

// ── Cover image with loading state ───────────────────────────────
function CoverImage({ src, alt }: { src: string; alt: string }) {
  const [status, setStatus] = useState<"loading" | "loaded" | "error">(
    "loading",
  );
  const isLocal = src.startsWith("/");

  return (
    <div className="mb-4 overflow-hidden rounded-md border border-[#0a1520]">
      {status === "loading" && <Skeleton className="h-48 w-full" />}
      {status !== "error" && (
        <Image
          src={src}
          alt={alt}
          width={800}
          height={450}
          unoptimized={isLocal}
          style={{ width: "100%", height: "auto", maxWidth: "800px" }}
          className={`mx-auto block object-contain transition-opacity duration-300 ${
            status === "loaded" ? "opacity-100" : "h-0 opacity-0"
          }`}
          onLoad={() => setStatus("loaded")}
          onError={() => setStatus("error")}
        />
      )}
    </div>
  );
}

// ── Tech badge ────────────────────────────────────────────────────
function TechBadge({ tech }: { tech: Technology }) {
  return (
    <span className="flex items-center gap-2 rounded border border-[#c8d8e8] bg-slate-300 px-3 py-1.5 text-[#2a4a6a] transition-colors hover:border-[#22d3ee] hover:bg-[#e0f0f8] hover:text-[#0e7090]">
      <Image
        src={tech.iconUrl}
        alt={tech.name}
        width={20}
        height={20}
        className="size-4 opacity-80 sm:size-5"
        unoptimized
      />
      <span className="font-pixel text-[8px] tracking-widest sm:text-[10px] lg:text-[12px]">
        {tech.name}
      </span>
    </span>
  );
}

// ── Main component ────────────────────────────────────────────────
export default function ProjectsContent() {
  const [projects, setProjects] = useState<Project[] | undefined>(undefined);
  const [selected, setSelected] = useState<Project | null>(null);

  useEffect(() => {
    listProjects().then((p) => setProjects(p as unknown as Project[]));
  }, []);

  if (projects === undefined) return <LoadingState />;

  const visible = projects.filter((p) => p.published);
  if (visible.length === 0) return <EmptyState label="No projects yet" />;

  // ── Detail view
  if (selected) {
    return (
      <div className="px-6 py-5">
        <button
          onClick={() => setSelected(null)}
          className="font-pixel mb-4 flex cursor-pointer items-center gap-1 text-[8px] tracking-widest text-[#152535] uppercase transition-colors hover:text-[#22d3ee] sm:text-[10px] lg:text-[12px]"
        >
          ‹ Back
        </button>

        {selected.imageUrl && (
          <CoverImage src={selected.imageUrl} alt={selected.title} />
        )}

        <h2 className="font-cinzel mb-0.5 text-xl font-bold text-[#e8e0d0] sm:text-2xl lg:text-3xl">
          {selected.title}
        </h2>
        <p className="font-pixel mb-4 text-[8px] tracking-[0.12em] text-[#152535] uppercase sm:text-[10px] lg:text-[12px]">
          {selected.role}
        </p>

        <div className="mb-4 space-y-2">
          {selected.description
            .split(/\n{2,}/)
            .map((p) =>
              p
                .trim()
                .replace(/^#+\s*/, "")
                .replace(/\*\*/g, ""),
            )
            .filter(Boolean)
            .map((p, i) => (
              <p
                key={i}
                className="font-cinzel text-sm leading-relaxed text-[#4a6888] sm:text-base lg:text-lg"
              >
                {p}
              </p>
            ))}
        </div>

        {selected.technologies.length > 0 && (
          <div className="mb-4">
            <p className="font-pixel mb-2 text-[7px] tracking-[0.15em] text-[#152535] uppercase sm:text-[9px] lg:text-[11px]">
              Stack
            </p>
            <div className="flex flex-wrap gap-1.5">
              {selected.technologies.map((tech) => (
                <TechBadge key={tech.id} tech={tech} />
              ))}
            </div>
          </div>
        )}

        <div className="flex flex-wrap gap-2">
          {selected.liveUrl && (
            <a
              href={selected.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-pixel flex items-center gap-1.5 rounded border border-[#22d3ee] bg-[#0a1a2e] px-3 py-2 text-[8px] tracking-widest text-[#22d3ee] uppercase transition-all hover:bg-[#0f2540] sm:text-[10px] lg:text-[12px]"
            >
              <ExternalLink strokeWidth={1.5} className="size-3" /> Live Site
            </a>
          )}
          {selected.repoUrl && (
            <a
              href={selected.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-pixel flex items-center gap-1.5 rounded border border-[#122030] bg-[#060e1c] px-3 py-2 text-[8px] tracking-widest text-[#3a5878] uppercase transition-all hover:border-[#22d3ee] hover:text-[#22d3ee] sm:text-[10px] lg:text-[12px]"
            >
              <Github strokeWidth={1.5} className="size-3" /> Repo
            </a>
          )}
        </div>
      </div>
    );
  }

  // ── List view
  return (
    <div className="space-y-2 px-6 py-5">
      {visible.map((project) => (
        <button
          key={project.slug}
          onClick={() => setSelected(project)}
          className="group w-full cursor-pointer rounded-md border border-[#0a1520] bg-[#040710] p-4 text-left transition-all hover:border-[#22d3ee] hover:bg-[#060d1a]"
        >
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              {project.liveUrl && (
                <FaviconImage liveUrl={project.liveUrl} title={project.title} />
              )}
              <div className="min-w-0">
                <div className="mb-1 flex flex-wrap items-center gap-2">
                  {project.featured && (
                    <span className="font-pixel rounded border border-[#22d3ee]/30 bg-[#0a1a2e] px-1.5 py-0.5 text-[6px] tracking-widest text-[#22d3ee] uppercase sm:text-[8px] lg:text-[10px]">
                      Featured
                    </span>
                  )}
                  <h3 className="font-cinzel text-sm font-bold text-[#a8b8cc] transition-colors group-hover:text-[#e8e0d0] sm:text-base lg:text-lg">
                    {project.title}
                  </h3>
                </div>
                <p className="font-cinzel text-xs leading-relaxed text-[#1e3448] transition-colors group-hover:text-[#3a5878] sm:text-sm lg:text-base">
                  {project.summary}
                </p>
                {project.technologies.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-2">
                    {project.technologies.slice(0, 5).map((tech) => (
                      <span
                        key={tech.id}
                        className="font-pixel text-[6px] tracking-widest text-[#122030] group-hover:text-[#1e3448] sm:text-[8px] lg:text-[10px]"
                      >
                        {tech.name}
                      </span>
                    ))}
                    {project.technologies.length > 5 && (
                      <span className="font-pixel text-[6px] tracking-widest text-[#122030] sm:text-[8px] lg:text-[10px]">
                        +{project.technologies.length - 5}
                      </span>
                    )}
                  </div>
                )}
              </div>
            </div>
            <span className="shrink-0 font-mono text-lg text-[#22d3ee] opacity-0 transition-opacity group-hover:opacity-100 sm:text-xl lg:text-2xl">
              ›
            </span>
          </div>
        </button>
      ))}
    </div>
  );
}

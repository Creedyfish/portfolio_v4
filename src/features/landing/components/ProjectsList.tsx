"use client";

import { useState } from "react";
import Image from "next/image";
import { ExternalLink, Github } from "lucide-react";
import EmptyState from "./EmptyState";
import Link from "next/link";
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

interface ProjectListProps {
  projects: Project[];
}

// -- Skeleton shimmer
function Skeleton({ className }: { className?: string }) {
  return (
    <div
      className={`bg-border-subtle animate-pulse rounded ${className ?? ""}`}
      style={{
        background:
          "linear-gradient(90deg, #0d1e30 25%, #152535 50%, #0d1e30 75%)",
        backgroundSize: "200% 100%",
        animation: "shimmer 1.4s infinite",
      }}
    />
  );
}

// -- Favicon with loading state
function FaviconImage({ liveUrl, title }: { liveUrl: string; title: string }) {
  const [status, setStatus] = useState<"loading" | "loaded" | "error">(
    "loading",
  );

  return (
    <div className="border-bg-elevated relative size-8 shrink-0 overflow-hidden rounded border">
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

// -- Cover image with loading state
function CoverImage({ src, alt }: { src: string; alt: string }) {
  const [status, setStatus] = useState<"loading" | "loaded" | "error">(
    "loading",
  );

  return (
    <div className="border-bg-elevated mb-4 overflow-hidden rounded-md border">
      {status === "loading" && <Skeleton className="h-48 w-full" />}
      {status !== "error" && (
        <div className="relative w-full" style={{ aspectRatio: "16/9" }}>
          <Image
            src={src}
            alt={alt}
            fill
            unoptimized
            className={`object-contain transition-opacity duration-300 ${
              status === "loaded" ? "opacity-100" : "opacity-0"
            }`}
            onLoad={() => setStatus("loaded")}
            onError={() => setStatus("error")}
          />
        </div>
      )}
    </div>
  );
}

// -- Tech badge
function TechBadge({ tech }: { tech: Technology }) {
  return (
    <div className="border-text-primary text-text-ghost hover:border-accent flex cursor-default items-center gap-2 rounded border bg-slate-300 px-3 py-1.5 transition-colors hover:bg-[#e0f0f8] hover:text-[#0e7090]">
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
    </div>
  );
}

export default function ProjectList({ projects }: ProjectListProps) {
  const [selected, setSelected] = useState<Project | null>(null);
  const visible = projects.filter((p) => p.published);
  if (visible.length === 0) return <EmptyState label="No projects yet" />;

  // -- Detail view
  if (selected) {
    return (
      <div className="px-6 py-5">
        <button
          onClick={() => setSelected(null)}
          className="font-pixel text-text-ghost hover:text-accent mb-4 flex cursor-pointer items-center gap-1 text-[8px] tracking-widest uppercase transition-colors sm:text-[10px] lg:text-[12px]"
        >
          ‹ Back
        </button>

        {selected.imageUrl && (
          <CoverImage src={selected.imageUrl} alt={selected.title} />
        )}

        <h2 className="font-cinzel text-text-bright mb-0.5 text-xl font-bold sm:text-2xl lg:text-3xl">
          {selected.title}
        </h2>
        <p className="font-pixel text-text-ghost mb-4 text-[8px] tracking-[0.12em] uppercase sm:text-[10px] lg:text-[12px]">
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
                className="font-cinzel text-text-faint text-sm leading-relaxed sm:text-base lg:text-lg"
              >
                {p}
              </p>
            ))}
        </div>

        {selected.technologies.length > 0 && (
          <div className="mb-4">
            <p className="font-pixel text-text-ghost mb-2 text-[7px] tracking-[0.15em] uppercase sm:text-[9px] lg:text-[11px]">
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
            <Link
              href={selected.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-pixel border-accent bg-bg-elevated text-accent hover:bg-bg-elevated/80 flex items-center gap-1.5 rounded border px-3 py-2 text-[8px] tracking-widest uppercase transition-all sm:text-[10px] lg:text-[12px]"
            >
              <ExternalLink strokeWidth={1.5} className="size-3" /> Live Site
            </Link>
          )}
          {selected.repoUrl && (
            <Link
              href={selected.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-pixel border-border-subtle bg-bg-deep text-text-faint hover:border-accent hover:text-accent flex items-center gap-1.5 rounded border px-3 py-2 text-[8px] tracking-widest uppercase transition-all sm:text-[10px] lg:text-[12px]"
            >
              <Github strokeWidth={1.5} className="size-3" /> Repo
            </Link>
          )}
        </div>
      </div>
    );
  }

  // -- List view
  return (
    <div className="space-y-2 px-6 py-5">
      {visible.map((project) => (
        <button
          key={project.slug}
          onClick={() => setSelected(project)}
          className="group border-bg-elevated bg-bg-deepest hover:border-accent hover:bg-bg-base w-full cursor-pointer rounded-md border p-4 text-left transition-all"
        >
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              {project.liveUrl && (
                <FaviconImage liveUrl={project.liveUrl} title={project.title} />
              )}
              <div className="min-w-0">
                <div className="mb-1 flex flex-wrap items-center gap-2">
                  {project.featured && (
                    <span className="font-pixel border-accent-40 bg-bg-elevated text-accent rounded border px-1.5 py-0.5 text-[6px] tracking-widest uppercase sm:text-[8px] lg:text-[10px]">
                      Featured
                    </span>
                  )}
                  <h3 className="font-cinzel text-text-primary group-hover:text-text-bright text-sm font-bold transition-colors sm:text-base lg:text-lg">
                    {project.title}
                  </h3>
                </div>
                <p className="font-cinzel text-border-default group-hover:text-text-faint text-xs leading-relaxed transition-colors sm:text-sm lg:text-base">
                  {project.summary}
                </p>
                {project.technologies.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-2">
                    {project.technologies.slice(0, 5).map((tech) => (
                      <span
                        key={tech.id}
                        className="font-pixel text-border-subtle group-hover:text-border-default text-[6px] tracking-widest sm:text-[8px] lg:text-[10px]"
                      >
                        {tech.name}
                      </span>
                    ))}
                    {project.technologies.length > 5 && (
                      <span className="font-pixel text-border-subtle text-[6px] tracking-widest sm:text-[8px] lg:text-[10px]">
                        +{project.technologies.length - 5}
                      </span>
                    )}
                  </div>
                )}
              </div>
            </div>
            <span className="text-accent shrink-0 font-mono text-lg opacity-0 transition-opacity group-hover:opacity-100 sm:text-xl lg:text-2xl">
              ›
            </span>
          </div>
        </button>
      ))}
    </div>
  );
}

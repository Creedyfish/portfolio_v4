"use client";

import {
  DialogTrigger,
  Modal,
  ModalOverlay,
  Dialog,
  Heading,
  Button,
} from "react-aria-components";
import { X } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import AboutContent from "@/features/landing/components/AboutContent";
import ProjectsContent from "./ProjectsContent";
import SkillsContent from "./SkillsContent";
import ContactContent from "./ContactContent";
import ExperienceContent from "./ExperienceContent";

// ── Shared primitives ─────────────────────────────────────────────
function GlowLine() {
  return (
    <div
      className="absolute top-0 right-0 left-0 h-px opacity-40"
      style={{
        background:
          "linear-gradient(90deg, transparent, #1e4080, #22d3ee, #1e4080, transparent)",
      }}
    />
  );
}

function Scanlines() {
  return (
    <div
      className="pointer-events-none absolute inset-0 z-10 opacity-25"
      style={{
        background:
          "repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,0,0,0.15) 2px,rgba(0,0,0,0.15) 4px)",
      }}
    />
  );
}

function CornerBrackets() {
  return (
    <>
      {[
        "top-2 left-2 border-t border-l",
        "top-2 right-2 border-t border-r",
        "bottom-2 left-2 border-b border-l",
        "bottom-2 right-2 border-b border-r",
      ].map((cls, i) => (
        <div
          key={i}
          className={`absolute z-20 size-3 border-[#0f2030] ${cls}`}
        />
      ))}
    </>
  );
}

// ── Modal chrome ──────────────────────────────────────────────────
function ModalShell({
  children,
  label,
  Icon,
  close,
}: {
  children: React.ReactNode;
  label: string;
  Icon: LucideIcon;
  close: () => void;
}) {
  return (
    <div className="relative">
      <GlowLine />
      <Scanlines />
      <CornerBrackets />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 55% at 85% 15%, #0d1b3e 0%, transparent 65%)",
        }}
      />
      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between gap-4 border-b border-[#080f1e] px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex size-9 shrink-0 items-center justify-center rounded-md border border-[#22d3ee] bg-[#0a1a2e]">
              <Icon strokeWidth={1.5} className="size-4 text-[#22d3ee]" />
            </div>
            <div>
              {/* <p className="font-pixel text-[7px] tracking-[0.2em] text-[#152535] uppercase">
                — {label} —
              </p> */}
              <Heading className="font-cinzel text-base font-bold text-[#e8e0d0]">
                {label}
              </Heading>
            </div>
          </div>
          <Button
            onPress={close}
            className="group flex size-8 shrink-0 cursor-pointer items-center justify-center rounded-md border border-[#122030] bg-[#060e1c] transition-all hover:border-[#22d3ee] hover:bg-[#0a1a2e] focus:outline-none"
          >
            <X
              strokeWidth={1.5}
              className="size-4 text-[#2a4060] transition-colors group-hover:text-[#22d3ee]"
            />
          </Button>
        </div>
        {/* Body */}
        <div className="scrollbar-thin scrollbar-track-[#040710] scrollbar-thumb-[#122030] h-[calc(90vh-72px)] overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  );
}

// ── Modal content router ──────────────────────────────────────────
function ModalContent({ id }: { id: string }) {
  switch (id) {
    case "about":
      return <AboutContent />;
    case "projects":
      return <ProjectsContent />;
    case "skills":
      return <SkillsContent />;
    case "experience":
      return <ExperienceContent />;
    case "contact":
      return <ContactContent />;
    default:
      return null;
  }
}

// ── Single menu row ───────────────────────────────────────────────
export default function MenuRow({
  id,
  label,
  desc,
  Icon,
}: {
  id: string;
  label: string;
  desc: string;
  Icon: LucideIcon;
}) {
  return (
    <DialogTrigger>
      <Button className="group flex w-full cursor-pointer items-center gap-2 border-t border-[#080f1e] px-2 py-3 transition-colors duration-150 last:border-b last:border-b-[#080f1e] hover:bg-[rgba(34,100,180,0.07)] focus:outline-none lg:gap-3 lg:px-3 lg:py-3 xl:gap-4 xl:py-4">
        {/* Cursor bar */}
        <div className="h-4 w-0.5 shrink-0 -translate-x-1 rounded-sm bg-[#22d3ee] opacity-0 transition-all duration-150 group-hover:translate-x-0 group-hover:opacity-100 lg:h-5 xl:h-7 xl:w-0.75" />

        {/* Icon */}
        <div className="flex size-9 shrink-0 items-center justify-center rounded-md border-[0.5px] border-[#122030] bg-[#060e1c] transition-all duration-150 group-hover:border-[#22d3ee] group-hover:bg-[#0a1a2e] md:size-10 xl:size-14">
          <Icon
            strokeWidth={1.5}
            className="size-4 text-[#2a4060] transition-colors duration-150 group-hover:text-[#22d3ee] xl:size-6"
          />
        </div>

        {/* Text */}
        <div className="min-w-0 flex-1 text-left">
          <p className="font-pixel text-[10px] leading-normal text-[#1e3448] transition-colors duration-150 group-hover:text-[#b8d0ec] lg:text-[11px] xl:text-[15px] 2xl:text-[18px]">
            {label}
          </p>
          <p className="font-cinzel mt-0.5 text-[10px] text-[#122030] italic transition-colors duration-150 group-hover:text-[#3a5878] lg:mt-1 lg:text-[11px] xl:text-[14px] 2xl:text-[17px]">
            {desc}
          </p>
        </div>

        {/* Arrow */}
        <span className="font-mono text-base text-[#22d3ee] opacity-0 transition-opacity duration-150 group-hover:opacity-100 lg:text-lg xl:text-xl 2xl:text-2xl">
          ›
        </span>
      </Button>

      <ModalOverlay className="entering:animate-in entering:fade-in exiting:animate-out exiting:fade-out fixed inset-0 z-50 flex items-center justify-center bg-[rgba(5,8,16,0.88)] backdrop-blur-sm duration-200">
        <Modal className="entering:animate-in entering:zoom-in-95 entering:fade-in entering:slide-in-from-bottom-4 exiting:animate-out exiting:zoom-out-95 exiting:fade-out relative h-[90vh] w-[92vw] max-w-none overflow-hidden rounded-xl border border-[#1a1a2e] bg-[#050810] shadow-[0_0_80px_rgba(34,211,238,0.05)] duration-200">
          <Dialog className="h-full outline-none">
            {({ close }) => (
              <ModalShell label={label} Icon={Icon} close={close}>
                <ModalContent id={id} />
              </ModalShell>
            )}
          </Dialog>
        </Modal>
      </ModalOverlay>
    </DialogTrigger>
  );
}

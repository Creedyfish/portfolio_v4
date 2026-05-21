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
    <div className="relative flex h-full flex-col">
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
      <div className="relative z-10 flex h-full flex-col">
        <div
          className="animate-in slide-in-from-top-2 fade-in flex shrink-0 items-center justify-between gap-4 border-b border-[#080f1e] px-6 py-4 duration-300"
          style={{ animationDelay: "100ms", animationFillMode: "both" }}
        >
          <div className="flex items-center gap-3">
            <div className="flex size-9 shrink-0 items-center justify-center rounded-md border border-[#22d3ee] bg-[#0a1a2e]">
              <Icon strokeWidth={1.5} className="size-4 text-[#22d3ee]" />
            </div>
            <Heading className="font-cinzel text-base font-bold text-[#e8e0d0]">
              {label}
            </Heading>
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

        <div
          className="animate-in slide-in-from-bottom-3 fade-in scrollbar-thin scrollbar-track-[#040710] scrollbar-thumb-[#122030] min-h-0 flex-1 overflow-y-auto duration-400"
          style={{
            animationDelay: "180ms",
            animationFillMode: "both",
            paddingBottom: "env(safe-area-inset-bottom)",
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}

export default function MenuRow({
  id,
  label,
  desc,
  Icon,
  content,
}: {
  id: string;
  label: string;
  desc: string;
  Icon: LucideIcon;
  content: React.ReactNode;
}) {
  return (
    <DialogTrigger>
      {/*
        Default state is readable.
        Hover (desktop) layers on cursor bar + color shift.
        Active/pressed (mobile tap) gives immediate visual feedback via scale + glow.
      */}
      <Button className="group relative flex w-full cursor-pointer items-center gap-2 border-t border-[#0d1c2e] px-2 py-3 transition-all duration-150 outline-none last:border-b last:border-b-[#0d1c2e] hover:bg-[rgba(34,100,180,0.07)] focus-visible:ring-1 focus-visible:ring-[#22d3ee]/40 focus-visible:outline-none active:scale-[0.985] active:bg-[rgba(34,211,238,0.06)] lg:gap-3 lg:px-3 lg:py-3 xl:gap-4 xl:py-4">
        {/* Tap flash — visible on active press, hidden otherwise */}
        <div
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-75 active:opacity-100"
          style={{
            background:
              "radial-gradient(ellipse 80% 100% at 50% 50%, rgba(34,211,238,0.04) 0%, transparent 70%)",
          }}
        />

        {/* Cursor bar — desktop hover only */}
        <div className="h-4 w-0.5 shrink-0 -translate-x-1 rounded-sm bg-[#22d3ee] opacity-0 transition-all duration-150 group-hover:translate-x-0 group-hover:opacity-100 lg:h-5 xl:h-7 xl:w-0.75" />

        {/* Icon — dimly lit by default, cyan on hover/active */}
        <div className="flex size-9 shrink-0 items-center justify-center rounded-md border-[0.5px] border-[#1e3448] bg-[#060e1c] transition-all duration-150 group-hover:border-[#22d3ee] group-hover:bg-[#0a1a2e] group-active:border-[#22d3ee]/60 group-active:bg-[#0a1a2e] md:size-10 xl:size-14">
          <Icon
            strokeWidth={1.5}
            className="size-4 text-[#3a5878] transition-colors duration-150 group-hover:text-[#22d3ee] group-active:text-[#22d3ee]/80 xl:size-6"
          />
        </div>

        {/* Text — readable by default */}
        <div className="min-w-0 flex-1 text-left">
          <p className="font-pixel text-[10px] leading-normal text-[#4a7090] transition-colors duration-150 group-hover:text-[#b8d0ec] group-active:text-[#c8dcea] lg:text-[11px] xl:text-[15px] 2xl:text-[18px]">
            {label}
          </p>
          <p className="font-cinzel mt-0.5 text-[10px] text-[#2a4a6a] italic transition-colors duration-150 group-hover:text-[#3a5878] group-active:text-[#4a7090] lg:mt-1 lg:text-[11px] xl:text-[14px] 2xl:text-[17px]">
            {desc}
          </p>
        </div>

        {/* Arrow — always faintly visible, brighter on interaction */}
        <span className="font-mono text-base text-[#1e3448] transition-all duration-150 group-hover:text-[#22d3ee] group-hover:opacity-100 group-active:text-[#22d3ee]/80 lg:text-lg xl:text-xl 2xl:text-2xl">
          ›
        </span>
      </Button>

      <ModalOverlay
        className="entering:animate-in entering:fade-in exiting:animate-out exiting:fade-out fixed inset-0 z-50 flex items-center justify-center bg-[rgba(5,8,16,0.88)] backdrop-blur-sm duration-300"
        style={{ height: "100dvh" }}
      >
        <Modal
          className="entering:animate-in entering:slide-in-from-right-8 entering:fade-in exiting:animate-out exiting:slide-out-to-right-8 exiting:fade-out relative overflow-hidden rounded-xl border border-[#1a1a2e] bg-[#050810] shadow-[0_0_80px_rgba(34,211,238,0.05)] duration-300 ease-out"
          style={{
            width: "92vw",
            maxWidth: "none",
            height: "90svh",
          }}
        >
          <Dialog className="h-full outline-none">
            {({ close }) => (
              <ModalShell label={label} Icon={Icon} close={close}>
                {content}
              </ModalShell>
            )}
          </Dialog>
        </Modal>
      </ModalOverlay>
    </DialogTrigger>
  );
}

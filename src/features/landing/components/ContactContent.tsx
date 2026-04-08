"use client";

import { useEffect, useState } from "react";

import { MapPin, Send, Loader2 } from "lucide-react";

import LoadingState from "@/features/landing/components/LoadingState";

// ── Server actions ────────────────────────────────────────────────
import { getContentBlockByKey } from "@/actions/content.actions";

// ── Inferred return types from your actions ───────────────────────

type ContentBlock = {
  key: string;
  title?: string | null;
  content: string;
  published: boolean;
};

// ── CONTACT ───────────────────────────────────────────────────────
export default function ContactContent() {
  const [block, setBlock] = useState<ContentBlock | null | undefined>(
    undefined,
  );
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle",
  );

  useEffect(() => {
    getContentBlockByKey("contact").then((b) => setBlock(b ?? null));
  }, []);

  const handleSubmit = async () => {
    if (!form.name || !form.email || !form.message) return;
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      setStatus(res.ok ? "sent" : "error");
    } catch {
      setStatus("error");
    }
  };

  if (block === undefined) return <LoadingState />;

  const contactText = (
    block?.content ??
    "Open for freelance, collaboration, and full-time opportunities."
  )
    .replace(/^#+\s*/, "")
    .replace(/\*\*/g, "");

  return (
    <div className="px-6 py-5">
      <p className="font-cinzel mb-5 text-sm leading-relaxed text-[#4a6888] sm:text-base lg:text-lg">
        {contactText}
      </p>

      <div className="mb-5 flex flex-wrap gap-2">
        <span className="flex items-center gap-1.5 rounded border border-[#0a1520] bg-[#040710] px-3 py-1.5">
          <MapPin strokeWidth={1.5} className="size-3 text-[#22d3ee]" />
          <span className="font-pixel text-[7px] tracking-widest text-[#3a5878] sm:text-[9px] lg:text-[11px]">
            Davao City, PH
          </span>
        </span>
        <span className="flex items-center gap-1.5 rounded border border-[#0a1520] bg-[#040710] px-3 py-1.5">
          <div
            className="size-1.5 rounded-full bg-[#22d3ee]"
            style={{ boxShadow: "0 0 6px rgba(34,211,238,0.6)" }}
          />
          <span className="font-pixel text-[7px] tracking-widest text-[#3a5878] sm:text-[9px] lg:text-[11px]">
            Available for hire
          </span>
        </span>
      </div>

      {status === "sent" ? (
        <div className="rounded-md border border-[#22d3ee]/30 bg-[#0a1a2e] p-8 text-center">
          <div className="mb-3 flex justify-center">
            <div className="flex size-12 items-center justify-center rounded-full border border-[#22d3ee] bg-[#060d1a]">
              <Send strokeWidth={1.5} className="size-5 text-[#22d3ee]" />
            </div>
          </div>
          <p className="font-pixel text-[8px] tracking-widest text-[#22d3ee] uppercase sm:text-[10px] lg:text-[12px]">
            Signal Transmitted
          </p>
          <p className="font-cinzel mt-2 text-xs text-[#3a5878] sm:text-sm lg:text-base">
            I'll respond within 24 hours.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {(
            [
              {
                key: "name",
                label: "Name",
                type: "text",
                placeholder: "Your name",
              },
              {
                key: "email",
                label: "Email",
                type: "email",
                placeholder: "your@email.com",
              },
            ] as const
          ).map(({ key, label, type, placeholder }) => (
            <div key={key}>
              <label className="font-pixel mb-1.5 block text-[7px] tracking-[0.15em] text-[#152535] uppercase sm:text-[9px] lg:text-[11px]">
                {label}
              </label>
              <input
                type={type}
                value={form[key]}
                onChange={(e) =>
                  setForm((f) => ({ ...f, [key]: e.target.value }))
                }
                placeholder={placeholder}
                className="font-cinzel w-full rounded border border-[#122030] bg-[#040710] px-3 py-2.5 text-sm text-[#a8b8cc] placeholder-[#1e3448] transition-all outline-none focus:border-[#22d3ee] sm:text-base lg:text-lg"
              />
            </div>
          ))}

          <div>
            <label className="font-pixel mb-1.5 block text-[7px] tracking-[0.15em] text-[#152535] uppercase sm:text-[9px] lg:text-[11px]">
              Message
            </label>
            <textarea
              value={form.message}
              onChange={(e) =>
                setForm((f) => ({ ...f, message: e.target.value }))
              }
              placeholder="What's on your mind?"
              rows={4}
              className="font-cinzel w-full resize-none rounded border border-[#122030] bg-[#040710] px-3 py-2.5 text-sm text-[#a8b8cc] placeholder-[#1e3448] transition-all outline-none focus:border-[#22d3ee] sm:text-base lg:text-lg"
            />
          </div>

          {status === "error" && (
            <p className="font-pixel text-[7px] tracking-widest text-red-500 uppercase sm:text-[9px] lg:text-[11px]">
              Transmission failed — try again.
            </p>
          )}

          <button
            onClick={handleSubmit}
            disabled={status === "sending"}
            className="font-pixel flex w-full cursor-pointer items-center justify-center gap-2 rounded border border-[#22d3ee] bg-[#0a1a2e] py-3 text-[8px] tracking-[0.12em] text-[#22d3ee] uppercase transition-all hover:bg-[#0f2540] disabled:opacity-50 sm:text-[10px] lg:text-[12px]"
          >
            {status === "sending" ? (
              <>
                <Loader2 strokeWidth={1.5} className="size-3 animate-spin" />
                Transmitting…
              </>
            ) : (
              <>
                <Send strokeWidth={1.5} className="size-3" />
                Transmit
              </>
            )}
          </button>
        </div>
      )}
    </div>
  );
}

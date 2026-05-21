"use client";

import { useState } from "react";
import { MapPin, Send, Loader2 } from "lucide-react";
import { sendContactEmail } from "@/actions/contact.actions";
import { z } from "zod";

const CONTACT_TEXT =
  "Open for freelance, collaboration, and full-time opportunities.";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.email("Invalid email address"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export default function ContactContent() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle",
  );

  type ContactErrors = Partial<Record<keyof typeof form, string>>;
  const [errors, setErrors] = useState<ContactErrors>({});

  const handleSubmit = async () => {
    const result = contactSchema.safeParse(form);
    if (!result.success) {
      const fieldErrors: ContactErrors = {};
      result.error.issues.forEach((issue) => {
        const field = issue.path[0] as keyof ContactErrors;
        fieldErrors[field] = issue.message;
      });
      setErrors(fieldErrors);
      return;
    }
    setErrors({});
    setStatus("sending");
    const response = await sendContactEmail(form);
    setStatus(response.ok ? "sent" : "error");
  };

  return (
    <div className="relative px-6 py-5">
      {/* Subtle grid overlay */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(34,211,238,0.015) 1px, transparent 1px), linear-gradient(90deg, rgba(34,211,238,0.015) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      {/* Intro text */}
      <p className="font-pixel relative mb-1 text-[7px] tracking-[0.08em] text-[#0d2540] sm:text-[9px]">
        // open channel
      </p>
      <p className="font-cinzel relative mb-5 text-sm leading-relaxed text-[#4a6888] sm:text-base lg:text-lg">
        {CONTACT_TEXT}
      </p>

      {/* Badges */}
      <div className="relative mb-5 flex flex-wrap gap-2">
        <span className="flex items-center gap-1.5 rounded-sm border border-[#0a1520] bg-[#040710] px-3 py-1.5">
          <MapPin strokeWidth={1.5} className="size-3 text-[#22d3ee]" />
          <span className="font-pixel text-[7px] tracking-widest text-[#3a5878] uppercase sm:text-[9px] lg:text-[11px]">
            Davao City, PH
          </span>
        </span>
        <span className="flex items-center gap-1.5 rounded-sm border border-[#0a1520] bg-[#040710] px-3 py-1.5">
          <div
            className="size-1.5 animate-pulse rounded-full bg-[#22d3ee]"
            style={{ boxShadow: "0 0 6px rgba(34,211,238,0.6)" }}
          />
          <span className="font-pixel text-[7px] tracking-widest text-[#3a5878] uppercase sm:text-[9px] lg:text-[11px]">
            Available for hire
          </span>
        </span>
      </div>

      {/* Sent state */}
      {status === "sent" ? (
        <div className="relative rounded-sm border border-[#22d3ee]/30 bg-[#0a1a2e] p-8 text-center">
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
        <div className="relative space-y-3">
          {(
            [
              {
                key: "name",
                label: "Callsign",
                type: "text",
                placeholder: "Your name",
              },
              {
                key: "email",
                label: "Frequency",
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
                className="w-full rounded-sm border border-[#122030] bg-[#040710] px-3 py-2.5 font-mono text-sm text-[#a8b8cc] placeholder-[#1e3448] caret-[#22d3ee] transition-all outline-none focus:border-[#22d3ee] sm:text-base lg:text-lg"
              />
              {errors[key] && (
                <p className="font-pixel mt-1 text-[7px] tracking-widest text-red-500 uppercase sm:text-[9px]">
                  {errors[key]}
                </p>
              )}
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
              className="w-full resize-none rounded-sm border border-[#122030] bg-[#040710] px-3 py-2.5 font-mono text-sm text-[#a8b8cc] placeholder-[#1e3448] caret-[#22d3ee] transition-all outline-none focus:border-[#22d3ee] sm:text-base lg:text-lg"
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
            className="font-pixel group relative flex w-full cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-sm border border-[#22d3ee] bg-[#0a1a2e] py-3 text-[8px] tracking-[0.12em] text-[#22d3ee] uppercase transition-all hover:bg-[#0f2540] disabled:opacity-50 sm:text-[10px] lg:text-[12px]"
          >
            <span
              className="pointer-events-none absolute inset-y-0 left-0 w-0 bg-[#22d3ee] transition-all duration-300 group-hover:w-full group-disabled:hidden"
              aria-hidden="true"
            />
            <span className="relative flex items-center gap-2 transition-colors duration-150 group-hover:text-[#050c17]">
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
            </span>
          </button>
        </div>
      )}
    </div>
  );
}

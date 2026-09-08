"use client";

import { ExternalLink, ShieldCheck } from "lucide-react";
import type { Certification } from "./CertificationsContent";

interface CertificationsListProps {
  certifications: Certification[];
}

export default function CertificationsList({
  certifications,
}: CertificationsListProps) {
  function formatDate(d: Date) {
    return new Date(d).toLocaleDateString("en-US", {
      month: "short",
      year: "numeric",
    });
  }

  return (
    <div className="px-6 py-5">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {certifications.map((cert) => {
          const isExpired = cert.expiryDate
            ? new Date(cert.expiryDate) < new Date()
            : false;

          return (
            <div
              key={cert.id}
              className="border-border-subtle bg-bg-deepest hover:border-border-default flex gap-4 rounded-sm border p-4 transition-all duration-200"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={cert.badgeUrl}
                alt={`${cert.name} badge`}
                className="size-16 shrink-0 object-contain sm:size-20"
              />

              <div className="min-w-0 flex-1">
                <div className="mb-1 flex flex-wrap items-center gap-2">
                  <span
                    className={`font-pixel rounded-sm border px-1.5 py-0.5 text-[6px] tracking-widest uppercase sm:text-[8px] ${
                      isExpired
                        ? "border-border-default bg-bg-deepest text-text-ghost"
                        : "border-accent/40 bg-bg-elevated text-accent"
                    }`}
                  >
                    {isExpired ? "✓ Expired" : "▶ Active"}
                  </span>
                </div>

                <h3 className="text-text-primary font-cinzel text-sm font-bold sm:text-base">
                  {cert.name}
                </h3>

                <p className="text-text-ghost font-cinzel mb-1.5 text-xs sm:text-sm">
                  {cert.issuer}
                </p>

                <p className="text-text-faint font-pixel mb-2 text-[7px] tracking-widest sm:text-[9px]">
                  Issued {formatDate(cert.issueDate)}
                  {cert.expiryDate && ` · Expires ${formatDate(cert.expiryDate)}`}
                </p>

                {cert.credentialUrl && (
                  <a
                    href={cert.credentialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-accent/70 hover:text-accent font-pixel inline-flex items-center gap-1.5 text-[8px] tracking-widest uppercase transition-colors sm:text-[9px]"
                  >
                    <ShieldCheck strokeWidth={1.5} className="size-3" />
                    Verify
                    <ExternalLink strokeWidth={1.5} className="size-2.5" />
                  </a>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

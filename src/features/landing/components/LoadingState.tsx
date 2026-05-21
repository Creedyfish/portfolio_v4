import { Loader2 } from "lucide-react";

export default function LoadingState() {
  return (
    <div className="flex items-center justify-center gap-2 py-16">
      <Loader2
        strokeWidth={1.5}
        className="size-5 animate-spin text-[#22d3ee]"
      />
      <span className="font-pixel text-[8px] tracking-widest text-[#152535] uppercase">
        Loading…
      </span>
    </div>
  );
}

import { parseMarkdown } from "@/lib/parser";

export function MarkdownRenderer({ content }: { content: string }) {
  const tokens = parseMarkdown(content);

  return (
    <div className="flex flex-col gap-3">
      {tokens.map((token, i) => {
        // ─── Headings
        if (token.type === "heading") {
          const size =
            token.level === 1
              ? "text-base sm:text-lg lg:text-xl"
              : token.level === 2
                ? "text-sm sm:text-base lg:text-lg"
                : token.level === 3
                  ? "text-xs sm:text-sm lg:text-base"
                  : "text-xs sm:text-xs lg:text-sm";

          return (
            <div
              key={i}
              className="flex items-start gap-2 pt-2 sm:items-center"
            >
              <span
                className={`font-pixel text-accent leading-tight wrap-break-word ${size}`}
              >
                {token.text}
              </span>

              <div className="bg-border-default h-px flex-1" />
            </div>
          );
        }

        // ─── Bullet points
        if (token.type === "bullet") {
          return (
            <div key={i} className="flex gap-2 pl-2 sm:pl-3 lg:pl-4">
              <span className="text-accent-40 mt-1 text-[10px] sm:text-xs">
                ◆
              </span>

              <p className="text-text-secondary font-cinzel text-sm leading-relaxed wrap-break-word sm:text-base">
                {token.text}
              </p>
            </div>
          );
        }

        // ─── Paragraphs
        return (
          <p
            key={i}
            className="text-text-secondary font-cinzel text-sm leading-relaxed tracking-wide wrap-break-word sm:text-base lg:text-lg"
          >
            {token.text}
          </p>
        );
      })}
    </div>
  );
}

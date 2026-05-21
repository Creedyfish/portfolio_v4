export type MarkdownToken =
  | { type: "heading"; level: number; text: string }
  | { type: "bullet"; text: string }
  | { type: "paragraph"; text: string };

export function parseMarkdown(raw: string): MarkdownToken[] {
  const tokens: MarkdownToken[] = [];

  for (const line of raw.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed) continue;

    // ─── Headings (# to ######)
    const headingMatch = trimmed.match(/^(#{1,6})\s*(.+)$/);
    if (headingMatch) {
      tokens.push({
        type: "heading",
        level: headingMatch[1].length,
        text: headingMatch[2],
      });
      continue;
    }

    // ─── Bullets (- or *)
    const bulletMatch = trimmed.match(/^[-*]\s+(.+)$/);
    if (bulletMatch) {
      tokens.push({
        type: "bullet",
        text: bulletMatch[1],
      });
      continue;
    }

    // ─── Paragraph
    tokens.push({
      type: "paragraph",
      text: trimmed.replace(/\*\*/g, ""),
    });
  }

  return tokens;
}

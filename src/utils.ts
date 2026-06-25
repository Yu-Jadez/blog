/**
 * Strip basic markdown formatting for plain-text excerpts.
 */
export function stripMarkdown(text: string, maxLen = 120): string {
  let out = text
    // Remove headings
    .replace(/^#{1,6}\s+/gm, '')
    // Remove bold/italic
    .replace(/\*{1,3}([^*]+)\*{1,3}/g, '$1')
    // Remove images
    .replace(/!\[.*?\]\(.*?\)/g, '')
    // Remove links (keep text)
    .replace(/\[([^\]]+)\]\(.*?\)/g, '$1')
    // Remove inline code
    .replace(/`([^`]+)`/g, '$1')
    // Remove code blocks
    .replace(/```[\s\S]*?```/g, '')
    // Remove unordered list markers
    .replace(/^[\s]*[-*+]\s+/gm, '')
    // Remove ordered list markers
    .replace(/^[\s]*\d+[.)]\s+/gm, '')
    // Remove blockquotes
    .replace(/^>\s+/gm, '')
    // Remove horizontal rules
    .replace(/^[-*_]{3,}/gm, '')
    // Remove stray # characters
    .replace(/#{1,6}/g, '')
    // Collapse whitespace
    .replace(/\n{2,}/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

  if (out.length > maxLen) {
    out = out.slice(0, maxLen).replace(/\s+\S*$/, '') + '…';
  }

  return out;
}

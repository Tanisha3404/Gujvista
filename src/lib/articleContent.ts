export type ArticleBlock =
  | { type: 'heading'; text: string }
  | { type: 'paragraph'; text: string }
  | { type: 'list'; items: string[] }

// Article text format:
//   - Blocks are separated by a blank line.
//   - A block that starts with "## " is a heading.
//   - A block where every line starts with "- " is a bulleted list.
//   - Anything else is a paragraph.
export function parseArticleContent(content: string): ArticleBlock[] {
  return content
    .trim()
    .split(/\n\s*\n/)
    .map((chunk): ArticleBlock | null => {
      const lines = chunk
        .split('\n')
        .map((line) => line.trim())
        .filter(Boolean)

      if (lines.length === 0) return null
      if (lines.length === 1 && lines[0].startsWith('## ')) {
        return { type: 'heading', text: lines[0].slice(3) }
      }
      if (lines.every((line) => line.startsWith('- '))) {
        return { type: 'list', items: lines.map((line) => line.slice(2)) }
      }
      return { type: 'paragraph', text: lines.join(' ') }
    })
    .filter((block): block is ArticleBlock => block !== null)
}

// About 200 words per minute, never less than 1.
export function readingTimeMinutes(content: string): number {
  const words = content.split(/\s+/).filter(Boolean).length
  return Math.max(1, Math.round(words / 200))
}

export function formatPublishedDate(isoDate: string): string {
  return new Date(isoDate).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  })
}
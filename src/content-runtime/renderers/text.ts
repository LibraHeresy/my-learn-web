export type InlineSegment =
  | { type: 'text'; value: string }
  | { type: 'code'; value: string }

export function splitInlineCode(text: string): InlineSegment[] {
  const segments: InlineSegment[] = []
  const regex = /`([^`]+)`/g
  let lastIndex = 0

  for (const match of text.matchAll(regex)) {
    const index = match.index ?? 0
    if (index > lastIndex) {
      segments.push({ type: 'text', value: text.slice(lastIndex, index) })
    }
    segments.push({ type: 'code', value: match[1] })
    lastIndex = index + match[0].length
  }

  if (lastIndex < text.length) {
    segments.push({ type: 'text', value: text.slice(lastIndex) })
  }

  return segments.length ? segments : [{ type: 'text', value: text }]
}

export function parseCodeFence(content: string): { language: string; code: string } | null {
  const match = content.match(/^```([\w-]+)?\n([\s\S]*?)\n```$/)
  if (!match) return null
  return {
    language: match[1] || 'text',
    code: match[2],
  }
}


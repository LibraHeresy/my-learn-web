export type InlineSegment =
  | { type: 'text'; value: string }
  | { type: 'code'; value: string }

export function splitInlineCode(text: string): InlineSegment[] {
  const segments: InlineSegment[] = []
  let i = 0

  while (i < text.length) {
    const tick = text.indexOf('`', i)
    if (tick === -1) {
      if (i < text.length) segments.push({ type: 'text', value: text.slice(i) })
      break
    }

    if (tick > i) segments.push({ type: 'text', value: text.slice(i, tick) })

    const delimiterLen = text.startsWith('``', tick) ? 2 : 1
    const delimiter = delimiterLen === 2 ? '``' : '`'
    const close = text.indexOf(delimiter, tick + delimiterLen)
    if (close === -1) {
      segments.push({ type: 'text', value: text.slice(tick) })
      break
    }

    const code = text.slice(tick + delimiterLen, close)
    segments.push({ type: 'code', value: code })
    i = close + delimiterLen
  }

  return segments.length ? segments : [{ type: 'text', value: text }]
}

export type InlineToken =
  | { type: 'text'; value: string }
  | { type: 'br' }
  | { type: 'code'; value: string }
  | { type: 'term'; key: string; value: string }
  | { type: 'strong'; children: InlineToken[] }
  | { type: 'em'; children: InlineToken[] }

function findNextMarker(text: string, startIndex: number): { type: 'term' | 'strong' | 'em' | 'br'; index: number } | null {
  const termIndex = text.indexOf('{{term:', startIndex)
  const strongIndex = text.indexOf('**', startIndex)
  const emIndex = text.indexOf('*', startIndex)
  const brIndex = text.indexOf('\n', startIndex)

  let best: { type: 'term' | 'strong' | 'em' | 'br'; index: number } | null = null
  const consider = (type: 'term' | 'strong' | 'em' | 'br', index: number) => {
    if (index === -1) return
    if (!best || index < best.index) best = { type, index }
  }

  consider('term', termIndex)
  consider('strong', strongIndex)
  consider('em', emIndex)
  consider('br', brIndex)

  return best
}

function parseInlineText(text: string): InlineToken[] {
  const out: InlineToken[] = []
  let i = 0

  while (i < text.length) {
    const next = findNextMarker(text, i)
    if (!next) {
      if (i < text.length) out.push({ type: 'text', value: text.slice(i) })
      break
    }

    if (next.index > i) {
      out.push({ type: 'text', value: text.slice(i, next.index) })
      i = next.index
      continue
    }

    if (next.type === 'br') {
      out.push({ type: 'br' })
      i += 1
      continue
    }

    if (next.type === 'term') {
      const end = text.indexOf('}}', i)
      if (end === -1) {
        out.push({ type: 'text', value: text.slice(i) })
        break
      }
      const raw = text.slice(i + '{{term:'.length, end)
      const key = raw.trim()
      out.push({ type: 'term', key, value: key })
      i = end + 2
      continue
    }

    if (next.type === 'strong') {
      const end = text.indexOf('**', i + 2)
      if (end === -1) {
        out.push({ type: 'text', value: '**' })
        i += 2
        continue
      }
      const inner = text.slice(i + 2, end)
      out.push({ type: 'strong', children: parseInlineText(inner) })
      i = end + 2
      continue
    }

    if (next.type === 'em') {
      if (text.startsWith('**', i)) {
        out.push({ type: 'text', value: '*' })
        i += 1
        continue
      }
      const end = text.indexOf('*', i + 1)
      if (end === -1) {
        out.push({ type: 'text', value: '*' })
        i += 1
        continue
      }
      const inner = text.slice(i + 1, end)
      out.push({ type: 'em', children: parseInlineText(inner) })
      i = end + 1
      continue
    }
  }

  return out
}

export function parseInlineTokens(text: string): InlineToken[] {
  const base = splitInlineCode(text)
  const out: InlineToken[] = []
  for (const seg of base) {
    if (seg.type === 'code') {
      out.push({ type: 'code', value: seg.value })
      continue
    }
    out.push(...parseInlineText(seg.value))
  }
  return out.length ? out : [{ type: 'text', value: text }]
}

export function parseCodeFence(content: string): { language: string; code: string } | null {
  const match = content.match(/^```\s*([\w-]+)?\s*\n([\s\S]*?)\n```\s*$/)
  if (!match) return null
  return {
    language: match[1] || 'text',
    code: match[2],
  }
}

export type BlockContentSegment =
  | { type: 'text'; text: string }
  | { type: 'code'; language: string; code: string }

export function splitFencedCodeBlocks(content: string): BlockContentSegment[] {
  const normalized = content.replace(/\r\n/g, '\n')
  const lines = normalized.split('\n')
  const out: BlockContentSegment[] = []
  const textBuf: string[] = []

  const flushText = () => {
    const text = textBuf.join('\n').trim()
    textBuf.length = 0
    if (text) out.push({ type: 'text', text })
  }

  let i = 0
  while (i < lines.length) {
    const line = lines[i]
    const trimmed = line.trim()
    const open = trimmed.match(/^```\s*([\w-]+)?\s*$/)
    if (!open) {
      textBuf.push(line)
      i += 1
      continue
    }

    flushText()
    const language = open[1] || 'text'
    i += 1
    const codeLines: string[] = []
    while (i < lines.length) {
      const closeTrimmed = lines[i].trim()
      if (closeTrimmed.startsWith('```')) break
      codeLines.push(lines[i])
      i += 1
    }

    if (i >= lines.length) {
      out.push({ type: 'code', language, code: codeLines.join('\n').trimEnd() })
      break
    }

    const closeTrimmed = lines[i].trim()
    const trailing = closeTrimmed.slice(3).trim()
    out.push({ type: 'code', language, code: codeLines.join('\n').trimEnd() })
    i += 1
    if (trailing) textBuf.push(trailing)
  }

  flushText()
  return out.length ? out : [{ type: 'text', text: content }]
}

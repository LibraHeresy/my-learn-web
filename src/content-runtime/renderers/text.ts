type InlineSegment =
  | { type: 'text'; value: string }
  | { type: 'code'; value: string }

function splitInlineCode(text: string): InlineSegment[] {
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
      // Find matching }} — skip over nested {{term:...}} markers
      let depth = 1
      let end = -1
      let pos = i + '{{term:'.length
      while (pos < text.length) {
        if (text.startsWith('{{term:', pos)) {
          depth++
          pos += '{{term:'.length
          continue
        }
        if (text.startsWith('}}', pos)) {
          depth--
          if (depth === 0) { end = pos; break }
          pos += 2
          continue
        }
        pos++
      }
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
  const clean = text.replace(/\r\n/g, '\n').replace(/\r/g, '\n').replace(/\n{2,}/g, '\n')
  const base = splitInlineCode(clean)
  const out: InlineToken[] = []
  let pending = ''
  for (const seg of base) {
    if (seg.type === 'text') {
      pending += seg.value
      continue
    }
    // 检查 pending 中 ** 是否成对：未闭合时说明 code 在 strong 内部，拼回去一起解析
    const stars = pending.match(/\*\*/g)
    if (stars && stars.length % 2 === 1) {
      pending += '`' + seg.value + '`'
    } else {
      if (pending) { out.push(...parseInlineText(pending)); pending = '' }
      out.push({ type: 'code', value: seg.value })
    }
  }
  if (pending) out.push(...parseInlineText(pending))
  return out.length ? out : [{ type: 'text', value: text }]
}

export type ListItem = { text: string; indent: number; children?: ListItem[] }

export type BlockContentSegment =
  | { type: 'text'; text: string }
  | { type: 'code'; language: string; code: string }
  | { type: 'hr' }
  | { type: 'table'; headers: string[]; rows: string[][] }
  | { type: 'list'; items: ListItem[]; ordered: boolean }

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

  function isTableRow(line: string): boolean {
    return /^\|.+\|$/.test(line.trim())
  }
  function isTableSep(line: string): boolean {
    return /^\|[\s\-:|]+\|$/.test(line.trim())
  }
  function parseTableRow(line: string): string[] {
    return line.trim().split('|').slice(1, -1).map(c => c.trim())
  }

  let i = 0
  while (i < lines.length) {
    const line = lines[i]
    const trimmed = line.trim()
    // Pipe table: consecutive |...| lines starting with header row
    if (isTableRow(trimmed) && i + 2 < lines.length && isTableSep(lines[i + 1].trim()) && isTableRow(lines[i + 2].trim())) {
      flushText()
      const headers = parseTableRow(trimmed)
      i += 2 // skip header + separator
      const rows: string[][] = []
      while (i < lines.length && isTableRow(lines[i].trim())) {
        rows.push(parseTableRow(lines[i].trim()))
        i += 1
      }
      out.push({ type: 'table', headers, rows })
      continue
    }

    // Unordered/ordered list: consecutive lines starting with - or * or 1.
    const ulMatch = trimmed.match(/^(\s*)[-*]\s+(.+)$/)
    const olMatch = trimmed.match(/^(\s*)\d+\.\s+(.+)$/)
    const listMatch = ulMatch || olMatch
    if (listMatch) {
      flushText()
      const isOrdered = !!olMatch
      const items: ListItem[] = []
      while (i < lines.length) {
        const li = lines[i].trimEnd()
        const ulM = li.match(/^(\s*)[-*]\s+(.+)$/)
        const olM = li.match(/^(\s*)\d+\.\s+(.+)$/)
        if (!ulM && !olM) break
        const m = ulM || olM!
        const indent = m[1].length
        const rawText = m[2]
        // Build tree: deeper indent = child of previous item
        const item: ListItem = { text: rawText, indent }
        if (indent > 0 && items.length > 0) {
          let parent = items[items.length - 1]
          // Walk up to find the parent with smaller indent
          for (let j = items.length - 1; j >= 0; j--) {
            if (items[j].indent < indent) { parent = items[j]; break }
          }
          if (!parent.children) parent.children = []
          parent.children.push(item)
        } else {
          items.push(item)
        }
        i += 1
      }
      out.push({ type: 'list', items, ordered: isOrdered })
      continue
    }

    // Horizontal rule: --- alone on a line
    if (trimmed === '---') {
      flushText()
      out.push({ type: 'hr' })
      i += 1
      continue
    }

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

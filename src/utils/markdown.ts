import { glossary } from '../data/glossary'

// 转义 HTML 特殊字符
function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

// 复原占位符
function restorePlaceholders(text: string, placeholders: string[]): string {
  return text.replace(/%%P(\d+)%%/g, (_, i) => placeholders[parseInt(i)])
}

// 包裹已知术语为 tooltip span（在转义前调用，术语列表按长度降序）
function wrapTerms(text: string, placeholders: string[]): string {
  let html = text
  for (const [key] of glossary) {
    const escaped = key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
    const regex = new RegExp(escaped, 'g')
    html = html.replace(regex, () => {
      const idx = placeholders.length
      placeholders.push(`<span class="term-tip" data-term="${escapeHtml(key)}">${escapeHtml(key)}</span>`)
      return `%%P${idx}%%`
    })
  }
  return html
}

// 提取围栏代码块 → 占位符
function extractCodeFences(text: string, placeholders: string[], withClass: boolean): string {
  return text.replace(/```(\w*)\n([\s\S]*?)```/g, (_, lang, code) => {
    const idx = placeholders.length
    const codeContent = withClass ? escapeHtml(code.trimEnd()) : escapeHtml(code)
    const langAttr = !withClass && lang ? ` class="language-${escapeHtml(lang)}"` : ''
    const classAttr = withClass ? ' class="code-block"' : ''
    placeholders.push(`<pre${classAttr}><code${langAttr}>${codeContent}</code></pre>`)
    return `%%P${idx}%%`
  })
}

// 提取表格 → 占位符
function extractTables(text: string, placeholders: string[]): string {
  return text.replace(/(?:^|\n)(\|[^\n]+\|\n)(\|[-:| ]+\|\n)((?:\|[^\n]+\|(?:\n|$))+)/g, (match) => {
    const idx = placeholders.length
    placeholders.push(parseTable(match))
    return `%%P${idx}%%`
  })
}

// 共享的内联处理管道：行内代码 → 术语 → 转义 → 还原 → 粗体/斜体
function applyInlinePipeline(text: string, placeholders: string[]): string {
  // 1. 提取行内代码
  let html = text.replace(/`([^`]+)`/g, (_, code) => {
    const idx = placeholders.length
    placeholders.push(`<code class="inline-code">${escapeHtml(code)}</code>`)
    return `%%P${idx}%%`
  })

  // 2. 包裹术语
  html = wrapTerms(html, placeholders)

  // 3. 转义 HTML
  html = escapeHtml(html)

  // 4. 还原占位符
  html = restorePlaceholders(html, placeholders)

  // 5. 粗体 / 斜体
  html = html.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
  html = html.replace(/\*([^*]+)\*/g, '<em>$1</em>')

  return html
}

// 轻量内联 Markdown → HTML，不包裹 <p>
export function parseInline(text: string): string {
  const placeholders: string[] = []

  // 提取代码块 + 表格
  let html = extractCodeFences(text, placeholders, false)
  html = extractTables(html, placeholders)

  // 内联管道
  html = applyInlinePipeline(html, placeholders)

  // 换行处理
  html = html.trim()
  html = html.replace(/\n{2,}/g, '\n\n')
  html = html.replace(/\n/g, '<br>')
  html = html.replace(/(<br>\s*){3,}/g, '<br><br>')
  html = html.replace(/^(<br>)+|(<br>)+$/g, '')

  return html
}

// 将 Markdown 表格转为 HTML
function parseTable(text: string): string {
  const rows = text.trim().split('\n')
  if (rows.length < 2) return escapeHtml(text)

  function splitRow(row: string): string[] {
    return row
      .replace(/^\||\|$/g, '')
      .split('|')
      .map(cell => cell.trim())
  }

  // 表格单元格内联处理（不含术语包裹，避免在表头中触发术语 tooltip）
  function processCell(text: string): string {
    const ph: string[] = []
    let result = text.replace(/`([^`]+)`/g, (_, code) => {
      const idx = ph.length
      ph.push(`<code class="inline-code">${escapeHtml(code)}</code>`)
      return `%%P${idx}%%`
    })
    result = escapeHtml(result)
    result = restorePlaceholders(result, ph)
    result = result.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    result = result.replace(/\*([^*]+)\*/g, '<em>$1</em>')
    return result
  }

  const headerCells = splitRow(rows[0])
  const bodyRows = rows.slice(2)

  const thead = `<thead><tr>${headerCells.map(c => `<th>${processCell(c)}</th>`).join('')}</tr></thead>`
  const tbody = `<tbody>${bodyRows.map(row =>
    `<tr>${splitRow(row).map(c => `<td>${processCell(c)}</td>`).join('')}</tr>`
  ).join('')}</tbody>`

  return `<table class="md-table">${thead}${tbody}</table>`
}

// 完整 Markdown → HTML（包裹 <p>，支持 [[html]] 块）
export function parseContent(text: string): string {
  const placeholders: string[] = []
  const htmlBlocks: string[] = []

  // 0. 提取 [[html]] 块（单独存储，避开后续的 \n → <br> 处理）
  let html = text.replace(/\[\[html\]\]([\s\S]*?)\[\[\/html\]\]/g, (_, raw) => {
    const idx = htmlBlocks.length
    htmlBlocks.push(raw)
    return `%%H${idx}%%`
  })

  // 1. 提取代码块 + 表格
  html = extractCodeFences(html, placeholders, true)
  html = extractTables(html, placeholders)

  // 2. 内联管道
  html = applyInlinePipeline(html, placeholders)

  // 3. 段落处理
  html = html.trim()
  html = html.replace(/\n{2,}/g, '</p><p>')
  html = html.replace(/\n/g, '<br>')
  html = html.replace(/(?:^|<p>)(<br>)+/g, '<p>')
  html = html.replace(/(<br>)+(?:$|<\/p>)/g, '</p>')
  html = html.replace(/<p><\/p>/g, '')

  // 4. 还原 [[html]] 块
  html = html.replace(/%%H(\d+)%%/g, (_, i) => htmlBlocks[parseInt(i)])

  if (!html.trim()) return ''
  return `<p>${html}</p>`
}

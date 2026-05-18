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

// 轻量内联 Markdown → HTML，不包裹 <p>
export function parseInline(text: string): string {
  const placeholders: string[] = []

  // 0. 提取围栏代码块 ```...``` → 占位符
  let html = text.replace(/```(\w*)\n([\s\S]*?)```/g, (_, lang, code) => {
    const idx = placeholders.length
    const langAttr = lang ? ` class="language-${escapeHtml(lang)}"` : ''
    placeholders.push(`<pre><code${langAttr}>${escapeHtml(code)}</code></pre>`)
    return `%%P${idx}%%`
  })

  // 0.5. 提取表格
  html = html.replace(/(?:^|\n)(\|[^\n]+\|\n)(\|[-:| ]+\|\n)((?:\|[^\n]+\|(?:\n|$))+)/g, (match) => {
    const idx = placeholders.length
    placeholders.push(parseTable(match))
    return `%%P${idx}%%`
  })

  // 1. 提取行内代码 → 占位符
  html = html.replace(/`([^`]+)`/g, (_, code) => {
    const idx = placeholders.length
    placeholders.push(`<code class="inline-code">${escapeHtml(code)}</code>`)
    return `%%P${idx}%%`
  })

  // 1.5 包裹术语
  html = wrapTerms(html, placeholders)

  // 2. 转义 HTML
  html = escapeHtml(html)

  // 3. 还原占位符
  html = restorePlaceholders(html, placeholders)

  // 4. 粗体 / 斜体
  html = html.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
  html = html.replace(/\*([^*]+)\*/g, '<em>$1</em>')

  // 5. 换行处理
  html = html.trim()
  html = html.replace(/\n{2,}/g, '\n\n')
  html = html.replace(/\n/g, '<br>')
  // 合并连续 <br>（最多保留两个）
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

  function processCell(text: string): string {
    const ph: string[] = []
    let result = text.replace(/`([^`]+)`/g, (_, code) => {
      const idx = ph.length
      ph.push(`<code class="inline-code">${escapeHtml(code)}</code>`)
      return `%%P${idx}%%`
    })
    result = escapeHtml(result)
    result = result.replace(/%%P(\d+)%%/g, (_, i) => ph[parseInt(i)])
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

  // 0. 提取 [[html]] 块
  let html = text.replace(/\[\[html\]\]([\s\S]*?)\[\[\/html\]\]/g, (_, raw) => {
    const idx = placeholders.length
    placeholders.push(raw)
    return `%%P${idx}%%`
  })

  // 1. 提取围栏代码块
  html = html.replace(/```(\w*)\n([\s\S]*?)```/g, (_, _lang, code) => {
    const idx = placeholders.length
    placeholders.push(`<pre class="code-block"><code>${escapeHtml(code.trimEnd())}</code></pre>`)
    return `%%P${idx}%%`
  })

  // 2. 提取表格
  html = html.replace(/(?:^|\n)(\|[^\n]+\|\n)(\|[-:| ]+\|\n)((?:\|[^\n]+\|(?:\n|$))+)/g, (match) => {
    const idx = placeholders.length
    placeholders.push(parseTable(match))
    return `%%P${idx}%%`
  })

  // 3. 提取行内代码
  html = html.replace(/`([^`]+)`/g, (_, code) => {
    const idx = placeholders.length
    placeholders.push(`<code class="inline-code">${escapeHtml(code)}</code>`)
    return `%%P${idx}%%`
  })

  // 4. 包裹术语
  html = wrapTerms(html, placeholders)

  // 5. 转义剩余 HTML
  html = escapeHtml(html)

  // 6. 还原占位符
  html = restorePlaceholders(html, placeholders)

  // 7. 粗体 / 斜体
  html = html.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
  html = html.replace(/\*([^*]+)\*/g, '<em>$1</em>')

  // 8. 段落处理
  html = html.trim()
  html = html.replace(/\n{2,}/g, '</p><p>')
  html = html.replace(/\n/g, '<br>')
  // 清除段落边界 <br>（如 \n\n\n 产生的 </p><p><br>）
  html = html.replace(/(?:^|<p>)(<br>)+/g, '<p>')
  html = html.replace(/(<br>)+(?:$|<\/p>)/g, '</p>')
  // 移除孤立的空 <p></p> 标签
  html = html.replace(/<p><\/p>/g, '')

  // 若内容全空则直接返回
  if (!html.trim()) return ''

  return `<p>${html}</p>`
}

import { getGlossaryTuples } from '../content-loaders/glossary'

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
  const glossary = getGlossaryTuples()
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
  // 支持多种格式：
  //   ```lang\ncode\n```         标准格式
  //   ```\ncode\n```            无语言标识
  //   ```inline content\n```    内容紧跟（如 ```App.vue（根组件）...）
  return text.replace(/```[ \t]*(?:(\w+)[ \t]*\n)?([\s\S]*?)```/g, (_, lang, code) => {
    const idx = placeholders.length
    const codeContent = withClass ? escapeHtml(code.trimEnd()) : escapeHtml(code)
    const langAttr = !withClass && lang ? ` class="language-${escapeHtml(lang)}"` : ''
    const classAttr = withClass ? ' class="code-block"' : ''
    placeholders.push(`<pre${classAttr}><code${langAttr}>${codeContent}</code></pre>`)
    return `%%P${idx}%%`
  })
}

// 提取引用块 → 占位符（在列表提取之前调用）
function extractBlockquotes(text: string, placeholders: string[]): string {
  // 匹配连续的 > 行（> 后空格可选，支持空行）
  return text.replace(/(?:^|\n)((?:> ?[^\n]*(?:\n|$))+)/gm, (match) => {
    const trimmed = match.replace(/^\n/, '')
    const lines = trimmed.split('\n')
    const parts: string[] = []
    let buf: string[] = []

    for (const line of lines) {
      const content = line.replace(/^> ?/, '')
      if (content.trim() === '') {
        if (buf.length > 0) { parts.push(buf.join('<br>')); buf = [] }
      } else {
        const localPh: string[] = []
        let html = content
        html = html.replace(/`([^`]+)`/g, (_, code) => {
          const i = localPh.length
          localPh.push(`<code class="inline-code">${escapeHtml(code)}</code>`)
          return `%%P${i}%%`
        })
        html = extractLinks(html, localPh)
        html = escapeHtml(html)
        html = restorePlaceholders(html, localPh)
        html = html.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
        html = html.replace(/\*([^*]+)\*/g, '<em>$1</em>')
        // 高亮 "Day N" 日记标签
        html = html.replace(/^(Day \d+[：:])/, '<span class="diary-day">$1</span>')
        buf.push(html)
      }
    }
    if (buf.length > 0) parts.push(buf.join('<br>'))

    const inner = parts.map(p => `<p>${p}</p>`).join('')
    const idx = placeholders.length
    placeholders.push(`<blockquote class="md-blockquote">${inner}</blockquote>`)
    return `%%P${idx}%%`
  })
}

// 提取列表 → 占位符（在代码块提取之后调用）
function extractLists(text: string, placeholders: string[]): string {
  const listBlockRegex = /(?:^|\n)((?:(?:  )?(?:[-*]|\d+\.)\s[^\n]+\n?)+)/gm

  return text.replace(listBlockRegex, (match) => {
    const trimmed = match.replace(/^\n/, '')
    const lines = trimmed.split('\n').filter(l => l.trim())
    if (lines.length === 0) return match

    const firstLine = lines[0].trim()
    const isOrdered = /^\d+\.\s/.test(firstLine)
    const tag = isOrdered ? 'ol' : 'ul'

    const items = lines.map(line => {
      const content = line.replace(/^\s*(?:[-*]|\d+\.)\s/, '')
      // Use isolated placeholders for list item inline processing
      const localPh: string[] = []
      let processed = content.replace(/`([^`]+)`/g, (_, code) => {
        const idx = localPh.length
        localPh.push(`<code class="inline-code">${escapeHtml(code)}</code>`)
        return `%%P${idx}%%`
      })
      processed = extractLinks(processed, localPh)
      processed = escapeHtml(processed)
      processed = restorePlaceholders(processed, localPh)
      processed = processed.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
      processed = processed.replace(/\*([^*]+)\*\*/g, '<em>$1</em>')
      return `<li>${processed}</li>`
    }).join('')

    const idx = placeholders.length
    placeholders.push(`<${tag} class="md-list">${items}</${tag}>`)
    return `%%P${idx}%%`
  })
}

// 提取 Markdown 链接 → 占位符（在转义前调用）
function extractLinks(text: string, placeholders: string[]): string {
  // Match [text](url) pattern
  return text.replace(/\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g, (_, label, url) => {
    const idx = placeholders.length
    placeholders.push(`<a href="${escapeHtml(url)}" target="_blank" rel="noopener">${escapeHtml(label)}</a>`)
    return `%%P${idx}%%`
  })
}

// 自动链接裸 URL（在转义前调用，避免匹配已在链接中的 URL）
function autoLinkUrls(text: string, placeholders: string[]): string {
  // Only match URLs that are NOT already inside a placeholder
  return text.replace(/(?<!%%P\d)https?:\/\/[^\s<>"']+/g, (url) => {
    // Remove trailing punctuation that's likely not part of the URL
    const cleaned = url.replace(/[.,;:!?)\]]+$/, '')
    const idx = placeholders.length
    placeholders.push(`<a href="${escapeHtml(cleaned)}" target="_blank" rel="noopener">${escapeHtml(cleaned)}</a>`)
    return `%%P${idx}%%`
  })
}
function extractTables(text: string, placeholders: string[]): string {
  return text.replace(/(?:^|\n)(\|[^\n]+\|\n)(\|[-:| ]+\|\n)((?:\|[^\n]+\|(?:\n|$))+)/g, (match) => {
    const idx = placeholders.length
    placeholders.push(parseTable(match))
    return `%%P${idx}%%`
  })
}

// 共享的内联处理管道：行内代码 → 链接 → 自动链接裸 URL → 术语 → 转义 → 还原 → 粗体/斜体
function applyInlinePipeline(text: string, placeholders: string[]): string {
  // 1. 提取行内代码
  let html = text.replace(/`([^`]+)`/g, (_, code) => {
    const idx = placeholders.length
    placeholders.push(`<code class="inline-code">${escapeHtml(code)}</code>`)
    return `%%P${idx}%%`
  })

  // 2. 提取 Markdown 链接
  html = extractLinks(html, placeholders)

  // 3. 自动链接裸 URL（必须在 escapeHtml 和 restorePlaceholders 之前：此时代码块等
  //    块级元素仍为占位符，其中的 URL 不会被误匹配；生成的 <a> 标签存入占位符数组，
  //    由 restorePlaceholders 统一还原，不会被 escapeHtml 转义）
  html = autoLinkUrls(html, placeholders)

  // 4. 包裹术语（放在自动链接之后，避免把 https/http 等协议片段误当术语导致 URL 无法链接）
  html = wrapTerms(html, placeholders)

  // 5. 转义 HTML
  html = escapeHtml(html)

  // 6. 还原占位符
  html = restorePlaceholders(html, placeholders)

  // 7. 粗体 / 斜体
  html = html.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
  html = html.replace(/\*([^*]+)\*/g, '<em>$1</em>')

  return html
}

// 预处理：将 {{term:key}} 还原为纯文本 key，交由后续 wrapTerms 统一处理
function stripTermMarkers(text: string): string {
  return text.replace(/\{\{term:([^}]+)\}\}/g, '$1')
}

// 轻量内联 Markdown → HTML，不包裹 <p>
export function parseInline(text: string): string {
  const placeholders: string[] = []
  text = stripTermMarkers(text)

  // 提取代码块 + 引用块 + 表格 + 列表
  let html = extractCodeFences(text, placeholders, false)
  html = extractBlockquotes(html, placeholders)
  html = extractTables(html, placeholders)
  html = extractLists(html, placeholders)

  // 内联管道
  html = applyInlinePipeline(html, placeholders)

  // 换行处理
  html = html.trim()
  html = html.replace(/\n{2,}/g, '\n')
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
  text = stripTermMarkers(text)

  // 0. 提取 [[html]] 块（单独存储，避开后续的 \n → <br> 处理）
  let html = text.replace(/\[\[html\]\]([\s\S]*?)\[\[\/html\]\]/g, (_, raw) => {
    const idx = htmlBlocks.length
    htmlBlocks.push(raw)
    return `%%H${idx}%%`
  })

  // 1. 提取代码块 + 引用块 + 表格 + 列表
  html = extractCodeFences(html, placeholders, true)
  html = extractBlockquotes(html, placeholders)
  html = extractTables(html, placeholders)
  html = extractLists(html, placeholders)

  // 2. 内联管道（含链接提取）
  html = applyInlinePipeline(html, placeholders)

  // 3. 段落处理
  html = html.trim()
  if (html) html = '<p>' + html + '</p>'
  html = html.replace(/\n{2,}/g, '</p><p>')
  html = html.replace(/\n/g, '<br>')
  html = html.replace(/<p>\s*(?:<br>\s*)+/g, '<p>')
  html = html.replace(/(?:\s*<br>\s*)+<\/p>/g, '</p>')
  html = html.replace(/<p><\/p>/g, '')

  // 5. 注入块级占位符：块级元素不能嵌套在 <p> 内，提取出来
  html = html.replace(/<p>(%%P\d+%%)<\/p>/g, (_, ph) => {
    const idx = parseInt((ph as string).replace(/\D/g, ''))
    const content = placeholders[idx]
    if (content && /^<(?:pre|blockquote|ul|ol|table)/.test(content)) {
      return ph as string
    }
    return `<p>${ph}</p>`
  })

  // 6. 还原 [[html]] 块和剩余占位符
  html = html.replace(/%%H(\d+)%%/g, (_, i) => htmlBlocks[parseInt(i)])
  html = restorePlaceholders(html, placeholders)

  if (!html.trim()) return ''
  return html
}

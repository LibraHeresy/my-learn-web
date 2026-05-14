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
// 处理：`code` → <code>, **bold** → <strong>, \n → <br>，其余 HTML 转义
export function parseInline(text: string): string {
  const placeholders: string[] = []

  // 1. 提取行内代码，替换为占位符
  let html = text.replace(/`([^`]+)`/g, (_, code) => {
    const idx = placeholders.length
    placeholders.push(`<code class="inline-code">${escapeHtml(code)}</code>`)
    return `%%P${idx}%%`
  })

  // 1.5 包裹术语（在转义之前）
  html = wrapTerms(html, placeholders)

  // 2. 对剩余文本转义 HTML（< > & "）
  html = escapeHtml(html)

  // 3. 还原占位符
  html = restorePlaceholders(html, placeholders)

  // 4. **加粗** 与 *斜体*
  html = html.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
  html = html.replace(/\*([^*]+)\*/g, '<em>$1</em>')

  // 5. 换行
  html = html.replace(/\n/g, '<br>')

  return html
}

// 将 Markdown 转换为纯文本（用于需要截断显示的场景）
export function stripMarkdown(text: string): string {
  return text
    .replace(/`([^`]+)`/g, '$1')
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/\n/g, ' ')
}

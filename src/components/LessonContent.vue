<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import type { Lesson } from '../types'
import { parseInline } from '../utils/markdown'
import { glossary } from '../data/glossary'

defineProps<{
  lesson: Lesson
}>()

defineEmits<{
  complete: []
}>()

// ===== 术语 Tooltip 状态 =====
const tooltipVisible = ref(false)
const tooltipContent = ref({ term: '', explanation: '', analogy: '' })
const tooltipStyle = ref<{ top?: string; bottom?: string; left: string }>({ top: '0px', left: '0px' })

let activeTermEl: HTMLElement | null = null

function showTooltip(el: HTMLElement, termKey: string) {
  const def = glossary.find(([k]) => k === termKey)
  if (!def) return
  activeTermEl = el
  tooltipContent.value = { term: termKey, explanation: def[1].explanation, analogy: def[1].analogy || '' }
  tooltipVisible.value = true
  updateTooltipPosition(el)
}

function updateTooltipPosition(el: HTMLElement) {
  const rect = el.getBoundingClientRect()
  const tooltipWidth = 260
  const gap = 8
  const vw = window.innerWidth
  const vh = window.innerHeight

  let left = rect.left + rect.width / 2 - tooltipWidth / 2
  left = Math.max(gap, Math.min(left, vw - tooltipWidth - gap))

  // 优先显示在术语上方，空间不够则显示在下方
  if (rect.top > 130) {
    tooltipStyle.value = {
      top: 'auto',
      bottom: (vh - rect.top + gap) + 'px',
      left: left + 'px'
    }
  } else {
    tooltipStyle.value = {
      top: (rect.bottom + gap) + 'px',
      bottom: 'auto',
      left: left + 'px'
    }
  }
}

function hideTooltip() {
  tooltipVisible.value = false
  activeTermEl = null
}

function onContentClick(e: MouseEvent) {
  const target = e.target as HTMLElement
  const termEl = target.closest('.term-tip') as HTMLElement | null
  if (termEl) {
    const termKey = termEl.dataset.term || ''
    showTooltip(termEl, termKey)
    e.stopPropagation()
    return
  }
  hideTooltip()
}

function onContentMouseover(e: MouseEvent) {
  const target = e.target as HTMLElement
  const termEl = target.closest('.term-tip') as HTMLElement | null
  if (termEl) {
    const termKey = termEl.dataset.term || ''
    showTooltip(termEl, termKey)
  } else if (activeTermEl) {
    hideTooltip()
  }
}

function onScroll() {
  if (activeTermEl) updateTooltipPosition(activeTermEl)
}

onMounted(() => {
  document.addEventListener('scroll', onScroll, true)
})

onBeforeUnmount(() => {
  document.removeEventListener('scroll', onScroll, true)
})

// 转义 HTML 特殊字符（保护已有占位符）
function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

// 还原占位符中的 HTML（代码块内容不需要转义）
function unescapePlaceholders(text: string, placeholders: string[]): string {
  return text.replace(/%%P(\d+)%%/g, (_, i) => placeholders[parseInt(i)])
}

// 在文本中包裹已知术语为 tooltip span
// 在当前阶段：代码块和行内代码已经替换为 %%P...%% 占位符
function wrapTerms(text: string, placeholders: string[]): string {
  let html = text
  for (const [key, def] of glossary) {
    const escaped = key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
    const regex = new RegExp(escaped, 'g')
    html = html.replace(regex, (_match) => {
      const idx = placeholders.length
      placeholders.push(`<span class="term-tip" data-term="${escapeHtml(key)}">${escapeHtml(key)}</span>`)
      return `%%P${idx}%%`
    })
  }
  return html
}

// 将 Markdown 表格转换为 HTML
function convertTable(md: string): string {
  const lines = md.trim().split('\n')
  if (lines.length < 2) return ''
  const parseRow = (line: string) =>
    line.replace(/^\||\|$/g, '').split('|').map(c => c.trim())

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

  const headers = parseRow(lines[0])
  const rows = lines.slice(2).map(parseRow)

  let html = '<table class="md-table"><thead><tr>'
  for (const h of headers) {
    html += `<th>${processCell(h)}</th>`
  }
  html += '</tr></thead><tbody>'
  for (const row of rows) {
    html += '<tr>'
    for (const cell of row) {
      html += `<td>${processCell(cell)}</td>`
    }
    html += '</tr>'
  }
  html += '</tbody></table>'
  return html
}

function parseContent(text: string): string {
  const placeholders: string[] = []

  // 0. 提取原始 HTML 块 [[html]]...[[/html]]，替换为占位符
  let html = text.replace(/\[\[html\]\]([\s\S]*?)\[\[\/html\]\]/g, (_, raw) => {
    const idx = placeholders.length
    placeholders.push(raw)
    return `%%P${idx}%%`
  })

  // 0.5 提取 Markdown 表格
  html = html.replace(/\|[^\n]+\|\n\|[-:\s|]+\|\n(?:\|[^\n]+\|\n?)*/g, (table) => {
    const idx = placeholders.length
    placeholders.push(convertTable(table))
    return `%%P${idx}%%`
  })

  // 1. 提取代码块，替换为占位符
  html = html.replace(/```(\w*)\n([\s\S]*?)```/g, (_, _lang, code) => {
    const idx = placeholders.length
    placeholders.push(`<pre class="code-block"><code>${escapeHtml(code.trimEnd())}</code></pre>`)
    return `%%P${idx}%%`
  })

  // 2. 提取行内代码，替换为占位符
  html = html.replace(/`([^`]+)`/g, (_, code) => {
    const idx = placeholders.length
    placeholders.push(`<code class="inline-code">${escapeHtml(code)}</code>`)
    return `%%P${idx}%%`
  })

  // 2.5 包裹编程术语为 tooltip span（在转义之前，因为 term 可能含 HTML 特殊字符）
  html = wrapTerms(html, placeholders)

  // 3. 对剩余文本转义 HTML
  html = escapeHtml(html)

  // 4. 还原占位符
  html = unescapePlaceholders(html, placeholders)

  // 5. Markdown 样式转换
  html = html
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    .replace(/\*([^*]+)\*/g, '<em>$1</em>')
    .replace(/\n\n/g, '</p><p>')
    .replace(/\n/g, '<br>')

  return `<p>${html}</p>`
}

</script>

<template>
  <div class="content-panel">
    <div class="content-header">
      <span class="lesson-number">第 {{ lesson.order }} 课</span>
      <h2 class="lesson-title">{{ lesson.title }}</h2>
    </div>

    <div
      class="content-body"
      @click="onContentClick"
      @mouseover="onContentMouseover"
    >
      <!-- 音乐类比 -->
      <div class="analogy-box">
        <span class="analogy-icon">🎵</span>
        <p class="analogy-text" v-html="parseInline(lesson.musicAnalogy)"></p>
      </div>

      <!-- 教学内容段落 -->
      <div
        v-for="(section, index) in lesson.sections"
        :key="index"
        :class="['content-section', `section-${section.type}`]"
      >
        <h4 v-if="section.title" class="section-title" v-html="parseInline(section.title)"></h4>
        <div
          class="section-content"
          v-html="parseContent(section.content)"
        />
      </div>

      <!-- 推荐聆听 -->
      <div v-if="lesson.listenTo" class="listen-box">
        <span class="listen-icon">🎧</span>
        <div>
          <p class="listen-label">推荐聆听</p>
          <p class="listen-text" v-html="parseInline(lesson.listenTo)"></p>
        </div>
      </div>
    </div>

    <!-- 术语 Tooltip -->
    <Transition name="tooltip-fade">
      <div
        v-if="tooltipVisible"
        class="term-tooltip"
        :style="tooltipStyle"
      >
        <div class="tooltip-term">🎼 {{ tooltipContent.term }}</div>
        <p class="tooltip-explanation">{{ tooltipContent.explanation }}</p>
        <p v-if="tooltipContent.analogy" class="tooltip-analogy">{{ tooltipContent.analogy }}</p>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.content-panel {
  height: 100%;
  display: flex;
  flex-direction: column;
  background: var(--color-panel);
}

.content-header {
  padding: var(--sp-4) var(--sp-5);
  border-bottom: 1px solid var(--color-border-light);
  flex-shrink: 0;
}

.lesson-number {
  font-size: var(--fs-xs);
  color: var(--color-gold);
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.1em;
}

.lesson-title {
  margin-top: var(--sp-1);
  font-size: var(--fs-xl);
}

.content-body {
  flex: 1;
  overflow-y: auto;
  padding: var(--sp-4) var(--sp-5);
  position: relative;
}

/* ===== 音乐类比 ===== */
.analogy-box {
  display: flex;
  gap: var(--sp-3);
  padding: var(--sp-4);
  background: var(--color-bg-warm);
  border-left: 3px solid var(--color-gold);
  border-radius: 0 var(--radius-sm) var(--radius-sm) 0;
  margin-bottom: var(--sp-6);
}

.analogy-icon {
  font-size: 1.3rem;
  flex-shrink: 0;
}

.analogy-text {
  font-size: var(--fs-sm);
  line-height: 1.7;
  color: var(--color-text-light);
}

/* ===== 教学段落 ===== */
.content-section {
  margin-bottom: var(--sp-5);
}

.section-title {
  font-size: var(--fs-base);
  color: var(--color-accent);
  margin-bottom: var(--sp-2);
  padding-bottom: var(--sp-1);
  border-bottom: 1px solid var(--color-border-light);
}

.section-content {
  font-size: var(--fs-sm);
  line-height: 1.8;
  color: var(--color-text);
}

/* Section 类型样式 */
.section-task {
  padding: var(--sp-4);
  background: #FFF8F0;
  border: 1px solid var(--color-gold-light);
  border-radius: var(--radius-md);
}

.section-hint {
  padding: var(--sp-3) var(--sp-4);
  background: #F5F0FF;
  border-radius: var(--radius-sm);
  font-size: var(--fs-sm);
}

.section-example {
  padding: var(--sp-3);
  background: var(--color-bg-warm);
  border-radius: var(--radius-sm);
}

/* ===== 代码块 ===== */
:deep(.code-block) {
  background: #2D2520;
  color: #E8DCC8;
  padding: var(--sp-3) var(--sp-4);
  border-radius: var(--radius-sm);
  overflow-x: auto;
  font-family: var(--font-code);
  font-size: var(--fs-xs);
  line-height: 1.6;
  margin: var(--sp-2) 0;
}

:deep(.inline-code) {
  background: var(--color-bg-warm);
  padding: 1px 6px;
  border-radius: 3px;
  font-family: var(--font-code);
  font-size: 0.9em;
  color: var(--color-accent);
}

:deep(p) {
  margin-bottom: var(--sp-2);
}

/* ===== 表格 ===== */
:deep(.md-table) {
  width: 100%;
  border-collapse: collapse;
  margin: var(--sp-3) 0;
  font-size: var(--fs-sm);
}

:deep(.md-table th),
:deep(.md-table td) {
  padding: var(--sp-2) var(--sp-3);
  border: 1px solid var(--color-border);
  text-align: left;
  vertical-align: top;
}

:deep(.md-table th) {
  background: var(--color-bg-warm);
  font-weight: 600;
  color: var(--color-accent);
}

:deep(.md-table tbody tr:nth-child(even)) {
  background: #FFFDF9;
}

:deep(.md-table tbody tr:hover) {
  background: #FFF8EC;
}

/* ===== 推荐聆听 ===== */
.listen-box {
  display: flex;
  gap: var(--sp-3);
  padding: var(--sp-4);
  background: #F5F9F0;
  border-radius: var(--radius-md);
  margin-top: var(--sp-6);
}

.listen-icon {
  font-size: 1.3rem;
  flex-shrink: 0;
}

.listen-label {
  font-size: var(--fs-xs);
  font-weight: 600;
  color: var(--color-success);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.listen-text {
  font-size: var(--fs-sm);
  color: var(--color-text-light);
  margin-top: var(--sp-1);
}

/* ===== 术语提示 ===== */
:deep(.term-tip) {
  border-bottom: 1.5px dashed var(--color-gold);
  color: var(--color-accent);
  cursor: help;
  transition: all 0.15s;
  position: relative;
}

:deep(.term-tip:hover) {
  background: rgba(201, 169, 110, 0.12);
  border-bottom-color: var(--color-gold-light);
}

.term-tooltip {
  position: fixed;
  z-index: 300;
  max-width: 260px;
  background: #2D2520;
  color: #E8DCC8;
  border: 1px solid var(--color-gold);
  border-radius: 8px;
  padding: 14px 16px;
  pointer-events: none;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
}

.tooltip-term {
  font-size: var(--fs-xs);
  font-weight: 700;
  color: var(--color-gold);
  margin-bottom: 6px;
  letter-spacing: 0.03em;
}

.tooltip-explanation {
  font-size: 13px;
  line-height: 1.6;
  margin: 0 0 4px 0;
  color: #FFFAF2;
}

.tooltip-analogy {
  font-size: 12px;
  line-height: 1.5;
  margin: 6px 0 0 0;
  color: #C9A96E;
  font-style: italic;
  padding-top: 4px;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
}

.tooltip-fade-enter-active,
.tooltip-fade-leave-active {
  transition: opacity 0.2s ease;
}

.tooltip-fade-enter-from,
.tooltip-fade-leave-to {
  opacity: 0;
}

/* ===== 盒模型演示图 ===== */
:deep(.box-model-demo) {
  margin: 12px 0;
  font-size: 12px;
}

:deep(.box-model-demo .bm-margin) {
  padding: 18px 18px 12px 18px;
  border: 2px dashed #C9A96E;
  background: #FFF3D6;
}

:deep(.box-model-demo .bm-border) {
  padding: 18px 18px 12px 18px;
  border: 2px dashed #8B2E2E;
  background: #FFFAF2;
}

:deep(.box-model-demo .bm-padding) {
  padding: 18px 18px 12px 18px;
  border: 2px dashed #5B8C5A;
  background: #F5FFEE;
}

:deep(.box-model-demo .bm-content) {
  padding: 16px;
  border: 2px dashed #3D2B1F;
  background: #fff;
  text-align: center;
}

:deep(.box-model-demo .bm-label) {
  display: block;
  margin-bottom: 8px;
  font-weight: 600;
  color: #6B5A4E;
  font-size: 12px;
}
</style>

<script setup lang="ts">
import type { Lesson } from '../types'

defineProps<{
  lesson: Lesson
}>()

defineEmits<{
  complete: []
}>()

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

function parseContent(text: string): string {
  const placeholders: string[] = []

  // 0. 提取原始 HTML 块 [[html]]...[[/html]]，替换为占位符
  let html = text.replace(/\[\[html\]\]([\s\S]*?)\[\[\/html\]\]/g, (_, raw) => {
    const idx = placeholders.length
    placeholders.push(raw)
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

  // 3. 对剩余文本转义 HTML
  html = escapeHtml(html)

  // 4. 还原占位符
  html = unescapePlaceholders(html, placeholders)

  // 5. Markdown 样式转换
  html = html
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
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

    <div class="content-body">
      <!-- 音乐类比 -->
      <div class="analogy-box">
        <span class="analogy-icon">🎵</span>
        <p class="analogy-text">{{ lesson.musicAnalogy }}</p>
      </div>

      <!-- 教学内容段落 -->
      <div
        v-for="(section, index) in lesson.sections"
        :key="index"
        :class="['content-section', `section-${section.type}`]"
      >
        <h4 v-if="section.title" class="section-title">{{ section.title }}</h4>
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
          <p class="listen-text">{{ lesson.listenTo }}</p>
        </div>
      </div>
    </div>
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

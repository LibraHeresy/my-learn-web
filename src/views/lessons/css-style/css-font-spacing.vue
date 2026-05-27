<script setup lang="ts">
import type { Lesson } from '../../../types'
import { parseContent, parseInline } from '../../../utils/markdown'

defineProps<{ lessonMeta: Lesson }>()
defineEmits<{ complete: [] }>()

const sections = [
  { type: 'explain', title: "字体系列", content: "`font-family` 决定文字使用什么字体：\n\n```css\nh1 {\n  font-family: \"Noto Serif SC\", serif;\n}\n\np {\n  font-family: \"Noto Sans SC\", sans-serif;\n}\n```\n\n两种主要的字体类型：\n- **衬线体（serif）**：笔划末端有装饰，典雅庄重，适合标题\n- **无衬线体（sans-serif）**：笔划均匀，简洁现代，适合正文\n\n像选乐器一样——你不会用小提琴的音色去吹进行曲。" },
  { type: 'explain', title: "间距控制", content: "三个重要的间距属性：\n\n- `letter-spacing` — 字母/汉字间距，像音符间的疏密\n- `line-height` — 行高，像乐谱中行与行的距离\n- `text-align` — 文字对齐（`left` / `center` / `right`），像乐团的队列\n\n合理的间距让文字\"透气\"，就像休止符让音乐有呼吸的空间。" },
  { type: 'example', title: "📝 看例子", content: "下面这段 CSS 展示了字体和间距的综合运用。切换到 CSS 标签页查看：\n\n```css\n.card {\n  font-family: \"Noto Serif SC\", serif;\n  line-height: 1.8;\n  letter-spacing: 0.05em;\n  text-align: center;\n}\n```\n注意预览区中文字的字体风格、行间距和字间距的变化。" },
  { type: 'task', title: "🎯 动手试试 ✨", content: "切换到 CSS 标签页，试试调整：\n\n1. 把 `.card` 的 `font-family` 改成 `sans-serif`，感受字体变化\n2. 把 `line-height` 从 `1.8` 改成 `1.3` 和 `2.5`，看看行间距的疏密变化\n3. 把 `letter-spacing` 加大到 `0.15em`，感受字间距\n4. 把 `text-align` 改成 `left` 和 `right`，看对齐变化" }
]

const analogy = "字体选择像**不同乐器的音色**——衬线体如小提琴般优雅，无衬线体如长笛般清晰。而 `letter-spacing` 和 `line-height` 则像音符间的**时值与呼吸**，决定了阅读的节奏。"

const listen = "圣桑《动物狂欢节》— 每种乐器代表一种动物，音色各具特色，就像不同字体传达不同的气质。"
</script>

<template>
  <div class="content-panel">
    <div class="content-header">
      <span class="lesson-number">第二章：CSS 样式 · 第 3 课</span>
      <h2 class="lesson-title">字体与间距 — 让文字更优雅</h2>
    </div>

    <div class="content-body">
      <div v-if="analogy" class="analogy-box">
        <span class="analogy-icon">🎵</span>
        <p class="analogy-text" v-html="parseInline(analogy)"></p>
      </div>

      <section
        v-for="(sec, i) in sections" :key="i"
        :class="['content-section', 'section-' + sec.type]"
      >
        <h3 v-if="sec.title" class="section-title" v-html="parseInline(sec.title)"></h3>
        <div class="section-content" v-html="parseContent(sec.content)"></div>
      </section>

      <div v-if="listen" class="listen-box">
        <span class="listen-icon">🎧</span>
        <div>
          <p class="listen-label">推荐聆听</p>
          <p class="listen-text" v-html="parseInline(listen)"></p>
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
</style>

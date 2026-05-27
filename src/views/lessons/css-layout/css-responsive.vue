<script setup lang="ts">
import type { Lesson } from '../../../types'
import { parseContent, parseInline } from '../../../utils/markdown'

defineProps<{ lessonMeta: Lesson }>()
defineEmits<{ complete: [] }>()

const sections = [
  { type: 'explain', title: "什么是响应式设计？", content: "响应式设计让同一个网页在桌面、平板、手机上都有良好的体验。核心工具是 `@media` 查询：\n\n```css\n/* 手机端（默认） */\n.card { width: 100%; }\n\n/* 平板（≥600px） */\n@media (min-width: 600px) {\n  .card { width: 48%; }\n}\n\n/* 桌面（≥900px） */\n@media (min-width: 900px) {\n  .card { width: 30%; }\n}\n```\n\n`@media` 后面跟着一个\"条件\"——当条件满足时，里面的样式才生效。\n\n**移动端优先（推荐）**：先写手机样式作为默认，再用 `min-width` 逐步增强大屏。" },
  { type: 'explain', title: "常见的断点", content: "三个常用的响应式断点：\n\n| 断点 | 设备 | 典型宽度 |\n|------|------|----------|\n| 小屏 | 手机 | < 640px（默认） |\n| 中屏 | 平板 | 640px ~ 1024px |\n| 大屏 | 桌面 | > 1024px |\n\n```css\n/* 默认：手机（单列） */\n.grid { grid-template-columns: 1fr; }\n\n/* 平板：两列 */\n@media (min-width: 640px) {\n  .grid { grid-template-columns: repeat(2, 1fr); }\n}\n\n/* 桌面：三列 */\n@media (min-width: 1024px) {\n  .grid { grid-template-columns: repeat(3, 1fr); }\n}\n```\n\n就像独奏版（手机）、室内乐版（平板）、管弦乐版（桌面）——核心旋律不变，编制递增！" },
  { type: 'example', title: "📝 看例子", content: "下面的代码已经包含了响应式断点。试着**改变浏览器窗口的宽度**，你会看到卡片从 1 列变成 2 列再变成 3 列：\n\n```css\n/* 手机：单列 */\n.grid { grid-template-columns: 1fr; }\n\n/* 平板：两列 */\n@media (min-width: 640px) {\n  .grid { grid-template-columns: repeat(2, 1fr); }\n}\n\n/* 桌面：三列 */\n@media (min-width: 1024px) {\n  .grid { grid-template-columns: repeat(3, 1fr); }\n}\n```\n在这个网站中，把浏览器窗口从左边向右拖拽，看看发生了什么？" },
  { type: 'task', title: "🎯 动手试试 ✨", content: "切换到 CSS 标签页，试试：\n\n1. 调整浏览器窗口宽度，观察卡片列数变化（必须实际拖拽窗口！）\n2. 修改 `640px` 断点为 `500px`，看更早进入两列\n3. 在 `1024px` 断点里给 `.card` 添加 `font-size: 18px`，桌面端文字更大\n4. 挑战：在手机断点（默认）隐藏 `.desktop-only` 元素，在桌面断点显示它\n  提示：`display: none` 隐藏，`@media` 中 `display: block` 显示" }
]

const analogy = "响应式设计就像**为不同规模的乐团改编同一首曲子**——大型交响乐团（桌面端）和钢琴独奏（手机）都能演绎同一首作品，区别只在于呈现方式。用 `@media` 查询就像为每种编制写一份适配的谱子。"

const listen = "拉威尔配器的穆索尔斯基《图画展览会》— 原为钢琴独奏，拉威尔将它改编为管弦乐版本。同一首曲子，两种编制，两种体验，完美诠释响应式设计。"
</script>

<template>
  <div class="content-panel">
    <div class="content-header">
      <span class="lesson-number">第三章：CSS 布局 · 第 5 课</span>
      <h2 class="lesson-title">响应式设计 — 适配不同的屏幕</h2>
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

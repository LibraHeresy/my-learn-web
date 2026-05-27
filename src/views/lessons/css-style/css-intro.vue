<script setup lang="ts">
import type { Lesson } from '../../../types'
import { parseContent, parseInline } from '../../../utils/markdown'

defineProps<{ lessonMeta: Lesson }>()
defineEmits<{ complete: [] }>()

const sections = [
  { type: 'explain', title: "什么是 CSS？", content: "CSS（Cascading Style Sheets，层叠样式表）负责网页的外观。HTML 决定了\"有什么\"，CSS 决定了\"长什么样\"。\n\n一句 CSS 规则由三部分组成：\n\n```css\nh1 {\n  color: #8B2E2E;\n  font-size: 32px;\n}\n```\n\n- `h1` 是**选择器**——选中文档中的 `<h1>` 元素\n- `color` 和 `font-size` 是**属性**——你想改变什么\n- `#8B2E2E` 和 `32px` 是**值**——改成什么" },
  { type: 'explain', title: "颜色值怎么表示？", content: "颜色有多种写法：\n\n- **颜色名**：`red`, `blue`, `gold` 等（简单但有局限性）\n- **十六进制**：`#8B2E2E`（暗红）、`#3D2B1F`（深棕）——最常用\n- **rgb**：`rgb(139, 46, 46)` — 用三个数字表示红绿蓝\n\n就像调色盘一样，你可以调配出任何颜色！" },
  { type: 'example', title: "📝 看例子", content: "下面的代码就是编辑器中你看到的。我们给标题设置了暗红色和 36px 大小，给段落设置了深棕色：\n\n```css\nh1 {\n  color: #8B2E2E;\n  font-size: 36px;\n}\n\np {\n  color: #6B5A4E;\n  font-size: 18px;\n}\n```\n切换到 CSS 标签页可以看到完整样式，预览区能看到效果。" },
  { type: 'task', title: "🎯 动手试试 ✨", content: "切换到 CSS 标签页，尝试以下操作：\n\n1. 把 `h1` 的 `color` 改成你喜欢的颜色（试试 `#C9A96E` 金色，或 `#5B8C5A` 绿色）\n2. 把 `font-size` 调大或调小，看看标题怎么变化\n3. 给 `p` 也换一个不同的颜色\n\n就像调配音色一样，试试不同的颜色组合吧！" }
]

const analogy = "如果说 HTML 是乐谱上的音符，CSS 就是**演奏法记号**。它告诉浏览器：这个音符应该用什么力度（颜色）、多大音量（字号）来演奏。"

const listen = "德彪西《版画集》— 印象派音乐用音符描绘光影色彩，就像 CSS 为网页赋予视觉风格。"
</script>

<template>
  <div class="content-panel">
    <div class="content-header">
      <span class="lesson-number">第二章：CSS 样式 · 第 1 课</span>
      <h2 class="lesson-title">CSS 入门 — 改变文字的颜色和大小</h2>
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

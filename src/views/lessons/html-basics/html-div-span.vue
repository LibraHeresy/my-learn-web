<script setup lang="ts">
import type { Lesson } from '../../../types'
import { parseContent, parseInline } from '../../../utils/markdown'

defineProps<{ lessonMeta: Lesson }>()
defineEmits<{ complete: [] }>()

const sections = [
  { type: 'explain', title: "两种最基本的\"容器\"", content: "`<div>` 和 `<span>` 本身不添加任何样式，它们的作用是**把内容分组**，方便后面用 CSS 美化或用 JS 操控。\n\n- `<div>` — **块级元素**（block），独占一行，像一整个段落\n- `<span>` — **内联元素**（inline），在文字流内部，像句子中的标记\n\n```html\n<div>我是一个块，占满整行。</div>\n<div>我是另一个块，自动换行。</div>\n<p>文字中<span>这个部分</span>被span标记了。</p>\n```" },
  { type: 'explain', title: "什么时候用 div？什么时候用 span？", content: "**用 `<div>` 当你要：**\n- 创建一个卡片、面板、区块\n- 把一组元素包在一起\n- 需要块级布局（独占一行）\n\n**用 `<span>` 当你要：**\n- 高亮句子中的某个词\n- 给行内文字加特殊样式\n- 不改动文字流的情况下标记内容\n\n简单记忆：**div 管\"块\"，span 管\"字\"。**就像管弦乐中——div 是乐器组（弦乐组、管乐组），span 是组内某个乐手。" },
  { type: 'example', title: "📝 看例子", content: "下面的代码用 `<div>` 创建了三张音乐卡片，用 `<span>` 在文字中高亮了作曲家名字：\n\n```html\n<div class=\"card\">\n  <h2><span class=\"name\">巴赫</span></h2>\n  <p>时期：<span class=\"name\">巴洛克</span></p>\n</div>\n```\n注意：每个 `<div>` 独占一行，而 `<span>` 只是在行内标记文字。" },
  { type: 'task', title: "🎯 动手试试 ✨", content: "请在编辑器中：\n\n1. 给第三张卡片也加上 `<span class=\"name\">` 高亮作曲家名字和时期\n2. 试着复制一张卡片（整个 `<div>` 块），看看它是独占一行还是并排\n3. 把某个 `<span>` 改成 `<div>`，观察布局的变化——这就是块级 vs 内联的区别！" }
]

const analogy = "`<div>` 像**小节线**，把内容划分成独立的段落，每个段落独占一行；`<span>` 像**连音线**，在句子内部连接和标记某些词语，不打断句子的流动。"

const listen = "巴赫《勃兰登堡协奏曲》— 不同乐器组（就像 div）各自成段，但独奏乐器在其中穿插对话（就像 span）。"
</script>

<template>
  <div class="content-panel">
    <div class="content-header">
      <span class="lesson-number">第一章：HTML 基础 · 第 6 课</span>
      <h2 class="lesson-title">div 与 span — 块级与内联元素</h2>
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

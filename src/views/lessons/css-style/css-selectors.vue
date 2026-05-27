<script setup lang="ts">
import type { Lesson } from '../../../types'
import { parseContent, parseInline } from '../../../utils/markdown'

defineProps<{ lessonMeta: Lesson }>()
defineEmits<{ complete: [] }>()

const sections = [
  { type: 'explain', title: "基础选择器", content: "选择器告诉 CSS\"对谁生效\"。三种最基础的选择器：\n\n| 选择器 | 写法 | 含义 |\n|--------|------|------|\n| 元素选择器 | `h1` | 选中所有 `<h1>` |\n| 类选择器 | `.card` | 选中所有 `class=\"card\"` 的元素 |\n| ID选择器 | `#title` | 选中 `id=\"title\"` 的元素 |\n\n```css\nh1 { color: #8B2E2E; }        /* 所有 h1 */\n.card { background: #FFFAF2; } /* 所有带 class=\"card\" 的 */\n#title { font-size: 2rem; }    /* 只有 id=\"title\" 那个 */\n```\n\n**类选择器最常用**——一个类可以给多个元素，一个元素也可以有多个类。" },
  { type: 'explain', title: "组合与后代", content: "选择器可以组合使用，精确指定层级关系：\n\n- `.card h2` — **后代选择器**，`.card` 内部的所有 `<h2>`\n- `.card > h2` — **子代选择器**，`.card` 的直接子元素 `<h2>`\n- `h2, h3` — **分组选择器**，同时选中 `<h2>` 和 `<h3>`\n- `.card.featured` — **交集选择器**，同时有 `class=\"card featured\"` 的元素\n\n```css\n.card h2 { color: #8B2E2E; }       /* card 内的所有 h2 */\n.card.featured { border-color: gold; } /* 只有 featured 的那张卡片 */\n```\n\n就像指挥可以指向\"弦乐组中的第一小提琴\"或\"整个管乐声部\"。" },
  { type: 'explain', title: "伪类选择器 — 状态触发的魔法", content: "伪类以 `:` 开头，根据元素的**状态**来应用样式：\n\n- `:hover` — 鼠标悬停时\n- `:first-child` — 是父元素的第一个子元素\n- `:last-child` — 是父元素的最后一个子元素\n- `:nth-child(n)` — 是父元素的第 n 个子元素\n\n```css\n.card:hover { transform: translateY(-2px); }\n.card:first-child { border-color: #8B2E2E; }\n.card:nth-child(2) { border-color: #C9A96E; }\n```\n\n`:hover` 是交互感的来源——鼠标移到卡片上，卡片微微上浮，就像指挥的棒尖点到了你！" },
  { type: 'example', title: "📝 看例子", content: "下面的代码有三张卡片，用不同的选择器为它们设置了左侧的强调色：\n\n```css\n/* 所有卡片共享的样式 */\n.card {\n  background-color: #FFFAF2;\n  border: 1px solid #D4C5A9;\n  border-radius: 8px;\n  padding: 16px;\n  margin-bottom: 12px;\n  transition: all 0.3s ease;\n}\n\n/* :hover 交互反馈 */\n.card:hover {\n  border-color: #C9A96E;\n  transform: translateY(-2px);\n}\n\n/* :nth-child 给每张卡片不同的强调色 */\n.card:nth-child(1) { border-left: 4px solid #8B2E2E; }\n.card:nth-child(2) { border-left: 4px solid #C9A96E; }\n.card:nth-child(3) { border-left: 4px solid #5B8C5A; }\n```\n试试把鼠标移到卡片上，看它们微微上浮的效果！" },
  { type: 'task', title: "🎯 动手试试 ✨", content: "切换到 CSS 标签页，尝试：\n\n1. 把 `.card:nth-child(1)` 的左边框颜色换一个\n2. 给 `.card:hover` 增加 `box-shadow` 属性，让悬浮效果更明显\n3. 试试 `.card:last-child` 选择器，给最后一张卡片特殊的样式\n4. 挑战：添加一张新卡片（第4张），用 `.card:nth-child(4)` 给它设置不同的颜色" }
]

const analogy = "选择器就像**指挥的手势**——指向特定的乐器组（元素），告诉它们该怎么演奏。`.class` 像指挥说\"弦乐组\"，`#id` 像说\"首席小提琴手\"，`:hover` 像说\"当我指向你的时候...\""

const listen = "布里顿《青少年管弦乐队指南》— 每一段变奏中，指挥逐一指向不同的乐器组，就像选择器精确选中页面中的元素。"
</script>

<template>
  <div class="content-panel">
    <div class="content-header">
      <span class="lesson-number">第二章：CSS 样式 · 第 5 课</span>
      <h2 class="lesson-title">CSS 选择器 — 精确指向你的元素</h2>
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

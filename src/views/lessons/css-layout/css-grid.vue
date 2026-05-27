<script setup lang="ts">
import type { Lesson } from '../../../types'
import { parseContent, parseInline } from '../../../utils/markdown'

defineProps<{ lessonMeta: Lesson }>()
defineEmits<{ complete: [] }>()

const sections = [
  { type: 'explain', title: "创建网格", content: "用 `display: grid` 创建网格容器，`grid-template-columns` 定义列：\n\n```css\n.container {\n  display: grid;\n  grid-template-columns: 1fr 1fr 1fr;\n  gap: 16px;\n}\n```\n\n- `1fr` — \"一份\"（fraction），自动分配剩余空间\n- `1fr 1fr 1fr` — 三等分（三列宽度相等）\n- `repeat(3, 1fr)` — 等价写法\n- `gap` — 格子之间的间距\n\n三列等宽就像三行声部并行推进——每个格子就是一个小节！" },
  { type: 'explain', title: "行与列的精确控制", content: "`grid-template-rows` 定义行高：\n\n```css\n.container {\n  grid-template-columns: repeat(3, 1fr);\n  grid-template-rows: auto 200px;\n}\n```\n\n子元素可以跨越多列或多行：\n\n```css\n.card:first-child {\n  grid-column: span 2;  /* 跨 2 列 */\n}\n\n.card:last-child {\n  grid-column: 1 / 3;   /* 从第1条线到第3条线（也是跨2列） */\n}\n```\n\n就像总谱中某个声部的长音符跨越了好几个小节！" },
  { type: 'explain', title: "Flexbox vs Grid 怎么选？", content: "- **Flexbox**：一维排列（要么横向，要么纵向）\n  - 适合：导航栏、卡片列表、居中对齐\n- **Grid**：二维排列（同时控制行和列）\n  - 适合：页面整体布局、照片墙、表格类布局\n\n一个简单的判断：\n- 只需要\"排一排\" → Flexbox\n- 需要\"行和列都对齐\" → Grid\n\n就像弦乐四重奏用 Flexbox（4 个人排一排），而管弦乐团总谱用 Grid（声部+小节，二维矩阵）！" },
  { type: 'example', title: "📝 看例子", content: "下面的代码用 Grid 创建了 2×3 的作曲家卡片网格，最后一张跨 2 列：\n\n```css\n.grid {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  gap: 12px;\n}\n\n.card:last-child {\n  grid-column: span 2;\n}\n```\n切换到预览区观察网格布局——每张卡片在二维网格中都有精确位置。" },
  { type: 'task', title: "🎯 动手试试 ✨", content: "切换到 CSS 标签页，试试：\n\n1. 把 `grid-template-columns` 从 `repeat(3, 1fr)` 改成 `repeat(2, 1fr)`，观察变成 2 列\n2. 把 `gap` 从 `12px` 改成 `24px`，看卡片间距变大\n3. 修改 `.card:last-child` 的 `grid-column` 改成 `span 3`（2列时跨3无效）\n4. 挑战：用 `grid-template-columns: 1fr 2fr` 创建左窄右宽的两列布局" }
]

const analogy = "Grid 就像**总谱的声部排列**——行是声部（第一小提琴、第二小提琴、中提琴、大提琴），列是小节。每个音符都有精确的\"行/列\"坐标，Grid 让你同时控制横向和纵向布局。"

const listen = "巴赫《赋格的艺术》— 多声部精密对位，每一个音符在纵横两个维度上都有精确位置，就像 Grid 的二维网格系统。"
</script>

<template>
  <div class="content-panel">
    <div class="content-header">
      <span class="lesson-number">第三章：CSS 布局 · 第 4 课</span>
      <h2 class="lesson-title">Grid 布局 — 二维排布你的元素</h2>
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

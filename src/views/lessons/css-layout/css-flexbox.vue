<script setup lang="ts">
import type { Lesson } from '../../../types'
import { parseContent, parseInline } from '../../../utils/markdown'

defineProps<{ lessonMeta: Lesson }>()
defineEmits<{ complete: [] }>()

const sections = [
  { type: 'explain', title: "什么是 Flexbox？", content: "Flexbox（弹性盒子）让元素排列变得简单。只需在**父元素**上设置 `display: flex`，子元素就会自动排列：\n\n```css\n.container {\n  display: flex;\n}\n```\n\n默认情况下，子元素会**横向排列**（就像乐团的乐器按行排开）。" },
  { type: 'explain', title: "主轴方向", content: "`flex-direction` 决定排列方向：\n\n- `row`（默认）— 横向排列，从左到右，像乐团的一排\n- `column` — 纵向排列，从上到下，像总谱的各声部\n\n乐团排练时指挥说\"弦乐坐左边，管乐坐右边\"——在 CSS 中，`flex-direction` 就是你的指挥棒！" },
  { type: 'explain', title: "间距分配", content: "`justify-content` 控制主轴上的对齐方式：\n\n- `flex-start` — 靠左/靠上\n- `center` — 居中\n- `space-between` — 两端对齐，中间均匀分布\n- `space-around` — 每个元素周围有相同间距\n\n就像合唱团在舞台上排开——可以挤在中间，也可以均匀分布。" },
  { type: 'example', title: "📝 看例子", content: "下面的代码用 Flexbox 把三张作曲家卡片横向排列。注意 `.container` 上的 `display: flex`：\n\n```css\n.container {\n  display: flex;\n  gap: 20px;\n  justify-content: center;\n}\n\n.card {\n  flex: 1;\n}\n```\n`gap` 是卡片之间的间距，`flex: 1` 让每张卡片平均分配宽度。" },
  { type: 'task', title: "🎯 动手试试 ✨", content: "切换到 CSS 标签页，尝试以下调整：\n\n1. 把 `.container` 的 `flex-direction` 改成 `column`，看卡片变成纵向排列\n2. 把 `justify-content` 改成 `space-between` 或 `space-around`\n3. 调整 `gap` 的值，看看卡片间距的变化\n4. 试试去掉某张卡片的 `flex: 1`，看看宽度怎么分配" }
]

const analogy = "Flexbox 是 CSS 中的布局利器，就像**指挥安排乐队座位**——可以横向排（木管在前，铜管在后），也可以纵向排（第一小提琴在左，第二小提琴在右）。"

const listen = "布里顿《青少年管弦乐队指南》— 一段音乐展示了不同乐器组在舞台上的位置，完美诠释了\"布局\"的概念。"
</script>

<template>
  <div class="content-panel">
    <div class="content-header">
      <span class="lesson-number">第三章：CSS 布局 · 第 1 课</span>
      <h2 class="lesson-title">Flexbox 入门 — 灵活排列你的内容</h2>
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

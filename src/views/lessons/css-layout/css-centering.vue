<script setup lang="ts">
import type { Lesson } from '../../../types'
import { parseContent, parseInline } from '../../../utils/markdown'

defineProps<{ lessonMeta: Lesson }>()
defineEmits<{ complete: [] }>()

const sections = [
  { type: 'explain', title: "水平居中与垂直居中", content: "在网页布局中，居中对齐是最常用的技巧之一：\n\n**水平居中（文字）：**\n```css\ntext-align: center;\n```\n\n**水平居中（块级元素）：**\n```css\nmargin: 0 auto;\n```\n\n**Flexbox 一键居中（最强方法）：**\n```css\n.container {\n  display: flex;\n  justify-content: center;  /* 水平居中 */\n  align-items: center;      /* 垂直居中 */\n}\n```" },
  { type: 'explain', title: "align-items 交叉轴对齐", content: "`align-items` 控制**交叉轴**（垂直于主轴的方向）上的对齐：\n\n- `stretch`（默认）— 拉伸填满\n- `center` — 交叉轴居中\n- `flex-start` — 交叉轴起点\n- `flex-end` — 交叉轴终点\n\n在横向排列（row）时，交叉轴就是垂直方向。用 `align-items: center` 可以让所有卡片在垂直方向居中对齐，即使它们高度不同。" },
  { type: 'example', title: "📝 看例子", content: "下面的代码创建了一个居中的\"演奏邀请卡\"。`.wrapper` 使用 Flexbox 将卡片在页面中水平和垂直居中，`.card` 内的文字也居中对齐：\n\n```css\n.wrapper {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  min-height: 200px;\n}\n\n.card {\n  text-align: center;\n}\n```" },
  { type: 'task', title: "🎯 动手试试 ✨", content: "切换到 CSS 标签页，试着调整对齐方式：\n\n1. 把 `.wrapper` 的 `justify-content` 改成 `flex-start`，看卡片移到左边\n2. 把 `align-items` 改成 `flex-start`，卡片移到顶部\n3. 试试在 `.card` 中添加 `width: 300px`，然后用 `margin: 0 auto` 居中\n4. 把 `.card` 的 `text-align` 改成 `left`，看看文字左对齐的效果" }
]

const analogy = "页面居中对齐就像**指挥站在舞台中央**——视觉焦点集中、平衡和谐。而对齐方式的选择，就像决定乐团的排列：对称式、扇形、还是弧形分布。"

const listen = "莫扎特《G大调弦乐小夜曲》K.525 — 完美的对称结构和平衡感，每一个乐句都恰到好处，就像精心的页面布局。"
</script>

<template>
  <div class="content-panel">
    <div class="content-header">
      <span class="lesson-number">第三章：CSS 布局 · 第 2 课</span>
      <h2 class="lesson-title">居中与对齐 — 让页面更专业</h2>
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

<script setup lang="ts">
import type { Lesson } from '../../../types'
import { parseContent, parseInline } from '../../../utils/markdown'

defineProps<{ lessonMeta: Lesson }>()
defineEmits<{ complete: [] }>()

const sections = [
  { type: 'explain', title: "背景颜色", content: "用 `background-color` 属性可以给元素添加背景色：\n\n```css\ndiv {\n  background-color: #FFFAF2;\n}\n```\n\n就像给乐谱选一张暖色调的纸，背景色能改变整个页面的氛围。" },
  { type: 'explain', title: "边框与圆角", content: "`border` 给元素加上边框，`border-radius` 让边角变圆滑：\n\n```css\ndiv {\n  border: 2px solid #D4C5A9;\n  border-radius: 12px;\n}\n```\n\n- `2px` — 边框粗细\n- `solid` — 实线（还有 `dashed` 虚线、`dotted` 点线）\n- `#D4C5A9` — 边框颜色\n- `border-radius: 12px` — 圆角半径，值越大越圆\n\n圆角让卡片更柔和，就像乐谱中圆润的连音线。" },
  { type: 'example', title: "📝 看例子", content: "下面的代码创建了一张\"作曲家卡片\"，有暖色背景、细边框和圆角：\n\n```css\n.card {\n  background-color: #FFFAF2;\n  border: 2px solid #D4C5A9;\n  border-radius: 12px;\n  padding: 20px;\n}\n\n.card h2 {\n  color: #8B2E2E;\n}\n```\n切换到 CSS 标签页查看完整代码。" },
  { type: 'task', title: "🎯 动手试试 ✨", content: "切换到 CSS 标签页，试着：\n\n1. 把 `.card` 的 `background-color` 换一个颜色（试试 `#F0F8FF` 浅蓝，或 `#FFF8F0` 暖橙）\n2. 把 `border` 的粗细从 `2px` 改成 `4px`，看看边框变粗的效果\n3. 把 `border-radius` 改成 `24px`，让卡片更圆润\n4. 试试把 `solid` 改成 `dashed`，看虚线边框的效果" }
]

const analogy = "背景颜色像**舞台的幕布**，边框像**画框**，它们为内容营造氛围和层次感——就像不同颜色的幕布会影响观众对乐曲的第一印象。"

const listen = "柴可夫斯基《胡桃夹子》— 糖果仙子的宫殿有华丽的金色装饰，想象一下用 CSS 来描绘它。"
</script>

<template>
  <div class="content-panel">
    <div class="content-header">
      <span class="lesson-number">第二章：CSS 样式 · 第 2 课</span>
      <h2 class="lesson-title">背景与边框 — 为卡片增添层次</h2>
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

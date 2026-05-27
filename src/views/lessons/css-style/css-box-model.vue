<script setup lang="ts">
import type { Lesson } from '../../../types'
import { parseContent, parseInline } from '../../../utils/markdown'

defineProps<{ lessonMeta: Lesson }>()
defineEmits<{ complete: [] }>()

const sections = [
  { type: 'explain', title: "盒模型的四层结构", content: "从内到外，每个元素有四层空间：\n\n[[html]]\n<div class=\"box-model-demo\">\n  <div class=\"bm-margin\"><span class=\"bm-label\">margin 外边距</span>\n    <div class=\"bm-border\"><span class=\"bm-label\">border 边框</span>\n      <div class=\"bm-padding\"><span class=\"bm-label\">padding 内边距</span>\n        <div class=\"bm-content\">content（内容）</div>\n      </div>\n    </div>\n  </div>\n</div>\n[[/html]]\n\n最外层 `margin`（外边距），往里一层 `border`（边框），再往里 `padding`（内边距），最里面是 `content`（内容）。理解这个层次关系就掌握了 CSS 布局的基础！" },
  { type: 'explain', title: "padding 和 margin 的区别", content: "- `padding`（内边距）：内容与边框之间的距离，在边框**里面**\n- `margin`（外边距）：边框与相邻元素之间的距离，在边框**外面**\n\n一个常用的记忆方式：\n- padding 有背景色（在盒子里）\n- margin 透明（盒子之外）\n\n就像舞台上的地毯（padding）和舞台之间的过道（margin）！" },
  { type: 'example', title: "📝 看例子", content: "下面的代码展示了盒模型的实际应用。两张卡片，每张都有自己的padding和margin：\n\n```css\n.card {\n  background-color: #FFFAF2;\n  border: 2px solid #D4C5A9;\n  border-radius: 8px;\n  padding: 24px;       /* 内容到边框的距离 */\n  margin-bottom: 20px;  /* 卡片之间的间隔 */\n}\n```" },
  { type: 'task', title: "🎯 动手试试 ✨", content: "切换到 CSS 标签页，调整这些值看效果：\n\n1. 把 `.card` 的 `padding` 从 `24px` 改成 `8px`，感受内容变得拥挤\n2. 把 `padding` 改成 `48px`，感受宽松的空间\n3. 把 `margin-bottom` 从 `20px` 改成 `60px`，卡片之间距离变大\n4. 试试给 `h2` 加一个 `margin-top: 0` 消除顶部多余间距" }
]

const analogy = "每个 HTML 元素都是一个\"盒子\"，就像**音乐厅的声学布局**：\n\n- `content`（内容）— 演奏区，音乐家所在的地方\n- `padding`（内边距）— 舞台到墙壁的距离\n- `border`（边框）— 音乐厅的墙壁\n- `margin`（外边距）— 音乐厅之间的间隔"

const listen = "马勒《第八交响曲》\"千人交响曲\"— 感受庞大的空间感和层次感，就像盒模型的层层嵌套。"
</script>

<template>
  <div class="content-panel">
    <div class="content-header">
      <span class="lesson-number">第二章：CSS 样式 · 第 4 课</span>
      <h2 class="lesson-title">盒模型 — 理解元素的空间</h2>
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

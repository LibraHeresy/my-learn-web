<script setup lang="ts">
import type { Lesson } from '../../../types'
import { parseContent, parseInline } from '../../../utils/markdown'

defineProps<{ lessonMeta: Lesson }>()
defineEmits<{ complete: [] }>()

const sections = [
  { type: 'explain', title: "什么是 Slot？", content: "之前你学的 props 让组件接收**数据**。Slot 让组件接收**模板内容**。\n\n```vue\n<!-- Card.vue — 定义组件，留出 Slot -->\n<template>\n  <div class=\"card\">\n    <div class=\"card-header\">\n      <slot name=\"header\">默认标题</slot>\n    </div>\n    <div class=\"card-body\">\n      <slot>默认内容</slot>  <!-- 默认 Slot -->\n    </div>\n    <div class=\"card-footer\">\n      <slot name=\"footer\">\n        <button>确定</button>  <!-- 默认 footer -->\n      </slot>\n    </div>\n  </div>\n</template>\n```\n\n```vue\n<!-- App.vue — 使用组件，填入内容 -->\n<template>\n  <Card>\n    <template #header>\n      <h2>🎵 月光奏鸣曲</h2>\n    </template>\n\n    <p>作曲：贝多芬</p>\n    <p>时期：古典主义</p>\n\n    <template #footer>\n      <button @click=\"like\">❤️ 收藏</button>\n    </template>\n  </Card>\n</template>\n```" },
  { type: 'example', title: "📝 Slot vs Props：选择指南", content: "| 场景 | 用什么 |\n|------|--------|\n| 传递文本/数字 | props |\n| 传递 HTML 结构 | slot |\n| 传递回调函数 | emits |\n| 组件布局框架 | slot |\n| 简单配置项 | props |\n\n**口诀：** Props 传数据，Slots 传结构，Emits 传事件。\n\n就像乐谱上的标记：\n- Props = 音符（数据）\n- Slots = 华彩乐段（留给演奏者填充的内容）\n- Emits = 力度记号（告诉指挥这里要怎么处理）" },
  { type: 'task', title: "🎯 动手试试 ✨", content: "在你的 `music-collection` 项目中：\n\n1. 把曲目卡片提取成 `MusicCard.vue` 组件\n2. 用**默认 slot** 让使用者传入卡片内容\n3. 用**具名 slot**（#header, #footer）分别定义卡片的顶部和底部\n4. 在 App.vue 中使用时，不同的卡片可以有不同的 header 样式\n\n这样你的组件既保持了结构一致性，又有了内容的灵活性。" }
]

const analogy = "协奏曲中有华彩乐段（Cadenza）——作曲家留出空白，由独奏者自由发挥。**Slot（插槽）** 就是组件的\"华彩乐段\"：组件定义框架，使用者在 Slot 中填入自定义内容。这让组件既统一又灵活。"

const listen = "莫扎特《第21钢琴协奏曲》第二乐章 — 协奏曲的形式本身就诠释了 Slot 的思想：管弦乐队提供结构（组件框架），钢琴在 Slot 中填入独奏内容。两者完美融合。"
</script>

<template>
  <div class="content-panel">
    <div class="content-header">
      <span class="lesson-number">第八章：Vue 实战 · 第 9 课</span>
      <h2 class="lesson-title">插槽（Slots）— 组件的"自由声部"</h2>
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

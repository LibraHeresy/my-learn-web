<script setup lang="ts">
import type { Lesson } from '../../../types'
import { parseContent, parseInline } from '../../../utils/markdown'

defineProps<{ lessonMeta: Lesson }>()
defineEmits<{ complete: [] }>()

const sections = [
  { type: 'explain', title: "Props — 父组件给子组件传数据", content: "**子组件 `MusicCard.vue`：**\n```vue\n<script setup>\n// 声明\"我需要这些数据\"\nconst props = defineProps({\n  name: String,\n  composer: String,\n  period: String,\n  liked: Boolean\n})\n<\/script>\n\n<template>\n  <div class=\"card\">\n    <h3>{{ name }}</h3>\n    <p>{{ composer }} · {{ period }}</p>\n    <span>{{ liked ? '❤' : '🤍' }}</span>\n  </div>\n</template>\n```\n\n**父组件 `App.vue`：**\n```vue\n<script setup>\nimport { ref } from 'vue'\nimport MusicCard from './components/MusicCard.vue'\n\nconst pieces = ref([...])\n<\/script>\n\n<template>\n  <MusicCard\n    v-for=\"p in pieces\"\n    :key=\"p.id\"\n    :name=\"p.name\"\n    :composer=\"p.composer\"\n    :period=\"p.period\"\n    :liked=\"p.liked\"\n  />\n</template>\n```\n\n`:name=\"p.name\"` 中的冒号 `:` 是 `v-bind:` 的简写——表示传的是 JS 变量而不是字符串。" },
  { type: 'explain', title: "Emits — 子组件通知父组件", content: "子组件不能直接修改父组件的数据——它只能\"通知\"父组件：\n\n**子组件 `MusicCard.vue`：**\n```vue\n<script setup>\nconst props = defineProps([\"name\", \"composer\", \"liked\"])\n\n// 声明\"我会发出这些事件\"\nconst emit = defineEmits([\"toggle-like\", \"delete\"])\n<\/script>\n\n<template>\n  <div class=\"card\">\n    <h3>{{ name }}</h3>\n    <button @click=\"emit('toggle-like')\">\n      {{ liked ? '❤' : '🤍' }}\n    </button>\n    <button @click=\"emit('delete')\">✕</button>\n  </div>\n</template>\n```\n\n**父组件 `App.vue`：**\n```vue\n<template>\n  <MusicCard\n    v-for=\"p in pieces\"\n    :key=\"p.id\"\n    :name=\"p.name\"\n    :liked=\"p.liked\"\n    @toggle-like=\"p.liked = !p.liked\"\n    @delete=\"pieces = pieces.filter(item => item.id !== p.id)\"\n  />\n</template>\n```\n\n**数据流总结：**\n```\n父组件（拥有数据）\n  │\n  │ Props ↓（传数据）\n  │\n子组件（接收数据，展示）\n  │\n  │ Emits ↑（发事件通知）\n  │\n父组件（收到通知，修改自己的数据）\n```\n这就是\"数据向下，事件向上\"——Vue 的核心设计模式。" },
  { type: 'task', title: "🎯 你的任务 ✨", content: "在你的 `music-collection` 项目中：\n\n1. 创建 `MusicCard.vue` 组件，接收 `name`、`composer`、`period`、`liked` 四个 props\n\n2. 组件中显示卡片布局（曲名、作曲家、时期标签、收藏按钮）\n\n3. 添加 `toggle-like` 和 `delete` 两个 emit\n\n4. 在 `App.vue` 中 import 并使用这个组件\n\n5. 用 `v-for` 循环渲染多张卡片\n\n> 💡 这个过程很像你在合奏篇做的组件拆分——但现在是在真正的 `.vue` 文件中，用标准的 props/emits 语法。" },
  { type: 'hint', title: "💡 TypeScript 风格的 Props 定义", content: "`defineProps` 有两种写法：\n\n**数组写法（简单）：**\n```js\ndefineProps([\"name\", \"composer\"])\n```\n\n**对象写法（带类型，推荐）：**\n```js\ndefineProps({\n  name: String,\n  count: Number,\n  liked: Boolean\n})\n```\n\n对象写法让使用你组件的人一眼就知道需要传什么数据。" }
]

const analogy = "在乐团中，**指挥把总谱发给各声部**（Props，父→子），而**各声部首席向指挥反馈准备就绪**（Emits，子→父）。数据总是向下流动，事件总是向上传递——这个\"单向数据流\"原则让复杂的应用变得可预测。"

const listen = "贝多芬《第三交响曲\"英雄\"》第一乐章 — 主题（props 数据）在不同乐器组之间传递、变形，每个乐器组（子组件）拿到主题后用自己的方式诠释，但主题本身始终由指挥（父组件）掌控。"
</script>

<template>
  <div class="content-panel">
    <div class="content-header">
      <span class="lesson-number">第八章：Vue 实战 · 第 5 课</span>
      <h2 class="lesson-title">组件通信 — Props 向下，Emits 向上</h2>
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

<script setup lang="ts">
import type { Lesson } from '../../../types'
import { parseContent, parseInline } from '../../../utils/markdown'

defineProps<{ lessonMeta: Lesson }>()
defineEmits<{ complete: [] }>()

const sections = [
  { type: 'explain', title: "什么是事件？", content: "在 JavaScript 中，**事件**是发生在 HTML 元素上的\"事情\"：\n\n- `click` — 用户点击了一个元素\n- `input` — 用户在输入框中输入了文字\n- `mouseenter` — 鼠标移入了一个元素\n\n用 `addEventListener` 可以\"监听\"这些事件：\n\n```js\nlet btn = document.querySelector(\"#myBtn\");\n\nbtn.addEventListener(\"click\", function() {\n  alert(\"你点击了按钮！\");\n});\n```\n\n就像给按钮装了一只耳朵，它时刻听着有没有\"点击\"这件事发生。" },
  { type: 'explain', title: "事件处理函数", content: "`addEventListener` 接收两个参数：\n1. 事件类型（`\"click\"`）\n2. 事件处理函数——事件发生时执行的代码\n\n```js\nbtn.addEventListener(\"click\", function() {\n  // 点击后执行的代码写在这里\n  document.querySelector(\"h1\").textContent = \"标题变了！\";\n});\n```\n\n事件处理函数就像一个\"回响\"——你按下琴键（触发事件），琴声响起（执行函数）。" },
  { type: 'example', title: "📝 看例子", content: "下面的代码有一个按钮和一个显示区域。每次点击按钮，计数器就会加 1：\n\n```js\nlet count = 0;\nlet btn = document.querySelector(\"#countBtn\");\nlet display = document.querySelector(\"#display\");\n\nbtn.addEventListener(\"click\", function() {\n  count = count + 1;\n  display.textContent = `你点击了 ${count} 次`;\n});\n```\n切换到 JS 标签页和预览区，试试点击按钮！" },
  { type: 'task', title: "🎯 动手试试 ✨", content: "切换到 JS 标签页，试试：\n\n1. 在预览区点击按钮，看计数器变化\n2. 修改 `display.textContent` 的文字，换一种表达方式\n3. 试着把 `count = count + 1` 改成 `count = count + 5`，每次加 5\n4. 挑战：在 HTML 面板中复制一个按钮（`#resetBtn`），在 JS 中给它加一个点击事件，点击后把 `count` 归零" }
]

const analogy = "事件就像**乐器对演奏者的响应**——按下琴键（点击），琴槌敲击琴弦发出声音（执行代码）。没有演奏者的动作，乐器不会自己发出声音；没有事件，代码不会自动执行。"

const listen = "普罗科菲耶夫《彼得与狼》— 每个角色有特定主题，在故事的不同时间点\"出场\"（触发），就像页面中不同元素在不同事件触发时才响应。"
</script>

<template>
  <div class="content-panel">
    <div class="content-header">
      <span class="lesson-number">第四章：JavaScript 入门 · 第 5 课</span>
      <h2 class="lesson-title">点击事件 — 让按钮响应用户</h2>
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

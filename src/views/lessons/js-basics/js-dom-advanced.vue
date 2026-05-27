<script setup lang="ts">
import type { Lesson } from '../../../types'
import { parseContent, parseInline } from '../../../utils/markdown'

defineProps<{ lessonMeta: Lesson }>()
defineEmits<{ complete: [] }>()

const sections = [
  { type: 'explain', title: "动态创建元素", content: "`document.createElement()` 可以凭空创建一个新元素：\n\n```js\n// 创建元素\nlet card = document.createElement(\"div\");\ncard.className = \"card\";         // 设类名\ncard.innerHTML = \"<h2>新卡片</h2>\";  // 设内容\n\n// 追加到页面\ndocument.querySelector(\"#list\").appendChild(card);\n```\n\n就像在曲谱的空白处临时加了一行乐句——全新的元素出现在页面上。" },
  { type: 'explain', title: "删除与替换", content: "`.remove()` 直接删除元素：\n\n```js\nlet card = document.querySelector(\"#card3\");\ncard.remove();  // 没了！\n```\n\n配合 `createElement` 实现增删：\n```js\nfunction addCard(title) {\n  let card = document.createElement(\"div\");\n  card.className = \"card\";\n  card.textContent = title;\n  document.querySelector(\"#list\").appendChild(card);\n}\n\nfunction removeLast() {\n  let cards = document.querySelectorAll(\".card\");\n  let last = cards[cards.length - 1];\n  if (last) last.remove();\n}\n```\n\n增删改查——完整的数据操作闭环！" },
  { type: 'example', title: "📝 看例子", content: "下面的代码有一个输入框和\"添加\"\"删除最后\"两个按钮，可以动态维护一张练琴计划列表：\n\n```js\nfunction addItem() {\n  let item = document.createElement(\"div\");\n  item.className = \"plan-item\";\n  item.textContent = input.value;\n  list.appendChild(item);\n  input.value = \"\";\n}\n\nfunction removeLast() {\n  let items = document.querySelectorAll(\".plan-item\");\n  let last = items[items.length - 1];\n  if (last) last.remove();\n}\n```\n切换到预览区，输入内容点添加，再点删除试试——页面元素在动态变化！" },
  { type: 'task', title: "🎯 动手试试 ✨", content: "切换到 JS 标签页和预览区，试试：\n\n1. 在输入框输入内容，点\"添加\"，看列表增长\n2. 连续点\"删除最后\"，看列表缩短\n3. 修改 `addItem` 函数，让每个项带上序号\n4. 挑战：给每个项加一个删除按钮（在 `createElement` 时内置一个独立删除功能）" }
]

const analogy = "DOM 操作进阶就像**即兴演奏**——不是在谱子写好的框架内规规矩矩地弹，而是在演奏过程中根据灵感动态创造新的乐句（元素），或者删除某个声部。`createElement` 是创作新乐句，`remove()` 是撤掉一个声部。"

const listen = "爵士即兴 — 爵士乐手在和声进行中实时创造旋律，有时加一段 solo（createElement），有时一个声部退出（remove），结构在即兴中动态变化。"
</script>

<template>
  <div class="content-panel">
    <div class="content-header">
      <span class="lesson-number">第四章：JavaScript 入门 · 第 13 课</span>
      <h2 class="lesson-title">DOM 操作进阶 — 动态创建与删除元素</h2>
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

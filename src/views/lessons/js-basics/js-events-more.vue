<script setup lang="ts">
import type { Lesson } from '../../../types'
import { parseContent, parseInline } from '../../../utils/markdown'

defineProps<{ lessonMeta: Lesson }>()
defineEmits<{ complete: [] }>()

const sections = [
  { type: 'explain', title: "不只是 click — 认识更多事件类型", content: "`addEventListener` 的第一个参数是事件**类型**，除了 `\"click\"`，还有很多常用事件：\n\n- `\"input\"` — 输入框内容**每次变化**都触发\n- `\"change\"` — 输入框内容改变且**失去焦点**时触发\n- `\"keydown\"` — 键盘**按下**任意键\n- `\"mouseenter\"` — 鼠标**进入**元素\n- `\"mouseleave\"` — 鼠标**离开**元素\n- `\"submit\"` — 表单**提交**时触发\n\n```js\ninputEl.addEventListener(\"input\", function() {\n  // 用户每输入一个字就执行\n});\n```" },
  { type: 'explain', title: "event 对象 — 事件携带的\"信息卡\"", content: "每个事件触发时，浏览器都会创建一个 **event 对象**，包含了事件的详细信息。在回调函数中通过参数接收：\n\n```js\nbtn.addEventListener(\"click\", function(event) {\n  console.log(event.target);  // 被点击的元素\n  console.log(event.type);    // \"click\"\n});\n\ninputEl.addEventListener(\"input\", function(event) {\n  console.log(event.target.value); // 输入框当前内容\n});\n\ndocument.addEventListener(\"keydown\", function(event) {\n  console.log(event.key); // 按下的键名，如 \"Enter\"、\"a\"\n});\n```\n\n`event.target` 是触发事件的元素——就像知道是哪个乐器在发声。" },
  { type: 'explain', title: "preventDefault — 阻止默认行为", content: "有些元素有自己的默认行为：\n\n- 表单的 `<button type=\"submit\">` 点击后会**刷新页面**\n- `<a>` 链接点击后会**跳转**\n\n用 `event.preventDefault()` 阻止这些默认行为：\n\n```js\nform.addEventListener(\"submit\", function(event) {\n  event.preventDefault();  // 阻止页面刷新！\n  console.log(\"表单已提交（但页面不刷新）\");\n});\n```\n\n这在前端开发中非常常用——表单提交通常用 JS 处理，不需要刷新页面。" },
  { type: 'example', title: "📝 看例子", content: "下面的代码综合使用多种事件：\n\n```js\n// 实时显示输入内容\ninputEl.addEventListener(\"input\", function(event) {\n  displayEl.textContent = event.target.value;\n});\n\n// 鼠标悬停高亮\ncard.addEventListener(\"mouseenter\", function() {\n  card.style.borderColor = \"#C9A96E\";\n});\ncard.addEventListener(\"mouseleave\", function() {\n  card.style.borderColor = \"#D4C5A9\";\n});\n\n// 回车键提交\ndocument.addEventListener(\"keydown\", function(event) {\n  if (event.key === \"Enter\") {\n    console.log(\"你按了回车！\");\n  }\n});\n```" },
  { type: 'task', title: "🎯 动手试试 ✨", content: "切换到 JS 标签页，试试：\n\n1. 在输入框中打字，观察下方实时显示\n2. 把鼠标移到卡片上再移开，看边框颜色变化\n3. 按回车键，看提示信息\n4. 挑战：给输入框增加 `keydown` 事件，当按 Escape 键时清空输入框内容" }
]

const analogy = "乐器不只有\"敲击\"一个动作——钢琴有按键(click)、弦乐有揉弦(input)、管乐有换气(change)、定音鼓有滚奏(keydown)。`addEventListener` 可以监听用户的各种动作，就像指挥同时关注每个声部的进入。"

const listen = "拉威尔《波莱罗》— 同一旋律在不同乐器间传递（不同事件），小鼓从头到尾持续敲击（持续输入），长笛、单簧管、双簧管依次登场（依次触发），最终整个乐队一起爆发。"
</script>

<template>
  <div class="content-panel">
    <div class="content-header">
      <span class="lesson-number">第四章：JavaScript 入门 · 第 6 课</span>
      <h2 class="lesson-title">更多事件 — 倾听用户的每一种动作</h2>
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

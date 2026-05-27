<script setup lang="ts">
import type { Lesson } from '../../../types'
import { parseContent, parseInline } from '../../../utils/markdown'

defineProps<{ lessonMeta: Lesson }>()
defineEmits<{ complete: [] }>()

const sections = [
  { type: 'explain', title: "问题：动态创建的元素没有事件", content: "上一节课你学会了用 `createElement` 动态创建元素。但这里有一个棘手的问题：\n\n```js\n// 页面初始有 3 张卡片，每张绑定了点击事件\nlet cards = document.querySelectorAll(\".card\");\ncards.forEach(function(card) {\n  card.addEventListener(\"click\", function() {\n    alert(\"点击了卡片！\");\n  });\n});\n\n// 后来动态添加了一张新卡片\nlet newCard = document.createElement(\"div\");\nnewCard.classList.add(\"card\");\nlistEl.appendChild(newCard);\n// ❌ 新卡片没有点击事件！因为 addEventListener 运行时它还不存在\n```\n\n这是一个很常见的 bug：**动态添加的元素不会自动继承之前绑定的事件**。" },
  { type: 'explain', title: "解决方案：把事件绑在父容器上", content: "不分别给每张卡片绑事件，而是**给包含所有卡片的父容器绑一个事件**。当子元素被点击时，事件会\"冒泡\"到父容器：\n\n```js\n// 给父容器绑定事件（只绑定一次！）\nlistEl.addEventListener(\"click\", function(event) {\n  // event.target 是实际被点击的元素\n  // closest(\".card\") 向上查找最近的 .card 容器\n  let card = event.target.closest(\".card\");\n  if (card) {\n    // 找到了！说明点击的是某张卡片\n    card.classList.toggle(\"highlight\");\n  }\n});\n\n// 之后动态添加的卡片也会自动响应，因为事件绑在父容器上！\n```\n\n这就是**事件委托**——把事件交给父容器代理，不管子元素是初始就有还是后来加的，都能响应。" },
  { type: 'explain', title: "关键 API：closest() 和 matches()", content: "**`event.target`** — 实际被点击的元素（可能是卡片里的 h3、span、甚至卡片本身）\n\n**`.closest(\"选择器\")`** — 从当前元素向上查找最近的匹配祖先\n```js\nevent.target.closest(\".card\");  // 总能找到卡片容器，不管点的是里面的 h3 还是 span\n```\n\n**`.matches(\"选择器\")`** — 判断当前元素是否匹配选择器\n```js\nif (event.target.matches(\"button\")) {\n  // 点击的是按钮\n}\n```\n\n**常见模式：用 data 属性区分不同元素**\n```html\n<button data-action=\"delete\">删除</button>\n<button data-action=\"like\">收藏</button>\n```\n```js\nlet action = event.target.dataset.action;  // \"delete\" 或 \"like\"\n```" },
  { type: 'task', title: "🎯 动手试试 ✨", content: "编辑器里有一个收藏列表，每张卡片有\"❤ 收藏\"按钮。目前用 `forEach` 逐个绑定事件——新添加的卡片没有事件。\n\n**你的任务：**\n\n1. 把逐个绑定事件改为事件委托——把 click 事件绑在 `#cardList` 上\n2. 用 `event.target.closest(\".like-btn\")` 判断点击的是收藏按钮\n3. 确认动态添加的卡片也能正常收藏\n4. （挑战）给每张卡片加一个\"删除\"按钮，同样用事件委托处理" }
]

const analogy = "指挥不需要跑到每一位演奏者面前单独说\"到你吹了\"——演奏者自己看总谱、听音乐，知道什么时候进入。**事件委托**就是这个道理：你不用给每一个元素单独绑定事件，而是把事件绑在父容器上，由父容器来判断\"触发者是谁\"，做出相应的反应。"

const listen = "斯特拉文斯基《春之祭》— 庞大的乐队编制中，指挥通过一个手势就能让不同乐器组做出反应。事件委托就像指挥的总览——一个事件绑定覆盖所有动态变化的\"乐手\"。"
</script>

<template>
  <div class="content-panel">
    <div class="content-header">
      <span class="lesson-number">第五章：JavaScript 进阶 · 第 9 课</span>
      <h2 class="lesson-title">事件委托 — 让"指挥"替你监听每一个"乐手"</h2>
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

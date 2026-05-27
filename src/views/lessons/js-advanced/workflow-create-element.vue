<script setup lang="ts">
import type { Lesson } from '../../../types'
import { parseContent, parseInline } from '../../../utils/markdown'

defineProps<{ lessonMeta: Lesson }>()
defineEmits<{ complete: [] }>()

const sections = [
  { type: 'explain', title: "innerHTML vs createElement", content: "到目前为止你都是用 `innerHTML` 来渲染内容：\n\n```js\nlistEl.innerHTML = \"<div class=\\\"card\\\"><h3>\" + name + \"</h3></div>\";\n```\n\n这种方式像\"复印乐谱\"——一次性替换全部内容。问题是什么？\n\n1. **会覆盖已有的内容** —— 你无法只\"添加一张卡片\"，必须重新生成全部卡片\n2. **已绑定的事件会丢失** —— 替换 innerHTML 后，原来的按钮点击事件没了\n3. **字符串拼接容易出错** —— 引号嵌套很痛苦\n\n`createElement` 更精细：\n\n```js\nlet card = document.createElement(\"div\");  // 创建一个 <div>\ncard.classList.add(\"card\");                 // 加 class=\"card\"\nlet title = document.createElement(\"h3\");\ncard.appendChild(title);                    // 把 h3 放入 div\nlistEl.appendChild(card);                   // 把卡片放入页面\n```\n\n每个元素都是独立的对象，你可以随时修改、删除、移动它们——就像活页乐谱，可以随时插入一页。" },
  { type: 'explain', title: "createElement 五步法", content: "创建一个元素的标准流程：\n\n**1. 创建元素：** `document.createElement(\"标签名\")`\n```js\nlet card = document.createElement(\"div\");\n```\n\n**2. 设置内容：** `.textContent` 或 `.classList.add()`\n```js\ncard.textContent = \"肖邦夜曲\";\ncard.classList.add(\"card\");\n```\n\n**3. 找到容器：** `document.querySelector(\"...\")`\n```js\nlet list = document.querySelector(\"#cardList\");\n```\n\n**4. 挂载到页面：** `.appendChild(元素)`\n```js\nlist.appendChild(card);  // 卡片出现在页面上了！\n```\n\n**5. 可以继续操作它：** 因为它是一个变量，随时可以修改\n```js\ncard.style.background = \"#FFFAF2\";  // 改变背景\ncard.addEventListener(\"click\", function() { ... });  // 加事件\n```\n\n对比一下：innerHTML 生成的内容是\"死\"的字符串，createElement 生成的是\"活\"的对象。" },
  { type: 'task', title: "🎯 动手试试 ✨", content: "编辑器里有一个简单的收藏列表。目前它用 innerHTML 渲染卡片。\n\n**你的任务：改写渲染逻辑**\n\n1. 在 JS 中找到使用 `innerHTML` 的地方\n2. 把它改成用 `createElement` + `appendChild` 逐个创建卡片\n3. 每张卡片应该包含：一个 `<div>` 容器、一个 `<h3>` 标题、一个 `<span>` 标签\n4. 确认功能不变——列表应该正常显示\n\n提示：先用循环创建所有卡片，再一次性 appendChild 到容器中。" }
]

const analogy = "用 `innerHTML` 像\"复印一整页乐谱\"——一次性把全部内容塞进页面，方便但不够精细。`createElement` + `appendChild` 则像\"一个音符一个音符地写\"——更慢但更精准，你可以单独修改任何一个音符，给它加表情、转调、甚至随时拿掉。"

const listen = "巴赫《音乐的奉献》— 这首作品中的每一行都是独立的声部线条，精确编织在一起。createElement 就像在五线谱上逐个添加音符——每个音符都可以独立地定位、装饰、甚至移除。"
</script>

<template>
  <div class="content-panel">
    <div class="content-header">
      <span class="lesson-number">第五章：JavaScript 进阶 · 第 8 课</span>
      <h2 class="lesson-title">DOM 动态创建 — 用 JS "凭空造出"页面元素</h2>
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

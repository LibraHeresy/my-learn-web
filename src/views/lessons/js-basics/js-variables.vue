<script setup lang="ts">
import type { Lesson } from '../../../types'
import { parseContent, parseInline } from '../../../utils/markdown'

defineProps<{ lessonMeta: Lesson }>()
defineEmits<{ complete: [] }>()

const sections = [
  { type: 'explain', title: "什么是变量？", content: "变量是一个**有名字的容器**，用来存储数据。你可以把任何东西放进去，然后用名字来取用：\n\n```js\nlet composer = \"肖邦\";\nlet piece = \"夜曲\";\nlet year = 1830;\n```\n\n- `let` — 声明一个变量（可以修改）\n- `const` — 声明一个常量（不能修改）\n- `composer` / `piece` — 变量名（你自己起的名字）\n- `\"肖邦\"` — 字符串（文本），用引号包裹\n- `1830` — 数字，不需要引号" },
  { type: 'explain', title: "拼接字符串", content: "用 `+` 号可以把字符串和变量拼接在一起：\n\n```js\nlet composer = \"肖邦\";\nlet sentence = \"我最喜欢的作曲家是\" + composer;\n```\n\n更好的写法是**模板字符串**，用反引号 `` ` `` 包裹，`${}` 插入变量：\n\n```js\nlet sentence = `我最喜欢的作曲家是${composer}`;\n```\n\n就像把两个乐句连接成一个完整的乐段！" },
  { type: 'explain', title: "document.querySelector — 找到页面中的元素", content: "`document.querySelector()` 可以找到页面上的 HTML 元素，然后通过 `.textContent` 修改它的文字内容：\n\n```js\nlet el = document.querySelector(\"h1\");\nel.textContent = \"新的标题\";\n```\n\n就像指挥家用手势指定\"现在看这里\"，`querySelector` 帮你指向页面中的元素。" },
  { type: 'example', title: "📝 看例子", content: "下面的代码用变量存储了作曲家信息，然后用 `querySelector` 把它们显示在页面上：\n\n```js\nlet composer = \"弗雷德里克·肖邦\";\nlet piece = \"降E大调夜曲 Op.9 No.2\";\nlet description = `${composer}的代表作之一是《${piece}》。`;\n\ndocument.querySelector(\"#composer\").textContent = composer;\ndocument.querySelector(\"#piece\").textContent = piece;\ndocument.querySelector(\"#description\").textContent = description;\n```\n切换到 JS 标签页查看完整代码。运行后，JavaScript 会自动把信息填入页面。" },
  { type: 'task', title: "🎯 动手试试 ✨", content: "切换到 JS 标签页，试着修改：\n\n1. 把 `composer` 和 `piece` 改成你喜欢的作曲家和曲目\n2. 修改 `description` 的模板字符串，写一句你自己的话\n3. 试试把 `let` 改成 `const`，效果一样吗？\n4. 试着新增一个变量 `year`，存创作年份" }
]

const analogy = "变量就像**反复记号**——把一段内容存起来，想用的时候随时调用。变量名就像乐谱上的段落标记（A段、B段），方便你指代和引用。"

const listen = "拉威尔《波莱罗》— 同一个旋律重复 18 遍，但每次配器都在变化。变量存着不变的旋律，但你可以用不同的方式使用它。"
</script>

<template>
  <div class="content-panel">
    <div class="content-header">
      <span class="lesson-number">第四章：JavaScript 入门 · 第 2 课</span>
      <h2 class="lesson-title">变量与字符串 — 存储你的音乐信息</h2>
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

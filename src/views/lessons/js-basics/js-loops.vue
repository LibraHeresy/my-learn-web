<script setup lang="ts">
import type { Lesson } from '../../../types'
import { parseContent, parseInline } from '../../../utils/markdown'

defineProps<{ lessonMeta: Lesson }>()
defineEmits<{ complete: [] }>()

const sections = [
  { type: 'explain', title: "for 循环", content: "`for` 循环由三部分组成：初始化、条件、步进：\n\n```js\nfor (let i = 0; i < composers.length; i++) {\n  console.log(composers[i]);\n}\n```\n\n- `let i = 0` — 从 0 开始\n- `i < composers.length` — 只要 i 小于数组长度就继续\n- `i++` — 每轮 i 加 1\n\n`i` 是计数器，第一轮是 0，第二轮是 1... 依次取遍数组中的每一项，就像**节拍器从第 1 拍数到最后 1 拍**。" },
  { type: 'explain', title: "forEach — 更优雅的循环", content: "`forEach` 是专门为数组设计的循环方法：\n\n```js\ncomposers.forEach(function(name, index) {\n  console.log(`${index + 1}. ${name}`);\n});\n```\n\n- `name` — 当前项的值\n- `index` — 当前项的索引（0 开始）\n\n```js\n// 用 forEach 批量生成 HTML\nlet html = \"\";\ncomposers.forEach(function(composer) {\n  html += `<li>${composer}</li>`;\n});\ndocument.querySelector(\"ul\").innerHTML = html;\n```\n\n`forEach` 比 `for` 更简洁——你不用手动写 `i` 和 `i++`。" },
  { type: 'example', title: "📝 看例子", content: "下面的代码用 `forEach` 遍历作曲家数组，把每一项渲染成 HTML 卡片：\n\n```js\nlet composers = [\"巴赫\", \"莫扎特\", \"贝多芬\", \"肖邦\"];\nlet html = \"\";\n\ncomposers.forEach(function(name, index) {\n  html += `\n    <div class=\"card\">\n      <span class=\"num\">${index + 1}</span>\n      ${name}\n    </div>\n  `;\n});\n\ndocument.querySelector(\"#list\").innerHTML = html;\n```\n切换到 JS 标签页查看完整代码。4 张卡片由一个循环生成——如果加到 10 个也不用手动复制。" },
  { type: 'task', title: "🎯 动手试试 ✨", content: "切换到 JS 标签页，试试：\n\n1. 在数组中再添加一个作曲家，看循环自动生成新卡片\n2. 把 `forEach` 改成 `for` 循环，实现同样的效果\n3. 修改卡片模板，增加曲目信息（把数组改成二维数组）\n4. 挑战：用 `.filter()` 只显示名字长度 > 2 的项" }
]

const analogy = "循环就像**固定音型（ostinato）**——一段模式反复执行，每次略有不同。也像**节拍器**，一拍一拍反复，直到乐曲结束。用 `for` 或 `forEach` 遍历数组中的每一项，对每一首都执行相同的操作。"

const listen = "拉威尔《波莱罗》— 同一个旋律反复 18 遍，每次配器都在变化（加一件新乐器），就像循环每次迭代对当前元素做不同处理。"
</script>

<template>
  <div class="content-panel">
    <div class="content-header">
      <span class="lesson-number">第四章：JavaScript 入门 · 第 9 课</span>
      <h2 class="lesson-title">循环 — 让代码反复执行的节拍器</h2>
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

<script setup lang="ts">
import type { Lesson } from '../../../types'
import { parseContent, parseInline } from '../../../utils/markdown'

defineProps<{ lessonMeta: Lesson }>()
defineEmits<{ complete: [] }>()

const sections = [
  { type: 'explain', title: ".map() — 把每个元素\"转换\"成新值", content: "`.map()` 遍历数组中的每一项，执行一个函数，**返回一个新数组**：\n\n```js\nlet names = [\"bach\", \"mozart\", \"beethoven\"];\n\nlet upper = names.map(function(name) {\n  return name.toUpperCase();\n});\n// upper 是 [\"BACH\", \"MOZART\", \"BEETHOVEN\"]\n// names 没变！\n```\n\n就像把 C 大调移调到 D 大调——原曲还在，只是多了一个新版本。" },
  { type: 'explain', title: ".filter() — 筛选符合条件的元素", content: "`.filter()` 遍历数组，**只保留**让条件函数返回 `true` 的项：\n\n```js\nlet years = [1685, 1756, 1770, 1810, 1862];\n\nlet after1800 = years.filter(function(year) {\n  return year > 1800;\n});\n// after1800 是 [1810, 1862]\n```\n\n就像在管弦乐团中只挑出木管声部——其他声部还在，但你只需要木管。" },
  { type: 'explain', title: "链式调用 — map 和 filter 组合", content: "`.map()` 和 `.filter()` 都返回数组，所以可以**链式调用**：\n\n```js\nlet composers = [\n  { name: \"巴赫\", year: 1720 },\n  { name: \"莫扎特\", year: 1785 },\n  { name: \"贝多芬\", year: 1805 },\n  { name: \"肖邦\", year: 1835 }\n];\n\n// 先筛选 1800 年后的，再只取名字\nlet names = composers\n  .filter(function(c) { return c.year > 1800; })\n  .map(function(c) { return c.name; });\n// names 是 [\"贝多芬\", \"肖邦\"]\n```\n\n就像先筛选出 19 世纪的作品，再把它们的标题提取出来——流水线操作！" },
  { type: 'example', title: "📝 看例子", content: "下面的代码用 `.filter()` 筛选出含有\"A\"的作曲家名字，再用 `.map()` 转为大写：\n\n```js\nlet composers = [\"Bach\", \"Mozart\", \"Beethoven\", \"Chopin\", \"Debussy\", \"Vivaldi\"];\n\n// 筛选名字里含 \"a\"（不区分大小写）的\nlet filtered = composers.filter(function(name) {\n  return name.toLowerCase().includes(\"a\");\n});\n\n// 转为大写\nlet result = filtered.map(function(name) {\n  return name.toUpperCase();\n});\n\ndocument.querySelector(\"#output\").innerHTML =\n  result.join(\" | \");\n```" },
  { type: 'task', title: "🎯 动手试试 ✨", content: "切换到 JS 标签页，试试：\n\n1. 修改筛选条件——只显示名字长度 ≥ 6 的作曲家\n2. 用 `.map()` 给每个名字加上\"作曲家：\"前缀\n3. 用 `链式调用` 一步完成筛选+转换（不用中间变量 filtered）\n4. 挑战：在输入框输入字母，只显示名字包含该字母的作曲家（实时筛选）" }
]

const analogy = "`.map()` 就像**移调**——把整首曲子每个音都升高一度，返回一个新的版本；`.filter()` 就像从总谱中**挑出所有弦乐声部**——只保留符合条件的部分。两者都不破坏原谱（原数组），而是生成一份新的。"

const listen = "巴赫《勃兰登堡协奏曲》No.3 — 各声部轮流演奏同一主题（map），然后只留下弦乐组对话（filter），现代 Web 开发中用 map/filter 处理数据就像听巴赫一样行云流水。"
</script>

<template>
  <div class="content-panel">
    <div class="content-header">
      <span class="lesson-number">第四章：JavaScript 入门 · 第 10 课</span>
      <h2 class="lesson-title">数组方法进阶 — 像筛选乐谱一样处理数据</h2>
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

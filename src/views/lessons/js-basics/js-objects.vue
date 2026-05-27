<script setup lang="ts">
import type { Lesson } from '../../../types'
import { parseContent, parseInline } from '../../../utils/markdown'

defineProps<{ lessonMeta: Lesson }>()
defineEmits<{ complete: [] }>()

const sections = [
  { type: 'explain', title: "创建和访问对象", content: "对象用 `{}` 创建，包含多组键值对：\n\n```js\nlet composer = {\n  name: \"肖邦\",\n  period: \"浪漫主义\",\n  country: \"波兰\",\n  birthYear: 1810\n};\n```\n\n访问属性有两种方式：\n```js\ncomposer.name       // \"肖邦\"（点号）\ncomposer[\"period\"]  // \"浪漫主义\"（方括号）\n```\n\n修改或新增：\n```js\ncomposer.famousPiece = \"夜曲\";  // 新增\ncomposer.birthYear = 1809;      // 修正（肖邦实际生于 1810）\n```" },
  { type: 'explain', title: "对象数组 — 真正的数据结构", content: "对象最强大的用法是和数组结合——**对象数组**：\n\n```js\nlet composers = [\n  { name: \"巴赫\", period: \"巴洛克\", country: \"德国\" },\n  { name: \"莫扎特\", period: \"古典主义\", country: \"奥地利\" },\n  { name: \"肖邦\", period: \"浪漫主义\", country: \"波兰\" }\n];\n\n// 用 forEach 遍历\ncomposers.forEach(function(c) {\n  console.log(`${c.name} — ${c.period}`);\n});\n```\n\n这才是实际开发中最常见的数据形式——数组里包着对象，每个对象代表一条记录。就像 Excel 表格：每一行是数组的一项，每一列是对象的属性！" },
  { type: 'example', title: "📝 看例子", content: "下面的代码用对象数组存储了作曲家信息，用 `forEach` 遍历并生成卡片：\n\n```js\nlet composers = [\n  { name: \"巴赫\", period: \"巴洛克\", piece: \"赋格的艺术\" },\n  { name: \"莫扎特\", period: \"古典主义\", piece: \"魔笛\" },\n  { name: \"肖邦\", period: \"浪漫主义\", piece: \"夜曲\" }\n];\n\nlet html = \"\";\ncomposers.forEach(function(c) {\n  html += `\n    <div class=\"card\">\n      <h2>${c.name}</h2>\n      <p>时期：${c.period}</p>\n      <p>代表作：《${c.piece}》</p>\n    </div>\n  `;\n});\n```\n切换到 JS 标签页查看完整代码——对象数据的结构和用途一目了然。" },
  { type: 'task', title: "🎯 动手试试 ✨", content: "切换到 JS 标签页，试试：\n\n1. 在对象数组中新增一个作曲家对象\n2. 给每个对象增加 `country` 属性，在卡片模板中显示\n3. 修改某个作曲家的 `period`，看页面自动更新\n4. 挑战：用 `if` 判断，只显示 `period === \"浪漫主义\"` 的作品家（配合 `.filter()` 或条件判断）" }
]

const analogy = "对象就像**音乐家档案**——用键值对（key-value）组织信息：姓名、时期、代表作、国籍。不像数组用数字索引，对象用**有名字的键**来存取数据，就像档案上的标签：\"姓名____、时期____\"。"

const listen = "拉威尔《波莱罗》— 配器总谱上标注了每一件乐器的详细信息（乐器名、调性、进入小节），就像对象中结构化的键值对数据。"
</script>

<template>
  <div class="content-panel">
    <div class="content-header">
      <span class="lesson-number">第四章：JavaScript 入门 · 第 12 课</span>
      <h2 class="lesson-title">对象 — 结构化你的音乐数据</h2>
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

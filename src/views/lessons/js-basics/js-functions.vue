<script setup lang="ts">
import type { Lesson } from '../../../types'
import { parseContent, parseInline } from '../../../utils/markdown'

defineProps<{ lessonMeta: Lesson }>()
defineEmits<{ complete: [] }>()

const sections = [
  { type: 'explain', title: "什么是函数？", content: "函数是一段**有名字的代码块**，把一组操作封装起来，需要时调用：\n\n```js\nfunction sayHello() {\n  alert(\"你好！\");\n}\n\nsayHello();  // 调用函数\n```\n\n函数的好处：\n- **避免重复**：同样的代码不用写很多遍\n- **给代码起名字**：一看函数名就知道它做什么\n- **可以传参数**：像给动机配不同的乐器" },
  { type: 'explain', title: "带参数的函数", content: "函数可以接收**参数**（输入），然后根据参数做不同的事：\n\n```js\nfunction introduce(composer, piece) {\n  return `${composer}创作了《${piece}》。`;\n}\n\nlet result1 = introduce(\"肖邦\", \"夜曲\");\nlet result2 = introduce(\"莫扎特\", \"魔笛\");\n```\n\n- `composer` 和 `piece` 是**参数**——像函数接收的输入\n- `return` 把结果**返回**——像函数给出的输出\n- 同样一个 `introduce` 函数，传入不同的作曲家，得到不同的句子" },
  { type: 'example', title: "📝 看例子", content: "下面的代码定义了一个 `createCard` 函数，它接收作曲家信息并返回 HTML 字符串：\n\n```js\nfunction createCard(composer, period, piece) {\n  return `\n    <div class=\"card\">\n      <h2>${composer}</h2>\n      <p>时期：${period}</p>\n      <p>代表作：《${piece}》</p>\n    </div>\n  `;\n}\n\nlet html = createCard(\"巴赫\", \"巴洛克\", \"赋格的艺术\");\nlet html2 = createCard(\"德彪西\", \"印象派\", \"月光\");\n```\n切换到 JS 标签页看看函数怎么生成页面的三张卡片。" },
  { type: 'task', title: "🎯 动手试试 ✨", content: "切换到 JS 标签页，试试：\n\n1. 修改已存在的 `createCard()` 调用，把作曲家换成你喜欢的\n2. 新增一行调用，用 `createCard()` 创建第四张卡片，然后用 `+=` 追加到 `html` 中\n3. 试着在函数里增加一个参数，比如 `country`（国籍）" }
]

const analogy = "函数就像**乐曲的主题动机**——一段可重复使用的旋律片段。贝多芬第五交响曲的\"当当当当\"动机在全曲中反复出现、变形、发展。函数也是：写好一次，到处调用。"

const listen = "贝多芬《第五交响曲》第一乐章 — \"命运\"四音动机贯穿始终，同样的核心在弦乐、管乐、全奏中不断重现，就像函数被不同参数调用。"
</script>

<template>
  <div class="content-panel">
    <div class="content-header">
      <span class="lesson-number">第四章：JavaScript 入门 · 第 4 课</span>
      <h2 class="lesson-title">函数 — 封装你的音乐逻辑</h2>
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

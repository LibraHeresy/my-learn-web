<script setup lang="ts">
import type { Lesson } from '../../../types'
import { parseContent, parseInline } from '../../../utils/markdown'

defineProps<{ lessonMeta: Lesson }>()
defineEmits<{ complete: [] }>()

const sections = [
  { type: 'explain', title: "为什么需要新语法？", content: "在 JS 基础篇中，你学会了用 `var` 声明变量、用 `function` 定义函数。但 JavaScript 一直在进化——2015 年发布的 ES6 是一次\"革命性升级\"。\n\nES6 引入了：\n- `let` 和 `const`：替代 `var`，更安全\n- 箭头函数：更简洁的函数写法\n- 解构赋值：优雅地从对象/数组中取值\n- 模板字符串：用反引号（[[html]]<code class=\"inline-code\">`</code>[[/html]]）拼接字符串\n- 展开运算符：`...` 展开数组和对象\n\n这些新语法让代码**更短、更清晰、更不容易出错**。" },
  { type: 'example', title: "📝 解构赋值 — 从\"抽屉\"里取东西", content: "想象你有一个乐谱夹，里面有多首曲子。以前你要一首一首拿：\n\n```js\n// 旧写法\nconst piece1 = pieces[0]\nconst piece2 = pieces[1]\nconst piece3 = pieces[2]\n```\n\n解构赋值让你一次取出：\n\n```js\n// 数组解构\nconst [piece1, piece2, piece3] = pieces\n\n// 对象解构\nconst { name, composer, period } = piece\n```\n\n就像从谱架上一次取下三本乐谱——整齐又高效。" },
  { type: 'example', title: "📝 箭头函数 — 精简的\"旋律线\"", content: "箭头函数是 `function` 的简写版：\n\n```js\n// 旧写法\nconst double = function(x) {\n  return x * 2\n}\n\n// 箭头函数\nconst double = x => x * 2\n\n// 多行逻辑用花括号\nconst greet = name => {\n  const message = '你好，' + name\n  return message\n}\n```\n\n箭头函数就像用连音线简化了分散的音符——同样的旋律，更干净的记谱。" },
  { type: 'example', title: "📝 展开运算符 — 拆包与合并", content: "`...` 像一只手，可以把数组/对象\"展开\"：\n\n```js\n// 合并数组\nconst classical = ['巴赫', '莫扎特']\nconst romantic = ['肖邦', '李斯特']\nconst all = [...classical, ...romantic]\n// ['巴赫', '莫扎特', '肖邦', '李斯特']\n\n// 复制对象并修改\nconst piece = { name: '月光', composer: '贝多芬' }\nconst updated = { ...piece, period: '古典主义' }\n```\n\n就像把两个乐团的乐手合并成一个更大的乐团——不改变原来的，创造一个新的。" },
  { type: 'task', title: "🎯 动手试试 ✨", content: "请在右侧编辑器中完成以下练习：\n\n1. 用**解构赋值**从 `instrument` 对象中取出 `name`、`family`、`range`\n2. 用**箭头函数**重写 `describe` 函数（用模板字符串返回描述）\n3. 用**展开运算符**给 `instrument` 添加一个 `players` 属性\n\n点击运行，看看你的输出是否和预期一致。" },
  { type: 'hint', title: "💡 小提示", content: "- 对象解构：`const { name, family } = instrument`\n- 箭头函数：`const fn = (param) => { return ... }`\n- 展开对象：`const newObj = { ...oldObj, newKey: value }`\n- 模板字符串用反引号包裹：[[html]]<code class=\"inline-code\">`乐器：${name}`</code>[[/html]]" }
]

const analogy = "就像现代音乐加入了电声乐器让表现力更丰富，ES6（ECMAScript 2015）为 JavaScript 带来了更简洁、更强大的语法。用这些新\"乐器\"，你可以用更少的音符写出更丰富的旋律。"

const listen = "德彪西《意象集》— 印象派用新的和声语言打破了传统规则，正如 ES6 用新语法改变了 JavaScript 的写法。"
</script>

<template>
  <div class="content-panel">
    <div class="content-header">
      <span class="lesson-number">第五章：JavaScript 进阶 · 第 11 课</span>
      <h2 class="lesson-title">ES6 新语法 — 让代码更优雅的"新乐器"</h2>
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

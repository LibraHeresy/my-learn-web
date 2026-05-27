<script setup lang="ts">
import type { Lesson } from '../../../types'
import { parseContent, parseInline } from '../../../utils/markdown'

defineProps<{ lessonMeta: Lesson }>()
defineEmits<{ complete: [] }>()

const sections = [
  { type: 'explain', title: "console.log 是什么？", content: "`console.log()` 是 JavaScript 中最常用的调试工具。它能在控制台中打印出任何你想看的值：\n\n```js\nlet composer = \"肖邦\";\nconsole.log(composer);  // 控制台输出：肖邦\n\nlet count = 5;\nconsole.log(\"当前数量：\", count);  // 可以同时打印文字和变量\n\nlet list = [\"巴赫\", \"莫扎特\", \"贝多芬\"];\nconsole.log(\"列表内容：\", list);  // 数组也可以打印\n```\n\n**用法：** 在你怀疑有问题的地方，插入 `console.log(变量名)`，然后打开控制台（F12）查看输出。" },
  { type: 'explain', title: "用 console.log 追踪代码流程", content: "最常见的调试模式是**在函数开头和关键位置加 console.log**，追踪代码执行到了哪里：\n\n```js\nfunction playMusic(piece) {\n  console.log(\"=== playMusic 被调用了 ===\");\n  console.log(\"传入的参数 piece：\", piece);\n\n  if (piece === \"夜曲\") {\n    console.log(\"进入夜曲分支\");\n    // ... 处理夜曲\n  } else {\n    console.log(\"进入其他曲目分支\");\n    // ... 处理其他\n  }\n\n  console.log(\"=== playMusic 执行完毕 ===\");\n}\n```\n\n这就像在排练中逐段录音回放——你清楚地知道代码走到了哪里、每个变量是什么值。当你觉得\"为什么结果不对\"时，先 `console.log` 看看到底发生了什么。" },
  { type: 'example', title: "📝 看例子", content: "编辑器里有一个简单的\"音乐计数器\"页面。它看起来可以工作，但有一个逻辑问题——仔细看 JS 代码，你能发现吗？\n\n**你的任务不是修 bug，而是加 console.log 来\"监听\"这个 bug。** 在按钮点击事件中插入 console.log，打印当前数值，这样你就能在控制台看到程序的实际行为。\n\n这种\"先观察、再修复\"的方法，就是工程师的日常。" },
  { type: 'task', title: "🎯 动手试试 ✨", content: "编辑器里有一个\"点击计数\"页面，点击按钮会增加计数。但它有一个逻辑 bug。\n\n**第一步：** 先不要修改逻辑。在 `addOne()` 函数中添加 `console.log`，打印每次点击后的 count 值\n\n**第二步：** 打开控制台，点击几次按钮，观察控制台输出\n\n**第三步：** 你能发现 count 的值出了什么问题吗？\n\n**第四步：** 理解问题后，修复这个 bug\n\n提示：当控制台输出和你预期不一致时，说明你的理解有偏差——这正是 `console.log` 最有用的时刻！" }
]

const analogy = "排练时，指挥会让某个声部单独演奏，以便听清楚每个音符。`console.log()` 就是你的\"排练监听\"——它让你在任何时刻、查看任何变量的值。当你不确定代码在做什么时，用 `console.log()` 看个究竟。"

const listen = "贝多芬《第七交响曲》第二乐章 — 著名的\"小快板\"，从一个低沉的重复音型开始，逐层叠加声部。每次新乐器加入都清晰可辨——就像 console.log 把每个变量的值一层层打印出来。"
</script>

<template>
  <div class="content-panel">
    <div class="content-header">
      <span class="lesson-number">第五章：JavaScript 进阶 · 第 4 课</span>
      <h2 class="lesson-title">console.log — 你的"排练监听器"</h2>
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

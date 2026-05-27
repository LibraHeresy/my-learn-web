<script setup lang="ts">
import type { Lesson } from '../../../types'
import { parseContent, parseInline } from '../../../utils/markdown'

defineProps<{ lessonMeta: Lesson }>()
defineEmits<{ complete: [] }>()

const sections = [
  { type: 'explain', title: "console.log 不够用了吗？", content: "你一直在用 console.log 来调试代码——这在简单场景下确实管用。但当你遇到复杂问题时：\n\n- 变量在 5 个地方被修改，不知道是谁改错了\n- 循环 100 次，不知道第 47 次为什么出问题\n- 异步代码的执行顺序让人困惑\n- 想看某个时刻**所有**变量的值，而不是只 log 一个\n\n这时候你需要断点（breakpoint）——在代码的某一行设置一个暂停标记，程序运行到这里就会停下来，你可以慢慢检查一切。\n\n**打开 DevTools Sources 面板：**\n1. 按 F12 打开开发者工具\n2. 切换到 Sources（源代码）面板\n3. 左侧找到你的 JS 文件\n4. 点击行号设置断点（出现蓝色箭头标记）\n5. 刷新页面或触发事件——程序在断点处暂停！" },
  { type: 'explain', title: "断点操作 — 你的指挥手势", content: "程序暂停后，你可以使用以下控制按钮（像指挥的不同手势）：\n\n| 按钮 | 快捷键 | 作用 |\n|------|--------|------|\n| Resume | F8 | 继续执行，直到下一个断点 |\n| Step Over | F10 | 执行当前行，不进入函数内部 |\n| Step Into | F11 | 进入函数内部，逐行执行 |\n| Step Out | Shift+F11 | 跳出当前函数 |\n\n暂停时，你可以：\n- **鼠标悬停**在任何变量上查看它的值\n- 在右侧 **Scope（作用域）** 面板查看所有局部和全局变量\n- 在 **Watch（监视）** 面板添加表达式，实时追踪其值变化\n- 在 **Console** 面板直接输入变量名来测试表达式\n\n> 🎯 就像一个指挥随时可以指着某个乐手问你这里奏的是什么，你随时可以查看任何变量的值。" },
  { type: 'explain', title: "条件断点与 DOM 断点", content: "**条件断点：** 右键点击行号 → \"Add conditional breakpoint\" → 输入条件表达式（如 i === 47）。只有当条件为 true 时才会暂停。这在调试第 47 次循环出问题时是救星。\n\n```js\n// 条件断点表达式：i === 47\n// 循环到第 48 次（i=47）时才会暂停\nfor (let i = 0; i < 100; i++) {\n  processItem(data[i])\n}\n```\n\n**DOM 断点：** 在 Elements 面板中右键一个 DOM 元素 → Break on → 选择 subtree modifications / attribute modifications / node removal。当这个元素被修改、删除或属性变化时，自动跳转到修改它的 JS 代码。\n\n**XHR/Fetch 断点：** 在 Sources 面板右侧的 XHR/fetch Breakpoints 中添加 URL 片段（如 search）。当有请求匹配这个 URL 时自动暂停——调试网络请求的神器。" },
  { type: 'example', title: "📝 看例子", content: "下面的代码是一个猜数字游戏。请在 Sources 面板中设置断点来调试：\n\n```js\nlet target = Math.floor(Math.random() * 100)\nlet score = 100\nlet attempts = 0\n\nfunction guess(num) {\n  attempts++\n  if (num > target) {\n    score -= 10\n    return '太大了！'\n  } else if (num < target) {\n    score -= 10\n    return '太小了！'\n  } else {\n    // 在这里设置一个断点——检查 num、target、score 的值\n    return '恭喜！你得分为 ' + score\n  }\n}\n```\n\n打开 F12 → Sources → 在 return 那行设置断点 → 在输入框输入数字 → 点击按钮触发 guess() → 程序暂停，查看右侧面板中所有变量。" },
  { type: 'task', title: "🎯 动手试试 ✨", content: "请在预览区的输入框中输入数字，触发 guess() 函数：\n\n1. 打开 F12 → Sources 面板，在 guess 函数的第一行设置断点\n2. 输入一个数字，观察程序暂停时右侧 Scope 面板中的变量值\n3. 使用 Step Over（F10）逐行执行，观察 score 和 attempts 的变化\n4. 在 num === target 的判断行设置条件断点（num > 80 && num < 90），只在特定范围暂停\n5. 挑战：在 Watch 面板添加表达式 target - num，实时追踪差值" }
]

const analogy = "console.log 就像在排练中让乐手报一遍自己的音符——能发现问题，却看不清全局。断点调试则像指挥让乐队在某一个小节停下来，逐个声部检查：长笛吹的是什么音？定音鼓在这个拍点上的力度对吗？你可以在任意时刻凝固住整个程序，查看所有变量的值，然后一行一行地执行，观察数据如何流动。"

const listen = "贝多芬《第九交响曲》排练录音 — 任何一位指挥在排练时都会反复停下、纠正、重来。断点调试就是你在代码中的排练指挥棒——发现不和谐的音（bug），停下来，找到原因，修正好，再继续。"
</script>

<template>
  <div class="content-panel">
    <div class="content-header">
      <span class="lesson-number">第五章：JavaScript 进阶 · 第 5 课</span>
      <h2 class="lesson-title">断点调试 — 用 Sources 面板听诊代码</h2>
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

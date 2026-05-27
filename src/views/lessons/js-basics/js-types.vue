<script setup lang="ts">
import type { Lesson } from '../../../types'
import { parseContent, parseInline } from '../../../utils/markdown'

defineProps<{ lessonMeta: Lesson }>()
defineEmits<{ complete: [] }>()

const sections = [
  { type: 'explain', title: "四种基础数据类型", content: "JavaScript 有几种基础数据类型，就像乐团中的乐器分类：\n\n- **string（字符串）** — 文字，用引号包裹 `\"巴赫\"`\n- **number（数字）** — 数值，可运算 `1685`, `3.14`\n- **boolean（布尔值）** — 只有 `true` 或 `false`，像二分音符的\"有/无\"\n- **null / undefined** — \"空\"值，表示没有内容\n\n```js\nlet composer = \"巴赫\";        // string\nlet birthYear = 1685;         // number\nlet isBaroque = true;         // boolean\nlet encore = null;            // null（故意为空）\n```\n\n用 `typeof` 查看类型：\n```js\nconsole.log(typeof \"巴赫\");   // \"string\"\nconsole.log(typeof 1685);     // \"number\"\nconsole.log(typeof true);     // \"boolean\"\n```" },
  { type: 'explain', title: "算术运算符 — 数字的计算", content: "数字可以做加减乘除，就像计算节拍：\n\n```js\nlet a = 10;\nlet b = 3;\n\nconsole.log(a + b);  // 13  加法（也用于字符串拼接！）\nconsole.log(a - b);  // 7   减法\nconsole.log(a * b);  // 30  乘法\nconsole.log(a / b);  // 3.333... 除法\nconsole.log(a % b);  // 1   取余数（模运算）\nconsole.log(a ** 2); // 100 幂运算\n```\n\n`%`（取余）特别实用——判断奇偶：`n % 2 === 0` 就是偶数。\n\n字符串的 `+` 是拼接：`\"Bach\" + \" \" + \"1685\"` → `\"Bach 1685\"`" },
  { type: 'explain', title: "比较运算符 — 返回布尔值", content: "比较运算符像评委打分，返回 `true` 或 `false`：\n\n```js\nconsole.log(5 > 3);   // true\nconsole.log(5 < 3);   // false\nconsole.log(5 === 5); // true（等于）\nconsole.log(5 !== 3); // true（不等于）\nconsole.log(5 >= 5);  // true\nconsole.log(5 <= 3);  // false\n```\n\n比较结果常用于 `if` 条件判断中——这就是下一节课要学的！" },
  { type: 'example', title: "📝 看例子", content: "下面的代码练习了数据类型和运算符：\n\n```js\nlet composer = \"巴赫\";\nlet birthYear = 1685;\nlet isBaroque = true;\n\n// 计算今年是多少周年\nlet currentYear = 2026;\nlet anniversary = currentYear - birthYear;\n\n// 判断是否是整百年\nlet isCentury = birthYear % 100 === 0;\n\nconsole.log(composer + \" 诞生于 \" + birthYear);\nconsole.log(\"距今 \" + anniversary + \" 年\");\nconsole.log(\"是否整百年？\" + isCentury);\n```" },
  { type: 'task', title: "🎯 动手试试 ✨", content: "切换到 JS 标签页，试试：\n\n1. 修改 `birthYear` 的值，看周年数自动变化\n2. 用 `typeof` 检查 `isBaroque` 的类型\n3. 试试用 `%` 判断 `birthYear` 是否能被 4 整除（音乐节拍经常是 4 拍）\n4. 挑战：计算\"如果一个人出生于 birthYear + 20 年，他今年多大\"" }
]

const analogy = "不同乐器有不同音色：小提琴清亮、大提琴深沉、定音鼓有力。编程中也一样——**number** 是节奏数、**boolean** 是音符有无、**string** 是旋律走向。了解数据类型，就像认识乐团中的每一件乐器。"

const listen = "本杰明·布里顿《青少年管弦乐队指南》— 依次介绍乐队中每一件乐器的音色特点，从木管到铜管到弦乐到打击乐。认识数据类型就像认识乐队编制——每种类型有它独特的\"音色\"和用途。"
</script>

<template>
  <div class="content-panel">
    <div class="content-header">
      <span class="lesson-number">第四章：JavaScript 入门 · 第 3 课</span>
      <h2 class="lesson-title">数据类型与运算符 — 认识代码的"音色"</h2>
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

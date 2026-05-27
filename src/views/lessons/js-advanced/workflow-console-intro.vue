<script setup lang="ts">
import type { Lesson } from '../../../types'
import { parseContent, parseInline } from '../../../utils/markdown'

defineProps<{ lessonMeta: Lesson }>()
defineEmits<{ complete: [] }>()

const sections = [
  { type: 'explain', title: "错误不是失败，是路标", content: "写代码一定会遇到错误。即便是工作了 20 年的工程师，也天天看报错信息。区别在于：他们不慌张，而是**先看控制台**。\n\n当你的 JS 不工作时，第一个动作不是盯着代码瞎猜——**先打开浏览器控制台**：\n\n- Windows：按 `F12`，点击 \"Console\"（控制台）标签\n- Mac：按 `Cmd + Option + J`\n- 或者右键页面 → \"检查\" → \"Console\"\n\n红色文字就是错误信息。**红色不可怕，可怕的是不读红字。** 就像一个音不准时你的耳朵会告诉你——控制台就是代码的\"听力训练\"。" },
  { type: 'explain', title: "读懂红字错误信息", content: "每条错误通常包含三部分信息：\n\n**1. 错误类型** — 告诉你\"出了什么问题\"：\n- `ReferenceError: xxx is not defined` — 变量没声明就用了\n- `TypeError: xxx is not a function` — 把不是函数的东西当函数调用了\n- `SyntaxError: Unexpected token` — 语法错误，漏了括号或引号\n\n**2. 文件名 + 行号** — 告诉你\"在哪里出的错\"：\n- 例如 `at 3:15` 表示第 3 行第 15 个字符\n\n**3. 错误消息** — 英文描述的具体原因\n\n现在编辑器里的代码有 5 个故意埋下的错误。打开控制台，一个一个找出并修复它们！" },
  { type: 'task', title: "🎯 动手试试 ✨", content: "编辑器里的代码有 **5 个故意埋下的错误**。请完成以下步骤：\n\n**第一步：** 运行代码，打开浏览器控制台（F12），查看红色错误信息\n\n**第二步：** 读第一条错误——它告诉你第几行出了什么错？找到对应代码并修复\n\n**第三步：** 再次运行，看下一条错误是否出现\n\n**第四步：** 重复，直到控制台变干净（没有红字），页面正常显示\n\n提示：错误之间可能互相掩盖——修完一个才能看到下一个。就像调音时，一根弦校准后才能发现另一根弦不准。" },
  { type: 'hint', title: "💡 需要一点线索？", content: "5 个错误的类型分别是：\n1. `document` 拼写错误 — ReferenceError\n2. `querySelector` 大小写错误 — TypeError\n3. 变量名不一致（声明和使用的名字不同）\n4. DOM 方法名拼写错误\n5. DOM 属性名拼写错误\n\n控制台会精确告诉你每一个错误的位置。耐心读完红字！" }
]

const analogy = "每个音乐家都有一位\"调音师\"朋友——音不准时，调音器会告诉你偏差了多少。浏览器的**开发者工具控制台（Console）**就是你的调音器——代码出错时，它会精确告诉你哪一行、出了什么错。学会读错误信息，你就再也不怕\"报错\"了。"

const listen = "巴赫《赋格的艺术》— 赋格中每一个声部的进入和退出都有精确的时间点，就像控制台报出的每一行错误——精确、清晰、可追溯。当你逐个解决错误时，就像分析赋格声部一样，一次专注一个问题。"
</script>

<template>
  <div class="content-panel">
    <div class="content-header">
      <span class="lesson-number">第五章：JavaScript 进阶 · 第 3 课</span>
      <h2 class="lesson-title">读懂浏览器的"错音提示" — 开发者控制台入门</h2>
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

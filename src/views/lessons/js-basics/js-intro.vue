<script setup lang="ts">
import type { Lesson } from '../../../types'
import { parseContent, parseInline } from '../../../utils/markdown'

defineProps<{ lessonMeta: Lesson }>()
defineEmits<{ complete: [] }>()

const sections = [
  { type: 'explain', title: "什么是 JavaScript？", content: "HTML 决定了页面上\"有什么\"，CSS 决定了\"长什么样\"，而 JavaScript（简称 JS）决定了\"能做什么\"。\n\n有了 JavaScript，网页可以：\n- 响应用户的点击和输入\n- 动态改变内容和样式\n- 播放音乐和动画\n- 记住用户的操作\n\n就像一个指挥家让乐团从静止的乐器变成流动的音乐！" },
  { type: 'explain', title: "第一行 JavaScript", content: "JavaScript 写在 `<script>` 标签中。先看一个最简单的方法——`alert()`，它会弹出一个提示框：\n\n```html\n<script>\n  alert(\"你好，音乐世界！\");\n<\/script>\n```\n\n切换到 JS 标签页，你可以看到编辑器中已经有了这段代码。预览区会在页面加载时弹出问候。" },
  { type: 'explain', title: "console.log — 开发者的耳朵", content: "`console.log()` 是 JS 中最常用的调试方法。它会在浏览器的**控制台**（Console）中输出信息：\n\n```js\nconsole.log(\"这段文字会出现在控制台\");\n```\n\n就像指挥家用耳朵听排练效果，开发者用 `console.log` 查看代码运行情况。\n\n打开预览区，然后按 `F12` 打开开发者工具，切换到\"Console\"标签页，你就能看到输出了！" },
  { type: 'example', title: "📝 看例子", content: "下面的代码就是编辑器中你看到的。一个 `alert` 欢迎你，一个 `console.log` 输出信息：\n\n```js\nalert(\"欢迎来到音乐编程之旅！\");\nconsole.log(\"页面加载完成，准备就绪！\");\n```\n试试修改 `alert` 和 `console.log` 中的文字。" },
  { type: 'task', title: "🎯 动手试试 ✨", content: "切换到 JS 标签页，尝试：\n\n1. 修改 `alert()` 中的文字，换成你自己的欢迎语\n2. 修改 `console.log()` 中的文字\n3. 试着添加第二行 `console.log()`，输出不同的内容\n4. 按 `F12` 打开浏览器控制台，看看你的输出是否出现了" }
]

const analogy = "如果 HTML 是乐谱、CSS 是演奏法记号，那么 JavaScript 就是**指挥家**——它让静态的乐谱动起来，控制演奏的节奏、顺序和互动。"

const listen = "斯特拉文斯基《春之祭》— 充满原始的生命力和节奏感，每一个节拍都在变化，就像 JavaScript 为页面注入的动态活力。"
</script>

<template>
  <div class="content-panel">
    <div class="content-header">
      <span class="lesson-number">第四章：JavaScript 入门 · 第 1 课</span>
      <h2 class="lesson-title">认识 JavaScript — 给页面注入生命</h2>
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

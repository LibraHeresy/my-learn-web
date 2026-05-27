<script setup lang="ts">
import type { Lesson } from '../../../types'
import { parseContent, parseInline } from '../../../utils/markdown'

defineProps<{ lessonMeta: Lesson }>()
defineEmits<{ complete: [] }>()

const sections = [
  { type: 'explain', title: "为什么需要模块化？", content: "早期的网页开发中，所有 JS 代码写在一个文件里——几百行甚至上千行。随着项目变大，问题来了：\n\n- 变量名冲突（两个函数都想用 name 这个变量）\n- 代码难以维护（找一个 bug 要翻几千行）\n- 无法复用（想在新项目里用某个功能，得从旧文件里复制粘贴）\n\n模块化解决了这些问题：\n\n```\n// 之前：一个巨大的 script.js\nscript.js (800 行)\n\n// 之后：按职责分成小文件\nutils.js        ← 工具函数（格式化日期、编码等）\napi.js          ← 网络请求\nrender.js       ← 渲染页面\napp.js          ← 主入口，引入其他模块\n```\n\n就像一个 100 人的乐团不会挤在一张谱台上——每个人有自己的分谱（模块），总谱（入口文件）告诉指挥各声部如何配合。" },
  { type: 'explain', title: "export — 两种导出方式", content: "ES Modules 提供两种导出方式：\n\n**1. 命名导出（Named Export）** — 一个模块可以导出多个东西：\n\n```js\n// utils.js — 导出多个工具函数\nexport function formatDate(date) {\n  return date.toLocaleDateString('zh-CN')\n}\n\nexport const API_BASE = 'https://api.example.com'\n\nexport function debounce(fn, delay) {\n  let timer\n  return (...args) => {\n    clearTimeout(timer)\n    timer = setTimeout(() => fn(...args), delay)\n  }\n}\n```\n\n**2. 默认导出（Default Export）** — 一个模块只导出一个主角：\n\n```js\n// search.js — 这个文件的主角就是 searchMusic\nexport default async function searchMusic(keyword) {\n  const res = await fetch(API_BASE + '/search?q=' + keyword)\n  return res.json()\n}\n```\n\n每个模块只能有一个 default export。\n\n> 🎻 命名导出像乐团里的多个乐手（各有其名），默认导出像首席小提琴——这个模块的代言人。" },
  { type: 'explain', title: "import — 引入其他模块", content: "**导入命名导出：** 用花括号 `{}` 精确指定要导入什么\n\n```js\n// 按需导入\nimport { formatDate, debounce } from './utils.js'\n\n// 重命名（避免命名冲突）\nimport { debounce as deb } from './utils.js'\n\n// 全部导入到一个命名空间\nimport * as utils from './utils.js'\nutils.formatDate(new Date())\n```\n\n**导入默认导出：** 不用花括号，名字可以自己取\n\n```js\nimport searchMusic from './search.js'\n// 名字可以自己定，但建议和导出保持一致\n```\n\n**混合导入：**\n\n```js\nimport searchMusic, { API_BASE } from './search.js'\n```\n\n**npm 包的导入：** (不需要 ./ 或 ../ 前缀)\n\n```js\nimport { ref, computed } from 'vue'\nimport axios from 'axios'\n```\n\n**注意：** `.js` 后缀在 Vite/Vue 项目中可以省略，在纯浏览器 ESM 中必须写。" },
  { type: 'example', title: "📝 看例子", content: "假设你在做一个音乐搜索器，模块化之后项目结构是这样的：\n\n```\nmusic-searcher/\n├── index.html\n├── js/\n│   ├── app.js        ← 主入口（组装所有模块）\n│   ├── api.js        ← 封装 fetch 请求\n│   ├── render.js     ← 负责渲染 DOM\n│   └── utils.js      ← 通用工具（防抖、格式化）\n```\n\n```js\n// api.js — 只负责数据\nexport async function searchMusic(keyword) {\n  const res = await fetch(\n    'https://itunes.apple.com/search?term=' + encodeURIComponent(keyword) + '&limit=10'\n  )\n  return res.json()\n}\n\n// render.js — 只负责 DOM\nexport function renderResults(data, container) {\n  container.innerHTML = data.results.map(item => `\n    <div class=\"card\">\n      <img src=\"${item.artworkUrl100}\" />\n      <h3>${item.trackName}</h3>\n    </div>\n  `).join('')\n}\n\n// app.js — 组装一切\nimport { searchMusic } from './api.js'\nimport { renderResults } from './render.js'\nimport { debounce } from './utils.js'\n\nconst input = document.querySelector('#search')\nconst results = document.querySelector('#results')\n\ninput.addEventListener('input', debounce(async (e) => {\n  const data = await searchMusic(e.target.value)\n  renderResults(data, results)\n}, 400))\n```\n\n每个文件职责单一——修改渲染逻辑不会影响 API 代码，反之亦然。" },
  { type: 'task', title: "🎯 动手试试 ✨", content: "在本地 VS Code 中练习（这是 local 模式课程）：\n\n1. 创建一个 music-searcher 文件夹，在其中创建 api.js、render.js、app.js 三个文件\n2. 在 api.js 中 export 一个 searchMusic 函数（用到 fetch）\n3. 在 render.js 中 export 一个 renderResults 函数（创建 DOM 元素）\n4. 在 app.js 中 import 这两个函数，组装成完整的搜索功能\n5. 练习：尝试用 default export 改写 api.js，看 import 语法有什么变化\n6. 练习：尝试 import * as 的方式，对比按需导入的区别" }
]

const analogy = "管弦乐总谱不会把所有音符挤在一行——第一小提琴、第二小提琴、中提琴、大提琴各有自己的谱表。模块化就是给你的代码分声部：一个文件管搜索（search.js），一个文件管渲染（render.js），一个文件管数据（store.js）。每个模块有自己的职责，通过 import/export 像不同声部之间的对话一样协作。"

const listen = "本杰明·布里顿《青少年管弦乐队指南》— 一段主题由不同乐器组依次演奏，每个乐器组（模块）独立展示自己的音色（功能），最后由整个乐队合奏（import 整合）。完美的模块化示范！"
</script>

<template>
  <div class="content-panel">
    <div class="content-header">
      <span class="lesson-number">第七章：工程入门 · 第 4 课</span>
      <h2 class="lesson-title">JS 模块化 — 把代码分成声部管理</h2>
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

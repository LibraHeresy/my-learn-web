<script setup lang="ts">
import type { Lesson } from '../../../types'
import { parseContent, parseInline } from '../../../utils/markdown'

defineProps<{ lessonMeta: Lesson }>()
defineEmits<{ complete: [] }>()

const sections = [
  { type: 'explain', title: "我们做什么", content: "打开你的 `music-collection` 项目，我们添加一个**音乐搜索器**功能：\n\n1. 用户输入搜索关键词\n2. 调用 iTunes Search API（免费公开 API）\n3. 用防抖优化搜索体验\n4. 展示搜索结果（歌曲名、歌手、封面）\n5. 错误处理（网络故障、无结果）\n\n> 🎯 这是你在\"合奏篇\"旅程的终点。你会惊喜地发现：你已经能写出真正有用的功能了。" },
  { type: 'example', title: "📝 iTunes Search API", content: "Apple 提供了免费的音乐搜索 API，无需注册：\n\n```\nhttps://itunes.apple.com/search?term=贝多芬&limit=10&country=cn\n```\n\n返回的 JSON 结构：\n```json\n{\n  \"resultCount\": 10,\n  \"results\": [\n    {\n      \"trackName\": \"月光奏鸣曲\",\n      \"artistName\": \"贝多芬\",\n      \"artworkUrl100\": \"封面图片URL\",\n      \"previewUrl\": \"试听URL\",\n      \"collectionName\": \"专辑名\"\n    }\n  ]\n}\n```" },
  { type: 'task', title: "🎯 动手实现 ✨", content: "在 `music-collection` 项目中创建 `src/utils/debounce.js` 和 `src/utils/api.js`，然后在 `App.vue` 中使用：\n\n```js\n// src/utils/api.js\nconst BASE_URL = 'https://itunes.apple.com'\n\nexport async function searchMusic(term) {\n  const url = \\`\\${BASE_URL}/search?term=\\${encodeURIComponent(term)}&limit=10&country=cn\\`\n  const res = await fetch(url)\n  if (!res.ok) throw new Error(\\`搜索失败：\\${res.status}\\`)\n  const data = await res.json()\n  return data.results\n}\n```\n\n```js\n// src/utils/debounce.js\nexport function debounce(fn, delay = 400) {\n  let timer\n  return function(...args) {\n    clearTimeout(timer)\n    timer = setTimeout(() => fn.apply(this, args), delay)\n  }\n}\n```\n\n在 `App.vue` 中组合使用：\n- 搜索框 + 防抖\n- 结果列表渲染\n- 加载状态和错误提示" },
  { type: 'hint', title: "💡 实现路线图", content: "1. **先写 API 层** — 在 `api.js` 中封装 `searchMusic` 函数\n2. **再写防抖** — 在 `debounce.js` 中实现防抖\n3. **组合使用** — 在 `App.vue` 中用 `import` 引入\n4. **处理状态** — loading、error、no results 三种状态\n5. **展示结果** — 歌曲名、歌手、封面图\n\n完成的代码结构应该像这样清晰分层：\n```\n用户输入 → debounce 等待 → api.searchMusic() → 更新 UI\n```" },
  { type: 'explain', title: "回顾你的成长", content: "合奏篇结束，回顾你学会的技能：\n\n| 技能 | 应用 |\n|------|------|\n| ES6 语法 | 解构、箭头函数、模板字符串 |\n| 错误处理 | try/catch 保护 API 调用 |\n| Event Loop | 理解异步执行顺序 |\n| Promise | .then()/.catch() 链式处理 |\n| async/await | 清晰的异步代码 |\n| fetch | 与服务器通信 |\n| API 封装 | 统一的请求模块 |\n| 防抖 | 优化搜索体验 |\n\n下一步：登台篇。你将学习用工程化工具（npm、Vite、Vue）搭建专业项目。准备好了吗？" }
]

const analogy = "合奏篇的最后一课：把你学到的所有\"合奏技能\"——Promise、async/await、fetch、错误处理、防抖——整合成一个完整的作品。就像一场室内乐的终曲，每个人都要把自己的声部完美地融入合奏。"

const listen = "维瓦尔第《四季·春》— 一个完整的协奏曲乐章，独奏与合奏交替，结构清晰、旋律优美。你的音乐搜索器也应该有这种\"完整感\"——输入、搜索、展示，一气呵成。"
</script>

<template>
  <div class="content-panel">
    <div class="content-header">
      <span class="lesson-number">第六章：异步与数据 · 第 8 课</span>
      <h2 class="lesson-title">异步篇结业 — 音乐搜索器</h2>
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

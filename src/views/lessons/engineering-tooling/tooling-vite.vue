<script setup lang="ts">
import type { Lesson } from '../../../types'
import { parseContent, parseInline } from '../../../utils/markdown'

defineProps<{ lessonMeta: Lesson }>()
defineEmits<{ complete: [] }>()

const sections = [
  { type: 'explain', title: "Vite 是什么？", content: "Vite（法语\"快\"的意思，读作 /viːt/）是一个**前端构建工具**。它做了三件关键的事：\n\n1. **开发服务器** — 运行 `npm run dev`，自动在浏览器打开你的页面，修改代码后页面**瞬时更新**（热更新 HMR）\n\n2. **构建打包** — 运行 `npm run build`，把你的代码压缩优化成可以部署到服务器上的文件\n\n3. **项目脚手架** — 运行 `npm create vite@latest`，自动生成项目文件夹结构\n\n> 💡 \"构建\"这个词可能陌生。想象你把散落的乐谱整理成一本精美的节目单——构建就是把你的源代码变成最终产品。" },
  { type: 'explain', title: "创建项目", content: "在终端中运行：\n\n```bash\nnpm create vite@latest music-collection -- --template vue\n```\n\n这条命令做了什么？\n- `npm create` — npm 的\"创建项目\"功能\n- `vite@latest` — 使用最新版 Vite 脚手架\n- `music-collection` — 项目名称（也是文件夹名）\n- `-- --template vue` — 使用 Vue 模板\n\n运行后：\n\n```bash\ncd music-collection   # 进入项目文件夹\nnpm install           # 安装依赖（Vue、Vite 等）\nnpm run dev           # 启动开发服务器\n```\n\n浏览器会自动打开 `http://localhost:5173`，你会看到一个 Vue 的欢迎页面！\n\n**项目结构一览：**\n```\nmusic-collection/\n├── index.html          # 入口 HTML\n├── package.json        # 项目配置\n├── vite.config.js      # Vite 配置\n├── src/\n│   ├── main.js         # 应用入口\n│   ├── App.vue         # 根组件\n│   ├── components/     # 放组件的地方\n│   └── assets/         # 放图片、CSS 等\n└── node_modules/       # 依赖包\n```" },
  { type: 'task', title: "🎯 你的任务 ✨", content: "1. 在终端中运行创建命令（在自己选的位置，比如桌面）：\n   ```bash\n   npm create vite@latest music-collection -- --template vue\n   ```\n\n2. `cd music-collection` 进入项目\n\n3. `npm install` 安装依赖\n\n4. `npm run dev` 启动开发服务器\n\n5. 在浏览器中访问 `http://localhost:5173`，看到 Vue 欢迎页\n\n6. 打开 `src/App.vue`，把 `<template>` 里的内容改成 `<h1>🎵 我的音乐收藏</h1>`，保存，看浏览器自动更新！\n\n> 🎉 你刚刚完成了第一个工程化的 Vue 项目！不再是 CDN 引入，而是真正的 npm + Vite + Vue 项目结构。" },
  { type: 'hint', title: "💡 常见问题", content: "- **端口被占用？** Vite 会自动换一个端口（如 5174），看终端提示。\n- **`npm run dev` 报错？** 确认你已经 `cd` 到了 `music-collection` 目录里。\n- **浏览器没有自动打开？** 手动访问终端中显示的地址（通常是 `http://localhost:5173`）。\n- **修改代码没反应？** 确认你保存了文件（`Ctrl+S`），或者开启自动保存。" }
]

const analogy = "排练一场交响乐需要准备场地、谱架、乐器、灯光……但如果有一个\"排练厅管家\"帮你一次性搞定所有配置呢？**Vite 就是这个管家**——一条命令，给你搭好整个项目框架：文件夹结构、配置文件、开发服务器，全部就位。你只需要开始写代码。"

const listen = "拉威尔《波莱罗》— 从一个几乎听不见的军鼓节奏开始，逐渐叠加乐器层，最终汇聚成辉煌的合奏。Vite 创建项目也是如此：一个空模板开始，逐渐加入组件、路由、数据……"
</script>

<template>
  <div class="content-panel">
    <div class="content-header">
      <span class="lesson-number">第七章：工程入门 · 第 6 课</span>
      <h2 class="lesson-title">创建第一个 Vue 项目 — Vite 登场</h2>
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

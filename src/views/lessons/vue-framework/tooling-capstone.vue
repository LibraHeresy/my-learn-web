<script setup lang="ts">
import type { Lesson } from '../../../types'
import { parseContent, parseInline } from '../../../utils/markdown'

defineProps<{ lessonMeta: Lesson }>()
defineEmits<{ complete: [] }>()

const sections = [
  { type: 'explain', title: "回顾你学会了什么", content: "从乐理篇到现在，你的成长路径：\n\n| 阶段 | 技能 | 工具 |\n|------|------|------|\n| 乐理篇 | HTML/CSS/JS 基础 | 浏览器、在线编辑器 |\n| 合奏篇 | 工作流、调试、命名、数据驱动 | 浏览器、在线编辑器 |\n| 登台篇 | Node.js、npm、Vite、Vue SFC、组件通信、Git、部署 | **VS Code、终端、GitHub** |\n\n在乐理篇你写第一个 `<h1>你好世界</h1>` 时，你可能想不到：几个月后，你会在终端里敲 `npm run build`，把一个完整的 Vue 应用部署到互联网上。\n\n**这就是工程化**——不是学更多语法，而是掌握让代码从\"能跑\"到\"专业\"的完整流程。" },
  { type: 'task', title: "🎯 结业项目：音乐收藏管理器 🎵", content: "在你的 `music-collection` 项目中，实现一个完整的**音乐收藏管理器**。功能要求：\n\n**基础功能（必须完成）：**\n\n1. 用 `v-for` 展示曲目列表（每首包含曲名、作曲家、时期）\n\n2. 用 `computed` 实现按时期筛选\n\n3. 用 `v-model` + 表单实现添加新曲目\n\n4. 用 `localStorage` 持久化数据（刷新不丢失）\n\n**进阶功能（建议完成）：**\n\n5. 把卡片提取成 `MusicCard.vue` 组件（props + emits）\n\n6. 添加\"收藏/取消收藏\"功能\n\n7. 添加删除曲目功能\n\n8. 用 `Git` 管理版本（至少 3 次 commit）\n\n9. 部署到 GitHub Pages\n\n**项目结构参考：**\n```\nmusic-collection/\n├── src/\n│   ├── App.vue              # 主页面（列表 + 筛选 + 表单）\n│   ├── components/\n│   │   ├── MusicCard.vue     # 曲目卡片组件\n│   │   ├── FilterBar.vue     # 筛选按钮组\n│   │   └── AddForm.vue       # 添加曲目表单\n│   └── main.js\n├── package.json\n└── vite.config.js\n```\n\n> 💡 这是你在乐理篇\"作品集\"中用纯 HTML/CSS/JS 做过的同一个项目。现在用工程化的 Vue 重写它——你会清晰地看到\"工程化\"带来了什么。" },
  { type: 'hint', title: "💡 如果卡住了", content: "- **忘了 ref 怎么用？** → 回顾第 2 课\n- **忘了 props/emits？** → 回顾第 3 课\n- **忘了怎么部署？** → 回顾第 8 课\n- **localStorage 读写：** `localStorage.setItem(\"key\", JSON.stringify(data))` / `JSON.parse(localStorage.getItem(\"key\"))`\n- **最重要的是：** 你已经具备了所有需要的技能。相信自己，一步步来。" },
  { type: 'explain', title: "下一步是什么？", content: "完成这个结业项目后，你已经是一个**入门级前端开发者**了。你学会了：\n\n✅ 用 HTML/CSS/JS 构建页面\n✅ 用 Vue 组件化思维组织代码\n✅ 用 npm + Vite 搭建工程化项目\n✅ 用 Git 管理代码版本\n✅ 用 GitHub Pages 部署上线\n\n接下来的方向：\n- **作品集 v2：** 用 Vue 重构你的音乐收藏库（component、router、store）\n- **作品集 v3：** 学习后端 API，做一个完整的全栈应用\n- **持续学习：** Vue Router、Pinia 状态管理、TypeScript、测试……\n\n> 🎵 编程的世界就像音乐——你永远有新的曲目可以学，新的技巧可以练。但你已经有了最重要的东西：**基本功和信心**。" }
]

const analogy = "独奏会的时间到了。你已经从认识乐器（乐理篇）、学会合奏（合奏篇）、掌握了演出流程（登台篇）——现在，**在真正的音乐厅里，用专业的方式，演奏你自己的作品。**"

const listen = "贝多芬《第九交响曲》第四乐章 — 这不仅是音乐的巅峰，也是工程化的杰作：独唱、合唱、管弦乐队在精确的指挥下协作。你的结业项目也是如此：Vue 组件（声部）+ Vite 构建（指挥）+ Git 版本管理（排练记录）+ GitHub Pages 部署（音乐厅公演）。"
</script>

<template>
  <div class="content-panel">
    <div class="content-header">
      <span class="lesson-number">第八章：Vue 实战 · 第 11 课</span>
      <h2 class="lesson-title">登台篇结业 — 你的第一个工程化作品</h2>
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

<script setup lang="ts">
import type { Lesson } from '../../../types'
import { parseContent, parseInline } from '../../../utils/markdown'

defineProps<{ lessonMeta: Lesson }>()
defineEmits<{ complete: [] }>()

const sections = [
  { type: 'explain', title: "为什么需要环境变量？", content: "在真实项目中，你经常会遇到不同环境用不同值的场景：\n\n| 场景 | 开发环境 | 生产环境 |\n|------|----------|----------|\n| API 地址 | http://localhost:3000/api | https://api.myapp.com |\n| 调试模式 | 开启（显示 log、调试面板） | 关闭 |\n| 分析工具 | 禁用 | 启用 |\n\n如果没有环境变量，你需要**每次部署前手动改代码**——繁琐且容易出错。环境变量让这些值外置到配置文件中，根据运行环境自动切换。" },
  { type: 'explain', title: ".env 文件 — 你的后台配置单", content: "Vite 项目默认支持 .env 文件（通过 dotenv）：\n\n```bash\n# .env.development  — 开发时自动加载\nVITE_API_BASE=http://localhost:3000/api\nVITE_DEBUG=true\nVITE_APP_TITLE=音乐收藏（开发版）\n\n# .env.production  — 构建时自动加载\nVITE_API_BASE=https://api.myapp.com\nVITE_DEBUG=false\nVITE_APP_TITLE=音乐收藏\n```\n\n**命名规则：** 只有以 VITE_ 开头的变量才会暴露给客户端代码。这是 Vite 的安全措施——防止意外的敏感信息泄露。\n\n**注意：** .env 文件**不应该提交到 Git**（把 .env 加入 .gitignore）。敏感信息如 API 密钥永远不要放在前端环境变量中——它们会被打包进 JS 文件，任何人都能看到。" },
  { type: 'explain', title: "在代码中使用环境变量", content: "在 Vue 组件或 JS 文件中通过 import.meta.env 访问：\n\n```js\n// 在任何 .vue 或 .js 文件中\nconst API_BASE = import.meta.env.VITE_API_BASE\nconst isDebug = import.meta.env.VITE_DEBUG === 'true'\n\n// 使用\nasync function searchMusic(keyword) {\n  const res = await fetch(\n    import.meta.env.VITE_API_BASE + '/search?q=' + keyword\n  )\n  return res.json()\n}\n\n// 条件逻辑\nif (import.meta.env.DEV) {\n  console.log('当前是开发环境')\n}\n\nif (import.meta.env.PROD) {\n  // 生产环境特有的逻辑\n}\n```\n\n**Vite 内置的环境变量：**\n- import.meta.env.MODE — 当前模式（development / production）\n- import.meta.env.DEV — 是否开发模式（boolean）\n- import.meta.env.PROD — 是否生产模式（boolean）\n- import.meta.env.BASE_URL — 部署的基础路径（来自 vite.config.js 的 base）\n\n> 🎭 环境变量就像演出前的后台配置——灯光师根据场地调试灯光，音响师根据厅堂调 EQ。开发和生产是两种完全不同的演出，需要不同的配置。" },
  { type: 'example', title: "📝 看例子", content: "以下是一个使用环境变量的实际例子：\n\n```js\n// src/config.js — 集中管理所有环境配置\nexport const config = {\n  apiBase: import.meta.env.VITE_API_BASE || 'http://localhost:3000/api',\n  debug: import.meta.env.VITE_DEBUG === 'true',\n  appTitle: import.meta.env.VITE_APP_TITLE || '音乐收藏',\n  enableAnalytics: import.meta.env.PROD  // 只在生产环境开启统计\n}\n\n// 在组件中使用\nimport { config } from './config.js'\n\nconsole.log('当前环境：', import.meta.env.MODE)\nconsole.log('API 地址：', config.apiBase)\nconsole.log('调试模式：', config.debug ? '开启' : '关闭')\n```\n\n开发时运行 npm run dev，自动读取 .env.development。\n构建时运行 npm run build，自动读取 .env.production。" },
  { type: 'task', title: "🎯 动手试试 ✨", content: "在你的 music-collection-vue 项目中：\n\n1. 创建 .env.development 和 .env.production 文件\n2. 在两个文件中定义不同的 VITE_API_BASE 和 VITE_APP_TITLE\n3. 在项目中用 import.meta.env 读取这些变量，并在页面标题或 console.log 中显示\n4. 分别运行 npm run dev 和 npm run build && npm run preview，观察变量值的变化\n5. 确认 .gitignore 中包含 .env（避免提交到 Git）\n6. 挑战：在 vite.config.js 中用 define 选项定义自定义的全局常量" }
]

const analogy = "同一首曲子，在排练室演奏和在金色大厅演奏，需要的配置不同——排练室用小型 PA 系统，音乐厅有专业的声学设计和混音台。开发环境和生产环境也是两个不同的舞台：开发时 API 指向本地服务器，上线后指向真实 API。环境变量让你在每个舞台上自动切换正确的配置，不需要手动改代码。"

const listen = "马勒《第八交响曲》千人交响曲 — 这部作品需要极大规模的编制，每次演出前必须根据演出场地的声学特性（就像环境变量）调整乐队的摆位和动态平衡。同一个总谱，不同的场地需要不同的配置。"
</script>

<template>
  <div class="content-panel">
    <div class="content-header">
      <span class="lesson-number">第七章：工程入门 · 第 11 课</span>
      <h2 class="lesson-title">环境变量 — 给不同的舞台不同的配置</h2>
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

<script setup lang="ts">
import type { Lesson } from '../../../types'
import { parseContent, parseInline } from '../../../utils/markdown'

defineProps<{ lessonMeta: Lesson }>()
defineEmits<{ complete: [] }>()

const sections = [
  { type: 'explain', title: "开发 vs 生产", content: "在开发过程中，Vite 的开发服务器做了很多\"方便你开发\"的事：\n- 热更新（修改代码页面自动刷新）\n- 不压缩代码（方便调试）\n- 源码映射（报错时能看到原始代码位置）\n\n但当你准备发布时，需要\"构建\"——把代码变成**适合用户访问的最终版本**：\n- 代码压缩（去掉空格、缩短变量名）\n- 文件合并（减少 HTTP 请求次数）\n- 去除开发调试代码\n\n**类比：**\n- 开发 = 排练时的笔记，潦草但你能看懂\n- 构建 = 正式演出的节目单，印刷精美，观众能看懂\n\n**命令：**\n```bash\nnpm run build\n```\n\n运行后，项目根目录会多出一个 `dist/` 文件夹——里面就是最终要部署的文件。\n\n```\ndist/\n├── index.html        # 入口页面\n├── assets/\n│   ├── index-abc123.js   # 打包后的 JS\n│   └── index-def456.css  # 打包后的 CSS\n└── ...\n```\n\n> 💡 `dist` 是 distribution（分发）的缩写。这个文件夹的内容就是你的\"产品\"。" },
  { type: 'explain', title: "部署到 GitHub Pages", content: "GitHub Pages 是 GitHub 提供的免费静态网站托管服务。你可以把 `dist/` 文件夹的内容部署上去，获得一个 `https://你的用户名.github.io/music-collection/` 的网址。\n\n**最简单的部署方式：**\n\n1. 在项目中安装 `gh-pages` 包：\n```bash\nnpm install -D gh-pages\n```\n\n2. 在 `package.json` 中添加部署脚本：\n```json\n{\n  \"scripts\": {\n    \"dev\": \"vite\",\n    \"build\": \"vite build\",\n    \"deploy\": \"gh-pages -d dist\"\n  }\n}\n```\n\n3. 在 `vite.config.js` 中添加 base 配置：\n```js\nimport { defineConfig } from 'vite'\nimport vue from '@vitejs/plugin-vue'\n\nexport default defineConfig({\n  plugins: [vue()],\n  base: '/music-collection/'  // 你的仓库名\n})\n```\n\n4. 构建并部署：\n```bash\nnpm run build\nnpm run deploy\n```\n\n等待几分钟，访问 `https://你的用户名.github.io/music-collection/`，你的项目就上线了！🎉" },
  { type: 'task', title: "🎯 你的任务 ✨", content: "1. 运行 `npm run build`，查看生成的 `dist/` 文件夹\n\n2. 安装 `gh-pages`：`npm install -D gh-pages`\n\n3. 在 `vite.config.js` 中添加 `base` 配置\n\n4. 在 `package.json` 中添加 `deploy` 脚本\n\n5. 运行 `npm run deploy`，把项目部署到 GitHub Pages\n\n6. 访问你的网址，确认一切正常\n\n> 🎉 恭喜！你刚刚完成了从写第一行代码到部署上线的完整流程。你把一个 Vue 项目变成了全世界都能访问的网站。" },
  { type: 'hint', title: "💡 部署的其他选择", content: "GitHub Pages 是最简单的免费方案。此外还有：\n- **Vercel** — 自动从 GitHub 部署，支持自定义域名，速度更快\n- **Netlify** — 类似 Vercel，也是拖拽文件夹即可部署\n- **Cloudflare Pages** — 速度极快，全球 CDN 加速\n\n对于个人项目，GitHub Pages 完全够用。当你需要更高级的功能时，这些平台的学习成本也很低。" }
]

const analogy = "排练结束（开发完成），最后一步是：**正式演出**（部署）。你把排练时的草稿整理成精美的节目单（构建），然后打开音乐厅的大门，让观众进场（部署到服务器）。从此你的作品有了一个公开的网址，任何人都可以访问。"

const listen = "柴可夫斯基《1812 序曲》— 从教堂的祈祷到战争的炮火再到胜利的钟声——最后的尾声，所有乐器（包括真炮！）一齐奏响。部署就是那最后一刻：你的项目从小小的开发服务器走向全世界。"
</script>

<template>
  <div class="content-panel">
    <div class="content-header">
      <span class="lesson-number">第七章：工程入门 · 第 10 课</span>
      <h2 class="lesson-title">构建与部署 — 让全世界看到你的作品</h2>
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

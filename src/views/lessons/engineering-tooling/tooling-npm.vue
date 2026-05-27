<script setup lang="ts">
import type { Lesson } from '../../../types'
import { parseContent, parseInline } from '../../../utils/markdown'

defineProps<{ lessonMeta: Lesson }>()
defineEmits<{ complete: [] }>()

const sections = [
  { type: 'explain', title: "npm 做了什么？", content: "npm（Node Package Manager）是 Node.js 自带的包管理器。它做三件事：\n\n1. **下载别人的代码** — `npm install 包名`\n\n2. **管理依赖关系** — 记录你的项目用了哪些包（`package.json`）\n\n3. **运行脚本** — `npm run 脚本名`\n\n**npm 和 pip/brew 类比：**\n- 如果你学过 Python：npm = pip\n- 如果你用 Mac：npm = Homebrew\n- 如果你用手机：npm = 应用商店\n\n> 💡 每次你 `npm install` 一个包，代码被下载到 `node_modules/` 文件夹。这个文件夹通常很大——所以一般不上传到 Git。" },
  { type: 'explain', title: "package.json — 项目的\"身份证\"", content: "每个前端项目都有一个 `package.json` 文件，它记录了：\n\n```json\n{\n  \"name\": \"my-music-app\",\n  \"version\": \"1.0.0\",\n  \"description\": \"我的音乐收藏应用\",\n  \"scripts\": {\n    \"dev\": \"vite\",\n    \"build\": \"vite build\"\n  },\n  \"dependencies\": {\n    \"vue\": \"^3.4.0\"\n  },\n  \"devDependencies\": {\n    \"vite\": \"^5.0.0\"\n  }\n}\n```\n\n- **name** — 项目名称\n- **scripts** — 你可以运行的命令（`npm run dev` 就是运行这里定义的 `dev` 脚本）\n- **dependencies** — 项目运行需要的包（用户最终也会用到）\n- **devDependencies** — 只在开发时需要用的包（如 Vite、测试工具）\n\n创建 `package.json` 的命令：\n```bash\nnpm init -y\n```\n`-y` 表示跳过所有问题，使用默认值。" },
  { type: 'task', title: "🎯 你的任务 ✨", content: "1. 在 VS Code 终端中，确保你在 `my-music-app` 目录下（`pwd` 确认）\n\n2. 运行 `npm init -y`，你会看到生成了 `package.json`\n\n3. 打开 `package.json` 看看里面的内容\n\n4. 试试安装一个包：`npm install dayjs`（dayjs 是一个日期处理库，很小的包）\n\n5. 观察变化：`package.json` 多了一个 `dependencies` 字段，还生成了 `node_modules` 文件夹\n\n> 你刚刚完成了人生中第一次 `npm install`！以后你会做很多很多次。" },
  { type: 'hint', title: "💡 node_modules 很重", content: "`node_modules` 文件夹可能会变得非常大（几百 MB）。**永远不要把它上传到 GitHub 或发给别人**——别人拿到你的 `package.json` 之后，只需要运行 `npm install`，就能自动下载所有依赖。\n\n就像你只需要告诉乐团\"贝多芬第五交响曲\"，不需要给每个人抄一份总谱。" }
]

const analogy = "作曲家不需要从零发明每一个和弦——他们在已有的音乐体系上创作。**npm 就是编程世界的音乐图书馆**：全球开发者共享了超过 200 万个\"包\"，你只需要 `npm install`，就能把别人写好的功能直接拿来用。"

const listen = "莫扎特《安魂曲》K.626 — 莫扎特在这部作品中引用了亨德尔、海顿等前辈的音乐元素。好的作曲家善于\"复用\"前人的精华。npm 让你站在全球开发者的肩膀上——不需要重新发明轮子。"
</script>

<template>
  <div class="content-panel">
    <div class="content-header">
      <span class="lesson-number">第七章：工程入门 · 第 5 课</span>
      <h2 class="lesson-title">包管理器 — 你的"乐谱图书馆"</h2>
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

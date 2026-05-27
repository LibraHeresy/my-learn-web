<script setup lang="ts">
import type { Lesson } from '../../../types'
import { parseContent, parseInline } from '../../../utils/markdown'

defineProps<{ lessonMeta: Lesson }>()
defineEmits<{ complete: [] }>()

const sections = [
  { type: 'explain', title: "为什么要学命令行？", content: "前端工程化的几乎每一步都在命令行里完成：\n- 创建项目：`npm create vite@latest`\n- 安装依赖：`npm install`\n- 启动开发服务器：`npm run dev`\n- 构建生产版本：`npm run build`\n- Git 版本管理：`git add` / `git commit`\n\n你不需要成为命令行专家，只需要掌握 6 个最常用的命令。" },
  { type: 'explain', title: "6 个必学命令", content: "**1. `pwd` — 我在哪里？**（Print Working Directory）\n```bash\npwd\n# 输出：/Users/xiaomei/my-music-app\n```\n就像 GPS 告诉你当前位置。\n\n**2. `ls` — 这里有什么？**（List）\n```bash\nls\n# 输出：readme.md\n```\n列出当前文件夹中的所有文件。\n\n**3. `cd` — 去别的地方**（Change Directory）\n```bash\ncd my-music-app    # 进入文件夹\ncd ..              # 回到上一级\ncd ~               # 回到家目录\n```\n\n**4. `mkdir` — 创建文件夹**（Make Directory）\n```bash\nmkdir src          # 创建名为 src 的文件夹\nmkdir -p src/components  # 创建嵌套文件夹\n```\n\n**5. `echo` / `type nul` — 创建文件**\n```bash\necho \"\" > index.html     # Mac/Linux：创建空文件\ntype nul > index.html    # Windows：创建空文件\n```\n\n**6. `code .` — 用 VS Code 打开当前文件夹**\n```bash\ncode .\n# VS Code 会打开当前文件夹\n```" },
  { type: 'task', title: "🎯 你的任务 ✨", content: "在 VS Code 的终端中完成以下操作（不要用鼠标在文件管理器中操作！）：\n\n1. `pwd` — 确认你在 `my-music-app` 文件夹中\n\n2. `mkdir src` — 创建 src 文件夹\n\n3. `cd src` — 进入 src 文件夹\n\n4. 在 src 中创建 `index.html`（用上面的命令）\n\n5. `cd ..` — 回到上级目录\n\n6. `ls` — 确认看到 `src` 文件夹\n\n> 💡 如果你在 Windows 上使用 PowerShell，命令完全一样。如果用 CMD，`ls` 需要换成 `dir`。建议使用 PowerShell（VS Code 终端默认就是它）。" },
  { type: 'hint', title: "💡 Tab 键自动补全", content: "命令行最实用的技巧：**按 Tab 键自动补全**。\n\n比如输入 `cd my` 然后按 Tab，系统会自动补全为 `cd my-music-app`（如果当前目录只有一个以 my 开头的文件夹）。\n\n这就像你哼两句旋律，别人就知道是哪首曲子。" }
]

const analogy = "指挥家用一个手势让整个乐团起奏——这是**效率**。命令行也是如此：敲几个字母，电脑就完成一项任务。不需要鼠标点来点去，不需要在文件夹里翻找。几个命令，一切就绪。"

const listen = "贝多芬《第五交响曲》第一乐章 — 指挥的一个下拍，整个乐团爆发。命令行就是你的指挥棒——`npm run dev` 一行命令，开发服务器立刻启动。"
</script>

<template>
  <div class="content-panel">
    <div class="content-header">
      <span class="lesson-number">第七章：工程入门 · 第 3 课</span>
      <h2 class="lesson-title">用命令行"指挥"电脑</h2>
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

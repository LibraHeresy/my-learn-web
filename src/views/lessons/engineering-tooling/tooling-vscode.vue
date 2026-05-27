<script setup lang="ts">
import type { Lesson } from '../../../types'
import { parseContent, parseInline } from '../../../utils/markdown'

defineProps<{ lessonMeta: Lesson }>()
defineEmits<{ complete: [] }>()

const sections = [
  { type: 'explain', title: "为什么需要专业的代码编辑器？", content: "你可能用记事本写过代码——那种感觉就像在餐巾纸上写乐谱。VS Code 给你的是：\n\n| 功能 | 类比 |\n|------|------|\n| 语法高亮 | 不同类型的音符用不同颜色标记 |\n| 自动补全 | 你哼一个音，它就帮你找到后面的旋律 |\n| 错误提示 | 弹错音时，调音器立刻报警 |\n| 内置终端 | 谱架下面藏着一台节拍器 |\n| 文件管理 | 所有乐谱按声部分类放好 |\n| 插件市场 | 各种\"效果器\"任你挑选 |\n\n> 💡 VS Code 是微软开发的，完全免费，Windows/Mac/Linux 都能用。" },
  { type: 'explain', title: "安装与初始化", content: "1. 打开浏览器，访问 **code.visualstudio.com**\n\n2. 下载并安装 VS Code\n\n3. 启动 VS Code\n\n**界面导览：**\n- **左侧活动栏** — 最左侧的图标列（文件、搜索、Git、插件、...）\n- **文件资源管理器** — 显示项目文件夹结构（快捷键 `Ctrl+Shift+E` / `Cmd+Shift+E`）\n- **编辑区** — 中间最大的区域，写代码的地方\n- **终端面板** — 底部可以弹出的面板（快捷键 `Ctrl+`` / `Cmd+``）\n\n**打开终端面板：**\n- 点击顶部菜单 `查看 → 终端`\n- 或按快捷键 `Ctrl+``（Mac: `Cmd+``）\n\n在 VS Code 内置终端中运行 `node -v`，确认能看到版本号。以后我们不再需要单独打开系统终端——所有操作都在 VS Code 里完成。" },
  { type: 'task', title: "🎯 你的任务 ✨", content: "1. 下载并安装 VS Code\n\n2. 在你的电脑上创建一个文件夹叫 `my-music-app`（可以放在桌面或文档目录）\n\n3. 在 VS Code 中点击 `文件 → 打开文件夹`，选择 `my-music-app`\n\n4. 按 `Ctrl+`` 打开终端面板，运行 `node -v`\n\n5. 在左侧文件资源管理器中右键 → 新建文件 → `readme.md`，输入 `# 我的音乐应用`\n\n> 成功打开文件夹并看到终端后，你的\"排练厅\"就布置好了。接下来我们开始往里面放东西。" },
  { type: 'hint', title: "💡 小技巧", content: "- **自动保存：** 点击 `文件 → 自动保存`，以后每次切换文件都会自动保存。\n- **中文界面：** 如果英文不习惯，在插件市场搜索\"Chinese\"安装中文语言包。\n- **字体大小：** `Ctrl +` / `Ctrl -` 可以随时调整。" }
]

const analogy = "音乐家有谱架，程序员有编辑器。**VS Code** 不是普通的记事本——它就像智能谱架：自动帮你对齐音符、标记错误、提示下一个和弦。全世界绝大多数前端开发者每天都在用它。"

const listen = "巴赫《C大调前奏曲》BWV 846 — 这首曲子只用了一个简单的琶音模式，但包含了无限的可能性。VS Code 也是如此：表面看起来只是一个编辑器，但里面藏着能帮你做任何事的插件生态。"
</script>

<template>
  <div class="content-panel">
    <div class="content-header">
      <span class="lesson-number">第七章：工程入门 · 第 2 课</span>
      <h2 class="lesson-title">认识你的"乐谱架"：VS Code</h2>
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

<script setup lang="ts">
import type { Lesson } from '../../../types'
import { parseContent, parseInline } from '../../../utils/markdown'

defineProps<{ lessonMeta: Lesson }>()
defineEmits<{ complete: [] }>()

const sections = [
  { type: 'explain', title: "Node.js 是什么？", content: "到目前为止，你的 JavaScript 都运行在**浏览器**里。Node.js 让 JavaScript 可以运行在**你的电脑**上——就像以前只能在音乐教室弹钢琴，现在你家里也有了一台。\n\n有了 Node.js，你才能使用：\n- **npm** — 包管理器（相当于一个巨大的乐谱库）\n- **Vite** — 构建工具（自动搭建排练厅）\n- **终端命令** — 用文字指挥电脑\n\n> 💡 不要被\"安装\"吓到。这就像第一次调音——看起来很专业，但其实只是拧几个旋钮。" },
  { type: 'explain', title: "安装步骤（Windows / Mac 通用）", content: "1. 打开浏览器，访问 **nodejs.org**\n\n2. 下载 **LTS 版本**（长期支持版，偶数是版本号，如 20.x）\n   - LTS = Long Term Support，最稳定的版本\n   - 不要下载\"Current\"版本——那是给尝鲜的人用的\n\n3. 运行安装程序，一路点\"Next\"（全部默认选项即可）\n\n4. 安装完成后，打开终端验证：\n\n**Windows：** 按 `Win + R`，输入 `cmd`，回车\n**Mac：** 按 `Cmd + 空格`，输入 `Terminal`，回车\n\n在终端中输入：\n```bash\nnode -v\n```\n\n如果看到版本号（如 `v20.11.0`），安装成功！🎉\n\n再输入：\n```bash\nnpm -v\n```\n\n如果也看到版本号（如 `10.2.4`），说明 npm 也装好了。" },
  { type: 'task', title: "🎯 你的任务 ✨", content: "1. 从 nodejs.org 下载并安装 Node.js LTS 版本\n\n2. 打开终端，运行 `node -v`，确认看到版本号\n\n3. 运行 `npm -v`，确认看到版本号\n\n4. 在终端中试试 `node -e \"console.log('你好，工程化世界！')\"` —— 这是用 Node.js 执行一行 JavaScript\n\n> 完成之后，你已经迈出了工程化的第一步。接下来的所有课程都依赖 Node.js，确保安装成功再继续。" },
  { type: 'hint', title: "💡 常见问题", content: "- **\"node 不是内部或外部命令\"** → 安装时可能没勾选\"Add to PATH\"。重新运行安装程序，确保勾选这个选项。\n- **Mac 权限问题** → 如果提示权限不足，尝试用管理员权限安装。\n- **不确定有没有装过？** → 在终端运行 `node -v`，能显示版本号就是装过了。\n- **版本号太旧？** → 推荐 v18 或 v20 以上。低于 v16 建议重新安装。" }
]

const analogy = "学音乐之前，你得先有一件乐器。学前端工程化之前，你得先有 **Node.js**——它不是用来写代码的，而是用来**运行工具的**。就像钢琴本身不演奏，但有了它你才能弹出所有曲子。"

const listen = "德彪西《月光》— 这首曲子的意境不在于复杂的技巧，而在于你按下第一个音符的瞬间——就像安装好 Node.js 后在终端输入第一行命令，一个全新的世界在你面前展开。"
</script>

<template>
  <div class="content-panel">
    <div class="content-header">
      <span class="lesson-number">第七章：工程入门 · 第 1 课</span>
      <h2 class="lesson-title">安装你的"乐器"：Node.js</h2>
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

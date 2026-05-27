<script setup lang="ts">
import type { Lesson } from '../../../types'
import { parseContent, parseInline } from '../../../utils/markdown'

defineProps<{ lessonMeta: Lesson }>()
defineEmits<{ complete: [] }>()

const sections = [
  { type: 'explain', title: "为什么需要 Git？", content: "你可能经历过这种情况：\n```\n音乐收藏_v1.html\n音乐收藏_v2.html\n音乐收藏_v2_最终版.html\n音乐收藏_v2_真的最终版.html\n音乐收藏_v3_备份.html\n```\n\nGit 解决了这个混乱。有了 Git：\n- 不需要\"v1\"\"v2\"\"最终版\"这种命名\n- 每次修改后 `git commit`，自动记录快照\n- 任何时候可以回到之前的版本\n- 清楚地看到每次改了什么（`git diff`）\n\n程序员用 Git，就像作曲家保留每一版草稿——只是更优雅。" },
  { type: 'explain', title: "三个基本操作", content: "**1. `git init` — 初始化仓库**\n```bash\ncd music-collection\ngit init\n```\n这会在项目中创建一个隐藏的 `.git` 文件夹——Git 的所有历史记录都存在这里。\n\n**2. `git add` + `git commit` — 保存快照**\n```bash\ngit add .                    # 把所有修改加入\"暂存区\"\ngit commit -m \"初始化项目\"    # 创建一次提交（存档）\n```\n\n每次 commit 需要一条消息（`-m \"...\"`），说明这次改了什么。\n- `-m` = message（消息）\n\n**3. `.gitignore` — 告诉 Git 忽略什么**\n\n创建 `.gitignore` 文件（注意文件名前面有个点）：\n```\nnode_modules/\ndist/\n.DS_Store\n```\n\n这些文件和文件夹不会被 Git 追踪：\n- `node_modules/` — 太大了，而且别人可以通过 `npm install` 重新下载\n- `dist/` — 构建产物，不是源码\n- `.DS_Store` — Mac 系统文件，和项目无关\n\n**完整工作流：**\n```bash\ngit add .\ngit commit -m \"添加了音乐卡片组件\"\n# 继续写代码...\ngit add .\ngit commit -m \"添加了筛选功能\"\n# 继续写代码...\ngit add .\ngit commit -m \"修复了收藏按钮的样式\"\n```" },
  { type: 'task', title: "🎯 你的任务 ✨", content: "1. 在 `music-collection` 项目中初始化 Git：`git init`\n\n2. 创建 `.gitignore` 文件，内容为 `node_modules/` 和 `dist/`\n\n3. 运行 `git add .` 把所有文件加入暂存区\n\n4. 运行 `git commit -m \"初始化音乐收藏项目\"` 创建第一次提交\n\n5. 修改 `App.vue`（比如改个标题），然后 `git add .` + `git commit -m \"更新标题\"`\n\n6. 运行 `git log` 查看提交历史（按 `q` 退出）\n\n> 🎉 你刚刚完成了人生中第一次 Git commit！从此你的代码有了\"时间机器\"。" },
  { type: 'hint', title: "💡 Commit 消息怎么写？", content: "好的 commit 消息让人一眼知道改了什么：\n- ✅ `添加音乐卡片组件`\n- ✅ `修复收藏按钮点击无效的bug`\n- ✅ `优化筛选功能，支持多个时期同时选中`\n- ❌ `修改`（太模糊）\n- ❌ `asdf`（无意义）\n- ❌ `根据需求修改了一些文件`（等于没说）\n\n写 commit 消息就像写日记——未来的你会感谢现在认真写消息的你。" }
]

const analogy = "作曲家写一部作品，通常会经历多个版本：草稿、修改稿、定稿、修订版……每一个版本都可能需要回头查看。**Git 就是这个\"版本档案柜\"**——你每完成一步就\"存档\"一次，随时可以回到任何历史版本，也随时知道\"谁在什么时候改了什么\"。"

const listen = "贝多芬《迪亚贝利变奏曲》Op.120 — 33 个变奏从同一个主题演化而来。每一个变奏就像 Git 中的一个 commit——从同一个起点出发，每次修改都留下清晰的记录。"
</script>

<template>
  <div class="content-panel">
    <div class="content-header">
      <span class="lesson-number">第七章：工程入门 · 第 8 课</span>
      <h2 class="lesson-title">Git — 你的"乐谱版本管理器"</h2>
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

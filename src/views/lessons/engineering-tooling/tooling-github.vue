<script setup lang="ts">
import type { Lesson } from '../../../types'
import { parseContent, parseInline } from '../../../utils/markdown'

defineProps<{ lessonMeta: Lesson }>()
defineEmits<{ complete: [] }>()

const sections = [
  { type: 'explain', title: "Git 和 GitHub 的区别", content: "这是初学者最容易混淆的概念：\n\n| | Git | GitHub |\n|------|-----|--------|\n| 是什么 | 版本管理工具 | 代码托管网站 |\n| 装在哪里 | 你的电脑 | 互联网上的服务器 |\n| 能做什么 | 记录版本、回退历史 | 存储代码、协作、展示作品 |\n| 类比 | 你书房里的乐谱档案柜 | 公开图书馆的乐谱收藏室 |\n\n**Git 不需要 GitHub 也能用**——但 GitHub 让你的代码有了\"线上备份\"和\"公开展示\"的能力。" },
  { type: 'explain', title: "关联本地项目到 GitHub", content: "**第一步：在 GitHub 上创建仓库**\n\n1. 打开 [github.com](https://github.com)，注册/登录账号\n\n2. 点击右上角的 ➕ → \"New repository\"\n\n3. 仓库名填写 `music-collection`\n\n4. 设置为 **Public**（公开）\n\n5. **不要勾选** \"Add a README file\"（因为本地已有项目）\n\n6. 点击 \"Create repository\"\n\n**第二步：关联本地项目**\n\nGitHub 会显示一段命令，复制并在 VS Code 终端中运行：\n\n```bash\ngit remote add origin https://github.com/你的用户名/music-collection.git\ngit branch -M main\ngit push -u origin main\n```\n\n逐行解释：\n- `git remote add origin <URL>` — 告诉 Git\"远程仓库的地址在这里\"，给它起个名叫 `origin`\n- `git branch -M main` — 把当前分支命名为 `main`\n- `git push -u origin main` — 把本地的 `main` 分支推送到远程的 `origin`\n\n之后每次有新的 commit，只需要：\n```bash\ngit push\n```\n\n刷新 GitHub 页面，你的代码就出现在网上了！🎉" },
  { type: 'task', title: "🎯 你的任务 ✨", content: "1. 在 GitHub 上注册账号（如果还没有）\n\n2. 创建一个名为 `music-collection` 的公开仓库\n\n3. 按照 GitHub 提供的命令，把本地项目推送到远程\n\n4. 刷新 GitHub 页面，确认代码已经上传\n\n5. 在本地修改 `App.vue`，commit，然后 `git push`，刷新 GitHub 看更新\n\n> 🎉 你刚刚完成了第一次 git push！从现在开始，你的代码有了\"云端备份\"，再也不用担心电脑坏了代码丢失。" },
  { type: 'hint', title: "💡 常见问题", content: "- **\"Permission denied\"** → 需要配置 SSH Key 或使用 Personal Access Token。初学者推荐用 HTTPS + Token（GitHub 登录后会自动生成）。\n- **首次 push 时提示登录** → 在弹出的窗口中用 GitHub 账号登录即可。\n- **push 被拒绝？** → 如果创建仓库时勾选了 README，需要先 `git pull origin main --allow-unrelated-histories`。\n- **仓库名和文件夹名不一致没关系** — Git 只看 remote URL，不关心文件夹叫什么。" }
]

const analogy = "到目前为止，你的乐谱（代码）只存在于自己的电脑上。**GitHub 就像是把乐谱出版发行**——你的作品有了一个公开的地址，别人可以看到、使用、甚至贡献。它也是程序员界的\"LinkedIn\"——你的 GitHub 主页就是你的技术名片。"

const listen = "马勒《第八交响曲\"千人\"》— 这部作品需要超过一千名表演者。没有任何一个乐团能独自完成——它需要多个合唱团、独唱家、乐团的**协作**。GitHub 让全球开发者以同样的方式协作：每个人贡献自己的一部分。"
</script>

<template>
  <div class="content-panel">
    <div class="content-header">
      <span class="lesson-number">第七章：工程入门 · 第 9 课</span>
      <h2 class="lesson-title">GitHub — 把你的作品"发布到音乐厅"</h2>
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

<script setup lang="ts">
import type { Lesson } from '../../../types'
import { parseContent, parseInline } from '../../../utils/markdown'

defineProps<{ lessonMeta: Lesson }>()
defineEmits<{ complete: [] }>()

const sections = [
  { type: 'explain', title: "你已经学会了很多！", content: "回顾一下你学过的所有 HTML 标签：\n\n| 标签 | 用途 |\n|------|------|\n| `<h1>`~`<h4>` | 标题 |\n| `<p>` | 段落 |\n| `<strong>`, `<em>`, `<br>` | 强调与换行 |\n| `<ul>`, `<ol>`, `<li>` | 列表 |\n| `<img>`, `<a>` | 图片与链接 |\n| `<div>`, `<span>` | 容器与行内标记 |\n| `<header>`, `<main>`, `<section>`, `<footer>` | 语义化结构 |\n| `<table>`, `<tr>`, `<th>`, `<td>` | 表格 |\n\n现在，把这些知识组合起来，做一张属于你自己的\"个人音乐主页\"！" },
  { type: 'task', title: "🎯 逐步构建你的主页 ✨", content: "编辑器里已经有了一个模板。请按以下步骤完善它：\n\n**第一步：修改标题和介绍**\n- 把 `<header>` 中的标题改成\"XXX的音乐主页\"（XXX 是你的名字）\n- 修改 `<nav>` 中的导航项目\n\n**第二步：修改\"关于我\"**\n- 在\"关于我\"区域的 `<p>` 中写下你的音乐故事\n- 可以换一张你喜欢的音乐家图片（修改 `src`）\n\n**第三步：丰富音乐收藏**\n- 在列表中替换成你喜欢的作曲家或曲目\n- 在表格中添加你真正喜欢的音乐数据\n\n**第四步：添加你自己的内容**\n- 挑战：在 `<main>` 中新增一个 `<section>`，内容自定\n- 可以是一段推荐曲目、一个聆听列表、或任何你想展示的内容" },
  { type: 'hint', title: "💡 别忘了这些要点", content: "- 标签要**成对**使用，有开就有合（`<img>` 除外）\n- 嵌套关系要清晰：`<ul>` 里放 `<li>`，`<table>` 里放 `<tr>` 再放 `<td>`\n- 语义化标签让页面结构清晰：`header` → `main` → `section` → `footer`\n- 完成之后，这就是你的**第一章毕业作品**！🎉" }
]

const analogy = "一场完整的音乐会需要节目单（列表）、演奏者介绍（标题/段落）、演出照片（图片）、曲目链接（链接）、舞台分区（div/span）、声部标注（语义化标签）、曲目表（表格）。现在把这些元素组合起来，就像指挥把各个声部合成一部完整的交响乐。"

const listen = "贝多芬《第九交响曲》\"合唱\"第四乐章 — 一部交响曲的终章，人声与乐队完美融合，所有元素汇聚成壮丽的音乐大厦，就像你即将完成的个人主页。"
</script>

<template>
  <div class="content-panel">
    <div class="content-header">
      <span class="lesson-number">第一章：HTML 基础 · 第 12 课</span>
      <h2 class="lesson-title">综合项目 — 制作你的个人音乐主页</h2>
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

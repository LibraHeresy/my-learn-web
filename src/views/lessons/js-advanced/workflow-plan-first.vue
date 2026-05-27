<script setup lang="ts">
import type { Lesson } from '../../../types'
import { parseContent, parseInline } from '../../../utils/markdown'

defineProps<{ lessonMeta: Lesson }>()
defineEmits<{ complete: [] }>()

const sections = [
  { type: 'explain', title: "注释是你的\"排练笔记\"", content: "HTML 注释用 `<!-- 注释内容 -->` 包裹，CSS 注释用 `/* 注释内容 */` 包裹，JS 注释用 `//` 或 `/* */`。\n\n注释不会被浏览器执行——它们只给\"人类\"看，包括未来的你自己！\n\n当你面对一个空白页面时，不要急着写代码。先写注释：\n\n```html\n<!-- 页面分为三个区域：\n  1. 顶部标题区\n  2. 中间卡片列表（3张卡片）\n  3. 底部统计区\n-->\n```\n\n这就像在乐谱上标注：呈示部、展开部、再现部。" },
  { type: 'explain', title: "好的注释写什么？", content: "**写\"意图\"，不写\"操作\"**\n\n❌ 不好的注释（描述你做了什么）：\n`// 把 3 赋给 x`\n`let x = 3;`\n\n✅ 好的注释（解释为什么）：\n`// 页面默认显示 3 张卡片（移动端一屏刚好够）`\n`let cardCount = 3;`\n\n✅ 规划型注释（先画结构，再填空）：\n```html\n<!-- 顶部区：标题 + 副标题 -->\n<header>\n  <h1>我的音乐收藏</h1>\n  <p>记录那些打动我的旋律</p>\n</header>\n\n<!-- 主内容：3 列卡片网格 -->\n<main>\n  <!-- 每张卡片：封面图、曲名、作曲家、时期标签 -->\n</main>\n```" },
  { type: 'task', title: "🎯 动手试试 ✨", content: "编辑器里有一份带规划注释的模板，但代码还没写完。请：\n\n**第一步：** 阅读三组注释，理解页面结构\n\n**第二步：** 在每组注释下方，填入对应的 HTML 标签和 CSS 样式\n\n**第三步：** 在 JS 中也先用注释规划逻辑，再写代码——让顶部大标题点击后变成随机口号\n\n**第四步（挑战）：** 尝试给卡片区也添加注释规划，然后补充内容" }
]

const analogy = "指挥家在排练前一定会先通读总谱，标出曲式结构、调性变化和难点段落。写代码也一样——**先用注释画出\"草图\"，再填入真正的代码**。这就像排练前做案头工作：标注呈示部、展开部、再现部。先看清大局，再动手处理细节。"

const listen = "马勒《第二交响曲》第一乐章 — 长达20分钟的乐章，如果没有清晰的段落标记和结构规划，指挥根本无法驾驭如此庞大的编制。好的规划让复杂变得可控。"
</script>

<template>
  <div class="content-panel">
    <div class="content-header">
      <span class="lesson-number">第五章：JavaScript 进阶 · 第 2 课</span>
      <h2 class="lesson-title">先规划再动手 — 用注释画出你的"乐谱草稿"</h2>
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

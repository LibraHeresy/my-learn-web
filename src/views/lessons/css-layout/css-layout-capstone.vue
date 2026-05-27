<script setup lang="ts">
import type { Lesson } from '../../../types'
import { parseContent, parseInline } from '../../../utils/markdown'

defineProps<{ lessonMeta: Lesson }>()
defineEmits<{ complete: [] }>()

const sections = [
  { type: 'explain', title: "综合运用你学过的布局技巧", content: "这个项目综合使用了前面学过的所有布局技能：\n\n- **Flexbox** — 导航栏、演奏者卡片排列\n- **Grid** — 页面整体结构、节目单网格\n- **Position** — 售票按钮固定在视口右下角\n- **居中** — 标题区域垂直居中\n- **响应式** — 移动端和桌面端两套布局\n\n就像指挥把弦乐、管乐、打击乐协调在一起——每种布局技术各司其职。" },
  { type: 'task', title: "🎯 逐步构建 ✨", content: "编辑器中已经有一个半成品页面。请完成以下任务：\n\n**第一步：完善导航栏**\n- 用 Flexbox 让导航链接水平排列\n- 给当前页链接加 `.active` 样式\n\n**第二步：完善节目单网格**\n- 用 Grid 把曲目列表排成两列（桌面端）\n- 给每个曲目的 `.time` 设置左对齐、`.piece` 设置右对齐\n\n**第三步：演奏者卡片**\n- 用 Flexbox 让三张卡片水平排列并自动换行\n- 给卡片加 hover 上浮效果\n\n**第四步：底部固定按钮**\n- 用 `position: fixed` 让\"购票\"按钮始终在右下角\n\n**第五步：响应式**\n- 在 `@media (max-width: 640px)` 中，把节目单改为单列\n- 把导航栏从横排改为竖排" },
  { type: 'hint', title: "💡 提示", content: "- Grid 结构：`grid-template-columns: 120px 1fr;` 让时间和曲目名宽度不同\n- `position: fixed; bottom: 20px; right: 20px;` 实现右下角浮按钮\n- `flex-wrap: wrap;` 让卡片自动换行\n- 用 `@media` 做断点切换——移动端 `flex-direction: column`、`grid-template-columns: 1fr`" }
]

const analogy = "一场音乐会的海报需要精心布局：标题在顶端（header）、节目单在中央（main content）、赞助商在侧边栏（sidebar）、时间地点在底部（footer）。用 CSS 布局把这些元素安排在合适的位置，就像舞台监督把每个声部安排在正确的位置。"

const listen = "穆索尔斯基《图画展览会》— 每一段音乐描绘一幅画，整部作品就像在画廊中漫步。你的音乐会页面也将引导访客从头到尾浏览内容——标题、节目单、演奏者介绍、购票信息，每个区域各就各位。"
</script>

<template>
  <div class="content-panel">
    <div class="content-header">
      <span class="lesson-number">第三章：CSS 布局 · 第 6 课</span>
      <h2 class="lesson-title">综合项目 — 设计一场音乐会的宣传页</h2>
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

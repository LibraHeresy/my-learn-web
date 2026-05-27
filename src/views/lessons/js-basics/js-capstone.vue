<script setup lang="ts">
import type { Lesson } from '../../../types'
import { parseContent, parseInline } from '../../../utils/markdown'

defineProps<{ lessonMeta: Lesson }>()
defineEmits<{ complete: [] }>()

const sections = [
  { type: 'explain', title: "你学会了什么？", content: "回顾 JavaScript 入门篇你学过的所有技能：\n\n| 技能 | 知识点 |\n|------|--------|\n| 变量 | `let`, `const`, 字符串, 模板字符串 |\n| 函数 | `function`, 参数, `return` |\n| 条件判断 | `if/else`, `===`, `&&`, `> <` |\n| 数组 | `[]`, `.push()`, `.join()`, `.length` |\n| 循环 | `forEach`, `for` |\n| DOM 选择 | `querySelector`, `querySelectorAll` |\n| DOM 操作 | `.textContent`, `.innerHTML`, `createElement`, `.remove()` |\n| 事件 | `addEventListener(\"click\", ...)` |\n| 样式控制 | `.style`, `.classList` |\n| 定时器 | `setInterval`, `setTimeout`, `clearInterval` |\n\n现在把这些知识组合起来，做一个**交互式音乐名片生成器**！" },
  { type: 'task', title: "🎯 逐步构建 ✨", content: "编辑器里已经有了一个模板，包含作曲家数组和基础结构。请按以下步骤完善：\n\n**第一步：理解现有代码**\n- 查看 JS 标签页，理解 `composers` 对象数组的结构\n- 查看 `showGallery()` 函数如何用 `forEach` 循环渲染卡片\n\n**第二步：添加筛选功能**\n- \"全部\"按钮应显示所有作曲家\n- \"浪漫主义\"按钮只显示 `period === \"浪漫主义\"` 的\n- \"巴洛克\"按钮略...（新增一个按钮和逻辑）\n\n**第三步：完善\"添加\"功能**\n- 让\"添加\"按钮真正把新对象 push 到数组中\n- 调用 `showGallery()` 刷新显示\n\n**第四步：增加你自己的创意**\n- 给卡片加 hover 高亮效果\n- 加一个自动播放按钮（用 setInterval 定时切换高亮）\n- 任何你想加的功能！" },
  { type: 'hint', title: "💡 提示", content: "- `composers.filter(function(c) { return c.period === \"浪漫主义\"; })` 可以过滤数组\n- 修改 DOM 后记得重新调用渲染函数\n- 如果卡住了，回顾前几节课的代码示例\n- 完成之后，这就是你的**第四章毕业作品**！🎉" }
]

const analogy = "一场完整的**交响音乐会**需要乐谱（HTML）、演奏法（CSS）和指挥家（JS）三者协作。这节综合课把前 11 节课的知识融合在一起：用变量存储数据、用数组和对象组织信息、用循环批量渲染、用条件判断做决策、用事件和定时器让一切互动起来。"

const listen = "贝多芬《第九交响曲》第四乐章\"欢乐颂\"— 乐队与人声完美融合，所有乐器组协作奏出壮丽的终章，就像 HTML、CSS、JS 合力构建出完整的交互体验。"
</script>

<template>
  <div class="content-panel">
    <div class="content-header">
      <span class="lesson-number">第四章：JavaScript 入门 · 第 15 课</span>
      <h2 class="lesson-title">综合项目 — 交互式音乐名片生成器</h2>
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

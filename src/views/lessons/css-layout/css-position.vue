<script setup lang="ts">
import type { Lesson } from '../../../types'
import { parseContent, parseInline } from '../../../utils/markdown'

defineProps<{ lessonMeta: Lesson }>()
defineEmits<{ complete: [] }>()

const sections = [
  { type: 'explain', title: "static 与 relative", content: "所有元素默认都是 `position: static`（正常文档流，位置由 HTML 顺序决定）。\n\n`position: relative` 让元素可以**相对于自己原来的位置**偏移：\n\n```css\n.box {\n  position: relative;\n  top: 10px;    /* 下移 10px */\n  left: 20px;   /* 右移 20px */\n}\n```\n\n- 元素仍然占据原来的空间（别人不会顶上来）\n- 就像乐团成员在自己的座位上微微调整姿势，不影响旁边的乐手" },
  { type: 'explain', title: "absolute — 脱离文档流", content: "`position: absolute` 让元素脱离正常文档流，相对于**最近的已定位祖先**定位：\n\n```css\n.stage {\n  position: relative;  /* 祖先必须有定位 */\n}\n\n.soloist {\n  position: absolute;\n  top: 20px;\n  right: 30px;\n}\n```\n\n- 元素完全脱离文档流（不占据原来的空间）\n- 用 `top`、`right`、`bottom`、`left` 控制位置\n- 就像**独奏者走出乐团，站在舞台前方的精确位置**" },
  { type: 'explain', title: "fixed 与 sticky", content: "`position: fixed` — 相对于**浏览器窗口**定位，滚动也不动：\n\n```css\n.navbar {\n  position: fixed;\n  top: 0;\n  left: 0;\n  width: 100%;\n  z-index: 100;\n}\n```\n\n`position: sticky` — 滚动到一定阈值后\"粘\"住：\n\n```css\n.header {\n  position: sticky;\n  top: 0;\n}\n```\n\n- `fixed` 像**舞台追光灯**——永远锁定在视野中\n- `sticky` 像**指挥台**——正常流动，但一旦到达顶部就固定\n- `z-index` 控制层叠顺序（数值越大越靠前）" },
  { type: 'example', title: "📝 看例子", content: "下面的代码模拟了一个舞台布局：指挥台（sticky 顶部）、独奏者（absolute 在卡片中央）、乐手（relative 偏移）：\n\n```css\n.stage {\n  position: relative;\n  height: 300px;\n}\n\n.soloist {\n  position: absolute;\n  top: 10px;\n  right: 10px;\n}\n\n.player {\n  position: relative;\n  left: 20px;\n}\n```\n看预览区中元素的位置关系。独奏者始终在卡片右上角！" },
  { type: 'task', title: "🎯 动手试试 ✨", content: "切换到 CSS 标签页，尝试：\n\n1. 把 `.soloist` 的 `top` 改成 `50px`，`right` 改成 `50px`，看它移动到哪里\n2. 把 `.player-shift` 的 `left` 从 `20px` 改成 `60px`，看乐手向右偏移\n3. 试试在 `.badge` 中使用 `position: absolute` 和 `top: -8px; right: -8px`\n4. 在预览区滚动（如果内容够多），观察 sticky 的行为" }
]

const analogy = "定位属性就像**舞台上不同角色的站位规则**：`relative` 像乐团成员，在自己的座位范围内微调；`absolute` 像**独奏者**站在舞台的特定坐标上；`fixed` 像**舞台灯光**，无论观众视角如何都锁定在固定位置；`sticky` 像**指挥台**，滚动到一定位置就固定住。"

const listen = "穆索尔斯基《图画展览会》— \"漫步\"主题在每一段之间出现，画面切换时它始终在那里，就像 `sticky` 元素在滚动中时隐时现。"
</script>

<template>
  <div class="content-panel">
    <div class="content-header">
      <span class="lesson-number">第三章：CSS 布局 · 第 3 课</span>
      <h2 class="lesson-title">Position 定位 — 控制元素的舞台位置</h2>
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

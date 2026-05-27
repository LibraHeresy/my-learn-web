<script setup lang="ts">
import type { Lesson } from '../../../types'
import { parseContent, parseInline } from '../../../utils/markdown'

defineProps<{ lessonMeta: Lesson }>()
defineEmits<{ complete: [] }>()

const sections = [
  { type: 'explain', title: "定义和使用变量", content: "CSS 变量以 `--` 开头，在 `var()` 中引用：\n\n```css\n:root {\n  --main-color: #8B2E2E;\n  --card-bg: #FFFAF2;\n  --spacing: 16px;\n}\n\n.card {\n  color: var(--main-color);\n  background: var(--card-bg);\n  padding: var(--spacing);\n}\n```\n\n- `:root` — 全局作用域（相当于 `<html>`），在这里定义的变量全站可用\n- 变量名大小写敏感：`--mainColor` ≠ `--maincolor`\n- `var(--name, fallback)` — 第二个参数是备用值\n\n想看实际应用？打开 `src/styles/variables.css`——这个网站的每个颜色、间距、字体都定义在那里。" },
  { type: 'explain', title: "局部覆盖与主题切换", content: "变量可以在任意元素上重新定义，子元素继承新值：\n\n```css\n:root {\n  --theme: #8B2E2E;\n}\n\n.card.dark {\n  --theme: #C9A96E;\n  /* 这张卡片内的所有子元素都会用金色主题 */\n}\n```\n\n这就像乐曲中的**转调**——同一段旋律换一个调演奏，感觉完全不同。\n\n**实战优势：**\n- 颜色、间距、圆角全部用变量管理\n- 更换主题只需改一组变量值\n- 修改一个地方，全站自动同步" },
  { type: 'example', title: "📝 看例子", content: "下面的代码在 `:root` 中定义了色彩变量，第二张卡片通过 `.dark` 类覆盖了局部变量值。两张卡片用了**完全相同的样式规则**，只因变量不同而呈现截然不同的风格：\n\n```css\n:root {\n  --card-bg: #FFFAF2;\n  --card-accent: #8B2E2E;\n  --card-sub: #6B5A4E;\n}\n\n.card.dark {\n  --card-bg: #3D2B1F;\n  --card-accent: #C9A96E;\n  --card-sub: #B8A898;\n}\n```\n看预览区——白天与黑夜，同一套规则，两组变量。" },
  { type: 'task', title: "🎯 动手试试 ✨", content: "切换到 CSS 标签页，试试：\n\n1. 修改 `:root` 中的 `--card-accent` 颜色，看两张卡片的变化\n2. 在 `:root` 中新增一个 `--radius: 8px` 变量，让两张卡片用 `var(--radius)` 替代固定的 `border-radius`\n3. 修改 `.card.dark` 中的变量值，创造你自己的暗色主题色板\n4. 挑战：创建第三张卡片，给它一个 `.warm` 类并定义一套暖橙色调变量" }
]

const analogy = "CSS 变量就像乐谱开头的**调号（key signature）**——升 fa 升 do 写一次，全曲所有的 fa 和 do 都跟着自动升。用 `--main-color` 定义一种颜色，全站所有用到它的地方一起改变。这个网站本身就在大量使用 CSS 变量！"

const listen = "巴赫《十二平均律》— 24 个大小调各写一首前奏曲与赋格，每个调性有不同的色彩和性格，就像 CSS 变量为不同的主题定义不同的色板，一键切换整个氛围。"
</script>

<template>
  <div class="content-panel">
    <div class="content-header">
      <span class="lesson-number">第二章：CSS 样式 · 第 9 课</span>
      <h2 class="lesson-title">CSS 变量 — 一次定义，全局共鸣</h2>
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

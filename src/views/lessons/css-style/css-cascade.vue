<script setup lang="ts">
import type { Lesson } from '../../../types'
import { parseContent, parseInline } from '../../../utils/markdown'

defineProps<{ lessonMeta: Lesson }>()
defineEmits<{ complete: [] }>()

const sections = [
  { type: 'explain', title: "三条规则决定谁胜出", content: "多条 CSS 规则都指向同一个元素时，浏览器按以下顺序决定：\n\n**1. 来源与 `!important`**\n- 作者样式 > 用户样式 > 浏览器默认样式\n- `!important` 标记**强行跳过优先级计算**（慎用！）\n\n**2. 选择器权重（Specificity）**\n- **内联 style** = 1000 分\n- **ID 选择器** `#title` = 100 分\n- **类/伪类/属性** `.card`, `:hover` = 10 分\n- **元素/伪元素** `h1`, `::before` = 1 分\n\n**3. 书写顺序**\n- 权重相同时，**后写的覆盖先写的**\n- 就像一部交响曲——最后奏出的主题留在耳中" },
  { type: 'explain', title: "权重计算实例", content: "看这几个例子，理解权重怎么算：\n\n```css\nh1 { color: red; }                     /* 权重: 1 */\n.card h1 { color: blue; }              /* 权重: 10+1=11 */\n#main h1 { color: green; }             /* 权重: 100+1=101 */\n.card h1.title { color: gold; }        /* 权重: 10+1+10=21 */\n```\n\n`.card h1` 会覆盖 `h1`，因为 11 > 1。\n`#main h1` 会覆盖所有上面三个，因为 101 最高。\n\n```css\n/* 权重相同 */\n.card h1 { color: red; }\n.card h1 { color: blue; }  /* ← 这条胜利！（后写） */\n```\n\n提示：用浏览器 DevTools（F12）可以看到被\"划掉\"的失效样式——被谁覆盖了，一目了然。" },
  { type: 'explain', title: "!important — 紧急按钮，慎用！", content: "`!important` 写在属性值后面，会让这条声明**无视权重直接生效**：\n\n```css\nh1 {\n  color: #8B2E2E !important;\n}\n\n/* 即使其他规则权重更高也会被覆盖 */\n```\n\n**为什么要慎用？**\n`!important` 就像在交响乐中加入电吉他——它能占据主导，但**破坏了正常的层叠逻辑**。一旦用了第一次，很快就需要用更多 `!important` 去覆盖之前的 `!important`，最后变得无法维护。\n\n**只有两种情况应该用：**\n1. 覆盖你无法控制的第三方样式（如 UI 库）\n2. 工具类（如 `.hidden` 必须隐藏元素）" },
  { type: 'example', title: "📝 看例子", content: "下面的代码故意写了冲突的规则，感受层叠效果：\n\n```css\n/* 规则 1：权重 1 */\np { color: gray; }\n\n/* 规则 2：权重 11 —— 会覆盖规则 1 */\n.card p { color: #3D2B1F; }\n\n/* 规则 3：权重 21 —— 会覆盖规则 2 */\n.card p.highlight { color: #8B2E2E; }\n\n/* 规则 4：权重 101 —— 无人能敌 */\n#special { color: #C9A96E; }\n```\n\n在预览区看第三条卡片的文字颜色——ID 选择器的金色覆盖了所有其他。" },
  { type: 'task', title: "🎯 动手试试 ✨", content: "切换到 CSS 标签页，试试：\n\n1. 去掉 `#special` 的 color 样式，看第三条文字变成什么颜色\n2. 给 `.card p.highlight` 的 color 加 `!important`，看效果\n3. 在 DevTools（F12）中查看元素的 Computed 样式，观察被划掉的规则\n4. 挑战：增加一条 `body .card p` 规则（权重 12），写一个颜色的 color，观察谁能赢" }
]

const analogy = "CSS 的\"C\"代表 **Cascading**（层叠）。当指挥给木管组一个整体指示、同时又给长笛手一个特别指示时，长笛手听谁？当然是**更具体的那个**。CSS 也一样——当多个规则都指向同一个元素时，浏览器按照一套\"乐谱排演规则\"来决定谁生效：编号越精确的规则优先级越高。"

const listen = "柴可夫斯基《1812 序曲》— 开头弦乐的祈祷、中间骑兵冲锋的马赛曲、结尾钟声与加农炮的巨响。不同乐器在不同时刻占据前景——CSS 层叠也是如此，具体的选择器在关键时刻\"压过\"通用规则，形成视觉焦点。"
</script>

<template>
  <div class="content-panel">
    <div class="content-header">
      <span class="lesson-number">第二章：CSS 样式 · 第 6 课</span>
      <h2 class="lesson-title">层叠与优先级 — 当多个规则"打架"时谁说了算？</h2>
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

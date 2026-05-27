<script setup lang="ts">
import type { Lesson } from '../../../types'
import { parseContent, parseInline } from '../../../utils/markdown'

defineProps<{ lessonMeta: Lesson }>()
defineEmits<{ complete: [] }>()

const sections = [
  { type: 'explain', title: "transition — 平滑过渡", content: "`transition` 让属性变化变得平滑，而不是瞬间跳变：\n\n```css\n.card {\n  background: #FFFAF2;\n  transition: all 0.3s ease;\n}\n\n.card:hover {\n  background: #8B2E2E;\n  color: #fff;\n  transform: scale(1.05);\n}\n```\n\n- `all` — 所有属性都过渡\n- `0.3s` — 过渡耗时 0.3 秒\n- `ease` — 缓动函数（开始快，结束慢）\n\n就像渐强记号把音量从一个等级平滑带到另一个等级。" },
  { type: 'explain', title: "transform — 变换形态", content: "`transform` 可以改变元素的形状和位置，配合 `transition` 效果最佳：\n\n- `translateY(-4px)` — 向上移动 4px\n- `scale(1.1)` — 放大到 1.1 倍\n- `rotate(5deg)` — 旋转 5 度\n\n```css\n.card:hover {\n  transform: translateY(-4px) scale(1.02);\n}\n```\n\n多个变换用空格分隔即可。就像演奏者身体微微前倾（位移）+ 音量加大（缩放）来表现渐强！" },
  { type: 'explain', title: "@keyframes — 关键帧动画", content: "`@keyframes` 可以定义更复杂的、自动播放的动画：\n\n```css\n@keyframes pulse {\n  0%   { opacity: 1; transform: scale(1); }\n  50%  { opacity: 0.6; transform: scale(1.05); }\n  100% { opacity: 1; transform: scale(1); }\n}\n\n.card {\n  animation: pulse 2s ease-in-out infinite;\n}\n```\n\n- `pulse` — 动画名称（自己命名）\n- `2s` — 一个周期 2 秒\n- `ease-in-out` — 缓入缓出\n- `infinite` — 无限循环\n\n就像一个持续重复的节奏型——鼓手打的固定节拍！" },
  { type: 'example', title: "📝 看例子", content: "下面的代码展示了三种动画效果。鼠标悬停在前两张卡片上看过渡效果，第三张是自动播放的脉动动画：\n\n```css\n.fade-card { transition: all 0.3s ease; }\n.fade-card:hover {\n  background: #8B2E2E;\n  color: #fff;\n  transform: scale(1.05);\n}\n\n.bounce-card:hover {\n  animation: bounce 0.6s ease;\n}\n\n@keyframes bounce {\n  0%, 100% { transform: translateY(0); }\n  50% { transform: translateY(-10px); }\n}\n```\n切换到预览区，把鼠标移到卡片上试试！" },
  { type: 'task', title: "🎯 动手试试 ✨", content: "切换到 CSS 标签页，试试：\n\n1. 把 `.fade-card` 的 `transition` 时间改成 `1s`，看过渡变慢\n2. 修改 `@keyframes bounce` 中的 `-10px` 改成 `-20px`，让跳动更大\n3. 调整 `.auto-pulse` 的 `animation` 中 `2s` 改成 `0.5s`，让脉动更快\n4. 挑战：新建一个 `@keyframes spin`，用 `rotate` 做一个旋转动画" }
]

const analogy = "动画就像音乐中的**渐强渐弱**（crescendo/diminuendo）——让变化平滑而自然。`transition` 像渐强记号，从 pp 到 ff 缓缓过渡；`@keyframes` 像精确的 **rubato**（弹性速度），自定义每个时间点的状态。"

const listen = "拉威尔《波莱罗》— 从极弱到极强，配器层层叠加，持续 15 分钟的渐强，完美诠释了\"过渡\"的艺术。"
</script>

<template>
  <div class="content-panel">
    <div class="content-header">
      <span class="lesson-number">第二章：CSS 样式 · 第 7 课</span>
      <h2 class="lesson-title">过渡与动画 — 让页面流动起来</h2>
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

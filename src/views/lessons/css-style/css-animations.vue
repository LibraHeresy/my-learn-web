<script setup lang="ts">
import type { Lesson } from '../../../types'
import { parseContent, parseInline } from '../../../utils/markdown'

defineProps<{ lessonMeta: Lesson }>()
defineEmits<{ complete: [] }>()

const sections = [
  { type: 'explain', title: "@keyframes — 定义动画的\"节奏型\"", content: "还记得 transition 吗？它只能在两个状态之间平滑过渡（比如 hover 前 → hover 后）。@keyframes 让你定义**任意多个关键帧**，创建更复杂的动画：\n\n```css\n@keyframes swing {\n  0%   { transform: rotate(0deg); }\n  25%  { transform: rotate(5deg); }\n  50%  { transform: rotate(0deg); }\n  75%  { transform: rotate(-5deg); }\n  100% { transform: rotate(0deg); }\n}\n```\n\n- 百分比代表动画的进度（0% = 开始，100% = 结束）\n- 也可以用 from（= 0%）和 to（= 100%）\n- 每个关键帧可以定义任意多个 CSS 属性\n\n就像乐谱中精确标注了每个小节的力度和表情记号——你掌控着动画的每一帧。" },
  { type: 'explain', title: "animation 属性 — 演奏法标记全解", content: "定义好 @keyframes 后，用 animation 属性把它应用到元素上。它是 8 个子属性的简写：\n\n```css\n.card {\n  animation:\n    swing          /* animation-name: 用哪个关键帧 */\n    2s             /* animation-duration: 一个周期多长时间 */\n    ease-in-out    /* animation-timing-function: 缓动函数 */\n    1s             /* animation-delay: 等多久再开始 */\n    3              /* animation-iteration-count: 重复几次，infinite = 无限 */\n    alternate      /* animation-direction: 正放还是倒放 */\n    forwards       /* animation-fill-mode: 结束后保持哪个状态 */\n    running;       /* animation-play-state: running 或 paused */\n}\n```\n\n**常用 timing-function：**\n- ease — 慢→快→慢（默认）\n- linear — 匀速\n- ease-in — 慢→快\n- ease-out — 快→慢\n- cubic-bezier(n,n,n,n) — 自定义曲线\n\n**fill-mode 关键值：**\n- none — 结束后回到初始状态\n- forwards — 结束后保持在最后一帧\n- backwards — 开始前就取第一帧状态\n- both — 同时应用 forwards + backwards" },
  { type: 'explain', title: "transform 进阶 — 变形、旋转与 3D", content: "transform 不止能用在 transition 中，配合 @keyframes 效果更丰富：\n\n```css\n/* 2D 变换 */\ntransform: translateX(100px);    /* 水平移动 */\ntransform: translateY(-20px);    /* 垂直移动 */\ntransform: scale(1.2);           /* 放大到 1.2 倍 */\ntransform: rotate(45deg);        /* 顺时针旋转 45° */\ntransform: skewX(10deg);         /* 水平倾斜 */\n\n/* 组合变换（空格分隔，顺序很重要！） */\ntransform: translateX(100px) rotate(45deg) scale(1.1);\n\n/* 设置旋转中心点 */\ntransform-origin: center center;  /* 默认是元素中心 */\ntransform-origin: top left;       /* 改为左上角 */\n```\n\n3D 变换（需要 perspective 才能看到深度效果）：\n```css\n.container {\n  perspective: 600px;  /* 透视距离——越小越夸张 */\n}\n.card {\n  transform: rotateY(30deg);   /* 绕 Y 轴旋转 */\n  transform: rotateX(15deg);   /* 绕 X 轴翻转 */\n}\n```\n\n就像指挥要求小提琴组不只拉动琴弓（translate），还要微微转动琴身（rotate）来控制音色。" },
  { type: 'example', title: "📝 看例子", content: "下面的代码展示了三种经典动画效果：\n\n```css\n/* 摇摆——像节拍器 */\n@keyframes swing {\n  0%, 100% { transform: rotate(-3deg); }\n  50% { transform: rotate(3deg); }\n}\n\n/* 淡入上浮——像幕布升起 */\n@keyframes fadeInUp {\n  from {\n    opacity: 0;\n    transform: translateY(30px);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0);\n  }\n}\n\n/* 心跳——缩放+透明度脉动 */\n@keyframes heartbeat {\n  0%, 100% { transform: scale(1); }\n  15% { transform: scale(1.15); }\n  30% { transform: scale(1); }\n  45% { transform: scale(1.1); }\n  60% { transform: scale(1); }\n}\n```\n\n看预览区——三张卡片各自执行不同的动画，播放/暂停按钮可以控制动画状态。" },
  { type: 'task', title: "🎯 动手试试 ✨", content: "切换到 CSS 标签页，试试：\n\n1. 把 swing 动画的 rotate 角度从 3deg 改成 8deg，看摇摆幅度变大\n2. 修改 fadeInUp 的 translateY 从 30px 改成 60px——漂移更明显\n3. 给 heartbeat 的 animation-duration 从 1.5s 改成 0.8s——心跳更快\n4. 挑战：用 @keyframes 写一个唱片旋转动画（rotate + infinite + linear）\n5. 挑战：把 fadeInUp 动画的 fill-mode 改成 forwards 和 none，分别观察结束后的状态" }
]

const analogy = "如果说 transition 是渐强记号（从 pp 平滑到 ff），那么 @keyframes 就是一段完整的节奏型——精确控制每个时间点的状态。animation 属性像乐谱上的演奏法标记：duration 是速度、delay 是休止符的长短、iteration-count 是反复次数、direction 是顺奏还是逆行。把多种动画组合起来，就像配器——让不同乐器的声部同时进行。"

const listen = "斯特拉文斯基《春之祭》— 复杂的节奏型、不规则的拍号、多个声部的交错进行，就像页面中同时运行的多个 @keyframes 动画。每一个拍点都精确计算，却产生了震撼人心的效果。"
</script>

<template>
  <div class="content-panel">
    <div class="content-header">
      <span class="lesson-number">第二章：CSS 样式 · 第 8 课</span>
      <h2 class="lesson-title">CSS 动画深入 — 让页面充满律动</h2>
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

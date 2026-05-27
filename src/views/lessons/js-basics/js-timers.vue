<script setup lang="ts">
import type { Lesson } from '../../../types'
import { parseContent, parseInline } from '../../../utils/markdown'

defineProps<{ lessonMeta: Lesson }>()
defineEmits<{ complete: [] }>()

const sections = [
  { type: 'explain', title: "setInterval — 定时重复", content: "`setInterval` 每隔指定毫秒执行一次回调函数：\n\n```js\n// 每 1000 毫秒（1 秒）执行一次\nlet timer = setInterval(function() {\n  count++;\n  display.textContent = count;\n  console.log(\"一秒过去了\");\n}, 1000);\n\n// 停止\nclearInterval(timer);\n```\n\n1000 毫秒 = 1 秒。就像节拍器打在每分钟 60 拍（每拍 1000ms）。" },
  { type: 'explain', title: "setTimeout — 延迟一次", content: "`setTimeout` 等待指定时间后执行**一次**：\n\n```js\n// 3 秒后弹出提示\nsetTimeout(function() {\n  alert(\"3 秒到了！\");\n}, 3000);\n\n// 取消（在还没执行前）\nlet timer = setTimeout(fn, 5000);\nclearTimeout(timer);  // 不执行了\n```\n\n就像乐谱上的延长音记号——在某个音符上停留指定时长，然后继续演奏下一个音符。\n\n`setInterval` 适合：自动轮播、倒计时、节拍器\n`setTimeout` 适合：延迟提示、debounce、定时检查" },
  { type: 'example', title: "📝 看例子", content: "下面的代码实现了一个节拍器：点击\"开始\"按钮，计数器每秒 +1；点击\"暂停\"停止：\n\n```js\nlet count = 0;\nlet timer = null;\n\nfunction startMetronome() {\n  if (timer) return;  // 防止重复启动\n  timer = setInterval(function() {\n    count++;\n    display.textContent = `节拍 ${count}`;\n  }, 1000);\n}\n\nfunction stopMetronome() {\n  clearInterval(timer);\n  timer = null;\n}\n```\n切换到预览区，点击\"开始节拍\"看数字每秒递增。" },
  { type: 'task', title: "🎯 动手试试 ✨", content: "切换到预览区和 JS 标签页，试试：\n\n1. 点击\"开始节拍\"看计数，点\"暂停\"看停止\n2. 把 `setInterval` 的时间从 `1000` 改成 `500`，变成更快的 120bpm\n3. 增加一个 `setTimeout` 实现的\"3 秒后自动停止\"功能\n4. 挑战：让节拍每 4 拍换一个颜色（提示：用 `count % 4 === 0` 判断）" }
]

const analogy = "`setInterval` 就像**节拍器**——设定每分钟 60 拍，它每拍准时触发一次回调函数。`setTimeout` 则像乐谱中的**延长音记号（fermata）**——等一段时间，然后继续演奏。两者结合，你就可以在页面上创造节奏和时序。"

const listen = "菲利普·格拉斯《音乐的十二个部分》— 极简主义音乐用重复的节奏型不断叠加，精确的时间间隔驱动着音乐的推进，就像 setInterval 驱动的自动动画。"
</script>

<template>
  <div class="content-panel">
    <div class="content-header">
      <span class="lesson-number">第四章：JavaScript 入门 · 第 14 课</span>
      <h2 class="lesson-title">定时器 — 让代码跟随节拍</h2>
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

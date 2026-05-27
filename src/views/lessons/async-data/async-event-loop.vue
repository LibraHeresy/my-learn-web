<script setup lang="ts">
import type { Lesson } from '../../../types'
import { parseContent, parseInline } from '../../../utils/markdown'

defineProps<{ lessonMeta: Lesson }>()
defineEmits<{ complete: [] }>()

const sections = [
  { type: 'explain', title: "JavaScript 是\"单线程\"的", content: "JavaScript 一次只能做一件事（单线程），就像你一个人没法同时弹钢琴和拉小提琴。\n\n但浏览器不是只有 JS 引擎——它还有 Web API（定时器、网络请求等）。JS 把耗时任务\"外包\"给 Web API，自己继续执行后面的代码。\n\n任务完成后，Web API 把回调函数放进**任务队列**，Event Loop 检查主线程空闲了，就把队列里的任务取出来执行。\n\n**直观流程：**\n```\n调用栈（主线程） → 遇到异步任务 → 交给 Web API\n                                    ↓\n主线程继续执行        Web API 完成后 → 任务队列\n                                    ↓\n主线程空闲 ← Event Loop 调度 ← 任务队列\n```" },
  { type: 'example', title: "📝 setTimeout 不是\"暂停\"", content: "看这段代码的执行顺序：\n\n```js\nconsole.log('① 开始演奏')\n\nsetTimeout(() => {\n  console.log('③ 定音鼓进入')\n}, 1000)\n\nconsole.log('② 弦乐继续')\n```\n\n输出顺序是：① → ② → ③\n\n即使 `setTimeout` 的延迟是 0，结果也是 ① → ② → ③：\n\n```js\nconsole.log('① 开始')\nsetTimeout(() => console.log('③ 异步回调'), 0)\nconsole.log('② 继续')\n```\n\n因为 `setTimeout` 的回调**一定会等**主线程的同步代码全部执行完才运行。就像指挥不会在小提琴拉到一半时突然让定音鼓插入。" },
  { type: 'example', title: "📝 生活中的类比", content: "你去咖啡店点一杯拿铁：\n\n1. 你点单（同步代码）\n2. 咖啡师开始做咖啡（交给 Web API）\n3. 你拿到取餐号，去旁边等着（JS 继续执行）\n4. 咖啡做好了，叫号（回调进任务队列）\n5. 你去取咖啡（Event Loop 调度执行回调）\n\n你不会站在柜台前干等咖啡师做完——那太浪费时间了。JS 也一样，不会卡住等异步任务。" },
  { type: 'task', title: "🎯 动手试试 ✨", content: "请预测以下代码的输出顺序，然后在编辑器中运行验证：\n\n```js\nconsole.log('A: 序曲')\n\nsetTimeout(() => console.log('C: 第二乐章'), 500)\nsetTimeout(() => console.log('D: 第三乐章'), 0)\n\nconsole.log('B: 第一乐章')\n```\n\n你的预测是什么？实际输出是否一致？想想为什么 D 在 C 之前。\n\n> 💡 **提示**：代码使用 `console.log` 输出结果，请在预览区**右键 → 检查**（或按 F12），切换到 **Console（控制台）** 面板查看输出。" },
  { type: 'hint', title: "💡 理解要点", content: "核心规则：**同步代码优先于异步回调**。即使 `setTimeout(fn, 0)`，`fn` 也要等所有同步代码跑完。因为回调必须先进任务队列，而 Event Loop 只有在调用栈清空后才会去取任务队列里的任务。" }
]

const analogy = "交响乐团的指挥决定了哪个声部何时进入——小提琴先起，然后木管加入，最后铜管收尾。JavaScript 也有一个\"指挥家\"叫 Event Loop（事件循环），它决定了代码的执行顺序：谁先上场，谁等着，谁最后谢幕。"

const listen = "拉威尔《波莱罗》— 同一段旋律在不同乐器间依次传递，每种乐器依次\"异步\"进入，完美诠释了顺序与调度的美感。"
</script>

<template>
  <div class="content-panel">
    <div class="content-header">
      <span class="lesson-number">第六章：异步与数据 · 第 2 课</span>
      <h2 class="lesson-title">事件循环 — JavaScript 的"指挥家"</h2>
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

<script setup lang="ts">
import type { Lesson } from '../../../types'
import { parseContent, parseInline } from '../../../utils/markdown'

defineProps<{ lessonMeta: Lesson }>()
defineEmits<{ complete: [] }>()

const sections = [
  { type: 'explain', title: "为什么需要防抖？", content: "场景：搜索框。用户输入\"贝多芬\"，来数数会触发几次请求：\n\n```\n贝 → 请求1\n贝多 → 请求2\n贝多芬 → 请求3\n```\n\n如果每个字都发 API 请求：\n- 浪费网络资源\n- 服务器压力大\n- 返回顺序可能错乱（后发的请求可能先返回）\n\n**防抖：** 用户停止输入 N 毫秒后，才发一次请求。" },
  { type: 'example', title: "📝 防抖函数实现", content: "防抖的核心：每次触发时清除上一个定时器，重新计时。\n\n```js\nfunction debounce(fn, delay = 300) {\n  let timer = null\n  return function(...args) {\n    clearTimeout(timer)            // 清除上次的定时器\n    timer = setTimeout(() => {     // 重新计时\n      fn.apply(this, args)\n    }, delay)\n  }\n}\n\n// 使用\nconst search = debounce(async (keyword) => {\n  console.log('搜索：', keyword)\n  const result = await api.get(\\`/search?q=\\${keyword}\\`)\n  displayResults(result)\n}, 500)\n\n// 用户在输入框打字\ninput.addEventListener('input', (e) => {\n  search(e.target.value)  // 停止输入 500ms 后才真正搜索\n})\n```" },
  { type: 'example', title: "📝 直观理解", content: "防抖就像等电梯：\n\n- 不断有人按关门键（每次按键触发 debounce）\n- 电梯不会立刻关门（清除之前的定时器）\n- 等最后一个人进来后，过几秒才关门（定时器到期，执行回调）\n\n在搜索场景中，用户连续输入\"贝\"→\"多\"→\"芬\"，每次输入都重置计时器。等用户停止输入 500ms 后，才发送搜索\"贝多芬\"的请求。" },
  { type: 'task', title: "🎯 动手试试 ✨", content: "编辑器中有一个不完整的 `debounce` 函数。请完成：\n\n1. 实现 `debounce(fn, delay)`——利用 `setTimeout` 和 `clearTimeout`\n2. 用你的 debounce 包装 `searchAPI`\n3. 在模拟的快速输入场景中验证：多次快速调用只会执行一次" },
  { type: 'hint', title: "💡 提示", content: "关键两步：\n1. 在返回的函数中 `clearTimeout(timer)` 取消上次的等待\n2. 然后 `timer = setTimeout(() => fn(...args), delay)` 重新开始等待\n\n`timer` 要存在闭包中（外层变量），这样每次调用都能访问到同一个 timer。" }
]

const analogy = "如果指挥每半秒就给乐团一个新指令，乐团会疯掉的。好的指挥一定会等前一个乐句结束再给下一个指示。**防抖（debounce）** 就是这个\"等待稳定再行动\"的智慧——用户在输入框打字时，不要每个字母都发请求，而是等用户停下来再发。"

const listen = "约翰·凯奇《4'33\"》— 这部作品提醒我们，**沉默和等待也是音乐的一部分**。防抖就是在合适的时机\"不做什么\"，这也是一种智慧。"
</script>

<template>
  <div class="content-panel">
    <div class="content-header">
      <span class="lesson-number">第六章：异步与数据 · 第 7 课</span>
      <h2 class="lesson-title">防抖与搜索 — 别让"乐团"累坏了</h2>
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

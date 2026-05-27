<script setup lang="ts">
import type { Lesson } from '../../../types'
import { parseContent, parseInline } from '../../../utils/markdown'

defineProps<{ lessonMeta: Lesson }>()
defineEmits<{ complete: [] }>()

const sections = [
  { type: 'explain', title: "async/await 是什么？", content: "`async/await` 是 Promise 的\"语法糖\"——底层还是 Promise，但写起来像同步代码。\n\n```js\n// Promise 写法\nfunction getMusicInfo() {\n  return fetchUser('小明')\n    .then(user => fetchFavorites(user.id))\n    .then(favs => console.log(favs))\n}\n\n// async/await 写法\nasync function getMusicInfo() {\n  const user = await fetchUser('小明')\n  const favs = await fetchFavorites(user.id)\n  console.log(favs)\n}\n```\n\n`async` 标记函数是异步的，`await` 等待 Promise 的结果。代码从上到下读，逻辑清晰。" },
  { type: 'example', title: "📝 错误处理：try/catch 回归", content: "用 async/await 时，错误处理回到了熟悉的 try/catch：\n\n```js\nasync function loadMusicData() {\n  try {\n    const user = await fetchUser('小明')\n    const favs = await fetchFavorites(user.id)\n    const details = await fetchDetails(favs[0].id)\n    console.log('加载成功：', details)\n  } catch (error) {\n    console.log('加载失败：', error.message)\n    // 可以在这里显示友好的错误提示\n  }\n}\n```\n\n这就是为什么学错误处理（上一章）很重要——async/await 中 try/catch 是最佳实践。" },
  { type: 'example', title: "📝 并行 vs 串行", content: "注意：`await` 是**串行**的（一个接一个等）。如果两个请求互不依赖，应该**并行**：\n\n```js\n// ❌ 串行：总要 2000ms（每个 1000ms）\nconst result1 = await fetchOne()   // 等 1000ms\nconst result2 = await fetchTwo()   // 再等 1000ms\n\n// ✅ 并行：只要 1000ms（同时进行）\nconst [result1, result2] = await Promise.all([\n  fetchOne(),\n  fetchTwo()\n])\n```\n\n`Promise.all()` 就像指挥同时给弦乐和管乐起拍——一起开始，一起等。" },
  { type: 'task', title: "🎯 动手试试 ✨", content: "编辑器中有一个 `delay(ms)` 工具函数和两个模拟 API。请完成 `loadConcert` 函数：\n\n1. 用 `async/await` 写法\n2. 先获取演出信息 `fetchConcert()`\n3. 再根据演出 ID 获取曲目单 `fetchProgram(concertId)`\n4. 用 try/catch 处理可能的错误\n5. 返回完整的 `{ concert, program }` 对象" },
  { type: 'hint', title: "💡 提示", content: "```js\nasync function loadConcert() {\n  try {\n    const concert = await fetchConcert()\n    const program = await fetchProgram(concert.id)\n    return { concert, program }\n  } catch (e) {\n    console.log('加载出错：', e.message)\n    return null\n  }\n}\n```" }
]

const analogy = "Promise 的 `.then()` 链条就像看乐谱上的分谱——你要顺着每个声部找下去。而 async/await 就像看总谱——所有声部一目了然，从上到下顺序阅读，但实际演奏是同时发生的。"

const listen = "莫扎特《费加罗的婚礼》序曲 — 短短 4 分钟，多个主题自然流畅地衔接，听感上浑然一体。async/await 让异步代码也有这种\"行云流水\"的阅读体验。"
</script>

<template>
  <div class="content-panel">
    <div class="content-header">
      <span class="lesson-number">第六章：异步与数据 · 第 4 课</span>
      <h2 class="lesson-title">async/await — 让异步代码"看起来同步"</h2>
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

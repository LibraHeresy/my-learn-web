<script setup lang="ts">
import type { Lesson } from '../../../types'
import { parseContent, parseInline } from '../../../utils/markdown'

defineProps<{ lessonMeta: Lesson }>()
defineEmits<{ complete: [] }>()

const sections = [
  { type: 'explain', title: "回调地狱 → Promise", content: "如果用传统的回调嵌套处理多个异步操作，代码会变成\"金字塔\"：\n\n```js\n// 回调地狱 💀\ngetUser(id, (user) => {\n  getOrders(user.id, (orders) => {\n    getDetails(orders[0].id, (details) => {\n      console.log(details)\n    })\n  })\n})\n```\n\nPromise 用链式调用拉平了结构：\n\n```js\n// Promise 链式调用 ✨\ngetUser(id)\n  .then(user => getOrders(user.id))\n  .then(orders => getDetails(orders[0].id))\n  .then(details => console.log(details))\n  .catch(err => console.log('出错了：', err))\n```\n\n就像从复杂的多声部对位变成了清晰的主旋律加伴奏。" },
  { type: 'example', title: "📝 Promise 的三种状态", content: "一个 Promise 有三种状态：\n\n| 状态 | 含义 | 音乐比喻 |\n|------|------|----------|\n| pending | 等待结果 | 乐团正在调音，还没开始 |\n| fulfilled | 成功完成 | 演奏完美落幕，掌声响起 |\n| rejected | 失败了 | 小提琴断弦，需要调整 |\n\n```js\nconst ticket = new Promise((resolve, reject) => {\n  const available = Math.random() > 0.3  // 70% 概率有票\n  setTimeout(() => {\n    if (available) {\n      resolve('🎫 订票成功！座位号：A-12')\n    } else {\n      reject('😞 抱歉，已售罄')\n    }\n  }, 1000)\n})\n\nticket\n  .then(msg => console.log(msg))   // 成功走这里\n  .catch(err => console.log(err))  // 失败走这里\n```" },
  { type: 'example', title: "📝 .then() 的链式传递", content: "`.then()` 每次都返回一个新的 Promise，所以可以一直 `.then()` 下去——就像多米诺骨牌。\n\n```js\nfetchUserId('小明')\n  .then(id => fetchUserInfo(id))      // 返回新 Promise\n  .then(info => fetchFavorites(info))  // 再返回新 Promise\n  .then(favs => console.log('喜欢的曲子：', favs))\n  .catch(err => console.log('某一步失败了：', err))\n```\n\n关键点：`.catch()` 会捕获链上**任何一步**的错误。就像一张安全网——不管哪个环节出问题，都能兜住。" },
  { type: 'task', title: "🎯 动手试试 ✨", content: "编辑器中有一个模拟的 `searchMusic(keyword)` 函数。请完成：\n\n1. 调用 `searchMusic('月光')` 返回一个 Promise\n2. 用 `.then()` 处理成功结果\n3. 用 `.catch()` 处理错误\n4. 链式调用：搜索\"月光\"→ 拿到结果后搜索\"贝多芬\"（返回新的 Promise）" },
  { type: 'hint', title: "💡 提示", content: "```js\nsearchMusic('月光')\n  .then(result => {\n    console.log('第一次搜索：', result)\n    return searchMusic('贝多芬')  // 返回新的 Promise\n  })\n  .then(result => console.log('第二次搜索：', result))\n  .catch(err => console.log('搜索失败：', err))\n```" }
]

const analogy = "你预订了一张音乐会门票——你拿到了一个\"承诺\"（Promise）。这个承诺可能兑现（拿到票），也可能落空（售罄）。在结果出来之前，你可以继续做其他事。Promise 就是 JavaScript 给异步操作的结果打的\"包票\"。"

const listen = "舒伯特《未完成交响曲》— 这部作品只有两个乐章，却\"完成\"了震撼人心的表达。Promise 也有三种状态——进行中（pending）、兑现（fulfilled）、拒绝（rejected），每一种都是合理的。"
</script>

<template>
  <div class="content-panel">
    <div class="content-header">
      <span class="lesson-number">第六章：异步与数据 · 第 3 课</span>
      <h2 class="lesson-title">Promise — 给异步操作一个"承诺"</h2>
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

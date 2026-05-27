<script setup lang="ts">
import type { Lesson } from '../../../types'
import { parseContent, parseInline } from '../../../utils/markdown'

defineProps<{ lessonMeta: Lesson }>()
defineEmits<{ complete: [] }>()

const sections = [
  { type: 'explain', title: "什么是 HTTP 请求？", content: "每次你打开网页，浏览器都在发 HTTP 请求：\n\n- **GET**：获取数据（\"请给我这份乐谱\"）\n- **POST**：提交数据（\"这是我新写的曲子，请保存\"）\n- **PUT/PATCH**：更新数据（\"修改第三小节的音符\"）\n- **DELETE**：删除数据（\"删掉这首练习曲\"）\n\n`fetch()` 是浏览器内置的函数，用来发送这些请求。它返回一个 Promise，所以可以和 async/await 配合使用。" },
  { type: 'example', title: "📝 你的第一个 fetch", content: "```js\n// GET 请求：获取数据\nasync function getPieces() {\n  const response = await fetch('https://api.example.com/pieces')\n  if (!response.ok) {\n    throw new Error('请求失败：' + response.status)\n  }\n  const data = await response.json()  // 把 JSON 转成 JS 对象\n  console.log('获取到的曲目：', data)\n  return data\n}\n```\n\n**两个 await：** 第一个等网络响应，第二个等 JSON 解析。\n\n就像你先收到一个包裹（response），然后拆开包裹看里面的内容（.json()）。" },
  { type: 'example', title: "📝 POST 请求：发送数据", content: "```js\nasync function addPiece(piece) {\n  const response = await fetch('https://api.example.com/pieces', {\n    method: 'POST',\n    headers: {\n      'Content-Type': 'application/json'\n    },\n    body: JSON.stringify(piece)  // JS 对象 → JSON 字符串\n  })\n  if (!response.ok) throw new Error('添加失败')\n  const newPiece = await response.json()\n  console.log('新增成功：', newPiece)\n}\n\n// 使用\naddPiece({ name: '雨滴', composer: '肖邦', period: '浪漫主义' })\n```\n\nPOST 类似寄信——你需要写地址（URL）、贴邮票（headers）、装信封（body）。" },
  { type: 'example', title: "📝 HTTP 状态码 — 服务器的\"回应\"", content: "服务器会返回一个状态码，告诉请求的结果：\n\n| 状态码 | 含义 | 比喻 |\n|--------|------|------|\n| 200 | OK | 演奏完美落幕 |\n| 201 | Created | 新曲子诞生 |\n| 404 | Not Found | 乐谱找不到了 |\n| 500 | Server Error | 乐团出状况了 |\n\n`response.ok` 在状态码 200-299 时为 true，否则为 false。拿到 response 后应该先检查 `ok`。" },
  { type: 'task', title: "🎯 动手试试 ✨", content: "编辑器中有一个公开的测试 API。请完成 `getPosts` 函数：\n\n1. 用 `fetch` 请求 `https://jsonplaceholder.typicode.com/posts`\n2. 检查 `response.ok`，失败则抛出错误\n3. 用 `response.json()` 解析数据\n4. 只返回前 3 条数据\n\n> 这是一个免费的测试 API，你可以真实地发送请求！" },
  { type: 'hint', title: "💡 提示", content: "记得：`fetch` 需要 await，`response.json()` 也需要 await。别忘了用 try/catch 包裹。" }
]

const analogy = "至此你的音乐都在自己的琴房里。现在，打开窗户——听听外面的音乐，或者把你的琴声传出去。**fetch()** 就是这扇窗户：让 JavaScript 能和互联网上的服务器\"对话\"。"

const listen = "贝多芬《第五交响曲》第一乐章 — 那著名的\"命运敲门声\"，短短四个音就传递了强大的信息。fetch 请求也如此：一个简单的 GET 请求，就能带回丰富的数据。"
</script>

<template>
  <div class="content-panel">
    <div class="content-header">
      <span class="lesson-number">第六章：异步与数据 · 第 5 课</span>
      <h2 class="lesson-title">fetch — 与"外面的世界"对话</h2>
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

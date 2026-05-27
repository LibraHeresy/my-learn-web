<script setup lang="ts">
import type { Lesson } from '../../../types'
import { parseContent, parseInline } from '../../../utils/markdown'

defineProps<{ lessonMeta: Lesson }>()
defineEmits<{ complete: [] }>()

const sections = [
  { type: 'explain', title: "什么会出错？", content: "在之前的学习中，你可能遇到过这些情况：\n\n- 点击按钮没反应（JS 报错了，后面的代码不执行）\n- 页面白屏（一个错误导致整个脚本崩溃）\n- 数据加载失败（网络问题、API 挂了）\n\n就像一个乐团的定音鼓手突然缺席，指挥需要有后备方案。程序中，我们用 **try/catch** 来应对。" },
  { type: 'example', title: "📝 try/catch — \"排练一下，看看会不会出错\"", content: "基本结构：\n\n```js\ntry {\n  // 尝试执行可能有风险的代码\n  const data = JSON.parse(userInput)\n  console.log('解析成功：', data)\n} catch (error) {\n  // 如果出错，在这里处理\n  console.log('解析失败，请输入合法的 JSON')\n  console.log('错误详情：', error.message)\n}\n```\n\n**try** 说\"试试这段代码\"。**catch** 说\"如果出错了，执行这段\"。\n\n就像排练时你标记出可能出错的地方，想好补救方案。" },
  { type: 'example', title: "📝 throw — 主动\"喊停\"", content: "有时候你需要主动抛出错误：\n\n```js\nfunction setVolume(level) {\n  if (level < 0 || level > 100) {\n    throw new Error('音量必须在 0-100 之间')\n  }\n  console.log('音量设置为：' + level)\n}\n\ntry {\n  setVolume(150)  // 这会触发错误\n} catch (e) {\n  console.log('设置失败：' + e.message)\n}\n```\n\n`throw` 就像指挥突然停下乐队：\"不对，长号声音太大了！\"——主动发现并指出问题。" },
  { type: 'example', title: "📝 实际场景：localStorage 读取", content: "`localStorage` 读取时经常出错（数据损坏、格式不对）：\n\n```js\nfunction loadCollection() {\n  try {\n    const raw = localStorage.getItem('my-collection')\n    if (!raw) return []  // 没有数据，返回空数组\n    const data = JSON.parse(raw)\n    if (!Array.isArray(data)) throw new Error('数据格式错误')\n    return data\n  } catch (e) {\n    console.log('读取收藏失败，已重置：', e.message)\n    return []  // 出错就返回空数组，程序不崩溃\n  }\n}\n```\n\n这就是\"防御性编程\"——假设任何可能出错的地方都会出错，提前做好准备。" },
  { type: 'task', title: "🎯 动手试试 ✨", content: "编辑器中有一个不完整的 `safeParse` 函数。请完成以下任务：\n\n1. 用 `try/catch` 包裹 `JSON.parse` 的调用\n2. 如果解析失败，在 catch 中返回 `{ error: true, message: error.message }`\n3. 如果解析成功，返回解析后的对象\n\n测试你的函数：分别传入合法 JSON 和非法 JSON，观察输出。" },
  { type: 'hint', title: "💡 提示", content: "```js\nfunction safeParse(str) {\n  try {\n    const result = JSON.parse(str)\n    return result  // 成功则返回解析结果\n  } catch (e) {\n    return { error: true, message: e.message }  // 失败返回错误对象\n  }\n}\n```" }
]

const analogy = "演奏中难免出错（碰错音、进错拍），好乐手知道如何处理——继续演奏而不是停下来。编程也一样：错误一定会发生，关键是优雅地处理它们，而不是让整个程序\"戛然而止\"。"

const listen = "爵士乐即兴演奏 — 爵士乐手最擅长的就是在\"错误\"中找到新的旋律。一个\"错音\"可以被变成经过音，编程中的错误也可以被优雅地化解。"
</script>

<template>
  <div class="content-panel">
    <div class="content-header">
      <span class="lesson-number">第五章：JavaScript 进阶 · 第 12 课</span>
      <h2 class="lesson-title">错误处理 — 给代码上"保险"</h2>
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

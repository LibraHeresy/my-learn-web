<script setup lang="ts">
import type { Lesson } from '../../../types'
import { parseContent, parseInline } from '../../../utils/markdown'

defineProps<{ lessonMeta: Lesson }>()
defineEmits<{ complete: [] }>()

const sections = [
  { type: 'explain', title: "音频标签", content: "用 `<audio>` 标签可以在网页中嵌入音乐播放器：\n\n```html\n<audio controls src=\"音乐文件地址\">\n  你的浏览器不支持音频播放\n</audio>\n```\n\n- `controls` — 显示播放/暂停/音量控件\n- `src` — 音频文件的地址\n- `autoplay` — 自动播放（浏览器通常会阻止）\n- `loop` — 循环播放\n\n标签中间的文字只在浏览器不支持时显示。" },
  { type: 'explain', title: "音频格式与多音源", content: "不同的浏览器支持不同的音频格式（MP3、OGG、WAV 等）。为了保证所有浏览器都能播放，可以用 `<source>` 标签提供多种格式：\n\n```html\n<audio controls>\n  <source src=\"music.mp3\" type=\"audio/mpeg\">\n  <source src=\"music.ogg\" type=\"audio/ogg\">\n  你的浏览器不支持音频播放\n</audio>\n```\n\n浏览器会从上到下尝试，播放第一个支持的格式。就像准备不同版本的乐谱给不同乐器！" },
  { type: 'explain', title: "视频标签", content: "`<video>` 标签的用法和 `<audio>` 非常相似：\n\n```html\n<video controls width=\"400\" src=\"视频地址\">\n  你的浏览器不支持视频播放\n</video>\n```\n\n- `controls` — 显示播放控件\n- `width` / `height` — 设置播放器尺寸\n- 同样支持 `<source>` 提供多种格式\n\n现在你的网页可以像一个音乐播放器一样工作了！" },
  { type: 'example', title: "📝 看例子", content: "下面的代码创建了一个音频播放器和一个视频播放器。注意两个标签的写法几乎一样：\n\n```html\n<audio controls>\n  <source src=\"https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3\" type=\"audio/mpeg\">\n</audio>\n\n<video controls width=\"320\" src=\"视频地址\"></video>\n```\n预览区现在有了一个可以点击播放的音乐播放器！" },
  { type: 'hint', title: "💡 关于音频链接", content: "免费可用的音频链接不太好找。如果你想用自己的音乐文件，可以把 MP3 文件放在项目 `public/` 目录下，然后用 `<audio controls src=\"/你的文件名.mp3\">` 来播放。" },
  { type: 'task', title: "🎯 动手试试 ✨", content: "请在编辑器中：\n\n1. 点击预览区中的音频播放器，看看能否播放\n2. 给 `<audio>` 标签加上 `loop` 属性，让音乐循环播放\n3. 尝试修改音频的 `src` 地址（可以搜索一个网上可用的 MP3 链接）\n4. 挑战：在 `<audio>` 下面加一个 `<video>` 标签，找一个在线视频链接试试" }
]

const analogy = "这是离音乐最近的一节课！`<audio>` 标签让你的网页**播放音乐**，`<video>` 标签让你的网页**播放视频**。作为音乐学的学生，你会发现这比 `<p>` 和 `<div>` 有趣多了！"

const listen = "这一课不需要推荐——直接在编辑器里放一段你喜欢的音乐吧！用 `<audio>` 标签让它响起来。"
</script>

<template>
  <div class="content-panel">
    <div class="content-header">
      <span class="lesson-number">第一章：HTML 基础 · 第 8 课</span>
      <h2 class="lesson-title">音频与视频 — 让网页发出声音</h2>
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

# Vue 的思维方式 — 从"操作 DOM"到"声明结果"

:::music-analogy
在此之前，你写 JS 操作 DOM 就像逐音给乐手指令："第一小提琴第二拍拉G"。而 Vue 像指挥给总谱——你描述"这里要有弦乐主题"，Vue 负责让弦乐在正确的时间出声。这是从**命令式**到**声明式**的思维转变。
:::

:::explain{title="命令式 vs 声明式"}
**命令式（Imperative）：** 一步步告诉计算机怎么做。
```js
// 纯 JS：操作 DOM
const title = document.createElement('h1')
title.textContent = '你好，音乐世界'
document.getElementById('app').appendChild(title)
```
**声明式（Declarative）：** 描述你想要什么结果。
```vue
<!-- Vue：声明结果 -->
<template>
  <h1>{{ message }}</h1>
</template>
<script setup>
const message = '你好，音乐世界'
</script>
```
命令式像给乐手发微信："左手按G弦第二品，右手拨弦"——高效但不优雅。声明式像给乐手一份乐谱——他知道该做什么，你只管结果。
:::

:::explain{title="Vue 的核心思想"}
Vue 的三个核心理念：
1. **响应式数据：** 数据变了，页面自动更新。你不需要手动 `document.querySelector().textContent = ...`
2. **组件化：** 把页面拆成独立、可复用的组件，像乐团中的不同声部（弦乐组、管乐组、打击乐组）
3. **声明式渲染：** 在模板中描述 UI 应该长什么样，Vue 负责把数据渲染到 DOM
> 💡 你不是在"操作 DOM"，你是在"描述 UI"。Vue 负责中间的一切。
:::

:::example{title="reactivity 的本质"}
Vue 的响应式系统让你专注于数据：
```vue
<script setup>
import { ref } from 'vue'
const count = ref(0)  // 响应式数据
function increment() {
  count.value++  // 修改数据
  // 无需操作 DOM！页面自动更新
}
</script>
<template>
  <p>已点赞 {{ count }} 次</p>
  <button @click="increment">👍 点赞</button>
</template>
```
就像 MIDI 键盘：你按键，声音自动发出。你不用管"怎么发声"——那已经被系统处理好了。你只管演奏。
:::

:::task{title="反思题 🤔"}
::::step{purpose="这不是一个需要动手写代码的练习，而是一次思维转变。在乐理篇你每改一个数据就要手动找到 DOM 元素并更新它——这是命令式编程：一步步告诉计算机做什么。Vue 的声明式思维让你只描述「界面应该长什么样」，框架负责实现。就像从逐音给乐手发指令，变成给他们一份总谱。" expected="你心中清晰地看到：原来需要 10 行 JS 操作的 UI 更新，用 Vue 只需改动一行数据。这就是 Vue 的价值。"}
回顾你在乐理篇和合奏篇中用纯 JS 写的代码（querySelector、innerHTML、appendChild）。闭上眼睛想象：如果数据变了页面自动更新，你能省去多少代码？
::::

:::

:::recap
你学会了 Vue 的思维方式——从命令式（一步步操作 DOM）转向声明式（描述 UI 应该长什么样）。你只管改数据，Vue 自动帮你更新页面，不再需要手动 querySelector、innerHTML、appendChild。
:::

:::listen-to
巴赫《赋格的艺术》— 赋格是一种"声明式"作曲法：你声明一个主题，对位规则自动生成各声部的进入与呼应。Vue 的响应式系统也是如此——声明数据与模板的关系，框架自动处理同步。
:::


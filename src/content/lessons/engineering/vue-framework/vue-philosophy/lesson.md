# Vue 的思维方式 — 从"操作 DOM"到"声明结果"

:::analogy
Vue 的思维方式是从"操作 DOM"变成"声明结果"——就像从"你走到桌前、拿起笔、写下字"变成"把这段话写下来"。你只需要描述最终想要什么，Vue 负责操作 DOM 去实现。
:::

:::explain{title="命令式 vs 声明式"}
**命令式（Imperative）：** 一步步告诉计算机怎么做。
```js
// 纯 JS：操作 DOM
const title = document.createElement('h1')
title.textContent = '你好，世界'
document.getElementById('app').appendChild(title)
```
**声明式（Declarative）：** 描述你想要什么结果。
```vue
<!-- Vue：声明结果 -->
<template>
  <h1>{{ message }}</h1>
</template>
<script setup>
const message = '你好，世界'
</script>
```
命令式像给别人发微信："第一步做A、第二步做B、第三步做C"——高效但不优雅。声明式像给别人一份完整计划书——他知道该做什么，你只管结果。
:::

:::explain{title="Vue 的核心思想"}
Vue 的三个核心理念：
1. **响应式数据：** 数据变了，页面自动更新。你不需要手动 `document.querySelector().textContent = ...`
2. **组件化：** 把页面拆成独立、可复用的组件，像公司里的不同部门（设计部、开发部、测试部）
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
就像智能灯：你按开关，灯自动亮起。你不用管"怎么亮"——那已经被系统处理好了。你只管执行。
:::

:::task{title="反思题 🤔"}
::::step{purpose="这不是一个需要动手写代码的练习，而是一次思维转变。以前你每改一个数据就要手动找到 DOM 元素并更新它——这是命令式编程：一步步告诉计算机做什么。Vue 的声明式思维让你只描述「界面应该长什么样」，框架负责实现。就像从一步步给别人发指令，变成给他们一份完整计划书。" expected="你心中清晰地看到：原来需要 10 行 JS 操作的 UI 更新，用 Vue 只需改动一行数据。这就是 Vue 的价值。"}
回顾你之前用纯 JS 写的代码（querySelector、innerHTML、appendChild）。闭上眼睛想象：如果数据变了页面自动更新，你能省去多少代码？
::::

:::

:::recap
你学会了 Vue 的思维方式——从命令式（一步步操作 DOM）转向声明式（描述 UI 应该长什么样）。你只管改数据，Vue 自动帮你更新页面，不再需要手动 querySelector、innerHTML、appendChild。
:::



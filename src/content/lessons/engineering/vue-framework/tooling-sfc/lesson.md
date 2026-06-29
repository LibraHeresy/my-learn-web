# 单文件组件 — .vue 文件的三段式

:::music-analogy
一份完整的乐器分谱包含三个部分：**乐谱内容**（template，演奏什么）、**演奏标记**（script，怎么演奏——强弱、速度）、**声部说明**（style，这个声部的音色特征）。Vue 的单文件组件（`.vue` 文件）恰好也是三段：`<template>`、`<script setup>`、`<style scoped>`——合在一起，就是一个独立的、可复用的组件。
:::

:::explain{title="这一章你会学什么"}
这一章会带你正式进入 Vue。你会接触：
- 单文件组件
- 响应式数据
- 指令、组件通信、生命周期
- 如何把页面拆成可复用部件

学完这一章，你会从“手动操作 DOM”逐步过渡到“描述 UI 应该长什么样”。
:::

:::explain{title="为什么这章重要"}
Vue 不是在替代 HTML、CSS、JavaScript，而是在帮你更高层次地组织它们。  
在工程语境里，这些概念会反复出现：**组件**、**响应式**、**声明式渲染**、**单文件组件（SFC）**。  
如果前面的工程化章节是搭好舞台，这一章就是开始真正排练一支乐队。
:::

:::hint{title="给刚从原生 JS 过来的你"}
如果你一开始觉得 Vue “像魔法”，这很正常。  
你之前习惯的是手动告诉页面“去改哪里”，而 Vue 更像是先声明结果，再让框架替你处理中间过程。  
这不是放弃理解，而是升级抽象层。
:::

:::explain{title=".vue 文件的三段结构"}
打开 `src/App.vue`，你会看到：
```vue
<script setup>
// 1. 逻辑区 — 数据和函数
import { ref } from 'vue'
const message = ref("你好，Vue！")
</script>
<template>
  <!-- 2. 模板区 — HTML 结构 -->
  <h1>{{ message }}</h1>
</template>
<style scoped>
/* 3. 样式区 — CSS */
h1 {
  color: #8B2E2E;
}
</style>
```
**三段各司其职：**
- `<script setup>` — JavaScript 逻辑（数据、函数、计算属性等）。`setup` 关键词表示使用 Vue 3 的组合式 API 语法
- `<template>` — HTML 模板（你在之前课程学的所有标签和指令都在这里：`{{ }}`、`v-if`、`v-for`、`@click` 等）
- `<style scoped>` — CSS 样式。`scoped` 关键词让这些样式只作用于当前组件，不会影响其他组件
和之前 CDN 方式对比：
**CDN 方式（浏览器内）：**
- JS、HTML、CSS 分在三个独立的编辑区
- HTML 需要一个 `<div id="app">` 作为挂载点
- `createApp({...}).mount("#app")` 手动挂载
**.vue 文件方式（工程化）：**
- 三段写在一个 `.vue` 文件里，一个组件一个文件
- 不需要 `createApp` 和 `mount`——Vite 自动处理
- 组件之间通过 `import` 引入
:::

:::explain{title="组件的引入和使用"}
在工程化项目中，组件就是 `.vue` 文件：
**定义一个组件 `MusicCard.vue`：**
```vue
<script setup>
defineProps(["name", "composer"])
</script>
<template>
  <div class="card">
    <h3>{{ name }}</h3>
    <p>{{ composer }}</p>
  </div>
</template>
<style scoped>
.card {
  border: 1px solid #D4C5A9;
  border-radius: 10px;
  padding: 16px;
}
</style>
```
**在 `App.vue` 中使用：**
```vue
<script setup>
import MusicCard from './components/MusicCard.vue'
</script>
<template>
  <MusicCard name="夜曲 Op.9 No.2" composer="肖邦" />
  <MusicCard name="月光" composer="德彪西" />
</template>
```
注意：组件名在模板中写成 PascalCase（`<MusicCard>`），Vue 会自动识别。
:::

:::task{title="你的任务 ✨"}
::::step{purpose=".vue 文件是 Vue 工程化的基本组织单元。每个组件一个文件，<template>、<script setup>、<style scoped> 三段式让你的代码结构清晰，容易维护。就像乐团中每个声部有自己的分谱——各司其职，互不干扰。" expected="项目中出现 src/components/HelloMusic.vue 文件，内含完整的三段式结构。"}
在 src/components/ 下新建 HelloMusic.vue 文件
::::

::::step{purpose="组件的内容通过 <template> 中的 HTML 和 {{ }} 插值来声明。你描述的是「结果长什么样」，而不是手动操作 DOM。这是声明式编程的核心——你负责描述界面，Vue 负责渲染。" expected="页面上出现你选择的音乐名言文字。"}
在组件中显示一句你最喜欢的音乐名言
::::

::::step{purpose="组件之间通过 ES module 的 import 语法相互引用，这是工程化与 CDN 方式最大的不同。import 后，组件名在模板中自动可用，不需要 components 注册步骤。这让你可以像搭积木一样组合页面。" expected="App.vue 中成功导入 HelloMusic，页面上能看到该组件渲染的内容。"}
在 App.vue 中 import 并使用 <HelloMusic /> 组件
::::

::::step{purpose="<style scoped> 让 CSS 只作用于当前组件，不会「污染」其他组件的样式。这是工程化的核心优势之一——你可以放心地给每个组件写样式，不用担心样式冲突。就像每个声部的排练标记只对该声部生效。" expected="HelloMusic.vue 中的文字有了自定义的字体、颜色和边框样式。"}
给组件添加 scoped 样式（字体、颜色、边框等）
::::

::::step{purpose="去掉 scoped 后，这个组件的 CSS 会变成「全局样式」，影响页面上的所有元素。通过对比，你能直观感受到 scoped 的作用——它在编译时给每个元素加上唯一的 data-v-xxx 属性，实现样式隔离。" expected="去掉 scoped 后，你可能发现 App.vue 中同类型元素的样式也被改变了——这就是样式「泄漏」的效果。"}
把 <style scoped> 改成 <style>（去掉 scoped），观察变化
::::

:::

:::hint{title="文件命名约定"}
组件文件通常使用 PascalCase 命名（首字母大写）：
- ✅ `MusicCard.vue`
- ✅ `HelloMusic.vue`
- ❌ `musicCard.vue`（虽然也能用，但不推荐）
- ❌ `music-card.vue`（同上）
这就像音乐术语用意大利语标记——不是强制规定，但全世界通用的约定。
:::

:::recap
你学会了 .vue 单文件组件的三段式结构——<script setup> 写逻辑，<template> 写结构，<style scoped> 写样式。每个组件一个文件，通过 import 引入使用，scoped 让样式互不干扰。
:::

:::listen-to
维瓦尔第《四季·春》第一乐章 — 弦乐齐奏（template，主体旋律）、独奏小提琴的华彩（script，动态逻辑）、通奏低音的持续伴奏（style，底色与氛围）。三段各司其职，合在一起是一首完美的协奏曲。
:::


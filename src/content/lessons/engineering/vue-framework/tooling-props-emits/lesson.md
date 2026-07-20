# 组件通信 — Props 向下，Emits 向上

:::analogy
Props 向下传数据就像老板给员工派活——父组件把任务交给子组件；Emits 向上传事件就像员工给老板汇报——子组件告诉父组件"我做完了"。数据向下流，事件向上冒。
:::

:::explain{title="Props — 父组件给子组件传数据"}
**子组件 `MusicCard.vue`：**
```vue
<script setup>
// 声明"我需要这些数据"
const props = defineProps({
  name: String,
  composer: String,
  period: String,
  liked: Boolean
})
</script>
<template>
  <div class="card">
    <h3>{{ name }}</h3>
    <p>{{ composer }} · {{ period }}</p>
    <span>{{ liked ? '❤' : '🤍' }}</span>
  </div>
</template>
```
**父组件 `App.vue`：**
```vue
<script setup>
import { ref } from 'vue'
import MusicCard from './components/MusicCard.vue'
const pieces = ref([...])
</script>
<template>
  <MusicCard
    v-for="p in pieces"
    :key="p.id"
    :name="p.name"
    :composer="p.composer"
    :period="p.period"
    :liked="p.liked"
  />
</template>
```
:name="p.name"` 中的冒号 `:` 是 `v-bind:` 的简写——表示传的是 JS 变量而不是字符串。
:::

:::explain{title="Emits — 子组件通知父组件"}
子组件不能直接修改父组件的数据——它只能"通知"父组件：
**子组件 `MusicCard.vue`：**
```vue
<script setup>
const props = defineProps(["name", "composer", "liked"])
// 声明"我会发出这些事件"
const emit = defineEmits(["toggle-like", "delete"])
</script>
<template>
  <div class="card">
    <h3>{{ name }}</h3>
    <button @click="emit('toggle-like')">
      {{ liked ? '❤' : '🤍' }}
    </button>
    <button @click="emit('delete')">✕</button>
  </div>
</template>
```
**父组件 `App.vue`：**
```vue
<template>
  <MusicCard
    v-for="p in pieces"
    :key="p.id"
    :name="p.name"
    :liked="p.liked"
    @toggle-like="p.liked = !p.liked"
    @delete="pieces = pieces.filter(item => item.id !== p.id)"
  />
</template>
```
**数据流总结：**
```
父组件（拥有数据）
  │
  │ Props ↓（传数据）
  │
子组件（接收数据，展示）
  │
  │ Emits ↑（发事件通知）
  │
父组件（收到通知，修改自己的数据）
```
这就是"数据向下，事件向上"——Vue 的核心设计模式。
:::

:::task{title="你的任务 ✨"}
::::step{purpose="Props 是父组件向子组件传递数据的方式。用 defineProps 声明子组件需要的外部数据，Vue 会验证类型并在模板中自动解包。这让你可以像函数参数一样设计组件的输入接口。" expected="MusicCard.vue 文件中有 defineProps 声明，组件可以接收四个属性。"}
创建 MusicCard.vue 组件，接收 name、composer、period、liked 四个 props
::::

::::step{purpose="组件的模板使用接收到的 props 来渲染 UI。{{ name }} 等插值语法在子组件模板中和在父组件中用法完全一致。这展示了组件封装的核心价值：内部实现可以任意复杂，对外只暴露简洁的 props 接口。" expected="卡片上显示名称、设计师名、时期标签和一个收藏按钮。"}
组件中显示卡片布局（曲名、设计师、时期标签、收藏按钮）
::::

::::step{purpose="子组件不能直接修改父组件的数据——这是 Vue 单向数据流的核心规则。defineEmits 声明子组件会触发哪些事件，父组件通过 @toggle-like=\"...\" 监听并处理。数据永远由拥有者（父组件）修改。" expected="点击收藏按钮触发 toggle-like 事件，点击删除按钮触发 delete 事件。"}
添加 toggle-like 和 delete 两个 emit 事件
::::

::::step{purpose="工程化项目中的组件导入通过 ES module 的 import 语法完成。<script setup> 中 import 的组件在模板中自动可用，无需注册步骤。这让你可以像搭积木一样组合页面。" expected="App.vue 中成功导入并使用 <MusicCard> 标签。"}
在 App.vue 中 import 并使用 MusicCard 组件
::::

::::step{purpose="将组件与 v-for 结合，是 Vue 开发中最常见的模式之一。每个循环项通过 props 接收不同的数据，通过 emits 独立地与父组件交互。验证每张卡片的收藏和删除操作都能正确更新父组件的数据。" expected="页面上显示多张项目卡片，点击不同卡片的收藏/删除按钮分别触发对应操作。"}
用 v-for 循环渲染多张卡片，验证 props 传递和事件处理
::::

:::

:::hint{title="TypeScript 风格的 Props 定义"}
`defineProps` 有两种写法：
**数组写法（简单）：**
```js
defineProps(["name", "composer"])
```
**对象写法（带类型，推荐）：**
```js
defineProps({
  name: String,
  count: Number,
  liked: Boolean
})
```
对象写法让使用你组件的人一眼就知道需要传什么数据。
:::

:::recap
你学会了组件通信的核心规则——用 props 把数据从父组件向下传递，用 emits 把事件从子组件向上通知。数据向下，事件向上，这就是 Vue 单向数据流的设计模式。
:::



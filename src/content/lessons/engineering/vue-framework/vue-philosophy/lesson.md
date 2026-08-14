# Vue 的思维方式 — 从"操作 DOM"到"声明结果"

:::analogy
命令式编程就像你一步步告诉出租车司机"前面路口右转、下一个红绿灯左转、第三个路口右转"。声明式编程就像你告诉司机"送我去火车站"，然后闭目养神。Vue 让你从"当司机"变成"当乘客"。
:::

:::explain{title="问题：命令式编程的体力活"}
先看一个最常见的任务：页面上显示一个计数器，点击按钮加一。用原生 JS（命令式）实现：

```js
// HTML: <div id="counter"></div><button id="btn">+1</button>

// 命令式：你必须一步步告诉计算机怎么做

// 第 1 步：找到 DOM 元素
const display = document.getElementById('counter')
const button = document.getElementById('btn')

// 第 2 步：维护状态变量
let count = 0

// 第 3 步：手动初始化显示
display.textContent = count

// 第 4 步：手动绑定事件
button.addEventListener('click', () => {
  // 第 5 步：修改数据
  count++
  // 第 6 步：手动更新 DOM！忘掉这步页面就不动
  display.textContent = count
})
```

这个计数器的核心逻辑只有 `count++` 一行，但为了让它正常工作，你需要写 6 步代码。而且每一步都是互相关联的 -- 如果你在别的地方也修改了 `count`，你必须**记住**在所有修改点都加上 `display.textContent = count`。忘掉一处，Bug 就来了。

当页面有 10 个计数器、5 个表单、3 个列表时，你需要追踪几十个 DOM 元素和数据之间的对应关系。这就是命令式编程的本质问题：**你在管理同步关系，而不是在写业务逻辑。**
:::

:::explain{title="方案：声明式编程 -- 你描述结果，Vue 负责过程"}
同样的计数器，用 Vue（声明式）实现：

```vue
<script setup>
import { ref } from 'vue'

// 第 1 步：定义数据（这是你唯一需要关心的）
const count = ref(0)

// 第 2 步：定义修改数据的函数
function increment() {
  count.value++  // 只改数据，其他什么都不用做
}
</script>

<template>
  <!-- 声明式：只描述"页面应该长什么样" -->
  <p>点击次数：{{ count }}</p>
  <button @click="increment">+1</button>
</template>
```

你只需要做两件事：
1. 定义数据 `count`
2. 定义数据怎么变 `increment()`

**不需要做的事：**
- 不需要 `document.getElementById`
- 不需要 `textContent =`
- 不需要 `addEventListener`
- 不需要记住有多少个地方在显示 `count`

这就是声明式编程：你描述 UI 和数据的关系（"这里显示 count"），Vue 确保两者始终同步。你只关心 **what**（要什么结果），不关心 **how**（怎么做到的）。
:::

:::example{title="实战对比：同一个功能，命令式 vs 声明式"}
**场景：** 一个搜索筛选列表。用户输入关键词，列表实时过滤，同时显示"找到了 X 条结果"。

**命令式（原生 JS）-- 40 行，6 个手动同步点：**
```js
// HTML: <input id="search"><span id="stats"></span><ul id="list"></ul>

const data = [
  { name: '月光', composer: '德彪西' },
  { name: '四季', composer: '维瓦尔第' },
  { name: '夜曲', composer: '肖邦' },
  { name: '春之歌', composer: '门德尔松' },
]

const searchInput = document.getElementById('search')
const statsSpan = document.getElementById('stats')
const listEl = document.getElementById('list')

// 渲染函数 -- 每次数据变化都要手动调用
function render(filtered) {
  // 同步点 1：清空列表
  listEl.innerHTML = ''

  // 同步点 2：遍历数据，创建 DOM
  filtered.forEach(item => {
    const li = document.createElement('li')
    li.textContent = `${item.name} - ${item.composer}`
    listEl.appendChild(li)
  })

  // 同步点 3：更新统计文字
  statsSpan.textContent = `找到了 ${filtered.length} 条结果`
}

// 同步点 4：初始渲染
render(data)

// 同步点 5：监听输入事件
searchInput.addEventListener('input', () => {
  const keyword = searchInput.value.toLowerCase()
  const filtered = keyword
    ? data.filter(d => d.name.includes(keyword) || d.composer.includes(keyword))
    : data
  render(filtered)  // 同步点 6：手动触发渲染
})

// 问题：如果之后要添加新曲目，你在添加逻辑里还要手动调 render()
// 如果忘了调，列表不会更新 -- "幽灵 bug" 的来源
```

**声明式（Vue）-- 20 行，0 个手动同步点：**
```vue
<script setup>
import { ref, computed } from 'vue'

const data = ref([
  { name: '月光', composer: '德彪西' },
  { name: '四季', composer: '维瓦尔第' },
  { name: '夜曲', composer: '肖邦' },
  { name: '春之歌', composer: '门德尔松' },
])

const keyword = ref('')

// 声明"筛选结果 = 根据关键词过滤数据" -- 一个计算规则，不是操作指令
const filtered = computed(() => {
  if (!keyword.value) return data.value
  const kw = keyword.value.toLowerCase()
  return data.value.filter(d =>
    d.name.includes(kw) || d.composer.includes(kw)
  )
})

// 声明"统计 = 筛选结果的数量"
const stats = computed(() => `找到了 ${filtered.value.length} 条结果`)
</script>

<template>
  <!-- 声明：input 的值绑定到 keyword -->
  <input v-model="keyword" placeholder="搜索...">
  <!-- 声明：统计要显示在这里 -->
  <span>{{ stats }}</span>
  <!-- 声明：列表要根据 filtered 来渲染 -->
  <ul>
    <li v-for="item in filtered" :key="item.name">
      {{ item.name }} - {{ item.composer }}
    </li>
  </ul>
</template>
```

Vue 版本的每一行都在描述"是什么"：
- `const filtered = computed(...)` -- "筛选结果是这样算出来的"
- `<li v-for="item in filtered">` -- "列表要根据 filtered 来生成"
- `<span>{{ stats }}</span>` -- "统计文字要显示 stats 的值"

你不需要写任何"怎么更新 DOM"的代码。Vue 自动追踪所有依赖关系，数据一变化，所有相关的地方同时更新。
:::

:::explain{title="Vue 的三个核心思想"}
**1. 响应式数据（Reactivity）**
```vue
<script setup>
const count = ref(0)
function increment() {
  count.value++    // 改数据，页面自动更新 -- 没有 DOM 操作的代码
}
</script>
```
数据就是 UI 的唯一真相来源（Single Source of Truth）。你改变数据，Vue 保证 UI 与数据一致。

**2. 组件化（Component-Based）**
```
App.vue
├── Header.vue
├── Sidebar.vue
├── ContentArea.vue
│   ├── MusicCard.vue
│   ├── MusicCard.vue
│   └── MusicCard.vue
└── Footer.vue
```
把页面拆成独立的组件，每个组件有自己的数据、模板和样式。像公司里的部门 -- 各司其职，互不干扰。

**3. 声明式渲染（Declarative Rendering）**
```html
<template>
  <!-- 这就是声明："这里要显示 count，这里要遍历 list" -->
  <h1>{{ title }}</h1>
  <div v-for="item in list" :key="item.id">{{ item.name }}</div>
</template>
```
你在模板中描述 UI 和数据的关系。Vue 负责把数据渲染到 DOM，并在数据变化时更新。
:::

:::explain{title="常见错误"}
**错误 1：在 Vue 里继续用命令式思维操作 DOM**
```vue
<script setup>
import { ref } from 'vue'

const name = ref('张三')

function updateName() {
  name.value = '李四'

  // ❌ 这是命令式思维！在 Vue 里不需要
  document.querySelector('#name-display').textContent = '李四'
}
</script>

<template>
  <!-- ✅ 只需要把数据绑定到模板，Vue 自动更新 -->
  <p id="name-display">{{ name }}</p>
  <button @click="updateName">改名</button>
</template>
```

**错误 2：数据变了但不用 ref，期望页面自动更新**
```vue
<script setup>
// ❌ 普通变量不是响应式的，改了页面不会更新
let count = 0
function increment() {
  count++     // 数据确实变了，但模板中的 {{ count }} 不会更新
}

// ✅ 用 ref() 包裹，Vue 才能追踪变化
import { ref } from 'vue'
const count = ref(0)
function increment() {
  count.value++    // 改了 .value，模板中的 {{ count }} 自动更新
}
</script>
```

**错误 3：试图手动管理渲染时机**
```js
// ❌ 命令式思维的残余 -- 调用 ref 后还想着"触发更新"
setInterval(() => {
  data.value = newData
  // 不需要再调用任何渲染函数！Vue 已经自动处理了
}, 1000)
```
:::

:::explain{title="实际工作连接"}
声明式编程不仅仅是一种写法选择，它改变了你解决问题的思路：

- **命令式思维**："用户点击了筛选按钮 → 我要找到列表的 DOM 元素 → 清空 → 重新循环数据 → 创建元素 → 追加到 DOM → 还要更新计数显示..."
- **声明式思维**："筛选条件变了，筛选结果就变了，列表和计数自动更新。"

在实际项目中，声明式思维让你专注于**数据流**：
1. 数据从哪里来（API、用户输入、路由参数）
2. 数据经过什么计算（筛选、排序、聚合）
3. 数据最终显示在哪里（模板绑定）

你不再思考"怎么更新 DOM"，而是思考"数据如何流转"。这个思维转变是 Vue 的核心价值 -- 它让你从 DOM 操作员变成应用架构师。
:::

:::task{title="反思题"}
::::step{purpose="这不是一个需要写代码的练习，而是一次思维转变。回顾你之前的原生 JS 代码 -- 每一个 querySelector、innerHTML、appendChild 都是在手动管理数据和 DOM 的同步关系。Vue 的声明式思维把你从这种体力活里解放出来：你只需描述数据和 UI 的对应关系，框架保证它们始终同步。" expected="你心中清晰地看到命令式和声明式的差异：原来需要 10 行 JS 操作的 UI 更新，用 Vue 只需改一行数据。这就是 Vue 存在的根本原因。"}
回顾你之前用纯 JS 写的代码（querySelector、innerHTML、appendChild）。闭上眼睛想象：如果数据变了页面自动更新，你能省去多少重复的 DOM 操作代码？那些"改了数据但忘了更新 DOM"的幽灵 bug 还会出现吗？
::::
:::

:::recap
你学会了 Vue 的思维方式 -- 从命令式（一步步操作 DOM：`querySelector`、`textContent`、`appendChild`）转向声明式（描述 UI 应该长什么样：`{{ data }}`、`v-for`、`v-if`）。你只管改数据，Vue 自动帮你更新 DOM。这个思维转变是 Vue 的核心价值 -- 你从 DOM 操作员变成了应用架构师。
:::

# 组件通信 — Props 向下，Emits 向上

:::analogy
想象一个公司组织架构：CEO（父组件）把任务和数据下发给部门经理（子组件）-- 这是 Props。部门经理完成工作后向 CEO 汇报结果 -- 这是 Emits。数据永远自上而下流动，消息自下而上传递。没有人越级操作别人手里的数据。
:::

:::explain{title="问题：组件之间怎么共享数据？"}
把一个页面拆成多个组件后，自然产生一个问题：组件之间怎么通信？

假设你有 `App.vue`（页面）和 `MusicCard.vue`（卡片），App 里有曲目数据，MusicCard 需要显示这些数据。怎么把数据传过去？

**错误做法：全局变量**
```js
// ❌ 千万别这样做！
// global.js
window.tracks = [...]  // 挂在 window 上，任何组件都能改
// 项目一大，你永远不知道谁在什么时候改了数据，调试噩梦
```

**错误做法：子组件直接改父组件的数据**
```js
// ❌ 子组件不能也不该直接访问父组件的数据
// 这破坏了单向数据流，让数据变化无法追踪
```

正确做法是 Vue 的单向数据流：**Props 向下传数据，Emits 向上传事件。** 父组件是数据的唯一拥有者，子组件只能"接收数据"和"通知父组件"。
:::

:::explain{title="方案：Props -- 父组件给子组件传数据"}
**数据流向：父 → 子（只读）**

**子组件 `MusicCard.vue` -- 声明自己需要什么数据：**
```vue
<script setup>
// defineProps 声明：我需要这些数据
// 对象写法（推荐）-- 带类型约束，用你组件的人一眼就知道要传什么
const props = defineProps({
  name: String,           // 曲名，字符串类型
  composer: String,       // 作曲家，字符串类型
  period: String,         // 时期，字符串类型
  liked: Boolean,         // 是否收藏，布尔类型
})
// props 在 <script> 中使用时，通过 props.xxx 访问
// 在 <template> 中直接用 {{ xxx }} 即可

console.log(props.name)   // 可以在 JS 中读取，但不能修改！
</script>

<template>
  <div class="music-card">
    <h3>{{ name }}</h3>              <!-- 模板中直接使用 prop 名 -->
    <p>{{ composer }} · {{ period }}</p>
    <span>{{ liked ? '❤️' : '🤍' }}</span>
  </div>
</template>

<style scoped>
.music-card {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 16px;
  margin: 8px;
}
</style>
```

**父组件 `App.vue` -- 传递数据给子组件：**
```vue
<script setup>
import { ref } from 'vue'
import MusicCard from './components/MusicCard.vue'

const pieces = ref([
  { id: 1, name: '月光', composer: '德彪西', period: 'classical', liked: true },
  { id: 2, name: '四季', composer: '维瓦尔第', period: 'baroque', liked: false },
  { id: 3, name: '夜曲', composer: '肖邦', period: 'romantic', liked: true },
])
</script>

<template>
  <!-- 冒号 : 是 v-bind: 的简写，表示传的是 JS 变量而非字符串 -->
  <MusicCard
    v-for="piece in pieces"
    :key="piece.id"
    :name="piece.name"            <!-- 传 JS 变量 piece.name -->
    :composer="piece.composer"
    :period="piece.period"
    :liked="piece.liked"
  />
</template>
```

逐行解读：
- 第 4 行 `defineProps({...})` -- 声明组件需要的 props，对象格式带类型
- 第 5-8 行 -- 每个 prop 后面写类型：`String`、`Number`、`Boolean` 等。这不是运行时强校验，但提供了文档作用
- 第 10 行 -- props 在 JS 中通过 `props.xxx` 访问，是**只读**的
- 第 15-19 行 -- 模板中直接用 `{{ name }}`，不需要 `props.` 前缀
- 第 36-41 行 -- 父组件中传 prop 时，冒号 `:` 表示传 JS 表达式。如果不加冒号，传的是字符串字面量 `"piece.name"`

**冒号传值 vs 不用冒号：**
```html
<!-- ❌ 不加冒号：传的是字符串 "piece.name"，不是变量的值 -->
<MusicCard name="piece.name" />
<!-- ✅ 加冒号：传的是变量 piece.name 的值，如 "月光" -->
<MusicCard :name="piece.name" />
```
:::

:::explain{title="方案：Emits -- 子组件通知父组件"}
**数据流向：子 → 父（通过事件通知，不是直接改数据）**

子组件**不能直接修改**父组件传过来的数据。它只能发出事件"通知"父组件："嘿，用户点了收藏按钮"，由父组件决定怎么处理。

**子组件 `MusicCard.vue` -- 发出事件：**
```vue
<script setup>
// 声明 props（接收数据）
const props = defineProps({
  name: String,
  liked: Boolean,
  id: Number,
})

// 声明 emits（发出事件）
// 数组写法 -- 列出所有可能触发的事件名
const emit = defineEmits(['toggle-like', 'delete'])
// emit('事件名', 可选的参数) -- 触发事件
</script>

<template>
  <div class="music-card">
    <h3>{{ name }}</h3>

    <!-- 点击按钮，emit 事件通知父组件 -->
    <button @click="emit('toggle-like', id)">
      {{ liked ? '❤️' : '🤍' }}        <!-- liked 来自 props，只读，不能改 -->
    </button>

    <button @click="emit('delete', id)">
      删除
    </button>
  </div>
</template>
```

**父组件 `App.vue` -- 监听事件并处理：**
```vue
<template>
  <MusicCard
    v-for="piece in pieces"
    :key="piece.id"
    :name="piece.name"
    :liked="piece.liked"
    :id="piece.id"

    <!-- @事件名="处理函数" -- 监听子组件发出的事件 -->
    @toggle-like="(cardId) => {                         // 接收子组件传来的 id 参数
      const target = pieces.find(p => p.id === cardId)  // 找到对应数据
      if (target) target.liked = !target.liked          // 修改父组件自己的数据
    }"

    @delete="(cardId) => {
      pieces = pieces.filter(p => p.id !== cardId)      // 父组件自己删除数据
    }"
  />
</template>
```

逐行解读：
- 第 7 行 `defineEmits(['toggle-like', 'delete'])` -- 声明这个组件会发出哪些事件
- 第 13 行 `emit('toggle-like', id)` -- 触发事件，第二个参数 `id` 传给父组件的监听函数
- 第 17 行 `emit('delete', id)` -- 同样触发事件，携带 id 参数
- 第 28 行 `@toggle-like="(cardId) => { ... }"` -- `@` 是 `v-on:` 的简写，监听子组件的 `toggle-like` 事件
- 第 29 行 `pieces.find(...)` -- 父组件在自己的数据中查找并修改，数据所有权始终在父组件
- 第 34 行 `pieces = pieces.filter(...)` -- 删除也是父组件操作自己的数据
:::

:::explain{title="完整数据流图解"}
```
父组件 App.vue（数据的唯一拥有者）
  │
  │  Props  ↓  传数据给子组件（只读）
  │  :name="piece.name"
  │  :liked="piece.liked"
  │
  ├──→  子组件 MusicCard.vue（接收数据，展示）
  │       ├── 显示曲名 {{ name }}
  │       └── 显示收藏状态 {{ liked ? '❤️' : '🤍' }}
  │
  │  Emits  ↑  子组件发出事件通知父组件
  │  @toggle-like="handleToggle"
  │  @delete="handleDelete"
  │
  父组件收到事件 → 修改自己的数据 → 数据通过 Props 自动更新子组件显示
```

**核心规则总结：**
- **数据向下（Props）** -- 父传子，只读。子组件绝对不能修改 props
- **事件向上（Emits）** -- 子传父，通过事件通知。父组件决定怎么处理
- **数据只有一份，在父组件手里** -- 这是单向数据流的根基
:::

:::example{title="全貌：一个完整的父子组件通信示例"}
父组件 App.vue：
```vue
<script setup>
import { ref } from 'vue'
import MusicCard from './components/MusicCard.vue'

// 数据源 -- 只在父组件中存在
const pieces = ref([
  { id: 1, name: '月光', composer: '德彪西', period: 'classical', liked: true },
  { id: 2, name: '四季-春', composer: '维瓦尔第', period: 'baroque', liked: false },
])

function handleToggle(id) {               // 事件处理函数
  const piece = pieces.value.find(p => p.id === id)
  if (piece) piece.liked = !piece.liked
}

function handleDelete(id) {               // 事件处理函数
  pieces.value = pieces.value.filter(p => p.id !== id)
}
</script>

<template>
  <div class="gallery">
    <MusicCard
      v-for="piece in pieces"
      :key="piece.id"
      :name="piece.name"
      :composer="piece.composer"
      :period="piece.period"
      :liked="piece.liked"
      :id="piece.id"
      @toggle-like="handleToggle"         <!-- 监听事件，调用处理函数 -->
      @delete="handleDelete"
    />
  </div>
</template>
```

子组件 MusicCard.vue：
```vue
<script setup>
const props = defineProps({
  name: String,
  composer: String,
  period: String,
  liked: Boolean,
  id: Number,
})

const emit = defineEmits(['toggle-like', 'delete'])
</script>

<template>
  <div class="card">
    <h3>{{ name }}</h3>
    <p>{{ composer }} · {{ period }}</p>
    <div class="actions">
      <button @click="emit('toggle-like', id)">
        {{ liked ? '❤️ 已收藏' : '🤍 收藏' }}
      </button>
      <button @click="emit('delete', id)">删除</button>
    </div>
  </div>
</template>

<style scoped>
.card { border: 1px solid #ddd; border-radius: 8px; padding: 16px; }
.actions { margin-top: 8px; display: flex; gap: 8px; }
</style>
```
:::

:::explain{title="常见错误"}
**错误 1：子组件中直接修改 props**
```vue
<script setup>
const props = defineProps({ liked: Boolean })

// ❌ 直接修改 props -- 这是 Vue 的大忌！
props.liked = !props.liked

// ✅ 通过 emit 通知父组件去修改
const emit = defineEmits(['toggle-like'])
emit('toggle-like')
</script>
```

**错误 2：传 prop 时忘了加冒号**
```html
<!-- ❌ 不加冒号，"true" 是字符串不是布尔值 -->
<MusicCard liked="true" />

<!-- ✅ 加冒号，传的是布尔值 true -->
<MusicCard :liked="true" />

<!-- ❌ 不加冒号，"piece.name" 是字面字符串 -->
<MusicCard name="piece.name" />

<!-- ✅ 加冒号，传的是变量 piece.name 的值 -->
<MusicCard :name="piece.name" />
```

**错误 3：emit 事件名用驼峰，但模板中写错了大小写**
```js
// JS 中声明
const emit = defineEmits(['toggleLike'])
```
```html
<!-- ❌ 模板中必须用 kebab-case（短横线） -->
<MusicCard @toggleLike="handle" />

<!-- ✅ 正确写法 -->
<MusicCard @toggle-like="handle" />
```

**错误 4：props 类型声明和实际传入不符**
```js
defineProps({ count: Number })
```
```html
<!-- ❌ 传了字符串 "5"，不是数字 5 -->
<Counter :count="'5'" />

<!-- ✅ 传数字 -->
<Counter :count="5" />
```
:::

:::explain{title="实际工作连接"}
Props 和 Emits 是 Vue 组件化架构的支柱。在任何真实的 Vue 项目中：

- **页面 = 组件树**：`App.vue` → `PageLayout.vue` → `Sidebar.vue` + `ContentArea.vue` → `ListItem.vue`。每一层都通过 Props 向下传数据，Emits 向上传事件
- **UI 组件库**（如 Element Plus、Vuetify）：每个组件都是通过 Props 配置（`<el-button :disabled="true">`），通过 Emits 通知（`<el-dialog @close="handleClose">`）
- **状态管理**：当组件树深到 3 层以上，逐层传 props 变得繁琐时，就会引入 Pinia（Vue 的状态管理库）。但理解 Props/Emits 是先决条件

面试中"Vue 组件通信方式"是必考题。Props + Emits 是最基础的，往上还有 provide/inject、Pinia、事件总线等。
:::

:::task{title="你的任务"}
::::step{purpose="defineProps 声明子组件的输入接口，就像函数的形参。Vue 验证类型并在模板中自动解包。这让你可以像设计函数 API 一样设计组件的使用方式。" expected="MusicCard.vue 文件中有 defineProps 声明，组件可以接收至少四个属性。"}
创建 MusicCard.vue 组件，用 defineProps 接收 name、composer、period、liked 四个 props
::::

::::step{purpose="组件模板使用 props 渲染 UI。{{ name }} 等插值在子组件模板中的用法和父组件完全一致。组件封装的价值：内部实现可以任意复杂，对外只暴露简洁的 props 接口。" expected="卡片上显示名称、作曲家名、时期标签和一个收藏按钮。"}
组件中显示卡片布局（曲名、作曲家、时期标签、收藏按钮）
::::

::::step{purpose="defineEmits 声明子组件的事件输出。子组件不直接改父组件数据，而是 emit 事件让父组件处理。这是单向数据流的核心规则。" expected="点击收藏按钮触发 toggle-like 事件，点击删除按钮触发 delete 事件。"}
用 defineEmits 声明 toggle-like 和 delete 两个事件
::::

::::step{purpose="import 组件后在模板中直接使用，不需要额外注册。:prop=\"value\" 传动态数据，@event=\"handler\" 监听事件。" expected="App.vue 中成功导入并使用 <MusicCard> 标签。"}
在 App.vue 中 import 并使用 MusicCard 组件，通过 Props 传数据
::::

::::step{purpose="v-for 和组件结合是 Vue 开发中最常见的模式。每个循环项通过不同 props 渲染不同内容，通过 emits 独立与父组件交互。验证每个卡片的操作互不影响。" expected="页面上显示多张卡片，点击不同卡片的收藏/删除按钮分别触发对应操作。"}
用 v-for 循环渲染多张卡片，验证 props 传递正确、每个卡片的事件处理独立
::::
:::

:::hint{title="defineProps 的两种写法"}
```js
// 数组写法 -- 简单，但没有类型提示
defineProps(['name', 'composer'])

// 对象写法 -- 推荐！带类型，自文档化
defineProps({
  name: String,
  composer: String,
  count: Number,
  liked: Boolean,
})
```
对象写法让使用者一眼就知道需要传什么类型的数据。就像函数签名 -- 参数名和类型一目了然。
:::

:::recap
你学会了 Vue 组件通信的核心规则 -- 用 `defineProps` 把数据从父组件向下传递给子组件（只读），用 `defineEmits` 把事件从子组件向上通知父组件。数据向下（Props），事件向上（Emits），数据的所有权始终在父组件手里。这就是 Vue 单向数据流的设计模式，是组件化架构的基石。
:::

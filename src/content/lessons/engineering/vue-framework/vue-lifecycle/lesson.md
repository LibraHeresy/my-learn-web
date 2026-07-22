# Vue 生命周期 — 组件的乐章结构

:::analogy
每个 Vue 组件都有一个内置时钟：创建时是零点，挂载到页面上是清晨，数据更新是正午，销毁是黄昏。生命周期钩子就是你在每个整点设置的闹钟 -- 到点了，执行你安排好的任务。
:::

:::explain{title="问题：你不知道 DOM 什么时候就绪"}
用原生 JS 写页面，有一个经典 bug：

```js
// app.js -- 页面加载时执行
const input = document.getElementById('search-input')
input.focus()  // ❌ 报错！此时 DOM 还没渲染完，input 是 null

// 只能这样修：
window.onload = () => {
  const input = document.getElementById('search-input')
  input.focus()  // ✅ 等 DOM 加载完才能操作
}

// 但还有一个问题：定时器一直在跑，即使用户离开了这个"页面"
setInterval(() => {
  updateClock()
}, 1000)
// 组件"销毁"后，这个定时器还在泄漏内存
```

两个核心痛点：
1. **时机不对** -- 你不知道什么时候 DOM 才准备好，经常抓到 null
2. **忘了清理** -- 定时器、事件监听、网络请求在组件销毁后还在跑，内存泄漏

Vue 的生命周期钩子就是用来解决这两个问题的。
:::

:::explain{title="方案：生命周期钩子 -- 在正确的时刻做正确的事"}
Vue 组件的生命周期分这几个阶段：

```
<script setup> 执行（创建响应式数据）
  |
  v
onBeforeMount -- 即将挂载（很少用）
  |
  v
onMounted -- 已挂载到 DOM ✅ 最常用
  |
  v
onBeforeUpdate -- 数据变了，DOM 即将更新（很少用）
  |
  v
onUpdated -- DOM 已更新
  |
  v
onBeforeUnmount -- 即将销毁 ✅ 最常用（清理资源）
  |
  v
onUnmounted -- 已销毁
```

你实际工作中**只需要掌握三个**：`onMounted`、`onBeforeUnmount`，以及数据变化的监听（`watch`/`watchEffect`）。其他钩子遇到再查文档就行。
:::

:::explain{title="onMounted -- DOM 就绪，开始干活"}
`onMounted` 在组件被插入到页面 DOM 中**之后**调用。这时候 DOM 元素真实存在了，你可以安全地操作它们。

```vue
<script setup>
import { ref, onMounted } from 'vue'

const inputRef = ref(null)          // template ref：拿到 DOM 元素的引用
const userData = ref(null)

// ❌ 错误：写在这里不行 -- 组件刚创建，DOM 还没渲染
// inputRef.value?.focus()         // inputRef.value 此时是 null！

// ✅ 正确：写在这里 -- onMounted 保证 DOM 已就绪
onMounted(() => {
  // 1. 操作 DOM -- 自动聚焦输入框
  inputRef.value?.focus()          // ?. 是可选链，防止 ref 为 null 时报错

  // 2. 获取初始数据 -- 发 API 请求
  fetchUserData()                  // 页面一打开就加载数据

  // 3. 启动周期性任务
  startAutoRefresh()               // 每 30 秒刷新一次数据

  // 4. 添加全局事件监听
  window.addEventListener('resize', handleResize)  // 监听窗口大小变化

  console.log('✅ 组件已就绪，DOM 可以操作了')
})
</script>

<template>
  <input ref="inputRef" placeholder="搜索..." />
  <p v-if="userData">欢迎，{{ userData.name }}</p>
</template>
```

逐行解读：
- 第 6 行 `ref(null)` -- template ref，通过 `ref="inputRef"` 关联到真实 DOM 元素
- 第 9-10 行 -- 注释掉的错误示范：在 setup 顶层访问 DOM 会拿到 null
- 第 13-14 行 -- 在 onMounted 中操作 DOM，安全可靠
- 第 17 行 -- 发 API 请求的最佳时机：页面一出来就开始加载数据
- 第 23 行 -- 全局事件监听也在这里注册
:::

:::explain{title="onBeforeUnmount -- 销毁前打扫战场"}
组件被移除时，你在 `onMounted` 里创建的东西**必须**在这里清理。不清理的后果：

```vue
<script setup>
import { onMounted, onBeforeUnmount } from 'vue'

let timer = null              // 定时器 ID
let abortController = null    // 用于取消 fetch 请求

onMounted(() => {
  // 创建定时器 -- 每秒执行一次
  timer = setInterval(() => {
    console.log('tick...')   // 如果不清理，组件销毁后还会一直打印！
  }, 1000)

  // 注册全局事件
  window.addEventListener('scroll', handleScroll)

  // 发送网络请求
  abortController = new AbortController()
  fetch('/api/data', { signal: abortController.signal })
})

onBeforeUnmount(() => {
  // 清理三件事：定时器、事件监听、网络请求
  clearInterval(timer)                                        // 1. 停止定时器
  window.removeEventListener('scroll', handleScroll)          // 2. 移除事件监听
  abortController?.abort()                                    // 3. 取消未完成的请求
  console.log('🧹 资源已清理，组件可以安全销毁')
})
</script>
```

**不清理的后果：**
- 定时器继续跑 -- 内存泄漏，控制台无限打印
- 事件监听还在 -- 用户滚动时调用一个已销毁组件的函数，可能报错
- 网络请求完成时组件已不在 -- 尝试更新已销毁的组件状态，Vue 会报警告
:::

:::example{title="实战：一个带清理的时钟组件"}
```vue
<script setup>
import { ref, onMounted, onBeforeUnmount, watch } from 'vue'

const time = ref(new Date().toLocaleTimeString())   // 当前时间
const isRunning = ref(true)                          // 是否运行中
let timer = null                                     // 定时器 ID

// 核心函数：更新时间
function tick() {
  time.value = new Date().toLocaleTimeString()
}

// 启动时钟：创建定时器
function startClock() {
  isRunning.value = true
  timer = setInterval(tick, 1000)       // 每秒更新一次
}

// 暂停时钟：清除定时器
function stopClock() {
  isRunning.value = false
  clearInterval(timer)                  // 停止定时器
  timer = null                          // 重置变量
}

// 组件挂载后：启动时钟
onMounted(() => {
  startClock()
  console.log('时钟组件已挂载')
})

// 组件销毁前：清理定时器
onBeforeUnmount(() => {
  clearInterval(timer)                  // 关键！不清理=内存泄漏
  console.log('时钟组件已卸载，定时器已清理')
})

// 监听运行状态变化
watch(isRunning, (running) => {
  console.log('时钟状态:', running ? '运行中' : '已暂停')
})
</script>

<template>
  <div class="clock">
    <h2>{{ time }}</h2>
    <button @click="isRunning ? stopClock() : startClock()">
      {{ isRunning ? '暂停' : '开始' }}
    </button>
  </div>
</template>
```

逐行解读：
- 第 7 行 -- `timer` 用 `let` 声明（不是 `const`），因为后续要重新赋值
- 第 10-11 行 -- `tick` 函数修改 `time.value`，页面自动更新（响应式魔法）
- 第 15 行 -- `setInterval(tick, 1000)` 返回一个 ID，保存下来用于清理
- 第 25-27 行 -- `onMounted` 中启动定时器
- 第 30-32 行 -- `onBeforeUnmount` 中清除定时器，**这是铁律**
- 第 36-37 行 -- `watch` 监听 `isRunning`，状态变化时打印日志
:::

:::explain{title="常见错误"}
**错误 1：在 setup 顶层直接操作 DOM**
```vue
<script setup>
import { ref } from 'vue'
const box = ref(null)

// ❌ DOM 还没渲染！box.value 是 null
box.value.style.color = 'red'

// ✅ 放在 onMounted 里
import { onMounted } from 'vue'
onMounted(() => {
  box.value.style.color = 'red'
})
</script>
```

**错误 2：onMounted 注册了资源但 onBeforeUnmount 忘了清理**
```vue
<script setup>
onMounted(() => {
  setInterval(() => { ... }, 1000)    // 创建了定时器
  // ❌ 没有在 onBeforeUnmount 里 clearInterval
  // 组件销毁后定时器继续跑，内存泄漏
})

// ✅ 正确做法：mounted 和 unmount 成对出现
let timer = null
onMounted(() => {
  timer = setInterval(() => { ... }, 1000)
})
onBeforeUnmount(() => {
  clearInterval(timer)
})
</script>
```

**错误 3：watch 的 deep:true 忘了（监听对象内部变化）**
```vue
<script setup>
const user = ref({ name: '张三', age: 25 })

// ❌ 直接 watch user 不会检测到 user.age 的变化
watch(user, (newVal) => { ... })

// ✅ 加 { deep: true } 才会深度监听对象内部属性
watch(user, (newVal) => {
  console.log('用户信息变了', newVal)
}, { deep: true })    // deep:true 递归监听所有嵌套属性
</script>
```
:::

:::explain{title="实际工作连接"}
生命周期钩子在实际项目中的典型用法：

- **onMounted**：页面打开时调接口拉数据（用户列表、商品列表、图表数据），初始化第三方库（ECharts 图表、地图 SDK），绑定全局键盘快捷键
- **onBeforeUnmount**：清理上面的一切 -- 销毁图表实例释放内存，移除快捷键监听防止冲突，取消未完成的 API 请求节省带宽
- **watch**：搜索框输入变化时自动调搜索接口（防抖），表单数据变化时自动保存草稿到 localStorage

实际代码中，`onMounted` 和 `onBeforeUnmount` 总是成对出现。如果你在 mouted 里写了 `addEventListener`，必须在 unmount 里写对应的 `removeEventListener`。这是 Vue 开发的铁律。
:::

:::task{title="动手试试"}
::::step{purpose="生命周期钩子让你在组件的特定时刻执行代码。通过观察控制台日志的输出时机，直观理解 onMounted 在 DOM 就绪后触发，onBeforeUnmount 在组件移除前触发。" expected="控制台依次输出「时钟组件已挂载」等生命周期日志。"}
观察时钟组件 -- 打开/关闭它，看控制台的生命周期日志
::::

::::step{purpose="onMounted 中配置组件初始行为。修改定时器频率，体会 onMounted 是初始化配置的正确位置。" expected="时钟数字变化速度明显加快（每 667ms 更新一次而非 1000ms）。"}
修改 onMounted 中的 startClock -- 让时钟以 1.5 倍速运行（改 setInterval 的间隔）
::::

::::step{purpose="watch 监听特定数据变化并执行操作。在整分钟时打印标记，是 watch 的典型用法 -- 明确指定监听源，拿到新旧值。" expected="控制台在每次整分钟时打印 🎵。"}
用 watch 监听 time，在整分钟时（秒数为 0）打印 🎵
::::

::::step{purpose="onMounted 和 onBeforeUnmount 必须成对使用。创建的资源（定时器）在销毁时必须清理，否则内存泄漏。" expected="页面上出现一个自动增长的数字，关闭组件后数字停止增长（验证定时器已清除）。"}
添加一个计数器（ref），在 onMounted 中启动自增，onBeforeUnmount 中清除
::::

::::step{purpose="watchEffect 自动追踪依赖，不需要手动指定数据源。但无法访问旧值。对比两种写法，你会明白各自的适用场景。" expected="watchEffect 在初始化时立即执行一次（watch 不执行），之后两者行为类似。"}
挑战：用 watchEffect 替代 watch，观察两者的区别 -- watchEffect 自动追踪、初始化时就执行
::::
:::

:::hint{title="记住两条铁律"}
1. **onMounted 负责创建，onBeforeUnmount 负责销毁** -- 成对出现，缺一不可
2. **凡是 `addEventListener`、`setInterval`、`fetch`，都要有对应的 `removeEventListener`、`clearInterval`、`abort`**

违反任何一条，你的应用就会有内存泄漏。组件销毁了但资源还在跑，用户用得越久，浏览器越卡。
:::

:::recap
你学会了 Vue 组件的生命周期 -- `onMounted` 在 DOM 就绪后执行（适合发请求、操作 DOM、启动定时器），`onBeforeUnmount` 在组件销毁前清理资源（必须清除定时器、移除事件监听、取消请求）。这两个钩子始终成对使用，这是防止内存泄漏的铁律。
:::

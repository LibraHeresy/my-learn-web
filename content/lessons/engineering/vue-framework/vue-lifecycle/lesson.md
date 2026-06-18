# Vue 生命周期 — 组件的乐章结构

::music-analogy
每首乐曲都有固定的结构——序奏呈示主题、展开部发展变化、再现部回归、尾声收束。Vue 组件也有自己的乐章结构（生命周期）：创建（setup）→ 挂载到 DOM（onMounted）→ 数据更新（onUpdated）→ 即将销毁（onBeforeUnmount）→ 已销毁（onUnmounted）。每个阶段都有对应的钩子函数，让你在正确的时间点执行正确的代码。
::

::explain{title="什么是生命周期？"}
每个 Vue 组件从创建到销毁，会经历一系列阶段。Vue 在每个阶段提供了**钩子函数（hooks）**，让你在特定时机执行代码：
```setup() → 创建响应式状态
  ↓
onBeforeMount() → 即将挂载（很少用）
  ↓
onMounted() → 已挂载到 DOM ✅ 常用
  ↓
onBeforeUpdate() → 数据变了，DOM 即将更新
  ↓
onUpdated() → DOM 已更新
  ↓
onBeforeUnmount() → 组件即将销毁 ✅ 常用
  ↓
onUnmounted() → 组件已销毁
```**你只需要了解最常用的三个就够了：**
- onMounted — 组件挂载完成后（操作 DOM、发请求、启定时器）
- onBeforeUnmount — 组件销毁前（清理定时器、取消请求、移除事件监听）
- watch / watchEffect — 响应式数据变化时自动执行
> 🎼 就像在奏鸣曲的呈示部结束时要做转调，在再现部开始前要回到原调——生命周期的每个节点都有它特定的音乐任务。
::

::explain{title="onMounted — 登台时刻"}
`onMounted` 是使用最频繁的钩子。在 `<script setup>` 中，**顶层的代码在组件创建时执行**，但此时 DOM 还不存在。任何需要操作 DOM 的代码必须放在 onMounted 中：
```vue
<script setup>
import { ref, onMounted } from 'vue'
const inputRef = ref(null)  // template ref
// ❌ 错误：此时 DOM 还没渲染，inputRef.value 是 null
// inputRef.value.focus()
// ✅ 正确：onMounted 中 DOM 已就绪
onMounted(() => {
  inputRef.value?.focus()    // 自动聚焦输入框
  fetchUserData()            // 发初始请求
  startTimer()               // 启动定时器
  window.addEventListener('scroll', handleScroll)  // 绑定全局事件
})
</script>
```**onMounted 的常见用途：**
- 获取初始数据（调用 API）
- 操作 DOM 元素（聚焦、滚动、初始化第三方库）
- 启动定时器 / 订阅事件
- 添加全局事件监听（scroll、resize、keydown）
::

::explain{title="onBeforeUnmount — 谢幕前的清理"}
组件销毁前，必须清理你在 onMounted 中创建的东西——否则会导致内存泄露或意外行为：
```vue
<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
let timer = null
onMounted(() => {
  timer = setInterval(() => {
    console.log('tick')
  }, 1000)
  window.addEventListener('resize', handleResize)
})
onBeforeUnmount(() => {
  clearInterval(timer)  // 清理定时器——不然组件销毁后还在 tick！
  window.removeEventListener('resize', handleResize)  // 移除事件监听——不然会内存泄露
})
</script>
```**清理清单：**
- clearInterval / clearTimeout — 清除定时器
- removeEventListener — 移除全局事件监听
- 取消未完成的 fetch 请求（用 AbortController）
- 销毁第三方库实例（如图表、地图）
> 🎭 演出结束后的收琴——提琴手松弓毛、管乐手清理乐器、钢琴家合上琴盖。不清理的话，乐器会受损（内存泄露），下次演出也会出问题。
::

::explain{title="watch 与 watchEffect — 自动跟进的伴奏"}
虽然 watch 不是严格的生命周期钩子，但它和生命周期密切相关——它监听数据变化并在正确的时机执行。
**watch：** 明确指定要监听的数据源
```vue
<script setup>
import { ref, watch } from 'vue'
const keyword = ref('')
const results = ref([])
// 监听 keyword 变化，自动搜索
watch(keyword, async (newVal, oldVal) => {
  console.log('搜索词从', oldVal, '变为', newVal)
  if (newVal.trim()) {
    results.value = await searchAPI(newVal)
  }
})
// 监听多个数据源
watch([keyword, category], ([newKw, newCat]) => {
  // keyword 或 category 任一变化都会触发
})
// 深度监听对象
watch(user, (newUser) => {
  console.log('用户信息变化了', newUser)
}, { deep: true })
</script>
```**watchEffect：** 自动追踪内部用到的响应式数据，任意一个变化就重新执行
```js
watchEffect(() => {
  console.log(keyword.value, category.value)
  document.title = keyword.value || '音乐收藏'
})
```**watch vs watchEffect：**
- watch — 明确知道要监听什么，可以获取旧值
- watchEffect — 不需要指定依赖，自动追踪，更简洁
::

::example{title="看例子：生命周期实战"}
下面的代码是一个时钟组件，完整展示了生命周期钩子的使用：
```vue
<script setup>
import { ref, onMounted, onBeforeUnmount, watch } from 'vue'
const time = ref(new Date().toLocaleTimeString())
const isRunning = ref(true)
let timer = null
function tick() {
  time.value = new Date().toLocaleTimeString()
}
function startClock() {
  isRunning.value = true
  timer = setInterval(tick, 1000)
}
function stopClock() {
  isRunning.value = false
  clearInterval(timer)
  timer = null
}
onMounted(() => {
  startClock()
  console.log('🕐 时钟组件已挂载')
})
onBeforeUnmount(() => {
  clearInterval(timer)
  console.log('🕐 时钟组件已卸载，定时器已清理')
})
watch(isRunning, (running) => {
  console.log('时钟状态：', running ? '运行中' : '已暂停')
})
</script>
```注意：如果不清除定时器，组件销毁后 setInterval 仍在运行——这就是内存泄露。
::

::task{title="动手试试 ✨"}
:::step{purpose="生命周期钩子让你在组件从创建到销毁的特定时间点执行代码。通过观察日志输出的顺序，你可以直观理解 onMounted 在组件挂载后触发、onBeforeUnmount 在销毁前触发。这是理解 Vue 组件运行机制的基础。" expected="控制台依次输出「时钟组件已挂载」等生命周期日志。"}
观察时钟组件——打开/关闭它，看控制台的生命周期日志
:::

:::step{purpose="onMounted 中的代码在 DOM 就绪后执行。你可以在这里修改初始化参数，比如改变定时器频率来实现不同倍速。这让你体会到 onMounted 是配置组件初始行为的正确位置。" expected="时钟数字变化速度明显加快（每 667ms 更新一次而非 1000ms）。"}
修改 onMounted 中的 startClock——让时钟初始以 1.5 倍速运行
:::

:::step{purpose="watch 让你在特定数据变化时执行副作用。监听 time 并在 time % 60 === 0 时输出标记，是 watch 的典型用法——它明确指定监听源，并能拿到新值和旧值。" expected="控制台在每次整分钟时打印一个 🎵 符号。"}
用 watch 监听 time 的变化，在整分钟时打印 🎵
:::

:::step{purpose="成对使用 onMounted 和 onBeforeUnmount 是 Vue 开发的铁律：在 mounted 中创建的资源（定时器、事件监听、订阅），必须在 unmount 中清理。否则组件销毁后资源仍在运行，造成内存泄露。" expected="页面上出现一个自动增长的数字，关闭组件后数字停止增长（验证定时器已清除）。"}
添加一个计数器（ref），在 onMounted 中启动自增，onBeforeUnmount 中清除
:::

:::step{purpose="watch 需要手动指定数据源，但能拿到新旧值；watchEffect 自动追踪依赖，代码更简洁，但无法访问旧值。通过对比两种写法，你会明白：需要对比新旧值时用 watch，只需执行副作用时用 watchEffect。" expected="watchEffect 在初始化时立即执行一次（watch 不执行），之后两者行为类似。"}
挑战：用 watchEffect 替代 watch，观察两者的区别
[[html]]<details class=challenge-answer><summary>💡 查看答案</summary><div class=answer-content><p><strong>watch 的写法：</strong></p><pre><code>import { ref, watch } from "vue";
const time = ref(0);
watch(time, (newVal, oldVal) => {
  if (newVal % 60 === 0 && newVal !== 0) {
    console.log("🎵 整分钟到了！");
  }
});</code></pre><p><strong>watchEffect 的写法：</strong></p><pre><code>import { ref, watchEffect } from "vue";
const time = ref(0);
watchEffect(() => {
  if (time.value % 60 === 0 && time.value !== 0) {
    console.log("🎵 整分钟到了！（watchEffect）");
  }
});</code></pre><p><strong>核心区别：</strong><br>• watch 手动指定数据源，可拿到旧值<br>• watchEffect 自动追踪依赖，默认立即执行一次<br>• 需要旧值时用 watch，简单副作用用 watchEffect</p></div></details>[[/html]]
:::

::

::listen-to
贝多芬《第五交响曲》全四个乐章 — 第一乐章：命运的动机登场（setup/onMounted），第二乐章：变奏展开（响应式更新），第三乐章：谐谑曲的神秘过渡（onBeforeUnmount），第四乐章：辉煌的凯旋（组件完成使命）。一部交响曲的生命周期，和 Vue 组件的生命周期如出一辙。
::


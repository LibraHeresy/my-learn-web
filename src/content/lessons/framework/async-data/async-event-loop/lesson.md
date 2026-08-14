# 事件循环 — JavaScript 的调度员

:::analogy
JavaScript 就像一个只有一台咖啡机的咖啡店——一次只能做一杯咖啡。Event Loop 就是排队规则：当前这杯做完，下一杯才能开始。异步任务就像"你先去座位上等着，好了叫你"——你不用站在柜台前干等。
:::

:::prerequisite
**本节你需要知道这些词：**

- **函数**：一段可以重复调用的代码块，接收输入、执行逻辑、返回结果
- **setTimeout**：JavaScript 内置的定时器函数，延迟指定毫秒后执行回调函数
- **回调函数**：作为参数传给另一个函数的函数，等时机到了被调用
- **同步/异步**：同步是排队一个个执行，异步是交给后台处理完成后通知
:::

:::explain{title="本节目标"}
学完本节，你将能够：
- 解释为什么 `setTimeout(fn, 0)` 不是立即执行，而是排到同步代码之后
- 说出宏任务和微任务的区别，以及 Event Loop 的调度优先级
- 预测 Promise 和 setTimeout 混合代码的输出顺序——这是经典面试题
- 排查因不理解 Event Loop 导致的渲染时机和状态更新问题
:::

:::explain{title="一、先看问题：如果没有理解 Event Loop，你的代码会怎样？"}
看这段代码——新手常常预测输出结果是 "A → B → C"：

```js
console.log('A')                          // ① 你期望先输出 A
setTimeout(() => console.log('B'), 0)     // ② 延迟是 0，你以为立即输出 B
console.log('C')                          // ③ 你期望最后输出 C
// 实际输出：A → C → B
// 为什么 B 排到最后去了？这就是 Event Loop 决定的
```

**不理解 Event Loop 的后果：**
- 你写的 `setTimeout(fn, 0)` 以为能"立即执行"，结果排到了最后
- 页面卡顿你不知道为什么——因为同步代码阻塞了主线程
- 数据更新了但页面没刷新——你不知道微任务和宏任务的执行时机
:::

:::explain{title="二、JavaScript 是单线程的——什么意思？"}
JavaScript 一次只能做一件事（单线程）。就像你只有一双手，没法同时打字和端杯子。

但浏览器不是只有 JS 引擎——它还有 Web API（定时器、网络请求等）。JS 把耗时任务"外包"给 Web API，自己继续执行后面的代码。

任务完成后，Web API 把回调函数放进**任务队列**，Event Loop 检查主线程空闲了，就把队列里的任务取出来执行。

**直观流程：**
```
调用栈（主线程） → 遇到异步任务 → 交给 Web API
                                    ↓
主线程继续执行        Web API 完成后 → 任务队列
                                    ↓
主线程空闲 ← Event Loop 调度 ← 任务队列
```
:::

:::explain{title="三、宏任务 vs 微任务 — VIP 插队规则"}
`setTimeout` 的回调进入的是**宏任务队列**（Task Queue）。但 Promise 的回调（`.then()`、`.catch()`）走的是**微任务队列**（Microtask Queue）——一个优先级更高的 VIP 通道：

```
宏任务（MacroTask）：setTimeout、setInterval、DOM 事件、I/O
微任务（MicroTask）：Promise.then/catch/finally、queueMicrotask、MutationObserver
```

**关键规则：每个宏任务执行完后，会立即清空所有微任务，然后才执行下一个宏任务。**

```js
console.log('① 开始')                    // 同步代码，立即执行

setTimeout(() => {
  console.log('④ 宏任务：setTimeout')    // 进入宏任务队列，等微任务清空后才执行
}, 0)

Promise.resolve().then(() => {
  console.log('② 微任务：Promise.then')  // 进入微任务队列，VIP 通道
})

console.log('③ 同步代码')                // 同步代码，立即执行

// 输出顺序：① → ③ → ② → ④
// 为什么？同步 → 清空微任务 → 宏任务
```
:::

:::example{title="看例子：咖啡店类比——帮助你记住"}
你去咖啡店点一杯拿铁：
1. 你点单（同步代码）
2. 咖啡师开始做咖啡（交给 Web API）
3. 你拿到取餐号，去旁边等着（JS 继续执行后面的代码）
4. 咖啡做好了，叫号（回调进任务队列）
5. 你去取咖啡（Event Loop 调度执行回调）

你不会站在柜台前干等咖啡师做完——那太浪费时间了。JS 也一样，不会卡住等异步任务。
:::

:::example{title="常见错误——看看你踩过几个坑？"}
**错误 1：以为 setTimeout(fn, 0) 会立即执行**

```js
// ❌ 错误理解：延迟是 0，应该立即执行
setTimeout(() => console.log('我以为是立即执行'), 0)
console.log('我先输出')
// 实际：先输出"我先输出"，再输出回调——因为回调必须排队

// ✅ 正确理解：setTimeout(fn, 0) 只是"尽快"放入任务队列，
//    但一定要等同步代码全部执行完
```

**错误 2：以为 await 后面的代码会立即执行**

```js
// ❌ 错误理解：await 后面的代码紧接着执行
async function demo() {
  console.log('A')
  await Promise.resolve()
  console.log('B')  // 你以为立即执行，实际上进入微任务队列
}
demo()
console.log('C')
// 实际输出：A → C → B（await 后面的代码等价于 .then()，走微任务）

// ✅ 正确理解：await 后面的代码被包装成微任务，等同步代码跑完才执行
```

**错误 3：在循环里用 await 但不理解执行顺序**

```js
// ❌ 你以为三个 setTimeout 的回调会按顺序执行
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 0)  // 输出 3, 3, 3 —— 不是 0, 1, 2！
}
// var 没有块级作用域，三个回调共享同一个 i，执行时 i 已经是 3 了

// ✅ 用 let 解决——let 有块级作用域
for (let i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 0)  // 输出 0, 1, 2
}
```
:::

:::explain{title="四、实际工作中你会怎么用？"}
理解 Event Loop 不仅是面试的需要，更直接影响你排查问题的效率：

- **点击按钮后数据要过一会才显示？** 不是代码慢了——是异步请求的回调在任务队列里排队。理解 Event Loop 之后，你知道这是"设计如此"，不是 bug。
- **为什么我的 loading 动画不转？** 因为同步操作（大量计算、DOM 操作）卡住了主线程——渲染也要等主线程空闲。解决办法是把重计算拆成小块，或扔到 Web Worker。
- **写搜索框时，确保用户看到最新结果。** 用 `AbortController` 取消过时的请求，结合防抖控制请求频率——这两个技术都建立在理解 Event Loop 的基础上。
- **`queueMicrotask(() => { ... })`** 让某个操作在当前任务结束后立刻执行，但抢在下一个宏任务前面——这是精细控制执行时机的工具。
- **面试高频题：** `Promise.resolve().then(...)` 为什么比 `setTimeout(..., 0)` 先执行？因为你掌握了微任务优先于宏任务的核心规则。

一句话总结：**Event Loop 是理解 JavaScript 异步行为的底层地图。代码的执行顺序、渲染时机、状态更新——全都在这张地图上。**
:::

:::task{title="动手试试 ✨"}
::::step{purpose="亲手验证 Event Loop 的执行顺序，把直觉变成本能。先预测再运行——如果预测和实际一致，说明你真的理解了。" expected="控制台按顺序输出：A → B → D → C。D 虽然设置在 C 之后，但延迟 0ms 比 C 的 500ms 短，所以先执行；两者都是异步回调，都必须等同步代码（A、B）跑完才执行。"}
打开 `script.js`，阅读代码：`console.log("A")` → `setTimeout(..., 500)` → `setTimeout(..., 0)` → `console.log("B")`，先写下你的预测输出顺序，再运行代码验证
::::

::::step{purpose="微任务优先于宏任务是 Event Loop 最核心的规则。理解了这个，你就能预测所有 Promise/setTimeout 混用的代码。" expected="控制台输出：开始 → 结束 → 微任务 → 宏任务。证明 Promise.then（微任务）优先于 setTimeout（宏任务）。"}
在 `script.js` 中写一段代码：`console.log("开始")` → `setTimeout(() => console.log("宏任务"), 0)` → `Promise.resolve().then(() => console.log("微任务"))` → `console.log("结束")`，运行并观察输出顺序
::::

::::step{purpose="这是经典的面试题变体。理解\"同步 → 微任务 → 宏任务\"的优先级后，这个场景不会难倒你。" expected="输出：1 → 4 → 3 → 2。同步代码先执行（1、4），Promise.then（微任务）在 setTimeout(fn,0)（宏任务）之前执行。"}
在 `script.js` 中运行以下代码，解释输出顺序：
```js
console.log(1)
setTimeout(() => console.log(2), 0)
Promise.resolve().then(() => console.log(3))
console.log(4)
```
::::

:::

:::recap
你知道了 JavaScript 是单线程的，通过 Event Loop 调度异步任务。核心规则只有一句：**同步代码优先于异步回调**。所有异步回调（setTimeout、Promise.then、事件监听）都要排队——先清空微任务，再取下一个宏任务。微任务（Promise.then）比宏任务（setTimeout）优先级更高。不理解 Event Loop 的后果：代码执行顺序和你想的不一样，状态更新时机不对，面试被问倒。实际工作中：排查渲染时机问题、写搜索防抖、理解数据流——全都依赖对 Event Loop 的理解。
:::

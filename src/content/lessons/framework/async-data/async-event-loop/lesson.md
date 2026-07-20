# 事件循环 — JavaScript 的"调度员"

:::analogy
JavaScript 就像只有一个收银台的超市——一次只能结一个人。Event Loop 就是排队规则：当前的人结完，下一个才能上。异步任务就像"你先去拿东西，好了回来继续"。
:::

:::explain{title="这一章你会学什么"}
这一章会带你理解“为什么有些代码要等、为什么有些结果不会立刻出现”。你会学到：
- 事件循环
- Promise
- async/await
- fetch 与 API 请求
- 防抖、状态处理、本地保存

学完这一章，你会第一次真正理解“数据为什么会流动起来”。
:::

:::explain{title="这一章的学习顺序"}
这一章会按下面的顺序推进：
1. 先理解 Event Loop，知道 JavaScript 为什么会“等”
2. 再理解 Promise 和 async/await，学会写异步流程
3. 再用 fetch 与 API 去拿真实数据
4. 最后处理搜索体验、状态和本地保存

这样学的原因很简单：先懂“怎么等”，再学“等谁”和“等完之后怎么处理”。
:::

:::hint{title="给第一次接触异步的你"}
异步最容易让人紧张，因为它不像 HTML、CSS 那样一眼能看到结果。  
如果你暂时觉得抽象，不代表你差，而是因为你开始接触“时间顺序”和“任务调度”这种看不见的结构。  
这一章最重要的不是一下子记住术语，而是建立顺序感。
:::

:::explain{title="JavaScript 是\"单线程\"的"}
JavaScript 一次只能做一件事（单线程），就像你只有一双手，没法同时打字和端杯子——一次只能做一件事。
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

:::example{title="setTimeout 不是\"暂停\""}
看这段代码的执行顺序：
```js
console.log('① 开始执行')
setTimeout(() => {
  console.log('③ 通知到达')
}, 1000)
console.log('② 主线程继续')
```
输出顺序是：① → ② → ③
即使 `setTimeout` 的延迟是 0，结果也是 ① → ② → ③：
```js
console.log('① 开始')
setTimeout(() => console.log('③ 异步回调'), 0)
console.log('② 继续')
```
因为 `setTimeout` 的回调**一定会等**主线程的同步代码全部执行完才运行。就像收银员不会在扫描到一半时突然去接待另一个人。
:::

:::explain{title="宏任务 vs 微任务 — 排队的\"VIP通道\""}
上面讲的 `setTimeout` 回调进入的是**宏任务队列**（Task Queue）。但 Promise 的回调（`.then()`、`catch`）走的是**微任务队列**（Microtask Queue）——一个优先级更高的 VIP 通道：

```
宏任务（MacroTask）：setTimeout、setInterval、DOM 事件
微任务（MicroTask）：Promise.then/catch、queueMicrotask
```

**关键规则：每个宏任务执行完后，会立即清空所有微任务，然后才执行下一个宏任务。**

```js
console.log('① 开始')

setTimeout(() => {
  console.log('④ 宏任务：setTimeout')
}, 0)

Promise.resolve().then(() => {
  console.log('② 微任务：Promise.then')
})

console.log('③ 同步代码')

// 输出顺序：① → ③ → ② → ④
```

**为什么是 ①③②④？** 因为同步代码最先执行 → 然后清空微任务队列（②）→ 最后才处理宏任务（④）。微任务有插队特权！

这也是为什么 `Promise.resolve().then(...)` 比 `setTimeout(..., 0)` 先执行——微任务队列总是优先于宏任务队列。
:::

:::example{title="生活中的类比"}
你去咖啡店点一杯拿铁：
1. 你点单（同步代码）
2. 咖啡师开始做咖啡（交给 Web API）
3. 你拿到取餐号，去旁边等着（JS 继续执行）
4. 咖啡做好了，叫号（回调进任务队列）
5. 你去取咖啡（Event Loop 调度执行回调）
你不会站在柜台前干等咖啡师做完——那太浪费时间了。JS 也一样，不会卡住等异步任务。
:::

:::task{title="动手试试 ✨"}
::::step{purpose="训练对 Event Loop 的直觉理解。新手常以为 setTimeout(fn, 0) 会\"立即\"执行，但实际上所有同步代码先跑完，异步回调才被队列调度。先预测再验证，加深记忆。" expected="正确预测顺序为 A → B → D → C。即使 D 的延迟是 0，D 也在 B 之后——因为同步代码优先于所有异步回调。"}
阅读代码：console.log("A") → setTimeout(..., 500) → setTimeout(..., 0) → console.log("B")，写下你预测的输出顺序
::::

::::step{purpose="亲手验证比看一百次理论都有效。当预测和实际一致时，你真正理解了 Event Loop；如果不一致，说明认知有偏差——这正是学习的黄金时刻。" expected="控制台输出顺序为 A → B → D → C，D（0ms 异步）在 C（500ms 异步）之前，因为 D 先进入任务队列。"}
运行代码，打开控制台观察实际输出，与你的预测对比
::::

::::step{purpose="理解\"同步代码优先于异步回调\"这个规则，你就能预测所有 setTimeout/Promise/fetch 的执行顺序。就像理解"先到先服务"——排队规则一旦内化，看任何流程都不会乱。" expected="你能用自己的话解释：即使 setTimeout(fn, 0)，fn 也要先进任务队列，等调用栈清空后 Event Loop 才会取它执行。"}
思考：为什么 setTimeout(fn, 0) 的回调排在 console.log("B") 之后？如果你理解了这个，就掌握了 Event Loop 的核心规则
::::

:::

:::hint{title="理解要点"}
核心规则：**同步代码优先于异步回调**。即使 `setTimeout(fn, 0)`，`fn` 也要等所有同步代码跑完。因为回调必须先进任务队列，而 Event Loop 只有在调用栈清空后才会去取任务队列里的任务。
:::

:::recap
你知道了 JavaScript 是单线程的，但通过 Event Loop 调度异步任务。同步代码总是先执行，异步回调要排队等着——即使 setTimeout 延迟设为 0，它的回调也要等所有同步代码跑完才会执行。
:::



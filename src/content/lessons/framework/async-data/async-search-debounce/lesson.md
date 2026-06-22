# 防抖与搜索 — 别让"乐团"累坏了

::music-analogy
如果指挥每半秒就给乐团一个新指令，乐团会疯掉的。好的指挥一定会等前一个乐句结束再给下一个指示。**防抖（debounce）** 就是这个"等待稳定再行动"的智慧——用户在输入框打字时，不要每个字母都发请求，而是等用户停下来再发。
::

::explain{title="为什么需要防抖？"}
场景：搜索框。用户输入"贝多芬"，来数数会触发几次请求：
```贝 → 请求1
贝多 → 请求2
贝多芬 → 请求3
```如果每个字都发 API 请求：
- 浪费网络资源
- 服务器压力大
- 返回顺序可能错乱（后发的请求可能先返回）
**防抖：** 用户停止输入 N 毫秒后，才发一次请求。
::

::example{title="防抖函数实现"}
防抖的核心：每次触发时清除上一个定时器，重新计时。
```js
function debounce(fn, delay = 300) {
  let timer = null
  return function(...args) {
    clearTimeout(timer)            // 清除上次的定时器
    timer = setTimeout(() => {     // 重新计时
      fn.apply(this, args)
    }, delay)
  }
}
// 使用
const search = debounce(async (keyword) => {
  console.log('搜索：', keyword)
  const result = await api.get(\`/search?q=\${keyword}\`)
  displayResults(result)
}, 500)
// 用户在输入框打字
input.addEventListener('input', (e) => {
  search(e.target.value)  // 停止输入 500ms 后才真正搜索
})
```
::

::example{title="直观理解"}
防抖就像等电梯：
- 不断有人按关门键（每次按键触发 debounce）
- 电梯不会立刻关门（清除之前的定时器）
- 等最后一个人进来后，过几秒才关门（定时器到期，执行回调）
在搜索场景中，用户连续输入"贝"→"多"→"芬"，每次输入都重置计时器。等用户停止输入 500ms 后，才发送搜索"贝多芬"的请求。
::

::explain{title="闭包 — 函数\"记住\"外部变量的能力"}
防抖函数之所以能工作，依赖一个重要的概念：**闭包（Closure）**。
看防抖的结构：
```js
function debounce(fn, delay) {
  let timer = null           // 外层函数的变量
  return function(...args) {  // 内层函数
    clearTimeout(timer)       // 访问了外层的 timer！
    timer = setTimeout(...)   // 修改了外层的 timer！
  }
}
```**闭包**就是：内层函数可以记住并访问外层函数的变量，即使外层函数已经执行完毕。就像乐队成员各自记住自己的分谱——音乐会结束后，谱子仍然在他们的记忆里。
`timer` 变量被所有防抖调用共享——每次调用 `clearTimeout(timer)` 清除的都是同一个 timer，这正是防抖能取消上一次等待的关键。
闭包是 JavaScript 中最强大的特性之一，你在事件处理、模块封装、数据缓存等场景都会用到它。
::

::task{title="动手试试 ✨"}
:::step{purpose="防抖利用闭包（Closure）让内层函数记住并访问外层的 timer 变量。每次调用时先清除上次的定时器，再启动新的——就像有人在电梯关门键上不停按，每次按都重新计时，直到没人按了才真正关门。" expected="debounce 返回一个新函数，这个函数在连续被调用时，只有最后一次调用（经过 delay 毫秒后）会触发 fn。"}
在 debounce 内部声明 let timer = null（闭包变量），返回的函数中先 clearTimeout(timer)，再 timer = setTimeout(() => fn(...args), delay)
:::

:::step{purpose="防抖函数是一个\"装饰器\"——它接收一个函数，返回一个被\"防抖化\"的新函数。原函数的功能不变，只是增加了\"等待稳定后再执行\"的行为。这种包装模式在工程中非常常见。" expected="debouncedSearch 的行为与 searchAPI 相同，但连续快速调用时只有最后一次会生效。"}
用 const debouncedSearch = debounce(searchAPI, 500) 包装搜索函数
:::

:::step{purpose="在搜索场景中，用户在输入框快速打字时，debounce 避免了每个字符都发一次网络请求——只在用户停下来 500ms 后才真正搜索。这对节省流量和服务器资源至关重要。" expected="500ms 后控制台只输出一次 \"🔍 发送搜索请求：贝多芬\"，前两次调用被取消了。"}
连续快速调用 debouncedSearch("贝") → debouncedSearch("贝多") → debouncedSearch("贝多芬")，验证控制台只输出一次搜索请求
:::

::

::hint{title="提示"}
关键两步：
1. 在返回的函数中 `clearTimeout(timer)` 取消上次的等待
2. 然后 `timer = setTimeout(() => fn(...args), delay)` 重新开始等待
`timer` 要存在闭包中（外层变量），这样每次调用都能访问到同一个 timer。
::

::listen-to
约翰·凯奇《4'33"》— 这部作品提醒我们，**沉默和等待也是音乐的一部分**。防抖就是在合适的时机"不做什么"，这也是一种智慧。
::


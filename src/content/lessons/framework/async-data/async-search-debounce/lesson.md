# 防抖与搜索 — 别让服务器累坏了

:::analogy
防抖（debounce）就像电梯关门——有人进来就重新计时，等没人进出了才关门。用户打字搜索时也一样，不要每敲一个字母就发一次请求，等用户停下来再发。
:::

:::prerequisite
**本节你需要知道这些词：**

- **fetch()**：浏览器向服务器发送 HTTP 请求的函数
- **setTimeout**：JavaScript 内置的定时器函数，延迟指定毫秒后执行回调
- **clearTimeout**：取消由 setTimeout 设置的定时器
- **闭包（Closure）**：内层函数记住并访问外层函数变量的能力
:::

:::explain{title="本节目标"}
学完本节，你将能够：
- 解释为什么搜索框不能每次按键都发请求——三个严重问题（资源浪费、顺序错乱、服务器压力）
- 手写 `debounce(fn, delay)` 函数，理解闭包如何让 timer 在多次调用间共享
- 区分"防抖函数只创建一次"和"每次事件触发调用防抖函数"——这是最常见的错误
- 将防抖应用到搜索框、窗口 resize、滚动加载等高频事件场景
:::

:::explain{title="一、先看问题：不给搜索加防抖，会发生什么？"}
做一个搜索框，用户输入"洗衣机"。最简单的实现：

```js
// ❌ 没有防抖：每个字符都发一次请求
const input = document.querySelector('#search-input')
input.addEventListener('input', async function(e) {
  const keyword = e.target.value            // 用户每敲一个字，这里就触发一次
  const results = await fetch('/api/search?q=' + keyword)
  showResults(results)
})
// 用户输入"洗衣机"时触发了 3 次请求：
// "洗"   → 请求 1（还没返回）
// "洗衣" → 请求 2（还没返回）
// "洗衣机" → 请求 3（最新，但可能先返回）
```

**三个严重问题：**

1. **浪费资源**——3 个请求里只有最后一个有用，前两个请求的结果被丢弃了
2. **返回顺序错乱**——"洗衣机"的请求可能比"洗"的请求先返回（网络不稳定），导致最终显示的是"洗"的结果，而不是"洗衣机"的结果
3. **服务器压力**——如果是 100 个用户同时搜索，每人敲 5 个字 = 500 个请求，但实际只需要 100 个
:::

:::explain{title="二、解决方案：防抖函数"}
防抖的核心逻辑：**每次触发时取消上一次的等待，重新计时。只有最后一次触发后过了 N 毫秒，才真正执行。**

```js
// debounce —— 防抖函数
function debounce(fn, delay) {
  var timer = null                         // ① 闭包变量：保存定时器 ID
                                            //    timer 被所有调用共享——这是关键！

  return function() {                      // ② 返回一个"防抖版"的函数
    var context = this                     // 保存 this
    var args = arguments                   // 保存参数

    clearTimeout(timer)                    // ③ 取消上次的等待
                                            //    如果用户继续输入，这行会重复执行
                                            //    导致上次的 setTimeout 永远不触发

    timer = setTimeout(function() {        // ④ 启动新的等待
      fn.apply(context, args)             // ⑤ 延迟结束后，真正执行业务函数
    }, delay)
  }
}
```

**逐行理解执行过程：**

```js
// 用户输入"洗"（第 1 次调用）
//   → clearTimeout(timer)     timer 还是 null，无事发生
//   → timer = setTimeout(fn, 300)    启动一个 300ms 的倒计时

// 用户输入"衣"（第 2 次调用，距上次 100ms）
//   → clearTimeout(timer)     取消上一次的 300ms 倒计时！fn 不会执行了
//   → timer = setTimeout(fn, 300)    重新启动 300ms 倒计时

// 用户输入"机"（第 3 次调用，距上次 150ms）
//   → clearTimeout(timer)     再次取消倒计时
//   → timer = setTimeout(fn, 300)    再次重新启动

// 用户停下来...
//   → 300ms 后，倒计时到期，fn 执行——搜索"洗衣机"
```
:::

:::explain{title="三、闭包——防抖能工作的秘密"}
防抖函数之所以能"记住"上一次的 timer，靠的是**闭包（Closure）**：

```js
function debounce(fn, delay) {
  var timer = null              // 外层函数的局部变量

  return function() {           // 内层函数
    clearTimeout(timer)         // 访问外层的 timer——这就是闭包
    timer = setTimeout(...)     // 修改外层的 timer——闭包允许修改
  }
}
// debounce 执行完毕后，按理说 timer 应该被销毁
// 但内层函数仍持有 timer 的引用——这就是闭包
// JS 引擎发现内层函数还要用 timer，就保留它不回收
```

**闭包的实用定义：** 函数"记住"了它出生时所在作用域的变量，即使那个作用域已经执行完毕。
:::

:::example{title="看例子：防抖 + API 搜索——完整示例"}
```js
// 1. 搜索 API 函数——每次搜索的实际逻辑
async function searchAPI(keyword) {
  console.log('搜索：', keyword)
  const data = await api.get('/search?q=' + keyword)
  renderResults(data)
}

// 2. 包装成防抖版——300ms 内重复调用只执行最后一次
const debouncedSearch = debounce(searchAPI, 300)

// 3. 绑定到输入框
const input = document.querySelector('#search-input')
input.addEventListener('input', function(e) {
  const keyword = e.target.value.trim()
  if (keyword.length > 0) {
    debouncedSearch(keyword)               // 调用防抖版——不会立即发请求
  }
})

// 效果：
// 用户快速输入"洗衣机" → 300ms 后只发一次请求："洗衣机"
// 而不是 3 次请求："洗"、"洗衣"、"洗衣机"
```
:::

:::example{title="常见错误——看看你踩过几个坑？"}
**错误 1：每次调用都创建新的防抖函数**

```js
// ❌ 错误：在事件处理函数里创建防抖——每次 input 都新建 debounce
input.addEventListener('input', function(e) {
  const debouncedSearch = debounce(searchAPI, 300)  // 每次都是新函数！
  debouncedSearch(e.target.value)
})
// 结果：防抖完全失效，还是每个字符都发请求

// ✅ 正确：在事件监听器外面创建防抖函数——只创建一次
const debouncedSearch = debounce(searchAPI, 300)    // 只创建一次
input.addEventListener('input', function(e) {
  debouncedSearch(e.target.value)                    // 每次调用同一个函数
})
```

**错误 2：timer 定义在返回函数里面——每次调用都是新 timer**

```js
// ❌ 错误：timer 在返回函数内部——每次调用创建新的局部变量
function brokenDebounce(fn, delay) {
  return function() {
    var timer = null              // 每次调用都是新的 timer！
    clearTimeout(timer)           // 清除的是刚创建的 null，没用
    timer = setTimeout(fn, delay) // 启动新定时器——但上一个还在！
  }
}
// 结果：防抖完全失效——和直接调用 fn 没区别

// ✅ 正确：timer 在返回函数外部（闭包变量）——所有调用共享
function debounce(fn, delay) {
  var timer = null              // 在返回函数外面！
  return function() {
    clearTimeout(timer)          // 清除的是上一次的 timer——有效！
    timer = setTimeout(fn, delay)
  }
}
```

**错误 3：忘记用闭包——timer 用全局变量替代**

```js
// ❌ 错误：timer 定义在全局——如果有多个搜索框就互相干扰了
var globalTimer = null
input1.addEventListener('input', function() {
  clearTimeout(globalTimer)
  globalTimer = setTimeout(search1, 300)
})
input2.addEventListener('input', function() {
  clearTimeout(globalTimer)     // 取消了 input1 的定时器！
  globalTimer = setTimeout(search2, 300)
})

// ✅ 正确：每个搜索框有自己的防抖函数，各自管理各自的 timer
const debouncedSearch1 = debounce(search1, 300)  // timer1 独立
const debouncedSearch2 = debounce(search2, 300)  // timer2 独立
```
:::

:::explain{title="四、实际工作中你会怎么用？"}
防抖不仅用于搜索框，几乎所有"高频触发但只需要最终结果"的场景都用得到：

- **搜索框**（最经典）：用户停止输入后才发请求
- **窗口 resize**：用户拖拽窗口时 resize 每秒触发几十次，防抖后再重新计算布局
- **滚动加载更多**：不是每次滚动都触发，而是用户停下来后再判断
- **表单自动保存**：用户编辑内容时，停止输入 2 秒后自动保存草稿到 localStorage

**防抖函数速记模板：**
```js
function debounce(fn, delay) {
  var timer = null                           // ① 闭包变量——关键！
  return function() {
    clearTimeout(timer)                      // ② 取消上次
    var context = this                       // ③ 保存 this 和参数
    var args = arguments
    timer = setTimeout(function() {          // ④ 重新计时
      fn.apply(context, args)               // ⑤ 时间到了才执行
    }, delay)
  }
}
```
:::

:::task{title="动手试试 ✨"}
::::step{purpose="亲手实现 debounce 是理解闭包的最佳方式。timer 在闭包中，每次调用都取消+重启同一个 timer。" expected="debounce 返回一个函数，该函数在连续被调用时只执行最后一次（延迟后）。"}
打开 `script.js`，实现 `debounce(fn, delay)` 函数，用 `console.log` 验证 timer 在调用之间保持不变
::::

::::step{purpose="防抖+搜索是前端最经典的组合。没有防抖时每个字符都发请求，加了防抖只发一次。" expected="快速输入'春'→'春天'→'春天的故事'，停止输入 500ms 后，控制台只输出一次搜索请求。"}
在 `script.js` 中实现完整搜索功能：写 `searchAPI(keyword)`、用 `debounce` 包装、绑定 input 事件、快速输入后停止观察输出次数
::::

::::step{purpose="比较防抖前后的网络请求数量，直观感受性能差异。" expected="无防抖：3个字符=3次 fetch。有防抖：3个字符只触发 1 次 fetch。Network 面板验证。"}
分别在浏览器的 Network 面板中观察：不加防抖时搜索"洗衣机"有多少次请求，加防抖后有多少次请求
::::

:::

:::recap
你学会了防抖（debounce）——用 `setTimeout` 和 `clearTimeout` 控制函数执行频率。核心逻辑：每次触发时取消上一次的等待，重新计时；只有停止触发达到指定时间后才真正执行。防抖依赖闭包——`timer` 变量在外层声明，内层函数通过闭包反复访问和修改同一个 `timer`。实际工作中，搜索框是防抖最常见场景，此外还有窗口 resize、滚动加载等高频事件。不用防抖的话：浪费带宽、返回顺序错乱、服务器压力翻倍。
:::

# 防抖与节流 — 控制函数执行的节奏

:::analogy
**防抖（Debounce）**就像电梯门——有人进来就重新倒计时，没人进出了才关门。**节流（Throttle）**就像地铁闸机——不管多少人涌过来，每分钟最多放固定数量通过。两种模式解决同一个问题：事件触发得太频繁，你只需要有选择地执行。
:::

:::prerequisite
**本节你需要知道这些词：**

- **函数**：一段可以重复调用的代码块
- **定时器**：`setTimeout(fn, delay)`——延迟 `delay` 毫秒后执行 `fn`；`clearTimeout(timer)`——取消一个已设置的定时器
- **闭包**：函数"记住"它被创建时所在作用域的变量——防抖和节流的实现都依赖闭包来存储定时器和时间戳
:::

:::explain{title="先看痛点——事件触发有多疯狂？"}
打开任意网页，在搜索框里快速输入"笔记本电脑"5 个字，看看会发生什么：

```js
// 一段看似普通的搜索代码——每次输入都发请求
const searchInput = document.querySelector('#searchInput');
let requestCount = 0;                                  // 统计发了多少次请求

searchInput.addEventListener('input', function() {    // 每次键盘输入都触发
  requestCount++;                                      // 请求计数 +1
  console.log(`第 ${requestCount} 次请求：搜索 "${searchInput.value}"`);
  // 实际项目中，这里会调用 fetch('/api/search?q=' + searchInput.value)
  // 也就是发起一次网络请求！
});

// 输入"笔记本电脑"（拼音共约 10 次按键），控制台输出：
// 第 1 次请求：搜索 "l"
// 第 2 次请求：搜索 "la"
// 第 3 次请求：搜索 "lap"
// ...（每个中间态都发了一次请求）
// 第 10 次请求：搜索 "笔记本电脑"
// 10 次请求！但用户只关心最后一次的搜索结果。前面 9 次全浪费了——带宽、服务器CPU、你的免费API额度。
```

不光是搜索输入。同样的问题无处不在：
- **scroll（滚动）**：鼠标滚一次，可能触发几十次 scroll 事件
- **resize（窗口调整）**：拖拽窗口边缘时每移动 1 像素就触发一次
- **mousemove（鼠标移动）**：鼠标滑过页面时每秒触发上百次

你在这些事件里执行的任何操作（更新 UI、发送请求、读写 DOM），都会被疯狂重复调用。这就是性能问题的根源。
:::

:::explain{title="防抖（Debounce）——"等你停下来再执行""}
防抖的核心策略：**每次触发事件时重置计时器，只有连续 N 毫秒没有新触发，才真正执行函数**。就像电梯——有人进来就重新倒计时关门。

```js
function debounce(fn, delay) {                         // fn=要执行的函数, delay=等待时间(毫秒)
  let timer = null;                                     // 闭包变量——存储定时器 ID

  return function() {                                   // 返回的新函数——每次事件触发都调用它
    // 关键步骤1：清除上一次的定时器
    // 只要在 delay 时间内又触发了一次，上一次的等待就作废
    clearTimeout(timer);                                // "等等，又有人进来了——重新计时！"

    // 关键步骤2：重新设置定时器
    // 如果 delay 时间内没有新调用，定时器到期执行 fn
    timer = setTimeout(function() {                    // 在新的定时器里执行原函数
      fn();                                            // delay 毫秒后——终于没人进来了
    }, delay);
  };
  // 闭包让 timer 变量"活"在返回函数的作用域中
  // 每次调用都能读写同一个 timer——这是实现防抖的关键
}
```

**使用示例——搜索输入框**：

```js
const searchInput = document.querySelector('#searchInput');

// 原函数——做真正的搜索
function doSearch() {
  console.log('发起搜索请求：' + searchInput.value);   // 实际项目里这里是 fetch 调用
}

// 用防抖包装——用户停止输入 500ms 后才执行
searchInput.addEventListener('input', debounce(doSearch, 500));

// 输入"笔记本电脑"的过程：
// 输入 l    → 启动 500ms 定时器
// 输入 a    → 取消上次的定时器，重启 500ms 定时器
// 输入 p    → 取消上次的定时器，重启 500ms 定时器
// ...（每输入一个字都重置）
// 输入 脑  → 启动 500ms 定时器——用户终于停下来了
// 500ms 后 → doSearch() 执行！只发 1 次请求
```

**防抖适合的场景**（共同特征：你只关心最终结果）：
- 搜索输入框——等用户打完字再搜
- 表单字段验证——等用户填写完再校验
- 窗口 resize 结束后重新计算布局——调整过程中不需要更新
- 按钮防止重复点击提交——停手了才真正提交一次
:::

:::explain{title="节流（Throttle）——"按固定频率执行""}
节流的核心策略：**不管事件触发了多少次，最多每 N 毫秒执行一次**。就像地铁闸机——每分钟放固定数量的人通过。

```js
function throttle(fn, interval) {                      // fn=要执行的函数, interval=最小间隔(毫秒)
  let lastTime = 0;                                     // 闭包变量——记录上一次执行的时间戳

  return function() {                                   // 返回的新函数——每次事件触发都调用它
    const now = Date.now();                             // 获取当前时间戳（毫秒）

    // 关键判断：距离上次执行是否已经过了 interval 毫秒？
    if (now - lastTime >= interval) {                  // 如果间隔够了——
      fn();                                             // 执行原函数
      lastTime = now;                                   // 更新"上次执行时间"为当前时间
    }
    // 如果间隔不够——什么都不做，直接跳过
  };
  // 闭包让 lastTime "活"在返回函数的作用域中
  // 每次调用都能看到同一个 lastTime——比较和更新都在同一个变量上
}
```

**使用示例——页面滚动**：

```js
// 原函数——根据滚动位置做点什么
function handleScroll() {
  const scrollTop = window.scrollY;                     // 当前滚动位置
  console.log('滚动位置：' + scrollTop + 'px');
  // 实际项目里：判断是否显示"回到顶部"按钮、加载更多数据等
}

// 用节流包装——最多每秒执行一次
window.addEventListener('scroll', throttle(handleScroll, 1000));

// 持续滚动滚轮时的执行情况：
// 0ms      → 执行 handleScroll (lastTime=0, now=0, 0-0>=1000? → false? 不对...)
// 实际上第一次就执行了（lastTime=0, now 是当前时间 >> 0, 所以第一次一定执行）
// 然后每 1 秒执行一次，中间的滚动被忽略
```

**节流适合的场景**（共同特征：你需要过程反馈，但不能太密集）：
- 页面滚动加载更多——滚动过程中需要持续检查是否到底
- mousemove 拖拽跟随——需要鼠标位置持续更新，但不需要每毫秒更新
- 滚动时显示/隐藏"回到顶部"按钮——需要持续判断但不需高频
- 游戏中的射击/跳跃——限制操作频率
:::

:::predict{title="预测输出：快速输入 5 个字符，搜索函数执行了几次？" answer="防抖：只执行 1 次（连续输入重置计时器，停下来 300ms 后才执行）；节流：执行 2-3 次（取决于输入耗时，每 300ms 最多执行 1 次）。解析：防抖是等你停下来再执行，节流是按固定频率执行。"}
看代码预测：用户 1 秒内连续输入 5 个字符（间隔 200ms），两种方案的 search() 各执行几次？

```js
// 防抖版：停止输入 300ms 后才搜索
const debouncedSearch = debounce(search, 300)
// 节流版：每 300ms 最多执行一次
const throttledSearch = throttle(search, 300)
```
:::

:::explain{title="防抖 vs 节流 — 一张表帮你选"}

| 对比维度 | 防抖（Debounce） | 节流（Throttle） |
|---------|-----------------|-----------------|
| 核心策略 | 等你停下来再执行 | 按固定频率执行 |
| 第一次触发 | 不立即执行（要等停） | 立即执行第一次（可配置） |
| 持续触发时 | 一直重置，一直不执行 | 每隔 N ms 执行一次 |
| 停手后 | 最终一定会执行一次 | 不保证执行最后一次 |
| 一句话 | "你敲完了我再搜" | "你边滚我边更新" |

**选择口诀**：
- 关心**最终结果** → 防抖。搜索、表单校验、resize 布局重算
- 关心**过程反馈** → 节流。滚动位置指示、拖拽跟随、加载更多
- 关心**安全限制** → 节流。防止重复提交、限制 API 调用频率
:::

:::example{title="直观对比——同样快速点击 10 次，三种情况各执行几次？"}
```js
let normalCount = 0;                                   // 无控制的计数器
let debounceCount = 0;                                 // 防抖的计数器
let throttleCount = 0;                                 // 节流的计数器

// 1. 无控制——每次点击都执行
document.querySelector('#btnNormal').addEventListener('click', function() {
  normalCount++;
  console.log('无控制 → 执行了 ' + normalCount + ' 次');
});

// 2. 防抖——停下来才执行（等待 500ms）
document.querySelector('#btnDebounce').addEventListener('click', debounce(function() {
  debounceCount++;
  console.log('防抖   → 执行了 ' + debounceCount + ' 次');
}, 500));

// 3. 节流——最多每秒 1 次
document.querySelector('#btnThrottle').addEventListener('click', throttle(function() {
  throttleCount++;
  console.log('节流   → 执行了 ' + throttleCount + ' 次');
}, 1000));

// 实验：快速连续点击每个按钮 10 次（在 1 秒内点完）
// 结果：
// - 无控制：10 次（每次点击都执行了）
// - 防抖：  1 次（只有最后停手后那一次）
// - 节流：  1~2 次（取决于点击速度和间隔——1 秒内最多执行 1~2 次）
```
:::

:::explain{title="常见错误"}
**错误1：每次调用都创建新的防抖函数——导致完全失效**
```js
const input = document.querySelector('#searchInput');

// ❌ 错误：每次 input 事件触发都调用 debounce()——每次都创建新的防抖实例
// 每个新实例有自己独立的 timer——所以 clearTimeout 永远清不到上次的定时器
input.addEventListener('input', function() {
  debounce(doSearch, 500)();                           // 每次创建新防抖，等于没防抖！
});

// ✅ 正确：debounce 只调用一次——返回的闭包函数被 addEventListener 反复使用
const debouncedSearch = debounce(doSearch, 500);       // 创建一次防抖函数
input.addEventListener('input', debouncedSearch);      // 每次事件触发都用同一个防抖函数
```

**错误2：timer 变量没有放在闭包里——直接放在全局**
```js
let timer = null;                                      // ❌ 全局变量
function debounce(fn, delay) {
  return function() {
    clearTimeout(timer);                               // 所有防抖实例共享同一个 timer
    timer = setTimeout(fn, delay);                     // 多个搜索框会互相干扰！
  };
}
// ✅ 正确：timer 必须在 debounce 函数内部声明
// 这样每次调用 debounce() 都创建独立的 timer——不同的输入框互不干扰
function debounce(fn, delay) {
  let timer = null;                                    // ✅ 闭包变量——每个防抖实例独立的 timer
  return function() {
    clearTimeout(timer);
    timer = setTimeout(fn, delay);
  };
}
```

**错误3：用防抖做滚动动画（应该用节流）**
```js
// ❌ 错误：滚动时用防抖——只有停下来了才执行，动画会卡顿
window.addEventListener('scroll', debounce(function() {
  updateScrollProgress();                              // 更新滚动进度条——只有停手才动
}, 100));
// 用户感受：滚动时进度条不动，停下来突然跳到新位置——体验很差

// ✅ 正确：滚动过程中需要反馈 → 用节流
window.addEventListener('scroll', throttle(function() {
  updateScrollProgress();                              // 每 100ms 更新一次，动画连续流畅
}, 100));
```
:::

:::task{title="动手试试 — 在控制台中实现防抖和节流"}
本练习在浏览器控制台（F12 → Console）中逐段运行即可。

::::step{purpose="亲手实现一个防抖函数会让你深刻理解它的工作方式——每次调用重置计时器，只有停止触发后才真正执行。clearTimeout 是防抖的'关门重置'按钮。" expected="快速连续输入 5 个字符后，等半秒只输出 1 次日志，显示最终搜索词。"}
实现 `debounce` 函数并应用到输入事件：
```js
// 第一步：实现 debounce
function debounce(fn, delay) {
  let timer;                                           // 闭包变量——存储定时器 ID
  return function() {
    clearTimeout(timer);                               // 清除上次的定时器
    timer = setTimeout(function() {                    // 重新设置定时器
      fn();                                            // delay 毫秒后执行原函数
    }, delay);
  };
}

// 第二步：模拟搜索输入——用循环快速调用 5 次
const search = debounce(function() {
  console.log('搜索请求发出！');                       // 这行应该只出现 1 次
}, 500);
// 快速调用 5 次
for (let i = 0; i < 5; i++) {
  search();                                            // 每次调用都重置定时器
  console.log('输入第 ' + (i + 1) + ' 次');
}
// 观察：5 次"输入"先全部输出，500ms 后只输出 1 次"搜索请求发出！"
```
::::

::::step{purpose="节流的实现和防抖的思路不同——它关心'距离上次执行过了多久'而不是'有没有新的调用'。通过记录 lastTime，配合 Date.now()，实现固定频率执行。" expected="持续触发时大约每隔 1 秒输出一次，而不是每次触发都输出。"}
实现 `throttle` 函数并验证：
```js
// 第一步：实现 throttle
function throttle(fn, interval) {
  let lastTime = 0;                                    // 闭包变量——上次执行的时间戳
  return function() {
    const now = Date.now();                            // 当前时间戳
    if (now - lastTime >= interval) {                  // 距离上次执行 >= interval 毫秒？
      fn();                                            // 执行原函数
      lastTime = now;                                  // 更新上次执行时间
    }
  };
}

// 第二步：模拟快速连续触发——用 setInterval 每秒触发 10 次，但 throttle 只允许每秒执行 1 次
let triggerCount = 0;
let execCount = 0;
const throttled = throttle(function() {
  execCount++;
  console.log('节流执行——第 ' + execCount + ' 次（总共触发了 ' + triggerCount + ' 次）');
}, 1000);

const intervalId = setInterval(function() {            // 每 100ms 触发一次
  triggerCount++;
  throttled();                                         // 调用节流函数
  if (triggerCount >= 20) {                            // 触发 20 次后停止（共 2 秒）
    clearInterval(intervalId);
    console.log('最终：触发了 ' + triggerCount + ' 次，实际执行了 ' + execCount + ' 次');
    // 预期：触发 20 次，实际执行 2~3 次（取决于时间精度）
  }
}, 100);
```
::::

::::step{purpose="这个对比实验让你亲眼看到三种模式的效果差异——不是靠'感觉'判断，而是用计数器量化。'测量优于猜测'是性能优化的核心习惯。" expected="10 次快速触发后：无控制约 10 次，防抖约 1 次，节流约 1~2 次。"}
对比三种模式——无控制 vs 防抖 vs 节流：
```js
// 用同一段"快速触发"逻辑测试三种模式
// 对比它们的实际执行次数——亲自验证上面那张对比表
// 快速的触发 10 次后：
// - 无控制 → 执行 10 次
// - 防抖（500ms）→ 执行 1 次（最后一次）
// - 节流（1000ms）→ 执行 1~2 次
```
::::

:::

:::hint{title="实际项目中你不需要手写"}
生产环境中，Lodash 库提供了 `_.debounce()` 和 `_.throttle()`，功能更完善（支持 leading/trailing 选项、取消功能等）。但理解原理能让你：
1. 面对性能问题时知道该用什么工具
2. 面试时不至于一脸懵
3. 能看懂别人代码里的防抖/节流实现
:::

:::recap
你学会了防抖和节流——控制高频事件执行频率的两种核心模式。**防抖**等你停下来再执行（适合搜索输入、表单验证、resize 重算——关心最终结果），核心原理是每次触发重置定时器。**节流**按固定频率执行（适合滚动加载、拖拽跟随、按钮限频——需要过程反馈），核心原理是记录上次执行时间，不够间隔就跳过。两者都依赖**闭包**存储状态（timer 或 lastTime）。实际项目中，选择防抖还是节流看一句话：关心最终结果用防抖，需要过程反馈用节流。
:::

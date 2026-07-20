# 防抖与节流 — 控制函数执行的节奏

:::analogy
防抖就像电梯门——有人进来就重新计时，等没人进出了才关门。节流就像地铁闸机——不管多少人涌过来，每分钟只放固定数量的人通过。这两个模式让你控制函数执行的频率，提升页面性能。
:::

:::explain{title="问题：事件触发得太频繁了"}
先看一段代码，在输入框里随便打几个字：

```js
const input = document.querySelector('#searchInput');
input.addEventListener('input', function() {
  console.log('发起搜索请求：' + input.value);
});
```

如果你输入"笔记本电脑"5 个字，控制台会输出 5 次——每个字输入时都触发了一次。如果每次都是向服务器发请求，那就意味着：

- 输入 5 个字 = 5 次网络请求
- 但只有最后一次是用户真正想要的搜索结果
- 前面 4 次请求浪费了带宽和服务器资源

同样的问题还发生在：

- **scroll 事件**——滚动鼠标滚轮一刻，可能触发几十次
- **resize 事件**——拖拽窗口边缘时，每移动 1 像素就触发一次
- **mousemove 事件**——鼠标移动时每秒触发上百次

解决方案就是**防抖（Debounce）**和**节流（Throttle）**。
:::

:::explain{title="防抖（Debounce）——等你停下来再执行"}
防抖的策略：**"你一直动我就不动，等你停下来我才动。"**

具体实现：每次事件触发时，重置一个计时器。只有在指定时间内没有新的事件触发，才执行函数。

```js
function debounce(fn, delay) {
  let timer = null;
  return function() {
    // 每次调用，清除上一次的定时器
    clearTimeout(timer);
    // 重新定时——如果在 delay 时间内没有新调用，才执行
    timer = setTimeout(function() {
      fn();
    }, delay);
  };
}

// 使用——搜索输入框
const searchInput = document.querySelector('#searchInput');
searchInput.addEventListener('input', debounce(function() {
  console.log('搜索：' + searchInput.value);
}, 500)); // 用户停止输入 500 毫秒后才执行
```

**防抖的最佳使用场景：**

- 搜索输入框——等用户打完字再请求
- 表单验证——等用户填写完再校验
- 窗口 resize 回调——等用户调整完窗口再重新计算布局
- 按钮连续点击——防止重复提交

形象理解：一群人陆续进电梯，电梯门刚要关，又进来一个人，关门重新倒计时。**只有没人进了，门才真正关上。**
:::

:::explain{title="节流（Throttle）——固定频率执行"}
节流的策略：**"不管你来多少，我每分钟只处理固定数量。"**

具体实现：记录上一次执行的时间，只有距离上次执行超过指定间隔，才再次执行。

```js
function throttle(fn, interval) {
  let lastTime = 0;
  return function() {
    const now = Date.now();
    if (now - lastTime >= interval) {
      fn();
      lastTime = now;
    }
  };
}

// 使用——滚动事件
window.addEventListener('scroll', throttle(function() {
  console.log('页面滚动了');
}, 1000)); // 最多每秒执行一次
```

**节流的最佳使用场景：**

- 页面滚动（scroll）——滚动加载、回到顶部按钮的显隐
- 鼠标移动（mousemove）——拖拽效果、跟随鼠标的 UI
- 游戏中的射击操作——限制最快射击频率
- 窗口 resize 回调——在调整窗口过程中也需要持续更新

形象理解：地铁闸机不管多少人排队，每分钟只放固定数量通过。**你敢来我就敢放，但有节奏地放。**
:::

:::explain{title="防抖 vs 节流——怎么选？"}
一张对比表帮你在场景中做选择：

| 对比维度 | 防抖（Debounce） | 节流（Throttle） |
|---------|-----------------|-----------------|
| 核心策略 | 等你停下来 | 固定频率执行 |
| 第一次事件 | 不执行（要等） | 可以立即执行 |
| 持续触发时 | 一直不执行 | 每隔 N ms 执行一次 |
| 最后一次事件 | 最终一定会执行 | 不保证执行最后一次 |

**选择口诀：**

- 关心"**最终结果**" → 用防抖。比如搜索：用户只关心最终输入完整的搜索词。
- 关心"**过程反馈**" → 用节流。比如滚动时显示当前位置：需要持续反馈但不能太密集。
- 关心"**安全限制**" → 用节流。比如防止按钮重复点击：必须保证点击能生效但不能连续触发。
:::

:::explain{title="实际对比——看看到底差多少"}
用一段代码直观对比三种情况——无控制、防抖、节流：

```js
// 模拟快速事件触发（比如疯狂点击按钮）
let normalCount = 0, debounceCount = 0, throttleCount = 0;

// 1. 无控制——每次点击都执行
document.querySelector('#btn1').addEventListener('click', function() {
  normalCount++;
  console.log('无控制执行次数：' + normalCount);
});

// 2. 防抖——停下来才执行
document.querySelector('#btn2').addEventListener('click', debounce(function() {
  debounceCount++;
  console.log('防抖执行次数：' + debounceCount);
}, 500));

// 3. 节流——最多每秒一次
document.querySelector('#btn3').addEventListener('click', throttle(function() {
  throttleCount++;
  console.log('节流执行次数：' + throttleCount);
}, 1000));

// 结论：你快速点 10 次
// - 无控制：输出 10 次
// - 防抖：  输出 1 次（只有最后一次）
// - 节流：  输出 1~2 次（取决于点击速度和间隔设置）
```
:::

:::hint{title="进阶小知识"}
实际项目中你不需要自己写防抖和节流函数——Lodash（一个流行的工具库）提供了 `_.debounce()` 和 `_.throttle()`，功能更完善。但理解原理能让你在面对性能问题时知道该用什么工具。
:::

:::task{title="动手试试 ✨"}
::::step{purpose="亲手实现一个防抖函数会让你深刻理解它的工作方式——每次调用重置计时器，只有停止触发后才真正执行。clearTimeout 是防抖的'关门重置'按钮。" expected="快速连续输入 5 个字符后，等半秒只输出 1 次日志，显示最终搜索词。"}
实现 debounce 函数并应用到搜索输入框

```js
function debounce(fn, delay) {
  let timer;
  return function() {
    // 清除上次的定时器
    // 重新设置定时器
  };
}
const input = document.querySelector('#searchInput');
input.addEventListener('input', debounce(function() {
  console.log('搜索请求：' + input.value);
}, 500));
```
::::

::::step{purpose="节流的实现和防抖的思路不同——它关心'距离上次执行过了多久'而不是'有没有新的调用'。理解这两种模式的区别，是选择正确工具的关键。" expected="持续滚动页面时，控制台大约每隔 1 秒输出一次，而不是每次滚动都输出。"}
实现 throttle 函数并应用到滚动事件

```js
function throttle(fn, interval) {
  let lastTime = 0;
  return function() {
    // 获取当前时间
    // 如果距离上次执行超过了间隔，就执行
  };
}
window.addEventListener('scroll', throttle(function() {
  console.log('滚动了——处理位置更新');
}, 1000));
```
::::

::::step{purpose="这个对比实验让你亲眼看到三种模式的效果差异——不是靠'感觉'判断，而是用计数器量化。这种'测量优于猜测'的习惯是性能优化的核心思维。" expected="10 次快速点击后：无控制约 10 次，防抖约 1 次，节流约 1~2 次（取决于间隔）。"}
对比三种情况——无控制 vs 防抖 vs 节流

```js
// 分别统计三种方式在 10 次快速点击下的执行次数
// 验证：无控制执行最多，防抖只有最后 1 次，节流按频率执行
```
::::

:::

:::recap
你学会了防抖和节流——控制函数执行频率的两种核心模式。防抖等你停下来再执行（适合搜索输入、表单验证），节流按固定频率执行（适合滚动、拖拽）。选择依据：关心最终结果用防抖，需要过程反馈用节流。你不需要每次手写实现，但理解原理让你知道什么时候用什么工具。
:::

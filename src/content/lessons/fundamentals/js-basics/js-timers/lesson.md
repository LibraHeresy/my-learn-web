# 定时器 — 让代码按时间节奏跑起来

:::analogy
JavaScript 有两种定时器，对应现实生活中两种计时场景：

**`setInterval` 像厨房计时器**——设定"每 3 分钟响一次"，它就不停地响、响、响……直到你手动关掉。适合"每隔一段时间重复做同一件事"——比如轮播图每 3 秒切一张、仪表盘每 5 秒刷新一次、游戏每秒更新一帧。

**`setTimeout` 像泡面倒计时**——设定"3 分钟后提醒我"，时间到了就响一次，然后就结束了。适合"等一会儿再做某件事"——比如用户停止输入 500ms 后再发搜索请求、页面加载 2 秒后弹出欢迎提示、表单提交 3 秒后跳转页面。

两者的时间单位都是**毫秒**（ms）：1000ms = 1 秒，500ms = 0.5 秒，3000ms = 3 秒。
:::


:::prerequisite
**本节你需要知道这些词：**

- **函数**：定义和调用函数，理解回调函数的概念
- **DOM 基础**：用 `document.querySelector()` 找到页面元素并修改 `textContent`
- **事件**：了解 `addEventListener("click", function() { ... })` 的基本用法
:::

:::explain{title="setInterval — 定时重复执行"}
`setInterval` 每隔指定时间重复执行回调函数——像闹钟每隔一段时间响一次：

```js
// 每 1000 毫秒（1 秒）执行一次
let timer = setInterval(function() {
  count++;
  display.textContent = count;
}, 1000);

// 停止定时器
clearInterval(timer);
```

**两个参数：**
- 第一个：要重复执行的函数（回调函数）
- 第二个：间隔时间，单位毫秒

**时间换算速查表：**

| 毫秒数 | 等于 |
|--------|------|
| 500 | 0.5 秒（半秒） |
| 1000 | 1 秒 |
| 2000 | 2 秒 |
| 3000 | 3 秒 |
| 5000 | 5 秒 |
| 60000 | 1 分钟 |

`setInterval` 的返回值是一个**定时器 ID**（一个数字），你要把它存下来——以后 `clearInterval(timer)` 要用这个 ID 来找到并停止对应的定时器。如果没有保存这个 ID，你就永远无法停止这个定时器了。
:::

:::explain{title="setTimeout — 延迟执行一次"}
`setTimeout` 等待指定时间后执行**一次**回调函数——像设定一个定时提醒：

```js
// 3 秒后弹出提示
setTimeout(function() {
  alert("3 秒到了！");
}, 3000);

// 在还没执行前可以取消
let timer = setTimeout(function() {
  console.log("这条不会打印出来");
}, 5000);
clearTimeout(timer);  // 取消了！回调函数不会执行
```

**适合的场景：** 延迟提示、防抖（用户停止输入后再发请求）、操作后延时跳转。

`clearTimeout` 的工作原理和 `clearInterval` 一样——传入定时器 ID，在回调执行前取消它。一旦回调已经执行了，`clearTimeout` 就没用了。
:::

:::explain{title="setInterval 的隐患 — 任务重叠问题"}
`setInterval` 有一个初学者不容易意识到的陷阱：**如果回调函数的执行时间超过了间隔时间，任务会重叠执行。**

```js
// ❌ 危险写法：setInterval 可能造成任务堆积
setInterval(function() {
  fetchData();  // 假设请求需要 2 秒才能返回
}, 1000);       // 但每 1 秒就触发一次！
```

**时间线对比：**

```
setInterval（间隔 1 秒，任务耗时 2 秒）：
0s    1s    2s    3s    4s    5s
|-----|-----|-----|-----|-----|
[====任务1====]          ← 第 1 次触发，耗时 2 秒
      [====任务2====]    ← 第 1 秒又触发了！和第 1 个重叠！
            [====任务3====] ← 第 2 秒又触发！3 个任务同时跑！
```

**任务重叠的后果：** 如果你在请求后端数据，可能同时发出多个重复请求；如果你在操作 DOM，多个回调可能互相覆盖对方的修改结果。

**解决方案：用 `setTimeout` 递归循环。**

```js
// ✅ 安全写法：当前任务完成后，再等 1 秒启动下一次
function safeLoop() {
  fetchData().then(function() {   // 等请求完成
    setTimeout(safeLoop, 1000);   // 请求完成后，再等 1 秒
  });
}
safeLoop();  // 启动
```

**setTimeout 递归时间线（同样是 1 秒间隔，任务耗时 2 秒）：**
```
0s    1s    2s    3s    4s    5s
|-----|-----|-----|-----|-----|
[====任务1====]              ← 第 1 次执行，耗时 2 秒
                  |--|       ← 等 1 秒
                  [====任务2====] ← 第 4 秒才开始第 2 次
```

**永远不会重叠！** 因为下一次任务要等当前任务完成 + 等待间隔时间之后才会启动。

**什么时候用哪个？**

| 场景 | 推荐方法 | 原因 |
|------|----------|------|
| 简单计数器、时钟显示 | `setInterval` | 每 1 秒 `count++` 耗时几乎为 0，不会重叠 |
| 轮播图自动切换 | `setInterval` | CSS 过渡是瞬时触发的，回调很快执行完 |
| 请求后端 API 刷新数据 | `setTimeout` 递归 | 请求耗时不确定，等返回后再排下一次 |
| 文件上传进度轮询 | `setTimeout` 递归 | 每次请求可能耗时不同，不能按固定间隔发 |
| 需要随时条件停止的循环 | `setTimeout` 递归 | 配合条件判断灵活控制 |

**一条判断准则：** 如果你的回调函数里只有同步操作（算术、赋值、DOM 更新），用 `setInterval` 就够了。如果涉及网络请求、文件读写或任何耗时不确定的操作，用 `setTimeout` 递归。
:::

:::example{title="看看实际效果 — 节拍器"}
打开右侧的 `script.js`，你会看到一个完整的节拍器实现。点击"开始节拍"，计数器每秒 +1；点击"暂停"，停止计数；点击"重置"，数字归零：

```js
let count = 0;
let timer = null;
let display = document.querySelector("#display");
let startBtn = document.querySelector("#startBtn");
let stopBtn = document.querySelector("#stopBtn");
let resetBtn = document.querySelector("#resetBtn");

// 开始 —— 用 setInterval 每秒让 count 加 1
startBtn.addEventListener("click", function() {
  if (timer) return;  // 防止重复启动（timer 不为 null 说明已经在运行）
  timer = setInterval(function() {
    count++;
    display.textContent = `节拍 ${count}`;
  }, 1000);
});

// 暂停 —— clearInterval 停止定时器
stopBtn.addEventListener("click", function() {
  clearInterval(timer);
  timer = null;  // 重置为 null，方便下次 start 判断
});

// 重置 —— 先停止，再归零
resetBtn.addEventListener("click", function() {
  clearInterval(timer);
  timer = null;
  count = 0;
  display.textContent = "点击开始";
});
```

**关键细节解读：**
- `timer = null` 不只是清空变量——它是"运行状态"的标志位。`timer` 不为 `null` 说明定时器正在跑，`startBtn` 会拒绝重复启动
- `clearInterval(timer)` 之后把 `timer` 设为 `null` 是一个好习惯——表示"当前没有定时器在运行"
- `if (timer) return;` 是一种**防重复启动**的守卫——如果已经有定时器在跑，直接返回，什么也不做

切换到**预览区**，点击"开始节拍"看数字每秒自动递增。
:::

:::task{title="动手试试 ✨"}
::::step{purpose="让你感受 `setInterval` 的定时重复执行特性——不需要手动点击，代码自动按时间间隔运行。`clearInterval` 用来停止，`timer = null` 是良好的状态管理习惯。" expected="点击开始后数字每秒自动 +1；点击暂停后停止递增；点击重置后数字归零，显示「点击开始」。三个按钮各司其职，互不冲突。"}

打开 `script.js`，先读一遍整个文件（用 `fs.readFileSync` 或直接编辑器中打开）。

1. 切换到**预览区**
2. 点击「开始节拍」——观察数字从 1 开始每秒自动递增
3. 点击「暂停」——数字停止变化
4. 再点击「开始节拍」——从当前数字继续递增（不会重新从 1 开始）
5. 点击「重置」——数字归零，显示"点击开始"

**思考执行流程：** 点击"开始"调用了 `setInterval(fn, 1000)`，它每隔 1000ms 执行一次回调函数。回调函数里做两件事：`count++`（数据变了）和 `display.textContent = ...`（页面更新）。这就是"定时器 + 数据更新 + 页面刷新"的完整链路。
::::

::::step{purpose="`setInterval` 的第二个参数是毫秒数，决定了执行频率。1000ms = 1秒 = 慢，500ms = 0.5秒 = 快。理解时间单位和执行频率的关系，让你能精确控制动画节奏。" expected="修改为 500ms 后数字变化速度翻倍；改为 200ms 后飞速递增。一个毫秒数的变化，整个节拍器的节奏完全不同。"}

修改节拍速度。

1. 打开 `script.js`，找到 `setInterval` 调用：
```js
timer = setInterval(function() {
  count++;
  display.textContent = `节拍 ${count}`;
}, 1000);
```

2. 把 `1000` 改成 `500`（半秒）。保存文件，刷新预览区，点击开始——感受翻倍的速度。

3. 再改成 `200`（0.2 秒）——数字飞速递增，快到你几乎看不清。

4. 试试改成 `3000`（3 秒）——慢悠悠的，像秒针在走。

**关键理解：** 这个数字控制的是"回调函数的执行频率"，不是动画的流畅度。数字越小，回调被调用的越频繁。
::::

::::step{purpose="`setTimeout` 是延迟执行一次，适合做「定时停止」「延迟提示」等操作。和 `setInterval` 配合使用：一个控制持续执行，一个控制延迟停止。" expected="点击开始后节拍自动递增，3 秒后自动停止（数字不再变化）。你不需要手动按暂停——`setTimeout` 帮你做了。"}

在「开始节拍」的函数中增加一个 `setTimeout`，实现"自动执行 3 秒后停止"。

1. 打开 `script.js`，找到 `startBtn` 的 `addEventListener` 回调函数。

2. 在回调函数内部（`timer = setInterval(...)` 之后）添加：
```js
setTimeout(function() {
  clearInterval(timer);
  timer = null;
  display.textContent = `节拍停止在 ${count}`;
}, 3000);
```

3. 完整的 `startBtn` 回调变成：
```js
startBtn.addEventListener("click", function() {
  if (timer) return;
  timer = setInterval(function() {
    count++;
    display.textContent = `节拍 ${count}`;
  }, 1000);

  // 3 秒后自动停止
  setTimeout(function() {
    clearInterval(timer);
    timer = null;
    display.textContent = `节拍停止在 ${count}`;
  }, 3000);
});
```

4. 保存文件，刷新预览区，点击"开始节拍"——节拍自动跑 3 秒后停下来，显示最终数字。

**思考：** 为什么 `clearInterval` 要放在 `setTimeout` 里？因为 `setTimeout` 是延迟执行——3 秒后才运行，正好在节拍跑了 3 轮之后把定时器关掉。
::::

::::step{purpose="综合运用 `setInterval` + 取模运算符 `%` + DOM 样式修改。`count % 4` 循环返回 0,1,2,3,0,1,2,3……这正是「4 个一组循环」的数学本质。" expected="节拍数字每 4 拍变换一次颜色，4 种颜色循环往复。你的节拍器不仅会数数，还会「变色」——像交通灯的红黄绿循环一样有了视觉节奏感。"}

挑战：让节拍每 4 拍换一个颜色。

在 `setInterval` 的回调函数中用 `count % 4` 判断当前是第几拍：

```js
// 在 setInterval 的回调函数里，count++; 之后：
let colors = ["#5B8C5A", "#C9A96E", "#4A90D9", "#8B2E2E"];
let colorIndex = count % 4;         // count % 4 返回 0, 1, 2, 3, 0, 1, 2, 3...
display.style.color = colors[colorIndex];
```

**`%` 取模运算解释：** `count % 4` 就是 "count 除以 4 的余数"：
- `1 % 4 = 1`、`2 % 4 = 2`、`3 % 4 = 3`、`4 % 4 = 0`
- `5 % 4 = 1`、`6 % 4 = 2`……周而复始

这个技巧在轮播图、loading 动画、游戏状态机中大量使用。

**常见错误提醒：** 如果忘记 `clearInterval(timer)`，定时器会永远运行下去，即使你离开页面也不会自动停止——这就是**内存泄漏**的典型场景。养成习惯：凡是有 `setInterval` 的地方，就一定有对应的 `clearInterval`。凡是组件要销毁（比如轮播图组件被移除），就要先清理定时器。
::::

:::

:::recap
这一节你学会了用定时器控制代码的执行时间——`setInterval` 每隔一段时间重复执行，`setTimeout` 等一段时间后执行一次。

**核心要点：**
- 时间单位是**毫秒**：1000ms = 1 秒，500ms = 0.5 秒，3000ms = 3 秒
- `setInterval(fn, 毫秒)` 返回定时器 ID，用 `clearInterval(id)` 停止
- `setTimeout(fn, 毫秒)` 返回定时器 ID，用 `clearTimeout(id)` 在回调执行前取消
- **危险场景：** `setInterval` 的间隔小于任务耗时 → 任务重叠。解决方案是 `setTimeout` 递归循环
- **使用准则：** 纯计算/UI 操作用 `setInterval`；网络请求/耗时操作用 `setTimeout` 递归
- **常见错误：** 忘记清理定时器 → 内存泄漏；`timer` 不重置为 `null` → 状态混乱

**你的工具箱又充实了一格。** 加上定时器，你能实现：自动轮播图、实时倒计时、自动刷新仪表盘、loading 动画、防抖搜索、延时提示……页面不再静止不动，而是有了**时间维度上的生命力**。
:::

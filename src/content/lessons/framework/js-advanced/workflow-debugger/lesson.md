# 断点调试 — 用 Sources 面板听诊代码

:::analogy
看球赛时，裁判会看慢镜头回放来确定关键瞬间发生了什么。断点调试就是代码的慢镜头回放--让程序在某一行暂停，然后一帧一帧检查所有变量的状态。
:::

:::prerequisite
**本节你需要知道这些词：**

- DevTools Sources 面板 -- 浏览器开发者工具中的源代码面板，可以查看、调试 JS 文件
- 断点（breakpoint）-- 设置在代码行上的暂停标记，程序运行到这一行会停下
- console.log -- 在控制台打印变量值
:::

:::explain{title="先看问题：纯靠 console.log 有多痛苦"}

你写了一个"猜数字"游戏：

```js
let target = Math.floor(Math.random() * 100);  // 随机目标数字 0~99
let score = 100;                                // 初始分数
let attempts = 0;                               // 猜测次数

function guess(num) {
  attempts++;                  // 每猜一次，次数加一
  if (num > target) {
    score -= 10;               // 猜大了扣 10 分
    return "太大了！";
  } else if (num < target) {
    score -= 10;               // 猜小了扣 10 分
    return "太小了！";
  } else {
    return "恭喜！猜对了！得分：" + score;
  }
}
```

假设你输入了 50，返回"太小了！"，但你不确定 score 真的减了 10、attempts 真的加了 1。

**纯靠 console.log 的方式：**

```js
function guess(num) {
  console.log("attempts 加之前：", attempts);
  attempts++;
  console.log("attempts 加之后：", attempts);
  console.log("num：", num, "target：", target);
  if (num > target) {
    console.log("进去大于分支");
    console.log("score 减之前：", score);
    score -= 10;
    console.log("score 减之后：", score);
    return "太大了！";
  } else if (num < target) {
    console.log("进去小于分支");
    // ...再写 6 行 console.log
  }
  // ...继续
}
```

你要为每一个你想看的变量写一行 console.log。想看 5 个变量就写 5 行 log。而且你**只能看到你 log 了的东西**--如果你没 log `target`，你就不知道 target 的值。

**断点调试的方式：一个断点，看全部变量，零行 log。**

:::

:::explain{title="解决方案：Sources 面板 + 断点"}

**操作步骤：**

1. 按 F12 打开 DevTools
2. 切换到 **Sources（源代码）** 面板
3. 左侧文件列表找到你的 JS 文件（通常是 script.js）
4. 在你想暂停的那一行**点击行号**--出现蓝色箭头图标，这就是断点
5. 刷新页面或触发事件（点击按钮等）
6. 程序在断点处暂停！右侧 Scope 面板显示**所有**变量的当前值

**暂停后的四个控制按钮（像视频遥控器）：**

| 按钮 | 快捷键 | 作用 | 什么时候用 |
|------|--------|------|-----------|
| Resume | F8 | 继续执行直到下一个断点 | 不想一步步看，跳到下一个暂停点 |
| Step Over | F10 | 执行当前行，不进入函数内部 | 确定当前行没问题，直接看下一行 |
| Step Into | F11 | 进入函数内部逐行执行 | 想看函数里面的执行过程 |
| Step Out | Shift+F11 | 跳出当前函数 | 确认函数没问题，回到调用处 |

**断点暂停时你能做什么：**

- **鼠标悬停**在任何变量上，弹出它的当前值
- 右侧 **Scope 面板**：看所有局部变量和全局变量的值
- 右侧 **Watch 面板**：添加自定义表达式，实时追踪（如 `target - num`）
- **Console 面板**：直接输入变量名回车，测试表达式

**回到猜数字的例子：在 if (num > target) 这行设一个断点。** 点击按钮后程序暂停，右侧 Scope 面板清清楚楚显示：num = 50, target = 73, score = 100, attempts = 1。所有变量一目了然，零行 console.log。

:::

:::explain{title="条件断点：只在特定情况暂停"}

普通断点是"每次到这里都停"。如果循环 100 次，你得按 100 次 F8。条件断点解决这个问题：

**操作：** 右键行号 -> "Add conditional breakpoint" -> 输入条件表达式。

```js
// 循环 100 次，只有 i === 47 时才暂停
for (let i = 0; i < 100; i++) {
  process(data[i]);  // 右键这行 -> Add conditional breakpoint -> 输入 i === 47
}
// 程序正常运行 47 次，第 48 次（i=47）自动暂停，不用手动跳过 46 次！
```

**常用条件断点表达式：**
- `i === 47` -- 循环到第 48 次停
- `num > target` -- 只在猜大了时停
- `attempts > 5` -- 猜测超过 5 次时停
- `data.name === undefined` -- 数据缺少 name 字段时停

:::

:::explain{title="常见错误"}

**错误 1：设了断点但程序没停**

可能原因：断点设在了不会执行的代码行上（比如 if 的 else 分支，但条件永远为 true）；或者你忘记刷新页面/触发事件。

```js
// ❌ 断点设在这里永远不会触发
if (false) {
  console.log("这行永远不会执行");  // 断点白设
}
```

**错误 2：分不清 Step Over (F10) 和 Step Into (F11)**

```js
// 当前停在 processScore(score) 这一行
let result = processScore(score);  // 停在这行

// F10 (Step Over)：直接执行完 processScore，停在下一行
// 你想看 processScore 的返回值但不关心内部细节时用 F10

// F11 (Step Into)：跳进 processScore 函数内部，逐行执行
// 你怀疑 processScore 内部有问题时用 F11
```

**错误 3：忘记清除断点**

调试完忘记删除断点，下次刷新页面时程序无缘无故暂停了，吓得以为代码崩了。

:::

:::explain{title="实际工作中你会用这个来..."}

- **排查复杂数据流**：数据经过了 5 个函数的处理，最后结果不对。在第一个函数的入口设断点，F10 一步步跟到最后一个函数，中间哪一步数据变样了一目了然。
- **调试第三方库**：用了别人的代码，不知道内部逻辑。在调用处设断点，F11 进入源码，跟踪它的处理过程。
- **面试手写代码调试**：面试官给你一个有 bug 的代码让你修，你熟练打开 Sources 面板设断点，比靠眼睛看代码更快、更可靠。

:::

:::task{title="动手试试"}

打开 `script.js`，里面是一个猜数字游戏。用 Sources 面板断点来理解它的运行逻辑。

::::step{purpose="断点比 console.log 强在它能同时看到所有变量的值，一个断点顶二十行 log。" expected="程序在断点处暂停，右侧 Scope 面板显示所有变量及其值。"}
按 F12 -> Sources 面板，在 guess 函数的第一行（attempts++）点击行号设置断点。在输入框输入数字，点击按钮。观察 Scope 面板。
::::

::::step{purpose="逐行执行让你看到真实的执行路径--代码走了 if 还是 else if？score 减了没有？就像慢镜头回放每一步。" expected="每按一次 F10，代码前进一行，Scope 面板中的变量值实时更新。"}
使用 Step Over（F10）逐行执行 guess 函数，观察 score 和 attempts 如何变化，以及代码走进了哪个分支。
::::

::::step{purpose="条件断点让你只关注感兴趣的情况，不用手动跳过无关的执行。" expected="只有当输入 81~89 之间的数字时程序才暂停，其他数字正常执行不停。"}
在 if 判断行设置条件断点：右键行号 -> Add conditional breakpoint -> 输入 `num > 80 && num < 90`。测试不同范围数字的触发情况。
::::

::::step{purpose="Watch 面板让你监控动态表达式，无需修改代码就能实时追踪计算值。" expected="Watch 面板实时显示差值，正数表示猜小了，负数表示猜大了。"}
（挑战）在 Watch 面板添加表达式 `target - num` 和 `Math.abs(target - num)`，每次暂停时看看你离答案有多远。
::::

:::

:::recap
断点调试让你在代码任意行暂停，查看所有变量的值。F10 (Step Over) 逐行执行，F11 (Step Into) 进入函数内部。条件断点只在满足条件时暂停。Sources 面板的 Scope 视图让你零 log 就能看到全部变量状态。
:::

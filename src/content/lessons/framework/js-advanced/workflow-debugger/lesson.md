# 断点调试 — 用 Sources 面板听诊代码

:::music-analogy
console.log 就像在排练中让乐手报一遍自己的音符——能发现问题，却看不清全局。断点调试则像指挥让乐队在某一个小节停下来，逐个声部检查：长笛吹的是什么音？定音鼓在这个拍点上的力度对吗？你可以在任意时刻凝固住整个程序，查看所有变量的值，然后一行一行地执行，观察数据如何流动。
:::

:::explain{title="console.log 不够用了吗？"}
你一直在用 console.log 来调试代码——这在简单场景下确实管用。但当你遇到复杂问题时：
- 变量在 5 个地方被修改，不知道是谁改错了
- 循环 100 次，不知道第 47 次为什么出问题
- 异步代码的执行顺序让人困惑
- 想看某个时刻**所有**变量的值，而不是只 log 一个
这时候你需要断点（breakpoint）——在代码的某一行设置一个暂停标记，程序运行到这里就会停下来，你可以慢慢检查一切。
**打开 DevTools Sources 面板：**
1. 按 F12 打开开发者工具
2. 切换到 Sources（源代码）面板
3. 左侧找到你的 JS 文件
4. 点击行号设置断点（出现蓝色箭头标记）
5. 刷新页面或触发事件——程序在断点处暂停！
:::

:::explain{title="断点操作 — 你的指挥手势"}
程序暂停后，你可以使用以下控制按钮（像指挥的不同手势）：
| 按钮 | 快捷键 | 作用 |
|------|--------|------|
| Resume | F8 | 继续执行，直到下一个断点 |
| Step Over | F10 | 执行当前行，不进入函数内部 |
| Step Into | F11 | 进入函数内部，逐行执行 |
| Step Out | Shift+F11 | 跳出当前函数 |
暂停时，你可以：
- **鼠标悬停**在任何变量上查看它的值
- 在右侧 **Scope（作用域）** 面板查看所有局部和全局变量
- 在 **Watch（监视）** 面板添加表达式，实时追踪其值变化
- 在 **Console** 面板直接输入变量名来测试表达式
> 🎯 就像一个指挥随时可以指着某个乐手问你这里奏的是什么，你随时可以查看任何变量的值。
:::

:::explain{title="条件断点与 DOM 断点"}
**条件断点：** 右键点击行号 → "Add conditional breakpoint" → 输入条件表达式（如 i === 47）。只有当条件为 true 时才会暂停。这在调试第 47 次循环出问题时是救星。
```js
// 条件断点表达式：i === 47
// 循环到第 48 次（i=47）时才会暂停
for (let i = 0; i < 100; i++) {
  processItem(data[i])
}
```
**DOM 断点：** 在 Elements 面板中右键一个 DOM 元素 → Break on → 选择 subtree modifications / attribute modifications / node removal。当这个元素被修改、删除或属性变化时，自动跳转到修改它的 JS 代码。
**XHR/Fetch 断点：** 在 Sources 面板右侧的 XHR/fetch Breakpoints 中添加 URL 片段（如 search）。当有请求匹配这个 URL 时自动暂停——调试网络请求的神器。
:::

:::example{title="看例子"}
下面的代码是一个猜数字游戏。请在 Sources 面板中设置断点来调试：
```js
let target = Math.floor(Math.random() * 100)
let score = 100
let attempts = 0
function guess(num) {
  attempts++
  if (num > target) {
    score -= 10
    return '太大了！'
  } else if (num < target) {
    score -= 10
    return '太小了！'
  } else {
    // 在这里设置一个断点——检查 num、target、score 的值
    return '恭喜！你得分为 ' + score
  }
}
```
打开 F12 → Sources → 在 return 那行设置断点 → 在输入框输入数字 → 点击按钮触发 guess() → 程序暂停，查看右侧面板中所有变量。
:::

:::task{title="动手试试 ✨"}
::::step{purpose="断点是比 console.log 更强大的调试工具——你可以在任意时刻\"凝固\"程序，查看所有变量的值。就像指挥让乐队在某一小节停下，逐个声部检查每个乐手的状态。" expected="程序在断点处暂停，右侧 Scope 面板显示 num、target、score、attempts 等所有局部变量和它们的当前值。"}
打开 F12 → Sources 面板，在 guess 函数的第一行（attempts++）设置断点，输入数字并触发 guess()
::::

::::step{purpose="逐行执行让你看到代码的真实执行路径——走到了 if 还是 else if？score 减了没有？就像用慢镜头回放演奏，看清每一个音符的来龙去脉。" expected="每按一次 F10，代码前进一行，Scope 面板中的变量值实时更新。你能看到 if 分支的跳转逻辑。"}
使用 Step Over（F10）逐行执行，观察 score 和 attempts 如何随每次判断而变化
::::

::::step{purpose="条件断点只在你指定的条件满足时才暂停。这在调试\"第 47 次循环才出错\"的问题时是救星——你不用手动跳过 46 次无用的暂停。" expected="只有当输入 81~89 之间的数字时，程序才会在断点处暂停；其他数字正常执行不停。"}
在 if (num > target) 行设置条件断点，右键行号 → Add conditional breakpoint → 输入 num > 80 && num < 90
::::

::::step{purpose="Watch 面板让你监控动态表达式，无需修改代码就能观察数据关系。就像在排练中临时加入一个测量工具，实时显示\"当前音高和目标音高的差距\"。" expected="Watch 面板中 target - num 显示正数（猜小了）或负数（猜大了），帮助你精确调整下一次猜测。"}
（挑战）在 Watch 面板添加表达式 target - num 和 Math.abs(target - num)，实时追踪猜测差值
::::

:::

:::recap
你学会了用浏览器的 Sources 面板设置断点调试代码——在任意一行暂停程序，逐行执行，查看所有变量的值。条件断点可以在满足特定条件时才暂停，比 console.log 强大得多。
:::

:::listen-to
贝多芬《第九交响曲》排练录音 — 任何一位指挥在排练时都会反复停下、纠正、重来。断点调试就是你在代码中的排练指挥棒——发现不和谐的音（bug），停下来，找到原因，修正好，再继续。
:::


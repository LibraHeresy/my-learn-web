# console.log — 你的"代码透视镜"

:::analogy
console.log() 就像在流水线上装了透明观察窗——你可以在任何时刻、查看任何变量的当前值。不确定代码在做什么？打个 log 看一眼，而不是瞎猜。
:::

:::prerequisite
**本节你需要知道这些词：**

- **控制台基础**：浏览器自带的开发者工具面板，用来查看代码输出和报错信息
- **变量**：用来存储数据的容器，用 `let` 或 `const` 声明
:::

:::explain{title="console.log 是什么？"}
console.log() 是 JavaScript 最常用的调试工具——在控制台中打印出你想检查的值。就像做饭时尝一口汤，看咸了还是淡了。在你怀疑有问题的地方插入 console.log(变量名)，打开控制台（F12）查看输出。
```js
let composer = "张三";
console.log(composer);  // 控制台输出：张三
let count = 5;
console.log("当前数量：", count);  // 可以同时打印文字和变量
let list = ["", "", "春天"];
console.log("列表内容：", list);  // 数组也可以打印
```
:::

:::explain{title="用 console.log 追踪代码流程"}
最常见的调试模式是**在函数开头和关键位置加 console.log**，追踪代码执行到了哪里：
```js
function playMusic(piece) {
  console.log("=== playMusic 被调用了 ===");
  console.log("传入的参数 piece：", piece);
  if (piece === "报表") {
    console.log("进入报表分支");
    // ... 处理报表
  } else {
    console.log("进入其他项目分支");
    // ... 处理其他
  }
  console.log("=== playMusic 执行完毕 ===");
}
```
这就像拆快递时逐件核对清单——你清楚地知道代码走到了哪里、每个变量是什么值。当你觉得"为什么结果不对"时，先 `console.log` 看看到底发生了什么。
:::

:::example{title="看例子"}
编辑器里有一个简单的"点击计数器"页面。它看起来可以工作，但有一个逻辑问题——仔细看 JS 代码，你能发现吗？
**你的任务不是修 bug，而是加 console.log 来"监听"这个 bug。** 在按钮点击事件中插入 console.log，打印当前数值，这样你就能在控制台看到程序的实际行为。
这种"先观察、再修复"的方法，就是工程师的日常。
:::

:::task{title="动手试试 ✨"}
::::step{purpose="console.log 是程序员最常用的调试工具——就像给流水线装摄像头，让你\"看到\"代码运行过程中每个变量的真实值。在怀疑有问题的地方插 log，比盯着代码瞎猜高效十倍。" expected="每次点击按钮后，控制台输出类似\"点击前 count = 0\"和\"点击后 count = 0\"两条信息——注意值没有变！"}
在 addOne() 函数中添加 console.log，分别打印点击前和点击后的 count 值
::::

::::step{purpose="当控制台输出和预期不一致时，说明你的理解有偏差——这正是 console.log 最有价值的时刻。它能帮你发现\"count = count++\"这种隐蔽的错误：后缀 ++ 先返回旧值再自增，赋值又把旧值写回去了。" expected="控制台显示 count 始终为 0，证实 bug 存在。你定位到问题出在 count = count++ 这行。"}
观察控制台输出：多次点击按钮，count 的值是否每次都在 +1？
::::

::::step{purpose="理解 count++ 和 count = count + 1 的区别是避坑的关键。后缀 ++ 是一个\"先取值、后自增\"的操作，赋值给它会覆盖自增效果。这是一个经典的初学者陷阱。" expected="再次点击按钮，控制台输出从 0、1、2... 递增，计数器功能正常工作了。"}
修复 bug：把 count = count++ 改为 count = count + 1（或 count++ 不赋值）
::::

:::

:::recap
你学会了用 console.log() 在代码的任何位置打印变量值，追踪代码的执行流程。当结果和预期不一致时，先 log 看看实际发生了什么，再对症修复——这就是工程师调试的日常。
:::



# console.log — 你的"排练监听器"

::music-analogy
排练时，指挥会让某个声部单独演奏，以便听清楚每个音符。`console.log()` 就是你的"排练监听"——它让你在任何时刻、查看任何变量的值。当你不确定代码在做什么时，用 `console.log()` 看个究竟。
::

::explain{title="console.log 是什么？"}
console.log() 是 JavaScript 最常用的调试工具——在控制台中打印出你想检查的值。就像练琴时录下来回听，看哪个音不对。在你怀疑有问题的地方插入 console.log(变量名)，打开控制台（F12）查看输出。
```js
let composer = "肖邦";
console.log(composer);  // 控制台输出：肖邦
let count = 5;
console.log("当前数量：", count);  // 可以同时打印文字和变量
let list = ["巴赫", "莫扎特", "贝多芬"];
console.log("列表内容：", list);  // 数组也可以打印
```
::

::explain{title="用 console.log 追踪代码流程"}
最常见的调试模式是**在函数开头和关键位置加 console.log**，追踪代码执行到了哪里：
```js
function playMusic(piece) {
  console.log("=== playMusic 被调用了 ===");
  console.log("传入的参数 piece：", piece);
  if (piece === "夜曲") {
    console.log("进入夜曲分支");
    // ... 处理夜曲
  } else {
    console.log("进入其他曲目分支");
    // ... 处理其他
  }
  console.log("=== playMusic 执行完毕 ===");
}
```
这就像在排练中逐段录音回放——你清楚地知道代码走到了哪里、每个变量是什么值。当你觉得"为什么结果不对"时，先 `console.log` 看看到底发生了什么。
::

::example{title="看例子"}
编辑器里有一个简单的"音乐计数器"页面。它看起来可以工作，但有一个逻辑问题——仔细看 JS 代码，你能发现吗？
**你的任务不是修 bug，而是加 console.log 来"监听"这个 bug。** 在按钮点击事件中插入 console.log，打印当前数值，这样你就能在控制台看到程序的实际行为。
这种"先观察、再修复"的方法，就是工程师的日常。
::

::task{title="动手试试 ✨"}
:::step{purpose="console.log 是程序员最常用的调试工具——就像排练时录音回放，让你\"看到\"代码运行过程中每个变量的真实值。在怀疑有问题的地方插 log，比盯着代码瞎猜高效十倍。" expected="每次点击按钮后，控制台输出类似\"点击前 count = 0\"和\"点击后 count = 0\"两条信息——注意值没有变！"}
在 addOne() 函数中添加 console.log，分别打印点击前和点击后的 count 值
:::

:::step{purpose="当控制台输出和预期不一致时，说明你的理解有偏差——这正是 console.log 最有价值的时刻。它能帮你发现\"count = count++\"这种隐蔽的错误：后缀 ++ 先返回旧值再自增，赋值又把旧值写回去了。" expected="控制台显示 count 始终为 0，证实 bug 存在。你定位到问题出在 count = count++ 这行。"}
观察控制台输出：多次点击按钮，count 的值是否每次都在 +1？
:::

:::step{purpose="理解 count++ 和 count = count + 1 的区别是避坑的关键。后缀 ++ 是一个\"先取值、后自增\"的操作，赋值给它会覆盖自增效果。这是一个经典的初学者陷阱。" expected="再次点击按钮，控制台输出从 0、1、2... 递增，计数器功能正常工作了。"}
修复 bug：把 count = count++ 改为 count = count + 1（或 count++ 不赋值）
:::

::

::listen-to
贝多芬《第七交响曲》第二乐章 — 著名的"小快板"，从一个低沉的重复音型开始，逐层叠加声部。每次新乐器加入都清晰可辨——就像 console.log 把每个变量的值一层层打印出来。
::


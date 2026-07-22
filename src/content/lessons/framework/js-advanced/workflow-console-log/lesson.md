# console.log — 你的"排练监听器"

:::analogy
做菜时尝一口汤，你就知道是咸了还是淡了。console.log 就是写代码时的"尝一口"--在任何位置看一眼变量的真实值，不用猜。
:::

:::prerequisite
**本节你需要知道这些词：**

- 浏览器控制台（Console）-- DevTools 面板，按 F12 打开
- `let` 声明变量 -- 用 let 声明的变量可以修改值
- 函数 -- 用 function 定义的可重复使用的代码块
:::

:::explain{title="先看问题：不打印、靠猜的调试方式"}

你写了一个计数器：点击按钮，数字加一。代码看起来完全没问题：

```js
let count = 0;  // 初始值为 0

function addOne() {
  count = count++;  // 自增
  document.querySelector("#display").textContent = count;  // 更新显示
}
```

但点击按钮后，数字永远是 0，不动。

**不打印、靠猜的调试方式：**

1. "是不是 display 元素取错了？" -- 检查 querySelector，没错
2. "是不是 textContent 不生效？" -- 换成 innerText，还是不生效
3. "是不是函数没绑定？" -- 加个 alert 测试，函数确实执行了
4. 折腾 20 分钟，还是不知道为什么

**而用 console.log 的方式，30 秒就定位了问题：**

```js
let count = 0;

function addOne() {
  console.log("点击前 count =", count);    // 打印：点击前 count = 0
  count = count++;
  console.log("点击后 count =", count);    // 打印：点击后 count = 0 ← 问题在这！
  document.querySelector("#display").textContent = count;
}
```

一眼看到：`count++` 之后 count 还是 0！你立刻意识到 `count = count++` 的写法有问题。`count++` 是先返回旧值再自增，赋值又把旧值写回去了，所以值永远不变。改成 `count = count + 1` 或直接 `count++` 就解决了。

**这个流程就是：猜测（哪里可能有问题） -> 打印（看实际值） -> 验证（值和预期一致吗？） -> 修复。** 这就是专业开发者的调试节奏。

:::

:::explain{title="解决方案：console.log 调试三步法"}

**第一步：锁定可疑区域**

代码不按预期工作，先缩小范围。"如果变量在第 10 行之后值不对，那问题出在第 1~10 行之间。"

**第二步：在关键位置插 log**

```js
function calculateScore(answers, correctAnswers) {
  console.log("=== calculateScore 被调用 ===");        // 函数入口：确认函数被执行了
  console.log("传入 answers：", answers);               // 打印参数：输入正确吗？
  console.log("传入 correctAnswers：", correctAnswers);
  
  let score = 0;
  for (let i = 0; i < answers.length; i++) {
    console.log("第", i, "次循环：", answers[i], "vs", correctAnswers[i]);  // 循环内部：每次的值
    if (answers[i] === correctAnswers[i]) {
      score++;
    }
  }
  
  console.log("最终得分：", score);                     // 函数出口：返回值正确吗？
  return score;
}
```

**第三步：对比预期值和实际值**

看到 log 输出后，心里必须问自己一句："这个值符合我的预期吗？" 如果不符合，那问题就在这段代码里。这道**"预期 vs 实际"的对比**，就是调试的本质。

:::

:::explain{title="console.log 不只是打印字符串"}

```js
// 打印单个变量
let name = "张三";
console.log(name);  // 控制台输出：张三

// 同时打印文字和变量（用逗号分隔）
let count = 5;
console.log("当前数量：", count);  // 控制台输出：当前数量： 5

// 打印数组
let list = ["苹果", "香蕉", "橘子"];
console.log("列表内容：", list);  // 控制台输出：列表内容： ["苹果", "香蕉", "橘子"]

// 打印对象
let card = { title: "曲目A", author: "张三", year: 2020 };
console.log("卡片数据：", card);  // 控制台输出完整的对象结构，可以展开查看

// 用分隔符让输出更清晰
console.log("========== 数据加载完成 ==========");
```

:::

:::explain{title="常见错误"}

**错误 1：log 写了对的东西，没写怀疑的东西**

```js
// ❌ 错误：log 了一个你信任的值
let name = "张三";
console.log(name);  // 打印"张三"，这你本来就知道
count = count++;    // 怀疑这行有问题，但没打印！
```

```js
// ✅ 正确：在你怀疑的地方前后打印
console.log("加之前 count =", count);   // 加之前
count = count++;                         // 怀疑这行
console.log("加之后 count =", count);   // 加之后 -- 立刻看到值没变
```

**错误 2：上线后留着 console.log**

```js
// ❌ 错误：代码提交到仓库了，console.log 还在
// 用户打开控制台看到一堆调试信息，体验很差
console.log("用户输入：", password); // 更可怕：打印了密码！
```

```js
// ✅ 正确：调试完就删掉 console.log
// 只有开发时需要它，用户不需要看到
```

**错误 3：log 了但不看**

在代码里插了 console.log，但根本没打开控制台去看输出。log 不会自动弹窗告诉你值是多少--你必须打开 F12 去看。

:::

:::explain{title="实际工作中你会用这个来..."}

- **调试后端接口**：调用 API 后 console.log 打印返回的数据，看数据结构和预期是否一致。`console.log("API 返回：", response)` 是最常见的用法。
- **排查"为什么这个条件没进去"**：在 if 分支里加 console.log，确认代码到底走进了哪个分支。
- **给同事演示 bug**：把有问题的值 console.log 出来截图发给同事，比用嘴描述"这里好像不对"高效十倍。

:::

:::task{title="动手试试"}

打开 `script.js`，里面有一个"点击计数器"。它看起来没问题，但实际点击后数字不变化。你的任务是用 console.log 找到 bug 并修复。

::::step{purpose="console.log 让你看到代码运行中变量的真实值。在你怀疑有问题的地方插 log，比盯着代码瞎猜高效十倍。" expected="每次点击按钮，控制台输出'点击前 count = 0'和'点击后 count = 0'，证实 count 没有变化。"}
在 addOne() 函数中添加 console.log，分别打印点击前和点击后的 count 值。
::::

::::step{purpose="当控制台输出和预期不一致时，说明你的理解有偏差--这正是 console.log 最有价值的时刻。" expected="控制台显示 count 始终为 0，定位到问题出在 count = count++ 这行。"}
多次点击按钮，观察控制台输出。count 的值是否每次都在加一？如果不是，哪一行出了问题？
::::

::::step{purpose="count = count++ 是经典陷阱：后缀 ++ 先返回旧值再自增，赋值把旧值写回去，导致值永不改变。" expected="修复后，控制台输出从 0、1、2... 递增，计数器正常工作。"}
修复 bug：把 count = count++ 改为 count = count + 1（或者直接 count++ 不赋值给自身）。
::::

:::

:::recap
console.log 是调试的核心工具--在你怀疑的代码前后打印变量值，对比"预期"和"实际"。调试三步法：锁定可疑区域 -> 在关键位置插 log -> 对比预期值和实际值。调试完记得删除 console.log。
:::

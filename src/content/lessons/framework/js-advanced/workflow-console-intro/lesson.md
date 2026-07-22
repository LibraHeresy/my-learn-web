# 读懂浏览器的"错音提示" — 开发者控制台入门

:::analogy
汽车仪表盘上亮了发动机故障灯，你不会掀开引擎盖瞎猜--你看一下故障码，直接知道问题在哪。浏览器控制台就是代码的仪表盘，红色错误信息就是故障码。
:::

:::prerequisite
**本节你需要知道这些词：**

- 浏览器开发者工具（DevTools）-- 按 F12 打开，包含 Console、Elements、Sources 等面板
- JS 变量声明：用 `let` 声明变量后才能使用
- DOM 方法：`document.querySelector()` 获取页面元素
:::

:::explain{title="先看问题：不看控制台的后果"}

你写了一段 JS 代码，刷新页面后发现什么都没发生。按钮点不动，文字不变。

**不看控制台的开发者是这样的：**

```js
// 页面不工作！开始瞎猜：
// "是不是函数名写错了？" -- 重命名所有函数
// "是不是 CSS 挡住了？" -- 给元素加 z-index: 9999
// "是不是浏览器缓存？" -- 清缓存、换浏览器
// 半小时过去了，问题依旧...

// 真相：第一行就有拼写错误
let btn = docuement.querySelector("#btn");  // docuement 拼错了！
// ReferenceError: docuement is not defined
```

而**看控制台的开发者**花 5 秒钟就找到了问题：

1. 按 F12 打开控制台
2. 看到红色报错：`ReferenceError: docuement is not defined at script.js:1`
3. 定位到 script.js 第 1 行，修正拼写
4. 搞定。

这个区别，就是 junior（初级）和 senior（高级）的分水岭之一：**遇到问题的第一反应是什么？瞎猜还是看控制台？**

:::

:::explain{title="解决方案：读懂三种最常见的错误类型"}

控制台的红字不是吓你的，是在帮你的。每条错误都包含三个关键信息：

1. **错误类型** -- 告诉你"出了什么问题"
2. **文件名 + 行号** -- 告诉你"哪一行出错"
3. **错误详情** -- 英文具体描述

**ReferenceError：引用了不存在的东西**

```js
// ❌ 变量没声明就使用
console.log(userName);  // ReferenceError: userName is not defined
// 控制台说：第 1 行，userName 还没声明
```

```js
// ❌ 对象名拼写错误
let btn = document.querySelector("#btn");    // ✅ 正确：document
let btn = docuement.querySelector("#btn");  // ❌ 错误：docuement 不存在
// ReferenceError: docuement is not defined
```

```js
// ✅ 修正：检查拼写
let btn = document.querySelector("#btn");  // document，不是 docuement
```

**TypeError：对某个值做了它不支持的操作**

```js
// ❌ 把 null 当成对象来访问属性
let btn = document.querySelector("#btn");  // 如果页面上没有 #btn，返回 null
btn.addEventListener("click", fn);  // TypeError: Cannot read property 'addEventListener' of null
// 控制台说：btn 是 null，null 没有 addEventListener 这个方法
```

```js
// ❌ 方法名大小写错误
document.querySelector("#btn");    // ✅ 正确：querySelector
document.querySelector("#btn");   // ❌ 错误：S 大写了（JavaScript 区分大小写！）
// TypeError: document.querySelector is not a function
```

```js
// ✅ 修正：大小写完全匹配
document.querySelector("#btn");  // JavaScript 中方法名严格区分大小写
```

**SyntaxError：语法写错了**

```js
// ❌ 少写了右括号
function sayHello(name {
  // SyntaxError: Unexpected token '{'
  // 控制台说：第 1 行，{ 出现的位置不对
  console.log("你好，" + name);
}

// ✅ 修正：补上右括号
function sayHello(name) {
  console.log("你好，" + name);
}
```

```js
// ❌ 字符串少写了引号
let msg = 你好;  // SyntaxError: Unexpected identifier
// 控制台说：第 1 行，遇到意外的标识符"你好"

// ✅ 修正：字符串要加引号
let msg = "你好";
```

:::

:::explain{title="错误会互相掩盖"}

这是一个重要的调试经验：**一个错误可能导致后面的代码全部不执行。**

```js
// 第 1 行报错：ReferenceError -- docuement 不存在
let btn = docuement.querySelector("#btn");

// 第 5 行的代码完全没执行，因为第 1 行就炸了
let title = document.querySelector("#title");
title.textContent = "新标题";

// 第 10 行也没执行
let count = document.querySelector("#count");
count.textContent = "5";
```

修复第 1 行后，发现第 5 行也有错误，修复第 5 行后又发现第 10 行有问题。**错误像多米诺骨牌--前面倒了，后面的你看不到。必须一个一个修，不要试图一次修完所有错误。**

:::

:::explain{title="常见错误"}

**错误 1：不看控制台，瞎猜**

```js
// ❌ 错误做法：页面没反应，开始改 CSS、改 HTML、换浏览器
// 就是不按 F12 看控制台
```

```js
// ✅ 正确做法：页面没反应，第一步按 F12，看红字说了什么
```

**错误 2：看到红字就害怕，直接清空控制台**

控制台不是越干净越好。红色错误信息是你最好的朋友--它在告诉你问题在哪。清掉它等于把地图扔了。

**错误 3：只读错误类型，不看行号**

`at script.js:15` 意思是在 script.js 的第 15 行。新手常犯的错误是看到 ReferenceError 就到处找，不关注行号。

:::

:::explain{title="实际工作中你会用这个来..."}

- **上线前自测**：写完代码刷新页面，控制台必须干净（没有红色报错）。红色的错误不修，到用户那里就是白屏。
- **接手别人的代码**：代码跑不起来？先看控制台报什么错，而不是逐行读代码。
- **面试中**：面试官让你修一个 bug，你第一反应是按 F12 看控制台，面试官心里已经给你加分了。

:::

:::task{title="动手试试"}

打开 `script.js`，里面有 5 个故意埋下的错误。你的任务是一个一个找出来并修复。

::::step{purpose="学会打开控制台是所有调试的第一步。红色错误信息不是惩罚，是路标--精确告诉你错误类型和位置。" expected="控制台出现红色错误信息，包含错误类型、文件名和行号。"}
按 F12 打开浏览器控制台，查看红色错误信息。第一条错误告诉你什么类型、在哪个文件、第几行？
::::

::::step{purpose="ReferenceError 是最常见的错误--变量名拼写错误。从错误信息的行号定位代码，而不是盲目猜测。" expected="修复 document 拼写后，第一条红色错误消失，第二条错误出现。"}
根据第一条错误提示（document 拼写为 docuement），找到 script.js 中对应的行并修复。
::::

::::step{purpose="错误之间会互相掩盖。修复一个，下一个才会暴露。逐个修复直到控制台干净。" expected="控制台无红色错误，页面功能正常。"}
继续修复剩余 4 个错误：querySelector 大小写、变量名不一致、textContent 拼写错误、innerHTML 大小写。每次修复后刷新页面确认。
::::

:::

:::hint{title="需要线索？"}

5 个错误的类型分别是：
1. `document` 拼写错误 -- ReferenceError
2. `querySelector` 大小写错误 -- TypeError
3. 变量名声明和使用的名字不同 -- ReferenceError
4. DOM 方法名拼写错误 -- TypeError
5. DOM 属性名拼写错误 -- 属性赋值无效

控制台会精确告诉你每个错误的位置。耐心读完红字！
:::

:::recap
遇到代码不工作，第一步永远是按 F12 看控制台的红色错误信息。ReferenceError（变量未定义）、TypeError（类型不对）、SyntaxError（语法错误）各有所指。错误信息包含文件名和行号，像导航一样带你找到问题。错误像多米诺骨牌，一个一个修，不要跳过。
:::

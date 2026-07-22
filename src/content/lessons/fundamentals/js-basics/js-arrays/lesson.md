# 数组 — 存储你的数据列表

:::analogy
数组就是一张**购物清单**——第一行写牛奶，第二行写鸡蛋，第三行写面包。每件东西都有编号（第1件、第2件、第3件），想加新的就写在末尾，想查某一件就问"第几个是什么"。

没有购物清单的时候，你的口袋里塞满了散落的便签条——`product1`、`product2`、`product3`……东西一多就乱了。数组就是把这些便签条**装订成一个本子**——一本在手，整齐有序。
:::


:::prerequisite
**本节你需要知道这些词：**

- **变量**：用 `let`/`const` 声明和存储数据，比如 `let name = "小明"`
- **数据类型**：了解 string（字符串）、number（数字）等基础类型
- **函数**：会用 `function` 定义函数、用 `()` 调用函数
:::

:::explain{title="没有数组的世界——你能忍吗？"}
假设你的购物网站要显示 5 件商品的名字。没有数组的时候，你只能这样写：

```js
let product1 = "蓝牙耳机";
let product2 = "机械键盘";
let product3 = "显示器支架";
let product4 = "无线鼠标";
let product5 = "USB 扩展坞";

// 要在页面上显示所有商品？一个一个写：
document.querySelector("#p1").textContent = product1;
document.querySelector("#p2").textContent = product2;
document.querySelector("#p3").textContent = product3;
document.querySelector("#p4").textContent = product4;
document.querySelector("#p5").textContent = product5;
```

**问题一目了然：**
- 如果后端 API 返回了 100 件商品呢？你要声明 100 个变量？
- 如果用户搜索 "耳机"，你要写 100 个 if 来判断？
- 如果商品数量是动态的（今天 50 件，明天 80 件），你根本无法预知要声明多少个变量。

**这就是数组要解决的问题：用一个变量名，装无限多个值。**
:::

:::explain{title="数组的创建和访问"}
数组用 `[]` 创建，每个值用逗号分隔，索引从 **0** 开始：

```js
let products = ["蓝牙耳机", "机械键盘", "显示器支架", "无线鼠标", "USB 扩展坞"];
```

- `products[0]` — 第 1 件商品（"蓝牙耳机"），索引 0
- `products[2]` — 第 3 件商品（"显示器支架"），索引 2
- `products[4]` — 第 5 件商品（"USB 扩展坞"），索引 4
- `products.length` — 数组长度（5），**注意：最后一个元素的索引是 `length - 1`**

**楼层编号的类比：** 在中国，1 楼就是地面层。但在英国，Ground Floor（地面层）是 0 楼，First Floor 是 1 楼（我们的 2 楼）。编程世界用的是英国式编号——一切都是从 0 开始算的。记住这个类比，以后你看到 `arr[0]` 就知道这是"第一个元素"。

```js
// 遍历数组——用 forEach 对每一项做同样的事
products.forEach(function(item, index) {
  console.log("第" + (index + 1) + "件商品：" + item);
});
// 输出：
// 第1件商品：蓝牙耳机
// 第2件商品：机械键盘
// ...
```

`forEach` 是数组专属的遍历方法——你不用手动关心索引，它会自动把每一项和它的序号传给你的回调函数。详细的循环语法会在下一节《循环》中展开。
:::

:::explain{title="增删数组元素 — .push() 和 .pop()"}
数组最常见的操作就是往末尾加东西和从末尾删东西：

```js
let cart = ["键盘", "鼠标"];  // 购物车

cart.push("显示器");          // 末尾追加
// cart 现在是 ["键盘", "鼠标", "显示器"]

let removed = cart.pop();     // 删除末尾一项，并返回被删除的值
// removed 是 "显示器"
// cart 变回 ["键盘", "鼠标"]
```

**容易犯的错：** `.push()` 的返回值是**新数组的长度**，不是新数组本身！

```js
let cart = ["键盘"];
let result = cart.push("鼠标");  // result 是 2（新长度），不是 ["键盘", "鼠标"]

// .push() 直接修改原数组，不需要用返回值来接
cart.push("显示器");  // 正确用法：直接调用，不理返回值
```

`.pop()` 则刚好相反——它返回被删除的那个元素。如果数组已经空了，`.pop()` 返回 `undefined`，不会报错。

**实战建议：** 操作前先检查 `arr.length > 0`，避免对空数组做无意义的操作。
:::

:::explain{title=".join() — 把数组变成字符串"}
`.join()` 是数组转字符串的最常用方法——用指定分隔符把所有元素拼接起来：

```js
let tags = ["前端", "JavaScript", "数组"];

tags.join("、");   // "前端、JavaScript、数组"（中文顿号）
tags.join(" | ");  // "前端 | JavaScript | 数组"（竖线分隔）
tags.join("");     // "前端JavaScript数组"（无分隔符）

// 最常见的使用场景：把数组内容显示到页面上
display.textContent = tags.join(" · ");
```

这就是"数据驱动页面"的核心模式——数组是数据，`.join()` 把数据变成可读的文字，最后赋值给 DOM 元素的 `textContent` 显示出来。数据一变，页面跟着变。
:::

:::example{title="看看实际效果"}
打开右侧的 `script.js`，你会看到这段代码。一个作曲家数组，配合 `.push()` 和 `.join()` 实现动态列表：

```js
// 初始数组
let composers = ["巴赫", "莫扎特", "贝多芬"];
let display = document.querySelector("#display");
let input = document.querySelector("#nameInput");
let addBtn = document.querySelector("#addBtn");

// 显示数组内容 —— 用 .join() 把数组变成字符串
function showList() {
  let text = composers.join(" · ");
  display.textContent = text;
}
showList();  // 页面初始显示：巴赫 · 莫扎特 · 贝多芬

// 点击按钮，往数组末尾追加新名字，然后刷新显示
addBtn.addEventListener("click", function() {
  let name = input.value;
  if (name !== "") {
    composers.push(name);   // 数组数据变化
    showList();             // 页面同步更新
    input.value = "";       // 清空输入框
  }
});
```

打开**预览区**，在输入框中输入「德彪西」，点击添加按钮，看名字自动追加到列表末尾。这就是"数组 + DOM"的基本协作模式。
:::

:::task{title="动手试试 ✨"}
::::step{purpose="让你体验 `.push()` 的「增」操作——往数组末尾追加一个元素后，用 `.join()` 重新拼接显示。理解「数组数据变化 → 页面同步更新」这个核心模式，这是所有数据驱动页面的基础思路。" expected="列表从「巴赫 · 莫扎特 · 贝多芬」变成「巴赫 · 莫扎特 · 贝多芬 · 德彪西」，新增的名字自动出现在末尾，分隔符也正确显示。"}

打开 `script.js`，先读一遍代码（文件顶部的注释帮你理解每一行）。然后切换到**预览区**：

1. 在输入框中输入「德彪西」
2. 点击「添加」按钮
3. 观察列表——新名字是否出现在末尾，分隔符是否正确
4. 反复添加几个不同的名字，感受 `.push()` 的追加特性

注意：`showList()` 函数里用 `composers.join(" · ")` 把数组变成了显示文字。每次添加后都要调用 `showList()` 才能让页面更新。
::::

::::step{purpose="`.join()` 是数组转字符串的最常用方法——分隔符决定了最终的视觉呈现。就像清单上可以用空格、竖线或顿号连接各项，不同的符号传递不同的排版感。" expected="列表显示的分隔符从圆点变成了竖线或顿号，整体视觉效果随之改变。你完全不需要修改数组数据本身，只改了一个字符串参数。"}

打开 `script.js`，找到 `showList()` 函数中的这行代码：

```js
let text = composers.join(" · ");
```

把 `" · "` 改成 `" | "` 或 `"、"`（中文顿号）。保存文件，刷新预览区，观察列表显示效果的差异。

思考：数组 `composers` 的内容完全没变，但页面显示不同了——**数据和展示逻辑分离**，这是好代码的标志。
::::

::::step{purpose="让你理解数组初始化的概念——数组的内容由你定义，就像你可以随意编排自己的购物清单。同时帮你建立「改数据 → 看效果」的直觉。" expected="页面上的列表显示变成了你自定义的人物名单，列表逻辑和样式完全不受影响——数据和展示逻辑分离。"}

打开 `script.js`，修改数组的初始值：

```js
let composers = ["巴赫", "莫扎特", "贝多芬"];
```

替换成你自己喜欢的人物名字（歌手、作家、运动员……都可以），比如：

```js
let composers = ["周杰伦", "林俊杰", "陈奕迅"];
```

保存后刷新预览区。列表内容变了，但所有功能（添加、显示）照常工作——**数据变了，逻辑不变**。
::::

::::step{purpose="`.pop()` 是 `.push()` 的镜像操作——一个加末尾，一个删末尾。组合增删操作，你就实现了完整的「数据管理」。就像购物时随时可以往清单上加一件或划掉一件。" expected="点击「删除最后」按钮后，列表最后一位消失。连续点击直到列表为空时也不会报错（因为有 `length > 0` 的保护）。增加和删除两个功能形成完整闭环。"}

挑战：添加一个「删除最后一位」按钮。

1. 打开 `index.html`，在按钮旁边添加：
```html
<button id="removeBtn">删除最后</button>
```

2. 打开 `script.js`，在文件末尾添加：
```js
let removeBtn = document.querySelector("#removeBtn");
removeBtn.addEventListener("click", function() {
  if (composers.length > 0) {
    composers.pop();    // 删除最后一个
    showList();         // 刷新显示
  }
});
```

3. 关键细节：`if (composers.length > 0)` 防止空数组时调用 `.pop()` 导致无意义的操作。这是一种防御性编程习惯——永远在操作前检查边界条件。
::::

:::

:::recap
这一节你学会了用数组存储一组数据——用 `[]` 创建，索引从 0 开始，用 `.push()` 在末尾添加，用 `.pop()` 从末尾删除，用 `.join()` 把整个数组拼成一段文字显示到页面上。

**核心要点：**
- 数组解决的核心痛点：不用声明 `product1`、`product2`、`product3`……一个变量装所有
- 索引从 0 开始，最后一个元素的索引是 `length - 1`（楼层编号类比）
- `.push()` 返回**新长度**，不是数组本身——直接调用就行，别接返回值
- `.join("分隔符")` 把数组变成可读的页面文字
- 操作数组前检查 `length > 0`，防止边界错误

**数据 + DOM = 动态页面。** 数组是数据容器，`.join()` 和 DOM 操作是展示手段。数据一变，调用显示函数，页面跟着变——这个模式贯穿所有前端开发。

下一节你将学习**循环**——用 `for` 和 `forEach` 批量处理数组，告别手动操作每一个元素。
:::

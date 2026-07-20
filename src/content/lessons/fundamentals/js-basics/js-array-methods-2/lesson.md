# 更多数组方法 — reduce、find、sort

:::analogy
.reduce() 就像把购物清单上的价格一一加起来算总价；.find() 就像在一堆快递里找到贴了特定标签的那个；.sort() 就像按身高给同学们排队。这些方法让你用一行代码完成复杂的数据操作。
:::


:::prerequisite
**本节你需要知道这些词：**

- **数组**：创建和操作数组的基本方法
- **map/filter**：理解数组高阶方法的用法
- **函数**：定义函数、箭头函数、回调函数
:::

:::explain{title=".reduce() — 把数组「累积」成一个值"}
`.reduce()` 是数组方法中的"万能工具"——它遍历数组，把每个元素**累积**到一个结果中。你需要提供一个**累积函数**和一个**初始值**：

```js
// 求和：累加器从 0 开始，每个数加进去
let nums = [45, 32, 78, 12, 55];
let total = nums.reduce(function(acc, item) {
  return acc + item;
}, 0);
// total 是 222

// 求最大值（初始值设为第一个元素）
let max = nums.reduce(function(acc, item) {
  return item > acc ? item : acc;
});
// max 是 78
```

参数说明：`acc`（accumulator，累积值）是上一次调用返回的结果；`item` 是当前元素；`0` 是初始值。reduce 的执行过程：`0+45 → 45+32 → 77+78 → 155+12 → 167+55 → 222`。

reduce 不仅仅是求和，还可以分组、展平、统计频率等——它是最灵活的数据聚合方法。
:::

:::explain{title=".reduce() 进阶：按属性分组"}
reduce 的 accumulator 不一定是数字——它可以是**对象**。这是 reduce 最强大的用法之一：

```js
let orders = [
  { product: "键盘", category: "电脑配件" },
  { product: "鼠标", category: "电脑配件" },
  { product: "充电器", category: "手机配件" },
  { product: "数据线", category: "手机配件" }
];

// 按 category 分组
let grouped = orders.reduce(function(acc, item) {
  if (!acc[item.category]) {
    acc[item.category] = [];
  }
  acc[item.category].push(item.product);
  return acc;
}, {});
// grouped 是 {
//   "电脑配件": ["键盘", "鼠标"],
//   "手机配件": ["充电器", "数据线"]
// }
```

就像把一堆快递按「收货人」分堆堆放——reduce 帮你从分类规则自动生成分类结果。
:::

:::explain{title=".find() — 找到第一个匹配的元素"}
`.find()` 返回数组中**第一个**让条件函数返回 `true` 的元素，找不到返回 `undefined`。它找到第一个就停止，不会继续搜索：

```js
let products = [
  { name: "无线鼠标", price: 89, stock: 45 },
  { name: "机械键盘", price: 299, stock: 12 },
  { name: "USB 集线器", price: 35, stock: 0 },
  { name: "显示器支架", price: 159, stock: 23 }
];

// 找第一个价格低于 100 的
let cheap = products.find(function(p) {
  return p.price < 100;
});
// cheap 是 { name: "无线鼠标", price: 89, stock: 45 }

// 找库存为 0 的商品
let outOfStock = products.find(function(p) {
  return p.stock === 0;
});
// outOfStock 是 { name: "USB 集线器", price: 35, stock: 0 }
```

就像一个管理员在一排货架上找第一个"缺货"的商品——走到第一个缺货的就停下来，记录下它，不再看后面的。
:::

:::explain{title=".some() 和 .every() — 数组的真假判断"}
`.some()` 检查数组中**是否至少有一个**元素满足条件；`.every()` 检查**是否所有**元素都满足条件。两者都返回布尔值：

```js
let scores = [85, 92, 78, 60, 95];

// 有人及格吗？
let anyonePass = scores.some(function(s) { return s >= 60; });
// anyonePass 是 true

// 全部及格了吗？
let allPass = scores.every(function(s) { return s >= 60; });
// allPass 是 true（因为最低分 60 也算及格）

// 都超过 90 分吗？
let allHigh = scores.every(function(s) { return s > 90; });
// allHigh 是 false（85、78、60 都不超过 90）
```

`.some()` 就像问"班里有人考满分吗？"，`.every()` 就像问"全班都交作业了吗？"——一个关注存在性，一个关注普遍性。
:::

:::explain{title=".sort() — 给数组排序"}
`.sort()` 对数组元素进行排序，**会改变原数组**。默认按字符串（字典序）排序，数字排序需要提供**比较函数**：

```js
// 字符串排序（默认）
let names = ["李四", "王五", "张三", "赵六"];
names.sort();
// names 是 ["张三", "李四", "王五", "赵六"]（按拼音）

// 数字排序（需要比较函数）
let prices = [45, 128, 3, 89, 200];
prices.sort(function(a, b) {
  return a - b;  // 升序：小的在前
});
// prices 是 [3, 45, 89, 128, 200]

// 降序
prices.sort(function(a, b) {
  return b - a;  // 降序：大的在前
});
// prices 是 [200, 128, 89, 45, 3]
```

比较函数的规则：返回负数 → a 排在 b 前面；返回正数 → a 排在 b 后面；返回 0 → 两者顺序不变。`a - b` 是升序的口诀，`b - a` 是降序的口诀。

**注意：sort 直接修改原数组！** 如果你想保留原数组，先用 `.slice()` 复制一份再排序。
:::

:::explain{title=".includes() 和 .flat() — 快速判断与展平"}
两个简短但实用的方法：

- `.includes(value)` — 判断数组是否包含某个值（比 `.indexOf() !== -1` 更语义化）
- `.flat()` — 把嵌套数组"展平"成一层

```js
let tags = ["JavaScript", "HTML", "CSS"];
tags.includes("HTML");     // true
tags.includes("Python");   // false

// flat 展平嵌套数组
let nested = [[1, 2], [3, 4], [5]];
nested.flat();  // [1, 2, 3, 4, 5]
```
:::

:::example{title="看例子：商品列表数据处理"}
下面的代码展示了一个商品数据处理流程——筛选低价商品、找到最便宜的那个、按价格排序、计算总价：

```js
let products = [
  { name: "无线鼠标", price: 89, category: "电脑配件" },
  { name: "机械键盘", price: 299, category: "电脑配件" },
  { name: "充电器", price: 45, category: "手机配件" },
  { name: "数据线", price: 25, category: "手机配件" },
  { name: "USB 集线器", price: 35, category: "电脑配件" },
  { name: "显示器支架", price: 159, category: "办公家具" }
];

// 1. filter: 筛选价格低于 100 的商品
let affordable = products.filter(function(p) {
  return p.price < 100;
});
// 2. find: 找到最便宜的商品（先 sort 再取第一个）
// 3. reduce: 计算所有商品的总价
let totalPrice = products.reduce(function(acc, p) {
  return acc + p.price;
}, 0);
// totalPrice 是 652

// 4. sort: 按价格升序排列
let sorted = products.slice().sort(function(a, b) {
  return a.price - b.price;
});

document.querySelector("#output").innerHTML =
  "筛选出 " + affordable.length + " 件低价商品<br>" +
  "总价值：" + totalPrice + " 元<br>" +
  "价格排序：" + sorted.map(function(p) { return p.name; }).join(" → ");
```
:::

:::task{title="动手试试 ✨"}
::::step{purpose="`.reduce()` 的核心是「累积」——每个元素依次被累加器处理。从最简单的求和开始，理解 acc 初始值、每次 return 的值成为下一次的 acc。这是函数式编程中最重要的数据聚合模式。" expected="输出区域显示正确的总价。即使修改数组中的价格，总价会自动重新计算。你体会到了「累加器」一步步把数据汇总的过程。"}
用 `.reduce()` 计算页面上所有商品的总价，把结果显示在"处理结果"区域。初始值设置为 0，每次把当前商品的价格加到累加器上。
::::

::::step{purpose="`.find()` 是一次性查找——找到第一个匹配的就返回。不像 filter 返回数组，find 直接返回元素本身（或 undefined）。适合「根据 ID 找对象」「找第一个满足条件的记录」等场景。" expected="点击按钮后，显示「最便宜的商品」的名称和价格。页面上只返回了一件商品（不是数组），正是价格最低的那一件。"}
用 `.find()` 从商品列表中找出第一个价格低于 50 元的商品，单独显示它的名称和价格。提示：条件返回 `item.price < 50`
::::

::::step{purpose="`.sort()` 的比较函数决定了排序规则。`a - b` 升序、`b - a` 降序是硬道理。理解比较函数后，你可以按任意规则排序——按价格、日期、优先级等。" expected="商品列表按价格从低到高排列，最便宜的排在最上面。排序后原数组确实被改变了（除非你先 slice 复制）。"}
用 `.sort()` 把商品按价格**从低到高**排列，排序后的商品名称依次显示。提示：先 `.slice()` 复制数组再排序，用 `a.price - b.price` 作为比较函数
::::

::::step{purpose="`.some()` 和 `.every()` 让你一键判断集合中 '是否存在' 或 '是否全部满足' 某条件。相比手动写循环判断，这两个方法让代码更简洁、意图更清晰。" expected="输出结果报告两个布尔值：全部有货是 false（USB 集线器库存为 0），至少有一件有货是 true。逻辑判断清晰，一目了然。"}
挑战：检查商品列表中，是否**所有商品**都有库存（stock > 0），以及是否**至少有一件**商品价格低于 30 元。用 `.every()` 和 `.some()` 分别判断，把两个结果都显示出来。
::::

:::

:::recap
这一节你学会了另外五个强大的数组方法：`.reduce()` 把所有元素累积成一个结果（求和、分组、聚合的万能工具），`.find()` 找到第一个匹配的元素（精准查找），`.sort()` 用比较函数自定义排序规则（`a - b` 升序口诀），`.some()` 判断是否存在满足条件的元素，`.every()` 判断是否全部满足条件。加上之前学的 `.map()`、`.filter()`、`.forEach()`、`.join()`，你现在掌握了 JavaScript 数组操作的全套工具——无论是数据筛选、转换、聚合还是排序，都能用数组方法优雅地完成。
:::

# 数据类型与运算符 — 认识代码的"材质"

:::analogy
不同类型的数据就像不同种类的容器——数字是量杯（精确计量），字符串是便利贴（写文字），布尔值是开关（只有开/关两种状态）。用对容器才能做对事。
:::

:::explain{title="四种基础数据类型"}
JavaScript 有几种基础数据类型，就像工具箱里的工具分类：
- **string（字符串）** — 文字，用引号包裹 `""`
- **number（数字）** — 数值，可运算 `1685`, `3.14`
- **boolean（布尔值）** — 只有 `true` 或 `false`，像电灯开关的"开/关"
- **null / undefined** — "空"值，表示没有内容
```js
let composer = "";        // string
let birthYear = 1685;         // number
let isBaroque = true;         // boolean
let encore = null;            // null（故意为空）
```
用 `typeof` 查看类型：
```js
console.log(typeof "");   // "string"
console.log(typeof 1685);     // "number"
console.log(typeof true);     // "boolean"
```
:::

:::explain{title="算术运算符 — 数字的计算"}
数字可以做加减乘除，就像日常算账：
```js
let a = 10;
let b = 3;
console.log(a + b);  // 13  加法（也用于字符串拼接！）
console.log(a - b);  // 7   减法
console.log(a * b);  // 30  乘法
console.log(a / b);  // 3.333... 除法
console.log(a % b);  // 1   取余数（模运算）
console.log(a ** 2); // 100 幂运算
```
`%`（取余）特别实用——判断奇偶：`n % 2 === 0` 就是偶数。
字符串的 `+` 是拼接：`"Bach" + " " + "1685"` → `"Bach 1685"`
:::

:::explain{title="比较运算符 — 返回布尔值"}
比较运算符像评委打分，返回 `true` 或 `false`：
```js
console.log(5 > 3);   // true
console.log(5 < 3);   // false
console.log(5 === 5); // true（等于）
console.log(5 !== 3); // true（不等于）
console.log(5 >= 5);  // true
console.log(5 <= 3);  // false
```
比较结果常用于 `if` 条件判断中——这就是下一节课要学的！
:::

:::example{title="看例子"}
下面的代码练习了数据类型和运算符：
```js
let composer = "";
let birthYear = 1685;
let isBaroque = true;
// 计算今年是多少周年
let currentYear = 2026;
let anniversary = currentYear - birthYear;
// 判断是否是整百年
let isCentury = birthYear % 100 === 0;
console.log(composer + " 诞生于 " + birthYear);
console.log("距今 " + anniversary + " 年");
console.log("是否整百年？" + isCentury);
```
:::

:::task{title="动手试试 ✨"}
::::step{purpose="让你体验数据类型的核心概念：修改一个 number 类型的值，所有依赖它的计算会自动更新。就像修改菜谱中的人数——所有食材用量都跟着变，一处改动，全局响应。" expected="页面上的周年数、是否整除 4 等所有用到 `birthYear` 的计算结果都会自动变化，无需修改其他任何代码。这就是变量引用的力量。"}
修改 `birthYear` 变量的值，比如改成 1756（出生年份）或 1810（张三出生年份），观察页面上的周年数、整除结果等变化
::::

::::step{purpose="`typeof` 就像看包装标签——一看就知道是面粉还是白糖。了解每个变量是什么类型，才能知道它能做什么操作：数字可以加减，字符串可以拼接，布尔值可以判断。养成用 `typeof` 检查类型的习惯。" expected="打开控制台（F12），你会分别看到输出 `\"boolean\"`、`\"number\"`、`\"string\"`——JavaScript 中的三种基本数据类型一目了然。"}
用 `typeof` 运算符检查变量类型。在 JS 中临时添加 `console.log(typeof isBaroque);`，再试试 `typeof birthYear` 和 `typeof composer`，观察控制台输出
::::

::::step{purpose="`%`（取模）是编程中非常实用的运算符，就像判断「今天星期几」——`count % 7` 可以知道循环到第几天。这是后续做循环的基础操作。" expected="能被 4 整除的年份（如 2024）显示「是」，不能整除的（如 2025）显示「否」。你修改数字后，页面上的答案会实时更新。"}
用取模运算符 `%` 判断 `birthYear` 是否能被 4 整除。试试把 birthYear 改成 2024 再改成 2025，观察页面上「能被4整除？」的显示变化
::::

:::

:::recap
这一节你认识了 JavaScript 的几种"数据类型"——`string` 是文字（用引号包裹），`number` 是数字（可以做加减乘除），`boolean` 只有 `true` 或 `false`。用 `typeof` 可以查看类型，用 `%` 可以取余数判断奇偶，用比较运算符（`===`、`>`、`<`）可以得到布尔值。现在你知道代码里的数据不是"一锅乱炖"，而是分门别类的了。
:::



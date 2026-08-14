# 变量与字符串 — 存储你的信息

:::analogy
变量就像一个贴了标签的收纳盒——盒子上写"用户名"，里面放"小明"。以后想用"小明"的时候，直接喊盒子标签就行，不用再写一遍名字。
:::


:::prerequisite
**本节你需要知道这些词：**

**无需前置知识。** 你只需要了解 JavaScript 最基本的 `alert()` 和 `console.log()` 的用法——这在上一节「认识 JS」中已经学过了。
:::

:::explain{title="什么是变量？"}
变量是一个**有名字的容器**，用来存储数据。你可以把任何东西放进去，然后用名字来取用：
```js
let composer = "张三";
let piece = "报表";
let year = 1830;
```
- `let` — 声明一个变量（可以修改）
- `const` — 声明一个常量（不能修改）
- `composer` / `piece` — 变量名（你自己起的名字）
- `"张三"` — 字符串（文本），用引号包裹
- `1830` — 数字，不需要引号
:::

:::explain{title="let、const、var — 三种声明方式"}
`let` 和 `const` 是 ES6 引入的现代声明方式，`var` 是旧写法。它们有一个关键区别——**作用域**：

```js
// let/const：块级作用域——只在所在的 {} 内有效
if (true) {
  let x = 10;
  const y = 20;
  console.log(x);  // 10 ✓
}
console.log(x);  // ❌ ReferenceError: x 未定义！

// var：函数作用域——在 {} 外也能访问
if (true) {
  var z = 30;
}
console.log(z);  // 30 ✓（var 会"穿透"花括号）
```

**为什么不用 var？** `var` 会在 for 循环、if 判断等场景中产生意料之外的行为——变量"泄露"到花括号外面。`let`/`const` 更安全、更符合直觉。

**什么时候用 const？** 如果这个变量的值不会重新赋值，就用 `const`。这既是给读代码的人一个信号——"这个值不会变"，也能防止意外修改。

```js
const MAX_COUNT = 100;  // 常量——不会改，用 const
let counter = 0;         // 变量——会变，用 let
```

**暂时性死区（TDZ）：** `let`/`const` 声明的变量在声明前不能使用：
```js
console.log(a);  // ❌ ReferenceError（let 未声明不能提前用）
let a = 5;

console.log(b);  // undefined（var 被"提升"了，但不报错）
var b = 5;
```
记住一点：**声明变量始终用 let 或 const，放在使用之前。**
:::

:::diagram{title="变量提升：var 声明被抬到作用域顶部，只提升声明不提升赋值"}
<svg viewBox="0 0 440 210" xmlns="http://www.w3.org/2000/svg" role="img">
  <rect x="20" y="30" width="180" height="120" rx="8" fill="#fdecea" stroke="#c62828" stroke-width="2"/>
  <text x="110" y="52" font-size="12" fill="#c62828" text-anchor="middle" font-weight="bold">你写的代码</text>
  <text x="110" y="82" font-size="11" fill="#333" text-anchor="middle">console.log(b)</text>
  <text x="110" y="104" font-size="11" fill="#333" text-anchor="middle">var b = 5</text>
  <text x="110" y="126" font-size="11" fill="#c62828" text-anchor="middle">期望：报错？</text>
  <text x="220" y="90" font-size="20" fill="#c9a96e" text-anchor="middle">→</text>
  <rect x="240" y="30" width="180" height="120" rx="8" fill="#e8f8e8" stroke="#2E7D32" stroke-width="2"/>
  <text x="330" y="52" font-size="12" fill="#2E7D32" text-anchor="middle" font-weight="bold">引擎实际执行</text>
  <text x="330" y="82" font-size="11" fill="#333" text-anchor="middle">var b（提升到这里）</text>
  <text x="330" y="104" font-size="11" fill="#333" text-anchor="middle">console.log(b) → undefined</text>
  <text x="330" y="126" font-size="11" fill="#333" text-anchor="middle">b = 5</text>
  <text x="220" y="170" font-size="12" fill="#8B2E2E" text-anchor="middle">let/const 不提升使用会直接报 ReferenceError（暂时性死区）</text>
</svg>
:::

:::predict{title="预测输出：声明前使用变量，var 和 let 有什么区别？" answer="第一个输出 undefined（var 提升声明，值还没赋值）；第二个直接报错 ReferenceError（let 有暂时性死区，声明前不可用）。解析：var 只提升声明不提升赋值，let/const 在声明前使用会报错——这也是推荐用 let/const 的原因之一。"}
看代码预测结果，再点开答案验证：

```js
console.log(a)
var a = 5

console.log(b)
let b = 5
```
:::

:::explain{title="拼接字符串"}
用 `+` 号可以把字符串和变量拼接在一起：
```js
let composer = "张三";
let sentence = "我最喜欢的人物是" + composer;
```
更好的写法是**模板字符串**，用反引号 `` ` `` 包裹，`${}` 插入变量：
```js
let sentence = `我最喜欢的人物是${composer}`;
```
就像把两个词语连接成一个完整的句子！
:::

:::explain{title="document.querySelector — 找到页面中的元素"}
`document.querySelector()` 可以找到页面上的 HTML 元素，然后通过 `.textContent` 修改它的文字内容：
```js
let el = document.querySelector("h1");
el.textContent = "新的标题";
```
就像点名时用手指出"就是你"，`querySelector` 帮你指向页面中的元素。
:::

:::example{title="看例子"}
下面的代码用变量存储了设计师信息，然后用 `querySelector` 把它们显示在页面上：
```js
// let：声明一个可以修改的变量
let composer = "弗雷德里克·张三";
let piece = "降E大调文档C";

// 模板字符串：用反引号 `` 包裹，${} 里面放变量名
let description = `${composer}的代表作之一是《${piece}》。`;

// querySelector：找到 HTML 元素；textContent：修改它的文字内容
document.querySelector("#composer").textContent = composer;
document.querySelector("#piece").textContent = piece;
document.querySelector("#description").textContent = description;
```
打开 JS 选项卡查看完整代码。运行后，JavaScript 会自动把信息填入页面。
:::

:::task{title="动手试试 ✨"}
::::step{purpose="变量是命名的容器——改一个变量的值，所有用到它的地方自动更新。变量名本身也是一段代码的自注释。" expected="页面上显示的设计师和项目名称都变了。一次改变量值，多处自动生效。"}
把 `composer` 和 `piece` 改成你喜欢的人物和项目
::::

::::step{purpose="模板字符串用 `` ` `` 包裹，`${}` 插入变量。比用 `+` 拼接字符串清晰得多，更不容易出错。" expected="描述文字变成了你自定义的内容，变量部分自动替换。"}
修改 `description` 的模板字符串，写一句你自己的话
::::

::::step{purpose="`let` = 可修改的变量，`const` = 不可修改的常量。这里 `composer` 没有重新赋值，所以效果一样。但如果后续代码要改它，`const` 会报错。" expected="效果一样——因为这些变量没有重新赋值。但如果你尝试给 `const` 变量重新赋值，控制台会报错。"}
试试把 `let` 改成 `const`，效果一样吗？
::::

::::step{purpose="你需要自己添加变量、在 HTML 中加 `<span>` 定位元素、用 `querySelector` + `textContent` 显示。这是第一个完整的数据流练习。" expected="页面上多了一行显示了创作年份。你独立完成了数据从 JS 到 HTML 的完整流程。"}
挑战：新增一个变量 `year`，存创作年份，并把它也显示在页面上
::::

:::

:::recap
这一节你学会了用变量存储数据——`let` 声明可以修改的变量，`const` 声明不能改的常量。用反引号包裹的模板字符串（`` `...${变量}...` ``）比用 `+` 拼接文字更清晰。你还学会了用 `document.querySelector()` 找到页面中的元素，再用 `.textContent` 修改它的文字。现在你的 JS 代码可以把数据"送"到网页上显示了。
:::



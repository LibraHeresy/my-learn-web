# ES6 新语法 — 让代码更优雅的"新乐器"

:::music-analogy
就像现代音乐加入了电声乐器让表现力更丰富，ES6（ECMAScript 2015）为 JavaScript 带来了更简洁、更强大的语法。用这些新"乐器"，你可以用更少的音符写出更丰富的旋律。
:::

:::explain{title="为什么需要新语法？"}
在 JS 基础篇中，你学会了用 `var` 声明变量、用 `function` 定义函数。但 JavaScript 一直在进化——2015 年发布的 ES6 是一次"革命性升级"。
ES6 引入了：
- `let` 和 `const`：替代 `var`，更安全
- 箭头函数：更简洁的函数写法
- 解构赋值：优雅地从对象/数组中取值
- 模板字符串：用反引号（[[html]]<code class="inline-code">`</code>[[/html]]）拼接字符串
- 展开运算符：`...` 展开数组和对象
这些新语法让代码**更短、更清晰、更不容易出错**。
:::

:::example{title="解构赋值 — 从\"抽屉\"里取东西"}
想象你有一个乐谱夹，里面有多首曲子。以前你要一首一首拿：
```js
// 旧写法
const piece1 = pieces[0]
const piece2 = pieces[1]
const piece3 = pieces[2]
```解构赋值让你一次取出：
```js
// 数组解构
const [piece1, piece2, piece3] = pieces
// 对象解构
const { name, composer, period } = piece
```就像从谱架上一次取下三本乐谱——整齐又高效。
:::

:::example{title="箭头函数 — 精简的\"旋律线\""}
箭头函数是 `function` 的简写版：
```js
// 旧写法
const double = function(x) {
  return x * 2
}
// 箭头函数
const double = x => x * 2
// 多行逻辑用花括号
const greet = name => {
  const message = '你好，' + name
  return message
}
```箭头函数就像用连音线简化了分散的音符——同样的旋律，更干净的记谱。
**重要区别：箭头函数没有自己的 `this`。** 普通函数中的 `this` 取决于谁调用了它，而箭头函数的 `this` 继承自定义它的外层作用域。这在事件处理中尤其需要注意。
:::

:::example{title="展开运算符 — 拆包与合并"}
`...` 像一只手，可以把数组/对象"展开"：
```js
// 合并数组
const classical = ['巴赫', '莫扎特']
const romantic = ['肖邦', '李斯特']
const all = [...classical, ...romantic]
// ['巴赫', '莫扎特', '肖邦', '李斯特']
// 复制对象并修改
const piece = { name: '月光', composer: '贝多芬' }
const updated = { ...piece, period: '古典主义' }
```就像把两个乐团的乐手合并成一个更大的乐团——不改变原来的，创造一个新的。
:::

:::task{title="动手试试 ✨"}
::::step{purpose="解构赋值让你一行代码取出多个属性，避免重复写 instrument.name、instrument.family。就像从谱架上一次取下三本乐谱，而不是一本一本拿——整齐又高效，也让代码意图更清晰。" expected="控制台输出 name、family、range 三个变量的正确值（小提琴、弦乐、G3-E6）。"}
用解构赋值 const { name, family, range } = instrument 从对象中取出三个属性
::::

::::step{purpose="箭头函数省略了 function 关键字，代码更短；模板字符串使用反引号和 ${} 插值，告别了繁琐的字符串拼接。这是现代 JavaScript 最常用的两种语法，几乎每一个项目中都会大量使用。" expected="describe(instrument) 返回\"小提琴 是弦乐器，音域 G3-E6\"，输出与原始 function 版本一致。"}
用箭头函数重写 describe 函数，并用模板字符串（反引号）返回格式化的描述文字
::::

::::step{purpose="展开运算符创建新对象而不修改原对象——这是函数式编程的重要理念：不改变原始数据。就像用一份乐谱复印本做标注，原件保持不变，随时可以回到最初版本。" expected="新对象包含原 instrument 的所有属性（name, family, range）加上 players 属性，而原 instrument 对象保持不变。"}
用展开运算符 { ...instrument, players: "40人" } 给 instrument 对象添加新属性
::::

:::

:::hint{title="小提示"}
- 对象解构：`const { name, family } = instrument`
- 箭头函数：`const fn = (param) => { return ... }`
- 展开对象：`const newObj = { ...oldObj, newKey: value }`
- 模板字符串用反引号包裹：[[html]]<code class="inline-code">`乐器：${name}`</code>[[/html]]
:::

:::listen-to
德彪西《意象集》— 印象派用新的和声语言打破了传统规则，正如 ES6 用新语法改变了 JavaScript 的写法。
:::


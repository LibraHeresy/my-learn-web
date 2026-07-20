# ES6 新语法 — 让代码更优雅的"新工具"

:::analogy
ES6 就像手机系统大更新——还是那个操作系统，但多了很多新功能：箭头函数、模板字符串、解构赋值。用更少的代码做同样的事。
:::

:::prerequisite
**本节你需要知道这些词：**

- **变量**：用来存储数据的容器，用 `let` 或 `const` 声明
- **函数**：一段可以重复调用的代码块，有输入（参数）和输出（返回值）
- **数组**：一组有序数据的集合，用 `[]` 表示，每个元素有索引
- **对象**：键值对的集合，用 `{}` 表示，用来组织相关数据
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

:::explain{title="可选链 ?. — 安全访问深层属性"}
当你访问嵌套对象的属性时，如果中间某个属性是 `null` 或 `undefined`，程序会报错。可选链 `?.` 让你安全访问：
```js
const user = { name: "张三" };

// ❌ 旧写法：冗长且容易遗漏
let city;
if (user && user.address && user.address.city) {
  city = user.address.city;
}

// ✅ 可选链：遇到 null/undefined 就返回 undefined，不报错
const city = user?.address?.city;  // undefined（因为没有 address）
```

可选链也适用于函数调用和数组访问：
```js
user?.getInfo?.();        // 如果 getInfo 不存在，不调用
const first = arr?.[0];   // 如果 arr 是 null/undefined，返回 undefined
```
:::

:::explain{title="空值合并 ?? — 只在 null/undefined 时用默认值"}
`||`（或）对所有 falsy 值（0、""、false）都返回默认值，`??` 只在 `null`/`undefined` 时返回默认值：
```js
// ❌ || 的问题：0 和 "" 可能是合法值
const count = 0 || 10;   // 10（0 被当成了 falsy！）
const name = "" || "匿名"; // "匿名"（空字符串被当成了 falsy！）

// ✅ ?? 只把 null/undefined 视为"空"
const count = 0 ?? 10;   // 0（0 是合法值）
const name = "" ?? "匿名"; // ""（空字符串是合法值）
const city = null ?? "北京"; // "北京"（null 才用默认值）
```

**规则：`||` 在"任何 falsy 值"时回退，`??` 只在"确实没有值"（null/undefined）时回退。**
:::

:::example{title="可选链 + 空值合并组合使用"}
两者经常一起用——安全访问 + 智能默认值：
```js
// 从 API 响应中安全提取数据
const response = { data: { user: { name: "张三" } } };
const userName = response?.data?.user?.name ?? "未登录";

// 场景：用户可能没填地址
const user = { name: "张三" };  // 没有 address
const city = user?.address?.city ?? "未知城市";
console.log(city);  // "未知城市"（不会报错）
```
这就是现代 JS 中处理"可能不存在的值"的标准写法。
:::

:::example{title="解构赋值 — 从\"抽屉\"里取东西"}
想象你有一个文件夹，里面有多份文档。以前你要一首一首拿：
```js
// 旧写法
const piece1 = pieces[0]
const piece2 = pieces[1]
const piece3 = pieces[2]
```
解构赋值让你一次取出：
```js
// 数组解构
const [piece1, piece2, piece3] = pieces
// 对象解构
const { name, composer, period } = piece
```
就像从文件柜里一次抽出三份文件——整齐又高效。
:::

:::example{title="箭头函数 — 精简的\"函数写法\""}
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
```
箭头函数就像用缩写代替全称——同样的意思，更短的表达。
**重要区别：箭头函数没有自己的 `this`。** 普通函数中的 `this` 取决于谁调用了它，而箭头函数的 `this` 继承自定义它的外层作用域。这在事件处理中尤其需要注意。
:::

:::example{title="展开运算符 — 拆包与合并"}
`...` 像一只手，可以把数组/对象"展开"：
```js
// 合并数组
const classical = ['', '']
const romantic = ['张三', '李四']
const all = [...classical, ...romantic]
// ['', '', '张三', '李四']
// 复制对象并修改
const piece = { name: '春天', composer: '春天' }
const updated = { ...piece, period: '类型C' }
```
就像把两个团队的团队成员合并成一个更大的团队——不改变原来的，创造一个新的。
:::

:::task{title="动手试试 ✨"}
::::step{purpose="{{term:解构赋值}}让你一行代码取出多个属性，避免重复写 instrument.name、instrument.family。就像从文件柜里一次抽出三份文件，而不是一份一份拿——整齐又高效，也让代码意图更清晰。" expected="控制台输出 name、family、range 三个变量的正确值（工具A、电子类、100-240V）。"}
用解构赋值 const { name, family, range } = instrument 从对象中取出三个属性
::::

::::step{purpose="{{term:箭头函数}}省略了 function 关键字，代码更短；模板字符串使用反引号和 ${} 插值，告别了繁琐的字符串拼接。这是现代 JavaScript 最常用的两种语法，几乎每一个项目中都会大量使用。" expected="describe(instrument) 返回\"工具A 是电子类，规格 100-240V\"，输出与原始 function 版本一致。"}
用箭头函数重写 describe 函数，并用模板字符串（反引号）返回格式化的描述文字
::::

::::step{purpose="{{term:展开运算符}}创建新对象而不修改原对象——这是函数式编程的重要理念：不改变原始数据。就像用一份设计图复印本做标注，原件保持不变，随时可以回到最初版本。" expected="新对象包含原 instrument 的所有属性（name, family, range）加上 players 属性，而原 instrument 对象保持不变。"}
用展开运算符 { ...instrument, players: "40人" } 给 instrument 对象添加新属性
::::

:::

:::hint{title="小提示"}
- 对象解构：`const { name, family } = instrument`
- 箭头函数：`const fn = (param) => { return ... }`
- 展开对象：`const newObj = { ...oldObj, newKey: value }`
- 模板字符串用反引号包裹：[[html]]<code class="inline-code">`工具：${name}`</code>[[/html]]
:::

:::recap
你学会了 ES6 的几个常用新语法——用解构赋值一次取出多个属性，用箭头函数写更短的函数，用模板字符串拼接文字，用展开运算符合并数组和对象。这些新语法让代码更短、更清晰。
:::



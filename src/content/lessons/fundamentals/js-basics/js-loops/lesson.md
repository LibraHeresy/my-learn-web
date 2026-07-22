# 循环 — 让代码反复执行

:::analogy
循环就像一条**流水线上的质检员**——传送带上的每一件产品经过他面前时，他都做同样的检查：看看有没有瑕疵、盖个合格章。100 件产品？一样的流程做 100 遍。他不需要为第一件产品写一份操作手册，为第二件再写一份——**一套流程，重复执行**。

换成代码的世界：你要在页面上显示 100 条商品信息。没有循环，你写 100 行代码，复制粘贴到手酸。有了循环，**3 行代码**搞定——不管你后面是 5 条还是 5000 条数据。
:::


:::prerequisite
**本节你需要知道这些词：**

- **数组**：用 `[]` 创建列表，知道用索引（`arr[0]`）和 `.length` 访问元素
- **变量**：用 `let` 和 `const` 声明数据
- **DOM 基础**：了解 `document.querySelector()` 和 `element.innerHTML`
:::

:::explain{title="没有循环的世界——100 个 console.log"}
回到上一节的购物网站。你手里有 5 个商品，想在控制台打印每个商品的名字。没有循环的时候：

```js
let products = ["蓝牙耳机", "机械键盘", "显示器支架", "无线鼠标", "USB 扩展坞"];

console.log(products[0]);  // 蓝牙耳机
console.log(products[1]);  // 机械键盘
console.log(products[2]);  // 显示器支架
console.log(products[3]);  // 无线鼠标
console.log(products[4]);  // USB 扩展坞
```

5 个还能忍。如果后端 API 返回了 200 个商品呢？你要写 200 行 `console.log()`？更可怕的是——商品数量是**动态的**，你根本不知道有多少个，怎么写？

**循环就是为此而生的：**

```js
for (let i = 0; i < products.length; i++) {
  console.log(products[i]);
}
```

3 行代码，1 个、100 个、10000 个数组元素全部搞定。这就是循环的价值：**写一次逻辑，作用在每一个元素上。**
:::

:::explain{title="for 循环 — 三句话讲清楚"}
`for` 循环由**三个部分**组成，每一部分你都需要理解它在做什么：

```js
for (let i = 0; i < products.length; i++) {
  console.log(products[i]);
}
```

**第一部分：let i = 0（初始化）** — "我们从哪里开始？"
- 创建一个计数器变量 `i`，初始值设为 0
- 因为数组索引从 0 开始，所以 `i` 也从 0 开始
- 这一句**只在循环开始前执行一次**

**第二部分：i < products.length（条件）** — "什么时候停？"
- 每次循环开始前都会检查这个条件
- 条件为 `true` → 执行循环体；条件为 `false` → 退出循环
- `products.length` 是 5，所以当 `i` 变成 5 时（5 < 5 是 `false`），循环结束
- 这一句决定了循环跑多少轮

**第三部分：i++（增量）** — "每轮结束后做什么？"
- 每轮循环结束后执行，把 `i` 加 1
- `i++` 等价于 `i = i + 1`
- 如果你忘了写 `i++`，`i` 永远是 0，条件永远是 `0 < 5`（永远为 `true`）→ **无限循环**

**执行过程追踪（products 有 5 个元素）：**
```
第 1 轮：i=0 → 0<5? 是 → console.log(products[0]) → i 变成 1
第 2 轮：i=1 → 1<5? 是 → console.log(products[1]) → i 变成 2
第 3 轮：i=2 → 2<5? 是 → console.log(products[2]) → i 变成 3
第 4 轮：i=3 → 3<5? 是 → console.log(products[3]) → i 变成 4
第 5 轮：i=4 → 4<5? 是 → console.log(products[4]) → i 变成 5
第 6 轮：i=5 → 5<5? 否 → 退出循环
```
:::

:::explain{title="forEach — 更简洁的数组循环"}
`forEach` 是数组自带的方法，专门用来遍历数组。你不需要手动管 `i` 和 `i++`：

```js
let products = ["蓝牙耳机", "机械键盘", "显示器支架"];

products.forEach(function(item, index) {
  console.log((index + 1) + ". " + item);
});
// 输出：
// 1. 蓝牙耳机
// 2. 机械键盘
// 3. 显示器支架
```

`forEach` 自动把你的回调函数作用在数组的每一项上，并传入两个参数：
- **第一个参数（item）**：当前项的值——"蓝牙耳机"、"机械键盘"……
- **第二个参数（index）**：当前项的索引——0、1、2……（可选，不需要时可以省略）

**for 和 forEach 对比：**

| 特性 | for | forEach |
|------|-----|---------|
| 写法 | 需要手写三部分（初始化、条件、增量） | 只需一个回调函数 |
| 索引控制 | 手动控制 `i`，可以跳步（`i += 2`） | 按顺序遍历每一项，不能跳 |
| 中途退出 | `break` 随时停止 | 无法中途退出（`return` 只跳过当前项） |
| 适用场景 | 需要精确控制循环次数或步长 | 单纯"对每一项做一件事" |
| 阅读感受 | 代码多，但控制力强 | 代码干净，意图直白 |

**一句话总结：** 大多数情况下用 `forEach`，因为你只是想"对每一项做同样的事"。需要跳过某些项、提前退出、或者自定义步长的时候才用 `for`。
:::

:::explain{title="循环的核心价值：用数据生成 HTML"}
循环最强大的应用场景不是打印 `console.log`，而是**根据数据动态生成页面内容**：

```js
let products = [
  { name: "蓝牙耳机", price: 299 },
  { name: "机械键盘", price: 459 },
  { name: "显示器支架", price: 189 }
];

let html = "";
products.forEach(function(product, index) {
  html += `
    <div class="card">
      <span class="num">${index + 1}</span>
      <h3>${product.name}</h3>
      <p>¥${product.price}</p>
    </div>
  `;
});
document.querySelector("#list-container").innerHTML = html;
```

**这就是数据驱动页面的核心模式：**
1. 数据放在数组里（`products`）
2. 用循环遍历数组（`forEach`）
3. 每一项拼接成一段 HTML 字符串
4. 一次性插入页面（`innerHTML`）

5 件商品 → 5 张卡片自动生成。50 件商品 → 50 张卡片自动生成。**数据量变了，代码一行都不用改。**
:::

:::example{title="看看实际效果"}
打开右侧的 `script.js`，你会看到这段代码的骨架。`products` 数组里存了 5 个商品对象，`renderList()` 函数等你来实现：

```js
// 商品数据 —— 数组里包着对象，每个对象是一条商品记录
const products = [
  { name: '蓝牙耳机', price: 299 },
  { name: '机械键盘', price: 459 },
  { name: '显示器支架', price: 189 },
  { name: '无线鼠标', price: 129 },
  { name: 'USB-C 扩展坞', price: 349 }
];

// TODO: 用 forEach 遍历 products，为每个商品创建 DOM 元素
function renderList() {
  const container = document.querySelector('#list-container');
  container.innerHTML = ''; // 清空容器

  // 你的循环代码将写在这里
  // 遍历 products 数组，为每个商品创建 .list-item 的 div
  // 包含序号（index + 1）、商品名和价格（带 ¥ 符号）
}

// 按钮点击触发渲染
document.querySelector('#generate-btn').addEventListener('click', renderList);
```

切换到**预览区**，你会看到页面初始是空的——因为 `renderList()` 函数还没有实现循环逻辑。这正是本节的核心任务。
:::

:::task{title="动手试试 ✨"}
::::step{purpose="让你感受循环的「自动化」力量——增加一条数据，无需手动复制 HTML，循环自动为它生成列表项。这就是循环的核心价值：写一次模板逻辑，处理任意数量的数据。" expected="点击「生成列表」按钮后，页面显示 6 件商品（原有 5 件 + 新增的平板电脑），序号正确递增，样式一致。你只加了一行数据，一切都自动完成。"}

打开 `script.js`，先读一遍整个文件（用 `fs.readFileSync` 或者直接在编辑器中打开）。理解 `products` 数组的结构和 `renderList()` 函数的位置。

**第 1 步：在 products 数组中新增一个商品：**
```js
const products = [
  { name: '蓝牙耳机', price: 299 },
  { name: '机械键盘', price: 459 },
  { name: '显示器支架', price: 189 },
  { name: '无线鼠标', price: 129 },
  { name: 'USB-C 扩展坞', price: 349 },
  { name: '平板电脑', price: 3299 }   // ← 新增
];
```

**第 2 步：在 renderList() 函数中补全 forEach 循环逻辑：**
```js
function renderList() {
  const container = document.querySelector('#list-container');
  container.innerHTML = '';

  products.forEach(function(product, index) {
    // 为每个商品创建一个 div
    const item = document.createElement('div');
    item.className = 'list-item';

    // 用 innerHTML 填充内容
    item.innerHTML = `
      <span class="item-index">${index + 1}</span>
      <span class="item-name">${product.name}</span>
      <span class="item-price">¥${product.price}</span>
    `;

    // 插入容器
    container.appendChild(item);
  });
}
```

3. 点击「生成列表」按钮，观察 6 件商品（包括平板电脑）是否自动出现在列表中。
4. 保存文件（`fs.writeFileSync`），刷新预览区验证。
::::

::::step{purpose="`for` 和 `forEach` 是循环的两种写法——`for` 更底层，让你手动控制索引；`forEach` 更简洁，专注于「对每一项做什么」。理解两种方法后，你能在不同场景下灵活选择。" expected="页面显示效果和 forEach 完全一样，但你用的是 `for` 循环。通过对比，你理解了两种循环的等价性。"}

把 `renderList()` 中的 `forEach` 改成 `for` 循环：

```js
function renderList() {
  const container = document.querySelector('#list-container');
  container.innerHTML = '';

  for (let i = 0; i < products.length; i++) {
    let product = products[i];  // 通过索引拿到当前项

    const item = document.createElement('div');
    item.className = 'list-item';
    item.innerHTML = `
      <span class="item-index">${i + 1}</span>
      <span class="item-name">${product.name}</span>
      <span class="item-price">¥${product.price}</span>
    `;
    container.appendChild(item);
  }
}
```

点击「生成列表」验证效果——应该和 forEach 版本完全一致。

**对比关键差异：** `for` 需要你手动写 `let i = 0`（起点）、`i < products.length`（终点）、`i++`（步进），然后用 `products[i]` 取值。`forEach` 自动帮你做了这三件事——但代价是你失去了灵活控制 `i` 的能力。
::::

::::step{purpose="让你意识到循环内部的模板可以自由修改。每个列表项共享同一个 DOM 结构，但填充的数据各不相同（因为 `product.name` 和 `product.price` 每次迭代都在变化）。" expected="所有列表项的样式统一更新（因为改了同一个创建逻辑），但每项显示的内容仍然不同——模板统一，数据多样。"}

修改列表项模板，给每项增加更多信息。

1. 给 `products` 数组中的每个对象增加一个 `tag` 属性：
```js
{ name: '蓝牙耳机', price: 299, tag: '数码' },
```

2. 在 `renderList()` 的模板中添加一个分类标签：
```js
item.innerHTML = `
  <span class="item-index">${index + 1}</span>
  <span class="item-name">${product.name}</span>
  <span class="item-tag">${product.tag}</span>
  <span class="item-price">¥${product.price}</span>
`;
```

3. 保存文件，点击「生成列表」——所有商品都多了一个分类标签，每个标签显示各自的值。

**关键洞察：** 你改了一次模板，所有列表项同步更新——模板是统一的，数据是个性化的。
::::

::::step{purpose="组合循环 + 条件判断——这是数据处理中最常见的模式。「先筛选，再渲染」或「边遍历边判断」，让你瞬间拥有处理复杂数据的能力。" expected="只有价格大于 200 的商品显示在列表上，低价商品被跳过不显示。循环和条件判断配合得天衣无缝。"}

挑战：在循环内部增加条件判断，只显示价格大于 200 的商品。

```js
products.forEach(function(product, index) {
  if (product.price > 200) {          // ← 只有价格大于 200 才执行
    const item = document.createElement('div');
    item.className = 'list-item';
    item.innerHTML = `
      <span class="item-index">${index + 1}</span>
      <span class="item-name">${product.name}</span>
      <span class="item-price">¥${product.price}</span>
    `;
    container.appendChild(item);
  }
});
```

点击「生成列表」——只有蓝牙耳机（299）、机械键盘（459）、USB 扩展坞（349）和平板电脑（3299）显示出来。显示器支架（189）和无线鼠标（129）被跳过了。

**常见错误提醒：** `for` 循环中忘了写 `i++` 是初学者最容易犯的错——`i` 永远不变，条件永远为 `true`，页面直接卡死。如果你遇到页面卡住不动的情况，第一件事就是检查循环的增量部分是否写了。
::::

:::

:::recap
这一节你学会了用循环批量处理数据——`forEach` 遍历数组的每一项，对每一项都执行相同的操作。用 `for` 循环可以手动控制起始、停止和步进。

**核心要点：**
- `for` 循环三部分：初始化（`let i = 0`）、条件（`i < arr.length`）、增量（`i++`）
- `forEach` 更简洁：自动把 `(item, index)` 传给你的回调函数
- **循环 + 条件判断 + DOM 操作 = 动态页面**——数据驱动渲染的核心
- 常见错误：忘了 `i++`（无限循环）、条件写 `<=` 而不是 `<`（越界访问）

**5 条数据和 5000 条数据，代码完全一样。** 你现在可以把一整组数据自动渲染成一整排卡片了——这就是循环真正的力量。

下一节你将学习**对象**——把每条记录的多个属性（名字、价格、分类）打包在一起，让数据结构更清晰。
:::

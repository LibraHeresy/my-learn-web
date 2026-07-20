# 循环 — 让代码反复执行

:::analogy
循环就像流水线上的质检员——对每一个产品做同样的检查，直到整批检查完。用代码对列表中的每一项重复执行相同的操作。
:::


:::prerequisite
**本节你需要知道这些词：**

- **数组**：用 `[]` 创建列表，用索引访问元素
- **条件判断**：用 `if`/`else` 做分支逻辑
:::

:::explain{title="for 循环"}
for 循环让代码重复执行指定次数——就像数数从第 1 个数到最后 1 个。循环由三部分组成：let i = 0（从哪里开始）、i < 数组.length（什么时候停）、i++（每轮 i 加 1）。
```js
for (let i = 0; i < composers.length; i++) {
  console.log(composers[i]);
}
```
:::

:::explain{title="forEach — 更优雅的循环"}
`forEach` 是专门为数组设计的循环方法：
```js
composers.forEach(function(name, index) {
  console.log(`${index + 1}. ${name}`);
});
```
- `name` — 当前项的值
- `index` — 当前项的索引（0 开始）
```js
// 用 forEach 批量生成 HTML
let html = "";
composers.forEach(function(composer) {
  html += `<li>${composer}</li>`;
});
document.querySelector("ul").innerHTML = html;
```
`forEach` 比 `for` 更简洁——你不用手动写 `i` 和 `i++`。
:::

:::example{title="看例子"}
下面的代码用 `forEach` 遍历设计师数组，把每一项渲染成 HTML 卡片：
```js
let composers = ["", "", "春天", "张三"]; // 数组：方括号包裹，逗号分隔
let html = "";                                        // 空字符串，准备拼接 HTML

// forEach：遍历数组的每个元素——"对每一项都做同样的事"
composers.forEach(function(name, index) {
  html += `                               // += 是拼接，每次循环追加一段 HTML
    <div class="card">
      <span class="num">${index + 1}</span>  // index 从 0 开始，+1 变成 1、2、3...
      ${name}                                // 当前这一项的设计师名字
    </div>
  `;
});
// innerHTML：把拼接好的 HTML 字符串插入页面
document.querySelector("#list").innerHTML = html;
```
打开 JS 选项卡查看完整代码。4 张卡片由一个循环生成——如果加到 10 个也不用手动复制。
:::

:::task{title="动手试试 ✨"}
::::step{purpose="让你感受循环的「自动化」力量——增加一条数据，无需手动复制 HTML，循环自动为它生成列表项。这就是循环的核心价值：写一次模板逻辑，处理任意数量的数据。从 5 条到 100 条，代码量完全不变。" expected="点击「生成列表」按钮后，页面自动多出一行新商品，序号正确递增，样式和其他列表项完全一致。你只加了一行数据，一切自动完成。"}
在 `products` 数组中新增一个商品，点击「生成列表」观察页面变化

打开 `script.js`，在 `products` 数组中参照已有格式添加一个新商品：
```js
{ name: '平板电脑', price: 3299 }
```

在 `renderList()` 函数中补全 forEach 循环逻辑。点击「生成列表」按钮，观察新商品是否自动出现在列表中。
::::

::::step{purpose="`for` 和 `forEach` 是循环的两种写法——`for` 更底层，让你手动控制索引；`forEach` 更简洁，专注于「对每一项做什么」。理解两种方法后，你能在不同场景下灵活选择。" expected="页面显示效果和 forEach 完全一样，但你用的是 `for` 循环。通过对比，你理解了两种循环的等价性。"}
把 `forEach` 循环改成传统的 `for` 循环

在 `renderList()` 函数中，把 `products.forEach(...)` 改为 `for` 循环：
```js
for (let i = 0; i < products.length; i++) {
  let product = products[i];
  // 同样创建 DOM 元素并插入...
}
```
点击「生成列表」验证效果是否完全一致。
::::

::::step{purpose="让你意识到循环内部的模板可以自由修改。每个列表项共享同一个 DOM 结构，但填充的数据各不相同（因为 `product.name` 和 `product.price` 每次迭代都在变化）。" expected="所有列表项的样式统一更新（因为改了同一个创建逻辑），但每项显示的内容仍然不同——模板统一，数据多样。"}
修改列表项模板，给每项增加更多信息

在 `renderList()` 中创建每个 `.list-item` 时，除了商品名和价格，再添加一个分类标签（如 `<span class="item-tag">电子产品</span>`）。你可以给 `products` 数组中的每个对象增加 `tag` 属性。
::::

::::step{purpose="组合循环 + 条件判断——这是数据处理中最常见的模式。「先筛选，再渲染」或「边遍历边判断」，让你瞬间拥有处理复杂数据的能力。" expected="只有价格大于 200 的商品显示在列表上，低价商品被跳过不显示。循环和条件判断配合得天衣无缝。"}
挑战：在 forEach 循环内增加条件判断，只显示价格大于 200 的商品

在循环体内用 `if (product.price > 200)` 包裹创建 DOM 元素的代码，点击「生成列表」后只看到高价商品。
::::

:::

:::recap
这一节你学会了用循环批量处理数据——`forEach` 遍历数组的每一项，对每一项都执行相同的操作。用 `for` 循环可以手动控制起始、停止和步进。你再也不用复制粘贴代码来处理每一条数据了——10 条数据和 100 条数据，代码量完全一样。现在你可以把一整组数据自动渲染成一整排卡片了。
:::



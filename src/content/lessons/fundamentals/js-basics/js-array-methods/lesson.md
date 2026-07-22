# 数组方法进阶 — 像筛选简历一样处理数据

:::analogy
.map() 就像给全班同学每人加一分——每个人都变了，但顺序不变；.filter() 就像从一堆简历里挑出符合条件的——不符合的筛掉，符合的留下。
:::


:::prerequisite
**本节你需要知道这些词：**

- **数组**：创建数组、访问元素、获取长度
- **循环**：用 `for` 遍历数组中的每个元素
- **函数**：定义和调用函数，理解回调函数的概念
:::

:::explain{title=".map() — 把每个元素\"转换\"成新值"}
数组方法让你像整理设计图一样操作数据——map 对每项做同样处理返回新数组，filter 筛选符合条件的项，reduce 将所有项累积为一个值。.map() 遍历数组中的每一项执行函数后**返回新数组**，原数组不变：
```js
let names = ["bach", "mozart", "beethoven"];
let upper = names.map(function(name) {
  return name.toUpperCase();
});
// upper 是 ["BACH", "MOZART", "BEETHOVEN"]
// names 没变！
```
就像把文档从中文翻译成英文——原稿还在，只是多了一个新版本。
:::

:::explain{title=".filter() — 筛选符合条件的元素"}
`.filter()` 遍历数组，**只保留**让条件函数返回 `true` 的项：
```js
let years = [1685, 1756, 1770, 1810, 1862];
let after1800 = years.filter(function(year) {
  return year > 1800;
});
// after1800 是 [1810, 1862]
```
就像在一堆文件中只挑出PDF——其他文件还在，但你只需要PDF。
:::

:::explain{title="链式调用 — map 和 filter 组合"}
`.map()` 和 `.filter()` 都返回数组，所以可以**链式调用**：
```js
let composers = [
  { name: "", year: 1720 },
  { name: "", year: 1785 },
  { name: "春天", year: 1805 },
  { name: "张三", year: 1835 }
];
// 先筛选 1800 年后的，再只取名字
let names = composers
  .filter(function(c) { return c.year > 1800; })
  .map(function(c) { return c.name; });
// names 是 ["春天", "张三"]
```
就像先从书店挑出打折书，再把它们的书名抄下来——流水线操作！
:::

:::example{title="看例子"}
下面的代码用 `.filter()` 筛选出含有"A"的设计师名字，再用 `.map()` 转为大写：
```js
let composers = ["Bach", "Mozart", "Beethoven", "Chopin", "Debussy", "Vivaldi"];
// 筛选名字里含 "a"（不区分大小写）的
let filtered = composers.filter(function(name) {
  return name.toLowerCase().includes("a");
});
// 转为大写
let result = filtered.map(function(name) {
  return name.toUpperCase();
});
document.querySelector("#output").innerHTML =
  result.join(" | ");
```
:::

:::task{title="动手试试 ✨"}
::::step{purpose="`.filter()` 的灵活性——筛选条件完全由你定义，任何返回 true/false 的判断都可以作为过滤规则。左侧全部数据不变，右侧筛选结果实时响应你选择的条件。就像在电商网站点击分类筛选商品。" expected="右侧「筛选结果」列只显示对应分类的商品。点击「电子产品」只看到笔记本、音箱、键盘；点击「食品」只看到面包、牛奶、咖啡。左侧全部数据始终不变。"}
补全 `applyFilter()` 函数，实现分类筛选功能

打开 `script.js`，在 `applyFilter(category)` 函数中完成筛选逻辑：
```js
function applyFilter(category) {
  let filtered;
  if (category === 'all') {
    filtered = products;                         // 显示全部
  } else {
    filtered = products.filter(function(item) {  // 按分类筛选
      return item.category === category;
    });
  }
  renderProducts(filtered, '#filtered-data');
}
```
完成后点击分类按钮（电子产品/食品/服装），观察右侧「筛选结果」列的变化。
::::

::::step{purpose="`.map()` 对数组中每项做「同一种加工」——比如把所有价格翻倍显示。原数组不变，只是生成了新的加工版本。了解 map 后你能对数据做任意转换再渲染。" expected="右侧显示的商品列表中，每个商品名称前都加上了「[热销]」前缀，价格也变成了原来的 2 倍——但左侧原始数据完全没变。"}
用 `.map()` 对筛选结果做数据转换后渲染

在 `applyFilter()` 中，筛选之后用 `.map()` 对数据做加工，例如把所有商品名加上前缀、价格翻倍：
```js
filtered = products
  .filter(item => item.category === category)
  .map(item => ({
    ...item,
    name: '[热销] ' + item.name,
    price: item.price * 2
  }));
```
比较左右两列：左侧原数据不变，右侧是加工后的版本。
::::

::::step{purpose="链式调用是 JavaScript 最优雅的编程风格之一——就像流水线上的「传送带」，一个工序紧接下一个，形成流畅的数据处理流水线。不产生中间变量，代码更简洁清晰。" expected="右侧只显示价格 >= 100 且分类为 electronics 的商品。一个链式调用同时完成了筛选 + 二次筛选，效果和分步写完全一样，但代码更简洁。"}
用链式调用组合多个 filter 和 map

在 `applyFilter()` 中把 `.filter()` 和 `.map()` 串联起来，例如先按分类筛选，再筛掉低价商品：
```js
filtered = products
  .filter(item => item.category === category)
  .filter(item => item.price >= 100)
  .map(item => ({ ...item, name: '【精选】' + item.name }));
```
::::

::::step{purpose="综合运用 `.filter()` + 事件监听 + DOM 渲染——这是一套完整的「搜索过滤」交互模式。输入文字，结果实时变化，无需点击任何按钮。理解了这套模式，你就掌握了电商搜索、通讯录查找等常见功能的底层原理。" expected="在搜索框输入关键词，右侧筛选结果实时变化。输入「键盘」，右侧只显示「机械键盘」一项；清空输入框后恢复按分类按钮的筛选结果。"}
挑战：补全搜索框输入事件，实现实时关键词搜索

在 `script.js` 的搜索框 `input` 事件中，用 `products.filter()` 筛选名称包含输入关键词的商品：
```js
document.querySelector('#search-input').addEventListener('input', function () {
  const keyword = this.value.trim().toLowerCase();
  const filtered = products.filter(item =>
    item.name.toLowerCase().includes(keyword)
  );
  renderProducts(filtered, '#filtered-data');
});
```
输入不同关键词，观察右侧筛选结果实时变化。清空搜索框则恢复显示全部。
::::

:::

:::recap
这一节你学会了两个强大的数组方法——`.map()` 把数组中每项都"加工"一遍生成新数组（像翻译），`.filter()` 根据条件筛选出部分项生成新数组（像只挑某一类）。它们都不改变原数组，还可以用链式调用串联起来：先筛选再转换，一气呵成。现在你处理数据的速度快了 10 倍——筛选、转换、显示，几行代码就搞定。
:::



# 对象 — 结构化你的音乐数据

::music-analogy
对象就像**音乐家档案**——用键值对（key-value）组织信息：姓名、时期、代表作、国籍。不像数组用数字索引，对象用**有名字的键**来存取数据，就像档案上的标签："姓名____、时期____"。
::

::explain{title="创建和访问对象"}
对象用 `{}` 创建，包含多组键值对：
```js
let composer = {
  name: "肖邦",
  period: "浪漫主义",
  country: "波兰",
  birthYear: 1810
};
```
访问属性有两种方式：
```js
composer.name       // "肖邦"（点号）
composer["period"]  // "浪漫主义"（方括号）
```
修改或新增：
```js
composer.famousPiece = "夜曲";  // 新增
composer.birthYear = 1809;      // 修正（肖邦实际生于 1810）
```
::

::explain{title="对象数组 — 真正的数据结构"}
对象最强大的用法是和数组结合——**对象数组**：
```js
let composers = [
  { name: "巴赫", period: "巴洛克", country: "德国" },
  { name: "莫扎特", period: "古典主义", country: "奥地利" },
  { name: "肖邦", period: "浪漫主义", country: "波兰" }
];
// 用 forEach 遍历
composers.forEach(function(c) {
  console.log(`${c.name} — ${c.period}`);
});
```
这才是实际开发中最常见的数据形式——数组里包着对象，每个对象代表一条记录。就像 Excel 表格：每一行是数组的一项，每一列是对象的属性！
::

::example{title="看例子"}
下面的代码用对象数组存储了作曲家信息，用 `forEach` 遍历并生成卡片：
```js
let composers = [
  { name: "巴赫", period: "巴洛克", piece: "赋格的艺术" },
  { name: "莫扎特", period: "古典主义", piece: "魔笛" },
  { name: "肖邦", period: "浪漫主义", piece: "夜曲" }
];
let html = "";
composers.forEach(function(c) {
  html += `
    <div class="card">
      <h2>${c.name}</h2>
      <p>时期：${c.period}</p>
      <p>代表作：《${c.piece}》</p>
    </div>
  `;
});
```
切换到 JS 标签页查看完整代码——对象数据的结构和用途一目了然。
::

::task{title="动手试试 ✨"}
:::step{purpose="对象数组是实际开发中最常见的数据结构——每一条记录都是一个对象，所有记录组成数组。新增一条数据就像给 Excel 表增加一行，属性的键名就是列标题。" expected="页面多了一张新卡片，显示你新增的作曲家信息，样式和其他卡片完全一致。`forEach` 循环自动处理了新增的数据——你只需关注数据本身。"}
在 `composers` 对象数组中新增一位作曲家对象，参照已有格式添加 `name`、`period`、`piece` 三个属性。比如新增德彪西：`{ name: "德彪西", period: "印象派", piece: "月光" }`
:::

:::step{purpose="对象扩展属性非常灵活——随时可以加新字段而不影响已有数据。就像在档案卡上多印一行「国籍」，所有卡片同步更新。但要注意：模板也要同步修改才能显示新字段。" expected="每张卡片都多出一行国籍信息，格式和位置统一。你体验了「改模板结构 + 补全数据」的完整流程。"}
给每个对象增加一个 `country` 属性（如 `country: "德国"`），然后在卡片模板字符串中添加一行 `<p>国籍：${c.country}</p>` 来显示国籍信息
:::

:::step{purpose="对象属性的修改和变量赋值一样简单——`c.period = \"新值\"` 即可。数据驱动渲染的核心思想是：数据变了，视图自动跟着变。这是所有前端框架（Vue、React）的底层原理。" expected="贝多芬卡片上的时期标签变成了「古典主义」，其他卡片不受影响。对象之间的独立性让你可以精确修改任何一条记录。"}
修改某个作曲家的 `period` 属性值（比如把贝多芬的 `period` 从「古典到浪漫」改成「古典主义」），刷新页面观察该卡片的变化
:::

:::step{purpose="对象属性 + 条件判断的组合是数据管理中最强大的模式。通过 `c.period` 访问对象的时期字段，用 `=== \"浪漫主义\"` 做精确匹配，筛选出特定子集。这就像从音乐资料库中调出所有浪漫主义时期的档案。" expected="只有肖邦（条件符合）的卡片显示在页面上，其他时期的作曲家被过滤掉了。筛选 + 渲染的流水线完美协作。"}
挑战：使用 `.filter()` 方法只显示浪漫主义时期的作曲家。在 `forEach` 之前先用 `composers.filter(function(c) { return c.period === "浪漫主义" })` 筛选数据
:::

::

::listen-to
拉威尔《波莱罗》— 配器总谱上标注了每一件乐器的详细信息（乐器名、调性、进入小节），就像对象中结构化的键值对数据。
::


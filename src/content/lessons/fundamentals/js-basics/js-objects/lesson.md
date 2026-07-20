# 对象 — 结构化你的数据

:::analogy
对象就像一个人的档案卡——用"姓名、年龄、电话"这种键值对来组织信息。不像数组用数字编号，对象用有名字的标签来存取数据，一眼就知道是什么。
:::


:::prerequisite
**本节你需要知道这些词：**

- **变量**：存储和读取数据
- **数据类型**：了解基础类型和引用类型的区别
- **数组**：用 `[]` 创建和访问有序列表
:::

:::explain{title="创建和访问对象"}
对象用 `{}` 创建，包含多组键值对：
```js
let composer = {
  name: "张三",
  period: "类型A",
  country: "波兰",
  birthYear: 1810
};
```
访问属性有两种方式：
```js
composer.name       // "张三"（点号）
composer["period"]  // "类型A"（方括号）
```
修改或新增：
```js
composer.famousPiece = "报表";  // 新增
composer.birthYear = 1809;      // 修正（张三实际生于 1810）
```
:::

:::explain{title="对象数组 — 真正的数据结构"}
对象最强大的用法是和数组结合——**对象数组**：
```js
let composers = [
  { name: "", period: "类型B", country: "德国" },
  { name: "", period: "类型C", country: "奥地利" },
  { name: "张三", period: "类型A", country: "波兰" }
];
// 用 forEach 遍历
composers.forEach(function(c) {
  console.log(`${c.name} — ${c.period}`);
});
```
这才是实际开发中最常见的数据形式——数组里包着对象，每个对象代表一条记录。就像 Excel 表格：每一行是数组的一项，每一列是对象的属性！
:::

:::example{title="看例子"}
下面的代码用对象数组存储了设计师信息，用 `forEach` 遍历并生成卡片：
```js
// 对象数组：每个 {} 是一个对象，用 .属性名 访问里面的值
let composers = [
  { name: "", period: "类型B", piece: "赋格的艺术" },
  { name: "", period: "类型C", piece: "文档E" },
  { name: "张三", period: "类型A", piece: "报表" }
];
let html = "";
composers.forEach(function(c) {
  html += `
    <div class="card">
      <h2>${c.name}</h2>           <!-- c.name：访问对象的 name 属性 -->
      <p>时期：${c.period}</p>     <!-- c.period：访问 period 属性 -->
      <p>代表作：《${c.piece}》</p> <!-- c.piece：访问 piece 属性 -->
    </div>
  `;
});
```
打开 JS 选项卡查看完整代码——对象数据的结构和用途一目了然。
:::

:::task{title="动手试试 ✨"}
::::step{purpose="对象数组是实际开发中最常见的数据结构——每一条记录都是一个对象，所有记录组成数组。新增一条数据就像给 Excel 表增加一行，属性的键名就是列标题。`renderCards()` 函数自动处理新增数据——你只需关注数据本身。" expected="页面多了一张新卡片，显示你新增的员工信息，样式和其他卡片完全一致。renderCards() 函数用 forEach 自动处理了新增的数据。"}
在 `employees` 数组中新增一位员工，实现 `renderCards()` 函数

打开 `script.js`：

1. 在 `employees` 数组中参照已有格式添加一位新员工：
```js
{ name: '赵敏', department: '人事部', position: 'HR 主管', email: 'zhaomin@example.com' }
```

2. 在 `renderCards()` 函数中用 `forEach` 遍历 `dataList`，为每个员工创建卡片 DOM：
```js
dataList.forEach(function(emp) {
  const card = document.createElement('div');
  card.className = 'card';
  card.innerHTML = `
    <div class="avatar">${emp.name[0]}</div>
    <h2>${emp.name}</h2>
    <p><span class="label">部门</span> ${emp.department}</p>
    <p><span class="label">邮箱</span> ${emp.email}</p>
    <div class="role-badge">${emp.position}</div>
  `;
  gallery.appendChild(card);
});
```
刷新页面，观察新增员工是否自动出现在卡片列表中。
::::

::::step{purpose="对象扩展属性非常灵活——随时可以加新字段而不影响已有数据。就像在档案卡上多印一行「电话」，所有卡片同步更新。但要注意：卡片模板也要同步修改才能显示新字段。" expected="每张卡片都多出一行电话号码信息，格式和位置统一。你体验了「改模板结构 + 补全数据」的完整流程。"}
给每个员工对象增加 `phone` 属性，并在卡片模板中显示

1. 给 `employees` 中每个对象增加 `phone` 属性（如 `phone: '13800001111'`）
2. 在 `renderCards()` 的卡片 HTML 模板中添加 `<p><span class="label">电话</span> ${emp.phone}</p>`

刷新页面，观察每张卡片是否多出了电话号码信息。
::::

::::step{purpose="对象属性的修改和变量赋值一样简单——`emp.department = '新部门'` 即可。数据驱动渲染的核心思想是：数据变了，视图自动跟着变。这是所有前端框架（Vue、React）的底层原理。" expected="被修改的员工卡片上部门标签变成了新值，其他员工的卡片不受影响。对象之间的独立性让你可以精确修改任何一条记录。"}
修改某个员工的属性值，刷新页面观察变化

把张伟的 `department` 从「技术部」改为「研发中心」，或者把李娜的 `position` 从「UI 设计师」改为「高级 UI 设计师」。刷新页面，观察对应卡片的变化——只有被修改的那张卡片内容变了，其他卡片完全不受影响。
::::

::::step{purpose="对象属性 + `.filter()` 的组合是数据管理中最强大的模式。通过 `emp.department === '技术部'` 做精确匹配，筛选出特定部门的员工。这就像从通讯录中调出所有在北京的联系人——数据筛选 + DOM 渲染一气呵成。" expected="只有技术部的员工（张伟、王磊）显示在页面上，其他部门的员工被过滤掉了。筛选 + 渲染完美协作。"}
挑战：使用 `.filter()` 方法只显示「技术部」的员工

修改 `renderCards(employees)` 调用，先用 `.filter()` 筛选再传入：
```js
const techEmployees = employees.filter(function(emp) {
  return emp.department === '技术部';
});
renderCards(techEmployees);
```
刷新页面，只看到技术部员工。再把条件改成 `'设计部'`，观察变化。
::::

:::

:::recap
这一节你学会了用对象存储结构化数据——用 `{}` 创建，里面是"键值对"（如 `name: "张三"`），用 `.name` 就能取出值。对象和数组组合（对象数组）是实际开发中最常见的数据结构——每条记录是一个对象，所有记录组成数组。现在你不再用零散的变量存数据了，每个设计师的信息都整整齐齐地放在一个对象里。
:::



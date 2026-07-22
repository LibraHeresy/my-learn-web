# 对象 — 结构化你的数据

:::analogy
对象就像一张**人事档案卡**——姓名、年龄、部门、职位，全写在同一张卡上，每个字段都有标签（"姓名: 张三"、"部门: 技术部"）。想查一个人的信息？拿起他的档案卡，一眼看清所有字段。

数组是用数字编号来存东西的（第 0 号、第 1 号、第 2 号）——适合存"一堆同类的东西"。对象是用**名字**来存东西的（`name`、`age`、`department`）——适合存"一个东西的多个属性"。两者结合（对象数组），就是真实世界中 90% 的数据结构。
:::


:::prerequisite
**本节你需要知道这些词：**

- **变量**：用 `let` 和 `const` 声明和存储数据
- **数据类型**：了解基础类型（string、number）和引用类型的区别
- **数组**：用 `[]` 创建和访问有序列表
- **循环**：会用 `forEach` 遍历数组（上一节刚学）
:::

:::explain{title="没有对象的世界——16 个散落的变量"}
假设你的公司有 4 个员工，你要在页面上显示他们的信息。没有对象的时候：

```js
// 员工 1 的 4 个属性
let name1 = "张伟";
let dept1 = "技术部";
let pos1 = "前端工程师";
let email1 = "zhangwei@example.com";

// 员工 2 的 4 个属性
let name2 = "李娜";
let dept2 = "设计部";
let pos2 = "UI 设计师";
let email2 = "lina@example.com";

// 员工 3 的 4 个属性...
let name3 = "王磊";
let dept3 = "技术部";
let pos3 = "后端工程师";
let email3 = "wanglei@example.com";

// 员工 4 的 4 个属性...
let name4 = "陈静";
let dept4 = "市场部";
let pos4 = "市场经理";
let email4 = "chenjing@example.com";
```

**4 个员工 = 16 个变量。** 如果要添加第 5 个员工，再加 4 个变量。如果要加一个 `phone` 字段，每个员工都要加一个变量。如果想找所有"技术部"的员工？你根本没办法——这些变量之间没有任何关联。

**用对象来拯救这个局面：**

```js
let employees = [
  { name: "张伟", department: "技术部", position: "前端工程师", email: "zhangwei@example.com" },
  { name: "李娜", department: "设计部", position: "UI 设计师", email: "lina@example.com" },
  { name: "王磊", department: "技术部", position: "后端工程师", email: "wanglei@example.com" },
  { name: "陈静", department: "市场部", position: "市场经理", email: "chenjing@example.com" }
];

// 找所有技术部员工？一个 filter 搞定：
let techStaff = employees.filter(function(emp) {
  return emp.department === "技术部";
});
```

16 个散落的变量 → 1 个数组 + 4 个对象。数据结构清晰了，操作也变得简单了。**这就是对象的价值：把相关的属性打包在一起，然后用数组管理一组打包好的对象。**
:::

:::explain{title="创建和访问对象"}
对象用 `{}` 创建，里面是**键值对**（`key: value`）：

```js
let user = {
  name: "张三",
  age: 28,
  role: "前端工程师"
};
```

访问属性有两种方式：

```js
// 点号 — 最常用（属性名确定时）
user.name;   // "张三"
user.age;    // 28

// 方括号 — 属性名是动态的时候用
let key = "role";
user[key];   // "前端工程师"（key 是变量，值为 "role"）
user["name"]; // "张三"（和 user.name 完全等价）

// 修改和新增属性
user.age = 29;           // 修改已有属性
user.phone = "138xxxx";  // 新增一个属性（就像往档案卡上加一行）
```

**两种访问方式的选择：**
- 属性名在写代码时就知道 → 用点号：`user.name`
- 属性名存在变量里，运行时才知道 → 用方括号：`user[key]`

**容易犯的错：** 访问一个不存在的属性，不会报错——只返回 `undefined`。这在调试时很容易让你困惑：

```js
let user = { name: "张三" };
console.log(user.age);  // undefined（没有 age 属性，静默失败）
console.log(user.Name); // undefined（JavaScript 区分大小写！name ≠ Name）
```
:::

:::explain{title="对象数组 — 真实世界 90% 的数据结构"}
后端 API 返回的数据，几乎永远是**对象数组**的格式：

```js
// 后端 API 返回的 JSON 数据大概长这样：
{
  "users": [
    { "id": 1, "name": "张三", "email": "zhang@example.com" },
    { "id": 2, "name": "李四", "email": "li@example.com" },
    { "id": 3, "name": "王五", "email": "wang@example.com" }
  ]
}
```

这就是一个**数组里包着对象**——每一行是一"条"数据（数组的一项），每一列是一"个"属性（对象的键）。就像一个 Excel 表格：
- 每一行 → 数组的一个元素（一个对象）
- 每一列 → 对象的一个属性

**用对象数组渲染页面——数据驱动渲染的标准模式：**

```js
let employees = [
  { name: "张伟", department: "技术部", position: "前端工程师" },
  { name: "李娜", department: "设计部", position: "UI 设计师" }
];

let html = "";
employees.forEach(function(emp) {
  html += `
    <div class="card">
      <h2>${emp.name}</h2>
      <p>部门：${emp.department}</p>
      <span class="badge">${emp.position}</span>
    </div>
  `;
});
document.querySelector("#gallery").innerHTML = html;
```

**数据（对象数组） + 循环（forEach） + DOM（innerHTML） = 动态页面。** 这是你在真实工作中每天都会写的代码模式。
:::

:::example{title="看看实际效果"}
打开右侧的 `script.js`，你会看到员工数据数组和待实现的渲染函数：

```js
// 员工对象数组 —— 每个 {} 是一个员工，用 .属性名 访问字段
const employees = [
  { name: '张伟', department: '技术部', position: '前端工程师', email: 'zhangwei@example.com' },
  { name: '李娜', department: '设计部', position: 'UI 设计师', email: 'lina@example.com' },
  { name: '王磊', department: '技术部', position: '后端工程师', email: 'wanglei@example.com' },
  { name: '陈静', department: '市场部', position: '市场经理', email: 'chenjing@example.com' }
];

// TODO: 用 forEach 遍历数组，为每个员工创建一张卡片
function renderCards(dataList) {
  const gallery = document.querySelector('#gallery');
  gallery.innerHTML = '';

  // 你的代码写在这里——
  // 遍历 dataList，为每个员工创建 .card 的 div
  // 包含名字首字头像、姓名、部门、职位、邮箱
}

// 页面加载时渲染
renderCards(employees);
```

切换到**预览区**，你会看到页面是空的——因为 `renderCards()` 函数还没有实现。这就是本节的核心任务：用对象 + 循环把数据变成卡片。
:::

:::task{title="动手试试 ✨"}
::::step{purpose="对象数组是实际开发中最常见的数据结构——每一条记录都是一个对象，所有记录组成数组。新增一条数据就像给 Excel 表增加一行，属性的键名就是列标题。`renderCards()` 函数自动处理新增数据——你只需关注数据本身。" expected="页面显示 5 张员工卡片（原有 4 张 + 新增的赵敏），每张卡片包含名字首字头像、姓名、部门、职位和邮箱。新增员工自动出现在卡片列表中。"}

打开 `script.js`，先读一遍整个文件（用 `fs.readFileSync` 或在编辑器中打开）。理解 `employees` 数组的结构和 `renderCards()` 函数的签名。

**第 1 步：在 `employees` 数组中新增一位员工：**
```js
const employees = [
  { name: '张伟', department: '技术部', position: '前端工程师', email: 'zhangwei@example.com' },
  { name: '李娜', department: '设计部', position: 'UI 设计师', email: 'lina@example.com' },
  { name: '王磊', department: '技术部', position: '后端工程师', email: 'wanglei@example.com' },
  { name: '陈静', department: '市场部', position: '市场经理', email: 'chenjing@example.com' },
  { name: '赵敏', department: '人事部', position: 'HR 主管', email: 'zhaomin@example.com' }  // ← 新增
];
```

**第 2 步：在 `renderCards()` 函数中补全 forEach 循环逻辑：**
```js
function renderCards(dataList) {
  const gallery = document.querySelector('#gallery');
  gallery.innerHTML = '';

  dataList.forEach(function(emp) {          // emp 是当前员工对象
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      <div class="avatar">${emp.name[0]}</div>       <!-- 取名字的第一个字做头像 -->
      <h2>${emp.name}</h2>                            <!-- 点号访问 name 属性 -->
      <p><span class="label">部门</span> ${emp.department}</p>
      <p><span class="label">职位</span> ${emp.position}</p>
      <p><span class="label">邮箱</span> ${emp.email}</p>
      <div class="role-badge">${emp.position}</div>
    `;
    gallery.appendChild(card);
  });
}
```

3. 保存文件（`fs.writeFileSync`），刷新预览区。
4. 确认 5 张卡片都出现了——包括赵敏的卡片。

**关键理解：** `emp.name` 中的 `.name` 对应对象里的 `name` 键。你在模板中每写一个 `${emp.xxx}`，就是在访问对象的一个属性。整个卡片的数据全部来自对象——数据是源头，HTML 是最终呈现。
::::

::::step{purpose="对象扩展属性非常灵活——随时可以加新字段而不影响已有数据。就像在档案卡上多印一行「电话」，所有卡片同步更新。但要注意：卡片模板也要同步修改才能显示新字段。" expected="每张卡片都多出一行电话号码信息，格式和位置统一。你体验了「改模板结构 + 补全数据」的完整流程。"}

给每个员工对象增加 `phone` 属性，并在卡片模板中显示。

1. 给 `employees` 中每个对象增加 `phone` 属性：
```js
{ name: '张伟', department: '技术部', position: '前端工程师', email: 'zhangwei@example.com', phone: '13800001111' },
```

2. 在 `renderCards()` 的卡片 HTML 模板中添加一行：
```js
<p><span class="label">电话</span> ${emp.phone}</p>
```

3. 保存文件，刷新预览区——每张卡片都多出了电话号码。

**关键理解：** 模板里写 `${emp.phone}`，运行时 JavaScript 会去对象上找 `phone` 属性。如果对象上**没有**这个属性，就显示 `undefined`——不会报错，但页面上会显示 "undefined" 字样。所以加了模板字段后，一定要给所有对象都补上对应的属性值。
::::

::::step{purpose="对象属性的修改和变量赋值一样简单——`emp.department = '新部门'` 即可。数据驱动渲染的核心思想是：数据变了，视图自动跟着变。这是所有前端框架（Vue、React）的底层原理。" expected="被修改的员工卡片上部门标签变成了新值，其他员工的卡片不受影响。对象之间的独立性让你可以精确修改任何一条记录。"}

修改某个员工的属性值。

1. 打开 `script.js`
2. 找到张伟的数据行，把 `department` 从 `'技术部'` 改为 `'研发中心'`：
```js
{ name: '张伟', department: '研发中心', position: '前端工程师', email: 'zhangwei@example.com' },
```

3. 或者把李娜的 `position` 从 `'UI 设计师'` 改为 `'高级 UI 设计师'`。

4. 保存文件，刷新预览区——观察对应卡片的变化。只有被修改的那张卡片内容变了，其他卡片完全不受影响。

**关键理解：** 每个对象是独立的——改张伟的部门不会影响李娜。这是因为每个 `{}` 在内存中都是一块独立的空间。
::::

::::step{purpose="对象属性 + `.filter()` 的组合是数据管理中最强大的模式。通过 `emp.department === '技术部'` 做精确匹配，筛选出特定部门的员工。这就像从通讯录中调出所有在北京的联系人——数据筛选 + DOM 渲染一气呵成。" expected="只有技术部的员工（张伟、王磊）显示在页面上，其他部门的员工被过滤掉了。"}

挑战：使用 `.filter()` 方法只显示「技术部」的员工。

修改 `renderCards(employees)` 调用，先用 `.filter()` 筛选再传入：

```js
// 原来的调用：
renderCards(employees);

// 改为：先筛选，再渲染
const techEmployees = employees.filter(function(emp) {
  return emp.department === '技术部';
});
renderCards(techEmployees);
```

刷新预览区——只有张伟和王磊（技术部）的卡片显示出来。

再把条件改成 `'设计部'`：
```js
return emp.department === '设计部';
```
刷新后只看到李娜的卡片。

**关键理解：** `renderCards()` 函数接收一个数组作为参数——它不关心数组是怎么来的。你可以传入完整的 `employees`，也可以传入筛选后的子集。**数据操作和渲染逻辑各司其职，互不干扰。**
::::

:::

:::recap
这一节你学会了用对象存储结构化数据——用 `{}` 创建，里面是键值对（如 `name: "张三"`），用 `.name` 取值，用 `obj["name"]` 做动态访问。

**核心要点：**
- **为什么需要对象：** 16 个散落变量 vs 1 个对象数组——把相关属性打包在一起
- **数组 + 对象 = 90% 的真实数据结构：** 每一行是数组的一项（一个对象），每一列是对象的一个属性
- 点号 `obj.name` 用于已知属性名，方括号 `obj[key]` 用于动态属性名
- 访问不存在的属性返回 `undefined`（静默失败），注意检查属性名大小写
- **数据 + 循环 + DOM = 动态页面**：对象数组 → forEach → 拼接 HTML → 插入页面
- `.filter()` 配合对象属性做数据筛选再渲染，是最常用的数据处理模式

**你手中的工具链已经完整了：** 数组存列表，对象存属性，循环做遍历，DOM 做渲染。下一节你将学习**定时器**——让代码按时间节奏自动运行，实现倒计时、轮播图和自动刷新。
:::

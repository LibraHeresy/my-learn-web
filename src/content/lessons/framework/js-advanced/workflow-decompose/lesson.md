# 拆分函数 — 把大段代码分成清晰的段落

:::analogy
一本书如果从头到尾不分章节，读者会崩溃。代码也一样--一个 60 行的函数就像一本不分章的书，没人愿意读，也没人改得动。
:::

:::prerequisite
**本节你需要知道这些词：**

- `function` 声明函数 -- 创建可重复调用的代码块
- 参数（parameter）-- 函数定义时的占位变量，调用时传入实际值
- `return` -- 函数返回一个值给调用者
- 数组的 `filter()` 方法 -- 筛选出满足条件的元素，返回新数组
:::

:::explain{title="先看问题：一个函数做了太多事"}

以下是一个设备管理页面的真实代码（所有逻辑塞在一个函数里）：

```js
function setupPage() {
  // 第1部分：获取数据 -- 10 行
  let products = [
    { name: "智能音箱", category: "电子" },
    { name: "台灯", category: "家居" },
    { name: "无线耳机", category: "电子" },
    { name: "咖啡桌", category: "家居" },
    { name: "笔记本支架", category: "电子" }
  ];

  // 第2部分：渲染卡片 -- 12 行
  let container = document.querySelector("#productList");
  container.innerHTML = "";
  for (let i = 0; i < products.length; i++) {
    let card = document.createElement("div");
    card.className = "product-card";
    card.innerHTML = "<h3>" + products[i].name + "</h3>";
    container.appendChild(card);
  }

  // 第3部分：统计数量 -- 5 行
  let total = products.length;
  document.querySelector("#stats").textContent = "共 " + total + " 个产品";

  // 第4部分：筛选按钮 -- 15 行
  document.querySelector("#filterAll").addEventListener("click", function() {
    container.innerHTML = "";
    for (let i = 0; i < products.length; i++) {
      let card = document.createElement("div");
      card.className = "product-card";
      card.innerHTML = "<h3>" + products[i].name + "</h3>";
      container.appendChild(card);
    }
    document.querySelector("#stats").textContent = "共 " + products.length + " 个产品";
  });
  document.querySelector("#filterElectronics").addEventListener("click", function() {
    container.innerHTML = "";
    for (let i = 0; i < products.length; i++) {
      if (products[i].category === "电子") {
        let card = document.createElement("div");
        card.className = "product-card";
        card.innerHTML = "<h3>" + products[i].name + "</h3>";
        container.appendChild(card);
      }
    }
    let filteredCount = products.filter(function(p) { return p.category === "电子"; }).length;
    document.querySelector("#stats").textContent = "共 " + filteredCount + " 个产品";
  });
  // 还有第三个按钮...又是 15 行复制粘贴
}
```

这段代码的问题：

1. **渲染卡片的逻辑重复了 3 次**--每次稍微改一点，修改时必须 3 个地方同步改
2. **统计数量的逻辑重复了 3 次**
3. **想单独测试"渲染"功能？** 做不到，它和筛选、统计死死绑在一起
4. **出 bug 了怎么办？** 只能从头到尾读 60 行代码，猜哪一步出了问题

**这个函数触发了三个"该拆了"的信号：**
- 信号 1：代码块有明显的分区注释（`// 第1部分`、`// 第2部分`...）
- 信号 2：复制粘贴出现（渲染卡片的循环贴了三遍）
- 信号 3：函数超过 20 行（它 60 行）

:::

:::explain{title="解决方案：按职责拆成小函数"}

每个函数只做一件事，函数名准确描述这件事。

```js
// 数据：唯一来源
let products = [
  { name: "智能音箱", category: "电子" },
  { name: "台灯", category: "家居" },
  { name: "无线耳机", category: "电子" },
  { name: "咖啡桌", category: "家居" },
  { name: "笔记本支架", category: "电子" }
];

// 函数1：只负责渲染 -- 接收数据数组，渲染到页面
function renderProducts(list) {
  let container = document.querySelector("#productList");  // 获取容器
  container.innerHTML = "";                                 // 先清空旧内容
  for (let i = 0; i < list.length; i++) {                   // 遍历数据
    let card = document.createElement("div");               // 创建卡片 div
    card.className = "product-card";                        // 设置类名
    card.innerHTML = "<h3>" + list[i].name + "</h3>";       // 填充内容
    container.appendChild(card);                            // 挂到页面上
  }
}

// 函数2：只负责统计 -- 接收数量，更新显示
function updateCount(count) {
  document.querySelector("#stats").textContent = "共 " + count + " 个产品";
}

// 函数3：只负责筛选 -- 接收分类，返回筛选后的数组
function filterByCategory(category) {
  if (category === "all") {
    return products;  // "全部"直接返回原数组
  }
  return products.filter(function(p) {
    return p.category === category;  // filter 返回匹配的元素组成新数组
  });
}

// 函数4：绑定筛选按钮事件 -- 点击按钮 -> 筛选 -> 渲染 -> 更新统计
function bindFilterButtons() {
  // "全部"按钮：筛选全部 -> 渲染全部 -> 更新总计数
  document.querySelector("#filterAll").addEventListener("click", function() {
    let filtered = filterByCategory("all");   // 1. 筛选数据
    renderProducts(filtered);                  // 2. 渲染到页面
    updateCount(filtered.length);              // 3. 更新统计
  });

  // "电子"按钮：同理，筛选 electronics
  document.querySelector("#filterElectronics").addEventListener("click", function() {
    let filtered = filterByCategory("电子");  // 1. 筛选数据
    renderProducts(filtered);                  // 2. 渲染到页面
    updateCount(filtered.length);              // 3. 更新统计
  });
  
  // "家居"按钮：同理
  document.querySelector("#filterHome").addEventListener("click", function() {
    let filtered = filterByCategory("家居");
    renderProducts(filtered);
    updateCount(filtered.length);
  });
}

// 入口函数：只负责调度 -- 按顺序"启动"各个模块
function initPage() {
  renderProducts(products);  // 初始渲染全部产品
  bindFilterButtons();       // 绑定按钮事件
  updateCount(products.length); // 显示初始统计
}

// 启动页面
initPage();
```

**拆分后的威力：**
- `renderProducts` 可以在任何地方复用：初始渲染用 `renderProducts(products)`，筛选后用 `renderProducts(filtered)`，都是同一段代码
- 想单独测试"渲染"是否正确？只调用 `renderProducts(testData)` 就行
- 新增一个"筛选服装"按钮？3 行代码：筛选、渲染、统计
- 发现渲染有 bug？只有 `renderProducts` 一个地方要改，筛选、统计完全不受影响

:::

:::explain{title="常见错误"}

**错误 1：拆分后函数之间靠全局变量通信**

```js
// ❌ 错误：renderProducts 不接收参数，直接读全局变量
// 这样"筛选后重新渲染"就做不到了--它永远渲染全局的 products
function renderProducts() {
  for (let i = 0; i < products.length; i++) {  // 用全局 products
    // ...
  }
}
```

```js
// ✅ 正确：函数接收参数，调用者决定传入什么数据
function renderProducts(list) {       // list 是参数
  for (let i = 0; i < list.length; i++) {  // 用传入的 list
    // ...
  }
}
// 可以渲染全部：
renderProducts(products);
// 也可以渲染筛选后的：
renderProducts(filteredProducts);
```

**错误 2：拆得太碎，函数名和代码一样长**

```js
// ❌ 错误：过度拆分，每行一个函数，反而更难读
function addOneToCount(count) {
  return count + 1;
}
// 调用：count = addOneToCount(count);  比直接写 count++ 还长！
```

```js
// ✅ 正确：一行代码不值得单独成函数
count++;  // 直接写，清晰明了
```

**错误 3：拆分后函数名不准确**

```js
// ❌ 错误：名字叫"渲染"，但还偷偷做了统计
function renderProducts(list) {
  // ...渲染...
  updateCount(list.length);  // 未经调用者允许更新了统计！
}
```

```js
// ✅ 正确：只做函数名说的事。统计由调用者决定要不要做
function renderProducts(list) {
  // ...只渲染，不管别的...
}
```

:::

:::explain{title="实际工作中你会用这个来..."}

- **Code Review 时**：看到一个函数超过 20 行，你会在评论里写"考虑把渲染和事件绑定拆开"，这是代码审查最常见的要求之一。
- **修复一个紧急 bug**：线上用户说"筛选功能坏了"，你打开 `bindFilterButtons` 函数，15 行代码，5 分钟内找到问题。如果它还是 60 行的 `setupPage`，你可能要翻 10 分钟。
- **给新人交接代码**：你只需要说"渲染逻辑在 `renderProducts`，筛选在 `bindFilterButtons`"，新人不用读 60 行代码。

:::

:::task{title="动手试试"}

打开 `script.js`，里面有一个 60 行的 `setupPage()` 函数。你的任务是把它拆成多个小函数。

::::step{purpose="把渲染逻辑独立出来，接收数据数组作为参数。这样任何地方需要渲染时只需一行调用。" expected="renderProducts(products) 调用后，页面显示 5 个产品的卡片，与拆分前完全一致。"}
提取 `renderProducts(list)` 函数：接收数组参数，遍历数组创建卡片 HTML 并渲染到 `#productList`。在 `initPage` 中调用它。
::::

::::step{purpose="统计逻辑独立后，任何地方需要更新计数只需一行调用。这就是函数复用的威力。" expected="底部显示'共 5 个产品'。"}
提取 `updateCount(n)` 函数：接收数字参数，更新 `#stats` 的文字为"共 n 个产品"。
::::

::::step{purpose="事件绑定和业务逻辑分开后，每个函数职责单一，出 bug 时定位飞快。" expected="点击筛选按钮，页面内容筛选为对应分类，统计数字同步更新。"}
提取 `bindFilterButtons()` 函数：给三个筛选按钮（全部/电子/家居）绑定事件。每个事件回调中：筛选数组 -> 调用 renderProducts -> 调用 updateCount。
::::

::::step{purpose="initPage 是入口函数--不处理细节，只调度各模块按顺序启动。这是标准的页面初始化写法。" expected="调用 initPage() 后页面完整呈现，功能与拆分前完全一致，但代码结构清晰了 10 倍。"}
写出 `initPage()` 函数：只负责依次调用 renderProducts、bindFilterButtons、updateCount。最后调用 initPage() 启动页面。
::::

:::

:::recap
一个函数只做一件事。超过 20 行、出现复制粘贴、有分区注释--这三个信号告诉你该拆了。拆完后每个函数接收参数、返回结果，不依赖全局变量。拆分让代码更好读、更好改、更好复用。
:::

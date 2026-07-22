# 数据驱动思维 — 改数据就是改页面

:::analogy
开车看仪表盘，仪表盘上的数字变了你就知道车速变了。你不需要去转动车轮--你只控制油门（改数据），仪表盘自动跟上（页面自动更新）。数据驱动就是这个道理：你只改数据，页面自动反映。
:::

:::prerequisite
**本节你需要知道这些词：**

- 数组的 `push()` 方法 -- 向数组末尾添加一个元素
- `forEach()` -- 遍历数组的每个元素
- `createElement` + `appendChild` -- 动态创建并挂载 DOM 元素
- 函数参数 -- 函数接收的输入值
:::

:::explain{title="先看问题：命令式 DOM 操作的混乱"}

先看一段大家熟悉的写法--"命令式"（Imperative），直接告诉 DOM 每一步做什么：

```js
// 命令式：直接操作 DOM，数据和页面混在一起

// 添加一项：你必须手动操作 DOM 的每个细节
function addItem(name) {
  let card = document.createElement("div");     // 1. 创建 div
  card.className = "product-card";              // 2. 设置类名
  let title = document.createElement("h3");     // 3. 创建 h3
  title.textContent = name;                     // 4. 设置文字
  card.appendChild(title);                      // 5. 组装
  document.querySelector("#list").appendChild(card); // 6. 挂到页面
}

// 删除一项：你必须知道元素在哪，然后调用 remove
function deleteItem(index) {
  let card = document.querySelector("#list").children[index]; // 通过索引找元素
  if (card) {
    card.remove();  // 从 DOM 中删除
  }
}

// 修改一项：你必须找到元素并手动改内容
function updateItem(index, newName) {
  let card = document.querySelector("#list").children[index];  // 找到卡片
  if (card) {
    card.querySelector("h3").textContent = newName;  // 修改标题
  }
}

// 获取总数：你必须去 DOM 里数
function getCount() {
  let count = document.querySelector("#list").children.length;  // 数 DOM 元素
  return count;
}
```

这种写法在小项目里还行，但当你的程序越来越复杂时，问题就来了：

- **"数据在哪"和"DOM 在哪"是两套不同的系统**，你需要同时记住两套状态
- **想找到"当前有哪些产品"？** 你得去 DOM 里翻 `#list` 的子元素，而不是直接查一个数组
- **想批量修改？** 比如把所有产品名转大写，你得遍历 DOM、逐个改--并祈祷 DOM 结构和你的预期一致
- **调试时**：你不知道是"数据错了"还是"DOM 渲染错了"，因为数据和 DOM 是分开的

:::

:::explain{title="解决方案：数据驱动 -- 数据是唯一真相来源"}

数据驱动（Data-Driven）的核心思想就一句话：**数据是唯一的真相来源，页面只是数据的投影。** 你只修改数据，然后调用一次渲染函数，页面自动跟上。

```js
// 数据驱动：数据是唯一真相来源

// 第一步：定义数据（纯 JS 数组，和 DOM 无关）
let products = [
  { name: "智能音箱" },
  { name: "无线耳机" },
  { name: "机械键盘" }
];

// 第二步：写一个渲染函数 -- 把数据"翻译"成页面
function render(list) {
  let container = document.querySelector("#productList");
  container.innerHTML = "";  // 先清空旧的 DOM
  
  // 根据数据重新生成全部 DOM
  for (let i = 0; i < list.length; i++) {
    let card = document.createElement("div");
    card.className = "product-card";
    
    let title = document.createElement("h3");
    title.textContent = list[i].name;
    
    card.appendChild(title);
    container.appendChild(card);
  }
  
  // 渲染时顺便更新统计--因为数据和 DOM 严格同步
  document.querySelector("#count").textContent = "共 " + list.length + " 个产品";
}

// 第三步：初始渲染
render(products);

// ---- 从此以后，你只操作数据，然后调 render() ----

// 添加：只改数据
document.querySelector("#addBtn").addEventListener("click", function() {
  let name = document.querySelector("#input").value;
  products.push({ name: name });  // 1. 改数据（唯一操作！）
  render(products);                // 2. 重新渲染（页面自动跟上）
  document.querySelector("#input").value = "";  // 3. 清空输入框
});

// 删除：只改数据
document.querySelector("#clearBtn").addEventListener("click", function() {
  products = [];       // 1. 改数据：清空数组
  render(products);    // 2. 重新渲染（页面自动清空）
});

// 排序：只改数据
document.querySelector("#sortBtn").addEventListener("click", function() {
  products.sort(function(a, b) {
    return a.name.localeCompare(b.name);  // 按名称字母排序
  });
  render(products);    // 重新渲染，页面自动排好序
});
```

对比一下两种方式：

| 操作 | 命令式（旧） | 数据驱动（新） |
|------|------------|--------------|
| 添加 | 创建元素、设置属性、挂载 | push 到数组、调 render |
| 删除 | 找到元素、remove | 从数组删除、调 render |
| 修改 | 找到元素、改内容 | 改数组元素、调 render |
| 获取总数 | 去 DOM 里数元素 | `products.length` |
| 排序 | 移动 DOM 元素 | 对数组排序、调 render |

**数据驱动的核心流程：**

```
用户操作（点击按钮） -> 修改数据（products.push） -> 调用 render(products) -> 页面更新
```

:::

:::explain{title="这是 Vue/React 的底层原理"}

你也许听说过 Vue、React 这些前端框架。它们的核心思想就是**数据驱动视图**。

在纯 JS 中，你需要手动调用 `render()` 来更新页面。框架做的事情就是：**自动检测数据变化，自动调用 render**。

```js
// 纯 JS：手动调 render
products.push({ name: "新产品" });
render(products);  // 你必须手动调用

// Vue/React：自动检测 + 自动渲染
// this.products.push({ name: "新产品" });
// 框架自动检测到数组变了，自动重新渲染，你不需要写 render()
```

当你理解了这个"数据变了 -> 页面自动跟"的模式，以后再学 Vue/React，你会发现它们做的事情一模一样--只是把手动调 `render()` 变成了自动。**你现在就在用最原始的方式，实践所有前端框架的核心思想。**

:::

:::explain{title="常见错误"}

**错误 1：一边改数据一边手动改 DOM**

```js
// ❌ 错误：push 后又手动操作了 DOM，数据和 DOM 不同步了
function addItem(name) {
  products.push({ name: name });     // 改了数据
  render(products);                   // 调了 render
  // 然后你又手动改 DOM... 为什么？render 已经帮你做好了！
  let lastCard = document.querySelector("#list").lastChild;
  lastCard.classList.add("new");     // 多余的 DOM 操作
}
```

```js
// ✅ 正确：如果要在新卡片上加特殊样式，应该在数据里标记，让 render 处理
function addItem(name) {
  products.push({ name: name, isNew: true });  // 数据里标记"新"
  render(products);  // render 看到 isNew 会自动加样式
}
```

**错误 2：改了数据但忘记调 render**

```js
// ❌ 错误：改了数据但没调 render，页面看起来没变化
products.push({ name: "新产品" });  // 数据确实变了
// 忘记调 render(products) -- 页面还显示旧数据！
```

```js
// ✅ 正确：任何数据修改后都要调 render
products.push({ name: "新产品" });
render(products);  // 页面跟上
```

**错误 3：render 函数里直接操作页面，但不在数据里反映**

```js
// ❌ 错误：在 render 里创建了元素但没有对应的数据条目
function render(list) {
  // ...遍历 list 渲染...
  // 额外手动加了一个 footer -- 但数据里没有它！
  let footer = document.createElement("p");
  footer.textContent = "共" + list.length + "条";
  container.appendChild(footer);
  // 下次 render 调用时这个 footer 被清空，然后又重建...浪费
}
```

:::

:::explain{title="实际工作中你会用这个来..."}

- **任何列表类页面**：搜索结果、商品列表、消息列表--数据变了就调 render，不需要手动操作 DOM。
- **状态切换**：用户登录/退出、筛选激活/取消、模态框开/关。不要手动 show/hide DOM--改变一个 `isLoggedIn` 变量，让 render 决定显示什么。
- **为 Vue/React 铺路**：当你在纯 JS 里习惯了"改数据 -> 调 render"的节奏，切换到 Vue/React 时你会觉得格外熟悉--它们只是把这个流程自动化了。

:::

:::task{title="动手试试"}

打开 `script.js`，里面用命令式直接操作 DOM。你的任务是改为数据驱动模式。

::::step{purpose="render() 是数据驱动模式的核心--它把数据翻译成页面。数据一变，调 render 页面就跟上。" expected="调用 render(products) 后，页面内容与 products 数组完全同步。"}
定义一个 `products` 数组存储数据，写一个 `render(list)` 函数：接收数组参数，清空容器后根据数组重新生成全部 DOM。页面加载时调用 render(products) 初始化。
::::

::::step{purpose="数据驱动让你摆脱手动操作 DOM 的思维。你只关心数据，render 函数自动处理页面。" expected="输入名称点击添加后，列表自动展示新项目，代码中没有直接操作 DOM 的 createElement。"}
"添加"按钮改为：从输入框获取名称，push 到 products 数组，然后调用 render(products)。不再手动创建元素和挂载。
::::

::::step{purpose="清空操作只需把数组设为空再调 render。所有增删改查统一为'改数据 + 调 render'模式。" expected="清空按钮点击后列表为空并显示计数 0；清空后添加功能依然正常。"}
"清空"按钮改为：把 products 设为空数组 `[]`，然后调用 render(products)。同时 render 函数内更新计数显示。
::::

:::

:::recap
数据驱动：数据是唯一的真相来源，页面只是数据的投影。操作流程：修改数据 -> 调用 render() -> 页面自动更新。命令式直接操作 DOM 容易混乱，数据驱动让增删改查统一为一种模式。这就是 Vue 和 React 等所有现代前端框架的底层思想。
:::

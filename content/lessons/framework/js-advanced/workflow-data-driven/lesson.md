# 数据驱动思维 — 改数据就是改页面

::music-analogy
总谱是"数据"，演奏是"渲染"。指挥在总谱上改一个音符，所有乐手下一遍就按新谱子演奏——不需要每个人单独通知。这就是**数据驱动**：你只需要修改数据，然后调用一次渲染函数，页面自动跟上。
::

::explain{title="两种操作 DOM 的思维方式"}
你在前面几节课中接触过两种操作页面的方式：
**方式一：命令式（Imperative）—— 直接告诉 DOM "做什么"**
```js
// 添加一项：创建元素、设置内容、挂载到页面
let card = document.createElement("div");
card.textContent = "肖邦夜曲";
listEl.appendChild(card);
// 删除一项：找到元素、调用 remove()
document.querySelector("#card-3").remove();
// 修改一项：找到元素、修改内容
document.querySelector("#card-2 h3").textContent = "新曲名";
```
每一步都要精确操作 DOM。简单直接，但程序复杂时很容易混乱——你需要同时记住"数据在哪"和"DOM 在哪"。
**方式二：声明式（Declarative）—— 告诉程序 "我想要什么"，然后调用渲染函数**
```js
let pieces = [{ name: "肖邦夜曲" }, { name: "布兰登堡" }];
function render(list) {
  // 清空容器
  listEl.innerHTML = "";
  // 根据数据重新生成全部 DOM
  list.forEach(function(p) {
    let card = document.createElement("div");
    card.textContent = p.name;
    listEl.appendChild(card);
  });
}
render(pieces);  // 初始渲染
// 需要添加时：只修改数据，然后重新渲染
pieces.push({ name: "月光奏鸣曲" });
render(pieces);
// 删除、修改——全部一样：先改数据，再 render()
```
这就是**数据驱动**——数据是"唯一的真相来源"，页面只是数据的反映。
::

::explain{title="为什么框架都用这个模式？"}
Vue、React、Angular——所有现代前端框架的核心思想都是**数据驱动视图**。
```数据 (Data)  ──→  渲染函数 (Render)  ──→  页面 (DOM)
    ↑                                         │
    └────── 用户操作 (Events) ──────────────────┘
```
流程：
1. **数据变了** → 用户点击、输入、或定时器触发
2. **重新渲染** → 根据最新数据重新生成 DOM
3. **页面更新** → 用户看到新内容
框架帮我们做了"自动检测数据变化 + 高效更新 DOM"。但在纯 JS 中，你需要手动调用 `render()`。
理解了这个模式，以后学 Vue 时你会发现：它做的事情一模一样，只是把"手动调 render()"变成了**自动**——你改数据，它自动帮你重新渲染。
::

::task{title="动手试试 ✨"}
:::step{purpose="render() 是数据驱动模式的核心——它把\"数据\"翻译成\"页面\"。就像乐队根据总谱演奏音乐，改总谱上的一个音符（改数据），然后重新演奏一遍（调 render），听众听到的就是新版本。" expected="页面初始显示空列表或预设数据，render() 调用后页面内容与 pieces 数组完全同步。"}
把数据提取成一个 pieces 数组，写一个 render() 函数：每次调用时清空容器，重新根据 pieces 生成全部 DOM
:::

:::step{purpose="数据驱动让你摆脱\"先创建 div、再设置内容、再挂载\"的命令式思维。你只需要想\"我要加一条数据\"，render 函数自动帮你把 DOM 搞定。这就是后来所有前端框架的核心思想——数据是唯一的真相来源。" expected="输入曲名点击添加后，列表自动刷新展示新曲目，代码中没有任何 createElement 或 innerHTML 直接操作。"}
"添加"按钮改为：pieces.push(新曲目)，然后调用 render()——不再直接操作 DOM
:::

:::step{purpose="清空操作同样只需改数据——把数组设为空。对比命令式写法 listEl.innerHTML = \"\"，数据驱动让业务逻辑极简：改数据 → 调 render。理解了这一点，你以后学 Vue/React 时就会发现它们只是把\"手动调 render\"变成了自动。" expected="清空按钮点击后列表变为空，计数显示为 0；添加功能在清空后依然正常工作。"}
"清空"按钮改为：pieces = []，然后调用 render()；同时添加更新计数的逻辑
:::

::

::listen-to
菲利普·格拉斯《玻璃工厂》— 极简主义音乐的核心是"重复的动机在缓慢变化中演化"。每次迭代基于同样的模式（同一个渲染函数），但数据在变——就像渲染循环不断根据新数据刷新页面。
::


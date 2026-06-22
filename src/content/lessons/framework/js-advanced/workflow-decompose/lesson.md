# 拆分函数 — 把大段乐谱分成清晰的乐章

::music-analogy
一首 40 分钟的交响曲会分成几个乐章，每个乐章又有自己的主题和发展。如果全部堆在一起，演奏者和听众都会迷失。同样，**当你的函数超过 20 行，就该考虑拆分了**。每个函数只做一件事，就像每个乐章有一个主题。
::

::explain{title="为什么要把大函数拆小？"}
看看这个"做了一切"的函数：
```js
function handleEverything() {
  // 获取数据
  // 验证数据
  // 渲染页面
  // 绑定事件
  // 处理点击
  // 更新显示
  // 保存记录
  // …… 100 行代码
}
```
问题：
1. **难读懂** — 你需要从头到尾理解才能修改其中一步
2. **难调试** — 出错时不知道是哪一步的问题
3. **难复用** — 如果另一个地方也需要"渲染页面"，你没法单独调用
**好代码的样子：**
```js
function initPage() {
  let data = loadData();
  renderCards(data);
  bindEvents();
}
function loadData() { /* 只负责获取数据 */ }
function renderCards(list) { /* 只负责渲染 */ }
function bindEvents() { /* 只负责绑定事件 */ }
```
每个函数**只做一件事**，函数名准确描述它做什么。这就是"单一职责"——编程最重要的组织原则之一。
::

::explain{title="什么时候该拆分？"}
三个信号告诉你"该拆了"：
**信号 1：代码块有明确的注释分区**
如果你的代码里出现了 `// ===== 第一部分 =====` 这样的注释，说明这里应该是一个独立函数。函数名就是最好的"注释"。
**信号 2：你复制粘贴了一段代码**
如果你发现自己复制了某段代码只改了一两个地方——立刻把它提取成一个函数！这叫做 DRY 原则（Don't Repeat Yourself）。
**信号 3：函数超过 20 行**
这不是死规矩，但如果你写了一个超过 20 行的函数，问问自己：这个函数有没有在做两件事？如果函数名里出现了"和"字（"获取数据并渲染"），它就该拆成两个。
::

::example{title="拆分前 vs 拆分后"}
**拆分前（一个函数做三件事）：**
```js
function setupMusicPage() {
  // 渲染卡片 — 15 行
  let cardHTML = "";
  for (let i = 0; i < pieces.length; i++) {
    cardHTML += `<div class="card"><h3>${pieces[i].name}</h3></div>`;
  }
  gallery.innerHTML = cardHTML;
  // 绑定筛选 — 10 行
  filterBtn.addEventListener("click", function() {
    let filtered = pieces.filter(/* ... */);
    // 重新渲染...
  });
  // 显示统计 — 8 行
  let total = pieces.length;
  statsEl.textContent = "共 " + total + " 首曲目";
}
```
**拆分后（三个函数各司其职）：**
```js
function initPage() {
  renderCards(pieces);
  bindFilter();
  showStats(pieces);
}
function renderCards(list) { /* 只负责渲染 */ }
function bindFilter() { /* 只负责筛选逻辑 */ }
function showStats(list) { /* 只负责显示统计 */ }
```
现在你可以单独调用 `renderCards(filteredPieces)` 在筛选后重新渲染——这就是拆分的威力！
::

::task{title="动手试试 ✨"}
:::step{purpose="渲染函数接收参数是关键设计——筛选后可以调用 renderProgram(filtered) 直接刷新显示，而不是复制粘贴渲染代码。就像写一个可复用的旋律动机，在乐章不同段落变换乐器但仍用同一个主题。" expected="renderProgram(pieces) 调用后，页面显示 5 首曲目的卡片列表，与拆分前完全一致。"}
提取 renderProgram(list) 函数：接收数组参数，负责渲染卡片 HTML 到页面
:::

:::step{purpose="将统计逻辑独立出来，任何地方需要更新计数时只需一行 updateCount(n)。这就是函数复用的威力——改一处而全站更新，就像在总谱上改一个速度标记，所有声部的这个段落都受影响。" expected="底部显示\"共 5 首曲目\"，切换筛选后数字自动更新为筛选结果的数量。"}
提取 updateCount(n) 函数：接收数字参数，更新底部统计文字
:::

:::step{purpose="事件绑定和业务逻辑分开后，每个函数只做一件事。筛选按钮的逻辑变得极短：过滤数组 → 调用 renderProgram → 调用 updateCount，一目了然。这就是\"单一职责\"原则的实际应用。" expected="点击\"巴洛克\"显示 2 首巴洛克曲目，点击\"古典主义\"显示 3 首古典主义曲目，点击\"全部\"恢复显示 5 首。"}
提取 bindFilterButtons() 函数：给三个筛选按钮绑定事件，点击后调用 renderProgram(filtered) 和 updateCount
:::

:::step{purpose="initPage 像交响乐的序奏——不处理任何细节，只负责调度各声部在恰当的时机进入。这是项目启动层的标准写法：一个入口函数，清晰列出初始化步骤。" expected="initPage() 调用后页面完整呈现，与原来 setupPage() 效果完全一致，但代码结构清晰了 10 倍。"}
写出 initPage() 函数：只负责调用 renderProgram、bindFilterButtons、updateCount 三个函数来启动页面
:::

::

::listen-to
贝多芬《第五交响曲》— 四个乐章各有独立的性格和主题，但合在一起又是一个完整的作品。好的代码也是如此：每个函数独立清晰，合在一起完成复杂任务。
::


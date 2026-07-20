# 事件委托 -- 让父元素替你监听所有子元素

:::analogy
写字楼前台不会给每个员工配备一个专属快递员。快递统一送到前台，员工自己去取。事件委托就是这个道理--你在父容器上绑一个事件，所有子元素（包括后来入职的新员工）都能响应。
:::

:::prerequisite
**本节你需要知道这些词：**

- `addEventListener("click", callback)` -- 给元素绑定点击事件
- `event.target` -- 事件对象中指向实际被点击元素的属性
- `closest("选择器")` -- 从当前元素向上查找最近的匹配祖先元素
- 事件冒泡 -- 子元素被点击后，事件会一层层向上传递到父元素
:::

:::explain{title="先看问题：动态元素的事件丢失"}

上一节课你学会了用 createElement 在创建时绑定事件。但还有一种更常见的场景：**事件是统一绑定的，但新元素是后来才加的。**

```js
// 页面初始有 3 张卡片，逐张绑定点击事件
let cards = document.querySelectorAll(".card");
for (let i = 0; i < cards.length; i++) {
  cards[i].addEventListener("click", function() {
    alert("你点击了卡片！");
  });
}
// 此时 3 张卡片都能响应点击
```

然后用户点击了"添加"按钮，你动态添加了一张新卡片：

```js
let newCard = document.createElement("div");
newCard.className = "card";
newCard.textContent = "新卡片";
document.querySelector("#cardList").appendChild(newCard);

// ❌ 新卡片没有点击事件！
// 为什么？因为 addEventListener 在 newCard 被创建之前就执行完了
```

**这是前端开发中最常见的 bug 之一：动态添加的元素不会自动继承之前绑定的事件。**

你可能会想："那每次添加后，给新元素单独绑一次事件？" 可以，但你需要记住每一次添加都要绑，漏一次就出 bug。如果删除元素后重建呢？如果有多处添加逻辑呢？每次都绑，代码又臭又脆。

:::

:::explain{title="解决方案：事件委托 -- 把事件绑在父容器上"}

原理：当子元素被点击时，点击事件会**冒泡**--从被点击的子元素，一层一层向上传递到父元素、爷爷元素、直到 document。

所以你把事件绑在**父容器**上，不管子元素是何时加进来的，都会把事件冒泡上来。

```js
// 给父容器绑定事件 -- 只绑定一次！
let cardList = document.querySelector("#cardList");

cardList.addEventListener("click", function(event) {
  // event.target 是实际被点击的元素（可能是 div、h3、button、甚至文字节点）
  // closest(".card") 从它向上查找最近的 .card 容器
  let card = event.target.closest(".card");
  
  if (card) {
    // 找到了！说明用户点击了某张卡片（或其内部元素）
    card.classList.toggle("highlight");  // 切换高亮
  }
  // 如果 closest 返回 null，说明点击的不是卡片（可能是卡片之间的空隙），直接忽略
});

// 之后动态添加的卡片会自动响应！因为事件在父容器上
let newCard = document.createElement("div");
newCard.className = "card";
newCard.textContent = "新卡片";
cardList.appendChild(newCard);
// newCard 被点击时，事件冒泡到 cardList，触发上面的处理函数 -- 完美！
```

**事件委托的核心优势：**
- 一个事件监听器搞定所有子元素（初始的 + 动态的）
- 添加新元素不需要额外代码
- 删除元素不需要清理事件
- 性能更好（100 个元素只需要 1 个监听器，而不是 100 个）

:::

:::explain{title="关键技巧：closest() 和 matches()"}

**`event.target` -- 不一定是"卡片"，可能是卡片里的任何东西**

```html
<div class="card">
  <h3>曲目名称</h3>        <!-- 点这里，event.target = h3 -->
  <button class="like-btn">  <!-- 点这里，event.target = button -->
    喜欢                    <!-- 点这里，event.target = 文字节点 -->
  </button>
</div>
```

`event.target` 是你实际点到的那个最小元素。所以你不能直接判断 `event.target.className === "card"`--万一点到的是卡片里的 h3 或 button 呢？

**`closest("选择器")` -- 向上查找，总能找到卡片**

```js
// 无论点的是卡片的哪个角落，closest 都能找到 .card
let card = event.target.closest(".card");  // 向上遍历祖先，找到就返回
if (card) {
  // 安全：card 一定是 .card 元素
}
```

**区分不同按钮：用 data 属性**

如果你的卡片上有多个按钮（收藏、删除、编辑），在父容器事件里需要区分：

```html
<div class="card">
  <h3>曲目名称</h3>
  <button class="action-btn" data-action="like">收藏</button>    <!-- data-action 区分行为 -->
  <button class="action-btn" data-action="delete">删除</button>
</div>
```

```js
cardList.addEventListener("click", function(event) {
  // 判断点击的是不是操作按钮
  let btn = event.target.closest(".action-btn");
  if (!btn) return;  // 不是按钮，不管
  
  // 读取 data 属性来区分行为
  let action = btn.dataset.action;  // "like" 或 "delete"
  
  if (action === "like") {
    let card = btn.closest(".card");     // 从按钮向上找卡片
    card.classList.toggle("liked");      // 切换收藏状态
  } else if (action === "delete") {
    let card = btn.closest(".card");     // 从按钮向上找卡片
    card.remove();                       // 删除卡片
  }
});
```

:::

:::explain{title="常见错误"}

**错误 1：直接用 event.target 判断，忽略了内部元素**

```js
// ❌ 错误：点到了卡片里的 h3，event.target 是 h3
cardList.addEventListener("click", function(event) {
  if (event.target.classList.contains("card")) {
    // 如果点到 h3，event.target 是 h3，没有 .card 类，这个分支进不来
    event.target.classList.toggle("highlight");
  }
});
```

```js
// ✅ 正确：用 closest 向上查找
cardList.addEventListener("click", function(event) {
  let card = event.target.closest(".card");  // 总能找到 .card 容器
  if (card) {
    card.classList.toggle("highlight");      // 安全操作
  }
});
```

**错误 2：事件绑错了层级**

```js
// ❌ 错误：绑在 document 上也没错，但太宽了--页面任何地方点击都会触发
document.addEventListener("click", function(event) {
  let card = event.target.closest(".card");
  // 即使卡片在别的组件里也会触发，可能不是你想要的
});
```

```js
// ✅ 正确：绑在卡片的直接父容器上，范围最精确
let cardList = document.querySelector("#cardList");
cardList.addEventListener("click", function(event) {
  let card = event.target.closest(".card");
  // 只有 #cardList 里的卡片才会触发
});
```

**错误 3：事件的 event 参数忘了写**

```js
// ❌ 错误：回调函数没接收 event 参数
cardList.addEventListener("click", function() {
  let card = event.target.closest(".card");  // event 是 undefined，报错！
});
```

```js
// ✅ 正确：回调第一个参数就是事件对象
cardList.addEventListener("click", function(event) {  // 接收 event
  let card = event.target.closest(".card");           // 正常使用
});
```

:::

:::explain{title="实际工作中你会用这个来..."}

- **Todo 列表**：添加、删除、完成、编辑--所有操作都通过父容器事件委托处理。新添加的 todo 项自动获得所有交互能力。
- **表格操作**：每行都有"编辑""删除"按钮，点任何一行都能响应。如果手动逐行绑定，100 行就是 100 个事件监听器，用委托只需 1 个。
- **动态渲染的任何列表**：搜索结果、聊天列表、通知列表--内容随时增减，事件委托让你不用关心元素是什么时候加进来的。

:::

:::task{title="动手试试"}

打开 `script.js`，里面有一段"逐张绑定事件"的代码。你的任务是改为事件委托模式。

::::step{purpose="一个事件监听器覆盖所有卡片，无论初始还是动态添加。就像前台统一收发快递。" expected="#cardList 上只有一个 click 事件监听器，但所有 3 张初始卡片都能正常切换收藏状态。"}
移除所有通过 forEach 逐个绑定的事件，改为在 #cardList 父容器上绑定一个 click 事件。
::::

::::step{purpose="closest() 向上查找确保总能找到目标元素，无论用户点的是按钮的文字还是按钮本身。" expected="无论点击按钮的哪个位置（包括按钮内部文字），都能正确触发收藏逻辑。"}
在事件处理函数中用 `event.target.closest(".like-btn")` 判断单击是否来自收藏按钮。
::::

::::step{purpose="事件委托的最大优势：动态添加的元素零额外代码就能响应事件。" expected="新增的卡片点击收藏按钮后行为与初始卡片完全一致。"}
点击"添加随机条目"按钮添加新卡片，确认新卡片的收藏按钮能正常工作--不需要任何额外的事件绑定代码。
::::

:::

:::recap
事件委托：把事件绑定在父容器上而不是逐个绑到子元素。利用事件冒泡原理，子元素被点击时事件会向上传到父容器。用 event.target.closest() 找到实际被点击的元素。动态添加的子元素自动响应事件，零额外代码。
:::

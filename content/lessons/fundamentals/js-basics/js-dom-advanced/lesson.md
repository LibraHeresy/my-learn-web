# DOM 操作进阶 — 动态创建与删除元素

::music-analogy
DOM 操作进阶就像**即兴演奏**——不是在谱子写好的框架内规规矩矩地弹，而是在演奏过程中根据灵感动态创造新的乐句（元素），或者删除某个声部。`createElement` 是创作新乐句，`remove()` 是撤掉一个声部。
::

::explain{title="动态创建元素"}
createElement 动态创建 HTML 元素，appendChild 把它添加进页面，remove 移除元素。就像在演奏中临时增加一件乐器——全新的元素出现在页面上。
```js
// 创建元素
let card = document.createElement("div");
card.className = "card";         // 设类名
card.innerHTML = "<h2>新卡片</h2>";  // 设内容
// 追加到页面
document.querySelector("#list").appendChild(card);
```
::

::explain{title="删除与替换"}
`.remove()` 直接删除元素：
```js
let card = document.querySelector("#card3");
card.remove();  // 没了！
```配合 `createElement` 实现增删：
```js
function addCard(title) {
  let card = document.createElement("div");
  card.className = "card";
  card.textContent = title;
  document.querySelector("#list").appendChild(card);
}
function removeLast() {
  let cards = document.querySelectorAll(".card");
  let last = cards[cards.length - 1];
  if (last) last.remove();
}
```增删改查——完整的数据操作闭环！
::

::example{title="看例子"}
下面的代码有一个输入框和`添加`"删除最后"两个按钮，可以动态维护一张练琴计划列表：
```js
function addItem() {
  let item = document.createElement("div");
  item.className = "plan-item";
  item.textContent = input.value;
  list.appendChild(item);
  input.value = "";
}
function removeLast() {
  let items = document.querySelectorAll(".plan-item");
  let last = items[items.length - 1];
  if (last) last.remove();
}
```切换到预览区，输入内容点添加，再点删除试试——页面元素在动态变化！
::

::task{title="动手试试 ✨"}
:::step{purpose="`createElement` + `appendChild` 是动态添加元素的黄金组合——就像在演奏中临时加入一段即兴 solo。页面不再是一成不变的静态文档，而是活的数据容器。" expected="每次点击添加，列表底部就会多出一行练习内容。输入框清空后可以继续添加下一条。页面元素在动态变化——这就是「动态 DOM」的魔力。"}
在输入框输入练习内容（如「哈农练习曲 第1条」），点击「添加」，观察列表中出现新的练习项。连续添加多条，感受列表的动态增长
:::

:::step{purpose="`.remove()` 直接销毁元素——不留下任何痕迹。配合 `querySelectorAll` 获取所有练习项，取最后一个（`items[items.length - 1]`），实现了精确的「栈式」删除。增加 + 删除的组合让你拥有了完整的数据管理能力。" expected="每次点击删除，列表最后一项消失。列表可以为空（不会报错），也可以再添加回来。增删自如。"}
连续点击「删除最后」按钮，观察列表从末尾开始逐条缩短，直到完全为空。理解 `querySelectorAll` + `[length-1]` 索引 + `.remove()` 的删除逻辑
:::

:::step{purpose="在 `createElement` 时动态计算内容，让你的练习计划更像真实的应用。序号的自动递增体现了「创建时动态赋值」的思想——每次创建时根据当前状态决定元素的内容。" expected="每个练习项前面出现了序号（如「1. 哈农练习曲」「2. 音阶练习」），即使删除后重新添加，序号也会重新计算。"}
修改 `addItem` 函数的逻辑，让每个练习项前面带上序号。提示：在设置 `item.textContent` 时，先获取当前列表的项数（`querySelectorAll` 的 `.length`），然后拼接序号
:::

:::step{purpose="这挑战综合了 `createElement` + `appendChild` + 事件绑定 + `.remove()` 四项技能。在创建元素时就内嵌删除逻辑，就像在每个音符上标注「可删除」——这比全局的「删除最后」按钮更灵活，每一项都独立可控。" expected="每个练习项右侧都有一个删除按钮，点击后只删除该项，不影响其他项。你现在拥有了一个完整的 Todo 列表管理功能——可以任意添加和删除任一项。"}
挑战：给每个练习项加一个独立的「删除」按钮。在 `createElement` 时同时创建一个删除按钮子元素，给按钮绑定 click 事件，点击时调用 `item.remove()` 只删除它所属的那一项
:::

::

::listen-to
爵士即兴 — 爵士乐手在和声进行中实时创造旋律，有时加一段 solo（createElement），有时一个声部退出（remove），结构在即兴中动态变化。
::


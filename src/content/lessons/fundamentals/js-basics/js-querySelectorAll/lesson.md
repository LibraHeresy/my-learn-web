# 批量 DOM 操作 — 指挥整个声部

:::music-analogy
`querySelector` 指一个元素就像指挥指向**一位独奏者**，而 `querySelectorAll` 就像指挥同时对**整个弦乐声部**做统一手势——用一条指令同时操作一群元素。
:::

:::explain{title="选中一组元素"}
querySelectorAll 选中所有匹配选择器的元素，返回一个列表（NodeList）。可以用 forEach 遍历每个元素——就像指挥同时命令整个弦乐声部做同一个动作。
```js
let cards = document.querySelectorAll(".card");
```
NodeList 可以和数组一样用 `forEach` 遍历：
```js
cards.forEach(function(card) {
  card.style.border = "2px solid gold";
});
```
也支持索引：
```js
cards[0].style.background = "#FFFAF2";  // 第一张
cards[1].style.background = "#F0F8FF";  // 第二张
```
:::

:::explain{title="classList — 批量切换样式类"}
`classList` 比直接操作 `style` 更优雅，配合 CSS 类使用：
- `.classList.add("active")` — 添加类
- `.classList.remove("active")` — 移除类
- `.classList.toggle("active")` — 切换（有则删，无则加）
- `.classList.contains("active")` — 判断是否包含
```js
let cards = document.querySelectorAll(".card");
cards.forEach(function(card) {
  card.classList.add("highlighted");
});
```
然后 CSS 中定义 `.highlighted` 的样式即可——JS 负责逻辑，CSS 负责外观，各司其职。
:::

:::example{title="看例子"}
下面的代码有 5 张乐器卡片。三个按钮分别实现"全选高亮""取消高亮""切换 '弦乐' 类"：
```js
// 高亮全部
let cards = document.querySelectorAll(".card");
cards.forEach(function(card) {
  card.classList.add("highlighted");
});
// 只看弦乐
cards.forEach(function(card) {
  card.classList.toggle("hidden", !card.classList.contains("strings"));
});
```
切换到 JS 标签页查看完整代码，预览区点击按钮试试批量效果。
:::

:::task{title="动手试试 ✨"}
::::step{purpose="让你感受 `querySelectorAll` + `forEach` 组合的「批量操作」威力——一条指令作用于所有匹配元素。就像指挥一挥手，整个弦乐声部同时起弓。这比手动操作每个元素高效得多。" expected="点击高亮全部 → 5 张卡片同时变为金色边框+阴影（`.highlighted` 类生效）；点击取消 → 全部恢复原状。批量操作一气呵成。"}
点击「高亮全部」按钮，观察所有 5 张乐器卡片的边框和阴影同时亮起；再点击「取消高亮」，看它们同时恢复原状
::::

::::step{purpose="`classList` 是操作元素 CSS 类的标准方式——添加、移除、切换类名比直接改 style 更优雅，因为样式统一在 CSS 中管理。这也是 CSS 和 JS 各司其职的最佳实践：CSS 管外观，JS 管逻辑。" expected="点击「只看弦乐」→ 弦乐卡片清晰，管乐卡片变半透明（opacity: 0.15）；点击「显示全部」→ 所有卡片恢复。过滤效果通过 toggle 类名实现。"}
点击「只看弦乐」按钮，观察弦乐卡片保持清晰而管乐卡片变半透明；再点击「显示全部」恢复。理解 `classList.add/remove/toggle` 的用法
::::

::::step{purpose="让你理解 `classList.remove` 的灵活性——移除不同的类名就能实现不同的操作。同一个按钮，改一个字符串就从「显示全部」变成了「取消高亮」。代码逻辑完全一样，只是操作的类名不同。" expected="先高亮全部→再点击修改后的「显示全部」→所有高亮被取消。你发现这个按钮现在和「取消高亮」功能一样了——类名决定了操作的目标效果。"}
修改「显示全部」按钮的事件逻辑，把 `card.classList.remove("hidden")` 改成 `card.classList.remove("highlighted")`，看看点击后变化的是什么效果
::::

::::step{purpose="综合运用 querySelectorAll + forEach + classList.contains + classList.add——这四者结合就是前端批量操作的标准模式。从零开始实现「条件筛选 + 批量样式更新」，这是真实项目中最常用的技能。" expected="点击「高亮管乐」→ 只有小号和长笛两张管乐卡片高亮，弦乐卡片保持不变。你成功地基于元素特征进行了「选择性批量操作」。"}
挑战：新增一个「高亮管乐」按钮。在 HTML 中添加按钮，在 JS 中用 `querySelector` 获取，绑定 click 事件，遍历所有卡片，用 `card.classList.contains("winds")` 判断是否是管乐类，只给管乐卡片加 `.highlighted` 类
::::

:::

:::listen-to
斯特拉文斯基《春之祭》— 弦乐组全员同时奏响的强力和弦，一声令下全声部同步发力，就像 `querySelectorAll` 批量修改所有匹配元素的样式。
:::


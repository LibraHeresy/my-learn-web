# 点击事件 — 让按钮响应用户

::music-analogy
事件就像**乐器对演奏者的响应**——按下琴键（点击），琴槌敲击琴弦发出声音（执行代码）。没有演奏者的动作，乐器不会自己发出声音；没有事件，代码不会自动执行。
::

::explain{title="什么是事件？"}
在 JavaScript 中，**事件**是发生在 HTML 元素上的"事情"：
- `click` — 用户点击了一个元素
- `input` — 用户在输入框中输入了文字
- `mouseenter` — 鼠标移入了一个元素
用 `addEventListener` 可以"监听"这些事件：
```js
let btn = document.querySelector("#myBtn");
btn.addEventListener("click", function() {
  alert("你点击了按钮！");
});
```就像给按钮装了一只耳朵，它时刻听着有没有"点击"这件事发生。
::

::explain{title="事件处理函数"}
`addEventListener` 接收两个参数：
1. 事件类型（`"click"`）
2. 事件处理函数——事件发生时执行的代码
```js
btn.addEventListener("click", function() {
  // 点击后执行的代码写在这里
  document.querySelector("h1").textContent = "标题变了！";
});
```事件处理函数就像一个"回响"——你按下琴键（触发事件），琴声响起（执行函数）。
::

::example{title="看例子"}
下面的代码有一个按钮和一个显示区域。每次点击按钮，计数器就会加 1：
```js
let count = 0;
let btn = document.querySelector("#countBtn");
let display = document.querySelector("#display");
btn.addEventListener("click", function() {
  count = count + 1;
  display.textContent = `你点击了 ${count} 次`;
});
```切换到 JS 标签页和预览区，试试点击按钮！
::

::task{title="动手试试 ✨"}
:::step{purpose="让你直观感受事件驱动编程的核心模型：用户操作（点击）→ 事件触发 → 执行回调函数 → 更新页面。就像按下琴键 → 琴槌敲弦 → 发出声音——每一步都是对前一步的响应。" expected="每点击一次按钮，计数器增加 1，页面显示「你点击了 N 次」。这是你第一次写出「能和用户互动」的代码。"}
切换到预览区，反复点击「点我打拍子」按钮，观察计数器从 0 开始逐次增加，感受每一次点击带来的即时响应
:::

:::step{purpose="让你意识到事件回调函数里的代码和普通 JS 代码完全一样——你可以自由地修改其中的逻辑和显示。事件只是一个触发时机，被触发后执行的代码由你完全掌控。" expected="点击按钮后，页面显示的文字变成了你自定义的表达方式，但计数功能不受影响。你已经学会定制交互反馈了。"}
修改事件回调函数中 `display.textContent` 的显示文字，换一种表达方式。比如改成 `"节拍计数：第 " + count + " 拍"` 或使用模板字符串自定义
:::

:::step{purpose="让你理解核心逻辑的一行改动就能改变整个交互行为。这就是编程的魔力：一个数字的变化，整个节拍器的节奏就完全不一样了。大胆改，看看会发生什么。" expected="每次点击按钮，计数器跳 5 个数，页面显示「你点击了 5 次」→「你点击了 10 次」→「你点击了 15 次」……节奏明显加快。"}
把回调函数中的 `count = count + 1` 改成 `count = count + 5`，体验每次点击跳 5 拍的节奏感
:::

:::step{purpose="从零开始完整走一遍「HTML 加元素 → JS 获取元素 → 绑定事件 → 写回调逻辑」的全流程。这是前端开发中最常见的模式，掌握它就掌握了一大半交互开发的技能。" expected="点击归零按钮后，计数器回到 0，显示内容也同步更新（如「计数器已归零」）。你在一个页面上同时拥有了「增加」和「归零」两个交互功能，就像节拍器有了开始和停止两个按钮。"}
挑战：添加归零按钮。在 HTML 的 counter-box 容器中添加 `<button id="resetBtn">归零</button>`，在 JS 中用 `querySelector` 获取它，用 `addEventListener` 绑定点击事件，点击后将 `count` 重置为 0 并更新 `display.textContent`
:::

::

::listen-to
普罗科菲耶夫《彼得与狼》— 每个角色有特定主题，在故事的不同时间点"出场"（触发），就像页面中不同元素在不同事件触发时才响应。
::


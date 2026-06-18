# 更多事件 — 倾听用户的每一种动作

::music-analogy
乐器不只有"敲击"一个动作——钢琴有按键(click)、弦乐有揉弦(input)、管乐有换气(change)、定音鼓有滚奏(keydown)。`addEventListener` 可以监听用户的各种动作，就像指挥同时关注每个声部的进入。
::

::explain{title="不只是 click — 认识更多事件类型"}
除了 click 点击事件外，还有很多常用事件类型：input（输入框内容变化）、keydown（键盘按下）、mouseenter（鼠标移入）、mouseleave（鼠标移出）、submit（表单提交）。addEventListener 的第一个参数是事件类型，除了 `"click"`，还有很多常用事件：
- `"input"` — 输入框内容**每次变化**都触发
- `"change"` — 输入框内容改变且**失去焦点**时触发
- `"keydown"` — 键盘**按下**任意键
- `"mouseenter"` — 鼠标**进入**元素
- `"mouseleave"` — 鼠标**离开**元素
- `"submit"` — 表单**提交**时触发
```js
inputEl.addEventListener("input", function() {
  // 用户每输入一个字就执行
});
```
::

::explain{title="event 对象 — 事件携带的\"信息卡\""}
每个事件触发时，浏览器都会创建一个 **event 对象**，包含了事件的详细信息。在回调函数中通过参数接收：
```js
btn.addEventListener("click", function(event) {
  console.log(event.target);  // 被点击的元素
  console.log(event.type);    // "click"
});
inputEl.addEventListener("input", function(event) {
  console.log(event.target.value); // 输入框当前内容
});
document.addEventListener("keydown", function(event) {
  console.log(event.key); // 按下的键名，如 "Enter"、"a"
});
```
event.target` 是触发事件的元素——就像知道是哪个乐器在发声。
::

::explain{title="preventDefault — 阻止默认行为"}
有些元素有自己的默认行为：
- 表单的 `<button type="submit">` 点击后会**刷新页面**
- `<a>` 链接点击后会**跳转**
用 `event.preventDefault()` 阻止这些默认行为：
```js
form.addEventListener("submit", function(event) {
  event.preventDefault();  // 阻止页面刷新！
  console.log("表单已提交（但页面不刷新）");
});
```
这在前端开发中非常常用——表单提交通常用 JS 处理，不需要刷新页面。
::

::example{title="看例子"}
下面的代码综合使用多种事件：
```js
// 实时显示输入内容
inputEl.addEventListener("input", function(event) {
  displayEl.textContent = event.target.value;
});
// 鼠标悬停高亮
card.addEventListener("mouseenter", function() {
  card.style.borderColor = "#C9A96E";
});
card.addEventListener("mouseleave", function() {
  card.style.borderColor = "#D4C5A9";
});
// 回车键提交
document.addEventListener("keydown", function(event) {
  if (event.key === "Enter") {
    console.log("你按了回车！");
  }
});
```
::

::task{title="动手试试 ✨"}
:::step{purpose="让你体验 `input` 事件的「实时性」——每敲一个字符就触发一次。这不同于点击事件的一次性响应。`event.target.value` 是获取输入内容的「标准姿势」，后续所有输入交互都靠它。" expected="下方「你输入的是」后面的文字会随着你的打字实时变化，一个字不差地同步显示。松手时它已经显示了全部输入内容。"}
切换到预览区，在输入框中打字，观察下方「你输入的是」区域实时同步显示你敲的每一个字符
:::

:::step{purpose="让你感受 `mouseenter` 和 `mouseleave` 这对「成双成对」的事件。它们总是在一起使用——就像音乐的渐强和渐弱，一个进入，一个退出，形成完整的互动闭环。" expected="鼠标移入卡片时，边框变为金色（#C9A96E），背景也微微泛黄；鼠标移出后恢复原状。这种反馈让用户感觉自己真的在和页面「对话」。"}
把鼠标移到「鼠标悬停卡片」上再移开，观察边框颜色和背景色的变化——移入时变为金色边框，移出时恢复原状
:::

:::step{purpose="`keydown` 事件可以精确识别用户按下了哪个键——`event.key` 告诉你键名。配合 `if` 判断，不同键可以做不同的事：回车提交、Escape 取消、空格播放/暂停……这是构建快捷键系统的基础。" expected="按下任意键，底部提示会显示「你按下了: \"X\"」（X 为键名）。按下回车键则显示特殊提示「你按了回车键！」且颜色变为深红。"}
按键盘上的任意键，观察页面底部提示文字的实时变化。再试试按回车键（Enter），看是否显示特殊的回车提示信息
:::

:::step{purpose="综合运用 `keydown` 事件 + `event.key` 判断 + DOM 操作。学会根据特定按键执行特定操作，这是实现「键盘快捷键」的完整模式。" expected="在输入框中随便打些字，然后按 Escape 键——输入框清空，实时显示也变回「---」，底部提示框中显示清空提示。一个按键完成了清空操作。"}
挑战：给输入框增加 `keydown` 事件监听，当按 Escape 键时清空输入框内容和实时显示。提示：判断 `event.key === "Escape"`，然后设置 `inputEl.value = ""` 和 `liveText.textContent = "---"`
:::

::

::listen-to
拉威尔《波莱罗》— 同一旋律在不同乐器间传递（不同事件），小鼓从头到尾持续敲击（持续输入），长笛、单簧管、双簧管依次登场（依次触发），最终整个乐队一起爆发。
::


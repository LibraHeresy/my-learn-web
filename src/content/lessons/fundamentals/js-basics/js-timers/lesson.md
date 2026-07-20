# 定时器 — 让代码按时运行

:::analogy
setInterval 就像厨房计时器——设定每3分钟响一次，准时触发。setTimeout 像泡面的倒计时——等3分钟，然后做一件事。两者结合，你就能在页面上创造节奏和时序。
:::

:::explain{title="setInterval — 定时重复"}
setInterval 每隔指定时间重复执行（像闹钟每隔一段时间响一次），setTimeout 只执行一次（像设置定时提醒）。时间单位是毫秒，1000 毫秒 = 1 秒。clearInterval 用来停止定时器。
```js
// 每 1000 毫秒（1 秒）执行一次
let timer = setInterval(function() {
  count++;
  display.textContent = count;
  console.log("一秒过去了");
}, 1000);
// 停止
clearInterval(timer);
```
:::

:::explain{title="setTimeout — 延迟一次"}
`setTimeout` 等待指定时间后执行**一次**：
```js
// 3 秒后弹出提示
setTimeout(function() {
  alert("3 秒到了！");
}, 3000);
// 取消（在还没执行前）
let timer = setTimeout(fn, 5000);
clearTimeout(timer);  // 不执行了
```
就像微波炉的定时——等指定时间到了，然后进行下一步。
`setInterval` 适合：自动轮播、倒计时、自动计数器
`setTimeout` 适合：延迟提示、debounce、定时检查
:::

:::example{title="看例子"}
下面的代码实现了一个节拍器：点击"开始"按钮，计数器每秒 +1；点击"暂停"停止：
```js
let count = 0;
let timer = null;
function startMetronome() {
  if (timer) return;  // 防止重复启动
  timer = setInterval(function() {
    count++;
    display.textContent = `节拍 ${count}`;
  }, 1000);
}
function stopMetronome() {
  clearInterval(timer);
  timer = null;
}
```
切换到预览区，点击"开始节拍"看数字每秒递增。
:::

:::task{title="动手试试 ✨"}
::::step{purpose="让你感受 `setInterval` 的定时重复执行特性——不需要手动点击，代码自动按时间间隔运行。`clearInterval` 用来停止，`timer = null` 是良好的重置习惯。就像秒表有「开始」「暂停」「归零」三个基本操作。" expected="点击开始后数字每秒自动 +1；点击暂停后停止递增；点击重置后数字归零。三个按钮各司其职，互不冲突。"}
点击「开始节拍」按钮，观察数字每秒自动递增——从 1 到 2 到 3……再点击「暂停」，观察计时停止。然后点击「重置」，数字归零回到初始状态
::::

::::step{purpose="`setInterval` 的第二个参数是毫秒数，决定了执行频率。1000ms = 1秒 = 慢速，500ms = 0.5秒 = 快速。理解时间单位和执行频率的关系，让你能精确控制动画节奏。" expected="修改为 500ms 后数字变化速度翻倍；改为 200ms 后飞速递增。一个毫秒数的变化，整个节拍器的「性格」完全不同。"}
把 `setInterval` 的间隔时间从 `1000`（1秒，慢速）改成 `500`（0.5秒，快速），体验更快的节奏感。再试试改成 `200`（0.2秒，极快）
::::

::::step{purpose="`setTimeout` 是延迟执行一次，适合做「定时停止」「延迟提示」等操作。和 `setInterval` 配合使用，就像「执行 3 秒后自动停」——一个控制持续执行，一个控制延迟停止。" expected="点击开始后节拍自动递增，3 秒后自动停止（数字不再变化）。你不需要手动按暂停——`setTimeout` 帮你做了。"}
在「开始节拍」的回调函数中增加一个 `setTimeout`，设定 3 秒（3000ms）后自动调用 `clearInterval(timer)` 停止计时。实现「自动执行 3 秒后停止」的效果
::::

::::step{purpose="综合运用 `setInterval` + 取模运算符 `%` + DOM 样式修改。`count % 4` 循环返回 0,1,2,3,0,1,2,3……这正是「4 个一组循环」的数学本质。这是将数学运算符应用到实际交互的经典案例。" expected="节拍数字每 4 拍变换一次颜色，4 种颜色循环往复。你的节拍器不仅会数数，还会「变色」——像交通灯的红黄绿循环一样有了视觉节奏感。"}
挑战：让节拍每 4 拍换一个颜色。在 `setInterval` 的回调函数中用 `count % 4` 判断当前是第几拍，对应不同的颜色。创建一个颜色数组让 4 拍循环不同的颜色
::::

:::

:::recap
这一节你学会了用定时器控制代码的执行时间——`setInterval` 每隔一段时间重复执行（像闹钟每隔一段时间响一次），`setTimeout` 等待一段时间后执行一次（像泡面倒计时，等一会儿再继续）。用 `clearInterval` 可以停止定时器。时间单位是毫秒（1000ms = 1 秒）。现在你的页面可以自动运行了——计数器自动涨、轮播图自动切、定时器按时触发任务。
:::



# 循环 — 让代码反复执行的节拍器

::music-analogy
循环就像**固定音型（ostinato）**——一段模式反复执行，每次略有不同。也像**节拍器**，一拍一拍反复，直到乐曲结束。用 `for` 或 `forEach` 遍历数组中的每一项，对每一首都执行相同的操作。
::

::explain{title="for 循环"}
for 循环让代码重复执行指定次数——就像节拍器从第 1 拍数到最后 1 拍。循环由三部分组成：let i = 0（从哪里开始）、i < 数组.length（什么时候停）、i++（每轮 i 加 1）。
```js
for (let i = 0; i < composers.length; i++) {
  console.log(composers[i]);
}
```
::

::explain{title="forEach — 更优雅的循环"}
`forEach` 是专门为数组设计的循环方法：
```js
composers.forEach(function(name, index) {
  console.log(`${index + 1}. ${name}`);
});
```
- `name` — 当前项的值
- `index` — 当前项的索引（0 开始）
```js
// 用 forEach 批量生成 HTML
let html = "";
composers.forEach(function(composer) {
  html += `<li>${composer}</li>`;
});
document.querySelector("ul").innerHTML = html;
```
forEach` 比 `for` 更简洁——你不用手动写 `i` 和 `i++`。
::

::example{title="看例子"}
下面的代码用 `forEach` 遍历作曲家数组，把每一项渲染成 HTML 卡片：
```js
let composers = ["巴赫", "莫扎特", "贝多芬", "肖邦"];
let html = "";
composers.forEach(function(name, index) {
  html += `
    <div class="card">
      <span class="num">${index + 1}</span>
      ${name}
    </div>
  `;
});
document.querySelector("#list").innerHTML = html;
```
切换到 JS 标签页查看完整代码。4 张卡片由一个循环生成——如果加到 10 个也不用手动复制。
::

::task{title="动手试试 ✨"}
:::step{purpose="让你感受循环的「自动化」力量——增加一条数据，无需手动复制 HTML，循环自动为它生成卡片。这就是循环的核心价值：写一次模板逻辑，处理任意数量的数据。从 3 条到 100 条，代码量完全不变。" expected="页面自动多出一张新卡片，序号正确递增，样式和其他卡片完全一致。你只加了一行数据，一切自动完成。"}
在 JS 标签页的 `composers` 数组中再添加一个作曲家名字（如「拉赫玛尼诺夫」），观察页面是否自动多出了一张带序号的卡片
:::

:::step{purpose="`for` 和 `forEach` 是循环的两种写法——`for` 更底层，让你手动控制索引；`forEach` 更简洁，专注于「对每一项做什么」。理解两种方法后，你能在不同场景下灵活选择。" expected="页面显示效果和 forEach 完全一样，但你用的是 `for` 循环。通过对比，你理解了两种循环的等价性。"}
把 `forEach` 循环改成传统的 `for` 循环，实现同样的卡片渲染效果。参考格式：`for (let i = 0; i < composers.length; i++) { let name = composers[i]; ... }`
:::

:::step{purpose="让你意识到循环内部的模板就是普通的字符串拼接——你可以自由地修改它。每张卡片共享同一个模板结构，但填充的数据各不相同（因为 `name` 和 `index` 每次迭代都会变化）。" expected="所有卡片的样式统一更新（因为改了同一个模板），但每张卡片显示的内容仍然不同——模板统一，数据多样，这就是循环渲染的精髓。"}
修改卡片模板（循环内部的 HTML 字符串），给每张卡片增加更多信息。比如在名字后面加上序号，或者自定义描述文字
:::

:::step{purpose="组合循环 + 条件判断——这是数据处理中最常见的模式。「先筛选，再渲染」或「边遍历边判断」，让你瞬间拥有处理复杂数据的能力。就像从曲目单中只挑出长度超过 2 个字的名字来排练。" expected="只有名字长度大于 2 的作曲家有对应卡片，短名字（如只有一个字的）被跳过不显示。循环和条件判断配合得天衣无缝。"}
挑战：在 `forEach` 循环内增加 `if` 条件判断，只显示名字长度大于 2 的作曲家（过滤掉单字名）。提示：在循环体内用 `if (name.length > 2)` 包裹 HTML 拼接代码
:::

::

::listen-to
拉威尔《波莱罗》— 同一个旋律反复 18 遍，每次配器都在变化（加一件新乐器），就像循环每次迭代对当前元素做不同处理。
::


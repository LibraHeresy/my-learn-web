# 事件委托 — 让"父元素"替你监听每一个"子元素"

:::analogy
事件委托就像大堂经理——你不用给每个新来的客人单独交代注意事项，只需要告诉经理"遇到XX情况就按XX方式处理"。不管客人怎么换，处理方式不变。
:::

:::explain{title="问题：动态创建的元素没有事件"}
上一节课你学会了用 `createElement` 动态创建元素。但这里有一个棘手的问题：
```js
// 页面初始有 3 张卡片，每张绑定了点击事件
let cards = document.querySelectorAll(".card");
cards.forEach(function(card) {
  card.addEventListener("click", function() {
    alert("点击了卡片！");
  });
});
// 后来动态添加了一张新卡片
let newCard = document.createElement("div");
newCard.classList.add("card");
listEl.appendChild(newCard);
// ❌ 新卡片没有点击事件！因为 addEventListener 运行时它还不存在
```
这是一个很常见的 bug：**动态添加的元素不会自动继承之前绑定的事件**。
:::

:::explain{title="解决方案：把事件绑在父容器上"}
不分别给每张卡片绑事件，而是**给包含所有卡片的父容器绑一个事件**。当子元素被点击时，事件会"冒泡"到父容器：
```js
// 给父容器绑定事件（只绑定一次！）
listEl.addEventListener("click", function(event) {
  // event.target 是实际被点击的元素
  // closest(".card") 向上查找最近的 .card 容器
  let card = event.target.closest(".card");
  if (card) {
    // 找到了！说明点击的是某张卡片
    card.classList.toggle("highlight");
  }
});
// 之后动态添加的卡片也会自动响应，因为事件绑在父容器上！
```
这就是**事件委托**——把事件交给父容器代理，不管子元素是初始就有还是后来加的，都能响应。
:::

:::explain{title="关键 API：closest() 和 matches()"}
`event.target` — 实际被点击的元素（可能是卡片里的 h3、span、甚至卡片本身）
`.closest("选择器")` — 从当前元素向上查找最近的匹配祖先
```js
event.target.closest(".card");  // 总能找到卡片容器，不管点的是里面的 h3 还是 span
```
`.matches("选择器")` — 判断当前元素是否匹配选择器
```js
if (event.target.matches("button")) {
  // 点击的是按钮
}
```
**常见模式：用 data 属性区分不同元素**
```html
<button data-action="delete">删除</button>
<button data-action="like">收藏</button>
```
```js
let action = event.target.dataset.action;  // "delete" 或 "like"
```
:::

:::task{title="动手试试 ✨"}
::::step{purpose="事件委托是前端最重要的性能和维护性模式之一——一个事件监听器覆盖所有子元素，无论它们是初始就有还是后来动态添加的。就像前台统一收发快递——不用逐个通知每个员工\"有你的包裹\"，员工自己会去前台取。" expected="#cardList 上只有一个 click 事件监听器，但所有 3 张初始卡片都能正常切换收藏状态。"}
移除所有 forEach 逐个绑定的事件，改为在 #cardList 上绑定一个 click 事件
::::

::::step{purpose="closest() 方法向上查找最近的匹配祖先元素，这是事件委托的核心技巧。因为 event.target 可能是按钮里的文字节点或更深层元素，closest() 确保你总能找到想要的按钮——就像从执行者位置顺藤摸瓜找到他所属的模块。" expected="无论点击按钮的哪个位置（包括按钮内部文字），都能正确触发收藏逻辑。"}
在事件处理函数中用 event.target.closest(".like-btn") 判断点击的是否为收藏按钮
::::

::::step{purpose="这就是事件委托最让人惊叹的地方——动态添加的元素自动获得事件响应，零额外代码。因为事件注册在父容器上，新元素只是被 appendChild 进这个容器而已。" expected="新增的卡片点击收藏按钮后，状态正常切换，与初始卡片行为完全一致。"}
点击"添加随机项目"按钮，确认新卡片也能正常收藏（不需要任何额外代码）
::::

:::

:::recap
你学会了事件委托——把事件绑定在父容器上，而不是逐个绑到子元素。这样动态添加的子元素也能自动响应事件，不需要额外写代码。用 event.target.closest() 判断实际被点击的是哪个元素。
:::



# DOM 渲染进阶 — innerHTML 对比与 classList 操控

:::analogy
用 innerHTML 像复印一页文档——快但粗糙，改不了细节。createElement+appendChild 像用打字机一个字一个字敲——慢但精准，每个字都能单独修改和删除。
:::

:::explain{title="innerHTML vs createElement — 两种渲染方式对比"}
回顾第 4 章，你已经学会了 `createElement` + `appendChild` 来动态创建元素。现在我们来深入对比这两种方式，理解什么时候该用哪个：
| 特性 | innerHTML | createElement |
|------|-----------|---------------|
| 速度 | 一次性替换，批量操作快 | 逐个创建，精细控制快 |
| 事件保留 | 替换后旧事件丢失 | 事件绑定在元素上，不受影响 |
| 安全性 | 容易 XSS 注入 | textContent 天然安全 |
| 精细度 | 只能整体替换 | 可以单独修改任一元素 |
| 代码量 | 代码少 | 代码多 |
**经验法则：**
- 初始化页面、展示静态数据用 `innerHTML` 更简洁
- 需要绑定事件、频繁更新、处理用户输入用 `createElement` 更安全灵活
就像装修房子：硬装阶段直接买成套家具（innerHTML），但之后想换掉其中一张椅子的颜色，就得能单独操作每一件（createElement）。
:::

:::explain{title="classList API — 精确操控样式类"}
`classList` 提供了比 `className` 更精细的 class 控制方式：
```js
let el = document.querySelector('.card')
// 添加一个 class（不会覆盖已有的）
el.classList.add('highlight')
// 移除一个 class
el.classList.remove('highlight')
// 切换：有则删，无则加
el.classList.toggle('active')
// 检查是否包含
if (el.classList.contains('card')) {
  console.log('这是一张卡片')
}
```
classList` 的优势：
- `className = 'xxx'` 会覆盖所有已有 class
- `classList.add()` 只追加，不影响已有 class
- `classList.toggle()` 一行搞定开关效果
> 类比：`className` 像把家里所有灯全换掉，`classList` 像只换其中一盏灯泡——精确操作，不影响其他。
:::

:::task{title="动手试试 ✨"}
::::step{purpose="createElement 比 innerHTML 更精细——每个元素都是独立的 JS 对象，你可以单独修改它、给它绑定事件、甚至随时移除。就像用手工雕刻代替复印机，虽然多写几行代码，但获得了完全的控制权。" expected="页面显示 3 张卡片的收藏列表，外观与 innerHTML 方式完全一致，但底层是用 createElement 逐个创建的。"}
把 render() 中的 innerHTML 方式改为 createElement + appendChild：创建 div.card、h3、span，用 appendChild 组装后挂载到页面
::::

::::step{purpose="classList.toggle 一行代码搞定开关效果，比手动判断 className 再赋值简洁得多。就像用一个开关控制灯的亮灭——按一下开灯，再按一下关灯。" expected="点击卡片后背景变为淡橙色、边框变为红色，再次点击恢复原样。"}
给每张卡片绑定 click 事件，调用 classList.toggle("liked") 切换选中状态
::::

::::step{purpose="用 createElement 创建元素并即时绑定事件，新卡片的点击行为与初始卡片完全一致。这就是 createElement 相对于 innerHTML 的优势——事件在创建时就绑定了，不会丢失。" expected="新增的卡片点击后同样能切换 liked 样式，功能完全一致。"}
确认动态添加的卡片（点击"添加随机条目"）也能正常切换收藏状态
::::

:::

:::recap
你学会了对比 innerHTML 和 createElement 两种渲染方式——innerHTML 适合一次性渲染静态内容，createElement 适合需要绑定事件、精细控制的场景。还学会了用 classList.add/remove/toggle 精确操控样式类。
:::



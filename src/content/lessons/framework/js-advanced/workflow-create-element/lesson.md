# DOM 渲染进阶 — innerHTML 对比与 classList 操控

:::music-analogy
用 `innerHTML` 像"复印一整页乐谱"——一次性把全部内容塞进页面，方便但不够精细。`createElement` + `appendChild` 则像"一个音符一个音符地写"——更慢但更精准，你可以单独修改任何一个音符，给它加表情、转调、甚至随时拿掉。
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
就像排练新曲子：第一次通读可以直接复印全谱（innerHTML），但之后要修改某几个小节的指法，就得逐个音符编辑（createElement）。
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
> 类比：`className` 像换一件新乐器的全部配件，`classList` 像微调——只给长笛加个弱音器、给小提琴上调一个琴码。
:::

:::task{title="动手试试 ✨"}
::::step{purpose="createElement 比 innerHTML 更精细——每个元素都是独立的 JS 对象，你可以单独修改它、给它绑定事件、甚至随时移除。就像用手工雕刻代替复印机，虽然多写几行代码，但获得了完全的控制权。" expected="页面显示 3 张卡片的收藏列表，外观与 innerHTML 方式完全一致，但底层是用 createElement 逐个创建的。"}
把 render() 中的 innerHTML 方式改为 createElement + appendChild：创建 div.card、h3、span，用 appendChild 组装后挂载到页面
::::

::::step{purpose="classList.toggle 一行代码搞定开关效果，比手动判断 className 再赋值简洁得多。就像用一个按钮同时控制弱音器的装上和取下——按一下装上，再按一下取下。" expected="点击卡片后背景变为淡橙色、边框变为红色，再次点击恢复原样。"}
给每张卡片绑定 click 事件，调用 classList.toggle("liked") 切换选中状态
::::

::::step{purpose="用 createElement 创建元素并即时绑定事件，新卡片的点击行为与初始卡片完全一致。这就是 createElement 相对于 innerHTML 的优势——事件在创建时就绑定了，不会丢失。" expected="新增的卡片点击后同样能切换 liked 样式，功能完全一致。"}
确认动态添加的卡片（点击"添加随机曲目"）也能正常切换收藏状态
::::

:::

:::listen-to
巴赫《音乐的奉献》— 这首作品中的每一行都是独立的声部线条，精确编织在一起。createElement 就像在五线谱上逐个添加音符——每个音符都可以独立地定位、装饰、甚至移除。
:::


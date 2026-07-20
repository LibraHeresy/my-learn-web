# 层叠与优先级 — 当多个规则"打架"时谁说了算？

:::analogy
当多条 CSS 规则同时指向一个元素时，浏览器按一套优先级规则决定谁生效——就像公司里，直属上级的指令优先于隔壁部门的通知。越具体的规则越有话语权。
:::

:::explain{title="三条规则决定谁胜出"}
多条 CSS 规则都指向同一个元素时，浏览器按以下顺序决定：
**1. 来源与** `!important`
- 作者样式 > 用户样式 > 浏览器默认样式
- `!important` 标记**强行跳过优先级计算**（慎用！）
**2. 选择器权重（Specificity）**
- **内联 style** = 1000 分
- **ID 选择器** `#title` = 100 分
- **类/伪类/属性** `.card`, `:hover` = 10 分
- **元素/伪元素** `h1`, `::before` = 1 分
**3. 书写顺序**
- 权重相同时，**后写的覆盖先写的**
- 就像排队——最后来的人可能排在最前面
:::

:::explain{title="权重计算实例"}
看这几个例子，理解权重怎么算：
```css
h1 { color: red; }                     /* 权重: 1 */
.card h1 { color: blue; }              /* 权重: 10+1=11 */
#main h1 { color: green; }             /* 权重: 100+1=101 */
.card h1.title { color: gold; }        /* 权重: 10+1+10=21 */
```
`.card h1` 会覆盖 `h1`，因为 11 > 1。
`#main h1` 会覆盖所有上面三个，因为 101 最高。
```css
/* 权重相同 */
.card h1 { color: red; }
.card h1 { color: blue; }  /* ← 这条胜利！（后写） */
```
提示：用浏览器 DevTools（F12）可以看到被"划掉"的失效样式——被谁覆盖了，一目了然。
:::

:::explain{title="!important — 紧急按钮，慎用！"}
`!important` 写在属性值后面，会让这条声明**无视权重直接生效**：
```css
h1 {
  color: #8B2E2E !important;
}
/* 即使其他规则权重更高也会被覆盖 */
```
**为什么要慎用？**
`!important` 就像在安静的办公室里突然放鞭炮——它能吸引所有注意力，但**破坏了正常的秩序**。一旦用了第一次，很快就需要用更多 `!important` 去覆盖之前的 `!important`，最后变得无法维护。
**只有两种情况应该用：**
1. 覆盖你无法控制的第三方样式（如 UI 库）
2. 工具类（如 `.hidden` 必须隐藏元素）
:::

:::example{title="看例子"}
下面的代码故意写了冲突的规则，感受层叠效果：
```css
/* 规则 1：权重 1 */
p { color: gray; }
/* 规则 2：权重 11 —— 会覆盖规则 1 */
.card p { color: #3D2B1F; }
/* 规则 3：权重 21 —— 会覆盖规则 2 */
.card p.highlight { color: #8B2E2E; }
/* 规则 4：权重 101 —— 无人能敌 */
#special { color: #C9A96E; }
```
在预览区看第三条卡片的文字颜色——ID 选择器的金色覆盖了所有其他。
:::

:::task{title="动手试试 ✨"}
::::step{purpose="理解权重规则：去掉最高权重（101）的 #ID 选择器后，下一条最高权重（21）的 `.card p.highlight` 会生效。" expected="第三条卡片的文字从金色变成了 `.card p.highlight` 定义的暗红色。"}
去掉 `#special` 的 color 样式，看第三条文字变成什么颜色
::::

::::step{purpose="`!important` 无视权重直接胜出。但这是紧急按钮——一旦用了，后面的覆盖会越来越困难。" expected="带 `!important` 的规则覆盖了 `#special` 的样式。第二条卡片文字可能也跟着变了颜色。"}
给 `.card p.highlight` 的 color 加 `!important`，看效果
::::

::::step{purpose="学用 DevTools 诊断层叠冲突——被覆盖的样式会显示为删除线，一眼就能看出谁赢了。" expected="在 Computed 面板中能看到最终生效的 color 值，以及所有被覆盖的样式。"}
在 DevTools（F12）中查看元素的 Computed 样式，观察被划掉的规则
::::

::::step{purpose="用手写实验验证权重计算：`body`(1) + `.card`(10) + `p`(1) = 12。12 > 11，所以覆盖 `.card p`；12 < 21，所以被 `.card p.highlight` 覆盖。" expected="`body .card p` 覆盖了 `.card p` 的样式，但无法覆盖 `.card p.highlight` 和 `#special`。权重数字精确决定了谁胜出。"}
挑战：增加一条 `body .card p` 规则（权重 12），观察它能否覆盖 `.card p`（权重 11）但不能覆盖更高权重的规则
::::

:::

:::recap
这一节你学会了 CSS 的"裁决规则"——当多条样式指向同一个元素时，谁更具体谁就赢。ID 选择器的权重最高，类选择器次之，元素选择器最低；权重相同时后写的覆盖先写的。`!important` 是紧急按钮，但平时尽量不用。现在你再看到浏览器里被划掉的样式，就知道发生了什么。
:::



# CSS 选择器 — 精确指向你的元素

:::analogy
选择器就像快递员按地址找人——.class 像"送到XX小区"（一类），#id 像"送给张三本人"（一个），:hover 像"当我把包裹递过去的时候"。
:::

:::explain{title="基础选择器"}
选择器告诉 CSS"对谁生效"。三种最基础的选择器：
| 选择器 | 写法 | 含义 |
|--------|------|------|
| 元素选择器 | `h1` | 选中所有 `<h1>` |
| 类选择器 | `.card` | 选中所有 `class="card"` 的元素 |
| ID选择器 | `#title` | 选中 `id="title"` 的元素 |
```css
h1 { color: #8B2E2E; }        /* 所有 h1 */
.card { background: #FFFAF2; } /* 所有带 class="card" 的 */
#title { font-size: 2rem; }    /* 只有 id="title" 那个 */
```
**类选择器最常用**——一个类可以给多个元素，一个元素也可以有多个类。
:::

:::explain{title="组合与后代"}
选择器可以组合使用，精确指定层级关系：
- `.card h2` — **后代选择器**，`.card` 内部的所有 `<h2>`
- `.card > h2` — **子代选择器**，`.card` 的直接子元素 `<h2>`
- `h2, h3` — **分组选择器**，同时选中 `<h2>` 和 `<h3>`
- `.card.featured` — **交集选择器**，同时有 `class="card featured"` 的元素
```css
.card h2 { color: #8B2E2E; }       /* card 内的所有 h2 */
.card.featured { border-color: gold; } /* 只有 featured 的那张卡片 */
```
就像快递员可以指定"某小区某栋某单元"或"整条街"。
:::

:::explain{title="伪类选择器 — 状态触发的魔法"}
伪类以 `:` 开头，根据元素的**状态**来应用样式：
- `:hover` — 鼠标悬停时
- `:first-child` — 是父元素的第一个子元素
- `:last-child` — 是父元素的最后一个子元素
- `:nth-child(n)` — 是父元素的第 n 个子元素
```css
.card:hover { transform: translateY(-2px); }
.card:first-child { border-color: #8B2E2E; }
.card:nth-child(2) { border-color: #C9A96E; }
```
:hover` 是交互感的来源——鼠标移到卡片上，卡片微微上浮，就像有人轻轻拍了拍你的肩膀！
:::

:::example{title="看例子"}
下面的代码有三张卡片，用不同的选择器为它们设置了左侧的强调色：
```css
/* 所有卡片共享的样式 */
.card {
  background-color: #FFFAF2;
  border: 1px solid #D4C5A9;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 12px;
  transition: all 0.3s ease;
}
/* :hover 交互反馈 */
.card:hover {
  border-color: #C9A96E;
  transform: translateY(-2px);
}
/* :nth-child 给每张卡片不同的强调色 */
.card:nth-child(1) { border-left: 4px solid #8B2E2E; }
.card:nth-child(2) { border-left: 4px solid #C9A96E; }
.card:nth-child(3) { border-left: 4px solid #5B8C5A; }
```
试试把鼠标移到卡片上，看它们微微上浮的效果！
:::

:::task{title="动手试试 ✨"}
::::step{purpose="`:nth-child(n)` 伪类根据元素位置选中它。`nth-child(1)` = 第一个元素，不用给每张卡片单独加 class。" expected="第一张卡片的左边框颜色变了。注意 CSS 里的注释告诉你每张卡片当前的颜色是什么。"}
把 `.card:nth-child(1)` 的左边框颜色换一个
::::

::::step{purpose="`:hover` 是交互感的来源——鼠标移到元素上时触发样式变化。`box-shadow` 添加阴影，让卡片看起来浮起来了。" expected="鼠标悬停时卡片不仅有上浮动画，还多了阴影效果。这是网页中最常见的交互模式。"}
给 `.card:hover` 增加 `box-shadow` 属性，让悬浮效果更明显
::::

::::step{purpose="`:last-child` 自动选中最后一个子元素。不用手动数有几张卡片，CSS 会自动定位到最后一张。" expected="最后一张卡片有了你设定的特殊样式。`:last-child` 的优势：新加卡片后仍自动命中最后一张。"}
试试 `.card:last-child` 选择器，给最后一张卡片特殊的样式
::::

::::step{purpose="综合练习：在 HTML 中添加新卡片 + 在 CSS 中用 `:nth-child(4)` 给它样式。`n` 从 1 开始计数。" expected="页面出现第四张卡片，带有你设定的不同颜色强调边框。"}
挑战：添加一张新卡片（第4张），用 `.card:nth-child(4)` 设置不同的颜色
::::

:::

:::recap
这一节你学会了用选择器精确"指到"想要的元素——元素选择器选中所有同类标签，类选择器（`.`）选中带某个 `class` 的元素，伪类（`:`）根据状态来生效。`:hover` 让鼠标移上去有反应，`:nth-child(n)` 按位置选中第 n 个元素。现在你可以把样式精确地送到网页的任何一个角落了。
:::



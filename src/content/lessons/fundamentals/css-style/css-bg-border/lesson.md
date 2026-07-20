# 背景与边框 — 为卡片增添层次

:::analogy
背景颜色就像墙面的油漆，边框就像画框——它们为内容营造氛围和边界，就像不同的墙色和画框影响你对一幅画的第一印象。
:::

:::explain{title="背景颜色"}
background-color 属性设置元素的背景色，border 设置边框，border-radius 设置圆角，box-shadow 设置阴影。就像给照片选相框和背景纸——让画面更有层次感。
```css
div {
  background-color: #FFFAF2;
}
```
:::

:::explain{title="边框与圆角"}
`border` 给元素加上边框，`border-radius` 让边角变圆滑：
```css
div {
  border: 2px solid #D4C5A9;
  border-radius: 12px;
}
```
- `2px` — 边框粗细
- `solid` — 实线（还有 `dashed` 虚线、`dotted` 点线）
- `#D4C5A9` — 边框颜色
- `border-radius: 12px` — 圆角半径，值越大越圆
圆角让卡片更柔和，就像照片的圆角处理——温和不刺眼。
:::

:::example{title="看例子"}
下面的代码创建了一张"设计师卡片"，有暖色背景、细边框和圆角：
```css
.card {
  background-color: #FFFAF2; /* 背景色：暖白，像旧设计图的颜色 */
  border: 2px solid #D4C5A9; /* 边框：粗细 样式 颜色 */
  border-radius: 12px;       /* 圆角：让卡片四角变圆 */
  padding: 20px;             /* 内边距：内容到边框的距离 */
}
.card h2 {
  color: #8B2E2E;            /* 文字颜色：暗红，像古典设计图标题 */
}
```
打开 CSS 选项卡查看完整代码。
:::

:::task{title="动手试试 ✨"}
::::step{purpose="`background-color` 像舞台幕布——改变元素的背景色，营造不同的视觉氛围。" expected="卡片背景色变了。不同的颜色传达不同的感觉：蓝调冷静，橙调温暖。"}
把 `.card` 的 `background-color` 换一个颜色（试试 `#F0F8FF` 浅蓝，或 `#FFF8F0` 暖橙）
::::

::::step{purpose="`border` 的三个值：粗细、样式、颜色。`2px solid #D4C5A9` 分别对应这三个维度。" expected="卡片的边框变粗了一倍。边框像画框——越粗越强调，越细越含蓄。"}
把 `border` 的粗细从 `2px` 改成 `4px`，看边框变粗
::::

::::step{purpose="`border-radius` 控制圆角半径——值越大，角越圆。`0` 是直角，`50%` 是圆形。" expected="卡片四角变得更加圆润。圆角和直角传达完全不同的视觉感受。"}
把 `border-radius` 改成 `24px`，让卡片更圆润
::::

::::step{purpose="`border-style` 除了 `solid`（实线）还有 `dashed`（虚线）、`dotted`（点线）等多种样式。" expected="卡片边框变成了虚线。不同的边框样式适合不同的设计场景。"}
试试把 `solid` 改成 `dashed`，看虚线边框
::::

:::

:::recap
这一节你学会了给元素加背景和边框——`background-color` 像舞台幕布给卡片上底色，`border` 用三个值（粗细、样式、颜色）画出边框，`border-radius` 让尖角变圆角。边框样式可以是实线（`solid`）、虚线（`dashed`）或点线（`dotted`）。现在你可以做出有层次感、有装饰效果的卡片了。
:::



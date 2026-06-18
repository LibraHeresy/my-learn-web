# 居中与对齐 — 让页面更专业

::music-analogy
页面居中对齐就像**指挥站在舞台中央**——视觉焦点集中、平衡和谐。而对齐方式的选择，就像决定乐团的排列：对称式、扇形、还是弧形分布。
::

::explain{title="水平居中与垂直居中"}
在网页布局中，居中对齐是最常用的技巧之一：
**水平居中（文字）：**
```css
text-align: center;
```**水平居中（块级元素）：**
```css
margin: 0 auto;
```**Flexbox 一键居中（最强方法）：**
```css
.container {
  display: flex;
  justify-content: center;  /* 水平居中 */
  align-items: center;      /* 垂直居中 */
}
```
::

::explain{title="align-items 交叉轴对齐"}
`align-items` 控制**交叉轴**（垂直于主轴的方向）上的对齐：
- `stretch`（默认）— 拉伸填满
- `center` — 交叉轴居中
- `flex-start` — 交叉轴起点
- `flex-end` — 交叉轴终点
在横向排列（row）时，交叉轴就是垂直方向。用 `align-items: center` 可以让所有卡片在垂直方向居中对齐，即使它们高度不同。
::

::example{title="看例子"}
下面的代码创建了一个居中的"演奏邀请卡"。`.wrapper` 使用 Flexbox 将卡片在页面中水平和垂直居中，`.card` 内的文字也居中对齐：
```css
.wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 200px;
}
.card {
  text-align: center;
}
```
::

::task{title="动手试试 ✨"}
:::step{purpose="`justify-content: flex-start` 让元素在主轴起点对齐。Flexbox 默认就是 `flex-start`，所以看起来和没设一样。" expected="卡片从居中移到了左侧。`center` vs `flex-start` 的差异一目了然。"}
把 `.wrapper` 的 `justify-content` 改成 `flex-start`，看卡片移到左边
:::

:::step{purpose="`align-items` 控制交叉轴（垂直于主轴）的对齐。在横向排列时，交叉轴是垂直方向。`center` = 垂直居中，`flex-start` = 顶部对齐。" expected="卡片从垂直居中移到了顶部。`align-items` 控制的就是这个方向。"}
把 `align-items` 改成 `flex-start`，卡片移到顶部
:::

:::step{purpose="`margin: 0 auto` 是传统居中方法——上下 0、左右自动。给块级元素一个固定宽度后，`auto` 会让浏览器自动分配两侧空白。" expected="卡片有了固定宽度 300px，并且在父容器中水平居中。"}
试试在 `.card` 中添加 `width: 300px`，然后用 `margin: 0 auto` 居中
:::

:::step{purpose="`text-align` 只控制文字和行内元素的对齐，不影响块级元素的布局。`center` = 文字居中，`left` = 文字左对齐。" expected="卡片内部的文字从居中变成左对齐。卡片的整体位置不变，但内部文字排列方式变了。"}
把 `.card` 的 `text-align` 改成 `left`，看文字左对齐
:::

::

::listen-to
莫扎特《G大调弦乐小夜曲》K.525 — 完美的对称结构和平衡感，每一个乐句都恰到好处，就像精心的页面布局。
::


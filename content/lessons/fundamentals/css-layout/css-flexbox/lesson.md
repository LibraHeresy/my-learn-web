# Flexbox 入门 — 灵活排列你的内容

::music-analogy
Flexbox 是 CSS 中的布局利器，就像**指挥安排乐队座位**——可以横向排（木管在前，铜管在后），也可以纵向排（第一小提琴在左，第二小提琴在右）。
::

::explain{title="什么是 Flexbox？"}
Flexbox（弹性盒子）让元素排列变得简单。只需在**父元素**上设置 `display: flex`，子元素就会自动排列：
```css
.container {
  display: flex;
}
```默认情况下，子元素会**横向排列**（就像乐团的乐器按行排开）。
::

::explain{title="主轴方向"}
`flex-direction` 决定排列方向：
- `row`（默认）— 横向排列，从左到右，像乐团的一排
- `column` — 纵向排列，从上到下，像总谱的各声部
乐团排练时指挥说"弦乐坐左边，管乐坐右边"——在 CSS 中，`flex-direction` 就是你的指挥棒！
::

::explain{title="间距分配"}
`justify-content` 控制主轴上的对齐方式：
- `flex-start` — 靠左/靠上
- `center` — 居中
- `space-between` — 两端对齐，中间均匀分布
- `space-around` — 每个元素周围有相同间距
就像合唱团在舞台上排开——可以挤在中间，也可以均匀分布。
::

::example{title="看例子"}
下面的代码用 Flexbox 把三张作曲家卡片横向排列。注意 `.container` 上的 `display: flex`：
```css
.container {
  display: flex;
  gap: 20px;
  justify-content: center;
}
.card {
  flex: 1;
}
````gap` 是卡片之间的间距，`flex: 1` 让每张卡片平均分配宽度。
::

::task{title="动手试试 ✨"}
:::step{purpose="理解 `flex-direction`——它决定主轴方向。`row` = 横向排列（默认），`column` = 纵向排列。就像指挥决定声部是横排还是竖排。" expected="三张卡片变成了上下堆叠排列。主轴方向一变，整个布局就变了。"}
把 `.container` 的 `flex-direction` 改成 `column`，看卡片变成纵向排列
:::

:::step{purpose="`justify-content` 控制主轴上的分布方式。`space-between` 首尾贴边中间平均分配，`space-around` 每个元素周围间距相等。" expected="卡片之间的间距分布方式改变了。`space-between` 时首尾卡片贴边。"}
把 `justify-content` 改成 `space-between` 或 `space-around`
:::

:::step{purpose="`gap` 是 Flexbox 中设置子元素间距的最简单方式。一个值 = 行间距和列间距相同。" expected="卡片间距变大或变小了。`gap` 越大，卡片之间越疏远。"}
调整 `gap` 的值，看卡片间距变化
:::

:::step{purpose="`flex: 1` 表示每张卡片平分剩余空间。去掉后该卡片只占用内容所需的最小宽度，其余空间被有 `flex: 1` 的卡片瓜分。" expected="没有 `flex: 1` 的卡片变窄了，其他卡片变宽了。这就是弹性分配的核心。"}
试试去掉某张卡片的 `flex: 1`，看宽度怎么分配
:::

::

::listen-to
布里顿《青少年管弦乐队指南》— 一段音乐展示了不同乐器组在舞台上的位置，完美诠释了"布局"的概念。
::


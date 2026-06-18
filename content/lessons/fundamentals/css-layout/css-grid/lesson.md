# Grid 布局 — 二维排布你的元素

::music-analogy
Grid 就像**总谱的声部排列**——行是声部（第一小提琴、第二小提琴、中提琴、大提琴），列是小节。每个音符都有精确的"行/列"坐标，Grid 让你同时控制横向和纵向布局。
::

::explain{title="创建网格"}
Grid（网格布局）同时控制行和列——display:grid 启用网格，grid-template-columns 定义列宽，gap 设置间距。fr 是 fraction（份数）的缩写，1fr 1fr 1fr 表示三等分。就像交响乐团在舞台上的座次表——有行有列，每个位置都有明确安排。
```css
.container {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 16px;
}
```
- `1fr` — "一份"（fraction），自动分配剩余空间
- `1fr 1fr 1fr` — 三等分（三列宽度相等）
- `repeat(3, 1fr)` — 等价写法
- `gap` — 格子之间的间距
三列等宽就像三行声部并行推进——每个格子就是一个小节！
::

::explain{title="行与列的精确控制"}
`grid-template-rows` 定义行高：
```css
.container {
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: auto 200px;
}
```
子元素可以跨越多列或多行：
```css
.card:first-child {
  grid-column: span 2;  /* 跨 2 列 */
}
.card:last-child {
  grid-column: 1 / 3;   /* 从第1条线到第3条线（也是跨2列） */
}
```
就像总谱中某个声部的长音符跨越了好几个小节！
::

::explain{title="Flexbox vs Grid 怎么选？"}
- **Flexbox**：一维排列（要么横向，要么纵向）
  - 适合：导航栏、卡片列表、居中对齐
- **Grid**：二维排列（同时控制行和列）
  - 适合：页面整体布局、照片墙、表格类布局
一个简单的判断：
- 只需要"排一排" → Flexbox
- 需要"行和列都对齐" → Grid
就像弦乐四重奏用 Flexbox（4 个人排一排），而管弦乐团总谱用 Grid（声部+小节，二维矩阵）！
::

::example{title="看例子"}
下面的代码用 Grid 创建了 2×3 的作曲家卡片网格，最后一张跨 2 列：
```css
.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
}
.card:last-child {
  grid-column: span 2;
}
```
切换到预览区观察网格布局——每张卡片在二维网格中都有精确位置。
::

::task{title="动手试试 ✨"}
:::step{purpose="`repeat(3, 1fr)` 和 `repeat(2, 1fr)` 的区别：列数改变了，`fr` 自动按比例分配每一列的宽度。" expected="卡片从 3 列变成 2 列布局。`repeat()` 让你轻松控制列数。"}
把 `grid-template-columns` 从 `repeat(3, 1fr)` 改成 `repeat(2, 1fr)`，变成 2 列
:::

:::step{purpose="Grid 的 `gap` 与 Flexbox 用法相同——控制网格行列之间的间距。" expected="卡片之间的间距变大了。`gap` 同时控制行间距和列间距。"}
把 `gap` 从 `12px` 改成 `24px`，看卡片间距变大
:::

:::step{purpose="`grid-column: span 2` 让元素横向跨 2 列。但列数只有 2 时，`span 3` 没有效果（因为没有第 3 列可跨）。" expected="2 列布局时 `span 3` 没有效果，因为只有 2 列可跨。Grid 不会凭空创建新列。"}
修改 `.wide-card` 的 `grid-column` 改成 `span 3`，观察效果
:::

:::step{purpose="`fr` 是按比例分配的弹性单位。`1fr 2fr` 表示第一列占 1 份、第二列占 2 份——第二列是第一列的两倍宽。" expected="卡片变成左窄右宽的两列布局。`fr` 按比例分配空间的特性在 Grid 中最实用。"}
挑战：用 `grid-template-columns: 1fr 2fr` 创建左窄右宽的两列布局
:::

::

::listen-to
巴赫《赋格的艺术》— 多声部精密对位，每一个音符在纵横两个维度上都有精确位置，就像 Grid 的二维网格系统。
::


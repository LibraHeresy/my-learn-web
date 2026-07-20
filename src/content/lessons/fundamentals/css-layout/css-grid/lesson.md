# Grid 布局 — 二维排布你的元素

:::analogy
Grid 就像课程表——横是星期、竖是节次，每个格子放一节课。你可以精确控制每行每列的宽度，也能让一个元素跨越多行多列。
:::

:::explain{title="创建网格"}
Grid（网格布局）同时控制行和列——display:grid 启用网格，grid-template-columns 定义列宽，gap 设置间距。fr 是 fraction（份数）的缩写，1fr 1fr 1fr 表示三等分。就像电影院的座位表——有排有号，每个座位都有明确位置。
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
三列等宽就像三张并排摆放的桌子——每张桌子的位置清清楚楚！
:::

:::explain{title="行与列的精确控制"}
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
就像表格中某个单元格合并了好几个格子！
:::

:::explain{title="Flexbox vs Grid 怎么选？"}
- **Flexbox**：一维排列（要么横向，要么纵向）
  - 适合：导航栏、卡片列表、居中对齐
- **Grid**：二维排列（同时控制行和列）
  - 适合：页面整体布局、照片墙、表格类布局
**一个简单的判断**：
- 只需要"排一排" → Flexbox
- 需要"行和列都对齐" → Grid
就像排成一队用 Flexbox（几个人站一列），而教室座位表用 Grid（排+列，二维矩阵）！
:::

:::example{title="看例子"}
下面的代码用 Grid 创建了 2×3 的人物卡片网格，最后一张跨 2 列：
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
:::

:::task{title="动手试试 ✨"}
::::step{purpose="`repeat(3, 1fr)` 和 `repeat(2, 1fr)` 的区别：列数改变了，`fr` 自动按比例分配每一列的宽度。" expected="卡片从 3 列变成 2 列布局。`repeat()` 让你轻松控制列数。"}
把 `grid-template-columns` 从 `repeat(3, 1fr)` 改成 `repeat(2, 1fr)`，变成 2 列
::::

::::step{purpose="Grid 的 `gap` 与 Flexbox 用法相同——控制网格行列之间的间距。" expected="卡片之间的间距变大了。`gap` 同时控制行间距和列间距。"}
把 `gap` 从 `12px` 改成 `24px`，看卡片间距变大
::::

::::step{purpose="`grid-column: span 2` 让元素横向跨 2 列。但列数只有 2 时，`span 3` 没有效果（因为没有第 3 列可跨）。" expected="2 列布局时 `span 3` 没有效果，因为只有 2 列可跨。Grid 不会凭空创建新列。"}
修改 `.wide-card` 的 `grid-column` 改成 `span 3`，观察效果
::::

::::step{purpose="`fr` 是按比例分配的弹性单位。`1fr 2fr` 表示第一列占 1 份、第二列占 2 份——第二列是第一列的两倍宽。" expected="卡片变成左窄右宽的两列布局。`fr` 按比例分配空间的特性在 Grid 中最实用。"}
挑战：用 `grid-template-columns: 1fr 2fr` 创建左窄右宽的两列布局
::::

:::

:::recap
这一节你学会了 Grid 布局——比 Flexbox 更强大，能同时控制行和列。用 `grid-template-columns` 定义几列、每列多宽，`fr` 是按比例分配的单位，`gap` 设置格子间距，`grid-column: span 2` 让元素跨多列。记住一个简单判断：只排一排用 Flexbox，需要行和列都对上用 Grid。现在你可以做出像照片墙一样整齐的二维布局了。
:::



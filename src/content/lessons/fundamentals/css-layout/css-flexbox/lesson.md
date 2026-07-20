# Flexbox 入门 — 灵活排列你的内容

:::analogy
Flexbox 就像整理书架——书可以横着排、竖着排、自动换行、均匀分布。不管书多书少，书架总能摆得整整齐齐。
:::

:::explain{title="这一章你会学什么"}
这一章会开始处理“元素放在哪里、怎么排得整齐”。你会学到：
- Flexbox 与 Grid 的布局思路
- 水平、垂直、响应式排列
- 为什么页面在不同宽度下会挤乱或留白失衡

学完这一章，你不只会给页面“上色”，还会让页面真正排布得清楚、稳定。
:::

:::explain{title="为什么这章重要"}
布局决定的是内容之间的空间关系。  
在工程语境里，这通常叫 **页面布局**、**主轴与交叉轴**、**响应式排版**。  
如果上一章解决“好不好看”，这一章解决的是“站位是否成立”。
:::

:::hint{title="别把布局理解成死记属性"}
布局不是背很多属性，而是在训练空间感。  
你可以把它想成教室排座位：谁坐第一排，谁坐中间，谁留出过道空间。  
当你先理解空间关系，再去记 `justify-content` 和 `align-items`，会轻松很多。
:::

:::explain{title="什么是 Flexbox？"}
Flexbox（弹性盒子）让元素排列变得简单。只需在**父元素**上设置 `display: flex`，子元素就会自动排列：
```css
.container {
  display: flex;
}
```
默认情况下，子元素会**横向排列**（就像书在书架上一本本横着排开）。
:::

:::explain{title="主轴方向"}
`flex-direction` 决定排列方向：
- `row`（默认）— 横向排列，从左到右，像书架上一排书
- `column` — 纵向排列，从上到下，像书摞成一叠
你想让书横着排还是竖着放？在 CSS 中，`flex-direction` 就是你的选择开关！
:::

:::explain{title="间距分配"}
`justify-content` 控制主轴上的对齐方式：
- `flex-start` — 靠左/靠上
- `center` — 居中
- `space-between` — 两端对齐，中间均匀分布
- `space-around` — 每个元素周围有相同间距
就像停车场里的车——可以扎堆停在一侧，也可以均匀分布在车位里。
:::

:::example{title="看例子"}
下面的代码用 Flexbox 把三张人物卡片横向排列。注意 `.container` 上的 `display: flex`：
```css
.container {
  display: flex;
  gap: 20px;
  justify-content: center;
}
.card {
  flex: 1;
}
```
gap` 是卡片之间的间距，`flex: 1` 让每张卡片平均分配宽度。
:::

:::task{title="动手试试 ✨"}
::::step{purpose="理解 `flex-direction`——它决定主轴方向。`row` = 横向排列（默认），`column` = 纵向排列。就像决定教室座位是按排还是按列来数——横着看是一排，竖着看是一列。" expected="三张卡片变成了上下堆叠排列。主轴方向一变，整个布局就变了。"}
把 `.container` 的 `flex-direction` 改成 `column`，看卡片变成纵向排列
::::

::::step{purpose="`justify-content` 控制主轴上的分布方式。`space-between` 首尾贴边中间平均分配，`space-around` 每个元素周围间距相等。" expected="卡片之间的间距分布方式改变了。`space-between` 时首尾卡片贴边。"}
把 `justify-content` 改成 `space-between` 或 `space-around`
::::

::::step{purpose="`gap` 是 Flexbox 中设置子元素间距的最简单方式。一个值 = 行间距和列间距相同。" expected="卡片间距变大或变小了。`gap` 越大，卡片之间越疏远。"}
调整 `gap` 的值，看卡片间距变化
::::

::::step{purpose="`flex: 1` 表示每张卡片平分剩余空间。去掉后该卡片只占用内容所需的最小宽度，其余空间被有 `flex: 1` 的卡片瓜分。" expected="没有 `flex: 1` 的卡片变窄了，其他卡片变宽了。这就是弹性分配的核心。"}
试试去掉某张卡片的 `flex: 1`，看宽度怎么分配
::::

:::

:::recap
这一节你学会了 Flexbox——给父元素加上 `display: flex`，子元素就能灵活排列。用 `flex-direction` 决定横排还是竖排，用 `justify-content` 控制怎么对齐分布，用 `gap` 设置间距，用 `flex: 1` 让元素平分剩余空间。现在你可以轻松地把卡片排成一行，再也不用纠结"怎么让它们并排"了。
:::



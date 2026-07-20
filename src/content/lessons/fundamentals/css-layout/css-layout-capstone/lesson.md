# 综合项目 — 设计一场活动的宣传页

:::analogy
一场活动的海报需要精心布局：标题顶端、主内容中央、活动信息底部。用 CSS 把这些元素安排在合适的位置，让浏览体验流畅自然。
:::

:::explain{title="综合运用你学过的布局技巧"}
这个项目综合使用了前面学过的所有布局技能：
- **Flexbox** — 导航栏、人物卡片排列
- **Grid** — 页面整体结构、日程表网格
- **Position** — 报名按钮固定在视口右下角
- **居中** — 标题区域垂直居中
- **响应式** — 移动端和桌面端两套布局
就像活动策划把场地、嘉宾、流程协调在一起——每种布局技术各司其职。
:::

:::task{title="逐步构建 ✨"}
::::step{purpose="导航栏是 Flexbox 最经典的应用场景——横向排列链接，间距均匀，响应式下可切换为竖排。" expected="导航链接水平排列在页面顶部，当前页标签有高亮下划线。"}
**完善导航栏**——用 Flexbox 让导航链接水平排列，给当前页链接加 `.active` 样式
::::

::::step{purpose="日程表是 Grid 的典型案例——行和列都需要对齐。`grid-template-columns: 80px 1fr` 让时间列固定宽度、内容列弹性填充。" expected="日程表呈现整洁的两列布局，时间左对齐，内容规整排列。"}
**完善日程表网格**——用 Grid 把项目列表排成时间+内容两列，对齐文字
::::

::::step{purpose="`flex-wrap: wrap` 让卡片一行放不下时自动换行。hover 效果是用 `:hover` + `transform` + `transition` 组合实现。" expected="三张卡片横向排列，鼠标悬停时卡片微微上浮。"}
**人物卡片**——用 Flexbox 让三张卡片水平排列并自动换行，加 hover 上浮效果
::::

::::step{purpose="`fixed` 定位相对于浏览器窗口，滚动页面也不会移动。常用于 CTA 按钮、回到顶部等需要始终可见的元素。" expected="无论怎么滚动页面，报名按钮始终固定在右下角。"}
**底部固定按钮**——用 `position: fixed` 让报名按钮始终在右下角
::::

::::step{purpose="移动端屏幕窄，单列布局更合适的。这是移动端优先的设计思路：大屏增强，小屏基础。" expected="缩小浏览器窗口到 640px 以下时，导航变竖排，节目单变单列，卡片变堆叠。"}
**响应式适配**——在 `@media (max-width: 640px)` 中，日程表改单列，导航栏改竖排
::::

:::

:::hint{title="提示"}
- Grid 结构：`grid-template-columns: 120px 1fr;` 让时间和内容名宽度不同
- `position: fixed; bottom: 20px; right: 20px;` 实现右下角浮按钮
- `flex-wrap: wrap;` 让卡片自动换行
- 用 `@media` 做断点切换——移动端 `flex-direction: column`、`grid-template-columns: 1fr`
:::

:::recap
这一节是 CSS 布局的"毕业作品"——你把 Flexbox、Grid、Position、居中和响应式全部组合在一起，设计了一场完整的活动宣传页。导航栏用 Flexbox 排列，日程表用 Grid 对齐，报名按钮用 `fixed` 固定，移动端用 `@media` 切换单列布局。现在你已经能用 CSS 从零搭建一个专业、好看、适配所有屏幕的页面了。
:::



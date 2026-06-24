# 插槽（Slots）— 组件的"自由声部"

:::music-analogy
协奏曲中有华彩乐段（Cadenza）——作曲家留出空白，由独奏者自由发挥。**Slot（插槽）** 就是组件的"华彩乐段"：组件定义框架，使用者在 Slot 中填入自定义内容。这让组件既统一又灵活。
:::

:::explain{title="什么是 Slot？"}
之前你学的 props 让组件接收**数据**。Slot 让组件接收**模板内容**。
```vue
<!-- Card.vue — 定义组件，留出 Slot -->
<template>
  <div class="card">
    <div class="card-header">
      <slot name="header">默认标题</slot>
    </div>
    <div class="card-body">
      <slot>默认内容</slot>  <!-- 默认 Slot -->
    </div>
    <div class="card-footer">
      <slot name="footer">
        <button>确定</button>  <!-- 默认 footer -->
      </slot>
    </div>
  </div>
</template>
```
```vue
<!-- App.vue — 使用组件，填入内容 -->
<template>
  <Card>
    <template #header>
      <h2>🎵 月光奏鸣曲</h2>
    </template>
    <p>作曲：贝多芬</p>
    <p>时期：古典主义</p>
    <template #footer>
      <button @click="like">❤️ 收藏</button>
    </template>
  </Card>
</template>
```
:::

:::example{title="Slot vs Props：选择指南"}
| 场景 | 用什么 |
|------|--------|
| 传递文本/数字 | props |
| 传递 HTML 结构 | slot |
| 传递回调函数 | emits |
| 组件布局框架 | slot |
| 简单配置项 | props |
**口诀：** Props 传数据，Slots 传结构，Emits 传事件。
就像乐谱上的标记：
- Props = 音符（数据）
- Slots = 华彩乐段（留给演奏者填充的内容）
- Emits = 力度记号（告诉指挥这里要怎么处理）
:::

:::task{title="动手试试 ✨"}
::::step{purpose="组件化不仅是为了复用，更是为了统一视觉风格。先定义卡片的外框（边框、圆角、阴影），为后续用 slot 填充内容做好准备。这就像先搭建音乐会舞台的结构，再让不同演奏者在上面自由发挥。" expected="一个带有统一外框样式的空白卡片组件。"}
把曲目卡片提取成 MusicCard.vue 组件（定义基础卡片框架）
::::

::::step{purpose="默认 slot（<slot />）是组件最灵活的扩展点。使用者可以在父组件中向 slot 填入任意 HTML 结构，子组件只负责提供容器和布局。这比纯用 props 传递内容更自由——props 只能传数据，slot 可以传结构。" expected="不同卡片可以有不同的内部布局（如有的显示封面图，有的不显示），但外框样式一致。"}
用默认 slot 让使用者传入卡片主体内容
::::

::::step{purpose="具名 slot 让组件可以有多个插槽，分别对应不同的区域。<slot name=\"header\"> 定义顶部区，<slot name=\"footer\"> 定义底部区。使用者通过 <template #header> 语法精确填充每个区域。这让组件在保持结构的同时极度灵活。" expected="卡片顶部有标题栏（#header），中间是内容区域（默认 slot），底部有操作按钮区（#footer）。"}
用具名 slot（#header, #footer）分别定义卡片的顶部和底部区域
::::

::::step{purpose="插槽的真正威力在于：同一组件框架下，每张卡片可以完全自定义自己的外观和行为。组件提供结构约束，slot 提供内容自由。" expected="不同卡片虽然使用同一个 MusicCard 组件，但 header 和 footer 的内容和样式各不相同。"}
在 App.vue 中使用时，不同卡片可以有不同的 header 和 footer 样式
::::

:::

:::listen-to
莫扎特《第21钢琴协奏曲》第二乐章 — 协奏曲的形式本身就诠释了 Slot 的思想：管弦乐队提供结构（组件框架），钢琴在 Slot 中填入独奏内容。两者完美融合。
:::


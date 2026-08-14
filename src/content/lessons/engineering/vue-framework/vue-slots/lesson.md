# 插槽（Slots）— 组件的灵活占位符

:::analogy
Slot（插槽）就像填空题的空白横线 -- 试卷上已经印好了"_____，原名_____，是_____时期作曲家"，你只需要在横线上填入具体内容。组件就是这张试卷，它定义好了结构和位置，使用者填入自己的内容。同一张试卷可以填不同的答案。
:::

:::explain{title="问题：刚性组件无法适应变化的需求"}
你用之前学的 Props 做了个音乐卡片组件：

```vue
<!-- MusicCard.vue -- 用 Props 传数据 -->
<script setup>
defineProps({
  name: String,
  composer: String,
  period: String,
})
</script>

<template>
  <div class="card">
    <h3>{{ name }}</h3>
    <p>{{ composer }} · {{ period }}</p>
  </div>
</template>
```

这个组件很好用，直到产品经理走过来：

"这张卡片，第一个位置我想放一张封面图，第二个位置我想放一段音乐播放器，第三个位置我想放评论列表..."

**Props 能传数据，但传不了 HTML 结构。** 播放器是一个 `<audio>` 标签，评论列表是一组嵌套的 `<div>`。怎么让同一个卡片组件在不同地方展示完全不同的内容？

**不用 Slot 的笨办法 -- 做三个组件：**
```
MusicCardWithImage.vue    -->  给首页用
MusicCardWithPlayer.vue   -->  给详情页用
MusicCardWithComments.vue -->  给评论页用
```
三个组件的外框和样式完全一样，只是在内容区不同。任何一个外框改动（比如改圆角、改阴影），你都要改三个文件。这就是"刚性组件"的代价。
:::

:::explain{title="方案：Slot -- 让组件既有骨架，又有血肉"}
Slot 让组件留下"空位"，由使用者填入模板内容。

**定义组件（留空位）：**
```vue
<!-- MusicCard.vue -->
<template>
  <div class="card">
    <!-- 卡片顶部区域 -- 具名 slot "header" -->
    <div class="card-header">
      <slot name="header">
        <!-- 这是默认内容：如果使用者不给 #header，就显示这个 -->
        <h3>默认标题</h3>
      </slot>
    </div>

    <!-- 卡片主体区域 -- 默认 slot（没有 name 属性） -->
    <div class="card-body">
      <slot>
        <!-- 默认内容：如果使用者什么都不填，就显示这个 -->
        <p>暂无内容</p>
      </slot>
    </div>

    <!-- 卡片底部区域 -- 具名 slot "footer" -->
    <div class="card-footer">
      <slot name="footer">
        <button>确定</button>
      </slot>
    </div>
  </div>
</template>

<style scoped>
.card {
  border: 1px solid #ddd;
  border-radius: 12px;
  padding: 0;            /* padding 由内部区域各自控制 */
  overflow: hidden;
}
.card-header {
  background: #f5f5f5;
  padding: 16px;
  border-bottom: 1px solid #eee;
}
.card-body {
  padding: 16px;
}
.card-footer {
  border-top: 1px solid #eee;
  padding: 12px 16px;
  display: flex;
  justify-content: flex-end;
  gap: 8px;
}
</style>
```

**使用组件（填入内容）：**
```vue
<!-- App.vue -->
<template>
  <!-- 使用 1：一个带封面图的卡片 -->
  <MusicCard>
    <template #header>
      <h2>月光</h2>
      <span class="badge">古典</span>
    </template>

    <!-- 默认 slot 的内容不需要 <template> 包裹 -->
    <img src="moonlight-cover.jpg" alt="月光专辑封面" style="width:100%">
    <p>作曲家：德彪西</p>
    <p>创作年代：1890</p>

    <template #footer>
      <button @click="play">▶ 播放</button>
      <button @click="like('moonlight')">❤️ 收藏</button>
    </template>
  </MusicCard>

  <!-- 使用 2：同一组件，但内容完全不同 -- 一个带播放器的卡片 -->
  <MusicCard>
    <template #header>
      <h2>四季-春</h2>
    </template>

    <!-- 默认 slot：这次放音频播放器 -->
    <audio controls style="width:100%">
      <source src="vivaldi-spring.mp3" type="audio/mpeg">
    </audio>
    <p>作曲家：维瓦尔第</p>

    <template #footer>
      <button @click="download('spring')">⬇ 下载</button>
    </template>
  </MusicCard>
</template>
```

逐行解读：
- 第 5 行 `<slot name="header">` -- 具名插槽，定义了"header"这个位置
- 第 6-8 行 -- `<slot>` 标签之间的内容是**默认内容**：使用者不提供 `#header` 时就显示这个
- 第 13 行 `<slot>` -- 没有 `name` 属性的是**默认插槽**，每个组件最多有一个默认插槽
- 第 29 行 `#header` -- `#` 是 `v-slot:` 的简写，`#header` 就是 `v-slot:header`
- 第 34 行 -- 默认插槽的内容直接写在组件标签内部，不需要 `<template>` 包裹
- 第 38 行 `#footer` -- 底部插槽，填入按钮
- 第 44-57 行 -- 同一个 `MusicCard` 组件，但内部填充了完全不同的内容
:::

:::example{title="Slot Props -- 让插槽内容能访问子组件的数据"}
有时候你希望子组件提供一些数据给插槽内容使用。比如一个列表组件，它循环渲染，但每一项的显示方式由使用者决定：

```vue
<!-- TrackList.vue -- 子组件 -->
<script setup>
defineProps({
  tracks: Array,    // 接收曲目列表
})
</script>

<template>
  <ul>
    <!-- 循环列表，但每一项的渲染方式交给使用者决定 -->
    <li v-for="(track, index) in tracks" :key="track.id">
      <!-- slot props：把 track 数据暴露给使用者 -->
      <slot name="item" :track="track" :index="index">
        <!-- 默认展示方式 -->
        {{ track.name }}
      </slot>
    </li>
  </ul>
</template>
```

```vue
<!-- App.vue -- 父组件，使用 slot props -->
<template>
  <TrackList :tracks="pieces">
    <!-- #item="slotProps" -- 接收子组件传来的所有 slot props -->
    <template #item="{ track, index }">
      <!-- 解构出 track 和 index -->
      <div class="custom-item">
        <span class="index">{{ index + 1 }}</span>
        <div>
          <strong>{{ track.name }}</strong>
          <p>{{ track.composer }}</p>
        </div>
        <span v-if="track.liked">❤️</span>
      </div>
    </template>
  </TrackList>
</template>
```

逐行解读：
- 第 10 行 `:track="track" :index="index"` -- 子组件通过 slot 属性把数据传出去
- 第 22 行 `#item="{ track, index }"` -- 父组件通过解构接收这些数据，然后自由决定如何渲染
:::

:::explain{title="Slot vs Props vs Emits：各司其职"}
| 需求 | 用什么 | 例子 |
|---|---|---|
| 传数据给子组件 | Props | `:name="xxx"` `:age="25"` |
| 传 HTML 结构给子组件 | Slot | `<template #header><h1>...</h1></template>` |
| 子组件通知父组件 | Emits | `@click="emit('delete')"` |
| 子组件给 Slot 传数据 | Slot Props | `:item="track"` |

**口诀：** Props 传数据，Slots 传结构，Emits 传事件，Slot Props 传结构化数据。
:::

:::example{title="实战：一个可复用的布局组件"}
这是一个真实的场景：你的 App 有多个页面（首页、详情页、关于页），但每个页面的布局都一样 -- 顶部导航、侧边栏、主内容区、底部。用 Slot 做一个布局组件：

```vue
<!-- AppLayout.vue -- 布局组件 -->
<script setup>
// 布局组件不关心内部内容是什么，只负责提供结构
</script>

<template>
  <div class="layout">
    <!-- 顶部导航 -->
    <header class="layout-header">
      <slot name="header">
        <h1>音乐收藏</h1>          <!-- 默认标题 -->
      </slot>
    </header>

    <div class="layout-body">
      <!-- 侧边栏 -->
      <aside class="layout-sidebar">
        <slot name="sidebar">
          <nav>默认导航</nav>
        </slot>
      </aside>

      <!-- 主内容区 -->
      <main class="layout-main">
        <slot>
          <p>欢迎来到音乐收藏</p>    <!-- 默认内容 -->
        </slot>
      </main>
    </div>

    <!-- 底部 -->
    <footer class="layout-footer">
      <slot name="footer">
        <p>© 2024 音乐收藏</p>     <!-- 默认版权 -->
      </slot>
    </footer>
  </div>
</template>

<style scoped>
.layout { display: flex; flex-direction: column; min-height: 100vh; }
.layout-header { background: #2c3e50; color: white; padding: 16px 24px; }
.layout-body { display: flex; flex: 1; }
.layout-sidebar { width: 240px; background: #f8f9fa; padding: 16px; border-right: 1px solid #eee; }
.layout-main { flex: 1; padding: 24px; }
.layout-footer { background: #f8f9fa; padding: 12px 24px; border-top: 1px solid #eee; text-align: center; }
</style>
```

**使用布局：**
```vue
<!-- Home.vue -- 首页 -->
<template>
  <AppLayout>
    <template #header>
      <h1>🏠 首页</h1>
    </template>

    <template #sidebar>
      <nav>
        <router-link to="/">首页</router-link>
        <router-link to="/about">关于</router-link>
      </nav>
    </template>

    <!-- 默认 slot：主内容区，直接写 -->
    <h2>推荐曲目</h2>
    <div v-for="piece in featured" :key="piece.id">
      <MusicCard :name="piece.name" :composer="piece.composer" />
    </div>

    <template #footer>
      <p>共 {{ pieces.length }} 首曲目</p>
    </template>
  </AppLayout>
</template>
```

同一个 `AppLayout` 组件，首页用、详情页用、关于页用 -- 布局一致，内容各异。这就是 Slot 的真正威力。
:::

:::explain{title="常见错误"}
**错误 1：# 缩写后面没写名字**
```html
<!-- ❌ # 后面没写 slot 名 -->
<template #>
  <h2>标题</h2>
</template>

<!-- ✅ # 后面跟 slot 名字 -->
<template #header>
  <h2>标题</h2>
</template>
```

**错误 2：slot name 大小写不一致**
```html
<!-- 组件定义 -->
<slot name="card-header">

<!-- ❌ 引用时用了 camelCase，与定义的 "card-header" 不匹配（会落到默认内容） -->
<template #cardHeader>

<!-- ✅ 引用名必须与定义完全一致 -->
<template #card-header>
```

**错误 3：多个默认 slot**
```vue
<!-- ❌ 一个组件只能有一个默认 slot -->
<template>
  <slot></slot>
  <slot></slot>     <!-- 第二个没用，只有第一个生效 -->
</template>
```

**错误 4：slot props 解构后忘了用 props 传递的数据**
```vue
<!-- 子组件传了 slot props -->
<slot name="item" :track="track">

<!-- ❌ 父组件没接收 -->
<template #item>
  {{ track }}     <!-- track 未定义！ -->

<!-- ✅ 接收 slot props -->
<template #item="{ track }">
  {{ track.name }}
</template>
```
:::

:::explain{title="实际工作连接"}
Slot 在企业级组件开发中是核心工具：

- **UI 组件库**（Element Plus、Vuetify 等）大量使用 Slot。以 Element Plus 的 `<el-table>` 为例，你可以用具名 slot 自定义表头、行、展开内容等
- **布局组件**：几乎每个 Vue 项目的 `App.vue` 都用一个布局组件（Header + Sidebar + Main + Footer），通过 Slot 让每个页面填入自己的内容
- **弹窗/抽屉/对话框**：组件提供遮罩、动画、关闭按钮，内容通过默认 slot 传入。这是 Slot 最经典的应用场景

Slot 体现了组件设计的一个核心原则：**组件提供结构约束，使用者提供内容自由**。好的组件设计会把"不变的部分"封装在组件内部，把"变化的部分"暴露为 Slot。
:::

:::task{title="动手试试"}
::::step{purpose="组件化不仅是为了复用，更是为了统一视觉。先定义卡片的外框（边框、圆角、阴影），为后续用 slot 填充内容做好准备。" expected="一个带有统一外框样式的空白卡片组件。"}
把项目卡片提取成 MusicCard.vue 组件（定义基础卡片框架）
::::

::::step{purpose="默认 slot 是组件最灵活的扩展点。使用者可以向 slot 填入任意 HTML 结构，子组件只提供容器和布局。这比纯用 props 更自由 -- props 只能传数据，slot 可以传结构。" expected="不同卡片可以有不同的内部布局（如有的有封面图，有的没有），但外框样式一致。"}
用默认 slot 让使用者传入卡片主体内容
::::

::::step{purpose="具名 slot 让组件有多个可填充区域。<slot name=\"header\"> 定义顶部，<slot name=\"footer\"> 定义底部。使用者通过 <template #header> 精确填充。" expected="卡片顶部有标题栏（#header），中间是内容区（默认 slot），底部有操作按钮区（#footer）。"}
用具名 slot（#header、#footer）分别定义卡片的顶部和底部区域
::::

::::step{purpose="Slot 让同一组件在不同场景呈现不同内容。组件的结构是固定的（外框、分区），但内容是自由的 -- 每张卡片可以放不同的 header 和 footer 内容。" expected="不同卡片虽然用同一个 MusicCard 组件，但 header 和 footer 的内容各不相同。"}
在 App.vue 中使用组件时，不同卡片填入不同的 header 和 footer 内容
::::
:::

:::recap
你学会了用 Slot 插槽让组件接收模板内容 -- 默认 slot 传递主体内容（直接写在组件标签内），具名 slot（`#header`、`#footer`）精确填充不同区域，Slot Props 让子组件向插槽内容传递数据。Props 传数据，Slots 传结构，组件既统一框架又灵活可变。这是组件化设计中"开放封闭原则"的实现。
:::

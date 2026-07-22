# 单文件组件 — .vue 文件的三段式

:::analogy
一个 .vue 文件就像一份完整的个人档案 -- 照片（template）、履历（script）、穿着风格（style）。三样东西放在同一个文件袋里，拿起来就能了解一个人，不用翻三个抽屉。
:::

:::explain{title="问题：原生 JS 的散装地狱"}
先看一段真实场景。你想做一个音乐卡片组件，用原生 JS 需要三个文件：

**index.html -- 结构：**
```html
<div id="music-card">
  <h3 class="card-title"></h3>
  <p class="card-composer"></p>
</div>
```

**style.css -- 样式：**
```css
.card-title { font-size: 18px; color: #333; }
.card-composer { color: #666; }
```

**app.js -- 逻辑：**
```js
const card = document.getElementById('music-card')
card.querySelector('.card-title').textContent = '月光'
card.querySelector('.card-composer').textContent = '德彪西'
```

三个文件各管各的，改一个组件要横跳三个地方。项目有 20 个组件？你会迷失在文件海里。样式还会相互污染 -- `card-title` 这个名字可能被别的组件也用了。

这就是原生开发的**散装地狱**：结构、样式、逻辑分散在不同文件里，组件边界模糊。
:::

:::explain{title="方案：.vue 单文件组件 -- 三个人住一间房"}
Vue 的单文件组件（Single File Component，SFC）把一个组件的三样东西放进同一个 `.vue` 文件：

```vue
<!-- 1. 逻辑区：数据和行为 -->
<script setup>
import { ref } from 'vue'
const title = ref('月光')       // ref() 创建响应式数据
const composer = ref('德彪西')   // 改了数据，页面自动更新
</script>

<!-- 2. 模板区：HTML 结构 -->
<template>
  <div class="music-card">
    <h3>{{ title }}</h3>        <!-- {{ }} 插值显示数据 -->
    <p>{{ composer }}</p>
  </div>
</template>

<!-- 3. 样式区：CSS，scoped 表示只作用于本组件 -->
<style scoped>
.music-card {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 16px;
}
h3 {
  color: #333;
  font-size: 18px;
}
p {
  color: #666;
}
</style>
```

**逐行解读：**

- 第 2 行 `<script setup>` -- `setup` 表示使用组合式 API（Vue 3 推荐写法），里面定义的变量自动暴露给模板，不需要手动 `return`
- 第 4-5 行 `ref()` -- 把数据变成响应式，数据变了，用到它的地方自动更新（这是 Vue 的核心魔法）
- 第 10-13 行 `<template>` -- 写 HTML 结构，`{{ }}` 双花括号把 JS 数据插入到页面中
- 第 16 行 `<style scoped>` -- `scoped` 关键字让这些 CSS 只对当前组件生效，Vue 编译时会自动给元素加唯一属性隔离样式

**和原生 JS 的对比：**

| | 原生 JS | .vue 单文件 |
|---|---|---|
| 文件数量 | 3+ 个（HTML/CSS/JS） | 1 个 |
| 组件边界 | 模糊，全靠命名约定 | 清晰，一个文件一个组件 |
| 样式隔离 | 手动靠命名前缀防止冲突 | `scoped` 自动隔离 |
| 数据更新 | 手动 `querySelector` + `textContent` | 改数据，页面自动更新 |
:::

:::example{title="组件引入 -- 像搭积木一样组合页面"}
定义好 `.vue` 组件后，在别的组件里 `import` 就能用：

**定义子组件 `MusicCard.vue`：**
```vue
<script setup>
// defineProps 声明"我需要哪些数据"
defineProps({
  name: String,      // String 是类型约束
  composer: String
})
</script>

<template>
  <div class="card">
    <h3>{{ name }}</h3>       <!-- props 在模板中直接用 -->
    <p>{{ composer }}</p>
  </div>
</template>

<style scoped>
.card {
  border: 1px solid #D4C5A9;
  border-radius: 10px;
  padding: 16px;
}
</style>
```

**父组件 `App.vue` 中使用：**
```vue
<script setup>
// import 后，组件名在模板中自动可用
import MusicCard from './components/MusicCard.vue'
</script>

<template>
  <!-- 传数据用属性，冒号 : 表示传的是 JS 变量而非字符串 -->
  <MusicCard name="月光" composer="德彪西" />
  <MusicCard name="春之歌" composer="门德尔松" />
</template>
```

关键点：组件名写成 PascalCase（`MusicCard`），Vue 会自动识别。`import` 后直接在模板里用标签，不需要额外注册步骤。
:::

:::explain{title="常见错误"}
**错误 1：忘记 `scoped`，样式泄漏到全局**
```vue
<!-- ❌ 没有 scoped，这些样式会作用到整个页面 -->
<style>
h3 { color: red; }
</style>

<!-- ✅ 加上 scoped，只影响当前组件 -->
<style scoped>
h3 { color: red; }
</style>
```

**错误 2：`<script setup>` 里写错了位置**
```vue
<script setup>
// ✅ 变量和函数写在这里，顶层就是 setup 作用域
import { ref } from 'vue'
const msg = ref('hello')
</script>

<!-- ❌ 别把逻辑写在 template 里 -->
<template>
  const x = 1  <!-- 这会被当作文本直接显示！ -->
</template>
```

**错误 3：模板中只有**一个**根元素**
```vue
<template>
  <!-- ❌ Vue 3 允许多根，但某些工具链可能需要单根 -->
  <!-- ✅ 用一个 <div> 包裹多个元素更保险 -->
  <div>
    <h3>{{ title }}</h3>
    <p>{{ desc }}</p>
  </div>
</template>
```

**错误 4：import 路径写错**
```vue
<script setup>
// ❌ 路径错误 -- 区分 ./ 和 ../
import Card from 'components/MusicCard.vue'
// ✅ ./ 表示当前目录下的 components/
import Card from './components/MusicCard.vue'
</script>
```
:::

:::explain{title="实际工作连接"}
在企业项目里，你看到的每个页面、每个 UI 模块几乎都是一个 `.vue` 文件。以 Element Plus（业界最常用的 Vue 组件库）为例，它的按钮、表格、弹窗每个都是一个 `.vue` 单文件组件。你项目里的 `views/` 目录下每个页面也是。学会 `.vue` 文件的三段式，你就掌握了 Vue 项目最基本的组织单元。

大型项目里一个页面可能会拆成十几个 `.vue` 组件：`PageHeader.vue`、`Sidebar.vue`、`DataTable.vue`、`ModalDialog.vue`... 每个只管自己的一亩三分地。这是前端工程化的根基。
:::

:::task{title="你的任务"}
::::step{purpose="创建组件是 Vue 开发的基本动作。每个组件一个 .vue 文件，<template> 写结构、<script setup> 写逻辑、<style scoped> 写样式。三段式让代码各归其位，不混在一起。" expected="项目中出现 src/components/HelloMusic.vue 文件，内含完整的三段式结构。"}
在 src/components/ 下新建 HelloMusic.vue 文件
::::

::::step{purpose="模板中的 {{ }} 是 Vue 的数据插值语法。你只需声明数据是什么、结果长什么样，Vue 负责把数据放到 DOM 里。这是声明式渲染的核心。" expected="页面上出现一句你选择的名言。"}
在组件中显示一句你最喜欢的名言
::::

::::step{purpose="import 是工程化下组件复用的方式。import 后，组件标签在模板中自动可用。你可以像搭积木一样把不同组件组合成一个页面。" expected="App.vue 中成功导入 HelloMusic，页面上能看到该组件渲染的内容。"}
在 App.vue 中 import 并使用 `<HelloMusic />` 组件
::::

::::step{purpose="<style scoped> 利用 Vue 编译时自动添加的 data-v-xxx 属性实现样式隔离。给每个组件写样式时不必担心污染别人。" expected="HelloMusic.vue 中的文字有了自定义的字体、颜色和边框样式。"}
给组件添加 scoped 样式（字体、颜色、边框等）
::::

::::step{purpose="去掉 scoped 后，CSS 变成全局作用域。通过对比，你能直观感受 scoped 的价值 -- 它防止了样式泄漏。" expected="去掉 scoped 后，App.vue 中同类型元素的样式可能也被改变了。"}
把 `<style scoped>` 改成 `<style>`（去掉 scoped），观察变化，然后改回来
::::
:::

:::hint{title="文件命名约定"}
组件文件使用 PascalCase（首字母大写驼峰）命名：
- `MusicCard.vue` -- 推荐
- `HelloMusic.vue` -- 推荐
- `musicCard.vue` -- 能用但不推荐
- `music-card.vue` -- 同上

这不是强制规则，但是 Vue 社区共识。在编辑器里通过文件名就能一眼认出是不是 Vue 组件。
:::

:::recap
你学会了 .vue 单文件组件的三段式结构 -- `<script setup>` 写逻辑，`<template>` 写结构，`<style scoped>` 写样式。每个组件一个文件，通过 `import` 引入使用，`scoped` 让样式互不干扰。这就是 Vue 工程化的基本组织单元。
:::

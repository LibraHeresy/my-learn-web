# v-model 深入 — 双向绑定的"默契"

::music-analogy
在四手联弹中，两位演奏者需要完美默契：一个人弹主旋律，另一个人同时配合，两人互相倾听、即时响应。`v-model` 就是数据和表单之间的"四手联弹"——用户输入，数据更新；数据变化，表单自动显示。
::

::explain{title="v-model 的本质"}
v-model 是 Vue 最常用的双向绑定指令——它同时做了两件事：把数据绑定到表单元素（v-bind:value），并在用户输入时更新数据（v-on:input）。这就是双向绑定——数据和视图始终保持同步，就像四手联弹时两个演奏者实时呼应。
```vue
<!-- 这两行等价 -->
<input v-model="name">
<input :value="name" @input="name = $event.target.value">
```
::

::example{title="不同表单元素的 v-model"}
```vue
<script setup>
import { ref } from 'vue'
const text = ref('')          // 文本输入
const checked = ref(false)     // 复选框
const selected = ref('')      // 单选/下拉
const options = ref([])        // 多选
</script>
<template>
  <!-- 文本 -->
  <input v-model="text" placeholder="输入曲名">
  <p>你输入了：{{ text }}</p>
  <!-- 复选框 -->
  <label><input type="checkbox" v-model="checked"> 已收藏</label>
  <!-- 下拉选择 -->
  <select v-model="selected">
    <option value="">选择时期</option>
    <option>巴洛克</option>
    <option>古典主义</option>
    <option>浪漫主义</option>
  </select>
  <p>选中：{{ selected }}</p>
</template>
```每种表单元素都能用 `v-model`，Vue 自动处理不同类型的事件。
::

::example{title="v-model 修饰符"}
修饰符让你精确控制 v-model 的行为：
```vue
<!-- .lazy：不在 input 时更新，在 change 时更新 -->
<input v-model.lazy="name">
<!-- .number：自动转为数字 -->
<input v-model.number="age" type="text">
<!-- .trim：自动去除首尾空格 -->
<input v-model.trim="title">
```这些修饰符就像音符上的标记——`.lazy` 是延音记号，`.number` 是指法标注，`.trim` 是休止符前的渐弱。
::

::task{title="动手试试 ✨"}
:::step{purpose="v-model 是 Vue 提供的双向绑定语法糖：它同时做 v-bind:value（数据->视图）和 v-on:input（视图->数据）。一个指令替代了原来需要手动写的事件监听器和 DOM 操作。表单输入、数据更新、视图刷新——一条龙自动完成。" expected="在输入框中输入内容，下方实时显示输入的数据；提交后新曲目添加到列表中。"}
添加曲目表单：曲名、作曲家、时期——三个输入框都用 v-model
:::

:::step{purpose="v-model 不仅适用于文本输入，同样适用于 select 下拉框。选中的值自动同步到响应式变量，配合 computed 属性实现实时筛选。这比手动监听 change 事件再更新 DOM 简洁得多。" expected="从下拉框选择不同时期，曲目列表自动过滤显示。"}
筛选下拉框：用 v-model 绑定选中的时期，配合 computed 筛选列表
:::

:::step{purpose="v-model 对 checkbox 的处理很智能：单个 checkbox 绑定布尔值（收藏/未收藏），多个 checkbox 绑定到数组（多选）。这里用单个 checkbox 的 true/false 切换收藏状态，完全不需要手动写 click 事件处理。" expected="勾选/取消收藏复选框，页面上的收藏状态图标实时切换。"}
收藏开关：用 checkbox + v-model 实现收藏/取消收藏
:::

::

::listen-to
勃拉姆斯《匈牙利舞曲第一号》— 钢琴四手联弹的经典曲目。两个声部你来我往、相互呼应，正如 v-model 在前端数据和用户输入之间的"双向默契"。
::


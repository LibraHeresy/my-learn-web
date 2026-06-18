# Vue Router — 给你的应用"翻页"

::music-analogy
一本乐谱有目录，你可以翻到任何一页。交响乐有四个乐章，听众知道"现在在第几乐章"。单页应用（SPA）的多页面体验就靠 **Vue Router** ——它让 URL 变化时页面切换，就像翻乐谱一样自然。
::

::explain{title="为什么需要 Router？"}
至此你的 Vue 应用只有一个页面。但实际上，一个完整的应用通常有：
- 首页（作品列表）
- 详情页（单个作品详情）
- 关于页
- 404 页面
Vue Router 让你在不刷新页面的情况下切换"页面"——URL 变了，内容变了，但页面没有白屏刷新。这就是**单页应用（SPA）**。
::

::example{title="基础路由设置"}
```js
// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Detail from '../views/Detail.vue'
const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: Home },
    { path: '/piece/:id', component: Detail }  // 动态路由
  ]
})
export default router
```在 `main.js` 中注册：
```js
import { createApp } from 'vue'
import router from './router'
import App from './App.vue'
createApp(App).use(router).mount('#app')
```
::

::example{title="<router-link> 和 <router-view>"}
```vue
<!-- App.vue — 布局 -->
<template>
  <nav>
    <!-- 导航链接：to 是目标路径 -->
    <router-link to="/">🏠 首页</router-link>
    <router-link to="/about">ℹ️ 关于</router-link>
  </nav>
  <!-- 路由出口：匹配的组件渲染在这里 -->
  <router-view />
</template>
``````vue
<!-- Detail.vue — 获取路由参数 -->
<script setup>
import { useRoute } from 'vue-router'
const route = useRoute()
const pieceId = route.params.id  // 来自 /piece/:id
</script>
<template>
  <p>正在查看作品：{{ pieceId }}</p>
</template>
````<router-link>` 替代 `<a href>`。`<router-view>` 是页面内容的"插座"。
::

::example{title="编程式导航"}
有时候不能只用 `<router-link>`，需要在 JS 中跳转：
```vue
<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()
function goToDetail(id) {
  router.push(\`/piece/\${id}\`)  // 跳转到详情页
}
function goBack() {
  router.back()  // 返回上一页
}
</script>
````router.push()` 就像点击链接，`router.back()` 就像按浏览器的后退键。
::

::task{title="动手试试 ✨"}
:::step{purpose="首页是应用的入口。用路由的 path: \"/\" 映射到 Home 组件，<router-view /> 在 App.vue 中作为内容出口。路由让单页应用有了多页面的体验——URL 变了，内容变了，但页面没有白屏刷新。" expected="访问根路径 / 时显示曲目列表和筛选功能。"}
首页 /：展示所有曲目（列表 + 筛选）
:::

:::step{purpose="动态路由 /piece/:id 让 URL 携带参数。通过 route.params.id 获取曲目 ID，根据 ID 查找对应数据并展示详情。同一个路由匹配所有曲目，参数不同内容不同——这就是动态路由的核心价值。" expected="从列表点击某首曲目，跳转到 /piece/xxx 并显示该曲目的完整信息。"}
详情页 /piece/:id：展示单个曲目的详细信息
:::

:::step{purpose="静态路由 /about 是最简单的路由形式。它展示了一个完整的应用通常会有哪些页面类型：列表页（数据驱动）、详情页（参数驱动）、静态页（内容固定）。三者组合就是一个完整的 SPA 应用骨架。" expected="点击导航中的「关于」，显示关于页面的内容，URL 变为 /about。"}
关于页 /about：介绍你自己和这个项目
:::

::

::hint{title="实现步骤"}
1. `npm install vue-router`
2. 创建 `src/router/index.js`
3. 创建 `src/views/Home.vue`、`Detail.vue`、`About.vue`
4. 在 `main.js` 中 `app.use(router)`
5. 在 `App.vue` 中添加 `<router-view />` 和导航
6. 把原来的内容移到 `Home.vue` 中
::

::listen-to
穆索尔斯基《图画展览会》— 这部作品用"漫步"主题连接十幅音乐画卷。URL 就像"漫步"：在不同页面间导航，每个页面是一幅独立的"音乐画作"。
::


# "Vue Router — 给你的应用\"翻页\""

:::analogy
Vue Router 就像一本书的目录 -- 点击"第三章"直接翻到那一页，不需要从头一页页翻。URL 变了，页面内容跟着变，但整本书（应用）不需要重新加载。这就是单页应用的核心体验。
:::

:::explain{title="问题：没有路由，页面切换全靠刷新"}
到目前为止，你的 Vue 应用只有一个页面。但在真实应用中，你需要多个"页面"：

```
/                -- 首页：曲目列表 + 筛选
/piece/moonlight -- 详情页：月光 的完整信息
/about           -- 关于页：项目介绍
/search          -- 搜索页：搜索所有曲目
```

**没有路由的笨办法 -- 条件渲染：**
```vue
<!-- App.vue -- 手动管理"当前显示哪个页面" -->
<script setup>
import { ref } from 'vue'
const currentPage = ref('home')    // 手动维护当前页面状态

function navigate(page) {
  currentPage.value = page         // 手动切换页面
}
</script>

<template>
  <button @click="navigate('home')">首页</button>
  <button @click="navigate('detail')">详情</button>
  <button @click="navigate('about')">关于</button>

  <!-- 条件渲染每个"页面" -->
  <Home v-if="currentPage === 'home'" />
  <Detail v-else-if="currentPage === 'detail'" />
  <About v-else-if="currentPage === 'about'" />
</template>
```

这个方案的致命缺陷：
1. **URL 不变** -- 用户刷新浏览器，无论之前在哪个"页面"，都回到 `currentPage === 'home'`。无法分享"详情页"的链接
2. **浏览器前进/后退按钮无效** -- 用户按后退键，页面不变
3. **状态管理复杂** -- 页面一多，v-if/else 地狱

这些问题用 Vue Router 全部解决。
:::

:::explain{title="方案：Vue Router -- 让 URL 驱动页面切换"}
Vue Router 是 Vue 官方的路由库。它的核心思想：**URL 是页面的唯一标识**。URL 变了，显示对应的页面组件。

**第 1 步：定义路由规则**
```js
// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'

// 导入页面组件
import Home from '../views/Home.vue'
import Detail from '../views/Detail.vue'
import About from '../views/About.vue'

// 创建路由实例
const router = createRouter({
  // createWebHistory：使用浏览器原生的 History API，URL 好看（没有 #）
  history: createWebHistory(),

  // routes：URL 路径和组件的映射表
  routes: [
    {
      path: '/',                // URL 路径
      name: 'home',             // 路由名称（可选，用于编程式导航）
      component: Home,          // 匹配到这个路径时显示的组件
    },
    {
      path: '/piece/:id',       // 动态路由：:id 是占位符，匹配任意值
      name: 'detail',
      component: Detail,
    },
    {
      path: '/about',
      name: 'about',
      component: About,
    },
    {
      // 404 页面：匹配所有未定义的路径
      path: '/:pathMatch(.*)*', // Vue Router 4 的 catch-all 写法
      name: 'not-found',
      component: () => import('../views/NotFound.vue'),  // 懒加载
    },
  ],
})

export default router
```

逐行解读：
- 第 2 行 `createRouter` -- 创建路由实例的函数
- 第 3 行 `createWebHistory` -- 使用 HTML5 History 模式（URL 是 `/about` 不是 `/#/about`）
- 第 15 行 `path: '/'` -- 根路径，对应首页
- 第 20 行 `path: '/piece/:id'` -- `:id` 是动态参数，`/piece/moonlight` 和 `/piece/vivaldi` 都匹配这条规则，但 `id` 值不同
- 第 30 行 `/:pathMatch(.*)*` -- 通配符，匹配所有不存在的路径，显示 404 页面
- 第 32 行 `() => import(...)` -- 动态导入（懒加载），这个页面组件只在第一次访问时才下载

**第 2 步：在 main.js 中注册路由**
```js
// src/main.js
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'       // 导入路由配置

const app = createApp(App)
app.use(router)                      // 安装路由插件
app.mount('#app')
```

**第 3 步：在 App.vue 中放置导航和路由出口**
```vue
<!-- App.vue -->
<template>
  <nav class="nav">
    <!-- router-link：替代 <a> 标签，点击不会刷新页面 -->
    <router-link to="/">🏠 首页</router-link>
    <router-link to="/about">ℹ️ 关于</router-link>
  </nav>

  <main>
    <!-- router-view：路由出口 -- 匹配到的页面组件渲染在这里 -->
    <router-view />
  </main>
</template>

<style scoped>
.nav { display: flex; gap: 16px; padding: 16px; background: #f5f5f5; }
/* router-link 激活时的样式 */
.nav :deep(.router-link-active) { color: #42b883; font-weight: bold; }
</style>
```

逐行解读：
- 第 5 行 `<router-link to="/">` -- 和 `<a href="/">` 的区别：`<router-link>` 阻止了浏览器的默认跳转，用 JS 切换页面，不会产生白屏刷新
- 第 11 行 `<router-view />` -- 这是路由的"出口"，根据当前 URL 决定把哪个组件渲染在这里。就像一个插座，插什么由 URL 决定
- 第 16 行 `.router-link-active` -- Vue Router 自动给当前激活的 `<router-link>` 加上这个 class，你可以用 CSS 做高亮
:::

:::explain{title="动态路由 -- 同一个页面模板，不同数据"}
动态路由是 Router 最常用的功能之一。列表页有 100 首曲目，你不需要创建 100 个路由规则和 100 个组件。一个 `/piece/:id` 就够了。

**定义路由：**
```js
{ path: '/piece/:id', name: 'detail', component: Detail }
```

**列表页跳转到详情页：**
```vue
<!-- Home.vue -- 列表页 -->
<template>
  <div v-for="piece in pieces" :key="piece.id">
    <!-- 用 router-link 传动态参数 -->
    <router-link :to="`/piece/${piece.id}`">
      {{ piece.name }}
    </router-link>
    <!--
    :to="`/piece/${piece.id}`" -- 反引号模板字符串拼接
    也可以用对象写法：
    :to="{ name: 'detail', params: { id: piece.id } }"
    -->
  </div>
</template>
```

**详情页读取路由参数：**
```vue
<!-- Detail.vue -- 详情页 -->
<script setup>
import { useRoute } from 'vue-router'   // useRoute 获取当前路由信息
import { ref, onMounted } from 'vue'

const route = useRoute()                // 拿到当前路由对象
const pieceId = route.params.id         // 读取 URL 中的 :id 参数
// 如果 URL 是 /piece/moonlight，route.params.id 就是 "moonlight"

const piece = ref(null)

onMounted(() => {
  // 根据 ID 查找曲目数据
  piece.value = findPieceById(pieceId)
  // 实际项目中这里可能是一个 API 请求：
  // piece.value = await fetch(`/api/pieces/${pieceId}`).then(r => r.json())
})
</script>

<template>
  <div v-if="piece">
    <h1>{{ piece.name }}</h1>
    <p>作曲家：{{ piece.composer }}</p>
    <p>时期：{{ piece.period }}</p>
    <p>{{ piece.description }}</p>
  </div>
  <p v-else>曲目不存在</p>
</template>
```

逐行解读：
- 第 4 行 `useRoute()` -- Vue Router 提供的组合式函数，返回当前活跃的路由信息
- 第 7 行 `route.params.id` -- `params` 对象包含所有动态参数。`id` 对应路由定义中的 `:id`
- 第 12-13 行 -- 根据从 URL 拿到的 ID，查找对应的数据
:::

:::explain{title="编程式导航 -- 在 JS 代码中跳转"}
不是所有导航都适合用 `<router-link>`。比如：提交表单后跳转、登录成功后跳转、定时自动跳转。这些需要在 JS 中控制：

```vue
<script setup>
import { useRouter } from 'vue-router'    // useRouter 获取路由实例（用于操作）

const router = useRouter()

function goToDetail(id) {
  // router.push：跳转到指定页面（添加一条历史记录，可以后退）
  router.push(`/piece/${id}`)
  // 等价于点击了一个 to="/piece/xxx" 的 router-link

  // 对象写法（更清晰）：
  // router.push({ name: 'detail', params: { id } })
}

function goBack() {
  // router.back()：返回上一页，等价于浏览器的后退按钮
  router.back()
}

function goForward() {
  // router.forward()：前进到下一页
  router.forward()
}

function replacePage() {
  // router.replace：替换当前页面（不添加历史记录，不能后退）
  // 适用于：登录后跳转到首页，不应该让用户后退到登录页
  router.replace('/')
}
</script>

<template>
  <button @click="goToDetail('moonlight')">查看月光</button>
  <button @click="goBack">返回</button>
  <button @click="goForward">前进</button>
</template>
```

**`useRoute` vs `useRouter`：**
- `useRoute()` -- 读取当前路由信息（只读）-- 获取 params、query、path 等
- `useRouter()` -- 操作路由（跳转、后退、前进）-- 调用 push、replace、back 等
- 类比：`useRoute` 是地图（告诉你现在在哪），`useRouter` 是司机（带你去要去的地方）
:::

:::example{title="实战：一个完整的 Vue Router 应用结构"}
```
src/
├── router/
│   └── index.js           # 路由配置
├── views/                  # 页面级组件
│   ├── Home.vue           # 首页：曲目列表
│   ├── Detail.vue         # 详情页：单个曲目
│   ├── About.vue          # 关于页
│   └── NotFound.vue       # 404 页
├── components/             # 可复用组件
│   ├── MusicCard.vue      # 曲目卡片（被 Home 使用）
│   └── AppNav.vue         # 导航栏
├── App.vue                 # 根组件（放 router-view）
└── main.js                 # 入口（注册 router）
```

**路由配置完整版：**
```js
// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/Home.vue'),   // 懒加载
  },
  {
    path: '/piece/:id',
    name: 'detail',
    component: () => import('../views/Detail.vue'),
    // props: true -- 把 route.params 作为 props 传给组件
    props: true,
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('../views/About.vue'),
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('../views/NotFound.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
```

**App.vue：**
```vue
<template>
  <AppNav />
  <router-view />      <!-- 路由出口：所有页面在这里切换 -->
</template>
```
:::

:::explain{title="常见错误"}
**错误 1：忘记注册路由（app.use(router)）**
```js
// main.js
const app = createApp(App)
// ❌ 忘了 app.use(router) -- <router-link> 和 <router-view> 不生效！
app.mount('#app')

// ✅ 正确
app.use(router)
app.mount('#app')
```

**错误 2：`useRoute` 和 `useRouter` 搞混**
```js
// ❌ useRoute 没有 push 方法！
const route = useRoute()
route.push('/about')     // TypeError: route.push is not a function

// ✅ useRouter 用来操作路由
const router = useRouter()
router.push('/about')

// ✅ useRoute 用来读取路由信息
const route = useRoute()
console.log(route.params.id)
```

**错误 3：动态路由参数变化时组件不重新渲染**
```js
// Detail.vue -- 从 /piece/A 直接跳到 /piece/B
// 问题：路由参数变了，但组件复用了，onMounted 不会再触发

// ❌ onMounted 只在第一次创建时执行
onMounted(() => { fetchPiece(route.params.id) })

// ✅ 用 watch 监听参数变化
import { watch } from 'vue'
watch(() => route.params.id, (newId) => {
  fetchPiece(newId)
})
```

**错误 4：router-link 用了 href 而不是 to**
```html
<!-- ❌ href 会让浏览器刷新页面 -->
<router-link href="/about">关于</router-link>

<!-- ✅ to 才是 router-link 的属性 -->
<router-link to="/about">关于</router-link>
```
:::

:::explain{title="实际工作连接"}
在真实 Vue 项目中，Vue Router 几乎必不可少。任何超过 1 个页面的应用都需要路由。常见模式：

- **动态路由 + API 驱动**：列表页点击 → 跳到详情页（`/product/:id`），详情页根据 `:id` 调 API 取数据
- **路由守卫**：在进入某些页面前检查登录状态，未登录跳转到登录页
- **嵌套路由**：`/user/settings/profile` 和 `/user/settings/password` 共用同一个 UserLayout 组件
- **路由懒加载**：首页只需加载首页的代码，详情页的代码在点击时才下载 -- 减少首屏加载时间

面试中"Vue Router 的原理"也是高频题。核心答案：Vue Router 监听 URL 变化（HTML5 History API 或 Hash），根据路由配置匹配到对应组件，通过 `<router-view>` 渲染出来。整个过程是 JS 层面的，不触发浏览器刷新。
:::

:::task{title="动手试试"}
::::step{purpose="路由的 / 路径映射到首页组件。router-view 作为内容出口，根据 URL 决定显示哪个页面。这就是单页应用的基础结构。" expected="访问根路径 / 时显示曲目列表。"}
创建 Home 页面组件（曲目列表 + 筛选），配置路由 `/` 指向它
::::

::::step{purpose="动态路由 /piece/:id 让 URL 携带参数。route.params.id 读取参数，同一路由匹配所有曲目。同一个 Detail 组件，不同 id 显示不同内容。" expected="点击列表中某个曲目，跳转到 /piece/xxx 并显示该曲目的完整信息。"}
创建 Detail 页面组件，配置动态路由 `/piece/:id`，在组件中用 useRoute 读取 id
::::

::::step{purpose="完整的应用通常有 3-4 个页面。静态路由最简单，路径和组件一一对应。" expected="点击导航中的「关于」，显示关于页，URL 变为 /about。"}
创建 About 页面组件，配置路由 `/about`
::::

::::step{purpose="router-link 替代 a 标签实现无刷新导航，router-view 作为内容出口。验证页面切换时没有白屏刷新。" expected="顶部有导航栏，点击不同链接切换页面，页面切换流畅无白屏。"}
在 App.vue 中添加 `<router-link>` 导航和 `<router-view>` 出口
::::

::::step{purpose="编程式导航用于 JS 代码中的跳转。router.push 跳转并添加历史记录，router.back 返回上一页。" expected="在详情页点击「返回列表」按钮，能回到首页。"}
在详情页添加返回按钮，用 useRouter().back() 实现返回
::::
:::

:::hint{title="路由配置速查"}
```js
// 基本路由
{ path: '/about', component: About }

// 动态路由
{ path: '/piece/:id', component: Detail }   // route.params.id

// 命名路由（用于编程式导航）
{ path: '/piece/:id', name: 'detail', component: Detail }
router.push({ name: 'detail', params: { id: 'moonlight' } })

// 懒加载（推荐，减小首屏体积）
{ path: '/about', component: () => import('../views/About.vue') }

// props 传参
{ path: '/piece/:id', component: Detail, props: true }
// 组件中直接用 defineProps({ id: String }) 接收
```
:::

:::recap
你学会了 Vue Router -- 定义路由规则（`routes` 数组），用 `<router-link>` 实现无刷新导航，用 `<router-view>` 作为页面内容的出口，用动态路由（`/:id`）匹配同类页面，用 `useRoute()` 读取路由参数，用 `useRouter()` 进行编程式导航（push、back）。路由让单页应用有了多页面的体验 -- URL 变了，内容变了，但页面没有白屏刷新。
:::

# Vue 指令 -- 模板的执行记号

:::analogy
Vue 指令就像遥控器上的按钮 -- 每个按钮控制一种功能：v-if 控制"显示或不显示"，v-for 控制"重复几次"，v-bind 控制"连接到哪个数据"。你不需要打开电视机壳手动接线，按遥控器就够了。
:::

:::explain{title="问题：原生 JS 操作 DOM 的体力活"}
假设你要做一个音乐列表页面：根据时期筛选、显示列表、切换播放器可见性。看看原生 JS 需要写多少代码：

```js
// 原生 JS：每一步都要手动找到元素，手动更新
const list = document.getElementById('track-list')
list.innerHTML = ''  // 先清空

tracks.filter(t => t.period === 'classical').forEach(track => {
  const div = document.createElement('div')
  div.className = 'track-card'
  div.innerHTML = `
    <img src="${track.cover}" alt="${track.title}">
    <h3>${track.title}</h3>
    <p>${track.artist}</p>
  `  // 手动拼接 HTML 字符串 -- 容易出错，没有语法高亮
  list.appendChild(div)
})

// 切换播放器可见性
const player = document.getElementById('player')
if (showPlayer) {
  player.style.display = 'block'
} else {
  player.style.display = 'none'
}
```

每次数据变化，你都要**手动**找到 DOM 元素，**手动**更新内容。光一个列表渲染就要写十几行代码。三个页面？六个列表？重复劳动量爆炸，而且容易遗漏某个更新点，导致页面和数据不一致。
:::

:::explain{title="方案：Vue 指令 -- 在 HTML 里直接写逻辑"}
Vue 指令是以 `v-` 开头的特殊属性，写在 HTML 标签上。每个指令做一件事，组合起来替代你在 JS 里的体力活。下面是同样的功能用 Vue 指令实现：

```vue
<script setup>
import { ref } from 'vue'

const tracks = ref([                          // 音乐列表数据
  { id: 1, title: '月光', artist: '德彪西', cover: 'img/moon.png', period: 'classical' },
  { id: 2, title: '四季', artist: '维瓦尔第', cover: 'img/seasons.png', period: 'baroque' },
])
const showPlayer = ref(false)                 // 控制播放器可见性
</script>

<template>
  <!-- 用 v-for 渲染列表，一行替代原生 JS 的十几行 -->
  <div v-for="track in tracks" :key="track.id" class="track-card">
    <img :src="track.cover" :alt="track.title">   <!-- :src 是 v-bind:src 的简写 -->
    <h3>{{ track.title }}</h3>
    <p v-if="track.artist">{{ track.artist }}</p>   <!-- v-if：有艺术家才显示 -->
  </div>

  <!-- v-show：切换播放器可见性，一行替代原生 JS 的 if-else -->
  <div v-show="showPlayer" class="player">播放器控件</div>
</template>
```

逐行解读：
- 第 15 行 `v-for="track in tracks"` -- 遍历数组，每次循环变量叫 `track`，自动为每个元素生成一份 DOM
- 第 15 行 `:key="track.id"` -- 给每个循环项一个唯一标识，Vue 用它追踪 DOM 复用，没有 key 或 key 不唯一会导致更新错乱
- 第 16 行 `:src` -- 冒号是 `v-bind:` 的简写，把 JS 变量的值绑定到 HTML 属性上
- 第 18 行 `v-if="track.artist"` -- 只有当 `track.artist` 有值时，`<p>` 元素才创建；值为空时，这个元素根本不在 DOM 里
- 第 21 行 `v-show="showPlayer"` -- `showPlayer` 为 false 时元素还在 DOM 中，只是加了 `display: none`；为 true 时去掉隐藏样式
:::

:::explain{title="v-bind -- 把 JS 数据连到 HTML 属性上"}
```html
<!-- 完整写法 -->
<img v-bind:src="imageUrl">
<a v-bind:href="'/user/' + userId">用户</a>
<div v-bind:class="{ active: isActive }">内容</div>

<!-- 简写 :  -- 工作中几乎都用简写 -->
<img :src="imageUrl">
<a :href="'/user/' + userId">用户</a>
<div :class="{ active: isActive }">内容</div>
<div :style="{ color: textColor, fontSize: size + 'px' }">内容</div>
```

`:class` 接受对象语法：`{ 'class名': 布尔值 }` -- 布尔值为 true 时加上这个 class，false 时去掉。`:style` 同样接受对象：`{ css属性: 值 }`。

和 `{{ }}` 文本插值的区别：
- `{{ expression }}` -- 把值插入到**标签内容**中：`<p>{{ message }}</p>`
- `v-bind:attr` / `:attr` -- 把值绑定到 **HTML 属性**上：`<img :src="url">`
:::

:::explain{title="v-if / v-show -- 控制元素的生死和显隐"}
```html
<!-- v-if 系列：条件为 false 时，元素从 DOM 中移除（不渲染） -->
<div v-if="status === 'loading'">加载中...</div>
<div v-else-if="status === 'error'">出错了！</div>
<div v-else-if="status === 'empty'">没有数据</div>
<div v-else>内容：{{ result }}</div>

<!-- v-show：元素始终在 DOM 中，只是切换 display:none -->
<div v-show="isVisible">这段文字可以快速切换显示/隐藏</div>
```

**v-if vs v-show 怎么选：**

| | v-if | v-show |
|---|---|---|
| 机制 | 移除 / 创建 DOM 元素 | 切换 CSS `display:none` |
| 初始渲染 | 条件 false 时完全不渲染 | 始终渲染到 DOM 里 |
| 切换开销 | 大（销毁重建 + 生命周期重新跑） | 小（只改一个 CSS 属性） |
| 适用场景 | 条件很少改变（如 tab 切换、权限判断） | 频繁切换（如弹窗、折叠面板、播放器） |

**原生 JS 对比：**
```js
// 原生 JS 实现 v-if -- 条件渲染
if (status === 'loading') {
  showElement('#loading-spinner')     // 手动创建和插入 DOM
  hideElement('#content')
} else {
  hideElement('#loading-spinner')     // 手动移除 DOM
  showElement('#content')
}

// 原生 JS 实现 v-show -- 显示隐藏
document.getElementById('player').style.display = isVisible ? 'block' : 'none'
```
:::

:::explain{title="v-for -- 列表渲染，遍历一切"}
```html
<!-- 遍历数组：item in items -->
<ul>
  <li v-for="item in items" :key="item.id">
    {{ item.name }} -- {{ item.price }} 元
  </li>
</ul>

<!-- 带索引 (item, index) -- index 从 0 开始 -->
<li v-for="(item, index) in items" :key="item.id">
  {{ index + 1 }}. {{ item.name }}
</li>

<!-- 遍历对象 (value, key, index) -->
<li v-for="(value, key) in composer" :key="key">
  {{ key }}: {{ value }}
</li>

<!-- 遍历数字范围 -->
<span v-for="n in 5" :key="n">第 {{ n }} 个</span>
```

`:key` 的重要性：`key` 是 Vue 识别每个列表节点的唯一 ID。没有 key 或 key 用 index：
- 列表重排、插入、删除时 DOM 复用会错乱
- 组件状态会串位（输入框里的内容跑到别的行）
- 过渡动画会失效

**永远用唯一的业务 ID 做 key，不要用 index 做 key**（除非列表是静态的、永不排序）。
:::

:::explain{title="v-html / v-text -- 原始 HTML 和纯文本"}
```html
<!-- v-html：把字符串当作 HTML 渲染 -->
<!-- ⚠️ 安全警告：只有在你 100% 信任内容来源时才用！用户输入绝不能用 v-html -->
<div v-html="trustedHtmlContent"></div>

<!-- v-text：等价于 {{ }}，设置元素的文本内容 -->
<span v-text="message"></span>
<!-- 等价于 -->
<span>{{ message }}</span>
```

**原生 JS 对比：**
```js
// 原生 JS 的 innerHTML（对应 v-html）
document.getElementById('preview').innerHTML = trustedHtml

// 原生 JS 的 textContent（对应 v-text / {{ }}）
document.getElementById('title').textContent = message
```
:::

:::example{title="综合示例 -- 指令组合拳"}
下面是真实场景中指令的组合使用。一个音乐列表，带时期筛选和播放器切换：

```vue
<script setup>
import { ref, computed } from 'vue'

// 列表数据
const tracks = ref([
  { id: 1, title: '月光', artist: '德彪西', period: 'classical', liked: true },
  { id: 2, title: '四季-春', artist: '维瓦尔第', period: 'baroque', liked: false },
  { id: 3, title: '夜曲', artist: '肖邦', period: 'romantic', liked: true },
])

const activePeriod = ref('all')     // 当前筛选的时期
const showPlayer = ref(false)       // 播放器可见性

// computed 自动计算筛选结果（下一课详细讲）
const filtered = computed(() => {
  if (activePeriod.value === 'all') return tracks.value
  return tracks.value.filter(t => t.period === activePeriod.value)
})
</script>

<template>
  <!-- 筛选按钮栏 -->
  <button
    v-for="period in ['all', 'classical', 'baroque', 'romantic']"
    :key="period"
    :class="{ active: activePeriod === period }"   <!-- 动态切换 active class -->
    @click="activePeriod = period"
  >
    {{ period === 'all' ? '全部' : period }}
  </button>

  <!-- 列表渲染 -->
  <div v-if="filtered.length === 0" class="empty">
    暂无匹配项目                         <!-- 空状态提示 -->
  </div>
  <div v-for="track in filtered" :key="track.id" class="track-card">
    <h3>{{ track.title }}</h3>
    <p v-if="track.artist">{{ track.artist }}</p>       <!-- 有艺术家才显示 -->
    <span :class="['tag', 'tag-' + track.period]">      <!-- 动态拼接 class -->
      {{ track.period }}
    </span>
    <span>{{ track.liked ? '❤️' : '🤍' }}</span>         <!-- 三元表达式 -->
  </div>

  <!-- 播放器 -- v-show 频繁切换 -->
  <div v-show="showPlayer" class="player">
    <p>正在播放: {{ filtered[0]?.title }}</p>
  </div>
  <button @click="showPlayer = !showPlayer">
    {{ showPlayer ? '关闭' : '打开' }}播放器
  </button>
</template>

<style scoped>
.active { background: #42b883; color: white; }   /* 选中按钮高亮 */
.empty { color: #999; padding: 40px; text-align: center; }
.tag { font-size: 12px; padding: 2px 8px; border-radius: 4px; }
.tag-classical { background: #e8f5e9; }
.tag-baroque { background: #fff3e0; }
.tag-romantic { background: #fce4ec; }
</style>
```
:::

:::explain{title="常见错误"}
**错误 1：v-if 和 v-for 用在同一个元素上**
```html
<!-- ❌ v-if 和 v-for 同级时，v-if 先执行但拿不到 v-for 的变量 -->
<li v-for="item in items" v-if="item.active" :key="item.id">

<!-- ✅ 用 computed 先过滤数据，再 v-for 渲染 -->
<li v-for="item in activeItems" :key="item.id">
```

**错误 2：:key 用 index**
```html
<!-- ❌ 列表排序、插入删除时，key 错位导致渲染错乱 -->
<li v-for="(item, index) in items" :key="index">

<!-- ✅ 用唯一的业务 ID -->
<li v-for="item in items" :key="item.id">
```

**错误 3：v-if 和 v-show 用反了**
```html
<!-- ❌ 频繁切换的弹窗用 v-if -- 每次都要销毁重建 -->
<div v-if="showModal" class="modal">

<!-- ✅ 频繁切换用 v-show -- 只改 CSS，性能好 -->
<div v-show="showModal" class="modal">

<!-- ❌ 几乎不变的权限判断用 v-show -- 无权限时元素还在 DOM 里 -->
<div v-show="isAdmin" class="admin-panel">

<!-- ✅ 状态不变用 v-if -- 无权限时元素根本不在 DOM 里 -->
<div v-if="isAdmin" class="admin-panel">
```

**错误 4：`{{ }}` 里写了复杂逻辑**
```html
<!-- ❌ 模板里塞了太多 JS 逻辑，可读性差 -->
<p>{{ items.filter(i => i.price > 100).map(i => i.name).join(', ') }}</p>

<!-- ✅ 用 computed 把逻辑移到 <script> 里，模板只放变量名 -->
<p>{{ expensiveNames }}</p>
```
:::

:::explain{title="实际工作连接"}
在任何 Vue 项目的任何 `.vue` 文件中，`<template>` 里 90% 以上的代码都在用这些指令。v-bind 连接数据与属性，v-if/v-show 控制条件渲染，v-for 循环渲染列表。掌握了这五个指令，你就掌握了 Vue 模板 80% 的日常操作。

实际项目举例：电商商品列表页 -- `v-for` 渲染商品卡片，`:key` 用商品 ID，`:src` 绑定商品图片，`v-if` 判断是否有优惠标签，`v-show` 切换筛选侧栏。所有这些指令在同一个页面里协同工作。
:::

:::task{title="动手试试"}
::::step{purpose="数据驱动渲染：修改 JS 中的数组，v-for 自动更新 DOM。你不需要像原生 JS 那样手动 createElement 和 appendChild -- Vue 替你做了这一切。" expected="筛选按钮栏中出现一个新按钮「印象派」，点击后能够筛选出对应时期的项目。"}
修改 filterButtons 数组 -- 添加一个「印象派」筛选选项
::::

::::step{purpose="添加数据后 v-for 自动渲染新条目。这验证了响应式系统的关键特性：列表渲染完全由数据驱动。" expected="项目列表底部出现你新添加的两个项目卡片，格式与已有卡片一致。"}
在 tracks 数组中添加两个你自己喜欢的项目
::::

::::step{purpose="v-if 根据条件决定 DOM 元素是否存在。空状态提示是用户体验的基本要求 -- 筛选结果为空时不应该是空白，而应该友好地告诉用户。" expected="选择某个没有项目的时期时，显示「暂无匹配项目」的提示。"}
用 v-if 添加「暂无匹配项目」的空状态提示
::::

::::step{purpose="v-show 切换是纯 CSS 级别的，适合频繁操作。播放器这种需要快速响应的地方用 v-show 比 v-if 体验更好。" expected="一个播放状态指示器，可以通过按钮控制显示/隐藏，切换流畅即时。"}
用 v-show 实现一个播放状态切换的指示器
::::

::::step{purpose="(track, index) 让你同时拿到元素值和下标。index+1 显示为人类友好的序号。:key 始终用业务 ID，不要用 index。" expected="每张卡片前显示带有序号的标签（1. 2. 3. ...），修改筛选条件后序号能正确反映新列表顺序。"}
挑战：用 v-for="(track, index)" 给每张卡片前加上序号，并为每个元素指定稳定的 :key
::::
:::

:::recap
你学会了 Vue 的核心指令体系 -- `v-bind`（简写 `:`）绑定属性，`v-if`/`v-show` 控制显示隐藏（一个移 DOM、一个改 CSS），`v-for` 循环渲染列表并始终用唯一 ID 做 `:key`，`v-html`/`v-text` 处理原始 HTML 和纯文本。这些指令让模板自己拥有"执行"能力，替代了原生 JS 中繁琐的 `querySelector` + `innerHTML` + `appendChild` 体力活。
:::

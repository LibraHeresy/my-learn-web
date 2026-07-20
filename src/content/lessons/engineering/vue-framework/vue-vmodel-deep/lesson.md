# v-model 深入 -- 双向绑定的"自动同步线"

:::analogy
v-model 就像两个人牵着一根绳子走路 -- 一个人往左，绳子带动另一个人也往左；一个人往右，另一个也跟着右。表单输入框就是这个绳子：用户在输入框里打字（视图变化），数据跟着变；代码里改了数据，输入框里的文字也跟着变。两边始终保持一致。
:::

:::explain{title="问题：原生 JS 表单开发的重复劳动"}
用原生 JS 做一个简单的表单：输入框里打字，下面实时显示，提交后把内容加到列表里。

```js
// HTML:
// <input id="name-input">
// <p id="preview"></p>
// <button id="submit-btn">提交</button>
// <ul id="list"></ul>

const input = document.getElementById('name-input')
const preview = document.getElementById('preview')
const submitBtn = document.getElementById('submit-btn')
const list = document.getElementById('list')

// 同步 1：输入框变化 → 更新预览
input.addEventListener('input', (e) => {
  preview.textContent = e.target.value     // 手动获取输入值，手动更新 DOM
})

// 同步 2：点击提交 → 加入列表，清空输入框
submitBtn.addEventListener('click', () => {
  const value = input.value.trim()
  if (!value) return

  const li = document.createElement('li')
  li.textContent = value
  list.appendChild(li)

  // 同步 3：清空输入框 → 也要清空预览！
  input.value = ''
  preview.textContent = ''                 // 又手动更新一次！
})
```

核心痛点：**表单输入和数据是两条独立的轨道**。你需要手动：
1. 从 input 读取值（`e.target.value`）
2. 更新数据变量
3. 更新其他显示这个值的 DOM 元素

每多一个需要同步的地方，就多一行手动 DOM 操作。漏掉一个，数据就不一致。
:::

:::explain{title="方案：v-model -- 一条指令搞定双向同步"}
`v-model` 是 Vue 的**语法糖** -- 它把"数据到视图"和"视图到数据"两条路合并成一条指令：

```vue
<script setup>
import { ref } from 'vue'

const name = ref('')              // 数据
</script>

<template>
  <!-- v-model 一条指令同时做了两件事 -->
  <input v-model="name" placeholder="输入曲名">

  <!-- 等价于 -->
  <input
    :value="name"                  <!-- 1. 数据 → 视图：name 的值显示在输入框 -->
    @input="name = $event.target.value"  <!-- 2. 视图 → 数据：用户输入更新 name -->
  >

  <p>你输入了：{{ name }}</p>     <!-- 自动同步，实时显示 -->
</template>
```

逐行解读：
- 第 8 行 `v-model="name"` -- 一条指令完成双向绑定：输入框的值和 `name` 变量始终保持同步
- 第 11-14 行 -- `v-model` 拆开来看就是 `:value` + `@input`，两个方向的自动同步
- 第 13 行 `$event.target.value` -- `$event` 是 Vue 模板中事件对象的默认变量名，`$event.target` 就是触发事件的 DOM 元素
- 第 16 行 `{{ name }}` -- 用户在输入框里打字，`name` 实时变化，这里实时更新 -- 不需要一行 JS 来手动同步

**原生 JS vs v-model 对比：**
```js
// 原生 JS：一个输入框需要这么多代码来同步
input.addEventListener('input', (e) => {
  name = e.target.value
  document.getElementById('preview').textContent = name
})

// Vue：一行模板代码就够了
<input v-model="name">
```
:::

:::example{title="v-model 适配所有表单元素"}
v-model 很智能，它知道不同表单元素该监听什么事件、读取什么属性：

```vue
<script setup>
import { ref } from 'vue'

// 各种表单数据
const text = ref('')              // 文本输入
const checked = ref(false)        // 单个复选框 -- 绑定布尔值
const picked = ref('')            // 单选按钮 -- 绑定字符串值
const selected = ref('')          // 下拉选择 -- 绑定选中的 option value
const multiChecked = ref([])      // 多个复选框 -- 绑定数组
</script>

<template>
  <!-- 1. 文本输入 (input / textarea) -->
  <input type="text" v-model="text" placeholder="输入曲名">
  <textarea v-model="text"></textarea>       <!-- textarea 也用 v-model，不是 {{ }} -->
  <p>文本：{{ text }}</p>

  <!-- 2. 单个复选框 -- true/false -->
  <label>
    <input type="checkbox" v-model="checked">
    {{ checked ? '❤️ 已收藏' : '🤍 未收藏' }}
  </label>

  <!-- 3. 单选按钮 -- 绑定选中的值 -->
  <label><input type="radio" v-model="picked" value="classical"> 古典</label>
  <label><input type="radio" v-model="picked" value="baroque"> 巴洛克</label>
  <label><input type="radio" v-model="picked" value="romantic"> 浪漫</label>
  <p>选中：{{ picked }}</p>

  <!-- 4. 下拉选择 -->
  <select v-model="selected">
    <option disabled value="">请选择时期</option>   <!-- disabled 让占位选项不可选 -->
    <option value="classical">古典</option>
    <option value="baroque">巴洛克</option>
    <option value="romantic">浪漫</option>
  </select>
  <p>选中：{{ selected }}</p>

  <!-- 5. 多个复选框 -- 绑定数组，选中的 value 加到数组里 -->
  <label><input type="checkbox" v-model="multiChecked" value="piano"> 钢琴</label>
  <label><input type="checkbox" v-model="multiChecked" value="violin"> 小提琴</label>
  <label><input type="checkbox" v-model="multiChecked" value="cello"> 大提琴</label>
  <p>选择的乐器：{{ multiChecked.join('、') }}</p>
</template>
```

逐行解读：
- 第 19 行 -- `<textarea>` 不能用 `{{ }}` 插值，要用 `v-model`
- 第 24 行 -- 单个 checkbox 的 v-model 是布尔值，勾选 = `true`，取消 = `false`
- 第 29-31 行 -- radio 组共享同一个 `v-model="picked"`，每个 radio 的 `value` 属性决定选中时 `picked` 的值
- 第 36 行 -- `<select>` 的 v-model 绑定在 select 元素上，不是 option 上
- 第 37 行 `<option disabled value="">` -- `disabled` 让这个选项不可选，`value=""` 是空字符串（和 null 不同，空字符串是合法的选项值）
- 第 46-48 行 -- 多个 checkbox 的 v-model 绑定到同一个数组，选中的 value 会被 push 进数组，取消会被移除
:::

:::explain{title="v-model 修饰符 -- 精确控制行为"}
修饰符是 `v-model` 后面用 `.` 连接的小尾巴，用来改变默认行为：

```vue
<script setup>
import { ref } from 'vue'

const lazyText = ref('')
const age = ref('')
const title = ref('')
</script>

<template>
  <!-- .lazy：不在 input 事件时更新，在 change 事件时（失焦/回车）更新 -->
  <!-- 默认行为：每按一个键就同步一次 -->
  <!-- .lazy 行为：等用户输入完、离开输入框时才同步 -->
  <input v-model.lazy="lazyText" placeholder="等你说完再记录">
  <p>lazy 值：{{ lazyText }}</p>

  <!-- .number：自动把输入转成数字 -->
  <!-- 默认行为：输入框的值永远是字符串 -->
  <!-- .number：Vue 尝试用 parseFloat 转成数字，转不了就保持字符串 -->
  <input v-model.number="age" type="number" placeholder="年龄">
  <p>年龄 + 10 = {{ age + 10 }}</p>     <!-- 如果是字符串会变成 "2510" 而非 35 -->

  <!-- .trim：自动去除首尾空格 -->
  <input v-model.trim="title" placeholder="标题（会自动去空格）">
  <p>标题长度：{{ title.length }}</p>  <!-- 首尾空格不算 -->
</template>
```

**三个修饰符对比原生 JS：**
```js
// .lazy 等价于：在 change 事件而非 input 事件中更新
input.addEventListener('change', (e) => {
  lazyText.value = e.target.value
})

// .number 等价于：手动转换
input.addEventListener('input', (e) => {
  age.value = parseFloat(e.target.value) || e.target.value
})

// .trim 等价于：手动去除空格
input.addEventListener('input', (e) => {
  title.value = e.target.value.trim()
})
```
:::

:::example{title="实战：一个完整的音乐添加表单"}
```vue
<script setup>
import { ref, computed } from 'vue'

// 表单数据
const name = ref('')               // 曲名
const composer = ref('')           // 作曲家
const period = ref('')             // 时期（下拉选择）
const liked = ref(false)           // 是否收藏（复选框）

const pieces = ref([])             // 曲目列表

// computed: 表单是否有效（至少填了曲名）
const isFormValid = computed(() => {
  return name.value.trim().length > 0 &&        // .trim 移除首尾空格
         composer.value.trim().length > 0 &&
         period.value !== ''                    // 选了时期
})

// 提交表单
function addPiece() {
  if (!isFormValid.value) {
    alert('请填写所有必填项')
    return
  }

  // 添加到列表
  pieces.value.push({
    id: Date.now(),
    name: name.value.trim(),           // 也去一下空格
    composer: composer.value.trim(),
    period: period.value,
    liked: liked.value,
  })

  // 重置表单 -- 直接给 ref 的 .value 赋值新值
  name.value = ''
  composer.value = ''
  period.value = ''
  liked.value = false
  // 输入框会自动清空 -- 因为 v-model 绑定了这些变量！
}
</script>

<template>
  <form @submit.prevent="addPiece">              <!-- .prevent 阻止表单默认提交刷新页面 -->
    <div>
      <label>曲名：</label>
      <input v-model.trim="name" placeholder="请输入曲名">    <!-- .trim 自动去空格 -->
    </div>

    <div>
      <label>作曲家：</label>
      <input v-model.trim="composer" placeholder="请输入作曲家">
    </div>

    <div>
      <label>时期：</label>
      <select v-model="period">
        <option disabled value="">请选择时期</option>
        <option value="classical">古典</option>
        <option value="baroque">巴洛克</option>
        <option value="romantic">浪漫</option>
      </select>
    </div>

    <div>
      <label>
        <input type="checkbox" v-model="liked">
        直接加入收藏
      </label>
    </div>

    <!-- :disabled 绑定 computed，表单不合法时按钮禁用 -->
    <button type="submit" :disabled="!isFormValid">添加曲目</button>
  </form>

  <!-- 表单下方的实时预览 -->
  <div v-if="name || composer" class="preview">
    <h3>预览：</h3>
    <p>曲名：{{ name || '（未填写）' }}</p>
    <p>作曲家：{{ composer || '（未填写）' }}</p>
    <p>时期：{{ period || '（未选择）' }}</p>
    <p>收藏：{{ liked ? '是' : '否' }}</p>
  </div>

  <!-- 已添加的曲目列表 -->
  <h3>曲目列表（{{ pieces.length }} 首）：</h3>
  <div v-for="p in pieces" :key="p.id">
    {{ p.name }} - {{ p.composer }} ({{ p.period }}) {{ p.liked ? '❤️' : '' }}
  </div>
</template>
```

逐行解读：
- 第 15-18 行 `isFormValid` computed -- 自动判断表单是否填写完整，依赖三个 v-model 变量
- 第 22-37 行 `addPiece` -- 提交时读取所有 v-model 变量的值，创建新条目，然后重置变量（输入框自动清空）
- 第 42 行 `@submit.prevent` -- `.prevent` 是事件修饰符，阻止 `<form>` 的默认提交行为（刷新页面）
- 第 44 行 `v-model.trim` -- 输入时自动去首尾空格，用户不小心打了空格也不影响
- 第 66 行 `:disabled="!isFormValid"` -- 表单不合法时按钮灰色不可点，computed 的值驱动 UI 状态
- 第 71-76 行 -- 实时预览区域：利用 v-model 的实时同步，用户打一个字下面就实时更新
:::

:::explain{title="常见错误"}
**错误 1：textarea 用 {{ }} 插值而不是 v-model**
```html
<!-- ❌ textarea 不能用 {{ }} -->
<textarea>{{ content }}</textarea>

<!-- ✅ textarea 和 input 一样用 v-model -->
<textarea v-model="content"></textarea>
```

**错误 2：select 的 v-model 挂在 option 上**
```html
<!-- ❌ v-model 应该放在 select 上，不是 option 上 -->
<select>
  <option v-model="selected" value="a">A</option>
</select>

<!-- ✅ v-model 放在 select 上 -->
<select v-model="selected">
  <option value="a">A</option>
</select>
```

**错误 3：修改 ref 时没通过 .value**
```js
const name = ref('')

// ❌ 这样写 name 变成了空字符串，不再是响应式 ref
name = ''

// ✅ 通过 .value 修改
name.value = ''
```

**错误 4：type="number" 的 input 忘了 .number 修饰符**
```html
<!-- ❌ 即使 type="number"，v-model 得到的仍然是字符串 -->
<input type="number" v-model="age">
<!-- age.value 是 "25" 不是 25，age + 1 = "251" 而不是 26 -->

<!-- ✅ 加 .number 修饰符 -->
<input type="number" v-model.number="age">
<!-- age.value 是数字 25，age + 1 = 26 -->
```
:::

:::explain{title="实际工作连接"}
在实际的 Vue 项目中，几乎每个页面都有表单：登录表单、搜索表单、评论输入、用户设置、商品编辑... v-model 是这些表单开发的起点。一个成熟的表单组件库（如 Element Plus 的 el-input、Vuetify 的 v-text-field）底层都基于 v-model 机制。

大型项目中的表单可能包含十几个字段，如果用原生 JS 你需要手动管理每个 `input` 事件、每个 `value` 属性。v-model 让这变得尽可能简单 -- 一行指令替代四行原生代码。

面试中"v-model 的原理是什么"是高频题。标准答案：它是 `:value` 和 `@input` 的语法糖，Vue 根据不同的表单元素类型自动选择正确的事件和属性。
:::

:::task{title="动手试试"}
::::step{purpose="v-model 是 Vue 提供的双向绑定语法糖：一条指令同时做 :value（数据→视图）和 @input（视图→数据）。表单输入、数据更新、视图刷新 -- 一条龙自动完成。" expected="在输入框中输入内容，下方实时显示输入的数据；提交后新项目添加到列表中。"}
添加项目表单：曲名、作曲家、时期 -- 都用 v-model 绑定
::::

::::step{purpose="v-model 不仅适用于文本，也适用于 select、checkbox、radio。选中的值自动同步到响应式变量，配合 computed 实现实时筛选。" expected="从下拉框选择不同时期，项目列表自动过滤显示。"}
用 v-model + select 绑定选中的时期，配合 computed 筛选列表
::::

::::step{purpose="v-model 对 checkbox 的处理很智能：单个 checkbox 绑定布尔值（true/false）。这里用复选框的 true/false 切换收藏状态。" expected="勾选/取消收藏复选框，页面上的收藏状态图标实时切换。"}
用 checkbox + v-model 实现收藏/取消收藏功能
::::

::::step{purpose=".trim 和 .number 修饰符让数据更干净。能在源头处理的问题不要留到后面再修。" expected="输入框前后加了空格，提交后自动去除；年龄输入框的值是数字类型。"}
给曲名输入框加 .trim，给数值输入框加 .number，测试效果
::::
:::

:::recap
你学会了 v-model 双向绑定 -- 表单输入框和 JS 数据自动同步，一条指令同时完成数据到视图（`:value`）和视图到数据（`@input`）的绑定。文本、复选框、单选、下拉框都有对应的 v-model 用法，`.lazy`、`.number`、`.trim` 修饰符让你精确控制同步行为。这是 Vue 表单开发的基础。
:::

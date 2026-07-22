# JS 模块化 — 把代码分成独立文件管理

:::analogy
一个 5000 行的 JS 文件就像一个 100 人的公司，所有人挤在一间办公室里，没有部门、没有分工。修个 bug 要从人群里找出一个人——可怕。模块化就是给公司分部门：销售部（渲染）、技术部（数据处理）、财务部（工具函数），每个部门有自己的办公室和明确的职责。
:::

:::explain{title="问题：一个巨型文件的四大灾难"}
假设你在做一个音乐搜索页面，所有功能写在一个 `app.js` 里。500 行的时候还好，到了 2000 行，问题爆发：

**灾难 1：变量名打架**
```js
// 第 50 行：搜索结果的数组
let results = []
// 第 800 行：忘了前面用过 results，又声明了一次
let results = []  // 覆盖了上面的 results，搜索功能悄悄坏了
```

**灾难 2：找 bug 像大海捞针**
搜索功能出 bug 了。问题是：`formatDate` 函数在哪？在第 300 行定义的，在第 1200 行被调用。你需要在这个文件里来回滚屏——10 分钟过去了，还没找到。

**灾难 3：想复用一段代码？复制粘贴**
另一个项目也需要 `formatDate` 函数。你打开旧项目的 `app.js`，翻到第 300 行，复制，粘贴到新项目。一周后你发现两个项目的 `formatDate` 行为不同——因为在新项目里改过，旧项目没改。

**灾难 4：团队协作是噩梦**
你和同事同时改 `app.js`。你改了第 200-300 行（搜索逻辑），他改了第 800-1000 行（播放器逻辑）。合并代码时，你俩互相看不懂对方改了什么——因为所有东西混在一个文件里。
:::

:::explain{title="解决方案：按职责拆分成独立模块"}
模块化的核心原则：**一个文件只做一件事。**

把上面的巨型 `app.js` 拆开来：

```text
之前：app.js (2000 行)
      什么都干——搜索 + 渲染 + 格式化 + 数据请求

之后：
api.js              ← 只负责请求数据（fetch 相关）
render.js           ← 只负责操作 DOM（创建元素、更新页面）
utils.js            ← 只负责通用工具函数（格式化日期、防抖）
app.js              ← 主入口，引入上面三个文件，组装起来
```

现在修搜索 bug？打开 `api.js`。渲染出问题了？打开 `render.js`。每个文件不超过 100 行，职责清晰。

**模块化的两个关键技术：export（把东西给出去）和 import（把东西拿进来）。**
:::

:::example{title="逐行拆解：从巨型文件到四个干净模块"}
以下是一个音乐搜索器的完整模块化过程。每个文件的每一行都有注释。

**第一步：utils.js — 通用工具（和音乐无关，任何项目都能用）**

```js
// utils.js — 所有通用工具函数都在这里

// export：把这个函数"发布"出去，其他文件才能 import 它
export function formatDate(date) {
  return date.toLocaleDateString('zh-CN')   // 把 Date 对象变成 "2024/1/15" 格式
}

// 一个文件可以 export 多个东西
export function truncateText(text, maxLength) {
  if (text.length <= maxLength) return text  // 如果够短，直接返回
  return text.slice(0, maxLength) + '...'    // slice 截取前 maxLength 个字符，后面加 ...
}

// app.js 将引用这个常量来拼接 API 地址
export const API_URL = 'https://itunes.apple.com/search'
```

**第二步：api.js — 数据请求（只关心"怎么拿数据"）**

```js
// api.js — 所有的网络请求逻辑都在这里

// import：从 utils.js 拿 API_URL
// 花括号 {} 表示"命名导入"——只拿 API_URL 这一个东西
import { API_URL } from './utils.js'

// export async function：导出异步函数，其他文件 import 后可以 await 它
export async function searchTracks(keyword) {
  // encodeURIComponent 处理中文和特殊字符，防止 URL 断裂
  // 如 "周杰伦" → "%E5%91%A8%E6%9D%B0%E4%BC%A6"
  const query = encodeURIComponent(keyword)

  // 拼接完整 URL，template literal（反引号）让字符串拼接更清晰
  const url = API_URL + '?term=' + query + '&limit=20'

  // fetch 发送网络请求，await 等待响应回来
  const response = await fetch(url)

  // response.json() 把返回的 JSON 字符串转成 JS 对象
  const data = await response.json()

  // 返回结果数组（调用方只需要 data.results）
  return data.results
}
```

**第三步：render.js — DOM 操作（只关心"怎么在页面上显示"）**

```js
// render.js — 所有 DOM 操作都在这里

// import 工具函数
import { formatDate, truncateText } from './utils.js'

// 导出渲染函数，接收数据和容器元素
export function renderTracks(tracks, container) {
  // 如果没数据，显示提示文字后返回（提前退出）
  if (!tracks || tracks.length === 0) {
    container.innerHTML = '<p>没有找到结果</p>'
    return
  }

  // map 将每条数据转换成一个 HTML 卡片字符串
  // join('') 把数组里的所有字符串粘在一起（不加分隔符）
  container.innerHTML = tracks.map(track => {
    // 解构赋值：从 track 对象里一次取出 4 个属性
    const { trackName, artistName, artworkUrl100, releaseDate } = track

    // 返回模板字符串——一行 HTML 卡片
    return `
      <div class="track-card">
        <img src="${artworkUrl100}" alt="${trackName}封面" />
        <h3>${truncateText(trackName, 30)}</h3>
        <p class="artist">${artistName}</p>
        <p class="date">${formatDate(new Date(releaseDate))}</p>
      </div>
    `
  }).join('')  // .map() 返回数组，.join('') 合成一个字符串
}
```

**第四步：app.js — 主入口（组装所有模块，不自己干活）**

```js
// app.js — 程序的"调度中心"，不自己做具体工作

// import 从各个模块拿需要的函数
// 没有花括号 = 默认导入（但这里全都是命名导入所以都有花括号）
import { searchTracks } from './api.js'
import { renderTracks } from './render.js'

// 拿到页面元素
const input = document.querySelector('#search-input')
const results = document.querySelector('#results')

// 监听用户输入
input.addEventListener('input', async (event) => {
  const keyword = event.target.value          // 获取输入框里的文字
  if (keyword.trim() === '') {               // trim() 去掉首尾空格
    results.innerHTML = ''                    // 没输入内容就清空结果
    return
  }
  const tracks = await searchTracks(keyword)  // 调用 api.js 的函数获取数据
  renderTracks(tracks, results)               // 调用 render.js 的函数显示数据
})
```

**关键对比：**

维护旧代码（巨型文件）：你知道 `formatDate` 可能在任何位置，没有线索。
维护新代码（模块化）：`formatDate` 里有 bug？打开 `utils.js`，直接找到 `export function formatDate`。3 秒定位。
:::

:::hint{title="最常见的 3 个 import/export 错误"}
**错误 1：默认导入 vs 命名导入，花括号用反了**

```js
// utils.js
export default function formatDate(date) { ... }  // 默认导出（没有花括号）

// app.js
import { formatDate } from './utils.js'  // 错误！默认导出不要花括号
import formatDate from './utils.js'      // 正确！默认导入不加花括号

// --- 反过来也一样 ---
// utils.js
export function formatDate(date) { ... }  // 命名导出

// app.js
import formatDate from './utils.js'       // 错误！命名导出需要花括号
import { formatDate } from './utils.js'   // 正确！
```

记住：`export default` → `import xxx`（无花括号）。`export`（命名） → `import { xxx }`（有花括号）。

**错误 2：相对路径写错**

```js
import { API_URL } from 'utils.js'       // 错误！缺少 ./
import { API_URL } from './utils.js'     // 正确——同一个文件夹
import { API_URL } from '../utils.js'    // 正确——上一级文件夹
```

`./` 表示"当前文件夹"，`../` 表示"上一级文件夹"。不加前缀的会被当成 npm 包名（如 `import { ref } from 'vue'`）。

**错误 3：忘了 export，然后困惑为什么 import 失败**

写了 `function searchTracks()` 但前面没有 `export`，其他文件 `import` 时得到 `undefined`。规则：**不 export 的东西是私有的，外面看不到。**
:::

:::explain{title="现实工作连接：真实项目的模块数量"}
- 一个中等规模的 Vue 项目通常有 **50-200 个 .js/.vue 文件**，每个文件不到 200 行
- 组件文件夹（components）里每个组件一个文件：`MusicCard.vue`、`SearchBar.vue`、`Player.vue`
- 工具函数按类别拆成多个文件：`utils/format.js`（格式化）、`utils/validate.js`（校验）、`utils/storage.js`（本地存储）
- 面试常考题："一个 .js 文件最长应该多少行？"标准答案：**没有硬性规定，但超过 300 行就该考虑拆分了**

模块化不是"锦上添花"，是你项目超过 3 个功能后必须采用的代码组织方式。
:::

:::task{title="把一个单文件应用拆成模块"}
::::step{purpose="在动手拆分之前，先建立正确的文件夹结构。utils/ 放工具函数，modules/ 放业务模块——清晰的目录结构就是最好的文档。" expected="VS Code 文件树中能看到 my-music-app/src/js/utils/ 和 my-music-app/src/js/modules/ 两个文件夹。"}
创建模块目录结构

在你的 `my-music-app` 项目中（用 VS Code 终端）：

```bash
cd src
mkdir -p js/utils
mkdir -p js/modules
```

确认目录结构：
```bash
ls js
```
应该看到 `utils` 和 `modules` 两个子文件夹。
::::

::::step{purpose="formatDate 和 truncateText 是通用工具——它们不操作 DOM，不发网络请求，只是纯数据处理。所以放在 utils/ 里，以后其他项目也能复用。" expected="在浏览器控制台或 Node.js 中能调用 formatDate(new Date())，返回中文日期格式。"}
创建 `utils.js` 导出工具函数

在 `src/js/utils/` 中创建 `helpers.js`，写入：

```js
// src/js/utils/helpers.js — 每行都有注释
export function formatDate(date) {
  // toLocaleDateString 根据浏览器语言自动格式化日期
  return date.toLocaleDateString('zh-CN')
}

export function truncateText(text, maxLength) {
  if (text.length <= maxLength) return text   // 够短就原样返回
  return text.slice(0, maxLength) + '...'     // 截断并加省略号
}
```

在 VS Code 中保存文件（`Ctrl+S`）。
::::

::::step{purpose="命名导出是更常见的选择——一个模块里通常有多个函数，每个都需要被外部使用。export 放在函数声明前面即可。" expected="api.js 文件保存无报错，searchTracks 和 getTrackById 两个函数前面都有 export 关键字。"}
创建 `api.js` 导出数据请求函数

在 `src/js/modules/` 中创建 `api.js`，写入：

```js
// src/js/modules/api.js
import { API_URL } from '../utils/helpers.js'   // 从 utils 引入常量（等一下添加）

export async function searchTracks(keyword) {
  const url = API_URL + '?term=' + encodeURIComponent(keyword) + '&limit=20'
  const res = await fetch(url)                    // 发请求
  const data = await res.json()                   // 解析 JSON
  return data.results                             // 只返回结果数组
}

export async function getTrackById(id) {
  const url = API_URL + '?term=' + id + '&limit=1'
  const res = await fetch(url)
  const data = await res.json()
  return data.results[0]                          // 只返回第一条
}
```
::::

::::step{purpose="导入时花括号里写什么，取决于导出时写了什么。命名导出必须有花括号，默认导出不能用花括号。练完这个你就不会再搞混了。" expected="所有 import 语句都能正确引用对应的导出。"}
创建 `app.js` 导入所有模块并组装

在 `src/js/modules/` 中创建 `app.js`，写入：

```js
// src/js/modules/app.js — 主入口文件
// 从 api.js 导入（命名导入，需要花括号）
import { searchTracks } from './api.js'
// 命名导入可以起别名——避免名字冲突
import { renderTracks as render } from './render.js'  // 暂不创建 render.js，演示语法

// 测试：调用导入的函数
searchTracks('周杰伦').then(results => {
  console.log('搜索结果：', results.length + ' 条')
})
```

关键语法对比：
- `import { x } from './a.js'` — 导入 a.js 里命名的 x（最常见）
- `import { x as y } from './a.js'` — 导入 x 但改名叫 y（避免冲突）
- `import * as a from './a.js'` — 把 a.js 所有导出打包成一个对象
- `import x from './a.js'` — 导入 a.js 的默认导出（无花括号）
::::

::::step{purpose="ES6 模块在浏览器里需要 type='module' 属性，否则 import 语句会报语法错误。这是新手最常见的踩坑点。" expected="浏览器控制台没有报错，能看到搜索结果数量。"}
在 HTML 中引入模块入口

打开 `src/index.html`，在 `<body>` 中添加：

```html
<!-- type="module" 告诉浏览器：这个 JS 文件用了 import/export -->
<!-- 没有 type="module"，浏览器会把 import 当成语法错误 -->
<script type="module" src="./js/modules/app.js"></script>
```

注意：模块只能从入口文件引入（这里是 `app.js`），不需要在 HTML 里逐个引入 `api.js`、`utils.js` 等——`app.js` 里的 `import` 会自动加载它们。
::::
:::

:::recap
模块化 = 把一个大文件按职责拆成小文件，每个文件只做一件事。`export` 把函数/变量发布出去，`import` 把它们引入进来。命名导出用花括号 `{ }`，默认导出不用。`./` 开头表示相对路径，不加前缀表示 npm 包。一个真实项目通常有 50-200 个模块文件。
:::

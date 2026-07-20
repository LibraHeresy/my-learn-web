# 异步篇结业 — 音乐搜索器

:::analogy
前 9 节你积攒了异步编程的全部技能点。这一节是把它们编织成一个完整作品——就像把乐高零件拼成一架完整的飞机。完成后你会惊喜地发现：自己已经能写出真正有用的功能了。
:::

:::prerequisite
**本节你需要用到前面学过的所有技能：**

- **async/await**：处理异步流程
- **fetch**：调用外部 API
- **API 封装**：统一管理请求
- **防抖（debounce）**：优化搜索体验
- **UI 状态管理**：loading / error / empty / success
- **localStorage**：持久化搜索历史
:::

## 1. 我们要做什么

一个完整的音乐搜索应用。用户输入关键词，应用调用 iTunes Search API，展示搜索结果。

**功能清单：**
1. 搜索框：用户输入关键词，防抖 400ms 后发起搜索
2. 搜索结果：展示歌曲名、歌手、专辑、封面图片
3. 三种状态：加载中（loading 动画）、搜索失败（错误+重试）、无结果（"换个关键词试试"）
4. 搜索历史：最近 5 次搜索关键词存 localStorage，点击历史可快速搜索

**实际工作中你会用这个来：**
这个项目就是初级前端工程师日常工作的缩影——对接真实 API、处理异步流程、管理 UI 状态、优化用户体验。面试时你说"我用过 fetch"，不如说"我独立完成了一个搜索应用，包含防抖、状态管理、错误处理"。
:::

:::explain{title="iTunes Search API —— 免费、公开、无需注册"}
Apple 提供的免费音乐搜索 API：

```
https://itunes.apple.com/search?term=周杰伦&limit=10&country=cn
```

| 参数 | 含义 | 示例 |
|------|------|------|
| `term` | 搜索关键词（支持中文） | `周杰伦` |
| `limit` | 返回条数（最大 200） | `10` |
| `country` | 国家/地区代码 | `cn`（中国）、`us`（美国） |
| `media` | 媒体类型 | `music`、`movie`、`podcast` |

**返回的 JSON 结构（关键字段）：**
```json
{
  "resultCount": 10,
  "results": [
    {
      "trackName": "七里香",             // 歌曲名
      "artistName": "周杰伦",            // 歌手名
      "collectionName": "七里香",        // 专辑名
      "artworkUrl100": "https://...",    // 封面图（100x100）
      "previewUrl": "https://...",       // 试听链接（30秒）
      "trackViewUrl": "https://..."      // Apple Music 链接
    }
  ]
}
```
:::

:::example{title="代码架构——四层清晰分工"}
不要把所有代码塞在一个文件里。好的架构让每层职责明确：

```
用户输入
  │
  ▼
searchInput.addEventListener('input')    ← ① UI 层：监听用户操作
  │
  ▼
const debouncedSearch = debounce(handler, 400)  ← ② 防抖层：控制请求频率
  │
  ▼
const results = await api.searchMusic(keyword)  ← ③ API 层：封装网络请求
  │
  ▼
updateState(results); render()                  ← ④ 状态层：管理 UI 状态
```

**api.js —— API 封装层：**
```js
// api.js：所有网络请求的统一入口
var BASE_URL = 'https://itunes.apple.com'

function buildSearchURL(keyword) {
  var params = new URLSearchParams({     // 安全构建查询参数
    term: keyword,                        // 搜索关键词
    limit: 20,                            // 返回 20 条
    country: 'cn',                        // 中国市场
    media: 'music'                        // 只搜音乐
  })
  return BASE_URL + '/search?' + params
}

export async function searchMusic(keyword) {
  var url = buildSearchURL(keyword)       // 构建完整 URL
  var response = await fetch(url)         // 发请求

  if (!response.ok) {
    throw new Error('搜索失败（' + response.status + '）')
  }

  var data = await response.json()        // 解析 JSON
  return data.results                     // 只返回 results 数组
}
```

**debounce.js —— 防抖层：**
```js
// debounce.js：防抖函数
export function debounce(fn, delay) {
  var timer = null                        // 闭包变量——关键！
  return function() {
    clearTimeout(timer)                   // 取消上次的等待
    var context = this
    var args = arguments
    timer = setTimeout(function() {
      fn.apply(context, args)            // 延迟后执行
    }, delay)
  }
}
```

**app.js —— 主逻辑：**
```js
// app.js：串联所有模块
import { searchMusic } from './api.js'
import { debounce } from './debounce.js'

// ① 状态管理
var state = {
  loading: false,
  error: null,
  keyword: '',
  results: []
}

// ② 渲染函数
function render() {
  var app = document.querySelector('#app')

  if (state.loading) {
    // 加载中
    app.innerHTML = '<div class="loading"><div class="spinner"></div><p>正在搜索...</p></div>'
    return
  }

  if (state.error) {
    // 出错了
    app.innerHTML = '<div class="error"><p>' + state.error + '</p><button onclick="doSearch()">重试</button></div>'
    return
  }

  if (state.results.length === 0 && state.keyword) {
    // 搜索无结果
    app.innerHTML = '<div class="empty"><p>没有找到"<strong>' + state.keyword + '</strong>"的相关歌曲</p><p>换个关键词试试？</p></div>'
    return
  }

  if (!state.keyword && state.results.length === 0) {
    // 初始状态——还没搜索
    app.innerHTML = '<div class="welcome"><p>输入歌手名或歌曲名开始搜索</p></div>'
    return
  }

  // 正常渲染结果
  var html = '<ul class="results">'
  html += state.results.map(function(item) {
    return '<li class="result-item">'
      + '<img src="' + item.artworkUrl100 + '" alt="' + item.trackName + '" />'
      + '<div class="info">'
      + '<h3>' + item.trackName + '</h3>'
      + '<p>' + item.artistName + '</p>'
      + '<p class="album">' + item.collectionName + '</p>'
      + '</div>'
      + '</li>'
  }).join('')
  html += '</ul>'
  app.innerHTML = html
}

// ③ 搜索执行函数
async function doSearch() {
  var keyword = document.querySelector('#search-input').value.trim()

  if (!keyword) {
    state.keyword = ''
    state.results = []
    render()
    return
  }

  state.loading = true; state.error = null; state.keyword = keyword; state.results = []
  render()

  try {
    var results = await searchMusic(keyword)     // 调用 API 层
    state.loading = false
    state.results = results
    render()

    // 保存搜索历史到 localStorage
    saveSearchHistory(keyword)

  } catch (err) {
    state.loading = false
    state.error = err.message || '搜索失败，请稍后重试'
    render()
  }
}

// ④ 防抖包装——400ms 后才真正搜索
var debouncedSearch = debounce(doSearch, 400)

// ⑤ 绑定事件
document.querySelector('#search-input').addEventListener('input', debouncedSearch)

// ⑥ 搜索历史（localStorage）
function saveSearchHistory(keyword) {
  var history = JSON.parse(localStorage.getItem('searchHistory')) || []
  // 去重：如果已存在就删掉旧的
  history = history.filter(function(k) { return k !== keyword })
  // 加到最前面
  history.unshift(keyword)
  // 只保留最近 5 条
  history = history.slice(0, 5)
  // 保存
  localStorage.setItem('searchHistory', JSON.stringify(history))
  // 重新渲染历史列表
  renderHistory()
}

function renderHistory() {
  var history = JSON.parse(localStorage.getItem('searchHistory')) || []
  var el = document.querySelector('#search-history')
  if (history.length === 0) {
    el.innerHTML = ''
    return
  }
  el.innerHTML = '<p>最近搜索：</p>' + history.map(function(k) {
    return '<button class="history-item" onclick="searchFromHistory(\'' + k + '\')">' + k + '</button>'
  }).join('')
}

function searchFromHistory(keyword) {
  document.querySelector('#search-input').value = keyword
  doSearch()                                 // 直接搜索，不走防抖
}

// ⑦ 启动
render()
renderHistory()
```
:::

:::explain{title="技能检查清单 —— 看看你掌握了什么"}
这个项目里，你实际用到了前面 9 节学到的几乎所有内容：

| 技能 | 在项目中的体现 | 对应章节 |
|------|---------------|----------|
| Event Loop | 理解为什么防抖的 setTimeout 按顺序执行 | 异步-事件循环 |
| Promise | `searchMusic` 返回 Promise，`.then()` 处理结果 | 异步-Promise |
| async/await | `doSearch` 用 async/await 编写异步流程 | 异步-async/await |
| fetch | `searchMusic` 用 fetch 调用 iTunes API | 异步-fetch |
| API 封装 | `api.js` 统一管理 BASE_URL 和请求逻辑 | 异步-API客户端 |
| 防抖 | `debouncedSearch` 包装搜索，400ms 防抖 | 异步-防抖搜索 |
| UI 状态管理 | `state` 对象 + `render()` 管理 loading/error/empty/success | 异步-UI状态 |
| localStorage | 搜索历史存取，`JSON.parse` + `|| []` 模式 | 工作流-localStorage |
| URLSearchParams | 安全构建 API 查询参数，自动编码中文 | 异步-fetch |
| try/catch | API 调用和搜索执行都带错误处理 | 错误处理 |
:::

:::explain{title="这个项目如何证明你的能力"}
面试官问"你有什么项目经验"时，你可以说：

**"我独立完成了一个音乐搜索应用。用户输入歌手名后经过防抖处理调用 Apple iTunes API，实现了 loading/错误/空结果/正常展示四种状态切换。搜索历史用 localStorage 持久化。项目用了模块化架构：API 层封装网络请求，防抖层控制调用频率，状态层管理 UI。"**

这一句话包含的技术点：fetch、async/await、防抖、状态管理、localStorage、模块化——这些正是初级前端岗位最常要求的能力。
:::

## 3. 常见错误

**错误 1：把所有代码写在一个函数里**

```js
// ❌ 一个巨型函数——维护和理解都很困难
async function search() {
  // 50 行代码：防抖 + fetch + 状态管理 + 渲染 + localStorage 全混在一起
}

// ✅ 分层——每层职责清晰
// api.js  → 只管网络请求
// debounce.js → 只管防抖
// state.js → 只管状态
// render.js → 只管渲染
// app.js → 串联所有模块
```

**错误 2：结果为空时显示"加载失败"**

```js
// ❌ 搜索无结果时显示错误信息
if (results.length === 0) {
  showError('搜索失败')                    // 误导用户——不是失败，是没找到
}

// ✅ 区分"请求失败"和"没有匹配结果"
if (results.length === 0) {
  showEmpty('没有找到"' + keyword + '"的相关歌曲')  // 正确——告诉用户真相
}
```

**错误 3：忘记在搜索前清空旧结果**

```js
// ❌ 搜索"周杰伦"完成后，又搜"无效关键词xxx"——旧结果还残留在页面上
async function doSearch() {
  state.loading = true
  // 忘记清空 error 和 results！
  render()
  // 如果这次搜索失败（catch），页面还显示着上次的结果+这次的 loading
}

// ✅ 每次搜索前重置全部状态
async function doSearch() {
  state.loading = true
  state.error = null                      // 清掉上次的错误
  state.results = []                      // 清掉上次的结果
  state.keyword = ''                      // 清掉上次的关键词
  render()
  // ...
}
```

:::task{title="动手实现 —— 你的结业项目"}
::::step{purpose="API 封装是工程化的第一步——把 network 细节隐藏在 api 模块里，调用者只需传入关键词就能获得结果。这是真实项目中所有后端对接的标准做法。" expected="调用 searchMusic('周杰伦') 返回数组，每条包含 trackName、artistName、artworkUrl100、collectionName。"}
创建 `api.js`，实现 `searchMusic(keyword)`：
- 用 `URLSearchParams` 构建查询参数（term、limit=20、country=cn、media=music）
- 用 fetch 调用 iTunes Search API
- 检查 response.ok
- 返回 data.results

测试：在控制台调用 `searchMusic('周杰伦')`，确认返回正确的歌曲数组
::::

::::step{purpose="防抖是搜索功能的标配——将'每次按键都发请求'变成'停止输入后才发一次'。这直接决定了用户体验的好坏。" expected="快速输入'周杰伦'，只在停止输入 400ms 后触发一次搜索请求。Network 面板只看到一条请求。"}
创建 `debounce.js`，实现防抖函数（闭包 + setTimeout/clearTimeout）。在 app.js 中用防抖包装搜索处理函数（delay=400ms）
::::

::::step{purpose="四种状态是完整搜索体验的骨架。用户搜索时能看到 loading 动画、搜不到时有空状态提示、网络出错时有错误信息+重试按钮。一个都不能少。" expected="搜索'周杰伦'：loading → 结果列表。搜索'asdjfklasjdf'：loading → 空状态。断网搜索：loading → 错误+重试。初始状态（没搜过）：欢迎提示。"}
在 `app.js` 中实现完整的状态管理：
1. `state = { loading, error, keyword, results }`
2. `render()` 函数：loading → error → empty(无结果) → welcome(初始) → 正常渲染
3. `doSearch()`：重置状态 → render → fetch → 更新状态 → render
4. 验证四种状态都正确显示
::::

::::step{purpose="搜索历史让应用更实用——用户不必记住刚才搜过的关键词。localStorage 保证刷新后历史不丢失。这是真实产品里的常见功能。" expected="搜索 6 个不同关键词后，历史列表显示最近 5 个。刷新页面，历史依然存在。点击历史按钮直接搜索。"}
实现搜索历史功能：
1. 每次搜索成功后，将关键词存入 localStorage（去重、限制 5 条）
2. 页面加载时读取并渲染历史列表
3. 点击历史关键词直接搜索（不走防抖）

验证：搜索多个关键词，刷新页面，历史依然显示。点击历史按钮可快速搜索
::::

:::

:::hint{title="实现路线图"}
按这个顺序做，每步可独立验证：

```
1. api.js          ← 先让 fetch 能跑通，console.log 验证数据
2. debounce.js     ← 独立测试防抖函数（用 console.log 即可）
3. state + render  ← 不接真实 API，用假数据测试四种状态
4. doSearch()      ← 串联 api + state + render
5. 事件绑定        ← input 事件 + 防抖包装
6. 搜索历史        ← localStorage 读写 + 渲染
7. 美化 + 边界处理 ← 空输入保护、特殊字符、网络错误
```

**每一层做完后独立测试，不要等到所有代码写完再调试。**
:::

:::recap
这是异步篇的结业项目——你把前 9 节学到的所有技能整合到了同一个应用中：用 fetch 调用真实 API、用 async/await 编写异步流程、用防抖优化搜索频率、用状态对象管理四种 UI 状态、用 localStorage 持久化搜索历史。项目采用模块化架构，每层职责清晰。这个项目直接对标初级前端岗位的要求——面试时你可以说："我独立完成了一个音乐搜索应用，包含 API 封装、防抖、状态管理和数据持久化。"你已经不是"学过这些概念"了，而是"用这些技能做出过作品"。
:::

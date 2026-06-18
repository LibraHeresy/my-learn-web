# 异步篇结业 — 音乐搜索器

::music-analogy
合奏篇的最后一课：把你学到的所有"合奏技能"——Promise、async/await、fetch、错误处理、防抖——整合成一个完整的作品。就像一场室内乐的终曲，每个人都要把自己的声部完美地融入合奏。
::

::explain{title="我们做什么"}
我们来做一个**音乐搜索器**，整合合奏篇学到的全部技能：
1. 用户输入搜索关键词
2. 调用 iTunes Search API（免费公开 API）
3. 用防抖优化搜索体验
4. 展示搜索结果（歌曲名、歌手、封面）
5. 错误处理（网络故障、无结果）
> 🎯 这是你在"合奏篇"旅程的终点。你会惊喜地发现：你已经能写出真正有用的功能了。
::

::example{title="iTunes Search API"}
Apple 提供了免费的音乐搜索 API，无需注册：
```
https://itunes.apple.com/search?term=贝多芬&limit=10&country=cn
```
返回的 JSON 结构：
```json
{
  "resultCount": 10,
  "results": [
    {
      "trackName": "月光奏鸣曲",
      "artistName": "贝多芬",
      "artworkUrl100": "封面图片URL",
      "previewUrl": "试听URL",
      "collectionName": "专辑名"
    }
  ]
}
```
::

::task{title="动手实现 ✨"}
:::step{purpose="这是你第一次对接真实的外部 API——iTunes Search API 免费且无需注册。封装成 searchMusic 函数后，调用者只需传入关键词就能获得搜索结果，底层 fetch+JSON 解析的细节被隐藏起来。API 封装是工程化的第一步。" expected="searchMusic(\"贝多芬\") 返回一个包含 10 首曲目的数组，每首有 trackName、artistName、artworkUrl100 等字段。"}
封装 API 请求函数 searchMusic(term)：用 fetch 调用 iTunes Search API，处理 response.ok，返回 data.results
:::

:::step{purpose="防抖让\"每次输入都发请求\"变成\"停止输入 400ms 后才发一次请求\"。这是搜索功能的标配——既减少了网络请求次数，又避免了返回顺序错乱的问题（后发的请求可能先返回）。" expected="快速连续输入\"贝\"→\"多\"→\"芬\"，只在停止输入 400ms 后才触发一次搜索请求。"}
实现 debounce 函数（利用闭包 + setTimeout/clearTimeout），包装搜索输入事件
:::

:::step{purpose="这是合奏篇的终曲——你把分散的技巧编织成完整的作品。用户输入 + 防抖等待 + API 调用 + 结果展示，四个环节层层衔接。完成后你会惊讶：自己已经能写出真正有用的功能了。" expected="输入关键词后，页面展示搜索结果：歌曲名、歌手名、封面图片。网络故障或无结果时显示友好的错误提示。"}
组合搜索框、防抖、API 调用、结果渲染、加载状态、错误提示——形成一个完整的搜索体验
:::

::

::hint{title="实现路线图"}
1. **先写 API 层** — 在 `api.js` 中封装 `searchMusic` 函数
2. **再写防抖** — 在 `debounce.js` 中实现防抖
3. **组合使用** — 在 `App.vue` 中用 `import` 引入
4. **处理状态** — loading、error、no results 三种状态
5. **展示结果** — 歌曲名、歌手、封面图
完成的代码结构应该像这样清晰分层：
```用户输入 → debounce 等待 → api.searchMusic() → 更新 UI
```
::

::explain{title="回顾你的成长"}
合奏篇结束，回顾你学会的技能：
| 技能 | 应用 |
|------|------|
| ES6 语法 | 解构、箭头函数、模板字符串 |
| 错误处理 | try/catch 保护 API 调用 |
| Event Loop | 理解异步执行顺序 |
| Promise | .then()/.catch() 链式处理 |
| async/await | 清晰的异步代码 |
| fetch | 与服务器通信 |
| API 封装 | 统一的请求模块 |
| 防抖 | 优化搜索体验 |
下一步：登台篇。你将学习用工程化工具（npm、Vite、Vue）搭建专业项目。准备好了吗？
::

::listen-to
维瓦尔第《四季·春》— 一个完整的协奏曲乐章，独奏与合奏交替，结构清晰、旋律优美。你的音乐搜索器也应该有这种"完整感"——输入、搜索、展示，一气呵成。
::


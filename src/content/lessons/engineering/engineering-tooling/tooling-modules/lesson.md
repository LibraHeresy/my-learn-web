# JS 模块化 — 把代码分成声部管理

:::music-analogy
管弦乐总谱不会把所有音符挤在一行——第一小提琴、第二小提琴、中提琴、大提琴各有自己的谱表。模块化就是给你的代码分声部：一个文件管搜索（search.js），一个文件管渲染（render.js），一个文件管数据（store.js）。每个模块有自己的职责，通过 import/export 像不同声部之间的对话一样协作。
:::

:::explain{title="为什么需要模块化？"}
早期的网页开发中，所有 JS 代码写在一个文件里——几百行甚至上千行。随着项目变大，问题来了：
- 变量名冲突（两个函数都想用 name 这个变量）
- 代码难以维护（找一个 bug 要翻几千行）
- 无法复用（想在新项目里用某个功能，得从旧文件里复制粘贴）
模块化解决了这些问题：
```text
// 之前：一个巨大的 script.js
script.js (800 行)
// 之后：按职责分成小文件
utils.js        ← 工具函数（格式化日期、编码等）
api.js          ← 网络请求
render.js       ← 渲染页面
app.js          ← 主入口，引入其他模块
```
就像一个 100 人的乐团不会挤在一张谱台上——每个人有自己的分谱（模块），总谱（入口文件）告诉指挥各声部如何配合。
:::

:::explain{title="export — 两种导出方式"}
ES Modules 提供两种导出方式：
**1. 命名导出（Named Export）** — 一个模块可以导出多个东西：
```js
// utils.js — 导出多个工具函数
export function formatDate(date) {
  return date.toLocaleDateString('zh-CN')
}
export const API_BASE = 'https://api.example.com'
export function debounce(fn, delay) {
  let timer
  return (...args) => {
    clearTimeout(timer)
    timer = setTimeout(() => fn(...args), delay)
  }
}
```
**2. 默认导出（Default Export）** — 一个模块只导出一个主角：
```js
// search.js — 这个文件的主角就是 searchMusic
export default async function searchMusic(keyword) {
  const res = await fetch(API_BASE + '/search?q=' + keyword)
  return res.json()
}
```
每个模块只能有一个 default export。
> 🎻 命名导出像乐团里的多个乐手（各有其名），默认导出像首席小提琴——这个模块的代言人。
:::

:::explain{title="import — 引入其他模块"}
**导入命名导出：** 用花括号 `{}` 精确指定要导入什么
```js
// 按需导入
import { formatDate, debounce } from './utils.js'
// 重命名（避免命名冲突）
import { debounce as deb } from './utils.js'
// 全部导入到一个命名空间
import * as utils from './utils.js'
utils.formatDate(new Date())
```
**导入默认导出：** 不用花括号，名字可以自己取
```js
import searchMusic from './search.js'
// 名字可以自己定，但建议和导出保持一致
```
**混合导入：**
```js
import searchMusic, { API_BASE } from './search.js'
```
**npm 包的导入：** (不需要 ./ 或 ../ 前缀)
```js
import { ref, computed } from 'vue'
import axios from 'axios'
```
**注意：** `.js` 后缀在 Vite/Vue 项目中可以省略，在纯浏览器 ESM 中必须写。
:::

:::example{title="看例子"}
假设你在做一个音乐搜索器，模块化之后项目结构是这样的：
```js
// 项目结构：
// music-searcher/
// ├── index.html
// ├── js/
// │   ├── app.js        ← 主入口（组装所有模块）
// │   ├── api.js        ← 封装 fetch 请求
// │   ├── render.js     ← 负责渲染 DOM
// │   └── utils.js      ← 通用工具（防抖、格式化）

// api.js — 只负责数据
export async function searchMusic(keyword) {
  const res = await fetch(
    'https://itunes.apple.com/search?term=' + encodeURIComponent(keyword) + '&limit=10'
  )
  return res.json()
}

// render.js — 只负责 DOM
export function renderResults(data, container) {
  container.innerHTML = data.results.map(item => `
    <div class="card">
      <img src="${item.artworkUrl100}" />
      <h3>${item.trackName}</h3>
    </div>
  `).join('')
}

// app.js — 组装一切
import { searchMusic } from './api.js'
import { renderResults } from './render.js'
import { debounce } from './utils.js'

const input = document.querySelector('#search')
const results = document.querySelector('#results')

input.addEventListener('input', debounce(async (e) => {
  const data = await searchMusic(e.target.value)
  renderResults(data, results)
}, 400))
```
每个文件职责单一——修改渲染逻辑不会影响 API 代码，反之亦然。
:::

:::task{title="动手试试 ✨"}
在本地 VS Code 中练习（这是 local 模式课程）：
1. 创建一个 music-searcher 文件夹，在其中创建 api.js、render.js、app.js 三个文件
2. 在 api.js 中 export 一个 searchMusic 函数（用到 fetch）
3. 在 render.js 中 export 一个 renderResults 函数（创建 DOM 元素）
4. 在 app.js 中 import 这两个函数，组装成完整的搜索功能
5. 练习：尝试用 default export 改写 api.js，看 import 语法有什么变化
6. 练习：尝试 import * as 的方式，对比按需导入的区别
:::

:::recap
你学会了用 import/export 把代码拆成多个模块——一个文件管数据，一个文件管渲染，一个文件是入口。每个文件只负责一件事，通过导入导出像不同声部一样协作，代码更清晰也更易复用。
:::

:::listen-to
本杰明·布里顿《青少年管弦乐队指南》— 一段主题由不同乐器组依次演奏，每个乐器组（模块）独立展示自己的音色（功能），最后由整个乐队合奏（import 整合）。完美的模块化示范！
:::

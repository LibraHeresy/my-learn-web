// ============================================================
// 编辑器预置代码配置
// 每个课程/项目的初始代码模板
// 由脚本自动生成
// ============================================================
import type { UserCode } from '../types'

// 编辑器预置代码映射表
// key: 课程 ID 或 项目 ID+'-step-'+步骤索引
export const starterCodes: Record<string, UserCode> = {
  'async-api-client': {
    html: ``,
    css: ``,
    js: `const BASE_URL = 'https://jsonplaceholder.typicode.com'

// TODO: 封装 api 对象
const api = {
  get: async (path) => {
    // 在这里实现
  }
}

// 测试你的 api
async function test() {
  const posts = await api.get('/posts')
  console.log('前2条数据：', posts?.slice(0, 2))
}
test()`,
  },
  'async-await': {
    html: ``,
    css: ``,
    js: `// 模拟 API（不要修改）
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

async function fetchConcert() {
  await delay(500)
  return { id: 'c001', title: '维也纳新年音乐会', place: '金色大厅' }
}

async function fetchProgram(concertId) {
  await delay(500)
  return { concertId, pieces: ['蓝色多瑙河', '拉德茨基进行曲'] }
}

// TODO: 实现 loadConcert 函数
async function loadConcert() {
  // 在这里写代码
}

// 测试
loadConcert().then(data => console.log('结果：', data))`,
  },
  'async-capstone': {
    html: ``,
    css: ``,
    js: ``,
  },
  'async-event-loop': {
    html: ``,
    css: ``,
    js: `console.log('A: 序曲')

setTimeout(() => console.log('C: 第二乐章'), 500)
setTimeout(() => console.log('D: 第三乐章'), 0)

console.log('B: 第一乐章')

// 你的预测顺序：_______
// 实际运行后，理解为什么是这个顺序`,
  },
  'async-fetch': {
    html: ``,
    css: ``,
    js: `// TODO: 完成 getPosts 函数，获取并返回前3条数据
async function getPosts() {
  // 在这里写代码
}

// 测试
getPosts()
  .then(posts => console.log('获取到的数据：', posts))
  .catch(err => console.log('出错了：', err.message))`,
  },
  'async-promise': {
    html: ``,
    css: ``,
    js: `// 模拟搜索函数（不要修改）
function searchMusic(keyword) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (keyword.length > 0) {
        resolve({ keyword, results: ['曲目A', '曲目B', '曲目C'] })
      } else {
        reject(new Error('搜索关键词不能为空'))
      }
    }, 800)
  })
}

// TODO: 用 .then() 和 .catch() 调用 searchMusic
`,
  },
  'async-search-debounce': {
    html: ``,
    css: ``,
    js: `// TODO: 实现 debounce 函数
function debounce(fn, delay = 300) {
  // 在这里写代码
}

// 模拟搜索 API
async function searchAPI(keyword) {
  console.log('🔍 发送搜索请求：' + keyword)
}

// 用 debounce 包装
const debouncedSearch = debounce(searchAPI, 500)

// 模拟快速连续输入
console.log('模拟用户输入"贝多芬"...')
debouncedSearch('贝')
debouncedSearch('贝多')
debouncedSearch('贝多芬')

// 你应该只看到一次 "🔍 发送搜索请求：贝多芬"
// （500ms 后）`,
  },
  'css-bg-border': {
    html: ``,
    css: ``,
    js: ``,
  },
  'css-box-model': {
    html: ``,
    css: ``,
    js: ``,
  },
  'css-cascade': {
    html: ``,
    css: ``,
    js: ``,
  },
  'css-centering': {
    html: ``,
    css: ``,
    js: ``,
  },
  'css-flexbox': {
    html: ``,
    css: ``,
    js: ``,
  },
  'css-font-spacing': {
    html: ``,
    css: ``,
    js: ``,
  },
  'css-grid': {
    html: ``,
    css: ``,
    js: ``,
  },
  'css-intro': {
    html: ``,
    css: ``,
    js: ``,
  },
  'css-layout-capstone': {
    html: ``,
    css: ``,
    js: ``,
  },
  'css-position': {
    html: ``,
    css: ``,
    js: ``,
  },
  'css-responsive': {
    html: ``,
    css: ``,
    js: ``,
  },
  'css-selectors': {
    html: ``,
    css: ``,
    js: ``,
  },
  'css-transitions': {
    html: ``,
    css: ``,
    js: ``,
  },
  'css-variables': {
    html: ``,
    css: ``,
    js: ``,
  },
  'html-audio-video': {
    html: `<h1>🎧 我的音乐播放器</h1>

<div class="player-box">
  <p>点击播放按钮，让网页发出声音：</p>

  <audio controls>
    <source src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" type="audio/mpeg">
    你的浏览器不支持音频播放
  </audio>

  <p class="note">这是 SoundHelix 生成的一段示例音乐。</p>
</div>`,
    css: `h1 {
  color: #8B2E2E;
  text-align: center;
}

.player-box {
  background: #FFFAF2;
  border: 2px solid #D4C5A9;
  border-radius: 12px;
  padding: 24px;
  text-align: center;
  max-width: 400px;
  margin: 20px auto;
}

.player-box audio {
  width: 100%;
  margin: 12px 0;
}

.note {
  font-size: 12px;
  color: #C9A96E;
}`,
    js: ``,
  },
  'html-capstone': {
    html: `<header>
  <h1>🎼 我的音乐主页</h1>
  <nav>
    关于我 | 音乐收藏 | 推荐曲目
  </nav>
</header>

<main>
  <section class="about">
    <h2>关于我</h2>
    <img src="https://oss.tan8.com/yuepuku/155/77798/77798_prev.jpg" alt="音乐家肖像" width="200">
    <p>你好！我是一名热爱<strong>古典音乐</strong>的学习者。从小学习钢琴，最喜欢在午后弹奏一首肖邦的夜曲。</p>
    <p>我相信音乐和代码有许多相似之处——<em>它们都是另一种语言</em>。</p>
  </section>

  <section class="collection">
    <h2>我的音乐收藏</h2>
    <p>以下是我最喜欢的几位作曲家：</p>

    <ul>
      <li>巴赫 — 巴洛克的数学之美</li>
      <li>莫扎特 — 古典的优雅与灵动</li>
      <li>肖邦 — 浪漫的诗意与忧伤</li>
    </ul>
  </section>

  <section class="playlist">
    <h2>本周曲目表</h2>
    <table>
      <thead>
        <tr>
          <th>作曲家</th>
          <th>曲目</th>
          <th>练习重点</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>巴赫</td>
          <td>C大调前奏曲 BWV 846</td>
          <td>手指独立性</td>
        </tr>
        <tr>
          <td>车尔尼</td>
          <td>练习曲 Op.599 No.45</td>
          <td>音阶流畅度</td>
        </tr>
        <tr>
          <td>肖邦</td>
          <td>降E大调夜曲 Op.9 No.2</td>
          <td>情感表达</td>
        </tr>
      </tbody>
    </table>
  </section>
</main>

<footer>
  <p>用音乐的方式学代码 — 代码乐章 © 2026</p>
  <p><a href="#">返回首页</a></p>
</footer>`,
    css: `header {
  background: #8B2E2E;
  color: #fff;
  padding: 24px 32px;
  text-align: center;
  border-radius: 8px;
}

header h1 {
  color: #fff;
  margin: 0;
}

header nav {
  margin-top: 12px;
  font-size: 14px;
  letter-spacing: 0.05em;
}

main {
  margin-top: 24px;
}

section {
  background: #FFFAF2;
  border: 1px solid #D4C5A9;
  border-radius: 10px;
  padding: 24px;
  margin-bottom: 20px;
}

section h2 {
  color: #8B2E2E;
  margin-top: 0;
  border-bottom: 2px solid #E8DCC8;
  padding-bottom: 8px;
}

.about img {
  border-radius: 8px;
  margin: 12px 0;
}

.collection ul {
  padding-left: 20px;
}

.collection li {
  margin: 6px 0;
  color: #3D2B1F;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 8px;
}

th, td {
  border: 1px solid #D4C5A9;
  padding: 10px 14px;
  text-align: left;
}

th {
  background: #8B2E2E;
  color: #fff;
}

tbody tr:nth-child(even) {
  background: #fff;
}

footer {
  text-align: center;
  padding: 24px;
  color: #C9A96E;
  font-size: 14px;
}

footer a {
  color: #8B2E2E;
}`,
    js: ``,
  },
  'html-div-span': {
    html: `<h1>作曲家画廊</h1>

<div class="card">
  <h2><span class="name">巴赫</span></h2>
  <p>时期：<span class="name">巴洛克</span></p>
  <p>代表作：《赋格的艺术》《勃兰登堡协奏曲》</p>
</div>

<div class="card">
  <h2><span class="name">肖邦</span></h2>
  <p>时期：浪漫主义</p>
  <p>代表作：《夜曲》《练习曲》</p>
</div>`,
    css: ``,
    js: ``,
  },
  'html-doc-structure': {
    html: `<h1>你好，音乐世界！</h1>

<!-- 这是一条HTML注释，不会显示在页面上 -->

<p>我了解了 HTML 文档的完整结构：</p>

<ul>
  <li>&lt;!DOCTYPE&gt; — 文档类型声明</li>
  <li>&lt;html&gt; — 整个页面的根</li>
  <li>&lt;head&gt; — 元信息（标题、编码等）</li>
  <li>&lt;body&gt; — 所有可见内容</li>
</ul>

<p>打开 F12 开发者工具，在 Elements 面板中查看完整页面结构！</p>`,
    css: `h1 {
  color: #8B2E2E;
  margin-bottom: 14px;
}

p {
  color: #3D2B1F;
  line-height: 1.6;
  margin-bottom: 10px;
}

ul {
  background: #FFFAF2;
  border: 1px solid #D4C5A9;
  border-radius: 8px;
  padding: 16px 28px;
}

li {
  color: #6B5A4E;
  margin: 6px 0;
  font-family: 'Fira Code', monospace;
  font-size: 14px;
}`,
    js: ``,
  },
  'html-emphasis': {
    html: `<h1>我的音乐故事</h1>
<p>我最喜欢的作曲家是<strong>肖邦</strong>。</p>
<p>他的夜曲<em>优美而忧伤</em>，<br>每次听都让我感动。</p>`,
    css: ``,
    js: ``,
  },
  'html-forms': {
    html: `<h1>🎵 音乐偏好调查</h1>

<form>
  <label for="name">你的名字：</label>
  <input type="text" id="name" placeholder="请输入你的名字">

  <label for="composer">最喜欢的作曲家：</label>
  <select id="composer">
    <option>请选择...</option>
    <option>巴赫</option>
    <option>莫扎特</option>
    <option>贝多芬</option>
    <option>肖邦</option>
  </select>

  <label for="comment">你想说的话：</label>
  <textarea id="comment" rows="3" placeholder="写下你对音乐的感受..."></textarea>

  <button type="submit">✨ 提交</button>
</form>`,
    css: `h1 {
  text-align: center;
  color: #8B2E2E;
}

form {
  max-width: 420px;
  margin: 20px auto;
  background: #FFFAF2;
  border: 2px solid #D4C5A9;
  border-radius: 12px;
  padding: 28px;
}

label {
  display: block;
  margin-top: 16px;
  margin-bottom: 4px;
  font-weight: 600;
  color: #3D2B1F;
}

input, select, textarea {
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #D4C5A9;
  border-radius: 6px;
  font-size: 14px;
  font-family: inherit;
  color: #3D2B1F;
  background: #fff;
}

input::placeholder, textarea::placeholder {
  color: #CCC5B5;
}

button {
  display: block;
  width: 100%;
  margin-top: 24px;
  padding: 12px;
  background: #8B2E2E;
  color: #fff;
  font-size: 16px;
  font-weight: 600;
  border: none;
  border-radius: 8px;
  cursor: pointer;
}

button:hover {
  background: #C94545;
}`,
    js: ``,
  },
  'html-images-links': {
    html: `<h1>肖邦</h1>
<img src="https://oss.tan8.com/yuepuku/155/77798/77798_prev.jpg" alt="作曲家肖像">
<p>
  了解更多，请访问
  <a href="https://zh.wikipedia.org/wiki/肖邦">肖邦的维基百科</a>
</p>`,
    css: ``,
    js: ``,
  },
  'html-input-types': {
    html: `<h1>音乐偏好调查</h1>

<form>
  <fieldset>
    <legend>基础信息</legend>
    <label>你的名字：<input type="text" name="name" placeholder="请输入名字"></label>
    <div class="range-row">
      <label>每天练琴时长：</label>
      <input type="range" id="practiceRange" min="0" max="120" value="30">
      <span id="rangeValue">30 分钟</span>
    </div>
  </fieldset>

  <fieldset>
    <legend>你的演奏水平</legend>
    <label class="radio-label"><input type="radio" name="level" value="beginner" checked> 🎵 入门级</label>
    <label class="radio-label"><input type="radio" name="level" value="intermediate"> 🎶 进阶级</label>
    <label class="radio-label"><input type="radio" name="level" value="advanced"> 🎼 专业级</label>
  </fieldset>

  <fieldset>
    <legend>你擅长的乐器（可多选）</legend>
    <label class="checkbox-label"><input type="checkbox" name="instrument" value="piano"> 🎹 钢琴</label>
    <label class="checkbox-label"><input type="checkbox" name="instrument" value="violin"> 🎻 小提琴</label>
    <label class="checkbox-label"><input type="checkbox" name="instrument" value="cello"> 🎻 大提琴</label>
    <label class="checkbox-label"><input type="checkbox" name="instrument" value="flute"> 🎵 长笛</label>
    <label class="checkbox-label"><input type="checkbox" name="instrument" value="voice"> 🎤 声乐</label>
  </fieldset>

  <button type="submit">✨ 提交</button>
</form>`,
    css: `h1 {
  text-align: center;
  color: #8B2E2E;
  margin-bottom: 20px;
}

form {
  max-width: 480px;
  margin: 0 auto;
}

fieldset {
  background: #FFFAF2;
  border: 1px solid #D4C5A9;
  border-radius: 10px;
  padding: 20px;
  margin-bottom: 16px;
}

legend {
  font-weight: 700;
  color: #8B2E2E;
  font-size: 15px;
  padding: 0 8px;
}

label {
  display: block;
  margin: 8px 0;
  color: #3D2B1F;
  font-size: 14px;
}

input[type="text"] {
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #D4C5A9;
  border-radius: 5px;
  font-size: 14px;
  font-family: inherit;
}

.range-row {
  display: flex;
  align-items: center;
  gap: 12px;
  margin: 12px 0;
}

.range-row label {
  margin: 0;
  white-space: nowrap;
}

.range-row input[type="range"] {
  flex: 1;
  accent-color: #8B2E2E;
}

#rangeValue {
  color: #8B2E2E;
  font-weight: 700;
  font-size: 14px;
  min-width: 50px;
}

.radio-label,
.checkbox-label {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 10px;
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.15s;
  margin: 4px 0 !important;
}

.radio-label:hover,
.checkbox-label:hover {
  background: #FFF8EC;
}

button {
  display: block;
  width: 100%;
  padding: 12px;
  background: #8B2E2E;
  color: #fff;
  font-size: 16px;
  font-weight: 600;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  margin-top: 8px;
}

button:hover {
  background: #C94545;
}`,
    js: `// 实时显示 range 滑块的值
let rangeEl = document.querySelector("#practiceRange");
let rangeValue = document.querySelector("#rangeValue");

rangeEl.addEventListener("input", function(event) {
  let val = event.target.value;
  rangeValue.textContent = val + " 分钟";
});`,
  },
  'html-intro': {
    html: `<h1>你好，音乐世界！</h1>
<p>我开始了我的编程之旅。</p>`,
    css: ``,
    js: ``,
  },
  'html-lists': {
    html: `<h1>我的音乐收藏</h1>
<p>这里是我喜欢的音乐作品：</p>

<h2>我喜欢的作曲家</h2>
<ul>
  <li>巴赫</li>
  <li>莫扎特</li>
  <li>肖邦</li>
</ul>

<h2>我的练琴顺序</h2>
<ol>
  <li>音阶练习</li>
  <li>练习曲</li>
  <li>乐曲演奏</li>
</ol>`,
    css: ``,
    js: ``,
  },
  'html-semantic': {
    html: `<header>
  <h1>🎵 古典音乐鉴赏</h1>
  <nav>
    首页 | 作曲家 | 曲目推荐 | 关于
  </nav>
</header>

<main>
  <section>
    <h2>今日推荐</h2>
    <p>贝多芬《第七交响曲》——被瓦格纳称为"舞蹈的礼赞"。</p>
  </section>

  <section>
    <h2>本周精选</h2>
    <p>莫扎特《安魂曲》K.626 ——未完成的绝唱，神秘而动人。</p>
  </section>
</main>

<footer>
  <p>© 2026 代码乐章 | 用音乐的方式学代码</p>
</footer>`,
    css: ``,
    js: ``,
  },
  'html-tables': {
    html: `<h1>作曲家速查表</h1>

<table>
  <thead>
    <tr>
      <th>作曲家</th>
      <th>时期</th>
      <th>代表作</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>巴赫</td>
      <td>巴洛克</td>
      <td>《赋格的艺术》</td>
    </tr>
    <tr>
      <td>莫扎特</td>
      <td>古典主义</td>
      <td>《魔笛》</td>
    </tr>
    <tr>
      <td>肖邦</td>
      <td>浪漫主义</td>
      <td>《夜曲》</td>
    </tr>
  </tbody>
</table>`,
    css: `h1 {
  color: #8B2E2E;
  text-align: center;
}

table {
  width: 100%;
  max-width: 500px;
  margin: 20px auto;
  border-collapse: collapse;
}

th, td {
  border: 1px solid #D4C5A9;
  padding: 10px 14px;
  text-align: left;
}

th {
  background: #8B2E2E;
  color: #fff;
}

td {
  color: #3D2B1F;
}

tbody tr:nth-child(even) {
  background: #FFFAF2;
}`,
    js: ``,
  },
  'js-array-methods': {
    html: ``,
    css: ``,
    js: ``,
  },
  'js-arrays': {
    html: ``,
    css: ``,
    js: ``,
  },
  'js-capstone': {
    html: ``,
    css: ``,
    js: ``,
  },
  'js-conditions': {
    html: ``,
    css: ``,
    js: ``,
  },
  'js-dom-advanced': {
    html: ``,
    css: ``,
    js: ``,
  },
  'js-error-handling': {
    html: ``,
    css: ``,
    js: `// 请完成 safeParse 函数
function safeParse(str) {
  // TODO: 用 try/catch 实现安全解析
}

// 测试
console.log('合法 JSON：', safeParse('{"name": "月光", "composer": "贝多芬"}'))
console.log('非法 JSON：', safeParse('这不是JSON'))`,
  },
  'js-es6-syntax': {
    html: ``,
    css: ``,
    js: `// === 练习区 ===
const instrument = {
  name: '小提琴',
  family: '弦乐',
  range: 'G3-E6'
}

// 原始 describe 函数（你需要用箭头函数重写它）
	function describe(instrument) {
	  return instrument.name + ' 是' + instrument.family + '乐器，音域' + instrument.range
	}

	// 1. 用解构赋值取出三个属性
// TODO: 在这里写代码

// 2. 用箭头函数重写 describe（用模板字符串）
// TODO: 在这里写代码

// 3. 用展开运算符添加 players 属性
// TODO: 在这里写代码

console.log('乐器信息：', describe(instrument))`,
  },
  'js-events': {
    html: ``,
    css: ``,
    js: ``,
  },
  'js-events-more': {
    html: ``,
    css: ``,
    js: ``,
  },
  'js-functions': {
    html: ``,
    css: ``,
    js: ``,
  },
  'js-intro': {
    html: ``,
    css: ``,
    js: ``,
  },
  'js-loops': {
    html: ``,
    css: ``,
    js: ``,
  },
  'js-objects': {
    html: ``,
    css: ``,
    js: ``,
  },
  'js-querySelectorAll': {
    html: ``,
    css: ``,
    js: ``,
  },
  'js-timers': {
    html: ``,
    css: ``,
    js: ``,
  },
  'js-types': {
    html: ``,
    css: ``,
    js: ``,
  },
  'js-variables': {
    html: ``,
    css: ``,
    js: ``,
  },
  'music-collection-v1': {
    html: ``,
    css: ``,
    js: ``,
  },
  'music-collection-v2': {
    html: ``,
    css: ``,
    js: ``,
  },
  'music-collection-v3': {
    html: ``,
    css: ``,
    js: ``,
  },
  'music-searcher': {
    html: ``,
    css: ``,
    js: ``,
  },
  'music-showcase': {
    html: ``,
    css: ``,
    js: ``,
  },
  'tooling-build-deploy': {
    html: ``,
    css: ``,
    js: ``,
  },
  'tooling-capstone': {
    html: ``,
    css: ``,
    js: ``,
  },
  'tooling-git-init': {
    html: ``,
    css: ``,
    js: ``,
  },
  'tooling-github': {
    html: ``,
    css: ``,
    js: ``,
  },
  'tooling-nodejs': {
    html: ``,
    css: ``,
    js: ``,
  },
  'tooling-npm': {
    html: ``,
    css: ``,
    js: ``,
  },
  'tooling-props-emits': {
    html: ``,
    css: ``,
    js: ``,
  },
  'tooling-ref-reactive': {
    html: ``,
    css: ``,
    js: ``,
  },
  'tooling-sfc': {
    html: ``,
    css: ``,
    js: ``,
  },
  'tooling-terminal': {
    html: ``,
    css: ``,
    js: ``,
  },
  'tooling-vite': {
    html: ``,
    css: ``,
    js: ``,
  },
  'tooling-vscode': {
    html: ``,
    css: ``,
    js: ``,
  },
  'vue-computed-watch': {
    html: ``,
    css: ``,
    js: ``,
  },
  'vue-philosophy': {
    html: ``,
    css: ``,
    js: ``,
  },
  'vue-router-intro': {
    html: ``,
    css: ``,
    js: ``,
  },
  'vue-slots': {
    html: ``,
    css: ``,
    js: ``,
  },
  'vue-vmodel-deep': {
    html: ``,
    css: ``,
    js: ``,
  },
  'workflow-console-intro': {
    html: ``,
    css: ``,
    js: ``,
  },
  'workflow-console-log': {
    html: ``,
    css: ``,
    js: ``,
  },
  'workflow-create-element': {
    html: ``,
    css: ``,
    js: ``,
  },
  'workflow-data-driven': {
    html: ``,
    css: ``,
    js: ``,
  },
  'workflow-decompose': {
    html: ``,
    css: ``,
    js: ``,
  },
  'workflow-event-delegation': {
    html: ``,
    css: ``,
    js: ``,
  },
  'workflow-localstorage': {
    html: ``,
    css: ``,
    js: ``,
  },
  'workflow-naming': {
    html: ``,
    css: ``,
    js: ``,
  },
  'workflow-plan-first': {
    html: ``,
    css: ``,
    js: ``,
  },
  'workflow-three-step': {
    html: ``,
    css: ``,
    js: ``,
  },
};

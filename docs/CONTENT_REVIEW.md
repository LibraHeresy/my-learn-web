# 课程内容错误审查报告（CONTENT REVIEW）

> 生成时间：2026-08-14｜审查范围：全部 112 门课程 + 7 篇序章 + 5 个项目 + 518 术语 + 766 测验题｜方法：8 片并行深度审读

共发现 **126** 个问题：🔴 critical **2** ｜ 🟠 major **41** ｜ 🟡 minor **83**

## 概览

| 分片 | 问题数 | critical | major | minor |
|---|---|---|---|---|
| 序章+HTML基础 | 11 | 0 | 3 | 8 |
| CSS样式+布局 | 21 | 0 | 7 | 14 |
| JS基础 | 14 | 0 | 5 | 9 |
| JS进阶+异步 | 26 | 0 | 6 | 20 |
| 工程化+Vue | 18 | 0 | 7 | 11 |
| AI协作三章 | 5 | 0 | 1 | 4 |
| 项目内容 | 2 | 0 | 2 | 0 |
| 补审（项目/题库/术语表） | 29 | 2 | 10 | 17 |

## 🔴 Critical（必须立即修正）

### 🔴 [quiz/principles.yaml](src/content/quiz/principles.yaml)
- **严重性**：🔴 critical
- **位置**：level 3 事件循环深入 / Q295
- **错误**：题目问"以下关于浏览器渲染的说法哪个错误？"，答案标注为选项2"opacity:0 的元素仍响应点击事件"，但该说法本身是正确的（opacity:0 的元素仍会接收点击事件），且解析原文"opacity:0 元素只是视觉透明仍可接收点击事件"与答案标注自相矛盾。实际上错误的说法是选项3"transform 平移后的元素不占原文档流空间"。
- **修正**：答案应改为 3（transform 只改变视觉位置，不改变文档流，元素仍占据原布局空间）；选项2 是正确说法不应被标为"错误"。

### 🔴 [quiz/principles.yaml](src/content/quiz/principles.yaml)
- **严重性**：🔴 critical
- **位置**：level 2 渲染与重排 / Q290
- **错误**：题目问"CSS 解析会阻塞 JS 执行吗？渲染呢？"，标注的正确选项却写"JS 执行会阻塞 CSS 解析和渲染"，方向完全反了。事实是：CSS 会阻塞其后的 JS 执行（classic script 需等待 CSSOM 构建完成），并且 CSS 是 render-blocking 资源会阻塞渲染；而 JS 不会阻塞 CSS 解析。
- **修正**：正确说法应为：CSS 会阻塞 JS 执行且阻塞渲染；"JS 执行会阻塞 CSS 解析"是错误表述。

## 🟠 Major（重点修正）

### 🟠 [prologue/web-history/ai-era/lesson.md](src/content/prologue/web-history/ai-era/lesson.md)
- **严重性**：🟠 major
- **位置**：一、AI 的序曲 块，第 13 行（“同年，微软宣布收购 GitHub”）
- **错误**：原文：“2020 年，GPT-3 发布，1750 亿参数……同年，微软宣布收购 GitHub——这个组合在后来看，意味深长。”其中“同年”指 2020 年，但微软宣布收购 GitHub 是 2018 年 6 月 4 日（75 亿美元，2018 年 10 月完成交割），与 GPT-3（2020 年 6 月发布）相差两年，时间线错误。
- **修正**：应改为“2018 年，微软宣布收购 GitHub”，或将 GPT-3 与收购分属不同年份表述，如“2018 年微软宣布收购 GitHub……2020 年 GPT-3 发布”。

### 🟠 [prologue/web-history/component-revolution/lesson.md](src/content/prologue/web-history/component-revolution/lesson.md)
- **严重性**：🟠 major
- **位置**：三、Vite 与"秒级"开发体验 块，第 24 行
- **错误**：原文：“2018 年，尤雨溪发布了一个小工具的早期原型。当时没人注意。2021 年，Vite 2.0 正式发布……”时间线错误：Vite 是尤雨溪 2020 年 4 月创建（Vite 1.0 于 2020 年 6 月发布），Vite 2.0 于 2021 年 2 月发布，不存在 2018 年的早期原型。
- **修正**：应改为“2020 年，尤雨溪发布了一个小工具的早期原型。当时没人注意。2021 年，Vite 2.0 正式发布……”。

### 🟠 [prologue/web-history/dawn-era/lesson.md](src/content/prologue/web-history/dawn-era/lesson.md)
- **严重性**：🟠 major
- **位置**：二、Hypertext 之前：那些走不通的路 块，第 19 行（Ted Nelson 条目）
- **错误**：原文：“**Ted Nelson，1960 年。** 他创造了"hypertext"这个词。”事实错误：Ted Nelson 于 1965 年才创造 "hypertext" 一词；1960 年是他开始构思 Xanadu 项目的年份，此处把造词时间写成 1960 年。
- **修正**：应改为“**Ted Nelson，1965 年。** 他创造了"hypertext"这个词（他 1960 年就开始构思 Xanadu 项目）”，将 1960 对应 Xanadu 立项、1965 对应造词。

### 🟠 [lessons/fundamentals/css-style/css-selectors/starter/index.html](src/content/lessons/fundamentals/css-style/css-selectors/starter/index.html)
- **严重性**：🟠 major
- **位置**：starter/index.html 第1行 (<h1> 作为 body 第1个子元素)；lesson.md 第108-110、137、156-158行及任务步骤1/4 (第207-221行)
- **错误**：starter 中 <h1>作曲家名录</h1> 是 body 的第一个子元素，三张 .card 分别是第2/3/4个子元素，因此 .card:nth-child(1) 不匹配任何元素（body 第1个子元素是 h1），.card:nth-child(2)/(3) 实际匹配的是第1、2张卡片（巴赫/莫扎特），第3张卡片（贝多芬，第4个子元素）没有任何 nth-child 规则命中。而 lesson.md 明确写道"第1张: 暗红(nth-child(1))、第2张: 金色(nth-child(2))、第3张: 深绿(nth-child(3))"，与真实渲染结果完全不符。任务步骤1"把 .card:nth-child(1) 的 border-left 颜色换一个颜色"不会有任何可见效果（预期却说第一张卡片变色）；任务步骤4"添加第四张卡片并用 .card:nth-child(4) 上色"也不会命中新卡片（新卡片是第5个子元素，nth-child(4) 命中的是原第3张卡片）。
- **修正**：将 starter 的 <h1> 从卡片们的父容器中移除（或把三张卡片放到一个不含其他兄弟元素的容器里），使卡片成为第1/2/3个子元素；或把 lesson 中的选择器/描述改为与 starter 一致（如改用 .card:nth-of-type 并修正"第几张"的说明及两个任务步骤的预期结果）。

### 🟠 [lessons/fundamentals/css-style/css-cascade/starter/index.html](src/content/lessons/fundamentals/css-style/css-cascade/starter/index.html)
- **严重性**：🟠 major
- **位置**：starter/index.html 第8-10行；lesson.md 第121行、任务步骤1(第172-173行)与步骤2(第176-177行)
- **错误**：starter 中第三张卡片的段落只有 id="special"，没有 class="highlight"（只有第二张卡片的段落带 highlight）。但 lesson.md 第121行称第三张卡片是"带 highlight 类和 special id 的段落"；任务步骤1预期"注释掉 #special 的 color 后文字变成 .card p.highlight 定义的暗红色"——实际由于该段落没有 highlight 类，会回退到 .card p（深棕色 #3D2B1F），不是暗红色；任务步骤2预期"给 .card p.highlight 加 !important 能压过 #special"——实际这两个选择器匹配的是不同元素（.card p.highlight 只匹配第二张卡片的段落，从不匹配带 #special 的第三段），加上 !important 根本不会影响 #special 段落的颜色，预期描述的"压过"不成立。
- **修正**：在 starter 中给第三张卡片的 <p id="special"> 加上 class="highlight"（与 lesson 描述一致），或改写 lesson 的"看例子"说明与两个任务步骤的预期结果（改为：注释 #special 后第三段变深棕色；给 .card p.highlight 加 !important 只影响第二张卡片的段落）。

### 🟠 [lessons/fundamentals/css-style/css-font-spacing/lesson.md](src/content/lessons/fundamentals/css-style/css-font-spacing/lesson.md)
- **严重性**：🟠 major
- **位置**：常见错误 1（第162-168行）
- **错误**：课程称 font-family: Noto Serif SC, serif;（不加引号）会"失败！空格导致解析错误"。这是错误的：按 CSS 规范，family-name 允许写成多个标识符序列（<custom-ident>+），不加引号的多词字体名是合法 CSS，现代浏览器都能正确解析（MDN 也只建议加引号，并未要求必须加）。把合法的写法标为"解析错误"会误导学习者对 CSS 合法性的判断。
- **修正**：改为：不加引号的多词字体名通常也能工作，但规范建议给含空格/数字/标点的字体名加引号（且与关键字同名的字体族必须加引号），以提升可读性与健壮性。

### 🟠 [lessons/fundamentals/css-style/css-animations/starter/style.css](src/content/lessons/fundamentals/css-style/css-animations/starter/style.css)
- **严重性**：🟠 major
- **位置**：第16行；lesson.md 第174-177、193行
- **错误**：lesson.md 的"看例子"示例写 .fade-card { animation: fadeInUp 0.6s ease-out forwards; } 并强调"淡入动画用了 forwards（停在最后一帧，不闪回）"，但 starter 实际是 animation: fadeInUp 1.5s ease-out infinite;（无限循环）。实际渲染中淡入卡片会反复淡出/淡入，而不是一次性入场后停在最终状态，与课程对代码行为的描述前后矛盾。
- **修正**：把 starter 的 .fade-card 改为 forwards 单次播放（animation: fadeInUp 1.5s ease-out forwards;），或把 lesson 中的示例与说明改为 infinite。

### 🟠 [lessons/fundamentals/css-layout/css-flexbox/starter/style.css](src/content/lessons/fundamentals/css-layout/css-flexbox/starter/style.css)
- **严重性**：🟠 major
- **位置**：starter/style.css 第1-13行；lesson.md 任务步骤1-5（第299-338行）
- **错误**：五个任务步骤全部指示编辑 .card-grid 选择器（加 display:flex、flex-direction:column、gap、给 .card 加 flex: 1 1 280px 等），但 starter 中类名是 .container，且已经预置了 display: flex; gap: 20px; justify-content: center; 以及 .card { flex: 1; }。学习者按步骤找不到 .card-grid，且步骤1的预期"卡片从竖排变成横排"在 starter 中早已成立，整组动手任务无法按描述执行。
- **修正**：把 starter 的类名改为 .card-grid 并移除预置的 flex 相关属性（让学习者自己添加），或把任务步骤全部改写为针对 .container 的现有结构。

### 🟠 [lessons/fundamentals/css-layout/css-position/starter/index.html](src/content/lessons/fundamentals/css-layout/css-position/starter/index.html)
- **严重性**：🟠 major
- **位置**：starter（舞台布局 demo）；lesson.md 任务步骤1-3（第393-438行）
- **错误**：任务步骤1要求"找到 .product-card，确认 position: relative；给 .hot-badge 设置 position: absolute; top:-6px; right:-6px"，步骤3要求给页面中的 .section-title 加 sticky——但 starter 中既没有 .product-card/.hot-badge/.section-title，也没有对应内容（starter 是 .stage/.soloist/.badge/.player 的舞台示例，且页面内容很短无法滚动出 sticky 效果）。任务无法按描述执行。
- **修正**：把 starter 改为与 lesson 完整示例一致的产品卡片页（含 .product-card/.hot-badge/可滚动内容），或把任务步骤改写为针对 starter 实际的 .stage/.soloist/.badge 结构。

### 🟠 [lessons/fundamentals/css-layout/css-layout-capstone/starter/index.html](src/content/lessons/fundamentals/css-layout/css-layout-capstone/starter/index.html)
- **严重性**：🟠 major
- **位置**：starter（音乐会宣传页：.hero 头部/.navbar/.main-layout/.program/.performers/.buy-btn）；lesson.md 任务步骤1-6（第533-634行）
- **错误**：capstone 的任务步骤指导构建的是产品落地页（.navbar/.hero 英雄区/.features/.content-section/.footer/.back-to-top），步骤1还要求"在 index.html 中创建页面骨架"，但 starter 是一个结构完全不同的"春之声音乐会"页面（.hero 只是顶部标题区、无 .features/.content-section/.footer/.back-to-top，导航无 sticky，页面区域与任务描述的五个区域对不上）。学习者按步骤操作时找不到对应的类名/区域，整组构建步骤与起始代码脱节。
- **修正**：把 starter 替换为与课程一致的落地页骨架（或空白模板），或把全部任务步骤改写为针对音乐会页面的实际结构（.hero/.navbar/.program/.performers/.buy-btn）。

### 🟠 [lessons/fundamentals/js-basics/js-functions/lesson.md](src/content/lessons/fundamentals/js-basics/js-functions/lesson.md)
- **严重性**：🟠 major
- **位置**：example 块（约 136-169 行）与 task 块步骤 1-3（约 233-256 行）
- **错误**：任务与示例基于 createUserCard(name, role, email) 编写：要求找"第一个 createUserCard() 调用"、把参数 "张三"/"前端工程师"/"zhangsan@example.com" 改成自己的、修改 "card1 + card2 + card3" 拼接、示例使用 document.getElementById("card-container")。但实际 starter/script.js 里根本没有 createUserCard，而是 createCard(composer, period, piece)（参数为巴赫/莫扎特/德彪西及其时期、代表作），用 html += createCard(...) 拼接到 #gallery。学习者按步骤操作找不到任何对应代码，任务无法完成，与配套代码前后矛盾。
- **修正**：将 lesson.md 的示例和任务统一为 starter 实际代码：基于 createCard(composer, period, piece) 与巴赫/莫扎特/德彪西数据、html += 拼接、#gallery 容器来重写任务步骤（或反过来把 starter 改成 createUserCard 版本，二者取其一）。

### 🟠 [lessons/fundamentals/js-basics/js-loops/lesson.md](src/content/lessons/fundamentals/js-basics/js-loops/lesson.md)
- **严重性**：🟠 major
- **位置**：task 步骤 1（第 177 行）与步骤 1 第 4 点（第 216 行）
- **错误**：原文："先读一遍整个文件（用 fs.readFileSync 或者直接在编辑器中打开）"、"保存文件（fs.writeFileSync），刷新预览区验证"。fs.readFileSync / fs.writeFileSync 是 Node.js 的 API，在浏览器沙箱（页面内编辑器）中 fs 未定义，根本无法执行；对学习者的操作指引是错误的环境/API 误用。
- **修正**：删除 fs.readFileSync / fs.writeFileSync 提法，改为"在右侧编辑器中打开/阅读 script.js"和"保存后刷新预览区验证"。

### 🟠 [lessons/fundamentals/js-basics/js-objects/lesson.md](src/content/lessons/fundamentals/js-basics/js-objects/lesson.md)
- **严重性**：🟠 major
- **位置**：task 步骤 1（第 184 行）与步骤 1 第 3 点（第 219 行）
- **错误**：原文："先读一遍整个文件（用 fs.readFileSync 或在编辑器中打开）"、"保存文件（fs.writeFileSync），刷新预览区"。同上，fs.readFileSync / fs.writeFileSync 是 Node.js 专有 API，浏览器沙箱中不存在。
- **修正**：删除 fs 相关提法，改为"在编辑器中打开/阅读 script.js"和"保存后刷新预览区"。

### 🟠 [lessons/fundamentals/js-basics/js-timers/lesson.md](src/content/lessons/fundamentals/js-basics/js-timers/lesson.md)
- **严重性**：🟠 major
- **位置**：task 步骤 1（第 180 行）
- **错误**：原文："打开 script.js，先读一遍整个文件（用 fs.readFileSync 或直接编辑器中打开）"。fs.readFileSync 是 Node.js API，浏览器沙箱中 fs 未定义，指令无法执行。
- **修正**：删除 fs.readFileSync 提法，改为"在编辑器中打开 script.js 阅读"。

### 🟠 [lessons/fundamentals/js-basics/js-capstone/lesson.md](src/content/lessons/fundamentals/js-basics/js-capstone/lesson.md)
- **严重性**：🟠 major
- **位置**：task 步骤 2（第 44-45 行）与 hint 块（第 59 行）
- **错误**：任务要求"类型A 按钮用 .filter() 筛选 period === \"类型A\""、挑战新增"类型B"按钮，expected 写"点击「类型A」只显示张三和赵六"（且"点击「类型B」只显示。"句子残缺），hint 也示例 period === \"类型A\"。但 starter 中的按钮是「全部/浪漫主义/古典主义」，composers 数据（巴赫、莫扎特、贝多芬、肖邦、舒曼、德彪西）里既没有"类型A/类型B"时期，也没有"张三/赵六"。步骤与配套代码完全脱节。
- **修正**：将任务改为与 starter 一致：说明现有「浪漫主义」「古典主义」按钮如何用 filter(period === ...) 实现，挑战改为新增一个如「印象派」按钮；expected 与 hint 同步改为真实数据（如肖邦、舒曼属浪漫主义），并补全残缺句子。

### 🟠 [lessons/framework/js-advanced/js-es6-syntax/lesson.md](src/content/lessons/framework/js-advanced/js-es6-syntax/lesson.md)
- **严重性**：🟠 major
- **位置**：「可选链 ?.」explain 代码块，约 186-194 行
- **错误**：同一代码块内先 `let city;`（旧写法）后 `const city = user?.address?.city ?? '未知'`（新写法），同一作用域重复声明变量，整段代码无法运行（SyntaxError: Identifier 'city' has already been declared）。
- **修正**：两个写法应分别演示：旧写法用 `let city` 的 if/else 段与新写法分开成两个独立代码块，或将新写法变量改名（如 `const city2`），否则学习者整块复制会直接报语法错误。

### 🟠 [lessons/framework/js-advanced/workflow-console-intro/lesson.md](src/content/lessons/framework/js-advanced/workflow-console-intro/lesson.md)
- **严重性**：🟠 major
- **位置**：「三种最常见的错误类型」ReferenceError 示例代码块 62-64 行
- **错误**：同一代码块内 `let btn = document.querySelector(...)` 与 `let btn = docuement.querySelector(...)` 连续声明两次 `btn`，解析阶段即抛 SyntaxError: Identifier 'btn' has already been declared，整段脚本不会执行，注释声称的 `ReferenceError: docuement is not defined` 永远不会出现。
- **修正**：正确行与错误行应使用不同变量名（如 `let btnOk` / `let btn`）或拆成两个独立代码块，否则示例输出注释与实际报错不符。

### 🟠 [lessons/framework/async-data/async-promise/lesson.md](src/content/lessons/framework/async-data/async-promise/lesson.md)
- **严重性**：🟠 major
- **位置**：「常见错误」错误3，256-261 行（尤 259 行）
- **错误**：「fetch('/api/user/999') // 这个返回 404，整个 all 就 reject 了」——fetch 只在网络层失败时 reject，HTTP 404 会正常 resolve 为 ok:false 的 Response；裸 fetch 下 Promise.all 不会因 404 失败。该示例的事实前提错误，且与课程自身 async-fetch 一节「必须先检查 response.ok」的教法矛盾。
- **修正**：应改为在 then 中检查 `!response.ok` 并 throw（如 `fetch(url).then(r => { if (!r.ok) throw new Error(r.status); return r.json() })`），或直接用网络错误/显式 reject 的 Promise 来演示「一个失败全部失败」。

### 🟠 [lessons/framework/async-data/async-await/lesson.md](src/content/lessons/framework/async-data/async-await/lesson.md)
- **严重性**：🟠 major
- **位置**：「三、关键认知」代码块 87-89 行
- **错误**：代码先执行 `console.log('② 主线程继续')`（第 87 行），第 88 行才调用 demo()，实际输出顺序是 ② → ① → ③；注释却声称「输出顺序：① → ② → ③」，与代码执行顺序直接矛盾。
- **修正**：把 `demo()` 调用移到 `console.log('② 主线程继续')` 之前（或把 ② 的打印放进另一个函数后调用），使实际输出与注释一致；或把注释改为 ② → ① → ③ 并重新解释。

### 🟠 [lessons/framework/async-data/async-await/lesson.md](src/content/lessons/framework/async-data/async-await/lesson.md)
- **严重性**：🟠 major
- **位置**：「常见错误」错误4，191 行
- **错误**：「const user = await fetch('/api/user/999') // 如果 404，这里抛异常」——fetch 对 404 不抛异常，await 会正常拿到 ok:false 的 Response；不会触发 catch。
- **修正**：改为「如果网络请求失败（断网、CORS 被拦等），这里抛异常」；404 场景应演示先检查 response.ok 再 throw 的写法。

### 🟠 [lessons/framework/async-data/async-event-loop/lesson.md](src/content/lessons/framework/async-data/async-event-loop/lesson.md)
- **严重性**：🟠 major
- **位置**：task 第3步 expected 163 行
- **错误**：步骤预期「输出：1 → 3 → 4 → 2」错误。对给出的代码（console.log(1)；setTimeout→2；Promise.then→3；console.log(4)），同步代码先执行（1、4），再微任务（3），最后宏任务（2），实际输出应为 1 → 4 → 3 → 2。预期答案与本节自己教的「同步 → 微任务 → 宏任务」规则相矛盾。
- **修正**：将 expected 改为「输出：1 → 4 → 3 → 2。同步代码先执行，Promise.then（微任务）在 setTimeout(fn,0)（宏任务）之前执行」。

### 🟠 [lessons/engineering/engineering-tooling/tooling-modules/lesson.md](src/content/lessons/engineering/engineering-tooling/tooling-modules/lesson.md)
- **严重性**：🟠 major
- **位置**：task 步骤4（第284-295行，app.js）与步骤5（第304-315行，expected 输出）
- **错误**：步骤4 要求创建 src/js/modules/app.js，其中写着 `import { renderTracks as render } from './render.js'  // 暂不创建 render.js，演示语法`，但整个任务（步骤1-5）从未创建 render.js；而步骤5 的 expected 却是"浏览器控制台没有报错，能看到搜索结果数量"。实际运行会因 './render.js' 模块解析失败（Failed to resolve module specifier）直接报错，searchTracks 根本不会执行，承诺的结果不可能达到——任务自相矛盾。
- **修正**：要么补充创建 render.js（导出 renderTracks 函数），要么删除 app.js 中对该模块的 import；并把步骤5 的 expected 改为与可运行代码一致（例如先只验证 api.js 的导入）。

### 🟠 [lessons/engineering/engineering-tooling/tooling-modules/lesson.md](src/content/lessons/engineering/engineering-tooling/tooling-modules/lesson.md)
- **严重性**：🟠 major
- **位置**：task 步骤2（第236-249行，helpers.js）与步骤3（第259-276行，api.js）
- **错误**：步骤3 的 api.js 首行是 `import { API_URL } from '../utils/helpers.js'   // 从 utils 引入常量（等一下添加）`，但步骤2 创建的 helpers.js 只导出了 formatDate 和 truncateText，全课没有任何一步添加 API_URL 这个导出。浏览器加载时模块图会报 "The requested module '../utils/helpers.js' does not provide an export named 'API_URL'"，代码无法运行。
- **修正**：在步骤2 的 helpers.js 中补充 `export const API_URL = 'https://itunes.apple.com/search'`（与正文示例一致），或删除 api.js 中该导入并改用字面量 URL。

### 🟠 [lessons/engineering/vue-framework/tooling-ref-reactive/lesson.md](src/content/lessons/engineering/vue-framework/tooling-ref-reactive/lesson.md)
- **严重性**：🟠 major
- **位置**：常见错误-错误4（第269-281行）
- **错误**：错误4 把 `list.value[0] = 'x'` 标为 ❌（注释说"Vue 3 虽然能检测，但某些边界情况可能失败"），又把 `list.value = ['x', 'b', 'c']` 标为 ❌ 而其注释却写"这个是可以的，就是效率低"。Vue 3 的响应式基于 Proxy，按下标赋值和整体替换数组都会被可靠检测（这是 Vue 2 Object.defineProperty 时代的局限）。该块既与事实不符又自相矛盾，会误导学习者以为下标赋值/整体替换是错误写法。
- **修正**：说明在 Vue 3 中 `list.value[0] = 'x'` 与 `list.value = [...]` 都是响应式且常用的合法写法；真正需要提醒的是解构赋值丢失响应性等场景。

### 🟠 [lessons/engineering/vue-framework/tooling-ref-reactive/lesson.md](src/content/lessons/engineering/vue-framework/tooling-ref-reactive/lesson.md)
- **严重性**：🟠 major
- **位置**：第122行（computed stats 示例）、第176行（原生JS对比示例）
- **错误**：代码块中的模板字符串被错误转义，文件中是字面的反斜杠：`return \`筛选出 \${filteredPieces.value.length} 首中的 ...\`` 和 `li.textContent = \`\${item.name} - \${item.composer}\``。代码块内 Markdown 不会反转义，学习者照抄会得到 JS 语法错误（字符串外的 `\`` 非法），且 `\${}` 不再触发插值，核心示例无法运行。
- **修正**：删除反斜杠，写成正常的模板字符串：`return \`筛选出 ${filteredPieces.value.length} 首中的 ${...} 首收藏\`` 和 `li.textContent = \`${item.name} - ${item.composer}\``。

### 🟠 [lessons/engineering/vue-framework/vue-computed-watch/lesson.md](src/content/lessons/engineering/vue-framework/vue-computed-watch/lesson.md)
- **严重性**：🟠 major
- **位置**：第86、149、152、244行
- **错误**：同样的问题：`return \`共 \${total} 首，其中 \${liked} 首已收藏\``、`console.log(\`搜索: "\${oldKeyword}" → "\${newKeyword}"\`)`、`const response = await fetch(\`/api/search?q=\${newKeyword}\`)`、`const stats = computed(() => \`共 \${filteredPieces.value.length} 首\`)` 均含字面反斜杠转义（已验证原始字节），代码块原样渲染/复制即为语法错误的 JS。
- **修正**：删除这些反斜杠，恢复为正常模板字符串。

### 🟠 [lessons/engineering/vue-framework/vue-slots/lesson.md](src/content/lessons/engineering/vue-framework/vue-slots/lesson.md)
- **严重性**：🟠 major
- **位置**：Slot Props 示例（第166-168行，TrackList.vue）
- **错误**：`<li v-for="track in tracks" :key="track.id">` 的循环只声明了 track 变量，却在其内部写 `<slot name="item" :track="track" :index="index">` 传递 index——index 未定义，运行时为 undefined；父组件用 `#item="{ track, index }"` 解构后渲染 `{{ index + 1 }}` 得到 NaN，示例描述的序号功能无法实现。
- **修正**：把 v-for 改为 `v-for="(track, index) in tracks"`。

### 🟠 [lessons/engineering/vue-framework/vue-slots/lesson.md](src/content/lessons/engineering/vue-framework/vue-slots/lesson.md)
- **严重性**：🟠 major
- **位置**：常见错误-错误2（第312-322行）
- **错误**：示例中组件定义 `<slot name="cardHeader">`，却标注 `#cardHeader` ❌、`#card-header` ✅（"Vue 模板中 slot 名用 kebab-case"）。Vue 3 的插槽名区分大小写且必须与定义完全匹配：`#card-header` 指向名为 "card-header" 的插槽，不会命中 "cardHeader"，内容会落到默认内容上。按课文的 camelCase 定义 + kebab 引用写法根本无法工作，建议本身是反的。
- **修正**：插槽名必须与定义完全一致：`name="cardHeader"` 对应 `#cardHeader`，`name="card-header"` 对应 `#card-header`；并建议定义与引用统一使用 kebab-case。

### 🟠 [lessons/ai-collaboration/ai-frontend/ai-js/lesson.md](src/content/lessons/ai-collaboration/ai-frontend/ai-js/lesson.md)
- **严重性**：🟠 major
- **位置**：二、解决方案 → 第 3 步：看副作用（约第 61 行）
- **错误**：竞态条件（Race Condition）的机制描述自相矛盾。原文："最后一次请求最慢——3 秒后它的结果覆盖了前两次，而页面此刻显示的是第 3 次点排序的结果，但数据是第 1 次的。"按字面理解，"最后一次请求"（第 3 次点击发出的请求）最慢、最后返回并覆盖前两次，此时页面数据恰恰是第 3 次请求的正确结果，不是 bug；而结论却说"数据是第 1 次的"，前后矛盾。竞态条件的正确场景是：最早发出的请求最慢、最后返回，覆盖掉较新请求的结果，导致页面显示旧数据。同一课第 112 行的例子（"第 5 次可能最先返回，但第 1 次最后返回并覆盖了第 5 次的结果"）才是正确表述，两处不一致会误导学习者对竞态机制的理解。
- **修正**：改为："第一次（最早发出）的请求最慢、最后才返回——3 秒后它的结果覆盖了后两次的结果，而页面此刻显示的是第 3 次点排序的结果，但数据是第 1 次的。这个 bug 叫竞态条件（Race Condition）。"（即：最后到达的响应属于最早发出的请求，旧数据覆盖新结果。）

### 🟠 [projects/projects/music-collection-v1/project.json](src/content/projects/projects/music-collection-v1/project.json)
- **严重性**：🟠 major
- **位置**：第 3~9 步（约第 23~117 行）
- **错误**：步骤标题/任务/hint/starterCode 与所引用的 steps/*.md 正文系统性错位：第 3 步标题"搭建收藏卡片"（任务"写一张音乐卡片"，起始代码为单个 .music-card）实际对应的 steps/03.md 却是"步骤 2：HTML 结构——搭建页面骨架"（整页筛选按钮+卡片网格+添加表单）；第 6 步"加上分类筛选"对应 06.md"步骤 5：添加功能"；第 7 步"添加收藏表单"对应 07.md"步骤 6：删除功能"；第 8 步"这个项目真正有用的收获"对应 08.md"步骤 7：筛选功能"；第 9 步"项目验收"对应 09.md"步骤 8：数据持久化与最终完善"。同时 steps/01.md 宣称应用包含删除按钮与 localStorage（"增删查"、标准版完成线要求删除+持久化），而本 project.json 的步骤流程只安排了列表/筛选/添加，学习者按 UI 步骤走完无法达到 01.md 承诺的标准版，属于前后矛盾。
- **修正**：统一两套流程：要么调整各步骤的 mdFile 指向，使标题/任务/起始代码与正文一致，并把删除、localStorage 步骤补回流程；要么按现有 md 正文重写 project.json 的标题/任务/起始代码，并让 01.md 的完成线描述与实际步骤一致。

### 🟠 [projects/projects/music-collection-v2/project.json](src/content/projects/projects/music-collection-v2/project.json)
- **严重性**：🟠 major
- **位置**：第 3、4、7、9、10 步（约第 23~37、38~52、83~97、113~137 行）
- **错误**：步骤标题与正文错位：第 3 步"设计组件树"对应 03.md"第 3 步：创建第一个组件 —— MusicCard"；第 4 步"构建 MusicCard 组件"对应 04.md"第 4 步：列表渲染 —— v-for"；第 7 步"组装 App.vue"对应 07.md"第 7 步：删除和收藏切换"；第 9 步"回顾与对比 — v1 vs v2"对应 09.md"第 9 步：打磨体验——过渡动画、空状态"；第 10 步"这个项目真正有用的收获"对应 10.md"第 10 步：代码回顾 —— v1 vs v2 对比"。学习者会在"设计组件树"标题下看到创建 MusicCard 组件的内容，在"组装 App.vue"标题下看到删除/收藏交互内容。
- **修正**：将各步标题/任务与 mdFile 正文对齐（例如 03 步指向"设计组件树"、04 步指向 MusicCard、07 步指向删除与收藏、09 步指向打磨体验、10 步指向代码回顾），或按现有正文重写标题并增删"组装 App.vue""回顾对比"等步骤。

### 🟠 [projects/projects/music-collection-v3/project.json](src/content/projects/projects/music-collection-v3/project.json)
- **严重性**：🟠 major
- **位置**：步骤 3（title: 分支开发工作流）→ steps/03.md
- **错误**：步骤 3 的标题与任务是“分支开发工作流”（创建 feature/favorites 分支、实现收藏夹切换、合并回 main），但映射的 steps/03.md 正文是“第 3 步：推送到 GitHub”（创建远程仓库、git push、写 README）。整个项目没有任何 md 正文介绍分支工作流，该步骤的 starterCode（收藏夹切换的 Vue 代码）也与“推送到 GitHub”正文无关。
- **修正**：为步骤 3 提供讲分支（git branch/checkout/merge）的正文，或调整步骤顺序，使标题/任务/starterCode 与 steps/03.md 一致。

### 🟠 [projects/projects/music-collection-v3/project.json](src/content/projects/projects/music-collection-v3/project.json)
- **严重性**：🟠 major
- **位置**：步骤 4（title: 推送到 GitHub）→ steps/04.md
- **错误**：步骤 4 的任务要求“在 GitHub 创建公开仓库，将本地项目推送到远程”，但 steps/04.md 正文是“第 4 步：构建生产版本 —— npm run build”（构建与 dist 预览），与推送无关。
- **修正**：步骤 4 应映射到“推送到 GitHub”的正文（即现 steps/03.md 的内容），使 md 文件与步骤顺序对齐。

### 🟠 [projects/projects/music-collection-v3/project.json](src/content/projects/projects/music-collection-v3/project.json)
- **严重性**：🟠 major
- **位置**：步骤 5（title: 构建生产版本）→ steps/05.md
- **错误**：步骤 5 的任务要求“运行 npm run build，查看 dist/ 文件夹…”，但 steps/05.md 正文是“第 5 步：部署到 GitHub Pages”（base 配置、gh-pages 部署），与构建无关。
- **修正**：步骤 5 应映射到构建正文（即现 steps/04.md 的内容）。

### 🟠 [projects/projects/music-collection-v3/project.json](src/content/projects/projects/music-collection-v3/project.json)
- **严重性**：🟠 major
- **位置**：步骤 6（title: 部署到 GitHub Pages）→ steps/06.md
- **错误**：步骤 6 的任务要求“配置 vite.config.js 的 base 路径，安装 gh-pages，构建并部署到 GitHub Pages”，但 steps/06.md 正文是“第 6 步：GitHub Actions 自动部署”。
- **修正**：步骤 6 应映射到 GitHub Pages 手动部署正文（即现 steps/05.md 的内容）。

### 🟠 [projects/projects/music-collection-v3/project.json](src/content/projects/projects/music-collection-v3/project.json)
- **严重性**：🟠 major
- **位置**：步骤 7（title: CI/CD — 用 GitHub Actions 自动部署）→ steps/07.md
- **错误**：步骤 7 的任务要求“创建 .github/workflows/deploy.yml，配置 GitHub Actions 自动部署”，但 steps/07.md 正文是“第 7 步：环境变量”（.env、VITE_ 前缀），与 CI/CD 完全无关。
- **修正**：步骤 7 应映射到 GitHub Actions 正文（即现 steps/06.md 的内容）。

### 🟠 [projects/projects/music-collection-v3/project.json](src/content/projects/projects/music-collection-v3/project.json)
- **严重性**：🟠 major
- **位置**：步骤 8（title: 这个项目真正有用的收获）→ steps/08.md
- **错误**：步骤 8 的任务要求“回头看 v1、v2、v3 三个版本，说明这个版本为什么能作为主项目、与前两版最大差别”，但 steps/08.md 正文是“第 8 步：项目收尾 —— 品牌细节和最终检查”（favicon、meta 标签），是操作内容而非回顾总结。
- **修正**：步骤 8 应映射到回顾/收获类正文（即现 steps/09.md 的三版本回顾），或为“收获”步骤补写对应 md。

### 🟠 [projects/projects/music-collection-v3/project.json](src/content/projects/projects/music-collection-v3/project.json)
- **严重性**：🟠 major
- **位置**：步骤 9（title: 最终验收、上线检查与继续升级）→ steps/09.md
- **错误**：步骤 9 的任务要求“按上线检查清单完整走一遍，并确认在线地址、仓库地址、README 可访问”，但 steps/09.md 正文是“第 9 步：项目总回顾”，其中没有上线检查清单（检查清单实际在 steps/08.md 的“最终检查清单（线上版本）”中）。
- **修正**：步骤 9 应映射到含检查清单/验收的正文，或把 08.md 的“最终检查清单”移到步骤 9 对应内容。

### 🟠 [projects/projects/music-collection-v3/steps/02.md](src/content/projects/projects/music-collection-v3/steps/02.md)
- **严重性**：🟠 major
- **位置**：常见错误（第 198 行）
- **错误**：“如果已经 commit 了，需要修改 .gitignore 后做一次新 commit 来移除” —— .gitignore 只对未追踪文件生效，对已跟踪（已提交）的 node_modules 不生效，仅改 .gitignore 再 commit 并不能把 node_modules 从仓库移除。
- **修正**：已提交的情况应先执行 `git rm -r --cached node_modules`（从索引移除、保留本地文件），再更新 .gitignore 并 commit。

### 🟠 [projects/projects/music-showcase/project.json](src/content/projects/projects/music-showcase/project.json)
- **严重性**：🟠 major
- **位置**：步骤 6（title: 这个项目真正有用的收获）→ steps/06.md
- **错误**：步骤 6 的任务要求“回头看页面，用自己的话说清主题、结构、为什么这样排版”，但 steps/06.md 正文是“步骤 5：收尾与测试”，是操作内容；回顾/收获内容实际在 steps/07.md（“你学到的最重要的三件事”），步骤 6 与正文错位。
- **修正**：步骤 6 应映射到 07.md（最终回顾）的内容，或把 06.md 的测试内容放到验收步骤（步骤 7）。

### 🟠 [projects/projects/music-showcase/project.json](src/content/projects/projects/music-showcase/project.json)
- **严重性**：🟠 major
- **位置**：步骤 3（title: 给名片穿上礼服）starterCode vs steps/03.md
- **错误**：步骤 3 的 starterCode HTML 中 `<img>` 和 `<p>` 没有 class（配套 CSS 用 `.composer-card img` 等后代选择器），而 steps/03.md 正文要求写 `.composer-photo`（180x180 圆形照片）和 `.composer-bio` 样式；学生在 starterCode 基础上按正文操作时，这些选择器匹配不到任何元素。
- **修正**：统一两套标记：在 starterCode 的 `<img>`、`<p>` 上补 `class="composer-photo"`、`class="composer-bio"`，或把 03.md 正文的选择器改为与 starterCode 一致。

## 🟡 Minor（建议修正）

### 🟡 [prologue/web-history/browser-war/lesson.md](src/content/prologue/web-history/browser-war/lesson.md)
- **严重性**：🟡 minor
- **位置**：二、微软出手：免费的杀伤力 块，第 20 行
- **错误**：原文：“IE3 在功能上全面落后于 Netscape Navigator 3——它的 CSS 实现烂到连盒子模型都算错了（IE 的盒模型 bug 坑了前端开发者整整十年）”。著名的“IE 盒子模型 bug”（width 是否包含 padding/border）是 IE5/IE6（1999-2001 年）的问题，IE3（1996 年）当时 CSS 支持极弱，并非盒子模型 bug 的代表性来源，版本张冠李戴。
- **修正**：把具体版本改为 IE5/IE6，如“它的 CSS 实现烂到连盒子模型都算错了（IE5/IE6 的盒模型 bug 坑了前端开发者整整十年）”。

### 🟡 [prologue/web-history/browser-war/lesson.md](src/content/prologue/web-history/browser-war/lesson.md)
- **严重性**：🟡 minor
- **位置**：五、火狐的逆袭与这场战争的遗产 块，第 41 行
- **错误**：原文：“到 2008 年，Firefox 拿下了全球 30% 的份额，用三年时间从微软嘴里撬走了近三成用户。”根据 StatCounter 等统计数据，Firefox 全球份额 2008 年底约 20-25%，到 2009 年底才达到约 30%（2009 年 11 月峰值约 32%），时间表述偏差约一年。
- **修正**：建议改为“到 2009 年底，Firefox 拿下了全球约 30% 的份额”，或“到 2008 年，Firefox 拿下约两成份额、随后继续逼近三成”。

### 🟡 [prologue/web-history/framework-spring/lesson.md](src/content/prologue/web-history/framework-spring/lesson.md)
- **严重性**：🟡 minor
- **位置**：一、Chrome 与 V8：Google 为什么要做浏览器？块，第 11 行
- **错误**：原文：“为此，Google 在丹麦买下了一个小团队，他们的产品叫 V8——一个全新的 JavaScript 引擎。”表述不准确：V8 并非被收购的既有产品。Google 是 2006 年从 Sun Microsystems 招来 Lars Bak 及其团队（HotSpot JVM 团队），V8 是他们在 Google 内部从零开发的（2008 年随 Chrome 发布）。
- **修正**：可改为“Google 在丹麦招来了一支由 Lars Bak 带领的引擎团队，这支团队在 Google 内部从零写出了全新的 JavaScript 引擎 V8”。

### 🟡 [prologue/web-history/component-revolution/lesson.md](src/content/prologue/web-history/component-revolution/lesson.md)
- **严重性**：🟡 minor
- **位置**：三、Vite 与"秒级"开发体验 块，第 28 行
- **错误**：原文：“到 2021 年，99% 的浏览器都支持 ES Modules 了。”数字夸大：根据 caniuse 数据，2021 年全球浏览器对 ES Modules 的支持约为 95-97%（此后数年前后才约 97%+），从未达到 99%。
- **修正**：建议改为“到 2021 年，绝大多数浏览器（约 95% 以上）都支持 ES Modules 了”。

### 🟡 [lessons/fundamentals/html-basics/html-images-links/lesson.md](src/content/lessons/fundamentals/html-basics/html-images-links/lesson.md)
- **严重性**：🟡 minor
- **位置**：a — 创建超链接 块（第 66、70 行）及 recap（第 129 行）
- **错误**：原文把 href 写成绝对规则：“必须写完整网址，包括 https://”、“href 必须写完整的 https:// 地址，否则浏览器找不到目标”。技术上 href 完全支持相对路径（如 href="about.html"、href="/about"）和页内锚点（href="#top"），“必须写 https://”只在链接外部网站时成立；且课程其他课文就在使用相对/占位 href（html-div-span 的 href="/"、href="/about"，html-semantic 的 href="#"），前后不一致。
- **修正**：建议限定语境：“链接到外部网站时，href 必须写完整地址（含 https://）”，并顺带说明本站内部链接可用相对路径、页内锚点用 #，避免学习者形成“href 永远必须 https://”的错误认知。

### 🟡 [lessons/fundamentals/html-basics/html-semantic/lesson.md](src/content/lessons/fundamentals/html-basics/html-semantic/lesson.md)
- **严重性**：🟡 minor
- **位置**：常见错误：每页多个 main 块，第 111 行
- **错误**：原文：“`<main>` 不能放在 `<article>`、`<aside>`、`<header>`、`<footer>` 或 `<nav>` 里面——它只属于 `body` 的直接下级。”前半句符合 HTML 规范（main 不得是 article/aside/footer/header/nav 的后代），但“它只属于 body 的直接下级”是错的：规范并未要求 main 必须是 body 的直接子元素，它可以嵌套在 div 等普通容器内（如 <body><div><main>…</main></div></body> 是合法 HTML）。
- **修正**：改为“`<main>` 不能放在 `<article>`、`<aside>`、`<header>`、`<footer>` 或 `<nav>` 里面；它应作为文档主体的核心内容区，可以放在 body 内的普通容器（如 div）中”。

### 🟡 [lessons/fundamentals/html-basics/html-div-span/lesson.md](src/content/lessons/fundamentals/html-basics/html-div-span/lesson.md)
- **严重性**：🟡 minor
- **位置**：看例子 块（第 120-137 行）与任务第 1 步（第 143-144 行）；对照 starter/index.html
- **错误**：课程正文示例和任务第 1 步都假设有三张卡片（“给第三张卡片也加上 `<span class="name">` 和 `<span class="period">` 标记名字和时期”），但 starter/index.html 里只有两张卡片（巴赫、肖邦），学习者找不到“第三张卡片”。另外 starter 第 4 行把时期的 span 写成了 class="name"（<p>时期：<span class="name">巴洛克</span></p>），与课程示例中时期用 class="period" 的约定不一致。
- **修正**：将 starter 补齐为三张卡片（或在任务措辞中改为“给每张卡片都加上”），并把 starter 第 4 行的 class="name" 改为 class="period"，与课程示例保持一致。

### 🟡 [lessons/fundamentals/html-basics/html-capstone/lesson.md](src/content/lessons/fundamentals/html-basics/html-capstone/lesson.md)
- **严重性**：🟡 minor
- **位置**：看例子 — 你的起点 块（第 127 行）与任务第 4 步“完善联系表单”（第 192-193 行）；对照 starter/index.html
- **错误**：课程声称模板包含“一个'联系我'的表单”（第 127 行），任务第 4 步也写“**完善联系表单**——给表单添加更多字段”（隐含表单已存在），但 starter/index.html 中根本没有“联系我”section 或任何 <form>（只有关于我、收藏列表、曲目表格三个 section）。学习者无法“完善”一个不存在的表单，只能从零创建，与“从模板出发”的任务设定矛盾。
- **修正**：在 starter/index.html 中补充一个含 <form> 的“联系我”section（可参照课程示例第 160-167 行的代码），使任务第 4 步“完善联系表单”成立；或把任务第 4 步改为“新建联系表单”。

### 🟡 [lessons/fundamentals/css-style/css-cascade/starter/style.css](src/content/lessons/fundamentals/css-style/css-cascade/starter/style.css)
- **严重性**：🟡 minor
- **位置**：第11行注释
- **错误**：注释写"规则 4：权重 101"，但 #special 是单个 ID 选择器，特异性为 (1,0,0)=100（lesson.md 第117行自己也写"规则4：权重 (1,0,0) = 100"），starter 注释与正文矛盾。
- **修正**：把注释改为"规则 4：权重 100"。

### 🟡 [lessons/fundamentals/css-style/css-font-spacing/lesson.md](src/content/lessons/fundamentals/css-style/css-font-spacing/lesson.md)
- **严重性**：🟡 minor
- **位置**：第107行（Web 安全字体段落）
- **错误**："Web 安全字体（如 Arial、Georgia、Times New Roman）在所有操作系统上都预装了"——事实不准确：Linux 发行版通常默认不带 Arial/Georgia/Times New Roman，而是提供度量兼容的替代字体（如 Liberation Sans/Serif）。
- **修正**：改为"在主流 Windows/macOS 上预装、使用最广泛（Linux 常以兼容替代字体呈现），但不能保证所有系统都有，因此仍要写完整字体栈并给出 fallback"。

### 🟡 [lessons/fundamentals/css-style/css-bg-border/lesson.md](src/content/lessons/fundamentals/css-style/css-bg-border/lesson.md)
- **严重性**：🟡 minor
- **位置**：常见错误 3（第150-156行）
- **错误**："当 border-radius 的值超过元素尺寸的一半时，浏览器会自动截断""如果元素宽200px，500px的圆角和100px没区别"——实际机制是按比例缩小：当相邻两角的半径之和超过对应边长时，所有圆角半径按共同比例缩小（均匀半径时等价于限制为 min(宽,高)/2）。"500px≈100px"只在元素高度也≥200px（如 200×200 方形）时成立；对 200×100 的元素，500px 实际表现为 50px。
- **修正**：改为：圆角半径超过尺寸时会被按比例缩小，最终使用值约为元素短边的一半（对正方形即一半）；不必写超大数值。

### 🟡 [lessons/fundamentals/css-style/css-box-model/starter/style.css](src/content/lessons/fundamentals/css-style/css-box-model/starter/style.css)
- **严重性**：🟡 minor
- **位置**：第10行；lesson.md 任务步骤4（第190-191行）
- **错误**：任务步骤4要求学习者"给 h2 添加 margin-top: 0，消除浏览器默认的顶部间距"，但 starter 的 .card h2 已经写好了 margin-top: 0，该步骤在起始代码中已被完成，学习者照做后不会出现预期中的"顶部间距消失"变化。
- **修正**：把 starter 中的 margin-top: 0 从 .card h2 中移除（让浏览器默认 margin 保留），或改写该步骤内容。

### 🟡 [lessons/fundamentals/css-style/css-transitions/lesson.md](src/content/lessons/fundamentals/css-style/css-transitions/lesson.md)
- **严重性**：🟡 minor
- **位置**："看例子"示例（第140-163行）
- **错误**：示例开头称"下面的代码展示了三种 hover 过渡效果"并给出了 .fade-card 与 .lift-card 两个类，但 starter 中只有 .fade-card（另有 .bounce-card、.auto-pulse 是 @keyframes 动画），不存在 .lift-card；学习者打开 CSS 选项卡找不到示例中的类，且"三种过渡效果"的数量与实际不符。
- **修正**：将示例代码改为与 starter 一致（fade-card + bounce-card + auto-pulse），或把 .lift-card 加入 starter。

### 🟡 [lessons/fundamentals/css-style/css-transitions/lesson.md](src/content/lessons/fundamentals/css-style/css-transitions/lesson.md)
- **严重性**：🟡 minor
- **位置**：任务步骤4（第230-231行）
- **错误**：步骤4要求"给页面中的按钮添加 transition: background 0.2s ease"，但 starter 的 index.html 里没有任何 <button> 元素（只有三张卡片）。
- **修正**：在 starter 中加入一个按钮元素，或改写步骤为给卡片/链接添加过渡，或明确指示学习者先自行添加按钮。

### 🟡 [lessons/fundamentals/css-style/css-animations/starter/style.css](src/content/lessons/fundamentals/css-style/css-animations/starter/style.css)
- **严重性**：🟡 minor
- **位置**：第11行；lesson.md 第158、193行
- **错误**：lesson.md 示例及说明称摇摆动画"用了 alternate（来回摆动）"，但 starter 的 .swing-card 是 animation: swing 2s ease-in-out infinite;，没有 alternate（只是靠 0%/100% 同帧间接来回）。
- **修正**：给 starter 的 .swing-card 加上 alternate，或修改 lesson 中的说明文字。

### 🟡 [lessons/fundamentals/css-style/css-variables/lesson.md](src/content/lessons/fundamentals/css-style/css-variables/lesson.md)
- **严重性**：🟡 minor
- **位置**：任务步骤1 预期（第241-243行）
- **错误**：步骤1预期"两张卡片的强调色（标题、左边框）全部变成了你改的新颜色"——但 starter 的 .card.dark 在本地覆盖了 --card-accent（金色），修改 :root 中的 --card-accent 只影响浅色卡片，暗色卡片保持金色不变。预期与变量作用域的实际行为不符。
- **修正**：把预期改为"浅色卡片（以及暗色卡片中未被覆盖的属性）变化，暗色卡片因局部覆盖仍保持金色——这恰好演示了作用域规则"。

### 🟡 [lessons/fundamentals/css-style/css-intro/lesson.md](src/content/lessons/fundamentals/css-style/css-intro/lesson.md)
- **严重性**：🟡 minor
- **位置**：第99行（方式三后的说明）
- **错误**："本项目默认使用方式二（内部样式），方便你在一个编辑器里同时看到 HTML 和 CSS"——但本课及后续课程的 starter 都是独立的 style.css 文件（index.html 里既没有 <style> 也没有 <link>，预览区另有"CSS 选项卡"），项目实际是外部样式，与"默认使用内部样式"的说法矛盾。
- **修正**：改为"本项目默认使用外部样式（单独的 style.css，通过 CSS 选项卡查看）"，或让 starter 真正使用 <style> 内部样式。

### 🟡 [lessons/fundamentals/css-layout/css-position/lesson.md](src/content/lessons/fundamentals/css-layout/css-position/lesson.md)
- **严重性**：🟡 minor
- **位置**：完整示例（第205、218、239行）
- **错误**：示例中 .product-card 设置了 overflow: hidden（注释"角标如果溢出可以隐藏"），同时角标用 top:-8px; right:-8px 并称"负值让角标突出卡片边缘"、运行结果称"微微突出的红色热销角标"——但 overflow: hidden 会裁掉溢出卡片边界的角标部分，角标实际无法"突出"，示例内部的描述自相矛盾。
- **修正**：去掉 .product-card 的 overflow: hidden（或把它移到一个不裁角标的包裹元素上），并删除/改写"角标溢出可隐藏"的注释。

### 🟡 [lessons/fundamentals/css-layout/css-centering/lesson.md](src/content/lessons/fundamentals/css-layout/css-centering/lesson.md)
- **严重性**：🟡 minor
- **位置**：第170-173行（margin:auto 生效的三个条件）
- **错误**：把"元素不能是 position: absolute 或 fixed"列为 margin:auto 生效的硬性条件不准确：绝对定位元素在设置了 left/right 两侧 inset 时（position:absolute; left:0; right:0; width:300px; margin:0 auto;）同样可以用 auto 外边距水平居中，这是经典居中技巧。
- **修正**：改为"在常规文档流中，块级元素用 margin:auto 居中需有明确宽度；绝对定位元素若同时设置了 left/right 也能用 auto 外边距居中"。

### 🟡 [lessons/fundamentals/css-layout/css-flexbox/lesson.md](src/content/lessons/fundamentals/css-layout/css-flexbox/lesson.md)
- **严重性**：🟡 minor
- **位置**：第183行（flex: 1 1 280px 注释）
- **错误**：注释称"flex: 1 1 280px"为"最小 280px，有空间就拉伸"——flex-basis 是初始主轴尺寸而非最小值，且该写法 shrink 为 1，空间不足时元素会收缩到 280px 以下，"最小 280px"的说法不准确。
- **修正**：改为"基础宽度 280px（空间不足时允许收缩），有剩余空间时拉伸"。

### 🟡 [lessons/fundamentals/css-layout/css-responsive/lesson.md](src/content/lessons/fundamentals/css-layout/css-responsive/lesson.md)
- **严重性**：🟡 minor
- **位置**：任务步骤4（第426行）
- **错误**：预期描述"窗口 > 800px 时 4 列，600-800px 时 3 列，400-600px 时 2 列"与 repeat(auto-fill, minmax(200px, 1fr)) + gap 的实际阈值不符：按 starter 的 12px gap（含 body 默认 margin），3 列约需容器宽 ≥624px，4 列约需 ≥836px，即 800px 宽的窗口仍是 3 列、600px 宽仍只有 2 列，给出的临界值不准确。
- **修正**：改为定性描述（"窗口越宽列数越多，约每 200px+间距增加一列"）或给出按公式计算的大致阈值（如 3 列约 640px、4 列约 850px 以上）。

### 🟡 [lessons/fundamentals/css-layout/css-layout-capstone/lesson.md](src/content/lessons/fundamentals/css-layout/css-layout-capstone/lesson.md)
- **严重性**：🟡 minor
- **位置**：任务步骤1（第537行）
- **错误**：步骤1说"在 index.html 中创建页面骨架（参考上面第六节的 HTML 结构）"——但第六节是"底部区域——Grid 多列 + Flexbox 内排列"，完整 HTML 骨架在任务区上方标题为"完整落地页 HTML 结构"的 example 块中（位于第七节之后），引用的小节编号错误。
- **修正**：改为"参考上方'完整落地页 HTML 结构'示例"。

### 🟡 [lessons/fundamentals/js-basics/js-timers/lesson.md](src/content/lessons/fundamentals/js-basics/js-timers/lesson.md)
- **严重性**：🟡 minor
- **位置**：task 步骤 4「常见错误提醒」（第 269 行）
- **错误**：原文："如果忘记 clearInterval(timer)，定时器会永远运行下去，即使你离开页面也不会自动停止——这就是内存泄漏的典型场景。" 在浏览器中，离开/关闭页面会卸载文档上下文，setInterval 随即终止；"离开页面也不会自动停止"是错误表述。内存泄漏的真实场景是页面仍存活时（如单页应用切换视图、元素被移除但定时器未被清理）。
- **修正**：改为："只要页面还开着（尤其是单页应用中视图切换后页面不刷新），忘记 clearInterval 的定时器就会一直运行并持有引用，造成内存泄漏；离开页面时浏览器才会终止它。"

### 🟡 [lessons/fundamentals/js-basics/js-conditions/lesson.md](src/content/lessons/fundamentals/js-basics/js-conditions/lesson.md)
- **严重性**：🟡 minor
- **位置**：truthy/falsy 小节（第 309 行与第 320 行）
- **错误**：第 309 行称"这 6 个值在条件中会被当成 false"，但随后列出 7 项（false、0、-0、""、null、undefined、NaN），第 320 行又称"除以上 7 个之外"。0 与 -0 是同一个数值，标准说法是 6 个 falsy 值，段落内计数自相矛盾。
- **修正**：统一表述：falsy 值为 6 个（false、0、""、null、undefined、NaN），-0 与 0 是同一个值，可注明"0（含 -0）"。

### 🟡 [lessons/fundamentals/js-basics/js-conditions/lesson.md](src/content/lessons/fundamentals/js-basics/js-conditions/lesson.md)
- **严重性**：🟡 minor
- **位置**：task 步骤 4 的「注意」说明（第 662 行）
- **错误**：原文："新分支要放在 answer === \"\" 的判断之前（因为"李四"不是空字符串，如果放在空字符串判断后面，空字符串会先被检查）"。该理由不成立：把「李四」分支放在空字符串判断之后依然会被命中（因为 "李四" !== "" 会跳过空分支），说明文字隐含"放后面就失效"的错误结论。
- **修正**：改为如实说明：放在空字符串分支前后都能工作，两种位置均可；若想与示例位置一致，插在 `if (answer === "肖邦")` 之后即可。

### 🟡 [lessons/fundamentals/js-basics/js-types/lesson.md](src/content/lessons/fundamentals/js-basics/js-types/lesson.md)
- **严重性**：🟡 minor
- **位置**：比较运算符小节结尾（第 61 行）
- **错误**：原文："比较结果常用于 if 条件判断中——这就是下一节课要学的！" 按 meta.yaml 的 order，js-types（order 3）的下一节是 js-functions（函数，order 4），条件判断（js-conditions）在 order 7，"下一节课"指向错误。
- **修正**：改为"后面的课程会学到"，或直接指出"条件判断将在后续课程（条件判断一课）中学习"，避免误导为下一节。

### 🟡 [lessons/fundamentals/js-basics/js-events/lesson.md](src/content/lessons/fundamentals/js-basics/js-events/lesson.md)
- **严重性**：🟡 minor
- **位置**：recap 结尾（第 377 行）
- **错误**：原文："下一节你将学习条件判断（if/else）"。按 meta.yaml 的 order，js-events（order 5）的下一节是 js-events-more（更多事件，order 6），条件判断（js-conditions）在 order 7。
- **修正**：改为"下一节你将学习更多事件类型（键盘、鼠标、输入等）"，与课程顺序一致。

### 🟡 [lessons/fundamentals/js-basics/js-loops/lesson.md](src/content/lessons/fundamentals/js-basics/js-loops/lesson.md)
- **严重性**：🟡 minor
- **位置**：recap 结尾（第 309 行）
- **错误**：原文："下一节你将学习对象——把每条记录的多个属性（名字、价格、分类）打包在一起"。按 meta.yaml 的 order，js-loops（order 9）的下一节是 js-array-methods（数组方法进阶，order 10），对象在 order 12，且中间还隔着 js-querySelectorAll（order 11）。
- **修正**：改为"下一节你将学习数组方法进阶（map/filter）"，或按实际顺序调整指向。

### 🟡 [lessons/fundamentals/js-basics/js-objects/lesson.md](src/content/lessons/fundamentals/js-basics/js-objects/lesson.md)
- **严重性**：🟡 minor
- **位置**：recap 结尾（第 302 行）
- **错误**：原文："下一节你将学习定时器——让代码按时间节奏自动运行"。按 meta.yaml 的 order，js-objects（order 12）的下一节是 js-dom-advanced（DOM 操作进阶，order 13），定时器（js-timers）在 order 14。
- **修正**：改为"下一节你将学习 DOM 操作进阶——动态创建与删除元素"。

### 🟡 [lessons/fundamentals/js-basics/js-capstone/lesson.md](src/content/lessons/fundamentals/js-basics/js-capstone/lesson.md)
- **严重性**：🟡 minor
- **位置**：analogy 块（第 4 行）
- **错误**：原文："这节综合课把前11节课的知识融合在一起"。js-capstone 是本章第 15 课（meta.yaml order 15），前面共有 14 节课，"前11节课"是过时计数。
- **修正**：改为"前14节课"（或按实际章节内课程数核对后修正）。

### 🟡 [lessons/fundamentals/js-basics/js-array-methods-2/lesson.md](src/content/lessons/fundamentals/js-basics/js-array-methods-2/lesson.md)
- **严重性**：🟡 minor
- **位置**：.sort() 小节（第 121-123 行）
- **错误**：原文："names.sort(); // names 是 ["张三", "李四", "王五", "赵六"]（按拼音）"。数组默认 sort 是按 UTF-16 码点（Unicode 字典序）比较字符串，并不按拼音排序；本例结果恰好与拼音序一致，但"（按拼音）"是对默认排序行为的错误解释。
- **修正**：将注释改为"（按字符编码序）"或"（本例结果恰与拼音序一致）"，并说明默认按 Unicode 码点比较、中文不按拼音。

### 🟡 [lessons/framework/js-advanced/js-es6-syntax/lesson.md](src/content/lessons/framework/js-advanced/js-es6-syntax/lesson.md)
- **严重性**：🟡 minor
- **位置**：「箭头函数」explain 代码块 114-117 行
- **错误**：注释称箭头函数 `console.log(this.name)` 输出 `undefined`（this=window）。实际上 `window.name` 是浏览器内置属性，默认值为空字符串 `""`，顶层 `this` 即 window，因此输出的是空字符串而非 undefined。
- **修正**：输出注释应为空字符串（控制台显示空行）；若要演示 undefined，应访问 window 上不存在的属性（如 this.foo），或改为输出 `this` 本身。

### 🟡 [lessons/framework/js-advanced/js-es6-syntax/lesson.md](src/content/lessons/framework/js-advanced/js-es6-syntax/lesson.md)
- **严重性**：🟡 minor
- **位置**：recap 段 331 行
- **错误**：「但注意 it 不绑定自己的 this」中 "it" 是错字，应为「它」；语句不通顺。
- **修正**：改为「但注意它不绑定自己的 this」。

### 🟡 [lessons/framework/js-advanced/workflow-closures/lesson.md](src/content/lessons/framework/js-advanced/workflow-closures/lesson.md)
- **严重性**：🟡 minor
- **位置**：「闭包的三大实际应用」代码块 96 行
- **错误**：注释「wallet.balance = 100000; // 这一行写不进——不受影响」错误：普通赋值 `wallet.balance = 100000` 完全可以在对象上创建/写入 balance 属性，只是不影响闭包内部的私有 balance（getBalance() 仍返回 150）。
- **修正**：应改为「这一行虽然能写入对象属性，但不会影响闭包内部的 balance——getBalance() 依然返回 150」；「写不进」的说法与 JS 对象赋值行为矛盾。

### 🟡 [lessons/framework/js-advanced/workflow-closures/lesson.md](src/content/lessons/framework/js-advanced/workflow-closures/lesson.md)
- **严重性**：🟡 minor
- **位置**：「常见错误」错误3，220-227 行
- **错误**：错误3 标注 ❌ 的代码实际是正确写法（外层已写 `let count = 0`，还带 ✅ 注释），与标题「忘记声明变量，导致闭包引用全局变量」及 ❌ 描述（内部函数里直接写 count=0 没加 let）完全对不上，真正的错误代码没有展示。
- **修正**：应展示真正的错误写法，例如 `function createCounter() { return function() { count = 0; count++; return count; } }`（count 未声明成为全局变量），再把正确写法放在 ✅ 下。

### 🟡 [lessons/framework/js-advanced/workflow-console-intro/lesson.md](src/content/lessons/framework/js-advanced/workflow-console-intro/lesson.md)
- **严重性**：🟡 minor
- **位置**：「三种最常见的错误类型」TypeError 示例代码块 83-84 行
- **错误**：标 ❌ 的「S 大写了」示例行与 ✅ 行代码完全相同（都是 `document.querySelector("#btn")`），并没有展示所描述的大小写错误，因此该行不会产生注释声称的 `TypeError: document.querySelector is not a function`。
- **修正**：❌ 行应写成真正大写 S 的 `document.QuerySelector("#btn")`，对应错误才是 `document.QuerySelector is not a function`。

### 🟡 [lessons/framework/js-advanced/workflow-console-intro/lesson.md](src/content/lessons/framework/js-advanced/workflow-console-intro/lesson.md)
- **严重性**：🟡 minor
- **位置**：SyntaxError 示例代码块 97-98 行
- **错误**：`function sayHello(name {` 在 Chrome/V8 中的实际报错是 `SyntaxError: Missing ) after argument list`，注释写的 `Unexpected token '{'` 不是该写法的实际错误消息。
- **修正**：将注释改为 `SyntaxError: Missing ) after argument list`（错误类型仍是 SyntaxError，教学结论不变）。

### 🟡 [lessons/framework/js-advanced/workflow-console-intro/lesson.md](src/content/lessons/framework/js-advanced/workflow-console-intro/lesson.md)
- **严重性**：🟡 minor
- **位置**：hint「需要线索？」196-197 行
- **错误**：提示称「4. DOM 方法名拼写错误 -- TypeError」，但 starter/script.js 中第 4 个错误是 `msg.textContet = ...`（属性名拼写错误），对不存在的属性赋值不会报错（静默失败），既不是方法名错误，也不会产生 TypeError；与第 5 条（innerHTML 属性拼写）才是同类。
- **修正**：第 4 条应改为「DOM 属性名拼写错误（textContet）——属性赋值无效，不报错但功能不生效」，与 starter 实际埋的 5 个错误一致。

### 🟡 [lessons/framework/js-advanced/workflow-create-element/lesson.md](src/content/lessons/framework/js-advanced/workflow-create-element/lesson.md)
- **严重性**：🟡 minor
- **位置**：「先看问题」56 行 及「常见错误」错误1 151-153 行
- **错误**：「如果 song.title 里包含 `<script>alert('XSS')</script>`，它会被执行」「用户输入包含 <script> 标签会被执行」——按 HTML 规范，通过 innerHTML 插入的 `<script>` 元素不会执行（脚本被标记为 already-started）。该示例本身是安全结论正确但具体机制错误。
- **修正**：应改用会真正触发的注入向量，如 `<img src=x onerror=alert(1)>`；或注明「script 标签本身经 innerHTML 插入不会执行，但内联事件属性（onerror 等）会被执行，同样有 XSS 风险」。

### 🟡 [lessons/framework/js-advanced/workflow-event-delegation/lesson.md](src/content/lessons/framework/js-advanced/workflow-event-delegation/lesson.md)
- **严重性**：🟡 minor
- **位置**：「关键技巧」60 行 与 95 行
- **错误**：「event.target 是实际被点击的元素（可能是 div、h3、button、甚至文字节点）」「点这里，event.target = 文字节点」——浏览器中 click 等鼠标事件的目标永远是元素节点（Element），文本节点不会成为事件目标；点击按钮内文字时 target 仍是 button 元素。
- **修正**：删除「文字节点」的说法，改为「target 可能是 h3、button 等任意内层元素」；这也解释了为何需要 closest() 向上查找。

### 🟡 [lessons/framework/js-advanced/workflow-naming/lesson.md](src/content/lessons/framework/js-advanced/workflow-naming/lesson.md)
- **严重性**：🟡 minor
- **位置**：「常见错误」错误2，161 行
- **错误**：「JS 变量名不要用 kebab-case：`let user-name = "张三"; // user-name 等于 user 减 name = NaN`」——声明语句中出现连字符会直接抛 SyntaxError: Unexpected token '-'，整个声明根本无法执行，不存在「user 减 name = NaN」的求值结果。
- **修正**：应说明：JS 标识符不能含连字符，`let user-name` 是语法错误，连字符在表达式中才会被当作减法运算符。

### 🟡 [lessons/framework/js-advanced/workflow-plan-first/lesson.md](src/content/lessons/framework/js-advanced/workflow-plan-first/lesson.md)
- **严重性**：🟡 minor
- **位置**：task 第4步 purpose 174 行
- **错误**：「querySelectorAll 返回 NodeList，其 .length 属性动态反映页面元素数量」——querySelectorAll 返回的是静态 NodeList，查询之后 DOM 再增删元素，length 不会更新；会「动态反映」的是 getElementsByTagName 等 live 集合。
- **修正**：改为「.length 反映查询时刻的元素数量」；若要强调动态，需换成 live 集合的说法或删去「动态」二字。

### 🟡 [lessons/framework/js-advanced/workflow-this/lesson.md](src/content/lessons/framework/js-advanced/workflow-this/lesson.md)
- **严重性**：🟡 minor
- **位置**：规则2 98 行、规则4 138/143 行、常见错误错误1 194 行
- **错误**：多处注释称独立调用/箭头函数时 `this.name` 输出 undefined 且「window.name 不存在」。实际上 `window.name` 是浏览器内置属性（默认空字符串），顶层 this=window 时 `this.name` 输出的是空字符串，并非 undefined；「window.name 不存在」说法错误。
- **修正**：将「window.name 不存在 → undefined」改为「window.name 默认为空字符串 → 输出空串」；或改用 window 上确实不存在的属性来演示 undefined。

### 🟡 [lessons/framework/async-data/async-promise/lesson.md](src/content/lessons/framework/async-data/async-promise/lesson.md)
- **严重性**：🟡 minor
- **位置**：「一、先看问题」48 行
- **错误**：「两个不依赖的异步操作想同时执行？回调做不到」——回调模式完全可以同时发起两个独立的异步操作（它们会并发执行），真正的痛点是等待全部完成并合并结果。
- **修正**：改为「回调难以'等两个都完成再汇总'，这正是 Promise.all 解决的痛点」。

### 🟡 [lessons/framework/async-data/async-promise/lesson.md](src/content/lessons/framework/async-data/async-promise/lesson.md)
- **严重性**：🟡 minor
- **位置**：task 第1步 294-297 行
- **错误**：任务指示「打开 script.js，用 new Promise 模拟订票功能（70% 概率成功，延迟 1 秒）」与 starter/script.js 内容不匹配——starter 提供的是 searchUser() 用户查询脚手架（fetch + 渲染卡片），没有任何订票相关内容，学习者按指示打开文件找不到对应练习。
- **修正**：将第 1 步改为与 starter 一致的任务（如用 new Promise 包装 searchUser 的成功/失败路径），或为订票模拟在 starter 中提供对应占位代码。

### 🟡 [lessons/framework/async-data/async-await/lesson.md](src/content/lessons/framework/async-data/async-await/lesson.md)
- **严重性**：🟡 minor
- **位置**：task 第2步 243-247 行
- **错误**：任务要求「用 Promise.all 并行获取 fetchProgram(concert.id) 和 fetchVenue(concert.venueId)」并期望返回 { concert, program, venue }，但 starter 只提供 fetchConcert 和 fetchProgram，没有 fetchVenue，fetchConcert 返回的对象也没有 venueId 字段，学习者无法按指示完成。
- **修正**：在 starter 中补充 fetchVenue 函数（含 venueId 字段）与对应注释，或把任务改为基于现有 fetchProgram 的并行练习。

### 🟡 [lessons/framework/async-data/async-event-loop/lesson.md](src/content/lessons/framework/async-data/async-event-loop/lesson.md)
- **严重性**：🟡 minor
- **位置**：task 第1步 expected 155 行
- **错误**：「D 虽然在 C 之前设置，但 D 是异步回调（即使延迟 0ms），必须等同步代码跑完才执行」——starter 代码中先设置 C（500ms）再设置 D（0ms），D 并非在 C 之前设置；D 先于 C 输出的原因是延迟更短（0ms vs 500ms），不是设置顺序。
- **修正**：改为「D 虽然设置在 C 之后、且延迟为 0ms，但两者都是异步回调，都必须等同步代码（A、B）跑完；D 因延迟更短而先于 C 执行」。

### 🟡 [lessons/framework/async-data/async-fetch/lesson.md](src/content/lessons/framework/async-data/async-fetch/lesson.md)
- **严重性**：🟡 minor
- **位置**：「常见错误」错误3，292 行
- **错误**：「body: { title: 'hello' } // 对象会被转成 '[object Object]' 字符串！」——fetch 的 BodyInit 不接受普通对象，传对象会直接抛 TypeError（Failed to execute 'fetch'...），不会静默转成字符串发送（那是 XHR send() 的行为）。
- **修正**：改为「body 传普通对象会直接抛 TypeError（body 必须是字符串/Blob/FormData 等），而不是发送请求」；正确做法仍是 JSON.stringify。

### 🟡 [lessons/framework/async-data/async-fetch/lesson.md](src/content/lessons/framework/async-data/async-fetch/lesson.md)
- **严重性**：🟡 minor
- **位置**：task 第2步 expected 353 行
- **错误**：「运行两次，得到两个不同的 id」——jsonplaceholder 是静态 mock，POST /posts 每次固定返回 id: 101，运行两次得到的是相同 id。
- **修正**：expected 改为「返回 id: 101（mock 固定值）」或注明这是模拟接口，真实后端才会返回递增 id。

### 🟡 [lessons/framework/async-data/async-cors-rest/lesson.md](src/content/lessons/framework/async-data/async-cors-rest/lesson.md)
- **严重性**：🟡 minor
- **位置**：「二、同源策略」55 行
- **错误**：「那个标签页的 JS 就能以你的登录状态向银行发请求，读取你的账户余额——这就是 CSRF 攻击」——CSRF 指的是伪造跨站请求（发送），同源策略阻止的恰恰是「读取」跨域响应；即便有同源策略，携带 Cookie 的伪造请求也能发出（CSRF 因此成立）。把「读取余额」称为 CSRF 混淆了两个不同机制。
- **修正**：应分开表述：「没有同源策略，恶意页面能读取银行响应（账户信息泄露）——这是同源策略要防的；而『借你的登录状态发请求』即使有同源策略也可能发生，那才是 CSRF（防 CSRF 靠 token/SameSite Cookie 等）」。

### 🟡 [lessons/framework/async-data/workflow-localstorage/lesson.md](src/content/lessons/framework/async-data/workflow-localstorage/lesson.md)
- **严重性**：🟡 minor
- **位置**：「常见错误」错误1，168-170 行
- **错误**：「list 是 '"[1,2,3]"' 字符串！… console.log(list.length) // 11」——JSON.stringify([1,2,3]) 的存储结果是 `[1,2,3]`（不含外层引号，共 7 个字符），getItem 取出的字符串长度是 7，不是 11，注释中多写的引号也不存在。
- **修正**：改为「list 是 '[1,2,3]' 字符串（长度 7，不是 3！）」；或若要演示带引号的长字符串，需重新构造示例数据使长度与注释一致。

### 🟡 [lessons/engineering/engineering-tooling/tooling-github/lesson.md](src/content/lessons/engineering/engineering-tooling/tooling-github/lesson.md)
- **严重性**：🟡 minor
- **位置**：task 步骤1（第167行）
- **错误**："选择 Public（公开仓库，私有仓库需要付费——但个人开发者免费）"——同一句内自相矛盾且过时：GitHub 自 2019 年起免费账号即可创建无限量私有仓库，不存在"私有仓库需要付费"。
- **修正**：改为"公开仓库任何人都能看到；私有仓库个人免费账号也能创建（默认仅自己可见）"。

### 🟡 [lessons/engineering/engineering-tooling/tooling-vite/lesson.md](src/content/lessons/engineering/engineering-tooling/tooling-vite/lesson.md)
- **严重性**：🟡 minor
- **位置**：第46行
- **错误**："浏览器自动打开 http://localhost:5173，一个可以立刻开始改代码的 Vue 项目就在眼前。"——Vite 开发服务器默认不会自动打开浏览器（需 `--open` 或配置 server.open）；且同课任务步骤1（第211行）又写"在浏览器中打开这个地址"，前后不一致。
- **修正**：改为"终端会显示 http://localhost:5173，手动在浏览器中打开这个地址"。

### 🟡 [lessons/engineering/engineering-tooling/tooling-vscode/lesson.md](src/content/lessons/engineering/engineering-tooling/tooling-vscode/lesson.md)
- **严重性**：🟡 minor
- **位置**：Emmet 示例（第63-65行）
- **错误**："最后这条生成一个完整的卡片结构——图片 + 标题 + 描述，放在一个 div 里。**10 个字符展开了 6 行代码。**"——缩写 `div.card>img[src=""][alt=""]+h2{标题}+p{描述}` 有 40 多个字符，不是 10 个字符。
- **修正**：改为"一行缩写展开了 6 行代码"（去掉具体字符数，或改述为"十几行 HTML 压缩成一行缩写"）。

### 🟡 [lessons/engineering/engineering-tooling/tooling-npm/lesson.md](src/content/lessons/engineering/engineering-tooling/tooling-npm/lesson.md)
- **严重性**：🟡 minor
- **位置**：第85-88行
- **错误**："现在看 package.json 多了什么：`"dependencies": { "dayjs": "^2.0.0" }`"——dayjs 目前一直是 1.x 版本（1.11.x），实际执行 `npm install dayjs` 后记录的是 `^1.11.x` 而不是 `^2.0.0`，课文把示意版本当成真实安装结果展示。
- **修正**：改为 `"dayjs": "^1.11.x"`，或注明"版本号以实际安装为准，这里 ^2.0.0 只是示意"。

### 🟡 [lessons/engineering/engineering-tooling/tooling-git-init/lesson.md](src/content/lessons/engineering/engineering-tooling/tooling-git-init/lesson.md)
- **严重性**：🟡 minor
- **位置**：git log 示例（第141-144行）
- **错误**：示例输出 "Date: Sat Jul 20 14:30:00 2026 +0800"——2026年7月20日是周一而非周六（2024年7月20日才是周六），星期与年份不一致，可能是年份笔误（同一课程其他示例时间均为 2024 年）。
- **修正**：改为 "Sat Jul 20 14:30:00 2024 +0800"，或把年份/星期改成一致的值。

### 🟡 [lessons/engineering/vue-framework/vue-lifecycle/lesson.md](src/content/lessons/engineering/vue-framework/vue-lifecycle/lesson.md)
- **严重性**：🟡 minor
- **位置**：第273行
- **错误**："如果你在 mouted 里写了 addEventListener"——"mouted" 是 "mounted" 的拼写错误（应为 onMounted），API 名拼错可能让新手困惑。
- **修正**：改为"如果你在 onMounted 里写了 addEventListener"。

### 🟡 [lessons/engineering/vue-framework/tooling-ref-reactive/lesson.md](src/content/lessons/engineering/vue-framework/tooling-ref-reactive/lesson.md)
- **严重性**：🟡 minor
- **位置**：常见错误-错误2（第244-252行）
- **错误**：解构 `const { name, age } = state.value` 丢失响应式后，给出的修正建议"✅ 用 reactive 代替 ref"并不能解决问题——对 reactive 对象直接解构同样会丢失响应式（正确做法是 toRefs 或不解构直接访问），该建议本身是错的。
- **修正**：改为"不要解构，直接通过 state.value.name 访问；或使用 toRefs(state) 保持响应式"。

### 🟡 [lessons/engineering/vue-framework/tooling-capstone/lesson.md](src/content/lessons/engineering/vue-framework/tooling-capstone/lesson.md)
- **严重性**：🟡 minor
- **位置**：hint 区（第232行）
- **错误**："**tailwind 怎么部署？** -- 回顾工程化第 8 课"——整个工程篇从未讲过 Tailwind，"部署"也不是工程化第 8 课（第8课是 ESLint 课）的内容，属于残留/无效引用。
- **修正**：删除该条，或改为真实对应的指引（如"部署怎么做？回顾 tooling-build-deploy 一课"）。

### 🟡 [lessons/engineering/engineering-tooling/tooling-build-deploy/lesson.md](src/content/lessons/engineering/engineering-tooling/tooling-build-deploy/lesson.md)
- **严重性**：🟡 minor
- **位置**：错误1（第167-168行）
- **错误**：把 `base: './'` 标注为"错误：相对路径在 GitHub Pages 上行为不确定"——Vite 官方文档明确支持相对 base（`base: './'` 是文档列出的合法取值），在 GitHub Pages 子路径部署时资源相对引用是可行的；它并非错误写法，只是对 history 模式深链路路由有局限。
- **修正**：表述为"也可以用 `base: './'`（Vite 支持相对路径），但显式写 `base: '/music-collection/'` 更可预测、更推荐"。

### 🟡 [lessons/engineering/vue-framework/vue-philosophy/lesson.md](src/content/lessons/engineering/vue-framework/vue-philosophy/lesson.md)
- **严重性**：🟡 minor
- **位置**：声明式示例模板（第158-160行）
- **错误**：`<li v-for="item in filtered" :key="item.name">` 直接作为 `<template>` 根级元素、没有 `<ul>` 包裹，是无效 HTML（同样的写法也出现在 tooling-ref-reactive 第219行）。虽然浏览器/Vue 能渲染，但语义不正确。
- **修正**：用 `<ul>` 包裹 `<li>`，或把循环元素改为 `<div>`。

### 🟡 [lessons/engineering/vue-framework/tooling-props-emits/lesson.md](src/content/lessons/engineering/vue-framework/tooling-props-emits/lesson.md)
- **严重性**：🟡 minor
- **位置**：常见错误-错误3（第307-318行）
- **错误**："❌ 模板中必须用 kebab-case（短横线）：<MusicCard @toggleLike="handle" />"——在 SFC 模板中，`@toggleLike` 与 `emit('toggleLike')` 是能匹配的（camelCase 事件在模板中正常工作），kebab-case 只是官方推荐风格而非强制；"必须"仅对 in-DOM 模板（HTML 属性大小写不敏感）成立。把 camelCase 监听器标为错误不准确。
- **修正**：改为"官方推荐在模板中统一用 kebab-case，但 SFC 中 `@toggleLike` 也能匹配 `emit('toggleLike')`；真正要避免的是声明与监听时事件名本身大小写不一致"。

### 🟡 [lessons/ai-collaboration/ai-basics/ai-prompt-basics/lesson.md](src/content/lessons/ai-collaboration/ai-basics/ai-prompt-basics/lesson.md)
- **严重性**：🟡 minor
- **位置**：二、解决方案 → 原则 4 → 综合应用示例（约第 137 行）
- **错误**：把 CSS 自定义属性（CSS variables）误标为"SCSS 变量"。原文："4. SCSS 变量：--card-radius: 12px, --card-shadow: 0 2px 8px rgba(0,0,0,0.1)"。`--` 前缀（如 `--card-radius`）是 CSS 自定义属性（CSS Custom Properties），不是 SCSS 变量；SCSS 变量以 `$` 前缀（如 `$card-radius`）。概念名称与语法形式不匹配，学习者可能据此写出错误的 SCSS 变量用法。
- **修正**：若意图是 SCSS 变量，应写 `$card-radius: 12px; $card-shadow: 0 2px 8px rgba(0,0,0,0.1)`；若意图是 CSS 自定义属性，则去掉"SCSS"字样，改为"CSS 变量：--card-radius: ..."。

### 🟡 [lessons/ai-collaboration/ai-basics/ai-mindset/lesson.md](src/content/lessons/ai-collaboration/ai-basics/ai-mindset/lesson.md)
- **严重性**：🟡 minor
- **位置**：二、解决方案 → 第一层：机器码 / 汇编（约第 21 行）
- **错误**：指令 MOV 的搬运方向说反了。原文："`MOV AX, [0100h]`——告诉 CPU 把哪个寄存器的值搬到哪个内存地址"。实际上 `MOV AX, [0100h]` 是把内存地址 0100h 处的值（一个字）搬入寄存器 AX，方向是"内存 → 寄存器"，不是"寄存器 → 内存"。
- **修正**：改为："`MOV AX, [0100h]`——告诉 CPU 把内存地址 0100h 的值搬到寄存器 AX"（或举一个寄存器→内存的例子，如 `MOV [0100h], AX` 再配相应描述）。

### 🟡 [lessons/ai-collaboration/ai-project/ai-capstone/lesson.md](src/content/lessons/ai-collaboration/ai-project/ai-capstone/lesson.md)
- **严重性**：🟡 minor
- **位置**：二、你的项目日记 → 日记示例 Day 5（约第 48 行）
- **错误**：引用了一个不存在的浏览器控制台报错。原文："控制台报错 'setInterval is not cleared'"。浏览器/JS 引擎不会产生 "setInterval is not cleared" 这条错误消息；组件卸载后未清理的 setInterval 通常不会在控制台报这样的错（只是定时器继续运行、可能造成内存泄漏或对已卸载组件的状态更新）。把虚构的报错信息当作真实控制台输出展示，可能误导学习者去搜索一个不存在的错误。
- **修正**：改为符合实际情况的描述，例如："控制台报错 'Cannot read properties of undefined (reading ...)'（定时器回调在组件卸载后仍在执行）"，或直接描述症状而不加引号："切换页面后计时器还在跑——onUnmounted 里没有清理定时器"。

### 🟡 [lessons/ai-collaboration/ai-frontend/ai-css/lesson.md](src/content/lessons/ai-collaboration/ai-frontend/ai-css/lesson.md)
- **严重性**：🟡 minor
- **位置**：二、解决方案 → 维度 2：响应式 检查项（约第 35 行）
- **错误**：触控目标尺寸表述不精确。原文："至少 44x44px，符合 iOS/Android 的人机交互规范"。44×44 是 Apple HIG（iOS）的推荐触控目标（44×44pt）；Android Material Design 的规范是 48×48dp。声称 44px 同时符合 iOS 和 Android 规范并不准确。
- **修正**：改为："至少 44x44px（iOS 规范为 44x44pt，Android Material 建议 48x48dp）"，或简化为"至少 44x44px（苹果 HIG 建议值；Android 建议 48dp）"。

### 🟡 [projects/projects/music-collection-v3/project.json](src/content/projects/projects/music-collection-v3/project.json)
- **严重性**：🟡 minor
- **位置**：步骤 1（task）vs steps/01.md
- **错误**：步骤 1 的任务要求“给自己选择这次至少做到标准版还是挑战版”，但 01.md 正文只讲工程化四环节与前提条件，没有任何标准版/挑战版完成线的定义，任务与正文不对应。
- **修正**：在 01.md 中补充完成线（最低/标准/挑战）说明，或调整任务措辞使其与正文一致。

### 🟡 [projects/projects/music-collection-v3/steps/02.md](src/content/projects/projects/music-collection-v3/steps/02.md)
- **严重性**：🟡 minor
- **位置**：第 39 行 vs 第 199 行
- **错误**：第 39 行的示例 `cd D:\MyWorkspace\...\music-collection-vue` 使用了反斜杠路径，而第 199 行又说“在终端和 .gitignore 中，始终用正斜杠 /”，前后自相矛盾。
- **修正**：统一示例写法：Windows 终端中反斜杠是常规写法，建议删除“终端中始终用正斜杠”的绝对化表述，或把第 39 行示例改为正斜杠。

### 🟡 [projects/projects/music-collection-v3/steps/03.md](src/content/projects/projects/music-collection-v3/steps/03.md)
- **严重性**：🟡 minor
- **位置**：“情况 C”（第 80-81 行）
- **错误**：“直接报错 'Permission denied' - 说明 SSH 密钥未配置” —— 本步骤全程使用 HTTPS 远程地址，HTTPS 推送时出现的 Permission denied/Authentication failed 通常是凭据或 Token 问题；“Permission denied (publickey)”才是 SSH 密钥问题。
- **修正**：区分报错类型：HTTPS 场景应先检查凭据/Personal Access Token；只有使用 SSH 远程地址且报 publickey 错误才需要配置 SSH 密钥。

### 🟡 [projects/projects/music-collection-v3/steps/03.md](src/content/projects/projects/music-collection-v3/steps/03.md)
- **严重性**：🟡 minor
- **位置**：常见错误最后一条（第 173 行）
- **错误**：“确件名是 README.md，大写 README” —— “确件名”为笔误。
- **修正**：应为“确认文件名是 README.md，大写 README”。

### 🟡 [projects/projects/music-searcher/steps/05.md](src/content/projects/projects/music-searcher/steps/05.md)
- **严重性**：🟡 minor
- **位置**：第 105-116 行（SUCCESS 分支的模板字符串）
- **错误**：`onerror="this.src='data:image/svg+xml,...'"  /* 图片加载失败时显示占位图 */` 位于反引号模板字符串内，`/* ... */` 并不是 JS 注释，会被原样输出进生成的 HTML（产生非法属性）；且 `data:image/svg+xml,...` 是字面占位符，直接复制不会生效。
- **修正**：把注释移到模板字符串之外，并给出完整可用的 data URI 或改用其它占位方案。

### 🟡 [projects/projects/music-searcher/steps/06.md](src/content/projects/projects/music-searcher/steps/06.md)
- **严重性**：🟡 minor
- **位置**：“本步骤完成标准”（第 208 行）
- **错误**：“能指出代码中的三个分层（事件层、控制层、服务层、视图层）” —— 括号里列出了 4 层，却说“三个分层”，前后不一致。
- **修正**：改为“四个分层”，或只保留三个分层。

### 🟡 [projects/projects/music-searcher/project.json](src/content/projects/projects/music-searcher/project.json)
- **严重性**：🟡 minor
- **位置**：步骤 6（title: 收尾与回顾）task vs steps/06.md
- **错误**：步骤 6 的任务要求“确认五种状态都能正常工作…”，属于验收测试内容（与步骤 8 的 08.md 验收清单重复），而 steps/06.md 正文是“代码回顾”（数据流与架构分层分析），任务与正文不对应。
- **修正**：把该步骤任务改为回顾/解释类，或把测试内容集中到 08.md。

### 🟡 [projects/projects/music-showcase/project.json](src/content/projects/projects/music-showcase/project.json)
- **严重性**：🟡 minor
- **位置**：步骤 4（title: 排列你的代表作）starterCode vs steps/04.md
- **错误**：步骤 4 的 starterCode 使用 `<h3>🎼 代表作</h3>` 且 CSS 是 `.works-section h3`，而 steps/04.md 正文使用 `<h2>代表作品</h2>` 且 CSS 是 `.works-section h2`；标题层级不一致，按正文操作样式不会生效。
- **修正**：统一为同一标题层级（h2 或 h3），保证正文 CSS 选择器与 starterCode 的标记一致。

### 🟡 [quiz/vue-basic.yaml](src/content/quiz/vue-basic.yaml)
- **严重性**：🟡 minor
- **位置**：level 3 响应式实战 / Q361
- **错误**：题目代码 `const obj = reactive({a:1}); const b = obj.a; b = 2;` 中对 const 声明的 b 赋值会直接抛出 TypeError（Assignment to constant variable），题目前提不成立。
- **修正**：应使用 `let b = obj.a; b = 2;`，答案"obj.a 不会变"才成立。

### 🟡 [quiz/css-layout.yaml](src/content/quiz/css-layout.yaml)
- **严重性**：🟡 minor
- **位置**：level 3 响应式实战 / Q93
- **错误**："无限旋转动画 @keyframes 怎么写？"将选项0（from{rotate:0}to{rotate:360deg}）和选项3（0%{rotate:0}100%{rotate:1turn}）标为错误，但 rotate 是 CSS 独立的 transform 属性（2022 年起现代浏览器均支持），这两个写法同样是合法可用的旋转动画。
- **修正**：应承认使用独立 rotate 属性的写法也合法（或把题目限定为"经典 transform:rotate() 写法"）。

### 🟡 [quiz/performance.yaml](src/content/quiz/performance.yaml)
- **严重性**：🟡 minor
- **位置**：level 1 性能概念 / Q300
- **错误**：Core Web Vitals 仍写作"LCP/FID/CLS"且"FID<100ms"，FID 已于 2024 年 3 月被 INP 正式取代；且本文件 Q436 已说明"INP 替代 FID"，前后不一致。
- **修正**：更新为 LCP/INP/CLS（INP 良好阈值 <200ms），或注明"FID（已被 INP 取代）"。

### 🟡 [quiz/js-practice.yaml](src/content/quiz/js-practice.yaml)
- **严重性**：🟡 minor
- **位置**：level 1 DOM 选择器 / Q454
- **错误**：解析称 element.remove() 是"现代 DOM API（ES5+）"——ES5 是 2009 年的 JS 标准，remove() 实际是 DOM Living Standard（约 2016 年）新增的方法，与 ES5 无关。
- **修正**：改为"现代 DOM 规范（DOM Living Standard）提供的 API"。

### 🟡 [quiz/principles.yaml](src/content/quiz/principles.yaml)
- **严重性**：🟡 minor
- **位置**：level 3 事件循环深入 / Q478
- **错误**：解析末尾称"Vue 自动用事件委托处理列表中的事件"——Vue 并不会自动对列表元素做事件委托，@click 等监听器是直接绑定在使用指令的元素上的。
- **修正**：删除该句或改为准确表述：Vue 未内置自动事件委托，事件直接绑定在对应元素上。

### 🟡 [glossary/terms.yaml](src/content/glossary/terms.yaml)
- **严重性**：🟡 minor
- **位置**：key: pushArr
- **错误**：术语 key 写作 "pushArr"，这不是任何真实的 JS API 名称；条目内容实际描述的是数组方法 push。
- **修正**：key 应改为真实的 API 名 push。

### 🟡 [glossary/terms.yaml](src/content/glossary/terms.yaml)
- **严重性**：🟡 minor
- **位置**：key: href
- **错误**："必须写完整网址（含 https://）"——href 完全支持相对路径（如 about.html、/docs、#section），只有写裸域名且省略协议时才会被当作相对路径解析。
- **修正**：改为"外链需写完整 URL（含协议），站内链接可用相对路径"。

### 🟡 [glossary/terms.yaml](src/content/glossary/terms.yaml)
- **严重性**：🟡 minor
- **位置**：keys: 模板字符串（Template Literal）/模板字符串、盒模型（Box Model）/盒模型、事件对象（event）/事件对象、回调函数（Callback）/回调函数
- **错误**：存在多组内容基本相同的重复条目（中英文括号两种写法各一条）。
- **修正**：合并重复条目，每个概念只保留一条。

### 🟡 [glossary/terms.yaml](src/content/glossary/terms.yaml)
- **严重性**：🟡 minor
- **位置**：key: px
- **错误**："1px 是屏幕上最小的一个点"——CSS 像素与物理像素不是一回事，高 DPI（Retina）屏幕上 1 CSS px 可能对应 2×2 甚至更多物理像素。
- **修正**：改为"1px 是 CSS 的长度基本单位；高 DPI 设备上 1 CSS px 对应多个物理像素"。

---

## 修复优先级建议

1. **critical + major**：直接影响学习者认知与动手体验，优先修复
2. **minor 中「课程与 starter 代码不一致」类**：虽标 minor，但会导致学习者在任务中卡住（如 css-transitions、css-animations、css-box-model 等），建议与 major 同步修复
3. 纯措辞/历史细节类 minor：可在后续内容迭代中顺带修正

> 本报告由 AI 分片审查生成，修复前建议逐条人工复核（历史时间线类请以权威来源为准）。修复后请重新运行 `yarn build:content` 与 `yarn test`。
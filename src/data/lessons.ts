import type { Lesson, Chapter } from "../types";

export const chapters: Chapter[] = [
  {
    id: "html-basics",
    title: "第一章 HTML 基础",
    subtitle: "用代码乐章写你的第一页乐谱",
    icon: "🎼",
  },
  {
    id: "css-style",
    title: "第二章：CSS 样式",
    subtitle: "为音乐增添色彩与层次",
    icon: "🎨",
  },
  {
    id: "css-layout",
    title: "第三章：CSS 布局",
    subtitle: "排列你的音乐元素",
    icon: "📐",
  },
  {
    id: "js-basics",
    title: "第四章：JavaScript 入门",
    subtitle: "让页面动起来，像音乐一样流动",
    icon: "🎹",
  },
  {
    id: "js-advanced",
    title: "第五章：JavaScript 进阶",
    subtitle: "从独奏到合奏——写出更优雅的代码",
    icon: "🎻",
  },
  {
    id: "async-data",
    title: "第六章：异步与数据",
    subtitle: "与服务器对话，让数据流动起来",
    icon: "🌐",
  },
  {
    id: "engineering-tooling",
    title: "第七章：工程入门",
    subtitle: "走出琴房——用专业工具打造项目",
    icon: "🔧",
  },
  {
    id: "vue-framework",
    title: "第八章：Vue 实战",
    subtitle: "像交响乐团一样组织你的代码",
    icon: "🎤",
  },
];

export const lessons: Lesson[] = [
  // ================================================================
  // HTML 基础
  // ================================================================

  // ===== 1.1 html-intro =====
    {
    id: "html-intro",
    chapterId: "html-basics",
    order: 1,
    title: "认识 HTML — 你的第一行代码",
    musicAnalogy:
      "HTML 就像五线谱，它决定了页面上有什么内容。五线谱告诉演奏者弹什么音，HTML 告诉浏览器显示什么内容。",
    listenTo:
      "巴赫《C大调前奏曲》BWV 846 — 结构清晰、简单纯粹，就像你即将写下的第一行 HTML。",
    sections: [
      {
        type: "explain",
        title: "什么是 HTML？",
        content:
          "HTML 是网页的骨架。想象一下：**五线谱上有音符，网页上有内容。**\n\n打开任何网页，你看到的所有文字、图片、链接，都是用 HTML 写出来的。就像作曲家把音符写在五线谱上，开发者把内容写在 HTML 里。",
      },
      {
        type: "explain",
        title: '标签 — HTML 的"音符"',
        content:
          "HTML 使用**标签（tag）**来标记内容。每个标签用尖括号 `< >` 包裹：\n\n- `<h1>` 是大标题，像乐章标题\n- `<p>` 是段落，像乐谱中的乐句\n\n标签通常成对出现：`<h1>内容</h1>`，就像乐谱的小节线一样，有开始就有结束。",
      },
      {
        type: "example",
        title: "看一个例子",
        content:
          "下面这段代码就是编辑器中你看到的代码。一个 `<h1>` 大标题加上一段 `<p>` 文字：\n\n\```html\n<h1>你好，音乐世界！</h1>\n<p>我开始了我的编程之旅。</p>\n\```\n右边预览区会实时显示这段代码的效果。",
      },
      {
        type: "task",
        title: "动手试试 ✨",
        content:
          "请修改编辑器中的 `<h1>` 标签里的内容，把标题改成你自己的名字或你想写的任何内容。改完后看看右侧预览区，你会发现页面立刻发生了变化！",
      },
    ],
    starterCode: {
      html: "<h1>你好，音乐世界！</h1>\n<p>我开始了我的编程之旅。</p>",
      css: "",
      js: "",
    },
  },

  // ===== 1.2 html-doc-structure =====
    {
    id: "html-doc-structure",
    chapterId: "html-basics",
    order: 2,
    title: 'HTML 文档结构 — 了解网页的"乐谱格式"',
    musicAnalogy:
      '每份乐谱都有固定的格式：左上角写曲名、右上角标速度、第一行是谱号调号、最后画终止线。HTML 文档也有标准结构——`<!DOCTYPE>` 是"这是乐谱"的声明、`<head>` 是页面的"调号信息"、`<body>` 是"乐谱正文"。了解这个结构，你才算真正看懂了一份网页"乐谱"。',
    listenTo:
      "巴赫《哥德堡变奏曲》咏叹调 — 开篇的 Aria 像 `<head>` 宣布主题框架，随后的 30 段变奏像 `<body>` 承载着丰富变化的内容，最终回到 Aria 就像 `</html>` 的闭环。每一份乐谱都有开端和终结——歌德堡的结构严谨清晰，正如一份标准的 HTML 文档。",
    sections: [
      {
        type: "explain",
        title: '每个网页都有一副"骨架"',
        content:
          '你之前写的 `<h1>` 和 `<p>` 代码，实际上运行在一个看不见的文档结构里。完整的 HTML 页面长这样：\n\n\```html\n<!DOCTYPE html>\n<html lang="zh-CN">\n<head>\n  <meta charset="UTF-8">\n  <meta name="viewport" content="width=device-width, initial-scale=1.0">\n  <title>我的页面标题</title>\n</head>\n<body>\n  <h1>你好，音乐世界！</h1>\n  <p>这是页面上可见的内容。</p>\n</body>\n</html>\n\```\n\n这就是一份"标准乐谱"——每一部分都有固定的位置和意义。',
      },
      {
        type: "explain",
        title: "逐行读懂这个结构",
        content:
          '**`<!DOCTYPE html>`** — 声明"这是 HTML5 文档"。就像乐谱封面上写着"钢琴独奏谱"，浏览器看到这行就知道用什么规则来解析页面。\n\n**`<html lang="zh-CN">`** — 整个文档的根元素，`lang` 属性告诉浏览器页面是什么语言。\n\n**`<head>` — 页面"元信息"区**，不显示在页面上：\n- `<meta charset="UTF-8">` — 声明字符编码（**必须写！**不然中文会乱码）\n- `<meta name="viewport" ...>` — 告诉手机浏览器正确缩放（响应式必备）\n- `<title>` — 浏览器标签页上显示的文字\n\n**`<body>` — 页面"正文"**，你之前写的所有内容都放在这里面。',
      },
      {
        type: "explain",
        title: "head 中的其他重要元素",
        content:
          '`<head>` 区还可以包含：\n\n\```html\n<head>\n  <!-- 链接 CSS 样式文件 -->\n  <link rel="stylesheet" href="style.css">\n\n  <!-- 网站的图标（favicon） -->\n  <link rel="icon" href="favicon.ico">\n\n  <!-- SEO 描述 -->\n  <meta name="description" content="一个学习编程的音乐主题网站">\n</head>\n\```\n\n虽然 `<head>` 里的内容不直接显示在页面上，但它像乐谱上的速度标记 Andante 一样——决定了页面如何被理解和渲染。',
      },
      {
        type: "example",
        title: "看例子",
        content:
          '现在你右侧编辑器中看到的代码，就是放在 `<body>` 里面的。但这个教学平台已经帮你写好了 `<head>` 和 `<body>` 的框架——这就是为什么你只需要写内容部分的代码。\n\n当你未来自己创建一个 `.html` 文件时，记得要先写完整的文档结构！\n\n\```html\n<!-- 你将来会这样开始一个网页 -->\n<!DOCTYPE html>\n<html lang="zh-CN">\n<head>\n  <meta charset="UTF-8">\n  <title>我的音乐博客</title>\n</head>\n<body>\n  <!-- 你的内容写在这里 -->\n</body>\n</html>\n\```',
      },
      {
        type: "task",
        title: "动手试试 ✨",
        content:
          "目前编辑器里只显示 body 内容。试试：\n\n1. 打开浏览器开发者工具（F12），在 Elements/元素 面板中查看页面完整结构——你能找到 `<head>` 和 `<body>` 标签吗？\n2. 修改 `<h1>` 标签中的标题\n3. 挑战：在 HTML 中写两组内容——用 `<!-- -->` 注释掉其中一组，看效果",
      },
    ],
    starterCode: {
      html: "<h1>你好，音乐世界！</h1>\n\n<!-- 这是一条HTML注释，不会显示在页面上 -->\n\n<p>我了解了 HTML 文档的完整结构：</p>\n\n<ul>\n  <li>&lt;!DOCTYPE&gt; — 文档类型声明</li>\n  <li>&lt;html&gt; — 整个页面的根</li>\n  <li>&lt;head&gt; — 元信息（标题、编码等）</li>\n  <li>&lt;body&gt; — 所有可见内容</li>\n</ul>\n\n<p>打开 F12 开发者工具，在 Elements 面板中查看完整页面结构！</p>",
      css: "h1 {\n  color: #8B2E2E;\n  margin-bottom: 14px;\n}\n\np {\n  color: #3D2B1F;\n  line-height: 1.6;\n  margin-bottom: 10px;\n}\n\nul {\n  background: #FFFAF2;\n  border: 1px solid #D4C5A9;\n  border-radius: 8px;\n  padding: 16px 28px;\n}\n\nli {\n  color: #6B5A4E;\n  margin: 6px 0;\n  font-family: 'Fira Code', monospace;\n  font-size: 14px;\n}",
      js: "",
    },
  },

  // ===== 1.3 html-emphasis =====
    {
    id: "html-emphasis",
    chapterId: "html-basics",
    order: 3,
    title: "文本与强调 — 描述你的音乐故事",
    musicAnalogy:
      "`<strong>` 标签像乐谱中的**强音记号（f）**，强调重要内容；`<em>` 像**连音线**，让文字更富感情。",
    listenTo:
      "贝多芬《第五交响曲》第一乐章 — 感受强弱对比带来的戏剧性，就像文字中的强调与语气。",
    sections: [
      {
        type: "explain",
        title: "让文字更有表现力",
        content:
          '上一节课我们学会了写标题和段落。但这就像只有一种力度的音乐——太平淡了。\n\n现在我们来学习两个新标签，让文字也有"强弱变化"：\n\n- `<strong>` — **加粗强调**，像强音记号 **f**\n- `<em>` — *斜体强调*，像连音线，让语气更柔和\n- `<br>` — 换行，像乐谱中的呼吸记号',
      },
      {
        type: "example",
        title: "看例子",
        content:
          '下面就是编辑器中的代码。注意看 `<strong>` 和 `<em>` 标签是如何包裹文字的：\n\n\```html\n<h1>我的音乐故事</h1>\n<p>我最喜欢的作曲家是<strong>肖邦</strong>。</p>\n<p>他的夜曲<em>优美而忧伤</em>，<br>每次听都让我感动。</p>\n\```\n你可以看到"肖邦"加粗了，"优美而忧伤"变成斜体了，而且中间还有一个换行。',
      },
      {
        type: "task",
        title: "动手试试 ✨",
        content:
          '请在编辑器中，把 `<strong>` 里的"肖邦"改成你最喜欢的作曲家，把 `<em>` 里的"优美而忧伤"改成你自己的感受。试试修改 `<br>` 的位置看看效果！',
      },
    ],
    starterCode: {
      html: "<h1>我的音乐故事</h1>\n<p>我最喜欢的作曲家是<strong>肖邦</strong>。</p>\n<p>他的夜曲<em>优美而忧伤</em>，<br>每次听都让我感动。</p>",
      css: "",
      js: "",
    },
  },

  // ===== 1.4 html-lists =====
    {
    id: "html-lists",
    chapterId: "html-basics",
    order: 4,
    title: "列表 — 你喜欢的作曲家",
    musicAnalogy:
      "列表就像**乐章目录**或**曲目单**——把信息有序地组织起来，让人一目了然。",
    listenTo:
      "维瓦尔第《四季》— 四个季节，四个乐章，结构分明，就像一张清晰的列表。",
    sections: [
      {
        type: "explain",
        title: "用列表组织信息",
        content:
          "当你想列出喜欢的作曲家、曲目或乐器时，就需要用到列表标签：\n\n- `<ul>` — **无序列表**（unordered list），前面是圆点\n- `<ol>` — **有序列表**（ordered list），前面是数字\n- `<li>` — **列表项**（list item），包在每个项目的外面",
      },
      {
        type: "example",
        title: "看例子",
        content:
          "下面就是编辑器中的代码。一个无序列表列出作曲家，一个有序列表排出练琴顺序：\n\n\```html\n<h1>我的音乐收藏</h1>\n<p>这里是我喜欢的音乐作品：</p>\n\n<h2>我喜欢的作曲家</h2>\n<ul>\n  <li>巴赫</li>\n  <li>莫扎特</li>\n  <li>肖邦</li>\n</ul>\n\n<h2>我的练琴顺序</h2>\n<ol>\n  <li>音阶练习</li>\n  <li>练习曲</li>\n  <li>乐曲演奏</li>\n</ol>\n\```\n注意 `<li>` 要放在 `<ul>` 或 `<ol>` 里面，不能单独使用哦。就像乐谱中的音符必须放在小节里一样！",
      },
      {
        type: "task",
        title: "动手试试 ✨",
        content:
          "请在编辑器中修改这两个列表：把无序列表中的作曲家改成你喜欢的，把有序列表改成你自己的学习计划。试试把 `<ul>` 改成 `<ol>` 看看列表样式会怎么变化？",
      },
    ],
    starterCode: {
      html: "<h1>我的音乐收藏</h1>\n<p>这里是我喜欢的音乐作品：</p>\n\n<h2>我喜欢的作曲家</h2>\n<ul>\n  <li>巴赫</li>\n  <li>莫扎特</li>\n  <li>肖邦</li>\n</ul>\n\n<h2>我的练琴顺序</h2>\n<ol>\n  <li>音阶练习</li>\n  <li>练习曲</li>\n  <li>乐曲演奏</li>\n</ol>",
      css: "",
      js: "",
    },
  },

  // ===== 1.5 html-images-links =====
    {
    id: "html-images-links",
    chapterId: "html-basics",
    order: 5,
    title: "图片与链接 — 丰富你的音乐卡片",
    musicAnalogy:
      "`<img>` 像**乐谱中的插图**，为页面增添视觉元素；`<a>` 链接像**反复记号**，指向另一个地方。",
    listenTo:
      "德彪西《月光》— 闭上眼睛，让音乐在脑海中描绘画面，就像图片为网页增添色彩。",
    sections: [
      {
        type: "explain",
        title: "添加图片",
        content:
          '纯文字太单调了！用 `<img>` 标签可以插入图片：\n\n\```html\n<img src="图片地址" alt="图片描述">\n\```\n\n- `src` — 图片的地址（可以是网上链接）\n- `alt` — 图片加载不出来时显示的文字\n\n注意：`<img>` 是**单标签**，不需要写 `</img>`，就像休止符不需要配对！',
      },
      {
        type: "explain",
        title: "添加链接",
        content:
          '用 `<a>` 标签可以创建超链接，点击后跳转到其他页面：\n\n\```html\n<a href="网址">点击这里</a>\n\```\n\n- `href` — 要跳转的网址\n- 标签中间的文字是显示给用户看的',
      },
      {
        type: "example",
        title: "完整示例",
        content:
          '下面就是编辑器中的代码。结合了图片和链接的个人音乐卡片：\n\n\```html\n<h1>肖邦</h1>\n<img src="https://oss.tan8.com/yuepuku/155/77798/77798_prev.jpg" alt="作曲家肖像">\n<p>\n  了解更多，请访问\n  <a href="https://zh.wikipedia.org/wiki/肖邦">肖邦的维基百科</a>\n</p>\n\```',
      },
      {
        type: "task",
        title: "综合挑战 ✨",
        content:
          '这是本章的最后一节课！请在编辑器中修改代码，制作一张属于你自己的"个人音乐卡片"：\n\n1. 把 `<h1>` 中的"肖邦"改成你喜欢的音乐家\n2. 把 `<img>` 的 `src` 换成你想展示的图片链接\n3. 把 `<a>` 的 `href` 换成你想推荐的网页链接\n4. 试着再加上一个列表，列出这位音乐家的代表作\n\n完成之后，第一章就毕业了！🎉',
      },
    ],
    starterCode: {
      html: '<h1>肖邦</h1>\n<img src="https://oss.tan8.com/yuepuku/155/77798/77798_prev.jpg" alt="作曲家肖像">\n<p>\n  了解更多，请访问\n  <a href="https://zh.wikipedia.org/wiki/肖邦">肖邦的维基百科</a>\n</p>',
      css: "",
      js: "",
    },
  },

  // ===== 1.6 html-div-span =====
    {
    id: "html-div-span",
    chapterId: "html-basics",
    order: 6,
    title: "div 与 span — 块级与内联元素",
    musicAnalogy:
      "`<div>` 像**小节线**，把内容划分成独立的段落，每个段落独占一行；`<span>` 像**连音线**，在句子内部连接和标记某些词语，不打断句子的流动。",
    listenTo:
      "巴赫《勃兰登堡协奏曲》— 不同乐器组（就像 div）各自成段，但独奏乐器在其中穿插对话（就像 span）。",
    sections: [
      {
        type: "explain",
        title: '两种最基本的"容器"',
        content:
          "`<div>` 和 `<span>` 本身不添加任何样式，它们的作用是**把内容分组**，方便后面用 CSS 美化或用 JS 操控。\n\n- `<div>` — **块级元素**（block），独占一行，像一整个段落\n- `<span>` — **内联元素**（inline），在文字流内部，像句子中的标记\n\n\```html\n<div>我是一个块，占满整行。</div>\n<div>我是另一个块，自动换行。</div>\n<p>文字中<span>这个部分</span>被span标记了。</p>\n\```",
      },
      {
        type: "explain",
        title: "什么时候用 div？什么时候用 span？",
        content:
          '**用 `<div>` 当你要：**\n- 创建一个卡片、面板、区块\n- 把一组元素包在一起\n- 需要块级布局（独占一行）\n\n**用 `<span>` 当你要：**\n- 高亮句子中的某个词\n- 给行内文字加特殊样式\n- 不改动文字流的情况下标记内容\n\n简单记忆：**div 管"块"，span 管"字"。**就像管弦乐中——div 是乐器组（弦乐组、管乐组），span 是组内某个乐手。',
      },
      {
        type: "example",
        title: "看例子",
        content:
          '下面的代码用 `<div>` 创建了三张音乐卡片，用 `<span>` 在文字中高亮了作曲家名字：\n\n\```html\n<div class="card">\n  <h2><span class="name">巴赫</span></h2>\n  <p>时期：<span class="name">巴洛克</span></p>\n</div>\n\```\n注意：每个 `<div>` 独占一行，而 `<span>` 只是在行内标记文字。',
      },
      {
        type: "task",
        title: "动手试试 ✨",
        content:
          '请在编辑器中：\n\n1. 给第三张卡片也加上 `<span class="name">` 高亮作曲家名字和时期\n2. 试着复制一张卡片（整个 `<div>` 块），看看它是独占一行还是并排\n3. 把某个 `<span>` 改成 `<div>`，观察布局的变化——这就是块级 vs 内联的区别！',
      },
    ],
    starterCode: {
      html: '<h1>作曲家画廊</h1>\n\n<div class="card">\n  <h2><span class="name">巴赫</span></h2>\n  <p>时期：<span class="name">巴洛克</span></p>\n  <p>代表作：《赋格的艺术》《勃兰登堡协奏曲》</p>\n</div>\n\n<div class="card">\n  <h2><span class="name">肖邦</span></h2>\n  <p>时期：浪漫主义</p>\n  <p>代表作：《夜曲》《练习曲》</p>\n</div>',
      css: "",
      js: "",
    },
  },

  // ===== 1.7 html-semantic =====
    {
    id: "html-semantic",
    chapterId: "html-basics",
    order: 7,
    title: "语义化标签 — 给页面一个清晰的结构",
    musicAnalogy:
      '语义化标签就像**总谱上的声部标注**——第一小提琴、第二小提琴、中提琴、大提琴……每个乐器组有自己的位置和身份。同样，`<header>`、`<main>`、`<footer>` 等标签告诉浏览器和搜索引擎"这是什么部分"。',
    listenTo:
      "拉威尔《波莱罗》配器总谱 — 每一行谱表标注了乐器名称，清晰的声部结构就像语义化的 HTML。",
    sections: [
      {
        type: "explain",
        title: "为什么需要语义化？",
        content:
          '之前我们一直用 `<div>` 来分组内容。但 `<div>` 本身没有"含义"——浏览器不知道一个 `<div>` 是导航栏还是文章正文。\n\n语义化标签用**有名字的标签**来标记不同区域：\n\n- `<header>` — 页头（Logo + 导航）\n- `<nav>` — 导航菜单\n- `<main>` — 页面主要内容\n- `<section>` — 一个内容区块\n- `<article>` — 一篇独立的文章\n- `<footer>` — 页脚（版权、链接）\n\n就像总谱中每个声部都有明确的名字，而不是全部标"乐器1、乐器2"。',
      },
      {
        type: "explain",
        title: "一个典型的页面结构",
        content:
          "\```html\n<body>\n  <header>\n    <h1>网站标题</h1>\n    <nav>导航链接</nav>\n  </header>\n\n  <main>\n    <section>\n      <h2>第一块内容</h2>\n      <article>一篇文章</article>\n    </section>\n  </main>\n\n  <footer>\n    <p>版权信息</p>\n  </footer>\n</body>\n\```\n\n浏览器和搜索引擎看到这个结构，就像指挥看到总谱——一眼就知道每个部分的作用。",
      },
      {
        type: "example",
        title: "看例子",
        content:
          '下面的代码用语义化标签构建了一个音乐网站页面。注意看 `<header>`、`<main>`、`<section>`、`<footer>` 是如何组织的：\n\n\```html\n<header>\n  <h1>古典音乐鉴赏</h1>\n  <nav>首页 | 作曲家 | 曲目</nav>\n</header>\n<main>\n  <section>今日推荐</section>\n  <section>本周精选</section>\n</main>\n<footer>© 2026 代码乐章</footer>\n\```\n虽然看起来和用 `<div>` 差不多，但这些标签自带"身份信息"。',
      },
      {
        type: "task",
        title: "动手试试 ✨",
        content:
          '请在编辑器中：\n\n1. 在 `<main>` 中再添加一个 `<section>`，里面写"最新评论"\n2. 在 `<nav>` 中添加一个链接（用 `<a>` 标签）\n3. 试着把某个 `<section>` 换成 `<article>`，思考一下：什么情况下用 article 更合适？',
      },
    ],
    starterCode: {
      html: '<header>\n  <h1>🎵 古典音乐鉴赏</h1>\n  <nav>\n    首页 | 作曲家 | 曲目推荐 | 关于\n  </nav>\n</header>\n\n<main>\n  <section>\n    <h2>今日推荐</h2>\n    <p>贝多芬《第七交响曲》——被瓦格纳称为"舞蹈的礼赞"。</p>\n  </section>\n\n  <section>\n    <h2>本周精选</h2>\n    <p>莫扎特《安魂曲》K.626 ——未完成的绝唱，神秘而动人。</p>\n  </section>\n</main>\n\n<footer>\n  <p>© 2026 代码乐章 | 用音乐的方式学代码</p>\n</footer>',
      css: "",
      js: "",
    },
  },

  // ===== 1.8 html-audio-video =====
    {
    id: "html-audio-video",
    chapterId: "html-basics",
    order: 8,
    title: "音频与视频 — 让网页发出声音",
    musicAnalogy:
      "这是离音乐最近的一节课！`<audio>` 标签让你的网页**播放音乐**，`<video>` 标签让你的网页**播放视频**。作为音乐学的学生，你会发现这比 `<p>` 和 `<div>` 有趣多了！",
    listenTo:
      "这一课不需要推荐——直接在编辑器里放一段你喜欢的音乐吧！用 `<audio>` 标签让它响起来。",
    sections: [
      {
        type: "explain",
        title: "音频标签",
        content:
          '用 `<audio>` 标签可以在网页中嵌入音乐播放器：\n\n\```html\n<audio controls src="音乐文件地址">\n  你的浏览器不支持音频播放\n</audio>\n\```\n\n- `controls` — 显示播放/暂停/音量控件\n- `src` — 音频文件的地址\n- `autoplay` — 自动播放（浏览器通常会阻止）\n- `loop` — 循环播放\n\n标签中间的文字只在浏览器不支持时显示。',
      },
      {
        type: "explain",
        title: "音频格式与多音源",
        content:
          '不同的浏览器支持不同的音频格式（MP3、OGG、WAV 等）。为了保证所有浏览器都能播放，可以用 `<source>` 标签提供多种格式：\n\n\```html\n<audio controls>\n  <source src="music.mp3" type="audio/mpeg">\n  <source src="music.ogg" type="audio/ogg">\n  你的浏览器不支持音频播放\n</audio>\n\```\n\n浏览器会从上到下尝试，播放第一个支持的格式。就像准备不同版本的乐谱给不同乐器！',
      },
      {
        type: "explain",
        title: "视频标签",
        content:
          '`<video>` 标签的用法和 `<audio>` 非常相似：\n\n\```html\n<video controls width="400" src="视频地址">\n  你的浏览器不支持视频播放\n</video>\n\```\n\n- `controls` — 显示播放控件\n- `width` / `height` — 设置播放器尺寸\n- 同样支持 `<source>` 提供多种格式\n\n现在你的网页可以像一个音乐播放器一样工作了！',
      },
      {
        type: "example",
        title: "看例子",
        content:
          '下面的代码创建了一个音频播放器和一个视频播放器。注意两个标签的写法几乎一样：\n\n\```html\n<audio controls>\n  <source src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" type="audio/mpeg">\n</audio>\n\n<video controls width="320" src="视频地址"></video>\n\```\n预览区现在有了一个可以点击播放的音乐播放器！',
      },
      {
        type: "hint",
        title: "关于音频链接",
        content:
          '免费可用的音频链接不太好找。如果你想用自己的音乐文件，可以把 MP3 文件放在项目 `public/` 目录下，然后用 `<audio controls src="/你的文件名.mp3">` 来播放。',
      },
      {
        type: "task",
        title: "动手试试 ✨",
        content:
          "请在编辑器中：\n\n1. 点击预览区中的音频播放器，看看能否播放\n2. 给 `<audio>` 标签加上 `loop` 属性，让音乐循环播放\n3. 尝试修改音频的 `src` 地址（可以搜索一个网上可用的 MP3 链接）\n4. 挑战：在 `<audio>` 下面加一个 `<video>` 标签，找一个在线视频链接试试",
      },
    ],
    starterCode: {
      html: '<h1>🎧 我的音乐播放器</h1>\n\n<div class="player-box">\n  <p>点击播放按钮，让网页发出声音：</p>\n\n  <audio controls>\n    <source src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" type="audio/mpeg">\n    你的浏览器不支持音频播放\n  </audio>\n\n  <p class="note">这是 SoundHelix 生成的一段示例音乐。</p>\n</div>',
      css: "h1 {\n  color: #8B2E2E;\n  text-align: center;\n}\n\n.player-box {\n  background: #FFFAF2;\n  border: 2px solid #D4C5A9;\n  border-radius: 12px;\n  padding: 24px;\n  text-align: center;\n  max-width: 400px;\n  margin: 20px auto;\n}\n\n.player-box audio {\n  width: 100%;\n  margin: 12px 0;\n}\n\n.note {\n  font-size: 12px;\n  color: #C9A96E;\n}",
      js: "",
    },
  },

  // ===== 1.9 html-tables =====
    {
    id: "html-tables",
    chapterId: "html-basics",
    order: 9,
    title: "表格 — 整理你的音乐数据",
    musicAnalogy:
      "表格就像一张**曲目单**或**节目表**——用行列分明的结构组织信息。每一行是一个条目，每一列是一种属性，就像节目中第一列是作曲家、第二列是曲目、第三列是时长。",
    listenTo:
      "莫扎特歌剧《费加罗的婚礼》— 歌剧中复杂的人物关系和章节结构，就像表格中纵横交错的行与列。",
    sections: [
      {
        type: "explain",
        title: "表格的基本结构",
        content:
          "表格由外到内有三层标签：\n\n- \`<table>\` — 整个表格的容器\n- \`<tr>\` — **表行**（table row），一行\n- \`<td>\` — **表单元格**（table data），一个格子\n\n\```html\n<table>\n  <tr>\n    <td>巴赫</td>\n    <td>巴洛克</td>\n    <td>德国</td>\n  </tr>\n  <tr>\n    <td>肖邦</td>\n    <td>浪漫主义</td>\n    <td>波兰</td>\n  </tr>\n</table>\n\```\n\n每一对 `<tr></tr>` 是一行，里面每个 `<td></td>` 是一个格子。",
      },
      {
        type: "explain",
        title: "表头与分区",
        content:
          "`<th>` 代替 \`<td>\` 可以做**表头**（加粗居中）：\n\n\```html\n<tr>\n  <th>作曲家</th>\n  <th>时期</th>\n  <th>国家</th>\n</tr>\n\```\n\n`<thead>`、`<tbody>` 把表头和表体分开，方便分别设置样式：\n\n\```html\n<table>\n  <thead>\n    <tr><th>列1</th><th>列2</th></tr>\n  </thead>\n  <tbody>\n    <tr><td>数据1</td><td>数据2</td></tr>\n  </tbody>\n</table>\n\```",
      },
      {
        type: "explain",
        title: "合并单元格",
        content:
          '有时候一个格子需要跨越多列或多行，用 `colspan` 和 `rowspan`：\n\n- `colspan="2"` — 跨 2 列（水平合并）\n- `rowspan="3"` — 跨 3 行（垂直合并）\n\n\```html\n<td colspan="2">这格占了两个列的宽度</td>\n\```\n\n就像节目单中的"中场休息"横跨整页！',
      },
      {
        type: "example",
        title: "看例子",
        content:
          "下面的代码创建了一张作曲家信息表，有表头和两行数据：\n\n\```html\n<table>\n  <thead>\n    <tr>\n      <th>作曲家</th>\n      <th>时期</th>\n      <th>代表作</th>\n    </tr>\n  </thead>\n  <tbody>\n    <tr>\n      <td>巴赫</td>\n      <td>巴洛克</td>\n      <td>赋格的艺术</td>\n    </tr>\n  </tbody>\n</table>\n\```",
      },
      {
        type: "task",
        title: "动手试试 ✨",
        content:
          '请在编辑器中：\n\n1. 在表格中添加一行新数据，写你喜欢的作曲家\n2. 在表头再加一列（比如"国家"），每行也加对应的 \`<td>\`\n3. 试试在表格下方加一行 `<tr><td colspan="3">更多作曲家敬请期待</td></tr>` 感受合并效果\n4. 挑战：创建一个新的表格，列出你的"每周练琴计划"（日期、曲目、时长）',
      },
    ],
    starterCode: {
      html: "<h1>作曲家速查表</h1>\n\n<table>\n  <thead>\n    <tr>\n      <th>作曲家</th>\n      <th>时期</th>\n      <th>代表作</th>\n    </tr>\n  </thead>\n  <tbody>\n    <tr>\n      <td>巴赫</td>\n      <td>巴洛克</td>\n      <td>《赋格的艺术》</td>\n    </tr>\n    <tr>\n      <td>莫扎特</td>\n      <td>古典主义</td>\n      <td>《魔笛》</td>\n    </tr>\n    <tr>\n      <td>肖邦</td>\n      <td>浪漫主义</td>\n      <td>《夜曲》</td>\n    </tr>\n  </tbody>\n</table>",
      css: "h1 {\n  color: #8B2E2E;\n  text-align: center;\n}\n\ntable {\n  width: 100%;\n  max-width: 500px;\n  margin: 20px auto;\n  border-collapse: collapse;\n}\n\nth, td {\n  border: 1px solid #D4C5A9;\n  padding: 10px 14px;\n  text-align: left;\n}\n\nth {\n  background: #8B2E2E;\n  color: #fff;\n}\n\ntd {\n  color: #3D2B1F;\n}\n\ntbody tr:nth-child(even) {\n  background: #FFFAF2;\n}",
      js: "",
    },
  },

  // ===== 1.10 html-forms =====
    {
    id: "html-forms",
    chapterId: "html-basics",
    order: 10,
    title: "表单 — 收集你的音乐信息",
    musicAnalogy:
      '表单就像**报名表**或**节目征集单**——听众填写他们的音乐偏好，就像演奏者在报名表上写下自己的声部。`<input>` 是填空格，`<label>` 是问题，`<button>` 是"提交"按钮。',
    listenTo:
      "小约翰·施特劳斯《蓝色多瑙河》— 圆舞曲的互动性就像表单与用户的对话，你来我往，优雅流畅。",
    sections: [
      {
        type: "explain",
        title: "什么是表单？",
        content:
          "表单（`<form>`）用来收集用户输入的信息。你在网上填过的所有东西——注册、搜索、评论——都是表单。\n\n表单的核心标签：\n\n- `<form>` — 整个表单的容器\n- `<input>` — 输入框，最常用的表单元素\n- `<label>` — 标签，描述输入框的用途\n- `<textarea>` — 多行文本输入框\n- `<select>` + `<option>` — 下拉选择框\n- `<button>` — 提交按钮",
      },
      {
        type: "explain",
        title: "各种输入类型",
        content:
          '`<input>` 标签通过 `type` 属性可以变成不同类型的输入框：\n\n- `type="text"` — 普通文本输入\n- `type="email"` — 邮箱地址输入\n- `type="password"` — 密码输入（显示为圆点）\n- `type="date"` — 日期选择器\n- `placeholder="..."` — 输入框中的提示文字\n\n\```html\n<input type="text" placeholder="请输入你的名字">\n<input type="email" placeholder="请输入邮箱">\n<input type="date">\n\```\n\n不同的 type 就像不同的乐器，各有各的用途！',
      },
      {
        type: "explain",
        title: "下拉框与多行文本",
        content:
          '`<select>` 创建下拉选择框，`<option>` 是其中的选项：\n\n\```html\n<select>\n  <option>巴赫</option>\n  <option>莫扎特</option>\n  <option>肖邦</option>\n</select>\n\```\n\n`<textarea>` 创建多行文本输入框，用 `rows` 设置行数：\n\n\```html\n<textarea rows="3" placeholder="请写下你的感想..."></textarea>\n\```\n\n`<label>` 的 `for` 属性对应 `<input>` 的 `id`，点击标签文字时输入框会自动获得焦点——就像节目单上"独奏者："后面跟着一条填空线。',
      },
      {
        type: "example",
        title: "看例子",
        content:
          '下面的代码创建了一张音乐偏好调查表。包含了文本输入、下拉选择和多行文本框：\n\n\```html\n<form>\n  <label for="name">你的名字：</label>\n  <input type="text" id="name" placeholder="请输入你的名字">\n\n  <label for="composer">最喜欢的作曲家：</label>\n  <select id="composer">\n    <option>请选择...</option>\n    <option>巴赫</option>\n    <option>肖邦</option>\n  </select>\n\n  <label for="comment">想说的话：</label>\n  <textarea id="comment" rows="3"></textarea>\n\n  <button type="submit">提交</button>\n</form>\n\```\n切换到预览区，可以和这个表单互动！',
      },
      {
        type: "task",
        title: "动手试试 ✨",
        content:
          '请在编辑器中：\n\n1. 在 `<select>` 中添加两个你喜欢的作曲家选项\n2. 给表单增加一个 `<input type="date">`，让用户选择"最早接触音乐的日期"\n3. 增加一个 `<input type="email">`，让用户填写邮箱\n4. 试试修改 `<textarea>` 的 `rows` 从 `3` 改成 `5`，看看输入框变大\n5. 在预览区中实际填写表单，感受交互体验',
      },
    ],
    starterCode: {
      html: '<h1>🎵 音乐偏好调查</h1>\n\n<form>\n  <label for="name">你的名字：</label>\n  <input type="text" id="name" placeholder="请输入你的名字">\n\n  <label for="composer">最喜欢的作曲家：</label>\n  <select id="composer">\n    <option>请选择...</option>\n    <option>巴赫</option>\n    <option>莫扎特</option>\n    <option>贝多芬</option>\n    <option>肖邦</option>\n  </select>\n\n  <label for="comment">你想说的话：</label>\n  <textarea id="comment" rows="3" placeholder="写下你对音乐的感受..."></textarea>\n\n  <button type="submit">✨ 提交</button>\n</form>',
      css: "h1 {\n  text-align: center;\n  color: #8B2E2E;\n}\n\nform {\n  max-width: 420px;\n  margin: 20px auto;\n  background: #FFFAF2;\n  border: 2px solid #D4C5A9;\n  border-radius: 12px;\n  padding: 28px;\n}\n\nlabel {\n  display: block;\n  margin-top: 16px;\n  margin-bottom: 4px;\n  font-weight: 600;\n  color: #3D2B1F;\n}\n\ninput, select, textarea {\n  width: 100%;\n  padding: 10px 12px;\n  border: 1px solid #D4C5A9;\n  border-radius: 6px;\n  font-size: 14px;\n  font-family: inherit;\n  color: #3D2B1F;\n  background: #fff;\n}\n\ninput::placeholder, textarea::placeholder {\n  color: #CCC5B5;\n}\n\nbutton {\n  display: block;\n  width: 100%;\n  margin-top: 24px;\n  padding: 12px;\n  background: #8B2E2E;\n  color: #fff;\n  font-size: 16px;\n  font-weight: 600;\n  border: none;\n  border-radius: 8px;\n  cursor: pointer;\n}\n\nbutton:hover {\n  background: #C94545;\n}",
      js: "",
    },
  },

  // ===== 1.11 html-input-types =====
    {
    id: "html-input-types",
    chapterId: "html-basics",
    order: 11,
    title: '更多输入类型 — 表单的"乐器编配"',
    musicAnalogy:
      '`<input>` 不止能输入文字——就像乐团不只是弦乐。`type="radio"` 像**单选问答**（只有一个正确答案），`type="checkbox"` 像**多选编配**（可以同时选弦乐和管乐），`type="range"` 像**滑音控制**（连续变化的数值）。每个 input 类型都是乐队中的一种"声部"，组合使用才能构成完整的音乐表单。',
    listenTo:
      '拉威尔《波莱罗》配器分析 — 整部作品用不同乐器依次演奏同一旋律（每种乐器就是一种 input 类型），从长笛到单簧管到巴松管到萨克斯，每一种"输入方式"都给主题带来新的色彩。',
    sections: [
      {
        type: "explain",
        title: "radio — 单选按钮",
        content:
          '当用户只能**选一个**时用 radio。同一组 radio 的 `name` 属性必须相同：\n\n\```html\n<fieldset>\n  <legend>你最喜欢的时期：</legend>\n\n  <input type="radio" id="baroque" name="period" value="baroque">\n  <label for="baroque">巴洛克时期</label>\n\n  <input type="radio" id="classical" name="period" value="classical">\n  <label for="classical">古典主义时期</label>\n\n  <input type="radio" id="romantic" name="period" value="romantic">\n  <label for="romantic">浪漫主义时期</label>\n</fieldset>\n\```\n\n`name` 相同的 radio 互斥——就像单选题，只能圈一个答案。',
      },
      {
        type: "explain",
        title: "checkbox — 多选按钮",
        content:
          '当用户可以**选多个**时用 checkbox：\n\n\```html\n<fieldset>\n  <legend>你喜欢的乐器（可多选）：</legend>\n\n  <input type="checkbox" id="piano" name="instrument" value="piano">\n  <label for="piano">🎹 钢琴</label>\n\n  <input type="checkbox" id="violin" name="instrument" value="violin">\n  <label for="violin">🎻 小提琴</label>\n\n  <input type="checkbox" id="cello" name="instrument" value="cello">\n  <label for="cello">🎻 大提琴</label>\n</fieldset>\n\```\n\n每个 checkbox 独立开/关——就像配器时选择用哪些乐器。',
      },
      {
        type: "explain",
        title: "更多实用 input 类型",
        content:
          'HTML 提供丰富的输入类型，浏览器会自动优化交互方式：\n\n- `<input type="range" min="0" max="100">` — 滑块，适合选音量、评分\n- `<input type="number" min="1" max="10">` — 数字输入，带增减箭头\n- `<input type="color">` — 颜色选择器\n- `<input type="date">` — 日期选择器\n- `<input type="time">` — 时间选择器\n- `<input type="file">` — 文件上传\n- `<input type="search">` — 搜索框（带清除按钮）\n\n`<fieldset>` + `<legend>` 用来分组：\n\```html\n<fieldset>\n  <legend>个人信息</legend>\n  <!-- 相关字段放一起 -->\n</fieldset>\n\```',
      },
      {
        type: "example",
        title: "看例子",
        content:
          '下面的表单综合使用了 radio、checkbox 和 range：\n\n\```html\n<form>\n  <fieldset>\n    <legend>基础信息</legend>\n    <label>姓名：<input type="text" name="name"></label>\n    <label>练琴时长：<input type="range" min="0" max="120" value="30"> 分钟/天</label>\n  </fieldset>\n\n  <fieldset>\n    <legend>偏好设置</legend>\n    <p>演奏水平：</p>\n    <label><input type="radio" name="level" value="beginner"> 入门</label>\n    <label><input type="radio" name="level" value="intermediate"> 进阶</label>\n    <label><input type="radio" name="level" value="advanced"> 专业</label>\n  </fieldset>\n\n  <fieldset>\n    <legend>擅长乐器</legend>\n    <label><input type="checkbox" name="inst" value="piano"> 钢琴</label>\n    <label><input type="checkbox" name="inst" value="violin"> 小提琴</label>\n    <label><input type="checkbox" name="inst" value="voice"> 声乐</label>\n  </fieldset>\n</form>\n\```',
      },
      {
        type: "task",
        title: "动手试试 ✨",
        content:
          '切换到 HTML 标签页，试着：\n\n1. 给"演奏水平"增加第 4 个选项"大师级"\n2. 给"擅长乐器"增加两个选项（如中提琴、长笛）\n3. 添加一个 `<input type="color">` 选择"最喜欢的音乐色彩"\n4. 挑战：用 JS 监听 range 滑块的 `input` 事件，实时显示练琴时长数值',
      },
    ],
    starterCode: {
      html: '<h1>音乐偏好调查</h1>\n\n<form>\n  <fieldset>\n    <legend>基础信息</legend>\n    <label>你的名字：<input type="text" name="name" placeholder="请输入名字"></label>\n    <div class="range-row">\n      <label>每天练琴时长：</label>\n      <input type="range" id="practiceRange" min="0" max="120" value="30">\n      <span id="rangeValue">30 分钟</span>\n    </div>\n  </fieldset>\n\n  <fieldset>\n    <legend>你的演奏水平</legend>\n    <label class="radio-label"><input type="radio" name="level" value="beginner" checked> 🎵 入门级</label>\n    <label class="radio-label"><input type="radio" name="level" value="intermediate"> 🎶 进阶级</label>\n    <label class="radio-label"><input type="radio" name="level" value="advanced"> 🎼 专业级</label>\n  </fieldset>\n\n  <fieldset>\n    <legend>你擅长的乐器（可多选）</legend>\n    <label class="checkbox-label"><input type="checkbox" name="instrument" value="piano"> 🎹 钢琴</label>\n    <label class="checkbox-label"><input type="checkbox" name="instrument" value="violin"> 🎻 小提琴</label>\n    <label class="checkbox-label"><input type="checkbox" name="instrument" value="cello"> 🎻 大提琴</label>\n    <label class="checkbox-label"><input type="checkbox" name="instrument" value="flute"> 🎵 长笛</label>\n    <label class="checkbox-label"><input type="checkbox" name="instrument" value="voice"> 🎤 声乐</label>\n  </fieldset>\n\n  <button type="submit">✨ 提交</button>\n</form>',
      css: 'h1 {\n  text-align: center;\n  color: #8B2E2E;\n  margin-bottom: 20px;\n}\n\nform {\n  max-width: 480px;\n  margin: 0 auto;\n}\n\nfieldset {\n  background: #FFFAF2;\n  border: 1px solid #D4C5A9;\n  border-radius: 10px;\n  padding: 20px;\n  margin-bottom: 16px;\n}\n\nlegend {\n  font-weight: 700;\n  color: #8B2E2E;\n  font-size: 15px;\n  padding: 0 8px;\n}\n\nlabel {\n  display: block;\n  margin: 8px 0;\n  color: #3D2B1F;\n  font-size: 14px;\n}\n\ninput[type="text"] {\n  width: 100%;\n  padding: 8px 12px;\n  border: 1px solid #D4C5A9;\n  border-radius: 5px;\n  font-size: 14px;\n  font-family: inherit;\n}\n\n.range-row {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  margin: 12px 0;\n}\n\n.range-row label {\n  margin: 0;\n  white-space: nowrap;\n}\n\n.range-row input[type="range"] {\n  flex: 1;\n  accent-color: #8B2E2E;\n}\n\n#rangeValue {\n  color: #8B2E2E;\n  font-weight: 700;\n  font-size: 14px;\n  min-width: 50px;\n}\n\n.radio-label,\n.checkbox-label {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  padding: 6px 10px;\n  border-radius: 6px;\n  cursor: pointer;\n  transition: background 0.15s;\n  margin: 4px 0 !important;\n}\n\n.radio-label:hover,\n.checkbox-label:hover {\n  background: #FFF8EC;\n}\n\nbutton {\n  display: block;\n  width: 100%;\n  padding: 12px;\n  background: #8B2E2E;\n  color: #fff;\n  font-size: 16px;\n  font-weight: 600;\n  border: none;\n  border-radius: 8px;\n  cursor: pointer;\n  margin-top: 8px;\n}\n\nbutton:hover {\n  background: #C94545;\n}',
      js: '// 实时显示 range 滑块的值\nlet rangeEl = document.querySelector("#practiceRange");\nlet rangeValue = document.querySelector("#rangeValue");\n\nrangeEl.addEventListener("input", function(event) {\n  let val = event.target.value;\n  rangeValue.textContent = val + " 分钟";\n});',
    },
  },

  // ===== 1.12 html-capstone =====
    {
    id: "html-capstone",
    chapterId: "html-basics",
    order: 12,
    title: "综合项目 — 制作你的个人音乐主页",
    musicAnalogy:
      "一场完整的音乐会需要节目单（列表）、演奏者介绍（标题/段落）、演出照片（图片）、曲目链接（链接）、舞台分区（div/span）、声部标注（语义化标签）、曲目表（表格）。现在把这些元素组合起来，就像指挥把各个声部合成一部完整的交响乐。",
    listenTo:
      '贝多芬《第九交响曲》"合唱"第四乐章 — 一部交响曲的终章，人声与乐队完美融合，所有元素汇聚成壮丽的音乐大厦，就像你即将完成的个人主页。',
    sections: [
      {
        type: "explain",
        title: "你已经学会了很多！",
        content:
          '回顾一下你学过的所有 HTML 标签：\n\n| 标签 | 用途 |\n|------|------|\n| `<h1>`~`<h4>` | 标题 |\n| `<p>` | 段落 |\n| `<strong>`, `<em>`, `<br>` | 强调与换行 |\n| `<ul>`, `<ol>`, `<li>` | 列表 |\n| `<img>`, `<a>` | 图片与链接 |\n| `<div>`, `<span>` | 容器与行内标记 |\n| `<header>`, `<main>`, `<section>`, `<footer>` | 语义化结构 |\n| \`<table>\`, \`<tr>\`, `<th>`, \`<td>\` | 表格 |\n\n现在，把这些知识组合起来，做一张属于你自己的"个人音乐主页"！',
      },
      {
        type: "task",
        title: "逐步构建你的主页 ✨",
        content:
          '编辑器里已经有了一个模板。请按以下步骤完善它：\n\n**第一步：修改标题和介绍**\n- 把 `<header>` 中的标题改成"XXX的音乐主页"（XXX 是你的名字）\n- 修改 `<nav>` 中的导航项目\n\n**第二步：修改"关于我"**\n- 在"关于我"区域的 `<p>` 中写下你的音乐故事\n- 可以换一张你喜欢的音乐家图片（修改 `src`）\n\n**第三步：丰富音乐收藏**\n- 在列表中替换成你喜欢的作曲家或曲目\n- 在表格中添加你真正喜欢的音乐数据\n\n**第四步：添加你自己的内容**\n- 挑战：在 `<main>` 中新增一个 `<section>`，内容自定\n- 可以是一段推荐曲目、一个聆听列表、或任何你想展示的内容',
      },
      {
        type: "hint",
        title: "别忘了这些要点",
        content:
          "- 标签要**成对**使用，有开就有合（`<img>` 除外）\n- 嵌套关系要清晰：`<ul>` 里放 `<li>`，\`<table>\` 里放 \`<tr>\` 再放 \`<td>\`\n- 语义化标签让页面结构清晰：`header` → `main` → `section` → `footer`\n- 完成之后，这就是你的**第一章毕业作品**！🎉",
      },
    ],
    starterCode: {
      html: '<header>\n  <h1>🎼 我的音乐主页</h1>\n  <nav>\n    关于我 | 音乐收藏 | 推荐曲目\n  </nav>\n</header>\n\n<main>\n  <section class="about">\n    <h2>关于我</h2>\n    <img src="https://oss.tan8.com/yuepuku/155/77798/77798_prev.jpg" alt="音乐家肖像" width="200">\n    <p>你好！我是一名热爱<strong>古典音乐</strong>的学习者。从小学习钢琴，最喜欢在午后弹奏一首肖邦的夜曲。</p>\n    <p>我相信音乐和代码有许多相似之处——<em>它们都是另一种语言</em>。</p>\n  </section>\n\n  <section class="collection">\n    <h2>我的音乐收藏</h2>\n    <p>以下是我最喜欢的几位作曲家：</p>\n\n    <ul>\n      <li>巴赫 — 巴洛克的数学之美</li>\n      <li>莫扎特 — 古典的优雅与灵动</li>\n      <li>肖邦 — 浪漫的诗意与忧伤</li>\n    </ul>\n  </section>\n\n  <section class="playlist">\n    <h2>本周曲目表</h2>\n    <table>\n      <thead>\n        <tr>\n          <th>作曲家</th>\n          <th>曲目</th>\n          <th>练习重点</th>\n        </tr>\n      </thead>\n      <tbody>\n        <tr>\n          <td>巴赫</td>\n          <td>C大调前奏曲 BWV 846</td>\n          <td>手指独立性</td>\n        </tr>\n        <tr>\n          <td>车尔尼</td>\n          <td>练习曲 Op.599 No.45</td>\n          <td>音阶流畅度</td>\n        </tr>\n        <tr>\n          <td>肖邦</td>\n          <td>降E大调夜曲 Op.9 No.2</td>\n          <td>情感表达</td>\n        </tr>\n      </tbody>\n    </table>\n  </section>\n</main>\n\n<footer>\n  <p>用音乐的方式学代码 — 代码乐章 © 2026</p>\n  <p><a href="#">返回首页</a></p>\n</footer>',
      css: "header {\n  background: #8B2E2E;\n  color: #fff;\n  padding: 24px 32px;\n  text-align: center;\n  border-radius: 8px;\n}\n\nheader h1 {\n  color: #fff;\n  margin: 0;\n}\n\nheader nav {\n  margin-top: 12px;\n  font-size: 14px;\n  letter-spacing: 0.05em;\n}\n\nmain {\n  margin-top: 24px;\n}\n\nsection {\n  background: #FFFAF2;\n  border: 1px solid #D4C5A9;\n  border-radius: 10px;\n  padding: 24px;\n  margin-bottom: 20px;\n}\n\nsection h2 {\n  color: #8B2E2E;\n  margin-top: 0;\n  border-bottom: 2px solid #E8DCC8;\n  padding-bottom: 8px;\n}\n\n.about img {\n  border-radius: 8px;\n  margin: 12px 0;\n}\n\n.collection ul {\n  padding-left: 20px;\n}\n\n.collection li {\n  margin: 6px 0;\n  color: #3D2B1F;\n}\n\ntable {\n  width: 100%;\n  border-collapse: collapse;\n  margin-top: 8px;\n}\n\nth, td {\n  border: 1px solid #D4C5A9;\n  padding: 10px 14px;\n  text-align: left;\n}\n\nth {\n  background: #8B2E2E;\n  color: #fff;\n}\n\ntbody tr:nth-child(even) {\n  background: #fff;\n}\n\nfooter {\n  text-align: center;\n  padding: 24px;\n  color: #C9A96E;\n  font-size: 14px;\n}\n\nfooter a {\n  color: #8B2E2E;\n}",
      js: "",
    },
  },

  // ================================================================
  // 第二章：CSS 样式
  // ================================================================

  // ===== 2.1 css-intro =====
    {
    id: "css-intro",
    chapterId: "css-style",
    order: 1,
    title: "CSS 入门 — 改变文字的颜色和大小",
    musicAnalogy:
      "如果说 HTML 是乐谱上的音符，CSS 就是**演奏法记号**。它告诉浏览器：这个音符应该用什么力度（颜色）、多大音量（字号）来演奏。",
    listenTo:
      "德彪西《版画集》— 印象派音乐用音符描绘光影色彩，就像 CSS 为网页赋予视觉风格。",
    sections: [
      {
        type: "explain",
        title: "什么是 CSS？",
        content:
          'CSS（Cascading Style Sheets，层叠样式表）负责网页的外观。HTML 决定了"有什么"，CSS 决定了"长什么样"。\n\n一句 CSS 规则由三部分组成：\n\n\```css\nh1 {\n  color: #8B2E2E;\n  font-size: 32px;\n}\n\```\n\n- `h1` 是**选择器**——选中文档中的 `<h1>` 元素\n- `color` 和 `font-size` 是**属性**——你想改变什么\n- `#8B2E2E` 和 `32px` 是**值**——改成什么',
      },
      {
        type: "explain",
        title: "颜色值怎么表示？",
        content:
          "颜色有多种写法：\n\n- **颜色名**：`red`, `blue`, `gold` 等（简单但有局限性）\n- **十六进制**：`#8B2E2E`（暗红）、`#3D2B1F`（深棕）——最常用\n- **rgb**：`rgb(139, 46, 46)` — 用三个数字表示红绿蓝\n\n就像调色盘一样，你可以调配出任何颜色！",
      },
      {
        type: "example",
        title: "看例子",
        content:
          "下面的代码就是编辑器中你看到的。我们给标题设置了暗红色和 36px 大小，给段落设置了深棕色：\n\n\```css\nh1 {\n  color: #8B2E2E;\n  font-size: 36px;\n}\n\np {\n  color: #6B5A4E;\n  font-size: 18px;\n}\n\```\n切换到 CSS 标签页可以看到完整样式，预览区能看到效果。",
      },
      {
        type: "task",
        title: "动手试试 ✨",
        content:
          "切换到 CSS 标签页，尝试以下操作：\n\n1. 把 `h1` 的 `color` 改成你喜欢的颜色（试试 `#C9A96E` 金色，或 `#5B8C5A` 绿色）\n2. 把 `font-size` 调大或调小，看看标题怎么变化\n3. 给 `p` 也换一个不同的颜色\n\n就像调配音色一样，试试不同的颜色组合吧！",
      },
    ],
    starterCode: {
      html: "<h1>我的音乐世界</h1>\n<p>用色彩表达音乐的感觉。</p>\n<p>每一种颜色，都像一种音色。</p>",
      css: "h1 {\n  color: #8B2E2E;\n  font-size: 36px;\n}\n\np {\n  color: #6B5A4E;\n  font-size: 18px;\n}",
      js: "",
    },
  },

  // ===== 2.2 css-bg-border =====
    {
    id: "css-bg-border",
    chapterId: "css-style",
    order: 2,
    title: "背景与边框 — 为卡片增添层次",
    musicAnalogy:
      "背景颜色像**舞台的幕布**，边框像**画框**，它们为内容营造氛围和层次感——就像不同颜色的幕布会影响观众对乐曲的第一印象。",
    listenTo:
      "柴可夫斯基《胡桃夹子》— 糖果仙子的宫殿有华丽的金色装饰，想象一下用 CSS 来描绘它。",
    sections: [
      {
        type: "explain",
        title: "背景颜色",
        content:
          "用 `background-color` 属性可以给元素添加背景色：\n\n\```css\ndiv {\n  background-color: #FFFAF2;\n}\n\```\n\n就像给乐谱选一张暖色调的纸，背景色能改变整个页面的氛围。",
      },
      {
        type: "explain",
        title: "边框与圆角",
        content:
          "`border` 给元素加上边框，`border-radius` 让边角变圆滑：\n\n\```css\ndiv {\n  border: 2px solid #D4C5A9;\n  border-radius: 12px;\n}\n\```\n\n- `2px` — 边框粗细\n- `solid` — 实线（还有 `dashed` 虚线、`dotted` 点线）\n- `#D4C5A9` — 边框颜色\n- `border-radius: 12px` — 圆角半径，值越大越圆\n\n圆角让卡片更柔和，就像乐谱中圆润的连音线。",
      },
      {
        type: "example",
        title: "看例子",
        content:
          '下面的代码创建了一张"作曲家卡片"，有暖色背景、细边框和圆角：\n\n\```css\n.card {\n  background-color: #FFFAF2;\n  border: 2px solid #D4C5A9;\n  border-radius: 12px;\n  padding: 20px;\n}\n\n.card h2 {\n  color: #8B2E2E;\n}\n\```\n切换到 CSS 标签页查看完整代码。',
      },
      {
        type: "task",
        title: "动手试试 ✨",
        content:
          "切换到 CSS 标签页，试着：\n\n1. 把 `.card` 的 `background-color` 换一个颜色（试试 `#F0F8FF` 浅蓝，或 `#FFF8F0` 暖橙）\n2. 把 `border` 的粗细从 `2px` 改成 `4px`，看看边框变粗的效果\n3. 把 `border-radius` 改成 `24px`，让卡片更圆润\n4. 试试把 `solid` 改成 `dashed`，看虚线边框的效果",
      },
    ],
    starterCode: {
      html: '<h1>作曲家画廊</h1>\n\n<div class="card">\n  <h2>路德维希·凡·贝多芬</h2>\n  <p>德国作曲家，古典与浪漫时期的桥梁。</p>\n  <p>代表作：《命运交响曲》《月光奏鸣曲》</p>\n</div>\n\n<div class="card">\n  <h2>弗里德里克·肖邦</h2>\n  <p>波兰作曲家，"钢琴诗人"。</p>\n  <p>代表作：《夜曲》《革命练习曲》</p>\n</div>',
      css: ".card {\n  background-color: #FFFAF2;\n  border: 2px solid #D4C5A9;\n  border-radius: 12px;\n  padding: 20px;\n  margin-bottom: 16px;\n}\n\n.card h2 {\n  color: #8B2E2E;\n  margin-top: 0;\n}\n\n.card p {\n  color: #6B5A4E;\n}",
      js: "",
    },
  },

  // ===== 2.3 css-font-spacing =====
    {
    id: "css-font-spacing",
    chapterId: "css-style",
    order: 3,
    title: "字体与间距 — 让文字更优雅",
    musicAnalogy:
      "字体选择像**不同乐器的音色**——衬线体如小提琴般优雅，无衬线体如长笛般清晰。而 `letter-spacing` 和 `line-height` 则像音符间的**时值与呼吸**，决定了阅读的节奏。",
    listenTo:
      "圣桑《动物狂欢节》— 每种乐器代表一种动物，音色各具特色，就像不同字体传达不同的气质。",
    sections: [
      {
        type: "explain",
        title: "字体系列",
        content:
          '`font-family` 决定文字使用什么字体：\n\n\```css\nh1 {\n  font-family: "Noto Serif SC", serif;\n}\n\np {\n  font-family: "Noto Sans SC", sans-serif;\n}\n\```\n\n两种主要的字体类型：\n- **衬线体（serif）**：笔划末端有装饰，典雅庄重，适合标题\n- **无衬线体（sans-serif）**：笔划均匀，简洁现代，适合正文\n\n像选乐器一样——你不会用小提琴的音色去吹进行曲。',
      },
      {
        type: "explain",
        title: "间距控制",
        content:
          '三个重要的间距属性：\n\n- `letter-spacing` — 字母/汉字间距，像音符间的疏密\n- `line-height` — 行高，像乐谱中行与行的距离\n- `text-align` — 文字对齐（`left` / `center` / `right`），像乐团的队列\n\n合理的间距让文字"透气"，就像休止符让音乐有呼吸的空间。',
      },
      {
        type: "example",
        title: "看例子",
        content:
          '下面这段 CSS 展示了字体和间距的综合运用。切换到 CSS 标签页查看：\n\n\```css\n.card {\n  font-family: "Noto Serif SC", serif;\n  line-height: 1.8;\n  letter-spacing: 0.05em;\n  text-align: center;\n}\n\```\n注意预览区中文字的字体风格、行间距和字间距的变化。',
      },
      {
        type: "task",
        title: "动手试试 ✨",
        content:
          "切换到 CSS 标签页，试试调整：\n\n1. 把 `.card` 的 `font-family` 改成 `sans-serif`，感受字体变化\n2. 把 `line-height` 从 `1.8` 改成 `1.3` 和 `2.5`，看看行间距的疏密变化\n3. 把 `letter-spacing` 加大到 `0.15em`，感受字间距\n4. 把 `text-align` 改成 `left` 和 `right`，看对齐变化",
      },
    ],
    starterCode: {
      html: '<h1>音乐随想</h1>\n\n<div class="card">\n  <h2>月光之下</h2>\n  <p>德彪西的《月光》如流水般倾泻，每一个音符都像是洒在琴键上的银色月光。</p>\n  <p>闭上眼睛，让音乐带你进入一个朦胧而美丽的梦境。</p>\n</div>',
      css: 'h1 {\n  font-family: "Noto Serif SC", serif;\n  text-align: center;\n  color: #3D2B1F;\n}\n\n.card {\n  font-family: "Noto Serif SC", serif;\n  line-height: 1.8;\n  letter-spacing: 0.05em;\n  text-align: center;\n  background-color: #FFFAF2;\n  border: 1px solid #D4C5A9;\n  border-radius: 12px;\n  padding: 24px;\n}\n\n.card h2 {\n  color: #8B2E2E;\n}',
      js: "",
    },
  },

  // ===== 2.4 css-box-model =====
    {
    id: "css-box-model",
    chapterId: "css-style",
    order: 4,
    title: "盒模型 — 理解元素的空间",
    musicAnalogy:
      '每个 HTML 元素都是一个"盒子"，就像**音乐厅的声学布局**：\n\n- `content`（内容）— 演奏区，音乐家所在的地方\n- `padding`（内边距）— 舞台到墙壁的距离\n- `border`（边框）— 音乐厅的墙壁\n- `margin`（外边距）— 音乐厅之间的间隔',
    listenTo:
      '马勒《第八交响曲》"千人交响曲"— 感受庞大的空间感和层次感，就像盒模型的层层嵌套。',
    sections: [
      {
        type: "explain",
        title: "盒模型的四层结构",
        content:
          '从内到外，每个元素有四层空间：\n\n[[html]]\n<div class="box-model-demo">\n  <div class="bm-margin"><span class="bm-label">margin 外边距</span>\n    <div class="bm-border"><span class="bm-label">border 边框</span>\n      <div class="bm-padding"><span class="bm-label">padding 内边距</span>\n        <div class="bm-content">content（内容）</div>\n      </div>\n    </div>\n  </div>\n</div>\n[[/html]]\n\n最外层 `margin`（外边距），往里一层 `border`（边框），再往里 `padding`（内边距），最里面是 `content`（内容）。理解这个层次关系就掌握了 CSS 布局的基础！',
      },
      {
        type: "explain",
        title: "padding 和 margin 的区别",
        content:
          "- `padding`（内边距）：内容与边框之间的距离，在边框**里面**\n- `margin`（外边距）：边框与相邻元素之间的距离，在边框**外面**\n\n一个常用的记忆方式：\n- padding 有背景色（在盒子里）\n- margin 透明（盒子之外）\n\n就像舞台上的地毯（padding）和舞台之间的过道（margin）！",
      },
      {
        type: "example",
        title: "看例子",
        content:
          "下面的代码展示了盒模型的实际应用。两张卡片，每张都有自己的padding和margin：\n\n\```css\n.card {\n  background-color: #FFFAF2;\n  border: 2px solid #D4C5A9;\n  border-radius: 8px;\n  padding: 24px;       /* 内容到边框的距离 */\n  margin-bottom: 20px;  /* 卡片之间的间隔 */\n}\n\```",
      },
      {
        type: "task",
        title: "动手试试 ✨",
        content:
          "切换到 CSS 标签页，调整这些值看效果：\n\n1. 把 `.card` 的 `padding` 从 `24px` 改成 `8px`，感受内容变得拥挤\n2. 把 `padding` 改成 `48px`，感受宽松的空间\n3. 把 `margin-bottom` 从 `20px` 改成 `60px`，卡片之间距离变大\n4. 试试给 `h2` 加一个 `margin-top: 0` 消除顶部多余间距",
      },
    ],
    starterCode: {
      html: '<h1>音乐空间</h1>\n\n<div class="card">\n  <h2>🎻 弦乐四重奏</h2>\n  <p>两把小提琴、一把中提琴、一把大提琴。</p>\n  <p>亲密而精致的对话。</p>\n</div>\n\n<div class="card">\n  <h2>🎺 爵士三重奏</h2>\n  <p>钢琴、贝斯、鼓。</p>\n  <p>即兴与节奏的碰撞。</p>\n</div>',
      css: ".card {\n  background-color: #FFFAF2;\n  border: 2px solid #D4C5A9;\n  border-radius: 8px;\n  padding: 24px;\n  margin-bottom: 20px;\n}\n\n.card h2 {\n  color: #8B2E2E;\n  margin-top: 0;\n}\n\n.card p {\n  color: #6B5A4E;\n  margin: 6px 0;\n}",
      js: "",
    },
  },

  // ===== 2.5 css-selectors =====
    {
    id: "css-selectors",
    chapterId: "css-style",
    order: 5,
    title: "CSS 选择器 — 精确指向你的元素",
    musicAnalogy:
      '选择器就像**指挥的手势**——指向特定的乐器组（元素），告诉它们该怎么演奏。`.class` 像指挥说"弦乐组"，`#id` 像说"首席小提琴手"，`:hover` 像说"当我指向你的时候..."',
    listenTo:
      "布里顿《青少年管弦乐队指南》— 每一段变奏中，指挥逐一指向不同的乐器组，就像选择器精确选中页面中的元素。",
    sections: [
      {
        type: "explain",
        title: "基础选择器",
        content:
          '选择器告诉 CSS"对谁生效"。三种最基础的选择器：\n\n| 选择器 | 写法 | 含义 |\n|--------|------|------|\n| 元素选择器 | `h1` | 选中所有 `<h1>` |\n| 类选择器 | `.card` | 选中所有 `class="card"` 的元素 |\n| ID选择器 | `#title` | 选中 `id="title"` 的元素 |\n\n\```css\nh1 { color: #8B2E2E; }        /* 所有 h1 */\n.card { background: #FFFAF2; } /* 所有带 class="card" 的 */\n#title { font-size: 2rem; }    /* 只有 id="title" 那个 */\n\```\n\n**类选择器最常用**——一个类可以给多个元素，一个元素也可以有多个类。',
      },
      {
        type: "explain",
        title: "组合与后代",
        content:
          '选择器可以组合使用，精确指定层级关系：\n\n- `.card h2` — **后代选择器**，`.card` 内部的所有 `<h2>`\n- `.card > h2` — **子代选择器**，`.card` 的直接子元素 `<h2>`\n- `h2, h3` — **分组选择器**，同时选中 `<h2>` 和 `<h3>`\n- `.card.featured` — **交集选择器**，同时有 `class="card featured"` 的元素\n\n\```css\n.card h2 { color: #8B2E2E; }       /* card 内的所有 h2 */\n.card.featured { border-color: gold; } /* 只有 featured 的那张卡片 */\n\```\n\n就像指挥可以指向"弦乐组中的第一小提琴"或"整个管乐声部"。',
      },
      {
        type: "explain",
        title: "伪类选择器 — 状态触发的魔法",
        content:
          "伪类以 `:` 开头，根据元素的**状态**来应用样式：\n\n- `:hover` — 鼠标悬停时\n- `:first-child` — 是父元素的第一个子元素\n- `:last-child` — 是父元素的最后一个子元素\n- `:nth-child(n)` — 是父元素的第 n 个子元素\n\n\```css\n.card:hover { transform: translateY(-2px); }\n.card:first-child { border-color: #8B2E2E; }\n.card:nth-child(2) { border-color: #C9A96E; }\n\```\n\n`:hover` 是交互感的来源——鼠标移到卡片上，卡片微微上浮，就像指挥的棒尖点到了你！",
      },
      {
        type: "example",
        title: "看例子",
        content:
          "下面的代码有三张卡片，用不同的选择器为它们设置了左侧的强调色：\n\n\```css\n/* 所有卡片共享的样式 */\n.card {\n  background-color: #FFFAF2;\n  border: 1px solid #D4C5A9;\n  border-radius: 8px;\n  padding: 16px;\n  margin-bottom: 12px;\n  transition: all 0.3s ease;\n}\n\n/* :hover 交互反馈 */\n.card:hover {\n  border-color: #C9A96E;\n  transform: translateY(-2px);\n}\n\n/* :nth-child 给每张卡片不同的强调色 */\n.card:nth-child(1) { border-left: 4px solid #8B2E2E; }\n.card:nth-child(2) { border-left: 4px solid #C9A96E; }\n.card:nth-child(3) { border-left: 4px solid #5B8C5A; }\n\```\n试试把鼠标移到卡片上，看它们微微上浮的效果！",
      },
      {
        type: "task",
        title: "动手试试 ✨",
        content:
          "切换到 CSS 标签页，尝试：\n\n1. 把 `.card:nth-child(1)` 的左边框颜色换一个\n2. 给 `.card:hover` 增加 `box-shadow` 属性，让悬浮效果更明显\n3. 试试 `.card:last-child` 选择器，给最后一张卡片特殊的样式\n4. 挑战：添加一张新卡片（第4张），用 `.card:nth-child(4)` 给它设置不同的颜色",
      },
    ],
    starterCode: {
      html: '<h1>作曲家名录</h1>\n\n<div class="card">\n  <h2>🎻 巴赫</h2>\n  <p>巴洛克时期的复调大师</p>\n</div>\n\n<div class="card featured">\n  <h2>🎹 莫扎特</h2>\n  <p>古典主义的旋律天才</p>\n</div>\n\n<div class="card">\n  <h2>🎺 贝多芬</h2>\n  <p>古典与浪漫的桥梁</p>\n</div>',
      css: "h1 {\n  color: #8B2E2E;\n  margin-bottom: 20px;\n}\n\n.card {\n  background-color: #FFFAF2;\n  border: 1px solid #D4C5A9;\n  border-radius: 8px;\n  padding: 16px;\n  margin-bottom: 12px;\n  transition: all 0.3s ease;\n}\n\n.card:hover {\n  border-color: #C9A96E;\n  transform: translateY(-2px);\n  box-shadow: 0 4px 12px rgba(61, 43, 31, 0.1);\n}\n\n.card h2 {\n  color: #3D2B1F;\n  margin: 0 0 4px 0;\n}\n\n.card p {\n  color: #6B5A4E;\n  margin: 0;\n}\n\n.card:nth-child(1) {\n  border-left: 4px solid #8B2E2E;\n}\n\n.card:nth-child(2) {\n  border-left: 4px solid #C9A96E;\n}\n\n.card:nth-child(3) {\n  border-left: 4px solid #5B8C5A;\n}\n\n/* featured 卡片的特殊样式 */\n.card.featured {\n  background: #FFF8F0;\n}",
      js: "",
    },
  },

  // ===== 2.6 css-cascade =====
    {
    id: "css-cascade",
    chapterId: "css-style",
    order: 6,
    title: '层叠与优先级 — 当多个规则"打架"时谁说了算？',
    musicAnalogy:
      'CSS 的"C"代表 **Cascading**（层叠）。当指挥给木管组一个整体指示、同时又给长笛手一个特别指示时，长笛手听谁？当然是**更具体的那个**。CSS 也一样——当多个规则都指向同一个元素时，浏览器按照一套"乐谱排演规则"来决定谁生效：编号越精确的规则优先级越高。',
    listenTo:
      '柴可夫斯基《1812 序曲》— 开头弦乐的祈祷、中间骑兵冲锋的马赛曲、结尾钟声与加农炮的巨响。不同乐器在不同时刻占据前景——CSS 层叠也是如此，具体的选择器在关键时刻"压过"通用规则，形成视觉焦点。',
    sections: [
      {
        type: "explain",
        title: "三条规则决定谁胜出",
        content:
          "多条 CSS 规则都指向同一个元素时，浏览器按以下顺序决定：\n\n**1. 来源与 `!important`**\n- 作者样式 > 用户样式 > 浏览器默认样式\n- `!important` 标记**强行跳过优先级计算**（慎用！）\n\n**2. 选择器权重（Specificity）**\n- **内联 style** = 1000 分\n- **ID 选择器** `#title` = 100 分\n- **类/伪类/属性** `.card`, `:hover` = 10 分\n- **元素/伪元素** `h1`, `::before` = 1 分\n\n**3. 书写顺序**\n- 权重相同时，**后写的覆盖先写的**\n- 就像一部交响曲——最后奏出的主题留在耳中",
      },
      {
        type: "explain",
        title: "权重计算实例",
        content:
          '看这几个例子，理解权重怎么算：\n\n\```css\nh1 { color: red; }                     /* 权重: 1 */\n.card h1 { color: blue; }              /* 权重: 10+1=11 */\n#main h1 { color: green; }             /* 权重: 100+1=101 */\n.card h1.title { color: gold; }        /* 权重: 10+1+10=21 */\n\```\n\n`.card h1` 会覆盖 `h1`，因为 11 > 1。\n`#main h1` 会覆盖所有上面三个，因为 101 最高。\n\n\```css\n/* 权重相同 */\n.card h1 { color: red; }\n.card h1 { color: blue; }  /* ← 这条胜利！（后写） */\n\```\n\n提示：用浏览器 DevTools（F12）可以看到被"划掉"的失效样式——被谁覆盖了，一目了然。',
      },
      {
        type: "explain",
        title: "!important — 紧急按钮，慎用！",
        content:
          "`!important` 写在属性值后面，会让这条声明**无视权重直接生效**：\n\n\```css\nh1 {\n  color: #8B2E2E !important;\n}\n\n/* 即使其他规则权重更高也会被覆盖 */\n\```\n\n**为什么要慎用？**\n`!important` 就像在交响乐中加入电吉他——它能占据主导，但**破坏了正常的层叠逻辑**。一旦用了第一次，很快就需要用更多 `!important` 去覆盖之前的 `!important`，最后变得无法维护。\n\n**只有两种情况应该用：**\n1. 覆盖你无法控制的第三方样式（如 UI 库）\n2. 工具类（如 `.hidden` 必须隐藏元素）",
      },
      {
        type: "example",
        title: "看例子",
        content:
          "下面的代码故意写了冲突的规则，感受层叠效果：\n\n\```css\n/* 规则 1：权重 1 */\np { color: gray; }\n\n/* 规则 2：权重 11 —— 会覆盖规则 1 */\n.card p { color: #3D2B1F; }\n\n/* 规则 3：权重 21 —— 会覆盖规则 2 */\n.card p.highlight { color: #8B2E2E; }\n\n/* 规则 4：权重 101 —— 无人能敌 */\n#special { color: #C9A96E; }\n\```\n\n在预览区看第三条卡片的文字颜色——ID 选择器的金色覆盖了所有其他。",
      },
      {
        type: "task",
        title: "动手试试 ✨",
        content:
          "切换到 CSS 标签页，试试：\n\n1. 去掉 `#special` 的 color 样式，看第三条文字变成什么颜色\n2. 给 `.card p.highlight` 的 color 加 `!important`，看效果\n3. 在 DevTools（F12）中查看元素的 Computed 样式，观察被划掉的规则\n4. 挑战：增加一条 `body .card p` 规则（权重 12），写一个颜色的 color，观察谁能赢",
      },
    ],
    starterCode: {
      html: '<h1>层叠实验</h1>\n\n<div class="card" id="card1">\n  <p>第一条卡片的文字</p>\n</div>\n\n<div class="card" id="card2">\n  <p class="highlight">第二条卡片的文字（有 highlight）</p>\n</div>\n\n<div class="card" id="card3">\n  <p id="special">第三条卡片的文字（有 ID）</p>\n</div>\n\n<p class="note">观察哪条规则最终生效了？</p>',
      css: "h1 {\n  color: #8B2E2E;\n  margin-bottom: 20px;\n}\n\n/* 规则 1：权重 1 */\np { color: #999; }\n\n/* 规则 2：权重 11 */\n.card p { color: #3D2B1F; }\n\n/* 规则 3：权重 21 */\n.card p.highlight { color: #8B2E2E; }\n\n/* 规则 4：权重 101 */\n#special { color: #C9A96E; font-weight: 700; }\n\n.card {\n  background: #FFFAF2;\n  border: 1px solid #D4C5A9;\n  border-radius: 8px;\n  padding: 16px;\n  margin-bottom: 12px;\n}\n\n.note {\n  font-size: 13px;\n  color: #6B5A4E;\n  text-align: center;\n  margin-top: 20px;\n  font-style: italic;\n}",
      js: "",
    },
  },

  // ===== 2.7 css-transitions =====
    {
    id: "css-transitions",
    chapterId: "css-style",
    order: 7,
    title: "过渡与动画 — 让页面流动起来",
    musicAnalogy:
      "动画就像音乐中的**渐强渐弱**（crescendo/diminuendo）——让变化平滑而自然。`transition` 像渐强记号，从 pp 到 ff 缓缓过渡；`@keyframes` 像精确的 **rubato**（弹性速度），自定义每个时间点的状态。",
    listenTo:
      '拉威尔《波莱罗》— 从极弱到极强，配器层层叠加，持续 15 分钟的渐强，完美诠释了"过渡"的艺术。',
    sections: [
      {
        type: "explain",
        title: "transition — 平滑过渡",
        content:
          "`transition` 让属性变化变得平滑，而不是瞬间跳变：\n\n\```css\n.card {\n  background: #FFFAF2;\n  transition: all 0.3s ease;\n}\n\n.card:hover {\n  background: #8B2E2E;\n  color: #fff;\n  transform: scale(1.05);\n}\n\```\n\n- `all` — 所有属性都过渡\n- `0.3s` — 过渡耗时 0.3 秒\n- `ease` — 缓动函数（开始快，结束慢）\n\n就像渐强记号把音量从一个等级平滑带到另一个等级。",
      },
      {
        type: "explain",
        title: "transform — 变换形态",
        content:
          "`transform` 可以改变元素的形状和位置，配合 `transition` 效果最佳：\n\n- `translateY(-4px)` — 向上移动 4px\n- `scale(1.1)` — 放大到 1.1 倍\n- `rotate(5deg)` — 旋转 5 度\n\n\```css\n.card:hover {\n  transform: translateY(-4px) scale(1.02);\n}\n\```\n\n多个变换用空格分隔即可。就像演奏者身体微微前倾（位移）+ 音量加大（缩放）来表现渐强！",
      },
      {
        type: "explain",
        title: "@keyframes — 关键帧动画",
        content:
          "`@keyframes` 可以定义更复杂的、自动播放的动画：\n\n\```css\n@keyframes pulse {\n  0%   { opacity: 1; transform: scale(1); }\n  50%  { opacity: 0.6; transform: scale(1.05); }\n  100% { opacity: 1; transform: scale(1); }\n}\n\n.card {\n  animation: pulse 2s ease-in-out infinite;\n}\n\```\n\n- `pulse` — 动画名称（自己命名）\n- `2s` — 一个周期 2 秒\n- `ease-in-out` — 缓入缓出\n- `infinite` — 无限循环\n\n就像一个持续重复的节奏型——鼓手打的固定节拍！",
      },
      {
        type: "example",
        title: "看例子",
        content:
          "下面的代码展示了三种动画效果。鼠标悬停在前两张卡片上看过渡效果，第三张是自动播放的脉动动画：\n\n\```css\n.fade-card { transition: all 0.3s ease; }\n.fade-card:hover {\n  background: #8B2E2E;\n  color: #fff;\n  transform: scale(1.05);\n}\n\n.bounce-card:hover {\n  animation: bounce 0.6s ease;\n}\n\n@keyframes bounce {\n  0%, 100% { transform: translateY(0); }\n  50% { transform: translateY(-10px); }\n}\n\```\n切换到预览区，把鼠标移到卡片上试试！",
      },
      {
        type: "task",
        title: "动手试试 ✨",
        content:
          "切换到 CSS 标签页，试试：\n\n1. 把 `.fade-card` 的 `transition` 时间改成 `1s`，看过渡变慢\n2. 修改 `@keyframes bounce` 中的 `-10px` 改成 `-20px`，让跳动更大\n3. 调整 `.auto-pulse` 的 `animation` 中 `2s` 改成 `0.5s`，让脉动更快\n4. 挑战：新建一个 `@keyframes spin`，用 `rotate` 做一个旋转动画",
      },
    ],
    starterCode: {
      html: '<h1>动画画廊</h1>\n\n<div class="animation-group">\n  <div class="anim-card fade-card">\n    <span class="card-icon">🎵</span>\n    <strong>渐强过渡</strong>\n    <p>鼠标移到这里</p>\n  </div>\n\n  <div class="anim-card bounce-card">\n    <span class="card-icon">🎹</span>\n    <strong>跳动动画</strong>\n    <p>鼠标移到这里</p>\n  </div>\n\n  <div class="anim-card auto-pulse">\n    <span class="card-icon">💫</span>\n    <strong>自动脉动</strong>\n    <p>无限循环中...</p>\n  </div>\n</div>',
      css: "h1 {\n  color: #8B2E2E;\n  text-align: center;\n  margin-bottom: 24px;\n}\n\n.animation-group {\n  display: flex;\n  gap: 16px;\n  flex-wrap: wrap;\n  justify-content: center;\n}\n\n.anim-card {\n  background: #FFFAF2;\n  border: 1px solid #D4C5A9;\n  border-radius: 12px;\n  padding: 24px;\n  text-align: center;\n  width: 180px;\n  cursor: pointer;\n}\n\n.card-icon {\n  font-size: 32px;\n  display: block;\n  margin-bottom: 8px;\n}\n\n.anim-card strong {\n  display: block;\n  color: #3D2B1F;\n  margin-bottom: 4px;\n}\n\n.anim-card p {\n  color: #6B5A4E;\n  font-size: 12px;\n  margin: 0;\n}\n\n/* 渐强过渡 */\n.fade-card {\n  transition: all 0.3s ease;\n}\n\n.fade-card:hover {\n  background: #8B2E2E;\n  color: #fff;\n  transform: scale(1.05);\n  box-shadow: 0 8px 24px rgba(61, 43, 31, 0.16);\n}\n\n.fade-card:hover strong,\n.fade-card:hover p {\n  color: #fff;\n}\n\n/* 跳动 */\n.bounce-card:hover {\n  animation: bounce 0.6s ease;\n}\n\n@keyframes bounce {\n  0%, 100% { transform: translateY(0); }\n  25% { transform: translateY(-12px); }\n  75% { transform: translateY(-4px); }\n}\n\n/* 自动脉动 */\n.auto-pulse {\n  animation: pulse 2s ease-in-out infinite;\n  border-color: #C9A96E;\n}\n\n@keyframes pulse {\n  0%, 100% { opacity: 1; transform: scale(1); }\n  50% { opacity: 0.7; transform: scale(1.03); }\n}",
      js: "",
    },
  },

  // ===== 2.8 css-animations =====
  {
    id: 'css-animations',
    chapterId: 'css-style',
    order: 8,
    title: 'CSS 动画深入 — 让页面充满律动',
    musicAnalogy: '如果说 transition 是渐强记号（从 pp 平滑到 ff），那么 @keyframes 就是一段完整的节奏型——精确控制每个时间点的状态。animation 属性像乐谱上的演奏法标记：duration 是速度、delay 是休止符的长短、iteration-count 是反复次数、direction 是顺奏还是逆行。把多种动画组合起来，就像配器——让不同乐器的声部同时进行。',
    listenTo: '斯特拉文斯基《春之祭》— 复杂的节奏型、不规则的拍号、多个声部的交错进行，就像页面中同时运行的多个 @keyframes 动画。每一个拍点都精确计算，却产生了震撼人心的效果。',
    sections: [
      {
        type: 'explain',
        title: '@keyframes — 定义动画的"节奏型"',
        content: '还记得 transition 吗？它只能在两个状态之间平滑过渡（比如 hover 前 → hover 后）。@keyframes 让你定义**任意多个关键帧**，创建更复杂的动画：\n\n\```css\n@keyframes swing {\n  0%   { transform: rotate(0deg); }\n  25%  { transform: rotate(5deg); }\n  50%  { transform: rotate(0deg); }\n  75%  { transform: rotate(-5deg); }\n  100% { transform: rotate(0deg); }\n}\n\```\n\n- 百分比代表动画的进度（0% = 开始，100% = 结束）\n- 也可以用 from（= 0%）和 to（= 100%）\n- 每个关键帧可以定义任意多个 CSS 属性\n\n就像乐谱中精确标注了每个小节的力度和表情记号——你掌控着动画的每一帧。',
      },
      {
        type: 'explain',
        title: 'animation 属性 — 演奏法标记全解',
        content: '定义好 @keyframes 后，用 animation 属性把它应用到元素上。它是 8 个子属性的简写：\n\n\```css\n.card {\n  animation:\n    swing          /* animation-name: 用哪个关键帧 */\n    2s             /* animation-duration: 一个周期多长时间 */\n    ease-in-out    /* animation-timing-function: 缓动函数 */\n    1s             /* animation-delay: 等多久再开始 */\n    3              /* animation-iteration-count: 重复几次，infinite = 无限 */\n    alternate      /* animation-direction: 正放还是倒放 */\n    forwards       /* animation-fill-mode: 结束后保持哪个状态 */\n    running;       /* animation-play-state: running 或 paused */\n}\n\```\n\n**常用 timing-function：**\n- ease — 慢→快→慢（默认）\n- linear — 匀速\n- ease-in — 慢→快\n- ease-out — 快→慢\n- cubic-bezier(n,n,n,n) — 自定义曲线\n\n**fill-mode 关键值：**\n- none — 结束后回到初始状态\n- forwards — 结束后保持在最后一帧\n- backwards — 开始前就取第一帧状态\n- both — 同时应用 forwards + backwards',
      },
      {
        type: 'explain',
        title: 'transform 进阶 — 变形、旋转与 3D',
        content: 'transform 不止能用在 transition 中，配合 @keyframes 效果更丰富：\n\n\```css\n/* 2D 变换 */\ntransform: translateX(100px);    /* 水平移动 */\ntransform: translateY(-20px);    /* 垂直移动 */\ntransform: scale(1.2);           /* 放大到 1.2 倍 */\ntransform: rotate(45deg);        /* 顺时针旋转 45° */\ntransform: skewX(10deg);         /* 水平倾斜 */\n\n/* 组合变换（空格分隔，顺序很重要！） */\ntransform: translateX(100px) rotate(45deg) scale(1.1);\n\n/* 设置旋转中心点 */\ntransform-origin: center center;  /* 默认是元素中心 */\ntransform-origin: top left;       /* 改为左上角 */\n\```\n\n3D 变换（需要 perspective 才能看到深度效果）：\n\```css\n.container {\n  perspective: 600px;  /* 透视距离——越小越夸张 */\n}\n.card {\n  transform: rotateY(30deg);   /* 绕 Y 轴旋转 */\n  transform: rotateX(15deg);   /* 绕 X 轴翻转 */\n}\n\```\n\n就像指挥要求小提琴组不只拉动琴弓（translate），还要微微转动琴身（rotate）来控制音色。',
      },
      {
        type: 'example',
        title: '看例子',
        content: '下面的代码展示了三种经典动画效果：\n\n\```css\n/* 摇摆——像节拍器 */\n@keyframes swing {\n  0%, 100% { transform: rotate(-3deg); }\n  50% { transform: rotate(3deg); }\n}\n\n/* 淡入上浮——像幕布升起 */\n@keyframes fadeInUp {\n  from {\n    opacity: 0;\n    transform: translateY(30px);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0);\n  }\n}\n\n/* 心跳——缩放+透明度脉动 */\n@keyframes heartbeat {\n  0%, 100% { transform: scale(1); }\n  15% { transform: scale(1.15); }\n  30% { transform: scale(1); }\n  45% { transform: scale(1.1); }\n  60% { transform: scale(1); }\n}\n\```\n\n看预览区——三张卡片各自执行不同的动画，播放/暂停按钮可以控制动画状态。',
      },
      {
        type: 'task',
        title: '动手试试 ✨',
        content: '切换到 CSS 标签页，试试：\n\n1. 把 swing 动画的 rotate 角度从 3deg 改成 8deg，看摇摆幅度变大\n2. 修改 fadeInUp 的 translateY 从 30px 改成 60px——漂移更明显\n3. 给 heartbeat 的 animation-duration 从 1.5s 改成 0.8s——心跳更快\n4. 挑战：用 @keyframes 写一个唱片旋转动画（rotate + infinite + linear）\n5. 挑战：把 fadeInUp 动画的 fill-mode 改成 forwards 和 none，分别观察结束后的状态',
      },
    ],
    starterCode: {
      html: '<h1>🎬 动画舞台</h1>\n\n<div class="stage">\n  <div class="anim-card swing-card">\n    <span class="card-icon">🎵</span>\n    <strong>摇摆</strong>\n    <p>像节拍器一样摆动</p>\n  </div>\n  <div class="anim-card fade-card">\n    <span class="card-icon">🎭</span>\n    <strong>淡入上浮</strong>\n    <p>幕布升起的效果</p>\n  </div>\n  <div class="anim-card heart-card">\n    <span class="card-icon">💗</span>\n    <strong>心跳</strong>\n    <p>缩放脉动的节奏</p>\n  </div>\n</div>\n\n<div class="controls">\n  <button id="pauseBtn">⏯ 暂停动画</button>\n</div>',
      css: 'h1 { text-align: center; color: #8B2E2E; margin-bottom: 24px; }\n.stage { display: flex; gap: 20px; flex-wrap: wrap; justify-content: center; }\n.anim-card { background: #FFFAF2; border: 1px solid #D4C5A9; border-radius: 12px; padding: 28px 24px; text-align: center; width: 180px; }\n.card-icon { font-size: 40px; display: block; margin-bottom: 8px; }\n.anim-card strong { display: block; color: #3D2B1F; font-size: 16px; margin-bottom: 4px; }\n.anim-card p { color: #6B5A4E; font-size: 12px; margin: 0; }\n\n@keyframes swing {\n  0%, 100% { transform: rotate(-3deg); }\n  50% { transform: rotate(3deg); }\n}\n.swing-card { animation: swing 2s ease-in-out infinite; transform-origin: center top; }\n\n@keyframes fadeInUp {\n  from { opacity: 0; transform: translateY(30px); }\n  to { opacity: 1; transform: translateY(0); }\n}\n.fade-card { animation: fadeInUp 1.5s ease-out infinite; }\n\n@keyframes heartbeat {\n  0%, 100% { transform: scale(1); }\n  15% { transform: scale(1.15); }\n  30% { transform: scale(1); }\n  45% { transform: scale(1.1); }\n  60% { transform: scale(1); }\n}\n.heart-card { animation: heartbeat 1.5s ease-in-out infinite; }\n\n.controls { text-align: center; margin-top: 28px; }\n#pauseBtn { padding: 10px 24px; background: #8B2E2E; color: #fff; border: none; border-radius: 8px; font-size: 14px; cursor: pointer; transition: background 0.2s; }\n#pauseBtn:hover { background: #C94545; }\n.stage.paused .anim-card { animation-play-state: paused; }',
      js: 'const pauseBtn = document.getElementById(\'pauseBtn\');\nconst stage = document.querySelector(\'.stage\');\n\npauseBtn.addEventListener(\'click\', () => {\n  const isPaused = stage.classList.toggle(\'paused\');\n  pauseBtn.textContent = isPaused ? \'▶ 恢复动画\' : \'⏯ 暂停动画\';\n});',
    },
  },

  // ===== 2.9 css-variables =====
    {
    id: "css-variables",
    chapterId: "css-style",
    order: 9,
    title: "CSS 变量 — 一次定义，全局共鸣",
    musicAnalogy:
      "CSS 变量就像乐谱开头的**调号（key signature）**——升 fa 升 do 写一次，全曲所有的 fa 和 do 都跟着自动升。用 `--main-color` 定义一种颜色，全站所有用到它的地方一起改变。这个网站本身就在大量使用 CSS 变量！",
    listenTo:
      "巴赫《十二平均律》— 24 个大小调各写一首前奏曲与赋格，每个调性有不同的色彩和性格，就像 CSS 变量为不同的主题定义不同的色板，一键切换整个氛围。",
    sections: [
      {
        type: "explain",
        title: "定义和使用变量",
        content:
          "CSS 变量以 `--` 开头，在 `var()` 中引用：\n\n\```css\n:root {\n  --main-color: #8B2E2E;\n  --card-bg: #FFFAF2;\n  --spacing: 16px;\n}\n\n.card {\n  color: var(--main-color);\n  background: var(--card-bg);\n  padding: var(--spacing);\n}\n\```\n\n- `:root` — 全局作用域（相当于 `<html>`），在这里定义的变量全站可用\n- 变量名大小写敏感：`--mainColor` ≠ `--maincolor`\n- `var(--name, fallback)` — 第二个参数是备用值\n\n想看实际应用？打开 `src/styles/variables.css`——这个网站的每个颜色、间距、字体都定义在那里。",
      },
      {
        type: "explain",
        title: "局部覆盖与主题切换",
        content:
          "变量可以在任意元素上重新定义，子元素继承新值：\n\n\```css\n:root {\n  --theme: #8B2E2E;\n}\n\n.card.dark {\n  --theme: #C9A96E;\n  /* 这张卡片内的所有子元素都会用金色主题 */\n}\n\```\n\n这就像乐曲中的**转调**——同一段旋律换一个调演奏，感觉完全不同。\n\n**实战优势：**\n- 颜色、间距、圆角全部用变量管理\n- 更换主题只需改一组变量值\n- 修改一个地方，全站自动同步",
      },
      {
        type: "example",
        title: "看例子",
        content:
          "下面的代码在 `:root` 中定义了色彩变量，第二张卡片通过 `.dark` 类覆盖了局部变量值。两张卡片用了**完全相同的样式规则**，只因变量不同而呈现截然不同的风格：\n\n\```css\n:root {\n  --card-bg: #FFFAF2;\n  --card-accent: #8B2E2E;\n  --card-sub: #6B5A4E;\n}\n\n.card.dark {\n  --card-bg: #3D2B1F;\n  --card-accent: #C9A96E;\n  --card-sub: #B8A898;\n}\n\```\n看预览区——白天与黑夜，同一套规则，两组变量。",
      },
      {
        type: "task",
        title: "动手试试 ✨",
        content:
          "切换到 CSS 标签页，试试：\n\n1. 修改 `:root` 中的 `--card-accent` 颜色，看两张卡片的变化\n2. 在 `:root` 中新增一个 `--radius: 8px` 变量，让两张卡片用 `var(--radius)` 替代固定的 `border-radius`\n3. 修改 `.card.dark` 中的变量值，创造你自己的暗色主题色板\n4. 挑战：创建第三张卡片，给它一个 `.warm` 类并定义一套暖橙色调变量",
      },
    ],
    starterCode: {
      html: '<h1>变量主题切换</h1>\n\n<div class="card">\n  <h2>古典主题</h2>\n  <p>米白底色，深红强调色</p>\n  <span class="tag">经典</span>\n</div>\n\n<div class="card dark">\n  <h2>暗夜主题</h2>\n  <p>深棕底色，金色强调色</p>\n  <span class="tag">暗夜</span>\n</div>',
      css: ":root {\n  --card-bg: #FFFAF2;\n  --card-accent: #8B2E2E;\n  --card-text: #3D2B1F;\n  --card-sub: #6B5A4E;\n}\n\nh1 {\n  color: #8B2E2E;\n  text-align: center;\n  margin-bottom: 20px;\n}\n\n.card {\n  background: var(--card-bg);\n  border-left: 4px solid var(--card-accent);\n  border-radius: 8px;\n  padding: 24px;\n  margin-bottom: 16px;\n  transition: all 0.3s ease;\n}\n\n.card h2 {\n  color: var(--card-accent);\n  margin: 0 0 8px 0;\n}\n\n.card p {\n  color: var(--card-sub);\n  margin: 0 0 12px 0;\n  font-size: 14px;\n}\n\n.tag {\n  display: inline-block;\n  background: var(--card-accent);\n  color: var(--card-bg);\n  padding: 2px 10px;\n  border-radius: 4px;\n  font-size: 12px;\n  font-weight: 600;\n}\n\n/* 暗色主题 */\n.card.dark {\n  --card-bg: #3D2B1F;\n  --card-accent: #C9A96E;\n  --card-text: #FFFAF2;\n  --card-sub: #B8A898;\n}",
      js: "",
    },
  },

  // ================================================================
  // 第三章：CSS 布局
  // ================================================================

  // ===== 3.1 css-flexbox =====
    {
    id: "css-flexbox",
    chapterId: "css-layout",
    order: 1,
    title: "Flexbox 入门 — 灵活排列你的内容",
    musicAnalogy:
      "Flexbox 是 CSS 中的布局利器，就像**指挥安排乐队座位**——可以横向排（木管在前，铜管在后），也可以纵向排（第一小提琴在左，第二小提琴在右）。",
    listenTo:
      '布里顿《青少年管弦乐队指南》— 一段音乐展示了不同乐器组在舞台上的位置，完美诠释了"布局"的概念。',
    sections: [
      {
        type: "explain",
        title: "什么是 Flexbox？",
        content:
          "Flexbox（弹性盒子）让元素排列变得简单。只需在**父元素**上设置 `display: flex`，子元素就会自动排列：\n\n\```css\n.container {\n  display: flex;\n}\n\```\n\n默认情况下，子元素会**横向排列**（就像乐团的乐器按行排开）。",
      },
      {
        type: "explain",
        title: "主轴方向",
        content:
          '`flex-direction` 决定排列方向：\n\n- `row`（默认）— 横向排列，从左到右，像乐团的一排\n- `column` — 纵向排列，从上到下，像总谱的各声部\n\n乐团排练时指挥说"弦乐坐左边，管乐坐右边"——在 CSS 中，`flex-direction` 就是你的指挥棒！',
      },
      {
        type: "explain",
        title: "间距分配",
        content:
          "`justify-content` 控制主轴上的对齐方式：\n\n- `flex-start` — 靠左/靠上\n- `center` — 居中\n- `space-between` — 两端对齐，中间均匀分布\n- `space-around` — 每个元素周围有相同间距\n\n就像合唱团在舞台上排开——可以挤在中间，也可以均匀分布。",
      },
      {
        type: "example",
        title: "看例子",
        content:
          "下面的代码用 Flexbox 把三张作曲家卡片横向排列。注意 `.container` 上的 `display: flex`：\n\n\```css\n.container {\n  display: flex;\n  gap: 20px;\n  justify-content: center;\n}\n\n.card {\n  flex: 1;\n}\n\```\n`gap` 是卡片之间的间距，`flex: 1` 让每张卡片平均分配宽度。",
      },
      {
        type: "task",
        title: "动手试试 ✨",
        content:
          "切换到 CSS 标签页，尝试以下调整：\n\n1. 把 `.container` 的 `flex-direction` 改成 `column`，看卡片变成纵向排列\n2. 把 `justify-content` 改成 `space-between` 或 `space-around`\n3. 调整 `gap` 的值，看看卡片间距的变化\n4. 试试去掉某张卡片的 `flex: 1`，看看宽度怎么分配",
      },
    ],
    starterCode: {
      html: '<h1>三大作曲家</h1>\n\n<div class="container">\n  <div class="card">\n    <h2>巴赫</h2>\n    <p>巴洛克时期</p>\n    <p>复调音乐的大师</p>\n  </div>\n  <div class="card">\n    <h2>莫扎特</h2>\n    <p>古典主义时期</p>\n    <p>旋律的天才</p>\n  </div>\n  <div class="card">\n    <h2>贝多芬</h2>\n    <p>古典与浪漫之交</p>\n    <p>音乐的革命者</p>\n  </div>\n</div>',
      css: ".container {\n  display: flex;\n  gap: 20px;\n  justify-content: center;\n}\n\n.card {\n  flex: 1;\n  background-color: #FFFAF2;\n  border: 2px solid #D4C5A9;\n  border-radius: 12px;\n  padding: 20px;\n  text-align: center;\n}\n\n.card h2 {\n  color: #8B2E2E;\n  margin-top: 0;\n}\n\n.card p {\n  color: #6B5A4E;\n  margin: 4px 0;\n}",
      js: "",
    },
  },

  // ===== 3.2 css-centering =====
    {
    id: "css-centering",
    chapterId: "css-layout",
    order: 2,
    title: "居中与对齐 — 让页面更专业",
    musicAnalogy:
      "页面居中对齐就像**指挥站在舞台中央**——视觉焦点集中、平衡和谐。而对齐方式的选择，就像决定乐团的排列：对称式、扇形、还是弧形分布。",
    listenTo:
      "莫扎特《G大调弦乐小夜曲》K.525 — 完美的对称结构和平衡感，每一个乐句都恰到好处，就像精心的页面布局。",
    sections: [
      {
        type: "explain",
        title: "水平居中与垂直居中",
        content:
          "在网页布局中，居中对齐是最常用的技巧之一：\n\n**水平居中（文字）：**\n\```css\ntext-align: center;\n\```\n\n**水平居中（块级元素）：**\n\```css\nmargin: 0 auto;\n\```\n\n**Flexbox 一键居中（最强方法）：**\n\```css\n.container {\n  display: flex;\n  justify-content: center;  /* 水平居中 */\n  align-items: center;      /* 垂直居中 */\n}\n\```",
      },
      {
        type: "explain",
        title: "align-items 交叉轴对齐",
        content:
          "`align-items` 控制**交叉轴**（垂直于主轴的方向）上的对齐：\n\n- `stretch`（默认）— 拉伸填满\n- `center` — 交叉轴居中\n- `flex-start` — 交叉轴起点\n- `flex-end` — 交叉轴终点\n\n在横向排列（row）时，交叉轴就是垂直方向。用 `align-items: center` 可以让所有卡片在垂直方向居中对齐，即使它们高度不同。",
      },
      {
        type: "example",
        title: "看例子",
        content:
          '下面的代码创建了一个居中的"演奏邀请卡"。`.wrapper` 使用 Flexbox 将卡片在页面中水平和垂直居中，`.card` 内的文字也居中对齐：\n\n\```css\n.wrapper {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  min-height: 200px;\n}\n\n.card {\n  text-align: center;\n}\n\```',
      },
      {
        type: "task",
        title: "动手试试 ✨",
        content:
          "切换到 CSS 标签页，试着调整对齐方式：\n\n1. 把 `.wrapper` 的 `justify-content` 改成 `flex-start`，看卡片移到左边\n2. 把 `align-items` 改成 `flex-start`，卡片移到顶部\n3. 试试在 `.card` 中添加 `width: 300px`，然后用 `margin: 0 auto` 居中\n4. 把 `.card` 的 `text-align` 改成 `left`，看看文字左对齐的效果",
      },
    ],
    starterCode: {
      html: '<div class="wrapper">\n  <div class="card">\n    <div class="icon">🎵</div>\n    <h2>诚挚邀请</h2>\n    <p>欢迎参加本周六的</p>\n    <p class="highlight">古典音乐之夜</p>\n    <p class="time">19:30 · 音乐厅</p>\n  </div>\n</div>',
      css: ".wrapper {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  min-height: 200px;\n}\n\n.card {\n  background-color: #FFFAF2;\n  border: 2px solid #D4C5A9;\n  border-radius: 16px;\n  padding: 40px;\n  text-align: center;\n}\n\n.icon {\n  font-size: 48px;\n  margin-bottom: 12px;\n}\n\n.card h2 {\n  color: #8B2E2E;\n  margin: 0 0 16px 0;\n}\n\n.card p {\n  color: #6B5A4E;\n  margin: 4px 0;\n}\n\n.highlight {\n  font-size: 20px;\n  font-weight: 700;\n  color: #8B2E2E !important;\n}\n\n.time {\n  margin-top: 16px !important;\n  color: #C9A96E !important;\n  font-weight: 600;\n}",
      js: "",
    },
  },

  // ===== 3.3 css-position =====
    {
    id: "css-position",
    chapterId: "css-layout",
    order: 3,
    title: "Position 定位 — 控制元素的舞台位置",
    musicAnalogy:
      "定位属性就像**舞台上不同角色的站位规则**：`relative` 像乐团成员，在自己的座位范围内微调；`absolute` 像**独奏者**站在舞台的特定坐标上；`fixed` 像**舞台灯光**，无论观众视角如何都锁定在固定位置；`sticky` 像**指挥台**，滚动到一定位置就固定住。",
    listenTo:
      '穆索尔斯基《图画展览会》— "漫步"主题在每一段之间出现，画面切换时它始终在那里，就像 `sticky` 元素在滚动中时隐时现。',
    sections: [
      {
        type: "explain",
        title: "static 与 relative",
        content:
          "所有元素默认都是 `position: static`（正常文档流，位置由 HTML 顺序决定）。\n\n`position: relative` 让元素可以**相对于自己原来的位置**偏移：\n\n\```css\n.box {\n  position: relative;\n  top: 10px;    /* 下移 10px */\n  left: 20px;   /* 右移 20px */\n}\n\```\n\n- 元素仍然占据原来的空间（别人不会顶上来）\n- 就像乐团成员在自己的座位上微微调整姿势，不影响旁边的乐手",
      },
      {
        type: "explain",
        title: "absolute — 脱离文档流",
        content:
          "`position: absolute` 让元素脱离正常文档流，相对于**最近的已定位祖先**定位：\n\n\```css\n.stage {\n  position: relative;  /* 祖先必须有定位 */\n}\n\n.soloist {\n  position: absolute;\n  top: 20px;\n  right: 30px;\n}\n\```\n\n- 元素完全脱离文档流（不占据原来的空间）\n- 用 `top`、`right`、`bottom`、`left` 控制位置\n- 就像**独奏者走出乐团，站在舞台前方的精确位置**",
      },
      {
        type: "explain",
        title: "fixed 与 sticky",
        content:
          '`position: fixed` — 相对于**浏览器窗口**定位，滚动也不动：\n\n\```css\n.navbar {\n  position: fixed;\n  top: 0;\n  left: 0;\n  width: 100%;\n  z-index: 100;\n}\n\```\n\n`position: sticky` — 滚动到一定阈值后"粘"住：\n\n\```css\n.header {\n  position: sticky;\n  top: 0;\n}\n\```\n\n- `fixed` 像**舞台追光灯**——永远锁定在视野中\n- `sticky` 像**指挥台**——正常流动，但一旦到达顶部就固定\n- `z-index` 控制层叠顺序（数值越大越靠前）',
      },
      {
        type: "example",
        title: "看例子",
        content:
          "下面的代码模拟了一个舞台布局：指挥台（sticky 顶部）、独奏者（absolute 在卡片中央）、乐手（relative 偏移）：\n\n\```css\n.stage {\n  position: relative;\n  height: 300px;\n}\n\n.soloist {\n  position: absolute;\n  top: 10px;\n  right: 10px;\n}\n\n.player {\n  position: relative;\n  left: 20px;\n}\n\```\n看预览区中元素的位置关系。独奏者始终在卡片右上角！",
      },
      {
        type: "task",
        title: "动手试试 ✨",
        content:
          "切换到 CSS 标签页，尝试：\n\n1. 把 `.soloist` 的 `top` 改成 `50px`，`right` 改成 `50px`，看它移动到哪里\n2. 把 `.player-shift` 的 `left` 从 `20px` 改成 `60px`，看乐手向右偏移\n3. 试试在 `.badge` 中使用 `position: absolute` 和 `top: -8px; right: -8px`\n4. 在预览区滚动（如果内容够多），观察 sticky 的行为",
      },
    ],
    starterCode: {
      html: '<h1>舞台布局</h1>\n\n<div class="stage">\n  <div class="soloist">\n    <span class="badge">🎵</span>\n    独奏者 (absolute)\n  </div>\n\n  <div class="player player-shift">\n    小提琴手 (relative)\n    <span class="note">右移 20px</span>\n  </div>\n\n  <div class="player">\n    中提琴手 (static)\n    <span class="note">正常位置</span>\n  </div>\n\n  <div class="player player-shift">\n    大提琴手 (relative)\n    <span class="note">右移 20px</span>\n  </div>\n</div>',
      css: "h1 {\n  color: #8B2E2E;\n  margin-bottom: 20px;\n}\n\n.stage {\n  position: relative;\n  background: #FFFAF2;\n  border: 2px solid #D4C5A9;\n  border-radius: 12px;\n  padding: 24px;\n  min-height: 260px;\n}\n\n.soloist {\n  position: absolute;\n  top: 10px;\n  right: 10px;\n  background: #FFF8F0;\n  border: 2px solid #C9A96E;\n  border-radius: 8px;\n  padding: 12px 16px;\n  text-align: center;\n  font-weight: 600;\n  color: #8B2E2E;\n}\n\n.badge {\n  position: absolute;\n  top: -12px;\n  right: -12px;\n  font-size: 20px;\n}\n\n.player {\n  background: #fff;\n  border: 1px solid #E8DDCC;\n  border-radius: 6px;\n  padding: 12px 16px;\n  margin-bottom: 8px;\n  color: #3D2B1F;\n}\n\n.player-shift {\n  position: relative;\n  left: 20px;\n  border-color: #C9A96E;\n}\n\n.note {\n  font-size: 12px;\n  color: #C9A96E;\n  margin-left: 12px;\n}",
      js: "",
    },
  },

  // ===== 3.4 css-grid =====
    {
    id: "css-grid",
    chapterId: "css-layout",
    order: 4,
    title: "Grid 布局 — 二维排布你的元素",
    musicAnalogy:
      'Grid 就像**总谱的声部排列**——行是声部（第一小提琴、第二小提琴、中提琴、大提琴），列是小节。每个音符都有精确的"行/列"坐标，Grid 让你同时控制横向和纵向布局。',
    listenTo:
      "巴赫《赋格的艺术》— 多声部精密对位，每一个音符在纵横两个维度上都有精确位置，就像 Grid 的二维网格系统。",
    sections: [
      {
        type: "explain",
        title: "创建网格",
        content:
          '用 `display: grid` 创建网格容器，`grid-template-columns` 定义列：\n\n\```css\n.container {\n  display: grid;\n  grid-template-columns: 1fr 1fr 1fr;\n  gap: 16px;\n}\n\```\n\n- `1fr` — "一份"（fraction），自动分配剩余空间\n- `1fr 1fr 1fr` — 三等分（三列宽度相等）\n- `repeat(3, 1fr)` — 等价写法\n- `gap` — 格子之间的间距\n\n三列等宽就像三行声部并行推进——每个格子就是一个小节！',
      },
      {
        type: "explain",
        title: "行与列的精确控制",
        content:
          "`grid-template-rows` 定义行高：\n\n\```css\n.container {\n  grid-template-columns: repeat(3, 1fr);\n  grid-template-rows: auto 200px;\n}\n\```\n\n子元素可以跨越多列或多行：\n\n\```css\n.card:first-child {\n  grid-column: span 2;  /* 跨 2 列 */\n}\n\n.card:last-child {\n  grid-column: 1 / 3;   /* 从第1条线到第3条线（也是跨2列） */\n}\n\```\n\n就像总谱中某个声部的长音符跨越了好几个小节！",
      },
      {
        type: "explain",
        title: "Flexbox vs Grid 怎么选？",
        content:
          '- **Flexbox**：一维排列（要么横向，要么纵向）\n  - 适合：导航栏、卡片列表、居中对齐\n- **Grid**：二维排列（同时控制行和列）\n  - 适合：页面整体布局、照片墙、表格类布局\n\n一个简单的判断：\n- 只需要"排一排" → Flexbox\n- 需要"行和列都对齐" → Grid\n\n就像弦乐四重奏用 Flexbox（4 个人排一排），而管弦乐团总谱用 Grid（声部+小节，二维矩阵）！',
      },
      {
        type: "example",
        title: "看例子",
        content:
          "下面的代码用 Grid 创建了 2×3 的作曲家卡片网格，最后一张跨 2 列：\n\n\```css\n.grid {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  gap: 12px;\n}\n\n.card:last-child {\n  grid-column: span 2;\n}\n\```\n切换到预览区观察网格布局——每张卡片在二维网格中都有精确位置。",
      },
      {
        type: "task",
        title: "动手试试 ✨",
        content:
          "切换到 CSS 标签页，试试：\n\n1. 把 `grid-template-columns` 从 `repeat(3, 1fr)` 改成 `repeat(2, 1fr)`，观察变成 2 列\n2. 把 `gap` 从 `12px` 改成 `24px`，看卡片间距变大\n3. 修改 `.card:last-child` 的 `grid-column` 改成 `span 3`（2列时跨3无效）\n4. 挑战：用 `grid-template-columns: 1fr 2fr` 创建左窄右宽的两列布局",
      },
    ],
    starterCode: {
      html: '<h1>作曲家总谱</h1>\n\n<div class="grid">\n  <div class="card">\n    <h2>巴赫</h2>\n    <p>巴洛克</p>\n  </div>\n  <div class="card">\n    <h2>莫扎特</h2>\n    <p>古典主义</p>\n  </div>\n  <div class="card">\n    <h2>贝多芬</h2>\n    <p>浪漫主义</p>\n  </div>\n  <div class="card">\n    <h2>德彪西</h2>\n    <p>印象派</p>\n  </div>\n  <div class="card wide-card">\n    <h2>肖邦</h2>\n    <p>浪漫主义 · 钢琴诗人</p>\n  </div>\n</div>',
      css: "h1 {\n  color: #8B2E2E;\n  text-align: center;\n  margin-bottom: 20px;\n}\n\n.grid {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  gap: 12px;\n}\n\n.card {\n  background: #FFFAF2;\n  border: 1px solid #D4C5A9;\n  border-radius: 8px;\n  padding: 20px;\n  text-align: center;\n}\n\n.card h2 {\n  color: #8B2E2E;\n  margin: 0 0 4px 0;\n  font-size: 16px;\n}\n\n.card p {\n  color: #6B5A4E;\n  margin: 0;\n  font-size: 12px;\n}\n\n.wide-card {\n  grid-column: span 2;\n  background: #FFF8F0;\n  border-color: #C9A96E;\n}",
      js: "",
    },
  },

  // ===== 3.5 css-responsive =====
    {
    id: "css-responsive",
    chapterId: "css-layout",
    order: 5,
    title: "响应式设计 — 适配不同的屏幕",
    musicAnalogy:
      "响应式设计就像**为不同规模的乐团改编同一首曲子**——大型交响乐团（桌面端）和钢琴独奏（手机）都能演绎同一首作品，区别只在于呈现方式。用 `@media` 查询就像为每种编制写一份适配的谱子。",
    listenTo:
      "拉威尔配器的穆索尔斯基《图画展览会》— 原为钢琴独奏，拉威尔将它改编为管弦乐版本。同一首曲子，两种编制，两种体验，完美诠释响应式设计。",
    sections: [
      {
        type: "explain",
        title: "什么是响应式设计？",
        content:
          '响应式设计让同一个网页在桌面、平板、手机上都有良好的体验。核心工具是 `@media` 查询：\n\n\```css\n/* 手机端（默认） */\n.card { width: 100%; }\n\n/* 平板（≥600px） */\n@media (min-width: 600px) {\n  .card { width: 48%; }\n}\n\n/* 桌面（≥900px） */\n@media (min-width: 900px) {\n  .card { width: 30%; }\n}\n\```\n\n`@media` 后面跟着一个"条件"——当条件满足时，里面的样式才生效。\n\n**移动端优先（推荐）**：先写手机样式作为默认，再用 `min-width` 逐步增强大屏。',
      },
      {
        type: "explain",
        title: "常见的断点",
        content:
          "三个常用的响应式断点：\n\n| 断点 | 设备 | 典型宽度 |\n|------|------|----------|\n| 小屏 | 手机 | < 640px（默认） |\n| 中屏 | 平板 | 640px ~ 1024px |\n| 大屏 | 桌面 | > 1024px |\n\n\```css\n/* 默认：手机（单列） */\n.grid { grid-template-columns: 1fr; }\n\n/* 平板：两列 */\n@media (min-width: 640px) {\n  .grid { grid-template-columns: repeat(2, 1fr); }\n}\n\n/* 桌面：三列 */\n@media (min-width: 1024px) {\n  .grid { grid-template-columns: repeat(3, 1fr); }\n}\n\```\n\n就像独奏版（手机）、室内乐版（平板）、管弦乐版（桌面）——核心旋律不变，编制递增！",
      },
      {
        type: "example",
        title: "看例子",
        content:
          "下面的代码已经包含了响应式断点。试着**改变浏览器窗口的宽度**，你会看到卡片从 1 列变成 2 列再变成 3 列：\n\n\```css\n/* 手机：单列 */\n.grid { grid-template-columns: 1fr; }\n\n/* 平板：两列 */\n@media (min-width: 640px) {\n  .grid { grid-template-columns: repeat(2, 1fr); }\n}\n\n/* 桌面：三列 */\n@media (min-width: 1024px) {\n  .grid { grid-template-columns: repeat(3, 1fr); }\n}\n\```\n在这个网站中，把浏览器窗口从左边向右拖拽，看看发生了什么？",
      },
      {
        type: "task",
        title: "动手试试 ✨",
        content:
          "切换到 CSS 标签页，试试：\n\n1. 调整浏览器窗口宽度，观察卡片列数变化（必须实际拖拽窗口！）\n2. 修改 `640px` 断点为 `500px`，看更早进入两列\n3. 在 `1024px` 断点里给 `.card` 添加 `font-size: 18px`，桌面端文字更大\n4. 挑战：在手机断点（默认）隐藏 `.desktop-only` 元素，在桌面断点显示它\n  提示：`display: none` 隐藏，`@media` 中 `display: block` 显示",
      },
    ],
    starterCode: {
      html: '<h1>响应式卡片画廊</h1>\n<p class="hint">拖动浏览器窗口边缘改变宽度，观察卡片列数变化！</p>\n\n<div class="grid">\n  <div class="card">\n    <h2>巴赫</h2>\n    <p>《赋格的艺术》</p>\n  </div>\n  <div class="card">\n    <h2>莫扎特</h2>\n    <p>《魔笛》</p>\n  </div>\n  <div class="card">\n    <h2>贝多芬</h2>\n    <p>《命运交响曲》</p>\n  </div>\n  <div class="card">\n    <h2>肖邦</h2>\n    <p>《夜曲》</p>\n  </div>\n  <div class="card">\n    <h2>德彪西</h2>\n    <p>《月光》</p>\n  </div>\n  <div class="card">\n    <h2>柴可夫斯基</h2>\n    <p>《天鹅湖》</p>\n  </div>\n</div>',
      css: "h1 {\n  color: #8B2E2E;\n  text-align: center;\n  margin-bottom: 4px;\n}\n\n.hint {\n  text-align: center;\n  color: #C9A96E;\n  font-size: 13px;\n  margin-bottom: 20px;\n}\n\n/* 手机：单列（默认） */\n.grid {\n  display: grid;\n  grid-template-columns: 1fr;\n  gap: 12px;\n}\n\n.card {\n  background: #FFFAF2;\n  border: 1px solid #D4C5A9;\n  border-radius: 8px;\n  padding: 20px;\n  text-align: center;\n}\n\n.card h2 {\n  color: #8B2E2E;\n  margin: 0 0 4px 0;\n}\n\n.card p {\n  color: #6B5A4E;\n  margin: 0;\n  font-size: 14px;\n}\n\n/* 平板：两列 */\n@media (min-width: 640px) {\n  .grid {\n    grid-template-columns: repeat(2, 1fr);\n  }\n}\n\n/* 桌面：三列 */\n@media (min-width: 1024px) {\n  .grid {\n    grid-template-columns: repeat(3, 1fr);\n    gap: 16px;\n  }\n\n  .card {\n    padding: 28px;\n  }\n}",
      js: "",
    },
  },

  // ===== 3.6 css-layout-capstone =====
    {
    id: "css-layout-capstone",
    chapterId: "css-layout",
    order: 6,
    title: "综合项目 — 设计一场音乐会的宣传页",
    musicAnalogy:
      "一场音乐会的海报需要精心布局：标题在顶端（header）、节目单在中央（main content）、赞助商在侧边栏（sidebar）、时间地点在底部（footer）。用 CSS 布局把这些元素安排在合适的位置，就像舞台监督把每个声部安排在正确的位置。",
    listenTo:
      "穆索尔斯基《图画展览会》— 每一段音乐描绘一幅画，整部作品就像在画廊中漫步。你的音乐会页面也将引导访客从头到尾浏览内容——标题、节目单、演奏者介绍、购票信息，每个区域各就各位。",
    sections: [
      {
        type: "explain",
        title: "综合运用你学过的布局技巧",
        content:
          "这个项目综合使用了前面学过的所有布局技能：\n\n- **Flexbox** — 导航栏、演奏者卡片排列\n- **Grid** — 页面整体结构、节目单网格\n- **Position** — 售票按钮固定在视口右下角\n- **居中** — 标题区域垂直居中\n- **响应式** — 移动端和桌面端两套布局\n\n就像指挥把弦乐、管乐、打击乐协调在一起——每种布局技术各司其职。",
      },
      {
        type: "task",
        title: "逐步构建 ✨",
        content:
          '编辑器中已经有一个半成品页面。请完成以下任务：\n\n**第一步：完善导航栏**\n- 用 Flexbox 让导航链接水平排列\n- 给当前页链接加 `.active` 样式\n\n**第二步：完善节目单网格**\n- 用 Grid 把曲目列表排成两列（桌面端）\n- 给每个曲目的 `.time` 设置左对齐、`.piece` 设置右对齐\n\n**第三步：演奏者卡片**\n- 用 Flexbox 让三张卡片水平排列并自动换行\n- 给卡片加 hover 上浮效果\n\n**第四步：底部固定按钮**\n- 用 `position: fixed` 让"购票"按钮始终在右下角\n\n**第五步：响应式**\n- 在 `@media (max-width: 640px)` 中，把节目单改为单列\n- 把导航栏从横排改为竖排',
      },
      {
        type: "hint",
        title: "提示",
        content:
          "- Grid 结构：`grid-template-columns: 120px 1fr;` 让时间和曲目名宽度不同\n- `position: fixed; bottom: 20px; right: 20px;` 实现右下角浮按钮\n- `flex-wrap: wrap;` 让卡片自动换行\n- 用 `@media` 做断点切换——移动端 `flex-direction: column`、`grid-template-columns: 1fr`",
      },
    ],
    starterCode: {
      html: '<!-- 音乐会宣传页面 -->\n<header class="hero">\n  <h1>春之声音乐会</h1>\n  <p class="subtitle">古典与现代的对话</p>\n</header>\n\n<nav class="navbar">\n  <a href="#" class="active">节目单</a>\n  <a href="#">演奏者</a>\n  <a href="#">购票</a>\n</nav>\n\n<main class="main-layout">\n  <section class="program">\n    <h2>演出曲目</h2>\n    <div class="program-grid">\n      <span class="time">19:00</span>\n      <span class="piece">巴赫 — C大调前奏曲 BWV 846</span>\n      <span class="time">19:15</span>\n      <span class="piece">莫扎特 — 小星星变奏曲 K.265</span>\n      <span class="time">19:35</span>\n      <span class="piece">贝多芬 — 月光奏鸣曲 第一乐章</span>\n      <span class="time">19:55</span>\n      <span class="piece">肖邦 — 降E大调夜曲 Op.9 No.2</span>\n      <span class="time">20:15</span>\n      <span class="piece">德彪西 — 月光</span>\n    </div>\n  </section>\n\n  <section class="performers">\n    <h2>演奏者</h2>\n    <div class="performer-cards">\n      <div class="performer">\n        <h3>林雨晴</h3>\n        <p>钢琴</p>\n      </div>\n      <div class="performer">\n        <h3>陈思远</h3>\n        <p>小提琴</p>\n      </div>\n      <div class="performer">\n        <h3>王雅文</h3>\n        <p>大提琴</p>\n      </div>\n    </div>\n  </section>\n</main>\n\n<button class="buy-btn">🎫 立即购票</button>',
      css: "/* ===== 全局 ===== */\nh1 {\n  text-align: center;\n  color: #8B2E2E;\n  margin: 0;\n  font-size: 32px;\n}\n\n.subtitle {\n  text-align: center;\n  color: #C9A96E;\n  font-size: 16px;\n  margin: 8px 0 0 0;\n}\n\n/* ===== 主区域 ===== */\n.hero {\n  padding: 48px 20px 32px;\n}\n\n.navbar {\n  display: flex;\n  justify-content: center;\n  gap: 0;\n  border-top: 1px solid #E8DDCC;\n  border-bottom: 1px solid #E8DDCC;\n  background: #FFFAF2;\n}\n\n.navbar a {\n  padding: 12px 24px;\n  text-decoration: none;\n  color: #6B5A4E;\n  font-size: 14px;\n  font-weight: 500;\n  transition: all 0.2s;\n}\n\n.navbar a:hover {\n  color: #8B2E2E;\n}\n\n.navbar a.active {\n  color: #8B2E2E;\n  border-bottom: 2px solid #C9A96E;\n}\n\n.main-layout {\n  max-width: 760px;\n  margin: 0 auto;\n  padding: 24px 20px;\n}\n\n/* ===== 节目单 ===== */\n.program h2 {\n  color: #8B2E2E;\n  font-size: 20px;\n  margin-bottom: 16px;\n}\n\n.program-grid {\n  display: grid;\n  grid-template-columns: 80px 1fr;\n  gap: 10px 16px;\n  align-items: baseline;\n}\n\n.program-grid .time {\n  color: #C9A96E;\n  font-weight: 600;\n  font-size: 14px;\n  font-family: 'Fira Code', monospace;\n}\n\n.program-grid .piece {\n  color: #3D2B1F;\n  font-size: 15px;\n}\n\n/* ===== 演奏者卡片 ===== */\n.performers {\n  margin-top: 40px;\n}\n\n.performers h2 {\n  color: #8B2E2E;\n  font-size: 20px;\n  margin-bottom: 16px;\n}\n\n.performer-cards {\n  display: flex;\n  gap: 16px;\n  flex-wrap: wrap;\n}\n\n.performer {\n  flex: 1;\n  min-width: 180px;\n  background: #FFFAF2;\n  border: 1px solid #D4C5A9;\n  border-radius: 10px;\n  padding: 24px;\n  text-align: center;\n  transition: all 0.3s ease;\n}\n\n.performer:hover {\n  border-color: #C9A96E;\n  transform: translateY(-3px);\n  box-shadow: 0 6px 16px rgba(61, 43, 31, 0.1);\n}\n\n.performer h3 {\n  color: #8B2E2E;\n  margin: 0 0 4px 0;\n  font-size: 18px;\n}\n\n.performer p {\n  color: #C9A96E;\n  margin: 0;\n  font-size: 13px;\n  font-weight: 600;\n}\n\n/* ===== 固定购票按钮 ===== */\n.buy-btn {\n  position: fixed;\n  bottom: 24px;\n  right: 24px;\n  padding: 14px 28px;\n  background: #8B2E2E;\n  color: #fff;\n  font-size: 16px;\n  font-weight: 600;\n  border: none;\n  border-radius: 50px;\n  cursor: pointer;\n  box-shadow: 0 4px 16px rgba(139, 46, 46, 0.35);\n  transition: all 0.3s ease;\n  z-index: 100;\n}\n\n.buy-btn:hover {\n  background: #C94545;\n  transform: translateY(-2px);\n  box-shadow: 0 6px 24px rgba(139, 46, 46, 0.45);\n}\n\n/* ===== 响应式 ===== */\n@media (max-width: 640px) {\n  .hero {\n    padding: 32px 16px 24px;\n  }\n\n  h1 {\n    font-size: 24px;\n  }\n\n  .navbar {\n    flex-direction: column;\n  }\n\n  .navbar a {\n    text-align: center;\n    border-bottom: 1px solid #EDE5D5;\n  }\n\n  .navbar a.active {\n    border-bottom: 1px solid #C9A96E;\n  }\n\n  .program-grid {\n    grid-template-columns: 1fr;\n    gap: 4px;\n  }\n\n  .program-grid .time {\n    margin-top: 10px;\n  }\n\n  .performer-cards {\n    flex-direction: column;\n  }\n\n  .performer {\n    min-width: auto;\n  }\n\n  .buy-btn {\n    bottom: 16px;\n    right: 16px;\n    padding: 12px 24px;\n    font-size: 14px;\n  }\n}",
      js: "",
    },
  },

  // ================================================================
  // 第四章：JavaScript 入门
  // ================================================================

  // ===== 4.1 js-intro =====
    {
    id: "js-intro",
    chapterId: "js-basics",
    order: 1,
    title: "认识 JavaScript — 给页面注入生命",
    musicAnalogy:
      "如果 HTML 是乐谱、CSS 是演奏法记号，那么 JavaScript 就是**指挥家**——它让静态的乐谱动起来，控制演奏的节奏、顺序和互动。",
    listenTo:
      "斯特拉文斯基《春之祭》— 充满原始的生命力和节奏感，每一个节拍都在变化，就像 JavaScript 为页面注入的动态活力。",
    sections: [
      {
        type: "explain",
        title: "什么是 JavaScript？",
        content:
          'HTML 决定了页面上"有什么"，CSS 决定了"长什么样"，而 JavaScript（简称 JS）决定了"能做什么"。\n\n有了 JavaScript，网页可以：\n- 响应用户的点击和输入\n- 动态改变内容和样式\n- 播放音乐和动画\n- 记住用户的操作\n\n就像一个指挥家让乐团从静止的乐器变成流动的音乐！',
      },
      {
        type: "explain",
        title: "第一行 JavaScript",
        content:
          'JavaScript 写在 `<script>` 标签中。先看一个最简单的方法——`alert()`，它会弹出一个提示框：\n\n\```html\n<script>\n  alert("你好，音乐世界！");\n</script>\n\```\n\n切换到 JS 标签页，你可以看到编辑器中已经有了这段代码。预览区会在页面加载时弹出问候。',
      },
      {
        type: "explain",
        title: "console.log — 开发者的耳朵",
        content:
          '`console.log()` 是 JS 中最常用的调试方法。它会在浏览器的**控制台**（Console）中输出信息：\n\n\```js\nconsole.log("这段文字会出现在控制台");\n\```\n\n就像指挥家用耳朵听排练效果，开发者用 `console.log` 查看代码运行情况。\n\n打开预览区，然后按 `F12` 打开开发者工具，切换到"Console"标签页，你就能看到输出了！',
      },
      {
        type: "example",
        title: "看例子",
        content:
          '下面的代码就是编辑器中你看到的。一个 `alert` 欢迎你，一个 `console.log` 输出信息：\n\n\```js\nalert("欢迎来到音乐编程之旅！");\nconsole.log("页面加载完成，准备就绪！");\n\```\n试试修改 `alert` 和 `console.log` 中的文字。',
      },
      {
        type: "task",
        title: "动手试试 ✨",
        content:
          "切换到 JS 标签页，尝试：\n\n1. 修改 `alert()` 中的文字，换成你自己的欢迎语\n2. 修改 `console.log()` 中的文字\n3. 试着添加第二行 `console.log()`，输出不同的内容\n4. 按 `F12` 打开浏览器控制台，看看你的输出是否出现了",
      },
    ],
    starterCode: {
      html: "<h1>欢迎来到 JavaScript</h1>\n<p>HTML 是乐谱，CSS 是演奏法，JS 是指挥家。</p>",
      css: "h1 {\n  color: #8B2E2E;\n  text-align: center;\n}\n\np {\n  text-align: center;\n  color: #6B5A4E;\n}",
      js: 'alert("欢迎来到音乐编程之旅！");\n\nconsole.log("页面加载完成，准备就绪！");\nconsole.log("按 F12 可以在控制台看到这行文字");',
    },
  },

  // ===== 4.2 js-variables =====
    {
    id: "js-variables",
    chapterId: "js-basics",
    order: 2,
    title: "变量与字符串 — 存储你的音乐信息",
    musicAnalogy:
      "变量就像**反复记号**——把一段内容存起来，想用的时候随时调用。变量名就像乐谱上的段落标记（A段、B段），方便你指代和引用。",
    listenTo:
      "拉威尔《波莱罗》— 同一个旋律重复 18 遍，但每次配器都在变化。变量存着不变的旋律，但你可以用不同的方式使用它。",
    sections: [
      {
        type: "explain",
        title: "什么是变量？",
        content:
          '变量是一个**有名字的容器**，用来存储数据。你可以把任何东西放进去，然后用名字来取用：\n\n\```js\nlet composer = "肖邦";\nlet piece = "夜曲";\nlet year = 1830;\n\```\n\n- `let` — 声明一个变量（可以修改）\n- `const` — 声明一个常量（不能修改）\n- `composer` / `piece` — 变量名（你自己起的名字）\n- `"肖邦"` — 字符串（文本），用引号包裹\n- `1830` — 数字，不需要引号',
      },
      {
        type: "explain",
        title: "拼接字符串",
        content:
          '用 `+` 号可以把字符串和变量拼接在一起：\n\n\```js\nlet composer = "肖邦";\nlet sentence = "我最喜欢的作曲家是" + composer;\n\```\n\n更好的写法是**模板字符串**，用反引号 `` ` `` 包裹，`${}` 插入变量：\n\n\```js\nlet sentence = `我最喜欢的作曲家是${composer}`;\n\```\n\n就像把两个乐句连接成一个完整的乐段！',
      },
      {
        type: "explain",
        title: "document.querySelector — 找到页面中的元素",
        content:
          '`document.querySelector()` 可以找到页面上的 HTML 元素，然后通过 `.textContent` 修改它的文字内容：\n\n\```js\nlet el = document.querySelector("h1");\nel.textContent = "新的标题";\n\```\n\n就像指挥家用手势指定"现在看这里"，`querySelector` 帮你指向页面中的元素。',
      },
      {
        type: "example",
        title: "看例子",
        content:
          '下面的代码用变量存储了作曲家信息，然后用 `querySelector` 把它们显示在页面上：\n\n\```js\nlet composer = "弗雷德里克·肖邦";\nlet piece = "降E大调夜曲 Op.9 No.2";\nlet description = `${composer}的代表作之一是《${piece}》。`;\n\ndocument.querySelector("#composer").textContent = composer;\ndocument.querySelector("#piece").textContent = piece;\ndocument.querySelector("#description").textContent = description;\n\```\n切换到 JS 标签页查看完整代码。运行后，JavaScript 会自动把信息填入页面。',
      },
      {
        type: "task",
        title: "动手试试 ✨",
        content:
          "切换到 JS 标签页，试着修改：\n\n1. 把 `composer` 和 `piece` 改成你喜欢的作曲家和曲目\n2. 修改 `description` 的模板字符串，写一句你自己的话\n3. 试试把 `let` 改成 `const`，效果一样吗？\n4. 试着新增一个变量 `year`，存创作年份",
      },
    ],
    starterCode: {
      html: '<h1>音乐信息卡</h1>\n\n<div class="card">\n  <p><strong>作曲家：</strong><span id="composer">---</span></p>\n  <p><strong>代表作：</strong><span id="piece">---</span></p>\n  <p id="description"></p>\n</div>',
      css: ".card {\n  background-color: #FFFAF2;\n  border: 2px solid #D4C5A9;\n  border-radius: 12px;\n  padding: 24px;\n  max-width: 400px;\n  margin: 0 auto;\n}\n\n.card p {\n  color: #6B5A4E;\n  margin: 8px 0;\n}\n\nh1 {\n  text-align: center;\n  color: #8B2E2E;\n}",
      js: '// 用变量存储音乐信息\nlet composer = "弗雷德里克·肖邦";\nlet piece = "降E大调夜曲 Op.9 No.2";\n\n// 用模板字符串拼接一句话\nlet description = `${composer}的代表作之一是《${piece}》。`;\n\n// 把变量的值显示到页面上\ndocument.querySelector("#composer").textContent = composer;\ndocument.querySelector("#piece").textContent = piece;\ndocument.querySelector("#description").textContent = description;',
    },
  },

  // ===== 4.3 js-types =====
    {
    id: "js-types",
    chapterId: "js-basics",
    order: 3,
    title: '数据类型与运算符 — 认识代码的"音色"',
    musicAnalogy:
      "不同乐器有不同音色：小提琴清亮、大提琴深沉、定音鼓有力。编程中也一样——**number** 是节奏数、**boolean** 是音符有无、**string** 是旋律走向。了解数据类型，就像认识乐团中的每一件乐器。",
    listenTo:
      '本杰明·布里顿《青少年管弦乐队指南》— 依次介绍乐队中每一件乐器的音色特点，从木管到铜管到弦乐到打击乐。认识数据类型就像认识乐队编制——每种类型有它独特的"音色"和用途。',
    sections: [
      {
        type: "explain",
        title: "四种基础数据类型",
        content:
          'JavaScript 有几种基础数据类型，就像乐团中的乐器分类：\n\n- **string（字符串）** — 文字，用引号包裹 `"巴赫"`\n- **number（数字）** — 数值，可运算 `1685`, `3.14`\n- **boolean（布尔值）** — 只有 `true` 或 `false`，像二分音符的"有/无"\n- **null / undefined** — "空"值，表示没有内容\n\n\```js\nlet composer = "巴赫";        // string\nlet birthYear = 1685;         // number\nlet isBaroque = true;         // boolean\nlet encore = null;            // null（故意为空）\n\```\n\n用 `typeof` 查看类型：\n\```js\nconsole.log(typeof "巴赫");   // "string"\nconsole.log(typeof 1685);     // "number"\nconsole.log(typeof true);     // "boolean"\n\```',
      },
      {
        type: "explain",
        title: "算术运算符 — 数字的计算",
        content:
          '数字可以做加减乘除，就像计算节拍：\n\n\```js\nlet a = 10;\nlet b = 3;\n\nconsole.log(a + b);  // 13  加法（也用于字符串拼接！）\nconsole.log(a - b);  // 7   减法\nconsole.log(a * b);  // 30  乘法\nconsole.log(a / b);  // 3.333... 除法\nconsole.log(a % b);  // 1   取余数（模运算）\nconsole.log(a ** 2); // 100 幂运算\n\```\n\n`%`（取余）特别实用——判断奇偶：`n % 2 === 0` 就是偶数。\n\n字符串的 `+` 是拼接：`"Bach" + " " + "1685"` → `"Bach 1685"`',
      },
      {
        type: "explain",
        title: "比较运算符 — 返回布尔值",
        content:
          "比较运算符像评委打分，返回 `true` 或 `false`：\n\n\```js\nconsole.log(5 > 3);   // true\nconsole.log(5 < 3);   // false\nconsole.log(5 === 5); // true（等于）\nconsole.log(5 !== 3); // true（不等于）\nconsole.log(5 >= 5);  // true\nconsole.log(5 <= 3);  // false\n\```\n\n比较结果常用于 `if` 条件判断中——这就是下一节课要学的！",
      },
      {
        type: "example",
        title: "看例子",
        content:
          '下面的代码练习了数据类型和运算符：\n\n\```js\nlet composer = "巴赫";\nlet birthYear = 1685;\nlet isBaroque = true;\n\n// 计算今年是多少周年\nlet currentYear = 2026;\nlet anniversary = currentYear - birthYear;\n\n// 判断是否是整百年\nlet isCentury = birthYear % 100 === 0;\n\nconsole.log(composer + " 诞生于 " + birthYear);\nconsole.log("距今 " + anniversary + " 年");\nconsole.log("是否整百年？" + isCentury);\n\```',
      },
      {
        type: "task",
        title: "动手试试 ✨",
        content:
          '切换到 JS 标签页，试试：\n\n1. 修改 `birthYear` 的值，看周年数自动变化\n2. 用 `typeof` 检查 `isBaroque` 的类型\n3. 试试用 `%` 判断 `birthYear` 是否能被 4 整除（音乐节拍经常是 4 拍）\n4. 挑战：计算"如果一个人出生于 birthYear + 20 年，他今年多大"',
      },
    ],
    starterCode: {
      html: '<h1>数据类型实验室</h1>\n\n<div class="card">\n  <p><strong>作曲家：</strong><span id="name"></span></p>\n  <p><strong>出生年份：</strong><span id="year"></span></p>\n  <p><strong>距今周年：</strong><span id="anniversary"></span></p>\n  <p><strong>巴洛克时期？</strong><span id="baroque"></span></p>\n  <p><strong>能被4整除？</strong><span id="divBy4"></span></p>\n</div>',
      css: "h1 {\n  text-align: center;\n  color: #8B2E2E;\n}\n\n.card {\n  background: #FFFAF2;\n  border: 2px solid #D4C5A9;\n  border-radius: 12px;\n  padding: 28px;\n  max-width: 440px;\n  margin: 16px auto;\n}\n\n.card p {\n  color: #6B5A4E;\n  margin: 10px 0;\n  font-size: 16px;\n  border-bottom: 1px solid #EDE5D5;\n  padding-bottom: 8px;\n}\n\n.card p:last-child {\n  border-bottom: none;\n}\n\n.card strong {\n  color: #8B2E2E;\n}",
      js: '// 数据定义\nlet composer = "巴赫";\nlet birthYear = 1685;\nlet currentYear = 2026;\nlet isBaroque = birthYear >= 1600 && birthYear <= 1750;\n\n// 计算周年\nlet anniversary = currentYear - birthYear;\n\n// 判断是否能被 4 整除\nlet divBy4 = birthYear % 4 === 0;\n\n// 显示到页面\ndocument.querySelector("#name").textContent = composer;\ndocument.querySelector("#year").textContent = birthYear;\ndocument.querySelector("#anniversary").textContent = anniversary + " 年";\ndocument.querySelector("#baroque").textContent = isBaroque ? "是" : "否";\ndocument.querySelector("#divBy4").textContent = divBy4 ? "是 (" + birthYear + " ÷ 4 = " + (birthYear/4) + ")" : "否";',
    },
  },

  // ===== 4.4 js-functions =====
    {
    id: "js-functions",
    chapterId: "js-basics",
    order: 4,
    title: "函数 — 封装你的音乐逻辑",
    musicAnalogy:
      '函数就像**乐曲的主题动机**——一段可重复使用的旋律片段。贝多芬第五交响曲的"当当当当"动机在全曲中反复出现、变形、发展。函数也是：写好一次，到处调用。',
    listenTo:
      '贝多芬《第五交响曲》第一乐章 — "命运"四音动机贯穿始终，同样的核心在弦乐、管乐、全奏中不断重现，就像函数被不同参数调用。',
    sections: [
      {
        type: "explain",
        title: "什么是函数？",
        content:
          '函数是一段**有名字的代码块**，把一组操作封装起来，需要时调用：\n\n\```js\nfunction sayHello() {\n  alert("你好！");\n}\n\nsayHello();  // 调用函数\n\```\n\n函数的好处：\n- **避免重复**：同样的代码不用写很多遍\n- **给代码起名字**：一看函数名就知道它做什么\n- **可以传参数**：像给动机配不同的乐器',
      },
      {
        type: "explain",
        title: "带参数的函数",
        content:
          '函数可以接收**参数**（输入），然后根据参数做不同的事：\n\n\```js\nfunction introduce(composer, piece) {\n  return `${composer}创作了《${piece}》。`;\n}\n\nlet result1 = introduce("肖邦", "夜曲");\nlet result2 = introduce("莫扎特", "魔笛");\n\```\n\n- `composer` 和 `piece` 是**参数**——像函数接收的输入\n- `return` 把结果**返回**——像函数给出的输出\n- 同样一个 `introduce` 函数，传入不同的作曲家，得到不同的句子',
      },
      {
        type: "example",
        title: "看例子",
        content:
          '下面的代码定义了一个 `createCard` 函数，它接收作曲家信息并返回 HTML 字符串：\n\n\```js\nfunction createCard(composer, period, piece) {\n  return `\n    <div class="card">\n      <h2>${composer}</h2>\n      <p>时期：${period}</p>\n      <p>代表作：《${piece}》</p>\n    </div>\n  `;\n}\n\nlet html = createCard("巴赫", "巴洛克", "赋格的艺术");\nlet html2 = createCard("德彪西", "印象派", "月光");\n\```\n切换到 JS 标签页看看函数怎么生成页面的三张卡片。',
      },
      {
        type: "task",
        title: "动手试试 ✨",
        content:
          "切换到 JS 标签页，试试：\n\n1. 修改已存在的 `createCard()` 调用，把作曲家换成你喜欢的\n2. 新增一行调用，用 `createCard()` 创建第四张卡片，然后用 `+=` 追加到 `html` 中\n3. 试着在函数里增加一个参数，比如 `country`（国籍）",
      },
    ],
    starterCode: {
      html: '<h1>作曲家画廊</h1>\n<div id="gallery"></div>',
      css: "h1 {\n  text-align: center;\n  color: #8B2E2E;\n}\n\n#gallery {\n  display: flex;\n  gap: 16px;\n  flex-wrap: wrap;\n  justify-content: center;\n}\n\n.card {\n  background-color: #FFFAF2;\n  border: 2px solid #D4C5A9;\n  border-radius: 12px;\n  padding: 20px;\n  min-width: 180px;\n  text-align: center;\n}\n\n.card h2 {\n  color: #8B2E2E;\n  margin: 0 0 8px 0;\n}\n\n.card p {\n  color: #6B5A4E;\n  margin: 4px 0;\n  font-size: 14px;\n}",
      js: '// 定义一个函数，创建作曲家卡片\nfunction createCard(composer, period, piece) {\n  return `\n    <div class="card">\n      <h2>${composer}</h2>\n      <p>时期：${period}</p>\n      <p>代表作：《${piece}》</p>\n    </div>\n  `;\n}\n\n// 调用函数生成三张卡片\nlet html = "";\nhtml += createCard("巴赫", "巴洛克", "赋格的艺术");\nhtml += createCard("莫扎特", "古典主义", "魔笛");\nhtml += createCard("德彪西", "印象派", "月光");\n\n// 显示到页面上\ndocument.querySelector("#gallery").innerHTML = html;',
    },
  },

  // ===== 4.5 js-events =====
    {
    id: "js-events",
    chapterId: "js-basics",
    order: 5,
    title: "点击事件 — 让按钮响应用户",
    musicAnalogy:
      "事件就像**乐器对演奏者的响应**——按下琴键（点击），琴槌敲击琴弦发出声音（执行代码）。没有演奏者的动作，乐器不会自己发出声音；没有事件，代码不会自动执行。",
    listenTo:
      '普罗科菲耶夫《彼得与狼》— 每个角色有特定主题，在故事的不同时间点"出场"（触发），就像页面中不同元素在不同事件触发时才响应。',
    sections: [
      {
        type: "explain",
        title: "什么是事件？",
        content:
          '在 JavaScript 中，**事件**是发生在 HTML 元素上的"事情"：\n\n- `click` — 用户点击了一个元素\n- `input` — 用户在输入框中输入了文字\n- `mouseenter` — 鼠标移入了一个元素\n\n用 `addEventListener` 可以"监听"这些事件：\n\n\```js\nlet btn = document.querySelector("#myBtn");\n\nbtn.addEventListener("click", function() {\n  alert("你点击了按钮！");\n});\n\```\n\n就像给按钮装了一只耳朵，它时刻听着有没有"点击"这件事发生。',
      },
      {
        type: "explain",
        title: "事件处理函数",
        content:
          '`addEventListener` 接收两个参数：\n1. 事件类型（`"click"`）\n2. 事件处理函数——事件发生时执行的代码\n\n\```js\nbtn.addEventListener("click", function() {\n  // 点击后执行的代码写在这里\n  document.querySelector("h1").textContent = "标题变了！";\n});\n\```\n\n事件处理函数就像一个"回响"——你按下琴键（触发事件），琴声响起（执行函数）。',
      },
      {
        type: "example",
        title: "看例子",
        content:
          '下面的代码有一个按钮和一个显示区域。每次点击按钮，计数器就会加 1：\n\n\```js\nlet count = 0;\nlet btn = document.querySelector("#countBtn");\nlet display = document.querySelector("#display");\n\nbtn.addEventListener("click", function() {\n  count = count + 1;\n  display.textContent = `你点击了 ${count} 次`;\n});\n\```\n切换到 JS 标签页和预览区，试试点击按钮！',
      },
      {
        type: "task",
        title: "动手试试 ✨",
        content:
          "切换到 JS 标签页，试试：\n\n1. 在预览区点击按钮，看计数器变化\n2. 修改 `display.textContent` 的文字，换一种表达方式\n3. 试着把 `count = count + 1` 改成 `count = count + 5`，每次加 5\n4. 挑战：在 HTML 面板中复制一个按钮（`#resetBtn`），在 JS 中给它加一个点击事件，点击后把 `count` 归零",
      },
    ],
    starterCode: {
      html: '<h1>节拍计数器</h1>\n<p>点击按钮，像打拍子一样计数！</p>\n\n<div class="counter-box">\n  <p id="display">你还没有点击</p>\n  <button id="countBtn">🎵 点我打拍子</button>\n</div>',
      css: "h1 {\n  text-align: center;\n  color: #8B2E2E;\n}\n\np {\n  text-align: center;\n  color: #6B5A4E;\n}\n\n.counter-box {\n  text-align: center;\n  background: #FFFAF2;\n  border: 2px solid #D4C5A9;\n  border-radius: 16px;\n  padding: 32px;\n  max-width: 360px;\n  margin: 24px auto;\n}\n\n#display {\n  font-size: 24px;\n  font-weight: 700;\n  color: #8B2E2E;\n  margin-bottom: 20px;\n}\n\n#countBtn {\n  padding: 12px 32px;\n  font-size: 18px;\n  background: #8B2E2E;\n  color: #fff;\n  border: none;\n  border-radius: 8px;\n  cursor: pointer;\n}\n\n#countBtn:hover {\n  background: #C94545;\n}",
      js: '// 初始化计数器\nlet count = 0;\n\n// 获取页面元素\nlet btn = document.querySelector("#countBtn");\nlet display = document.querySelector("#display");\n\n// 监听点击事件\nbtn.addEventListener("click", function() {\n  count = count + 1;\n  display.textContent = `你点击了 ${count} 次`;\n});',
    },
  },

  // ===== 4.6 js-events-more =====
    {
    id: "js-events-more",
    chapterId: "js-basics",
    order: 6,
    title: "更多事件 — 倾听用户的每一种动作",
    musicAnalogy:
      '乐器不只有"敲击"一个动作——钢琴有按键(click)、弦乐有揉弦(input)、管乐有换气(change)、定音鼓有滚奏(keydown)。`addEventListener` 可以监听用户的各种动作，就像指挥同时关注每个声部的进入。',
    listenTo:
      "拉威尔《波莱罗》— 同一旋律在不同乐器间传递（不同事件），小鼓从头到尾持续敲击（持续输入），长笛、单簧管、双簧管依次登场（依次触发），最终整个乐队一起爆发。",
    sections: [
      {
        type: "explain",
        title: "不只是 click — 认识更多事件类型",
        content:
          '`addEventListener` 的第一个参数是事件**类型**，除了 `"click"`，还有很多常用事件：\n\n- `"input"` — 输入框内容**每次变化**都触发\n- `"change"` — 输入框内容改变且**失去焦点**时触发\n- `"keydown"` — 键盘**按下**任意键\n- `"mouseenter"` — 鼠标**进入**元素\n- `"mouseleave"` — 鼠标**离开**元素\n- `"submit"` — 表单**提交**时触发\n\n\```js\ninputEl.addEventListener("input", function() {\n  // 用户每输入一个字就执行\n});\n\```',
      },
      {
        type: "explain",
        title: 'event 对象 — 事件携带的"信息卡"',
        content:
          '每个事件触发时，浏览器都会创建一个 **event 对象**，包含了事件的详细信息。在回调函数中通过参数接收：\n\n\```js\nbtn.addEventListener("click", function(event) {\n  console.log(event.target);  // 被点击的元素\n  console.log(event.type);    // "click"\n});\n\ninputEl.addEventListener("input", function(event) {\n  console.log(event.target.value); // 输入框当前内容\n});\n\ndocument.addEventListener("keydown", function(event) {\n  console.log(event.key); // 按下的键名，如 "Enter"、"a"\n});\n\```\n\n`event.target` 是触发事件的元素——就像知道是哪个乐器在发声。',
      },
      {
        type: "explain",
        title: "preventDefault — 阻止默认行为",
        content:
          '有些元素有自己的默认行为：\n\n- 表单的 `<button type="submit">` 点击后会**刷新页面**\n- `<a>` 链接点击后会**跳转**\n\n用 `event.preventDefault()` 阻止这些默认行为：\n\n\```js\nform.addEventListener("submit", function(event) {\n  event.preventDefault();  // 阻止页面刷新！\n  console.log("表单已提交（但页面不刷新）");\n});\n\```\n\n这在前端开发中非常常用——表单提交通常用 JS 处理，不需要刷新页面。',
      },
      {
        type: "example",
        title: "看例子",
        content:
          '下面的代码综合使用多种事件：\n\n\```js\n// 实时显示输入内容\ninputEl.addEventListener("input", function(event) {\n  displayEl.textContent = event.target.value;\n});\n\n// 鼠标悬停高亮\ncard.addEventListener("mouseenter", function() {\n  card.style.borderColor = "#C9A96E";\n});\ncard.addEventListener("mouseleave", function() {\n  card.style.borderColor = "#D4C5A9";\n});\n\n// 回车键提交\ndocument.addEventListener("keydown", function(event) {\n  if (event.key === "Enter") {\n    console.log("你按了回车！");\n  }\n});\n\```',
      },
      {
        type: "task",
        title: "动手试试 ✨",
        content:
          "切换到 JS 标签页，试试：\n\n1. 在输入框中打字，观察下方实时显示\n2. 把鼠标移到卡片上再移开，看边框颜色变化\n3. 按回车键，看提示信息\n4. 挑战：给输入框增加 `keydown` 事件，当按 Escape 键时清空输入框内容",
      },
    ],
    starterCode: {
      html: '<h1>事件实验室</h1>\n\n<div class="card">\n  <h2>实时输入显示</h2>\n  <input type="text" id="nameInput" placeholder="输入你的名字...">\n  <p class="live-display">你输入的是：<span id="liveText">---</span></p>\n</div>\n\n<div class="card" id="hoverCard">\n  <h2>鼠标悬停卡片</h2>\n  <p>把鼠标移到这里试试</p>\n</div>\n\n<p id="keyHint">按任意键或回车试试 (⌨️)</p>',
      css: "h1 {\n  text-align: center;\n  color: #8B2E2E;\n}\n\n.card {\n  background: #FFFAF2;\n  border: 2px solid #D4C5A9;\n  border-radius: 10px;\n  padding: 20px;\n  margin-bottom: 16px;\n  max-width: 440px;\n  margin-left: auto;\n  margin-right: auto;\n  transition: border-color 0.3s;\n}\n\n.card h2 {\n  color: #8B2E2E;\n  font-size: 16px;\n  margin: 0 0 8px 0;\n}\n\n.card p {\n  color: #6B5A4E;\n  margin: 0;\n}\n\n#nameInput {\n  width: 100%;\n  padding: 10px 14px;\n  border: 1px solid #D4C5A9;\n  border-radius: 6px;\n  font-size: 15px;\n  font-family: inherit;\n  margin-bottom: 12px;\n}\n\n.live-display {\n  font-size: 18px;\n  font-weight: 600;\n  color: #8B2E2E !important;\n}\n\n#keyHint {\n  text-align: center;\n  color: #C9A96E;\n  font-size: 13px;\n  margin-top: 12px;\n}",
      js: '// 实时输入事件\nlet inputEl = document.querySelector("#nameInput");\nlet liveText = document.querySelector("#liveText");\n\ninputEl.addEventListener("input", function(event) {\n  let val = event.target.value;\n  liveText.textContent = val || "---";\n});\n\n// 鼠标悬停事件\nlet hoverCard = document.querySelector("#hoverCard");\n\nhoverCard.addEventListener("mouseenter", function() {\n  hoverCard.style.borderColor = "#C9A96E";\n  hoverCard.style.background = "#FFF8EC";\n});\n\nhoverCard.addEventListener("mouseleave", function() {\n  hoverCard.style.borderColor = "#D4C5A9";\n  hoverCard.style.background = "#FFFAF2";\n});\n\n// 键盘事件\nlet keyHint = document.querySelector("#keyHint");\n\ndocument.addEventListener("keydown", function(event) {\n  if (event.key === "Enter") {\n    keyHint.textContent = "🎹 你按了回车键！";\n    keyHint.style.color = "#8B2E2E";\n  } else {\n    keyHint.textContent = `你按下了: "${event.key}"`;\n    keyHint.style.color = "#C9A96E";\n  }\n});',
    },
  },

  // ===== 4.7 js-conditions =====
    {
    id: "js-conditions",
    chapterId: "js-basics",
    order: 7,
    title: "条件判断 — 代码的分岔路口",
    musicAnalogy:
      '`if/else` 就像乐谱中的**反复记号**——满足条件就跳转，不满足就继续。也像**评委打分**：如果音准正确就给通过，否则请再练一遍。条件判断让代码有了"决策能力"。',
    listenTo:
      "巴赫《赋格的艺术》— 主题在每次出现时根据对位规则做出不同选择（进入、等待、转调），就像 if/else 根据条件执行不同的代码分支。",
    sections: [
      {
        type: "explain",
        title: 'if 语句 — 代码的"如果"',
        content:
          '`if` 后面跟一个**条件**（真或假），条件为真时执行花括号里的代码：\n\n\```js\nlet score = 85;\n\nif (score >= 80) {\n  console.log("优秀！");\n}\n\```\n\n比较运算符：\n- `===` — 等于（推荐）\n- `!==` — 不等于\n- `>` / `<` — 大于/小于\n- `>=` / `<=` — 大于等于/小于等于\n\n就像评委打分：分数 ≥ 80 才算优秀。',
      },
      {
        type: "explain",
        title: "else 与 else if — 多分岔路",
        content:
          '`else` 处理"否则"的情况，`else if` 添加更多分岔：\n\n\```js\nlet score = 75;\n\nif (score >= 90) {\n  console.log("金奖！🥇");\n} else if (score >= 80) {\n  console.log("银奖！🥈");\n} else if (score >= 60) {\n  console.log("铜奖🥉");\n} else {\n  console.log("继续努力！");\n}\n\```\n\n逻辑运算符：\n- `&&` — 并且（两个条件都成立）\n- `||` — 或者（任意一个成立）\n\n\```js\nif (score >= 80 && score < 90) {\n  console.log("优秀但未达金奖");\n}\n\```',
      },
      {
        type: "example",
        title: "看例子",
        content:
          '下面的代码是一个作曲家答题器。输入答案后点击提交，JS 判断你的答案是否正确：\n\n\```js\nlet answer = document.querySelector("#answer").value;\n\nif (answer === "肖邦") {\n  display.textContent = "✓ 回答正确！";\n} else {\n  display.textContent = "✗ 再想想？提示：他是波兰人";\n}\n\```\n切换到 JS 标签页，看 submit 按钮的点击事件中完整的 if/else 逻辑。',
      },
      {
        type: "task",
        title: "动手试试 ✨",
        content:
          '切换到 JS 标签页，试试：\n\n1. 在预览区输入"肖邦"点击提交，看正确反馈\n2. 输入别的名字点击提交，看 else 分支的反馈\n3. 在 if 中增加一个条件：用 `&&` 同时判断两个输入框\n4. 挑战：增加一个 `else if` 分支，判断是否为空（`=== ""`）',
      },
    ],
    starterCode: {
      html: '<h1>🎹 作曲家竞猜</h1>\n\n<div class="quiz-box">\n  <p class="quiz-question">哪一位作曲家被称为"钢琴诗人"？</p>\n  <input type="text" id="answer" placeholder="请输入作曲家名字">\n  <button id="submitBtn">提交答案</button>\n  <p id="result"></p>\n</div>',
      css: "h1 {\n  text-align: center;\n  color: #8B2E2E;\n}\n\n.quiz-box {\n  background: #FFFAF2;\n  border: 2px solid #D4C5A9;\n  border-radius: 12px;\n  padding: 32px;\n  max-width: 400px;\n  margin: 20px auto;\n  text-align: center;\n}\n\n.quiz-question {\n  font-size: 18px;\n  color: #3D2B1F;\n  margin-bottom: 16px;\n}\n\n#answer {\n  width: 100%;\n  padding: 10px 14px;\n  border: 1px solid #D4C5A9;\n  border-radius: 6px;\n  font-size: 16px;\n  font-family: inherit;\n  text-align: center;\n}\n\n#submitBtn {\n  margin-top: 12px;\n  padding: 10px 32px;\n  background: #8B2E2E;\n  color: #fff;\n  border: none;\n  border-radius: 8px;\n  font-size: 16px;\n  cursor: pointer;\n}\n\n#submitBtn:hover {\n  background: #C94545;\n}\n\n#result {\n  margin-top: 16px;\n  font-size: 18px;\n  font-weight: 600;\n  min-height: 28px;\n}",
      js: 'let btn = document.querySelector("#submitBtn");\nlet result = document.querySelector("#result");\n\nbtn.addEventListener("click", function() {\n  let answer = document.querySelector("#answer").value;\n\n  if (answer === "肖邦") {\n    result.style.color = "#5B8C5A";\n    result.textContent = "✓ 回答正确！肖邦确实是钢琴诗人。";\n  } else if (answer === "") {\n    result.style.color = "#C9A96E";\n    result.textContent = "请先输入一个名字哦 ~";\n  } else {\n    result.style.color = "#8B2E2E";\n    result.textContent = "✗ 再想想？提示：他是波兰人，写了很多夜曲。";\n  }\n});',
    },
  },

  // ===== 4.8 js-arrays =====
    {
    id: "js-arrays",
    chapterId: "js-basics",
    order: 8,
    title: "数组 — 存储你的曲目列表",
    musicAnalogy:
      '数组就像一张**歌单/曲目列表**——把多个相关的值按顺序组织在一起。`["巴赫", "莫扎特", "贝多芬"]` 就像写在纸上的三首曲目，用 `[0]` 可以取第一首，用 `.push()` 可以在末尾添加新曲目。',
    listenTo:
      '柴可夫斯基《胡桃夹子》组曲 — 舞剧中包含"进行曲""糖果仙子之舞""花之圆舞曲"等多段舞曲，就像数组中的不同条目，每段有独立的索引和性格。',
    sections: [
      {
        type: "explain",
        title: "创建和访问数组",
        content:
          '数组用 `[]` 创建，每个值用逗号分隔：\n\n\```js\nlet composers = ["巴赫", "莫扎特", "贝多芬", "肖邦"];\n\```\n\n- `composers[0]` — 第 1 项（"巴赫"），索引从 0 开始\n- `composers[2]` — 第 3 项（"贝多芬"）\n- `composers.length` — 数组长度（4）\n\n就像曲目单上第一首是 0 号，不是 1 号——这是编程的习惯。',
      },
      {
        type: "explain",
        title: "数组常用方法",
        content:
          '数组有一套强大的操作方法：\n\n- `.push("德彪西")` — 在末尾添加一项\n- `.pop()` — 移除末尾一项\n- `.join("、")` — 用指定分隔符拼接为字符串\n\n\```js\nlet composers = ["巴赫", "莫扎特"];\ncomposers.push("肖邦");  // 末尾追加\n// composers 现在是 ["巴赫", "莫扎特", "肖邦"]\n\nlet text = composers.join(" | ");\n// text 是 "巴赫 | 莫扎特 | 肖邦"\n\```\n\n`.join()` 特别实用——把一个数组变成页面上的文字！',
      },
      {
        type: "example",
        title: "看例子",
        content:
          '下面的代码维护了一个作曲家数组，用 `.push()` 添加新名字，用 `.join()` 显示到页面上：\n\n\```js\nlet composers = ["巴赫", "莫扎特", "贝多芬"];\n\n// 显示列表\nlet text = composers.join(" · ");\ndisplay.textContent = text;\n\n// 添加新作曲家\ncomposers.push("肖邦");\ntext = composers.join(" · ");\ndisplay.textContent = text;\n\```\n切换到 JS 标签页，输入一个名字点击添加，看列表实时更新。',
      },
      {
        type: "task",
        title: "动手试试 ✨",
        content:
          '切换到 JS 标签页，试试：\n\n1. 在预览区输入框输入"德彪西"点添加，看列表变化\n2. 修改 `.join()` 的分隔符，从 `" · "` 改成 `" | "` 或 `", "`\n3. 修改数组初始值，换成你自己喜欢的作曲家\n4. 挑战：添加一个"删除最后一位"按钮（用 `.pop()` 方法）',
      },
    ],
    starterCode: {
      html: '<h1>作曲家列表</h1>\n\n<div class="list-box">\n  <p id="display">列表加载中...</p>\n  <div class="add-row">\n    <input type="text" id="nameInput" placeholder="输入作曲家名字">\n    <button id="addBtn">➕ 添加</button>\n  </div>\n</div>',
      css: "h1 {\n  text-align: center;\n  color: #8B2E2E;\n}\n\n.list-box {\n  background: #FFFAF2;\n  border: 2px solid #D4C5A9;\n  border-radius: 12px;\n  padding: 24px;\n  max-width: 440px;\n  margin: 20px auto;\n}\n\n#display {\n  font-size: 18px;\n  color: #3D2B1F;\n  text-align: center;\n  min-height: 30px;\n  margin-bottom: 16px;\n  padding: 12px;\n  background: #fff;\n  border-radius: 6px;\n  border: 1px solid #E8DDCC;\n}\n\n.add-row {\n  display: flex;\n  gap: 8px;\n}\n\n#nameInput {\n  flex: 1;\n  padding: 10px 14px;\n  border: 1px solid #D4C5A9;\n  border-radius: 6px;\n  font-size: 15px;\n  font-family: inherit;\n}\n\n#addBtn {\n  padding: 10px 20px;\n  background: #8B2E2E;\n  color: #fff;\n  border: none;\n  border-radius: 6px;\n  font-size: 14px;\n  cursor: pointer;\n  white-space: nowrap;\n}\n\n#addBtn:hover {\n  background: #C94545;\n}",
      js: '// 初始数组\nlet composers = ["巴赫", "莫扎特", "贝多芬"];\n\nlet display = document.querySelector("#display");\nlet input = document.querySelector("#nameInput");\nlet addBtn = document.querySelector("#addBtn");\n\n// 显示数组内容\nfunction showList() {\n  let text = composers.join(" · ");\n  display.textContent = text;\n}\n\nshowList();\n\n// 点击添加\naddBtn.addEventListener("click", function() {\n  let name = input.value;\n  if (name !== "") {\n    composers.push(name);\n    showList();\n    input.value = "";\n  }\n});',
    },
  },

  // ===== 4.9 js-loops =====
    {
    id: "js-loops",
    chapterId: "js-basics",
    order: 9,
    title: "循环 — 让代码反复执行的节拍器",
    musicAnalogy:
      "循环就像**固定音型（ostinato）**——一段模式反复执行，每次略有不同。也像**节拍器**，一拍一拍反复，直到乐曲结束。用 `for` 或 `forEach` 遍历数组中的每一项，对每一首都执行相同的操作。",
    listenTo:
      "拉威尔《波莱罗》— 同一个旋律反复 18 遍，每次配器都在变化（加一件新乐器），就像循环每次迭代对当前元素做不同处理。",
    sections: [
      {
        type: "explain",
        title: "for 循环",
        content:
          "`for` 循环由三部分组成：初始化、条件、步进：\n\n\```js\nfor (let i = 0; i < composers.length; i++) {\n  console.log(composers[i]);\n}\n\```\n\n- `let i = 0` — 从 0 开始\n- `i < composers.length` — 只要 i 小于数组长度就继续\n- `i++` — 每轮 i 加 1\n\n`i` 是计数器，第一轮是 0，第二轮是 1... 依次取遍数组中的每一项，就像**节拍器从第 1 拍数到最后 1 拍**。",
      },
      {
        type: "explain",
        title: "forEach — 更优雅的循环",
        content:
          '`forEach` 是专门为数组设计的循环方法：\n\n\```js\ncomposers.forEach(function(name, index) {\n  console.log(`${index + 1}. ${name}`);\n});\n\```\n\n- `name` — 当前项的值\n- `index` — 当前项的索引（0 开始）\n\n\```js\n// 用 forEach 批量生成 HTML\nlet html = "";\ncomposers.forEach(function(composer) {\n  html += `<li>${composer}</li>`;\n});\ndocument.querySelector("ul").innerHTML = html;\n\```\n\n`forEach` 比 `for` 更简洁——你不用手动写 `i` 和 `i++`。',
      },
      {
        type: "example",
        title: "看例子",
        content:
          '下面的代码用 `forEach` 遍历作曲家数组，把每一项渲染成 HTML 卡片：\n\n\```js\nlet composers = ["巴赫", "莫扎特", "贝多芬", "肖邦"];\nlet html = "";\n\ncomposers.forEach(function(name, index) {\n  html += `\n    <div class="card">\n      <span class="num">${index + 1}</span>\n      ${name}\n    </div>\n  `;\n});\n\ndocument.querySelector("#list").innerHTML = html;\n\```\n切换到 JS 标签页查看完整代码。4 张卡片由一个循环生成——如果加到 10 个也不用手动复制。',
      },
      {
        type: "task",
        title: "动手试试 ✨",
        content:
          "切换到 JS 标签页，试试：\n\n1. 在数组中再添加一个作曲家，看循环自动生成新卡片\n2. 把 `forEach` 改成 `for` 循环，实现同样的效果\n3. 修改卡片模板，增加曲目信息（把数组改成二维数组）\n4. 挑战：用 `.filter()` 只显示名字长度 > 2 的项",
      },
    ],
    starterCode: {
      html: '<h1>作曲家名录</h1>\n<div id="list"></div>',
      css: "h1 {\n  text-align: center;\n  color: #8B2E2E;\n  margin-bottom: 20px;\n}\n\n#list {\n  display: flex;\n  flex-direction: column;\n  gap: 8px;\n}\n\n.card {\n  background: #FFFAF2;\n  border: 1px solid #D4C5A9;\n  border-radius: 8px;\n  padding: 14px 20px;\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  color: #3D2B1F;\n  font-size: 16px;\n}\n\n.num {\n  background: #8B2E2E;\n  color: #fff;\n  width: 28px;\n  height: 28px;\n  border-radius: 50%;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-size: 13px;\n  font-weight: 700;\n  flex-shrink: 0;\n}",
      js: '// 作曲家数组\nlet composers = ["巴赫", "莫扎特", "贝多芬", "肖邦", "德彪西"];\n\n// 用 forEach 循环生成 HTML\nlet html = "";\n\ncomposers.forEach(function(name, index) {\n  html += `\n    <div class="card">\n      <span class="num">${index + 1}</span>\n      ${name}\n    </div>\n  `;\n});\n\n// 显示到页面上\ndocument.querySelector("#list").innerHTML = html;',
    },
  },

  // ===== 4.10 js-array-methods =====
    {
    id: "js-array-methods",
    chapterId: "js-basics",
    order: 10,
    title: "数组方法进阶 — 像筛选乐谱一样处理数据",
    musicAnalogy:
      "`.map()` 就像**移调**——把整首曲子每个音都升高一度，返回一个新的版本；`.filter()` 就像从总谱中**挑出所有弦乐声部**——只保留符合条件的部分。两者都不破坏原谱（原数组），而是生成一份新的。",
    listenTo:
      "巴赫《勃兰登堡协奏曲》No.3 — 各声部轮流演奏同一主题（map），然后只留下弦乐组对话（filter），现代 Web 开发中用 map/filter 处理数据就像听巴赫一样行云流水。",
    sections: [
      {
        type: "explain",
        title: '.map() — 把每个元素"转换"成新值',
        content:
          '`.map()` 遍历数组中的每一项，执行一个函数，**返回一个新数组**：\n\n\```js\nlet names = ["bach", "mozart", "beethoven"];\n\nlet upper = names.map(function(name) {\n  return name.toUpperCase();\n});\n// upper 是 ["BACH", "MOZART", "BEETHOVEN"]\n// names 没变！\n\```\n\n就像把 C 大调移调到 D 大调——原曲还在，只是多了一个新版本。',
      },
      {
        type: "explain",
        title: ".filter() — 筛选符合条件的元素",
        content:
          "`.filter()` 遍历数组，**只保留**让条件函数返回 `true` 的项：\n\n\```js\nlet years = [1685, 1756, 1770, 1810, 1862];\n\nlet after1800 = years.filter(function(year) {\n  return year > 1800;\n});\n// after1800 是 [1810, 1862]\n\```\n\n就像在管弦乐团中只挑出木管声部——其他声部还在，但你只需要木管。",
      },
      {
        type: "explain",
        title: "链式调用 — map 和 filter 组合",
        content:
          '`.map()` 和 `.filter()` 都返回数组，所以可以**链式调用**：\n\n\```js\nlet composers = [\n  { name: "巴赫", year: 1720 },\n  { name: "莫扎特", year: 1785 },\n  { name: "贝多芬", year: 1805 },\n  { name: "肖邦", year: 1835 }\n];\n\n// 先筛选 1800 年后的，再只取名字\nlet names = composers\n  .filter(function(c) { return c.year > 1800; })\n  .map(function(c) { return c.name; });\n// names 是 ["贝多芬", "肖邦"]\n\```\n\n就像先筛选出 19 世纪的作品，再把它们的标题提取出来——流水线操作！',
      },
      {
        type: "example",
        title: "看例子",
        content:
          '下面的代码用 `.filter()` 筛选出含有"A"的作曲家名字，再用 `.map()` 转为大写：\n\n\```js\nlet composers = ["Bach", "Mozart", "Beethoven", "Chopin", "Debussy", "Vivaldi"];\n\n// 筛选名字里含 "a"（不区分大小写）的\nlet filtered = composers.filter(function(name) {\n  return name.toLowerCase().includes("a");\n});\n\n// 转为大写\nlet result = filtered.map(function(name) {\n  return name.toUpperCase();\n});\n\ndocument.querySelector("#output").innerHTML =\n  result.join(" | ");\n\```',
      },
      {
        type: "task",
        title: "动手试试 ✨",
        content:
          '切换到 JS 标签页，试试：\n\n1. 修改筛选条件——只显示名字长度 ≥ 6 的作曲家\n2. 用 `.map()` 给每个名字加上"作曲家："前缀\n3. 用 `链式调用` 一步完成筛选+转换（不用中间变量 filtered）\n4. 挑战：在输入框输入字母，只显示名字包含该字母的作曲家（实时筛选）',
      },
    ],
    starterCode: {
      html: '<h1>数组方法实验室</h1>\n\n<div class="panel">\n  <div class="section">\n    <h2>原始列表</h2>\n    <p id="original"></p>\n  </div>\n  <div class="section result">\n    <h2>处理结果</h2>\n    <p id="output"></p>\n  </div>\n</div>\n\n<div class="controls">\n  <input type="text" id="filterInput" placeholder="输入字母筛选...">\n  <button id="resetBtn">重置</button>\n</div>',
      css: "h1 {\n  text-align: center;\n  color: #8B2E2E;\n}\n\n.panel {\n  display: flex;\n  gap: 16px;\n  margin-bottom: 20px;\n}\n\n.section {\n  flex: 1;\n  background: #FFFAF2;\n  border: 1px solid #D4C5A9;\n  border-radius: 8px;\n  padding: 16px;\n}\n\n.section.result {\n  background: #FFF8F0;\n  border-color: #C9A96E;\n}\n\n.section h2 {\n  color: #8B2E2E;\n  font-size: 14px;\n  margin: 0 0 8px 0;\n}\n\n.section p {\n  color: #3D2B1F;\n  font-size: 15px;\n  margin: 0;\n  min-height: 24px;\n}\n\n.controls {\n  display: flex;\n  gap: 8px;\n  justify-content: center;\n}\n\n#filterInput {\n  padding: 10px 14px;\n  border: 1px solid #D4C5A9;\n  border-radius: 6px;\n  font-size: 14px;\n  font-family: inherit;\n  width: 200px;\n}\n\n#resetBtn {\n  padding: 10px 20px;\n  background: #8B2E2E;\n  color: #fff;\n  border: none;\n  border-radius: 6px;\n  font-size: 14px;\n  cursor: pointer;\n}\n\n#resetBtn:hover {\n  background: #C94545;\n}",
      js: 'let composers = ["Bach", "Mozart", "Beethoven", "Chopin", "Debussy", "Vivaldi"];\n\n// 显示原始列表\nlet originalEl = document.querySelector("#original");\nlet outputEl = document.querySelector("#output");\n\noriginalEl.textContent = composers.join(" · ");\n\n// 筛选+转换函数\nfunction updateList(letter) {\n  let result = composers\n    .filter(function(name) {\n      return name.toLowerCase().includes(letter.toLowerCase());\n    })\n    .map(function(name) {\n      return name.toUpperCase();\n    });\n  outputEl.textContent = result.length > 0 ? result.join(" | ") : "（无匹配）";\n}\n\n// 初始显示全部\nupdateList("");\n\n// 输入筛选\ndocument.querySelector("#filterInput").addEventListener("input", function() {\n  updateList(this.value);\n});\n\n// 重置\ndocument.querySelector("#resetBtn").addEventListener("click", function() {\n  document.querySelector("#filterInput").value = "";\n  updateList("");\n});',
    },
  },

  // ===== 4.11 js-querySelectorAll =====
    {
    id: "js-querySelectorAll",
    chapterId: "js-basics",
    order: 11,
    title: "批量 DOM 操作 — 指挥整个声部",
    musicAnalogy:
      "`querySelector` 指一个元素就像指挥指向**一位独奏者**，而 `querySelectorAll` 就像指挥同时对**整个弦乐声部**做统一手势——用一条指令同时操作一群元素。",
    listenTo:
      "斯特拉文斯基《春之祭》— 弦乐组全员同时奏响的强力和弦，一声令下全声部同步发力，就像 `querySelectorAll` 批量修改所有匹配元素的样式。",
    sections: [
      {
        type: "explain",
        title: "选中一组元素",
        content:
          '`querySelectorAll` 返回所有匹配的元素列表（NodeList）：\n\n\```js\nlet cards = document.querySelectorAll(".card");\n\```\n\nNodeList 可以和数组一样用 `forEach` 遍历：\n\n\```js\ncards.forEach(function(card) {\n  card.style.border = "2px solid gold";\n});\n\```\n\n也支持索引：\n\```js\ncards[0].style.background = "#FFFAF2";  // 第一张\ncards[1].style.background = "#F0F8FF";  // 第二张\n\```',
      },
      {
        type: "explain",
        title: "classList — 批量切换样式类",
        content:
          '`classList` 比直接操作 `style` 更优雅，配合 CSS 类使用：\n\n- `.classList.add("active")` — 添加类\n- `.classList.remove("active")` — 移除类\n- `.classList.toggle("active")` — 切换（有则删，无则加）\n- `.classList.contains("active")` — 判断是否包含\n\n\```js\nlet cards = document.querySelectorAll(".card");\n\ncards.forEach(function(card) {\n  card.classList.add("highlighted");\n});\n\```\n\n然后 CSS 中定义 `.highlighted` 的样式即可——JS 负责逻辑，CSS 负责外观，各司其职。',
      },
      {
        type: "example",
        title: "看例子",
        content:
          '下面的代码有 5 张乐器卡片。三个按钮分别实现"全选高亮""取消高亮""切换 \'弦乐\' 类"：\n\n\```js\n// 高亮全部\nlet cards = document.querySelectorAll(".card");\ncards.forEach(function(card) {\n  card.classList.add("highlighted");\n});\n\n// 只看弦乐\ncards.forEach(function(card) {\n  card.classList.toggle("hidden", !card.classList.contains("strings"));\n});\n\```\n切换到 JS 标签页查看完整代码，预览区点击按钮试试批量效果。',
      },
      {
        type: "task",
        title: "动手试试 ✨",
        content:
          '切换到 JS 和预览区，试试：\n\n1. 点击"高亮全部"看效果\n2. 点击"只看弦乐"看过滤效果\n3. 修改 `#showAllBtn` 的逻辑，把 `card.classList.remove("hidden")` 改成移除高亮\n4. 挑战：新增一个按钮"高亮管乐"，只高亮 class 包含 `winds` 的卡片',
      },
    ],
    starterCode: {
      html: '<h1>乐团声部</h1>\n\n<div class="controls">\n  <button id="highlightBtn">高亮全部</button>\n  <button id="clearBtn">取消高亮</button>\n  <button id="filterBtn">只看弦乐</button>\n  <button id="showAllBtn">显示全部</button>\n</div>\n\n<div class="orchestra">\n  <div class="card strings">🎻 小提琴</div>\n  <div class="card strings">🎻 中提琴</div>\n  <div class="card strings">🎻 大提琴</div>\n  <div class="card winds">🎺 小号</div>\n  <div class="card winds">🎺 长笛</div>\n</div>',
      css: "h1 {\n  text-align: center;\n  color: #8B2E2E;\n  margin-bottom: 12px;\n}\n\n.controls {\n  display: flex;\n  gap: 8px;\n  flex-wrap: wrap;\n  justify-content: center;\n  margin-bottom: 16px;\n}\n\n.controls button {\n  padding: 8px 16px;\n  background: #FFFAF2;\n  border: 1px solid #D4C5A9;\n  border-radius: 6px;\n  font-size: 13px;\n  cursor: pointer;\n  color: #3D2B1F;\n  transition: all 0.2s;\n}\n\n.controls button:hover {\n  background: #8B2E2E;\n  color: #fff;\n  border-color: #8B2E2E;\n}\n\n.orchestra {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 10px;\n}\n\n.card {\n  background: #FFFAF2;\n  border: 2px solid #D4C5A9;\n  border-radius: 8px;\n  padding: 16px 20px;\n  font-size: 15px;\n  color: #3D2B1F;\n  transition: all 0.3s;\n  cursor: default;\n}\n\n.card.highlighted {\n  background: #FFF8F0;\n  border-color: #C9A96E;\n  box-shadow: 0 4px 12px rgba(201, 169, 110, 0.3);\n}\n\n.card.hidden {\n  opacity: 0.15;\n}",
      js: 'let highlightBtn = document.querySelector("#highlightBtn");\nlet clearBtn = document.querySelector("#clearBtn");\nlet filterBtn = document.querySelector("#filterBtn");\nlet showAllBtn = document.querySelector("#showAllBtn");\nlet cards = document.querySelectorAll(".card");\n\n// 高亮全部\nhighlightBtn.addEventListener("click", function() {\n  cards.forEach(function(card) {\n    card.classList.add("highlighted");\n  });\n});\n\n// 取消高亮\nclearBtn.addEventListener("click", function() {\n  cards.forEach(function(card) {\n    card.classList.remove("highlighted");\n  });\n});\n\n// 只看弦乐（隐藏非弦乐）\nfilterBtn.addEventListener("click", function() {\n  cards.forEach(function(card) {\n    if (!card.classList.contains("strings")) {\n      card.classList.add("hidden");\n    }\n  });\n});\n\n// 显示全部\nshowAllBtn.addEventListener("click", function() {\n  cards.forEach(function(card) {\n    card.classList.remove("hidden");\n  });\n});',
    },
  },

  // ===== 4.12 js-objects =====
    {
    id: "js-objects",
    chapterId: "js-basics",
    order: 12,
    title: "对象 — 结构化你的音乐数据",
    musicAnalogy:
      '对象就像**音乐家档案**——用键值对（key-value）组织信息：姓名、时期、代表作、国籍。不像数组用数字索引，对象用**有名字的键**来存取数据，就像档案上的标签："姓名____、时期____"。',
    listenTo:
      "拉威尔《波莱罗》— 配器总谱上标注了每一件乐器的详细信息（乐器名、调性、进入小节），就像对象中结构化的键值对数据。",
    sections: [
      {
        type: "explain",
        title: "创建和访问对象",
        content:
          '对象用 `{}` 创建，包含多组键值对：\n\n\```js\nlet composer = {\n  name: "肖邦",\n  period: "浪漫主义",\n  country: "波兰",\n  birthYear: 1810\n};\n\```\n\n访问属性有两种方式：\n\```js\ncomposer.name       // "肖邦"（点号）\ncomposer["period"]  // "浪漫主义"（方括号）\n\```\n\n修改或新增：\n\```js\ncomposer.famousPiece = "夜曲";  // 新增\ncomposer.birthYear = 1809;      // 修正（肖邦实际生于 1810）\n\```',
      },
      {
        type: "explain",
        title: "对象数组 — 真正的数据结构",
        content:
          '对象最强大的用法是和数组结合——**对象数组**：\n\n\```js\nlet composers = [\n  { name: "巴赫", period: "巴洛克", country: "德国" },\n  { name: "莫扎特", period: "古典主义", country: "奥地利" },\n  { name: "肖邦", period: "浪漫主义", country: "波兰" }\n];\n\n// 用 forEach 遍历\ncomposers.forEach(function(c) {\n  console.log(`${c.name} — ${c.period}`);\n});\n\```\n\n这才是实际开发中最常见的数据形式——数组里包着对象，每个对象代表一条记录。就像 Excel 表格：每一行是数组的一项，每一列是对象的属性！',
      },
      {
        type: "example",
        title: "看例子",
        content:
          '下面的代码用对象数组存储了作曲家信息，用 `forEach` 遍历并生成卡片：\n\n\```js\nlet composers = [\n  { name: "巴赫", period: "巴洛克", piece: "赋格的艺术" },\n  { name: "莫扎特", period: "古典主义", piece: "魔笛" },\n  { name: "肖邦", period: "浪漫主义", piece: "夜曲" }\n];\n\nlet html = "";\ncomposers.forEach(function(c) {\n  html += `\n    <div class="card">\n      <h2>${c.name}</h2>\n      <p>时期：${c.period}</p>\n      <p>代表作：《${c.piece}》</p>\n    </div>\n  `;\n});\n\```\n切换到 JS 标签页查看完整代码——对象数据的结构和用途一目了然。',
      },
      {
        type: "task",
        title: "动手试试 ✨",
        content:
          '切换到 JS 标签页，试试：\n\n1. 在对象数组中新增一个作曲家对象\n2. 给每个对象增加 `country` 属性，在卡片模板中显示\n3. 修改某个作曲家的 `period`，看页面自动更新\n4. 挑战：用 `if` 判断，只显示 `period === "浪漫主义"` 的作品家（配合 `.filter()` 或条件判断）',
      },
    ],
    starterCode: {
      html: '<h1>作曲家档案</h1>\n<div id="gallery"></div>',
      css: "h1 {\n  text-align: center;\n  color: #8B2E2E;\n  margin-bottom: 20px;\n}\n\n#gallery {\n  display: flex;\n  gap: 12px;\n  flex-wrap: wrap;\n  justify-content: center;\n}\n\n.card {\n  background: #FFFAF2;\n  border: 1px solid #D4C5A9;\n  border-radius: 10px;\n  padding: 20px;\n  text-align: center;\n  min-width: 160px;\n}\n\n.card h2 {\n  color: #8B2E2E;\n  margin: 0 0 8px 0;\n  font-size: 18px;\n}\n\n.card p {\n  color: #6B5A4E;\n  margin: 4px 0;\n  font-size: 13px;\n}",
      js: '// 对象数组：每个对象是一条记录\nlet composers = [\n  { name: "巴赫", period: "巴洛克", piece: "赋格的艺术" },\n  { name: "莫扎特", period: "古典主义", piece: "魔笛" },\n  { name: "贝多芬", period: "古典到浪漫", piece: "命运交响曲" },\n  { name: "肖邦", period: "浪漫主义", piece: "夜曲" }\n];\n\n// 遍历对象数组，生成卡片\nlet html = "";\ncomposers.forEach(function(c) {\n  html += `\n    <div class="card">\n      <h2>${c.name}</h2>\n      <p>时期：${c.period}</p>\n      <p>代表作：《${c.piece}》</p>\n    </div>\n  `;\n});\n\ndocument.querySelector("#gallery").innerHTML = html;',
    },
  },

  // ===== 4.13 js-dom-advanced =====
    {
    id: "js-dom-advanced",
    chapterId: "js-basics",
    order: 13,
    title: "DOM 操作进阶 — 动态创建与删除元素",
    musicAnalogy:
      "DOM 操作进阶就像**即兴演奏**——不是在谱子写好的框架内规规矩矩地弹，而是在演奏过程中根据灵感动态创造新的乐句（元素），或者删除某个声部。`createElement` 是创作新乐句，`remove()` 是撤掉一个声部。",
    listenTo:
      "爵士即兴 — 爵士乐手在和声进行中实时创造旋律，有时加一段 solo（createElement），有时一个声部退出（remove），结构在即兴中动态变化。",
    sections: [
      {
        type: "explain",
        title: "动态创建元素",
        content:
          '`document.createElement()` 可以凭空创建一个新元素：\n\n\```js\n// 创建元素\nlet card = document.createElement("div");\ncard.className = "card";         // 设类名\ncard.innerHTML = "<h2>新卡片</h2>";  // 设内容\n\n// 追加到页面\ndocument.querySelector("#list").appendChild(card);\n\```\n\n就像在曲谱的空白处临时加了一行乐句——全新的元素出现在页面上。',
      },
      {
        type: "explain",
        title: "删除与替换",
        content:
          '`.remove()` 直接删除元素：\n\n\```js\nlet card = document.querySelector("#card3");\ncard.remove();  // 没了！\n\```\n\n配合 `createElement` 实现增删：\n\```js\nfunction addCard(title) {\n  let card = document.createElement("div");\n  card.className = "card";\n  card.textContent = title;\n  document.querySelector("#list").appendChild(card);\n}\n\nfunction removeLast() {\n  let cards = document.querySelectorAll(".card");\n  let last = cards[cards.length - 1];\n  if (last) last.remove();\n}\n\```\n\n增删改查——完整的数据操作闭环！',
      },
      {
        type: "example",
        title: "看例子",
        content:
          '下面的代码有一个输入框和"添加""删除最后"两个按钮，可以动态维护一张练琴计划列表：\n\n\```js\nfunction addItem() {\n  let item = document.createElement("div");\n  item.className = "plan-item";\n  item.textContent = input.value;\n  list.appendChild(item);\n  input.value = "";\n}\n\nfunction removeLast() {\n  let items = document.querySelectorAll(".plan-item");\n  let last = items[items.length - 1];\n  if (last) last.remove();\n}\n\```\n切换到预览区，输入内容点添加，再点删除试试——页面元素在动态变化！',
      },
      {
        type: "task",
        title: "动手试试 ✨",
        content:
          '切换到 JS 标签页和预览区，试试：\n\n1. 在输入框输入内容，点"添加"，看列表增长\n2. 连续点"删除最后"，看列表缩短\n3. 修改 `addItem` 函数，让每个项带上序号\n4. 挑战：给每个项加一个删除按钮（在 `createElement` 时内置一个独立删除功能）',
      },
    ],
    starterCode: {
      html: '<h1>练琴计划</h1>\n\n<div class="plan-box">\n  <div class="add-row">\n    <input type="text" id="itemInput" placeholder="添加今天的练习内容">\n    <button id="addBtn">➕ 添加</button>\n    <button id="removeBtn">🗑 删除最后</button>\n  </div>\n  <div id="list"></div>\n</div>',
      css: "h1 {\n  text-align: center;\n  color: #8B2E2E;\n}\n\n.plan-box {\n  max-width: 460px;\n  margin: 20px auto;\n}\n\n.add-row {\n  display: flex;\n  gap: 8px;\n  margin-bottom: 16px;\n}\n\n#itemInput {\n  flex: 1;\n  padding: 10px 14px;\n  border: 1px solid #D4C5A9;\n  border-radius: 6px;\n  font-size: 14px;\n  font-family: inherit;\n}\n\n.add-row button {\n  padding: 10px 16px;\n  background: #8B2E2E;\n  color: #fff;\n  border: none;\n  border-radius: 6px;\n  font-size: 13px;\n  cursor: pointer;\n  white-space: nowrap;\n}\n\n.add-row button:hover {\n  background: #C94545;\n}\n\n#removeBtn {\n  background: #6B5A4E;\n}\n\n#removeBtn:hover {\n  background: #C94545;\n}\n\n#list {\n  display: flex;\n  flex-direction: column;\n  gap: 6px;\n}\n\n.plan-item {\n  background: #FFFAF2;\n  border: 1px solid #E8DDCC;\n  border-radius: 6px;\n  padding: 12px 16px;\n  color: #3D2B1F;\n}",
      js: 'let input = document.querySelector("#itemInput");\nlet addBtn = document.querySelector("#addBtn");\nlet removeBtn = document.querySelector("#removeBtn");\nlet list = document.querySelector("#list");\n\n// 添加\naddBtn.addEventListener("click", function() {\n  let text = input.value.trim();\n  if (text === "") return;\n\n  let item = document.createElement("div");\n  item.className = "plan-item";\n  item.textContent = text;\n  list.appendChild(item);\n  input.value = "";\n});\n\n// 删除最后一个\nremoveBtn.addEventListener("click", function() {\n  let items = document.querySelectorAll(".plan-item");\n  let last = items[items.length - 1];\n  if (last) last.remove();\n});',
    },
  },

  // ===== 4.14 js-timers =====
    {
    id: "js-timers",
    chapterId: "js-basics",
    order: 14,
    title: "定时器 — 让代码跟随节拍",
    musicAnalogy:
      "`setInterval` 就像**节拍器**——设定每分钟 60 拍，它每拍准时触发一次回调函数。`setTimeout` 则像乐谱中的**延长音记号（fermata）**——等一段时间，然后继续演奏。两者结合，你就可以在页面上创造节奏和时序。",
    listenTo:
      "菲利普·格拉斯《音乐的十二个部分》— 极简主义音乐用重复的节奏型不断叠加，精确的时间间隔驱动着音乐的推进，就像 setInterval 驱动的自动动画。",
    sections: [
      {
        type: "explain",
        title: "setInterval — 定时重复",
        content:
          '`setInterval` 每隔指定毫秒执行一次回调函数：\n\n\```js\n// 每 1000 毫秒（1 秒）执行一次\nlet timer = setInterval(function() {\n  count++;\n  display.textContent = count;\n  console.log("一秒过去了");\n}, 1000);\n\n// 停止\nclearInterval(timer);\n\```\n\n1000 毫秒 = 1 秒。就像节拍器打在每分钟 60 拍（每拍 1000ms）。',
      },
      {
        type: "explain",
        title: "setTimeout — 延迟一次",
        content:
          '`setTimeout` 等待指定时间后执行**一次**：\n\n\```js\n// 3 秒后弹出提示\nsetTimeout(function() {\n  alert("3 秒到了！");\n}, 3000);\n\n// 取消（在还没执行前）\nlet timer = setTimeout(fn, 5000);\nclearTimeout(timer);  // 不执行了\n\```\n\n就像乐谱上的延长音记号——在某个音符上停留指定时长，然后继续演奏下一个音符。\n\n`setInterval` 适合：自动轮播、倒计时、节拍器\n`setTimeout` 适合：延迟提示、debounce、定时检查',
      },
      {
        type: "example",
        title: "看例子",
        content:
          '下面的代码实现了一个节拍器：点击"开始"按钮，计数器每秒 +1；点击"暂停"停止：\n\n\```js\nlet count = 0;\nlet timer = null;\n\nfunction startMetronome() {\n  if (timer) return;  // 防止重复启动\n  timer = setInterval(function() {\n    count++;\n    display.textContent = `节拍 ${count}`;\n  }, 1000);\n}\n\nfunction stopMetronome() {\n  clearInterval(timer);\n  timer = null;\n}\n\```\n切换到预览区，点击"开始节拍"看数字每秒递增。',
      },
      {
        type: "task",
        title: "动手试试 ✨",
        content:
          '切换到预览区和 JS 标签页，试试：\n\n1. 点击"开始节拍"看计数，点"暂停"看停止\n2. 把 `setInterval` 的时间从 `1000` 改成 `500`，变成更快的 120bpm\n3. 增加一个 `setTimeout` 实现的"3 秒后自动停止"功能\n4. 挑战：让节拍每 4 拍换一个颜色（提示：用 `count % 4 === 0` 判断）',
      },
    ],
    starterCode: {
      html: '<h1>节拍器</h1>\n\n<div class="metronome-box">\n  <p id="display">点击开始</p>\n  <div class="controls">\n    <button id="startBtn">▶ 开始节拍</button>\n    <button id="stopBtn">⏸ 暂停</button>\n    <button id="resetBtn">↺ 重置</button>\n  </div>\n</div>',
      css: "h1 {\n  text-align: center;\n  color: #8B2E2E;\n}\n\n.metronome-box {\n  text-align: center;\n  background: #FFFAF2;\n  border: 2px solid #D4C5A9;\n  border-radius: 16px;\n  padding: 32px;\n  max-width: 380px;\n  margin: 20px auto;\n}\n\n#display {\n  font-size: 36px;\n  font-weight: 700;\n  color: #8B2E2E;\n  min-height: 50px;\n  margin-bottom: 20px;\n}\n\n.controls {\n  display: flex;\n  gap: 8px;\n  justify-content: center;\n}\n\n.controls button {\n  padding: 10px 20px;\n  background: #8B2E2E;\n  color: #fff;\n  border: none;\n  border-radius: 8px;\n  font-size: 14px;\n  cursor: pointer;\n}\n\n.controls button:hover {\n  background: #C94545;\n}\n\n#stopBtn {\n  background: #6B5A4E;\n}\n\n#resetBtn {\n  background: #C9A96E;\n}",
      js: 'let count = 0;\nlet timer = null;\nlet display = document.querySelector("#display");\n\nlet startBtn = document.querySelector("#startBtn");\nlet stopBtn = document.querySelector("#stopBtn");\nlet resetBtn = document.querySelector("#resetBtn");\n\nstartBtn.addEventListener("click", function() {\n  if (timer) return;  // 防止重复启动\n\n  timer = setInterval(function() {\n    count++;\n    display.textContent = `节拍 ${count}`;\n  }, 1000);\n});\n\nstopBtn.addEventListener("click", function() {\n  clearInterval(timer);\n  timer = null;\n});\n\nresetBtn.addEventListener("click", function() {\n  clearInterval(timer);\n  timer = null;\n  count = 0;\n  display.textContent = "点击开始";\n});',
    },
  },

  // ===== 4.15 js-capstone =====
    {
    id: "js-capstone",
    chapterId: "js-basics",
    order: 15,
    title: "综合项目 — 交互式音乐名片生成器",
    musicAnalogy:
      "一场完整的**交响音乐会**需要乐谱（HTML）、演奏法（CSS）和指挥家（JS）三者协作。这节综合课把前 11 节课的知识融合在一起：用变量存储数据、用数组和对象组织信息、用循环批量渲染、用条件判断做决策、用事件和定时器让一切互动起来。",
    listenTo:
      '贝多芬《第九交响曲》第四乐章"欢乐颂"— 乐队与人声完美融合，所有乐器组协作奏出壮丽的终章，就像 HTML、CSS、JS 合力构建出完整的交互体验。',
    sections: [
      {
        type: "explain",
        title: "你学会了什么？",
        content:
          '回顾 JavaScript 入门篇你学过的所有技能：\n\n| 技能 | 知识点 |\n|------|--------|\n| 变量 | `let`, `const`, 字符串, 模板字符串 |\n| 函数 | `function`, 参数, `return` |\n| 条件判断 | `if/else`, `===`, `&&`, `> <` |\n| 数组 | `[]`, `.push()`, `.join()`, `.length` |\n| 循环 | `forEach`, `for` |\n| DOM 选择 | `querySelector`, `querySelectorAll` |\n| DOM 操作 | `.textContent`, `.innerHTML`, `createElement`, `.remove()` |\n| 事件 | `addEventListener("click", ...)` |\n| 样式控制 | `.style`, `.classList` |\n| 定时器 | `setInterval`, `setTimeout`, `clearInterval` |\n\n现在把这些知识组合起来，做一个**交互式音乐名片生成器**！',
      },
      {
        type: "task",
        title: "逐步构建 ✨",
        content:
          '编辑器里已经有了一个模板，包含作曲家数组和基础结构。请按以下步骤完善：\n\n**第一步：理解现有代码**\n- 查看 JS 标签页，理解 `composers` 对象数组的结构\n- 查看 `showGallery()` 函数如何用 `forEach` 循环渲染卡片\n\n**第二步：添加筛选功能**\n- "全部"按钮应显示所有作曲家\n- "浪漫主义"按钮只显示 `period === "浪漫主义"` 的\n- "巴洛克"按钮略...（新增一个按钮和逻辑）\n\n**第三步：完善"添加"功能**\n- 让"添加"按钮真正把新对象 push 到数组中\n- 调用 `showGallery()` 刷新显示\n\n**第四步：增加你自己的创意**\n- 给卡片加 hover 高亮效果\n- 加一个自动播放按钮（用 setInterval 定时切换高亮）\n- 任何你想加的功能！',
      },
      {
        type: "hint",
        title: "提示",
        content:
          '- `composers.filter(function(c) { return c.period === "浪漫主义"; })` 可以过滤数组\n- 修改 DOM 后记得重新调用渲染函数\n- 如果卡住了，回顾前几节课的代码示例\n- 完成之后，这就是你的**第四章毕业作品**！🎉',
      },
    ],
    starterCode: {
      html: '<h1>交互式音乐名片</h1>\n\n<div class="toolbar">\n  <button id="showAllBtn" class="active">全部</button>\n  <button id="showRomanticBtn">浪漫主义</button>\n  <button id="showClassicalBtn">古典主义</button>\n</div>\n\n<div id="gallery"></div>\n\n<div class="add-bar">\n  <span class="hint">💡 试试添加一位作曲家：</span>\n  <button id="addBtn">➕ 随机添加</button>\n</div>',
      css: "h1 {\n  text-align: center;\n  color: #8B2E2E;\n  margin-bottom: 12px;\n}\n\n.toolbar {\n  display: flex;\n  gap: 8px;\n  justify-content: center;\n  margin-bottom: 16px;\n}\n\n.toolbar button {\n  padding: 8px 20px;\n  background: #FFFAF2;\n  border: 1px solid #D4C5A9;\n  border-radius: 6px;\n  font-size: 13px;\n  cursor: pointer;\n  color: #3D2B1F;\n  transition: all 0.2s;\n}\n\n.toolbar button:hover {\n  background: #8B2E2E;\n  color: #fff;\n}\n\n.toolbar button.active {\n  background: #8B2E2E;\n  color: #fff;\n  border-color: #8B2E2E;\n}\n\n#gallery {\n  display: flex;\n  gap: 12px;\n  flex-wrap: wrap;\n  justify-content: center;\n  min-height: 80px;\n}\n\n.card {\n  background: #FFFAF2;\n  border: 1px solid #D4C5A9;\n  border-radius: 10px;\n  padding: 20px;\n  text-align: center;\n  min-width: 150px;\n  transition: all 0.3s;\n}\n\n.card:hover {\n  border-color: #C9A96E;\n  transform: translateY(-2px);\n  box-shadow: 0 4px 12px rgba(61, 43, 31, 0.1);\n}\n\n.card h2 {\n  color: #8B2E2E;\n  margin: 0 0 6px 0;\n  font-size: 17px;\n}\n\n.card .period {\n  color: #C9A96E;\n  font-size: 12px;\n  font-weight: 600;\n}\n\n.card p {\n  color: #6B5A4E;\n  margin: 4px 0 0 0;\n  font-size: 13px;\n}\n\n.add-bar {\n  text-align: center;\n  margin-top: 20px;\n}\n\n.add-bar .hint {\n  color: #C9A96E;\n  font-size: 13px;\n  margin-right: 8px;\n}\n\n.add-bar button {\n  padding: 10px 24px;\n  background: #8B2E2E;\n  color: #fff;\n  border: none;\n  border-radius: 8px;\n  font-size: 14px;\n  cursor: pointer;\n}\n\n.add-bar button:hover {\n  background: #C94545;\n}",
      js: '// 作曲家数据（对象数组）\nlet composers = [\n  { name: "巴赫", period: "巴洛克", piece: "赋格的艺术" },\n  { name: "莫扎特", period: "古典主义", piece: "魔笛" },\n  { name: "贝多芬", period: "古典主义", piece: "命运交响曲" },\n  { name: "肖邦", period: "浪漫主义", piece: "夜曲" },\n  { name: "舒曼", period: "浪漫主义", piece: "童年情景" },\n  { name: "德彪西", period: "印象派", piece: "月光" }\n];\n\nlet gallery = document.querySelector("#gallery");\n\n// 渲染画廊（接收数组参数）\nfunction showGallery(list) {\n  let html = "";\n  list.forEach(function(c) {\n    html += `\n      <div class="card">\n        <h2>${c.name}</h2>\n        <div class="period">${c.period}</div>\n        <p>《${c.piece}》</p>\n      </div>\n    `;\n  });\n  gallery.innerHTML = html;\n}\n\n// 初始显示全部\nshowGallery(composers);\n\n// 切换激活按钮样式\nfunction setActive(btn) {\n  document.querySelectorAll(".toolbar button").forEach(function(b) {\n    b.classList.remove("active");\n  });\n  btn.classList.add("active");\n}\n\n// 筛选按钮\ndocument.querySelector("#showAllBtn").addEventListener("click", function() {\n  setActive(this);\n  showGallery(composers);\n});\n\ndocument.querySelector("#showRomanticBtn").addEventListener("click", function() {\n  setActive(this);\n  let filtered = composers.filter(function(c) {\n    return c.period === "浪漫主义";\n  });\n  showGallery(filtered);\n});\n\ndocument.querySelector("#showClassicalBtn").addEventListener("click", function() {\n  setActive(this);\n  let filtered = composers.filter(function(c) {\n    return c.period === "古典主义";\n  });\n  showGallery(filtered);\n});\n\n// 随机添加（预设数据池）\nlet pool = [\n  { name: "柴可夫斯基", period: "浪漫主义", piece: "天鹅湖" },\n  { name: "海顿", period: "古典主义", piece: "惊愕交响曲" },\n  { name: "拉威尔", period: "印象派", piece: "波莱罗" }\n];\n\nlet added = 0;\ndocument.querySelector("#addBtn").addEventListener("click", function() {\n  if (added < pool.length) {\n    composers.push(pool[added]);\n    added++;\n    showGallery(composers);\n  }\n});',
    },
  },

  // ================================================================
  // 第五章：JavaScript 进阶
  // ================================================================

  // ===== 5.1 workflow-three-step =====
    {
    id: "workflow-three-step",
    chapterId: "js-advanced",
    trackId: "framework",
    order: 1,
    title: "三段工作流 — HTML → CSS → JS 的正确顺序",
    musicAnalogy:
      "作曲家从不一开始就写满整份总谱。通常先写旋律线（HTML），再配和声与配器（CSS），最后标注强弱与速度变化（JS）。写网页也一样——**永远先写结构，再写样式，最后写交互**。跳过任何一步都会让后面的工作变得混乱。",
    listenTo:
      '拉威尔《波莱罗》— 从一支长笛的简单旋律开始，逐步加入更多乐器，最后整个乐团爆发出磅礴的声响。这就是"先骨架、再装饰、后互动"的完美音乐示范。',
    sections: [
      {
        type: "explain",
        title: "为什么顺序很重要？",
        content:
          '在乐理篇中，你已经学会了三门"乐器"：\n- **HTML**（HyperText Markup Language，超文本标记语言）— 页面的骨架\n- **CSS**（Cascading Style Sheets，层叠样式表）— 页面的外观\n- **JS / JavaScript** — 页面的"大脑"，让它能听你的指令做出反应\n\n但从零开始构建一个页面时，**按什么顺序写**比写什么更重要。\n\n标准的三段工作流：\n\n**第一步：HTML 结构** — 把页面上所有内容先用标签写出来\n- 标题、段落、图片、按钮……先全部摆上去\n- 不关心颜色、大小、位置\n- 就像先把音符写在五线谱上\n\n**第二步：CSS 样式** — 给每个元素穿上合适的"衣服"\n- 颜色、字体、间距、背景……\n- 从外到内，从大到小\n- 就像给旋律配上和声与音色\n\n**第三步：JS（JavaScript）交互** — 让页面"动起来"\n- 点击按钮会发生什么？\n- 用户输入后如何响应？\n- 就像指挥标注演奏法：这里渐强，那里渐慢\n\n> 💡 **关于 JS 和 JavaScript**：JS 是 JavaScript 的缩写，它们是同一个东西。就像"贝多芬"有时被简称为"贝爷"——JS 就是 JavaScript 的昵称。',
      },
      {
        type: "explain",
        title: "倒过来写会怎样？",
        content:
          '新手常犯的错误是：一上来就写 CSS 或 JS，结果 HTML 结构老在变，前面写的样式和逻辑全乱了。\n\n就像一个作曲家先写好配器再改旋律——每次改旋律都得重新配器，浪费时间。\n\n**正确做法：先让 HTML 稳定下来，确认结构是对的，再动手写 CSS 和 JS。** 这就是乐理篇把三门语言分开教的原因——先熟悉每件"乐器"，现在合奏篇教你如何一起演奏它们。',
      },
      {
        type: "task",
        title: "动手试试 ✨",
        content:
          '编辑器里有一个空的起始模板。请按照三段工作流，从零构建一个 **"作曲家名言"卡片**：\n\n**第一步（HTML）：** 写一个 `<div>`，里面包含一个标题 `<h2>`、一句名言 `<p>`、一个 `<button>`\n\n**第二步（CSS）：** 给卡片加背景色、圆角、内边距；给按钮加样式让它好看\n\n**第三步（JS）：** 准备一个名言数组，让按钮点击后随机换一句名言\n\n记住：一步一步来！先确保 HTML 在预览中能看到，再写 CSS，最后写 JS。',
      },
    ],
    starterCode: {
      html: "<!-- 第一步：写 HTML 结构 -->\n<!-- 写一个 <div>，里面放 <h2>标题</h2>、<p>名言</p>、<button>换一句</button> -->\n",
      css: "/* 第二步：写 CSS 样式 */\n/* 提示：给 div 加 background, border-radius, padding, text-align */\n/* 提示：给 button 加 background, color, border, padding, border-radius */\n",
      js: '// 第三步：写 JS 交互\n\n// 1. 准备一个名言数组\n//    例如：let quotes = ["音乐是心灵的窗户。— 贝多芬", "简洁是智慧的灵魂。— 巴赫", ...];\n\n// 2. 用 querySelector 找到 p 和 button\n//    let quoteEl = document.querySelector("p");\n//    let btn = document.querySelector("button");\n\n// 3. 给按钮添加 click 事件\n//    btn.addEventListener("click", function() {\n//      let i = Math.floor(Math.random() * quotes.length);\n//      quoteEl.textContent = quotes[i];\n//    });\n',
    },
  },

  // ===== 5.2 workflow-plan-first =====
    {
    id: "workflow-plan-first",
    chapterId: "js-advanced",
    trackId: "framework",
    order: 2,
    title: '先规划再动手 — 用注释画出你的"乐谱草稿"',
    musicAnalogy:
      '指挥家在排练前一定会先通读总谱，标出曲式结构、调性变化和难点段落。写代码也一样——**先用注释画出"草图"，再填入真正的代码**。这就像排练前做案头工作：标注呈示部、展开部、再现部。先看清大局，再动手处理细节。',
    listenTo:
      "马勒《第二交响曲》第一乐章 — 长达20分钟的乐章，如果没有清晰的段落标记和结构规划，指挥根本无法驾驭如此庞大的编制。好的规划让复杂变得可控。",
    sections: [
      {
        type: "explain",
        title: '注释是你的"排练笔记"',
        content:
          'HTML 注释用 `<!-- 注释内容 -->` 包裹，CSS 注释用 `/* 注释内容 */` 包裹，JS 注释用 `//` 或 `/* */`。\n\n注释不会被浏览器执行——它们只给"人类"看，包括未来的你自己！\n\n当你面对一个空白页面时，不要急着写代码。先写注释：\n\n\```html\n<!-- 页面分为三个区域：\n  1. 顶部标题区\n  2. 中间卡片列表（3张卡片）\n  3. 底部统计区\n-->\n\```\n\n这就像在乐谱上标注：呈示部、展开部、再现部。',
      },
      {
        type: "explain",
        title: "好的注释写什么？",
        content:
          '**写"意图"，不写"操作"**\n\n❌ 不好的注释（描述你做了什么）：\n`// 把 3 赋给 x`\n`let x = 3;`\n\n✅ 好的注释（解释为什么）：\n`// 页面默认显示 3 张卡片（移动端一屏刚好够）`\n`let cardCount = 3;`\n\n✅ 规划型注释（先画结构，再填空）：\n\```html\n<!-- 顶部区：标题 + 副标题 -->\n<header>\n  <h1>我的音乐收藏</h1>\n  <p>记录那些打动我的旋律</p>\n</header>\n\n<!-- 主内容：3 列卡片网格 -->\n<main>\n  <!-- 每张卡片：封面图、曲名、作曲家、时期标签 -->\n</main>\n\```',
      },
      {
        type: "task",
        title: "动手试试 ✨",
        content:
          "编辑器里有一份带规划注释的模板，但代码还没写完。请：\n\n**第一步：** 阅读三组注释，理解页面结构\n\n**第二步：** 在每组注释下方，填入对应的 HTML 标签和 CSS 样式\n\n**第三步：** 在 JS 中也先用注释规划逻辑，再写代码——让顶部大标题点击后变成随机口号\n\n**第四步（挑战）：** 尝试给卡片区也添加注释规划，然后补充内容",
      },
    ],
    starterCode: {
      html: "<!-- ===== 1. 顶部标题区 ===== -->\n<h1>我的音乐收藏</h1>\n<p>记录那些打动我的旋律</p>\n\n<!-- ===== 2. 中间卡片列表区 ===== -->\n<!-- 写3张卡片，每张包含：曲名<h3>、作曲家<p>、时期标签<span> -->\n\n<!-- ===== 3. 底部统计区 ===== -->\n<!-- 用 <p> 显示收藏总数 -->\n",
      css: "/* ===== 1. 顶部标题区样式 ===== */\nh1 {\n  text-align: center;\n  color: #8B2E2E;\n  margin-bottom: 8px;\n}\n\n/* ===== 2. 卡片样式 ===== */\n/* 提示：背景 #FFFAF2，边框，圆角，内边距 */\n\n/* ===== 3. 底部统计区样式 ===== */\n/* 提示：居中，小字号，灰色 */\n",
      js: '// ===== 1. 获取所有需要的 DOM 元素 =====\nlet titleEl = document.querySelector("h1");\n// 提示：还需要获取统计区的 <p> 元素，用来显示收藏数量\n\n// ===== 2. 点击标题时切换随机口号 =====\n// 1) 先创建一个口号数组：\n//    let slogans = ["每一段旋律都值得被收藏", "音乐是心灵的笔记", "收藏美好，从一首曲子开始"];\n// 2) 在 click 函数中：\n//    - 用 Math.random() 生成随机索引\n//    - 用 Math.floor() 取整\n//    - 用 titleEl.textContent = slogans[随机索引] 替换标题文字\n\ntitleEl.addEventListener("click", function() {\n  // 在这里写你的代码：随机选一句口号替换 h1 的 textContent\n});\n\n// ===== 3. 计算并显示统计数据 =====\n// 提示：用 querySelectorAll("要选择的元素") 获取所有卡片\n// 然后 .length 得到数量，显示在统计区的 <p> 中\n',
    },
  },

  // ===== 5.3 workflow-console-intro =====
    {
    id: "workflow-console-intro",
    chapterId: "js-advanced",
    trackId: "framework",
    order: 3,
    title: '读懂浏览器的"错音提示" — 开发者控制台入门',
    musicAnalogy:
      '每个音乐家都有一位"调音师"朋友——音不准时，调音器会告诉你偏差了多少。浏览器的**开发者工具控制台（Console）**就是你的调音器——代码出错时，它会精确告诉你哪一行、出了什么错。学会读错误信息，你就再也不怕"报错"了。',
    listenTo:
      "巴赫《赋格的艺术》— 赋格中每一个声部的进入和退出都有精确的时间点，就像控制台报出的每一行错误——精确、清晰、可追溯。当你逐个解决错误时，就像分析赋格声部一样，一次专注一个问题。",
    sections: [
      {
        type: "explain",
        title: "错误不是失败，是路标",
        content:
          '写代码一定会遇到错误。即便是工作了 20 年的工程师，也天天看报错信息。区别在于：他们不慌张，而是**先看控制台**。\n\n当你的 JS 不工作时，第一个动作不是盯着代码瞎猜——**先打开浏览器控制台**：\n\n- Windows：按 `F12`，点击 "Console"（控制台）标签\n- Mac：按 `Cmd + Option + J`\n- 或者右键页面 → "检查" → "Console"\n\n红色文字就是错误信息。**红色不可怕，可怕的是不读红字。** 就像一个音不准时你的耳朵会告诉你——控制台就是代码的"听力训练"。',
      },
      {
        type: "explain",
        title: "读懂红字错误信息",
        content:
          '每条错误通常包含三部分信息：\n\n**1. 错误类型** — 告诉你"出了什么问题"：\n- `ReferenceError: xxx is not defined` — 变量没声明就用了\n- `TypeError: xxx is not a function` — 把不是函数的东西当函数调用了\n- `SyntaxError: Unexpected token` — 语法错误，漏了括号或引号\n\n**2. 文件名 + 行号** — 告诉你"在哪里出的错"：\n- 例如 `at 3:15` 表示第 3 行第 15 个字符\n\n**3. 错误消息** — 英文描述的具体原因\n\n现在编辑器里的代码有 5 个故意埋下的错误。打开控制台，一个一个找出并修复它们！',
      },
      {
        type: "task",
        title: "动手试试 ✨",
        content:
          "编辑器里的代码有 **5 个故意埋下的错误**。请完成以下步骤：\n\n**第一步：** 运行代码，打开浏览器控制台（F12），查看红色错误信息\n\n**第二步：** 读第一条错误——它告诉你第几行出了什么错？找到对应代码并修复\n\n**第三步：** 再次运行，看下一条错误是否出现\n\n**第四步：** 重复，直到控制台变干净（没有红字），页面正常显示\n\n提示：错误之间可能互相掩盖——修完一个才能看到下一个。就像调音时，一根弦校准后才能发现另一根弦不准。",
      },
      {
        type: "hint",
        title: "需要一点线索？",
        content:
          "5 个错误的类型分别是：\n1. `document` 拼写错误 — ReferenceError\n2. `querySelector` 大小写错误 — TypeError\n3. 变量名不一致（声明和使用的名字不同）\n4. DOM 方法名拼写错误\n5. DOM 属性名拼写错误\n\n控制台会精确告诉你每一个错误的位置。耐心读完红字！",
      },
    ],
    starterCode: {
      html: '<h1>音乐列表</h1>\n\n<div id="card">\n  <h2 class="card-title">肖邦夜曲</h2>\n  <p class="card-desc">浪漫主义时期的钢琴名作</p>\n  <button id="likeBtn">❤ 收藏</button>\n</div>\n\n<p id="msg"></p>',
      css: "h1 {\n  text-align: center;\n  color: #8B2E2E;\n}\n\n#card {\n  background: #FFFAF2;\n  border: 2px solid #D4C5A9;\n  border-radius: 12px;\n  padding: 24px;\n  text-align: center;\n  max-width: 360px;\n  margin: 0 auto;\n}\n\n.card-title {\n  color: #8B2E2E;\n  margin-bottom: 8px;\n}\n\n.card-desc {\n  color: #6B5A4E;\n  margin-bottom: 16px;\n}\n\n#likeBtn {\n  background: #8B2E2E;\n  color: white;\n  border: none;\n  padding: 10px 28px;\n  border-radius: 8px;\n  cursor: pointer;\n  font-size: 15px;\n}\n\n#likeBtn:hover {\n  background: #C94545;\n}\n\n#msg {\n  text-align: center;\n  color: #C9A96E;\n  margin-top: 16px;\n  font-weight: 600;\n}",
      js: '// 👋 欢迎来到调试训练！\n// 这个页面有 5 个故意埋下的错误。打开控制台（F12），然后逐个修复它们。\n// 注意：每次只能看到一个错误——修好一个、刷新页面，下一个才会出现！\nconsole.log("🎻 调试训练开始！打开 F12 控制台，红色错误就是你要修复的 bug");\nconsole.log("提示：每修好一个错误就点‘运行’按钮，看下一个错误是什么");\n\n// 错误1：document 拼写错误 \nlet title = docuement.querySelector(".card-title");\n\n// 错误2：querySelector 大小写错误（修好上面那个才能看到这个）\nlet likeBtn = document.queryselector("#likeBtn");\n\n// 错误3：变量名不一致——声明的是 likeBtn，用的却是 fixBtn\nlet msg = document.querySelector("#msg");\nfixBtn.addEventListener("click", function() {\n  if (likeBtn.textContent === "❤ 收藏") {\n    likeBtn.textContent = "❤ 已收藏";\n    likeBtn.style.background = "#C9A96E";\n    // 错误4：textContent 拼写错误（这行不会在控制台报错，但消息不会更新！）\n    msg.textContet = "已添加到你的收藏！";\n  } else {\n    likeBtn.textContent = "❤ 收藏";\n    likeBtn.style.background = "#8B2E2E";\n    // 错误5：innerHTML 大小写错误（同样不会报错，但功能不生效）\n    msg.innerhtml = "已取消收藏";\n  }\n});',
    },
  },

  // ===== 5.4 workflow-console-log =====
    {
    id: "workflow-console-log",
    chapterId: "js-advanced",
    trackId: "framework",
    order: 4,
    title: 'console.log — 你的"排练监听器"',
    musicAnalogy:
      '排练时，指挥会让某个声部单独演奏，以便听清楚每个音符。`console.log()` 就是你的"排练监听"——它让你在任何时刻、查看任何变量的值。当你不确定代码在做什么时，用 `console.log()` 看个究竟。',
    listenTo:
      '贝多芬《第七交响曲》第二乐章 — 著名的"小快板"，从一个低沉的重复音型开始，逐层叠加声部。每次新乐器加入都清晰可辨——就像 console.log 把每个变量的值一层层打印出来。',
    sections: [
      {
        type: "explain",
        title: "console.log 是什么？",
        content:
          '`console.log()` 是 JavaScript 中最常用的调试工具。它能在控制台中打印出任何你想看的值：\n\n\```js\nlet composer = "肖邦";\nconsole.log(composer);  // 控制台输出：肖邦\n\nlet count = 5;\nconsole.log("当前数量：", count);  // 可以同时打印文字和变量\n\nlet list = ["巴赫", "莫扎特", "贝多芬"];\nconsole.log("列表内容：", list);  // 数组也可以打印\n\```\n\n**用法：** 在你怀疑有问题的地方，插入 `console.log(变量名)`，然后打开控制台（F12）查看输出。',
      },
      {
        type: "explain",
        title: "用 console.log 追踪代码流程",
        content:
          '最常见的调试模式是**在函数开头和关键位置加 console.log**，追踪代码执行到了哪里：\n\n\```js\nfunction playMusic(piece) {\n  console.log("=== playMusic 被调用了 ===");\n  console.log("传入的参数 piece：", piece);\n\n  if (piece === "夜曲") {\n    console.log("进入夜曲分支");\n    // ... 处理夜曲\n  } else {\n    console.log("进入其他曲目分支");\n    // ... 处理其他\n  }\n\n  console.log("=== playMusic 执行完毕 ===");\n}\n\```\n\n这就像在排练中逐段录音回放——你清楚地知道代码走到了哪里、每个变量是什么值。当你觉得"为什么结果不对"时，先 `console.log` 看看到底发生了什么。',
      },
      {
        type: "example",
        title: "看例子",
        content:
          '编辑器里有一个简单的"音乐计数器"页面。它看起来可以工作，但有一个逻辑问题——仔细看 JS 代码，你能发现吗？\n\n**你的任务不是修 bug，而是加 console.log 来"监听"这个 bug。** 在按钮点击事件中插入 console.log，打印当前数值，这样你就能在控制台看到程序的实际行为。\n\n这种"先观察、再修复"的方法，就是工程师的日常。',
      },
      {
        type: "task",
        title: "动手试试 ✨",
        content:
          '编辑器里有一个"点击计数"页面，点击按钮会增加计数。但它有一个逻辑 bug。\n\n**第一步：** 先不要修改逻辑。在 `addOne()` 函数中添加 `console.log`，打印每次点击后的 count 值\n\n**第二步：** 打开控制台，点击几次按钮，观察控制台输出\n\n**第三步：** 你能发现 count 的值出了什么问题吗？\n\n**第四步：** 理解问题后，修复这个 bug\n\n提示：当控制台输出和你预期不一致时，说明你的理解有偏差——这正是 `console.log` 最有用的时刻！',
      },
    ],
    starterCode: {
      html: '<h1>点击计数器</h1>\n\n<div class="counter-box">\n  <p class="label">当前计数</p>\n  <p id="display" class="number">0</p>\n  <div class="buttons">\n    <button id="addBtn">+1</button>\n    <button id="resetBtn">归零</button>\n  </div>\n  <p id="msg" class="message"></p>\n</div>',
      css: 'h1 {\n  text-align: center;\n  color: #8B2E2E;\n}\n\n.counter-box {\n  text-align: center;\n  background: #FFFAF2;\n  border: 2px solid #D4C5A9;\n  border-radius: 16px;\n  padding: 32px;\n  max-width: 300px;\n  margin: 20px auto;\n}\n\n.label {\n  color: #6B5A4E;\n  font-size: 14px;\n  margin: 0 0 4px 0;\n}\n\n.number {\n  font-size: 48px;\n  font-weight: 700;\n  color: #8B2E2E;\n  margin: 0 0 20px 0;\n  font-family: "Fira Code", monospace;\n}\n\n.buttons {\n  display: flex;\n  gap: 8px;\n  justify-content: center;\n}\n\n.buttons button {\n  padding: 10px 24px;\n  font-size: 16px;\n  border: none;\n  border-radius: 8px;\n  cursor: pointer;\n}\n\n#addBtn {\n  background: #8B2E2E;\n  color: white;\n}\n\n#addBtn:hover {\n  background: #C94545;\n}\n\n#resetBtn {\n  background: #6B5A4E;\n  color: white;\n}\n\n.message {\n  color: #C9A96E;\n  margin-top: 16px;\n  font-weight: 600;\n}',
      js: '// 一个简单的计数器——但它有一个逻辑 bug\n// 你的任务：用 console.log 观察，然后修复它\n\nlet count = 0;\nlet display = document.querySelector("#display");\nlet msg = document.querySelector("#msg");\n\nfunction addOne() {\n  // 第一步：在 bug 行之前加 console.log\n  // 提示：console.log("点击前 count =", count);\n\n  count = count ++;  // ← 这里有个 bug！观察控制台输出想想为什么\n\n  // 第二步：在 bug 行之后加 console.log\n  // 提示：console.log("点击后 count =", count);\n  // 对比前后——count 的值真的 +1 了吗？\n\n  display.textContent = count;\n\n  if (count === 10) {\n    msg.textContent = "🎉 你已经点击了 10 次！";\n  }\n}\n\nfunction reset() {\n  count = 0;\n  display.textContent = count;\n  msg.textContent = "";\n  console.log("计数器已归零，count =", count);\n}\n\n// 提示：count = count ++ 和 count = count + 1 有什么区别？\n// 用 console.log 分别在 bug 前后打印 count 的值，你就能看出来\n// 正确的写法是：count = count + 1 或者 count++\n\ndocument.querySelector("#addBtn").addEventListener("click", addOne);\ndocument.querySelector("#resetBtn").addEventListener("click", reset);',
    },
  },

  // ===== 5.5 workflow-debugger =====
  {
    id: 'workflow-debugger',
    chapterId: 'js-advanced',
    trackId: "framework",
    order: 5,
    title: '断点调试 — 用 Sources 面板听诊代码',
    musicAnalogy: 'console.log 就像在排练中让乐手报一遍自己的音符——能发现问题，却看不清全局。断点调试则像指挥让乐队在某一个小节停下来，逐个声部检查：长笛吹的是什么音？定音鼓在这个拍点上的力度对吗？你可以在任意时刻凝固住整个程序，查看所有变量的值，然后一行一行地执行，观察数据如何流动。',
    listenTo: '贝多芬《第九交响曲》排练录音 — 任何一位指挥在排练时都会反复停下、纠正、重来。断点调试就是你在代码中的排练指挥棒——发现不和谐的音（bug），停下来，找到原因，修正好，再继续。',
    sections: [
      {
        type: 'explain',
        title: 'console.log 不够用了吗？',
        content: '你一直在用 console.log 来调试代码——这在简单场景下确实管用。但当你遇到复杂问题时：\n\n- 变量在 5 个地方被修改，不知道是谁改错了\n- 循环 100 次，不知道第 47 次为什么出问题\n- 异步代码的执行顺序让人困惑\n- 想看某个时刻**所有**变量的值，而不是只 log 一个\n\n这时候你需要断点（breakpoint）——在代码的某一行设置一个暂停标记，程序运行到这里就会停下来，你可以慢慢检查一切。\n\n**打开 DevTools Sources 面板：**\n1. 按 F12 打开开发者工具\n2. 切换到 Sources（源代码）面板\n3. 左侧找到你的 JS 文件\n4. 点击行号设置断点（出现蓝色箭头标记）\n5. 刷新页面或触发事件——程序在断点处暂停！',
      },
      {
        type: 'explain',
        title: '断点操作 — 你的指挥手势',
        content: '程序暂停后，你可以使用以下控制按钮（像指挥的不同手势）：\n\n| 按钮 | 快捷键 | 作用 |\n|------|--------|------|\n| Resume | F8 | 继续执行，直到下一个断点 |\n| Step Over | F10 | 执行当前行，不进入函数内部 |\n| Step Into | F11 | 进入函数内部，逐行执行 |\n| Step Out | Shift+F11 | 跳出当前函数 |\n\n暂停时，你可以：\n- **鼠标悬停**在任何变量上查看它的值\n- 在右侧 **Scope（作用域）** 面板查看所有局部和全局变量\n- 在 **Watch（监视）** 面板添加表达式，实时追踪其值变化\n- 在 **Console** 面板直接输入变量名来测试表达式\n\n> 🎯 就像一个指挥随时可以指着某个乐手问你这里奏的是什么，你随时可以查看任何变量的值。',
      },
      {
        type: 'explain',
        title: '条件断点与 DOM 断点',
        content: '**条件断点：** 右键点击行号 → "Add conditional breakpoint" → 输入条件表达式（如 i === 47）。只有当条件为 true 时才会暂停。这在调试第 47 次循环出问题时是救星。\n\n\```js\n// 条件断点表达式：i === 47\n// 循环到第 48 次（i=47）时才会暂停\nfor (let i = 0; i < 100; i++) {\n  processItem(data[i])\n}\n\```\n\n**DOM 断点：** 在 Elements 面板中右键一个 DOM 元素 → Break on → 选择 subtree modifications / attribute modifications / node removal。当这个元素被修改、删除或属性变化时，自动跳转到修改它的 JS 代码。\n\n**XHR/Fetch 断点：** 在 Sources 面板右侧的 XHR/fetch Breakpoints 中添加 URL 片段（如 search）。当有请求匹配这个 URL 时自动暂停——调试网络请求的神器。',
      },
      {
        type: 'example',
        title: '看例子',
        content: '下面的代码是一个猜数字游戏。请在 Sources 面板中设置断点来调试：\n\n\```js\nlet target = Math.floor(Math.random() * 100)\nlet score = 100\nlet attempts = 0\n\nfunction guess(num) {\n  attempts++\n  if (num > target) {\n    score -= 10\n    return \'太大了！\'\n  } else if (num < target) {\n    score -= 10\n    return \'太小了！\'\n  } else {\n    // 在这里设置一个断点——检查 num、target、score 的值\n    return \'恭喜！你得分为 \' + score\n  }\n}\n\```\n\n打开 F12 → Sources → 在 return 那行设置断点 → 在输入框输入数字 → 点击按钮触发 guess() → 程序暂停，查看右侧面板中所有变量。',
      },
      {
        type: 'task',
        title: '动手试试 ✨',
        content: '请在预览区的输入框中输入数字，触发 guess() 函数：\n\n1. 打开 F12 → Sources 面板，在 guess 函数的第一行设置断点\n2. 输入一个数字，观察程序暂停时右侧 Scope 面板中的变量值\n3. 使用 Step Over（F10）逐行执行，观察 score 和 attempts 的变化\n4. 在 num === target 的判断行设置条件断点（num > 80 && num < 90），只在特定范围暂停\n5. 挑战：在 Watch 面板添加表达式 target - num，实时追踪差值',
      },
    ],
    starterCode: {
      html: '<h1>🔍 调试实验室</h1>\n\n<div class="game-box">\n  <p class="hint-text">我已经想好了一个 0~99 之间的数字 👀</p>\n  <div class="input-row">\n    <input type="number" id="guessInput" min="0" max="99" placeholder="输入你的猜测...">\n    <button id="guessBtn">猜！</button>\n  </div>\n  <div class="info-row">\n    <span>💯 得分：<strong id="scoreDisplay">100</strong></span>\n    <span>🎯 尝试：<strong id="attemptsDisplay">0</strong></span>\n  </div>\n  <p id="message" class="message"></p>\n  <button id="resetBtn" class="reset-btn">🔄 重新开始</button>\n</div>',
      css: 'h1 { text-align: center; color: #8B2E2E; margin-bottom: 20px; }\n.game-box { max-width: 420px; margin: 0 auto; background: #FFFAF2; border: 2px solid #D4C5A9; border-radius: 14px; padding: 28px; text-align: center; }\n.hint-text { color: #6B5A4E; font-size: 14px; margin: 0 0 16px 0; }\n.input-row { display: flex; gap: 10px; justify-content: center; margin-bottom: 16px; }\n#guessInput { width: 140px; padding: 10px 14px; border: 2px solid #D4C5A9; border-radius: 8px; font-size: 16px; text-align: center; outline: none; font-family: inherit; }\n#guessInput:focus { border-color: #C9A96E; }\n#guessBtn { padding: 10px 24px; background: #8B2E2E; color: #fff; border: none; border-radius: 8px; font-size: 16px; cursor: pointer; transition: background 0.2s; }\n#guessBtn:hover { background: #C94545; }\n.info-row { display: flex; justify-content: center; gap: 24px; margin-bottom: 14px; font-size: 14px; color: #3D2B1F; }\n.message { font-size: 18px; font-weight: 600; min-height: 28px; margin: 0 0 14px 0; }\n.message.win { color: #2E7D32; }\n.message.hint { color: #C9A96E; }\n.reset-btn { background: transparent; color: #8B2E2E; border: 1px solid #D4C5A9; padding: 6px 16px; border-radius: 6px; font-size: 13px; cursor: pointer; transition: all 0.2s; }\n.reset-btn:hover { background: #FFFAF2; border-color: #8B2E2E; }',
      js: 'let target = Math.floor(Math.random() * 100);\nlet score = 100;\nlet attempts = 0;\n\nconsole.log(\'🎯 答案在这里（调试时你可以在 Scope 面板中看到 target）：\', target);\n\nconst input = document.getElementById(\'guessInput\');\nconst btn = document.getElementById(\'guessBtn\');\nconst msg = document.getElementById(\'message\');\nconst scoreDisplay = document.getElementById(\'scoreDisplay\');\nconst attemptsDisplay = document.getElementById(\'attemptsDisplay\');\nconst resetBtn = document.getElementById(\'resetBtn\');\n\nfunction guess(num) {\n  attempts++;\n  attemptsDisplay.textContent = attempts;\n  if (num > target) {\n    score -= 10;\n    scoreDisplay.textContent = score;\n    return \'📈 太大了！往下猜\';\n  } else if (num < target) {\n    score -= 10;\n    scoreDisplay.textContent = score;\n    return \'📉 太小了！往上猜\';\n  } else {\n    return { text: \'🎉 恭喜！答案就是 \' + target + \'。得分：\' + score, isWin: true };\n  }\n}\n\nbtn.addEventListener(\'click\', () => {\n  const val = parseInt(input.value);\n  if (isNaN(val) || val < 0 || val > 99) {\n    msg.textContent = \'请输入 0~99 之间的数字\';\n    msg.className = \'message\';\n    return;\n  }\n  const result = guess(val);\n  if (typeof result === \'string\') {\n    msg.textContent = result;\n    msg.className = \'message hint\';\n  } else {\n    msg.textContent = result.text;\n    msg.className = result.isWin ? \'message win\' : \'message\';\n    btn.disabled = result.isWin;\n  }\n  input.value = \'\';\n  input.focus();\n});\n\nresetBtn.addEventListener(\'click\', () => {\n  target = Math.floor(Math.random() * 100);\n  score = 100;\n  attempts = 0;\n  scoreDisplay.textContent = score;\n  attemptsDisplay.textContent = attempts;\n  msg.textContent = \'\';\n  msg.className = \'message\';\n  btn.disabled = false;\n  console.log(\'🎯 新答案是：\', target);\n  input.focus();\n});',
    },
  },

  // ===== 5.6 workflow-naming =====
    {
    id: "workflow-naming",
    chapterId: "js-advanced",
    trackId: "framework",
    order: 6,
    title: "命名就像给音符标注指法 — 让代码自己说话",
    musicAnalogy:
      "乐谱上标注的指法标记让演奏者一眼就知道用哪个手指。同样，**好的变量名和类名让阅读代码的人（包括一个月后的你自己）一眼就知道这段代码在做什么**。命名是程序员最被低估的技能——它不改变功能，但能让你写代码的速度快 10 倍。",
    listenTo:
      '肖邦《练习曲》Op.10 No.1 — 每一组琶音的指法都经过精心设计，让演奏如流水般自然。好的命名就像好的指法——"好的命名"让你读代码时如行云流水。',
    sections: [
      {
        type: "explain",
        title: "好名字 vs 坏名字",
        content:
          '来看一组对比：\n\n**❌ 坏命名（你一个月后根本看不懂）：**\n\```js\nlet a = ["巴赫", "莫扎特", "贝多芬"];\nlet b = document.querySelector("#c");\nlet d = document.querySelector("#e");\nd.addEventListener("click", function() {\n  let f = Math.floor(Math.random() * a.length);\n  b.textContent = a[f];\n});\n\```\n\n**✅ 好命名（任何人都看得懂）：**\n\```js\nlet composers = ["巴赫", "莫扎特", "贝多芬"];\nlet displayEl = document.querySelector("#composerDisplay");\nlet shuffleBtn = document.querySelector("#shuffleBtn");\nshuffleBtn.addEventListener("click", function() {\n  let randomIndex = Math.floor(Math.random() * composers.length);\n  displayEl.textContent = composers[randomIndex];\n});\n\```\n\n两者功能完全一样，但可读性天差地别。**好名字让代码自己说话，不需要额外解释。**',
      },
      {
        type: "explain",
        title: "命名规则速查表",
        content:
          "**CSS 类名：** 用小写字母 + 连字符（kebab-case）\n- ✅ `card-title` `music-list` `play-btn`\n- ❌ `CardTitle` `music_list` `a` `b` `c`\n\n**JS 变量名：** 用驼峰命名（camelCase）\n- ✅ `composerName` `totalCount` `likeBtn` `musicList`\n- ❌ `composer_name` `totalcount` `btn` `x`\n\n**JS 函数名：** 用动词开头，描述做什么\n- ✅ `playMusic()` `addCard()` `showMessage()` `calculateTotal()`\n- ❌ `music()` `card()` `message()` `total()`\n\n**常用前缀约定：**\n- 存储 DOM 元素的变量后加 `El`：`titleEl`、`cardEl`、`msgEl`\n- 存储按钮的变量后加 `Btn`：`likeBtn`、`closeBtn`、`submitBtn`\n- 布尔值用 `is` / `has` 开头：`isPlaying`、`hasLiked`",
      },
      {
        type: "task",
        title: "动手试试 ✨",
        content:
          '编辑器里有一个功能完整的页面，但所有的命名都非常糟糕——全是用 `a`、`b`、`c`、`x`、`y` 这样的单字母！\n\n**你的任务：** 不改动任何功能逻辑，只把所有变量名和函数名换成有意义的名字。\n\n重命名清单：\n- `a` → 存放作曲家名字的数组\n- `b` → 显示作曲家名字的 `<p>` 元素\n- `c` → "换一首"按钮\n- `d` → 显示添加状态的消息区\n- `e` → "添加"按钮\n- `f` → 随机索引\n- `x()` → 随机换一首曲子的函数\n- `y()` → 添加作曲家的函数\n\n换个好名字后，再读一遍你的代码——是不是清晰了很多？',
      },
    ],
    starterCode: {
      html: '<h1>作曲家随机播放</h1>\n\n<div class="card">\n  <p id="nameDisplay">点击按钮开始</p>\n  <div class="buttons">\n    <button id="shuffleBtn">🎲 换一首</button>\n    <button id="addBtn">➕ 添加</button>\n  </div>\n  <p id="msg"></p>\n</div>',
      css: "h1 {\n  text-align: center;\n  color: #8B2E2E;\n}\n\n.card {\n  text-align: center;\n  background: #FFFAF2;\n  border: 2px solid #D4C5A9;\n  border-radius: 16px;\n  padding: 32px;\n  max-width: 380px;\n  margin: 20px auto;\n}\n\n.card p:first-of-type {\n  font-size: 24px;\n  color: #8B2E2E;\n  font-weight: 600;\n  min-height: 40px;\n  margin-bottom: 20px;\n}\n\n.buttons {\n  display: flex;\n  gap: 8px;\n  justify-content: center;\n}\n\n.buttons button {\n  padding: 10px 24px;\n  border: none;\n  border-radius: 8px;\n  cursor: pointer;\n  font-size: 16px;\n}\n\n#shuffleBtn {\n  background: #8B2E2E;\n  color: white;\n}\n\n#shuffleBtn:hover {\n  background: #C94545;\n}\n\n#addBtn {\n  background: #C9A96E;\n  color: white;\n}\n\n#addBtn:hover {\n  background: #B8944D;\n}\n\n#msg {\n  color: #C9A96E;\n  margin-top: 16px;\n  font-weight: 600;\n}",
      js: '// 这个页面功能正确，但命名非常糟糕\n// 你的任务：把所有单字母变量和函数名改成有意义的名字\n\n// 提示：用"重命名清单"来对照修改——\n//   a → composers（作曲家数组）\n//   b → nameDisplay（显示区元素）\n//   c → shuffleBtn（换一首按钮）\n//   d → msgEl（消息区元素）\n//   e → addBtn（添加按钮）\n//   f → randomIndex（随机索引）\n//   x() → showRandom()（随机显示一位作曲家）\n//   y() → addComposer()（添加一位作曲家）\n\nlet a = ["巴赫", "莫扎特", "贝多芬", "肖邦", "舒曼"];\nlet b = document.querySelector("#nameDisplay");\nlet c = document.querySelector("#shuffleBtn");\nlet d = document.querySelector("#msg");\nlet e = document.querySelector("#addBtn");\n\nfunction x() {\n  let f = Math.floor(Math.random() * a.length);\n  b.textContent = a[f];\n  d.textContent = "当前显示：" + a[f];\n}\n\nfunction y() {\n  a.push("德彪西");\n  d.textContent = "已添加：德彪西（共" + a.length + "位作曲家）";\n}\n\nc.addEventListener("click", x);\ne.addEventListener("click", y);',
    },
  },

  // ===== 5.7 workflow-decompose =====
    {
    id: "workflow-decompose",
    chapterId: "js-advanced",
    trackId: "framework",
    order: 7,
    title: "拆分函数 — 把大段乐谱分成清晰的乐章",
    musicAnalogy:
      "一首 40 分钟的交响曲会分成几个乐章，每个乐章又有自己的主题和发展。如果全部堆在一起，演奏者和听众都会迷失。同样，**当你的函数超过 20 行，就该考虑拆分了**。每个函数只做一件事，就像每个乐章有一个主题。",
    listenTo:
      "贝多芬《第五交响曲》— 四个乐章各有独立的性格和主题，但合在一起又是一个完整的作品。好的代码也是如此：每个函数独立清晰，合在一起完成复杂任务。",
    sections: [
      {
        type: "explain",
        title: "为什么要把大函数拆小？",
        content:
          '看看这个"做了一切"的函数：\n\n\```js\nfunction handleEverything() {\n  // 获取数据\n  // 验证数据\n  // 渲染页面\n  // 绑定事件\n  // 处理点击\n  // 更新显示\n  // 保存记录\n  // …… 100 行代码\n}\n\```\n\n问题：\n1. **难读懂** — 你需要从头到尾理解才能修改其中一步\n2. **难调试** — 出错时不知道是哪一步的问题\n3. **难复用** — 如果另一个地方也需要"渲染页面"，你没法单独调用\n\n**好代码的样子：**\n\```js\nfunction initPage() {\n  let data = loadData();\n  renderCards(data);\n  bindEvents();\n}\n\nfunction loadData() { /* 只负责获取数据 */ }\nfunction renderCards(list) { /* 只负责渲染 */ }\nfunction bindEvents() { /* 只负责绑定事件 */ }\n\```\n\n每个函数**只做一件事**，函数名准确描述它做什么。这就是"单一职责"——编程最重要的组织原则之一。',
      },
      {
        type: "explain",
        title: "什么时候该拆分？",
        content:
          '三个信号告诉你"该拆了"：\n\n**信号 1：代码块有明确的注释分区**\n如果你的代码里出现了 `// ===== 第一部分 =====` 这样的注释，说明这里应该是一个独立函数。函数名就是最好的"注释"。\n\n**信号 2：你复制粘贴了一段代码**\n如果你发现自己复制了某段代码只改了一两个地方——立刻把它提取成一个函数！这叫做 DRY 原则（Don\'t Repeat Yourself）。\n\n**信号 3：函数超过 20 行**\n这不是死规矩，但如果你写了一个超过 20 行的函数，问问自己：这个函数有没有在做两件事？如果函数名里出现了"和"字（"获取数据并渲染"），它就该拆成两个。',
      },
      {
        type: "example",
        title: "拆分前 vs 拆分后",
        content:
          '**拆分前（一个函数做三件事）：**\n\```js\nfunction setupMusicPage() {\n  // 渲染卡片 — 15 行\n  let cardHTML = "";\n  for (let i = 0; i < pieces.length; i++) {\n    cardHTML += `<div class="card"><h3>${pieces[i].name}</h3></div>`;\n  }\n  gallery.innerHTML = cardHTML;\n\n  // 绑定筛选 — 10 行\n  filterBtn.addEventListener("click", function() {\n    let filtered = pieces.filter(/* ... */);\n    // 重新渲染...\n  });\n\n  // 显示统计 — 8 行\n  let total = pieces.length;\n  statsEl.textContent = "共 " + total + " 首曲目";\n}\n\```\n\n**拆分后（三个函数各司其职）：**\n\```js\nfunction initPage() {\n  renderCards(pieces);\n  bindFilter();\n  showStats(pieces);\n}\n\nfunction renderCards(list) { /* 只负责渲染 */ }\nfunction bindFilter() { /* 只负责筛选逻辑 */ }\nfunction showStats(list) { /* 只负责显示统计 */ }\n\```\n\n现在你可以单独调用 `renderCards(filteredPieces)` 在筛选后重新渲染——这就是拆分的威力！',
      },
      {
        type: "task",
        title: "动手试试 ✨",
        content:
          '编辑器里有一个"音乐会节目单"页面，但所有代码都塞在 `setupPage()` 这一个函数里，足足 40 多行！\n\n**你的任务：** 把 `setupPage()` 拆分成几个小函数：\n\n1. **`renderProgram(list)`** — 负责渲染节目单（接收数组参数，方便筛选后重新渲染）\n2. **`bindFilterButtons()`** — 负责给筛选按钮绑定事件\n3. **`updateCount(count)`** — 负责更新底部统计数字\n4. **`initPage()`** — 只负责调用上面三个函数\n\n拆分后，当你点击筛选按钮时，可以直接调用 `renderProgram(filtered)` 来刷新显示——代码逻辑清晰了 10 倍！',
      },
    ],
    starterCode: {
      html: '<h1>🎻 音乐会节目单</h1>\n\n<div class="toolbar">\n  <button id="allBtn" class="active">全部</button>\n  <button id="baroqueBtn">巴洛克</button>\n  <button id="classicalBtn">古典主义</button>\n</div>\n\n<div id="programList"></div>\n\n<p id="countDisplay" class="stats"></p>',
      css: "h1 {\n  text-align: center;\n  color: #8B2E2E;\n}\n\n.toolbar {\n  display: flex;\n  gap: 8px;\n  justify-content: center;\n  margin: 16px 0;\n}\n\n.toolbar button {\n  padding: 8px 20px;\n  background: #FFFAF2;\n  border: 1px solid #D4C5A9;\n  border-radius: 6px;\n  cursor: pointer;\n  color: #3D2B1F;\n  font-size: 14px;\n  transition: all 0.2s;\n}\n\n.toolbar button:hover {\n  background: #8B2E2E;\n  color: #fff;\n}\n\n.toolbar button.active {\n  background: #8B2E2E;\n  color: #fff;\n  border-color: #8B2E2E;\n}\n\n.card {\n  background: #FFFAF2;\n  border: 1px solid #D4C5A9;\n  border-radius: 10px;\n  padding: 16px 20px;\n  margin-bottom: 8px;\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n}\n\n.card h3 {\n  margin: 0;\n  color: #8B2E2E;\n  font-size: 16px;\n}\n\n.card .period {\n  color: #C9A96E;\n  font-size: 12px;\n  font-weight: 600;\n}\n\n.stats {\n  text-align: center;\n  color: #6B5A4E;\n  margin-top: 16px;\n  font-size: 14px;\n}",
      js: '// 数据\nlet pieces = [\n  { name: "布兰登堡协奏曲", period: "巴洛克", composer: "巴赫" },\n  { name: "G弦上的咏叹调", period: "巴洛克", composer: "巴赫" },\n  { name: "费加罗的婚礼序曲", period: "古典主义", composer: "莫扎特" },\n  { name: "第40号交响曲", period: "古典主义", composer: "莫扎特" },\n  { name: "月光奏鸣曲", period: "古典主义", composer: "贝多芬" }\n];\n\nlet listEl = document.querySelector("#programList");\nlet countEl = document.querySelector("#countDisplay");\n\n// ===== 拆分指南 =====\n// 目标：把下面的大函数拆成 4 个小函数，按这个结构组织：\n//\n// function renderProgram(list) { ... }     ← 接收数组，渲染卡片 HTML\n// function updateCount(n) { ... }           ← 更新底部统计文字\n// function bindFilterButtons() { ... }      ← 给三个筛选按钮绑定事件\n// function initPage() {\n//   renderProgram(pieces);\n//   bindFilterButtons();\n//   updateCount(pieces.length);\n// }\n//\n// 关键技巧：renderProgram(list) 接收参数 list，所以筛选后可以\n// 直接调用 renderProgram(filtered)——不用再复制粘贴渲染代码！\n\n// TODO: 把下面这个"大函数"拆成 4 个小函数\nfunction setupPage() {\n  // ===== 渲染节目单 =====\n  // 这部分应该变成 renderProgram(list) 函数\n  let html = "";\n  for (let i = 0; i < pieces.length; i++) {\n    let p = pieces[i];\n    html += \'<div class="card"><h3>\' + p.name + \'</h3><span class="period">\' + p.composer + \' · \' + p.period + \'</span></div>\';\n  }\n  listEl.innerHTML = html;\n\n  // ===== 更新统计 =====\n  // 这部分应该变成 updateCount(n) 函数\n  countEl.textContent = "共 " + pieces.length + " 首曲目";\n\n  // ===== 绑定筛选按钮 =====\n  // 这部分应该变成 bindFilterButtons() 函数\n  function setActive(btn) {\n    document.querySelectorAll(".toolbar button").forEach(function(b) {\n      b.classList.remove("active");\n    });\n    btn.classList.add("active");\n  }\n\n  document.querySelector("#allBtn").addEventListener("click", function() {\n    setActive(this);\n    // 重新渲染全部 — 拆成函数后就可以直接调用 renderProgram(pieces)！\n    let html = "";\n    for (let i = 0; i < pieces.length; i++) {\n      let p = pieces[i];\n      html += \'<div class="card"><h3>\' + p.name + \'</h3><span class="period">\' + p.composer + \' · \' + p.period + \'</span></div>\';\n    }\n    listEl.innerHTML = html;\n    countEl.textContent = "共 " + pieces.length + " 首曲目";\n  });\n\n  document.querySelector("#baroqueBtn").addEventListener("click", function() {\n    setActive(this);\n    let filtered = pieces.filter(function(p) { return p.period === "巴洛克"; });\n    let html = "";\n    for (let i = 0; i < filtered.length; i++) {\n      let p = filtered[i];\n      html += \'<div class="card"><h3>\' + p.name + \'</h3><span class="period">\' + p.composer + \' · \' + p.period + \'</span></div>\';\n    }\n    listEl.innerHTML = html;\n    countEl.textContent = "共 " + filtered.length + " 首曲目";\n  });\n\n  document.querySelector("#classicalBtn").addEventListener("click", function() {\n    setActive(this);\n    let filtered = pieces.filter(function(p) { return p.period === "古典主义"; });\n    let html = "";\n    for (let i = 0; i < filtered.length; i++) {\n      let p = filtered[i];\n      html += \'<div class="card"><h3>\' + p.name + \'</h3><span class="period">\' + p.composer + \' · \' + p.period + \'</span></div>\';\n    }\n    listEl.innerHTML = html;\n    countEl.textContent = "共 " + filtered.length + " 首曲目";\n  });\n}\n\nsetupPage();',
    },
  },

  // ===== 5.8 workflow-create-element =====
    {
    id: "workflow-create-element",
    chapterId: "js-advanced",
    trackId: "framework",
    order: 8,
    title: 'DOM 动态创建 — 用 JS "凭空造出"页面元素',
    musicAnalogy:
      '用 `innerHTML` 像"复印一整页乐谱"——一次性把全部内容塞进页面，方便但不够精细。`createElement` + `appendChild` 则像"一个音符一个音符地写"——更慢但更精准，你可以单独修改任何一个音符，给它加表情、转调、甚至随时拿掉。',
    listenTo:
      "巴赫《音乐的奉献》— 这首作品中的每一行都是独立的声部线条，精确编织在一起。createElement 就像在五线谱上逐个添加音符——每个音符都可以独立地定位、装饰、甚至移除。",
    sections: [
      {
        type: "explain",
        title: "innerHTML vs createElement",
        content:
          '到目前为止你都是用 `innerHTML` 来渲染内容：\n\n\```js\nlistEl.innerHTML = "<div class=\\"card\\"><h3>" + name + "</h3></div>";\n\```\n\n这种方式像"复印乐谱"——一次性替换全部内容。问题是什么？\n\n1. **会覆盖已有的内容** —— 你无法只"添加一张卡片"，必须重新生成全部卡片\n2. **已绑定的事件会丢失** —— 替换 innerHTML 后，原来的按钮点击事件没了\n3. **字符串拼接容易出错** —— 引号嵌套很痛苦\n\n`createElement` 更精细：\n\n\```js\nlet card = document.createElement("div");  // 创建一个 <div>\ncard.classList.add("card");                 // 加 class="card"\nlet title = document.createElement("h3");\ncard.appendChild(title);                    // 把 h3 放入 div\nlistEl.appendChild(card);                   // 把卡片放入页面\n\```\n\n每个元素都是独立的对象，你可以随时修改、删除、移动它们——就像活页乐谱，可以随时插入一页。',
      },
      {
        type: "explain",
        title: "createElement 五步法",
        content:
          '创建一个元素的标准流程：\n\n**1. 创建元素：** `document.createElement("标签名")`\n\```js\nlet card = document.createElement("div");\n\```\n\n**2. 设置内容：** `.textContent` 或 `.classList.add()`\n\```js\ncard.textContent = "肖邦夜曲";\ncard.classList.add("card");\n\```\n\n**3. 找到容器：** `document.querySelector("...")`\n\```js\nlet list = document.querySelector("#cardList");\n\```\n\n**4. 挂载到页面：** `.appendChild(元素)`\n\```js\nlist.appendChild(card);  // 卡片出现在页面上了！\n\```\n\n**5. 可以继续操作它：** 因为它是一个变量，随时可以修改\n\```js\ncard.style.background = "#FFFAF2";  // 改变背景\ncard.addEventListener("click", function() { ... });  // 加事件\n\```\n\n对比一下：innerHTML 生成的内容是"死"的字符串，createElement 生成的是"活"的对象。',
      },
      {
        type: "task",
        title: "动手试试 ✨",
        content:
          "编辑器里有一个简单的收藏列表。目前它用 innerHTML 渲染卡片。\n\n**你的任务：改写渲染逻辑**\n\n1. 在 JS 中找到使用 `innerHTML` 的地方\n2. 把它改成用 `createElement` + `appendChild` 逐个创建卡片\n3. 每张卡片应该包含：一个 `<div>` 容器、一个 `<h3>` 标题、一个 `<span>` 标签\n4. 确认功能不变——列表应该正常显示\n\n提示：先用循环创建所有卡片，再一次性 appendChild 到容器中。",
      },
    ],
    starterCode: {
      html: '<h1>我的收藏列表</h1>\n\n<div id="cardList"></div>\n\n<div class="add-bar">\n  <button id="addBtn">➕ 添加随机曲目</button>\n</div>',
      css: "h1 {\n  text-align: center;\n  color: #8B2E2E;\n}\n\n#cardList {\n  display: flex;\n  flex-direction: column;\n  gap: 8px;\n  max-width: 400px;\n  margin: 16px auto;\n}\n\n.card {\n  background: #FFFAF2;\n  border: 1px solid #D4C5A9;\n  border-radius: 10px;\n  padding: 16px 20px;\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n}\n\n.card h3 {\n  margin: 0;\n  color: #8B2E2E;\n  font-size: 16px;\n}\n\n.card .tag {\n  color: #C9A96E;\n  font-size: 12px;\n  font-weight: 600;\n}\n\n.add-bar {\n  text-align: center;\n  margin-top: 16px;\n}\n\n#addBtn {\n  padding: 10px 24px;\n  background: #8B2E2E;\n  color: white;\n  border: none;\n  border-radius: 8px;\n  cursor: pointer;\n  font-size: 15px;\n}\n\n#addBtn:hover {\n  background: #C94545;\n}",
      js: '// 曲目数据\nlet pieces = [\n  { name: "布兰登堡协奏曲", period: "巴洛克" },\n  { name: "费加罗的婚礼序曲", period: "古典主义" },\n  { name: "月光奏鸣曲", period: "古典主义" }\n];\n\nlet listEl = document.querySelector("#cardList");\n\n// 当前用 innerHTML 渲染——你的任务：改成 createElement + appendChild\nfunction render() {\n  let html = "";\n  for (let i = 0; i < pieces.length; i++) {\n    html += \'<div class="card"><h3>\' + pieces[i].name + \'</h3><span class="tag">\' + pieces[i].period + \'</span></div>\';\n  }\n  listEl.innerHTML = html;\n}\n\nrender();\n\n// 添加随机曲目\ndocument.querySelector("#addBtn").addEventListener("click", function() {\n  let randomPieces = [\n    { name: "G弦上的咏叹调", period: "巴洛克" },\n    { name: "第40号交响曲", period: "古典主义" },\n    { name: "夜曲 Op.9 No.2", period: "浪漫主义" }\n  ];\n  let pick = randomPieces[Math.floor(Math.random() * randomPieces.length)];\n  pieces.push(pick);\n  render();\n});',
    },
  },

  // ===== 5.9 workflow-event-delegation =====
    {
    id: "workflow-event-delegation",
    chapterId: "js-advanced",
    trackId: "framework",
    order: 9,
    title: '事件委托 — 让"指挥"替你监听每一个"乐手"',
    musicAnalogy:
      '指挥不需要跑到每一位演奏者面前单独说"到你吹了"——演奏者自己看总谱、听音乐，知道什么时候进入。**事件委托**就是这个道理：你不用给每一个元素单独绑定事件，而是把事件绑在父容器上，由父容器来判断"触发者是谁"，做出相应的反应。',
    listenTo:
      '斯特拉文斯基《春之祭》— 庞大的乐队编制中，指挥通过一个手势就能让不同乐器组做出反应。事件委托就像指挥的总览——一个事件绑定覆盖所有动态变化的"乐手"。',
    sections: [
      {
        type: "explain",
        title: "问题：动态创建的元素没有事件",
        content:
          '上一节课你学会了用 `createElement` 动态创建元素。但这里有一个棘手的问题：\n\n\```js\n// 页面初始有 3 张卡片，每张绑定了点击事件\nlet cards = document.querySelectorAll(".card");\ncards.forEach(function(card) {\n  card.addEventListener("click", function() {\n    alert("点击了卡片！");\n  });\n});\n\n// 后来动态添加了一张新卡片\nlet newCard = document.createElement("div");\nnewCard.classList.add("card");\nlistEl.appendChild(newCard);\n// ❌ 新卡片没有点击事件！因为 addEventListener 运行时它还不存在\n\```\n\n这是一个很常见的 bug：**动态添加的元素不会自动继承之前绑定的事件**。',
      },
      {
        type: "explain",
        title: "解决方案：把事件绑在父容器上",
        content:
          '不分别给每张卡片绑事件，而是**给包含所有卡片的父容器绑一个事件**。当子元素被点击时，事件会"冒泡"到父容器：\n\n\```js\n// 给父容器绑定事件（只绑定一次！）\nlistEl.addEventListener("click", function(event) {\n  // event.target 是实际被点击的元素\n  // closest(".card") 向上查找最近的 .card 容器\n  let card = event.target.closest(".card");\n  if (card) {\n    // 找到了！说明点击的是某张卡片\n    card.classList.toggle("highlight");\n  }\n});\n\n// 之后动态添加的卡片也会自动响应，因为事件绑在父容器上！\n\```\n\n这就是**事件委托**——把事件交给父容器代理，不管子元素是初始就有还是后来加的，都能响应。',
      },
      {
        type: "explain",
        title: "关键 API：closest() 和 matches()",
        content:
          '**`event.target`** — 实际被点击的元素（可能是卡片里的 h3、span、甚至卡片本身）\n\n**`.closest("选择器")`** — 从当前元素向上查找最近的匹配祖先\n\```js\nevent.target.closest(".card");  // 总能找到卡片容器，不管点的是里面的 h3 还是 span\n\```\n\n**`.matches("选择器")`** — 判断当前元素是否匹配选择器\n\```js\nif (event.target.matches("button")) {\n  // 点击的是按钮\n}\n\```\n\n**常见模式：用 data 属性区分不同元素**\n\```html\n<button data-action="delete">删除</button>\n<button data-action="like">收藏</button>\n\```\n\```js\nlet action = event.target.dataset.action;  // "delete" 或 "like"\n\```',
      },
      {
        type: "task",
        title: "动手试试 ✨",
        content:
          '编辑器里有一个收藏列表，每张卡片有"❤ 收藏"按钮。目前用 `forEach` 逐个绑定事件——新添加的卡片没有事件。\n\n**你的任务：**\n\n1. 把逐个绑定事件改为事件委托——把 click 事件绑在 `#cardList` 上\n2. 用 `event.target.closest(".like-btn")` 判断点击的是收藏按钮\n3. 确认动态添加的卡片也能正常收藏\n4. （挑战）给每张卡片加一个"删除"按钮，同样用事件委托处理',
      },
    ],
    starterCode: {
      html: '<h1>我的收藏列表</h1>\n\n<div id="cardList">\n  <div class="card">\n    <div class="card-info">\n      <h3>布兰登堡协奏曲</h3>\n      <span class="tag">巴洛克</span>\n    </div>\n    <button class="like-btn">❤ 收藏</button>\n  </div>\n  <div class="card">\n    <div class="card-info">\n      <h3>费加罗的婚礼序曲</h3>\n      <span class="tag">古典主义</span>\n    </div>\n    <button class="like-btn">❤ 收藏</button>\n  </div>\n  <div class="card">\n    <div class="card-info">\n      <h3>月光奏鸣曲</h3>\n      <span class="tag">古典主义</span>\n    </div>\n    <button class="like-btn">❤ 收藏</button>\n  </div>\n</div>\n\n<div class="add-bar">\n  <button id="addBtn">➕ 添加随机曲目</button>\n</div>',
      css: "h1 {\n  text-align: center;\n  color: #8B2E2E;\n}\n\n#cardList {\n  display: flex;\n  flex-direction: column;\n  gap: 8px;\n  max-width: 400px;\n  margin: 16px auto;\n}\n\n.card {\n  background: #FFFAF2;\n  border: 1px solid #D4C5A9;\n  border-radius: 10px;\n  padding: 16px 20px;\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  transition: all 0.3s;\n}\n\n.card.liked {\n  background: #FFF0F0;\n  border-color: #C94545;\n}\n\n.card-info h3 {\n  margin: 0 0 4px 0;\n  color: #8B2E2E;\n  font-size: 16px;\n}\n\n.tag {\n  color: #C9A96E;\n  font-size: 12px;\n  font-weight: 600;\n}\n\n.like-btn {\n  background: transparent;\n  border: 1px solid #D4C5A9;\n  border-radius: 8px;\n  padding: 6px 14px;\n  cursor: pointer;\n  font-size: 14px;\n  color: #6B5A4E;\n  transition: all 0.2s;\n  flex-shrink: 0;\n}\n\n.like-btn:hover {\n  background: #C94545;\n  color: white;\n  border-color: #C94545;\n}\n\n.card.liked .like-btn {\n  background: #C94545;\n  color: white;\n  border-color: #C94545;\n}\n\n.add-bar {\n  text-align: center;\n  margin-top: 16px;\n}\n\n#addBtn {\n  padding: 10px 24px;\n  background: #8B2E2E;\n  color: white;\n  border: none;\n  border-radius: 8px;\n  cursor: pointer;\n  font-size: 15px;\n}\n\n#addBtn:hover {\n  background: #C94545;\n}",
      js: '// ❌ 当前方式：用 forEach 逐个绑定事件\n// 问题：动态添加的卡片不会自动获得点击事件\n// 任务：改成事件委托——只在 #cardList 上绑定一个事件\n\nlet likeBtns = document.querySelectorAll(".like-btn");\nlikeBtns.forEach(function(btn) {\n  btn.addEventListener("click", function() {\n    let card = btn.closest(".card");\n    card.classList.toggle("liked");\n    if (card.classList.contains("liked")) {\n      btn.textContent = "❤ 已收藏";\n    } else {\n      btn.textContent = "❤ 收藏";\n    }\n  });\n});\n\n// 添加随机曲目（新卡片不会有事件！这就是你要修复的问题）\ndocument.querySelector("#addBtn").addEventListener("click", function() {\n  let pieces = [\n    { name: "G弦上的咏叹调", period: "巴洛克" },\n    { name: "第40号交响曲", period: "古典主义" },\n    { name: "夜曲 Op.9 No.2", period: "浪漫主义" }\n  ];\n  let p = pieces[Math.floor(Math.random() * pieces.length)];\n  \n  let listEl = document.querySelector("#cardList");\n  let card = document.createElement("div");\n  card.classList.add("card");\n  card.innerHTML = \'<div class="card-info"><h3>\' + p.name + \'</h3><span class="tag">\' + p.period + \'</span></div><button class="like-btn">❤ 收藏</button>\';\n  listEl.appendChild(card);\n});',
    },
  },

  // ===== 5.10 workflow-data-driven =====
    {
    id: "workflow-data-driven",
    chapterId: "js-advanced",
    trackId: "framework",
    order: 10,
    title: "数据驱动思维 — 改数据就是改页面",
    musicAnalogy:
      '总谱是"数据"，演奏是"渲染"。指挥在总谱上改一个音符，所有乐手下一遍就按新谱子演奏——不需要每个人单独通知。这就是**数据驱动**：你只需要修改数据，然后调用一次渲染函数，页面自动跟上。',
    listenTo:
      '菲利普·格拉斯《玻璃工厂》— 极简主义音乐的核心是"重复的动机在缓慢变化中演化"。每次迭代基于同样的模式（同一个渲染函数），但数据在变——就像渲染循环不断根据新数据刷新页面。',
    sections: [
      {
        type: "explain",
        title: "两种操作 DOM 的思维方式",
        content:
          '你在前面几节课中接触过两种操作页面的方式：\n\n**方式一：命令式（Imperative）—— 直接告诉 DOM "做什么"**\n\```js\n// 添加一项：创建元素、设置内容、挂载到页面\nlet card = document.createElement("div");\ncard.textContent = "肖邦夜曲";\nlistEl.appendChild(card);\n\n// 删除一项：找到元素、调用 remove()\ndocument.querySelector("#card-3").remove();\n\n// 修改一项：找到元素、修改内容\ndocument.querySelector("#card-2 h3").textContent = "新曲名";\n\```\n每一步都要精确操作 DOM。简单直接，但程序复杂时很容易混乱——你需要同时记住"数据在哪"和"DOM 在哪"。\n\n**方式二：声明式（Declarative）—— 告诉程序 "我想要什么"，然后调用渲染函数**\n\```js\nlet pieces = [{ name: "肖邦夜曲" }, { name: "布兰登堡" }];\n\nfunction render(list) {\n  // 清空容器\n  listEl.innerHTML = "";\n  // 根据数据重新生成全部 DOM\n  list.forEach(function(p) {\n    let card = document.createElement("div");\n    card.textContent = p.name;\n    listEl.appendChild(card);\n  });\n}\n\nrender(pieces);  // 初始渲染\n\n// 需要添加时：只修改数据，然后重新渲染\npieces.push({ name: "月光奏鸣曲" });\nrender(pieces);\n\n// 删除、修改——全部一样：先改数据，再 render()\n\```\n\n这就是**数据驱动**——数据是"唯一的真相来源"，页面只是数据的反映。',
      },
      {
        type: "explain",
        title: "为什么框架都用这个模式？",
        content:
          'Vue、React、Angular——所有现代前端框架的核心思想都是**数据驱动视图**。\n\n\```\n数据 (Data)  ──→  渲染函数 (Render)  ──→  页面 (DOM)\n    ↑                                         │\n    └────── 用户操作 (Events) ──────────────────┘\n\```\n\n流程：\n1. **数据变了** → 用户点击、输入、或定时器触发\n2. **重新渲染** → 根据最新数据重新生成 DOM\n3. **页面更新** → 用户看到新内容\n\n框架帮我们做了"自动检测数据变化 + 高效更新 DOM"。但在纯 JS 中，你需要手动调用 `render()`。\n\n理解了这个模式，以后学 Vue 时你会发现：它做的事情一模一样，只是把"手动调 render()"变成了**自动**——你改数据，它自动帮你重新渲染。',
      },
      {
        type: "task",
        title: "动手试试 ✨",
        content:
          '编辑器里有一个"待听列表"页面，用命令式直接操作 DOM。\n\n**你的任务：**\n\n1. 把数据提取成一个 `pieces` 数组\n2. 写一个 `render()` 函数，每次调用时清空容器、重新根据 `pieces` 生成 DOM\n3. "添加"按钮改为：push 到 `pieces`，然后调用 `render()`\n4. "清空"按钮改为：`pieces = []`，然后调用 `render()`\n5. 确认添加和清空功能都正常\n\n完成后你会体会到：修改数据的代码变得非常简洁——所有 DOM 操作都在 `render()` 里，业务逻辑只需要改数据。',
      },
    ],
    starterCode: {
      html: '<h1>📋 待听列表</h1>\n\n<div id="pieceList"></div>\n\n<div class="toolbar">\n  <input id="nameInput" type="text" placeholder="输入曲名...">\n  <button id="addBtn">➕ 添加</button>\n  <button id="clearBtn">🗑 清空全部</button>\n</div>\n\n<p id="count" class="stats"></p>',
      css: "h1 {\n  text-align: center;\n  color: #8B2E2E;\n}\n\n#pieceList {\n  display: flex;\n  flex-direction: column;\n  gap: 8px;\n  max-width: 400px;\n  margin: 16px auto;\n  min-height: 60px;\n}\n\n.piece-item {\n  background: #FFFAF2;\n  border: 1px solid #D4C5A9;\n  border-radius: 8px;\n  padding: 12px 20px;\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  color: #8B2E2E;\n  font-weight: 500;\n}\n\n.piece-item button {\n  background: transparent;\n  color: #C94545;\n  border: 1px solid #D4C5A9;\n  border-radius: 6px;\n  padding: 4px 12px;\n  cursor: pointer;\n  font-size: 13px;\n}\n\n.piece-item button:hover {\n  background: #C94545;\n  color: white;\n}\n\n.toolbar {\n  display: flex;\n  gap: 8px;\n  justify-content: center;\n  margin-top: 16px;\n  align-items: center;\n}\n\n#nameInput {\n  padding: 8px 12px;\n  border: 1px solid #D4C5A9;\n  border-radius: 6px;\n  font-size: 14px;\n  width: 180px;\n  color: #3D2B1F;\n  background: #FFFAF2;\n}\n\n.toolbar button {\n  padding: 8px 16px;\n  border: none;\n  border-radius: 8px;\n  cursor: pointer;\n  font-size: 14px;\n}\n\n#addBtn {\n  background: #8B2E2E;\n  color: white;\n}\n\n#addBtn:hover {\n  background: #C94545;\n}\n\n#clearBtn {\n  background: #6B5A4E;\n  color: white;\n}\n\n.stats {\n  text-align: center;\n  color: #6B5A4E;\n  margin-top: 12px;\n  font-size: 14px;\n}",
      js: '// 当前是命令式——直接操作 DOM。你的任务：改成数据驱动模式\n\nlet listEl = document.querySelector("#pieceList");\nlet nameInput = document.querySelector("#nameInput");\nlet countEl = document.querySelector("#count");\n\n// 添加曲目（命令式——直接创建元素）\ndocument.querySelector("#addBtn").addEventListener("click", function() {\n  let name = nameInput.value.trim();\n  if (!name) return;\n\n  let item = document.createElement("div");\n  item.classList.add("piece-item");\n  item.innerHTML = name + \' <button class="del-btn">✕</button>\';\n\n  // 给删除按钮绑定事件\n  item.querySelector(".del-btn").addEventListener("click", function() {\n    item.remove();\n    updateCount();\n  });\n\n  listEl.appendChild(item);\n  nameInput.value = "";\n  updateCount();\n});\n\n// 清空全部\ndocument.querySelector("#clearBtn").addEventListener("click", function() {\n  listEl.innerHTML = "";\n  updateCount();\n});\n\nfunction updateCount() {\n  countEl.textContent = "共 " + listEl.children.length + " 首曲目";\n}\n\nupdateCount();',
    },
  },

  // ===== 5.11 js-es6-syntax =====
    {
    id: "js-es6-syntax",
    chapterId: "js-advanced",
    trackId: "framework",
    order: 11,
    title: 'ES6 新语法 — 让代码更优雅的"新乐器"',
    musicAnalogy:
      '就像现代音乐加入了电声乐器让表现力更丰富，ES6（ECMAScript 2015）为 JavaScript 带来了更简洁、更强大的语法。用这些新"乐器"，你可以用更少的音符写出更丰富的旋律。',
    listenTo:
      "德彪西《意象集》— 印象派用新的和声语言打破了传统规则，正如 ES6 用新语法改变了 JavaScript 的写法。",
    sections: [
      {
        type: "explain",
        title: "为什么需要新语法？",
        content:
          '在 JS 基础篇中，你学会了用 `var` 声明变量、用 `function` 定义函数。但 JavaScript 一直在进化——2015 年发布的 ES6 是一次"革命性升级"。\n\nES6 引入了：\n- `let` 和 `const`：替代 `var`，更安全\n- 箭头函数：更简洁的函数写法\n- 解构赋值：优雅地从对象/数组中取值\n- 模板字符串：用反引号（[[html]]<code class="inline-code">`</code>[[/html]]）拼接字符串\n- 展开运算符：`...` 展开数组和对象\n\n这些新语法让代码**更短、更清晰、更不容易出错**。',
      },
      {
        type: "example",
        title: '解构赋值 — 从"抽屉"里取东西',
        content:
          "想象你有一个乐谱夹，里面有多首曲子。以前你要一首一首拿：\n\n\```js\n// 旧写法\nconst piece1 = pieces[0]\nconst piece2 = pieces[1]\nconst piece3 = pieces[2]\n\```\n\n解构赋值让你一次取出：\n\n\```js\n// 数组解构\nconst [piece1, piece2, piece3] = pieces\n\n// 对象解构\nconst { name, composer, period } = piece\n\```\n\n就像从谱架上一次取下三本乐谱——整齐又高效。",
      },
      {
        type: "example",
        title: '箭头函数 — 精简的"旋律线"',
        content:
          "箭头函数是 `function` 的简写版：\n\n\```js\n// 旧写法\nconst double = function(x) {\n  return x * 2\n}\n\n// 箭头函数\nconst double = x => x * 2\n\n// 多行逻辑用花括号\nconst greet = name => {\n  const message = '你好，' + name\n  return message\n}\n\```\n\n箭头函数就像用连音线简化了分散的音符——同样的旋律，更干净的记谱。",
      },
      {
        type: "example",
        title: "展开运算符 — 拆包与合并",
        content:
          "`...` 像一只手，可以把数组/对象\"展开\"：\n\n\```js\n// 合并数组\nconst classical = ['巴赫', '莫扎特']\nconst romantic = ['肖邦', '李斯特']\nconst all = [...classical, ...romantic]\n// ['巴赫', '莫扎特', '肖邦', '李斯特']\n\n// 复制对象并修改\nconst piece = { name: '月光', composer: '贝多芬' }\nconst updated = { ...piece, period: '古典主义' }\n\```\n\n就像把两个乐团的乐手合并成一个更大的乐团——不改变原来的，创造一个新的。",
      },
      {
        type: "task",
        title: "动手试试 ✨",
        content:
          "请在右侧编辑器中完成以下练习：\n\n1. 用**解构赋值**从 `instrument` 对象中取出 `name`、`family`、`range`\n2. 用**箭头函数**重写 `describe` 函数（用模板字符串返回描述）\n3. 用**展开运算符**给 `instrument` 添加一个 `players` 属性\n\n点击运行，看看你的输出是否和预期一致。",
      },
      {
        type: "hint",
        title: "小提示",
        content:
          '- 对象解构：`const { name, family } = instrument`\n- 箭头函数：`const fn = (param) => { return ... }`\n- 展开对象：`const newObj = { ...oldObj, newKey: value }`\n- 模板字符串用反引号包裹：[[html]]<code class="inline-code">`乐器：${name}`</code>[[/html]]',
      },
    ],
    starterCode: {
      html: "",
      css: "",
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
    mode: "sandbox",
  },

  // ===== 5.12 js-error-handling =====
    {
    id: "js-error-handling",
    chapterId: "js-advanced",
    trackId: "framework",
    order: 12,
    title: '错误处理 — 给代码上"保险"',
    musicAnalogy:
      '演奏中难免出错（碰错音、进错拍），好乐手知道如何处理——继续演奏而不是停下来。编程也一样：错误一定会发生，关键是优雅地处理它们，而不是让整个程序"戛然而止"。',
    listenTo:
      '爵士乐即兴演奏 — 爵士乐手最擅长的就是在"错误"中找到新的旋律。一个"错音"可以被变成经过音，编程中的错误也可以被优雅地化解。',
    sections: [
      {
        type: "explain",
        title: "什么会出错？",
        content:
          "在之前的学习中，你可能遇到过这些情况：\n\n- 点击按钮没反应（JS 报错了，后面的代码不执行）\n- 页面白屏（一个错误导致整个脚本崩溃）\n- 数据加载失败（网络问题、API 挂了）\n\n就像一个乐团的定音鼓手突然缺席，指挥需要有后备方案。程序中，我们用 **try/catch** 来应对。",
      },
      {
        type: "example",
        title: 'try/catch — "排练一下，看看会不会出错"',
        content:
          "基本结构：\n\n\```js\ntry {\n  // 尝试执行可能有风险的代码\n  const data = JSON.parse(userInput)\n  console.log('解析成功：', data)\n} catch (error) {\n  // 如果出错，在这里处理\n  console.log('解析失败，请输入合法的 JSON')\n  console.log('错误详情：', error.message)\n}\n\```\n\n**try** 说\"试试这段代码\"。**catch** 说\"如果出错了，执行这段\"。\n\n就像排练时你标记出可能出错的地方，想好补救方案。",
      },
      {
        type: "example",
        title: 'throw — 主动"喊停"',
        content:
          "有时候你需要主动抛出错误：\n\n\```js\nfunction setVolume(level) {\n  if (level < 0 || level > 100) {\n    throw new Error('音量必须在 0-100 之间')\n  }\n  console.log('音量设置为：' + level)\n}\n\ntry {\n  setVolume(150)  // 这会触发错误\n} catch (e) {\n  console.log('设置失败：' + e.message)\n}\n\```\n\n`throw` 就像指挥突然停下乐队：\"不对，长号声音太大了！\"——主动发现并指出问题。",
      },
      {
        type: "example",
        title: "实际场景：localStorage 读取",
        content:
          "`localStorage` 读取时经常出错（数据损坏、格式不对）：\n\n\```js\nfunction loadCollection() {\n  try {\n    const raw = localStorage.getItem('my-collection')\n    if (!raw) return []  // 没有数据，返回空数组\n    const data = JSON.parse(raw)\n    if (!Array.isArray(data)) throw new Error('数据格式错误')\n    return data\n  } catch (e) {\n    console.log('读取收藏失败，已重置：', e.message)\n    return []  // 出错就返回空数组，程序不崩溃\n  }\n}\n\```\n\n这就是\"防御性编程\"——假设任何可能出错的地方都会出错，提前做好准备。",
      },
      {
        type: "task",
        title: "动手试试 ✨",
        content:
          "编辑器中有一个不完整的 `safeParse` 函数。请完成以下任务：\n\n1. 用 `try/catch` 包裹 `JSON.parse` 的调用\n2. 如果解析失败，在 catch 中返回 `{ error: true, message: error.message }`\n3. 如果解析成功，返回解析后的对象\n\n测试你的函数：分别传入合法 JSON 和非法 JSON，观察输出。",
      },
      {
        type: "hint",
        title: "提示",
        content:
          "\```js\nfunction safeParse(str) {\n  try {\n    const result = JSON.parse(str)\n    return result  // 成功则返回解析结果\n  } catch (e) {\n    return { error: true, message: e.message }  // 失败返回错误对象\n  }\n}\n\```",
      },
    ],
    starterCode: {
      html: "",
      css: "",
      js: `// 请完成 safeParse 函数
function safeParse(str) {
  // TODO: 用 try/catch 实现安全解析
}

// 测试
console.log('合法 JSON：', safeParse('{"name": "月光", "composer": "贝多芬"}'))
console.log('非法 JSON：', safeParse('这不是JSON'))`,
    },
    mode: "sandbox",
  },

  // ================================================================
  // 第六章：异步与数据
  // ================================================================

  // ===== 6.1 workflow-localstorage =====
    {
    id: "workflow-localstorage",
    chapterId: "async-data",
    trackId: "framework",
    order: 1,
    title: 'localStorage — 给数据一个"永久的家"',
    musicAnalogy:
      '每次排练结束后，乐谱不会消失——它被归档保存，下次排练时翻出来继续用。**localStorage** 就是浏览器的"归档柜"：你把数据存进去，刷新页面、关闭浏览器、甚至重启电脑后，数据还在那里等你。',
    listenTo:
      "舒伯特《冬之旅》— 这部声乐套曲讲述一个流浪者的旅程，每首歌都是旅途的一段记忆。localStorage 就像主人公的日记——旅程中的每一个足迹都被保存下来，刷新页面就像翻开新的一页，但记忆永远保留。",
    sections: [
      {
        type: "explain",
        title: "为什么需要 localStorage？",
        content:
          '目前你写的所有页面都有一个共同的问题：**刷新页面后，所有数据都丢失了**。\n\n收藏的曲目？没了。输入的列表？清空了。计数器？归零了。\n\n这是因为 JavaScript 变量只存在于**当前页面会话**中。刷新页面等于重新开始——所有变量重新初始化。\n\n`localStorage` 解决的就是这个问题：它把数据存在浏览器里，和页面会话无关。\n\n\```js\n// 存数据\nlocalStorage.setItem("userName", "小雅");\n\n// 取数据（刷新页面后依然能读到！）\nlet name = localStorage.getItem("userName");  // "小雅"\n\n// 删数据\nlocalStorage.removeItem("userName");\n\n// 清空全部\nlocalStorage.clear();\n\```',
      },
      {
        type: "explain",
        title: "存储复杂数据：JSON.stringify 和 JSON.parse",
        content:
          'localStorage 只能存储**字符串**。如果你要存数组或对象，需要用 JSON 转换：\n\n\```js\n// 存对象/数组：先用 JSON.stringify 转成字符串\nlet pieces = [\n  { name: "布兰登堡协奏曲", period: "巴洛克" },\n  { name: "夜曲 Op.9 No.2", period: "浪漫主义" }\n];\nlocalStorage.setItem("myPieces", JSON.stringify(pieces));\n\n// 取对象/数组：先用 JSON.parse 转回对象\nlet saved = JSON.parse(localStorage.getItem("myPieces"));\n// saved 现在是真正的数组，可以正常使用！\nconsole.log(saved[0].name);  // "布兰登堡协奏曲"\n\```\n\n**常用模式：加载 + 保存**\n\```js\n// 页面启动时：尝试从 localStorage 加载数据\nlet pieces = JSON.parse(localStorage.getItem("myPieces")) || [];\n\nfunction saveData() {\n  localStorage.setItem("myPieces", JSON.stringify(pieces));\n}\n\n// 每次修改数据后调用 saveData()\npieces.push(newPiece);\nsaveData();\nrender(pieces);\n\```\n\n> 💡 提示：`localStorage.getItem` 返回 `null` 如果 key 不存在，所以用 `|| []` 给一个默认值。',
      },
      {
        type: "task",
        title: "动手试试 ✨",
        content:
          '编辑器里有一个收藏列表页面。和以前一样——刷新后数据就没了。\n\n**你的任务：给它加上持久化**\n\n1. 页面启动时，从 localStorage 加载数据（用 `JSON.parse`）\n2. 写一个 `saveData()` 函数，把 `pieces` 数组存入 localStorage（用 `JSON.stringify`）\n3. 每次添加或删除曲目后，调用 `saveData()`\n4. 刷新页面——你的收藏还在！\n\n验证：添加几首曲目 → 刷新浏览器 → 数据还在。这感觉就像第一次"拥有了"自己写的页面。',
      },
    ],
    starterCode: {
      html: '<h1>🎵 持久化收藏</h1>\n\n<div id="pieceList"></div>\n\n<div class="toolbar">\n  <input id="nameInput" type="text" placeholder="输入曲名...">\n  <input id="periodInput" type="text" placeholder="时期（如：巴洛克）">\n  <button id="addBtn">➕ 添加</button>\n  <button id="clearBtn">🗑 清空全部</button>\n</div>\n\n<p id="count" class="stats"></p>',
      css: "h1 {\n  text-align: center;\n  color: #8B2E2E;\n}\n\n#pieceList {\n  display: flex;\n  flex-direction: column;\n  gap: 8px;\n  max-width: 420px;\n  margin: 16px auto;\n  min-height: 60px;\n}\n\n.card {\n  background: #FFFAF2;\n  border: 1px solid #D4C5A9;\n  border-radius: 8px;\n  padding: 12px 20px;\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n}\n\n.card-info h3 {\n  margin: 0 0 2px 0;\n  color: #8B2E2E;\n  font-size: 15px;\n}\n\n.card-info .tag {\n  color: #C9A96E;\n  font-size: 12px;\n  font-weight: 600;\n}\n\n.card button {\n  background: transparent;\n  color: #C94545;\n  border: 1px solid #D4C5A9;\n  border-radius: 6px;\n  padding: 4px 12px;\n  cursor: pointer;\n  font-size: 13px;\n  flex-shrink: 0;\n}\n\n.card button:hover {\n  background: #C94545;\n  color: white;\n}\n\n.toolbar {\n  display: flex;\n  gap: 6px;\n  justify-content: center;\n  margin-top: 16px;\n  align-items: center;\n  flex-wrap: wrap;\n}\n\n.toolbar input {\n  padding: 8px 12px;\n  border: 1px solid #D4C5A9;\n  border-radius: 6px;\n  font-size: 14px;\n  width: 140px;\n  color: #3D2B1F;\n  background: #FFFAF2;\n}\n\n.toolbar button {\n  padding: 8px 16px;\n  border: none;\n  border-radius: 8px;\n  cursor: pointer;\n  font-size: 14px;\n}\n\n#addBtn {\n  background: #8B2E2E;\n  color: white;\n}\n\n#addBtn:hover {\n  background: #C94545;\n}\n\n#clearBtn {\n  background: #6B5A4E;\n  color: white;\n}\n\n.stats {\n  text-align: center;\n  color: #6B5A4E;\n  margin-top: 12px;\n  font-size: 14px;\n}",
      js: '// 收藏列表 —— 刷新后会丢失数据\n// 你的任务：用 localStorage 让它持久化\n\nlet pieces = [\n  { name: "布兰登堡协奏曲", period: "巴洛克" },\n  { name: "费加罗的婚礼序曲", period: "古典主义" }\n];\n\nlet listEl = document.querySelector("#pieceList");\nlet nameInput = document.querySelector("#nameInput");\nlet periodInput = document.querySelector("#periodInput");\nlet countEl = document.querySelector("#count");\n\n// 提示：先写 saveData() 和 loadData() 函数\n// function saveData() { localStorage.setItem("myPieces", JSON.stringify(pieces)); }\n// function loadData() { ... pieces = JSON.parse(localStorage.getItem("myPieces")) || defaultPieces; }\n\nfunction render() {\n  listEl.innerHTML = "";\n  pieces.forEach(function(p) {\n    let card = document.createElement("div");\n    card.classList.add("card");\n    card.innerHTML = \'<div class="card-info"><h3>\' + p.name + \'</h3><span class="tag">\' + p.period + \'</span></div><button class="del-btn">✕</button>\';\n    card.querySelector(".del-btn").addEventListener("click", function() {\n      pieces = pieces.filter(function(item) { return item !== p; });\n      render();\n      updateCount();\n      // 提示：删了数据记得 saveData()！\n    });\n    listEl.appendChild(card);\n  });\n  updateCount();\n}\n\nfunction updateCount() {\n  countEl.textContent = "共 " + pieces.length + " 首曲目";\n}\n\n// 添加\ndocument.querySelector("#addBtn").addEventListener("click", function() {\n  let name = nameInput.value.trim();\n  let period = periodInput.value.trim() || "未知";\n  if (!name) return;\n  pieces.push({ name: name, period: period });\n  render();\n  // 提示：加了数据记得 saveData()！\n  nameInput.value = "";\n  periodInput.value = "";\n});\n\n// 清空\ndocument.querySelector("#clearBtn").addEventListener("click", function() {\n  pieces = [];\n  render();\n  // 提示：清空了记得 saveData()！\n});\n\nrender();',
    },
  },

  // ===== 6.2 async-event-loop =====
    {
    id: "async-event-loop",
    chapterId: "async-data",
    trackId: "framework",
    order: 2,
    title: '事件循环 — JavaScript 的"指挥家"',
    musicAnalogy:
      '交响乐团的指挥决定了哪个声部何时进入——小提琴先起，然后木管加入，最后铜管收尾。JavaScript 也有一个"指挥家"叫 Event Loop（事件循环），它决定了代码的执行顺序：谁先上场，谁等着，谁最后谢幕。',
    listenTo:
      '拉威尔《波莱罗》— 同一段旋律在不同乐器间依次传递，每种乐器依次"异步"进入，完美诠释了顺序与调度的美感。',
    sections: [
      {
        type: "explain",
        title: 'JavaScript 是"单线程"的',
        content:
          'JavaScript 一次只能做一件事（单线程），就像你一个人没法同时弹钢琴和拉小提琴。\n\n但浏览器不是只有 JS 引擎——它还有 Web API（定时器、网络请求等）。JS 把耗时任务"外包"给 Web API，自己继续执行后面的代码。\n\n任务完成后，Web API 把回调函数放进**任务队列**，Event Loop 检查主线程空闲了，就把队列里的任务取出来执行。\n\n**直观流程：**\n\```\n调用栈（主线程） → 遇到异步任务 → 交给 Web API\n                                    ↓\n主线程继续执行        Web API 完成后 → 任务队列\n                                    ↓\n主线程空闲 ← Event Loop 调度 ← 任务队列\n\```',
      },
      {
        type: "example",
        title: 'setTimeout 不是"暂停"',
        content:
          "看这段代码的执行顺序：\n\n\```js\nconsole.log('① 开始演奏')\n\nsetTimeout(() => {\n  console.log('③ 定音鼓进入')\n}, 1000)\n\nconsole.log('② 弦乐继续')\n\```\n\n输出顺序是：① → ② → ③\n\n即使 `setTimeout` 的延迟是 0，结果也是 ① → ② → ③：\n\n\```js\nconsole.log('① 开始')\nsetTimeout(() => console.log('③ 异步回调'), 0)\nconsole.log('② 继续')\n\```\n\n因为 `setTimeout` 的回调**一定会等**主线程的同步代码全部执行完才运行。就像指挥不会在小提琴拉到一半时突然让定音鼓插入。",
      },
      {
        type: "example",
        title: "生活中的类比",
        content:
          "你去咖啡店点一杯拿铁：\n\n1. 你点单（同步代码）\n2. 咖啡师开始做咖啡（交给 Web API）\n3. 你拿到取餐号，去旁边等着（JS 继续执行）\n4. 咖啡做好了，叫号（回调进任务队列）\n5. 你去取咖啡（Event Loop 调度执行回调）\n\n你不会站在柜台前干等咖啡师做完——那太浪费时间了。JS 也一样，不会卡住等异步任务。",
      },
      {
        type: "task",
        title: "动手试试 ✨",
        content:
          "请预测以下代码的输出顺序，然后在编辑器中运行验证：\n\n\```js\nconsole.log('A: 序曲')\n\nsetTimeout(() => console.log('C: 第二乐章'), 500)\nsetTimeout(() => console.log('D: 第三乐章'), 0)\n\nconsole.log('B: 第一乐章')\n\```\n\n你的预测是什么？实际输出是否一致？想想为什么 D 在 C 之前。\n\n> 💡 **提示**：代码使用 `console.log` 输出结果，请在预览区**右键 → 检查**（或按 F12），切换到 **Console（控制台）** 面板查看输出。",
      },
      {
        type: "hint",
        title: "理解要点",
        content:
          "核心规则：**同步代码优先于异步回调**。即使 `setTimeout(fn, 0)`，`fn` 也要等所有同步代码跑完。因为回调必须先进任务队列，而 Event Loop 只有在调用栈清空后才会去取任务队列里的任务。",
      },
    ],
    starterCode: {
      html: "",
      css: "",
      js: `console.log('A: 序曲')

setTimeout(() => console.log('C: 第二乐章'), 500)
setTimeout(() => console.log('D: 第三乐章'), 0)

console.log('B: 第一乐章')

// 你的预测顺序：_______
// 实际运行后，理解为什么是这个顺序`,
    },
    mode: "sandbox",
  },

  // ===== 6.3 async-promise =====
    {
    id: "async-promise",
    chapterId: "async-data",
    trackId: "framework",
    order: 3,
    title: 'Promise — 给异步操作一个"承诺"',
    musicAnalogy:
      '你预订了一张音乐会门票——你拿到了一个"承诺"（Promise）。这个承诺可能兑现（拿到票），也可能落空（售罄）。在结果出来之前，你可以继续做其他事。Promise 就是 JavaScript 给异步操作的结果打的"包票"。',
    listenTo:
      '舒伯特《未完成交响曲》— 这部作品只有两个乐章，却"完成"了震撼人心的表达。Promise 也有三种状态——进行中（pending）、兑现（fulfilled）、拒绝（rejected），每一种都是合理的。',
    sections: [
      {
        type: "explain",
        title: "回调地狱 → Promise",
        content:
          "如果用传统的回调嵌套处理多个异步操作，代码会变成\"金字塔\"：\n\n\```js\n// 回调地狱 💀\ngetUser(id, (user) => {\n  getOrders(user.id, (orders) => {\n    getDetails(orders[0].id, (details) => {\n      console.log(details)\n    })\n  })\n})\n\```\n\nPromise 用链式调用拉平了结构：\n\n\```js\n// Promise 链式调用 ✨\ngetUser(id)\n  .then(user => getOrders(user.id))\n  .then(orders => getDetails(orders[0].id))\n  .then(details => console.log(details))\n  .catch(err => console.log('出错了：', err))\n\```\n\n就像从复杂的多声部对位变成了清晰的主旋律加伴奏。",
      },
      {
        type: "example",
        title: "Promise 的三种状态",
        content:
          "一个 Promise 有三种状态：\n\n| 状态 | 含义 | 音乐比喻 |\n|------|------|----------|\n| pending | 等待结果 | 乐团正在调音，还没开始 |\n| fulfilled | 成功完成 | 演奏完美落幕，掌声响起 |\n| rejected | 失败了 | 小提琴断弦，需要调整 |\n\n\```js\nconst ticket = new Promise((resolve, reject) => {\n  const available = Math.random() > 0.3  // 70% 概率有票\n  setTimeout(() => {\n    if (available) {\n      resolve('🎫 订票成功！座位号：A-12')\n    } else {\n      reject('😞 抱歉，已售罄')\n    }\n  }, 1000)\n})\n\nticket\n  .then(msg => console.log(msg))   // 成功走这里\n  .catch(err => console.log(err))  // 失败走这里\n\```",
      },
      {
        type: "example",
        title: ".then() 的链式传递",
        content:
          "`.then()` 每次都返回一个新的 Promise，所以可以一直 `.then()` 下去——就像多米诺骨牌。\n\n\```js\nfetchUserId('小明')\n  .then(id => fetchUserInfo(id))      // 返回新 Promise\n  .then(info => fetchFavorites(info))  // 再返回新 Promise\n  .then(favs => console.log('喜欢的曲子：', favs))\n  .catch(err => console.log('某一步失败了：', err))\n\```\n\n关键点：`.catch()` 会捕获链上**任何一步**的错误。就像一张安全网——不管哪个环节出问题，都能兜住。",
      },
      {
        type: "task",
        title: "动手试试 ✨",
        content:
          '编辑器中有一个模拟的 `searchMusic(keyword)` 函数。请完成：\n\n1. 调用 `searchMusic(\'月光\')` 返回一个 Promise\n2. 用 `.then()` 处理成功结果\n3. 用 `.catch()` 处理错误\n4. 链式调用：搜索"月光"→ 拿到结果后搜索"贝多芬"（返回新的 Promise）',
      },
      {
        type: "hint",
        title: "提示",
        content:
          "\```js\nsearchMusic('月光')\n  .then(result => {\n    console.log('第一次搜索：', result)\n    return searchMusic('贝多芬')  // 返回新的 Promise\n  })\n  .then(result => console.log('第二次搜索：', result))\n  .catch(err => console.log('搜索失败：', err))\n\```",
      },
    ],
    starterCode: {
      html: "",
      css: "",
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
    mode: "sandbox",
  },

  // ===== 6.4 async-await =====
    {
    id: "async-await",
    chapterId: "async-data",
    trackId: "framework",
    order: 4,
    title: 'async/await — 让异步代码"看起来同步"',
    musicAnalogy:
      "Promise 的 `.then()` 链条就像看乐谱上的分谱——你要顺着每个声部找下去。而 async/await 就像看总谱——所有声部一目了然，从上到下顺序阅读，但实际演奏是同时发生的。",
    listenTo:
      '莫扎特《费加罗的婚礼》序曲 — 短短 4 分钟，多个主题自然流畅地衔接，听感上浑然一体。async/await 让异步代码也有这种"行云流水"的阅读体验。',
    sections: [
      {
        type: "explain",
        title: "async/await 是什么？",
        content:
          "`async/await` 是 Promise 的\"语法糖\"——底层还是 Promise，但写起来像同步代码。\n\n\```js\n// Promise 写法\nfunction getMusicInfo() {\n  return fetchUser('小明')\n    .then(user => fetchFavorites(user.id))\n    .then(favs => console.log(favs))\n}\n\n// async/await 写法\nasync function getMusicInfo() {\n  const user = await fetchUser('小明')\n  const favs = await fetchFavorites(user.id)\n  console.log(favs)\n}\n\```\n\n`async` 标记函数是异步的，`await` 等待 Promise 的结果。代码从上到下读，逻辑清晰。",
      },
      {
        type: "example",
        title: "错误处理：try/catch 回归",
        content:
          "用 async/await 时，错误处理回到了熟悉的 try/catch：\n\n\```js\nasync function loadMusicData() {\n  try {\n    const user = await fetchUser('小明')\n    const favs = await fetchFavorites(user.id)\n    const details = await fetchDetails(favs[0].id)\n    console.log('加载成功：', details)\n  } catch (error) {\n    console.log('加载失败：', error.message)\n    // 可以在这里显示友好的错误提示\n  }\n}\n\```\n\n这就是为什么学错误处理（上一章）很重要——async/await 中 try/catch 是最佳实践。",
      },
      {
        type: "example",
        title: "并行 vs 串行",
        content:
          "注意：`await` 是**串行**的（一个接一个等）。如果两个请求互不依赖，应该**并行**：\n\n\```js\n// ❌ 串行：总要 2000ms（每个 1000ms）\nconst result1 = await fetchOne()   // 等 1000ms\nconst result2 = await fetchTwo()   // 再等 1000ms\n\n// ✅ 并行：只要 1000ms（同时进行）\nconst [result1, result2] = await Promise.all([\n  fetchOne(),\n  fetchTwo()\n])\n\```\n\n`Promise.all()` 就像指挥同时给弦乐和管乐起拍——一起开始，一起等。",
      },
      {
        type: "task",
        title: "动手试试 ✨",
        content:
          "编辑器中有一个 `delay(ms)` 工具函数和两个模拟 API。请完成 `loadConcert` 函数：\n\n1. 用 `async/await` 写法\n2. 先获取演出信息 `fetchConcert()`\n3. 再根据演出 ID 获取曲目单 `fetchProgram(concertId)`\n4. 用 try/catch 处理可能的错误\n5. 返回完整的 `{ concert, program }` 对象",
      },
      {
        type: "hint",
        title: "提示",
        content:
          "\```js\nasync function loadConcert() {\n  try {\n    const concert = await fetchConcert()\n    const program = await fetchProgram(concert.id)\n    return { concert, program }\n  } catch (e) {\n    console.log('加载出错：', e.message)\n    return null\n  }\n}\n\```",
      },
    ],
    starterCode: {
      html: "",
      css: "",
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
    mode: "sandbox",
  },

  // ===== 6.5 async-fetch =====
    {
    id: "async-fetch",
    chapterId: "async-data",
    trackId: "framework",
    order: 5,
    title: 'fetch — 与"外面的世界"对话',
    musicAnalogy:
      '至此你的音乐都在自己的琴房里。现在，打开窗户——听听外面的音乐，或者把你的琴声传出去。**fetch()** 就是这扇窗户：让 JavaScript 能和互联网上的服务器"对话"。',
    listenTo:
      '贝多芬《第五交响曲》第一乐章 — 那著名的"命运敲门声"，短短四个音就传递了强大的信息。fetch 请求也如此：一个简单的 GET 请求，就能带回丰富的数据。',
    sections: [
      {
        type: "explain",
        title: "什么是 HTTP 请求？",
        content:
          '每次你打开网页，浏览器都在发 HTTP 请求：\n\n- **GET**：获取数据（"请给我这份乐谱"）\n- **POST**：提交数据（"这是我新写的曲子，请保存"）\n- **PUT/PATCH**：更新数据（"修改第三小节的音符"）\n- **DELETE**：删除数据（"删掉这首练习曲"）\n\n`fetch()` 是浏览器内置的函数，用来发送这些请求。它返回一个 Promise，所以可以和 async/await 配合使用。',
      },
      {
        type: "example",
        title: "你的第一个 fetch",
        content:
          "\```js\n// GET 请求：获取数据\nasync function getPieces() {\n  const response = await fetch('https://api.example.com/pieces')\n  if (!response.ok) {\n    throw new Error('请求失败：' + response.status)\n  }\n  const data = await response.json()  // 把 JSON 转成 JS 对象\n  console.log('获取到的曲目：', data)\n  return data\n}\n\```\n\n**两个 await：** 第一个等网络响应，第二个等 JSON 解析。\n\n就像你先收到一个包裹（response），然后拆开包裹看里面的内容（.json()）。",
      },
      {
        type: "example",
        title: "POST 请求：发送数据",
        content:
          "\```js\nasync function addPiece(piece) {\n  const response = await fetch('https://api.example.com/pieces', {\n    method: 'POST',\n    headers: {\n      'Content-Type': 'application/json'\n    },\n    body: JSON.stringify(piece)  // JS 对象 → JSON 字符串\n  })\n  if (!response.ok) throw new Error('添加失败')\n  const newPiece = await response.json()\n  console.log('新增成功：', newPiece)\n}\n\n// 使用\naddPiece({ name: '雨滴', composer: '肖邦', period: '浪漫主义' })\n\```\n\nPOST 类似寄信——你需要写地址（URL）、贴邮票（headers）、装信封（body）。",
      },
      {
        type: "example",
        title: 'HTTP 状态码 — 服务器的"回应"',
        content:
          "服务器会返回一个状态码，告诉请求的结果：\n\n| 状态码 | 含义 | 比喻 |\n|--------|------|------|\n| 200 | OK | 演奏完美落幕 |\n| 201 | Created | 新曲子诞生 |\n| 404 | Not Found | 乐谱找不到了 |\n| 500 | Server Error | 乐团出状况了 |\n\n`response.ok` 在状态码 200-299 时为 true，否则为 false。拿到 response 后应该先检查 `ok`。",
      },
      {
        type: "task",
        title: "动手试试 ✨",
        content:
          "编辑器中有一个公开的测试 API。请完成 `getPosts` 函数：\n\n1. 用 `fetch` 请求 `https://jsonplaceholder.typicode.com/posts`\n2. 检查 `response.ok`，失败则抛出错误\n3. 用 `response.json()` 解析数据\n4. 只返回前 3 条数据\n\n> 这是一个免费的测试 API，你可以真实地发送请求！",
      },
      {
        type: "hint",
        title: "提示",
        content:
          "记得：`fetch` 需要 await，`response.json()` 也需要 await。别忘了用 try/catch 包裹。",
      },
    ],
    starterCode: {
      html: "",
      css: "",
      js: `// TODO: 完成 getPosts 函数，获取并返回前3条数据
async function getPosts() {
  // 在这里写代码
}

// 测试
getPosts()
  .then(posts => console.log('获取到的数据：', posts))
  .catch(err => console.log('出错了：', err.message))`,
    },
    mode: "sandbox",
  },

  // ===== 6.6 async-api-client =====
    {
    id: "async-api-client",
    chapterId: "async-data",
    trackId: "framework",
    order: 6,
    title: '封装 API 客户端 — 打造你的"专属乐务"',
    musicAnalogy:
      "专业乐团有乐务（stage manager），负责处理所有后勤——联系场地、安排排练、协调乐器。你不会让指挥跑去订盒饭。同样，把所有的 fetch 逻辑封装到专门的 API 模块中，让代码各司其职。",
    listenTo:
      '柴可夫斯基《胡桃夹子》— 每个角色（糖梅仙子、花之圆舞曲、俄罗斯舞曲）都有明确的"职责"，合在一起却有统一的风格。好的 API 模块设计也是如此。',
    sections: [
      {
        type: "explain",
        title: "为什么需要封装？",
        content:
          "之前我们把 fetch 直接写在业务逻辑里。随着项目变大，问题来了：\n\n- 每个接口都要重复写 `fetch(BASE_URL + '/...')`\n- 每个请求都要重复检查 `response.ok`\n- 基础 URL 改了要改几十处\n- 没有统一的错误处理\n\n**解决方式：** 创建一个 `apiClient` 模块，统一管理所有请求。",
      },
      {
        type: "example",
        title: "基础 API 客户端",
        content:
          "\```js\n// api.js — 你的\"乐务\"\nconst BASE_URL = 'https://api.example.com'\n\nasync function request(path, options = {}) {\n  const url = BASE_URL + path\n  const response = await fetch(url, {\n    headers: {\n      'Content-Type': 'application/json',\n      ...options.headers  // 合并自定义 headers\n    },\n    ...options\n  })\n  if (!response.ok) {\n    throw new Error(\\`请求失败：\\${response.status}\\`)\n  }\n  return response.json()\n}\n\n// 语义化方法\nexport const api = {\n  get: (path) => request(path),\n  post: (path, body) => request(path, {\n    method: 'POST',\n    body: JSON.stringify(body)\n  }),\n  delete: (path) => request(path, { method: 'DELETE' })\n}\n\```",
      },
      {
        type: "example",
        title: "使用封装后的 API",
        content:
          "对比前后的代码：\n\n\```js\n// ❌ 未封装：每个地方都要写完整 fetch\nconst res = await fetch(BASE_URL + '/pieces', {\n  headers: { 'Content-Type': 'application/json' }\n})\nif (!res.ok) throw new Error('请求失败')\nconst data = await res.json()\n\n// ✅ 封装后：一行搞定\nconst data = await api.get('/pieces')\n\```\n\n封装的好处：\n- 代码量减少 80%\n- 修改 BASE_URL 只改一处\n- 错误处理统一，不会遗漏\n- 可以方便地添加日志、token 等功能",
      },
      {
        type: "task",
        title: "动手试试 ✨",
        content:
          "编辑器中有一个不完整的 `api` 对象。请完成：\n\n1. 实现 `api.get(path)` 方法\n2. 请求 `jsonplaceholder.typicode.com/posts`\n3. 返回解析后的 JSON 数据\n4. 用你封装好的 `api.get()` 获取数据，取前 2 条显示",
      },
      {
        type: "hint",
        title: "提示",
        content:
          "\```js\nconst BASE_URL = 'https://jsonplaceholder.typicode.com'\n\nconst api = {\n  get: async (path) => {\n    const res = await fetch(BASE_URL + path)\n    if (!res.ok) throw new Error('请求失败')\n    return res.json()\n  }\n}\n\```",
      },
    ],
    starterCode: {
      html: "",
      css: "",
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
    mode: "sandbox",
  },

  // ===== 6.7 async-search-debounce =====
    {
    id: "async-search-debounce",
    chapterId: "async-data",
    trackId: "framework",
    order: 7,
    title: '防抖与搜索 — 别让"乐团"累坏了',
    musicAnalogy:
      '如果指挥每半秒就给乐团一个新指令，乐团会疯掉的。好的指挥一定会等前一个乐句结束再给下一个指示。**防抖（debounce）** 就是这个"等待稳定再行动"的智慧——用户在输入框打字时，不要每个字母都发请求，而是等用户停下来再发。',
    listenTo:
      '约翰·凯奇《4\'33"》— 这部作品提醒我们，**沉默和等待也是音乐的一部分**。防抖就是在合适的时机"不做什么"，这也是一种智慧。',
    sections: [
      {
        type: "explain",
        title: "为什么需要防抖？",
        content:
          '场景：搜索框。用户输入"贝多芬"，来数数会触发几次请求：\n\n\```\n贝 → 请求1\n贝多 → 请求2\n贝多芬 → 请求3\n\```\n\n如果每个字都发 API 请求：\n- 浪费网络资源\n- 服务器压力大\n- 返回顺序可能错乱（后发的请求可能先返回）\n\n**防抖：** 用户停止输入 N 毫秒后，才发一次请求。',
      },
      {
        type: "example",
        title: "防抖函数实现",
        content:
          "防抖的核心：每次触发时清除上一个定时器，重新计时。\n\n\```js\nfunction debounce(fn, delay = 300) {\n  let timer = null\n  return function(...args) {\n    clearTimeout(timer)            // 清除上次的定时器\n    timer = setTimeout(() => {     // 重新计时\n      fn.apply(this, args)\n    }, delay)\n  }\n}\n\n// 使用\nconst search = debounce(async (keyword) => {\n  console.log('搜索：', keyword)\n  const result = await api.get(\\`/search?q=\\${keyword}\\`)\n  displayResults(result)\n}, 500)\n\n// 用户在输入框打字\ninput.addEventListener('input', (e) => {\n  search(e.target.value)  // 停止输入 500ms 后才真正搜索\n})\n\```",
      },
      {
        type: "example",
        title: "直观理解",
        content:
          '防抖就像等电梯：\n\n- 不断有人按关门键（每次按键触发 debounce）\n- 电梯不会立刻关门（清除之前的定时器）\n- 等最后一个人进来后，过几秒才关门（定时器到期，执行回调）\n\n在搜索场景中，用户连续输入"贝"→"多"→"芬"，每次输入都重置计时器。等用户停止输入 500ms 后，才发送搜索"贝多芬"的请求。',
      },
      {
        type: "task",
        title: "动手试试 ✨",
        content:
          "编辑器中有一个不完整的 `debounce` 函数。请完成：\n\n1. 实现 `debounce(fn, delay)`——利用 `setTimeout` 和 `clearTimeout`\n2. 用你的 debounce 包装 `searchAPI`\n3. 在模拟的快速输入场景中验证：多次快速调用只会执行一次",
      },
      {
        type: "hint",
        title: "提示",
        content:
          "关键两步：\n1. 在返回的函数中 `clearTimeout(timer)` 取消上次的等待\n2. 然后 `timer = setTimeout(() => fn(...args), delay)` 重新开始等待\n\n`timer` 要存在闭包中（外层变量），这样每次调用都能访问到同一个 timer。",
      },
    ],
    starterCode: {
      html: "",
      css: "",
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
    mode: "sandbox",
  },

  // ===== 6.8 async-capstone =====
    {
    id: "async-capstone",
    chapterId: "async-data",
    trackId: "framework",
    order: 8,
    title: "异步篇结业 — 音乐搜索器",
    musicAnalogy:
      '合奏篇的最后一课：把你学到的所有"合奏技能"——Promise、async/await、fetch、错误处理、防抖——整合成一个完整的作品。就像一场室内乐的终曲，每个人都要把自己的声部完美地融入合奏。',
    listenTo:
      '维瓦尔第《四季·春》— 一个完整的协奏曲乐章，独奏与合奏交替，结构清晰、旋律优美。你的音乐搜索器也应该有这种"完整感"——输入、搜索、展示，一气呵成。',
    sections: [
      {
        type: "explain",
        title: "我们做什么",
        content:
          '打开你的 `music-collection` 项目，我们添加一个**音乐搜索器**功能：\n\n1. 用户输入搜索关键词\n2. 调用 iTunes Search API（免费公开 API）\n3. 用防抖优化搜索体验\n4. 展示搜索结果（歌曲名、歌手、封面）\n5. 错误处理（网络故障、无结果）\n\n> 🎯 这是你在"合奏篇"旅程的终点。你会惊喜地发现：你已经能写出真正有用的功能了。',
      },
      {
        type: "example",
        title: "iTunes Search API",
        content:
          'Apple 提供了免费的音乐搜索 API，无需注册：\n\n\```\nhttps://itunes.apple.com/search?term=贝多芬&limit=10&country=cn\n\```\n\n返回的 JSON 结构：\n\```json\n{\n  "resultCount": 10,\n  "results": [\n    {\n      "trackName": "月光奏鸣曲",\n      "artistName": "贝多芬",\n      "artworkUrl100": "封面图片URL",\n      "previewUrl": "试听URL",\n      "collectionName": "专辑名"\n    }\n  ]\n}\n\```',
      },
      {
        type: "task",
        title: "动手实现 ✨",
        content:
          "在 `music-collection` 项目中创建 `src/utils/debounce.js` 和 `src/utils/api.js`，然后在 `App.vue` 中使用：\n\n\```js\n// src/utils/api.js\nconst BASE_URL = 'https://itunes.apple.com'\n\nexport async function searchMusic(term) {\n  const url = \\`\\${BASE_URL}/search?term=\\${encodeURIComponent(term)}&limit=10&country=cn\\`\n  const res = await fetch(url)\n  if (!res.ok) throw new Error(\\`搜索失败：\\${res.status}\\`)\n  const data = await res.json()\n  return data.results\n}\n\```\n\n\```js\n// src/utils/debounce.js\nexport function debounce(fn, delay = 400) {\n  let timer\n  return function(...args) {\n    clearTimeout(timer)\n    timer = setTimeout(() => fn.apply(this, args), delay)\n  }\n}\n\```\n\n在 `App.vue` 中组合使用：\n- 搜索框 + 防抖\n- 结果列表渲染\n- 加载状态和错误提示",
      },
      {
        type: "hint",
        title: "实现路线图",
        content:
          "1. **先写 API 层** — 在 `api.js` 中封装 `searchMusic` 函数\n2. **再写防抖** — 在 `debounce.js` 中实现防抖\n3. **组合使用** — 在 `App.vue` 中用 `import` 引入\n4. **处理状态** — loading、error、no results 三种状态\n5. **展示结果** — 歌曲名、歌手、封面图\n\n完成的代码结构应该像这样清晰分层：\n\```\n用户输入 → debounce 等待 → api.searchMusic() → 更新 UI\n\```",
      },
      {
        type: "explain",
        title: "回顾你的成长",
        content:
          "合奏篇结束，回顾你学会的技能：\n\n| 技能 | 应用 |\n|------|------|\n| ES6 语法 | 解构、箭头函数、模板字符串 |\n| 错误处理 | try/catch 保护 API 调用 |\n| Event Loop | 理解异步执行顺序 |\n| Promise | .then()/.catch() 链式处理 |\n| async/await | 清晰的异步代码 |\n| fetch | 与服务器通信 |\n| API 封装 | 统一的请求模块 |\n| 防抖 | 优化搜索体验 |\n\n下一步：登台篇。你将学习用工程化工具（npm、Vite、Vue）搭建专业项目。准备好了吗？",
      },
    ],
    starterCode: { html: "", css: "", js: "" },
    mode: "local",
  },

  // ================================================================
  // 第七章：工程入门
  // ================================================================

  // ===== 7.1 tooling-nodejs =====
    {
    id: "tooling-nodejs",
    chapterId: "engineering-tooling",
    trackId: "engineering",
    order: 1,
    title: '安装你的"乐器"：Node.js',
    musicAnalogy:
      "学音乐之前，你得先有一件乐器。学前端工程化之前，你得先有 **Node.js**——它不是用来写代码的，而是用来**运行工具的**。就像钢琴本身不演奏，但有了它你才能弹出所有曲子。",
    listenTo:
      "德彪西《月光》— 这首曲子的意境不在于复杂的技巧，而在于你按下第一个音符的瞬间——就像安装好 Node.js 后在终端输入第一行命令，一个全新的世界在你面前展开。",
    sections: [
      {
        type: "explain",
        title: "Node.js 是什么？",
        content:
          '到目前为止，你的 JavaScript 都运行在**浏览器**里。Node.js 让 JavaScript 可以运行在**你的电脑**上——就像以前只能在音乐教室弹钢琴，现在你家里也有了一台。\n\n有了 Node.js，你才能使用：\n- **npm** — 包管理器（相当于一个巨大的乐谱库）\n- **Vite** — 构建工具（自动搭建排练厅）\n- **终端命令** — 用文字指挥电脑\n\n> 💡 不要被"安装"吓到。这就像第一次调音——看起来很专业，但其实只是拧几个旋钮。',
      },
      {
        type: "explain",
        title: "安装步骤（Windows / Mac 通用）",
        content:
          '1. 打开浏览器，访问 **nodejs.org**\n\n2. 下载 **LTS 版本**（长期支持版，偶数是版本号，如 20.x）\n   - LTS = Long Term Support，最稳定的版本\n   - 不要下载"Current"版本——那是给尝鲜的人用的\n\n3. 运行安装程序，一路点"Next"（全部默认选项即可）\n\n4. 安装完成后，打开终端验证：\n\n**Windows：** 按 `Win + R`，输入 `cmd`，回车\n**Mac：** 按 `Cmd + 空格`，输入 `Terminal`，回车\n\n在终端中输入：\n\```bash\nnode -v\n\```\n\n如果看到版本号（如 `v20.11.0`），安装成功！🎉\n\n再输入：\n\```bash\nnpm -v\n\```\n\n如果也看到版本号（如 `10.2.4`），说明 npm 也装好了。',
      },
      {
        type: "task",
        title: "你的任务 ✨",
        content:
          "1. 从 nodejs.org 下载并安装 Node.js LTS 版本\n\n2. 打开终端，运行 `node -v`，确认看到版本号\n\n3. 运行 `npm -v`，确认看到版本号\n\n4. 在终端中试试 `node -e \"console.log('你好，工程化世界！')\"` —— 这是用 Node.js 执行一行 JavaScript\n\n> 完成之后，你已经迈出了工程化的第一步。接下来的所有课程都依赖 Node.js，确保安装成功再继续。",
      },
      {
        type: "hint",
        title: "常见问题",
        content:
          '- **"node 不是内部或外部命令"** → 安装时可能没勾选"Add to PATH"。重新运行安装程序，确保勾选这个选项。\n- **Mac 权限问题** → 如果提示权限不足，尝试用管理员权限安装。\n- **不确定有没有装过？** → 在终端运行 `node -v`，能显示版本号就是装过了。\n- **版本号太旧？** → 推荐 v18 或 v20 以上。低于 v16 建议重新安装。',
      },
    ],
    starterCode: { html: "", css: "", js: "" },
    mode: "local",
  },

  // ===== 7.2 tooling-vscode =====
    {
    id: "tooling-vscode",
    chapterId: "engineering-tooling",
    trackId: "engineering",
    order: 2,
    title: '认识你的"乐谱架"：VS Code',
    musicAnalogy:
      "音乐家有谱架，程序员有编辑器。**VS Code** 不是普通的记事本——它就像智能谱架：自动帮你对齐音符、标记错误、提示下一个和弦。全世界绝大多数前端开发者每天都在用它。",
    listenTo:
      "巴赫《C大调前奏曲》BWV 846 — 这首曲子只用了一个简单的琶音模式，但包含了无限的可能性。VS Code 也是如此：表面看起来只是一个编辑器，但里面藏着能帮你做任何事的插件生态。",
    sections: [
      {
        type: "explain",
        title: "为什么需要专业的代码编辑器？",
        content:
          '你可能用记事本写过代码——那种感觉就像在餐巾纸上写乐谱。VS Code 给你的是：\n\n| 功能 | 类比 |\n|------|------|\n| 语法高亮 | 不同类型的音符用不同颜色标记 |\n| 自动补全 | 你哼一个音，它就帮你找到后面的旋律 |\n| 错误提示 | 弹错音时，调音器立刻报警 |\n| 内置终端 | 谱架下面藏着一台节拍器 |\n| 文件管理 | 所有乐谱按声部分类放好 |\n| 插件市场 | 各种"效果器"任你挑选 |\n\n> 💡 VS Code 是微软开发的，完全免费，Windows/Mac/Linux 都能用。',
      },
      {
        type: "explain",
        title: "安装与初始化",
        content:
          "1. 打开浏览器，访问 **code.visualstudio.com**\n\n2. 下载并安装 VS Code\n\n3. 启动 VS Code\n\n**界面导览：**\n- **左侧活动栏** — 最左侧的图标列（文件、搜索、Git、插件、...）\n- **文件资源管理器** — 显示项目文件夹结构（快捷键 `Ctrl+Shift+E` / `Cmd+Shift+E`）\n- **编辑区** — 中间最大的区域，写代码的地方\n- **终端面板** — 底部可以弹出的面板（快捷键 `Ctrl+\`` / `Cmd+\``）\n\n**打开终端面板：**\n- 点击顶部菜单 `查看 → 终端`\n- 或按快捷键 `Ctrl+\``（Mac: `Cmd+\``）\n\n在 VS Code 内置终端中运行 `node -v`，确认能看到版本号。以后我们不再需要单独打开系统终端——所有操作都在 VS Code 里完成。",
      },
      {
        type: "task",
        title: "你的任务 ✨",
        content:
          '1. 下载并安装 VS Code\n\n2. 在你的电脑上创建一个文件夹叫 `my-music-app`（可以放在桌面或文档目录）\n\n3. 在 VS Code 中点击 `文件 → 打开文件夹`，选择 `my-music-app`\n\n4. 按 `Ctrl+\`` 打开终端面板，运行 `node -v`\n\n5. 在左侧文件资源管理器中右键 → 新建文件 → `readme.md`，输入 `# 我的音乐应用`\n\n> 成功打开文件夹并看到终端后，你的"排练厅"就布置好了。接下来我们开始往里面放东西。',
      },
      {
        type: "hint",
        title: "小技巧",
        content:
          '- **自动保存：** 点击 `文件 → 自动保存`，以后每次切换文件都会自动保存。\n- **中文界面：** 如果英文不习惯，在插件市场搜索"Chinese"安装中文语言包。\n- **字体大小：** `Ctrl +` / `Ctrl -` 可以随时调整。',
      },
    ],
    starterCode: { html: "", css: "", js: "" },
    mode: "local",
  },

  // ===== 7.3 tooling-terminal =====
    {
    id: "tooling-terminal",
    chapterId: "engineering-tooling",
    trackId: "engineering",
    order: 3,
    title: '用命令行"指挥"电脑',
    musicAnalogy:
      "指挥家用一个手势让整个乐团起奏——这是**效率**。命令行也是如此：敲几个字母，电脑就完成一项任务。不需要鼠标点来点去，不需要在文件夹里翻找。几个命令，一切就绪。",
    listenTo:
      "贝多芬《第五交响曲》第一乐章 — 指挥的一个下拍，整个乐团爆发。命令行就是你的指挥棒——`npm run dev` 一行命令，开发服务器立刻启动。",
    sections: [
      {
        type: "explain",
        title: "为什么要学命令行？",
        content:
          "前端工程化的几乎每一步都在命令行里完成：\n- 创建项目：`npm create vite@latest`\n- 安装依赖：`npm install`\n- 启动开发服务器：`npm run dev`\n- 构建生产版本：`npm run build`\n- Git 版本管理：`git add` / `git commit`\n\n你不需要成为命令行专家，只需要掌握 6 个最常用的命令。",
      },
      {
        type: "explain",
        title: "6 个必学命令",
        content:
          '**1. `pwd` — 我在哪里？**（Print Working Directory）\n\```bash\npwd\n# 输出：/Users/xiaomei/my-music-app\n\```\n就像 GPS 告诉你当前位置。\n\n**2. `ls` — 这里有什么？**（List）\n\```bash\nls\n# 输出：readme.md\n\```\n列出当前文件夹中的所有文件。\n\n**3. `cd` — 去别的地方**（Change Directory）\n\```bash\ncd my-music-app    # 进入文件夹\ncd ..              # 回到上一级\ncd ~               # 回到家目录\n\```\n\n**4. `mkdir` — 创建文件夹**（Make Directory）\n\```bash\nmkdir src          # 创建名为 src 的文件夹\nmkdir -p src/components  # 创建嵌套文件夹\n\```\n\n**5. `echo` / `type nul` — 创建文件**\n\```bash\necho "" > index.html     # Mac/Linux：创建空文件\ntype nul > index.html    # Windows：创建空文件\n\```\n\n**6. `code .` — 用 VS Code 打开当前文件夹**\n\```bash\ncode .\n# VS Code 会打开当前文件夹\n\```',
      },
      {
        type: "task",
        title: "你的任务 ✨",
        content:
          "在 VS Code 的终端中完成以下操作（不要用鼠标在文件管理器中操作！）：\n\n1. `pwd` — 确认你在 `my-music-app` 文件夹中\n\n2. `mkdir src` — 创建 src 文件夹\n\n3. `cd src` — 进入 src 文件夹\n\n4. 在 src 中创建 `index.html`（用上面的命令）\n\n5. `cd ..` — 回到上级目录\n\n6. `ls` — 确认看到 `src` 文件夹\n\n> 💡 如果你在 Windows 上使用 PowerShell，命令完全一样。如果用 CMD，`ls` 需要换成 `dir`。建议使用 PowerShell（VS Code 终端默认就是它）。",
      },
      {
        type: "hint",
        title: "Tab 键自动补全",
        content:
          "命令行最实用的技巧：**按 Tab 键自动补全**。\n\n比如输入 `cd my` 然后按 Tab，系统会自动补全为 `cd my-music-app`（如果当前目录只有一个以 my 开头的文件夹）。\n\n这就像你哼两句旋律，别人就知道是哪首曲子。",
      },
    ],
    starterCode: { html: "", css: "", js: "" },
    mode: "local",
  },

  // ===== 7.4 tooling-modules =====
  {
    id: 'tooling-modules',
    chapterId: 'engineering-tooling',
    trackId: "engineering",
    order: 4,
    title: 'JS 模块化 — 把代码分成声部管理',
    musicAnalogy: '管弦乐总谱不会把所有音符挤在一行——第一小提琴、第二小提琴、中提琴、大提琴各有自己的谱表。模块化就是给你的代码分声部：一个文件管搜索（search.js），一个文件管渲染（render.js），一个文件管数据（store.js）。每个模块有自己的职责，通过 import/export 像不同声部之间的对话一样协作。',
    listenTo: '本杰明·布里顿《青少年管弦乐队指南》— 一段主题由不同乐器组依次演奏，每个乐器组（模块）独立展示自己的音色（功能），最后由整个乐队合奏（import 整合）。完美的模块化示范！',
    mode: 'local',
    sections: [
      {
        type: 'explain',
        title: '为什么需要模块化？',
        content: '早期的网页开发中，所有 JS 代码写在一个文件里——几百行甚至上千行。随着项目变大，问题来了：\n\n- 变量名冲突（两个函数都想用 name 这个变量）\n- 代码难以维护（找一个 bug 要翻几千行）\n- 无法复用（想在新项目里用某个功能，得从旧文件里复制粘贴）\n\n模块化解决了这些问题：\n\n\```\n// 之前：一个巨大的 script.js\nscript.js (800 行)\n\n// 之后：按职责分成小文件\nutils.js        ← 工具函数（格式化日期、编码等）\napi.js          ← 网络请求\nrender.js       ← 渲染页面\napp.js          ← 主入口，引入其他模块\n\```\n\n就像一个 100 人的乐团不会挤在一张谱台上——每个人有自己的分谱（模块），总谱（入口文件）告诉指挥各声部如何配合。',
      },
      {
        type: 'explain',
        title: 'export — 两种导出方式',
        content: 'ES Modules 提供两种导出方式：\n\n**1. 命名导出（Named Export）** — 一个模块可以导出多个东西：\n\n\```js\n// utils.js — 导出多个工具函数\nexport function formatDate(date) {\n  return date.toLocaleDateString(\'zh-CN\')\n}\n\nexport const API_BASE = \'https://api.example.com\'\n\nexport function debounce(fn, delay) {\n  let timer\n  return (...args) => {\n    clearTimeout(timer)\n    timer = setTimeout(() => fn(...args), delay)\n  }\n}\n\```\n\n**2. 默认导出（Default Export）** — 一个模块只导出一个主角：\n\n\```js\n// search.js — 这个文件的主角就是 searchMusic\nexport default async function searchMusic(keyword) {\n  const res = await fetch(API_BASE + \'/search?q=\' + keyword)\n  return res.json()\n}\n\```\n\n每个模块只能有一个 default export。\n\n> 🎻 命名导出像乐团里的多个乐手（各有其名），默认导出像首席小提琴——这个模块的代言人。',
      },
      {
        type: 'explain',
        title: 'import — 引入其他模块',
        content: '**导入命名导出：** 用花括号 `{}` 精确指定要导入什么\n\n\```js\n// 按需导入\nimport { formatDate, debounce } from \'./utils.js\'\n\n// 重命名（避免命名冲突）\nimport { debounce as deb } from \'./utils.js\'\n\n// 全部导入到一个命名空间\nimport * as utils from \'./utils.js\'\nutils.formatDate(new Date())\n\```\n\n**导入默认导出：** 不用花括号，名字可以自己取\n\n\```js\nimport searchMusic from \'./search.js\'\n// 名字可以自己定，但建议和导出保持一致\n\```\n\n**混合导入：**\n\n\```js\nimport searchMusic, { API_BASE } from \'./search.js\'\n\```\n\n**npm 包的导入：** (不需要 ./ 或 ../ 前缀)\n\n\```js\nimport { ref, computed } from \'vue\'\nimport axios from \'axios\'\n\```\n\n**注意：** `.js` 后缀在 Vite/Vue 项目中可以省略，在纯浏览器 ESM 中必须写。',
      },
      {
        type: 'example',
        title: '看例子',
        content: '假设你在做一个音乐搜索器，模块化之后项目结构是这样的：\n\n\```\nmusic-searcher/\n├── index.html\n├── js/\n│   ├── app.js        ← 主入口（组装所有模块）\n│   ├── api.js        ← 封装 fetch 请求\n│   ├── render.js     ← 负责渲染 DOM\n│   └── utils.js      ← 通用工具（防抖、格式化）\n\```\n\n\```js\n// api.js — 只负责数据\nexport async function searchMusic(keyword) {\n  const res = await fetch(\n    \'https://itunes.apple.com/search?term=\' + encodeURIComponent(keyword) + \'&limit=10\'\n  )\n  return res.json()\n}\n\n// render.js — 只负责 DOM\nexport function renderResults(data, container) {\n  container.innerHTML = data.results.map(item => `\n    <div class="card">\n      <img src="${item.artworkUrl100}" />\n      <h3>${item.trackName}</h3>\n    </div>\n  `).join(\'\')\n}\n\n// app.js — 组装一切\nimport { searchMusic } from \'./api.js\'\nimport { renderResults } from \'./render.js\'\nimport { debounce } from \'./utils.js\'\n\nconst input = document.querySelector(\'#search\')\nconst results = document.querySelector(\'#results\')\n\ninput.addEventListener(\'input\', debounce(async (e) => {\n  const data = await searchMusic(e.target.value)\n  renderResults(data, results)\n}, 400))\n\```\n\n每个文件职责单一——修改渲染逻辑不会影响 API 代码，反之亦然。',
      },
      {
        type: 'task',
        title: '动手试试 ✨',
        content: '在本地 VS Code 中练习（这是 local 模式课程）：\n\n1. 创建一个 music-searcher 文件夹，在其中创建 api.js、render.js、app.js 三个文件\n2. 在 api.js 中 export 一个 searchMusic 函数（用到 fetch）\n3. 在 render.js 中 export 一个 renderResults 函数（创建 DOM 元素）\n4. 在 app.js 中 import 这两个函数，组装成完整的搜索功能\n5. 练习：尝试用 default export 改写 api.js，看 import 语法有什么变化\n6. 练习：尝试 import * as 的方式，对比按需导入的区别',
      },
    ],
    starterCode: {
      html: '',
      css: '',
      js: '',
    },
  },

  // ===== 7.5 tooling-npm =====
    {
    id: "tooling-npm",
    chapterId: "engineering-tooling",
    trackId: "engineering",
    order: 5,
    title: '包管理器 — 你的"乐谱图书馆"',
    musicAnalogy:
      '作曲家不需要从零发明每一个和弦——他们在已有的音乐体系上创作。**npm 就是编程世界的音乐图书馆**：全球开发者共享了超过 200 万个"包"，你只需要 `npm install`，就能把别人写好的功能直接拿来用。',
    listenTo:
      '莫扎特《安魂曲》K.626 — 莫扎特在这部作品中引用了亨德尔、海顿等前辈的音乐元素。好的作曲家善于"复用"前人的精华。npm 让你站在全球开发者的肩膀上——不需要重新发明轮子。',
    sections: [
      {
        type: "explain",
        title: "npm 做了什么？",
        content:
          "npm（Node Package Manager）是 Node.js 自带的包管理器。它做三件事：\n\n1. **下载别人的代码** — `npm install 包名`\n\n2. **管理依赖关系** — 记录你的项目用了哪些包（`package.json`）\n\n3. **运行脚本** — `npm run 脚本名`\n\n**npm 和 pip/brew 类比：**\n- 如果你学过 Python：npm = pip\n- 如果你用 Mac：npm = Homebrew\n- 如果你用手机：npm = 应用商店\n\n> 💡 每次你 `npm install` 一个包，代码被下载到 `node_modules/` 文件夹。这个文件夹通常很大——所以一般不上传到 Git。",
      },
      {
        type: "explain",
        title: 'package.json — 项目的"身份证"',
        content:
          '每个前端项目都有一个 `package.json` 文件，它记录了：\n\n\```json\n{\n  "name": "my-music-app",\n  "version": "1.0.0",\n  "description": "我的音乐收藏应用",\n  "scripts": {\n    "dev": "vite",\n    "build": "vite build"\n  },\n  "dependencies": {\n    "vue": "^3.4.0"\n  },\n  "devDependencies": {\n    "vite": "^5.0.0"\n  }\n}\n\```\n\n- **name** — 项目名称\n- **scripts** — 你可以运行的命令（`npm run dev` 就是运行这里定义的 `dev` 脚本）\n- **dependencies** — 项目运行需要的包（用户最终也会用到）\n- **devDependencies** — 只在开发时需要用的包（如 Vite、测试工具）\n\n创建 `package.json` 的命令：\n\```bash\nnpm init -y\n\```\n`-y` 表示跳过所有问题，使用默认值。',
      },
      {
        type: "task",
        title: "你的任务 ✨",
        content:
          "1. 在 VS Code 终端中，确保你在 `my-music-app` 目录下（`pwd` 确认）\n\n2. 运行 `npm init -y`，你会看到生成了 `package.json`\n\n3. 打开 `package.json` 看看里面的内容\n\n4. 试试安装一个包：`npm install dayjs`（dayjs 是一个日期处理库，很小的包）\n\n5. 观察变化：`package.json` 多了一个 `dependencies` 字段，还生成了 `node_modules` 文件夹\n\n> 你刚刚完成了人生中第一次 `npm install`！以后你会做很多很多次。",
      },
      {
        type: "hint",
        title: "node_modules 很重",
        content:
          '`node_modules` 文件夹可能会变得非常大（几百 MB）。**永远不要把它上传到 GitHub 或发给别人**——别人拿到你的 `package.json` 之后，只需要运行 `npm install`，就能自动下载所有依赖。\n\n就像你只需要告诉乐团"贝多芬第五交响曲"，不需要给每个人抄一份总谱。',
      },
    ],
    starterCode: { html: "", css: "", js: "" },
    mode: "local",
  },

  // ===== 7.6 tooling-vite =====
    {
    id: "tooling-vite",
    chapterId: "engineering-tooling",
    trackId: "engineering",
    order: 6,
    title: "创建第一个 Vue 项目 — Vite 登场",
    musicAnalogy:
      '排练一场交响乐需要准备场地、谱架、乐器、灯光……但如果有一个"排练厅管家"帮你一次性搞定所有配置呢？**Vite 就是这个管家**——一条命令，给你搭好整个项目框架：文件夹结构、配置文件、开发服务器，全部就位。你只需要开始写代码。',
    listenTo:
      "拉威尔《波莱罗》— 从一个几乎听不见的军鼓节奏开始，逐渐叠加乐器层，最终汇聚成辉煌的合奏。Vite 创建项目也是如此：一个空模板开始，逐渐加入组件、路由、数据……",
    sections: [
      {
        type: "explain",
        title: "Vite 是什么？",
        content:
          'Vite（法语"快"的意思，读作 /viːt/）是一个**前端构建工具**。它做了三件关键的事：\n\n1. **开发服务器** — 运行 `npm run dev`，自动在浏览器打开你的页面，修改代码后页面**瞬时更新**（热更新 HMR）\n\n2. **构建打包** — 运行 `npm run build`，把你的代码压缩优化成可以部署到服务器上的文件\n\n3. **项目脚手架** — 运行 `npm create vite@latest`，自动生成项目文件夹结构\n\n> 💡 "构建"这个词可能陌生。想象你把散落的乐谱整理成一本精美的节目单——构建就是把你的源代码变成最终产品。',
      },
      {
        type: "explain",
        title: "创建项目",
        content:
          '在终端中运行：\n\n\```bash\nnpm create vite@latest music-collection -- --template vue\n\```\n\n这条命令做了什么？\n- `npm create` — npm 的"创建项目"功能\n- `vite@latest` — 使用最新版 Vite 脚手架\n- `music-collection` — 项目名称（也是文件夹名）\n- `-- --template vue` — 使用 Vue 模板\n\n运行后：\n\n\```bash\ncd music-collection   # 进入项目文件夹\nnpm install           # 安装依赖（Vue、Vite 等）\nnpm run dev           # 启动开发服务器\n\```\n\n浏览器会自动打开 `http://localhost:5173`，你会看到一个 Vue 的欢迎页面！\n\n**项目结构一览：**\n\```\nmusic-collection/\n├── index.html          # 入口 HTML\n├── package.json        # 项目配置\n├── vite.config.js      # Vite 配置\n├── src/\n│   ├── main.js         # 应用入口\n│   ├── App.vue         # 根组件\n│   ├── components/     # 放组件的地方\n│   └── assets/         # 放图片、CSS 等\n└── node_modules/       # 依赖包\n\```',
      },
      {
        type: "task",
        title: "你的任务 ✨",
        content:
          "1. 在终端中运行创建命令（在自己选的位置，比如桌面）：\n   \```bash\n   npm create vite@latest music-collection -- --template vue\n   \```\n\n2. `cd music-collection` 进入项目\n\n3. `npm install` 安装依赖\n\n4. `npm run dev` 启动开发服务器\n\n5. 在浏览器中访问 `http://localhost:5173`，看到 Vue 欢迎页\n\n6. 打开 `src/App.vue`，把 `<template>` 里的内容改成 `<h1>🎵 我的音乐收藏</h1>`，保存，看浏览器自动更新！\n\n> 🎉 你刚刚完成了第一个工程化的 Vue 项目！不再是 CDN 引入，而是真正的 npm + Vite + Vue 项目结构。",
      },
      {
        type: "hint",
        title: "常见问题",
        content:
          "- **端口被占用？** Vite 会自动换一个端口（如 5174），看终端提示。\n- **`npm run dev` 报错？** 确认你已经 `cd` 到了 `music-collection` 目录里。\n- **浏览器没有自动打开？** 手动访问终端中显示的地址（通常是 `http://localhost:5173`）。\n- **修改代码没反应？** 确认你保存了文件（`Ctrl+S`），或者开启自动保存。",
      },
    ],
    starterCode: { html: "", css: "", js: "" },
    mode: "local",
  },

  // ===== 7.7 tooling-eslint =====
  {
    id: 'tooling-eslint',
    chapterId: 'engineering-tooling',
    trackId: "engineering",
    order: 7,
    title: 'ESLint 与 Prettier — 代码的调音师',
    musicAnalogy: '乐团上台前需要调音——每把乐器校准到标准音高 A=440Hz。代码也需要调音：ESLint 是音准仪——检查有没有错音（语法错误、不良模式）；Prettier 是节拍器——确保节奏统一（缩进、引号、分号风格一致）。两个工具配合使用，让你的代码像专业乐团一样整齐统一。',
    listenTo: '柏林爱乐乐团音乐会前的调音 — 各乐器组依次校准，双簧管给出标准音 A，其他乐器与之对齐。ESLint 就是那个标准音——所有代码都要对齐到它的规则。',
    mode: 'local',
    sections: [
      {
        type: 'explain',
        title: '为什么需要代码规范？',
        content: '你有没有遇到过这些问题：\n\n- 队友用 2 空格缩进，你用 4 空格——代码合并时满屏冲突\n- 有人用单引号，有人用双引号——整个项目风格混乱\n- 定义了一个变量但从未使用，自己都没注意到\n- console.log 忘记删就提交了\n\n团队协作时，代码风格的统一比个人偏好重要得多。就像交响乐团——每个乐手可以有不同的演奏风格，但在同一个乐队里，必须听指挥的统一调度。\n\n**ESLint** 负责代码质量（有没有 bug）\n**Prettier** 负责代码格式（好不好看）\n\n两者配合使用：ESLint 抓错误，Prettier 管风格。',
      },
      {
        type: 'explain',
        title: 'ESLint — 代码质量检查',
        content: 'ESLint 是 JS/TS 生态中最主流的代码检查工具。它定义了一套规则，不符合规则就报错或警告。\n\n**安装与初始化：**\n\```bash\nnpm init @eslint/config\n# 按提示选择：Vue、TypeScript、ESM 等\n# 会在项目根目录生成 eslint.config.js\n\```\n\n**常见规则举例：**\n\```js\n// eslint.config.js\nexport default [\n  {\n    rules: {\n      \'no-unused-vars\': \'warn\',     // 定义了但没用的变量 → 警告\n      \'no-console\': \'warn\',          // console.log → 警告\n      \'no-undef\': \'error\',           // 未定义的变量 → 报错\n      \'eqeqeq\': \'error\',             // 必须用 === 而不是 ==\n    }\n  }\n]\n\```\n\n**VSCode 集成：** 安装 ESLint 插件后，错误会在编辑器中直接标红下划线，保存时自动修复部分问题。\n\n> 🎯 ESLint 就像排练时的指挥——等一下，第二小提琴，你这里有个音不准（变量未定义），重来。',
      },
      {
        type: 'explain',
        title: 'Prettier — 代码格式化',
        content: 'Prettier 是一个有强迫症的代码格式化工具——它不检查 bug，只负责让代码**看起来**一致。\n\n**安装：**\n\```bash\nnpm install -D prettier\n\```\n\n**配置文件 .prettierrc：**\n\```json\n{\n  "semi": false,\n  "singleQuote": true,\n  "tabWidth": 2,\n  "trailingComma": "es5",\n  "printWidth": 100\n}\n\```\n\n保存文件时，Prettier 自动把：\n\```js\n// 格式化前\nconst x=1;const y=2;function foo(a,b){return a+b}\n\n// 格式化后\nconst x = 1\nconst y = 2\nfunction foo(a, b) {\n  return a + b\n}\n\```\n\n**让 ESLint 和 Prettier 和平共处：**\n安装 eslint-config-prettier，关闭 ESLint 中与 Prettier 冲突的规则。\n\n> 📐 Prettier 就像乐谱排版师——音符是对的（ESLint 验证过了），但间距、对齐、换行要美观统一。',
      },
      {
        type: 'example',
        title: '看例子：在 Vite + Vue 项目中配置',
        content: '在你的 music-collection-vue 项目中：\n\n\```bash\n# 安装依赖\nnpm install -D eslint prettier eslint-plugin-vue eslint-config-prettier\n\n# ESLint 配置（eslint.config.js）\nimport pluginVue from \'eslint-plugin-vue\'\nexport default [\n  ...pluginVue.configs[\'flat/recommended\'],\n  {\n    rules: {\n      \'vue/multi-word-component-names\': \'off\',\n      \'no-console\': \'warn\'\n    }\n  }\n]\n\n# VS Code 设置（.vscode/settings.json）\n{\n  "editor.formatOnSave": true,\n  "editor.defaultFormatter": "esbenp.prettier-vscode",\n  "editor.codeActionsOnSave": {\n    "source.fixAll.eslint": true\n  }\n}\n\```\n\n配置完成后，每次保存文件：Prettier 先格式化，ESLint 再检查和自动修复。你的代码会像印刷出来的乐谱一样整齐。',
      },
      {
        type: 'task',
        title: '动手试试 ✨',
        content: '在你的 music-collection-vue 项目中：\n\n1. 安装 ESLint + Prettier + eslint-config-prettier\n2. 创建 eslint.config.js 和 .prettierrc 配置文件\n3. 在 VS Code 中安装 ESLint 和 Prettier 插件\n4. 故意写一些不规范的代码——不统一的引号、缺少空格、定义未使用的变量\n5. 保存文件，观察自动格式化效果\n6. 运行 npx eslint . 在终端中查看所有警告和错误',
      },
    ],
    starterCode: {
      html: '',
      css: '',
      js: '',
    },
  },

  // ===== 7.8 tooling-git-init =====
    {
    id: "tooling-git-init",
    chapterId: "engineering-tooling",
    trackId: "engineering",
    order: 8,
    title: 'Git — 你的"乐谱版本管理器"',
    musicAnalogy:
      '作曲家写一部作品，通常会经历多个版本：草稿、修改稿、定稿、修订版……每一个版本都可能需要回头查看。**Git 就是这个"版本档案柜"**——你每完成一步就"存档"一次，随时可以回到任何历史版本，也随时知道"谁在什么时候改了什么"。',
    listenTo:
      "贝多芬《迪亚贝利变奏曲》Op.120 — 33 个变奏从同一个主题演化而来。每一个变奏就像 Git 中的一个 commit——从同一个起点出发，每次修改都留下清晰的记录。",
    sections: [
      {
        type: "explain",
        title: "为什么需要 Git？",
        content:
          '你可能经历过这种情况：\n\```\n音乐收藏_v1.html\n音乐收藏_v2.html\n音乐收藏_v2_最终版.html\n音乐收藏_v2_真的最终版.html\n音乐收藏_v3_备份.html\n\```\n\nGit 解决了这个混乱。有了 Git：\n- 不需要"v1""v2""最终版"这种命名\n- 每次修改后 `git commit`，自动记录快照\n- 任何时候可以回到之前的版本\n- 清楚地看到每次改了什么（`git diff`）\n\n程序员用 Git，就像作曲家保留每一版草稿——只是更优雅。',
      },
      {
        type: "explain",
        title: "三个基本操作",
        content:
          '**1. `git init` — 初始化仓库**\n\```bash\ncd music-collection\ngit init\n\```\n这会在项目中创建一个隐藏的 `.git` 文件夹——Git 的所有历史记录都存在这里。\n\n**2. `git add` + `git commit` — 保存快照**\n\```bash\ngit add .                    # 把所有修改加入"暂存区"\ngit commit -m "初始化项目"    # 创建一次提交（存档）\n\```\n\n每次 commit 需要一条消息（`-m "..."`），说明这次改了什么。\n- `-m` = message（消息）\n\n**3. `.gitignore` — 告诉 Git 忽略什么**\n\n创建 `.gitignore` 文件（注意文件名前面有个点）：\n\```\nnode_modules/\ndist/\n.DS_Store\n\```\n\n这些文件和文件夹不会被 Git 追踪：\n- `node_modules/` — 太大了，而且别人可以通过 `npm install` 重新下载\n- `dist/` — 构建产物，不是源码\n- `.DS_Store` — Mac 系统文件，和项目无关\n\n**完整工作流：**\n\```bash\ngit add .\ngit commit -m "添加了音乐卡片组件"\n# 继续写代码...\ngit add .\ngit commit -m "添加了筛选功能"\n# 继续写代码...\ngit add .\ngit commit -m "修复了收藏按钮的样式"\n\```',
      },
      {
        type: "task",
        title: "你的任务 ✨",
        content:
          '1. 在 `music-collection` 项目中初始化 Git：`git init`\n\n2. 创建 `.gitignore` 文件，内容为 `node_modules/` 和 `dist/`\n\n3. 运行 `git add .` 把所有文件加入暂存区\n\n4. 运行 `git commit -m "初始化音乐收藏项目"` 创建第一次提交\n\n5. 修改 `App.vue`（比如改个标题），然后 `git add .` + `git commit -m "更新标题"`\n\n6. 运行 `git log` 查看提交历史（按 `q` 退出）\n\n> 🎉 你刚刚完成了人生中第一次 Git commit！从此你的代码有了"时间机器"。',
      },
      {
        type: "hint",
        title: "Commit 消息怎么写？",
        content:
          "好的 commit 消息让人一眼知道改了什么：\n- ✅ `添加音乐卡片组件`\n- ✅ `修复收藏按钮点击无效的bug`\n- ✅ `优化筛选功能，支持多个时期同时选中`\n- ❌ `修改`（太模糊）\n- ❌ `asdf`（无意义）\n- ❌ `根据需求修改了一些文件`（等于没说）\n\n写 commit 消息就像写日记——未来的你会感谢现在认真写消息的你。",
      },
    ],
    starterCode: { html: "", css: "", js: "" },
    mode: "local",
  },

  // ===== 7.9 tooling-github =====
    {
    id: "tooling-github",
    chapterId: "engineering-tooling",
    trackId: "engineering",
    order: 9,
    title: 'GitHub — 把你的作品"发布到音乐厅"',
    musicAnalogy:
      '到目前为止，你的乐谱（代码）只存在于自己的电脑上。**GitHub 就像是把乐谱出版发行**——你的作品有了一个公开的地址，别人可以看到、使用、甚至贡献。它也是程序员界的"LinkedIn"——你的 GitHub 主页就是你的技术名片。',
    listenTo:
      '马勒《第八交响曲"千人"》— 这部作品需要超过一千名表演者。没有任何一个乐团能独自完成——它需要多个合唱团、独唱家、乐团的**协作**。GitHub 让全球开发者以同样的方式协作：每个人贡献自己的一部分。',
    sections: [
      {
        type: "explain",
        title: "Git 和 GitHub 的区别",
        content:
          '这是初学者最容易混淆的概念：\n\n| | Git | GitHub |\n|------|-----|--------|\n| 是什么 | 版本管理工具 | 代码托管网站 |\n| 装在哪里 | 你的电脑 | 互联网上的服务器 |\n| 能做什么 | 记录版本、回退历史 | 存储代码、协作、展示作品 |\n| 类比 | 你书房里的乐谱档案柜 | 公开图书馆的乐谱收藏室 |\n\n**Git 不需要 GitHub 也能用**——但 GitHub 让你的代码有了"线上备份"和"公开展示"的能力。',
      },
      {
        type: "explain",
        title: "关联本地项目到 GitHub",
        content:
          '**第一步：在 GitHub 上创建仓库**\n\n1. 打开 [github.com](https://github.com)，注册/登录账号\n\n2. 点击右上角的 ➕ → "New repository"\n\n3. 仓库名填写 `music-collection`\n\n4. 设置为 **Public**（公开）\n\n5. **不要勾选** "Add a README file"（因为本地已有项目）\n\n6. 点击 "Create repository"\n\n**第二步：关联本地项目**\n\nGitHub 会显示一段命令，复制并在 VS Code 终端中运行：\n\n\```bash\ngit remote add origin https://github.com/你的用户名/music-collection.git\ngit branch -M main\ngit push -u origin main\n\```\n\n逐行解释：\n- `git remote add origin <URL>` — 告诉 Git"远程仓库的地址在这里"，给它起个名叫 `origin`\n- `git branch -M main` — 把当前分支命名为 `main`\n- `git push -u origin main` — 把本地的 `main` 分支推送到远程的 `origin`\n\n之后每次有新的 commit，只需要：\n\```bash\ngit push\n\```\n\n刷新 GitHub 页面，你的代码就出现在网上了！🎉',
      },
      {
        type: "task",
        title: "你的任务 ✨",
        content:
          '1. 在 GitHub 上注册账号（如果还没有）\n\n2. 创建一个名为 `music-collection` 的公开仓库\n\n3. 按照 GitHub 提供的命令，把本地项目推送到远程\n\n4. 刷新 GitHub 页面，确认代码已经上传\n\n5. 在本地修改 `App.vue`，commit，然后 `git push`，刷新 GitHub 看更新\n\n> 🎉 你刚刚完成了第一次 git push！从现在开始，你的代码有了"云端备份"，再也不用担心电脑坏了代码丢失。',
      },
      {
        type: "hint",
        title: "常见问题",
        content:
          '- **"Permission denied"** → 需要配置 SSH Key 或使用 Personal Access Token。初学者推荐用 HTTPS + Token（GitHub 登录后会自动生成）。\n- **首次 push 时提示登录** → 在弹出的窗口中用 GitHub 账号登录即可。\n- **push 被拒绝？** → 如果创建仓库时勾选了 README，需要先 `git pull origin main --allow-unrelated-histories`。\n- **仓库名和文件夹名不一致没关系** — Git 只看 remote URL，不关心文件夹叫什么。',
      },
    ],
    starterCode: { html: "", css: "", js: "" },
    mode: "local",
  },

  // ===== 7.10 tooling-build-deploy =====
    {
    id: "tooling-build-deploy",
    chapterId: "engineering-tooling",
    trackId: "engineering",
    order: 10,
    title: "构建与部署 — 让全世界看到你的作品",
    musicAnalogy:
      "排练结束（开发完成），最后一步是：**正式演出**（部署）。你把排练时的草稿整理成精美的节目单（构建），然后打开音乐厅的大门，让观众进场（部署到服务器）。从此你的作品有了一个公开的网址，任何人都可以访问。",
    listenTo:
      "柴可夫斯基《1812 序曲》— 从教堂的祈祷到战争的炮火再到胜利的钟声——最后的尾声，所有乐器（包括真炮！）一齐奏响。部署就是那最后一刻：你的项目从小小的开发服务器走向全世界。",
    sections: [
      {
        type: "explain",
        title: "开发 vs 生产",
        content:
          '在开发过程中，Vite 的开发服务器做了很多"方便你开发"的事：\n- 热更新（修改代码页面自动刷新）\n- 不压缩代码（方便调试）\n- 源码映射（报错时能看到原始代码位置）\n\n但当你准备发布时，需要"构建"——把代码变成**适合用户访问的最终版本**：\n- 代码压缩（去掉空格、缩短变量名）\n- 文件合并（减少 HTTP 请求次数）\n- 去除开发调试代码\n\n**类比：**\n- 开发 = 排练时的笔记，潦草但你能看懂\n- 构建 = 正式演出的节目单，印刷精美，观众能看懂\n\n**命令：**\n\```bash\nnpm run build\n\```\n\n运行后，项目根目录会多出一个 `dist/` 文件夹——里面就是最终要部署的文件。\n\n\```\ndist/\n├── index.html        # 入口页面\n├── assets/\n│   ├── index-abc123.js   # 打包后的 JS\n│   └── index-def456.css  # 打包后的 CSS\n└── ...\n\```\n\n> 💡 `dist` 是 distribution（分发）的缩写。这个文件夹的内容就是你的"产品"。',
      },
      {
        type: "explain",
        title: "部署到 GitHub Pages",
        content:
          'GitHub Pages 是 GitHub 提供的免费静态网站托管服务。你可以把 `dist/` 文件夹的内容部署上去，获得一个 `https://你的用户名.github.io/music-collection/` 的网址。\n\n**最简单的部署方式：**\n\n1. 在项目中安装 `gh-pages` 包：\n\```bash\nnpm install -D gh-pages\n\```\n\n2. 在 `package.json` 中添加部署脚本：\n\```json\n{\n  "scripts": {\n    "dev": "vite",\n    "build": "vite build",\n    "deploy": "gh-pages -d dist"\n  }\n}\n\```\n\n3. 在 `vite.config.js` 中添加 base 配置：\n\```js\nimport { defineConfig } from \'vite\'\nimport vue from \'@vitejs/plugin-vue\'\n\nexport default defineConfig({\n  plugins: [vue()],\n  base: \'/music-collection/\'  // 你的仓库名\n})\n\```\n\n4. 构建并部署：\n\```bash\nnpm run build\nnpm run deploy\n\```\n\n等待几分钟，访问 `https://你的用户名.github.io/music-collection/`，你的项目就上线了！🎉',
      },
      {
        type: "task",
        title: "你的任务 ✨",
        content:
          "1. 运行 `npm run build`，查看生成的 `dist/` 文件夹\n\n2. 安装 `gh-pages`：`npm install -D gh-pages`\n\n3. 在 `vite.config.js` 中添加 `base` 配置\n\n4. 在 `package.json` 中添加 `deploy` 脚本\n\n5. 运行 `npm run deploy`，把项目部署到 GitHub Pages\n\n6. 访问你的网址，确认一切正常\n\n> 🎉 恭喜！你刚刚完成了从写第一行代码到部署上线的完整流程。你把一个 Vue 项目变成了全世界都能访问的网站。",
      },
      {
        type: "hint",
        title: "部署的其他选择",
        content:
          "GitHub Pages 是最简单的免费方案。此外还有：\n- **Vercel** — 自动从 GitHub 部署，支持自定义域名，速度更快\n- **Netlify** — 类似 Vercel，也是拖拽文件夹即可部署\n- **Cloudflare Pages** — 速度极快，全球 CDN 加速\n\n对于个人项目，GitHub Pages 完全够用。当你需要更高级的功能时，这些平台的学习成本也很低。",
      },
    ],
    starterCode: { html: "", css: "", js: "" },
    mode: "local",
  },

  // ===== 7.11 tooling-env =====
  {
    id: 'tooling-env',
    chapterId: 'engineering-tooling',
    trackId: "engineering",
    order: 11,
    title: '环境变量 — 给不同的舞台不同的配置',
    musicAnalogy: '同一首曲子，在排练室演奏和在金色大厅演奏，需要的配置不同——排练室用小型 PA 系统，音乐厅有专业的声学设计和混音台。开发环境和生产环境也是两个不同的舞台：开发时 API 指向本地服务器，上线后指向真实 API。环境变量让你在每个舞台上自动切换正确的配置，不需要手动改代码。',
    listenTo: '马勒《第八交响曲》千人交响曲 — 这部作品需要极大规模的编制，每次演出前必须根据演出场地的声学特性（就像环境变量）调整乐队的摆位和动态平衡。同一个总谱，不同的场地需要不同的配置。',
    mode: 'local',
    sections: [
      {
        type: 'explain',
        title: '为什么需要环境变量？',
        content: '在真实项目中，你经常会遇到不同环境用不同值的场景：\n\n| 场景 | 开发环境 | 生产环境 |\n|------|----------|----------|\n| API 地址 | http://localhost:3000/api | https://api.myapp.com |\n| 调试模式 | 开启（显示 log、调试面板） | 关闭 |\n| 分析工具 | 禁用 | 启用 |\n\n如果没有环境变量，你需要**每次部署前手动改代码**——繁琐且容易出错。环境变量让这些值外置到配置文件中，根据运行环境自动切换。',
      },
      {
        type: 'explain',
        title: '.env 文件 — 你的后台配置单',
        content: 'Vite 项目默认支持 .env 文件（通过 dotenv）：\n\n\```bash\n# .env.development  — 开发时自动加载\nVITE_API_BASE=http://localhost:3000/api\nVITE_DEBUG=true\nVITE_APP_TITLE=音乐收藏（开发版）\n\n# .env.production  — 构建时自动加载\nVITE_API_BASE=https://api.myapp.com\nVITE_DEBUG=false\nVITE_APP_TITLE=音乐收藏\n\```\n\n**命名规则：** 只有以 VITE_ 开头的变量才会暴露给客户端代码。这是 Vite 的安全措施——防止意外的敏感信息泄露。\n\n**注意：** .env 文件**不应该提交到 Git**（把 .env 加入 .gitignore）。敏感信息如 API 密钥永远不要放在前端环境变量中——它们会被打包进 JS 文件，任何人都能看到。',
      },
      {
        type: 'explain',
        title: '在代码中使用环境变量',
        content: '在 Vue 组件或 JS 文件中通过 import.meta.env 访问：\n\n\```js\n// 在任何 .vue 或 .js 文件中\nconst API_BASE = import.meta.env.VITE_API_BASE\nconst isDebug = import.meta.env.VITE_DEBUG === \'true\'\n\n// 使用\nasync function searchMusic(keyword) {\n  const res = await fetch(\n    import.meta.env.VITE_API_BASE + \'/search?q=\' + keyword\n  )\n  return res.json()\n}\n\n// 条件逻辑\nif (import.meta.env.DEV) {\n  console.log(\'当前是开发环境\')\n}\n\nif (import.meta.env.PROD) {\n  // 生产环境特有的逻辑\n}\n\```\n\n**Vite 内置的环境变量：**\n- import.meta.env.MODE — 当前模式（development / production）\n- import.meta.env.DEV — 是否开发模式（boolean）\n- import.meta.env.PROD — 是否生产模式（boolean）\n- import.meta.env.BASE_URL — 部署的基础路径（来自 vite.config.js 的 base）\n\n> 🎭 环境变量就像演出前的后台配置——灯光师根据场地调试灯光，音响师根据厅堂调 EQ。开发和生产是两种完全不同的演出，需要不同的配置。',
      },
      {
        type: 'example',
        title: '看例子',
        content: '以下是一个使用环境变量的实际例子：\n\n\```js\n// src/config.js — 集中管理所有环境配置\nexport const config = {\n  apiBase: import.meta.env.VITE_API_BASE || \'http://localhost:3000/api\',\n  debug: import.meta.env.VITE_DEBUG === \'true\',\n  appTitle: import.meta.env.VITE_APP_TITLE || \'音乐收藏\',\n  enableAnalytics: import.meta.env.PROD  // 只在生产环境开启统计\n}\n\n// 在组件中使用\nimport { config } from \'./config.js\'\n\nconsole.log(\'当前环境：\', import.meta.env.MODE)\nconsole.log(\'API 地址：\', config.apiBase)\nconsole.log(\'调试模式：\', config.debug ? \'开启\' : \'关闭\')\n\```\n\n开发时运行 npm run dev，自动读取 .env.development。\n构建时运行 npm run build，自动读取 .env.production。',
      },
      {
        type: 'task',
        title: '动手试试 ✨',
        content: '在你的 music-collection-vue 项目中：\n\n1. 创建 .env.development 和 .env.production 文件\n2. 在两个文件中定义不同的 VITE_API_BASE 和 VITE_APP_TITLE\n3. 在项目中用 import.meta.env 读取这些变量，并在页面标题或 console.log 中显示\n4. 分别运行 npm run dev 和 npm run build && npm run preview，观察变量值的变化\n5. 确认 .gitignore 中包含 .env（避免提交到 Git）\n6. 挑战：在 vite.config.js 中用 define 选项定义自定义的全局常量',
      },
    ],
    starterCode: {
      html: '',
      css: '',
      js: '',
    },
  },

  // ================================================================
  // 第八章：Vue 实战
  // ================================================================

  // ===== 8.1 tooling-sfc =====
    {
    id: "tooling-sfc",
    trackId: "engineering",
    chapterId: "vue-framework",
    order: 1,
    title: "单文件组件 — .vue 文件的三段式",
    musicAnalogy:
      "一份完整的乐器分谱包含三个部分：**乐谱内容**（template，演奏什么）、**演奏标记**（script，怎么演奏——强弱、速度）、**声部说明**（style，这个声部的音色特征）。Vue 的单文件组件（`.vue` 文件）恰好也是三段：`<template>`、`<script setup>`、`<style scoped>`——合在一起，就是一个独立的、可复用的组件。",
    listenTo:
      "维瓦尔第《四季·春》第一乐章 — 弦乐齐奏（template，主体旋律）、独奏小提琴的华彩（script，动态逻辑）、通奏低音的持续伴奏（style，底色与氛围）。三段各司其职，合在一起是一首完美的协奏曲。",
    sections: [
      {
        type: "explain",
        title: ".vue 文件的三段结构",
        content:
          '打开 `src/App.vue`，你会看到：\n\n\```vue\n<script setup>\n// 1. 逻辑区 — 数据和函数\nimport { ref } from \'vue\'\n\nconst message = ref("你好，Vue！")\n</script>\n\n<template>\n  <!-- 2. 模板区 — HTML 结构 -->\n  <h1>{{ message }}</h1>\n</template>\n\n<style scoped>\n/* 3. 样式区 — CSS */\nh1 {\n  color: #8B2E2E;\n}\n</style>\n\```\n\n**三段各司其职：**\n- `<script setup>` — JavaScript 逻辑（数据、函数、计算属性等）。`setup` 关键词表示使用 Vue 3 的组合式 API 语法\n- `<template>` — HTML 模板（你在之前课程学的所有标签和指令都在这里：`{{ }}`、`v-if`、`v-for`、`@click` 等）\n- `<style scoped>` — CSS 样式。`scoped` 关键词让这些样式只作用于当前组件，不会影响其他组件\n\n和之前 CDN 方式对比：\n\n**CDN 方式（浏览器内）：**\n- JS、HTML、CSS 分在三个独立的编辑区\n- HTML 需要一个 `<div id="app">` 作为挂载点\n- `createApp({...}).mount("#app")` 手动挂载\n\n**.vue 文件方式（工程化）：**\n- 三段写在一个 `.vue` 文件里，一个组件一个文件\n- 不需要 `createApp` 和 `mount`——Vite 自动处理\n- 组件之间通过 `import` 引入',
      },
      {
        type: "explain",
        title: "组件的引入和使用",
        content:
          '在工程化项目中，组件就是 `.vue` 文件：\n\n**定义一个组件 `MusicCard.vue`：**\n\```vue\n<script setup>\ndefineProps(["name", "composer"])\n</script>\n\n<template>\n  <div class="card">\n    <h3>{{ name }}</h3>\n    <p>{{ composer }}</p>\n  </div>\n</template>\n\n<style scoped>\n.card {\n  border: 1px solid #D4C5A9;\n  border-radius: 10px;\n  padding: 16px;\n}\n</style>\n\```\n\n**在 `App.vue` 中使用：**\n\```vue\n<script setup>\nimport MusicCard from \'./components/MusicCard.vue\'\n</script>\n\n<template>\n  <MusicCard name="夜曲 Op.9 No.2" composer="肖邦" />\n  <MusicCard name="月光" composer="德彪西" />\n</template>\n\```\n\n注意：组件名在模板中写成 PascalCase（`<MusicCard>`），Vue 会自动识别。',
      },
      {
        type: "task",
        title: "你的任务 ✨",
        content:
          '1. 在 `src/components/` 下新建 `HelloMusic.vue`\n\n2. 写一个简单的组件：显示一句你最喜欢的音乐名言\n\n3. 在 `App.vue` 中 import 并使用这个组件\n\n4. 给组件添加 scoped 样式（字体、颜色、边框）\n\n5. 把 `<style scoped>` 改成 `<style>`（去掉 scoped），观察和之前有什么不同？\n\n> 💡 scoped 的作用：每个组件的样式只影响自己的模板，不会"泄漏"到其他组件。这是工程化的一大优势。',
      },
      {
        type: "hint",
        title: "文件命名约定",
        content:
          "组件文件通常使用 PascalCase 命名（首字母大写）：\n- ✅ `MusicCard.vue`\n- ✅ `HelloMusic.vue`\n- ❌ `musicCard.vue`（虽然也能用，但不推荐）\n- ❌ `music-card.vue`（同上）\n\n这就像音乐术语用意大利语标记——不是强制规定，但全世界通用的约定。",
      },
    ],
    starterCode: { html: "", css: "", js: "" },
    mode: "local",
  },

  // ===== 8.2 vue-directives =====
  {
    id: 'vue-directives',
    chapterId: 'vue-framework',
    trackId: "engineering",
    order: 2,
    title: 'Vue 指令 — 模板的演奏记号',
    musicAnalogy: '乐谱上有各种演奏记号——f 代表强奏、p 代表弱奏、tr 是颤音、反复记号指定哪些小节要重复。Vue 指令就是模板中的演奏记号：v-if 是此处休止（这个声部不奏）、v-show 是加弱音器（还在但静默）、v-for 是反复记号（同一乐句重复多次）、v-bind 是连音线（把数据和 DOM 属性连起来）、v-html 是即兴华彩段（直接插入内容，但需谨慎）。',
    listenTo: '帕格尼尼《24 首随想曲》— 每一首都是对一种特定演奏技巧（泛音、双音、拨弦、跳弓）的极致发挥。Vue 的每个指令就像一种特定的演奏技巧——各司其职，组合起来就是一场华丽的演出。',
    sections: [
      {
        type: 'explain',
        title: 'v-bind — 动态绑定属性',
        content: '`v-bind` 把 JS 表达式的值绑定到 HTML 属性上。简写是 `:`：\n\n\```html\n<!-- 完整写法 -->\n<img v-bind:src="imageUrl">\n<a v-bind:href="\'/user/\' + userId">用户</a>\n<div v-bind:class="{ active: isActive }">...</div>\n\n<!-- 简写（最常用） -->\n<img :src="imageUrl">\n<a :href="\'/user/\' + userId">用户</a>\n<div :class="{ active: isActive }">...</div>\n<div :style="{ color: textColor, fontSize: size + \'px\' }">...</div>\n\```\n\n**和 {{ }} 文本插值的区别：**\n- `{{ expression }}` — 把值插入到**文本内容**中\n- `v-bind:attr="expression"` — 把值绑定到**HTML 属性**上\n\n\```html\n<!-- 文本插值：显示在标签内容中 -->\n<p>{{ message }}</p>\n\n<!-- 属性绑定：绑定到 HTML 属性 -->\n<img :src="imageUrl" :alt="imageDesc">\n<button :disabled="isLoading">提交</button>\n\```\n\n就像连音线把两个音符连起来——v-bind 把 JS 数据和 DOM 属性连起来。',
      },
      {
        type: 'explain',
        title: 'v-if / v-show — 条件渲染',
        content: '**v-if / v-else-if / v-else：** 根据条件决定是否**创建/销毁** DOM 元素\n\n\```html\n<div v-if="status === \'loading\'">加载中...</div>\n<div v-else-if="status === \'error\'">出错了！</div>\n<div v-else-if="status === \'empty\'">没有数据</div>\n<div v-else>\n  <p>{{ result }}</p>\n</div>\n\```\n\n**v-show：** 根据条件决定是否**显示**元素（元素始终存在，只是切换 display:none）\n\n\```html\n<div v-show="isVisible">这段文字可以快速切换显示/隐藏</div>\n\```\n\n**v-if vs v-show 的选择：**\n\n| | v-if | v-show |\n|------|------|--------|\n| 机制 | 移除/创建 DOM | display: none 切换 |\n| 初始渲染 | 条件为 false 时不渲染 | 始终渲染 |\n| 切换开销 | 大（销毁+重建） | 小（只改 CSS） |\n| 适用场景 | 条件很少改变 | 频繁切换 |\n\n> 🎼 v-if 是这个乐手这场不参加（人根本不在舞台上），v-show 是这个乐手在场但保持沉默（人在但不出声）。',
      },
      {
        type: 'explain',
        title: 'v-for — 列表渲染',
        content: '`v-for` 遍历数组或对象，为每个元素渲染一段模板：\n\n\```html\n<!-- 遍历数组：item in items -->\n<ul>\n  <li v-for="item in items" :key="item.id">\n    {{ item.name }} — {{ item.price }} 元\n  </li>\n</ul>\n\n<!-- 带索引： (item, index) in items -->\n<li v-for="(item, index) in items" :key="item.id">\n  {{ index + 1 }}. {{ item.name }}\n</li>\n\n<!-- 遍历对象： (value, key, index) in obj -->\n<li v-for="(value, key) in composer" :key="key">\n  {{ key }}: {{ value }}\n</li>\n\n<!-- 遍历数字范围 -->\n<span v-for="n in 5" :key="n">{{ n }}</span>\n\```\n\n**`:key` 为什么重要：**\n\nkey 是 Vue 识别每个节点的唯一标识。没有 key 或 key 不唯一会导致：\n- 列表更新时出现错误的 DOM 复用\n- 组件状态错乱\n- 过渡动画失效\n\n始终给 v-for 一个唯一且稳定的 key（通常是 id，**永远不要用 index 作为 key** ——除非列表是静态的且不会重新排序）。',
      },
      {
        type: 'explain',
        title: 'v-html / v-text 与其他常用指令',
        content: '**v-html：** 把字符串当作 HTML 渲染（⚠️ 有 XSS 安全风险！）\n\n\```html\n<div v-html="rawHtml"></div>\n<!-- 仅在信任内容来源时使用！用户输入绝不能直接用 v-html -->\n\```\n\n**v-text：** 等价于 {{ }}，设置元素的文本内容\n\n\```html\n<span v-text="message"></span>\n<!-- 等价于 <span>{{ message }}</span> -->\n\```\n\n**v-once：** 只渲染一次，后续不再响应数据变化（静态内容优化）\n\n\```html\n<div v-once>这个标题永远不会变：{{ title }}</div>\n\```\n\n**v-pre：** 跳过这个元素及其子元素的编译（显示原始 Mustache 语法）\n\n\```html\n<pre v-pre>{{ 这里不会编译，直接显示 {{ message }} 原文 }}</pre>\n\```',
      },
      {
        type: 'example',
        title: '看例子：一个完整的指令演示',
        content: '下面的代码综合展示了所有主要指令。切换到预览区，实际操作感受：\n\n\```html\n<!-- 条件渲染：切换 tab -->\n<div :class="[\'tab\', { active: activeTab === \'all\' }]" @click="activeTab = \'all\'">全部</div>\n\n<!-- 列表渲染：遍历曲目 -->\n<div v-for="track in filteredTracks" :key="track.id" class="track-card">\n  <img :src="track.cover" :alt="track.title">\n  <h3>{{ track.title }}</h3>\n  <p v-if="track.artist">{{ track.artist }}</p>\n  <span :class="[\'tag\', \'tag-\' + track.genre]">{{ track.genre }}</span>\n</div>\n\n<!-- v-show 切换 -->\n<div v-show="showPlayer" class="player">播放器控件</div>\n\```\n\n注意：:class 可以接收对象（{ active: isActive }）或数组（[\'base\', dynamicClass]）。:style 同样支持对象语法。',
      },
      {
        type: 'task',
        title: '动手试试 ✨',
        content: '请在编辑器中：\n\n1. 修改 filterButtons 数组——添加一个印象派筛选选项\n2. 在 tracks 数组中添加两首你自己喜欢的曲目\n3. 用 v-if 添加暂无匹配曲目的空状态提示\n4. 把 v-show 切换按钮改成正在播放的动态显示\n5. 挑战：用 v-for 的索引给每张卡片前加上序号（1. 2. 3. ...），观察为每个 `<li>` 添加唯一的 :key',
      },
    ],
    starterCode: { html: "", css: "", js: "" },
    mode: "local",
  },

  // ===== 8.3 vue-lifecycle =====
  {
    id: 'vue-lifecycle',
    chapterId: 'vue-framework',
    trackId: "engineering",
    order: 3,
    title: 'Vue 生命周期 — 组件的乐章结构',
    musicAnalogy: '每首乐曲都有固定的结构——序奏呈示主题、展开部发展变化、再现部回归、尾声收束。Vue 组件也有自己的乐章结构（生命周期）：创建（setup）→ 挂载到 DOM（onMounted）→ 数据更新（onUpdated）→ 即将销毁（onBeforeUnmount）→ 已销毁（onUnmounted）。每个阶段都有对应的钩子函数，让你在正确的时间点执行正确的代码。',
    listenTo: '贝多芬《第五交响曲》全四个乐章 — 第一乐章：命运的动机登场（setup/onMounted），第二乐章：变奏展开（响应式更新），第三乐章：谐谑曲的神秘过渡（onBeforeUnmount），第四乐章：辉煌的凯旋（组件完成使命）。一部交响曲的生命周期，和 Vue 组件的生命周期如出一辙。',
    sections: [
      {
        type: 'explain',
        title: '什么是生命周期？',
        content: '每个 Vue 组件从创建到销毁，会经历一系列阶段。Vue 在每个阶段提供了**钩子函数（hooks）**，让你在特定时机执行代码：\n\n\```\nsetup() → 创建响应式状态\n  ↓\nonBeforeMount() → 即将挂载（很少用）\n  ↓\nonMounted() → 已挂载到 DOM ✅ 常用\n  ↓\nonBeforeUpdate() → 数据变了，DOM 即将更新\n  ↓\nonUpdated() → DOM 已更新\n  ↓\nonBeforeUnmount() → 组件即将销毁 ✅ 常用\n  ↓\nonUnmounted() → 组件已销毁\n\```\n\n**你只需要了解最常用的三个就够了：**\n- onMounted — 组件挂载完成后（操作 DOM、发请求、启定时器）\n- onBeforeUnmount — 组件销毁前（清理定时器、取消请求、移除事件监听）\n- watch / watchEffect — 响应式数据变化时自动执行\n\n> 🎼 就像在奏鸣曲的呈示部结束时要做转调，在再现部开始前要回到原调——生命周期的每个节点都有它特定的音乐任务。',
      },
      {
        type: 'explain',
        title: 'onMounted — 登台时刻',
        content: '`onMounted` 是使用最频繁的钩子。在 `<script setup>` 中，**顶层的代码在组件创建时执行**，但此时 DOM 还不存在。任何需要操作 DOM 的代码必须放在 onMounted 中：\n\n\```vue\n<script setup>\nimport { ref, onMounted } from \'vue\'\n\nconst inputRef = ref(null)  // template ref\n\n// ❌ 错误：此时 DOM 还没渲染，inputRef.value 是 null\n// inputRef.value.focus()\n\n// ✅ 正确：onMounted 中 DOM 已就绪\nonMounted(() => {\n  inputRef.value?.focus()    // 自动聚焦输入框\n  fetchUserData()            // 发初始请求\n  startTimer()               // 启动定时器\n  window.addEventListener(\'scroll\', handleScroll)  // 绑定全局事件\n})\n</script>\n\```\n\n**onMounted 的常见用途：**\n- 获取初始数据（调用 API）\n- 操作 DOM 元素（聚焦、滚动、初始化第三方库）\n- 启动定时器 / 订阅事件\n- 添加全局事件监听（scroll、resize、keydown）',
      },
      {
        type: 'explain',
        title: 'onBeforeUnmount — 谢幕前的清理',
        content: '组件销毁前，必须清理你在 onMounted 中创建的东西——否则会导致内存泄露或意外行为：\n\n\```vue\n<script setup>\nimport { ref, onMounted, onBeforeUnmount } from \'vue\'\n\nlet timer = null\n\nonMounted(() => {\n  timer = setInterval(() => {\n    console.log(\'tick\')\n  }, 1000)\n  window.addEventListener(\'resize\', handleResize)\n})\n\nonBeforeUnmount(() => {\n  clearInterval(timer)  // 清理定时器——不然组件销毁后还在 tick！\n  window.removeEventListener(\'resize\', handleResize)  // 移除事件监听——不然会内存泄露\n})\n</script>\n\```\n\n**清理清单：**\n- clearInterval / clearTimeout — 清除定时器\n- removeEventListener — 移除全局事件监听\n- 取消未完成的 fetch 请求（用 AbortController）\n- 销毁第三方库实例（如图表、地图）\n\n> 🎭 演出结束后的收琴——提琴手松弓毛、管乐手清理乐器、钢琴家合上琴盖。不清理的话，乐器会受损（内存泄露），下次演出也会出问题。',
      },
      {
        type: 'explain',
        title: 'watch 与 watchEffect — 自动跟进的伴奏',
        content: '虽然 watch 不是严格的生命周期钩子，但它和生命周期密切相关——它监听数据变化并在正确的时机执行。\n\n**watch：** 明确指定要监听的数据源\n\n\```vue\n<script setup>\nimport { ref, watch } from \'vue\'\n\nconst keyword = ref(\'\')\nconst results = ref([])\n\n// 监听 keyword 变化，自动搜索\nwatch(keyword, async (newVal, oldVal) => {\n  console.log(\'搜索词从\', oldVal, \'变为\', newVal)\n  if (newVal.trim()) {\n    results.value = await searchAPI(newVal)\n  }\n})\n\n// 监听多个数据源\nwatch([keyword, category], ([newKw, newCat]) => {\n  // keyword 或 category 任一变化都会触发\n})\n\n// 深度监听对象\nwatch(user, (newUser) => {\n  console.log(\'用户信息变化了\', newUser)\n}, { deep: true })\n</script>\n\```\n\n**watchEffect：** 自动追踪内部用到的响应式数据，任意一个变化就重新执行\n\n\```js\nwatchEffect(() => {\n  console.log(keyword.value, category.value)\n  document.title = keyword.value || \'音乐收藏\'\n})\n\```\n\n**watch vs watchEffect：**\n- watch — 明确知道要监听什么，可以获取旧值\n- watchEffect — 不需要指定依赖，自动追踪，更简洁',
      },
      {
        type: 'example',
        title: '看例子：生命周期实战',
        content: '下面的代码是一个时钟组件，完整展示了生命周期钩子的使用：\n\n\```vue\n<script setup>\nimport { ref, onMounted, onBeforeUnmount, watch } from \'vue\'\n\nconst time = ref(new Date().toLocaleTimeString())\nconst isRunning = ref(true)\nlet timer = null\n\nfunction tick() {\n  time.value = new Date().toLocaleTimeString()\n}\n\nfunction startClock() {\n  isRunning.value = true\n  timer = setInterval(tick, 1000)\n}\n\nfunction stopClock() {\n  isRunning.value = false\n  clearInterval(timer)\n  timer = null\n}\n\nonMounted(() => {\n  startClock()\n  console.log(\'🕐 时钟组件已挂载\')\n})\n\nonBeforeUnmount(() => {\n  clearInterval(timer)\n  console.log(\'🕐 时钟组件已卸载，定时器已清理\')\n})\n\nwatch(isRunning, (running) => {\n  console.log(\'时钟状态：\', running ? \'运行中\' : \'已暂停\')\n})\n</script>\n\```\n\n注意：如果不清除定时器，组件销毁后 setInterval 仍在运行——这就是内存泄露。',
      },
      {
        type: 'task',
        title: '动手试试 ✨',
        content: '请在编辑器中：\n\n1. 观察时钟组件——打开/关闭它，看控制台的生命周期日志\n2. 修改 onMounted 中的 startClock——让时钟初始显示为 1.5 倍速\n3. 用 watch 监听 time 的变化，在整分钟时打印 🎵\n4. 添加一个计数器（ref），在 onMounted 中启动自增，onBeforeUnmount 中清除\n5. 挑战：用 watchEffect 替代 watch，观察两者的区别',
      },
    ],
    starterCode: { html: "", css: "", js: "" },
    mode: "local",
  },

  // ===== 8.4 tooling-ref-reactive =====
    {
    id: "tooling-ref-reactive",
    trackId: "engineering",
    chapterId: "vue-framework",
    order: 4,
    title: "响应式数据 — ref 与 computed 的真实写法",
    musicAnalogy:
      "在乐理篇和合奏篇，你每次修改数据后都要手动调用 `render()` 更新页面——就像每次排练后手动重新整理乐谱。Vue 的 `ref` 和 `computed` 让这一切自动化：数据就像被施了魔法，你改一个值，所有用到它的地方自动更新。**你只需要关注数据本身，不用管 DOM。**",
    listenTo:
      "肖邦《即兴幻想曲》Op.66 — 左右手的节奏是 4 对 3，但听起来天衣无缝。ref 和 computed 的配合也是如此：ref 是右手的旋律（数据源），computed 是左手的琶音（自动派生的和声），Vue 让你不用手动协调它们。",
    sections: [
      {
        type: "explain",
        title: "ref — 响应式数据的起点",
        content:
          '在 `<script setup>` 中，用 `ref()` 创建响应式数据：\n\n\```vue\n<script setup>\nimport { ref } from \'vue\'\n\nconst count = ref(0)\nconst composer = ref("贝多芬")\nconst pieces = ref(["夜曲", "月光", "春"])\n\nfunction addOne() {\n  count.value++  // JS 中读写用 .value\n}\n</script>\n\n<template>\n  <p>计数：{{ count }}</p>        <!-- 模板中不需要 .value！ -->\n  <p>作曲家：{{ composer }}</p>\n  <button @click="addOne">+1</button>\n</template>\n\```\n\n**规则不变：JS 中用 `.value`，模板中不用。**\n\n但是写法更简洁了：在 `<script setup>` 中，变量和函数**自动暴露给模板**——不需要像 CDN 方式那样 `return { count, addOne }`！',
      },
      {
        type: "explain",
        title: "computed — 自动计算的派生数据",
        content:
          '`computed` 从其他数据自动推算出一个新值。依赖的数据变了，computed 自动重算。\n\n\```vue\n<script setup>\nimport { ref, computed } from \'vue\'\n\nconst pieces = ref([\n  { name: "夜曲", period: "浪漫主义" },\n  { name: "布兰登堡", period: "巴洛克" },\n  { name: "月光", period: "印象派" }\n])\n\nconst selectedPeriod = ref("全部")\n\n// 自动筛选\nconst filteredPieces = computed(() => {\n  if (selectedPeriod.value === "全部") return pieces.value\n  return pieces.value.filter(p => p.period === selectedPeriod.value)\n})\n\n// 自动计数\nconst count = computed(() => filteredPieces.value.length)\n</script>\n\n<template>\n  <button @click="selectedPeriod = \'巴洛克\'">巴洛克</button>\n  <p>共 {{ count }} 首</p>\n  <div v-for="p in filteredPieces" :key="p.name">\n    {{ p.name }} — {{ p.period }}\n  </div>\n</template>\n\```\n\n点击"巴洛克"按钮 → `selectedPeriod` 变了 → `filteredPieces` 自动重算 → `count` 自动重算 → 页面自动更新。三行 computed，替代了原来的手动 `render()` 函数！',
      },
      {
        type: "task",
        title: "你的任务 ✨",
        content:
          '在你的 `music-collection` 项目中：\n\n1. 在 `App.vue` 中创建一个曲目数组 `pieces`（ref）\n\n2. 用 `v-for` 在页面上渲染所有曲目\n\n3. 添加时期筛选按钮（"全部"、"巴洛克"、"浪漫主义"等）\n\n4. 用 `computed` 实现自动筛选\n\n5. 显示 "筛选出 X 首中的 Y 首"\n\n> 对比你在合奏篇手动 `render()` 的方案——是不是简单了很多？',
      },
      {
        type: "hint",
        title: "<script setup> 的优势",
        content:
          '`<script setup>` 是 Vue 3 推荐的写法，相比 CDN 方式：\n- **不需要 `return`** — 顶层变量和函数自动暴露\n- **不需要 `.value`** — 在模板中自动解包\n- **import 自动可用** — 你 import 的组件在模板中直接使用\n\n就像从"手动挡"换成了"自动挡"——做的事一样，但省了很多操作。',
      },
    ],
    starterCode: { html: "", css: "", js: "" },
    mode: "local",
  },

  // ===== 8.5 tooling-props-emits =====
    {
    id: "tooling-props-emits",
    trackId: "engineering",
    chapterId: "vue-framework",
    order: 5,
    title: "组件通信 — Props 向下，Emits 向上",
    musicAnalogy:
      '在乐团中，**指挥把总谱发给各声部**（Props，父→子），而**各声部首席向指挥反馈准备就绪**（Emits，子→父）。数据总是向下流动，事件总是向上传递——这个"单向数据流"原则让复杂的应用变得可预测。',
    listenTo:
      '贝多芬《第三交响曲"英雄"》第一乐章 — 主题（props 数据）在不同乐器组之间传递、变形，每个乐器组（子组件）拿到主题后用自己的方式诠释，但主题本身始终由指挥（父组件）掌控。',
    sections: [
      {
        type: "explain",
        title: "Props — 父组件给子组件传数据",
        content:
          '**子组件 `MusicCard.vue`：**\n\```vue\n<script setup>\n// 声明"我需要这些数据"\nconst props = defineProps({\n  name: String,\n  composer: String,\n  period: String,\n  liked: Boolean\n})\n</script>\n\n<template>\n  <div class="card">\n    <h3>{{ name }}</h3>\n    <p>{{ composer }} · {{ period }}</p>\n    <span>{{ liked ? \'❤\' : \'🤍\' }}</span>\n  </div>\n</template>\n\```\n\n**父组件 `App.vue`：**\n\```vue\n<script setup>\nimport { ref } from \'vue\'\nimport MusicCard from \'./components/MusicCard.vue\'\n\nconst pieces = ref([...])\n</script>\n\n<template>\n  <MusicCard\n    v-for="p in pieces"\n    :key="p.id"\n    :name="p.name"\n    :composer="p.composer"\n    :period="p.period"\n    :liked="p.liked"\n  />\n</template>\n\```\n\n`:name="p.name"` 中的冒号 `:` 是 `v-bind:` 的简写——表示传的是 JS 变量而不是字符串。',
      },
      {
        type: "explain",
        title: "Emits — 子组件通知父组件",
        content:
          '子组件不能直接修改父组件的数据——它只能"通知"父组件：\n\n**子组件 `MusicCard.vue`：**\n\```vue\n<script setup>\nconst props = defineProps(["name", "composer", "liked"])\n\n// 声明"我会发出这些事件"\nconst emit = defineEmits(["toggle-like", "delete"])\n</script>\n\n<template>\n  <div class="card">\n    <h3>{{ name }}</h3>\n    <button @click="emit(\'toggle-like\')">\n      {{ liked ? \'❤\' : \'🤍\' }}\n    </button>\n    <button @click="emit(\'delete\')">✕</button>\n  </div>\n</template>\n\```\n\n**父组件 `App.vue`：**\n\```vue\n<template>\n  <MusicCard\n    v-for="p in pieces"\n    :key="p.id"\n    :name="p.name"\n    :liked="p.liked"\n    @toggle-like="p.liked = !p.liked"\n    @delete="pieces = pieces.filter(item => item.id !== p.id)"\n  />\n</template>\n\```\n\n**数据流总结：**\n\```\n父组件（拥有数据）\n  │\n  │ Props ↓（传数据）\n  │\n子组件（接收数据，展示）\n  │\n  │ Emits ↑（发事件通知）\n  │\n父组件（收到通知，修改自己的数据）\n\```\n这就是"数据向下，事件向上"——Vue 的核心设计模式。',
      },
      {
        type: "task",
        title: "你的任务 ✨",
        content:
          "在你的 `music-collection` 项目中：\n\n1. 创建 `MusicCard.vue` 组件，接收 `name`、`composer`、`period`、`liked` 四个 props\n\n2. 组件中显示卡片布局（曲名、作曲家、时期标签、收藏按钮）\n\n3. 添加 `toggle-like` 和 `delete` 两个 emit\n\n4. 在 `App.vue` 中 import 并使用这个组件\n\n5. 用 `v-for` 循环渲染多张卡片\n\n> 💡 这个过程很像你在合奏篇做的组件拆分——但现在是在真正的 `.vue` 文件中，用标准的 props/emits 语法。",
      },
      {
        type: "hint",
        title: "TypeScript 风格的 Props 定义",
        content:
          '`defineProps` 有两种写法：\n\n**数组写法（简单）：**\n\```js\ndefineProps(["name", "composer"])\n\```\n\n**对象写法（带类型，推荐）：**\n\```js\ndefineProps({\n  name: String,\n  count: Number,\n  liked: Boolean\n})\n\```\n\n对象写法让使用你组件的人一眼就知道需要传什么数据。',
      },
    ],
    starterCode: { html: "", css: "", js: "" },
    mode: "local",
  },

  // ===== 8.6 vue-philosophy =====
    {
    id: "vue-philosophy",
    chapterId: "vue-framework",
    trackId: "engineering",
    order: 6,
    title: 'Vue 的思维方式 — 从"操作 DOM"到"声明结果"',
    musicAnalogy:
      '在此之前，你写 JS 操作 DOM 就像逐音给乐手指令："第一小提琴第二拍拉G"。而 Vue 像指挥给总谱——你描述"这里要有弦乐主题"，Vue 负责让弦乐在正确的时间出声。这是从**命令式**到**声明式**的思维转变。',
    listenTo:
      '巴赫《赋格的艺术》— 赋格是一种"声明式"作曲法：你声明一个主题，对位规则自动生成各声部的进入与呼应。Vue 的响应式系统也是如此——声明数据与模板的关系，框架自动处理同步。',
    sections: [
      {
        type: "explain",
        title: "命令式 vs 声明式",
        content:
          "**命令式（Imperative）：** 一步步告诉计算机怎么做。\n\```js\n// 纯 JS：操作 DOM\nconst title = document.createElement('h1')\ntitle.textContent = '你好，音乐世界'\ndocument.getElementById('app').appendChild(title)\n\```\n\n**声明式（Declarative）：** 描述你想要什么结果。\n\```vue\n<!-- Vue：声明结果 -->\n<template>\n  <h1>{{ message }}</h1>\n</template>\n<script setup>\nconst message = '你好，音乐世界'\n</script>\n\```\n\n命令式像给乐手发微信：\"左手按G弦第二品，右手拨弦\"——高效但不优雅。声明式像给乐手一份乐谱——他知道该做什么，你只管结果。",
      },
      {
        type: "explain",
        title: "Vue 的核心思想",
        content:
          'Vue 的三个核心理念：\n\n1. **响应式数据：** 数据变了，页面自动更新。你不需要手动 `document.querySelector().textContent = ...`\n\n2. **组件化：** 把页面拆成独立、可复用的组件，像乐团中的不同声部（弦乐组、管乐组、打击乐组）\n\n3. **声明式渲染：** 在模板中描述 UI 应该长什么样，Vue 负责把数据渲染到 DOM\n\n> 💡 你不是在"操作 DOM"，你是在"描述 UI"。Vue 负责中间的一切。',
      },
      {
        type: "example",
        title: "reactivity 的本质",
        content:
          'Vue 的响应式系统让你专注于数据：\n\n\```vue\n<script setup>\nimport { ref } from \'vue\'\n\nconst count = ref(0)  // 响应式数据\n\nfunction increment() {\n  count.value++  // 修改数据\n  // 无需操作 DOM！页面自动更新\n}\n</script>\n\n<template>\n  <p>已点赞 {{ count }} 次</p>\n  <button @click="increment">👍 点赞</button>\n</template>\n\```\n\n就像 MIDI 键盘：你按键，声音自动发出。你不用管"怎么发声"——那已经被系统处理好了。你只管演奏。',
      },
      {
        type: "task",
        title: "反思题 🤔",
        content:
          '回顾你在乐理篇和合奏篇中用纯 JS 写的代码（querySelector、innerHTML、appendChild）。现在闭上眼睛想象：如果数据变了页面自动更新，你能省去多少代码？\n\n这就是 Vue 的价值。接下来的课程会逐步展开这个"魔法"背后的原理，以及如何在实际项目中使用它。',
      },
    ],
    starterCode: { html: "", css: "", js: "" },
    mode: "local",
  },

  // ===== 8.7 vue-computed-watch =====
    {
    id: "vue-computed-watch",
    chapterId: "vue-framework",
    trackId: "engineering",
    order: 7,
    title: 'computed 与 watch — 自动跟进的"伴奏"',
    musicAnalogy:
      '乐队中有两种伴奏方式：一种是钢琴跟着主旋律自动配和声（computed——自动计算，有缓存）；一种是鼓手听到变换后才改变节奏型（watch——观察变化，执行副作用）。两者各有用途，选对工具让你的"演奏"更流畅。',
    listenTo:
      '舒伯特《鳟鱼五重奏》— 五个乐器各有角色：钢琴提供和声基础（computed），低音提琴时而拨弦时而拉弓（watch 到主旋律变化时改变奏法）。听这首歌时想一下：谁在"计算"，谁在"观察"？',
    sections: [
      {
        type: "explain",
        title: "computed — 自动计算的属性",
        content:
          "当某个值可以由其他数据**推导**出来时，用 `computed`：\n\n\```vue\n<script setup>\nimport { ref, computed } from 'vue'\n\nconst pieces = ref([\n  { name: '月光', period: '古典主义' },\n  { name: '夜曲', period: '浪漫主义' },\n  { name: '春', period: '巴洛克' },\n  { name: '致爱丽丝', period: '古典主义' },\n])\n\n// computed：自动计算，有缓存\nconst classicalPieces = computed(() => {\n  return pieces.value.filter(p => p.period === '古典主义')\n})\n</script>\n\n<template>\n  <p>古典主义曲目：{{ classicalPieces.length }} 首</p>\n  <ul>\n    <li v-for=\"p in classicalPieces\" :key=\"p.name\">{{ p.name }}</li>\n  </ul>\n</template>\n\```\n\n`classicalPieces` 会自动跟随 `pieces` 的变化重新计算。而且有**缓存**——不依赖的值没变，不会重复计算。",
      },
      {
        type: "example",
        title: "computed vs 普通函数",
        content:
          "为什么不用普通函数？\n\n\```js\n// ❌ 普通函数：每次模板重渲染都重新计算\nfunction getClassical() {\n  return pieces.value.filter(p => p.period === '古典主义')\n}\n\n// ✅ computed：只在 pieces 变化时才重新计算\nconst classicalPieces = computed(() => {\n  return pieces.value.filter(p => p.period === '古典主义')\n})\n\```\n\n就像乐谱翻页：函数式每次都从头到尾唱一遍来找古典曲目；computed 像在谱子上贴了标签——曲目单不变就不用重新翻。",
      },
      {
        type: "example",
        title: "watch — 观察变化，执行操作",
        content:
          "`watch` 用于\"当某个值变了，我要做点什么\"——比如保存到 localStorage、发请求：\n\n\```vue\n<script setup>\nimport { ref, watch } from 'vue'\n\nconst searchKeyword = ref('')\nconst results = ref([])\n\n// watch：监测 keyword 变化，执行副作用\nwatch(searchKeyword, async (newVal, oldVal) => {\n  if (newVal.length === 0) {\n    results.value = []\n    return\n  }\n  console.log(\\`搜索：\\${oldVal} → \\${newVal}\\`)\n  results.value = await searchAPI(newVal)\n})\n</script>\n\```\n\n`watch` 适合：\n- 保存数据到 localStorage\n- 搜索/筛选触发 API 请求\n- 某个值变化时更新页面标题\n- 数据变化时触发动画",
      },
      {
        type: "example",
        title: "computed vs watch：选哪个？",
        content:
          "| 场景 | 用什么 | 为什么 |\n|------|--------|--------|\n| 筛选/排序列表 | computed | 纯计算，需要缓存 |\n| 格式化显示 | computed | 依赖数据 → 派生值 |\n| 数据变了要发请求 | watch | 有副作用 |\n| 数据变了要存 localStorage | watch | 有副作用 |\n| 多个依赖组合判断 | computed | 自动追踪依赖 |\n\n**口诀：** 需要**返回值**用 computed，需要**做事情**用 watch。",
      },
      {
        type: "task",
        title: "动手试试 ✨",
        content:
          '在你的 `music-collection` 项目中：\n\n1. 添加 `computed`：根据用户选择的时期（period）筛选曲目列表\n2. 添加 `watch`：当曲目列表变化时，自动保存到 `localStorage`\n\n> 这两个功能你在"合奏篇"中用纯 JS 手动实现过。现在用 Vue 的 computed/watch，体会一下代码量的差异。',
      },
    ],
    starterCode: { html: "", css: "", js: "" },
    mode: "local",
  },

  // ===== 8.8 vue-vmodel-deep =====
    {
    id: "vue-vmodel-deep",
    chapterId: "vue-framework",
    trackId: "engineering",
    order: 8,
    title: 'v-model 深入 — 双向绑定的"默契"',
    musicAnalogy:
      '在四手联弹中，两位演奏者需要完美默契：一个人弹主旋律，另一个人同时配合，两人互相倾听、即时响应。`v-model` 就是数据和表单之间的"四手联弹"——用户输入，数据更新；数据变化，表单自动显示。',
    listenTo:
      '勃拉姆斯《匈牙利舞曲第一号》— 钢琴四手联弹的经典曲目。两个声部你来我往、相互呼应，正如 v-model 在前端数据和用户输入之间的"双向默契"。',
    sections: [
      {
        type: "explain",
        title: "v-model 的本质",
        content:
          '`v-model` 是 Vue 中最常用的指令之一。它实际是 `v-bind:value` + `v-on:input` 的语法糖：\n\n\```vue\n<!-- 这两行等价 -->\n<input v-model="name">\n<input :value="name" @input="name = $event.target.value">\n\```\n\n它做了什么？\n1. 把 `name` 的值绑定到 input 的 value（数据 → 视图）\n2. 当用户输入时，自动更新 `name`（视图 → 数据）\n\n这就是**双向绑定**——数据和视图始终保持同步。',
      },
      {
        type: "example",
        title: "不同表单元素的 v-model",
        content:
          '\```vue\n<script setup>\nimport { ref } from \'vue\'\n\nconst text = ref(\'\')          // 文本输入\nconst checked = ref(false)     // 复选框\nconst selected = ref(\'\')      // 单选/下拉\nconst options = ref([])        // 多选\n</script>\n\n<template>\n  <!-- 文本 -->\n  <input v-model="text" placeholder="输入曲名">\n  <p>你输入了：{{ text }}</p>\n\n  <!-- 复选框 -->\n  <label><input type="checkbox" v-model="checked"> 已收藏</label>\n\n  <!-- 下拉选择 -->\n  <select v-model="selected">\n    <option value="">选择时期</option>\n    <option>巴洛克</option>\n    <option>古典主义</option>\n    <option>浪漫主义</option>\n  </select>\n  <p>选中：{{ selected }}</p>\n</template>\n\```\n\n每种表单元素都能用 `v-model`，Vue 自动处理不同类型的事件。',
      },
      {
        type: "example",
        title: "v-model 修饰符",
        content:
          '修饰符让你精确控制 v-model 的行为：\n\n\```vue\n<!-- .lazy：不在 input 时更新，在 change 时更新 -->\n<input v-model.lazy="name">\n\n<!-- .number：自动转为数字 -->\n<input v-model.number="age" type="text">\n\n<!-- .trim：自动去除首尾空格 -->\n<input v-model.trim="title">\n\```\n\n这些修饰符就像音符上的标记——`.lazy` 是延音记号，`.number` 是指法标注，`.trim` 是休止符前的渐弱。',
      },
      {
        type: "task",
        title: "动手试试 ✨",
        content:
          "在你的 `music-collection` 项目中，用 `v-model` 实现：\n\n1. **添加曲目表单：** 曲名、作曲家、时期——三个输入框都用 v-model\n2. **筛选下拉框：** 用 v-model 绑定选中的时期，配合 computed 筛选列表\n3. **收藏开关：** 用 checkbox + v-model 实现收藏/取消收藏\n\n完成后，你会发现：没有一行 `addEventListener`、没有一行 `.value = ...`——这就是 Vue 的优雅。",
      },
    ],
    starterCode: { html: "", css: "", js: "" },
    mode: "local",
  },

  // ===== 8.9 vue-slots =====
    {
    id: "vue-slots",
    chapterId: "vue-framework",
    trackId: "engineering",
    order: 9,
    title: '插槽（Slots）— 组件的"自由声部"',
    musicAnalogy:
      '协奏曲中有华彩乐段（Cadenza）——作曲家留出空白，由独奏者自由发挥。**Slot（插槽）** 就是组件的"华彩乐段"：组件定义框架，使用者在 Slot 中填入自定义内容。这让组件既统一又灵活。',
    listenTo:
      "莫扎特《第21钢琴协奏曲》第二乐章 — 协奏曲的形式本身就诠释了 Slot 的思想：管弦乐队提供结构（组件框架），钢琴在 Slot 中填入独奏内容。两者完美融合。",
    sections: [
      {
        type: "explain",
        title: "什么是 Slot？",
        content:
          '之前你学的 props 让组件接收**数据**。Slot 让组件接收**模板内容**。\n\n\```vue\n<!-- Card.vue — 定义组件，留出 Slot -->\n<template>\n  <div class="card">\n    <div class="card-header">\n      <slot name="header">默认标题</slot>\n    </div>\n    <div class="card-body">\n      <slot>默认内容</slot>  <!-- 默认 Slot -->\n    </div>\n    <div class="card-footer">\n      <slot name="footer">\n        <button>确定</button>  <!-- 默认 footer -->\n      </slot>\n    </div>\n  </div>\n</template>\n\```\n\n\```vue\n<!-- App.vue — 使用组件，填入内容 -->\n<template>\n  <Card>\n    <template #header>\n      <h2>🎵 月光奏鸣曲</h2>\n    </template>\n\n    <p>作曲：贝多芬</p>\n    <p>时期：古典主义</p>\n\n    <template #footer>\n      <button @click="like">❤️ 收藏</button>\n    </template>\n  </Card>\n</template>\n\```',
      },
      {
        type: "example",
        title: "Slot vs Props：选择指南",
        content:
          "| 场景 | 用什么 |\n|------|--------|\n| 传递文本/数字 | props |\n| 传递 HTML 结构 | slot |\n| 传递回调函数 | emits |\n| 组件布局框架 | slot |\n| 简单配置项 | props |\n\n**口诀：** Props 传数据，Slots 传结构，Emits 传事件。\n\n就像乐谱上的标记：\n- Props = 音符（数据）\n- Slots = 华彩乐段（留给演奏者填充的内容）\n- Emits = 力度记号（告诉指挥这里要怎么处理）",
      },
      {
        type: "task",
        title: "动手试试 ✨",
        content:
          "在你的 `music-collection` 项目中：\n\n1. 把曲目卡片提取成 `MusicCard.vue` 组件\n2. 用**默认 slot** 让使用者传入卡片内容\n3. 用**具名 slot**（#header, #footer）分别定义卡片的顶部和底部\n4. 在 App.vue 中使用时，不同的卡片可以有不同的 header 样式\n\n这样你的组件既保持了结构一致性，又有了内容的灵活性。",
      },
    ],
    starterCode: { html: "", css: "", js: "" },
    mode: "local",
  },

  // ===== 8.10 vue-router-intro =====
    {
    id: "vue-router-intro",
    chapterId: "vue-framework",
    trackId: "engineering",
    order: 10,
    title: 'Vue Router — 给你的应用"翻页"',
    musicAnalogy:
      '一本乐谱有目录，你可以翻到任何一页。交响乐有四个乐章，听众知道"现在在第几乐章"。单页应用（SPA）的多页面体验就靠 **Vue Router** ——它让 URL 变化时页面切换，就像翻乐谱一样自然。',
    listenTo:
      '穆索尔斯基《图画展览会》— 这部作品用"漫步"主题连接十幅音乐画卷。URL 就像"漫步"：在不同页面间导航，每个页面是一幅独立的"音乐画作"。',
    sections: [
      {
        type: "explain",
        title: "为什么需要 Router？",
        content:
          '至此你的 Vue 应用只有一个页面。但实际上，一个完整的应用通常有：\n\n- 首页（作品列表）\n- 详情页（单个作品详情）\n- 关于页\n- 404 页面\n\nVue Router 让你在不刷新页面的情况下切换"页面"——URL 变了，内容变了，但页面没有白屏刷新。这就是**单页应用（SPA）**。',
      },
      {
        type: "example",
        title: "基础路由设置",
        content:
          "\```js\n// src/router/index.js\nimport { createRouter, createWebHistory } from 'vue-router'\nimport Home from '../views/Home.vue'\nimport Detail from '../views/Detail.vue'\n\nconst router = createRouter({\n  history: createWebHistory(),\n  routes: [\n    { path: '/', component: Home },\n    { path: '/piece/:id', component: Detail }  // 动态路由\n  ]\n})\n\nexport default router\n\```\n\n在 `main.js` 中注册：\n\```js\nimport { createApp } from 'vue'\nimport router from './router'\nimport App from './App.vue'\n\ncreateApp(App).use(router).mount('#app')\n\```",
      },
      {
        type: "example",
        title: "<router-link> 和 <router-view>",
        content:
          '\```vue\n<!-- App.vue — 布局 -->\n<template>\n  <nav>\n    <!-- 导航链接：to 是目标路径 -->\n    <router-link to=\"/\">🏠 首页</router-link>\n    <router-link to=\"/about\">ℹ️ 关于</router-link>\n  </nav>\n\n  <!-- 路由出口：匹配的组件渲染在这里 -->\n  <router-view />\n</template>\n\```\n\n\```vue\n<!-- Detail.vue — 获取路由参数 -->\n<script setup>\nimport { useRoute } from \'vue-router\'\nconst route = useRoute()\nconst pieceId = route.params.id  // 来自 /piece/:id\n</script>\n\n<template>\n  <p>正在查看作品：{{ pieceId }}</p>\n</template>\n\```\n\n`<router-link>` 替代 `<a href>`。`<router-view>` 是页面内容的"插座"。',
      },
      {
        type: "example",
        title: "编程式导航",
        content:
          "有时候不能只用 `<router-link>`，需要在 JS 中跳转：\n\n\```vue\n<script setup>\nimport { useRouter } from 'vue-router'\nconst router = useRouter()\n\nfunction goToDetail(id) {\n  router.push(\\`/piece/\\${id}\\`)  // 跳转到详情页\n}\n\nfunction goBack() {\n  router.back()  // 返回上一页\n}\n</script>\n\```\n\n`router.push()` 就像点击链接，`router.back()` 就像按浏览器的后退键。",
      },
      {
        type: "task",
        title: "动手试试 ✨",
        content:
          "在你的 `music-collection` 项目中添加路由：\n\n1. **首页 `/`：** 展示所有曲目（列表 + 筛选）\n2. **详情页 `/piece/:id`：** 展示单个曲目的详细信息\n3. **关于页 `/about`：** 介绍你自己和这个项目\n\n从列表点击一首曲子 → 跳转到详情页 → 点击返回 → 回到列表。整个流程不刷新页面，体验流畅。",
      },
      {
        type: "hint",
        title: "实现步骤",
        content:
          "1. `npm install vue-router`\n2. 创建 `src/router/index.js`\n3. 创建 `src/views/Home.vue`、`Detail.vue`、`About.vue`\n4. 在 `main.js` 中 `app.use(router)`\n5. 在 `App.vue` 中添加 `<router-view />` 和导航\n6. 把原来的内容移到 `Home.vue` 中",
      },
    ],
    starterCode: { html: "", css: "", js: "" },
    mode: "local",
  },

  // ===== 8.11 tooling-capstone =====
    {
    id: "tooling-capstone",
    trackId: "engineering",
    chapterId: "vue-framework",
    order: 11,
    title: "登台篇结业 — 你的第一个工程化作品",
    musicAnalogy:
      "独奏会的时间到了。你已经从认识乐器（乐理篇）、学会合奏（合奏篇）、掌握了演出流程（登台篇）——现在，**在真正的音乐厅里，用专业的方式，演奏你自己的作品。**",
    listenTo:
      "贝多芬《第九交响曲》第四乐章 — 这不仅是音乐的巅峰，也是工程化的杰作：独唱、合唱、管弦乐队在精确的指挥下协作。你的结业项目也是如此：Vue 组件（声部）+ Vite 构建（指挥）+ Git 版本管理（排练记录）+ GitHub Pages 部署（音乐厅公演）。",
    sections: [
      {
        type: "explain",
        title: "回顾你学会了什么",
        content:
          '从乐理篇到现在，你的成长路径：\n\n| 阶段 | 技能 | 工具 |\n|------|------|------|\n| 乐理篇 | HTML/CSS/JS 基础 | 浏览器、在线编辑器 |\n| 合奏篇 | 工作流、调试、命名、数据驱动 | 浏览器、在线编辑器 |\n| 登台篇 | Node.js、npm、Vite、Vue SFC、组件通信、Git、部署 | **VS Code、终端、GitHub** |\n\n在乐理篇你写第一个 `<h1>你好世界</h1>` 时，你可能想不到：几个月后，你会在终端里敲 `npm run build`，把一个完整的 Vue 应用部署到互联网上。\n\n**这就是工程化**——不是学更多语法，而是掌握让代码从"能跑"到"专业"的完整流程。',
      },
      {
        type: "task",
        title: "结业项目：音乐收藏管理器 🎵",
        content:
          '在你的 `music-collection` 项目中，实现一个完整的**音乐收藏管理器**。功能要求：\n\n**基础功能（必须完成）：**\n\n1. 用 `v-for` 展示曲目列表（每首包含曲名、作曲家、时期）\n\n2. 用 `computed` 实现按时期筛选\n\n3. 用 `v-model` + 表单实现添加新曲目\n\n4. 用 `localStorage` 持久化数据（刷新不丢失）\n\n**进阶功能（建议完成）：**\n\n5. 把卡片提取成 `MusicCard.vue` 组件（props + emits）\n\n6. 添加"收藏/取消收藏"功能\n\n7. 添加删除曲目功能\n\n8. 用 `Git` 管理版本（至少 3 次 commit）\n\n9. 部署到 GitHub Pages\n\n**项目结构参考：**\n\```\nmusic-collection/\n├── src/\n│   ├── App.vue              # 主页面（列表 + 筛选 + 表单）\n│   ├── components/\n│   │   ├── MusicCard.vue     # 曲目卡片组件\n│   │   ├── FilterBar.vue     # 筛选按钮组\n│   │   └── AddForm.vue       # 添加曲目表单\n│   └── main.js\n├── package.json\n└── vite.config.js\n\```\n\n> 💡 这是你在乐理篇"作品集"中用纯 HTML/CSS/JS 做过的同一个项目。现在用工程化的 Vue 重写它——你会清晰地看到"工程化"带来了什么。',
      },
      {
        type: "hint",
        title: "如果卡住了",
        content:
          '- **忘了 ref 怎么用？** → 回顾第 2 课\n- **忘了 props/emits？** → 回顾第 3 课\n- **忘了怎么部署？** → 回顾第 8 课\n- **localStorage 读写：** `localStorage.setItem("key", JSON.stringify(data))` / `JSON.parse(localStorage.getItem("key"))`\n- **最重要的是：** 你已经具备了所有需要的技能。相信自己，一步步来。',
      },
      {
        type: "explain",
        title: "下一步是什么？",
        content:
          "完成这个结业项目后，你已经是一个**入门级前端开发者**了。你学会了：\n\n✅ 用 HTML/CSS/JS 构建页面\n✅ 用 Vue 组件化思维组织代码\n✅ 用 npm + Vite 搭建工程化项目\n✅ 用 Git 管理代码版本\n✅ 用 GitHub Pages 部署上线\n\n接下来的方向：\n- **作品集 v2：** 用 Vue 重构你的音乐收藏库（component、router、store）\n- **作品集 v3：** 学习后端 API，做一个完整的全栈应用\n- **持续学习：** Vue Router、Pinia 状态管理、TypeScript、测试……\n\n> 🎵 编程的世界就像音乐——你永远有新的曲目可以学，新的技巧可以练。但你已经有了最重要的东西：**基本功和信心**。",
      },
    ],
    starterCode: { html: "", css: "", js: "" },
    mode: "local",
  },

];

import type { Lesson, Chapter } from '../types'

export const chapters: Chapter[] = [
  {
    id: 'html-basics',
    title: '第一章：HTML 基础',
    subtitle: '用代码谱写你的第一页乐谱',
    icon: '🎼'
  },
  {
    id: 'css-style',
    title: '第二章：CSS 样式',
    subtitle: '为音乐增添色彩与层次',
    icon: '🎨'
  },
  {
    id: 'css-layout',
    title: '第三章：CSS 布局',
    subtitle: '排列你的音乐元素',
    icon: '📐'
  },
  {
    id: 'js-basics',
    title: '第四章：JavaScript 入门',
    subtitle: '让页面动起来，像音乐一样流动',
    icon: '🎹'
  }
]

export const lessons: Lesson[] = [
  // ================================================================
  // 第一章：HTML 基础
  // ================================================================

  // ===== 1.1 认识 HTML =====
  {
    id: 'html-intro',
    chapterId: 'html-basics',
    order: 1,
    title: '认识 HTML — 你的第一行代码',
    musicAnalogy: 'HTML 就像五线谱，它决定了页面上有什么内容。五线谱告诉演奏者弹什么音，HTML 告诉浏览器显示什么内容。',
    listenTo: '巴赫《C大调前奏曲》BWV 846 — 结构清晰、简单纯粹，就像你即将写下的第一行 HTML。',
    sections: [
      {
        type: 'explain',
        title: '什么是 HTML？',
        content: 'HTML 是网页的骨架。想象一下：**五线谱上有音符，网页上有内容。**\n\n打开任何网页，你看到的所有文字、图片、链接，都是用 HTML 写出来的。就像作曲家把音符写在五线谱上，开发者把内容写在 HTML 里。'
      },
      {
        type: 'explain',
        title: '标签 — HTML 的"音符"',
        content: 'HTML 使用**标签（tag）**来标记内容。每个标签用尖括号 `< >` 包裹：\n\n- `<h1>` 是大标题，像乐章标题\n- `<p>` 是段落，像乐谱中的乐句\n\n标签通常成对出现：`<h1>内容</h1>`，就像乐谱的小节线一样，有开始就有结束。'
      },
      {
        type: 'example',
        title: '看一个例子',
        content: '下面这段代码就是编辑器中你看到的代码。一个 `<h1>` 大标题加上一段 `<p>` 文字：\n\n```html\n<h1>你好，音乐世界！</h1>\n<p>我开始了我的编程之旅。</p>\n```\n右边预览区会实时显示这段代码的效果。'
      },
      {
        type: 'task',
        title: '动手试试 ✨',
        content: '请修改编辑器中的 `<h1>` 标签里的内容，把标题改成你自己的名字或你想写的任何内容。改完后看看右侧预览区，你会发现页面立刻发生了变化！'
      }
    ],
    starterCode: {
      html: '<h1>你好，音乐世界！</h1>\n<p>我开始了我的编程之旅。</p>',
      css: '',
      js: ''
    }
  },

  // ===== 1.2 HTML 文档结构 =====
  {
    id: 'html-doc-structure',
    chapterId: 'html-basics',
    order: 2,
    title: 'HTML 文档结构 — 了解网页的"乐谱格式"',
    musicAnalogy: '每份乐谱都有固定的格式：左上角写曲名、右上角标速度、第一行是谱号调号、最后画终止线。HTML 文档也有标准结构——`<!DOCTYPE>` 是"这是乐谱"的声明、`<head>` 是页面的"调号信息"、`<body>` 是"乐谱正文"。了解这个结构，你才算真正看懂了一份网页"乐谱"。',
    listenTo: '巴赫《哥德堡变奏曲》咏叹调 — 开篇的 Aria 像 `<head>` 宣布主题框架，随后的 30 段变奏像 `<body>` 承载着丰富变化的内容，最终回到 Aria 就像 `</html>` 的闭环。每一份乐谱都有开端和终结——歌德堡的结构严谨清晰，正如一份标准的 HTML 文档。',
    sections: [
      {
        type: 'explain',
        title: '每个网页都有一副"骨架"',
        content: '你之前写的 `<h1>` 和 `<p>` 代码，实际上运行在一个看不见的文档结构里。完整的 HTML 页面长这样：\n\n```html\n<!DOCTYPE html>\n<html lang="zh-CN">\n<head>\n  <meta charset="UTF-8">\n  <meta name="viewport" content="width=device-width, initial-scale=1.0">\n  <title>我的页面标题</title>\n</head>\n<body>\n  <h1>你好，音乐世界！</h1>\n  <p>这是页面上可见的内容。</p>\n</body>\n</html>\n```\n\n这就是一份"标准乐谱"——每一部分都有固定的位置和意义。'
      },
      {
        type: 'explain',
        title: '逐行读懂这个结构',
        content: '**`<!DOCTYPE html>`** — 声明"这是 HTML5 文档"。就像乐谱封面上写着"钢琴独奏谱"，浏览器看到这行就知道用什么规则来解析页面。\n\n**`<html lang="zh-CN">`** — 整个文档的根元素，`lang` 属性告诉浏览器页面是什么语言。\n\n**`<head>` — 页面"元信息"区**，不显示在页面上：\n- `<meta charset="UTF-8">` — 声明字符编码（**必须写！**不然中文会乱码）\n- `<meta name="viewport" ...>` — 告诉手机浏览器正确缩放（响应式必备）\n- `<title>` — 浏览器标签页上显示的文字\n\n**`<body>` — 页面"正文"**，你之前写的所有内容都放在这里面。'
      },
      {
        type: 'explain',
        title: 'head 中的其他重要元素',
        content: '`<head>` 区还可以包含：\n\n```html\n<head>\n  <!-- 链接 CSS 样式文件 -->\n  <link rel="stylesheet" href="style.css">\n\n  <!-- 网站的图标（favicon） -->\n  <link rel="icon" href="favicon.ico">\n\n  <!-- SEO 描述 -->\n  <meta name="description" content="一个学习编程的音乐主题网站">\n</head>\n```\n\n虽然 `<head>` 里的内容不直接显示在页面上，但它像乐谱上的速度标记 Andante 一样——决定了页面如何被理解和渲染。'
      },
      {
        type: 'example',
        title: '看例子',
        content: '现在你右侧编辑器中看到的代码，就是放在 `<body>` 里面的。但这个教学平台已经帮你写好了 `<head>` 和 `<body>` 的框架——这就是为什么你只需要写内容部分的代码。\n\n当你未来自己创建一个 `.html` 文件时，记得要先写完整的文档结构！\n\n```html\n<!-- 你将来会这样开始一个网页 -->\n<!DOCTYPE html>\n<html lang="zh-CN">\n<head>\n  <meta charset="UTF-8">\n  <title>我的音乐博客</title>\n</head>\n<body>\n  <!-- 你的内容写在这里 -->\n</body>\n</html>\n```'
      },
      {
        type: 'task',
        title: '动手试试 ✨',
        content: '目前编辑器里只显示 body 内容。试试：\n\n1. 打开浏览器开发者工具（F12），在 Elements/元素 面板中查看页面完整结构——你能找到 `<head>` 和 `<body>` 标签吗？\n2. 修改 `<h1>` 标签中的标题\n3. 挑战：在 HTML 中写两组内容——用 `<!-- -->` 注释掉其中一组，看效果'
      }
    ],
    starterCode: {
      html: '<h1>你好，音乐世界！</h1>\n\n<!-- 这是一条HTML注释，不会显示在页面上 -->\n\n<p>我了解了 HTML 文档的完整结构：</p>\n\n<ul>\n  <li>&lt;!DOCTYPE&gt; — 文档类型声明</li>\n  <li>&lt;html&gt; — 整个页面的根</li>\n  <li>&lt;head&gt; — 元信息（标题、编码等）</li>\n  <li>&lt;body&gt; — 所有可见内容</li>\n</ul>\n\n<p>打开 F12 开发者工具，在 Elements 面板中查看完整页面结构！</p>',
      css: 'h1 {\n  color: #8B2E2E;\n  margin-bottom: 14px;\n}\n\np {\n  color: #3D2B1F;\n  line-height: 1.6;\n  margin-bottom: 10px;\n}\n\nul {\n  background: #FFFAF2;\n  border: 1px solid #D4C5A9;\n  border-radius: 8px;\n  padding: 16px 28px;\n}\n\nli {\n  color: #6B5A4E;\n  margin: 6px 0;\n  font-family: \'Fira Code\', monospace;\n  font-size: 14px;\n}',
      js: ''
    }
  },

  // ===== 1.3 文本与强调 =====
  {
    id: 'html-emphasis',
    chapterId: 'html-basics',
    order: 3,
    title: '文本与强调 — 描述你的音乐故事',
    musicAnalogy: '`<strong>` 标签像乐谱中的**强音记号（f）**，强调重要内容；`<em>` 像**连音线**，让文字更富感情。',
    listenTo: '贝多芬《第五交响曲》第一乐章 — 感受强弱对比带来的戏剧性，就像文字中的强调与语气。',
    sections: [
      {
        type: 'explain',
        title: '让文字更有表现力',
        content: '上一节课我们学会了写标题和段落。但这就像只有一种力度的音乐——太平淡了。\n\n现在我们来学习两个新标签，让文字也有"强弱变化"：\n\n- `<strong>` — **加粗强调**，像强音记号 **f**\n- `<em>` — *斜体强调*，像连音线，让语气更柔和\n- `<br>` — 换行，像乐谱中的呼吸记号'
      },
      {
        type: 'example',
        title: '看例子',
        content: '下面就是编辑器中的代码。注意看 `<strong>` 和 `<em>` 标签是如何包裹文字的：\n\n```html\n<h1>我的音乐故事</h1>\n<p>我最喜欢的作曲家是<strong>肖邦</strong>。</p>\n<p>他的夜曲<em>优美而忧伤</em>，<br>每次听都让我感动。</p>\n```\n你可以看到"肖邦"加粗了，"优美而忧伤"变成斜体了，而且中间还有一个换行。'
      },
      {
        type: 'task',
        title: '动手试试 ✨',
        content: '请在编辑器中，把 `<strong>` 里的"肖邦"改成你最喜欢的作曲家，把 `<em>` 里的"优美而忧伤"改成你自己的感受。试试修改 `<br>` 的位置看看效果！'
      }
    ],
    starterCode: {
      html: '<h1>我的音乐故事</h1>\n<p>我最喜欢的作曲家是<strong>肖邦</strong>。</p>\n<p>他的夜曲<em>优美而忧伤</em>，<br>每次听都让我感动。</p>',
      css: '',
      js: ''
    }
  },

  // ===== 1.4 列表 =====
  {
    id: 'html-lists',
    chapterId: 'html-basics',
    order: 4,
    title: '列表 — 你喜欢的作曲家',
    musicAnalogy: '列表就像**乐章目录**或**曲目单**——把信息有序地组织起来，让人一目了然。',
    listenTo: '维瓦尔第《四季》— 四个季节，四个乐章，结构分明，就像一张清晰的列表。',
    sections: [
      {
        type: 'explain',
        title: '用列表组织信息',
        content: '当你想列出喜欢的作曲家、曲目或乐器时，就需要用到列表标签：\n\n- `<ul>` — **无序列表**（unordered list），前面是圆点\n- `<ol>` — **有序列表**（ordered list），前面是数字\n- `<li>` — **列表项**（list item），包在每个项目的外面'
      },
      {
        type: 'example',
        title: '看例子',
        content: '下面就是编辑器中的代码。一个无序列表列出作曲家，一个有序列表排出练琴顺序：\n\n```html\n<h1>我的音乐收藏</h1>\n<p>这里是我喜欢的音乐作品：</p>\n\n<h2>我喜欢的作曲家</h2>\n<ul>\n  <li>巴赫</li>\n  <li>莫扎特</li>\n  <li>肖邦</li>\n</ul>\n\n<h2>我的练琴顺序</h2>\n<ol>\n  <li>音阶练习</li>\n  <li>练习曲</li>\n  <li>乐曲演奏</li>\n</ol>\n```\n注意 `<li>` 要放在 `<ul>` 或 `<ol>` 里面，不能单独使用哦。就像乐谱中的音符必须放在小节里一样！'
      },
      {
        type: 'task',
        title: '动手试试 ✨',
        content: '请在编辑器中修改这两个列表：把无序列表中的作曲家改成你喜欢的，把有序列表改成你自己的学习计划。试试把 `<ul>` 改成 `<ol>` 看看列表样式会怎么变化？'
      }
    ],
    starterCode: {
      html: '<h1>我的音乐收藏</h1>\n<p>这里是我喜欢的音乐作品：</p>\n\n<h2>我喜欢的作曲家</h2>\n<ul>\n  <li>巴赫</li>\n  <li>莫扎特</li>\n  <li>肖邦</li>\n</ul>\n\n<h2>我的练琴顺序</h2>\n<ol>\n  <li>音阶练习</li>\n  <li>练习曲</li>\n  <li>乐曲演奏</li>\n</ol>',
      css: '',
      js: ''
    }
  },

  // ===== 1.5 图片与链接 =====
  {
    id: 'html-images-links',
    chapterId: 'html-basics',
    order: 5,
    title: '图片与链接 — 丰富你的音乐卡片',
    musicAnalogy: '`<img>` 像**乐谱中的插图**，为页面增添视觉元素；`<a>` 链接像**反复记号**，指向另一个地方。',
    listenTo: '德彪西《月光》— 闭上眼睛，让音乐在脑海中描绘画面，就像图片为网页增添色彩。',
    sections: [
      {
        type: 'explain',
        title: '添加图片',
        content: '纯文字太单调了！用 `<img>` 标签可以插入图片：\n\n```html\n<img src="图片地址" alt="图片描述">\n```\n\n- `src` — 图片的地址（可以是网上链接）\n- `alt` — 图片加载不出来时显示的文字\n\n注意：`<img>` 是**单标签**，不需要写 `</img>`，就像休止符不需要配对！'
      },
      {
        type: 'explain',
        title: '添加链接',
        content: '用 `<a>` 标签可以创建超链接，点击后跳转到其他页面：\n\n```html\n<a href="网址">点击这里</a>\n```\n\n- `href` — 要跳转的网址\n- 标签中间的文字是显示给用户看的'
      },
      {
        type: 'example',
        title: '完整示例',
        content: '下面就是编辑器中的代码。结合了图片和链接的个人音乐卡片：\n\n```html\n<h1>肖邦</h1>\n<img src="https://oss.tan8.com/yuepuku/155/77798/77798_prev.jpg" alt="作曲家肖像">\n<p>\n  了解更多，请访问\n  <a href="https://zh.wikipedia.org/wiki/肖邦">肖邦的维基百科</a>\n</p>\n```'
      },
      {
        type: 'task',
        title: '综合挑战 ✨',
        content: '这是本章的最后一节课！请在编辑器中修改代码，制作一张属于你自己的"个人音乐卡片"：\n\n1. 把 `<h1>` 中的"肖邦"改成你喜欢的音乐家\n2. 把 `<img>` 的 `src` 换成你想展示的图片链接\n3. 把 `<a>` 的 `href` 换成你想推荐的网页链接\n4. 试着再加上一个列表，列出这位音乐家的代表作\n\n完成之后，第一章就毕业了！🎉'
      }
    ],
    starterCode: {
      html: '<h1>肖邦</h1>\n<img src="https://oss.tan8.com/yuepuku/155/77798/77798_prev.jpg" alt="作曲家肖像">\n<p>\n  了解更多，请访问\n  <a href="https://zh.wikipedia.org/wiki/肖邦">肖邦的维基百科</a>\n</p>',
      css: '',
      js: ''
    }
  },

  // ===== 1.6 div 与 span =====
  {
    id: 'html-div-span',
    chapterId: 'html-basics',
    order: 6,
    title: 'div 与 span — 块级与内联元素',
    musicAnalogy: '`<div>` 像**小节线**，把内容划分成独立的段落，每个段落独占一行；`<span>` 像**连音线**，在句子内部连接和标记某些词语，不打断句子的流动。',
    listenTo: '巴赫《勃兰登堡协奏曲》— 不同乐器组（就像 div）各自成段，但独奏乐器在其中穿插对话（就像 span）。',
    sections: [
      {
        type: 'explain',
        title: '两种最基本的"容器"',
        content: '`<div>` 和 `<span>` 本身不添加任何样式，它们的作用是**把内容分组**，方便后面用 CSS 美化或用 JS 操控。\n\n- `<div>` — **块级元素**（block），独占一行，像一整个段落\n- `<span>` — **内联元素**（inline），在文字流内部，像句子中的标记\n\n```html\n<div>我是一个块，占满整行。</div>\n<div>我是另一个块，自动换行。</div>\n<p>文字中<span>这个部分</span>被span标记了。</p>\n```'
      },
      {
        type: 'explain',
        title: '什么时候用 div？什么时候用 span？',
        content: '**用 `<div>` 当你要：**\n- 创建一个卡片、面板、区块\n- 把一组元素包在一起\n- 需要块级布局（独占一行）\n\n**用 `<span>` 当你要：**\n- 高亮句子中的某个词\n- 给行内文字加特殊样式\n- 不改动文字流的情况下标记内容\n\n简单记忆：**div 管"块"，span 管"字"。**就像管弦乐中——div 是乐器组（弦乐组、管乐组），span 是组内某个乐手。'
      },
      {
        type: 'example',
        title: '看例子',
        content: '下面的代码用 `<div>` 创建了三张音乐卡片，用 `<span>` 在文字中高亮了作曲家名字：\n\n```html\n<div class="card">\n  <h2><span class="name">巴赫</span></h2>\n  <p>时期：<span class="name">巴洛克</span></p>\n</div>\n```\n注意：每个 `<div>` 独占一行，而 `<span>` 只是在行内标记文字。'
      },
      {
        type: 'task',
        title: '动手试试 ✨',
        content: '请在编辑器中：\n\n1. 给第三张卡片也加上 `<span class="name">` 高亮作曲家名字和时期\n2. 试着复制一张卡片（整个 `<div>` 块），看看它是独占一行还是并排\n3. 把某个 `<span>` 改成 `<div>`，观察布局的变化——这就是块级 vs 内联的区别！'
      }
    ],
    starterCode: {
      html: '<h1>作曲家画廊</h1>\n\n<div class="card">\n  <h2><span class="name">巴赫</span></h2>\n  <p>时期：<span class="name">巴洛克</span></p>\n  <p>代表作：《赋格的艺术》《勃兰登堡协奏曲》</p>\n</div>\n\n<div class="card">\n  <h2><span class="name">肖邦</span></h2>\n  <p>时期：浪漫主义</p>\n  <p>代表作：《夜曲》《练习曲》</p>\n</div>',
      css: '',
      js: ''
    }
  },

  // ===== 1.7 语义化标签 =====
  {
    id: 'html-semantic',
    chapterId: 'html-basics',
    order: 7,
    title: '语义化标签 — 给页面一个清晰的结构',
    musicAnalogy: '语义化标签就像**总谱上的声部标注**——第一小提琴、第二小提琴、中提琴、大提琴……每个乐器组有自己的位置和身份。同样，`<header>`、`<main>`、`<footer>` 等标签告诉浏览器和搜索引擎"这是什么部分"。',
    listenTo: '拉威尔《波莱罗》配器总谱 — 每一行谱表标注了乐器名称，清晰的声部结构就像语义化的 HTML。',
    sections: [
      {
        type: 'explain',
        title: '为什么需要语义化？',
        content: '之前我们一直用 `<div>` 来分组内容。但 `<div>` 本身没有"含义"——浏览器不知道一个 `<div>` 是导航栏还是文章正文。\n\n语义化标签用**有名字的标签**来标记不同区域：\n\n- `<header>` — 页头（Logo + 导航）\n- `<nav>` — 导航菜单\n- `<main>` — 页面主要内容\n- `<section>` — 一个内容区块\n- `<article>` — 一篇独立的文章\n- `<footer>` — 页脚（版权、链接）\n\n就像总谱中每个声部都有明确的名字，而不是全部标"乐器1、乐器2"。'
      },
      {
        type: 'explain',
        title: '一个典型的页面结构',
        content: '```html\n<body>\n  <header>\n    <h1>网站标题</h1>\n    <nav>导航链接</nav>\n  </header>\n\n  <main>\n    <section>\n      <h2>第一块内容</h2>\n      <article>一篇文章</article>\n    </section>\n  </main>\n\n  <footer>\n    <p>版权信息</p>\n  </footer>\n</body>\n```\n\n浏览器和搜索引擎看到这个结构，就像指挥看到总谱——一眼就知道每个部分的作用。'
      },
      {
        type: 'example',
        title: '看例子',
        content: '下面的代码用语义化标签构建了一个音乐网站页面。注意看 `<header>`、`<main>`、`<section>`、`<footer>` 是如何组织的：\n\n```html\n<header>\n  <h1>古典音乐鉴赏</h1>\n  <nav>首页 | 作曲家 | 曲目</nav>\n</header>\n<main>\n  <section>今日推荐</section>\n  <section>本周精选</section>\n</main>\n<footer>© 2026 代码谱</footer>\n```\n虽然看起来和用 `<div>` 差不多，但这些标签自带"身份信息"。'
      },
      {
        type: 'task',
        title: '动手试试 ✨',
        content: '请在编辑器中：\n\n1. 在 `<main>` 中再添加一个 `<section>`，里面写"最新评论"\n2. 在 `<nav>` 中添加一个链接（用 `<a>` 标签）\n3. 试着把某个 `<section>` 换成 `<article>`，思考一下：什么情况下用 article 更合适？'
      }
    ],
    starterCode: {
      html: '<header>\n  <h1>🎵 古典音乐鉴赏</h1>\n  <nav>\n    首页 | 作曲家 | 曲目推荐 | 关于\n  </nav>\n</header>\n\n<main>\n  <section>\n    <h2>今日推荐</h2>\n    <p>贝多芬《第七交响曲》——被瓦格纳称为"舞蹈的礼赞"。</p>\n  </section>\n\n  <section>\n    <h2>本周精选</h2>\n    <p>莫扎特《安魂曲》K.626 ——未完成的绝唱，神秘而动人。</p>\n  </section>\n</main>\n\n<footer>\n  <p>© 2026 代码谱 | 用音乐的方式学代码</p>\n</footer>',
      css: '',
      js: ''
    }
  },

  // ===== 1.8 音频与视频 =====
  {
    id: 'html-audio-video',
    chapterId: 'html-basics',
    order: 8,
    title: '音频与视频 — 让网页发出声音',
    musicAnalogy: '这是离音乐最近的一节课！`<audio>` 标签让你的网页**播放音乐**，`<video>` 标签让你的网页**播放视频**。作为音乐学的学生，你会发现这比 `<p>` 和 `<div>` 有趣多了！',
    listenTo: '这一课不需要推荐——直接在编辑器里放一段你喜欢的音乐吧！用 `<audio>` 标签让它响起来。',
    sections: [
      {
        type: 'explain',
        title: '音频标签',
        content: '用 `<audio>` 标签可以在网页中嵌入音乐播放器：\n\n```html\n<audio controls src="音乐文件地址">\n  你的浏览器不支持音频播放\n</audio>\n```\n\n- `controls` — 显示播放/暂停/音量控件\n- `src` — 音频文件的地址\n- `autoplay` — 自动播放（浏览器通常会阻止）\n- `loop` — 循环播放\n\n标签中间的文字只在浏览器不支持时显示。'
      },
      {
        type: 'explain',
        title: '音频格式与多音源',
        content: '不同的浏览器支持不同的音频格式（MP3、OGG、WAV 等）。为了保证所有浏览器都能播放，可以用 `<source>` 标签提供多种格式：\n\n```html\n<audio controls>\n  <source src="music.mp3" type="audio/mpeg">\n  <source src="music.ogg" type="audio/ogg">\n  你的浏览器不支持音频播放\n</audio>\n```\n\n浏览器会从上到下尝试，播放第一个支持的格式。就像准备不同版本的乐谱给不同乐器！'
      },
      {
        type: 'explain',
        title: '视频标签',
        content: '`<video>` 标签的用法和 `<audio>` 非常相似：\n\n```html\n<video controls width="400" src="视频地址">\n  你的浏览器不支持视频播放\n</video>\n```\n\n- `controls` — 显示播放控件\n- `width` / `height` — 设置播放器尺寸\n- 同样支持 `<source>` 提供多种格式\n\n现在你的网页可以像一个音乐播放器一样工作了！'
      },
      {
        type: 'example',
        title: '看例子',
        content: '下面的代码创建了一个音频播放器和一个视频播放器。注意两个标签的写法几乎一样：\n\n```html\n<audio controls>\n  <source src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" type="audio/mpeg">\n</audio>\n\n<video controls width="320" src="视频地址"></video>\n```\n预览区现在有了一个可以点击播放的音乐播放器！'
      },
      {
        type: 'hint',
        title: '关于音频链接',
        content: '免费可用的音频链接不太好找。如果你想用自己的音乐文件，可以把 MP3 文件放在项目 `public/` 目录下，然后用 `<audio controls src="/你的文件名.mp3">` 来播放。'
      },
      {
        type: 'task',
        title: '动手试试 ✨',
        content: '请在编辑器中：\n\n1. 点击预览区中的音频播放器，看看能否播放\n2. 给 `<audio>` 标签加上 `loop` 属性，让音乐循环播放\n3. 尝试修改音频的 `src` 地址（可以搜索一个网上可用的 MP3 链接）\n4. 挑战：在 `<audio>` 下面加一个 `<video>` 标签，找一个在线视频链接试试'
      }
    ],
    starterCode: {
      html: '<h1>🎧 我的音乐播放器</h1>\n\n<div class="player-box">\n  <p>点击播放按钮，让网页发出声音：</p>\n\n  <audio controls>\n    <source src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" type="audio/mpeg">\n    你的浏览器不支持音频播放\n  </audio>\n\n  <p class="note">这是 SoundHelix 生成的一段示例音乐。</p>\n</div>',
      css: 'h1 {\n  color: #8B2E2E;\n  text-align: center;\n}\n\n.player-box {\n  background: #FFFAF2;\n  border: 2px solid #D4C5A9;\n  border-radius: 12px;\n  padding: 24px;\n  text-align: center;\n  max-width: 400px;\n  margin: 20px auto;\n}\n\n.player-box audio {\n  width: 100%;\n  margin: 12px 0;\n}\n\n.note {\n  font-size: 12px;\n  color: #C9A96E;\n}',
      js: ''
    }
  },

  // ===== 1.9 表格 =====
  {
    id: 'html-tables',
    chapterId: 'html-basics',
    order: 9,
    title: '表格 — 整理你的音乐数据',
    musicAnalogy: '表格就像一张**曲目单**或**节目表**——用行列分明的结构组织信息。每一行是一个条目，每一列是一种属性，就像节目中第一列是作曲家、第二列是曲目、第三列是时长。',
    listenTo: '莫扎特歌剧《费加罗的婚礼》— 歌剧中复杂的人物关系和章节结构，就像表格中纵横交错的行与列。',
    sections: [
      {
        type: 'explain',
        title: '表格的基本结构',
        content: '表格由外到内有三层标签：\n\n- `<table>` — 整个表格的容器\n- `<tr>` — **表行**（table row），一行\n- `<td>` — **表单元格**（table data），一个格子\n\n```html\n<table>\n  <tr>\n    <td>巴赫</td>\n    <td>巴洛克</td>\n    <td>德国</td>\n  </tr>\n  <tr>\n    <td>肖邦</td>\n    <td>浪漫主义</td>\n    <td>波兰</td>\n  </tr>\n</table>\n```\n\n每一对 `<tr></tr>` 是一行，里面每个 `<td></td>` 是一个格子。'
      },
      {
        type: 'explain',
        title: '表头与分区',
        content: '`<th>` 代替 `<td>` 可以做**表头**（加粗居中）：\n\n```html\n<tr>\n  <th>作曲家</th>\n  <th>时期</th>\n  <th>国家</th>\n</tr>\n```\n\n`<thead>`、`<tbody>` 把表头和表体分开，方便分别设置样式：\n\n```html\n<table>\n  <thead>\n    <tr><th>列1</th><th>列2</th></tr>\n  </thead>\n  <tbody>\n    <tr><td>数据1</td><td>数据2</td></tr>\n  </tbody>\n</table>\n```'
      },
      {
        type: 'explain',
        title: '合并单元格',
        content: '有时候一个格子需要跨越多列或多行，用 `colspan` 和 `rowspan`：\n\n- `colspan="2"` — 跨 2 列（水平合并）\n- `rowspan="3"` — 跨 3 行（垂直合并）\n\n```html\n<td colspan="2">这格占了两个列的宽度</td>\n```\n\n就像节目单中的"中场休息"横跨整页！'
      },
      {
        type: 'example',
        title: '看例子',
        content: '下面的代码创建了一张作曲家信息表，有表头和两行数据：\n\n```html\n<table>\n  <thead>\n    <tr>\n      <th>作曲家</th>\n      <th>时期</th>\n      <th>代表作</th>\n    </tr>\n  </thead>\n  <tbody>\n    <tr>\n      <td>巴赫</td>\n      <td>巴洛克</td>\n      <td>赋格的艺术</td>\n    </tr>\n  </tbody>\n</table>\n```'
      },
      {
        type: 'task',
        title: '动手试试 ✨',
        content: '请在编辑器中：\n\n1. 在表格中添加一行新数据，写你喜欢的作曲家\n2. 在表头再加一列（比如"国家"），每行也加对应的 `<td>`\n3. 试试在表格下方加一行 `<tr><td colspan="3">更多作曲家敬请期待</td></tr>` 感受合并效果\n4. 挑战：创建一个新的表格，列出你的"每周练琴计划"（日期、曲目、时长）'
      }
    ],
    starterCode: {
      html: '<h1>作曲家速查表</h1>\n\n<table>\n  <thead>\n    <tr>\n      <th>作曲家</th>\n      <th>时期</th>\n      <th>代表作</th>\n    </tr>\n  </thead>\n  <tbody>\n    <tr>\n      <td>巴赫</td>\n      <td>巴洛克</td>\n      <td>《赋格的艺术》</td>\n    </tr>\n    <tr>\n      <td>莫扎特</td>\n      <td>古典主义</td>\n      <td>《魔笛》</td>\n    </tr>\n    <tr>\n      <td>肖邦</td>\n      <td>浪漫主义</td>\n      <td>《夜曲》</td>\n    </tr>\n  </tbody>\n</table>',
      css: 'h1 {\n  color: #8B2E2E;\n  text-align: center;\n}\n\ntable {\n  width: 100%;\n  max-width: 500px;\n  margin: 20px auto;\n  border-collapse: collapse;\n}\n\nth, td {\n  border: 1px solid #D4C5A9;\n  padding: 10px 14px;\n  text-align: left;\n}\n\nth {\n  background: #8B2E2E;\n  color: #fff;\n}\n\ntd {\n  color: #3D2B1F;\n}\n\ntbody tr:nth-child(even) {\n  background: #FFFAF2;\n}',
      js: ''
    }
  },

  // ===== 1.10 表单 =====
  {
    id: 'html-forms',
    chapterId: 'html-basics',
    order: 10,
    title: '表单 — 收集你的音乐信息',
    musicAnalogy: '表单就像**报名表**或**节目征集单**——听众填写他们的音乐偏好，就像演奏者在报名表上写下自己的声部。`<input>` 是填空格，`<label>` 是问题，`<button>` 是"提交"按钮。',
    listenTo: '小约翰·施特劳斯《蓝色多瑙河》— 圆舞曲的互动性就像表单与用户的对话，你来我往，优雅流畅。',
    sections: [
      {
        type: 'explain',
        title: '什么是表单？',
        content: '表单（`<form>`）用来收集用户输入的信息。你在网上填过的所有东西——注册、搜索、评论——都是表单。\n\n表单的核心标签：\n\n- `<form>` — 整个表单的容器\n- `<input>` — 输入框，最常用的表单元素\n- `<label>` — 标签，描述输入框的用途\n- `<textarea>` — 多行文本输入框\n- `<select>` + `<option>` — 下拉选择框\n- `<button>` — 提交按钮'
      },
      {
        type: 'explain',
        title: '各种输入类型',
        content: '`<input>` 标签通过 `type` 属性可以变成不同类型的输入框：\n\n- `type="text"` — 普通文本输入\n- `type="email"` — 邮箱地址输入\n- `type="password"` — 密码输入（显示为圆点）\n- `type="date"` — 日期选择器\n- `placeholder="..."` — 输入框中的提示文字\n\n```html\n<input type="text" placeholder="请输入你的名字">\n<input type="email" placeholder="请输入邮箱">\n<input type="date">\n```\n\n不同的 type 就像不同的乐器，各有各的用途！'
      },
      {
        type: 'explain',
        title: '下拉框与多行文本',
        content: '`<select>` 创建下拉选择框，`<option>` 是其中的选项：\n\n```html\n<select>\n  <option>巴赫</option>\n  <option>莫扎特</option>\n  <option>肖邦</option>\n</select>\n```\n\n`<textarea>` 创建多行文本输入框，用 `rows` 设置行数：\n\n```html\n<textarea rows="3" placeholder="请写下你的感想..."></textarea>\n```\n\n`<label>` 的 `for` 属性对应 `<input>` 的 `id`，点击标签文字时输入框会自动获得焦点——就像节目单上"独奏者："后面跟着一条填空线。'
      },
      {
        type: 'example',
        title: '看例子',
        content: '下面的代码创建了一张音乐偏好调查表。包含了文本输入、下拉选择和多行文本框：\n\n```html\n<form>\n  <label for="name">你的名字：</label>\n  <input type="text" id="name" placeholder="请输入你的名字">\n\n  <label for="composer">最喜欢的作曲家：</label>\n  <select id="composer">\n    <option>请选择...</option>\n    <option>巴赫</option>\n    <option>肖邦</option>\n  </select>\n\n  <label for="comment">想说的话：</label>\n  <textarea id="comment" rows="3"></textarea>\n\n  <button type="submit">提交</button>\n</form>\n```\n切换到预览区，可以和这个表单互动！'
      },
      {
        type: 'task',
        title: '动手试试 ✨',
        content: '请在编辑器中：\n\n1. 在 `<select>` 中添加两个你喜欢的作曲家选项\n2. 给表单增加一个 `<input type="date">`，让用户选择"最早接触音乐的日期"\n3. 增加一个 `<input type="email">`，让用户填写邮箱\n4. 试试修改 `<textarea>` 的 `rows` 从 `3` 改成 `5`，看看输入框变大\n5. 在预览区中实际填写表单，感受交互体验'
      }
    ],
    starterCode: {
      html: '<h1>🎵 音乐偏好调查</h1>\n\n<form>\n  <label for="name">你的名字：</label>\n  <input type="text" id="name" placeholder="请输入你的名字">\n\n  <label for="composer">最喜欢的作曲家：</label>\n  <select id="composer">\n    <option>请选择...</option>\n    <option>巴赫</option>\n    <option>莫扎特</option>\n    <option>贝多芬</option>\n    <option>肖邦</option>\n  </select>\n\n  <label for="comment">你想说的话：</label>\n  <textarea id="comment" rows="3" placeholder="写下你对音乐的感受..."></textarea>\n\n  <button type="submit">✨ 提交</button>\n</form>',
      css: 'h1 {\n  text-align: center;\n  color: #8B2E2E;\n}\n\nform {\n  max-width: 420px;\n  margin: 20px auto;\n  background: #FFFAF2;\n  border: 2px solid #D4C5A9;\n  border-radius: 12px;\n  padding: 28px;\n}\n\nlabel {\n  display: block;\n  margin-top: 16px;\n  margin-bottom: 4px;\n  font-weight: 600;\n  color: #3D2B1F;\n}\n\ninput, select, textarea {\n  width: 100%;\n  padding: 10px 12px;\n  border: 1px solid #D4C5A9;\n  border-radius: 6px;\n  font-size: 14px;\n  font-family: inherit;\n  color: #3D2B1F;\n  background: #fff;\n}\n\ninput::placeholder, textarea::placeholder {\n  color: #CCC5B5;\n}\n\nbutton {\n  display: block;\n  width: 100%;\n  margin-top: 24px;\n  padding: 12px;\n  background: #8B2E2E;\n  color: #fff;\n  font-size: 16px;\n  font-weight: 600;\n  border: none;\n  border-radius: 8px;\n  cursor: pointer;\n}\n\nbutton:hover {\n  background: #C94545;\n}',
      js: ''
    }
  },

  // ===== 1.11 更多输入类型 =====
  {
    id: 'html-input-types',
    chapterId: 'html-basics',
    order: 11,
    title: '更多输入类型 — 表单的"乐器编配"',
    musicAnalogy: '`<input>` 不止能输入文字——就像乐团不只是弦乐。`type="radio"` 像**单选问答**（只有一个正确答案），`type="checkbox"` 像**多选编配**（可以同时选弦乐和管乐），`type="range"` 像**滑音控制**（连续变化的数值）。每个 input 类型都是乐队中的一种"声部"，组合使用才能构成完整的音乐表单。',
    listenTo: '拉威尔《波莱罗》配器分析 — 整部作品用不同乐器依次演奏同一旋律（每种乐器就是一种 input 类型），从长笛到单簧管到巴松管到萨克斯，每一种"输入方式"都给主题带来新的色彩。',
    sections: [
      {
        type: 'explain',
        title: 'radio — 单选按钮',
        content: '当用户只能**选一个**时用 radio。同一组 radio 的 `name` 属性必须相同：\n\n```html\n<fieldset>\n  <legend>你最喜欢的时期：</legend>\n\n  <input type="radio" id="baroque" name="period" value="baroque">\n  <label for="baroque">巴洛克时期</label>\n\n  <input type="radio" id="classical" name="period" value="classical">\n  <label for="classical">古典主义时期</label>\n\n  <input type="radio" id="romantic" name="period" value="romantic">\n  <label for="romantic">浪漫主义时期</label>\n</fieldset>\n```\n\n`name` 相同的 radio 互斥——就像单选题，只能圈一个答案。'
      },
      {
        type: 'explain',
        title: 'checkbox — 多选按钮',
        content: '当用户可以**选多个**时用 checkbox：\n\n```html\n<fieldset>\n  <legend>你喜欢的乐器（可多选）：</legend>\n\n  <input type="checkbox" id="piano" name="instrument" value="piano">\n  <label for="piano">🎹 钢琴</label>\n\n  <input type="checkbox" id="violin" name="instrument" value="violin">\n  <label for="violin">🎻 小提琴</label>\n\n  <input type="checkbox" id="cello" name="instrument" value="cello">\n  <label for="cello">🎻 大提琴</label>\n</fieldset>\n```\n\n每个 checkbox 独立开/关——就像配器时选择用哪些乐器。'
      },
      {
        type: 'explain',
        title: '更多实用 input 类型',
        content: 'HTML 提供丰富的输入类型，浏览器会自动优化交互方式：\n\n- `<input type="range" min="0" max="100">` — 滑块，适合选音量、评分\n- `<input type="number" min="1" max="10">` — 数字输入，带增减箭头\n- `<input type="color">` — 颜色选择器\n- `<input type="date">` — 日期选择器\n- `<input type="time">` — 时间选择器\n- `<input type="file">` — 文件上传\n- `<input type="search">` — 搜索框（带清除按钮）\n\n`<fieldset>` + `<legend>` 用来分组：\n```html\n<fieldset>\n  <legend>个人信息</legend>\n  <!-- 相关字段放一起 -->\n</fieldset>\n```'
      },
      {
        type: 'example',
        title: '看例子',
        content: '下面的表单综合使用了 radio、checkbox 和 range：\n\n```html\n<form>\n  <fieldset>\n    <legend>基础信息</legend>\n    <label>姓名：<input type="text" name="name"></label>\n    <label>练琴时长：<input type="range" min="0" max="120" value="30"> 分钟/天</label>\n  </fieldset>\n\n  <fieldset>\n    <legend>偏好设置</legend>\n    <p>演奏水平：</p>\n    <label><input type="radio" name="level" value="beginner"> 入门</label>\n    <label><input type="radio" name="level" value="intermediate"> 进阶</label>\n    <label><input type="radio" name="level" value="advanced"> 专业</label>\n  </fieldset>\n\n  <fieldset>\n    <legend>擅长乐器</legend>\n    <label><input type="checkbox" name="inst" value="piano"> 钢琴</label>\n    <label><input type="checkbox" name="inst" value="violin"> 小提琴</label>\n    <label><input type="checkbox" name="inst" value="voice"> 声乐</label>\n  </fieldset>\n</form>\n```'
      },
      {
        type: 'task',
        title: '动手试试 ✨',
        content: '切换到 HTML 标签页，试着：\n\n1. 给"演奏水平"增加第 4 个选项"大师级"\n2. 给"擅长乐器"增加两个选项（如中提琴、长笛）\n3. 添加一个 `<input type="color">` 选择"最喜欢的音乐色彩"\n4. 挑战：用 JS 监听 range 滑块的 `input` 事件，实时显示练琴时长数值'
      }
    ],
    starterCode: {
      html: '<h1>音乐偏好调查</h1>\n\n<form>\n  <fieldset>\n    <legend>基础信息</legend>\n    <label>你的名字：<input type="text" name="name" placeholder="请输入名字"></label>\n    <div class="range-row">\n      <label>每天练琴时长：</label>\n      <input type="range" id="practiceRange" min="0" max="120" value="30">\n      <span id="rangeValue">30 分钟</span>\n    </div>\n  </fieldset>\n\n  <fieldset>\n    <legend>你的演奏水平</legend>\n    <label class="radio-label"><input type="radio" name="level" value="beginner" checked> 🎵 入门级</label>\n    <label class="radio-label"><input type="radio" name="level" value="intermediate"> 🎶 进阶级</label>\n    <label class="radio-label"><input type="radio" name="level" value="advanced"> 🎼 专业级</label>\n  </fieldset>\n\n  <fieldset>\n    <legend>你擅长的乐器（可多选）</legend>\n    <label class="checkbox-label"><input type="checkbox" name="instrument" value="piano"> 🎹 钢琴</label>\n    <label class="checkbox-label"><input type="checkbox" name="instrument" value="violin"> 🎻 小提琴</label>\n    <label class="checkbox-label"><input type="checkbox" name="instrument" value="cello"> 🎻 大提琴</label>\n    <label class="checkbox-label"><input type="checkbox" name="instrument" value="flute"> 🎵 长笛</label>\n    <label class="checkbox-label"><input type="checkbox" name="instrument" value="voice"> 🎤 声乐</label>\n  </fieldset>\n\n  <button type="submit">✨ 提交</button>\n</form>',
      css: 'h1 {\n  text-align: center;\n  color: #8B2E2E;\n  margin-bottom: 20px;\n}\n\nform {\n  max-width: 480px;\n  margin: 0 auto;\n}\n\nfieldset {\n  background: #FFFAF2;\n  border: 1px solid #D4C5A9;\n  border-radius: 10px;\n  padding: 20px;\n  margin-bottom: 16px;\n}\n\nlegend {\n  font-weight: 700;\n  color: #8B2E2E;\n  font-size: 15px;\n  padding: 0 8px;\n}\n\nlabel {\n  display: block;\n  margin: 8px 0;\n  color: #3D2B1F;\n  font-size: 14px;\n}\n\ninput[type="text"] {\n  width: 100%;\n  padding: 8px 12px;\n  border: 1px solid #D4C5A9;\n  border-radius: 5px;\n  font-size: 14px;\n  font-family: inherit;\n}\n\n.range-row {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  margin: 12px 0;\n}\n\n.range-row label {\n  margin: 0;\n  white-space: nowrap;\n}\n\n.range-row input[type="range"] {\n  flex: 1;\n  accent-color: #8B2E2E;\n}\n\n#rangeValue {\n  color: #8B2E2E;\n  font-weight: 700;\n  font-size: 14px;\n  min-width: 50px;\n}\n\n.radio-label,\n.checkbox-label {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  padding: 6px 10px;\n  border-radius: 6px;\n  cursor: pointer;\n  transition: background 0.15s;\n  margin: 4px 0 !important;\n}\n\n.radio-label:hover,\n.checkbox-label:hover {\n  background: #FFF8EC;\n}\n\nbutton {\n  display: block;\n  width: 100%;\n  padding: 12px;\n  background: #8B2E2E;\n  color: #fff;\n  font-size: 16px;\n  font-weight: 600;\n  border: none;\n  border-radius: 8px;\n  cursor: pointer;\n  margin-top: 8px;\n}\n\nbutton:hover {\n  background: #C94545;\n}',
      js: '// 实时显示 range 滑块的值\nlet rangeEl = document.querySelector("#practiceRange");\nlet rangeValue = document.querySelector("#rangeValue");\n\nrangeEl.addEventListener("input", function(event) {\n  let val = event.target.value;\n  rangeValue.textContent = val + " 分钟";\n});'
    }
  },

  // ===== 1.12 综合 HTML 项目 =====
  {
    id: 'html-capstone',
    chapterId: 'html-basics',
    order: 12,
    title: '综合项目 — 制作你的个人音乐主页',
    musicAnalogy: '一场完整的音乐会需要节目单（列表）、演奏者介绍（标题/段落）、演出照片（图片）、曲目链接（链接）、舞台分区（div/span）、声部标注（语义化标签）、曲目表（表格）。现在把这些元素组合起来，就像指挥把各个声部合成一部完整的交响乐。',
    listenTo: '贝多芬《第九交响曲》"合唱"第四乐章 — 一部交响曲的终章，人声与乐队完美融合，所有元素汇聚成壮丽的音乐大厦，就像你即将完成的个人主页。',
    sections: [
      {
        type: 'explain',
        title: '你已经学会了很多！',
        content: '回顾一下你学过的所有 HTML 标签：\n\n| 标签 | 用途 |\n|------|------|\n| `<h1>`~`<h4>` | 标题 |\n| `<p>` | 段落 |\n| `<strong>`, `<em>`, `<br>` | 强调与换行 |\n| `<ul>`, `<ol>`, `<li>` | 列表 |\n| `<img>`, `<a>` | 图片与链接 |\n| `<div>`, `<span>` | 容器与行内标记 |\n| `<header>`, `<main>`, `<section>`, `<footer>` | 语义化结构 |\n| `<table>`, `<tr>`, `<th>`, `<td>` | 表格 |\n\n现在，把这些知识组合起来，做一张属于你自己的"个人音乐主页"！'
      },
      {
        type: 'task',
        title: '逐步构建你的主页 ✨',
        content: '编辑器里已经有了一个模板。请按以下步骤完善它：\n\n**第一步：修改标题和介绍**\n- 把 `<header>` 中的标题改成"XXX的音乐主页"（XXX 是你的名字）\n- 修改 `<nav>` 中的导航项目\n\n**第二步：修改"关于我"**\n- 在"关于我"区域的 `<p>` 中写下你的音乐故事\n- 可以换一张你喜欢的音乐家图片（修改 `src`）\n\n**第三步：丰富音乐收藏**\n- 在列表中替换成你喜欢的作曲家或曲目\n- 在表格中添加你真正喜欢的音乐数据\n\n**第四步：添加你自己的内容**\n- 挑战：在 `<main>` 中新增一个 `<section>`，内容自定\n- 可以是一段推荐曲目、一个聆听列表、或任何你想展示的内容'
      },
      {
        type: 'hint',
        title: '别忘了这些要点',
        content: '- 标签要**成对**使用，有开就有合（`<img>` 除外）\n- 嵌套关系要清晰：`<ul>` 里放 `<li>`，`<table>` 里放 `<tr>` 再放 `<td>`\n- 语义化标签让页面结构清晰：`header` → `main` → `section` → `footer`\n- 完成之后，这就是你的**第一章毕业作品**！🎉'
      }
    ],
    starterCode: {
      html: '<header>\n  <h1>🎼 我的音乐主页</h1>\n  <nav>\n    关于我 | 音乐收藏 | 推荐曲目\n  </nav>\n</header>\n\n<main>\n  <section class="about">\n    <h2>关于我</h2>\n    <img src="https://oss.tan8.com/yuepuku/155/77798/77798_prev.jpg" alt="音乐家肖像" width="200">\n    <p>你好！我是一名热爱<strong>古典音乐</strong>的学习者。从小学习钢琴，最喜欢在午后弹奏一首肖邦的夜曲。</p>\n    <p>我相信音乐和代码有许多相似之处——<em>它们都是另一种语言</em>。</p>\n  </section>\n\n  <section class="collection">\n    <h2>我的音乐收藏</h2>\n    <p>以下是我最喜欢的几位作曲家：</p>\n\n    <ul>\n      <li>巴赫 — 巴洛克的数学之美</li>\n      <li>莫扎特 — 古典的优雅与灵动</li>\n      <li>肖邦 — 浪漫的诗意与忧伤</li>\n    </ul>\n  </section>\n\n  <section class="playlist">\n    <h2>本周曲目表</h2>\n    <table>\n      <thead>\n        <tr>\n          <th>作曲家</th>\n          <th>曲目</th>\n          <th>练习重点</th>\n        </tr>\n      </thead>\n      <tbody>\n        <tr>\n          <td>巴赫</td>\n          <td>C大调前奏曲 BWV 846</td>\n          <td>手指独立性</td>\n        </tr>\n        <tr>\n          <td>车尔尼</td>\n          <td>练习曲 Op.599 No.45</td>\n          <td>音阶流畅度</td>\n        </tr>\n        <tr>\n          <td>肖邦</td>\n          <td>降E大调夜曲 Op.9 No.2</td>\n          <td>情感表达</td>\n        </tr>\n      </tbody>\n    </table>\n  </section>\n</main>\n\n<footer>\n  <p>用音乐的方式学代码 — 代码谱 © 2026</p>\n  <p><a href="#">返回首页</a></p>\n</footer>',
      css: 'header {\n  background: #8B2E2E;\n  color: #fff;\n  padding: 24px 32px;\n  text-align: center;\n  border-radius: 8px;\n}\n\nheader h1 {\n  color: #fff;\n  margin: 0;\n}\n\nheader nav {\n  margin-top: 12px;\n  font-size: 14px;\n  letter-spacing: 0.05em;\n}\n\nmain {\n  margin-top: 24px;\n}\n\nsection {\n  background: #FFFAF2;\n  border: 1px solid #D4C5A9;\n  border-radius: 10px;\n  padding: 24px;\n  margin-bottom: 20px;\n}\n\nsection h2 {\n  color: #8B2E2E;\n  margin-top: 0;\n  border-bottom: 2px solid #E8DCC8;\n  padding-bottom: 8px;\n}\n\n.about img {\n  border-radius: 8px;\n  margin: 12px 0;\n}\n\n.collection ul {\n  padding-left: 20px;\n}\n\n.collection li {\n  margin: 6px 0;\n  color: #3D2B1F;\n}\n\ntable {\n  width: 100%;\n  border-collapse: collapse;\n  margin-top: 8px;\n}\n\nth, td {\n  border: 1px solid #D4C5A9;\n  padding: 10px 14px;\n  text-align: left;\n}\n\nth {\n  background: #8B2E2E;\n  color: #fff;\n}\n\ntbody tr:nth-child(even) {\n  background: #fff;\n}\n\nfooter {\n  text-align: center;\n  padding: 24px;\n  color: #C9A96E;\n  font-size: 14px;\n}\n\nfooter a {\n  color: #8B2E2E;\n}',
      js: ''
    }
  },

  // ================================================================
  // 第二章：CSS 样式 — 为音乐增添色彩与层次
  // ================================================================

  // ===== 2.1 CSS 入门 =====
  {
    id: 'css-intro',
    chapterId: 'css-style',
    order: 1,
    title: 'CSS 入门 — 改变文字的颜色和大小',
    musicAnalogy: '如果说 HTML 是乐谱上的音符，CSS 就是**演奏法记号**。它告诉浏览器：这个音符应该用什么力度（颜色）、多大音量（字号）来演奏。',
    listenTo: '德彪西《版画集》— 印象派音乐用音符描绘光影色彩，就像 CSS 为网页赋予视觉风格。',
    sections: [
      {
        type: 'explain',
        title: '什么是 CSS？',
        content: 'CSS（Cascading Style Sheets，层叠样式表）负责网页的外观。HTML 决定了"有什么"，CSS 决定了"长什么样"。\n\n一句 CSS 规则由三部分组成：\n\n```css\nh1 {\n  color: #8B2E2E;\n  font-size: 32px;\n}\n```\n\n- `h1` 是**选择器**——选中文档中的 `<h1>` 元素\n- `color` 和 `font-size` 是**属性**——你想改变什么\n- `#8B2E2E` 和 `32px` 是**值**——改成什么'
      },
      {
        type: 'explain',
        title: '颜色值怎么表示？',
        content: '颜色有多种写法：\n\n- **颜色名**：`red`, `blue`, `gold` 等（简单但有局限性）\n- **十六进制**：`#8B2E2E`（暗红）、`#3D2B1F`（深棕）——最常用\n- **rgb**：`rgb(139, 46, 46)` — 用三个数字表示红绿蓝\n\n就像调色盘一样，你可以调配出任何颜色！'
      },
      {
        type: 'example',
        title: '看例子',
        content: '下面的代码就是编辑器中你看到的。我们给标题设置了暗红色和 36px 大小，给段落设置了深棕色：\n\n```css\nh1 {\n  color: #8B2E2E;\n  font-size: 36px;\n}\n\np {\n  color: #6B5A4E;\n  font-size: 18px;\n}\n```\n切换到 CSS 标签页可以看到完整样式，预览区能看到效果。'
      },
      {
        type: 'task',
        title: '动手试试 ✨',
        content: '切换到 CSS 标签页，尝试以下操作：\n\n1. 把 `h1` 的 `color` 改成你喜欢的颜色（试试 `#C9A96E` 金色，或 `#5B8C5A` 绿色）\n2. 把 `font-size` 调大或调小，看看标题怎么变化\n3. 给 `p` 也换一个不同的颜色\n\n就像调配音色一样，试试不同的颜色组合吧！'
      }
    ],
    starterCode: {
      html: '<h1>我的音乐世界</h1>\n<p>用色彩表达音乐的感觉。</p>\n<p>每一种颜色，都像一种音色。</p>',
      css: 'h1 {\n  color: #8B2E2E;\n  font-size: 36px;\n}\n\np {\n  color: #6B5A4E;\n  font-size: 18px;\n}',
      js: ''
    }
  },

  // ===== 2.2 背景与边框 =====
  {
    id: 'css-bg-border',
    chapterId: 'css-style',
    order: 2,
    title: '背景与边框 — 为卡片增添层次',
    musicAnalogy: '背景颜色像**舞台的幕布**，边框像**画框**，它们为内容营造氛围和层次感——就像不同颜色的幕布会影响观众对乐曲的第一印象。',
    listenTo: '柴可夫斯基《胡桃夹子》— 糖果仙子的宫殿有华丽的金色装饰，想象一下用 CSS 来描绘它。',
    sections: [
      {
        type: 'explain',
        title: '背景颜色',
        content: '用 `background-color` 属性可以给元素添加背景色：\n\n```css\ndiv {\n  background-color: #FFFAF2;\n}\n```\n\n就像给乐谱选一张暖色调的纸，背景色能改变整个页面的氛围。'
      },
      {
        type: 'explain',
        title: '边框与圆角',
        content: '`border` 给元素加上边框，`border-radius` 让边角变圆滑：\n\n```css\ndiv {\n  border: 2px solid #D4C5A9;\n  border-radius: 12px;\n}\n```\n\n- `2px` — 边框粗细\n- `solid` — 实线（还有 `dashed` 虚线、`dotted` 点线）\n- `#D4C5A9` — 边框颜色\n- `border-radius: 12px` — 圆角半径，值越大越圆\n\n圆角让卡片更柔和，就像乐谱中圆润的连音线。'
      },
      {
        type: 'example',
        title: '看例子',
        content: '下面的代码创建了一张"作曲家卡片"，有暖色背景、细边框和圆角：\n\n```css\n.card {\n  background-color: #FFFAF2;\n  border: 2px solid #D4C5A9;\n  border-radius: 12px;\n  padding: 20px;\n}\n\n.card h2 {\n  color: #8B2E2E;\n}\n```\n切换到 CSS 标签页查看完整代码。'
      },
      {
        type: 'task',
        title: '动手试试 ✨',
        content: '切换到 CSS 标签页，试着：\n\n1. 把 `.card` 的 `background-color` 换一个颜色（试试 `#F0F8FF` 浅蓝，或 `#FFF8F0` 暖橙）\n2. 把 `border` 的粗细从 `2px` 改成 `4px`，看看边框变粗的效果\n3. 把 `border-radius` 改成 `24px`，让卡片更圆润\n4. 试试把 `solid` 改成 `dashed`，看虚线边框的效果'
      }
    ],
    starterCode: {
      html: '<h1>作曲家画廊</h1>\n\n<div class="card">\n  <h2>路德维希·凡·贝多芬</h2>\n  <p>德国作曲家，古典与浪漫时期的桥梁。</p>\n  <p>代表作：《命运交响曲》《月光奏鸣曲》</p>\n</div>\n\n<div class="card">\n  <h2>弗里德里克·肖邦</h2>\n  <p>波兰作曲家，"钢琴诗人"。</p>\n  <p>代表作：《夜曲》《革命练习曲》</p>\n</div>',
      css: '.card {\n  background-color: #FFFAF2;\n  border: 2px solid #D4C5A9;\n  border-radius: 12px;\n  padding: 20px;\n  margin-bottom: 16px;\n}\n\n.card h2 {\n  color: #8B2E2E;\n  margin-top: 0;\n}\n\n.card p {\n  color: #6B5A4E;\n}',
      js: ''
    }
  },

  // ===== 2.3 字体与间距 =====
  {
    id: 'css-font-spacing',
    chapterId: 'css-style',
    order: 3,
    title: '字体与间距 — 让文字更优雅',
    musicAnalogy: '字体选择像**不同乐器的音色**——衬线体如小提琴般优雅，无衬线体如长笛般清晰。而 `letter-spacing` 和 `line-height` 则像音符间的**时值与呼吸**，决定了阅读的节奏。',
    listenTo: '圣桑《动物狂欢节》— 每种乐器代表一种动物，音色各具特色，就像不同字体传达不同的气质。',
    sections: [
      {
        type: 'explain',
        title: '字体系列',
        content: '`font-family` 决定文字使用什么字体：\n\n```css\nh1 {\n  font-family: "Noto Serif SC", serif;\n}\n\np {\n  font-family: "Noto Sans SC", sans-serif;\n}\n```\n\n两种主要的字体类型：\n- **衬线体（serif）**：笔划末端有装饰，典雅庄重，适合标题\n- **无衬线体（sans-serif）**：笔划均匀，简洁现代，适合正文\n\n像选乐器一样——你不会用小提琴的音色去吹进行曲。'
      },
      {
        type: 'explain',
        title: '间距控制',
        content: '三个重要的间距属性：\n\n- `letter-spacing` — 字母/汉字间距，像音符间的疏密\n- `line-height` — 行高，像乐谱中行与行的距离\n- `text-align` — 文字对齐（`left` / `center` / `right`），像乐团的队列\n\n合理的间距让文字"透气"，就像休止符让音乐有呼吸的空间。'
      },
      {
        type: 'example',
        title: '看例子',
        content: '下面这段 CSS 展示了字体和间距的综合运用。切换到 CSS 标签页查看：\n\n```css\n.card {\n  font-family: "Noto Serif SC", serif;\n  line-height: 1.8;\n  letter-spacing: 0.05em;\n  text-align: center;\n}\n```\n注意预览区中文字的字体风格、行间距和字间距的变化。'
      },
      {
        type: 'task',
        title: '动手试试 ✨',
        content: '切换到 CSS 标签页，试试调整：\n\n1. 把 `.card` 的 `font-family` 改成 `sans-serif`，感受字体变化\n2. 把 `line-height` 从 `1.8` 改成 `1.3` 和 `2.5`，看看行间距的疏密变化\n3. 把 `letter-spacing` 加大到 `0.15em`，感受字间距\n4. 把 `text-align` 改成 `left` 和 `right`，看对齐变化'
      }
    ],
    starterCode: {
      html: '<h1>音乐随想</h1>\n\n<div class="card">\n  <h2>月光之下</h2>\n  <p>德彪西的《月光》如流水般倾泻，每一个音符都像是洒在琴键上的银色月光。</p>\n  <p>闭上眼睛，让音乐带你进入一个朦胧而美丽的梦境。</p>\n</div>',
      css: 'h1 {\n  font-family: "Noto Serif SC", serif;\n  text-align: center;\n  color: #3D2B1F;\n}\n\n.card {\n  font-family: "Noto Serif SC", serif;\n  line-height: 1.8;\n  letter-spacing: 0.05em;\n  text-align: center;\n  background-color: #FFFAF2;\n  border: 1px solid #D4C5A9;\n  border-radius: 12px;\n  padding: 24px;\n}\n\n.card h2 {\n  color: #8B2E2E;\n}',
      js: ''
    }
  },

  // ===== 2.4 盒模型 =====
  {
    id: 'css-box-model',
    chapterId: 'css-style',
    order: 4,
    title: '盒模型 — 理解元素的空间',
    musicAnalogy: '每个 HTML 元素都是一个"盒子"，就像**音乐厅的声学布局**：\n\n- `content`（内容）— 演奏区，音乐家所在的地方\n- `padding`（内边距）— 舞台到墙壁的距离\n- `border`（边框）— 音乐厅的墙壁\n- `margin`（外边距）— 音乐厅之间的间隔',
    listenTo: '马勒《第八交响曲》"千人交响曲"— 感受庞大的空间感和层次感，就像盒模型的层层嵌套。',
    sections: [
      {
        type: 'explain',
        title: '盒模型的四层结构',
        content: '从内到外，每个元素有四层空间：\n\n[[html]]\n<div class="box-model-demo">\n  <div class="bm-margin"><span class="bm-label">margin 外边距</span>\n    <div class="bm-border"><span class="bm-label">border 边框</span>\n      <div class="bm-padding"><span class="bm-label">padding 内边距</span>\n        <div class="bm-content">content（内容）</div>\n      </div>\n    </div>\n  </div>\n</div>\n[[/html]]\n\n最外层 `margin`（外边距），往里一层 `border`（边框），再往里 `padding`（内边距），最里面是 `content`（内容）。理解这个层次关系就掌握了 CSS 布局的基础！'
      },
      {
        type: 'explain',
        title: 'padding 和 margin 的区别',
        content: '- `padding`（内边距）：内容与边框之间的距离，在边框**里面**\n- `margin`（外边距）：边框与相邻元素之间的距离，在边框**外面**\n\n一个常用的记忆方式：\n- padding 有背景色（在盒子里）\n- margin 透明（盒子之外）\n\n就像舞台上的地毯（padding）和舞台之间的过道（margin）！'
      },
      {
        type: 'example',
        title: '看例子',
        content: '下面的代码展示了盒模型的实际应用。两张卡片，每张都有自己的padding和margin：\n\n```css\n.card {\n  background-color: #FFFAF2;\n  border: 2px solid #D4C5A9;\n  border-radius: 8px;\n  padding: 24px;       /* 内容到边框的距离 */\n  margin-bottom: 20px;  /* 卡片之间的间隔 */\n}\n```'
      },
      {
        type: 'task',
        title: '动手试试 ✨',
        content: '切换到 CSS 标签页，调整这些值看效果：\n\n1. 把 `.card` 的 `padding` 从 `24px` 改成 `8px`，感受内容变得拥挤\n2. 把 `padding` 改成 `48px`，感受宽松的空间\n3. 把 `margin-bottom` 从 `20px` 改成 `60px`，卡片之间距离变大\n4. 试试给 `h2` 加一个 `margin-top: 0` 消除顶部多余间距'
      }
    ],
    starterCode: {
      html: '<h1>音乐空间</h1>\n\n<div class="card">\n  <h2>🎻 弦乐四重奏</h2>\n  <p>两把小提琴、一把中提琴、一把大提琴。</p>\n  <p>亲密而精致的对话。</p>\n</div>\n\n<div class="card">\n  <h2>🎺 爵士三重奏</h2>\n  <p>钢琴、贝斯、鼓。</p>\n  <p>即兴与节奏的碰撞。</p>\n</div>',
      css: '.card {\n  background-color: #FFFAF2;\n  border: 2px solid #D4C5A9;\n  border-radius: 8px;\n  padding: 24px;\n  margin-bottom: 20px;\n}\n\n.card h2 {\n  color: #8B2E2E;\n  margin-top: 0;\n}\n\n.card p {\n  color: #6B5A4E;\n  margin: 6px 0;\n}',
      js: ''
    }
  },

  // ===== 2.5 CSS 选择器 =====
  {
    id: 'css-selectors',
    chapterId: 'css-style',
    order: 5,
    title: 'CSS 选择器 — 精确指向你的元素',
    musicAnalogy: '选择器就像**指挥的手势**——指向特定的乐器组（元素），告诉它们该怎么演奏。`.class` 像指挥说"弦乐组"，`#id` 像说"首席小提琴手"，`:hover` 像说"当我指向你的时候..."',
    listenTo: '布里顿《青少年管弦乐队指南》— 每一段变奏中，指挥逐一指向不同的乐器组，就像选择器精确选中页面中的元素。',
    sections: [
      {
        type: 'explain',
        title: '基础选择器',
        content: '选择器告诉 CSS"对谁生效"。三种最基础的选择器：\n\n| 选择器 | 写法 | 含义 |\n|--------|------|------|\n| 元素选择器 | `h1` | 选中所有 `<h1>` |\n| 类选择器 | `.card` | 选中所有 `class="card"` 的元素 |\n| ID选择器 | `#title` | 选中 `id="title"` 的元素 |\n\n```css\nh1 { color: #8B2E2E; }        /* 所有 h1 */\n.card { background: #FFFAF2; } /* 所有带 class="card" 的 */\n#title { font-size: 2rem; }    /* 只有 id="title" 那个 */\n```\n\n**类选择器最常用**——一个类可以给多个元素，一个元素也可以有多个类。'
      },
      {
        type: 'explain',
        title: '组合与后代',
        content: '选择器可以组合使用，精确指定层级关系：\n\n- `.card h2` — **后代选择器**，`.card` 内部的所有 `<h2>`\n- `.card > h2` — **子代选择器**，`.card` 的直接子元素 `<h2>`\n- `h2, h3` — **分组选择器**，同时选中 `<h2>` 和 `<h3>`\n- `.card.featured` — **交集选择器**，同时有 `class="card featured"` 的元素\n\n```css\n.card h2 { color: #8B2E2E; }       /* card 内的所有 h2 */\n.card.featured { border-color: gold; } /* 只有 featured 的那张卡片 */\n```\n\n就像指挥可以指向"弦乐组中的第一小提琴"或"整个管乐声部"。'
      },
      {
        type: 'explain',
        title: '伪类选择器 — 状态触发的魔法',
        content: '伪类以 `:` 开头，根据元素的**状态**来应用样式：\n\n- `:hover` — 鼠标悬停时\n- `:first-child` — 是父元素的第一个子元素\n- `:last-child` — 是父元素的最后一个子元素\n- `:nth-child(n)` — 是父元素的第 n 个子元素\n\n```css\n.card:hover { transform: translateY(-2px); }\n.card:first-child { border-color: #8B2E2E; }\n.card:nth-child(2) { border-color: #C9A96E; }\n```\n\n`:hover` 是交互感的来源——鼠标移到卡片上，卡片微微上浮，就像指挥的棒尖点到了你！'
      },
      {
        type: 'example',
        title: '看例子',
        content: '下面的代码有三张卡片，用不同的选择器为它们设置了左侧的强调色：\n\n```css\n/* 所有卡片共享的样式 */\n.card {\n  background-color: #FFFAF2;\n  border: 1px solid #D4C5A9;\n  border-radius: 8px;\n  padding: 16px;\n  margin-bottom: 12px;\n  transition: all 0.3s ease;\n}\n\n/* :hover 交互反馈 */\n.card:hover {\n  border-color: #C9A96E;\n  transform: translateY(-2px);\n}\n\n/* :nth-child 给每张卡片不同的强调色 */\n.card:nth-child(1) { border-left: 4px solid #8B2E2E; }\n.card:nth-child(2) { border-left: 4px solid #C9A96E; }\n.card:nth-child(3) { border-left: 4px solid #5B8C5A; }\n```\n试试把鼠标移到卡片上，看它们微微上浮的效果！'
      },
      {
        type: 'task',
        title: '动手试试 ✨',
        content: '切换到 CSS 标签页，尝试：\n\n1. 把 `.card:nth-child(1)` 的左边框颜色换一个\n2. 给 `.card:hover` 增加 `box-shadow` 属性，让悬浮效果更明显\n3. 试试 `.card:last-child` 选择器，给最后一张卡片特殊的样式\n4. 挑战：添加一张新卡片（第4张），用 `.card:nth-child(4)` 给它设置不同的颜色'
      }
    ],
    starterCode: {
      html: '<h1>作曲家名录</h1>\n\n<div class="card">\n  <h2>🎻 巴赫</h2>\n  <p>巴洛克时期的复调大师</p>\n</div>\n\n<div class="card featured">\n  <h2>🎹 莫扎特</h2>\n  <p>古典主义的旋律天才</p>\n</div>\n\n<div class="card">\n  <h2>🎺 贝多芬</h2>\n  <p>古典与浪漫的桥梁</p>\n</div>',
      css: 'h1 {\n  color: #8B2E2E;\n  margin-bottom: 20px;\n}\n\n.card {\n  background-color: #FFFAF2;\n  border: 1px solid #D4C5A9;\n  border-radius: 8px;\n  padding: 16px;\n  margin-bottom: 12px;\n  transition: all 0.3s ease;\n}\n\n.card:hover {\n  border-color: #C9A96E;\n  transform: translateY(-2px);\n  box-shadow: 0 4px 12px rgba(61, 43, 31, 0.1);\n}\n\n.card h2 {\n  color: #3D2B1F;\n  margin: 0 0 4px 0;\n}\n\n.card p {\n  color: #6B5A4E;\n  margin: 0;\n}\n\n.card:nth-child(1) {\n  border-left: 4px solid #8B2E2E;\n}\n\n.card:nth-child(2) {\n  border-left: 4px solid #C9A96E;\n}\n\n.card:nth-child(3) {\n  border-left: 4px solid #5B8C5A;\n}\n\n/* featured 卡片的特殊样式 */\n.card.featured {\n  background: #FFF8F0;\n}',
      js: ''
    }
  },

  // ===== 2.6 层叠与优先级 =====
  {
    id: 'css-cascade',
    chapterId: 'css-style',
    order: 6,
    title: '层叠与优先级 — 当多个规则"打架"时谁说了算？',
    musicAnalogy: 'CSS 的"C"代表 **Cascading**（层叠）。当指挥给木管组一个整体指示、同时又给长笛手一个特别指示时，长笛手听谁？当然是**更具体的那个**。CSS 也一样——当多个规则都指向同一个元素时，浏览器按照一套"乐谱排演规则"来决定谁生效：编号越精确的规则优先级越高。',
    listenTo: '柴可夫斯基《1812 序曲》— 开头弦乐的祈祷、中间骑兵冲锋的马赛曲、结尾钟声与加农炮的巨响。不同乐器在不同时刻占据前景——CSS 层叠也是如此，具体的选择器在关键时刻"压过"通用规则，形成视觉焦点。',
    sections: [
      {
        type: 'explain',
        title: '三条规则决定谁胜出',
        content: '多条 CSS 规则都指向同一个元素时，浏览器按以下顺序决定：\n\n**1. 来源与 `!important`**\n- 作者样式 > 用户样式 > 浏览器默认样式\n- `!important` 标记**强行跳过优先级计算**（慎用！）\n\n**2. 选择器权重（Specificity）**\n- **内联 style** = 1000 分\n- **ID 选择器** `#title` = 100 分\n- **类/伪类/属性** `.card`, `:hover` = 10 分\n- **元素/伪元素** `h1`, `::before` = 1 分\n\n**3. 书写顺序**\n- 权重相同时，**后写的覆盖先写的**\n- 就像一部交响曲——最后奏出的主题留在耳中'
      },
      {
        type: 'explain',
        title: '权重计算实例',
        content: '看这几个例子，理解权重怎么算：\n\n```css\nh1 { color: red; }                     /* 权重: 1 */\n.card h1 { color: blue; }              /* 权重: 10+1=11 */\n#main h1 { color: green; }             /* 权重: 100+1=101 */\n.card h1.title { color: gold; }        /* 权重: 10+1+10=21 */\n```\n\n`.card h1` 会覆盖 `h1`，因为 11 > 1。\n`#main h1` 会覆盖所有上面三个，因为 101 最高。\n\n```css\n/* 权重相同 */\n.card h1 { color: red; }\n.card h1 { color: blue; }  /* ← 这条胜利！（后写） */\n```\n\n提示：用浏览器 DevTools（F12）可以看到被"划掉"的失效样式——被谁覆盖了，一目了然。'
      },
      {
        type: 'explain',
        title: '!important — 紧急按钮，慎用！',
        content: '`!important` 写在属性值后面，会让这条声明**无视权重直接生效**：\n\n```css\nh1 {\n  color: #8B2E2E !important;\n}\n\n/* 即使其他规则权重更高也会被覆盖 */\n```\n\n**为什么要慎用？**\n`!important` 就像在交响乐中加入电吉他——它能占据主导，但**破坏了正常的层叠逻辑**。一旦用了第一次，很快就需要用更多 `!important` 去覆盖之前的 `!important`，最后变得无法维护。\n\n**只有两种情况应该用：**\n1. 覆盖你无法控制的第三方样式（如 UI 库）\n2. 工具类（如 `.hidden` 必须隐藏元素）'
      },
      {
        type: 'example',
        title: '看例子',
        content: '下面的代码故意写了冲突的规则，感受层叠效果：\n\n```css\n/* 规则 1：权重 1 */\np { color: gray; }\n\n/* 规则 2：权重 11 —— 会覆盖规则 1 */\n.card p { color: #3D2B1F; }\n\n/* 规则 3：权重 21 —— 会覆盖规则 2 */\n.card p.highlight { color: #8B2E2E; }\n\n/* 规则 4：权重 101 —— 无人能敌 */\n#special { color: #C9A96E; }\n```\n\n在预览区看第三条卡片的文字颜色——ID 选择器的金色覆盖了所有其他。'
      },
      {
        type: 'task',
        title: '动手试试 ✨',
        content: '切换到 CSS 标签页，试试：\n\n1. 去掉 `#special` 的 color 样式，看第三条文字变成什么颜色\n2. 给 `.card p.highlight` 的 color 加 `!important`，看效果\n3. 在 DevTools（F12）中查看元素的 Computed 样式，观察被划掉的规则\n4. 挑战：增加一条 `body .card p` 规则（权重 12），写一个颜色的 color，观察谁能赢'
      }
    ],
    starterCode: {
      html: '<h1>层叠实验</h1>\n\n<div class="card" id="card1">\n  <p>第一条卡片的文字</p>\n</div>\n\n<div class="card" id="card2">\n  <p class="highlight">第二条卡片的文字（有 highlight）</p>\n</div>\n\n<div class="card" id="card3">\n  <p id="special">第三条卡片的文字（有 ID）</p>\n</div>\n\n<p class="note">观察哪条规则最终生效了？</p>',
      css: 'h1 {\n  color: #8B2E2E;\n  margin-bottom: 20px;\n}\n\n/* 规则 1：权重 1 */\np { color: #999; }\n\n/* 规则 2：权重 11 */\n.card p { color: #3D2B1F; }\n\n/* 规则 3：权重 21 */\n.card p.highlight { color: #8B2E2E; }\n\n/* 规则 4：权重 101 */\n#special { color: #C9A96E; font-weight: 700; }\n\n.card {\n  background: #FFFAF2;\n  border: 1px solid #D4C5A9;\n  border-radius: 8px;\n  padding: 16px;\n  margin-bottom: 12px;\n}\n\n.note {\n  font-size: 13px;\n  color: #6B5A4E;\n  text-align: center;\n  margin-top: 20px;\n  font-style: italic;\n}',
      js: ''
    }
  },

  // ===== 2.7 CSS 单位 =====
  {
    id: 'css-units',
    chapterId: 'css-style',
    order: 7,
    title: 'CSS 单位 — 选择你的"时值"',
    musicAnalogy: 'CSS 单位就像音乐中的**时值系统**：`px`（像素）像固定拍号，精确不变；`em`/`rem` 像相对时值，随上下文变化；`%` 像以整个乐章为参照的比例；`vh`/`vw` 像视口（屏幕）为舞台的坐标。',
    listenTo: '斯特拉文斯基《春之祭》— 复杂多变的节拍和不规则的重音，就像 CSS 中灵活运用各种单位创造出丰富的视觉效果。',
    sections: [
      {
        type: 'explain',
        title: '绝对单位：px',
        content: '`px`（像素）是最常用的单位，表示屏幕上的固定点数：\n\n```css\np {\n  font-size: 16px;\n  width: 300px;\n}\n```\n\n优点是精确、不会受父元素影响。就像用**节拍器**定速——60bpm 走到哪都是 60bpm。\n\n适合：边框粗细、精确尺寸、小间距。'
      },
      {
        type: 'explain',
        title: '相对单位：em 与 rem',
        content: '`em` 和 `rem` 是相对单位，会根据字体大小缩放：\n\n- **`em`** — 相对于**父元素**的字体大小\n- **`rem`** — 相对于**根元素**（`<html>`）的字体大小\n\n```css\n.parent { font-size: 16px; }\n.child { font-size: 1.5em; }  /* = 16 × 1.5 = 24px */\n.child2 { font-size: 1.5rem; } /* = 16 × 1.5 = 24px，不管父元素 */\n```\n\n`em` 像**相对时值**——在 4/4 拍中，四分音符是一拍，但在 3/8 拍中，八分音符才是一拍。\n`rem` 像**以固定拍号为准**——不论段落怎么变，一拍始终是一拍。\n\n推荐：**字体大小用 rem，间距用 em 或 rem。**'
      },
      {
        type: 'explain',
        title: '视口单位：vh 与 vw',
        content: '`vh`（viewport height）和 `vw`（viewport width）相对于浏览器窗口：\n\n- `100vh` = 浏览器窗口的完整高度\n- `50vw` = 浏览器窗口一半的宽度\n\n```css\n.hero {\n  height: 100vh;  /* 占满整个屏幕 */\n}\n```\n\n也常用：`%` — 相对于父元素的百分比。\n\n```css\n.card {\n  width: 50%;  /* 父元素宽度的一半 */\n}\n```\n\n就像**以舞台为参照**——"独奏者站在舞台正中央" vs "独奏者在整个音乐厅 50% 的位置"。'
      },
      {
        type: 'example',
        title: '看例子',
        content: '下面的代码展示了不同单位的实际效果。四张尺寸标签卡片，分别用 `px`、`%`、`vw`、`em` 控制宽度：\n\n```css\n.box-px { width: 120px; }\n.box-percent { width: 80%; }\n.box-vw { width: 50vw; }\n.box-em { font-size: 1.5em; }\n```\n观察预览区中各卡片宽度和字号的差异。注意 `80%` 的卡片是在其父容器中的 80%。'
      },
      {
        type: 'task',
        title: '动手试试 ✨',
        content: '切换到 CSS 标签页，试试：\n\n1. 把 `.box-px` 的宽度从 `120px` 改成 `200px`\n2. 把 `.box-percent` 的宽度从 `80%` 改成 `50%`\n3. 把 `.box-em` 的 `font-size` 改大到 `2em`，看文字变大，盒子也跟着变\n4. 挑战：给 `.box-rem` 设置 `font-size: 2rem`，对比 `.box-em` 的 1.5em 有何不同'
      }
    ],
    starterCode: {
      html: '<h1>CSS 单位对比</h1>\n\n<div class="demo-container">\n  <div class="label-box box-px">\n    <strong>px</strong>\n    <span>120px 宽</span>\n  </div>\n\n  <div class="label-box box-percent">\n    <strong>%</strong>\n    <span>80% 宽</span>\n  </div>\n\n  <div class="label-box box-vw">\n    <strong>vw</strong>\n    <span>50vw 宽</span>\n  </div>\n\n  <div class="label-box box-em">\n    <strong>em</strong>\n    <span>1.5em 字号</span>\n  </div>\n\n  <div class="label-box box-rem">\n    <strong>rem</strong>\n    <span>默认字号</span>\n  </div>\n</div>',
      css: 'h1 {\n  color: #8B2E2E;\n  margin-bottom: 20px;\n}\n\n.demo-container {\n  border: 2px dashed #D4C5A9;\n  border-radius: 8px;\n  padding: 20px;\n}\n\n.label-box {\n  background: #FFFAF2;\n  border: 1px solid #D4C5A9;\n  border-radius: 6px;\n  padding: 10px 14px;\n  margin-bottom: 8px;\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n}\n\n.label-box strong {\n  color: #8B2E2E;\n  font-size: 14px;\n}\n\n.label-box span {\n  color: #6B5A4E;\n  font-size: 12px;\n}\n\n.box-px {\n  width: 120px;\n}\n\n.box-percent {\n  width: 80%;\n}\n\n.box-vw {\n  width: 50vw;\n}\n\n.box-em {\n  font-size: 1.5em;\n}\n\n.box-rem {\n  font-size: 1rem;\n}',
      js: ''
    }
  },

  // ===== 2.8 过渡与动画 =====
  {
    id: 'css-transitions',
    chapterId: 'css-style',
    order: 8,
    title: '过渡与动画 — 让页面流动起来',
    musicAnalogy: '动画就像音乐中的**渐强渐弱**（crescendo/diminuendo）——让变化平滑而自然。`transition` 像渐强记号，从 pp 到 ff 缓缓过渡；`@keyframes` 像精确的 **rubato**（弹性速度），自定义每个时间点的状态。',
    listenTo: '拉威尔《波莱罗》— 从极弱到极强，配器层层叠加，持续 15 分钟的渐强，完美诠释了"过渡"的艺术。',
    sections: [
      {
        type: 'explain',
        title: 'transition — 平滑过渡',
        content: '`transition` 让属性变化变得平滑，而不是瞬间跳变：\n\n```css\n.card {\n  background: #FFFAF2;\n  transition: all 0.3s ease;\n}\n\n.card:hover {\n  background: #8B2E2E;\n  color: #fff;\n  transform: scale(1.05);\n}\n```\n\n- `all` — 所有属性都过渡\n- `0.3s` — 过渡耗时 0.3 秒\n- `ease` — 缓动函数（开始快，结束慢）\n\n就像渐强记号把音量从一个等级平滑带到另一个等级。'
      },
      {
        type: 'explain',
        title: 'transform — 变换形态',
        content: '`transform` 可以改变元素的形状和位置，配合 `transition` 效果最佳：\n\n- `translateY(-4px)` — 向上移动 4px\n- `scale(1.1)` — 放大到 1.1 倍\n- `rotate(5deg)` — 旋转 5 度\n\n```css\n.card:hover {\n  transform: translateY(-4px) scale(1.02);\n}\n```\n\n多个变换用空格分隔即可。就像演奏者身体微微前倾（位移）+ 音量加大（缩放）来表现渐强！'
      },
      {
        type: 'explain',
        title: '@keyframes — 关键帧动画',
        content: '`@keyframes` 可以定义更复杂的、自动播放的动画：\n\n```css\n@keyframes pulse {\n  0%   { opacity: 1; transform: scale(1); }\n  50%  { opacity: 0.6; transform: scale(1.05); }\n  100% { opacity: 1; transform: scale(1); }\n}\n\n.card {\n  animation: pulse 2s ease-in-out infinite;\n}\n```\n\n- `pulse` — 动画名称（自己命名）\n- `2s` — 一个周期 2 秒\n- `ease-in-out` — 缓入缓出\n- `infinite` — 无限循环\n\n就像一个持续重复的节奏型——鼓手打的固定节拍！'
      },
      {
        type: 'example',
        title: '看例子',
        content: '下面的代码展示了三种动画效果。鼠标悬停在前两张卡片上看过渡效果，第三张是自动播放的脉动动画：\n\n```css\n.fade-card { transition: all 0.3s ease; }\n.fade-card:hover {\n  background: #8B2E2E;\n  color: #fff;\n  transform: scale(1.05);\n}\n\n.bounce-card:hover {\n  animation: bounce 0.6s ease;\n}\n\n@keyframes bounce {\n  0%, 100% { transform: translateY(0); }\n  50% { transform: translateY(-10px); }\n}\n```\n切换到预览区，把鼠标移到卡片上试试！'
      },
      {
        type: 'task',
        title: '动手试试 ✨',
        content: '切换到 CSS 标签页，试试：\n\n1. 把 `.fade-card` 的 `transition` 时间改成 `1s`，看过渡变慢\n2. 修改 `@keyframes bounce` 中的 `-10px` 改成 `-20px`，让跳动更大\n3. 调整 `.auto-pulse` 的 `animation` 中 `2s` 改成 `0.5s`，让脉动更快\n4. 挑战：新建一个 `@keyframes spin`，用 `rotate` 做一个旋转动画'
      }
    ],
    starterCode: {
      html: '<h1>动画画廊</h1>\n\n<div class="animation-group">\n  <div class="anim-card fade-card">\n    <span class="card-icon">🎵</span>\n    <strong>渐强过渡</strong>\n    <p>鼠标移到这里</p>\n  </div>\n\n  <div class="anim-card bounce-card">\n    <span class="card-icon">🎹</span>\n    <strong>跳动动画</strong>\n    <p>鼠标移到这里</p>\n  </div>\n\n  <div class="anim-card auto-pulse">\n    <span class="card-icon">💫</span>\n    <strong>自动脉动</strong>\n    <p>无限循环中...</p>\n  </div>\n</div>',
      css: 'h1 {\n  color: #8B2E2E;\n  text-align: center;\n  margin-bottom: 24px;\n}\n\n.animation-group {\n  display: flex;\n  gap: 16px;\n  flex-wrap: wrap;\n  justify-content: center;\n}\n\n.anim-card {\n  background: #FFFAF2;\n  border: 1px solid #D4C5A9;\n  border-radius: 12px;\n  padding: 24px;\n  text-align: center;\n  width: 180px;\n  cursor: pointer;\n}\n\n.card-icon {\n  font-size: 32px;\n  display: block;\n  margin-bottom: 8px;\n}\n\n.anim-card strong {\n  display: block;\n  color: #3D2B1F;\n  margin-bottom: 4px;\n}\n\n.anim-card p {\n  color: #6B5A4E;\n  font-size: 12px;\n  margin: 0;\n}\n\n/* 渐强过渡 */\n.fade-card {\n  transition: all 0.3s ease;\n}\n\n.fade-card:hover {\n  background: #8B2E2E;\n  color: #fff;\n  transform: scale(1.05);\n  box-shadow: 0 8px 24px rgba(61, 43, 31, 0.16);\n}\n\n.fade-card:hover strong,\n.fade-card:hover p {\n  color: #fff;\n}\n\n/* 跳动 */\n.bounce-card:hover {\n  animation: bounce 0.6s ease;\n}\n\n@keyframes bounce {\n  0%, 100% { transform: translateY(0); }\n  25% { transform: translateY(-12px); }\n  75% { transform: translateY(-4px); }\n}\n\n/* 自动脉动 */\n.auto-pulse {\n  animation: pulse 2s ease-in-out infinite;\n  border-color: #C9A96E;\n}\n\n@keyframes pulse {\n  0%, 100% { opacity: 1; transform: scale(1); }\n  50% { opacity: 0.7; transform: scale(1.03); }\n}',
      js: ''
    }
  },

  // ===== 2.9 伪元素 =====
  {
    id: 'css-pseudo',
    chapterId: 'css-style',
    order: 9,
    title: '伪元素 — 不写 HTML 的装饰魔法',
    musicAnalogy: '`::before` 和 `::after` 就像音乐中的**装饰音（appoggiatura）**——不额外占用小节拍数，却增添了丰富的表现力。无需修改 HTML，就能在元素前后插入图标、分隔线、角标等装饰内容。',
    listenTo: '巴赫《哥德堡变奏曲》— 主题中的装饰音贯穿 30 段变奏，每次出现都为音乐增添了不同的色彩，就像 ::before/::after 为元素添加多样的视觉装饰。',
    sections: [
      {
        type: 'explain',
        title: '什么是伪元素？',
        content: '伪元素让你不修改 HTML 就能在元素前后插入内容：\n\n```css\n.card::before {\n  content: "🎵";\n}\n\n.card::after {\n  content: "";\n  display: block;\n  height: 2px;\n  background: #C9A96E;\n}\n```\n\n- `::before` — 在元素内容**之前**插入\n- `::after` — 在元素内容**之后**插入\n- `content` — **必须写**（即使为空字符串 `""`），否则伪元素不显示\n- 伪元素默认是**行内元素**，设置宽高需加 `display: block` 或 `inline-block`'
      },
      {
        type: 'explain',
        title: '常见用法',
        content: '**1. 图标/编号前缀**\n```css\n.task::before {\n  content: "✓ ";\n  color: #5B8C5A;\n  font-weight: bold;\n}\n```\n\n**2. 装饰线/分隔符**\n```css\n.section::after {\n  content: "";\n  display: block;\n  width: 60px;\n  height: 3px;\n  background: #C9A96E;\n  margin-top: 8px;\n}\n```\n\n**3. 角标/悬停蒙层**\n```css\n.card::after {\n  content: "NEW";\n  position: absolute;\n  top: 8px;\n  right: 8px;\n  background: #C94545;\n  color: #fff;\n  padding: 2px 8px;\n  border-radius: 4px;\n  font-size: 12px;\n}\n```'
      },
      {
        type: 'example',
        title: '看例子',
        content: '下面的代码用 `::before` 给列表项加了音符图标，用 `::after` 在卡片底部加了装饰线：\n\n```css\n.music-item::before {\n  content: "♪";\n  margin-right: 8px;\n  color: #C9A96E;\n}\n\n.card::after {\n  content: "";\n  display: block;\n  width: 40px;\n  height: 3px;\n  background: linear-gradient(to right, #C9A96E, transparent);\n  margin-top: 12px;\n}\n```\n注意预览区——列表项前面的音符和卡片底部的装饰线，都不是 HTML 里写的！'
      },
      {
        type: 'task',
        title: '动手试试 ✨',
        content: '切换到 CSS 标签页，试试：\n\n1. 把 `.music-item::before` 的 `content` 从 `"♪"` 改成 `"♫"` 或 `"🎵"`\n2. 修改 `.card::after` 的装饰线宽度，从 `40px` 改成 `100%`\n3. 给卡片加一个右上角角标 `"推荐"`（提示：用 `.card::before` + `position: absolute`）\n4. 挑战：用 `::after` 给 `.music-item` 后面加一个箭头 "→"'
      }
    ],
    starterCode: {
      html: '<h1>推荐曲目</h1>\n\n<div class="card">\n  <h2>月光</h2>\n  <p>德彪西的代表作，印象派音乐的典范。</p>\n  <ul class="music-list">\n    <li class="music-item">宁静而朦胧的旋律</li>\n    <li class="music-item">如流水般的琶音</li>\n    <li class="music-item">印象派和声色彩</li>\n  </ul>\n</div>\n\n<div class="card">\n  <h2>夜曲</h2>\n  <p>肖邦最著名的钢琴作品之一。</p>\n  <ul class="music-list">\n    <li class="music-item">如歌的旋律线条</li>\n    <li class="music-item">丰富的装饰音</li>\n    <li class="music-item">深沉的情感表达</li>\n  </ul>\n</div>',
      css: 'h1 {\n  color: #8B2E2E;\n  text-align: center;\n}\n\n.card {\n  position: relative;\n  background: #FFFAF2;\n  border: 1px solid #D4C5A9;\n  border-radius: 10px;\n  padding: 24px;\n  margin-bottom: 16px;\n}\n\n.card h2 {\n  color: #8B2E2E;\n  margin: 0 0 8px 0;\n}\n\n.card p {\n  color: #6B5A4E;\n  margin: 0 0 12px 0;\n  font-size: 14px;\n}\n\n/* ::before 音符图标 */\n.music-item::before {\n  content: "♪";\n  margin-right: 8px;\n  color: #C9A96E;\n  font-weight: bold;\n}\n\n.music-item {\n  list-style: none;\n  color: #3D2B1F;\n  margin: 4px 0;\n  font-size: 14px;\n}\n\n/* ::after 装饰线 */\n.card::after {\n  content: "";\n  display: block;\n  width: 40px;\n  height: 3px;\n  background: linear-gradient(to right, #C9A96E, transparent);\n  margin-top: 16px;\n  border-radius: 2px;\n}',
      js: ''
    }
  },

  // ===== 2.10 渐变 =====
  {
    id: 'css-gradients',
    chapterId: 'css-style',
    order: 10,
    title: '渐变 — 用色彩谱写旋律',
    musicAnalogy: '渐变就像**音阶**——从 do 到 sol，每一个音的频率都在平滑过渡。CSS 渐变让你在两种（或多种）颜色之间创造无缝的过渡，就像竖琴上的**滑奏**（glissando），指尖划过琴弦，音色层层递进。',
    listenTo: '德彪西《牧神午后前奏曲》— 长笛的旋律在乐器间流动，音色从柔和到明亮再到朦胧，色彩渐变如同印象派画布上的笔触。',
    sections: [
      {
        type: 'explain',
        title: '线性渐变',
        content: '`linear-gradient` 沿一条直线平滑过渡：\n\n```css\n.card {\n  background: linear-gradient(to right, #FFFAF2, #8B2E2E);\n}\n```\n\n- `to right` — 方向（还有 `to bottom`、`to top left`、`45deg` 等）\n- `#FFFAF2` — 起始色\n- `#8B2E2E` — 结束色\n\n多个色标：\n```css\nbackground: linear-gradient(to right, #FFFAF2, #C9A96E 40%, #8B2E2E);\n```\n`40%` 意思是金色在 40% 的位置出现。就像音阶中 sol 在 do 和 do\' 之间的准确位置。'
      },
      {
        type: 'explain',
        title: '径向渐变与渐变文字',
        content: '`radial-gradient` 从中心向外辐射：\n\n```css\nbackground: radial-gradient(circle, #fff 10%, #C9A96E 80%);\n```\n\n渐变色可以代替颜色值用在任何地方：\n\n```css\n/* 渐变文字 */\nbackground: linear-gradient(45deg, #8B2E2E, #C9A96E);\n-webkit-background-clip: text;\n-webkit-text-fill-color: transparent;\n\n/* 渐变边框 */\nborder: 2px solid;\nborder-image: linear-gradient(45deg, #8B2E2E, #C9A96E) 1;\n```\n\n就像不同乐器在不同音区演奏——高音区明亮、低音区深沉，渐变让颜色也有了"音色"变化。'
      },
      {
        type: 'example',
        title: '看例子',
        content: '下面的代码展示了四种渐变用法：按钮渐变背景、卡片顶部渐变条、径向光晕、渐变文字：\n\n```css\n.btn-gradient {\n  background: linear-gradient(135deg, #8B2E2E, #C94545);\n}\n\n.card-top {\n  background: linear-gradient(to right, #8B2E2E, #C9A96E);\n  height: 6px;\n}\n\n.glow {\n  background: radial-gradient(circle, rgba(201,169,110,0.3), transparent);\n}\n```\n看预览区中颜色平滑过渡的效果——没有用到任何图片！'
      },
      {
        type: 'task',
        title: '动手试试 ✨',
        content: '切换到 CSS 标签页，试试：\n\n1. 把 `.btn-gradient` 的渐变方向从 `135deg` 改成 `45deg`\n2. 把 `.card-top` 改成三色渐变：`#8B2E2E, #C9A96E, #5B8C5A`\n3. 修改 `.glow` 的径向渐变，把半径调大或调小\n4. 挑战：给 `.card` 添加一个渐变边框效果（提示：`border-image`）'
      }
    ],
    starterCode: {
      html: '<h1>渐变画廊</h1>\n\n<div class="card">\n  <div class="card-top"></div>\n  <div class="card-body">\n    <h2>月光奏鸣曲</h2>\n    <p>贝多芬第14号钢琴奏鸣曲</p>\n    <button class="btn-gradient">立即聆听</button>\n  </div>\n</div>\n\n<div class="card">\n  <div class="card-top card-top-alt"></div>\n  <div class="card-body">\n    <h2>蓝色多瑙河</h2>\n    <p>小约翰·施特劳斯的圆舞曲</p>\n    <button class="btn-gradient">立即聆听</button>\n  </div>\n  <div class="glow"></div>\n</div>',
      css: 'h1 {\n  color: #8B2E2E;\n  text-align: center;\n  margin-bottom: 20px;\n}\n\n.card {\n  position: relative;\n  background: #FFFAF2;\n  border-radius: 12px;\n  overflow: hidden;\n  margin-bottom: 20px;\n}\n\n.card-top {\n  background: linear-gradient(to right, #8B2E2E, #C9A96E);\n  height: 6px;\n}\n\n.card-top-alt {\n  background: linear-gradient(to right, #5B8C5A, #C9A96E);\n}\n\n.card-body {\n  padding: 24px;\n  text-align: center;\n}\n\n.card h2 {\n  color: #3D2B1F;\n  margin: 0 0 4px 0;\n}\n\n.card p {\n  color: #6B5A4E;\n  font-size: 14px;\n  margin: 0 0 16px 0;\n}\n\n.btn-gradient {\n  padding: 10px 28px;\n  background: linear-gradient(135deg, #8B2E2E, #C94545);\n  color: #fff;\n  border: none;\n  border-radius: 8px;\n  font-size: 14px;\n  font-weight: 600;\n  cursor: pointer;\n  transition: all 0.3s ease;\n}\n\n.btn-gradient:hover {\n  transform: translateY(-2px);\n  box-shadow: 0 4px 16px rgba(139, 46, 46, 0.3);\n}\n\n.glow {\n  position: absolute;\n  top: -20px;\n  right: -20px;\n  width: 100px;\n  height: 100px;\n  background: radial-gradient(circle, rgba(201, 169, 110, 0.25), transparent 70%);\n  pointer-events: none;\n}',
      js: ''
    }
  },

  // ===== 2.11 背景图片与阴影 =====
  {
    id: 'css-bg-image',
    chapterId: 'css-style',
    order: 11,
    title: '背景图片与阴影 — 为页面增添氛围与深度',
    musicAnalogy: '`background-image` 就像**舞台的背景幕布**，为音乐增加视觉氛围；`box-shadow` 就像**聚光灯下的立体感**，让卡片从平面中浮现出来。两者结合，就像舞台灯光的层次——背景铺陈氛围，阴影塑造景深。',
    listenTo: '德彪西《大海》— 管弦乐队用丰富的音色层次描绘海的画面：低音弦乐的深蓝背景、竖琴的波光粼粼（背景纹理）、铜管的强奏让声浪"浮现"（阴影层次）。背景与阴影的配合，就像交响乐队中的前景与背景对话。',
    sections: [
      {
        type: 'explain',
        title: 'background-image — 设置背景图片',
        content: '用 `url()` 引入图片作为背景：\n\n```css\n.hero {\n  background-image: url("concert-bg.jpg");\n  background-size: cover;      /* 覆盖整个元素 */\n  background-position: center; /* 居中显示 */\n  background-repeat: no-repeat;\n}\n```\n\n常用背景属性：\n- `background-size: cover` — 铺满容器，裁剪多余部分\n- `background-size: contain` — 完整显示图片，不裁剪\n- `background-position: center` — 图片居中\n- `background-repeat: no-repeat` — 不重复平铺\n\n可以叠加：渐变 + 图片：\n```css\nbackground: linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.6)), url("bg.jpg");\n```'
      },
      {
        type: 'explain',
        title: 'box-shadow 详解',
        content: '`box-shadow` 给元素添加阴影，让卡片"浮起来"：\n\n```css\n.card {\n  box-shadow: 4px 6px 16px rgba(61, 43, 31, 0.12);\n}\n/*           ↘  ↘   ↘   ↘\n             右  下  模糊 颜色(含透明度) */\n```\n\n多层阴影（用逗号分隔）：\n```css\n.card {\n  box-shadow:\n    0 2px 4px rgba(0,0,0,0.06),   /* 近景细阴影 */\n    0 8px 24px rgba(0,0,0,0.10);  /* 远景大阴影 */\n}\n```\n\n内阴影 `inset`：\n```css\n.input {\n  box-shadow: inset 0 1px 3px rgba(0,0,0,0.1);\n}\n```\n\n`text-shadow` 给文字加阴影：\n```css\nh1 {\n  text-shadow: 2px 2px 4px rgba(0,0,0,0.3);\n}\n```'
      },
      {
        type: 'example',
        title: '看例子',
        content: '下面的代码创建了一张有背景和阴影的音乐会卡片：\n\n```css\n.concert-card {\n  /* 渐变背景（模拟图片） */\n  background: linear-gradient(135deg, #3D2B1F, #6B5A4E);\n  border-radius: 16px;\n  padding: 32px;\n  color: #fff;\n\n  /* 多层阴影营造立体感 */\n  box-shadow:\n    0 4px 8px rgba(61, 43, 31, 0.15),\n    0 12px 32px rgba(61, 43, 31, 0.2);\n  transition: all 0.3s ease;\n}\n\n.concert-card:hover {\n  transform: translateY(-4px);\n  box-shadow:\n    0 8px 16px rgba(61, 43, 31, 0.2),\n    0 20px 48px rgba(61, 43, 31, 0.3);\n}\n```'
      },
      {
        type: 'task',
        title: '动手试试 ✨',
        content: '切换到 CSS 标签页，试试：\n\n1. 修改卡片渐变的颜色（从深棕改成暗红系）\n2. 调整 box-shadow 的模糊半径，从 32px 改成 48px\n3. 给标题加 text-shadow\n4. 挑战：给卡片用 `::before` 加一个半透明图案叠加层'
      }
    ],
    starterCode: {
      html: '<h1>音乐会精选</h1>\n\n<div class="concert-card">\n  <span class="date">6月15日 · 周二 · 19:30</span>\n  <h2>春之声音乐会</h2>\n  <p>巴赫、莫扎特与贝多芬的经典之夜</p>\n  <div class="info-row">\n    <span>📍 城市音乐厅</span>\n    <span>🎫 票价 ¥180 起</span>\n  </div>\n</div>\n\n<div class="concert-card card-2">\n  <span class="date">7月3日 · 周六 · 20:00</span>\n  <h2>浪漫之夜</h2>\n  <p>肖邦与李斯特的钢琴独奏</p>\n  <div class="info-row">\n    <span>📍 大剧院</span>\n    <span>🎫 票价 ¥280 起</span>\n  </div>\n</div>',
      css: 'h1 {\n  text-align: center;\n  color: #8B2E2E;\n  margin-bottom: 20px;\n  text-shadow: 1px 1px 2px rgba(139, 46, 46, 0.15);\n}\n\n.concert-card {\n  background: linear-gradient(135deg, #3D2B1F, #6B5A4E);\n  border-radius: 16px;\n  padding: 32px;\n  color: #FFFAF2;\n  margin-bottom: 20px;\n  max-width: 480px;\n  margin-left: auto;\n  margin-right: auto;\n  box-shadow:\n    0 4px 8px rgba(61, 43, 31, 0.12),\n    0 12px 32px rgba(61, 43, 31, 0.18);\n  transition: all 0.35s ease;\n}\n\n.concert-card:hover {\n  transform: translateY(-4px);\n  box-shadow:\n    0 8px 16px rgba(61, 43, 31, 0.18),\n    0 20px 48px rgba(61, 43, 31, 0.28);\n}\n\n.concert-card.card-2 {\n  background: linear-gradient(135deg, #5C2D2D, #8B4A4A);\n}\n\n.concert-card .date {\n  font-size: 12px;\n  color: #C9A96E;\n  font-weight: 600;\n  text-transform: uppercase;\n  letter-spacing: 0.08em;\n}\n\n.concert-card h2 {\n  color: #fff;\n  margin: 10px 0 6px 0;\n  font-size: 24px;\n  text-shadow: 1px 2px 4px rgba(0,0,0,0.3);\n}\n\n.concert-card p {\n  color: #D4C5A9;\n  margin: 0 0 16px 0;\n  font-size: 14px;\n}\n\n.info-row {\n  display: flex;\n  gap: 20px;\n  font-size: 13px;\n  color: #E8DCC8;\n}',
      js: ''
    }
  },

  // ===== 2.12 CSS 变量 =====
  {
    id: 'css-variables',
    chapterId: 'css-style',
    order: 12,
    title: 'CSS 变量 — 一次定义，全局共鸣',
    musicAnalogy: 'CSS 变量就像乐谱开头的**调号（key signature）**——升 fa 升 do 写一次，全曲所有的 fa 和 do 都跟着自动升。用 `--main-color` 定义一种颜色，全站所有用到它的地方一起改变。这个网站本身就在大量使用 CSS 变量！',
    listenTo: '巴赫《十二平均律》— 24 个大小调各写一首前奏曲与赋格，每个调性有不同的色彩和性格，就像 CSS 变量为不同的主题定义不同的色板，一键切换整个氛围。',
    sections: [
      {
        type: 'explain',
        title: '定义和使用变量',
        content: 'CSS 变量以 `--` 开头，在 `var()` 中引用：\n\n```css\n:root {\n  --main-color: #8B2E2E;\n  --card-bg: #FFFAF2;\n  --spacing: 16px;\n}\n\n.card {\n  color: var(--main-color);\n  background: var(--card-bg);\n  padding: var(--spacing);\n}\n```\n\n- `:root` — 全局作用域（相当于 `<html>`），在这里定义的变量全站可用\n- 变量名大小写敏感：`--mainColor` ≠ `--maincolor`\n- `var(--name, fallback)` — 第二个参数是备用值\n\n想看实际应用？打开 `src/styles/variables.css`——这个网站的每个颜色、间距、字体都定义在那里。'
      },
      {
        type: 'explain',
        title: '局部覆盖与主题切换',
        content: '变量可以在任意元素上重新定义，子元素继承新值：\n\n```css\n:root {\n  --theme: #8B2E2E;\n}\n\n.card.dark {\n  --theme: #C9A96E;\n  /* 这张卡片内的所有子元素都会用金色主题 */\n}\n```\n\n这就像乐曲中的**转调**——同一段旋律换一个调演奏，感觉完全不同。\n\n**实战优势：**\n- 颜色、间距、圆角全部用变量管理\n- 更换主题只需改一组变量值\n- 修改一个地方，全站自动同步'
      },
      {
        type: 'example',
        title: '看例子',
        content: '下面的代码在 `:root` 中定义了色彩变量，第二张卡片通过 `.dark` 类覆盖了局部变量值。两张卡片用了**完全相同的样式规则**，只因变量不同而呈现截然不同的风格：\n\n```css\n:root {\n  --card-bg: #FFFAF2;\n  --card-accent: #8B2E2E;\n  --card-sub: #6B5A4E;\n}\n\n.card.dark {\n  --card-bg: #3D2B1F;\n  --card-accent: #C9A96E;\n  --card-sub: #B8A898;\n}\n```\n看预览区——白天与黑夜，同一套规则，两组变量。'
      },
      {
        type: 'task',
        title: '动手试试 ✨',
        content: '切换到 CSS 标签页，试试：\n\n1. 修改 `:root` 中的 `--card-accent` 颜色，看两张卡片的变化\n2. 在 `:root` 中新增一个 `--radius: 8px` 变量，让两张卡片用 `var(--radius)` 替代固定的 `border-radius`\n3. 修改 `.card.dark` 中的变量值，创造你自己的暗色主题色板\n4. 挑战：创建第三张卡片，给它一个 `.warm` 类并定义一套暖橙色调变量'
      }
    ],
    starterCode: {
      html: '<h1>变量主题切换</h1>\n\n<div class="card">\n  <h2>古典主题</h2>\n  <p>米白底色，深红强调色</p>\n  <span class="tag">经典</span>\n</div>\n\n<div class="card dark">\n  <h2>暗夜主题</h2>\n  <p>深棕底色，金色强调色</p>\n  <span class="tag">暗夜</span>\n</div>',
      css: ':root {\n  --card-bg: #FFFAF2;\n  --card-accent: #8B2E2E;\n  --card-text: #3D2B1F;\n  --card-sub: #6B5A4E;\n}\n\nh1 {\n  color: #8B2E2E;\n  text-align: center;\n  margin-bottom: 20px;\n}\n\n.card {\n  background: var(--card-bg);\n  border-left: 4px solid var(--card-accent);\n  border-radius: 8px;\n  padding: 24px;\n  margin-bottom: 16px;\n  transition: all 0.3s ease;\n}\n\n.card h2 {\n  color: var(--card-accent);\n  margin: 0 0 8px 0;\n}\n\n.card p {\n  color: var(--card-sub);\n  margin: 0 0 12px 0;\n  font-size: 14px;\n}\n\n.tag {\n  display: inline-block;\n  background: var(--card-accent);\n  color: var(--card-bg);\n  padding: 2px 10px;\n  border-radius: 4px;\n  font-size: 12px;\n  font-weight: 600;\n}\n\n/* 暗色主题 */\n.card.dark {\n  --card-bg: #3D2B1F;\n  --card-accent: #C9A96E;\n  --card-text: #FFFAF2;\n  --card-sub: #B8A898;\n}',
      js: ''
    }
  },

  // ================================================================
  // 第三章：CSS 布局 — 排列你的音乐元素
  // ================================================================

  // ===== 3.1 Flexbox 入门 =====
  {
    id: 'css-flexbox',
    chapterId: 'css-layout',
    order: 1,
    title: 'Flexbox 入门 — 灵活排列你的内容',
    musicAnalogy: 'Flexbox 是 CSS 中的布局利器，就像**指挥安排乐队座位**——可以横向排（木管在前，铜管在后），也可以纵向排（第一小提琴在左，第二小提琴在右）。',
    listenTo: '布里顿《青少年管弦乐队指南》— 一段音乐展示了不同乐器组在舞台上的位置，完美诠释了"布局"的概念。',
    sections: [
      {
        type: 'explain',
        title: '什么是 Flexbox？',
        content: 'Flexbox（弹性盒子）让元素排列变得简单。只需在**父元素**上设置 `display: flex`，子元素就会自动排列：\n\n```css\n.container {\n  display: flex;\n}\n```\n\n默认情况下，子元素会**横向排列**（就像乐团的乐器按行排开）。'
      },
      {
        type: 'explain',
        title: '主轴方向',
        content: '`flex-direction` 决定排列方向：\n\n- `row`（默认）— 横向排列，从左到右，像乐团的一排\n- `column` — 纵向排列，从上到下，像总谱的各声部\n\n乐团排练时指挥说"弦乐坐左边，管乐坐右边"——在 CSS 中，`flex-direction` 就是你的指挥棒！'
      },
      {
        type: 'explain',
        title: '间距分配',
        content: '`justify-content` 控制主轴上的对齐方式：\n\n- `flex-start` — 靠左/靠上\n- `center` — 居中\n- `space-between` — 两端对齐，中间均匀分布\n- `space-around` — 每个元素周围有相同间距\n\n就像合唱团在舞台上排开——可以挤在中间，也可以均匀分布。'
      },
      {
        type: 'example',
        title: '看例子',
        content: '下面的代码用 Flexbox 把三张作曲家卡片横向排列。注意 `.container` 上的 `display: flex`：\n\n```css\n.container {\n  display: flex;\n  gap: 20px;\n  justify-content: center;\n}\n\n.card {\n  flex: 1;\n}\n```\n`gap` 是卡片之间的间距，`flex: 1` 让每张卡片平均分配宽度。'
      },
      {
        type: 'task',
        title: '动手试试 ✨',
        content: '切换到 CSS 标签页，尝试以下调整：\n\n1. 把 `.container` 的 `flex-direction` 改成 `column`，看卡片变成纵向排列\n2. 把 `justify-content` 改成 `space-between` 或 `space-around`\n3. 调整 `gap` 的值，看看卡片间距的变化\n4. 试试去掉某张卡片的 `flex: 1`，看看宽度怎么分配'
      }
    ],
    starterCode: {
      html: '<h1>三大作曲家</h1>\n\n<div class="container">\n  <div class="card">\n    <h2>巴赫</h2>\n    <p>巴洛克时期</p>\n    <p>复调音乐的大师</p>\n  </div>\n  <div class="card">\n    <h2>莫扎特</h2>\n    <p>古典主义时期</p>\n    <p>旋律的天才</p>\n  </div>\n  <div class="card">\n    <h2>贝多芬</h2>\n    <p>古典与浪漫之交</p>\n    <p>音乐的革命者</p>\n  </div>\n</div>',
      css: '.container {\n  display: flex;\n  gap: 20px;\n  justify-content: center;\n}\n\n.card {\n  flex: 1;\n  background-color: #FFFAF2;\n  border: 2px solid #D4C5A9;\n  border-radius: 12px;\n  padding: 20px;\n  text-align: center;\n}\n\n.card h2 {\n  color: #8B2E2E;\n  margin-top: 0;\n}\n\n.card p {\n  color: #6B5A4E;\n  margin: 4px 0;\n}',
      js: ''
    }
  },

  // ===== 3.2 居中与对齐 =====
  {
    id: 'css-centering',
    chapterId: 'css-layout',
    order: 2,
    title: '居中与对齐 — 让页面更专业',
    musicAnalogy: '页面居中对齐就像**指挥站在舞台中央**——视觉焦点集中、平衡和谐。而对齐方式的选择，就像决定乐团的排列：对称式、扇形、还是弧形分布。',
    listenTo: '莫扎特《G大调弦乐小夜曲》K.525 — 完美的对称结构和平衡感，每一个乐句都恰到好处，就像精心的页面布局。',
    sections: [
      {
        type: 'explain',
        title: '水平居中与垂直居中',
        content: '在网页布局中，居中对齐是最常用的技巧之一：\n\n**水平居中（文字）：**\n```css\ntext-align: center;\n```\n\n**水平居中（块级元素）：**\n```css\nmargin: 0 auto;\n```\n\n**Flexbox 一键居中（最强方法）：**\n```css\n.container {\n  display: flex;\n  justify-content: center;  /* 水平居中 */\n  align-items: center;      /* 垂直居中 */\n}\n```'
      },
      {
        type: 'explain',
        title: 'align-items 交叉轴对齐',
        content: '`align-items` 控制**交叉轴**（垂直于主轴的方向）上的对齐：\n\n- `stretch`（默认）— 拉伸填满\n- `center` — 交叉轴居中\n- `flex-start` — 交叉轴起点\n- `flex-end` — 交叉轴终点\n\n在横向排列（row）时，交叉轴就是垂直方向。用 `align-items: center` 可以让所有卡片在垂直方向居中对齐，即使它们高度不同。'
      },
      {
        type: 'example',
        title: '看例子',
        content: '下面的代码创建了一个居中的"演奏邀请卡"。`.wrapper` 使用 Flexbox 将卡片在页面中水平和垂直居中，`.card` 内的文字也居中对齐：\n\n```css\n.wrapper {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  min-height: 200px;\n}\n\n.card {\n  text-align: center;\n}\n```'
      },
      {
        type: 'task',
        title: '动手试试 ✨',
        content: '切换到 CSS 标签页，试着调整对齐方式：\n\n1. 把 `.wrapper` 的 `justify-content` 改成 `flex-start`，看卡片移到左边\n2. 把 `align-items` 改成 `flex-start`，卡片移到顶部\n3. 试试在 `.card` 中添加 `width: 300px`，然后用 `margin: 0 auto` 居中\n4. 把 `.card` 的 `text-align` 改成 `left`，看看文字左对齐的效果'
      }
    ],
    starterCode: {
      html: '<div class="wrapper">\n  <div class="card">\n    <div class="icon">🎵</div>\n    <h2>诚挚邀请</h2>\n    <p>欢迎参加本周六的</p>\n    <p class="highlight">古典音乐之夜</p>\n    <p class="time">19:30 · 音乐厅</p>\n  </div>\n</div>',
      css: '.wrapper {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  min-height: 200px;\n}\n\n.card {\n  background-color: #FFFAF2;\n  border: 2px solid #D4C5A9;\n  border-radius: 16px;\n  padding: 40px;\n  text-align: center;\n}\n\n.icon {\n  font-size: 48px;\n  margin-bottom: 12px;\n}\n\n.card h2 {\n  color: #8B2E2E;\n  margin: 0 0 16px 0;\n}\n\n.card p {\n  color: #6B5A4E;\n  margin: 4px 0;\n}\n\n.highlight {\n  font-size: 20px;\n  font-weight: 700;\n  color: #8B2E2E !important;\n}\n\n.time {\n  margin-top: 16px !important;\n  color: #C9A96E !important;\n  font-weight: 600;\n}',
      js: ''
    }
  },

  // ===== 3.3 Position 定位 =====
  {
    id: 'css-position',
    chapterId: 'css-layout',
    order: 3,
    title: 'Position 定位 — 控制元素的舞台位置',
    musicAnalogy: '定位属性就像**舞台上不同角色的站位规则**：`relative` 像乐团成员，在自己的座位范围内微调；`absolute` 像**独奏者**站在舞台的特定坐标上；`fixed` 像**舞台灯光**，无论观众视角如何都锁定在固定位置；`sticky` 像**指挥台**，滚动到一定位置就固定住。',
    listenTo: '穆索尔斯基《图画展览会》— "漫步"主题在每一段之间出现，画面切换时它始终在那里，就像 `sticky` 元素在滚动中时隐时现。',
    sections: [
      {
        type: 'explain',
        title: 'static 与 relative',
        content: '所有元素默认都是 `position: static`（正常文档流，位置由 HTML 顺序决定）。\n\n`position: relative` 让元素可以**相对于自己原来的位置**偏移：\n\n```css\n.box {\n  position: relative;\n  top: 10px;    /* 下移 10px */\n  left: 20px;   /* 右移 20px */\n}\n```\n\n- 元素仍然占据原来的空间（别人不会顶上来）\n- 就像乐团成员在自己的座位上微微调整姿势，不影响旁边的乐手'
      },
      {
        type: 'explain',
        title: 'absolute — 脱离文档流',
        content: '`position: absolute` 让元素脱离正常文档流，相对于**最近的已定位祖先**定位：\n\n```css\n.stage {\n  position: relative;  /* 祖先必须有定位 */\n}\n\n.soloist {\n  position: absolute;\n  top: 20px;\n  right: 30px;\n}\n```\n\n- 元素完全脱离文档流（不占据原来的空间）\n- 用 `top`、`right`、`bottom`、`left` 控制位置\n- 就像**独奏者走出乐团，站在舞台前方的精确位置**'
      },
      {
        type: 'explain',
        title: 'fixed 与 sticky',
        content: '`position: fixed` — 相对于**浏览器窗口**定位，滚动也不动：\n\n```css\n.navbar {\n  position: fixed;\n  top: 0;\n  left: 0;\n  width: 100%;\n  z-index: 100;\n}\n```\n\n`position: sticky` — 滚动到一定阈值后"粘"住：\n\n```css\n.header {\n  position: sticky;\n  top: 0;\n}\n```\n\n- `fixed` 像**舞台追光灯**——永远锁定在视野中\n- `sticky` 像**指挥台**——正常流动，但一旦到达顶部就固定\n- `z-index` 控制层叠顺序（数值越大越靠前）'
      },
      {
        type: 'example',
        title: '看例子',
        content: '下面的代码模拟了一个舞台布局：指挥台（sticky 顶部）、独奏者（absolute 在卡片中央）、乐手（relative 偏移）：\n\n```css\n.stage {\n  position: relative;\n  height: 300px;\n}\n\n.soloist {\n  position: absolute;\n  top: 10px;\n  right: 10px;\n}\n\n.player {\n  position: relative;\n  left: 20px;\n}\n```\n看预览区中元素的位置关系。独奏者始终在卡片右上角！'
      },
      {
        type: 'task',
        title: '动手试试 ✨',
        content: '切换到 CSS 标签页，尝试：\n\n1. 把 `.soloist` 的 `top` 改成 `50px`，`right` 改成 `50px`，看它移动到哪里\n2. 把 `.player-shift` 的 `left` 从 `20px` 改成 `60px`，看乐手向右偏移\n3. 试试在 `.badge` 中使用 `position: absolute` 和 `top: -8px; right: -8px`\n4. 在预览区滚动（如果内容够多），观察 sticky 的行为'
      }
    ],
    starterCode: {
      html: '<h1>舞台布局</h1>\n\n<div class="stage">\n  <div class="soloist">\n    <span class="badge">🎵</span>\n    独奏者 (absolute)\n  </div>\n\n  <div class="player player-shift">\n    小提琴手 (relative)\n    <span class="note">右移 20px</span>\n  </div>\n\n  <div class="player">\n    中提琴手 (static)\n    <span class="note">正常位置</span>\n  </div>\n\n  <div class="player player-shift">\n    大提琴手 (relative)\n    <span class="note">右移 20px</span>\n  </div>\n</div>',
      css: 'h1 {\n  color: #8B2E2E;\n  margin-bottom: 20px;\n}\n\n.stage {\n  position: relative;\n  background: #FFFAF2;\n  border: 2px solid #D4C5A9;\n  border-radius: 12px;\n  padding: 24px;\n  min-height: 260px;\n}\n\n.soloist {\n  position: absolute;\n  top: 10px;\n  right: 10px;\n  background: #FFF8F0;\n  border: 2px solid #C9A96E;\n  border-radius: 8px;\n  padding: 12px 16px;\n  text-align: center;\n  font-weight: 600;\n  color: #8B2E2E;\n}\n\n.badge {\n  position: absolute;\n  top: -12px;\n  right: -12px;\n  font-size: 20px;\n}\n\n.player {\n  background: #fff;\n  border: 1px solid #E8DDCC;\n  border-radius: 6px;\n  padding: 12px 16px;\n  margin-bottom: 8px;\n  color: #3D2B1F;\n}\n\n.player-shift {\n  position: relative;\n  left: 20px;\n  border-color: #C9A96E;\n}\n\n.note {\n  font-size: 12px;\n  color: #C9A96E;\n  margin-left: 12px;\n}',
      js: ''
    }
  },

  // ===== 3.4 Grid 布局 =====
  {
    id: 'css-grid',
    chapterId: 'css-layout',
    order: 4,
    title: 'Grid 布局 — 二维排布你的元素',
    musicAnalogy: 'Grid 就像**总谱的声部排列**——行是声部（第一小提琴、第二小提琴、中提琴、大提琴），列是小节。每个音符都有精确的"行/列"坐标，Grid 让你同时控制横向和纵向布局。',
    listenTo: '巴赫《赋格的艺术》— 多声部精密对位，每一个音符在纵横两个维度上都有精确位置，就像 Grid 的二维网格系统。',
    sections: [
      {
        type: 'explain',
        title: '创建网格',
        content: '用 `display: grid` 创建网格容器，`grid-template-columns` 定义列：\n\n```css\n.container {\n  display: grid;\n  grid-template-columns: 1fr 1fr 1fr;\n  gap: 16px;\n}\n```\n\n- `1fr` — "一份"（fraction），自动分配剩余空间\n- `1fr 1fr 1fr` — 三等分（三列宽度相等）\n- `repeat(3, 1fr)` — 等价写法\n- `gap` — 格子之间的间距\n\n三列等宽就像三行声部并行推进——每个格子就是一个小节！'
      },
      {
        type: 'explain',
        title: '行与列的精确控制',
        content: '`grid-template-rows` 定义行高：\n\n```css\n.container {\n  grid-template-columns: repeat(3, 1fr);\n  grid-template-rows: auto 200px;\n}\n```\n\n子元素可以跨越多列或多行：\n\n```css\n.card:first-child {\n  grid-column: span 2;  /* 跨 2 列 */\n}\n\n.card:last-child {\n  grid-column: 1 / 3;   /* 从第1条线到第3条线（也是跨2列） */\n}\n```\n\n就像总谱中某个声部的长音符跨越了好几个小节！'
      },
      {
        type: 'explain',
        title: 'Flexbox vs Grid 怎么选？',
        content: '- **Flexbox**：一维排列（要么横向，要么纵向）\n  - 适合：导航栏、卡片列表、居中对齐\n- **Grid**：二维排列（同时控制行和列）\n  - 适合：页面整体布局、照片墙、表格类布局\n\n一个简单的判断：\n- 只需要"排一排" → Flexbox\n- 需要"行和列都对齐" → Grid\n\n就像弦乐四重奏用 Flexbox（4 个人排一排），而管弦乐团总谱用 Grid（声部+小节，二维矩阵）！'
      },
      {
        type: 'example',
        title: '看例子',
        content: '下面的代码用 Grid 创建了 2×3 的作曲家卡片网格，最后一张跨 2 列：\n\n```css\n.grid {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  gap: 12px;\n}\n\n.card:last-child {\n  grid-column: span 2;\n}\n```\n切换到预览区观察网格布局——每张卡片在二维网格中都有精确位置。'
      },
      {
        type: 'task',
        title: '动手试试 ✨',
        content: '切换到 CSS 标签页，试试：\n\n1. 把 `grid-template-columns` 从 `repeat(3, 1fr)` 改成 `repeat(2, 1fr)`，观察变成 2 列\n2. 把 `gap` 从 `12px` 改成 `24px`，看卡片间距变大\n3. 修改 `.card:last-child` 的 `grid-column` 改成 `span 3`（2列时跨3无效）\n4. 挑战：用 `grid-template-columns: 1fr 2fr` 创建左窄右宽的两列布局'
      }
    ],
    starterCode: {
      html: '<h1>作曲家总谱</h1>\n\n<div class="grid">\n  <div class="card">\n    <h2>巴赫</h2>\n    <p>巴洛克</p>\n  </div>\n  <div class="card">\n    <h2>莫扎特</h2>\n    <p>古典主义</p>\n  </div>\n  <div class="card">\n    <h2>贝多芬</h2>\n    <p>浪漫主义</p>\n  </div>\n  <div class="card">\n    <h2>德彪西</h2>\n    <p>印象派</p>\n  </div>\n  <div class="card wide-card">\n    <h2>肖邦</h2>\n    <p>浪漫主义 · 钢琴诗人</p>\n  </div>\n</div>',
      css: 'h1 {\n  color: #8B2E2E;\n  text-align: center;\n  margin-bottom: 20px;\n}\n\n.grid {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  gap: 12px;\n}\n\n.card {\n  background: #FFFAF2;\n  border: 1px solid #D4C5A9;\n  border-radius: 8px;\n  padding: 20px;\n  text-align: center;\n}\n\n.card h2 {\n  color: #8B2E2E;\n  margin: 0 0 4px 0;\n  font-size: 16px;\n}\n\n.card p {\n  color: #6B5A4E;\n  margin: 0;\n  font-size: 12px;\n}\n\n.wide-card {\n  grid-column: span 2;\n  background: #FFF8F0;\n  border-color: #C9A96E;\n}',
      js: ''
    }
  },

  // ===== 3.5 响应式设计 =====
  {
    id: 'css-responsive',
    chapterId: 'css-layout',
    order: 5,
    title: '响应式设计 — 适配不同的屏幕',
    musicAnalogy: '响应式设计就像**为不同规模的乐团改编同一首曲子**——大型交响乐团（桌面端）和钢琴独奏（手机）都能演绎同一首作品，区别只在于呈现方式。用 `@media` 查询就像为每种编制写一份适配的谱子。',
    listenTo: '拉威尔配器的穆索尔斯基《图画展览会》— 原为钢琴独奏，拉威尔将它改编为管弦乐版本。同一首曲子，两种编制，两种体验，完美诠释响应式设计。',
    sections: [
      {
        type: 'explain',
        title: '什么是响应式设计？',
        content: '响应式设计让同一个网页在桌面、平板、手机上都有良好的体验。核心工具是 `@media` 查询：\n\n```css\n/* 手机端（默认） */\n.card { width: 100%; }\n\n/* 平板（≥600px） */\n@media (min-width: 600px) {\n  .card { width: 48%; }\n}\n\n/* 桌面（≥900px） */\n@media (min-width: 900px) {\n  .card { width: 30%; }\n}\n```\n\n`@media` 后面跟着一个"条件"——当条件满足时，里面的样式才生效。\n\n**移动端优先（推荐）**：先写手机样式作为默认，再用 `min-width` 逐步增强大屏。'
      },
      {
        type: 'explain',
        title: '常见的断点',
        content: '三个常用的响应式断点：\n\n| 断点 | 设备 | 典型宽度 |\n|------|------|----------|\n| 小屏 | 手机 | < 640px（默认） |\n| 中屏 | 平板 | 640px ~ 1024px |\n| 大屏 | 桌面 | > 1024px |\n\n```css\n/* 默认：手机（单列） */\n.grid { grid-template-columns: 1fr; }\n\n/* 平板：两列 */\n@media (min-width: 640px) {\n  .grid { grid-template-columns: repeat(2, 1fr); }\n}\n\n/* 桌面：三列 */\n@media (min-width: 1024px) {\n  .grid { grid-template-columns: repeat(3, 1fr); }\n}\n```\n\n就像独奏版（手机）、室内乐版（平板）、管弦乐版（桌面）——核心旋律不变，编制递增！'
      },
      {
        type: 'example',
        title: '看例子',
        content: '下面的代码已经包含了响应式断点。试着**改变浏览器窗口的宽度**，你会看到卡片从 1 列变成 2 列再变成 3 列：\n\n```css\n/* 手机：单列 */\n.grid { grid-template-columns: 1fr; }\n\n/* 平板：两列 */\n@media (min-width: 640px) {\n  .grid { grid-template-columns: repeat(2, 1fr); }\n}\n\n/* 桌面：三列 */\n@media (min-width: 1024px) {\n  .grid { grid-template-columns: repeat(3, 1fr); }\n}\n```\n在这个网站中，把浏览器窗口从左边向右拖拽，看看发生了什么？'
      },
      {
        type: 'task',
        title: '动手试试 ✨',
        content: '切换到 CSS 标签页，试试：\n\n1. 调整浏览器窗口宽度，观察卡片列数变化（必须实际拖拽窗口！）\n2. 修改 `640px` 断点为 `500px`，看更早进入两列\n3. 在 `1024px` 断点里给 `.card` 添加 `font-size: 18px`，桌面端文字更大\n4. 挑战：在手机断点（默认）隐藏 `.desktop-only` 元素，在桌面断点显示它\n  提示：`display: none` 隐藏，`@media` 中 `display: block` 显示'
      }
    ],
    starterCode: {
      html: '<h1>响应式卡片画廊</h1>\n<p class="hint">拖动浏览器窗口边缘改变宽度，观察卡片列数变化！</p>\n\n<div class="grid">\n  <div class="card">\n    <h2>巴赫</h2>\n    <p>《赋格的艺术》</p>\n  </div>\n  <div class="card">\n    <h2>莫扎特</h2>\n    <p>《魔笛》</p>\n  </div>\n  <div class="card">\n    <h2>贝多芬</h2>\n    <p>《命运交响曲》</p>\n  </div>\n  <div class="card">\n    <h2>肖邦</h2>\n    <p>《夜曲》</p>\n  </div>\n  <div class="card">\n    <h2>德彪西</h2>\n    <p>《月光》</p>\n  </div>\n  <div class="card">\n    <h2>柴可夫斯基</h2>\n    <p>《天鹅湖》</p>\n  </div>\n</div>',
      css: 'h1 {\n  color: #8B2E2E;\n  text-align: center;\n  margin-bottom: 4px;\n}\n\n.hint {\n  text-align: center;\n  color: #C9A96E;\n  font-size: 13px;\n  margin-bottom: 20px;\n}\n\n/* 手机：单列（默认） */\n.grid {\n  display: grid;\n  grid-template-columns: 1fr;\n  gap: 12px;\n}\n\n.card {\n  background: #FFFAF2;\n  border: 1px solid #D4C5A9;\n  border-radius: 8px;\n  padding: 20px;\n  text-align: center;\n}\n\n.card h2 {\n  color: #8B2E2E;\n  margin: 0 0 4px 0;\n}\n\n.card p {\n  color: #6B5A4E;\n  margin: 0;\n  font-size: 14px;\n}\n\n/* 平板：两列 */\n@media (min-width: 640px) {\n  .grid {\n    grid-template-columns: repeat(2, 1fr);\n  }\n}\n\n/* 桌面：三列 */\n@media (min-width: 1024px) {\n  .grid {\n    grid-template-columns: repeat(3, 1fr);\n    gap: 16px;\n  }\n\n  .card {\n    padding: 28px;\n  }\n}',
      js: ''
    }
  },

  // ===== 3.6 综合项目 — 音乐活动页面 =====
  {
    id: 'css-layout-capstone',
    chapterId: 'css-layout',
    order: 6,
    title: '综合项目 — 设计一场音乐会的宣传页',
    musicAnalogy: '一场音乐会的海报需要精心布局：标题在顶端（header）、节目单在中央（main content）、赞助商在侧边栏（sidebar）、时间地点在底部（footer）。用 CSS 布局把这些元素安排在合适的位置，就像舞台监督把每个声部安排在正确的位置。',
    listenTo: '穆索尔斯基《图画展览会》— 每一段音乐描绘一幅画，整部作品就像在画廊中漫步。你的音乐会页面也将引导访客从头到尾浏览内容——标题、节目单、演奏者介绍、购票信息，每个区域各就各位。',
    sections: [
      {
        type: 'explain',
        title: '综合运用你学过的布局技巧',
        content: '这个项目综合使用了前面学过的所有布局技能：\n\n- **Flexbox** — 导航栏、演奏者卡片排列\n- **Grid** — 页面整体结构、节目单网格\n- **Position** — 售票按钮固定在视口右下角\n- **居中** — 标题区域垂直居中\n- **响应式** — 移动端和桌面端两套布局\n\n就像指挥把弦乐、管乐、打击乐协调在一起——每种布局技术各司其职。'
      },
      {
        type: 'task',
        title: '逐步构建 ✨',
        content: '编辑器中已经有一个半成品页面。请完成以下任务：\n\n**第一步：完善导航栏**\n- 用 Flexbox 让导航链接水平排列\n- 给当前页链接加 `.active` 样式\n\n**第二步：完善节目单网格**\n- 用 Grid 把曲目列表排成两列（桌面端）\n- 给每个曲目的 `.time` 设置左对齐、`.piece` 设置右对齐\n\n**第三步：演奏者卡片**\n- 用 Flexbox 让三张卡片水平排列并自动换行\n- 给卡片加 hover 上浮效果\n\n**第四步：底部固定按钮**\n- 用 `position: fixed` 让"购票"按钮始终在右下角\n\n**第五步：响应式**\n- 在 `@media (max-width: 640px)` 中，把节目单改为单列\n- 把导航栏从横排改为竖排'
      },
      {
        type: 'hint',
        title: '提示',
        content: '- Grid 结构：`grid-template-columns: 120px 1fr;` 让时间和曲目名宽度不同\n- `position: fixed; bottom: 20px; right: 20px;` 实现右下角浮按钮\n- `flex-wrap: wrap;` 让卡片自动换行\n- 用 `@media` 做断点切换——移动端 `flex-direction: column`、`grid-template-columns: 1fr`'
      }
    ],
    starterCode: {
      html: '<!-- 音乐会宣传页面 -->\n<header class="hero">\n  <h1>春之声音乐会</h1>\n  <p class="subtitle">古典与现代的对话</p>\n</header>\n\n<nav class="navbar">\n  <a href="#" class="active">节目单</a>\n  <a href="#">演奏者</a>\n  <a href="#">购票</a>\n</nav>\n\n<main class="main-layout">\n  <section class="program">\n    <h2>演出曲目</h2>\n    <div class="program-grid">\n      <span class="time">19:00</span>\n      <span class="piece">巴赫 — C大调前奏曲 BWV 846</span>\n      <span class="time">19:15</span>\n      <span class="piece">莫扎特 — 小星星变奏曲 K.265</span>\n      <span class="time">19:35</span>\n      <span class="piece">贝多芬 — 月光奏鸣曲 第一乐章</span>\n      <span class="time">19:55</span>\n      <span class="piece">肖邦 — 降E大调夜曲 Op.9 No.2</span>\n      <span class="time">20:15</span>\n      <span class="piece">德彪西 — 月光</span>\n    </div>\n  </section>\n\n  <section class="performers">\n    <h2>演奏者</h2>\n    <div class="performer-cards">\n      <div class="performer">\n        <h3>林雨晴</h3>\n        <p>钢琴</p>\n      </div>\n      <div class="performer">\n        <h3>陈思远</h3>\n        <p>小提琴</p>\n      </div>\n      <div class="performer">\n        <h3>王雅文</h3>\n        <p>大提琴</p>\n      </div>\n    </div>\n  </section>\n</main>\n\n<button class="buy-btn">🎫 立即购票</button>',
      css: '/* ===== 全局 ===== */\nh1 {\n  text-align: center;\n  color: #8B2E2E;\n  margin: 0;\n  font-size: 32px;\n}\n\n.subtitle {\n  text-align: center;\n  color: #C9A96E;\n  font-size: 16px;\n  margin: 8px 0 0 0;\n}\n\n/* ===== 主区域 ===== */\n.hero {\n  padding: 48px 20px 32px;\n}\n\n.navbar {\n  display: flex;\n  justify-content: center;\n  gap: 0;\n  border-top: 1px solid #E8DDCC;\n  border-bottom: 1px solid #E8DDCC;\n  background: #FFFAF2;\n}\n\n.navbar a {\n  padding: 12px 24px;\n  text-decoration: none;\n  color: #6B5A4E;\n  font-size: 14px;\n  font-weight: 500;\n  transition: all 0.2s;\n}\n\n.navbar a:hover {\n  color: #8B2E2E;\n}\n\n.navbar a.active {\n  color: #8B2E2E;\n  border-bottom: 2px solid #C9A96E;\n}\n\n.main-layout {\n  max-width: 760px;\n  margin: 0 auto;\n  padding: 24px 20px;\n}\n\n/* ===== 节目单 ===== */\n.program h2 {\n  color: #8B2E2E;\n  font-size: 20px;\n  margin-bottom: 16px;\n}\n\n.program-grid {\n  display: grid;\n  grid-template-columns: 80px 1fr;\n  gap: 10px 16px;\n  align-items: baseline;\n}\n\n.program-grid .time {\n  color: #C9A96E;\n  font-weight: 600;\n  font-size: 14px;\n  font-family: \'Fira Code\', monospace;\n}\n\n.program-grid .piece {\n  color: #3D2B1F;\n  font-size: 15px;\n}\n\n/* ===== 演奏者卡片 ===== */\n.performers {\n  margin-top: 40px;\n}\n\n.performers h2 {\n  color: #8B2E2E;\n  font-size: 20px;\n  margin-bottom: 16px;\n}\n\n.performer-cards {\n  display: flex;\n  gap: 16px;\n  flex-wrap: wrap;\n}\n\n.performer {\n  flex: 1;\n  min-width: 180px;\n  background: #FFFAF2;\n  border: 1px solid #D4C5A9;\n  border-radius: 10px;\n  padding: 24px;\n  text-align: center;\n  transition: all 0.3s ease;\n}\n\n.performer:hover {\n  border-color: #C9A96E;\n  transform: translateY(-3px);\n  box-shadow: 0 6px 16px rgba(61, 43, 31, 0.1);\n}\n\n.performer h3 {\n  color: #8B2E2E;\n  margin: 0 0 4px 0;\n  font-size: 18px;\n}\n\n.performer p {\n  color: #C9A96E;\n  margin: 0;\n  font-size: 13px;\n  font-weight: 600;\n}\n\n/* ===== 固定购票按钮 ===== */\n.buy-btn {\n  position: fixed;\n  bottom: 24px;\n  right: 24px;\n  padding: 14px 28px;\n  background: #8B2E2E;\n  color: #fff;\n  font-size: 16px;\n  font-weight: 600;\n  border: none;\n  border-radius: 50px;\n  cursor: pointer;\n  box-shadow: 0 4px 16px rgba(139, 46, 46, 0.35);\n  transition: all 0.3s ease;\n  z-index: 100;\n}\n\n.buy-btn:hover {\n  background: #C94545;\n  transform: translateY(-2px);\n  box-shadow: 0 6px 24px rgba(139, 46, 46, 0.45);\n}\n\n/* ===== 响应式 ===== */\n@media (max-width: 640px) {\n  .hero {\n    padding: 32px 16px 24px;\n  }\n\n  h1 {\n    font-size: 24px;\n  }\n\n  .navbar {\n    flex-direction: column;\n  }\n\n  .navbar a {\n    text-align: center;\n    border-bottom: 1px solid #EDE5D5;\n  }\n\n  .navbar a.active {\n    border-bottom: 1px solid #C9A96E;\n  }\n\n  .program-grid {\n    grid-template-columns: 1fr;\n    gap: 4px;\n  }\n\n  .program-grid .time {\n    margin-top: 10px;\n  }\n\n  .performer-cards {\n    flex-direction: column;\n  }\n\n  .performer {\n    min-width: auto;\n  }\n\n  .buy-btn {\n    bottom: 16px;\n    right: 16px;\n    padding: 12px 24px;\n    font-size: 14px;\n  }\n}',
      js: ''
    }
  },

  // ================================================================
  // 第四章：JavaScript 入门 — 让页面动起来，像音乐一样流动
  // ================================================================

  // ===== 4.1 认识 JavaScript =====
  {
    id: 'js-intro',
    chapterId: 'js-basics',
    order: 1,
    title: '认识 JavaScript — 给页面注入生命',
    musicAnalogy: '如果 HTML 是乐谱、CSS 是演奏法记号，那么 JavaScript 就是**指挥家**——它让静态的乐谱动起来，控制演奏的节奏、顺序和互动。',
    listenTo: '斯特拉文斯基《春之祭》— 充满原始的生命力和节奏感，每一个节拍都在变化，就像 JavaScript 为页面注入的动态活力。',
    sections: [
      {
        type: 'explain',
        title: '什么是 JavaScript？',
        content: 'HTML 决定了页面上"有什么"，CSS 决定了"长什么样"，而 JavaScript（简称 JS）决定了"能做什么"。\n\n有了 JavaScript，网页可以：\n- 响应用户的点击和输入\n- 动态改变内容和样式\n- 播放音乐和动画\n- 记住用户的操作\n\n就像一个指挥家让乐团从静止的乐器变成流动的音乐！'
      },
      {
        type: 'explain',
        title: '第一行 JavaScript',
        content: 'JavaScript 写在 `<script>` 标签中。先看一个最简单的方法——`alert()`，它会弹出一个提示框：\n\n```html\n<script>\n  alert("你好，音乐世界！");\n</script>\n```\n\n切换到 JS 标签页，你可以看到编辑器中已经有了这段代码。预览区会在页面加载时弹出问候。'
      },
      {
        type: 'explain',
        title: 'console.log — 开发者的耳朵',
        content: '`console.log()` 是 JS 中最常用的调试方法。它会在浏览器的**控制台**（Console）中输出信息：\n\n```js\nconsole.log("这段文字会出现在控制台");\n```\n\n就像指挥家用耳朵听排练效果，开发者用 `console.log` 查看代码运行情况。\n\n打开预览区，然后按 `F12` 打开开发者工具，切换到"Console"标签页，你就能看到输出了！'
      },
      {
        type: 'example',
        title: '看例子',
        content: '下面的代码就是编辑器中你看到的。一个 `alert` 欢迎你，一个 `console.log` 输出信息：\n\n```js\nalert("欢迎来到音乐编程之旅！");\nconsole.log("页面加载完成，准备就绪！");\n```\n试试修改 `alert` 和 `console.log` 中的文字。'
      },
      {
        type: 'task',
        title: '动手试试 ✨',
        content: '切换到 JS 标签页，尝试：\n\n1. 修改 `alert()` 中的文字，换成你自己的欢迎语\n2. 修改 `console.log()` 中的文字\n3. 试着添加第二行 `console.log()`，输出不同的内容\n4. 按 `F12` 打开浏览器控制台，看看你的输出是否出现了'
      }
    ],
    starterCode: {
      html: '<h1>欢迎来到 JavaScript</h1>\n<p>HTML 是乐谱，CSS 是演奏法，JS 是指挥家。</p>',
      css: 'h1 {\n  color: #8B2E2E;\n  text-align: center;\n}\n\np {\n  text-align: center;\n  color: #6B5A4E;\n}',
      js: 'alert("欢迎来到音乐编程之旅！");\n\nconsole.log("页面加载完成，准备就绪！");\nconsole.log("按 F12 可以在控制台看到这行文字");'
    }
  },

  // ===== 4.2 变量与字符串 =====
  {
    id: 'js-variables',
    chapterId: 'js-basics',
    order: 2,
    title: '变量与字符串 — 存储你的音乐信息',
    musicAnalogy: '变量就像**反复记号**——把一段内容存起来，想用的时候随时调用。变量名就像乐谱上的段落标记（A段、B段），方便你指代和引用。',
    listenTo: '拉威尔《波莱罗》— 同一个旋律重复 18 遍，但每次配器都在变化。变量存着不变的旋律，但你可以用不同的方式使用它。',
    sections: [
      {
        type: 'explain',
        title: '什么是变量？',
        content: '变量是一个**有名字的容器**，用来存储数据。你可以把任何东西放进去，然后用名字来取用：\n\n```js\nlet composer = "肖邦";\nlet piece = "夜曲";\nlet year = 1830;\n```\n\n- `let` — 声明一个变量（可以修改）\n- `const` — 声明一个常量（不能修改）\n- `composer` / `piece` — 变量名（你自己起的名字）\n- `"肖邦"` — 字符串（文本），用引号包裹\n- `1830` — 数字，不需要引号'
      },
      {
        type: 'explain',
        title: '拼接字符串',
        content: '用 `+` 号可以把字符串和变量拼接在一起：\n\n```js\nlet composer = "肖邦";\nlet sentence = "我最喜欢的作曲家是" + composer;\n```\n\n更好的写法是**模板字符串**，用反引号 `` ` `` 包裹，`${}` 插入变量：\n\n```js\nlet sentence = `我最喜欢的作曲家是${composer}`;\n```\n\n就像把两个乐句连接成一个完整的乐段！'
      },
      {
        type: 'explain',
        title: 'document.querySelector — 找到页面中的元素',
        content: '`document.querySelector()` 可以找到页面上的 HTML 元素，然后通过 `.textContent` 修改它的文字内容：\n\n```js\nlet el = document.querySelector("h1");\nel.textContent = "新的标题";\n```\n\n就像指挥家用手势指定"现在看这里"，`querySelector` 帮你指向页面中的元素。'
      },
      {
        type: 'example',
        title: '看例子',
        content: '下面的代码用变量存储了作曲家信息，然后用 `querySelector` 把它们显示在页面上：\n\n```js\nlet composer = "弗雷德里克·肖邦";\nlet piece = "降E大调夜曲 Op.9 No.2";\nlet description = `${composer}的代表作之一是《${piece}》。`;\n\ndocument.querySelector("#composer").textContent = composer;\ndocument.querySelector("#piece").textContent = piece;\ndocument.querySelector("#description").textContent = description;\n```\n切换到 JS 标签页查看完整代码。运行后，JavaScript 会自动把信息填入页面。'
      },
      {
        type: 'task',
        title: '动手试试 ✨',
        content: '切换到 JS 标签页，试着修改：\n\n1. 把 `composer` 和 `piece` 改成你喜欢的作曲家和曲目\n2. 修改 `description` 的模板字符串，写一句你自己的话\n3. 试试把 `let` 改成 `const`，效果一样吗？\n4. 试着新增一个变量 `year`，存创作年份'
      }
    ],
    starterCode: {
      html: '<h1>音乐信息卡</h1>\n\n<div class="card">\n  <p><strong>作曲家：</strong><span id="composer">---</span></p>\n  <p><strong>代表作：</strong><span id="piece">---</span></p>\n  <p id="description"></p>\n</div>',
      css: '.card {\n  background-color: #FFFAF2;\n  border: 2px solid #D4C5A9;\n  border-radius: 12px;\n  padding: 24px;\n  max-width: 400px;\n  margin: 0 auto;\n}\n\n.card p {\n  color: #6B5A4E;\n  margin: 8px 0;\n}\n\nh1 {\n  text-align: center;\n  color: #8B2E2E;\n}',
      js: '// 用变量存储音乐信息\nlet composer = "弗雷德里克·肖邦";\nlet piece = "降E大调夜曲 Op.9 No.2";\n\n// 用模板字符串拼接一句话\nlet description = `${composer}的代表作之一是《${piece}》。`;\n\n// 把变量的值显示到页面上\ndocument.querySelector("#composer").textContent = composer;\ndocument.querySelector("#piece").textContent = piece;\ndocument.querySelector("#description").textContent = description;'
    }
  },

  // ===== 4.3 数据类型与运算符 =====
  {
    id: 'js-types',
    chapterId: 'js-basics',
    order: 3,
    title: '数据类型与运算符 — 认识代码的"音色"',
    musicAnalogy: '不同乐器有不同音色：小提琴清亮、大提琴深沉、定音鼓有力。编程中也一样——**number** 是节奏数、**boolean** 是音符有无、**string** 是旋律走向。了解数据类型，就像认识乐团中的每一件乐器。',
    listenTo: '本杰明·布里顿《青少年管弦乐队指南》— 依次介绍乐队中每一件乐器的音色特点，从木管到铜管到弦乐到打击乐。认识数据类型就像认识乐队编制——每种类型有它独特的"音色"和用途。',
    sections: [
      {
        type: 'explain',
        title: '四种基础数据类型',
        content: 'JavaScript 有几种基础数据类型，就像乐团中的乐器分类：\n\n- **string（字符串）** — 文字，用引号包裹 `"巴赫"`\n- **number（数字）** — 数值，可运算 `1685`, `3.14`\n- **boolean（布尔值）** — 只有 `true` 或 `false`，像二分音符的"有/无"\n- **null / undefined** — "空"值，表示没有内容\n\n```js\nlet composer = "巴赫";        // string\nlet birthYear = 1685;         // number\nlet isBaroque = true;         // boolean\nlet encore = null;            // null（故意为空）\n```\n\n用 `typeof` 查看类型：\n```js\nconsole.log(typeof "巴赫");   // "string"\nconsole.log(typeof 1685);     // "number"\nconsole.log(typeof true);     // "boolean"\n```'
      },
      {
        type: 'explain',
        title: '算术运算符 — 数字的计算',
        content: '数字可以做加减乘除，就像计算节拍：\n\n```js\nlet a = 10;\nlet b = 3;\n\nconsole.log(a + b);  // 13  加法（也用于字符串拼接！）\nconsole.log(a - b);  // 7   减法\nconsole.log(a * b);  // 30  乘法\nconsole.log(a / b);  // 3.333... 除法\nconsole.log(a % b);  // 1   取余数（模运算）\nconsole.log(a ** 2); // 100 幂运算\n```\n\n`%`（取余）特别实用——判断奇偶：`n % 2 === 0` 就是偶数。\n\n字符串的 `+` 是拼接：`"Bach" + " " + "1685"` → `"Bach 1685"`'
      },
      {
        type: 'explain',
        title: '比较运算符 — 返回布尔值',
        content: '比较运算符像评委打分，返回 `true` 或 `false`：\n\n```js\nconsole.log(5 > 3);   // true\nconsole.log(5 < 3);   // false\nconsole.log(5 === 5); // true（等于）\nconsole.log(5 !== 3); // true（不等于）\nconsole.log(5 >= 5);  // true\nconsole.log(5 <= 3);  // false\n```\n\n比较结果常用于 `if` 条件判断中——这就是下一节课要学的！'
      },
      {
        type: 'example',
        title: '看例子',
        content: '下面的代码练习了数据类型和运算符：\n\n```js\nlet composer = "巴赫";\nlet birthYear = 1685;\nlet isBaroque = true;\n\n// 计算今年是多少周年\nlet currentYear = 2026;\nlet anniversary = currentYear - birthYear;\n\n// 判断是否是整百年\nlet isCentury = birthYear % 100 === 0;\n\nconsole.log(composer + " 诞生于 " + birthYear);\nconsole.log("距今 " + anniversary + " 年");\nconsole.log("是否整百年？" + isCentury);\n```'
      },
      {
        type: 'task',
        title: '动手试试 ✨',
        content: '切换到 JS 标签页，试试：\n\n1. 修改 `birthYear` 的值，看周年数自动变化\n2. 用 `typeof` 检查 `isBaroque` 的类型\n3. 试试用 `%` 判断 `birthYear` 是否能被 4 整除（音乐节拍经常是 4 拍）\n4. 挑战：计算"如果一个人出生于 birthYear + 20 年，他今年多大"'
      }
    ],
    starterCode: {
      html: '<h1>数据类型实验室</h1>\n\n<div class="card">\n  <p><strong>作曲家：</strong><span id="name"></span></p>\n  <p><strong>出生年份：</strong><span id="year"></span></p>\n  <p><strong>距今周年：</strong><span id="anniversary"></span></p>\n  <p><strong>巴洛克时期？</strong><span id="baroque"></span></p>\n  <p><strong>能被4整除？</strong><span id="divBy4"></span></p>\n</div>',
      css: 'h1 {\n  text-align: center;\n  color: #8B2E2E;\n}\n\n.card {\n  background: #FFFAF2;\n  border: 2px solid #D4C5A9;\n  border-radius: 12px;\n  padding: 28px;\n  max-width: 440px;\n  margin: 16px auto;\n}\n\n.card p {\n  color: #6B5A4E;\n  margin: 10px 0;\n  font-size: 16px;\n  border-bottom: 1px solid #EDE5D5;\n  padding-bottom: 8px;\n}\n\n.card p:last-child {\n  border-bottom: none;\n}\n\n.card strong {\n  color: #8B2E2E;\n}',
      js: '// 数据定义\nlet composer = "巴赫";\nlet birthYear = 1685;\nlet currentYear = 2026;\nlet isBaroque = birthYear >= 1600 && birthYear <= 1750;\n\n// 计算周年\nlet anniversary = currentYear - birthYear;\n\n// 判断是否能被 4 整除\nlet divBy4 = birthYear % 4 === 0;\n\n// 显示到页面\ndocument.querySelector("#name").textContent = composer;\ndocument.querySelector("#year").textContent = birthYear;\ndocument.querySelector("#anniversary").textContent = anniversary + " 年";\ndocument.querySelector("#baroque").textContent = isBaroque ? "是" : "否";\ndocument.querySelector("#divBy4").textContent = divBy4 ? "是 (" + birthYear + " ÷ 4 = " + (birthYear/4) + ")" : "否";'
    }
  },

  // ===== 4.4 函数 =====
  {
    id: 'js-functions',
    chapterId: 'js-basics',
    order: 4,
    title: '函数 — 封装你的音乐逻辑',
    musicAnalogy: '函数就像**乐曲的主题动机**——一段可重复使用的旋律片段。贝多芬第五交响曲的"当当当当"动机在全曲中反复出现、变形、发展。函数也是：写好一次，到处调用。',
    listenTo: '贝多芬《第五交响曲》第一乐章 — "命运"四音动机贯穿始终，同样的核心在弦乐、管乐、全奏中不断重现，就像函数被不同参数调用。',
    sections: [
      {
        type: 'explain',
        title: '什么是函数？',
        content: '函数是一段**有名字的代码块**，把一组操作封装起来，需要时调用：\n\n```js\nfunction sayHello() {\n  alert("你好！");\n}\n\nsayHello();  // 调用函数\n```\n\n函数的好处：\n- **避免重复**：同样的代码不用写很多遍\n- **给代码起名字**：一看函数名就知道它做什么\n- **可以传参数**：像给动机配不同的乐器'
      },
      {
        type: 'explain',
        title: '带参数的函数',
        content: '函数可以接收**参数**（输入），然后根据参数做不同的事：\n\n```js\nfunction introduce(composer, piece) {\n  return `${composer}创作了《${piece}》。`;\n}\n\nlet result1 = introduce("肖邦", "夜曲");\nlet result2 = introduce("莫扎特", "魔笛");\n```\n\n- `composer` 和 `piece` 是**参数**——像函数接收的输入\n- `return` 把结果**返回**——像函数给出的输出\n- 同样一个 `introduce` 函数，传入不同的作曲家，得到不同的句子'
      },
      {
        type: 'example',
        title: '看例子',
        content: '下面的代码定义了一个 `createCard` 函数，它接收作曲家信息并返回 HTML 字符串：\n\n```js\nfunction createCard(composer, period, piece) {\n  return `\n    <div class="card">\n      <h2>${composer}</h2>\n      <p>时期：${period}</p>\n      <p>代表作：《${piece}》</p>\n    </div>\n  `;\n}\n\nlet html = createCard("巴赫", "巴洛克", "赋格的艺术");\nlet html2 = createCard("德彪西", "印象派", "月光");\n```\n切换到 JS 标签页看看函数怎么生成页面的三张卡片。'
      },
      {
        type: 'task',
        title: '动手试试 ✨',
        content: '切换到 JS 标签页，试试：\n\n1. 修改已存在的 `createCard()` 调用，把作曲家换成你喜欢的\n2. 新增一行调用，用 `createCard()` 创建第四张卡片，然后用 `+=` 追加到 `html` 中\n3. 试着在函数里增加一个参数，比如 `country`（国籍）'
      }
    ],
    starterCode: {
      html: '<h1>作曲家画廊</h1>\n<div id="gallery"></div>',
      css: 'h1 {\n  text-align: center;\n  color: #8B2E2E;\n}\n\n#gallery {\n  display: flex;\n  gap: 16px;\n  flex-wrap: wrap;\n  justify-content: center;\n}\n\n.card {\n  background-color: #FFFAF2;\n  border: 2px solid #D4C5A9;\n  border-radius: 12px;\n  padding: 20px;\n  min-width: 180px;\n  text-align: center;\n}\n\n.card h2 {\n  color: #8B2E2E;\n  margin: 0 0 8px 0;\n}\n\n.card p {\n  color: #6B5A4E;\n  margin: 4px 0;\n  font-size: 14px;\n}',
      js: '// 定义一个函数，创建作曲家卡片\nfunction createCard(composer, period, piece) {\n  return `\n    <div class="card">\n      <h2>${composer}</h2>\n      <p>时期：${period}</p>\n      <p>代表作：《${piece}》</p>\n    </div>\n  `;\n}\n\n// 调用函数生成三张卡片\nlet html = "";\nhtml += createCard("巴赫", "巴洛克", "赋格的艺术");\nhtml += createCard("莫扎特", "古典主义", "魔笛");\nhtml += createCard("德彪西", "印象派", "月光");\n\n// 显示到页面上\ndocument.querySelector("#gallery").innerHTML = html;'
    }
  },

  // ===== 4.5 点击事件 =====
  {
    id: 'js-events',
    chapterId: 'js-basics',
    order: 5,
    title: '点击事件 — 让按钮响应用户',
    musicAnalogy: '事件就像**乐器对演奏者的响应**——按下琴键（点击），琴槌敲击琴弦发出声音（执行代码）。没有演奏者的动作，乐器不会自己发出声音；没有事件，代码不会自动执行。',
    listenTo: '普罗科菲耶夫《彼得与狼》— 每个角色有特定主题，在故事的不同时间点"出场"（触发），就像页面中不同元素在不同事件触发时才响应。',
    sections: [
      {
        type: 'explain',
        title: '什么是事件？',
        content: '在 JavaScript 中，**事件**是发生在 HTML 元素上的"事情"：\n\n- `click` — 用户点击了一个元素\n- `input` — 用户在输入框中输入了文字\n- `mouseenter` — 鼠标移入了一个元素\n\n用 `addEventListener` 可以"监听"这些事件：\n\n```js\nlet btn = document.querySelector("#myBtn");\n\nbtn.addEventListener("click", function() {\n  alert("你点击了按钮！");\n});\n```\n\n就像给按钮装了一只耳朵，它时刻听着有没有"点击"这件事发生。'
      },
      {
        type: 'explain',
        title: '事件处理函数',
        content: '`addEventListener` 接收两个参数：\n1. 事件类型（`"click"`）\n2. 事件处理函数——事件发生时执行的代码\n\n```js\nbtn.addEventListener("click", function() {\n  // 点击后执行的代码写在这里\n  document.querySelector("h1").textContent = "标题变了！";\n});\n```\n\n事件处理函数就像一个"回响"——你按下琴键（触发事件），琴声响起（执行函数）。'
      },
      {
        type: 'example',
        title: '看例子',
        content: '下面的代码有一个按钮和一个显示区域。每次点击按钮，计数器就会加 1：\n\n```js\nlet count = 0;\nlet btn = document.querySelector("#countBtn");\nlet display = document.querySelector("#display");\n\nbtn.addEventListener("click", function() {\n  count = count + 1;\n  display.textContent = `你点击了 ${count} 次`;\n});\n```\n切换到 JS 标签页和预览区，试试点击按钮！'
      },
      {
        type: 'task',
        title: '动手试试 ✨',
        content: '切换到 JS 标签页，试试：\n\n1. 在预览区点击按钮，看计数器变化\n2. 修改 `display.textContent` 的文字，换一种表达方式\n3. 试着把 `count = count + 1` 改成 `count = count + 5`，每次加 5\n4. 挑战：在 HTML 面板中复制一个按钮（`#resetBtn`），在 JS 中给它加一个点击事件，点击后把 `count` 归零'
      }
    ],
    starterCode: {
      html: '<h1>节拍计数器</h1>\n<p>点击按钮，像打拍子一样计数！</p>\n\n<div class="counter-box">\n  <p id="display">你还没有点击</p>\n  <button id="countBtn">🎵 点我打拍子</button>\n</div>',
      css: 'h1 {\n  text-align: center;\n  color: #8B2E2E;\n}\n\np {\n  text-align: center;\n  color: #6B5A4E;\n}\n\n.counter-box {\n  text-align: center;\n  background: #FFFAF2;\n  border: 2px solid #D4C5A9;\n  border-radius: 16px;\n  padding: 32px;\n  max-width: 360px;\n  margin: 24px auto;\n}\n\n#display {\n  font-size: 24px;\n  font-weight: 700;\n  color: #8B2E2E;\n  margin-bottom: 20px;\n}\n\n#countBtn {\n  padding: 12px 32px;\n  font-size: 18px;\n  background: #8B2E2E;\n  color: #fff;\n  border: none;\n  border-radius: 8px;\n  cursor: pointer;\n}\n\n#countBtn:hover {\n  background: #C94545;\n}',
      js: '// 初始化计数器\nlet count = 0;\n\n// 获取页面元素\nlet btn = document.querySelector("#countBtn");\nlet display = document.querySelector("#display");\n\n// 监听点击事件\nbtn.addEventListener("click", function() {\n  count = count + 1;\n  display.textContent = `你点击了 ${count} 次`;\n});'
    }
  },

  // ===== 4.6 更多事件 =====
  {
    id: 'js-events-more',
    chapterId: 'js-basics',
    order: 6,
    title: '更多事件 — 倾听用户的每一种动作',
    musicAnalogy: '乐器不只有"敲击"一个动作——钢琴有按键(click)、弦乐有揉弦(input)、管乐有换气(change)、定音鼓有滚奏(keydown)。`addEventListener` 可以监听用户的各种动作，就像指挥同时关注每个声部的进入。',
    listenTo: '拉威尔《波莱罗》— 同一旋律在不同乐器间传递（不同事件），小鼓从头到尾持续敲击（持续输入），长笛、单簧管、双簧管依次登场（依次触发），最终整个乐队一起爆发。',
    sections: [
      {
        type: 'explain',
        title: '不只是 click — 认识更多事件类型',
        content: '`addEventListener` 的第一个参数是事件**类型**，除了 `"click"`，还有很多常用事件：\n\n- `"input"` — 输入框内容**每次变化**都触发\n- `"change"` — 输入框内容改变且**失去焦点**时触发\n- `"keydown"` — 键盘**按下**任意键\n- `"mouseenter"` — 鼠标**进入**元素\n- `"mouseleave"` — 鼠标**离开**元素\n- `"submit"` — 表单**提交**时触发\n\n```js\ninputEl.addEventListener("input", function() {\n  // 用户每输入一个字就执行\n});\n```'
      },
      {
        type: 'explain',
        title: 'event 对象 — 事件携带的"信息卡"',
        content: '每个事件触发时，浏览器都会创建一个 **event 对象**，包含了事件的详细信息。在回调函数中通过参数接收：\n\n```js\nbtn.addEventListener("click", function(event) {\n  console.log(event.target);  // 被点击的元素\n  console.log(event.type);    // "click"\n});\n\ninputEl.addEventListener("input", function(event) {\n  console.log(event.target.value); // 输入框当前内容\n});\n\ndocument.addEventListener("keydown", function(event) {\n  console.log(event.key); // 按下的键名，如 "Enter"、"a"\n});\n```\n\n`event.target` 是触发事件的元素——就像知道是哪个乐器在发声。'
      },
      {
        type: 'explain',
        title: 'preventDefault — 阻止默认行为',
        content: '有些元素有自己的默认行为：\n\n- 表单的 `<button type="submit">` 点击后会**刷新页面**\n- `<a>` 链接点击后会**跳转**\n\n用 `event.preventDefault()` 阻止这些默认行为：\n\n```js\nform.addEventListener("submit", function(event) {\n  event.preventDefault();  // 阻止页面刷新！\n  console.log("表单已提交（但页面不刷新）");\n});\n```\n\n这在前端开发中非常常用——表单提交通常用 JS 处理，不需要刷新页面。'
      },
      {
        type: 'example',
        title: '看例子',
        content: '下面的代码综合使用多种事件：\n\n```js\n// 实时显示输入内容\ninputEl.addEventListener("input", function(event) {\n  displayEl.textContent = event.target.value;\n});\n\n// 鼠标悬停高亮\ncard.addEventListener("mouseenter", function() {\n  card.style.borderColor = "#C9A96E";\n});\ncard.addEventListener("mouseleave", function() {\n  card.style.borderColor = "#D4C5A9";\n});\n\n// 回车键提交\ndocument.addEventListener("keydown", function(event) {\n  if (event.key === "Enter") {\n    console.log("你按了回车！");\n  }\n});\n```'
      },
      {
        type: 'task',
        title: '动手试试 ✨',
        content: '切换到 JS 标签页，试试：\n\n1. 在输入框中打字，观察下方实时显示\n2. 把鼠标移到卡片上再移开，看边框颜色变化\n3. 按回车键，看提示信息\n4. 挑战：给输入框增加 `keydown` 事件，当按 Escape 键时清空输入框内容'
      }
    ],
    starterCode: {
      html: '<h1>事件实验室</h1>\n\n<div class="card">\n  <h2>实时输入显示</h2>\n  <input type="text" id="nameInput" placeholder="输入你的名字...">\n  <p class="live-display">你输入的是：<span id="liveText">---</span></p>\n</div>\n\n<div class="card" id="hoverCard">\n  <h2>鼠标悬停卡片</h2>\n  <p>把鼠标移到这里试试</p>\n</div>\n\n<p id="keyHint">按任意键或回车试试 (⌨️)</p>',
      css: 'h1 {\n  text-align: center;\n  color: #8B2E2E;\n}\n\n.card {\n  background: #FFFAF2;\n  border: 2px solid #D4C5A9;\n  border-radius: 10px;\n  padding: 20px;\n  margin-bottom: 16px;\n  max-width: 440px;\n  margin-left: auto;\n  margin-right: auto;\n  transition: border-color 0.3s;\n}\n\n.card h2 {\n  color: #8B2E2E;\n  font-size: 16px;\n  margin: 0 0 8px 0;\n}\n\n.card p {\n  color: #6B5A4E;\n  margin: 0;\n}\n\n#nameInput {\n  width: 100%;\n  padding: 10px 14px;\n  border: 1px solid #D4C5A9;\n  border-radius: 6px;\n  font-size: 15px;\n  font-family: inherit;\n  margin-bottom: 12px;\n}\n\n.live-display {\n  font-size: 18px;\n  font-weight: 600;\n  color: #8B2E2E !important;\n}\n\n#keyHint {\n  text-align: center;\n  color: #C9A96E;\n  font-size: 13px;\n  margin-top: 12px;\n}',
      js: '// 实时输入事件\nlet inputEl = document.querySelector("#nameInput");\nlet liveText = document.querySelector("#liveText");\n\ninputEl.addEventListener("input", function(event) {\n  let val = event.target.value;\n  liveText.textContent = val || "---";\n});\n\n// 鼠标悬停事件\nlet hoverCard = document.querySelector("#hoverCard");\n\nhoverCard.addEventListener("mouseenter", function() {\n  hoverCard.style.borderColor = "#C9A96E";\n  hoverCard.style.background = "#FFF8EC";\n});\n\nhoverCard.addEventListener("mouseleave", function() {\n  hoverCard.style.borderColor = "#D4C5A9";\n  hoverCard.style.background = "#FFFAF2";\n});\n\n// 键盘事件\nlet keyHint = document.querySelector("#keyHint");\n\ndocument.addEventListener("keydown", function(event) {\n  if (event.key === "Enter") {\n    keyHint.textContent = "🎹 你按了回车键！";\n    keyHint.style.color = "#8B2E2E";\n  } else {\n    keyHint.textContent = `你按下了: "${event.key}"`;\n    keyHint.style.color = "#C9A96E";\n  }\n});'
    }
  },

  // ===== 4.7 条件判断 =====
  {
    id: 'js-conditions',
    chapterId: 'js-basics',
    order: 7,
    title: '条件判断 — 代码的分岔路口',
    musicAnalogy: '`if/else` 就像乐谱中的**反复记号**——满足条件就跳转，不满足就继续。也像**评委打分**：如果音准正确就给通过，否则请再练一遍。条件判断让代码有了"决策能力"。',
    listenTo: '巴赫《赋格的艺术》— 主题在每次出现时根据对位规则做出不同选择（进入、等待、转调），就像 if/else 根据条件执行不同的代码分支。',
    sections: [
      {
        type: 'explain',
        title: 'if 语句 — 代码的"如果"',
        content: '`if` 后面跟一个**条件**（真或假），条件为真时执行花括号里的代码：\n\n```js\nlet score = 85;\n\nif (score >= 80) {\n  console.log("优秀！");\n}\n```\n\n比较运算符：\n- `===` — 等于（推荐）\n- `!==` — 不等于\n- `>` / `<` — 大于/小于\n- `>=` / `<=` — 大于等于/小于等于\n\n就像评委打分：分数 ≥ 80 才算优秀。'
      },
      {
        type: 'explain',
        title: 'else 与 else if — 多分岔路',
        content: '`else` 处理"否则"的情况，`else if` 添加更多分岔：\n\n```js\nlet score = 75;\n\nif (score >= 90) {\n  console.log("金奖！🥇");\n} else if (score >= 80) {\n  console.log("银奖！🥈");\n} else if (score >= 60) {\n  console.log("铜奖🥉");\n} else {\n  console.log("继续努力！");\n}\n```\n\n逻辑运算符：\n- `&&` — 并且（两个条件都成立）\n- `||` — 或者（任意一个成立）\n\n```js\nif (score >= 80 && score < 90) {\n  console.log("优秀但未达金奖");\n}\n```'
      },
      {
        type: 'example',
        title: '看例子',
        content: '下面的代码是一个作曲家答题器。输入答案后点击提交，JS 判断你的答案是否正确：\n\n```js\nlet answer = document.querySelector("#answer").value;\n\nif (answer === "肖邦") {\n  display.textContent = "✓ 回答正确！";\n} else {\n  display.textContent = "✗ 再想想？提示：他是波兰人";\n}\n```\n切换到 JS 标签页，看 submit 按钮的点击事件中完整的 if/else 逻辑。'
      },
      {
        type: 'task',
        title: '动手试试 ✨',
        content: '切换到 JS 标签页，试试：\n\n1. 在预览区输入"肖邦"点击提交，看正确反馈\n2. 输入别的名字点击提交，看 else 分支的反馈\n3. 在 if 中增加一个条件：用 `&&` 同时判断两个输入框\n4. 挑战：增加一个 `else if` 分支，判断是否为空（`=== ""`）'
      }
    ],
    starterCode: {
      html: '<h1>🎹 作曲家竞猜</h1>\n\n<div class="quiz-box">\n  <p class="quiz-question">哪一位作曲家被称为"钢琴诗人"？</p>\n  <input type="text" id="answer" placeholder="请输入作曲家名字">\n  <button id="submitBtn">提交答案</button>\n  <p id="result"></p>\n</div>',
      css: 'h1 {\n  text-align: center;\n  color: #8B2E2E;\n}\n\n.quiz-box {\n  background: #FFFAF2;\n  border: 2px solid #D4C5A9;\n  border-radius: 12px;\n  padding: 32px;\n  max-width: 400px;\n  margin: 20px auto;\n  text-align: center;\n}\n\n.quiz-question {\n  font-size: 18px;\n  color: #3D2B1F;\n  margin-bottom: 16px;\n}\n\n#answer {\n  width: 100%;\n  padding: 10px 14px;\n  border: 1px solid #D4C5A9;\n  border-radius: 6px;\n  font-size: 16px;\n  font-family: inherit;\n  text-align: center;\n}\n\n#submitBtn {\n  margin-top: 12px;\n  padding: 10px 32px;\n  background: #8B2E2E;\n  color: #fff;\n  border: none;\n  border-radius: 8px;\n  font-size: 16px;\n  cursor: pointer;\n}\n\n#submitBtn:hover {\n  background: #C94545;\n}\n\n#result {\n  margin-top: 16px;\n  font-size: 18px;\n  font-weight: 600;\n  min-height: 28px;\n}',
      js: 'let btn = document.querySelector("#submitBtn");\nlet result = document.querySelector("#result");\n\nbtn.addEventListener("click", function() {\n  let answer = document.querySelector("#answer").value;\n\n  if (answer === "肖邦") {\n    result.style.color = "#5B8C5A";\n    result.textContent = "✓ 回答正确！肖邦确实是钢琴诗人。";\n  } else if (answer === "") {\n    result.style.color = "#C9A96E";\n    result.textContent = "请先输入一个名字哦 ~";\n  } else {\n    result.style.color = "#8B2E2E";\n    result.textContent = "✗ 再想想？提示：他是波兰人，写了很多夜曲。";\n  }\n});'
    }
  },

  // ===== 4.8 数组 =====
  {
    id: 'js-arrays',
    chapterId: 'js-basics',
    order: 8,
    title: '数组 — 存储你的曲目列表',
    musicAnalogy: '数组就像一张**歌单/曲目列表**——把多个相关的值按顺序组织在一起。`["巴赫", "莫扎特", "贝多芬"]` 就像写在纸上的三首曲目，用 `[0]` 可以取第一首，用 `.push()` 可以在末尾添加新曲目。',
    listenTo: '柴可夫斯基《胡桃夹子》组曲 — 舞剧中包含"进行曲""糖果仙子之舞""花之圆舞曲"等多段舞曲，就像数组中的不同条目，每段有独立的索引和性格。',
    sections: [
      {
        type: 'explain',
        title: '创建和访问数组',
        content: '数组用 `[]` 创建，每个值用逗号分隔：\n\n```js\nlet composers = ["巴赫", "莫扎特", "贝多芬", "肖邦"];\n```\n\n- `composers[0]` — 第 1 项（"巴赫"），索引从 0 开始\n- `composers[2]` — 第 3 项（"贝多芬"）\n- `composers.length` — 数组长度（4）\n\n就像曲目单上第一首是 0 号，不是 1 号——这是编程的习惯。'
      },
      {
        type: 'explain',
        title: '数组常用方法',
        content: '数组有一套强大的操作方法：\n\n- `.push("德彪西")` — 在末尾添加一项\n- `.pop()` — 移除末尾一项\n- `.join("、")` — 用指定分隔符拼接为字符串\n\n```js\nlet composers = ["巴赫", "莫扎特"];\ncomposers.push("肖邦");  // 末尾追加\n// composers 现在是 ["巴赫", "莫扎特", "肖邦"]\n\nlet text = composers.join(" | ");\n// text 是 "巴赫 | 莫扎特 | 肖邦"\n```\n\n`.join()` 特别实用——把一个数组变成页面上的文字！'
      },
      {
        type: 'example',
        title: '看例子',
        content: '下面的代码维护了一个作曲家数组，用 `.push()` 添加新名字，用 `.join()` 显示到页面上：\n\n```js\nlet composers = ["巴赫", "莫扎特", "贝多芬"];\n\n// 显示列表\nlet text = composers.join(" · ");\ndisplay.textContent = text;\n\n// 添加新作曲家\ncomposers.push("肖邦");\ntext = composers.join(" · ");\ndisplay.textContent = text;\n```\n切换到 JS 标签页，输入一个名字点击添加，看列表实时更新。'
      },
      {
        type: 'task',
        title: '动手试试 ✨',
        content: '切换到 JS 标签页，试试：\n\n1. 在预览区输入框输入"德彪西"点添加，看列表变化\n2. 修改 `.join()` 的分隔符，从 `" · "` 改成 `" | "` 或 `", "`\n3. 修改数组初始值，换成你自己喜欢的作曲家\n4. 挑战：添加一个"删除最后一位"按钮（用 `.pop()` 方法）'
      }
    ],
    starterCode: {
      html: '<h1>作曲家列表</h1>\n\n<div class="list-box">\n  <p id="display">列表加载中...</p>\n  <div class="add-row">\n    <input type="text" id="nameInput" placeholder="输入作曲家名字">\n    <button id="addBtn">➕ 添加</button>\n  </div>\n</div>',
      css: 'h1 {\n  text-align: center;\n  color: #8B2E2E;\n}\n\n.list-box {\n  background: #FFFAF2;\n  border: 2px solid #D4C5A9;\n  border-radius: 12px;\n  padding: 24px;\n  max-width: 440px;\n  margin: 20px auto;\n}\n\n#display {\n  font-size: 18px;\n  color: #3D2B1F;\n  text-align: center;\n  min-height: 30px;\n  margin-bottom: 16px;\n  padding: 12px;\n  background: #fff;\n  border-radius: 6px;\n  border: 1px solid #E8DDCC;\n}\n\n.add-row {\n  display: flex;\n  gap: 8px;\n}\n\n#nameInput {\n  flex: 1;\n  padding: 10px 14px;\n  border: 1px solid #D4C5A9;\n  border-radius: 6px;\n  font-size: 15px;\n  font-family: inherit;\n}\n\n#addBtn {\n  padding: 10px 20px;\n  background: #8B2E2E;\n  color: #fff;\n  border: none;\n  border-radius: 6px;\n  font-size: 14px;\n  cursor: pointer;\n  white-space: nowrap;\n}\n\n#addBtn:hover {\n  background: #C94545;\n}',
      js: '// 初始数组\nlet composers = ["巴赫", "莫扎特", "贝多芬"];\n\nlet display = document.querySelector("#display");\nlet input = document.querySelector("#nameInput");\nlet addBtn = document.querySelector("#addBtn");\n\n// 显示数组内容\nfunction showList() {\n  let text = composers.join(" · ");\n  display.textContent = text;\n}\n\nshowList();\n\n// 点击添加\naddBtn.addEventListener("click", function() {\n  let name = input.value;\n  if (name !== "") {\n    composers.push(name);\n    showList();\n    input.value = "";\n  }\n});'
    }
  },

  // ===== 4.9 循环 =====
  {
    id: 'js-loops',
    chapterId: 'js-basics',
    order: 9,
    title: '循环 — 让代码反复执行的节拍器',
    musicAnalogy: '循环就像**固定音型（ostinato）**——一段模式反复执行，每次略有不同。也像**节拍器**，一拍一拍反复，直到乐曲结束。用 `for` 或 `forEach` 遍历数组中的每一项，对每一首都执行相同的操作。',
    listenTo: '拉威尔《波莱罗》— 同一个旋律反复 18 遍，每次配器都在变化（加一件新乐器），就像循环每次迭代对当前元素做不同处理。',
    sections: [
      {
        type: 'explain',
        title: 'for 循环',
        content: '`for` 循环由三部分组成：初始化、条件、步进：\n\n```js\nfor (let i = 0; i < composers.length; i++) {\n  console.log(composers[i]);\n}\n```\n\n- `let i = 0` — 从 0 开始\n- `i < composers.length` — 只要 i 小于数组长度就继续\n- `i++` — 每轮 i 加 1\n\n`i` 是计数器，第一轮是 0，第二轮是 1... 依次取遍数组中的每一项，就像**节拍器从第 1 拍数到最后 1 拍**。'
      },
      {
        type: 'explain',
        title: 'forEach — 更优雅的循环',
        content: '`forEach` 是专门为数组设计的循环方法：\n\n```js\ncomposers.forEach(function(name, index) {\n  console.log(`${index + 1}. ${name}`);\n});\n```\n\n- `name` — 当前项的值\n- `index` — 当前项的索引（0 开始）\n\n```js\n// 用 forEach 批量生成 HTML\nlet html = "";\ncomposers.forEach(function(composer) {\n  html += `<li>${composer}</li>`;\n});\ndocument.querySelector("ul").innerHTML = html;\n```\n\n`forEach` 比 `for` 更简洁——你不用手动写 `i` 和 `i++`。'
      },
      {
        type: 'example',
        title: '看例子',
        content: '下面的代码用 `forEach` 遍历作曲家数组，把每一项渲染成 HTML 卡片：\n\n```js\nlet composers = ["巴赫", "莫扎特", "贝多芬", "肖邦"];\nlet html = "";\n\ncomposers.forEach(function(name, index) {\n  html += `\n    <div class="card">\n      <span class="num">${index + 1}</span>\n      ${name}\n    </div>\n  `;\n});\n\ndocument.querySelector("#list").innerHTML = html;\n```\n切换到 JS 标签页查看完整代码。4 张卡片由一个循环生成——如果加到 10 个也不用手动复制。'
      },
      {
        type: 'task',
        title: '动手试试 ✨',
        content: '切换到 JS 标签页，试试：\n\n1. 在数组中再添加一个作曲家，看循环自动生成新卡片\n2. 把 `forEach` 改成 `for` 循环，实现同样的效果\n3. 修改卡片模板，增加曲目信息（把数组改成二维数组）\n4. 挑战：用 `.filter()` 只显示名字长度 > 2 的项'
      }
    ],
    starterCode: {
      html: '<h1>作曲家名录</h1>\n<div id="list"></div>',
      css: 'h1 {\n  text-align: center;\n  color: #8B2E2E;\n  margin-bottom: 20px;\n}\n\n#list {\n  display: flex;\n  flex-direction: column;\n  gap: 8px;\n}\n\n.card {\n  background: #FFFAF2;\n  border: 1px solid #D4C5A9;\n  border-radius: 8px;\n  padding: 14px 20px;\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  color: #3D2B1F;\n  font-size: 16px;\n}\n\n.num {\n  background: #8B2E2E;\n  color: #fff;\n  width: 28px;\n  height: 28px;\n  border-radius: 50%;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-size: 13px;\n  font-weight: 700;\n  flex-shrink: 0;\n}',
      js: '// 作曲家数组\nlet composers = ["巴赫", "莫扎特", "贝多芬", "肖邦", "德彪西"];\n\n// 用 forEach 循环生成 HTML\nlet html = "";\n\ncomposers.forEach(function(name, index) {\n  html += `\n    <div class="card">\n      <span class="num">${index + 1}</span>\n      ${name}\n    </div>\n  `;\n});\n\n// 显示到页面上\ndocument.querySelector("#list").innerHTML = html;'
    }
  },

  // ===== 4.10 数组方法进阶 — map 与 filter =====
  {
    id: 'js-array-methods',
    chapterId: 'js-basics',
    order: 10,
    title: '数组方法进阶 — 像筛选乐谱一样处理数据',
    musicAnalogy: '`.map()` 就像**移调**——把整首曲子每个音都升高一度，返回一个新的版本；`.filter()` 就像从总谱中**挑出所有弦乐声部**——只保留符合条件的部分。两者都不破坏原谱（原数组），而是生成一份新的。',
    listenTo: '巴赫《勃兰登堡协奏曲》No.3 — 各声部轮流演奏同一主题（map），然后只留下弦乐组对话（filter），现代 Web 开发中用 map/filter 处理数据就像听巴赫一样行云流水。',
    sections: [
      {
        type: 'explain',
        title: '.map() — 把每个元素"转换"成新值',
        content: '`.map()` 遍历数组中的每一项，执行一个函数，**返回一个新数组**：\n\n```js\nlet names = ["bach", "mozart", "beethoven"];\n\nlet upper = names.map(function(name) {\n  return name.toUpperCase();\n});\n// upper 是 ["BACH", "MOZART", "BEETHOVEN"]\n// names 没变！\n```\n\n就像把 C 大调移调到 D 大调——原曲还在，只是多了一个新版本。'
      },
      {
        type: 'explain',
        title: '.filter() — 筛选符合条件的元素',
        content: '`.filter()` 遍历数组，**只保留**让条件函数返回 `true` 的项：\n\n```js\nlet years = [1685, 1756, 1770, 1810, 1862];\n\nlet after1800 = years.filter(function(year) {\n  return year > 1800;\n});\n// after1800 是 [1810, 1862]\n```\n\n就像在管弦乐团中只挑出木管声部——其他声部还在，但你只需要木管。'
      },
      {
        type: 'explain',
        title: '链式调用 — map 和 filter 组合',
        content: '`.map()` 和 `.filter()` 都返回数组，所以可以**链式调用**：\n\n```js\nlet composers = [\n  { name: "巴赫", year: 1720 },\n  { name: "莫扎特", year: 1785 },\n  { name: "贝多芬", year: 1805 },\n  { name: "肖邦", year: 1835 }\n];\n\n// 先筛选 1800 年后的，再只取名字\nlet names = composers\n  .filter(function(c) { return c.year > 1800; })\n  .map(function(c) { return c.name; });\n// names 是 ["贝多芬", "肖邦"]\n```\n\n就像先筛选出 19 世纪的作品，再把它们的标题提取出来——流水线操作！'
      },
      {
        type: 'example',
        title: '看例子',
        content: '下面的代码用 `.filter()` 筛选出含有"A"的作曲家名字，再用 `.map()` 转为大写：\n\n```js\nlet composers = ["Bach", "Mozart", "Beethoven", "Chopin", "Debussy", "Vivaldi"];\n\n// 筛选名字里含 "a"（不区分大小写）的\nlet filtered = composers.filter(function(name) {\n  return name.toLowerCase().includes("a");\n});\n\n// 转为大写\nlet result = filtered.map(function(name) {\n  return name.toUpperCase();\n});\n\ndocument.querySelector("#output").innerHTML =\n  result.join(" | ");\n```'
      },
      {
        type: 'task',
        title: '动手试试 ✨',
        content: '切换到 JS 标签页，试试：\n\n1. 修改筛选条件——只显示名字长度 ≥ 6 的作曲家\n2. 用 `.map()` 给每个名字加上"作曲家："前缀\n3. 用 `链式调用` 一步完成筛选+转换（不用中间变量 filtered）\n4. 挑战：在输入框输入字母，只显示名字包含该字母的作曲家（实时筛选）'
      }
    ],
    starterCode: {
      html: '<h1>数组方法实验室</h1>\n\n<div class="panel">\n  <div class="section">\n    <h2>原始列表</h2>\n    <p id="original"></p>\n  </div>\n  <div class="section result">\n    <h2>处理结果</h2>\n    <p id="output"></p>\n  </div>\n</div>\n\n<div class="controls">\n  <input type="text" id="filterInput" placeholder="输入字母筛选...">\n  <button id="resetBtn">重置</button>\n</div>',
      css: 'h1 {\n  text-align: center;\n  color: #8B2E2E;\n}\n\n.panel {\n  display: flex;\n  gap: 16px;\n  margin-bottom: 20px;\n}\n\n.section {\n  flex: 1;\n  background: #FFFAF2;\n  border: 1px solid #D4C5A9;\n  border-radius: 8px;\n  padding: 16px;\n}\n\n.section.result {\n  background: #FFF8F0;\n  border-color: #C9A96E;\n}\n\n.section h2 {\n  color: #8B2E2E;\n  font-size: 14px;\n  margin: 0 0 8px 0;\n}\n\n.section p {\n  color: #3D2B1F;\n  font-size: 15px;\n  margin: 0;\n  min-height: 24px;\n}\n\n.controls {\n  display: flex;\n  gap: 8px;\n  justify-content: center;\n}\n\n#filterInput {\n  padding: 10px 14px;\n  border: 1px solid #D4C5A9;\n  border-radius: 6px;\n  font-size: 14px;\n  font-family: inherit;\n  width: 200px;\n}\n\n#resetBtn {\n  padding: 10px 20px;\n  background: #8B2E2E;\n  color: #fff;\n  border: none;\n  border-radius: 6px;\n  font-size: 14px;\n  cursor: pointer;\n}\n\n#resetBtn:hover {\n  background: #C94545;\n}',
      js: 'let composers = ["Bach", "Mozart", "Beethoven", "Chopin", "Debussy", "Vivaldi"];\n\n// 显示原始列表\nlet originalEl = document.querySelector("#original");\nlet outputEl = document.querySelector("#output");\n\noriginalEl.textContent = composers.join(" · ");\n\n// 筛选+转换函数\nfunction updateList(letter) {\n  let result = composers\n    .filter(function(name) {\n      return name.toLowerCase().includes(letter.toLowerCase());\n    })\n    .map(function(name) {\n      return name.toUpperCase();\n    });\n  outputEl.textContent = result.length > 0 ? result.join(" | ") : "（无匹配）";\n}\n\n// 初始显示全部\nupdateList("");\n\n// 输入筛选\ndocument.querySelector("#filterInput").addEventListener("input", function() {\n  updateList(this.value);\n});\n\n// 重置\ndocument.querySelector("#resetBtn").addEventListener("click", function() {\n  document.querySelector("#filterInput").value = "";\n  updateList("");\n});'
    }
  },

  // ===== 4.11 批量 DOM 操作 =====
  {
    id: 'js-querySelectorAll',
    chapterId: 'js-basics',
    order: 11,
    title: '批量 DOM 操作 — 指挥整个声部',
    musicAnalogy: '`querySelector` 指一个元素就像指挥指向**一位独奏者**，而 `querySelectorAll` 就像指挥同时对**整个弦乐声部**做统一手势——用一条指令同时操作一群元素。',
    listenTo: '斯特拉文斯基《春之祭》— 弦乐组全员同时奏响的强力和弦，一声令下全声部同步发力，就像 `querySelectorAll` 批量修改所有匹配元素的样式。',
    sections: [
      {
        type: 'explain',
        title: '选中一组元素',
        content: '`querySelectorAll` 返回所有匹配的元素列表（NodeList）：\n\n```js\nlet cards = document.querySelectorAll(".card");\n```\n\nNodeList 可以和数组一样用 `forEach` 遍历：\n\n```js\ncards.forEach(function(card) {\n  card.style.border = "2px solid gold";\n});\n```\n\n也支持索引：\n```js\ncards[0].style.background = "#FFFAF2";  // 第一张\ncards[1].style.background = "#F0F8FF";  // 第二张\n```'
      },
      {
        type: 'explain',
        title: 'classList — 批量切换样式类',
        content: '`classList` 比直接操作 `style` 更优雅，配合 CSS 类使用：\n\n- `.classList.add("active")` — 添加类\n- `.classList.remove("active")` — 移除类\n- `.classList.toggle("active")` — 切换（有则删，无则加）\n- `.classList.contains("active")` — 判断是否包含\n\n```js\nlet cards = document.querySelectorAll(".card");\n\ncards.forEach(function(card) {\n  card.classList.add("highlighted");\n});\n```\n\n然后 CSS 中定义 `.highlighted` 的样式即可——JS 负责逻辑，CSS 负责外观，各司其职。'
      },
      {
        type: 'example',
        title: '看例子',
        content: '下面的代码有 5 张乐器卡片。三个按钮分别实现"全选高亮""取消高亮""切换 \'弦乐\' 类"：\n\n```js\n// 高亮全部\nlet cards = document.querySelectorAll(".card");\ncards.forEach(function(card) {\n  card.classList.add("highlighted");\n});\n\n// 只看弦乐\ncards.forEach(function(card) {\n  card.classList.toggle("hidden", !card.classList.contains("strings"));\n});\n```\n切换到 JS 标签页查看完整代码，预览区点击按钮试试批量效果。'
      },
      {
        type: 'task',
        title: '动手试试 ✨',
        content: '切换到 JS 和预览区，试试：\n\n1. 点击"高亮全部"看效果\n2. 点击"只看弦乐"看过滤效果\n3. 修改 `#showAllBtn` 的逻辑，把 `card.classList.remove("hidden")` 改成移除高亮\n4. 挑战：新增一个按钮"高亮管乐"，只高亮 class 包含 `winds` 的卡片'
      }
    ],
    starterCode: {
      html: '<h1>乐团声部</h1>\n\n<div class="controls">\n  <button id="highlightBtn">高亮全部</button>\n  <button id="clearBtn">取消高亮</button>\n  <button id="filterBtn">只看弦乐</button>\n  <button id="showAllBtn">显示全部</button>\n</div>\n\n<div class="orchestra">\n  <div class="card strings">🎻 小提琴</div>\n  <div class="card strings">🎻 中提琴</div>\n  <div class="card strings">🎻 大提琴</div>\n  <div class="card winds">🎺 小号</div>\n  <div class="card winds">🎺 长笛</div>\n</div>',
      css: 'h1 {\n  text-align: center;\n  color: #8B2E2E;\n  margin-bottom: 12px;\n}\n\n.controls {\n  display: flex;\n  gap: 8px;\n  flex-wrap: wrap;\n  justify-content: center;\n  margin-bottom: 16px;\n}\n\n.controls button {\n  padding: 8px 16px;\n  background: #FFFAF2;\n  border: 1px solid #D4C5A9;\n  border-radius: 6px;\n  font-size: 13px;\n  cursor: pointer;\n  color: #3D2B1F;\n  transition: all 0.2s;\n}\n\n.controls button:hover {\n  background: #8B2E2E;\n  color: #fff;\n  border-color: #8B2E2E;\n}\n\n.orchestra {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 10px;\n}\n\n.card {\n  background: #FFFAF2;\n  border: 2px solid #D4C5A9;\n  border-radius: 8px;\n  padding: 16px 20px;\n  font-size: 15px;\n  color: #3D2B1F;\n  transition: all 0.3s;\n  cursor: default;\n}\n\n.card.highlighted {\n  background: #FFF8F0;\n  border-color: #C9A96E;\n  box-shadow: 0 4px 12px rgba(201, 169, 110, 0.3);\n}\n\n.card.hidden {\n  opacity: 0.15;\n}',
      js: 'let highlightBtn = document.querySelector("#highlightBtn");\nlet clearBtn = document.querySelector("#clearBtn");\nlet filterBtn = document.querySelector("#filterBtn");\nlet showAllBtn = document.querySelector("#showAllBtn");\nlet cards = document.querySelectorAll(".card");\n\n// 高亮全部\nhighlightBtn.addEventListener("click", function() {\n  cards.forEach(function(card) {\n    card.classList.add("highlighted");\n  });\n});\n\n// 取消高亮\nclearBtn.addEventListener("click", function() {\n  cards.forEach(function(card) {\n    card.classList.remove("highlighted");\n  });\n});\n\n// 只看弦乐（隐藏非弦乐）\nfilterBtn.addEventListener("click", function() {\n  cards.forEach(function(card) {\n    if (!card.classList.contains("strings")) {\n      card.classList.add("hidden");\n    }\n  });\n});\n\n// 显示全部\nshowAllBtn.addEventListener("click", function() {\n  cards.forEach(function(card) {\n    card.classList.remove("hidden");\n  });\n});'
    }
  },

  // ===== 4.12 对象 =====
  {
    id: 'js-objects',
    chapterId: 'js-basics',
    order: 12,
    title: '对象 — 结构化你的音乐数据',
    musicAnalogy: '对象就像**音乐家档案**——用键值对（key-value）组织信息：姓名、时期、代表作、国籍。不像数组用数字索引，对象用**有名字的键**来存取数据，就像档案上的标签："姓名____、时期____"。',
    listenTo: '拉威尔《波莱罗》— 配器总谱上标注了每一件乐器的详细信息（乐器名、调性、进入小节），就像对象中结构化的键值对数据。',
    sections: [
      {
        type: 'explain',
        title: '创建和访问对象',
        content: '对象用 `{}` 创建，包含多组键值对：\n\n```js\nlet composer = {\n  name: "肖邦",\n  period: "浪漫主义",\n  country: "波兰",\n  birthYear: 1810\n};\n```\n\n访问属性有两种方式：\n```js\ncomposer.name       // "肖邦"（点号）\ncomposer["period"]  // "浪漫主义"（方括号）\n```\n\n修改或新增：\n```js\ncomposer.famousPiece = "夜曲";  // 新增\ncomposer.birthYear = 1809;      // 修正（肖邦实际生于 1810）\n```'
      },
      {
        type: 'explain',
        title: '对象数组 — 真正的数据结构',
        content: '对象最强大的用法是和数组结合——**对象数组**：\n\n```js\nlet composers = [\n  { name: "巴赫", period: "巴洛克", country: "德国" },\n  { name: "莫扎特", period: "古典主义", country: "奥地利" },\n  { name: "肖邦", period: "浪漫主义", country: "波兰" }\n];\n\n// 用 forEach 遍历\ncomposers.forEach(function(c) {\n  console.log(`${c.name} — ${c.period}`);\n});\n```\n\n这才是实际开发中最常见的数据形式——数组里包着对象，每个对象代表一条记录。就像 Excel 表格：每一行是数组的一项，每一列是对象的属性！'
      },
      {
        type: 'example',
        title: '看例子',
        content: '下面的代码用对象数组存储了作曲家信息，用 `forEach` 遍历并生成卡片：\n\n```js\nlet composers = [\n  { name: "巴赫", period: "巴洛克", piece: "赋格的艺术" },\n  { name: "莫扎特", period: "古典主义", piece: "魔笛" },\n  { name: "肖邦", period: "浪漫主义", piece: "夜曲" }\n];\n\nlet html = "";\ncomposers.forEach(function(c) {\n  html += `\n    <div class="card">\n      <h2>${c.name}</h2>\n      <p>时期：${c.period}</p>\n      <p>代表作：《${c.piece}》</p>\n    </div>\n  `;\n});\n```\n切换到 JS 标签页查看完整代码——对象数据的结构和用途一目了然。'
      },
      {
        type: 'task',
        title: '动手试试 ✨',
        content: '切换到 JS 标签页，试试：\n\n1. 在对象数组中新增一个作曲家对象\n2. 给每个对象增加 `country` 属性，在卡片模板中显示\n3. 修改某个作曲家的 `period`，看页面自动更新\n4. 挑战：用 `if` 判断，只显示 `period === "浪漫主义"` 的作品家（配合 `.filter()` 或条件判断）'
      }
    ],
    starterCode: {
      html: '<h1>作曲家档案</h1>\n<div id="gallery"></div>',
      css: 'h1 {\n  text-align: center;\n  color: #8B2E2E;\n  margin-bottom: 20px;\n}\n\n#gallery {\n  display: flex;\n  gap: 12px;\n  flex-wrap: wrap;\n  justify-content: center;\n}\n\n.card {\n  background: #FFFAF2;\n  border: 1px solid #D4C5A9;\n  border-radius: 10px;\n  padding: 20px;\n  text-align: center;\n  min-width: 160px;\n}\n\n.card h2 {\n  color: #8B2E2E;\n  margin: 0 0 8px 0;\n  font-size: 18px;\n}\n\n.card p {\n  color: #6B5A4E;\n  margin: 4px 0;\n  font-size: 13px;\n}',
      js: '// 对象数组：每个对象是一条记录\nlet composers = [\n  { name: "巴赫", period: "巴洛克", piece: "赋格的艺术" },\n  { name: "莫扎特", period: "古典主义", piece: "魔笛" },\n  { name: "贝多芬", period: "古典到浪漫", piece: "命运交响曲" },\n  { name: "肖邦", period: "浪漫主义", piece: "夜曲" }\n];\n\n// 遍历对象数组，生成卡片\nlet html = "";\ncomposers.forEach(function(c) {\n  html += `\n    <div class="card">\n      <h2>${c.name}</h2>\n      <p>时期：${c.period}</p>\n      <p>代表作：《${c.piece}》</p>\n    </div>\n  `;\n});\n\ndocument.querySelector("#gallery").innerHTML = html;'
    }
  },

  // ===== 4.13 DOM 操作进阶 =====
  {
    id: 'js-dom-advanced',
    chapterId: 'js-basics',
    order: 13,
    title: 'DOM 操作进阶 — 动态创建与删除元素',
    musicAnalogy: 'DOM 操作进阶就像**即兴演奏**——不是在谱子写好的框架内规规矩矩地弹，而是在演奏过程中根据灵感动态创造新的乐句（元素），或者删除某个声部。`createElement` 是创作新乐句，`remove()` 是撤掉一个声部。',
    listenTo: '爵士即兴 — 爵士乐手在和声进行中实时创造旋律，有时加一段 solo（createElement），有时一个声部退出（remove），结构在即兴中动态变化。',
    sections: [
      {
        type: 'explain',
        title: '动态创建元素',
        content: '`document.createElement()` 可以凭空创建一个新元素：\n\n```js\n// 创建元素\nlet card = document.createElement("div");\ncard.className = "card";         // 设类名\ncard.innerHTML = "<h2>新卡片</h2>";  // 设内容\n\n// 追加到页面\ndocument.querySelector("#list").appendChild(card);\n```\n\n就像在曲谱的空白处临时加了一行乐句——全新的元素出现在页面上。'
      },
      {
        type: 'explain',
        title: '删除与替换',
        content: '`.remove()` 直接删除元素：\n\n```js\nlet card = document.querySelector("#card3");\ncard.remove();  // 没了！\n```\n\n配合 `createElement` 实现增删：\n```js\nfunction addCard(title) {\n  let card = document.createElement("div");\n  card.className = "card";\n  card.textContent = title;\n  document.querySelector("#list").appendChild(card);\n}\n\nfunction removeLast() {\n  let cards = document.querySelectorAll(".card");\n  let last = cards[cards.length - 1];\n  if (last) last.remove();\n}\n```\n\n增删改查——完整的数据操作闭环！'
      },
      {
        type: 'example',
        title: '看例子',
        content: '下面的代码有一个输入框和"添加""删除最后"两个按钮，可以动态维护一张练琴计划列表：\n\n```js\nfunction addItem() {\n  let item = document.createElement("div");\n  item.className = "plan-item";\n  item.textContent = input.value;\n  list.appendChild(item);\n  input.value = "";\n}\n\nfunction removeLast() {\n  let items = document.querySelectorAll(".plan-item");\n  let last = items[items.length - 1];\n  if (last) last.remove();\n}\n```\n切换到预览区，输入内容点添加，再点删除试试——页面元素在动态变化！'
      },
      {
        type: 'task',
        title: '动手试试 ✨',
        content: '切换到 JS 标签页和预览区，试试：\n\n1. 在输入框输入内容，点"添加"，看列表增长\n2. 连续点"删除最后"，看列表缩短\n3. 修改 `addItem` 函数，让每个项带上序号\n4. 挑战：给每个项加一个删除按钮（在 `createElement` 时内置一个独立删除功能）'
      }
    ],
    starterCode: {
      html: '<h1>练琴计划</h1>\n\n<div class="plan-box">\n  <div class="add-row">\n    <input type="text" id="itemInput" placeholder="添加今天的练习内容">\n    <button id="addBtn">➕ 添加</button>\n    <button id="removeBtn">🗑 删除最后</button>\n  </div>\n  <div id="list"></div>\n</div>',
      css: 'h1 {\n  text-align: center;\n  color: #8B2E2E;\n}\n\n.plan-box {\n  max-width: 460px;\n  margin: 20px auto;\n}\n\n.add-row {\n  display: flex;\n  gap: 8px;\n  margin-bottom: 16px;\n}\n\n#itemInput {\n  flex: 1;\n  padding: 10px 14px;\n  border: 1px solid #D4C5A9;\n  border-radius: 6px;\n  font-size: 14px;\n  font-family: inherit;\n}\n\n.add-row button {\n  padding: 10px 16px;\n  background: #8B2E2E;\n  color: #fff;\n  border: none;\n  border-radius: 6px;\n  font-size: 13px;\n  cursor: pointer;\n  white-space: nowrap;\n}\n\n.add-row button:hover {\n  background: #C94545;\n}\n\n#removeBtn {\n  background: #6B5A4E;\n}\n\n#removeBtn:hover {\n  background: #C94545;\n}\n\n#list {\n  display: flex;\n  flex-direction: column;\n  gap: 6px;\n}\n\n.plan-item {\n  background: #FFFAF2;\n  border: 1px solid #E8DDCC;\n  border-radius: 6px;\n  padding: 12px 16px;\n  color: #3D2B1F;\n}',
      js: 'let input = document.querySelector("#itemInput");\nlet addBtn = document.querySelector("#addBtn");\nlet removeBtn = document.querySelector("#removeBtn");\nlet list = document.querySelector("#list");\n\n// 添加\naddBtn.addEventListener("click", function() {\n  let text = input.value.trim();\n  if (text === "") return;\n\n  let item = document.createElement("div");\n  item.className = "plan-item";\n  item.textContent = text;\n  list.appendChild(item);\n  input.value = "";\n});\n\n// 删除最后一个\nremoveBtn.addEventListener("click", function() {\n  let items = document.querySelectorAll(".plan-item");\n  let last = items[items.length - 1];\n  if (last) last.remove();\n});'
    }
  },

  // ===== 4.14 定时器 =====
  {
    id: 'js-timers',
    chapterId: 'js-basics',
    order: 14,
    title: '定时器 — 让代码跟随节拍',
    musicAnalogy: '`setInterval` 就像**节拍器**——设定每分钟 60 拍，它每拍准时触发一次回调函数。`setTimeout` 则像乐谱中的**延长音记号（fermata）**——等一段时间，然后继续演奏。两者结合，你就可以在页面上创造节奏和时序。',
    listenTo: '菲利普·格拉斯《音乐的十二个部分》— 极简主义音乐用重复的节奏型不断叠加，精确的时间间隔驱动着音乐的推进，就像 setInterval 驱动的自动动画。',
    sections: [
      {
        type: 'explain',
        title: 'setInterval — 定时重复',
        content: '`setInterval` 每隔指定毫秒执行一次回调函数：\n\n```js\n// 每 1000 毫秒（1 秒）执行一次\nlet timer = setInterval(function() {\n  count++;\n  display.textContent = count;\n  console.log("一秒过去了");\n}, 1000);\n\n// 停止\nclearInterval(timer);\n```\n\n1000 毫秒 = 1 秒。就像节拍器打在每分钟 60 拍（每拍 1000ms）。'
      },
      {
        type: 'explain',
        title: 'setTimeout — 延迟一次',
        content: '`setTimeout` 等待指定时间后执行**一次**：\n\n```js\n// 3 秒后弹出提示\nsetTimeout(function() {\n  alert("3 秒到了！");\n}, 3000);\n\n// 取消（在还没执行前）\nlet timer = setTimeout(fn, 5000);\nclearTimeout(timer);  // 不执行了\n```\n\n就像乐谱上的延长音记号——在某个音符上停留指定时长，然后继续演奏下一个音符。\n\n`setInterval` 适合：自动轮播、倒计时、节拍器\n`setTimeout` 适合：延迟提示、debounce、定时检查'
      },
      {
        type: 'example',
        title: '看例子',
        content: '下面的代码实现了一个节拍器：点击"开始"按钮，计数器每秒 +1；点击"暂停"停止：\n\n```js\nlet count = 0;\nlet timer = null;\n\nfunction startMetronome() {\n  if (timer) return;  // 防止重复启动\n  timer = setInterval(function() {\n    count++;\n    display.textContent = `节拍 ${count}`;\n  }, 1000);\n}\n\nfunction stopMetronome() {\n  clearInterval(timer);\n  timer = null;\n}\n```\n切换到预览区，点击"开始节拍"看数字每秒递增。'
      },
      {
        type: 'task',
        title: '动手试试 ✨',
        content: '切换到预览区和 JS 标签页，试试：\n\n1. 点击"开始节拍"看计数，点"暂停"看停止\n2. 把 `setInterval` 的时间从 `1000` 改成 `500`，变成更快的 120bpm\n3. 增加一个 `setTimeout` 实现的"3 秒后自动停止"功能\n4. 挑战：让节拍每 4 拍换一个颜色（提示：用 `count % 4 === 0` 判断）'
      }
    ],
    starterCode: {
      html: '<h1>节拍器</h1>\n\n<div class="metronome-box">\n  <p id="display">点击开始</p>\n  <div class="controls">\n    <button id="startBtn">▶ 开始节拍</button>\n    <button id="stopBtn">⏸ 暂停</button>\n    <button id="resetBtn">↺ 重置</button>\n  </div>\n</div>',
      css: 'h1 {\n  text-align: center;\n  color: #8B2E2E;\n}\n\n.metronome-box {\n  text-align: center;\n  background: #FFFAF2;\n  border: 2px solid #D4C5A9;\n  border-radius: 16px;\n  padding: 32px;\n  max-width: 380px;\n  margin: 20px auto;\n}\n\n#display {\n  font-size: 36px;\n  font-weight: 700;\n  color: #8B2E2E;\n  min-height: 50px;\n  margin-bottom: 20px;\n}\n\n.controls {\n  display: flex;\n  gap: 8px;\n  justify-content: center;\n}\n\n.controls button {\n  padding: 10px 20px;\n  background: #8B2E2E;\n  color: #fff;\n  border: none;\n  border-radius: 8px;\n  font-size: 14px;\n  cursor: pointer;\n}\n\n.controls button:hover {\n  background: #C94545;\n}\n\n#stopBtn {\n  background: #6B5A4E;\n}\n\n#resetBtn {\n  background: #C9A96E;\n}',
      js: 'let count = 0;\nlet timer = null;\nlet display = document.querySelector("#display");\n\nlet startBtn = document.querySelector("#startBtn");\nlet stopBtn = document.querySelector("#stopBtn");\nlet resetBtn = document.querySelector("#resetBtn");\n\nstartBtn.addEventListener("click", function() {\n  if (timer) return;  // 防止重复启动\n\n  timer = setInterval(function() {\n    count++;\n    display.textContent = `节拍 ${count}`;\n  }, 1000);\n});\n\nstopBtn.addEventListener("click", function() {\n  clearInterval(timer);\n  timer = null;\n});\n\nresetBtn.addEventListener("click", function() {\n  clearInterval(timer);\n  timer = null;\n  count = 0;\n  display.textContent = "点击开始";\n});'
    }
  },

  // ===== 4.15 JS 综合项目 =====
  {
    id: 'js-capstone',
    chapterId: 'js-basics',
    order: 15,
    title: '综合项目 — 交互式音乐名片生成器',
    musicAnalogy: '一场完整的**交响音乐会**需要乐谱（HTML）、演奏法（CSS）和指挥家（JS）三者协作。这节综合课把前 11 节课的知识融合在一起：用变量存储数据、用数组和对象组织信息、用循环批量渲染、用条件判断做决策、用事件和定时器让一切互动起来。',
    listenTo: '贝多芬《第九交响曲》第四乐章"欢乐颂"— 乐队与人声完美融合，所有乐器组协作奏出壮丽的终章，就像 HTML、CSS、JS 合力构建出完整的交互体验。',
    sections: [
      {
        type: 'explain',
        title: '你学会了什么？',
        content: '回顾 JavaScript 入门篇你学过的所有技能：\n\n| 技能 | 知识点 |\n|------|--------|\n| 变量 | `let`, `const`, 字符串, 模板字符串 |\n| 函数 | `function`, 参数, `return` |\n| 条件判断 | `if/else`, `===`, `&&`, `> <` |\n| 数组 | `[]`, `.push()`, `.join()`, `.length` |\n| 循环 | `forEach`, `for` |\n| DOM 选择 | `querySelector`, `querySelectorAll` |\n| DOM 操作 | `.textContent`, `.innerHTML`, `createElement`, `.remove()` |\n| 事件 | `addEventListener("click", ...)` |\n| 样式控制 | `.style`, `.classList` |\n| 定时器 | `setInterval`, `setTimeout`, `clearInterval` |\n\n现在把这些知识组合起来，做一个**交互式音乐名片生成器**！'
      },
      {
        type: 'task',
        title: '逐步构建 ✨',
        content: '编辑器里已经有了一个模板，包含作曲家数组和基础结构。请按以下步骤完善：\n\n**第一步：理解现有代码**\n- 查看 JS 标签页，理解 `composers` 对象数组的结构\n- 查看 `showGallery()` 函数如何用 `forEach` 循环渲染卡片\n\n**第二步：添加筛选功能**\n- "全部"按钮应显示所有作曲家\n- "浪漫主义"按钮只显示 `period === "浪漫主义"` 的\n- "巴洛克"按钮略...（新增一个按钮和逻辑）\n\n**第三步：完善"添加"功能**\n- 让"添加"按钮真正把新对象 push 到数组中\n- 调用 `showGallery()` 刷新显示\n\n**第四步：增加你自己的创意**\n- 给卡片加 hover 高亮效果\n- 加一个自动播放按钮（用 setInterval 定时切换高亮）\n- 任何你想加的功能！'
      },
      {
        type: 'hint',
        title: '提示',
        content: '- `composers.filter(function(c) { return c.period === "浪漫主义"; })` 可以过滤数组\n- 修改 DOM 后记得重新调用渲染函数\n- 如果卡住了，回顾前几节课的代码示例\n- 完成之后，这就是你的**第四章毕业作品**！🎉'
      }
    ],
    starterCode: {
      html: '<h1>交互式音乐名片</h1>\n\n<div class="toolbar">\n  <button id="showAllBtn" class="active">全部</button>\n  <button id="showRomanticBtn">浪漫主义</button>\n  <button id="showClassicalBtn">古典主义</button>\n</div>\n\n<div id="gallery"></div>\n\n<div class="add-bar">\n  <span class="hint">💡 试试添加一位作曲家：</span>\n  <button id="addBtn">➕ 随机添加</button>\n</div>',
      css: 'h1 {\n  text-align: center;\n  color: #8B2E2E;\n  margin-bottom: 12px;\n}\n\n.toolbar {\n  display: flex;\n  gap: 8px;\n  justify-content: center;\n  margin-bottom: 16px;\n}\n\n.toolbar button {\n  padding: 8px 20px;\n  background: #FFFAF2;\n  border: 1px solid #D4C5A9;\n  border-radius: 6px;\n  font-size: 13px;\n  cursor: pointer;\n  color: #3D2B1F;\n  transition: all 0.2s;\n}\n\n.toolbar button:hover {\n  background: #8B2E2E;\n  color: #fff;\n}\n\n.toolbar button.active {\n  background: #8B2E2E;\n  color: #fff;\n  border-color: #8B2E2E;\n}\n\n#gallery {\n  display: flex;\n  gap: 12px;\n  flex-wrap: wrap;\n  justify-content: center;\n  min-height: 80px;\n}\n\n.card {\n  background: #FFFAF2;\n  border: 1px solid #D4C5A9;\n  border-radius: 10px;\n  padding: 20px;\n  text-align: center;\n  min-width: 150px;\n  transition: all 0.3s;\n}\n\n.card:hover {\n  border-color: #C9A96E;\n  transform: translateY(-2px);\n  box-shadow: 0 4px 12px rgba(61, 43, 31, 0.1);\n}\n\n.card h2 {\n  color: #8B2E2E;\n  margin: 0 0 6px 0;\n  font-size: 17px;\n}\n\n.card .period {\n  color: #C9A96E;\n  font-size: 12px;\n  font-weight: 600;\n}\n\n.card p {\n  color: #6B5A4E;\n  margin: 4px 0 0 0;\n  font-size: 13px;\n}\n\n.add-bar {\n  text-align: center;\n  margin-top: 20px;\n}\n\n.add-bar .hint {\n  color: #C9A96E;\n  font-size: 13px;\n  margin-right: 8px;\n}\n\n.add-bar button {\n  padding: 10px 24px;\n  background: #8B2E2E;\n  color: #fff;\n  border: none;\n  border-radius: 8px;\n  font-size: 14px;\n  cursor: pointer;\n}\n\n.add-bar button:hover {\n  background: #C94545;\n}',
      js: '// 作曲家数据（对象数组）\nlet composers = [\n  { name: "巴赫", period: "巴洛克", piece: "赋格的艺术" },\n  { name: "莫扎特", period: "古典主义", piece: "魔笛" },\n  { name: "贝多芬", period: "古典主义", piece: "命运交响曲" },\n  { name: "肖邦", period: "浪漫主义", piece: "夜曲" },\n  { name: "舒曼", period: "浪漫主义", piece: "童年情景" },\n  { name: "德彪西", period: "印象派", piece: "月光" }\n];\n\nlet gallery = document.querySelector("#gallery");\n\n// 渲染画廊（接收数组参数）\nfunction showGallery(list) {\n  let html = "";\n  list.forEach(function(c) {\n    html += `\n      <div class="card">\n        <h2>${c.name}</h2>\n        <div class="period">${c.period}</div>\n        <p>《${c.piece}》</p>\n      </div>\n    `;\n  });\n  gallery.innerHTML = html;\n}\n\n// 初始显示全部\nshowGallery(composers);\n\n// 切换激活按钮样式\nfunction setActive(btn) {\n  document.querySelectorAll(".toolbar button").forEach(function(b) {\n    b.classList.remove("active");\n  });\n  btn.classList.add("active");\n}\n\n// 筛选按钮\ndocument.querySelector("#showAllBtn").addEventListener("click", function() {\n  setActive(this);\n  showGallery(composers);\n});\n\ndocument.querySelector("#showRomanticBtn").addEventListener("click", function() {\n  setActive(this);\n  let filtered = composers.filter(function(c) {\n    return c.period === "浪漫主义";\n  });\n  showGallery(filtered);\n});\n\ndocument.querySelector("#showClassicalBtn").addEventListener("click", function() {\n  setActive(this);\n  let filtered = composers.filter(function(c) {\n    return c.period === "古典主义";\n  });\n  showGallery(filtered);\n});\n\n// 随机添加（预设数据池）\nlet pool = [\n  { name: "柴可夫斯基", period: "浪漫主义", piece: "天鹅湖" },\n  { name: "海顿", period: "古典主义", piece: "惊愕交响曲" },\n  { name: "拉威尔", period: "印象派", piece: "波莱罗" }\n];\n\nlet added = 0;\ndocument.querySelector("#addBtn").addEventListener("click", function() {\n  if (added < pool.length) {\n    composers.push(pool[added]);\n    added++;\n    showGallery(composers);\n  }\n});'
    }
  }
]

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

  // ===== 1.2 文本与强调 =====
  {
    id: 'html-emphasis',
    chapterId: 'html-basics',
    order: 2,
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

  // ===== 1.3 列表 =====
  {
    id: 'html-lists',
    chapterId: 'html-basics',
    order: 3,
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

  // ===== 1.4 图片与链接 =====
  {
    id: 'html-images-links',
    chapterId: 'html-basics',
    order: 4,
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
  }
]

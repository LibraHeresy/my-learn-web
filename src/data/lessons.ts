import type { Lesson, Chapter } from "../types";

export const chapters: Chapter[] = [
  {
    id: "html-basics",
    title: "第一章：HTML 基础",
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
  // 第一章：HTML 基础
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
    },

  // ===== 2.8 css-animations =====
  {
    id: 'css-animations',
    chapterId: 'css-style',
    order: 8,
    title: 'CSS 动画深入 — 让页面充满律动',
    musicAnalogy: '如果说 transition 是渐强记号（从 pp 平滑到 ff），那么 @keyframes 就是一段完整的节奏型——精确控制每个时间点的状态。animation 属性像乐谱上的演奏法标记：duration 是速度、delay 是休止符的长短、iteration-count 是反复次数、direction 是顺奏还是逆行。把多种动画组合起来，就像配器——让不同乐器的声部同时进行。',
    listenTo: '斯特拉文斯基《春之祭》— 复杂的节奏型、不规则的拍号、多个声部的交错进行，就像页面中同时运行的多个 @keyframes 动画。每一个拍点都精确计算，却产生了震撼人心的效果。',
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
    mode: "local",
  },

];

// 编程术语词库 — 每个术语有中文解释和音乐类比
// key 为术语的中文/英文写法，在课程内容中自动识别并显示 tooltip

export interface TermDef {
  explanation: string
  analogy?: string
}

// 按 key 长度降序排列——长术语优先匹配，避免"标签"先于"标签对"匹配
export const glossary: [string, TermDef][] = [
  ['Information Management: A Proposal', {
    explanation: '1945年 Vannevar Bush 发表的文章，首次提出 Memex 概念——一个可以存储、检索个人信息的设备雏形，被视为超文本思想的源头。',
    analogy: '就像一份畅想未来的提案——很多伟大的技术都始于一篇看似遥不可及的论文。'
  }],
  ['Asynchronous JavaScript And XML', {
    explanation: 'Ajax 的全称——异步 JavaScript 和 XML。核心技术：用 XMLHttpRequest 在不刷新页面的情况下向服务器请求数据并局部更新页面。'
  }],
  ['Attention is All You Need', {
    explanation: '2017年 Google 研究团队发表的里程碑论文——提出了 Transformer 架构。论文标题的意思是「注意力机制就是你需要的全部」，这句话改写了 AI 的历史。'
  }],
  ['animation-timing-function', {
    explanation: 'CSS 动画的时间函数——控制动画在时间轴上的速度曲线。常用值：ease（默认，慢→快→慢）、linear（匀速）、ease-in（慢→快）、ease-out（快→慢）。',
    analogy: '就像扬琴曲中的速度变化——渐快（accelerando）或渐慢（ritardando），决定了音乐推进的"感觉"是平滑均匀还是起伏变化。'
  }],
  ['animation-iteration-count', {
    explanation: 'CSS 动画的播放次数——可以设置具体数字（如 3 次）或 infinite（无限循环）。英文原意是「迭代次数」。',
    analogy: '就像乐谱上的反复记号——Da Capo al Fine 表示从头反复到 Fine，可以指定反复几次。'
  }],
  ['addEventListener("click"', {
    explanation: '监听元素的点击事件——用户点击时触发',
    analogy: '就像按下钢琴琴键——按下这个动作触发声音'
  }],
  ['模板字符串（Template Literal）', {
    explanation: '用反引号 ` 包裹的字符串，可在其中用 ${} 嵌入变量表达式',
    analogy: '就像写有空白格子的乐谱模板——把音符填入空格就成了一首新曲子'
  }],
  ['box-sizing: border-box', {
    explanation: '宽高计算包含 padding 和 border，更方便布局计算',
    analogy: '就像算乐器箱子的总尺寸时，把内衬和外壳都算进去'
  }],
  ['document.querySelector', {
    explanation: '从整个页面文档中选中一个元素',
    analogy: '就像从总谱中找出某一个特定的小节'
  }],
  ['grid-template-columns', {
    explanation: '定义 Grid 布局的列宽',
    analogy: '就像确定乐谱上每行小节的数量和宽度'
  }],
  ['Vague but exciting.', {
    explanation: '1989年 Tim Berners-Lee 提交万维网提案时，上司在封面写的批注——意思是「模糊但令人兴奋」。这句轻描淡写的话开启了整个 Web 时代。',
    analogy: '就像导师在学生的创新课题申报书上批的"想法天马行空，但万一成了呢"——历史上最重要的创新往往始于模糊的兴奋。'
  }],
  ['animation-fill-mode', {
    explanation: 'CSS 动画的填充模式——控制动画执行前后元素的状态。常用值：none（默认，不保留）、forwards（保留结束状态）、backwards（动画开始前就应用初始状态）、both（同时保留前后状态）。',
    analogy: '就像演奏前先摆好起始手型（backwards），弹完后保持最后的余音姿势（forwards）——不让元素"弹回"到动画前的样子。'
  }],
  ['animation-direction', {
    explanation: 'CSS 动画的播放方向——normal（正向）、reverse（反向）、alternate（来回交替）。英文原意是「方向」。',
    analogy: '就像演奏中的顺奏与逆行——可以正向弹、倒着弹、或者正反交替进行。'
  }],
  ['Gemini Code Assist', {
    explanation: 'Google 2024年发布的 AI 编程助手——基于 Gemini 模型，集成在 VS Code 和 IntelliJ 等 IDE 中。'
  }],
  ['animation-duration', {
    explanation: 'CSS 动画属性——设置动画完成一个周期所需的时间。如 1s 表示1秒，0.5s 表示0.5秒。值越小动画越快。'
  }],
  ['encodeURIComponent', {
    explanation: '将中文字符等特殊字符转义为 URL 安全的编码格式——中文不能直接放在 URL 中',
    analogy: '就像把中文曲名翻译成国际通用的意大利语术语——让全世界的乐团都能识读'
  }],
  ['position: absolute', {
    explanation: '元素脱离正常文档流，相对于最近的定位祖先定位',
    analogy: '就像协奏曲中的独奏者——从乐队中走出来站在前面'
  }],
  ['Douglas Crockford', {
    explanation: 'JavaScript 领域的重量级人物——JSON 格式的发明者，著有《JavaScript: The Good Parts》，是 JS 社区最具影响力的布道者之一。'
  }],
  ['Sun Microsystems', {
    explanation: '1982年创立的计算机公司——Java 语言的创造者，SPARC 工作站和 Solaris 系统在早期 Web 服务器中广泛使用。2009年被 Oracle 收购。'
  }],
  ['addEventListener', {
    explanation: '给元素绑定一个事件监听器——当用户触发某个动作（如点击）时，执行指定的函数',
    analogy: '就像指挥给某个乐器声部指定一个进入信号——信号一到，立刻演奏'
  }],
  ['querySelectorAll', {
    explanation: '选中所有匹配指定选择器的元素，返回一个列表',
    analogy: '就像指挥同时命令整个弦乐声部做同一个动作'
  }],
  ['AI Coding Agent', {
    explanation: 'AI 编程智能体——能自主完成复杂编程任务的 AI，包括读代码、写代码、运行测试、调试修复。区别于简单补全，Agent 能独立规划和执行多步骤的开发任务。'
  }],
  ['justify-content', {
    explanation: 'Flex 容器中沿主轴对齐子元素的方式',
    analogy: '就像指挥调整各声部在舞台上的横向间距'
  }],
  ['linear-gradient', {
    explanation: '线性渐变——颜色沿一条直线平滑过渡',
    analogy: '就像竖琴的滑奏——音高从低到高连续变化'
  }],
  ['position: fixed', {
    explanation: '元素脱离正常文档流，固定在浏览器窗口的指定位置，滚动也不动',
    analogy: '就像指挥台——不管乐队怎么换位，指挥始终站在正前方'
  }],
  ['timing-function', {
    explanation: 'CSS 动画的时间函数——控制动画在时间轴上的速度曲线。常用值：ease（慢→快→慢）、linear（匀速）、ease-in（慢→快）、ease-out（快→慢）。',
    analogy: '就像扬琴曲中的速度变化——渐快或渐慢，决定了音乐推进的"感觉"是平滑均匀还是起伏变化。'
  }],
  ['animation-delay', {
    explanation: 'CSS 动画的延迟时间——设置动画在开始前等待多久。英文原意是「延迟」。',
    analogy: '就像演奏开始前的静默——指挥抬手后才开始奏响第一个音符，中间的停顿就是 delay。'
  }],
  ['XMLHttpRequest', {
    explanation: '浏览器提供的 API 对象——在不刷新页面的情况下与服务器交换数据。它是 Ajax 技术的核心，2005年被 Google 在 Gmail 和 Google Maps 中大量使用后成为 Web 2.0 的基石。'
  }],
  ['盒模型（Box Model）', {
    explanation: '每个元素都是一个矩形盒子，从外到内由 margin → border → padding → content 四层组成',
    analogy: '就像一件乐器的包装——外箱是 margin、箱壁是 border、内衬是 padding、乐器本身是 content'
  }],
  ['回调函数（Callback）', {
    explanation: '作为参数传给另一个函数的函数，在某个时刻被"回调"执行',
    analogy: '就像指挥给首席小提琴一个提示——当指挥棒落下时，你就开始独奏'
  }],
  ['flex-direction', {
    explanation: 'Flex 容器中主轴的方向（横排还是竖排）',
    analogy: '就像决定声部从左到右排还是从前到后排'
  }],
  ['preventDefault', {
    explanation: '阻止元素的默认行为（如阻止表单提交后刷新页面）',
    analogy: '就像指挥临时叫停一个自动重复的乐段'
  }],
  ['localhost:5173', {
    explanation: 'Vite 开发服务器默认地址——5173 是 Vite 默认使用的端口号，一个电脑上可能同时运行多个服务，每个占一个端口。',
    analogy: '就像琴房号码——5173 号琴房是你的专属排练室，同一栋楼里还有其他琴房（其他端口），互不干扰。'
  }],
  ['letter-spacing', {
    explanation: 'CSS 属性——控制字符之间的水平间距。值越大字越疏朗，适合做标题呼吸感。值可用 em 单位相对于字体大小。',
    analogy: '就像音符之间的间距——拉宽了读起来轻松悠扬，收紧了显得紧张密集。'
  }],
  ['Copilot Agent', {
    explanation: 'GitHub 2024年发布的 AI 编程代理模式——Copilot 从代码补全升级为能自主读取项目、规划任务、修改多个文件的智能代理。'
  }],
  ['style.display', {
    explanation: 'JS 中控制元素的显示方式——设置 display 属性来显示或隐藏元素。"" 表示恢复默认，`none` 表示隐藏。',
    analogy: '就像舞台上聚光灯的开关——决定哪个乐器组被观众看到、哪个暂时退到幕后。'
  }],
  ['border-radius', {
    explanation: '给元素设置圆角',
    analogy: '就像把方形的乐谱纸张裁出圆角——柔化边缘，更友好'
  }],
  ['createElement', {
    explanation: '用 JS 动态创建一个新的 HTML 元素',
    analogy: '就像在演奏过程中临时增加一件乐器'
  }],
  ['display: flex', {
    explanation: '启用 Flexbox 布局——子元素在一维方向上灵活排列',
    analogy: '就像将弦乐组排成一行——每个演奏者之间保持均等间距'
  }],
  ['display: grid', {
    explanation: '启用 CSS Grid 布局——子元素在二维网格中排列',
    analogy: '就像管弦乐队在舞台上的座次表——有行有列，每个位置都有安排'
  }],
  ['querySelector', {
    explanation: '选中第一个匹配指定选择器的元素',
    analogy: '就像指挥指向某一位独奏者'
  }],
  ['WorldWideWeb', {
    explanation: '1990年 Tim Berners-Lee 开发的世界上第一个浏览器——同时也是编辑器。万维网由此诞生。'
  }],
  ['tree-shaking', {
    explanation: '打包工具的优化技术——自动移除代码中未被引用的「死代码」，就像摇树把枯叶摇掉。webpack 和 Rollup 都支持。'
  }],
  ['OpenAI Codex', {
    explanation: 'OpenAI 2021年发布的代码生成模型——能把自然语言描述转成代码，是 GitHub Copilot 背后的引擎。'
  }],
  ['属性（Property）', {
    explanation: 'CSS 中你想设置的样式特征，如 color、font-size——每个属性后面跟一个值',
    analogy: '就像乐谱上标注的音高、力度、速度——每个标注都有具体的值'
  }],
  ['DOCTYPE html', {
    explanation: '文档类型声明——必须写在 HTML 文件第一行，告诉浏览器"这是 HTML5 页面"。不是真正的 HTML 标签。',
    analogy: '就像乐谱第一行写的"扬琴独奏谱"——翻开就知道这是什么类型的乐谱、用什么记谱法。'
  }],
  ['GitHub Pages', {
    explanation: 'GitHub 提供的免费静态网站托管服务——把你的前端项目变成公开可访问的网址',
    analogy: '就像把乐谱装订成册放在公共图书馆的书架上——任何人都可以取阅'
  }],
  ['localStorage', {
    explanation: '浏览器提供的本地存储——数据保存在用户电脑上，关闭浏览器也不会丢失',
    analogy: '就像你把乐谱收藏在自己的谱架上——下次打开还在那里'
  }],
  ['package.json', {
    explanation: 'Node.js 项目的配置文件——记录项目名称、依赖包、可运行脚本等信息',
    analogy: '就像音乐会的节目单——一看就知道演什么、需要多少乐手、由谁指挥'
  }],
  ['script setup', {
    explanation: 'Vue 3 组合式 API 的语法糖——在 .vue 文件中更简洁地编写组件逻辑，定义的变量和函数自动暴露给模板',
    analogy: '就像总谱上用简记符号代替完整的演奏说明——熟练之后，一个记号抵得上一段话'
  }],
  ['node_modules', {
    explanation: 'Node.js 项目的依赖文件夹——npm install 后自动生成，包含项目用到的所有第三方包。体积很大，绝不能提交到 Git（应加入 .gitignore）。',
    analogy: '就像演奏前从乐谱库借来的所有分谱——不是你的原创，用的时候拿过来，不用自己存。别人也可以通过节目单（package.json）自己借到同样的谱子。'
  }],
  ['Transformer', {
    explanation: 'Google 2017年提出的神经网络架构——用自注意力机制替代传统的循环和卷积。它是 ChatGPT、Claude 等所有大语言模型的底层架构基础。'
  }],
  ['Claude Code', {
    explanation: 'Anthropic 2025年发布的 AI 编程工具——运行在终端中，能读写文件、执行命令、管理 Git，像一个全能的 AI 工程师。'
  }],
  ['appendChild', {
    explanation: 'DOM 方法——将一个元素作为子节点添加到另一个元素末尾。需要先用 createElement 创建新元素。',
    analogy: '就像在乐谱的末尾增加一段新的旋律——新增的内容附加在已有内容之后。'
  }],
  ['removeChild', {
    explanation: 'DOM 方法——从父元素中移除一个子元素。与 appendChild 相反的操作。',
    analogy: '就像从节目单中划掉一首曲目——该声部退出演奏。'
  }],
  ['Computed 面板', {
    explanation: '浏览器 DevTools 中的一个面板——显示元素最终生效的 CSS 样式，可以看哪些规则被覆盖了（划删除线）。',
    analogy: '就像总谱上最终的演奏标记汇总——有些记号被后来的修改覆盖了，划掉的就是被替代的旧版本。'
  }],
  ['Elements 面板', {
    explanation: '浏览器 DevTools 中最常用的面板——显示页面的 HTML 结构树，可以查看、编辑每个元素的标签和属性。按 F12 打开。',
    analogy: '就像翻开总谱查看每个声部的详细记谱——每一行、每一个标记都一目了然。'
  }],
  ['层叠（Cascade）', {
    explanation: 'CSS 的核心理念——多条规则可能同时作用于一个元素，浏览器按权重和顺序决定最终样式',
    analogy: '就像乐队中多个声部同时发声——指挥决定哪一声部在此时最突出'
  }],
  ['事件对象（event）', {
    explanation: '事件触发时浏览器自动创建的参数，包含事件的详细信息（如哪个元素被点击、按了哪个键）',
    analogy: '就像演出记录单——记录了谁在什么时间、以什么方式演奏了什么'
  }],
  ['align-items', {
    explanation: 'Flex 容器中沿交叉轴对齐子元素的方式',
    analogy: '就像确保所有乐手的谱架在同一高度'
  }],
  ['async/await', {
    explanation: 'ES2017 引入的异步语法——用同步的写法处理异步操作，await 会等待 Promise 完成再继续',
    analogy: '就像指挥等待一个声部完成独奏段落后再给下一个声部进入手势——看起来是同步指挥，实际在等一个异步完成的乐句'
  }],
  ['ease-in-out', {
    explanation: 'CSS 动画时间函数——动画慢速开始和结束、中间加速。英文原意是「缓入缓出」。'
  }],
  ['placeholder', {
    explanation: '📍 特有属性。占位提示文字——input 和 textarea 特有。输入框为空时显示的灰色提示，一开始输入就消失。',
    analogy: '就像考级报名表填空线上用铅笔浅浅写的"请在此处填写姓名"——提示你填什么，正式写的时候覆盖掉。'
  }],
  ['setInterval', {
    explanation: '每隔指定毫秒数重复执行一个函数，像一个永不停歇的节拍器',
    analogy: '就像节拍器哒哒哒地持续打拍子'
  }],
  ['text-shadow', {
    explanation: '给文字添加阴影效果',
    analogy: '就像聚光灯下乐手在幕布上的投影——增加文字的立体感和氛围'
  }],
  ['textContent', {
    explanation: '获取或设置元素的纯文本内容（不含 HTML 标签）',
    analogy: '就像只读歌词，不管谱号调号'
  }],
  ['flex-shrink', {
    explanation: 'CSS Flexbox 属性——控制弹性元素在空间不足时的收缩比例。默认 1（可以收缩），0 表示不收缩保持原尺寸。',
    analogy: '就像舞台上空间不够时，哪些乐器组可以挤一挤（shrink），哪些必须保持自己的位置（不收缩）。'
  }],
  ['font-family', {
    explanation: 'CSS 属性——设置文字的字体。可指定多个字体用逗号分隔，浏览器按顺序查找第一个可用的。最后应写通用字体族（如 serif、sans-serif）作为后备。',
    analogy: '就像指定演奏者——"请小提琴独奏，如果小提琴手不在，请中提琴代替，再不行就钢琴"。按优先级排好替补名单，总有人能上场。'
  }],
  ['font-weight', {
    explanation: 'CSS 属性——控制文字的粗细。可用数值（100~900）或关键字（normal=400、bold=700、lighter、bolder）。数字越大字体越粗。',
    analogy: '就像演奏力度的标记——normal 是 mf（中强），bold 是 f（强），100 是 ppp（极弱），900 是 fff（极强）。粗细就是文字的"力度"。'
  }],
  ['Windows XP', {
    explanation: '微软 2001 年发布的操作系统——预装 IE6 浏览器，由于 XP 的世纪性普及，IE6 成了前端开发者长达十年的兼容噩梦。'
  }],
  ['TypeScript', {
    explanation: '微软 2012年发布的开源语言——JavaScript 的超集，添加了静态类型检查。大型项目中能提前发现大量错误，已成为前端主流。'
  }],
  ['mouseenter', {
    explanation: '鼠标进入元素区域时触发的事件——只在首次进入时触发一次，不会冒泡。与 mouseover 不同，进入子元素不会重复触发。',
    analogy: '就像指挥棒首次指向某个乐器组——只在指向的瞬间给出指示，不会因为乐器组内的人员变动而重复示意。'
  }],
  ['mouseleave', {
    explanation: '鼠标离开元素区域时触发的事件——只在完全离开时触发一次，不会冒泡。与 mouseout 不同，离开到子元素不会触发。',
    analogy: '就像指挥棒从某个乐器组移开——只在离开时给出一个收束手势。'
  }],
  [':nth-child', {
    explanation: '匹配父元素中第 n 个子元素的伪类选择器',
    analogy: '就像指定"第三小提琴手"——精确到排位'
  }],
  ['!important', {
    explanation: 'CSS 中的强制优先级标记，盖过所有普通规则的权重计算',
    analogy: '就像独奏段落中所有伴奏都必须给独奏让路——但它破坏了正常的和声层级，应尽量少用'
  }],
  ['@keyframes', {
    explanation: 'CSS 动画的关键帧规则——定义动画在每一步的状态',
    analogy: '就像乐谱上标注的每一小节的力度变化记号'
  }],
  ['background', {
    explanation: 'CSS 简写属性——设置元素的背景色、背景图等。英文原意是「背景」。'
  }],
  ['blockquote', {
    explanation: '块级引用标签——用于引用大段外部内容（如文章摘录、名人名言），浏览器默认会缩进显示。',
    analogy: '就像在乐谱中引用一段其他作曲家的旋律——用引号标记出来，告诉读者"这不是我的原创"。'
  }],
  ['box-shadow', {
    explanation: '给元素添加投影阴影效果，让卡片从平面中浮现',
    analogy: '就像舞台聚光灯打在乐手身上产生的立体感'
  }],
  ['capitalize', {
    explanation: 'CSS text-transform 的值——每个单词首字母大写。英文原意是「首字母大写」。'
  }],
  ['JavaScript', {
    explanation: '网页的编程语言——让页面有交互、动起来',
    analogy: '就像指挥家——让静态的乐谱活起来'
  }],
  ['JSON.parse', {
    explanation: '将 JSON 格式的字符串转换为 JavaScript 对象',
    analogy: '就像把纸上写的乐谱翻译成实际演奏——从符号变成可以操作的数据'
  }],
  ['setTimeout', {
    explanation: '在指定毫秒数之后执行一次函数（只执行一次）',
    analogy: '就像指挥给某个声部一个延后进入的提示——等两小节再开始'
  }],
  ['transition', {
    explanation: 'CSS 过渡——让属性值的变化平滑动画化',
    analogy: '就像从一个调性转到另一个调性时的模进过渡，不是突然跳跃而是自然滑入'
  }],
  ['translateY', {
    explanation: 'CSS transform 函数——沿 Y 轴（垂直方向）移动元素。如 translateY(30px) 向下30像素，负数向上。英文原意是「沿Y轴平移」。'
  }],
  ['object-fit', {
    explanation: 'CSS 属性——控制图片或视频在容器内的填充方式。cover（裁剪填满）、contain（完整显示不裁剪）、fill（拉伸变形）。',
    analogy: '就像把一张大照片放进相框——可以裁掉多余部分（cover）、缩到能完整显示（contain）、或者强行拉变形（fill）。'
  }],
  ['text-align', {
    explanation: 'CSS 属性——控制文字的水平对齐方式。left（左对齐）、center（居中）、right（右对齐）、justify（两端对齐，拉大字间距填满整行）。',
    analogy: '就像舞台上合唱团的站队——可以靠左站、居中对齐、靠右排列，justify 则是均匀拉开填满整个舞台宽度。'
  }],
  ['hypertext', {
    explanation: '超文本——通过链接把不同文档关联在一起的文本系统。HTML 中的 HT 就是 HyperText。点击一个词就跳到相关页面。'
  }],
  ['Wikipedia', {
    explanation: '2001年上线的自由百科全书——任何人都可以编辑，是 Web 2.0 用户协作模式的标志性代表。'
  }],
  ['Anthropic', {
    explanation: '2021年由前 OpenAI 研究员创立的 AI 公司——以 AI 安全为核心使命，开发了 Claude 系列模型。'
  }],
  ['classList', {
    explanation: 'DOM 元素的类名列表对象——提供了 add、remove、toggle、contains 等方法操作 CSS class',
    analogy: '就像调整乐团某个声部的角色标签——随时可以加上"主奏"、去掉"伴奏"、或在两者之间切换。'
  }],
  ['alternate', {
    explanation: 'CSS animation-direction 的值——动画在奇数遍正向播放、偶数遍反向播放。英文原意是「交替的」。'
  }],
  ['backwards', {
    explanation: 'CSS animation-fill-mode 的值——在动画开始前就应用第一帧的样式。英文原意是「向后」。'
  }],
  ['fill-mode', {
    explanation: 'CSS 动画的填充模式——控制动画执行前后元素的状态。常用值：none（不保留）、forwards（保留结束状态）、backwards（开始前应用初始状态）、both。',
    analogy: '就像演奏前先摆好起始手型，弹完后保持最后的余音姿势——不让元素"弹回"到动画前的样子。'
  }],
  ['innerHTML', {
    explanation: '获取或设置元素内部的 HTML 内容（可包含标签）',
    analogy: '就像把一整段乐谱（含所有标记）塞进一个声部'
  }],
  ['localhost', {
    explanation: '本地开发服务器地址，127.0.0.1 的别名——只有你自己的电脑能访问，用于开发时预览',
    analogy: '就像排练厅里给自己试听——只有你能听到，正式演出时才向观众开放'
  }],
  ['lowercase', {
    explanation: 'CSS text-transform 的值——将所有字母转为小写。英文原意是「小写字母」。'
  }],
  ['transform', {
    explanation: 'CSS 变换——对元素进行位移、旋转、缩放等操作',
    analogy: '就像一段旋律的移调、倒影或逆行——核心不变，形态改变'
  }],
  ['translate', {
    explanation: 'CSS transform 函数——将元素沿 X/Y 轴平移（移动位置）。如 translate(100px, 0) 表示向右移动100像素。英文原意是「平移、移动」。'
  }],
  ['try/catch', {
    explanation: '错误处理语句——try 块中放可能出错的代码，catch 块中处理错误，避免整个程序崩溃',
    analogy: '就像排练时万一这个高音没上去，立刻切换到备选方案，演出继续'
  }],
  ['undefined', {
    explanation: 'JavaScript 特殊值——变量声明了但没赋值时的默认值，表示「未定义」。英文原意是「未定义的」。'
  }],
  ['underline', {
    explanation: 'CSS text-decoration 的值——文字下划线。英文原意是「下划线」。'
  }],
  ['unordered', {
    explanation: '无序的——在 HTML 中，ul（unordered list）就是无序列表，列表项前面是圆点而非数字。',
    analogy: '就像随手写的练琴备选曲目——先弹哪首都行，没有固定的先后顺序。'
  }],
  ['uppercase', {
    explanation: 'CSS text-transform 的值——将所有字母转为大写。英文原意是「大写字母」。'
  }],
  ['polyfill', {
    explanation: '一段代码用来在旧浏览器中模拟现代 Web API——让新特性在老环境中也能工作。就像补牙材料填平坑洞。'
  }],
  ['Facebook', {
    explanation: '2004年成立的社交网络平台——改变了互联网信息传播方式，催生了前端框架（React 就是 Facebook 开发的）。'
  }],
  ['Windsurf', {
    explanation: 'Codeium 公司 2024年发布的 AI 编程 IDE——以「流式 AI 编程」为特色，AI 能自动理解项目上下文并提供流畅的编码体验。'
  }],
  ['DevTools', {
    explanation: '浏览器开发者工具——按 F12 打开。包含 Elements（元素）、Console（控制台）、Sources（源码）、Network（网络）等面板，是前端开发最常用的调试工具。',
    analogy: '就像音乐家的调音器和节拍器——不是演出用的乐器，但排练和调试时离不开它们。'
  }],
  ['::before', {
    explanation: '在元素内容之前插入装饰性内容的伪元素',
    analogy: '就像乐曲开头的引子——不是主题本身，但为主题做铺垫'
  }],
  ['absolute', {
    explanation: 'CSS position 的值——元素脱离正常文档流，相对于最近的非 static 定位祖先定位。英文原意是「绝对的」。',
    analogy: '就像独奏者从乐队中走出来站在前面。'
  }],
  ['autoplay', {
    explanation: '📍 特有 + 🔘 布尔。自动播放——audio 和 video 特有。页面加载后自动播放（浏览器通常会阻止）。',
    analogy: '就像自动弹奏扬琴——一开机就开始弹。但大多数场合你需要先按"开始"。'
  }],
  ['checkbox', {
    explanation: '复选框——input 的 type="checkbox" 用来创建多选按钮。用户可以同时勾选多个选项。',
    analogy: '就像报名表上的"你会的乐器：扬琴□ 钢琴□ 古筝□"——可以多选。和 radio（单选）不同，checkbox 是互不排斥的。'
  }],
  ['computed', {
    explanation: 'Vue 中基于已有数据自动计算派生值的函数——依赖的数据变了，结果自动更新，且带有缓存',
    analogy: '就像从主旋律自动推导出和声——旋律一改，和声自动跟着变，不用手动重算'
  }],
  ['controls', {
    explanation: '📍 特有 + 🔘 布尔。显示播放控件——audio 和 video 特有。写了就有播放/暂停/音量按钮。',
    analogy: '就像音响的遥控器——有它就能操作播放，没它就只是一个不能互动的黑盒子。'
  }],
  ['disabled', {
    explanation: '📍 特有 + 🔘 布尔。禁用表单控件——input、select、textarea、button 特有。写了就让控件变灰、不可点击。',
    analogy: '就像扬琴上暂时被锁住的弦——看得见但弹不了，暂时不能用。'
  }],
  ['document', {
    explanation: '浏览器中的文档对象——代表整个 HTML 页面，JS 通过 document 来操作页面上的元素。英文原意是「文档」。'
  }],
  ['ease-out', {
    explanation: 'CSS 动画时间函数——动画快速开始然后减速。英文原意是「缓出」。',
    analogy: '就像扬琴曲渐慢收尾。'
  }],
  ['fieldset', {
    explanation: '表单字段分组标签——把相关表单控件圈在一起，配合 legend 设置组标题。',
    analogy: '就像报名表上用框线画出的一个区域——"个人信息"外面有个框，里面是姓名+电话+地址。'
  }],
  ['forwards', {
    explanation: 'CSS animation-fill-mode 的值——动画结束后保留最后一帧的样式，不弹回初始状态。英文原意是「向前」。'
  }],
  ['function', {
    explanation: 'JavaScript 定义函数的关键字——一段可重复调用的代码块。英文原意是「功能、函数」。',
    analogy: '就像乐曲的主题动机——写好一次，全曲反复出现。'
  }],
  ['infinite', {
    explanation: 'CSS animation-iteration-count 的值——动画无限循环播放。英文原意是「无限的、无穷的」。'
  }],
  ['markdown', {
    explanation: '轻量级标记语言——用纯文本格式写文档，可转换为 HTML。.md 文件就是用 Markdown 写的。英文原意是「标记下来」。'
  }],
  ['NodeList', {
    explanation: 'querySelectorAll 返回的元素列表，类似数组，可用 forEach 遍历',
    analogy: '就像一份乐器清单——可以逐件检查、逐件调整'
  }],
  ['overflow', {
    explanation: 'CSS 属性——控制元素内容超出容器时的处理方式。常用值：visible（可见）、hidden（隐藏）、scroll（滚动条）、auto（自动）。英文原意是「溢出」。'
  }],
  ['password', {
    explanation: 'input 的 type="password"——密码输入框，输入时显示为圆点。英文原意是「密码」。'
  }],
  ['relative', {
    explanation: 'CSS position 的值——元素相对于自己原本的位置偏移，但仍占据原来的空间。英文原意是「相对的」。'
  }],
  ['template', {
    explanation: '模板——预先定义好的结构框架，填入具体内容即可生成最终结果。HTML 中 template 标签存放可复用的 HTML 片段。英文原意是「模板、样板」。'
  }],
  ['textarea', {
    explanation: '多行文本输入标签——可以输入大段文字。rows 属性设置显示行数。',
    analogy: '就像报名表上的"个人简介"大框——不是窄窄一条线，而是一整块区域。'
  }],
  ['position', {
    explanation: 'CSS 定位属性——控制元素在页面上的定位方式。可选 static（默认）、relative（相对）、absolute（绝对）、fixed（固定）、sticky（粘性）。',
    analogy: '就像指挥决定每个乐器组在舞台上的位置——弦乐坐前排还是后排、独奏者站在哪里，都是定位决定的。'
  }],
  ['reactive', {
    explanation: 'Vue 3 组合式 API 的响应式对象——用 reactive() 包裹一个对象，使其所有属性变成响应式的。不需要 .value。',
    analogy: '就像给整本乐谱贴上感应标签——翻到任何一页、修改任何一个标记，乐谱管理系统都会自动感知和记录变化。'
  }],
  ['Web 2.0', {
    explanation: '2004年前后兴起的第二代互联网模式——用户从单纯的内容消费者变成内容创造者（YouTube、Flickr、Facebook、Wikipedia）。强调互动、分享、协作。'
  }],
  ['Firefox', {
    explanation: 'Mozilla 基金会的开源浏览器——2004年发布后打破了 IE 的垄断地位，拥有优秀的开发者工具和标准兼容性。'
  }],
  ['Twitter', {
    explanation: '2006年上线的微博客平台——140字短消息改变了信息传播的速度和方式。'
  }],
  ['YouTube', {
    explanation: '2005年上线的视频分享平台——Web 2.0 典范，后被 Google 收购。'
  }],
  ['Session', {
    explanation: '服务端维护的用户会话状态——用户登录后，服务器记住你是谁，直到你退出或超时。通常配合 Cookie 使用。'
  }],
  ['Angular', {
    explanation: 'Google 2010年发布的前端框架——2016年用 TypeScript 完全重写，提供了完整的前端开发解决方案。'
  }],
  ['webpack', {
    explanation: '2012年发布的前端模块打包工具——将 JS、CSS、图片等资源视为模块，用 loader 和 plugin 统一处理和打包。'
  }],
  ['AlphaGo', {
    explanation: 'DeepMind 2016年开发的围棋 AI——击败了世界冠军李世石，标志着 AI 在复杂策略游戏中超越了人类。核心是深度强化学习。'
  }],
  ['ChatGPT', {
    explanation: 'OpenAI 2022年11月发布的对话式 AI 产品——两个月内用户突破 1 亿，是史上增长最快的消费级应用，彻底改变了普通人使用 AI 的方式。'
  }],
  ['Copilot', {
    explanation: 'GitHub 和 OpenAI 2021年联合推出的 AI 编程助手——在编辑器中根据上下文自动补全代码，相当于一个实时协作的 AI 编程伙伴。'
  }],
  ['Express', {
    explanation: 'Node.js 最流行的 Web 后端框架——轻量、灵活，是 MEAN/MERN 技术栈的核心。用 get()、post() 等简洁方法定义路由。'
  }],
  ['Console', {
    explanation: '浏览器 DevTools 的控制台面板——显示 console.log() 输出的信息、JS 错误、警告。是开发者"听"代码运行情况的主要窗口。',
    analogy: '就像排练时指挥的耳朵——通过听来判断每个声部是否正确、哪里有走音、哪里需要调整。'
  }],
  ['::after', {
    explanation: '在元素内容之后插入装饰性内容的伪元素',
    analogy: '就像乐曲结尾的尾声——给内容画上优雅的终止线'
  }],
  ['article', {
    explanation: '独立文章语义标签——可以独立分发、复用的完整内容块（如一篇博客）。',
    analogy: '就像一首可以独立演奏的扬琴小品——从组曲中抽出来单独弹也完整。'
  }],
  ['boolean', {
    explanation: 'JavaScript 数据类型——只有 true 和 false 两个值。以数学家 George Boole 的名字命名。'
  }],
  ['caption', {
    explanation: '表格标题标签——放在 table 内部最前面，为整个表格添加一个标题说明。',
    analogy: '就像练琴记录表顶部写的"2026年6月练习记录"——一眼就知道这张表是关于什么的。'
  }],
  ['charset', {
    explanation: '📍 特有属性。字符编码声明——meta 标签特有。不声明 charset="UTF-8" 会导致中文乱码。',
    analogy: '就像乐谱开头标注"五线谱·固定调"——不写清楚，别人可能用简谱或首调来读，全乱套。'
  }],
  ['checked', {
    explanation: '📍 特有 + 🔘 布尔。默认选中——radio 和 checkbox 特有。写了就默认打勾选中。',
    analogy: '就像报名表上"性别"栏已经预勾了一个选项——你可以改，但默认就有一个。'
  }],
  ['colspan', {
    explanation: '📍 特有属性。跨列合并——td 和 th 特有。让一个单元格横向跨越多列。值是一个数字。',
    analogy: '就像扬琴合奏谱中"齐奏"标记横跨所有声部——占满一整行。'
  }],
  ['Comment', {
    explanation: '注释——代码中写给人类看的说明文字，浏览器会完全忽略不执行。HTML 注释写法：<!-- 注释内容 -->。',
    analogy: '就像乐谱上用铅笔写的排练备忘——演奏者自己看，观众永远不会看到。'
  }],
  ['contain', {
    explanation: 'CSS background-size 的值——背景图片等比缩放至完全被容器包含，不裁剪。英文原意是「包含」。'
  }],
  ['content', {
    explanation: '📍 特有属性。meta 标签的内容属性——配合 name 属性使用，提供元数据的值。',
    analogy: '就像乐谱封面上的副标题——"为扬琴与钢琴而作"——补充说明这张谱的性质。'
  }],
  ['details', {
    explanation: 'HTML 原生折叠面板标签——配合 summary 标签使用，用户点击 summary 文字可以展开/收起 details 里的内容。',
    analogy: '就像乐谱上可折叠的附录——默认只显示标题，点击后才展开详细内容，保持页面整洁。'
  }],
  ['ease-in', {
    explanation: 'CSS 动画时间函数——动画慢速开始然后加速。英文原意是「缓入」。',
    analogy: '就像扬琴曲从弱拍逐渐加速。'
  }],
  ['Flexbox', {
    explanation: 'CSS 一维弹性布局模型——让元素在一行或一列中灵活排列',
    analogy: '就像把管乐手排成一排——自动调整间距，不会挤在一起'
  }],
  ['forEach', {
    explanation: '数组的遍历方法——对数组中每一项执行同一个函数',
    analogy: '就像指挥依次让每个声部试奏同一段旋律'
  }],
  ['if/else', {
    explanation: '条件判断语句——如果条件成立执行 A，否则执行 B',
    analogy: '就像反复记号——满足条件就跳回去，否则继续往下'
  }],
  ['license', {
    explanation: '开源许可证——声明代码的使用、修改和分发规则。常见的有 MIT、Apache 等。英文原意是「许可证、执照」。'
  }],
  ['Node.js', {
    explanation: '让 JavaScript 脱离浏览器、在电脑上独立运行的环境——有了它才能使用 npm、Vite 等工程化工具',
    analogy: '就像把钢琴从音乐教室搬到自己家里——不用再去专门的场地，随时随地都能练琴'
  }],
  ['opacity', {
    explanation: 'CSS 属性——设置元素的透明度。0 完全透明（看不见），1 完全不透明（正常），0.5 半透明。英文原意是「不透明度」。'
  }],
  ['ordered', {
    explanation: '有序的——在 HTML 中，ol（ordered list）就是有序列表，列表项前面是数字序号。',
    analogy: '就像练琴步骤——必须先练音阶，再练练习曲，最后才是乐曲。顺序固定，不能乱。'
  }],
  ['padding', {
    explanation: 'CSS 内边距——元素内容与边框之间的空白区域。像快递盒里的泡沫填充物，保护内容不被边框挤压。',
    analogy: '就像扬琴箱子里的海绵内衬——隔在琴面和箱壁之间，保护乐器不磕碰。'
  }],
  ['pointer', {
    explanation: '鼠标指针——cursor: pointer 让鼠标悬停时变成手型，暗示「这里可以点击」。英文原意是「指针、指示器」。'
  }],
  ['Promise', {
    explanation: 'JS 中表示异步操作最终完成或失败的对象——有三种状态：pending（进行中）、fulfilled（已成功）、rejected（已失败）',
    analogy: '就像乐团经理承诺下个月的演出一定请到那位独奏家——承诺已发出，结果待定'
  }],
  ['pushArr', {
    explanation: 'JavaScript 数组方法——向数组末尾添加一个元素。英文原意是「推入」。',
    analogy: '就像在曲目单最后加一首新曲子。'
  }],
  ['pushCmd', {
    explanation: 'Git 命令——将本地提交推送到远程仓库。英文原意是「推」。'
  }],
  ['rowspan', {
    explanation: '📍 特有属性。跨行合并——td 和 th 特有。让一个单元格纵向跨越多行。',
    analogy: '就像曲目单中一首大型作品占了好几行——因为它的介绍比其他作品长。'
  }],
  ['section', {
    explanation: '区块语义标签——把一个主题相关的内容分组，通常包含一个标题。',
    analogy: '就像扬琴曲中的一个乐段——"引子""快板""慢板""再现"，各段有独立主题但属于同一首曲子。'
  }],
  ['summary', {
    explanation: 'HTML 折叠面板的标题标签——放在 details 标签内部，作为折叠面板的可点击标题。点击 summary 文字会展开/收起后面隐藏的内容。',
    analogy: '就像乐谱附录的章节标题——"演奏提示"四个字点一下，下面展开详细说明。'
  }],
  ['v-model', {
    explanation: 'Vue 中实现双向数据绑定的指令——表单输入和数据自动同步',
    analogy: '就像四手联弹——数据和表单实时呼应，一方变化另一方自动跟上'
  }],
  ['visible', {
    explanation: 'CSS visibility 和 overflow 的值——元素可见。visibility:hidden 让元素不可见但仍占空间。英文原意是「可见的」。'
  }],
  ['visited', {
    explanation: 'CSS 伪类——:visited 表示用户已经点击过的链接的样式。英文原意是「已访问的」。'
  }],
  ['VS Code', {
    explanation: '微软开发的免费代码编辑器，拥有语法高亮、自动补全、内置终端和丰富的插件生态——前端开发的事实标准工具',
    analogy: '就像一张智能谱架——自动帮你翻页、标记错误、提示和弦走向'
  }],
  ['z-index', {
    explanation: '控制定位元素的前后层叠顺序，数值越大越靠前',
    analogy: '就像乐谱上标注的声部主次——数值大的在最前面（独奏），小的在背景（伴奏）'
  }],
  ['display', {
    explanation: 'CSS 显示属性——控制元素的显示方式。block（块级，独占一行）、inline（内联，不换行）、none（隐藏）、flex（弹性布局）、grid（网格布局）。',
    analogy: '就像决定乐器是独奏（block，独占舞台）还是合奏（inline，共享一行），或者暂时退场（none，隐藏）。'
  }],
  ['Google', {
    explanation: '1998年创立的互联网公司——搜索引擎起家，通过 Gmail 和 Google Maps 展示了 Ajax 的威力，直接催生了 Web 2.0 时代。'
  }],
  ['Chrome', {
    explanation: 'Google 2008年发布的开源浏览器——内置强大的 DevTools、超快的 V8 JS 引擎，彻底改变了前端开发。目前全球份额第一。'
  }],
  ['Flickr', {
    explanation: '2004年上线的照片分享网站——Web 2.0 时代的标志性产品之一。'
  }],
  ['Apache', {
    explanation: '全球使用最广泛的 Web 服务器软件——1995年发布，开源免费。LAMP 曾是 Web 开发的标准架构。'
  }],
  ['Cookie', {
    explanation: '浏览器存储在用户电脑上的小块数据——用于记住登录状态、购物车、偏好设置等。每次请求自动发送给服务器。英文原意是「小甜饼」。'
  }],
  ['jQuery', {
    explanation: '2006年发布的 JS 库——用简洁的 $() 语法解决了 DOM 操作和浏览器兼容问题。write less, do more 是其核心理念。'
  }],
  ['Svelte', {
    explanation: '2016年发布的前端框架——核心理念是「消失的框架」：编译阶段把代码转为纯 JS，运行时没有框架开销。'
  }],
  ['plugin', {
    explanation: '构建工具的插件——扩展打包器的功能，如压缩代码、注入环境变量。webpack 和 Vite 都有丰富的插件生态。'
  }],
  ['loader', {
    explanation: 'webpack 的概念——将非 JS 文件（CSS、图片、字体等）转换为可被 JS 模块引用的格式。每种文件类型需要对应的 loader。'
  }],
  ['OpenAI', {
    explanation: '2015年成立的人工智能研究公司——开发了 GPT 系列、DALL-E、Codex 等重量级 AI 模型。'
  }],
  ['Claude', {
    explanation: 'Anthropic 开发的 AI 助手——强调安全性、可靠性和长上下文能力。Claude 3.5/4 系列在编程和推理方面表现突出。'
  }],
  ['Cursor', {
    explanation: '2023年发布的 AI 编程编辑器——基于 VS Code，内嵌 AI 代码补全和对话功能。AI Coding 时代的标志性工具之一。'
  }],
  ['@media', {
    explanation: 'CSS 媒体查询——根据屏幕宽度等条件应用不同的样式',
    analogy: '就像根据演奏厅的大小调整乐队的编制和排列'
  }],
  ['active', {
    explanation: 'CSS 伪类——:active 表示元素被点击但尚未松开时的状态。英文原意是「激活的、活动的」。'
  }],
  ['bezier', {
    explanation: 'CSS cubic-bezier() 函数——用四个控制点自定义动画速度曲线。以法国工程师 Pierre Bezier 命名。'
  }],
  ['branch', {
    explanation: 'Git 概念——分支，代码的独立开发线。英文原意是「树枝、分支」。',
    analogy: '就像一首曲子的不同编曲版本，互不影响。'
  }],
  ['button', {
    explanation: '按钮标签——type="submit" 提交表单，type="button" 是普通按钮。',
    analogy: '就像报名表最底下的"提交报名"按钮——填完了，按下去。'
  }],
  ['center', {
    explanation: 'CSS 中常用的对齐值——让元素在容器中居中。英文原意是「中心、中间」。',
    analogy: '就像指挥站在乐团正中央。'
  }],
  ['client', {
    explanation: '客户端——向服务器请求数据的程序，如浏览器。英文原意是「客户」。'
  }],
  ['commit', {
    explanation: 'Git 中的一次"存档"操作——记录当前所有文件的快照，附带一条说明信息',
    analogy: '就像在乐谱草稿上标注"第三版·修改了再现部的配器"——一个清晰的记录点'
  }],
  ['config', {
    explanation: '配置文件——config 是 configuration（配置）的缩写，存储项目或工具的设置参数。英文原意是「配置」。'
  }],
  ['cursor', {
    explanation: 'CSS 属性——设置鼠标悬停在元素上时显示的光标样式。如 pointer（手型）、crosshair（十字）。英文原意是「光标、指针」。'
  }],
  ['data-*', {
    explanation: 'HTML 自定义数据属性——在元素上存储额外信息，JS 通过 dataset 读取',
    analogy: '就像乐谱上用铅笔写的排练批注——附加信息，不影响演奏本身'
  }],
  ['DELETE', {
    explanation: 'HTTP 请求方法——删除服务器上的数据。对应 CRUD 中的 Delete。英文原意是「删除」。'
  }],
  ['export', {
    explanation: 'JavaScript ES6 模块语法——将变量或函数导出供其他文件使用。英文原意是「导出」。'
  }],
  ['filter', {
    explanation: 'JavaScript 数组方法——筛选数组中满足条件的元素，返回新数组。英文原意是「过滤、筛选」。',
    analogy: '就像从一堆乐谱中挑出所有快板曲目。'
  }],
  ['footer', {
    explanation: '页脚语义标签——通常包含版权信息、联系方式、底部链接。',
    analogy: '就像乐谱最后一页的版权声明——"XX 出版社 2024 年编订"。'
  }],
  ['GitHub', {
    explanation: '全球最大的代码托管平台——存储、分享、协作开发代码的"程序员社交网络"',
    analogy: '就像一座世界音乐图书馆——你的乐谱放在上面，全世界的演奏者都能看到、使用和贡献'
  }],
  ['header', {
    explanation: '页头语义标签——通常包含网站 Logo、标题和主导航。',
    analogy: '就像乐谱顶部的作品信息——曲名、作者、编号，一眼就知道这是什么。'
  }],
  ['height', {
    explanation: '📍 特有属性。元素高度——img、video 等元素特有。设定显示高度。',
    analogy: '就像规定乐谱在谱架上的摆放高度——和宽度一起决定显示比例。'
  }],
  ['hidden', {
    explanation: '🌐 全局 + 🔘 布尔。隐藏元素——任何元素都能用。写了就让元素从页面消失。',
    analogy: '就像乐谱中被划掉的小节——内容还在谱面上，但指挥（浏览器）决定跳过不演。'
  }],
  ['iframe', {
    explanation: '内嵌框架——在一个网页中嵌入另一个独立的网页',
    analogy: '就像音乐厅里的返听音箱——独立播放，不影响主舞台'
  }],
  ['import', {
    explanation: 'JavaScript ES6 模块语法——从其他文件导入变量或函数。英文原意是「导入」。'
  }],
  ['inline', {
    explanation: '内联——指不换行的元素或样式。span、a、strong 是内联元素，在文字流中不打断行。',
    analogy: '就像装饰音/加花——不打断主旋律的进行，在乐句内部轻巧地穿插。'
  }],
  ['italic', {
    explanation: 'CSS font-style 的值——文字斜体。英文原意是「斜体的」。'
  }],
  ['legend', {
    explanation: '字段组标题标签——fieldset 内部第一个元素，作为分组的标题文字。',
    analogy: '就像报名表上分组框线左上角写的"个人信息"——告诉你这个框里填什么。'
  }],
  ['linear', {
    explanation: 'CSS 动画的时间函数值——动画从头到尾保持匀速。英文原意是「线性的、直线的」。'
  }],
  ['margin', {
    explanation: 'CSS 外边距——元素边框与相邻元素之间的空白距离。控制元素之间的"社交距离"。',
    analogy: '就像舞台上两个演奏者之间的距离——太近了互相干扰，margin 就是乐手之间的"安全间距"。'
  }],
  ['normal', {
    explanation: 'CSS 中多个属性的默认值——如 font-weight:normal（正常粗细）、line-height:normal（默认行高）。英文原意是「正常的、常规的」。'
  }],
  ['object', {
    explanation: 'JavaScript 数据类型——键值对的集合。英文原意是「对象」。'
  }],
  ['option', {
    explanation: '下拉选项标签——放在 select 中，每个 option 是一个可选条目。',
    analogy: '就像下拉框里每一个具体选项——"初级""中级""高级"各自是一行。'
  }],
  ['readme', {
    explanation: '项目说明文件——通常命名为 README.md，是别人打开你的项目时最先看到的说明文档。英文原意是「读我」。'
  }],
  ['reduce', {
    explanation: 'JavaScript 数组方法——将数组中所有元素累积计算为一个值（如求和）。英文原意是「减少、归纳」。'
  }],
  ['render', {
    explanation: '渲染——浏览器将 HTML/CSS/JS 代码转成用户在屏幕上看到的页面。英文原意是「渲染」。'
  }],
  ['repeat', {
    explanation: 'CSS background-repeat 的值——背景图片是否重复平铺。no-repeat 表示不重复。英文原意是「重复」。'
  }],
  ['return', {
    explanation: 'JavaScript 函数返回值的关键字——把结果「返回」给调用方。英文原意是「返回」。'
  }],
  ['rotate', {
    explanation: 'CSS transform 函数——将元素旋转指定角度。如 rotate(45deg) 表示顺时针旋转45度。英文原意是「旋转」。'
  }],
  ['router', {
    explanation: '路由——前端中管理页面跳转的机制，根据 URL 路径显示不同的页面内容。英文原意是「路由器、路径分配器」。'
  }],
  ['scoped', {
    explanation: 'Vue 单文件组件中 `<style scoped>` 的标记——让 CSS 只作用于当前组件，不会污染其他组件',
    analogy: '就像给每个声部独立的练习室——隔音处理，互不干扰'
  }],
  ['script', {
    explanation: 'HTML script 标签——用于在页面中嵌入或引用 JavaScript 代码。英文原意是「脚本」。'
  }],
  ['scroll', {
    explanation: 'CSS overflow 的值——内容超出时总是显示滚动条。也是 JS 的滚动相关方法。英文原意是「滚动」。'
  }],
  ['search', {
    explanation: 'input 的 type="search"——搜索输入框。英文原意是「搜索」。'
  }],
  ['select', {
    explanation: '下拉选择框容器——用户从预定义的选项中选一个。内含 option 选项。',
    analogy: '就像报名表上的"报考级别"下拉框——初级/中级/高级，选一个。'
  }],
  ['server', {
    explanation: '服务器——为客户端提供数据或服务的计算机。英文原意是「服务者」。'
  }],
  ['shadow', {
    explanation: 'CSS 视觉效果——box-shadow 给元素加投影阴影，text-shadow 给文字加阴影。英文原意是「阴影、影子」。'
  }],
  ['source', {
    explanation: '媒体源标签——放在 audio 或 video 中，提供多种格式让浏览器选支持的播放。是单标签。',
    analogy: '就像同一首曲子准备了简谱版和五线谱版——哪个能用就用哪个。'
  }],
  ['splice', {
    explanation: 'JavaScript 数组方法——从数组中删除或插入元素，会修改原数组。英文原意是「拼接、接合」。'
  }],
  ['sticky', {
    explanation: 'CSS position 的值——元素滚动到指定位置后固定在屏幕上。英文原意是「粘性的」。'
  }],
  ['string', {
    explanation: 'JavaScript 数据类型——用引号包裹的文本。英文原意是「字符串」。'
  }],
  ['strong', {
    explanation: '加粗强调标签——浏览器默认加粗显示，语义上表示"重要内容"。是内联元素。',
    analogy: '就像重音记号（>）——这个音要比周围的音更突出、更有力。'
  }],
  ['submit', {
    explanation: 'button 的 type="submit"——提交表单的按钮。英文原意是「提交」。'
  }],
  ['syntax', {
    explanation: '语法——编程语言的书写规则，就像自然语言的语法规则。英文原意是「语法」。'
  }],
  ['target', {
    explanation: '事件对象中的 target 属性——指向触发事件的具体元素。如用户点击哪个按钮，evt.target 就是那个按钮。英文原意是「目标」。'
  }],
  ['v-show', {
    explanation: 'Vue 中根据条件显示/隐藏元素的指令——用 CSS display 切换，元素始终存在于 DOM 中',
    analogy: '就像乐谱中暂时休止的声部——演奏者还在台上，只是暂时不发声'
  }],
  ['window', {
    explanation: '浏览器中的全局对象——代表浏览器窗口，所有全局变量和函数都是 window 的属性。英文原意是「窗口」。'
  }],
  ['dashed', {
    explanation: 'CSS 边框样式——虚线，由短线段和间隔组成。适合表示临时或可拖拽的边界。',
    analogy: '就像用虚线笔在乐谱上画的分割线——表示分隔但不那么强调，比实线更轻、更随意。'
  }],
  ['column', {
    explanation: 'CSS Flexbox 的 flex-direction 值——让子元素纵向排列（从上到下），主轴变为垂直方向。与 row（横向）相对。',
    analogy: '就像把横排的管乐队改成竖排的队列——同样的队员，只是从"横排"变成了"竖列"，排列方向变了。'
  }],
  ['v-bind', {
    explanation: 'Vue 的绑定指令——将元素的属性动态绑定到 JS 表达式。简写为一个冒号 :（如 :src="url"）。绑定的值变化时属性自动更新。',
    analogy: '就像把乐谱上的某一个音和演奏者的指法绑定——换了音高（数据变了），指法（属性）自动跟着变。'
  }],
  ['method', {
    explanation: 'JavaScript 中属于对象的方法（函数）——如 array.push()、element.addEventListener()。方法是"属于某个对象的函数"，与独立函数略有不同。',
    analogy: '就像某位演奏者独有的技巧——大提琴的揉弦（cello.vibrato()）是一种 method，只有大提琴能用；拍手（clap()）是通用 function，谁都能做。'
  }],
  ['Memex', {
    explanation: '1945年 Vannevar Bush 构想的个人信息管理设备——用索引和关联链在不同文档间快速跳转，是超文本和 Web 的思想原型。'
  }],
  ['Nginx', {
    explanation: '2004年发布的高性能 Web 服务器和反向代理——俄罗斯工程师 Igor Sysoev 为解决高并发问题而开发。英文读音 engine x。'
  }],
  ['React', {
    explanation: 'Facebook 2013年发布的前端 UI 库——用 JSX 语法和组件化思维构建界面，引入虚拟 DOM 概念。目前全球最流行的前端库。'
  }],
  ['渐进式框架', {
    explanation: 'Vue 的核心设计理念——可以只用部分功能，也可以逐步加入组件、路由、状态管理等全家桶。英文原名 Progressive Framework。'
  }],
  ['Babel', {
    explanation: 'JavaScript 编译器——将新版 JS（ES6+）转换为旧浏览器也能运行的版本。以传说中通向天堂的巴别塔命名。'
  }],
  ['chunk', {
    explanation: '构建工具将代码拆分成多个独立的文件块——实现按需加载，减少首屏下载量。英文原意是「一大块」。'
  }],
  ['Grunt', {
    explanation: '2012年发布的 JS 任务运行器——用配置文件定义构建任务，是前端工程化早期的标志性工具。后来被 Gulp 和 webpack 取代。'
  }],
  ['Bower', {
    explanation: '2012年发布的前端包管理器——在 npm 支持前端之前是下载前端库的主要工具。2015年后被 npm/Yarn 取代。'
  }],
  ['单文件组件', {
    explanation: 'Vue 的 .vue 文件——把模板、逻辑、样式写在同一个文件中，一个组件一个文件',
    analogy: '就像一份完整的声部分谱——含乐谱内容、演奏标记、声部说明，三合一'
  }],
  ['模板字符串', {
    explanation: '用反引号 ` 包裹的字符串，可在其中用 ${} 嵌入变量',
    analogy: '就像写有空白格子的乐谱模板——把音符填入空格就成了一首新曲子'
  }],
  ['语义化标签', {
    explanation: '有明确含义的 HTML 标签，如 header、nav、main、footer——看名字就知道它是什么',
    analogy: '就像乐谱上用意大利文标注的表情记号——Andante 一看就知道是行板'
  }],
  ['aside', {
    explanation: 'HTML 语义化标签——表示侧边栏或补充内容，与主体内容相关但非核心。英文原意是「在...旁边、旁白」。'
  }],
  ['async', {
    explanation: 'JavaScript 声明异步函数的关键字。英文原意是「异步的」。'
  }],
  ['audio', {
    explanation: '音频标签——在页面中嵌入音频播放器。controls 属性显示播放/暂停按钮。',
    analogy: '就像给你的网页装了一个内置扬声器——可以直接播放你录好的扬琴曲。'
  }],
  ['await', {
    explanation: 'JavaScript 等待异步操作完成的关键字——必须在 async 函数中使用。英文原意是「等待」。',
    analogy: '就像指挥等待独奏家完成华彩乐段再继续。'
  }],
  ['block', {
    explanation: '块级——指独占一行的元素。div、h1、p 是块级元素，自动换行，占满父容器宽度。',
    analogy: '就像独奏段落——演奏者独占舞台中央，伴奏暂停或退到背景，一个人占据整个视觉焦点。'
  }],
  ['catch', {
    explanation: 'JavaScript 错误处理关键字——catch 块放错误发生时的处理逻辑。英文原意是「捕获」。'
  }],
  ['class', {
    explanation: '🌐 全局属性。给元素起一个分类名——多个元素可以共用同一个 class。CSS 中用 .class名 选中。',
    analogy: '就像给琴竹分类——"这批是硬竹""这批是软竹"。同一类竹法可以用在多根弦上。class 就是给元素贴标签分组。'
  }],
  ['clone', {
    explanation: 'Git 命令——将远程仓库完整复制到本地。英文原意是「克隆」。'
  }],
  ['color', {
    explanation: '颜色——input 的 type="color" 创建颜色选择器，用户点击后从调色板中选择一个颜色。返回十六进制色值如 #8B2E2E。',
    analogy: '就像调音时选的音色风格——不是打字，而是在色板中"挑选"一个。'
  }],
  ['const', {
    explanation: 'JavaScript 声明常量的关键字——声明后不能重新赋值。英文原意是「常量」（constant 的缩写）。',
    analogy: '就像扬琴的定弦——固定好之后就不变了。'
  }],
  ['cover', {
    explanation: 'CSS background-size 的值——背景图片等比缩放至完全覆盖容器，可能裁剪。英文原意是「覆盖」。'
  }],
  ['cubic', {
    explanation: 'CSS cubic-bezier() 函数的一部分——可自定义动画速度曲线。英文原意是「三次的、立方的」。'
  }],
  ['debug', {
    explanation: '调试——查找和修复代码中的错误。英文原意是「去除虫子」（计算机先驱 Grace Hopper 造的词，因为真有虫子卡在继电器里）。'
  }],
  ['email', {
    explanation: 'input 的 type="email"——邮箱地址输入框。英文原意是「电子邮件」。'
  }],
  ['emits', {
    explanation: 'Vue 中组件向父组件发送事件通知的机制——子组件不能直接改父组件的数据，只能"喊一声"通知父组件',
    analogy: '就像乐团中某个声部的首席举手示意"我们准备好了"——不是代指挥做决定，只是发出一个信号'
  }],
  ['false', {
    explanation: 'JavaScript 布尔值——表示「假、否、不成立」。英文原意是「假的」。'
  }],
  ['fetch', {
    explanation: '浏览器内置的 API，用于发送 HTTP 请求获取数据——替代老式的 XMLHttpRequest',
    analogy: '就像派乐务去隔壁音乐厅取一份新乐谱——你不需要亲自跑一趟'
  }],
  ['focus', {
    explanation: 'CSS 伪类——:focus 表示元素获得焦点时的状态（如输入框被点击后）。英文原意是「焦点、聚焦」。'
  }],
  ['hover', {
    explanation: 'CSS 伪类——:hover 表示鼠标悬停在元素上时的状态。如 button:hover { } 定义鼠标放在按钮上时的样式。英文原意是「盘旋、悬停」。'
  }],
  ['input', {
    explanation: '输入标签——最通用的表单元素。通过 type 属性变成文本框、密码框、日期选择器等。是单标签。',
    analogy: '就像考级报名表上的填空线——用户在这条线上写字的地方。'
  }],
  ['label', {
    explanation: '标签标签——给表单控件加文字说明。for 属性关联 input 的 id，点击文字时输入框自动获得焦点。',
    analogy: '就像填空线前面写的"姓名："——告诉填表的人这条线该写什么。'
  }],
  ['merge', {
    explanation: 'Git 命令——将两个分支的代码合并。英文原意是「合并」。'
  }],
  ['PATCH', {
    explanation: 'HTTP 请求方法——部分更新服务器上的数据。英文原意是「修补、打补丁」。'
  }],
  ['props', {
    explanation: 'Vue 中父组件向子组件传递数据的方式——子组件声明需要什么，父组件传入具体值',
    analogy: '就像指挥把总谱分发到各个声部——每个声部拿到的是同一份乐曲中自己需要的那部分'
  }],
  ['query', {
    explanation: '编程中表示「查询」——如 media query 根据屏幕条件查询并应用样式。英文原意是「查询」。'
  }],
  ['radio', {
    explanation: '单选按钮——input 的 type="radio" 用来创建单选按钮。同一组 radio 中只能选一个。同 name 的 radio 互斥。',
    analogy: '就像考级报名只能选一个级别——初级、中级、高级，选了中级就不能同时选高级。'
  }],
  ['range', {
    explanation: '范围滑块——input 的 type="range" 创建滑块控件，用户拖动滑块选择一个范围内的数值。配合 min 和 max 属性限制范围。',
    analogy: '就像音量旋钮——从最小到最大之间滑动，不是输入具体数字，而是直观地拖到一个位置。'
  }],
  ['scale', {
    explanation: 'CSS transform 函数——将元素按比例缩放。如 scale(1.5) 放大1.5倍，scale(0.5) 缩小一半。英文原意是「缩放、比例」。'
  }],
  ['slice', {
    explanation: 'JavaScript 数组/字符串方法——截取数组或字符串的一部分，返回新数组但不修改原数组。英文原意是「切片、切下」。'
  }],
  ['small', {
    explanation: '小号文字标签——让文字比正常大小更小，通常用于免责声明、版权信息等次要文字。',
    analogy: '就像乐谱底部的蝇头小注——"本谱仅供参考，实际演奏以现场为准"。'
  }],
  ['solid', {
    explanation: 'CSS border-style 的值——边框为实线。英文原意是「实心的、固体的」。'
  }],
  ['split', {
    explanation: 'JavaScript 字符串方法——将字符串按指定分隔符切分成数组。英文原意是「分割、分裂」。'
  }],
  ['store', {
    explanation: '前端状态管理中的「仓库」——集中存储应用的所有数据。如 Vue 的 Pinia store。英文原意是「商店、仓库」。'
  }],
  ['style', {
    explanation: '🌐 全局属性。内联样式——直接在 HTML 元素上写 CSS。优先级高，但尽量少用（用外部 CSS 文件更好）。',
    analogy: '就像直接在音符旁边手写"强一些""渐慢"——有效但不规范。正式乐谱用标准演奏记号（相当于外部 CSS 文件）。'
  }],
  ['table', {
    explanation: '表格容器标签——用行列结构展示数据。现代布局请用 CSS Grid，表格仅用于表格数据。',
    analogy: '就像扬琴练琴记录表——日期、练习曲目、时长、问题备注，一行行一目了然。'
  }],
  ['tbody', {
    explanation: '表格主体区域——包裹数据行，和表头分开方便设置样式。',
    analogy: '就像练琴记录表中列出每天练习数据的实际区域。'
  }],
  ['thead', {
    explanation: '表格头部区域——包裹表头行（tr > th），和表体分开方便设置样式。',
    analogy: '就像练琴记录表顶部的标题栏——和下面密密麻麻的数据区分开。'
  }],
  ['throw', {
    explanation: 'JavaScript 主动抛出错误的关键字。英文原意是「抛出」。'
  }],
  ['title', {
    explanation: '页面标题标签——放在 head 中。浏览器标签页上显示的文字，也是搜索引擎显示的标题。',
    analogy: '就像写在乐谱封面上的曲名——读者第一眼看到的标识。'
  }],
  ['token', {
    explanation: '编程中表示「令牌」——一小段代表身份的数据，常用于 API 认证。英文原意是「令牌」。'
  }],
  ['v-for', {
    explanation: 'Vue 中循环渲染的指令——遍历数组为每一项生成对应的 DOM 元素',
    analogy: '就像为乐团中每一位演奏者复印同一份乐谱——同样的模板，不同的演奏者'
  }],
  ['value', {
    explanation: '📍 特有属性。表单控件的值——用户填写的内容，或 radio/checkbox 选中时提交的值。',
    analogy: '就像报名表上你实际写的内容——"张三""中级""春到清江"。value 是你填进去的具体答案。'
  }],
  ['var()', {
    explanation: 'CSS 中引用自定义变量的函数，如 var(--main-color)',
    analogy: '就像乐谱开头的调号——定义一次，全曲所有的 fa 都自动升高'
  }],
  ['video', {
    explanation: '视频标签——在页面中嵌入视频播放器。controls 属性显示播放控件。',
    analogy: '就像给你的网页装了一个屏幕——播放扬琴演奏录像。'
  }],
  ['watch', {
    explanation: 'Vue 中监听响应式数据变化的 API——数据一变，自动执行指定的回调函数',
    analogy: '就像指挥时刻关注独奏家的即兴发挥——独奏一有变化，指挥立刻调整乐队的伴奏'
  }],
  ['width', {
    explanation: '📍 特有属性。元素宽度——img、video 等元素特有。设定显示宽度。',
    analogy: '就像规定乐谱在谱架上的摆放宽度——太宽占地方，太窄看不清。'
  }],
  ['UTF-8', {
    explanation: '最通用的字符编码标准——支持包括中文在内的几乎全世界所有文字。HTML 文件头部必须声明 <meta charset="UTF-8">。',
    analogy: '就像国际通用的五线谱记谱法——全世界音乐家都能读懂，不管你是中国人、德国人还是日本人，看到五线谱上的音符就知道弹什么音。'
  }],
  ['https', {
    explanation: '安全超文本传输协议——网址前面的协议标记。有加密，数据传输更安全。书写链接时必须包含 https:// 前缀。',
    analogy: '就像用加密信封寄乐谱——不是普通明信片（http），而是封口的保密信封，中途不会被偷看。'
  }],
  ['Java', {
    explanation: 'Sun Microsystems 1995年发布的编程语言——「一次编写，到处运行」。和 JavaScript 除了名字前四个字母外没有关系。'
  }],
  ['Ruby', {
    explanation: '1995年发布的开源编程语言——以简洁优雅著称。配合 Rails 框架（2005年）掀起了「约定优于配置」的 Web 开发革命。'
  }],
  ['CPAN', {
    explanation: 'Comprehensive Perl Archive Network——Perl 语言的全能档案网络。编程世界最早的集中式包管理系统之一，启发了后来的 npm、pip 等。'
  }],
  ['模板语法', {
    explanation: 'Vue 等框架中在 HTML 中嵌入动态表达式的语法——如 {{ message }}、v-if、v-for。用声明式的方式描述页面和数据的关系。'
  }],
  ['Gulp', {
    explanation: '2013年发布的流式构建工具——用 JS 代码定义构建流程，比 Grunt 更快更灵活。'
  }],
  ['.vue', {
    explanation: 'Vue 单文件组件的文件后缀——一个文件包含 template（模板）、script（逻辑）、style（样式）三部分',
    analogy: '就像一份完整的声部分谱——用一张纸写下一个乐手需要的所有信息'
  }],
  ['布尔属性', {
    explanation: '不需要写值的 HTML 属性——出现在标签里就生效，不出现就不生效。如 controls、checked、disabled。',
    analogy: '就像扬琴踏板（制音踏板）——踩下去就止音，放开就不止音。没有"踩一半"的中间状态。'
  }],
  ['块级元素', {
    explanation: '独占一行的 HTML 元素，如 div、h1、p。宽度默认占满父容器，后续内容自动换行。',
    analogy: '就像独奏段落——演奏者独占舞台中央，伴奏暂停或退到背景。块级元素就是页面中的"独奏者"。'
  }],
  ['内联元素', {
    explanation: '在文字流内部不换行的 HTML 元素，如 span、a、strong。只占内容本身宽度，不会导致换行。',
    analogy: '就像装饰音/加花——不打断主旋律的进行，在句子内部轻巧地穿插。'
  }],
  ['全局属性', {
    explanation: '可以写在任何 HTML 元素上的属性，不受元素类型限制。如 class、id、style、lang、hidden。',
    analogy: '就像力度记号（p、f、ff）——不管弹哪根弦、哪个音区，力度标记对所有音都适用。所有标签都能用全局属性。'
  }],
  ['事件对象', {
    explanation: '事件触发时浏览器自动创建的参数，包含事件的详细信息',
    analogy: '就像演出记录单——记录了谁、什么时间、以什么方式演奏'
  }],
  ['特有属性', {
    explanation: '只能用在特定 HTML 元素上的属性。如 src 只用于 img/audio/video，href 只用于 a/link。',
    analogy: '就像扬琴的止音技法——只有特定段落、特定弦才需要用，不是每根弦都要止音。只有特定标签才能用特有属性。'
  }],
  ['a 标签', {
    explanation: '超链接标签——点击后跳转到另一个页面。href 属性指定目标地址。内联元素。',
    analogy: '就像乐谱中的 D.C.（从头反复）——指向另一个位置，告诉演奏者"跳过去"。'
  }],
  ['abbr', {
    explanation: '缩写标签——标记一个缩写词，用 title 属性提供全称。鼠标悬停时会显示完整写法。',
    analogy: '就像乐谱上写的"D.C."——演奏者一看就知道是"Da Capo（从头反复）"的缩写。'
  }],
  ['auto', {
    explanation: 'CSS 中多个属性的值——浏览器自动计算。如 width:auto、overflow:auto。英文原意是「自动的」。'
  }],
  ['b 标签', {
    explanation: '加粗标签——纯粹视觉上的加粗，没有语义含义。和 strong 不同：b 只改变外观，strong 表示"重要内容"。',
    analogy: '就像用粗笔写谱子——只是看上去粗，不代表要用力弹。而 strong 是重音记号 >——表示真的要突出。'
  }],
  ['body', {
    explanation: '页面主体——所有用户在浏览器中看到的内容都写在 body 里面。',
    analogy: '就像乐谱的正文——所有音符、小节、演奏记号都在这里。head 是调号拍号，body 是实际要弹的内容。'
  }],
  ['bold', {
    explanation: 'CSS font-weight 的值——文字加粗。英文原意是「粗的、大胆的」。'
  }],
  ['both', {
    explanation: 'CSS animation-fill-mode 的值——同时应用 forwards 和 backwards 的效果。英文原意是「两者都」。'
  }],
  ['code', {
    explanation: '行内代码标签——标记一段计算机代码。浏览器默认用等宽字体显示，与普通文字区分。',
    analogy: '就像在中文文章中插入一个英文术语用斜体标记——让读者知道"这不是普通文字，是代码"。'
  }],
  ['CORS', {
    explanation: '跨域资源共享——浏览器的一种安全机制，控制网页能否请求其他域名的数据',
    analogy: '就像音乐厅的门禁——只有拿到许可的观众才能跨厅交流，防止陌生人随意闯入'
  }],
  ['date', {
    explanation: 'input 的 type="date"——日期选择器。英文原意是「日期」。'
  }],
  ['Date', {
    explanation: 'JavaScript 内置对象——处理日期和时间，如 new Date() 获取当前时间。英文原意是「日期」。'
  }],
  ['ease', {
    explanation: 'CSS 动画的默认时间函数——动画速度曲线为慢→快→慢，让过渡看起来更自然。英文原意是「轻松、缓和」。'
  }],
  ['file', {
    explanation: 'input 的 type="file"——文件上传按钮。英文原意是「文件」。'
  }],
  ['find', {
    explanation: 'JavaScript 数组方法——查找数组中第一个满足条件的元素并返回。英文原意是「查找、找到」。'
  }],
  ['form', {
    explanation: '表单容器标签——包裹所有输入元素，用于收集用户填写的数据并提交。',
    analogy: '就像扬琴考级报名表——一张纸上包含所有要填写的信息。'
  }],
  ['from', {
    explanation: 'JavaScript ES6 模块语法配合 import 的关键字——指定从哪个文件导入。英文原意是「从、来自」。'
  }],
  ['Grid', {
    explanation: 'CSS 二维网格布局——同时控制行和列',
    analogy: '就像交响乐团在舞台上的座位表——每个位置都有行有列'
  }],
  ['head', {
    explanation: '页面元信息区——不直接显示内容，存放字符编码、页面标题、CSS 链接等幕后配置。',
    analogy: '就像乐谱开头的调号、拍号、速度标记——演奏前必须看清楚，但观众听不到这些符号本身。'
  }],
  ['href', {
    explanation: '📍 特有属性。超链接目标地址——告诉浏览器点击后跳到哪里。必须写完整网址（含 https://）。',
    analogy: '就像乐谱上的 D.C. 或 D.S. 记号——指向要跳转回去的位置。必须写清楚从哪里反复。'
  }],
  ['html', {
    explanation: '整个网页的根元素，所有其他元素都嵌套在它里面。lang 属性声明页面语言。',
    analogy: '就像扬琴的整个琴面——所有琴弦、琴码都在这个框架内。'
  }],
  ['HTML', {
    explanation: '超文本标记语言——网页的骨架，用标签来描述页面内容',
    analogy: '就像五线谱——决定页面上有什么内容'
  }],
  ['i 标签', {
    explanation: '斜体标签——纯粹视觉上的倾斜，没有语义含义。和 em 不同：i 只改变外观，em 表示"语气强调"。',
    analogy: '就像把谱子斜着放——只是看起来斜了，不代表要揉弦。而 em 是揉弦记号——表示真的有表情变化。'
  }],
  ['init', {
    explanation: 'Git/npm 命令——初始化新仓库或项目。英文原意是「初始化」（initialize 的缩写）。'
  }],
  ['join', {
    explanation: 'JavaScript 数组方法——将数组所有元素用指定分隔符连接成字符串。英文原意是「连接、汇合」。',
    analogy: '就像把散页乐谱装订成一本。'
  }],
  ['JSON', {
    explanation: 'JavaScript Object Notation——一种轻量级数据交换格式，人类易读、机器易解析。用 JSON.parse() 解析，用 JSON.stringify() 序列化',
    analogy: '就像五线谱之外的简谱——比五线谱简单，但全世界音乐人都能看懂'
  }],
  ['lang', {
    explanation: '🌐 全局属性。语言声明——告诉浏览器和屏幕阅读器这个元素的内容是什么语言（如 zh-CN、en）。',
    analogy: '就像乐谱上标注"五线谱"还是"简谱"——告诉读谱的人用什么体系来解读。'
  }],
  ['link', {
    explanation: '外部资源链接标签——放在 head 中，用于连接 CSS 样式文件、网站图标等。是单标签。',
    analogy: '就像节目单上标注的"伴奏：XX 扬琴伴奏"——引入外部资源配合当前页面。'
  }],
  ['list', {
    explanation: '列表——一组有序或无序的数据条目。HTML 中 ul/ol 创建列表容器，li 创建列表项。英文原意是"清单、目录"。',
    analogy: '就像音乐会节目单——一行一条曲目，整张单子就是一个 list。'
  }],
  ['loop', {
    explanation: '📍 特有 + 🔘 布尔。循环播放——audio 和 video 特有。播放完后自动从头开始。',
    analogy: '就像练琴模式——"这一段再来一遍"，弹完自动重来，直到你叫停。'
  }],
  ['main', {
    explanation: '主要内容语义标签——包裹页面核心内容，每个页面只应有一个 main。',
    analogy: '就像一首曲子的主要乐章——去掉引子和尾声后真正的音乐内容。'
  }],
  ['Math', {
    explanation: 'JavaScript 内置对象——提供数学常量和函数，如 Math.PI（圆周率）、Math.random()（随机数）、Math.floor()（向下取整）。'
  }],
  ['meta', {
    explanation: '元数据标签——放在 head 中，定义字符集、视口设置等。是单标签。',
    analogy: '就像扬琴的定弦标签——标明每根弦调什么音，给调律师看的，演奏时看不到。'
  }],
  ['name', {
    explanation: '📍 特有属性。表单控件名称——提交表单时作为数据标签发送。radio 中同 name 的互斥（只能选一个）。',
    analogy: '就像报名表上每个填空格前面的题目——"姓名""级别""曲目"。name 决定了交卷时数据的标签。'
  }],
  ['none', {
    explanation: 'CSS 中多个属性的默认值——表示「无、没有」。英文原意是「没有、无」。'
  }],
  ['null', {
    explanation: 'JavaScript 特殊值——表示「空、什么都没有」。null 是主动设置为空。英文原意是「空的」。'
  }],
  ['p 标签', {
    explanation: '段落标签——标记一段文字，浏览器自动在段落间加间距。最常用的 HTML 标签之一。',
    analogy: '就像乐谱中的一个乐句——有头有尾，自成一体。乐句间有呼吸，段落间有间距。'
  }],
  ['POST', {
    explanation: 'HTTP 请求方法——向服务器提交新数据。对应 CRUD 中的 Create。英文原意是「投递、发布」。'
  }],
  ['pull', {
    explanation: 'Git 命令——从远程仓库拉取最新代码。英文原意是「拉」。'
  }],
  ['rows', {
    explanation: '📍 特有属性。多行文本框行数——textarea 特有。设置输入框显示多少行高度。',
    analogy: '就像练习记录本上留给"本周总结"的行数——三行还是五行，决定了你能写多少。'
  }],
  ['skew', {
    explanation: 'CSS transform 函数——将元素倾斜变形。如 skew(10deg) 表示水平倾斜10度。英文原意是「倾斜、歪斜」。'
  }],
  ['span', {
    explanation: '内联容器标签——本身无样式，用于在文字流中标记某一段。内联元素，不换行。',
    analogy: '就像在乐谱某几个音上画的圈——标记特定音符，不打断整个乐句。'
  }],
  ['text', {
    explanation: 'input 的 type="text"——普通文本输入框。英文原意是「文本」。'
  }],
  ['this', {
    explanation: 'JavaScript 关键字——指向当前执行上下文的对象。英文原意是「这个」。'
  }],
  ['true', {
    explanation: 'JavaScript 布尔值——表示「真、是、成立」。英文原意是「真的」。'
  }],
  ['type', {
    explanation: '📍 特有属性。类型声明——用在 input 上决定输入框类型，用在 source 上声明媒体格式等。',
    analogy: '就像标注"这是轮音""这是琶音"——决定了这个记号的演奏方式。'
  }],
  ['v-if', {
    explanation: 'Vue 中条件渲染的指令——条件为真时元素才存在于 DOM 中（和 v-show 不同，v-if 会真的创建/销毁元素）',
    analogy: '就像协奏曲中独奏乐器的登场——需要时才走上舞台，不需要时在后台休息'
  }],
  ['Vite', {
    explanation: '法语"快"的意思——新一代前端构建工具，提供极速的开发服务器和项目脚手架',
    analogy: '就像一位排练厅管家——一条指令帮你布置好所有谱架、乐器、灯光，你只需要走进来开始演奏'
  }],
  ['YAML', {
    explanation: '一种人类友好的数据序列化格式——用缩进表示层级，比 JSON 更易读写。常用于配置文件。全称 YAML Ain\'t Markup Language。'
  }],
  ['emit', {
    explanation: 'Vue 组件中向父组件发送事件的方法——子组件通过 emit 通知父组件"发生了一件事"，父组件决定如何响应。',
    analogy: '就像乐手在演奏中举手示意指挥——表示"我这一部分结束了"或"我需要翻谱"，指挥听到后做出相应的调整。'
  }],
  ['wrap', {
    explanation: 'CSS Flexbox 的 flex-wrap 值——允许弹性子元素在空间不足时自动换行到下一行。默认是 nowrap（不换行，挤在一行）。',
    analogy: '就像乐谱中一行写不下了自动换到下一行——wrap 让卡片像谱面一样自然折行，不会硬挤出去。'
  }],
  ['slot', {
    explanation: 'Vue 的插槽机制——组件内部预留的"占位孔"，父组件可以向这些孔中插入自定义内容。默认 slot、具名 slot、作用域 slot 三种形式。',
    analogy: '就像协奏曲中的华彩段——作曲家留出一段空白，由独奏者在演出时即兴填充。每个演奏者填的内容不同，但框架（组件）是一样的。'
  }],
  ['v-on', {
    explanation: 'Vue 的事件监听指令——给元素绑定 DOM 事件处理函数。简写为 @（如 @click="handle"）。监听到事件时执行指定的方法。',
    analogy: '就像指挥给某个声部一个进入手势——挥到那个位置（事件触发），对应的乐手就开始演奏（执行处理函数）。'
  }],
  ['无衬线体', {
    explanation: '笔画末端没有装饰线的字体——如 Windows 自带的微软雅黑、网页常用的 Arial。干净利落、现代感强，适合正文阅读。英文名 sans-serif。',
    analogy: '就像长笛的音色——干净纯粹、没有多余的泛音装饰，直来直去的线条感。'
  }],
  ['http', {
    explanation: '超文本传输协议——网址前面的协议标记。没有加密。现在大多数网站已经升级到 https。',
    analogy: '就像用普通明信片寄乐谱——中途可能被看到内容。现在基本都用 https（加密信封）替代了。'
  }],
  ['输入模式', {
    explanation: 'HTML input 标签的 type 属性决定输入模式——text（文本）、email（邮箱）、number（数字）、date（日期）等。不同模式提供不同的输入体验和验证。',
    analogy: '就像报名表上不同的填空线——"姓名"是写文字的、"出生日期"是数字的、"邮箱"有特殊的格式要求。每种线有它自己的填写规则。'
  }],
  ['PHP', {
    explanation: '1995年诞生的服务器端脚本语言——曾驱动了 Facebook、Wikipedia 等早期 Web 巨头，至今仍运行着互联网大量的网站。'
  }],
  ['gem', {
    explanation: 'Ruby 语言的包管理器——gem install xxx 从 RubyGems 仓库下载包。'
  }],
  ['pip', {
    explanation: 'Python 语言的包管理器——pip install xxx 从 PyPI 仓库下载第三方库。全称 Pip Installs Packages（递归缩写）。'
  }],
  ['JSX', {
    explanation: 'JavaScript XML——React 引入的语法扩展，让你在 JS 中写类似 HTML 的标记。JSX 会被 Babel 编译为标准的 JavaScript 函数调用。'
  }],
  ['SQL', {
    explanation: 'Structured Query Language（结构化查询语言）——操作数据库的标准语言。前端开发者虽不直接写大量 SQL，但 ORM、GraphQL 等工具都是对 SQL 的封装。'
  }],
  ['GPT', {
    explanation: 'Generative Pre-trained Transformer——OpenAI 开发的大语言模型系列。GPT-3 在 2020 年引起巨大轰动，ChatGPT 在 2022 年底引爆了 AI 革命。'
  }],
  ['JWT', {
    explanation: 'JSON Web Token——一种紧凑的令牌格式，用于在客户端和服务端之间安全传输认证信息。登录后服务端签发 JWT，后续请求携带它证明身份。'
  }],
  ['标签对', {
    explanation: '成对出现的 HTML 标签：开始标签 + 内容 + 结束标签',
    analogy: '就像乐谱中的小节线——有开始就有结束，成对出现'
  }],
  ['单标签', {
    explanation: '不需要结束标签的 HTML 元素，如 <img>、<br>、<input>。开口即结束，不需要 </xxx>。',
    analogy: '就像单击泛音——竹头点一下弦面立刻离开，一个动作就完成，不需要"结束动作"。'
  }],
  ['盒模型', {
    explanation: '每个元素都是一个矩形盒子，从外到内：外边距(margin) → 边框(border) → 内边距(padding) → 内容区(content)',
    analogy: '就像一件乐器的包装——外箱是 margin、箱壁是 border、内衬是 padding、乐器本身是 content'
  }],
  ['命令行', {
    explanation: '通过输入文本指令来操作电脑的方式——不用鼠标，敲几个字母就能完成复杂任务',
    analogy: '就像指挥用一个手势让整个乐团起奏——简洁高效，一个动作完成一切'
  }],
  ['热更新', {
    explanation: 'HMR（Hot Module Replacement）——修改代码后浏览器自动刷新，且保留当前页面状态',
    analogy: '就像排练时指挥说"弦乐再来一遍"——只重来需要改的部分，不用整首曲子从头开始'
  }],
  ['伪元素', {
    explanation: '以 :: 开头，创建一个不存在于 HTML 中的"虚拟元素"来装饰',
    analogy: '就像乐谱上"想象中的回声"——乐谱上没写，但演奏者心领神会地加了一个渐弱的尾音'
  }],
  ['响应式', {
    explanation: '数据变化时页面自动更新，无需手动操作 DOM——Vue 的核心特性',
    analogy: '就像调音器——琴弦张力一变，指针立刻自动移动到新位置'
  }],
  ['选择器', {
    explanation: 'CSS 中用来"选中"目标元素的表达式，告诉浏览器样式该应用到哪里',
    analogy: '就像指挥指向某一类乐器——"所有小提琴"或"第一排的木管"'
  }],
  ['语义化', {
    explanation: '使用有明确含义的 HTML 标签而非全是 div，让页面结构清晰可读',
    analogy: '就像乐谱上用标准术语标注速度和表情，而不是模糊的"快一点"'
  }],
  ['占位符', {
    explanation: '一个临时替代的标记，用于在文本处理过程中保护特殊内容不被修改',
    analogy: '就像排练时用数字代替尚未确定的歌词——先占个位置，后面再替换'
  }],
  ['alt', {
    explanation: '📍 特有属性。图片替代文字——img 标签特有。图片加载不出时显示这段文字，屏幕阅读器也会读出。',
    analogy: '就像给一首没有录音的扬琴新作写文字描述——"抒情风格中板曲"，没听到也知道大概是什么样的。'
  }],
  ['API', {
    explanation: '应用程序接口——一组预先定义好的功能，供你调用',
    analogy: '就像乐器本身——你不用知道钢琴内部怎么发声，只需按琴键就能得到想要的音'
  }],
  ['Bug', {
    explanation: '代码中的错误——导致程序不按预期运行',
    analogy: '就像乐谱上印错了一个音符——演奏出来会别扭，需要修正'
  }],
  ['CLI', {
    explanation: 'Command Line Interface（命令行界面）——通过输入文本命令操作电脑的方式。'
  }],
  ['CSS', {
    explanation: '层叠样式表——控制网页的外观和布局',
    analogy: '就像乐谱上的演奏法标记——决定内容如何呈现'
  }],
  ['div', {
    explanation: '块级容器标签——本身无样式，用于把一组元素包在一起。块级元素，独占一行。',
    analogy: '就像扬琴上的音区划分——高音区是一块、中音区是一块、低音区是一块，每块独立但同属一架琴。'
  }],
  ['DOM', {
    explanation: '文档对象模型——浏览器把 HTML 解析成一棵可操作的节点树',
    analogy: '就像交响乐团的总谱——每个声部（元素）都在上面，指挥（JS）可以修改它'
  }],
  ['for', {
    explanation: '📍 特有属性。标签关联——label 特有。值等于对应 input 的 id。点击 label 文字时自动聚焦输入框。',
    analogy: '就像填空线前面写的"姓名："——"姓名"和填空线是配对的。for 就是告诉浏览器"这个词对应那条线"。'
  }],
  ['GET', {
    explanation: 'HTTP 请求方法——从服务器获取数据。对应 CRUD 中的 Read。英文原意是「获取」。'
  }],
  ['Git', {
    explanation: '分布式版本控制系统——记录代码的每一次修改，可以随时回到历史版本',
    analogy: '就像作曲时保留从草稿到定稿的每一版乐谱——随时可以翻看、比较、回退'
  }],
  ['hsl', {
    explanation: 'CSS 颜色函数——用色相(Hue)饱和度(Saturation)亮度(Lightness)表示颜色，比 rgb 更直观。'
  }],
  ['img', {
    explanation: '图片标签——在页面中插入图片。是单标签。src 指定图片地址，alt 提供替代文字。',
    analogy: '就像扬琴谱上的指法图/音位图——不是音符本身，但帮助理解怎么演奏。'
  }],
  ['let', {
    explanation: 'JavaScript 声明变量的关键字——声明的变量可以重新赋值。英文原意是「让、允许」。'
  }],
  ['map', {
    explanation: 'JavaScript 数组方法——对数组每个元素执行同一个操作，返回一个新数组。英文原意是「映射」。',
    analogy: '就像给每份乐谱都复印一份并标上调号——每份都经过同样的处理。'
  }],
  ['max', {
    explanation: '📍 特有属性。最大值——input 的 type="number"或"range"特有。设定允许的最大数值。',
    analogy: '就像节拍器最快 208 BPM——不能再快了。max 是数字输入的上限。'
  }],
  ['min', {
    explanation: '📍 特有属性。最小值——input 的 type="number"或"range"特有。设定允许的最小数值。',
    analogy: '就像节拍器最慢 40 BPM——不能再慢了。min 是数字输入的下限。'
  }],
  ['nav', {
    explanation: '导航语义标签——包裹主要的导航链接菜单，告诉浏览器"这是导航区域"。',
    analogy: '就像乐谱的目录/索引——告诉你从哪里可以跳到哪个乐章。'
  }],
  ['new', {
    explanation: 'JavaScript 创建对象实例的关键字。英文原意是「新的」。'
  }],
  ['npm', {
    explanation: 'Node Package Manager——Node.js 自带的包管理器，用来下载、管理、分享 JavaScript 代码包',
    analogy: '就像一座乐谱图书馆——全球开发者上传了超过 200 万份"乐谱"，npm install 一键借阅'
  }],
  ['npx', {
    explanation: 'npm 附带的命令执行工具——可以直接运行 npm 包中的命令，不必全局安装。英文原意是「执行 npm 包」。'
  }],
  ['pop', {
    explanation: 'JavaScript 数组方法——移除并返回数组最后一个元素。英文原意是「弹出」。',
    analogy: '就像从曲目单最底下抽走一首。'
  }],
  ['pre', {
    explanation: '预格式化文本标签——保留文本中的空格和换行，浏览器用等宽字体显示。适合展示代码块或 ASCII 艺术。',
    analogy: '就像乐谱上的自由节奏段落——保留演奏者的原始停顿和呼吸，不做任何"自动排版"。'
  }],
  ['PUT', {
    explanation: 'HTTP 请求方法——更新服务器上的已有数据。对应 CRUD 中的 Update。英文原意是「放置」。'
  }],
  ['ref', {
    explanation: 'Vue 中创建响应式数据的方法——用 ref() 包裹的数据，值变了页面自动更新。JS 中读写用 .value，模板中直接用',
    analogy: '就像一根"一拨就响"的琴弦——你拨动它（改 .value），整个共鸣箱（页面）立刻响应'
  }],
  ['rel', {
    explanation: '📍 特有属性。关系声明——link 和 a 特有。声明当前页面与被链接资源的关系（如 stylesheet、icon）。',
    analogy: '就像节目单上标"特邀嘉宾"——说明链接对象和当前页面的关系。'
  }],
  ['rem', {
    explanation: 'CSS 相对长度单位——相对于根元素(html)的字体大小。全称 root em。'
  }],
  ['rgb', {
    explanation: 'CSS 颜色函数——用红(Red)绿(Green)蓝(Blue)三原色值表示颜色。如 rgb(139,46,46)。'
  }],
  ['row', {
    explanation: '行——表格中横向的一排单元格。HTML 中 tr（table row）定义表格的一行。英文原意是"一排、一行"。',
    analogy: '就像练琴记录表横向的一排——"6月1日 | 春到清江 | 60分钟"——这就是一行（row）。'
  }],
  ['SFC', {
    explanation: 'Single File Component——Vue 单文件组件，把 template/script/style 写在同一个 .vue 文件中',
    analogy: '就像一份完整的声部分谱——含乐谱内容、演奏标记、声部说明，三合一'
  }],
  ['src', {
    explanation: '📍 特有属性。资源来源地址——告诉浏览器图片/音频/视频文件在哪里。用在 img、audio、video、source 上。',
    analogy: '就像乐谱上写的"改编自 XX 作品"——指向素材的原始来源。'
  }],
  ['tag', {
    explanation: '标签——HTML 中用尖括号包裹的标记符号，如 <h1>、<p>。英文原意是"标签、贴纸"。',
    analogy: '就像贴在琴盒上的标签——标明这是什么乐器、属于谁。HTML 标签"贴"在内容上，标明这是什么类型的内容。'
  }],
  ['try', {
    explanation: 'JavaScript 错误处理关键字——try 块放可能出错的代码。英文原意是「尝试」。',
    analogy: '就像排练时尝试一段高难度段落。'
  }],
  ['url', {
    explanation: '统一资源定位符——网页在互联网上的「地址」。全称 Uniform Resource Locator。',
    analogy: '就像扬琴谱上的页码——指向一个确定的位置。'
  }],
  ['Vue', {
    explanation: '渐进式 JavaScript 前端框架——用响应式数据和组件化思维构建用户界面',
    analogy: '就像一位自动指挥——你只需要改变数据（指挥手势），页面自动更新（乐团演奏）'
  }],
  ['XML', {
    explanation: '可扩展标记语言——一种类似 HTML 的数据格式，用于存储和传输数据。全称 eXtensible Markup Language。'
  }],
  ['gap', {
    explanation: 'CSS 属性——在 Flexbox 和 Grid 布局中设置行列之间的间距。一个值同时控制行列间距，两个值分别控制。比 margin 更简单直观。',
    analogy: '就像乐团座次之间的间隔——每个乐器组之间留出舒适的距离，让声音不混在一起。'
  }],
  ['作用域', {
    explanation: 'JavaScript 中变量可被访问的范围——全局作用域（到处可用）和局部作用域（仅函数/块内可用）。let/const 创建块级作用域，var 只有函数作用域。',
    analogy: '就像琴房和音乐厅的区别——在琴房里练的一段旋律（局部变量）只有你自己知道，在舞台上演奏的（全局变量）整个乐团都能听到。'
  }],
  ['衬线体', {
    explanation: '笔画末端有装饰线（衬线）的字体——如 Times New Roman、宋体。笔划粗细有变化、典雅庄重，适合标题。英文名 serif。',
    analogy: '就像小提琴的音色——有丰富的泛音和装饰音，笔画的粗细变化就像揉弦的深浅起伏。'
  }],
  ['装饰线', {
    explanation: '衬线字体笔画末端的小横线——serif 字体的标志特征。中文字体的宋体也有类似装饰。有装饰线 = 衬线体，没有 = 无衬线体。',
    analogy: '就像音符上的装饰音记号——不是主体旋律，但增添了韵味和风格。'
  }],
  ['IE', {
    explanation: 'Internet Explorer——微软的老牌浏览器，曾占 95% 份额。长期不遵守 Web 标准导致前端开发者需要大量 hack 和 polyfill。2022年正式退役。'
  }],
  ['AI', {
    explanation: 'Artificial Intelligence（人工智能）——让机器模拟人类智能行为的技术。从1956年达特茅斯会议正式确立，近期以深度学习和大语言模型为核心突破。'
  }],
  ['插件', {
    explanation: 'Plugin——可插拔的扩展模块，为已有软件增加新功能。VS Code 的插件生态让它可以变成任何语言的 IDE。'
  }],
  ['框架', {
    explanation: 'Framework——一套预定义好的代码结构和规范。你用框架就按它的规则来写，框架负责调用你的代码（控制反转）。'
  }],
  ['分包', {
    explanation: '把应用代码拆成多个独立的小包——用户访问时只下载当前需要的部分，加快首屏加载。Vite 和 webpack 都支持自动分包。'
  }],
  ['异步', {
    explanation: 'Asynchronous——代码不会阻塞等待结果，而是注册一个回调，结果来了再处理。JS 是单线程语言，异步是其处理网络请求的核心机制。'
  }],
  ['加载', {
    explanation: 'Load——浏览器从服务器获取资源（HTML、CSS、JS、图片）并展示给用户。加载性能直接影响用户体验，是现代前端开发的核心关注点。'
  }],
  ['变量', {
    explanation: '一个有名字的数据容器，用 let 或 const 声明——存储值以便后续使用',
    analogy: '就像乐谱上用字母标注的段落——A 段、B 段，指代一段具体的内容'
  }],
  ['标签', {
    explanation: 'HTML 中用来标记内容的符号，用尖括号包裹，如 <h1>、<p>',
    analogy: '就像五线谱上的音符记号——告诉浏览器这是什么类型的内容'
  }],
  ['部署', {
    explanation: '把本地开发完成的代码上传到服务器，让互联网上的用户可以通过网址访问',
    analogy: '就像排练结束后的正式演出——打开音乐厅大门，让观众进场欣赏你的作品'
  }],
  ['参数', {
    explanation: '函数定义时声明的输入变量——调用函数时传入具体值',
    analogy: '就像协奏曲的华彩乐段——留给独奏者自由发挥的空间，每次演奏可以不同'
  }],
  ['仓库', {
    explanation: 'Git 中存储项目所有文件和版本历史的目录——包含 .git 隐藏文件夹',
    analogy: '就像作曲家存放所有手稿的档案柜——每一稿、每一次修改都保存完好'
  }],
  ['防抖', {
    explanation: '在连续触发的事件中，只执行最后一次——等用户操作停下来再处理',
    analogy: '就像连续敲击定音鼓——只在最后一次击打后才让余音自然衰减'
  }],
  ['构建', {
    explanation: '把开发时的源代码（含注释、空格、多文件）压缩打包成适合用户访问的最终版本',
    analogy: '就像把排练时的散页乐谱整理装订成一本精美的节目单——内容不变，形态更适合呈现'
  }],
  ['函数', {
    explanation: '一段有名字、可重复调用的代码块——写好一次，到处使用',
    analogy: '就像乐曲的主题动机（如贝多芬命运交响曲的"当当当当"）——全曲反复出现'
  }],
  ['回调', {
    explanation: '作为参数传给另一个函数的函数，在特定时刻被调用执行',
    analogy: '就像指挥给首席小提琴一个提示——当指挥棒落下时，你就开始独奏'
  }],
  ['事件', {
    explanation: '用户在页面上触发的动作——点击、输入、滚动等',
    analogy: '就像演奏者听到指挥棒敲击谱架的声音——这是开始演奏的"事件"'
  }],
  ['属性', {
    explanation: '写在 HTML 开始标签里的附加信息，如 class="card" src="pic.jpg"',
    analogy: '就像乐谱上的力度记号（p、f、ff）——给内容附加额外说明'
  }],
  ['数组', {
    explanation: '一组有序数据的集合，用方括号 [] 表示，每个元素有索引（从 0 开始）',
    analogy: '就像一份按顺序排列的曲目单——第 0 首、第 1 首、第 2 首...'
  }],
  ['伪类', {
    explanation: '以 : 开头的 CSS 选择器，根据元素的特定状态（如鼠标悬停、是第几个子元素）来匹配',
    analogy: '就像根据乐器当前的状态来决定演奏方式——"正在被独奏的小提琴"'
  }],
  ['依赖', {
    explanation: '项目运行所依赖的外部代码包——记录在 package.json 中，通过 npm install 安装到 node_modules',
    analogy: '就像一首协奏曲需要独奏乐器——缺了它，整首曲子就不完整'
  }],
  ['元素', {
    explanation: 'HTML 中一个完整的标签对（开始标签 + 内容 + 结束标签）',
    analogy: '就像乐谱中一个完整的音符——包括符头、符干和符尾'
  }],
  ['终端', {
    explanation: '命令行界面——通过输入文本指令与电脑交互，是前端工程化的主要操作入口',
    analogy: '就像指挥台——所有指令从这里发出，整个乐团（项目）听从调度'
  }],
  ['组件', {
    explanation: 'Vue 中独立的、可复用的 UI 单元——有自己的模板、逻辑和样式，像积木一样组合成完整页面',
    analogy: '就像管弦乐队中的一个声部——独立运作但共同构成完整的音乐作品'
  }],
  ['br', {
    explanation: '换行标签——在文字中强制换行。是单标签，不需要结束标签。',
    analogy: '就像乐谱中的换气记号——在这里换一口气，但不表示乐句结束。'
  }],
  ['dd', {
    explanation: '描述列表中的术语解释——放在 dl 中，跟在 dt 后面，表示对前面术语的解释说明。',
    analogy: '就像词汇表中右侧的解释——"快板，活泼的速度"。'
  }],
  ['dl', {
    explanation: '描述列表容器——用于展示术语及其解释（术语=dt，解释=dd），如词汇表、FAQ 等。',
    analogy: '就像乐谱附录中的术语对照表——左边是意大利术语，右边是中文解释。'
  }],
  ['dt', {
    explanation: '描述列表中的术语——放在 dl 中，表示被解释的词语。',
    analogy: '就像词汇表中左侧的那个词条——"Allegro"。'
  }],
  ['em', {
    explanation: '斜体强调标签——浏览器默认斜体显示，语义上表示"语气强调"。是内联元素。',
    analogy: '就像揉弦/颤音——让这个音更有表情、更柔美。不是更大声，而是更有韵味。'
  }],
  ['h1', {
    explanation: '一级标题标签——页面中最重要的标题。h1 到 h6 共六级，数字越小字越大。通常一个页面只有一个 h1。',
    analogy: '就像扬琴曲谱上的大标题——比如《春到清江》，第一眼看到、最大的那个字。'
  }],
  ['h2', {
    explanation: '二级标题标签——比 h1 小一级，通常用于各章节的大标题。h1~h6 共六级，数字越大字越小。',
    analogy: '就像扬琴谱上的副标题或章节名——比曲名小一号，但仍是重要的结构标记。'
  }],
  ['h3', {
    explanation: '三级标题标签——比 h2 小一级，用于章节内的子标题。',
    analogy: '就像扬琴谱中标注的"引子""快板""慢板"——标记乐曲内部的段落。'
  }],
  ['h4', {
    explanation: '四级标题标签——用于更细粒度的标题层级。',
    analogy: '就像乐谱中标注的具体演奏提示——比大标题小很多，但仍是结构的一部分。'
  }],
  ['h5', {
    explanation: '五级标题标签——较小的标题，通常与正文大小相近但加粗。',
    analogy: '就像乐谱段落旁的铅笔小注——层级较低但仍有标记作用。'
  }],
  ['h6', {
    explanation: '六级标题标签——最小一级标题。h1~h6 共六级，数字越大字越小。',
    analogy: '就像乐谱中最不起眼的小标题——"注"或"附"——几乎和正文一样大，但仍是一个标题。'
  }],
  ['hr', {
    explanation: '水平分割线标签——在页面中画一条横线，表示主题切换或内容分隔。是单标签。',
    analogy: '就像乐谱中分隔乐章的横线——告诉读者"这里是一个段落结束，下一段开始"。'
  }],
  ['id', {
    explanation: '🌐 全局属性。元素唯一标识——整个页面中同一个 id 只能出现一次。CSS 中用 #id名 选中。',
    analogy: '就像扬琴上每根弦的唯一编号——C3、D3、E3…全琴没有两根弦编号相同。id 就是元素的"身份证号"。'
  }],
  ['in', {
    explanation: 'JavaScript for...in 循环关键字——遍历对象的属性。英文原意是「在...里面」。'
  }],
  ['JS', {
    explanation: 'JavaScript 的缩写——网页的编程语言，让页面有交互、动起来',
    analogy: '就像指挥家的简称"指挥"——大家都这么说，简单明了'
  }],
  ['li', {
    explanation: '列表项标签——必须放在 ul 或 ol 里面，不能单独使用。每个 li 是一个条目。',
    analogy: '就像节目单上的每一行——必须属于整张节目单，不能单独飘在外面。'
  }],
  ['of', {
    explanation: 'JavaScript for...of 循环关键字——遍历数组的每个元素。英文原意是「...的」。'
  }],
  ['ol', {
    explanation: '有序列表容器——列表项前显示数字（1, 2, 3…），顺序重要时使用。li 必须放在 ul 或 ol 里面。',
    analogy: '就像练琴步骤——必须先练音阶，再练练习曲，最后才是乐曲。顺序不能乱。'
  }],
  ['px', {
    explanation: '像素单位——CSS 中最常用的长度单位。1px 是屏幕上最小的一个点。英文全称 pixel（像素）。',
    analogy: '就像五线谱上最小的一个音符点——它是组成所有视觉大小的基本单位。'
  }],
  ['td', {
    explanation: '表格数据单元格——表格中最基础的格子，放具体数据。',
    analogy: '就像练琴记录表中的一个格子——比如"60 分钟""春到清江"。'
  }],
  ['th', {
    explanation: '表格表头单元格——加粗居中显示，表示一列或一行的标题。',
    analogy: '就像练琴记录表顶部的列名——"日期""曲目""时长""问题"——加粗的那一行。'
  }],
  ['tr', {
    explanation: '表格行标签——定义表格中的一行，放在 table 里面的 thead 或 tbody 中。',
    analogy: '就像练琴记录表中的某一天——那一行包含当天的所有练习信息。'
  }],
  ['UI', {
    explanation: 'User Interface（用户界面）——用户能看到和交互的所有视觉元素，如按钮、输入框、文字。'
  }],
  ['ul', {
    explanation: '无序列表容器——列表项前显示圆点，顺序不重要时使用。li 必须放在 ul 或 ol 里面。',
    analogy: '就像练琴前的备选曲目单——先挑哪首练都可以，每首地位平等。'
  }],
  ['编码', {
    explanation: '字符编码——规定计算机如何存储和传输文字。UTF-8 是最常用的编码，支持中文、英文等几乎所有语言。乱码通常是因为编码不一致。',
    analogy: '就像乐谱的记谱法——五线谱、简谱、工尺谱是不同的"编码方式"，如果演奏者用简谱的思维去读五线谱，就会"乱码"（读错音）。'
  }],
  ['渲染', {
    explanation: '浏览器将 HTML/CSS/JS 代码转换成屏幕上可见像素的过程。每次代码变化，浏览器都可能重新渲染受影响的区域。',
    analogy: '就像将乐谱上的音符转换成真实的声音——乐谱是代码（二维符号），演奏出来的音乐是渲染结果（声波/像素），中间需要演奏者（浏览器引擎）的转换。'
  }],
  ['视口', {
    explanation: '用户在浏览器中实际看到网页的可见区域——不同设备视口宽度不同（手机约 375px，桌面约 1920px）。响应式设计根据视口宽度调整布局。',
    analogy: '就像舞台的可见区域——观众（用户）只能看到舞台框内的表演（视口内的页面），但后台还有很多准备中的道具（视口外的内容）。'
  }],
  ['请求', {
    explanation: '客户端（浏览器）向服务器发送的数据请求——如打开网页（GET 请求）、提交表单（POST 请求）。服务器处理后返回响应（response）。',
    analogy: '就像向乐谱管理员提出借阅申请——"我想借贝多芬第九交响曲的总谱"（请求），管理员找到后递给你（响应）。请求和响应是 Web 通信的基本模式。'
  }],
  ['缓存', {
    explanation: '浏览器将已加载的资源（HTML/CSS/JS/图片）暂存在本地，下次访问同一页面时直接从本地读取，大幅加快加载速度。',
    analogy: '就像背谱演奏——第一次要看着乐谱弹（从网络下载），熟练后记在脑子里（缓存），以后弹同一首曲子不用再看谱了。'
  }],
  ['迭代', {
    explanation: '循环中每一次执行叫一次迭代——如 forEach 遍历数组，数组有 5 个元素就是 5 次迭代。也泛指开发中的反复改进过程。',
    analogy: '就像反复练习同一段音阶——第 1 遍、第 2 遍、第 3 遍……每一遍都是一次迭代，每次都在上一次的基础上改进。'
  }],
  ['断点', {
    explanation: '双重含义——在响应式设计中指 @media 查询的屏幕宽度阈值（如 640px、1024px）；在调试中指代码中设置的暂停执行标记。',
    analogy: '就像乐谱中的排练号——在 A 段标记处乐队调整编制（响应式断点），也可以在某小节停下来检查音准（调试断点）。'
  }],
  ['弹性', {
    explanation: 'Flexbox 布局的中文叫法——弹性盒子，元素可以根据可用空间自动伸缩。Flexbox 的核心就是"弹性"——能伸能缩，不写死尺寸。',
    analogy: '就像橡皮筋——拉一拉变宽（flex-grow），压一压变窄（flex-shrink），永远适应当前的空间。弹性布局让页面像橡皮筋一样灵活。'
  }],
  ['行高', {
    explanation: 'CSS line-height 属性的中文叫法——控制文字行与行之间的垂直距离。值越大行距越疏朗，越小越紧凑。推荐正文 1.6~1.8。',
    analogy: '就像五线谱行与行之间的距离——太密了音符会挤在一起，太宽了浪费纸面。合适的行高让阅读像听舒缓的柔板一样舒适。'
  }],
  ['重置', {
    explanation: 'CSS Reset——在写样式之前，先把浏览器默认的 margin、padding 等统归零，再按需设置。避免不同浏览器默认样式不一致。',
    analogy: '就像排练前把乐谱架和座椅全部归位到标准位置——统一从"零"开始，每个人再按需要微调自己的位置。'
  }],
  ['索引', {
    explanation: '数组中每个元素的编号——从 0 开始计数。如 arr[0] 是第一个元素，arr[1] 是第二个。也叫下标。',
    analogy: '就像乐谱上的小节号——第 1 小节是 1，但在数组思维中它是 arr[0]，只是计数的起点不同。'
  }],
  ['交互', {
    explanation: '用户与网页之间的双向交流——用户点击按钮、输入文字，页面做出响应（变化、跳转、弹窗等）。JavaScript 是实现交互的主要手段。',
    analogy: '就像演奏者与听众之间的互动——演奏者弹出一个乐句（输入），听众鼓掌或安静聆听（响应），形成了完整的交流。'
  }],
  ['样式', {
    explanation: 'CSS 为 HTML 元素添加的视觉表现——颜色、字体、大小、间距、背景等都属于样式。HTML 是内容，样式是外观。',
    analogy: '就像演奏者穿的演出服和舞台灯光——不改变演奏的内容（音符），但决定了观众看到的视觉感受。'
  }],
  ['vh', {
    explanation: 'CSS 相对长度单位——相对于视口高度的百分比。1vh=视口高度的1%。全称 viewport height。'
  }],
  ['vw', {
    explanation: 'CSS 相对长度单位——相对于视口宽度的百分比。1vw=视口宽度的1%。全称 viewport width。'
  }],
  ['层', {
    explanation: 'Layer——编程中把不同职责的代码分层，如表现层（UI）、业务逻辑层、数据层。分层是软件架构的基本思想。'
  }]
];
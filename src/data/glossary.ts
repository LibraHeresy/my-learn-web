// 编程术语词库 — 每个术语有中文解释和音乐类比
// key 为术语的中文/英文写法，在课程内容中自动识别并显示 tooltip

export interface TermDef {
  explanation: string
  analogy?: string
}

// 按 key 长度降序排列——长术语优先匹配，避免"标签"先于"标签对"匹配
export const glossary: [string, TermDef][] = [
  ['addEventListener', {
    explanation: '给元素绑定一个事件监听器——当用户触发某个动作（如点击）时，执行指定的函数',
    analogy: '就像指挥给某个乐器声部指定一个进入信号——信号一到，立刻演奏'
  }],
  ['querySelectorAll', {
    explanation: '选中所有匹配指定选择器的元素，返回一个列表',
    analogy: '就像指挥同时命令整个弦乐声部做同一个动作'
  }],
  ['querySelector', {
    explanation: '选中第一个匹配指定选择器的元素',
    analogy: '就像指挥指向某一位独奏者'
  }],
  ['textContent', {
    explanation: '获取或设置元素的纯文本内容（不含 HTML 标签）',
    analogy: '就像只读歌词，不管谱号调号'
  }],
  ['innerHTML', {
    explanation: '获取或设置元素内部的 HTML 内容（可包含标签）',
    analogy: '就像把一整段乐谱（含所有标记）塞进一个声部'
  }],
  ['setInterval', {
    explanation: '每隔指定毫秒数重复执行一个函数，像一个永不停歇的节拍器',
    analogy: '就像节拍器哒哒哒地持续打拍子'
  }],
  ['setTimeout', {
    explanation: '在指定毫秒数之后执行一次函数（只执行一次）',
    analogy: '就像指挥给某个声部一个延后进入的提示——等两小节再开始'
  }],
  ['createElement', {
    explanation: '用 JS 动态创建一个新的 HTML 元素',
    analogy: '就像在演奏过程中临时增加一件乐器'
  }],
  ['preventDefault', {
    explanation: '阻止元素的默认行为（如阻止表单提交后刷新页面）',
    analogy: '就像指挥临时叫停一个自动重复的乐段'
  }],
  ['!important', {
    explanation: 'CSS 中的强制优先级标记，盖过所有普通规则的权重计算',
    analogy: '就像独奏段落中所有伴奏都必须给独奏让路——但它破坏了正常的和声层级，应尽量少用'
  }],
  ['addEventListener("click"', {
    explanation: '监听元素的点击事件——用户点击时触发',
    analogy: '就像按下钢琴琴键——按下这个动作触发声音'
  }],
  ['document.querySelector', {
    explanation: '从整个页面文档中选中一个元素',
    analogy: '就像从总谱中找出某一个特定的小节'
  }],
  ['@keyframes', {
    explanation: 'CSS 动画的关键帧规则——定义动画在每一步的状态',
    analogy: '就像乐谱上标注的每一小节的力度变化记号'
  }],
  ['@media', {
    explanation: 'CSS 媒体查询——根据屏幕宽度等条件应用不同的样式',
    analogy: '就像根据演奏厅的大小调整乐队的编制和排列'
  }],
  ['linear-gradient', {
    explanation: '线性渐变——颜色沿一条直线平滑过渡',
    analogy: '就像竖琴的滑奏——音高从低到高连续变化'
  }],
  ['box-shadow', {
    explanation: '给元素添加投影阴影效果，让卡片从平面中浮现',
    analogy: '就像舞台聚光灯打在乐手身上产生的立体感'
  }],
  ['grid-template-columns', {
    explanation: '定义 Grid 布局的列宽',
    analogy: '就像确定乐谱上每行小节的数量和宽度'
  }],
  ['justify-content', {
    explanation: 'Flex 容器中沿主轴对齐子元素的方式',
    analogy: '就像指挥调整各声部在舞台上的横向间距'
  }],
  ['align-items', {
    explanation: 'Flex 容器中沿交叉轴对齐子元素的方式',
    analogy: '就像确保所有乐手的谱架在同一高度'
  }],
  ['flex-direction', {
    explanation: 'Flex 容器中主轴的方向（横排还是竖排）',
    analogy: '就像决定声部从左到右排还是从前到后排'
  }],
  ['position: fixed', {
    explanation: '元素脱离正常文档流，固定在浏览器窗口的指定位置，滚动也不动',
    analogy: '就像指挥台——不管乐队怎么换位，指挥始终站在正前方'
  }],
  ['position: absolute', {
    explanation: '元素脱离正常文档流，相对于最近的定位祖先定位',
    analogy: '就像协奏曲中的独奏者——从乐队中走出来站在前面'
  }],
  ['box-sizing: border-box', {
    explanation: '宽高计算包含 padding 和 border，更方便布局计算',
    analogy: '就像算乐器箱子的总尺寸时，把内衬和外壳都算进去'
  }],
  [':nth-child', {
    explanation: '匹配父元素中第 n 个子元素的伪类选择器',
    analogy: '就像指定"第三小提琴手"——精确到排位'
  }],
  ['::before', {
    explanation: '在元素内容之前插入装饰性内容的伪元素',
    analogy: '就像乐曲开头的引子——不是主题本身，但为主题做铺垫'
  }],
  ['::after', {
    explanation: '在元素内容之后插入装饰性内容的伪元素',
    analogy: '就像乐曲结尾的尾声——给内容画上优雅的终止线'
  }],
  ['transition', {
    explanation: 'CSS 过渡——让属性值的变化平滑动画化',
    analogy: '就像从一个调性转到另一个调性时的模进过渡，不是突然跳跃而是自然滑入'
  }],
  ['transform', {
    explanation: 'CSS 变换——对元素进行位移、旋转、缩放等操作',
    analogy: '就像一段旋律的移调、倒影或逆行——核心不变，形态改变'
  }],
  ['display: flex', {
    explanation: '启用 Flexbox 布局——子元素在一维方向上灵活排列',
    analogy: '就像将弦乐组排成一行——每个演奏者之间保持均等间距'
  }],
  ['display: grid', {
    explanation: '启用 CSS Grid 布局——子元素在二维网格中排列',
    analogy: '就像管弦乐队在舞台上的座次表——有行有列，每个位置都有安排'
  }],
  ['z-index', {
    explanation: '控制定位元素的前后层叠顺序，数值越大越靠前',
    analogy: '就像乐谱上标注的声部主次——数值大的在最前面（独奏），小的在背景（伴奏）'
  }],
  ['text-shadow', {
    explanation: '给文字添加阴影效果',
    analogy: '就像聚光灯下乐手在幕布上的投影——增加文字的立体感和氛围'
  }],
  ['var()', {
    explanation: 'CSS 中引用自定义变量的函数，如 var(--main-color)',
    analogy: '就像乐谱开头的调号——定义一次，全曲所有的 fa 都自动升高'
  }],
  ['border-radius', {
    explanation: '给元素设置圆角',
    analogy: '就像把方形的乐谱纸张裁出圆角——柔化边缘，更友好'
  }],
  ['模板字符串', {
    explanation: '用反引号 ` 包裹的字符串，可在其中用 ${} 嵌入变量',
    analogy: '就像写有空白格子的乐谱模板——把音符填入空格就成了一首新曲子'
  }],
  ['模板字符串（Template Literal）', {
    explanation: '用反引号 ` 包裹的字符串，可在其中用 ${} 嵌入变量表达式',
    analogy: '就像写有空白格子的乐谱模板——把音符填入空格就成了一首新曲子'
  }],
  ['语义化标签', {
    explanation: '有明确含义的 HTML 标签，如 header、nav、main、footer——看名字就知道它是什么',
    analogy: '就像乐谱上用意大利文标注的表情记号——Andante 一看就知道是行板'
  }],
  ['语义化', {
    explanation: '使用有明确含义的 HTML 标签而非全是 div，让页面结构清晰可读',
    analogy: '就像乐谱上用标准术语标注速度和表情，而不是模糊的"快一点"'
  }],
  ['盒模型（Box Model）', {
    explanation: '每个元素都是一个矩形盒子，从外到内由 margin → border → padding → content 四层组成',
    analogy: '就像一件乐器的包装——外箱是 margin、箱壁是 border、内衬是 padding、乐器本身是 content'
  }],
  ['盒模型', {
    explanation: '每个元素都是一个矩形盒子，从外到内：外边距(margin) → 边框(border) → 内边距(padding) → 内容区(content)',
    analogy: '就像一件乐器的包装——外箱是 margin、箱壁是 border、内衬是 padding、乐器本身是 content'
  }],
  ['层叠（Cascade）', {
    explanation: 'CSS 的核心理念——多条规则可能同时作用于一个元素，浏览器按权重和顺序决定最终样式',
    analogy: '就像乐队中多个声部同时发声——指挥决定哪一声部在此时最突出'
  }],
  ['选择器', {
    explanation: 'CSS 中用来"选中"目标元素的表达式，告诉浏览器样式该应用到哪里',
    analogy: '就像指挥指向某一类乐器——"所有小提琴"或"第一排的木管"'
  }],
  ['伪类', {
    explanation: '以 : 开头的 CSS 选择器，根据元素的特定状态（如鼠标悬停、是第几个子元素）来匹配',
    analogy: '就像根据乐器当前的状态来决定演奏方式——"正在被独奏的小提琴"'
  }],
  ['伪元素', {
    explanation: '以 :: 开头，创建一个不存在于 HTML 中的"虚拟元素"来装饰',
    analogy: '就像乐谱上"想象中的回声"——乐谱上没写，但演奏者心领神会地加了一个渐弱的尾音'
  }],
  ['NodeList', {
    explanation: 'querySelectorAll 返回的元素列表，类似数组，可用 forEach 遍历',
    analogy: '就像一份乐器清单——可以逐件检查、逐件调整'
  }],
  ['回调函数（Callback）', {
    explanation: '作为参数传给另一个函数的函数，在某个时刻被"回调"执行',
    analogy: '就像指挥给首席小提琴一个提示——当指挥棒落下时，你就开始独奏'
  }],
  ['回调', {
    explanation: '作为参数传给另一个函数的函数，在特定时刻被调用执行',
    analogy: '就像指挥给首席小提琴一个提示——当指挥棒落下时，你就开始独奏'
  }],
  ['防抖', {
    explanation: '在连续触发的事件中，只执行最后一次——等用户操作停下来再处理',
    analogy: '就像连续敲击定音鼓——只在最后一次击打后才让余音自然衰减'
  }],
  ['函数', {
    explanation: '一段有名字、可重复调用的代码块——写好一次，到处使用',
    analogy: '就像乐曲的主题动机（如贝多芬命运交响曲的"当当当当"）——全曲反复出现'
  }],
  ['变量', {
    explanation: '一个有名字的数据容器，用 let 或 const 声明——存储值以便后续使用',
    analogy: '就像乐谱上用字母标注的段落——A 段、B 段，指代一段具体的内容'
  }],
  ['数组', {
    explanation: '一组有序数据的集合，用方括号 [] 表示，每个元素有索引（从 0 开始）',
    analogy: '就像一份按顺序排列的曲目单——第 0 首、第 1 首、第 2 首...'
  }],
  ['参数', {
    explanation: '函数定义时声明的输入变量——调用函数时传入具体值',
    analogy: '就像协奏曲的华彩乐段——留给独奏者自由发挥的空间，每次演奏可以不同'
  }],
  ['属性（Property）', {
    explanation: 'CSS 中你想设置的样式特征，如 color、font-size——每个属性后面跟一个值',
    analogy: '就像乐谱上标注的音高、力度、速度——每个标注都有具体的值'
  }],
  // 以下为英文术语的独立定义——当内容中直接使用英文时也能识别
  ['HTML', {
    explanation: '超文本标记语言——网页的骨架，用标签来描述页面内容',
    analogy: '就像五线谱——决定页面上有什么内容'
  }],
  ['CSS', {
    explanation: '层叠样式表——控制网页的外观和布局',
    analogy: '就像乐谱上的演奏法标记——决定内容如何呈现'
  }],
  ['JavaScript', {
    explanation: '网页的编程语言——让页面有交互、动起来',
    analogy: '就像指挥家——让静态的乐谱活起来'
  }],
  ['DOM', {
    explanation: '文档对象模型——浏览器把 HTML 解析成一棵可操作的节点树',
    analogy: '就像交响乐团的总谱——每个声部（元素）都在上面，指挥（JS）可以修改它'
  }],
  ['Flexbox', {
    explanation: 'CSS 一维弹性布局模型——让元素在一行或一列中灵活排列',
    analogy: '就像把管乐手排成一排——自动调整间距，不会挤在一起'
  }],
  ['Grid', {
    explanation: 'CSS 二维网格布局——同时控制行和列',
    analogy: '就像交响乐团在舞台上的座位表——每个位置都有行有列'
  }],
  ['iframe', {
    explanation: '内嵌框架——在一个网页中嵌入另一个独立的网页',
    analogy: '就像音乐厅里的返听音箱——独立播放，不影响主舞台'
  }],
  ['localStorage', {
    explanation: '浏览器提供的本地存储——数据保存在用户电脑上，关闭浏览器也不会丢失',
    analogy: '就像你把乐谱收藏在自己的谱架上——下次打开还在那里'
  }],
  ['API', {
    explanation: '应用程序接口——一组预先定义好的功能，供你调用',
    analogy: '就像乐器本身——你不用知道钢琴内部怎么发声，只需按琴键就能得到想要的音'
  }],
  ['Bug', {
    explanation: '代码中的错误——导致程序不按预期运行',
    analogy: '就像乐谱上印错了一个音符——演奏出来会别扭，需要修正'
  }],
  ['事件', {
    explanation: '用户在页面上触发的动作——点击、输入、滚动等',
    analogy: '就像演奏者听到指挥棒敲击谱架的声音——这是开始演奏的"事件"'
  }],
  ['占位符', {
    explanation: '一个临时替代的标记，用于在文本处理过程中保护特殊内容不被修改',
    analogy: '就像排练时用数字代替尚未确定的歌词——先占个位置，后面再替换'
  }],
  ['if/else', {
    explanation: '条件判断语句——如果条件成立执行 A，否则执行 B',
    analogy: '就像反复记号——满足条件就跳回去，否则继续往下'
  }],
  ['forEach', {
    explanation: '数组的遍历方法——对数组中每一项执行同一个函数',
    analogy: '就像指挥依次让每个声部试奏同一段旋律'
  }],
  ['事件对象（event）', {
    explanation: '事件触发时浏览器自动创建的参数，包含事件的详细信息（如哪个元素被点击、按了哪个键）',
    analogy: '就像演出记录单——记录了谁在什么时间、以什么方式演奏了什么'
  }],
  ['事件对象', {
    explanation: '事件触发时浏览器自动创建的参数，包含事件的详细信息',
    analogy: '就像演出记录单——记录了谁、什么时间、以什么方式演奏'
  }],
  ['标签对', {
    explanation: '成对出现的 HTML 标签：开始标签 + 内容 + 结束标签',
    analogy: '就像乐谱中的小节线——有开始就有结束，成对出现'
  }],
  ['标签', {
    explanation: 'HTML 中用来标记内容的符号，用尖括号包裹，如 <h1>、<p>',
    analogy: '就像五线谱上的音符记号——告诉浏览器这是什么类型的内容'
  }],
  ['元素', {
    explanation: 'HTML 中一个完整的标签对（开始标签 + 内容 + 结束标签）',
    analogy: '就像乐谱中一个完整的音符——包括符头、符干和符尾'
  }],
  ['属性', {
    explanation: '写在 HTML 开始标签里的附加信息，如 class="card" src="pic.jpg"',
    analogy: '就像乐谱上的力度记号（p、f、ff）——给内容附加额外说明'
  }],
]

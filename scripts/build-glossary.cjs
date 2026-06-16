const fs = require('fs')

const existingContent = fs.readFileSync('src/configs/glossary.ts', 'utf-8')

// New entries sorted by key length DESC (longest first)
const newEntries = [
  // len 12
  `  ['DOCTYPE html', {\n    explanation: '文档类型声明——必须写在 HTML 文件第一行，告诉浏览器"这是 HTML5 页面"。不是真正的 HTML 标签。',\n    analogy: '就像乐谱第一行写的"扬琴独奏谱"——翻开就知道这是什么类型的乐谱、用什么记谱法。'\n  }]`,
  // len 11
  `  ['placeholder', {\n    explanation: '📍 特有属性。占位提示文字——input 和 textarea 特有。输入框为空时显示的灰色提示，一开始输入就消失。',\n    analogy: '就像考级报名表填空线上用铅笔浅浅写的"请在此处填写姓名"——提示你填什么，正式写的时候覆盖掉。'\n  }]`,
  // len 8
  `  ['fieldset', {\n    explanation: '表单字段分组标签——把相关表单控件圈在一起，配合 legend 设置组标题。',\n    analogy: '就像报名表上用框线画出的一个区域——"个人信息"外面有个框，里面是姓名+电话+地址。'\n  }]`,
  `  ['textarea', {\n    explanation: '多行文本输入标签——可以输入大段文字。rows 属性设置显示行数。',\n    analogy: '就像报名表上的"个人简介"大框——不是窄窄一条线，而是一整块区域。'\n  }]`,
  `  ['disabled', {\n    explanation: '📍 特有 + 🔘 布尔。禁用表单控件——input、select、textarea、button 特有。写了就让控件变灰、不可点击。',\n    analogy: '就像扬琴上暂时被锁住的弦——看得见但弹不了，暂时不能用。'\n  }]`,
  `  ['controls', {\n    explanation: '📍 特有 + 🔘 布尔。显示播放控件——audio 和 video 特有。写了就有播放/暂停/音量按钮。',\n    analogy: '就像音响的遥控器——有它就能操作播放，没它就只是一个不能互动的黑盒子。'\n  }]`,
  `  ['autoplay', {\n    explanation: '📍 特有 + 🔘 布尔。自动播放——audio 和 video 特有。页面加载后自动播放（浏览器通常会阻止）。',\n    analogy: '就像自动弹奏扬琴——一开机就开始弹。但大多数场合你需要先按"开始"。'\n  }]`,
  // len 7
  `  ['checked', {\n    explanation: '📍 特有 + 🔘 布尔。默认选中——radio 和 checkbox 特有。写了就默认打勾选中。',\n    analogy: '就像报名表上"性别"栏已经预勾了一个选项——你可以改，但默认就有一个。'\n  }]`,
  `  ['colspan', {\n    explanation: '📍 特有属性。跨列合并——td 和 th 特有。让一个单元格横向跨越多列。值是一个数字。',\n    analogy: '就像扬琴合奏谱中"齐奏"标记横跨所有声部——占满一整行。'\n  }]`,
  `  ['rowspan', {\n    explanation: '📍 特有属性。跨行合并——td 和 th 特有。让一个单元格纵向跨越多行。',\n    analogy: '就像曲目单中一首大型作品占了好几行——因为它的介绍比其他作品长。'\n  }]`,
  `  ['charset', {\n    explanation: '📍 特有属性。字符编码声明——meta 标签特有。不声明 charset="UTF-8" 会导致中文乱码。',\n    analogy: '就像乐谱开头标注"五线谱·固定调"——不写清楚，别人可能用简谱或首调来读，全乱套。'\n  }]`,
  `  ['content', {\n    explanation: '📍 特有属性。meta 标签的内容属性——配合 name 属性使用，提供元数据的值。',\n    analogy: '就像乐谱封面上的副标题——"为扬琴与钢琴而作"——补充说明这张谱的性质。'\n  }]`,
  `  ['article', {\n    explanation: '独立文章语义标签——可以独立分发、复用的完整内容块（如一篇博客）。',\n    analogy: '就像一首可以独立演奏的扬琴小品——从组曲中抽出来单独弹也完整。'\n  }]`,
  `  ['section', {\n    explanation: '区块语义标签——把一个主题相关的内容分组，通常包含一个标题。',\n    analogy: '就像扬琴曲中的一个乐段——"引子""快板""慢板""再现"，各段有独立主题但属于同一首曲子。'\n  }]`,
  // len 6
  `  ['header', {\n    explanation: '页头语义标签——通常包含网站 Logo、标题和主导航。',\n    analogy: '就像乐谱顶部的作品信息——曲名、作者、编号，一眼就知道这是什么。'\n  }]`,
  `  ['footer', {\n    explanation: '页脚语义标签——通常包含版权信息、联系方式、底部链接。',\n    analogy: '就像乐谱最后一页的版权声明——"XX 出版社 2024 年编订"。'\n  }]`,
  `  ['source', {\n    explanation: '媒体源标签——放在 audio 或 video 中，提供多种格式让浏览器选支持的播放。是单标签。',\n    analogy: '就像同一首曲子准备了简谱版和五线谱版——哪个能用就用哪个。'\n  }]`,
  `  ['strong', {\n    explanation: '加粗强调标签——浏览器默认加粗显示，语义上表示"重要内容"。是内联元素。',\n    analogy: '就像重音记号（>）——这个音要比周围的音更突出、更有力。'\n  }]`,
  `  ['button', {\n    explanation: '按钮标签——type="submit" 提交表单，type="button" 是普通按钮。',\n    analogy: '就像报名表最底下的"提交报名"按钮——填完了，按下去。'\n  }]`,
  `  ['select', {\n    explanation: '下拉选择框容器——用户从预定义的选项中选一个。内含 option 选项。',\n    analogy: '就像报名表上的"报考级别"下拉框——初级/中级/高级，选一个。'\n  }]`,
  `  ['option', {\n    explanation: '下拉选项标签——放在 select 中，每个 option 是一个可选条目。',\n    analogy: '就像下拉框里每一个具体选项——"初级""中级""高级"各自是一行。'\n  }]`,
  `  ['legend', {\n    explanation: '字段组标题标签——fieldset 内部第一个元素，作为分组的标题文字。',\n    analogy: '就像报名表上分组框线左上角写的"个人信息"——告诉你这个框里填什么。'\n  }]`,
  `  ['height', {\n    explanation: '📍 特有属性。元素高度——img、video 等元素特有。设定显示高度。',\n    analogy: '就像规定乐谱在谱架上的摆放高度——和宽度一起决定显示比例。'\n  }]`,
  `  ['hidden', {\n    explanation: '🌐 全局 + 🔘 布尔。隐藏元素——任何元素都能用。写了就让元素从页面消失。',\n    analogy: '就像乐谱中被划掉的小节——内容还在谱面上，但指挥（浏览器）决定跳过不演。'\n  }]`,
  // len 5
  `  ['audio', {\n    explanation: '音频标签——在页面中嵌入音频播放器。controls 属性显示播放/暂停按钮。',\n    analogy: '就像给你的网页装了一个内置扬声器——可以直接播放你录好的扬琴曲。'\n  }]`,
  `  ['video', {\n    explanation: '视频标签——在页面中嵌入视频播放器。controls 属性显示播放控件。',\n    analogy: '就像给你的网页装了一个屏幕——播放扬琴演奏录像。'\n  }]`,
  `  ['input', {\n    explanation: '输入标签——最通用的表单元素。通过 type 属性变成文本框、密码框、日期选择器等。是单标签。',\n    analogy: '就像考级报名表上的填空线——用户在这条线上写字的地方。'\n  }]`,
  `  ['label', {\n    explanation: '标签标签——给表单控件加文字说明。for 属性关联 input 的 id，点击文字时输入框自动获得焦点。',\n    analogy: '就像填空线前面写的"姓名："——告诉填表的人这条线该写什么。'\n  }]`,
  `  ['style', {\n    explanation: '🌐 全局属性。内联样式——直接在 HTML 元素上写 CSS。优先级高，但尽量少用（用外部 CSS 文件更好）。',\n    analogy: '就像直接在音符旁边手写"强一些""渐慢"——有效但不规范。正式乐谱用标准演奏记号（相当于外部 CSS 文件）。'\n  }]`,
  `  ['class', {\n    explanation: '🌐 全局属性。给元素起一个分类名——多个元素可以共用同一个 class。CSS 中用 .class名 选中。',\n    analogy: '就像给琴竹分类——"这批是硬竹""这批是软竹"。同一类竹法可以用在多根弦上。class 就是给元素贴标签分组。'\n  }]`,
  `  ['table', {\n    explanation: '表格容器标签——用行列结构展示数据。现代布局请用 CSS Grid，表格仅用于表格数据。',\n    analogy: '就像扬琴练琴记录表——日期、练习曲目、时长、问题备注，一行行一目了然。'\n  }]`,
  `  ['thead', {\n    explanation: '表格头部区域——包裹表头行（tr > th），和表体分开方便设置样式。',\n    analogy: '就像练琴记录表顶部的标题栏——和下面密密麻麻的数据区分开。'\n  }]`,
  `  ['tbody', {\n    explanation: '表格主体区域——包裹数据行，和表头分开方便设置样式。',\n    analogy: '就像练琴记录表中列出每天练习数据的实际区域。'\n  }]`,
  `  ['title', {\n    explanation: '页面标题标签——放在 head 中。浏览器标签页上显示的文字，也是搜索引擎显示的标题。',\n    analogy: '就像写在乐谱封面上的曲名——读者第一眼看到的标识。'\n  }]`,
  `  ['value', {\n    explanation: '📍 特有属性。表单控件的值——用户填写的内容，或 radio/checkbox 选中时提交的值。',\n    analogy: '就像报名表上你实际写的内容——"张三""中级""春到清江"。value 是你填进去的具体答案。'\n  }]`,
  `  ['width', {\n    explanation: '📍 特有属性。元素宽度——img、video 等元素特有。设定显示宽度。',\n    analogy: '就像规定乐谱在谱架上的摆放宽度——太宽占地方，太窄看不清。'\n  }]`,
  // len 4
  `  ['全局属性', {\n    explanation: '可以写在任何 HTML 元素上的属性，不受元素类型限制。如 class、id、style、lang、hidden。',\n    analogy: '就像力度记号（p、f、ff）——不管弹哪根弦、哪个音区，力度标记对所有音都适用。所有标签都能用全局属性。'\n  }]`,
  `  ['特有属性', {\n    explanation: '只能用在特定 HTML 元素上的属性。如 src 只用于 img/audio/video，href 只用于 a/link。',\n    analogy: '就像扬琴的止音技法——只有特定段落、特定弦才需要用，不是每根弦都要止音。只有特定标签才能用特有属性。'\n  }]`,
  `  ['布尔属性', {\n    explanation: '不需要写值的 HTML 属性——出现在标签里就生效，不出现就不生效。如 controls、checked、disabled。',\n    analogy: '就像扬琴踏板（制音踏板）——踩下去就止音，放开就不止音。没有"踩一半"的中间状态。'\n  }]`,
  `  ['单标签', {\n    explanation: '不需要结束标签的 HTML 元素，如 <img>、<br>、<input>。开口即结束，不需要 </xxx>。',\n    analogy: '就像单击泛音——竹头点一下弦面立刻离开，一个动作就完成，不需要"结束动作"。'\n  }]`,
  `  ['块级元素', {\n    explanation: '独占一行的 HTML 元素，如 div、h1、p。宽度默认占满父容器，后续内容自动换行。',\n    analogy: '就像独奏段落——演奏者独占舞台中央，伴奏暂停或退到背景。块级元素就是页面中的"独奏者"。'\n  }]`,
  `  ['内联元素', {\n    explanation: '在文字流内部不换行的 HTML 元素，如 span、a、strong。只占内容本身宽度，不会导致换行。',\n    analogy: '就像装饰音/加花——不打断主旋律的进行，在句子内部轻巧地穿插。'\n  }]`,
  `  ['html', {\n    explanation: '整个网页的根元素，所有其他元素都嵌套在它里面。lang 属性声明页面语言。',\n    analogy: '就像扬琴的整个琴面——所有琴弦、琴码都在这个框架内。'\n  }]`,
  `  ['head', {\n    explanation: '页面元信息区——不直接显示内容，存放字符编码、页面标题、CSS 链接等幕后配置。',\n    analogy: '就像乐谱开头的调号、拍号、速度标记——演奏前必须看清楚，但观众听不到这些符号本身。'\n  }]`,
  `  ['body', {\n    explanation: '页面主体——所有用户在浏览器中看到的内容都写在 body 里面。',\n    analogy: '就像乐谱的正文——所有音符、小节、演奏记号都在这里。head 是调号拍号，body 是实际要弹的内容。'\n  }]`,
  `  ['meta', {\n    explanation: '元数据标签——放在 head 中，定义字符集、视口设置等。是单标签。',\n    analogy: '就像扬琴的定弦标签——标明每根弦调什么音，给调律师看的，演奏时看不到。'\n  }]`,
  `  ['link', {\n    explanation: '外部资源链接标签——放在 head 中，用于连接 CSS 样式文件、网站图标等。是单标签。',\n    analogy: '就像节目单上标注的"伴奏：XX 扬琴伴奏"——引入外部资源配合当前页面。'\n  }]`,
  `  ['form', {\n    explanation: '表单容器标签——包裹所有输入元素，用于收集用户填写的数据并提交。',\n    analogy: '就像扬琴考级报名表——一张纸上包含所有要填写的信息。'\n  }]`,
  `  ['lang', {\n    explanation: '🌐 全局属性。语言声明——告诉浏览器和屏幕阅读器这个元素的内容是什么语言（如 zh-CN、en）。',\n    analogy: '就像乐谱上标注"五线谱"还是"简谱"——告诉读谱的人用什么体系来解读。'\n  }]`,
  `  ['href', {\n    explanation: '📍 特有属性。超链接目标地址——告诉浏览器点击后跳到哪里。必须写完整网址（含 https://）。',\n    analogy: '就像乐谱上的 D.C. 或 D.S. 记号——指向要跳转回去的位置。必须写清楚从哪里反复。'\n  }]`,
  `  ['name', {\n    explanation: '📍 特有属性。表单控件名称——提交表单时作为数据标签发送。radio 中同 name 的互斥（只能选一个）。',\n    analogy: '就像报名表上每个填空格前面的题目——"姓名""级别""曲目"。name 决定了交卷时数据的标签。'\n  }]`,
  `  ['rows', {\n    explanation: '📍 特有属性。多行文本框行数——textarea 特有。设置输入框显示多少行高度。',\n    analogy: '就像练习记录本上留给"本周总结"的行数——三行还是五行，决定了你能写多少。'\n  }]`,
  `  ['type', {\n    explanation: '📍 特有属性。类型声明——用在 input 上决定输入框类型，用在 source 上声明媒体格式等。',\n    analogy: '就像标注"这是轮音""这是琶音"——决定了这个记号的演奏方式。'\n  }]`,
  `  ['main', {\n    explanation: '主要内容语义标签——包裹页面核心内容，每个页面只应有一个 main。',\n    analogy: '就像一首曲子的主要乐章——去掉引子和尾声后真正的音乐内容。'\n  }]`,
  `  ['span', {\n    explanation: '内联容器标签——本身无样式，用于在文字流中标记某一段。内联元素，不换行。',\n    analogy: '就像在乐谱某几个音上画的圈——标记特定音符，不打断整个乐句。'\n  }]`,
  `  ['loop', {\n    explanation: '📍 特有 + 🔘 布尔。循环播放——audio 和 video 特有。播放完后自动从头开始。',\n    analogy: '就像练琴模式——"这一段再来一遍"，弹完自动重来，直到你叫停。'\n  }]`,
  // len 3 (Chinese chars count as 1 each)
  `  ['a 标签', {\n    explanation: '超链接标签——点击后跳转到另一个页面。href 属性指定目标地址。内联元素。',\n    analogy: '就像乐谱中的 D.C.（从头反复）——指向另一个位置，告诉演奏者"跳过去"。'\n  }]`,
  `  ['src', {\n    explanation: '📍 特有属性。资源来源地址——告诉浏览器图片/音频/视频文件在哪里。用在 img、audio、video、source 上。',\n    analogy: '就像乐谱上写的"改编自 XX 作品"——指向素材的原始来源。'\n  }]`,
  `  ['alt', {\n    explanation: '📍 特有属性。图片替代文字——img 标签特有。图片加载不出时显示这段文字，屏幕阅读器也会读出。',\n    analogy: '就像给一首没有录音的扬琴新作写文字描述——"抒情风格中板曲"，没听到也知道大概是什么样的。'\n  }]`,
  `  ['img', {\n    explanation: '图片标签——在页面中插入图片。是单标签。src 指定图片地址，alt 提供替代文字。',\n    analogy: '就像扬琴谱上的指法图/音位图——不是音符本身，但帮助理解怎么演奏。'\n  }]`,
  `  ['div', {\n    explanation: '块级容器标签——本身无样式，用于把一组元素包在一起。块级元素，独占一行。',\n    analogy: '就像扬琴上的音区划分——高音区是一块、中音区是一块、低音区是一块，每块独立但同属一架琴。'\n  }]`,
  `  ['nav', {\n    explanation: '导航语义标签——包裹主要的导航链接菜单，告诉浏览器"这是导航区域"。',\n    analogy: '就像乐谱的目录/索引——告诉你从哪里可以跳到哪个乐章。'\n  }]`,
  `  ['for', {\n    explanation: '📍 特有属性。标签关联——label 特有。值等于对应 input 的 id。点击 label 文字时自动聚焦输入框。',\n    analogy: '就像填空线前面写的"姓名："——"姓名"和填空线是配对的。for 就是告诉浏览器"这个词对应那条线"。'\n  }]`,
  `  ['rel', {\n    explanation: '📍 特有属性。关系声明——link 和 a 特有。声明当前页面与被链接资源的关系（如 stylesheet、icon）。',\n    analogy: '就像节目单上标"特邀嘉宾"——说明链接对象和当前页面的关系。'\n  }]`,
  `  ['max', {\n    explanation: '📍 特有属性。最大值——input 的 type="number"或"range"特有。设定允许的最大数值。',\n    analogy: '就像节拍器最快 208 BPM——不能再快了。max 是数字输入的上限。'\n  }]`,
  `  ['min', {\n    explanation: '📍 特有属性。最小值——input 的 type="number"或"range"特有。设定允许的最小数值。',\n    analogy: '就像节拍器最慢 40 BPM——不能再慢了。min 是数字输入的下限。'\n  }]`,
  // len 2
  `  ['h1', {\n    explanation: '一级标题标签——页面中最重要的标题。h1 到 h6 共六级，数字越小字越大。通常一个页面只有一个 h1。',\n    analogy: '就像扬琴曲谱上的大标题——比如《春到清江》，第一眼看到、最大的那个字。'\n  }]`,
  `  ['id', {\n    explanation: '🌐 全局属性。元素唯一标识——整个页面中同一个 id 只能出现一次。CSS 中用 #id名 选中。',\n    analogy: '就像扬琴上每根弦的唯一编号——C3、D3、E3…全琴没有两根弦编号相同。id 就是元素的"身份证号"。'\n  }]`,
  `  ['em', {\n    explanation: '斜体强调标签——浏览器默认斜体显示，语义上表示"语气强调"。是内联元素。',\n    analogy: '就像揉弦/颤音——让这个音更有表情、更柔美。不是更大声，而是更有韵味。'\n  }]`,
  `  ['br', {\n    explanation: '换行标签——在文字中强制换行。是单标签，不需要结束标签。',\n    analogy: '就像乐谱中的换气记号——在这里换一口气，但不表示乐句结束。'\n  }]`,
  `  ['ul', {\n    explanation: '无序列表容器——列表项前显示圆点，顺序不重要时使用。li 必须放在 ul 或 ol 里面。',\n    analogy: '就像练琴前的备选曲目单——先挑哪首练都可以，每首地位平等。'\n  }]`,
  `  ['ol', {\n    explanation: '有序列表容器——列表项前显示数字（1, 2, 3…），顺序重要时使用。li 必须放在 ul 或 ol 里面。',\n    analogy: '就像练琴步骤——必须先练音阶，再练练习曲，最后才是乐曲。顺序不能乱。'\n  }]`,
  `  ['li', {\n    explanation: '列表项标签——必须放在 ul 或 ol 里面，不能单独使用。每个 li 是一个条目。',\n    analogy: '就像节目单上的每一行——必须属于整张节目单，不能单独飘在外面。'\n  }]`,
  `  ['tr', {\n    explanation: '表格行标签——定义表格中的一行，放在 table 里面的 thead 或 tbody 中。',\n    analogy: '就像练琴记录表中的某一天——那一行包含当天的所有练习信息。'\n  }]`,
  `  ['td', {\n    explanation: '表格数据单元格——表格中最基础的格子，放具体数据。',\n    analogy: '就像练琴记录表中的一个格子——比如"60 分钟""春到清江"。'\n  }]`,
  `  ['th', {\n    explanation: '表格表头单元格——加粗居中显示，表示一列或一行的标题。',\n    analogy: '就像练琴记录表顶部的列名——"日期""曲目""时长""问题"——加粗的那一行。'\n  }]`,
  // len 1 keys are too risky for false matches — skip
]

// Insert new entries just before the closing ], after all existing entries
const closingBracket = existingContent.lastIndexOf(']')
const before = existingContent.substring(0, closingBracket)
const after = existingContent.substring(closingBracket)

// Add comma after last existing entry if needed
const newContent = before.trimEnd().endsWith(',')
  ? before + '\n' + newEntries.join(',\n') + '\n' + after
  : before + ',\n' + newEntries.join(',\n') + '\n' + after

fs.writeFileSync('src/configs/glossary.ts', newContent, 'utf-8')
console.log('Done! Added ' + newEntries.length + ' new entries at end.')

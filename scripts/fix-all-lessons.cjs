const fs = require('fs');
let src = fs.readFileSync('src/configs/lessons.ts', 'utf-8');
let changed = 0, skipped = 0;
const N = '\\n'; // literal \n for JS string escaping in the source file

const fixes = [
  // ============ HTML 章（重新应用 + 新增） ============
  // L1: html-intro
  [`HTML 使用**标签（tag）**来标记内容。每个标签用尖括号`,
   `每一首扬琴曲都写在一张乐谱上——音符告诉你要弹什么，指法告诉你用什么竹法。网页也一样：HTML 像乐谱的音符，告诉浏览器这里放什么内容；CSS 像演奏技法记号，告诉浏览器用什么颜色、多大字号；JavaScript 像你的双手，让网页动起来。${N}${N}先从最简单的两个标签开始：h1 是页面最大的标题（就像扬琴谱上的大标题《春到清江》），p 标签是段落（就像一个乐句）。${N}${N}HTML 使用**标签（tag）**来标记内容。每个标签用尖括号`],

  // L2: html-doc-structure
  [`你之前写的 \x60<h1>\x60 和 \x60<p>\x60 代码，实际上运行在一个看不见的文档结构里。完整的 HTML 页面长这样`,
   `就像扬琴谱有固定的格式——调号、拍号写在最前面，然后是音符正文。HTML 页面也有自己的骨架结构。在认识骨架之前，先记住几个关键标签的名字和角色：DOCTYPE html 声明文档类型（告诉浏览器"这是 HTML5 页面"），html 是整个页面的根元素，head 存放幕后配置信息，body 存放所有可见内容。${N}你之前写的 \x60<h1>\x60 和 \x60<p>\x60 代码，实际上运行在一个看不见的文档结构里。完整的 HTML 页面长这样`],

  // L3: html-emphasis
  [`上一节课我们学会了写标题和段落。但这就像只有一种力度的音乐——太平淡了。${N}现在我们来学习两个新标签`,
   `上一节课我们学会了写标题和段落。但这就像只有一种力度的音乐——太平淡了。${N}${N}现在我们来学习三个新标签，让文字也有"强弱变化"：strong 标签加粗强调重要内容（就像重音记号 >），em 标签斜体强调语气（就像揉弦/颤音——不是更大声，而是更有韵味），br 标签在文字中换行（就像换气记号，是单标签，不需要结束标签）。${N}${N}具体写法：${N}现在我们来学习两个新标签`],

  // L3: strong/b comparison (after example, before task)
  [`可以看到"肖邦"加粗了，"优美而忧伤"变成斜体了，而且中间还有一个换行。`,
   `可以看到"肖邦"加粗了，"优美而忧伤"变成斜体了，而且中间还有一个换行。${N}${N}---${N}${N}**strong 和 b 标签的区别、em 和 i 标签的区别：**${N}strong = 重音记号 >（表示"这个音要突出"，有音乐含义）${N}b 标签 = 只是视觉上加粗（没有音乐含义，就像用粗笔写谱子——看上去粗，不代表要用力弹）${N}em = 揉弦/颤音（表示"这里要有表情"，有音乐含义）${N}i 标签 = 只是视觉上倾斜（没有音乐含义）${N}${N}练扬琴你就知道：f（强音）和 >（重音）不一样。f 是整段的力度，> 是个别音的重音。strong 就像 >——标记需要突出的重要内容。${N}${N}错误示范：忘了写 </strong> → 后面的所有文字都会加粗！就像忘了终止线——后面的小节也不知道新乐段从哪开始。`],

  // L4: html-lists
  [`当你想列出喜欢的作曲家、曲目或乐器时，就需要用到列表标签：${N}- \x60<ul>\x60 — **无序列表**（unordered list），前面是圆点`,
   `当你想列出喜欢的作曲家、曲目或乐器时，就需要用到列表标签。ul 是无序列表（前面是圆点，先弹哪首都行），ol 是有序列表（前面是数字，顺序不能乱），li 是列表项——每个 li 必须放在 ul 或 ol 里面，就像节目单上的每一行必须属于某张单子。${N}${N}具体写法：${N}- \x60<ul>\x60 — **无序列表**（unordered list），前面是圆点`],

  // L5: html-images-links - img explain
  [`纯文字太单调了！用 \x60<img>\x60 标签可以插入图片：${N}\\x60\\x60\\x60html${N}<img src="图片地址" alt="图片描述">${N}\\x60\\x60\\x60- \x60src\x60 — 图片的地址`,
   `纯文字太单调了——就像一份只有音符没有指法的谱子。img 标签可以在网页中插入图片，它是单标签——不需要结束标签，就像单击泛音，竹头点一下弦面立刻离开。${N}${N}src 属性告诉浏览器图片在哪里（📍特有属性），alt 属性在图片显示不出来时显示替代文字（📍特有属性——就像给一首没有录音的扬琴新作写一段文字描述）。${N}\\x60\\x60\\x60html${N}<img src="图片地址" alt="图片描述">${N}\\x60\\x60\\x60- \x60src\x60 — 图片的地址`],

  // L5: link explain
  [`用 \x60<a>\x60 标签可以创建超链接，点击后跳转到其他页面：${N}\\x60\\x60\\x60html${N}<a href="网址">点击这里</a>${N}\\x60\\x60\\x60- \x60href\x60 — 要跳转的网址`,
   `a 标签可以创建超链接——点击后跳转到另一个页面（内联元素，在文字流中不换行）。href 属性指定跳转的目标地址（📍特有属性，必须写完整网址含 https://）。就像乐谱上的反复记号 D.C.——指向另一个位置，告诉演奏者"跳过去"。${N}\\x60\\x60\\x60html${N}<a href="网址">点击这里</a>${N}\\x60\\x60\\x60- \x60href\x60 — 要跳转的网址`],

  // L5: progressive example
  [`下面就是编辑器中的代码。结合了图片和链接的个人音乐卡片：${N}\\x60\\x60\\x60html${N}<h1>肖邦</h1>${N}<img src="https://oss.tan8.com/yuepuku/155/77798/77798_prev.jpg" alt="作曲家肖像">${N}<p>${N}  了解更多，请访问${N}  <a href="https://zh.wikipedia.org/wiki/肖邦">肖邦的维基百科</a>${N}</p>${N}\\x60\\x60\\x60`,
   `就像练一首曲子先分手再合手，我们也分三步来构建这张音乐卡片：${N}${N}**第 1 步：先写标题**${N}\\x60\\x60\\x60html${N}<h1>肖邦</h1>${N}\\x60\\x60\\x60${N}${N}**第 2 步：加入图片**${N}\\x60\\x60\\x60html${N}<h1>肖邦</h1>${N}<img src="https://oss.tan8.com/yuepuku/155/77798/77798_prev.jpg" alt="作曲家肖像">${N}\\x60\\x60\\x60${N}→ 翻译：插入一张图片，如果显示不出来就显示 alt 指定的"作曲家肖像"。${N}${N}**第 3 步：加上介绍文字和链接**${N}\\x60\\x60\\x60html${N}<h1>肖邦</h1>${N}<img src="https://oss.tan8.com/yuepuku/155/77798/77798_prev.jpg" alt="作曲家肖像">${N}<p>${N}  了解更多，请访问${N}  <a href="https://zh.wikipedia.org/wiki/肖邦">肖邦的维基百科</a>${N}</p>${N}\\x60\\x60\\x60${N}→ 翻译：加一段介绍文字，其中"肖邦的维基百科"是可点击的链接。`],

  // L6: html-div-span
  [`\x60<div>\x60 和 \x60<span>\x60 本身不添加任何样式，它们的作用是**把内容分组**，方便后面用 CSS 美化或用 JS 操控。${N}- \x60<div>\x60 — **块级元素**（block），独占一行`,
   `div 和 span 本身不添加任何样式，它们是用来把内容分组的——div 是块级元素（独占一行，就像独奏段落独占舞台中央），span 是内联元素（在文字流中不换行，就像装饰音/加花）。${N}${N}class 属性可以给它们贴上分类标签（🌐全局属性——所有标签都能用）。class 就像给琴竹分类——"这批是硬竹""这批是软竹"，同一类竹法可以给多根弦用。${N}${N}具体写法：${N}- \x60<div>\x60 — **块级元素**（block），独占一行`],

  // L6: class vs id
  [`简单记忆：**div 管"块"，span 管"字"。**就像管弦乐中——div 是乐器组（弦乐组、管乐组），span 是组内某个乐手。`,
   `简单记忆：**div 管"块"，span 管"字"。**就像扬琴的音区划分——div 是高音区/中音区/低音区各自独立成块，span 是在某几个音上画圈标记。${N}${N}---${N}${N}**class 和 id 的区别**（两个都是全局属性，但用法完全不同）：${N}- class = 琴竹分类（硬竹/软竹/反竹）——多个元素可以共用同一个 class 名，CSS 用 .class名 选中${N}- id = 琴弦唯一编号（C3/D3/E3...）——整个页面同个 id 只能出现一次，CSS 用 #id名 选中${N}${N}什么时候用 class？给一组相似元素统一样式（比如所有"作曲家名字"都加金色）${N}什么时候用 id？给独一无二的元素特殊样式（比如页面唯一的"提交按钮"）`],

  // L7: html-semantic
  [`之前我们一直用 \x60<div>\x60 来分组内容。但 \x60<div>\x60 本身没有"含义"——浏览器不知道一个 \x60<div>\x60 是导航栏还是文章正文。${N}语义化标签用**有名字的标签**来标记不同区域：${N}- \x60<header>\x60 — 页头`,
   `之前我们一直用 div 来分组内容。但 div 本身没有"含义"——浏览器不知道一个 div 是导航栏还是文章正文。${N}${N}语义化标签用有名字的标签来标记不同区域：header 是页头，nav 是导航菜单，main 是页面主体，section 是内容区块，article 是独立文章，footer 是页脚——看名字就知道它是什么。就像你的扬琴每根弦都有固定音名（C3、D3、E3），而不是全部叫"弦1、弦2"。${N}${N}具体写法：${N}- \x60<header>\x60 — 页头`],

  // L8: html-audio-video
  [`用 \x60<audio>\x60 标签可以在网页中嵌入音乐播放器：${N}\\x60\\x60\\x60html${N}<audio controls src="音乐文件地址">${N}  你的浏览器不支持音频播放${N}</audio>${N}\\x60\\x60\\x60- \x60controls\x60 — 显示播放/暂停/音量控件`,
   `audio 标签可以在网页中嵌入音乐播放器——就像给你的网页装了一个内置扬声器，可以直接播放你录好的扬琴曲。它的常用属性：controls 显示播放按钮（布尔属性——写了就有，不写就没有），src 指定音频文件地址，autoplay 自动播放，loop 循环播放。${N}\\x60\\x60\\x60html${N}<audio controls src="音乐文件地址">${N}  你的浏览器不支持音频播放${N}</audio>${N}\\x60\\x60\\x60- \x60controls\x60 — 显示播放/暂停/音量控件`],

  // L9: html-tables
  [`表格由外到内有三层标签：${N}- \\x60<table>\\x60 — 整个表格的容器${N}- \\x60<tr>\\x60 — **表行**（table row），一行${N}- \\x60<td>\\x60 — **表单元格**（table data），一个格子`,
   `表格由外到内有三层标签：table 是整个表格的容器，tr 是表行（table row），td 是表单元格（table data）。每对 tr 是一行，里面每个 td 是一个格子。就像练琴记录表——整张表是 table，每一天是一行 tr，每个格子（日期/曲目/时长）是一个 td。${N}\\x60\\x60\\x60html${N}<table>${N}  <tr>${N}    <td>巴赫</td>${N}    <td>巴洛克</td>${N}    <td>德国</td>${N}  </tr>${N}  <tr>${N}    <td>肖邦</td>${N}    <td>浪漫主义</td>${N}    <td>波兰</td>${N}  </tr>${N}</table>${N}\\x60\\x60\\x60`],

  // L10: html-forms
  [`表单（\x60<form>\x60）用来收集用户输入的信息。你在网上填过的所有东西——注册、搜索、评论——都是表单。${N}表单的核心标签：`,
   `你在网上填过的所有东西——考级报名、搜索曲谱、写留言——都是表单（form）。form 是整张表单的容器，input 是填空线（单标签），label 是填空线前面的标题，select 是下拉选择框（内含 option 选项），textarea 是多行文本框，button 是提交按钮。${N}${N}就像扬琴考级报名表——一张纸上包含所有要填写的信息。${N}${N}表单的核心标签：`],

  // L10: form attribute table (after example, before task)
  [`切换到预览区，可以和这个表单互动！`,
   `切换到预览区，可以和这个表单互动！${N}${N}---${N}${N}**表单四个最容易搞混的属性**（用一张考级报名表来理解）：${N}${N}id — 给输入框一个唯一编号（就像老师给每道题编序号：第1题、第2题）${N}for — label 通过 for 指向某个 input 的 id，配对后点击文字就能聚焦输入框（就像"姓名："后面的填空线）${N}name — 提交表单时数据标签的名称，radio 同名的互斥（就像报名表上每道题的题目——"姓名""级别""曲目"）${N}value — 你实际填上去的答案（就像在报名表上写的"张三""中级""春到清江"）${N}${N}错误示范：label 的 for 和 input 的 id 写得不一样 → 点击"姓名："两个字，输入框没反应！for 和 id 必须一模一样，就像锁和钥匙必须配对。`],

  // L11: html-input-types
  [`当用户只能**选一个**时用 radio。同一组 radio 的 \x60name\x60 属性必须相同：`,
   `input 标签通过 type 属性可以变成单选按钮（radio）、多选按钮（checkbox）、滑块（range）、数字输入（number）、颜色选择器（color）等不同类型。fieldset 和 legend 用来给表单控件分组——就像报名表上"个人信息"外面画的那个框和标题。${N}${N}当用户只能**选一个**时用 radio。同一组 radio 的 name 属性必须相同：`],

  // L12: html-capstone
  [`回顾一下你学过的所有 HTML 标签：${N}| 标签 | 用途 |`,
   `回顾一下你学过的所有标签。下面按"你想做什么"分类，方便查找：${N}${N}**我想在页面上写文字：**${N}h1~h6（标题，数字越小字越大）| p（段落）| strong（加粗强调）| em（斜体强调）| br（换行，单标签）${N}${N}**我想列一个清单：**${N}ul（无序列表，前面是圆点）| ol（有序列表，前面是数字）${N}ul 和 ol 里面必须放 li（列表项），就像曲目单上的每一行必须属于某张单子${N}${N}**我想放图片或链接：**${N}img（图片，单标签）+ src 属性（图片地址）+ alt 属性（替代文字）${N}a 标签（超链接）+ href 属性（跳转地址，必须写 https://）${N}${N}**我想把内容分组：**${N}div（块级容器，独占一行）| span（内联容器，不换行）${N}通过 class 属性给它们贴标签分组，通过 id 属性给某个元素唯一编号${N}${N}**我想搭页面结构：**${N}header（页头）| nav（导航）| main（主体）| section（区块）| article（文章）| footer（页脚）${N}${N}**我想嵌入音频或视频：**${N}audio（音频）+ video（视频）+ source（备选格式）${N}三个布尔属性：controls（显示播放按钮）、autoplay（自动播放）、loop（循环播放）${N}${N}**我想做表格：**${N}table 是整个表格 → thead（表头区）+ tbody（数据区）→ 每个 tr 是一行 → 每行里 th（标题格）或 td（数据格）${N}跨列用 colspan，跨行用 rowspan${N}${N}**我想做表单收集信息：**${N}form（表单容器）→ input（输入框，单标签）+ label（标签文字）+ textarea（多行文本）+ select→option（下拉框）+ button（按钮）${N}四组关键属性配合：input 的 id ↔ label 的 for | name（提交时数据名称）| value（填写的值）${N}${N}---${N}${N}**属性速查：这个标签能用哪些属性？**${N}${N}| 标签 | 它的特有属性 |${N}|------|-------------|${N}| img | src, alt, width, height |${N}| a | href, rel |${N}| audio / video | src, controls, autoplay, loop |${N}| input | type, placeholder, name, value, min, max, checked |${N}| label | for |${N}| textarea | rows, placeholder |${N}| td / th | colspan, rowspan |${N}${N}全局属性（任何标签都能用）：class | id | style | lang | hidden${N}布尔属性（不需要写值）：controls | autoplay | loop | checked | disabled | hidden${N}${N}就像扬琴踏板——踩下去就止音，放开就不止音，没有"踩一半"。${N}现在，把这些知识组合起来，做一张属于你自己的"个人音乐主页"！`],

  // ============ CSS 样式章 ============
  // CSS intro
  [`CSS（Cascading Style Sheets，层叠样式表）负责网页的外观。HTML 决定了「有什么」，CSS 决定了「长什么样」。${N}一句 CSS 规则由三部分组成：`,
   `CSS（Cascading Style Sheets，层叠样式表）负责网页的外观。HTML 决定了「有什么」，CSS 决定了「长什么样」。就像扬琴上同一根弦用不同的力度和竹法能弹出不同音色——color 属性控制文字颜色，font-size 属性控制文字大小，选择器（selector）告诉 CSS "这条规则对谁生效"。${N}${N}一句 CSS 规则由三部分组成：`],

  // CSS bg-border - already done by previous script, skip check
  // CSS font-spacing - already done
  // CSS box-model - already done
  // CSS cascade - already done
  // CSS animations - already done
  // CSS variables - already done

  // ============ CSS 布局章 ============
  // Flexbox
  [`控制一维布局（横向或纵向）：`,
   `Flexbox（弹性布局）让元素在一行或一列中灵活排列。display:flex 启用弹性容器，justify-content 控制横向对齐，align-items 控制纵向对齐，flex-direction 决定排列方向。就像扬琴合奏时确定每个演奏者的位置和间距。控制一维布局（横向或纵向）：`],

  // Position
  [`position 属性控制元素在页面上的定位方式。默认所有元素的 position 都是 static——按照正常文档流排列。`,
   `position 属性控制元素的定位方式——static（默认排列）、relative（相对自身偏移）、absolute（相对父级定位）、fixed（固定在屏幕上）、sticky（滚动吸附）。就像舞台上不同角色的站位——伴奏原位、独奏跨前、指挥固定。默认所有元素的 position 都是 static——按照正常文档流排列。`],

  // Grid
  [`Grid 是二维布局——同时控制**行和列**。`,
   `Grid（网格布局）同时控制行和列——display:grid 启用网格，grid-template-columns 定义列宽，gap 设置间距。就像交响乐团在舞台上的座次表——有行有列，每个位置都有明确安排。Grid 是二维布局——同时控制行和列。`],
];

for (const [oldStr, newStr] of fixes) {
  if (src.includes(oldStr)) {
    src = src.replace(oldStr, newStr);
    changed++;
  } else {
    console.log('SKIP:', oldStr.replace(/\n/g, '\\n').substring(0, 60));
    skipped++;
  }
}

fs.writeFileSync('src/configs/lessons.ts', src, 'utf-8');
console.log(`Done: ${changed} changed, ${skipped} skipped (already applied)`);

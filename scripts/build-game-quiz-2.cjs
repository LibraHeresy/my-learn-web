const fs = require('fs');
let src = fs.readFileSync('src/configs/quiz-questions.ts','utf-8');
// Get last id
const ids = [...src.matchAll(/id: (\d+)/g)].map(m=>parseInt(m[1]));
let id = Math.max(...ids) + 1;
function q(gem,level,type,diff,question,options,answer,explanation){
  return `  { id: ${id++}, gem: '${gem}', level: ${level}, type: '${type}', difficulty: ${diff}, question: '${question.replace(/'/g,"\\'")}', options: ['${options[0].replace(/'/g,"\\'")}','${options[1].replace(/'/g,"\\'")}','${options[2].replace(/'/g,"\\'")}','${options[3].replace(/'/g,"\\'")}'], answer: ${answer}, explanation: '${explanation.replace(/'/g,"\\'")}' }`;
}
const Q=[];

// ============ 🟠 HTML 能力宝石 (20题) ============
const G2='html-ability';
// L1 normal 5
Q.push(q(G2,1,'normal',1,'class 用 . 还是 # 选中？id 呢？',['class 用 . id 用 #','class 用 # id 用 .','都用 .','都用 #'],0,'类选择器用 .class名，ID 选择器用 #id名。记忆：class=分类(点号)，id=身份证(井号)。'));
Q.push(q(G2,1,'normal',1,'下面哪些是全局属性？',['src 和 href','class 和 id','alt 和 controls','colspan 和 rowspan'],1,'class 和 id 是全局属性，任何标签都能用。src 是 img/audio/video 特有，href 是 a/link 特有。'));
Q.push(q(G2,1,'normal',1,'布尔属性需要写值吗？举一个例子',['需要，如 disabled="true"','不需要，只要出现就生效如 disabled','必须有值','布尔属性已废弃'],1,'布尔属性只关心"有"还是"没有"，不关心值。disabled/checked/controls/loop 都是布尔属性。'));
Q.push(q(G2,1,'normal',1,'data-* 属性做什么？JS 怎么读？',['设置样式','存储自定义数据，用 dataset 读取','定义动画','声明编码'],1,'data-* 在元素上存自定义信息，JS 通过 element.dataset.xxx 读取。<div data-id="1">→el.dataset.id。'));
Q.push(q(G2,1,'normal',2,'class 可以多个元素共用吗？id 呢？',['都可以','class 可共用，id 必须唯一','class 必须唯一','都不可以'],1,'class=琴竹分类，多根弦可共用。id=琴弦编号，全琴唯一。'));
// L2 elite 7
Q.push(q(G2,2,'elite',2,'一个元素可以有多个 class 吗？',['不可以','可以，用空格分隔','可以，用逗号分隔','可以，写多个 class 属性'],1,'class="card highlight active"——用空格分隔多个类名，这个元素同时属于三个类。'));
Q.push(q(G2,2,'elite',2,'style 属性 vs 外部 CSS——为什么推荐后者？',['style 更快','外部 CSS 可复用/好维护/职责分离','没有区别','style 是旧写法'],1,'内联 style 只作用一个元素无法复用且优先级过高难覆盖。外部 CSS 统一管理维护方便。'));
Q.push(q(G2,2,'elite',2,'hidden 属性和 display:none 效果一样吗？',['完全一样','hidden 是 HTML 属性层隐藏，display:none 是 CSS 层','hidden 只隐藏文字','display:none 不可恢复'],1,'效果类似。但 hidden 优先级低——若 CSS 设 display:block，hidden 会被覆盖。'));
Q.push(q(G2,2,'elite',2,'title 属性(全局属性)的作用？',['设置页面标题','鼠标悬停时显示提示文字','定义 CSS 样式','声明字符编码'],1,'title 是全局属性——任何元素悬停时显示提示。和 alt 不同：alt 是图片加载失败时显示，title 是悬停时显示。'));
Q.push(q(G2,2,'elite',2,'属性值必须加引号吗？<img src=photo.jpg> 合法吗？',['必须加','不必须，HTML5 允许不加引号','只有数字值可省略','不加引号是 HTML4'],1,'HTML5 允许属性值不加引号（只要值中无空格或特殊字符）。但最佳实践是始终加引号避免意外。'));
Q.push(q(G2,2,'elite',2,'一个元素能同时有 class 和 id 吗？',['不能','可以，它们不冲突','只能二选一','id 会覆盖 class'],1,'class 和 id 可以同时存在。class 用于样式分组，id 用于唯一标识和 JS 选取。<div class="card" id="card1">'));
Q.push(q(G2,2,'elite',2,'checked="false" 和完全不写 checked 的区别？',['前者不选中','前者仍然选中！布尔属性只看出现不看值','完全相同','checked="false" 语法错误'],1,'checked="false" 仍然是选中状态！布尔属性只关心"有没有出现"不看值。想不选中需要完全移除 checked。'));
// L3 boss 8
Q.push(q(G2,3,'boss',3,'<img src="x.jpg" alt=""> 图片加载失败时用户看到什么？',['看到空 alt 文字','看到裂图图标无替代文字','看到空白','看到文件名'],1,'alt="" 表示纯装饰，阅读器跳过。加载失败时浏览器显示裂图图标无替代文字。alt="描述" 才会显示描述。'));
Q.push(q(G2,3,'boss',3,'<a href="wikipedia.org"> 和 href="https://wikipedia.org"> 区别？',['都正常跳转','前者被当作相对路径(网站内文件)，后者正常跳转','都报错','前者自动补全'],1,'无 https:// 时浏览器把 wikipedia.org 当作你网站内的相对路径→404。必须写完整 URL。'));
Q.push(q(G2,3,'boss',3,'<label for="email"> 但 input id="userEmail"→点 label 会？',['正常聚焦','什么都不发生，for 和 id 不匹配','自动纠错','聚焦最近输入框'],1,'label 的 for 必须等于 input 的 id——这对"钥匙和锁"必须一模一样才会生效。不匹配点击无反应。'));
Q.push(q(G2,3,'boss',2,'radio 同组互斥靠什么属性？',['type','name 属性相同','id 相同','value 相同'],1,'同组 radio 的 name 必须相同，浏览器据此判断互斥——选一个其他自动取消。'));
Q.push(q(G2,3,'boss',2,'placeholder 和 value 区别？',['placeholder 是默认值','placeholder 是灰色提示不提交，value 是实际值会提交','完全相同','value 是提示 placeholder 是值'],1,'placeholder 是输入框为空时的灰色提示，用户输入后消失且不提交。value 是输入框实际值，会提交。'));
Q.push(q(G2,3,'boss',3,'<input type="checkbox" checked> 选中的值是什么？',['"checked"','不写 value 时默认为 "on"','true','false'],1,'checkbox 不写 value 属性时，选中提交的默认值是 "on"。想提交自定义值需设 value="自定义值"。'));
Q.push(q(G2,3,'boss',2,'fieldset+legend 的用途？',['已废弃','把表单控件分组圈起来，legend 写组标题','设置样式','验证表单'],1,'fieldset 把一组相关表单控件圈在一起(画框)，legend 是框上的标题。让表单更有条理。'));
Q.push(q(G2,3,'boss',3,'<input required> 和 <input pattern="[0-9]+"> 各做什么？',['required 必填，pattern 正则校验格式','完全相同','required 已废弃','pattern 是密码专用'],0,'required 表示该字段必填。pattern 用正则表达式限制输入格式。两者可组合：必填且必须匹配格式。'));

// ============ 🟡 CSS 样式宝石 (30题) ============
const G3='css-style';
// L1 normal 5
Q.push(q(G3,1,'normal',1,'类选择器写法？',['.class名','#class名','class名','<class名>'],0,'类选择器用 .开头：.card 选中所有 class="card" 的元素。'));
Q.push(q(G3,1,'normal',1,'ID 选择器写法？',['.id名','#id名','id名','<id名>'],1,'ID 选择器用 #开头：#title 选中 id="title" 的元素。'));
Q.push(q(G3,1,'normal',1,'下面哪个 CSS 声明写法正确？',['color: red','color = red','color: "red"','color; red'],0,'CSS 声明格式：属性: 值; 如 color: red;。不能用等号，值通常不加引号。'));
Q.push(q(G3,1,'normal',1,'CSS 注释怎么写？',['// 注释','<!-- 注释 -->','/* 注释 */','# 注释'],2,'CSS 用 /* 注释 */。// 是 JS 注释在 CSS 中无效。'));
Q.push(q(G3,1,'normal',1,'color: #f00 和 red 等价吗？',['等价都是红色','不等价','#f00 更暗','red 已废弃'],0,'#f00=#ff0000=red，都是纯红色完全等价。#f00 是 #ff0000 的缩写。'));
// L2 elite 10
Q.push(q(G3,2,'elite',2,'`.card.highlight` 和 `.card .highlight` 区别？',['完全相同','前者选中同时有两个类的元素，后者选中 card 内后代有 highlight 的元素','语法错误','后者选中 card 自己'],1,'无空格=同时拥有两个类。有空格=后代关系。空格是关键！'));
Q.push(q(G3,2,'elite',2,'选择器权重怎么算？',['后面覆盖前面','ID(100)>类(10)>元素(1)','按字母顺序','!important 不算'],1,'权重：(ID数,类数,元素数)。如 #header .nav a=(1,1,1)。!important 强制覆盖一切。内联 style=1000。'));
Q.push(q(G3,2,'elite',2,'盒模型从外到内四层顺序？',['padding→border→margin→content','margin→border→padding→content','border→padding→margin→content','content→padding→border→margin'],1,'margin(外边距)→border(边框)→padding(内边距)→content(内容区)。'));
Q.push(q(G3,2,'elite',2,'width 默认设置哪一层的宽度？',['margin','border','padding','content'],3,'box-sizing:content-box(默认)时 width 只设置 content 区域宽度。padding 和 border 额外增加总宽。'));
Q.push(q(G3,2,'elite',2,'box-sizing:border-box 改变什么？',['什么也不变','width 包含 content+padding+border 总宽','border-box 已废弃','只改变高度'],1,'border-box 让 width=content+padding+border 总宽，更直观。推荐全局设置 *{box-sizing:border-box}。'));
Q.push(q(G3,2,'elite',2,'em 和 rem 的区别？',['em 相对屏幕 rem 相对父元素','em 相对父元素字号，rem 相对根元素(html)字号','完全相同','em 已废弃'],1,'em 相对父元素 font-size 会逐层叠加。rem 相对根元素 html 字号全局统一。全局间距用 rem，组件内部用 em。'));
Q.push(q(G3,2,'elite',2,'padding 和 margin 的区别？',['padding 在外 margin 在内','padding 内边距(边框内)，margin 外边距(边框外)','完全相同','margin 只能用于 div'],1,'padding=元素内容与边框之间的空白(盒内泡沫)。margin=边框与相邻元素之间的空白(盒外距离)。'));
Q.push(q(G3,2,'elite',2,'width:100% 和 width:100vw 区别？',['完全一样','100%相对父元素宽度，100vw相对视口宽度(含滚动条)','100vw 更小','100% 已废弃'],1,'100%相对于父容器 content 宽度。100vw 是整个视口宽度(含滚动条)。有滚动条时100vw>100%。'));
Q.push(q(G3,2,'elite',2,'相邻元素上下 margin 会怎样？',['相加','取较大值(折叠 margin collapse)','相互抵消','没有特殊行为'],1,'两个相邻块级元素上下 margin 会折叠取较大值而非相加。左右不折叠。'));
Q.push(q(G3,2,'elite',2,'!important 为什么尽量不用？',['提高性能','破坏正常优先级体系难以调试','它是 CSS4 特性','已废弃'],1,'!important 强制覆盖一切但滥用会导致难以调试和覆盖——形成恶性循环。应通过提高选择器权重而非!important。'));
// L3 boss 15
Q.push(q(G3,3,'boss',3,'h1 同时被 `h1{color:red}` 和 `.title{color:blue}` 选中且 class="title"→什么颜色？',['红元素选择器优先','蓝类选择器权重(10)>元素(1)','紫两者混合','取决于文件顺序'],1,'类选择器权重(0,1,0)>元素选择器(0,0,1)，.title 胜出。'));
Q.push(q(G3,3,'boss',3,'div 设 width:200px;padding:20px;border:5px→实际总宽？',['200px','250px=200+40+10','210px','230px'],1,'content-box：总宽=width(200)+padding(20×2)+border(5×2)=250px。'));
Q.push(q(G3,3,'boss',3,'同上改为 box-sizing:border-box，实际总宽？',['250px','200px(width 已含 padding+border)','210px','取决于浏览器'],1,'border-box：width(200)已含 padding 和 border，总宽=200px，内容区自动缩小。'));
Q.push(q(G3,3,'boss',3,'margin:10px 20px 30px 三个值各对应哪边？',['上10/左右20/下30','上10/右20/下30/左20','上10/下20/左30','全部10'],0,'三值=上 左右 下。上10px、左右20px、下30px。'));
Q.push(q(G3,3,'boss',3,'子元素设 margin-top:50px 为什么父元素也跟着下移？怎么修？',['不可能发生','margin 折叠穿透。给父元素加 overflow:hidden 或 padding:1px','这是浏览器 bug','margin-top 只能用于 body'],1,'子元素 margin-top 会"穿透"父元素(margin collapse)。修法：父设 overflow:hidden/padding:1px/border:1px/flex 布局。'));
Q.push(q(G3,3,'boss',3,'a 标签的 LVHA 推荐顺序？',['a/a:hover/a:visited/a:active','a:link→a:visited→a:hover→a:active','顺序无所谓','a:active→a:hover→a:link→a:visited'],1,'LVHA=LoVe HAte。:link→:visited→:hover→:active 必须按此顺序否则某些状态被覆盖。'));
Q.push(q(G3,3,'boss',3,'`div p` 和 `div > p` 区别？',['完全相同','前者所有后代 p，后者仅直接子元素 p','后者选中所有后代','语法错误'],1,'空格=所有层级后代。>=只直接子元素不包含更深层的 p。'));
Q.push(q(G3,3,'boss',3,'`h1,h2,h3{color:red}` 选中什么？',['h1 内嵌套的 h2 和 h3','所有 h1、所有 h2、所有 h3','只 h1','语法错误'],1,'逗号=分组选择器表示"或"。选中所有 h1、所有 h2、所有 h3。'));
Q.push(q(G3,3,'boss',2,'opacity:0.5 和 opacity:50% 等价吗？',['等价','不等价 50% 语法错','50%=0.05','取决于浏览器'],0,'CSS 支持百分比：opacity:50% 等于 opacity:0.5 完全等价。'));
Q.push(q(G3,3,'boss',2,'display:none 和 visibility:hidden 核心区别？',['完全相同','前者不占空间(从布局移除)，后者占空间(不可见)','前者只隐藏文字','后者不占空间'],1,'display:none 元素从布局中移除不占空间。visibility:hidden 元素不可见但保持原空间。'));
Q.push(q(G3,3,'boss',3,'为什么推荐用 class 而尽量不用 ID 选择器？',['ID 更快','class 可复用权重更低更好维护，ID 权重过高难覆盖','ID 已废弃','没有区别'],1,'ID 权重(100)过高难覆盖且不可复用。class 权重(10)适中可复用更好维护。推荐用 class 做样式。'));
Q.push(q(G3,3,'boss',2,'font-family 多个值的作用？',['全部同时生效','从左到右作为回退方案','只有第一个生效','语法错误'],1,'font-family:"Microsoft YaHei",sans-serif——优先用第一个字体，没有安装则回退到下一个。'));
Q.push(q(G3,3,'boss',2,'overflow:hidden/scroll/auto 区别？',['全部一样','hidden=裁剪隐藏/scroll=始终滚动条/auto=需要时滚动条','hidden 删除内容','scroll 已废弃'],1,'hidden=溢出裁剪。scroll=始终有滚动条。auto=溢出时才出现滚动条。visible(默认)=溢出可见。'));
Q.push(q(G3,3,'boss',3,'h1 权重对决：!important vs 内联 style vs #id vs .class vs div→排序？',['!important>内联>#id>.class>div','#id>!important>内联>.class>div','内联>!important>#id>.class>div','.class>#id>内联>!important>div'],0,'优先级链：!important(无视一切)>内联 style(1000)>ID(100)>类(10)>元素(1)。'));
Q.push(q(G3,3,'boss',2,'outline 和 border 区别？outline 占空间吗？',['完全相同','outline 不占空间在 border 之外；border 占空间','outline 已废弃','outline 在 border 里面'],1,'outline 绘制在 border 之外不占盒模型空间不影响布局。常用于 :focus 焦点指示器不会导致元素抖动。'));

// Append and write
const closing = src.lastIndexOf('\n]');
const newContent = src.substring(0, closing) + ',\n' + Q.join(',\n') + '\n]';
fs.writeFileSync('src/configs/quiz-questions.ts', newContent, 'utf-8');
console.log('Added', Q.length, 'questions. Total:', id-1);

const fs = require('fs');
let src = fs.readFileSync('src/configs/quiz-questions.ts','utf-8');
const ids=[...src.matchAll(/id: (\d+)/g)].map(m=>parseInt(m[1]));
let id=Math.max(...ids)+1;
function q(g,l,t,d,question,options,answer,explanation){
  return `  { id: ${id++}, gem: '${g}', level: ${l}, type: '${t}', difficulty: ${d}, question: '${question.replace(/'/g,"\\'")}', options: ['${options[0].replace(/'/g,"\\'")}','${options[1].replace(/'/g,"\\'")}','${options[2].replace(/'/g,"\\'")}','${options[3].replace(/'/g,"\\'")}'], answer: ${answer}, explanation: '${explanation.replace(/'/g,"\\'")}' }`;
}
const Q=[];

// ====== CSS 布局宝石 (25) ======
const G4='css-layout';
Q.push(q(G4,1,'normal',1,'display:flex 写在哪？',['子元素','父容器','两者都要','html 上'],1,'display:flex 写在父元素(容器)上，其直接子元素自动变弹性项目。'));
Q.push(q(G4,1,'normal',1,'justify-content 控制什么方向？',['垂直','主轴方向','对角线','文字方向'],1,'默认 flex-direction:row 时主轴是横向，justify-content 控制横向对齐。column 时主轴变纵向。'));
Q.push(q(G4,1,'normal',1,'position 有哪五种值？',['top/right/bottom/left/center','static/relative/absolute/fixed/sticky','flex/grid/block/inline/float','px/em/rem/vw/vh'],1,'static(默认)/relative(相对自身)/absolute(相对祖先)/fixed(相对视口)/sticky(滚动吸附)。'));
Q.push(q(G4,1,'normal',1,'grid-template-columns:1fr 2fr 1fr 含义？',['三列宽比 1:2:1','四列等宽','语法错误','两列'],0,'fr=fraction 份数。三列宽比 1:2:1，总 4 份，每列占 25%/50%/25%。'));
Q.push(q(G4,1,'normal',1,'@media 的作用？',['设置动画','根据屏幕条件应用不同样式(响应式)','定义变量','引入字体'],1,'@media 媒体查询根据屏幕宽度等条件应用不同样式，实现响应式设计。'));
// elite 8
Q.push(q(G4,2,'elite',2,'flex-direction:column 改变什么？',['什么也不变','主轴变纵向，justify-content 和 align-items 轴向互换','元素消失','文字方向改变'],1,'column 让主轴由横向变纵向，justify-content 控制纵向对齐，align-items 控制横向对齐。'));
Q.push(q(G4,2,'elite',2,'flex:1 意思？',['宽度 1px','占据剩余空间中 1 份','唯一元素时用','已废弃'],1,'flex:1=flex-grow:1;flex-shrink:1;flex-basis:0 简写。两子元素 flex:1 和 flex:2 宽比 1:2。'));
Q.push(q(G4,2,'elite',2,'space-between vs space-around vs space-evenly？',['完全相同','between=贴两端均分/around=项两侧半倍间距/evenly=全部等距','between 已废弃','evenly 只用于 Grid'],1,'between 首尾贴边中间均分。around 每项左右有间距(两端间距是中间一半)。evenly 所有间隙完全相等。'));
Q.push(q(G4,2,'elite',2,'Grid 和 Flexbox 核心区别？',['完全相同','Grid 二维(行列)适合页面布局，Flexbox 一维(行或列)适合组件排列','Flexbox 更好','Grid 已废弃'],1,'Grid 同时控制行和列=二维适合整体布局。Flexbox 只控制一个方向=一维适合组件内部排列。两者互补。'));
Q.push(q(G4,2,'elite',2,'relative 相对谁定位？absolute 呢？',['relative 相对视口','relative 相对自身原位置，absolute 相对最近定位祖先','都相对父元素','都相对视口'],1,'relative 相对自身原位置偏移(原空间保留)。absolute 脱离流相对最近 position 非 static 的祖先。'));
Q.push(q(G4,2,'elite',2,'gap 属性做什么？Flexbox 和 Grid 都支持吗？',['只用于 Grid','设置子元素间距，两者都支持','只用于 Flexbox','设置边框'],1,'gap 设置行列间距。早期 Flexbox 不支持 gap 但现在两者都支持。'));
Q.push(q(G4,2,'elite',2,'@media(max-width:768px)匹配什么？',['宽度≥768px','宽度≤768px(手机/小平板)','所有设备','只匹配手机'],1,'max-width 表示"宽度≤此值时应用"=通常匹配手机。min-width 表示"宽度≥此值时应用"=通常匹配桌面。'));
Q.push(q(G4,2,'elite',2,'导航栏左边 Logo 右边链接→Flexbox 写法？',['全 float','nav{display:flex;justify-content:space-between}','用 position:absolute','不可能实现'],1,'display:flex+space-between。左边元素自然靠左，右边元素靠右，中间空白自动填充。'));
// boss 12
Q.push(q(G4,3,'boss',3,'transition 需要哪些要素？',['只需属性名','属性+时长(至少)','必须 4 个值','只需时长'],1,'transition 至少需要：transition-property(哪个属性)+transition-duration(多久)。可选：timing-function(曲线)+delay(延迟)。'));
Q.push(q(G4,3,'boss',3,'transition 和 animation 核心区别？',['完全相同','transition 需触发(如hover)只两态；animation 自动播放可多帧','animation 更简单','transition 已废弃'],1,'transition 被触发(hover等)只 A→B 过渡。animation 主动播放通过@keyframes 定义任意多帧可循环。'));
Q.push(q(G4,3,'boss',2,'ease/linear/ease-in/ease-out 区别？',['完全相同','ease 慢快慢(默认)/linear 匀速/ease-in 慢→快/ease-out 快→慢','ease 已废弃','linear 只用于 rotate'],1,'ease 默认最自然。linear 全程匀速。ease-in 慢速开始。ease-out 慢速结束。'));
Q.push(q(G4,3,'boss',3,'animation-fill-mode:forwards vs none？',['forwards 停最后一帧 none 回初始(闪回)','完全相同','forwards 已废弃','none 不播放'],0,'forwards 动画结束后保持最后一帧样式。none 回到动画前初始状态(会闪回)。backwards 开始前就应用第一帧。'));
Q.push(q(G4,3,'boss',3,'无限旋转动画 @keyframes 怎么写？',['@keyframes s{from{rotate:0}to{rotate:360deg}}','@keyframes s{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}','keyframes s{transform:spin}','@keyframes s{0%{rotate:0}100%{rotate:1turn}}'],1,'animation:s 2s linear infinite 配合使用。'));
Q.push(q(G4,3,'boss',3,'为什么做动画优先用 transform 而非 left/top？',['无区别','transform 只触发合成(GPU加速)；left/top 触发重排性能差','transform 更简单','left/top 已废弃'],1,'浏览器渲染：重排→重绘→合成。left/top 触发重排最贵。transform 只触发合成 GPU 处理性能最好。'));
Q.push(q(G4,3,'boss',2,'animation-duration 单位？1.5s=1500ms？',['s 和 ms，1.5s=1500ms 等价','只能用 s','只能用 ms','1.5s=150ms'],0,'可用 s(秒)或 ms(毫秒)。1s=1000ms，1.5s=1500ms 完全等价。'));
Q.push(q(G4,3,'boss',2,'响应式是什么？怎么做？',['一种布局模式','让网页在不同屏幕都好看。用 @media 断点+弹性单位','只能用 Grid','用 JS 判断屏幕'],1,'响应式=不同屏幕不同布局。核心：@media 媒体查询+弹性单位(%,vw,fr)+flex/grid 弹性布局+移动优先。'));
Q.push(q(G4,3,'boss',3,'animation-direction:alternate 效果？',['反向播放','奇数遍正向偶数遍反向来回交替','加速播放','只播放反向'],1,'alternate 奇数遍(1,3,5)正向偶数遍(2,4,6)反向。配合 infinite 做来回效果。'));
Q.push(q(G4,3,'boss',2,'flex-wrap 做什么？',['控制对齐','是否允许子元素换行','设置间距','已废弃'],1,'nowrap(默认)不换行子元素被压缩。wrap 允许换行。通常配合 flex-wrap:wrap 实现自适应布局。'));
Q.push(q(G4,3,'boss',3,'sticky 定位的效果？使用条件？',['固定在视口','滚动到指定位置后固定吸附。需设 top/left 等值','和 fixed 完全一样','已废弃'],1,'sticky=滚动时先正常排列，到达阈值(如 top:0)后吸附固定。常用于吸顶导航栏。父元素不能设 overflow:hidden。'));
Q.push(q(G4,3,'boss',2,'repeat(3,1fr) 和 1fr 1fr 1fr 等价吗？',['等价','不等价 repeat 更慢','1fr 1fr 1fr 语法错','repeat 已废弃'],0,'完全等价。repeat(次数,值)是简写。repeat(3,1fr)=1fr 1fr 1fr。repeat(auto-fill,minmax(200px,1fr))更强大。'));

// ====== JS 语法宝石 (30) ======
const G5='js-syntax';
Q.push(q(G5,1,'normal',1,'let 和 const 区别？',['let 可重新赋值 const 不可；默认用 const','完全相同','const 更快','let 已废弃'],0,'const 声明常量不可重新赋值。let 可重新赋值。最佳实践：默认 const，确定需改值时用 let。'));
Q.push(q(G5,1,'normal',1,'JS 有哪些基础数据类型？',['string/number/boolean/undefined/null/symbol/bigint','只有 string 和 number','全部是 object','只有 3 种'],0,'7 种基本类型。typeof null 返回"object"(历史 bug)。函数 typeof 返回"function"(object 子类型)。'));
Q.push(q(G5,1,'normal',1,'`"Hello"+" "+"World"` 结果？',['Hello World','"Hello World"','HelloWorld','报错'],1,'+ 用于字符串拼接：三个字符串连成 "Hello World"。'));
Q.push(q(G5,1,'normal',1,'`let x; console.log(typeof x)` 输出？',['"null"','"undefined"','"object"','报错'],1,'声明了但没赋值的变量值为 undefined，typeof undefined 返回 "undefined"。'));
Q.push(q(G5,1,'normal',1,'`"abc".toUpperCase()` 结果？',['"abc"','"ABC"','"Abc"','报错'],1,'toUpperCase() 将所有字母转为大写。"abc"→"ABC"。toLowerCase() 反向操作。'));
// elite 10
Q.push(q(G5,2,'elite',2,'"5"+3 和 "5"-3 结果？',['53 和 2','8 和 2','"53"和"53"','报错'],0,'+遇字符串拼接："5"+3="53"。-只用于数字，先把"5"转数字再减：5-3=2。隐式类型转换。'));
Q.push(q(G5,2,'elite',2,'0==false 和 0===false 结果？',['true 和 false','true 和 true','false 和 false','false 和 true'],0,'== 做类型转换 0→false→true。=== 严格比较 0(number)≠false(boolean)→false。推荐始终用===。'));
Q.push(q(G5,2,'elite',2,'`if(0){console.log("yes")}` 会输出吗？',['会','不会 0 是 falsy','报错','输出 undefined'],1,'0/""/null/undefined/NaN/false 都是 falsy 值条件判断中视为 false。'));
Q.push(q(G5,2,'elite',2,'`for(let i=0;i<3;i++){console.log(i)}` 输出？',['0,1,2','1,2,3','0,1,2,3','1,2'],0,'循环 3 次 i=0/1/2。i<3 时成立，i=3 时退出。'));
Q.push(q(G5,2,'elite',2,'`[1,2,3].forEach(n=>console.log(n*2))` 输出？',['1,2,3','2,4,6','[2,4,6]','报错'],1,'forEach 对每个元素执行回调打印 n*2。不返回新数组(返回 undefined)。'));
Q.push(q(G5,2,'elite',2,'`let score=85;score>=60?"及格":"不及格"` 结果？',['"及格"','"不及格"','85','报错'],0,'三元运算符：条件?真值:假值。85>=60 为 true→"及格"。'));
Q.push(q(G5,2,'elite',2,'`if("false"){console.log("yes")}` 会输出？',['会非空字符串是 truthy','不会"false"是 falsy','报错','undefined'],0,'非空字符串(含"false")是 truthy→执行 if 块。只有空字符串""是 falsy。'));
Q.push(q(G5,2,'elite',2,'`10%3` 结果？',['3','1(取余)','0','10'],1,'%=取余数(mod)。10÷3=3 余 1。常用于判断奇偶(n%2===0 偶数)。'));
Q.push(q(G5,2,'elite',2,'`3>2 && 2>1` 结果？',['true','false','3','报错'],0,'&&=逻辑与(且)。两边都 true 结果 true。||=逻辑或(或)。!=逻辑非(取反)。'));
Q.push(q(G5,2,'elite',2,'`const arr=[1,2,3];arr.push(4)` 会报错吗？',['会 const 不能改','不会 const 保护引用数组内容可改','取决于浏览器','push 对 const 无效'],1,'const 锁定变量绑定(不能 arr=新数组)，但数组/对象内容可修改。完全冻结用 Object.freeze()。'));
// boss 15
Q.push(q(G5,3,'boss',3,'function 不写 return 返回什么？',['null','undefined','报错','0'],1,'无 return 函数隐式返回 undefined。箭头函数一行表达式无{}时自动返回。'));
Q.push(q(G5,3,'boss',3,'箭头函数 `(a,b)=>a+b` 等价什么？',['function(a,b){return a+b}','let a+b','a=>b','function a(b){}'],0,'箭头函数是 function 简写。单行可省略{}和 return。'));
Q.push(q(G5,3,'boss',3,'var 和 let 作用域区别？',['相同','var 函数作用域有提升，let 块级作用域({}内)无提升','let 函数作用域','var 已废弃'],1,'var 函数作用域有变量提升。let 块级作用域{}内有效无提升。推荐用 let/const 避免 var 混乱。'));
Q.push(q(G5,3,'boss',3,'闭包是什么？`function o(){let x=1;return function(){return x}}` 内函数能访问 x？',['不能','能内部函数"记住"外部变量=闭包','只有外部函数运行时才能','报错'],1,'闭包=函数+它访问的外部变量。内函数"捕获"了 x，即使外部函数执行完毕 x 仍能被内函数访问。'));
Q.push(q(G5,3,'boss',3,'`typeof null` 返回？为什么？',['"null"','"object"——JS 早期实现 bug 为兼容保留至今','"undefined"','"nullpointer"'],1,'typeof null==="object"是 JS 最早实现的 bug。null 的类型标记是 000 和对象相同。为兼容未修复。'));
Q.push(q(G5,3,'boss',3,'`let a,b=5;console.log(a,b)` 输出？',['5,5','undefined,5','报错','null,5'],1,'let a,b=5 中只有 b 被赋值为 5，a 只声明未赋值=undefined。'));
Q.push(q(G5,3,'boss',3,'`console.log(1);setTimeout(()=>console.log(2),0);console.log(3)` 顺序？',['1,2,3','1,3,2','2,1,3','3,2,1'],1,'同步代码先执行 1→3。setTimeout 虽延迟 0 仍入任务队列等同步代码跑完才执行→2。事件循环。'));
Q.push(q(G5,3,'boss',3,'try/catch 基本语法和作用？',['try{}else{}','try{}catch(e){}','catch{}try{}','try{}error{}'],1,'try 块放可能出错代码，catch(e)处理错误(程序不崩溃)。finally 块可选总是在最后执行。'));
Q.push(q(G5,3,'boss',3,'`Cannot read property xxx of null` 什么错误？怎么修？',['电脑坏了','访问 null 的属性。先判 if(el)再操作或检查选择器是否正确','正常警告','重启浏览器'],1,'最常因 querySelector 没找到元素返回 null→对 null 操作。修法：检查选择器拼写或先判 if(el)。'));
Q.push(q(G5,3,'boss',2,'`!true` 结果？',['true','false','undefined','报错'],1,'!=逻辑非(取反)。!true=false !false=true。!!值可转布尔型。'));
Q.push(q(G5,3,'boss',3,'`let x=5;x=10` vs `const x=5;x=10` 区别？',['都成功','前者成功 x=10；后者报错 TypeError','都报错','后者静默失败'],1,'let 可重新赋值。const 不可重新赋值→TypeError。'));
Q.push(q(G5,3,'boss',3,'`" hello ".trim().toUpperCase()` 结果？',['" HELLO "','"HELLO"','"hello"','报错'],1,'trim()去两端空白→"hello"，toUpperCase()转大写→"HELLO"。方法链从左到右执行。'));
Q.push(q(G5,3,'boss',2,'`[3,10,1,20].sort()` 结果？为什么？',['[1,3,10,20]','[1,10,20,3]——sort 默认按字符串排序','[3,10,1,20]','报错'],1,'sort()默认转字符串按字典序排序→"10"<"3"因为"1"<"3"。数字排序需(a,b)=>a-b。'));
Q.push(q(G5,3,'boss',3,'`const{name,age}=person` 是什么语法？',['错误','解构赋值——从对象中提取 name 和 age 属性','创建新对象','TypeScript 特有'],1,'对象解构：等价于 const name=person.name;const age=person.age;。简化代码。'));
Q.push(q(G5,3,'boss',2,'`let name="小明";let Name="小红";console.log(name)` 输出？',['小明(JS 区分大小写)','小红','报错','undefined'],0,'JS 变量名区分大小写。name 和 Name 是两个不同的变量。'));

// ====== JS 实战宝石 (25) ======
const G6='js-practice';
Q.push(q(G6,1,'normal',1,'querySelector 返回什么？',['所有匹配元素','第一个匹配元素(null 无匹配)','数组','HTML 字符串'],1,'返回第一个匹配元素或 null。想获取所有用 querySelectorAll。'));
Q.push(q(G6,1,'normal',1,'querySelectorAll 返回？',['数组','NodeList(类数组)','单个元素','HTMLCollection'],1,'返回 NodeList——类数组可用 forEach 遍历有 length。不是真正的 Array(缺少 map/filter 等方法)。'));
Q.push(q(G6,1,'normal',1,'getElementById 返回？',['元素对象或 null','字符串','数组','HTML 源码'],0,'通过 id 获取唯一元素返回元素对象或 null。比 querySelector("#id")稍快。'));
Q.push(q(G6,1,'normal',1,'addEventListener 做什么？',['修改 CSS','绑定事件监听器当用户操作时执行函数','创建元素','删除元素'],1,'给元素绑定事件监听器：element.addEventListener("click",callback)。'));
Q.push(q(G6,1,'normal',1,'[1,2,3].includes(2) 返回？',['true','false','2','报错'],0,'includes 判断数组是否含某值返回 true/false。'));
// elite 8
Q.push(q(G6,2,'elite',2,'addEventListener 和 element.onclick 区别？',['相同','addEventListener 可绑多个函数 onclick 只能一个','onclick 更灵活','addEventListener 已废弃'],1,'onclick 是属性只能赋值一个函数(后面覆盖前面)。addEventListener 可加多个监听器。推荐始终用 addEventListener。'));
Q.push(q(G6,2,'elite',2,'事件冒泡是什么？stopPropagation()？',['事件只在当前元素触发','事件从子元素向上传播到父。stopPropagation()阻止继续冒泡','冒泡已废弃','stopPropagation 加速事件'],1,'点击子元素→事件冒泡到父→祖父。stopPropagation()阻止传播。事件委托正是利用冒泡。'));
Q.push(q(G6,2,'elite',2,'innerHTML 和 textContent 区别和安全？',['相同','innerHTML 解析 HTML 有 XSS 风险；textContent 只设纯文本安全','textContent 更快','innerHTML 已废弃'],1,'innerHTML 会解析 HTML 标签(有 XSS 风险勿把用户输入直接给 innerHTML)。textContent 始终视为纯文本。'));
Q.push(q(G6,2,'elite',2,'createElement+appendChild 流程？',['直接写 HTML','let el=document.createElement("div")→设置属性内容→parent.appendChild(el)','只能创建 div','appendChild 已废弃'],1,'三步：1.createElement 创建 2.设属性/内容 3.appendChild 添加到父元素。'));
Q.push(q(G6,2,'elite',2,'classList.add/remove/toggle/contains 各做什么？',['全部相同','add=添加类/remove=移除/toggle=切换(有删无加)/contains=判断','已废弃','只用于 ID'],1,'classList 操作元素 class 的推荐方式比直接改 className 更好。'));
Q.push(q(G6,2,'elite',2,'map 和 forEach 区别？',['相同','map 返回新数组 forEach 返回 undefined','forEach 返回新数组','map 已废弃'],1,'map 对每项执行函数返回新数组(不修改原数组)。forEach 无返回值用于副作用。'));
Q.push(q(G6,2,'elite',2,'filter 做什么？',['过滤数组返回满足条件的元素组成新数组','修改原数组','和 map 一样','已废弃'],0,'filter 对每项执行条件函数保留返回 true 的项→新数组。原数组不变。'));
Q.push(q(G6,2,'elite',2,'事件委托是什么？为什么动态元素需要？',['委托别人写代码','把事件绑在父元素利用冒泡处理子元素事件。新加子元素自动被覆盖','委托不是前端概念','已废弃'],1,'不在每个子元素绑事件而在父元素绑通过 e.target 判断点击哪个。新添加子元素自动继承事件。'));
// boss 12
Q.push(q(G6,3,'boss',3,'splice 和 slice 区别？',['相同','splice 删除/插入改原数组；slice 截取子数组不修改原数组','slice 修改原数组','都不修改'],1,'splice(start,delCount,...items)修改原数组。slice(start,end)返回新数组。'));
Q.push(q(G6,3,'boss',3,'push/pop 和 shift/unshift 区别？',['全部操作末尾','push/pop 末尾(快)；unshift/shift 开头(慢需移动所有元素)','push 操作开头','无区别'],1,'push(末尾添加)/pop(末尾删)/unshift(开头添加)/shift(开头删)。push/pop 类似栈操作快。'));
Q.push(q(G6,3,'boss',3,'[1,2,3].join("-") 和 "a,b,c".split(",") 各返回？',['join 返回数组 split 返回字符串','join 返回"1-2-3"数组→字符串；split 返回["a","b","c"]字符串→数组','都返回字符串','都返回数组'],1,'join(分隔符)：数组→字符串。split(分隔符)：字符串→数组。互为逆操作。'));
Q.push(q(G6,3,'boss',3,'点击按钮新增 li 到 ul 末尾→用 createElement 还是 innerHTML？',['innerHTML 更简单','createElement 更安全精确。innerHTML 会重置已有元素的事件','两者相同','无法实现'],1,'innerHTML+="..." 简便但会导致已有元素状态丢失。createElement+appendChild 安全保留已有状态。'));
Q.push(q(G6,3,'boss',3,'e.target 和 e.currentTarget 区别？',['完全相同','target=实际触发元素(最深层)；currentTarget=绑定事件的元素','currentTarget 已废弃','target 只能是按钮'],1,'冒泡时 target 是点击的最深层元素不变。currentTarget 是绑定事件监听的元素(随冒泡变化)。'));
Q.push(q(G6,3,'boss',2,'find 和 filter 区别？',['相同','find 返回第一个满足条件的元素；filter 返回所有满足条件的数组','filter 返回单个','find 已废弃'],1,'find 返回第一个匹配项(单个值或 undefined)。filter 返回所有匹配项的数组。'));
Q.push(q(G6,3,'boss',2,'some 和 every 区别？',['相同','some=至少一个满足→true；every=全部满足→true','every=至少一个','some 已废弃'],1,'[1,2,3].some(x=>x>2)→true。every(x=>x>2)→false(1 不满足)。'));
Q.push(q(G6,3,'boss',3,'如何在事件处理函数中阻止 a 标签默认跳转？',['无法阻止','e.preventDefault()阻止默认行为','return false','删除 href'],1,'preventDefault()阻止浏览器默认行为(链接跳转/表单提交)。stopPropagation()阻止冒泡。'));
Q.push(q(G6,3,'boss',3,'如何把 NodeList 转成数组？',['无法转换','[...nodeList]或 Array.from(nodeList)','.toArray()','.array()'],1,'扩展运算符[...nodeList]或 Array.from(nodeList)将类数组转为真正的 Array 以使用 map/filter。'));
Q.push(q(G6,3,'boss',2,'"hello".slice(1,3) 返回？',['"el"','"ell"','"h"','"lo"'],0,'slice(1,3)截取索引[1,3)="el"。索引从 0 开始。'));
Q.push(q(G6,3,'boss',2,'"hello".replace("h","H") 返回？',['"Hello"','"hello"','"HELLO"','["Hello"]'],0,'replace 替换第一个匹配项。"hello".replace("l","L")→"heLlo"。'));
Q.push(q(G6,3,'boss',2,'[1,2,3].indexOf(4) 返回？',['4','-1(未找到)','0','undefined'],1,'indexOf 返回首次出现索引未找到返回-1。includes 直接返回 true/false 更语义化。'));

// Append
const closing = src.lastIndexOf('\n]');
fs.writeFileSync('src/configs/quiz-questions.ts', src.substring(0,closing)+',\n'+Q.join(',\n')+'\n]','utf-8');
console.log('Added',Q.length,'Total:',id-1);

const fs = require('fs');
let src = fs.readFileSync('src/configs/quiz-questions.ts', 'utf-8');
let id = 120;
function q(domain, diff, question, options, answer, explanation, lessonId) {
  const l = lessonId ? `, lessonId: '${lessonId}'` : '';
  return `  { id: ${id++}, domain: '${domain}', difficulty: ${diff}${l}, question: '${question.replace(/'/g, "\\'")}', options: ['${options[0].replace(/'/g, "\\'")}', '${options[1].replace(/'/g, "\\'")}', '${options[2].replace(/'/g, "\\'")}', '${options[3].replace(/'/g, "\\'")}'], answer: ${answer}, explanation: '${explanation.replace(/'/g, "\\'")}' }`;
}
const questions = [];

// ========== CSS 布局 (12 题) ==========
questions.push(q('css-layout',1,'display:flex 应该写在父元素上还是子元素上？',['写在子元素上','写在父元素上','两者都需要','写在 html 上'],1,'display:flex 写在父元素（容器）上，它的直接子元素自动变成弹性项目。'));
questions.push(q('css-layout',1,'justify-content 控制什么方向的对齐？',['垂直方向','主轴方向','对角线方向','文字方向'],1,'在默认的 flex-direction:row 下，主轴是横向，justify-content 控制横向对齐。如果是 column，主轴变成纵向。'));
questions.push(q('css-layout',2,'justify-content: space-between / space-around / space-evenly 的区别？',['三者完全相同','space-between 贴两端均分；space-around 每项两侧有半倍间距；space-evenly 所有间距相等','space-between 已废弃','space-evenly 只用于 Grid'],1,'space-between：首尾贴边，中间均分。space-around：每项左右各有间距（两端间距是中间的一半）。space-evenly：所有间隙完全相等。'));
questions.push(q('css-layout',2,'flex-direction: column 会改变什么？',['justify-content 和 align-items 的轴向互换','没有任何变化','元素消失','只改变文字方向'],0,'flex-direction:column 把主轴从横向变为纵向。此时 justify-content 控制纵向对齐，align-items 控制横向对齐。'));
questions.push(q('css-layout',2,'flex: 1 是什么意思？',['元素宽度为 1px','元素占据剩余空间中的 1 份','只有一个元素时才能用','已废弃'],1,'flex:1 是 flex-grow:1; flex-shrink:1; flex-basis:0 的简写。两个子元素分别设 flex:1 和 flex:2，宽度比是 1:2。'));
questions.push(q('css-layout',3,'导航栏左边 Logo、右边几个链接，用 Flexbox 怎么写？',['给 nav 设 display:flex; justify-content:space-between','给每个元素设 float','用 position:absolute','不可能实现'],0,'nav{display:flex;justify-content:space-between}。左边 Logo 自然在左端，右边链接在右端，中间空白自动填充。'));
questions.push(q('css-layout',1,'grid-template-columns: 1fr 2fr 1fr 是什么意思？',['三列，宽度比 1:2:1','四列等宽','语法错误','两列布局'],0,'fr = fraction(份数)。1fr 2fr 1fr 表示三列，第二列是第一列的两倍宽。总共分 4 份，列宽占比 25%/50%/25%。'));
questions.push(q('css-layout',2,'Grid 和 Flexbox 的核心区别？什么时候用哪个？',['完全相同','Grid 是二维(行列)，Flexbox 是一维(行或列)。整体页面布局用 Grid，组件内部排列用 Flexbox','Flexbox 比 Grid 更好','Grid 已废弃'],1,'Grid 同时控制行和列（二维），适合整体页面布局。Flexbox 只控制一个方向（一维），适合组件内部排列。两者互补，经常组合使用。'));
questions.push(q('css-layout',2,'gap 属性在 Flexbox 和 Grid 中的作用？',['只用于 Grid','设置子元素之间的间距，Flexbox 和 Grid 都支持','只用于 Flexbox','设置边框粗细'],1,'gap 设置子元素之间的间距（行间距和列间距）。CSS 早期 flexbox 不支持 gap，现在两者都支持。'));
questions.push(q('css-layout',1,'position 有哪五种值？',['top/right/bottom/left/center','static/relative/absolute/fixed/sticky','flex/grid/block/inline/float','normal/bold/italic/underline/overline'],1,'五种定位：static(默认，正常流)、relative(相对自身偏移)、absolute(相对定位祖先)、fixed(相对视口固定)、sticky(滚动吸附)。'));
questions.push(q('css-layout',2,'relative 定位相对于谁？absolute 相对于谁？',['relative 相对视口，absolute 相对父元素','relative 相对自身原位置，absolute 相对最近的定位祖先','两者都相对父元素','两者都相对视口'],1,'relative：元素先按正常流布局，然后相对自己原本的位置偏移（原位置仍占空间）。absolute：脱离文档流，相对最近的 position 非 static 的祖先定位。'));
questions.push(q('css-layout',2,'@media (max-width: 768px) 匹配什么设备？',['宽度大于 768px 的屏幕','宽度小于等于 768px 的屏幕','所有设备','只匹配手机'],1,'max-width:768px 表示"屏幕宽度 ≤ 768px 时应用这些样式"——通常是手机或小平板。min-width:769px 则匹配宽度 ≥ 769px 的设备。'));

// ========== CSS 动画 (10 题) ==========
questions.push(q('css-anim',1,'transition 需要哪些要素？',['只需要属性名','属性 + 时长（至少）','必须写 4 个值','只需要时长'],1,'transition 至少需要：transition-property(哪个属性) + transition-duration(多久)。可选：transition-timing-function(曲线) + transition-delay(延迟)。'));
questions.push(q('css-anim',2,'transition 和 animation 的核心区别？',['完全相同','transition 需要触发(如hover)，animation 自动播放。transition 只有开始/结束两态，animation 可定义多个关键帧','animation 更简单','transition 已废弃'],1,'transition 被动触发（hover/focus 等），只做 A→B 两态过渡。animation 主动播放，通过 @keyframes 定义任意多帧，可循环、可反向。'));
questions.push(q('css-anim',1,'@keyframes 的 from 和 to 分别对应百分之几？',['0% 和 50%','0% 和 100%','50% 和 100%','语法错误'],1,'from = 0%（动画开始），to = 100%（动画结束）。也可以写具体百分比：0%{} 25%{} 50%{} 75%{} 100%{}。'));
questions.push(q('css-anim',2,'ease / linear / ease-in / ease-out 的区别？',['完全相同','ease 慢快慢(默认)；linear 匀速；ease-in 慢→快；ease-out 快→慢','ease 已废弃','linear 只用于 rotate'],1,'ease(默认)：慢→快→慢，最自然。linear：全程匀速。ease-in：慢速开始。ease-out：慢速结束。就像扬琴曲的速度变化。'));
questions.push(q('css-anim',2,'animation-fill-mode: forwards 和 none 的区别？',['forwards 动画结束后保持最后一帧；none 回到初始状态','完全相同','forwards 已废弃','none 表示不播放'],0,'forwards：动画结束后元素保持最后一帧的样式。none(默认)：动画结束后元素回到动画前的初始状态（会闪回）。backwards：动画开始前就应用第一帧。both：同时保留前后。'));
questions.push(q('css-anim',3,'做一个无限旋转动画，@keyframes 怎么写？',['@keyframes spin{ from{rotate:0} to{rotate:360deg} }','@keyframes spin{ from{transform:rotate(0deg)} to{transform:rotate(360deg)} }','keyframes spin{ transform: spin }','@keyframes spin{ 0%{rotate:0} 100%{rotate:1turn} }'],1,'`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`。使用时：`animation: spin 2s linear infinite;`。'));
questions.push(q('css-anim',3,'为什么推荐用 transform 做动画而不是改 left/top？',['没有区别','transform 只触发合成(Composite)，不改布局，GPU 加速；left/top 触发重排(Reflow)，性能差','transform 更简单','left/top 已废弃'],1,'浏览器渲染分重排→重绘→合成。left/top 触发重排(最贵)。transform 只触发合成，由 GPU 处理，性能最好。做动画优先用 transform 和 opacity。'));
questions.push(q('css-anim',2,'animation-duration 单位是什么？1.5s 和 1500ms 等价吗？',['s 和 ms，1.5s = 1500ms，等价','只能用 s','只能用 ms','1.5s = 150ms'],0,'animation-duration 可以用 s(秒) 或 ms(毫秒)。1s = 1000ms，1.5s = 1500ms，效果完全相同。'));
questions.push(q('css-anim',1,'animation-iteration-count: infinite 是什么效果？',['只播放一次','无限循环播放','播放 3 次','不播放'],1,'infinite = 无限循环。也可以写具体数字：3 表示播放 3 次后停止。默认是 1（播放一次）。'));
questions.push(q('css-anim',2,'animation-direction: alternate 的效果？',['动画反向播放','奇数遍正向、偶数遍反向，来回交替','动画加速播放','只播放反向'],1,'alternate：奇数遍(1,3,5)正向播放，偶数遍(2,4,6)反向播放。配合 infinite 使用可做出"来回"的效果。normal(默认)：始终正向。'));

// ========== JS 基础语法补充 (6 题，已有 0) ==========
questions.push(q('js-syntax',1,'let 和 const 的区别？什么时候用哪个？',['let 可重新赋值，const 不能；默认用 const，需要改时用 let','完全相同','const 更快','let 已废弃'],0,'const 声明常量，不可重新赋值。let 声明变量，可以重新赋值。最佳实践：默认用 const，只有确定需要改值时用 let。'));
questions.push(q('js-syntax',2,'const arr = [1,2,3]; arr.push(4); 会报错吗？',['会，const 不能修改','不会，const 保护的是引用(不能重新赋值)，但数组内容可以改','取决于浏览器','push 对 const 数组无效'],1,'const 锁定的是变量绑定（不能 arr = 新数组），但数组/对象的内容可以修改（push、修改属性等）。想完全冻结用 Object.freeze()。'));
questions.push(q('js-syntax',1,'JS 有哪几种基础数据类型？typeof 分别返回什么？',['string/number/boolean/undefined/object/function','只有 string 和 number','所有东西都是 object','只有 3 种'],0,'7 种：string/number/boolean/undefined/null/symbol/bigint。typeof null 返回 "object"(历史 bug)。函数 typeof 返回 "function"（实际是 object 子类型）。'));
questions.push(q('js-syntax',2,'typeof null 返回什么？为什么？',['"null"','"object"，这是 JS 早期的实现 bug，一直保留至今','"undefined"','"nullpointer"'],1,'typeof null === "object" 是 JS 最早实现时的 bug。null 被标记为对象类型(000)，而对象的类型标记也是 000。为了兼容性，这个 bug 一直没有修复。'));
questions.push(q('js-syntax',2,'"5" + 3 和 "5" - 3 的结果分别是？',['53 和 2','8 和 2','"53" 和 "53"','报错'],0,'+ 遇到字符串会拼接："5"+3="53"。- 只用于数字，会先把 "5" 转为数字 5 再减：5-3=2。这就是"字符串和数字的隐式类型转换"。'));
questions.push(q('js-syntax',3,'0 == false 和 0 === false 的结果分别是？',['true 和 false','true 和 true','false 和 false','false 和 true'],0,'== 会做类型转换，0 被转为 false，所以 0==false 为 true。=== 严格比较不做转换，0 是 number，false 是 boolean，类型不同 → false。推荐始终用 ===。'));

// ========== JS 函数 (6 题) ==========
questions.push(q('js-functions',1,'函数的作用？为什么要封装？',['让代码看起来更多','一段可重复调用的代码块，避免重复、方便维护','提升性能','只是为了好看'],1,'函数把一组操作封装起来，起一个名字。写好一次，到处调用，减少重复代码。修改时只改一处。'));
questions.push(q('js-functions',1,'函数忘记写 return 会返回什么？',['null','undefined','报错','0'],1,'没有 return 语句的函数会隐式返回 undefined。箭头函数如果只有一行表达式且没写花括号，会自动返回表达式结果。'));
questions.push(q('js-functions',2,'箭头函数 (a, b) => a + b 等价于什么？',['function(a, b) { return a + b }','let a + b','a => b','function a(b) {}'],0,'箭头函数是 ES6 的简写：(a,b)=>{return a+b}。如果函数体只有一行 return，可省略 {} 和 return，写成 (a,b)=>a+b。'));
questions.push(q('js-functions',2,'var 和 let 的作用域有什么区别？',['完全相同','var 是函数作用域，let 是块级作用域({}内有效)','let 是函数作用域','var 已废弃'],1,'var：函数作用域，有变量提升。let：块级作用域（{} 内有效），没有变量提升。推荐用 let/const，避免 var 的作用域混乱。'));
questions.push(q('js-functions',3,'闭包是什么？function outer(){ let x=1; return function(){ return x } } 内部函数能访问 x 吗？',['不能，x 在外部函数中','能，内部函数"记住"了外部函数的变量，这就是闭包','只有在外部函数运行时才能访问','报错'],1,'闭包 = 函数 + 它能访问的外部变量。内部函数"捕获"了 outer 的 x 变量，即使 outer 执行完毕，x 仍能被内部函数访问。'));
questions.push(q('js-functions',2,'默认参数 function greet(name = "世界") 的作用？',['如果调用时不传参，name 默认为"世界"','会报错','name 只能是"世界"','这是 TS 语法'],0,'默认参数：调用函数时如果不传这个参数（或传 undefined），就使用默认值。`greet()` 输出"你好世界"，`greet("小明")` 输出"你好小明"。'));

// ========== JS 错误处理 (4 题) ==========
questions.push(q('js-errors',1,'SyntaxError / ReferenceError / TypeError 的区别？',['完全没有区别','SyntaxError=语法错误/ReferenceError=变量未定义/TypeError=类型错误','TypeError 最轻','ReferenceError 已废弃'],1,'SyntaxError：代码语法不对，整个脚本不执行。ReferenceError：访问不存在的变量。TypeError：对错误类型执行不支持的操作（如 null.toString()）。'));
questions.push(q('js-errors',2,'Cannot read property xxx of null 是什么错误？怎么修？',['计算机坏了','你试图访问一个 null 值的属性。检查 querySelector 是否找到了元素','这是正常警告','重启浏览器'],1,'最常见原因：querySelector 没找到元素返回 null，然后对 null 操作。修复：先判断 `if(el)` 再操作、或者检查选择器是否正确、或者等 DOM 加载完再操作。'));
questions.push(q('js-errors',1,'try/catch 的基本语法？',['try{ } else{ }','try{ } catch(e){ }','catch{ } try{ }','try{ } error{ }'],1,'try 块放可能出错的代码，catch(e) 块处理错误。错误不会让整个程序崩溃跳转到 catch。finally 块(可选)无论是否出错都执行。'));
questions.push(q('js-errors',2,'代码报错了，第一步应该做什么？',['重新写一遍','看控制台(F12)的错误信息，找到报错文件和行号','刷新页面','换台电脑'],1,'打开 F12 开发者工具 → Console 面板，看清楚报错类型、信息和行号。80% 的问题通过读报错信息就能定位。不要忽略报错！'));

// ========== JS DOM (6 题) ==========
questions.push(q('js-dom',1,'querySelector 和 querySelectorAll 返回值的区别？',['两者都返回数组','前者返回第一个匹配元素(或null)，后者返回 NodeList','前者返回 NodeList','后者返回单个元素'],1,'querySelector：返回第一个匹配元素，找不到返回 null。querySelectorAll：返回所有匹配元素的 NodeList（类数组），找不到返回空 NodeList。'));
questions.push(q('js-dom',2,'addEventListener 和 element.onclick 的区别？',['完全相同','addEventListener 可绑定多个处理函数，onclick 只能绑定一个。addEventListener 更灵活','onclick 更灵活','addEventListener 已废弃'],1,'onclick 是 DOM 属性，只能赋一个函数（后面的覆盖前面的）。addEventListener 可以给同一事件绑定多个处理函数。推荐始终用 addEventListener。'));
questions.push(q('js-dom',2,'事件冒泡是什么？event.stopPropagation() 的作用？',['事件从子元素向父元素逐层传播。stopPropagation() 阻止继续冒泡','事件只在当前元素触发','冒泡已废弃','stopPropagation 加速事件'],0,'点击子元素时，click 事件会逐层向上传播给父元素→祖父元素→document。stopPropagation() 阻止这个传播过程。事件委托正是利用了冒泡。'));
questions.push(q('js-dom',2,'innerHTML 和 textContent 的区别？安全性？',['完全相同','innerHTML 解析 HTML 标签，textContent 只设置纯文本。innerHTML 有 XSS 风险','textContent 更快','innerHTML 已废弃'],1,'innerHTML：设置的内容会被解析为 HTML（有 XSS 风险，不要把用户输入直接给 innerHTML）。textContent：设置的内容始终被视为纯文本（安全）。'));
questions.push(q('js-dom',2,'createElement + appendChild 的流程是什么？',['直接写 HTML','创建元素→设置属性/内容→追加到父元素。三步完成','只能创建 div','appendChild 已废弃'],1,'let el=document.createElement("div")→el.className="card"→el.textContent="Hello"→parent.appendChild(el)。'));
questions.push(q('js-dom',3,'事件委托是什么？为什么动态添加的元素需要事件委托？',['委托给别人写代码','把事件监听绑在父元素上，利用冒泡处理子元素事件。新添加的元素自动继承事件处理','委托不是前端概念','事件委托已废弃'],1,'不为每个子元素单独绑事件，而是在父元素上绑一个事件，通过 e.target 判断点击的是哪个子元素。动态添加的子元素自动被"委托"覆盖，不需要重新绑定。'));

// ========== JS 数组 (6 题) ==========
questions.push(q('js-arrays',1,'map 和 forEach 的区别？',['完全相同','map 返回新数组，forEach 返回 undefined','forEach 返回新数组','map 已废弃'],1,'map：对每个元素执行函数，返回所有返回值组成的新数组（不修改原数组）。forEach：对每个元素执行函数，无返回值（用于副作用，如打印）。'));
questions.push(q('js-arrays',2,'filter 的作用？',['过滤掉不满足条件的元素，返回新数组','修改原数组','和 map 完全一样','已废弃'],0,'filter：对每个元素执行条件函数，返回满足条件的元素组成的新数组。原数组不变。如 [1,2,3,4].filter(x=>x>2) 返回 [3,4]。'));
questions.push(q('js-arrays',2,'push、pop、shift、unshift 分别操作数组哪一端？',['push/pop 操作末尾，shift/unshift 操作开头','全部操作末尾','push 操作开头','它们没有区别'],0,'push(末尾添加)/pop(末尾删除并返回)/unshift(开头添加)/shift(开头删除并返回)。push 和 pop 是"栈"，速度快。shift/unshift 需要移动所有元素，较慢。'));
questions.push(q('js-arrays',2,'splice 和 slice 的区别？哪个修改原数组？',['完全相同','splice 删除/插入元素(修改原数组)，slice 截取子数组(不修改原数组)','slice 修改原数组','两者都不修改原数组'],1,'splice(start,deleteCount,...items)：从 start 删除 deleteCount 个元素，可插入新元素→直接修改原数组。slice(start,end)：截取 [start,end) 范围的子数组→返回新数组，原数组不变。'));
questions.push(q('js-arrays',1,'数组解构 const [a, b] = [1, 2] 做了什么？',['报错','a=1, b=2。从数组中"解包"值赋给变量','a=1, b=undefined','a=[1,2], b=undefined'],1,'解构赋值：把右边的数组按位置"拆开"，左边变量一一对应接收。还可以设默认值、跳过元素、收集剩余元素(...rest)。'));
questions.push(q('js-arrays',3,'[3, 10, 1, 20].sort() 返回什么？为什么？',['[1,3,10,20]','[1,10,20,3]——sort 默认按字符串排序，逐字符比较。要数字排序需传比较函数','[3,10,1,20]','报错'],1,'sort() 默认把元素转成字符串按字典序排序。所以 "10"<"3"（因为 "1"<"3"）→ [1,10,20,3]。数字排序需要：(a,b)=>a-b（升序）或 b-a（降序）。'));

// ========== JS API (5 题) ==========
questions.push(q('js-api',1,'document.querySelector(".card") 返回什么？',['所有 card','第一个 class 为 card 的元素，找不到返回 null','card 的 HTML 源码','一个数组'],1,'querySelector 返回第一个匹配元素（或 null）。想获取所有 card 用 querySelectorAll。'));
questions.push(q('js-api',1,'[1,2,3].includes(2) 返回什么？',['true','false','2','报错'],0,'includes：判断数组是否包含指定值，返回 true/false。indexOf 也判断包含但返回位置索引（-1 表示不包含）。includes 更语义化。'));
questions.push(q('js-api',1,'" hello ".trim() 返回什么？',['"hello "','"hello"','" hello"','" hello "'],1,'trim() 去掉字符串两端的空白字符（空格、制表符、换行）。中间的空白不动。'));
questions.push(q('js-api',2,'[1,2,3].join("-") 和 "a,b,c".split(",") 各返回什么？',['join 返回数组，split 返回字符串','join 返回 "1-2-3"（数组→字符串），split 返回 ["a","b","c"]（字符串→数组）','两者都返回字符串','两者都返回数组'],1,'join(分隔符)：数组→字符串，用分隔符连接。split(分隔符)：字符串→数组，按分隔符切开。互为逆操作。'));
questions.push(q('js-api',2,'element.classList.add / remove / toggle / contains 各做什么？',['完全相同','add=添加类/remove=移除类/toggle=切换(有则删无则加)/contains=判断是否有该类','它们已废弃','只用于 ID'],1,'classList 是操作元素 class 的推荐方式（比直接改 className 更好）。add("active") 添加、remove("active") 移除、toggle("active") 自动切换、contains("active") 返回 true/false。'));

// ========== JS 异步 (5 题) ==========
questions.push(q('js-async',1,'setTimeout(()=>console.log(1), 1000) 中的 1000 是什么单位？',['秒(s)','毫秒(ms)','帧','微秒'],1,'setTimeout 和 setInterval 的时间单位是毫秒(ms)。1000ms=1秒，500ms=0.5秒。'));
questions.push(q('js-async',2,'fetch("/api/data") 返回什么？',['数据对象','Promise 对象','JSON 字符串','原始数据'],1,'fetch() 返回一个 Promise，resolve 后得到一个 Response 对象。要通过 .json() 或 .text() 方法提取实际数据。'));
questions.push(q('js-async',2,'async function f(){ return 1 } 的返回值是什么？',['1','Promise { 1 }','undefined','报错'],1,'async 函数总是返回 Promise。return 1 实际上等价于 return Promise.resolve(1)。调用 f() 得到的是一个 Promise。'));
questions.push(q('js-async',1,'await 只能在什么函数中使用？',['任何函数','async 函数','箭头函数','普通函数'],1,'await 关键字只能在 async 函数内部使用。在普通函数或全局作用域中使用会报语法错误。'));
questions.push(q('js-async',3,'console.log(1); setTimeout(()=>console.log(2), 0); console.log(3) 输出顺序？',['1,2,3','1,3,2','2,1,3','3,2,1'],1,'同步代码先执行：1→3。setTimeout 虽然延迟是 0，但它会被放入任务队列，等所有同步代码执行完再执行→2。这就是事件循环。'));

// ========== 前端工程化 (6 题) ==========
questions.push(q('engineering',1,'Node.js 是什么？',['浏览器插件','让 JS 脱离浏览器、在电脑上独立运行的环境','JS 框架','数据库'],1,'Node.js 是 JS 运行环境，让 JS 可以在服务器/本地电脑上运行（不依赖浏览器）。有了它才能用 npm、Vite 等工具。'));
questions.push(q('engineering',1,'npm 的全称和作用？',['Node Package Manager。下载、管理 JS 包(库/工具)','New Project Maker','Network Protocol Module','Node Program Manager'],0,'npm=Node Package Manager。用来安装第三方包（npm install）、管理项目依赖（package.json）、运行脚本（npm run dev）。'));
questions.push(q('engineering',2,'npm install 做了什么？',['删除 node_modules','读取 package.json，下载所有依赖到 node_modules','发布项目','初始化 Git'],1,'npm install 根据 package.json 中的 dependencies 和 devDependencies，从 npm 仓库下载所有需要的包到 node_modules/。'));
questions.push(q('engineering',2,'dependencies 和 devDependencies 的区别？',['完全相同','dependencies=运行时需要的包；devDependencies=只在开发时需要(如 Vite/ESLint)','devDependencies 更快','dependencies 已废弃'],1,'dependencies：项目运行时需要的包（如 Vue、axios），部署时要安装。devDependencies：只在开发时用（如 Vite、ESLint），部署时不安装。用 npm install -D 安装到 devDependencies。'));
questions.push(q('engineering',1,'import/export 的作用？',['装饰代码','模块化：把代码拆分到不同文件，通过 import 引入、export 导出','提升性能','只是语法糖'],1,'ES6 模块系统。export 导出变量/函数/类供其他文件使用，import 导入其他文件的导出。实现代码分离和复用。'));
questions.push(q('engineering',2,'npm run dev 和 npm run build 的区别？',['完全相同','dev 启动开发服务器(热更新/不压缩)，build 生产构建(压缩/优化)','build 更快','dev 已废弃'],1,'dev：启动开发服务器，支持热更新(HMR)，代码不压缩（方便调试）。build：打包优化，压缩代码、tree-shaking，输出到 dist/ 目录用于部署。'));

// ========== Vue 核心 (5 题) ==========
questions.push(q('vue-core',1,'.vue 文件的三段式结构？',['HTML/CSS/JS','template(模板)/script(逻辑)/style(样式)','header/body/footer','只有一个区域'],1,'.vue 单文件组件分三块：<template> 写 HTML 模板，<script setup> 写 JS/TS 逻辑，<style scoped> 写 CSS 样式（scoped 让样式只作用于当前组件）。'));
questions.push(q('vue-core',2,'v-if 和 v-show 的区别？DOM 层面有什么不同？',['完全相同','v-if 不显示时元素从 DOM 中移除；v-show 不显示时只是 display:none，元素仍在 DOM 中','v-show 更强','v-if 已废弃'],1,'v-if=false：元素不存在于 DOM 中（销毁/重建，开销大）。v-show=false：元素在 DOM 中但 display:none（只切换 CSS，开销小）。频繁切换用 v-show，条件很少变用 v-if。'));
questions.push(q('vue-core',1,'ref() 的作用？.value 在哪里用哪里不用？',['创建普通变量','创建响应式数据。JS 中读写用 .value，template 中自动解包不用 .value','只是装饰','已废弃'],1,'ref() 创建响应式引用。在 <script> 中通过 .value 读写，在 <template> 中 Vue 自动解包（直接用变量名，不用 .value）。'));
questions.push(q('vue-core',2,'computed 和 watch 的区别？',['完全相同','computed 基于已有数据计算派生值(有缓存)；watch 监听数据变化执行副作用(如发请求)','watch 更快','computed 已废弃'],1,'computed：自动追踪依赖，依赖不变时返回缓存值（用于派生数据）。watch：显式监听某个值的变化，执行回调（用于副作用，如保存到 localStorage、发 API 请求）。'));
questions.push(q('vue-core',2,'Props 和 Emits 分别用于什么？数据流向是什么？',['Props 子传父，Emits 父传子','Props 父传子(数据向下)，Emits 子传父(事件向上)。单向数据流','两者都是父传子','两者都是子传父'],1,'Props：父组件向子组件传递数据（像指挥分发乐谱）。Emits：子组件向父组件发送事件通知（像演奏者举手示意）。数据始终从父流向子，子不能直接修改 props。'));

// ========== Vue 进阶 (3 题) ==========
questions.push(q('vue-advanced',2,'onMounted 什么时候执行？能访问 DOM 吗？',['组件创建前','组件挂载到 DOM 后。此时可以访问 DOM 元素','组件销毁时','任何时候'],1,'onMounted 在组件首次渲染并挂载到 DOM 后执行。此时可以安全地访问 DOM、操作 ref 绑定的元素、发起数据请求。'));
questions.push(q('vue-advanced',2,'Vue Router 的作用？和普通 a 标签跳转有什么区别？',['完全相同','SPA 页面切换不刷新。router-link/router.push 切换"页面"时浏览器不重新加载','Router 是后端概念','Vue Router 已废弃'],1,'Vue Router 实现前端路由——切换"页面"时浏览器不刷新（SPA）。普通 a 标签会整页刷新。router.push() 和 <router-link> 都能实现无刷新跳转。'));
questions.push(q('vue-advanced',2,'scoped 样式的作用？不加 scoped 会怎样？',['没有任何区别','scoped 让 CSS 只作用于当前组件。不加 scoped 样式会泄漏到全局，影响其他组件','scoped 更快','scoped 已废弃'],1,'<style scoped> 的样式只对当前组件的元素生效，不会污染其他组件。不加 scoped，样式是全局的，可能意外影响其他组件。'));

// ========== AI 协作 (4 题) ==========
questions.push(q('ai',1,'AI(LLM)的本质是什么？它能"思考"吗？',['它能像人一样思考','它是预测下一个最可能 token 的统计模型。它的"思考"是数学计算，不是人类意义上的思考','它有自我意识','它能创造新知识'],1,'LLM(大语言模型)本质是"下一个词预测器"。它根据训练数据和上下文，计算每个可能的下一个 token 的概率。它的回答是概率计算的结果，不是真正的思考和理解。'));
questions.push(q('ai',2,'好 Prompt 应该包含哪些要素？',['随便写一句话','角色+上下文+任务描述+格式要求。越具体越好','只写关键词','越长越好'],1,'好 Prompt = 角色("你是一个前端专家") + 上下文("我在做一个音乐教学网站") + 任务("帮我写一个 CSS 动画") + 格式约束("输出完整代码") + 示例。'));
questions.push(q('ai',2,'AI 写的代码能直接复制粘贴用吗？',['完全可以','需要审查和测试。AI 可能写出有 bug 的代码，也可能使用过时的 API 或不安全的写法','绝对不能','只有简单代码能用'],1,'AI 生成的代码像"初稿"——需要人工审核、测试、理解。AI 可能产生幻觉（编造不存在的 API）、使用过时语法、忽略安全问题。始终把 AI 当助手而非替代品。'));
questions.push(q('ai',3,'什么是 AI 幻觉(Hallucination)？怎么应对？',['AI 看到了幻觉','AI 自信地给出看似合理但实际错误的答案。应对：质疑、验证、要求引用来源','一种新的 AI 功能','AI 的创意模式'],1,'幻觉：AI 编造不存在的事实、API、库，但语气非常自信。应对方法：对 AI 输出保持质疑、运行代码验证、查官方文档确认、让 AI 提供引用来源。'));

// Append to file
const closing = src.lastIndexOf(']');
const newContent = src.substring(0, closing) + ',\n' + questions.join(',\n') + '\n]';
fs.writeFileSync('src/configs/quiz-questions.ts', newContent, 'utf-8');
console.log(`Added ${questions.length} questions. Total: ${id - 1}`);

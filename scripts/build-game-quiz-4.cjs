const fs = require('fs');let src = fs.readFileSync('src/configs/quiz-questions.ts','utf-8');
const ids=[...src.matchAll(/id: (\d+)/g)].map(m=>parseInt(m[1]));let id=Math.max(...ids)+1;
function q(g,l,t,d,q,o,a,e){return `  { id: ${id++}, gem: '${g}', level: ${l}, type: '${t}', difficulty: ${d}, question: '${q.replace(/'/g,"\\'")}', options: ['${o[0].replace(/'/g,"\\'")}','${o[1].replace(/'/g,"\\'")}','${o[2].replace(/'/g,"\\'")}','${o[3].replace(/'/g,"\\'")}'], answer: ${a}, explanation: '${e.replace(/'/g,"\\'")}' }`;}
const Q=[];

// ====== Web 基石宝石·成就Boss (15) ======
const G7='web-foundation';
Q.push(q(G7,1,'achievement-boss',3,'HTML+CSS 混合：给一个导航栏需求(左边logo右边链接)，最合适的标签和CSS？',['<div>+float','<nav>+display:flex+space-between','<table>布局','<header>+position:absolute'],1,'语义化 nav 包裹+flex 布局是现代标准做法。'));
Q.push(q(G7,1,'achievement-boss',3,'HTML+CSS：一个表单 label 点击没反应→可能原因？',['JS 没加载','label 的 for 和 input 的 id 不匹配','CSS 样式问题','浏览器版本太旧'],1,'label for 必须等于 input id——这对钥匙锁必须一模一样才会生效。'));
Q.push(q(G7,1,'achievement-boss',3,'HTML+CSS：以下哪项能实现三列等宽布局？',['<table>','display:grid;grid-template-columns:repeat(3,1fr)','float:left;width:33%','以上都可以'],3,'三种都能实现三列等宽布局。Grid 最现代，Flexbox 也可，table 过时但不影响效果。'));
Q.push(q(G7,1,'achievement-boss',3,'HTML+CSS：图片加载失败不显示裂图图标应设置什么？',['style="hide-on-error"','alt=""且设置 onerror 替换','无法实现','display:none'],1,'alt=""不让阅读器读文件名。CSS/JS 可监听 error 事件隐藏或替换裂图。'));
Q.push(q(G7,1,'achievement-boss',3,'HTML+CSS：移动端页面在手机上缩放异常最常见原因？',['JS 错误','缺少 <meta name="viewport" content="width=device-width">','CSS 太多','图片太大'],1,'viewport meta 标签告诉手机浏览器按设备宽度渲染页面并禁止默认缩放。'));
Q.push(q(G7,1,'achievement-boss',3,'JS：querySelector(".card")返回 null 最可能原因？',['CSS 没加载','JS 在 DOM 之前执行或选择器写错','浏览器不支持','HTML 错误'],1,'JS 在 DOM 元素创建前执行→找不到。解法：script 放 body 底部或用 DOMContentLoaded 事件。'));
Q.push(q(G7,1,'achievement-boss',3,'JS：addEventListener("click",handler)→点击没反应可能原因？',['元素未创建时绑事件','事件名拼错(如"clik")或 handler 未定义','绑定在了父元素上','以上都可能'],3,'三个都可能。检查：元素存在？名字拼对？函数定义了？控制台有报错吗？'));
Q.push(q(G7,1,'achievement-boss',3,'JS：innerHTML+="<div>新内容</div>"有什么隐藏问题？',['没有','已有元素的绑定事件和状态会被重置','更快','不会添加内容'],1,'innerHTML+=会重新解析整个 HTML→已有元素被重建→之前绑的事件丢失。用 createElement+appendChild 保护已有状态。'));
Q.push(q(G7,1,'achievement-boss',3,'JS：[1,2,3,4,5]中筛选>2且×2→结果？',['[3,4,5]','[6,8,10]','报错','[6,8]'],1,'[1,2,3,4,5].filter(x=>x>2)得[3,4,5]→.map(x=>x*2)得[6,8,10]。方法链！'));
Q.push(q(G7,1,'achievement-boss',3,'HTML+CSS+JS 综合：一个按钮点击应变色但没变→从哪里开始排查？',['重写代码','F12 控制台看报错→检查元素是否被选中→检查事件是否绑定→检查 CSS 是否正确','换浏览器','重启电脑'],1,'调试流程：1.控制台报错？2.querySelector 拿到了元素？3.addEventListener 执行了？4.CSS 选择器权重够吗？'));
Q.push(q(G7,1,'achievement-boss',3,'HTML+CSS+JS 综合：表单提交不刷新页面用什么？',['action="#"','e.preventDefault()阻止默认提交','method="POST"','无法阻止'],1,'监听 form 的 submit 事件调用 e.preventDefault()阻止浏览器默认刷新行为。然后用 JS/fetch 自己处理数据。'));
Q.push(q(G7,1,'achievement-boss',3,'HTML+CSS+JS 综合：从 API 获取数据渲染列表→数据格式不是预期→怎么调试？',['换 API','console.log(data)查看实际结构→根据结构调整代码','放弃','猜结构'],1,'先打印数据看实际结构→根据结构写对应代码。API 返回格式经常与预期不同看文档或打印确认。'));
Q.push(q(G7,1,'achievement-boss',3,'HTML+CSS+JS 综合：以下关于前端三件套说法哪个正确？',['JS 可以替代 HTML','HTML 负责结构 CSS 负责样式 JS 负责交互，三者各司其职','CSS 可以替代 JS','HTML 可以替代 CSS'],1,'HTML=骨架，CSS=皮肤，JS=肌肉。三者各有职责不可互相替代。'));
Q.push(q(G7,1,'achievement-boss',3,'HTML+CSS+JS 综合：以下哪项属于"语义化"的最佳实践？',['全部用 div','header/nav/main/footer 等有含义标签+正确的 heading 层级+alt 属性','只用 span','语义化不重要'],1,'语义化=用有含义的标签和属性让机器(搜索引擎屏幕阅读器)理解页面结构。不只对 SEO 有用对无障碍也重要。'));
Q.push(q(G7,1,'achievement-boss',3,'HTML+CSS+JS 综合：以下关于响应式设计的说法哪个正确？',['只做手机版','同一套 HTML 通过 CSS @media 适配不同屏幕+弹性单位+灵活布局','为每种设备各写一套 HTML','响应式=自适应'],1,'响应式=同一套 HTML 通过 CSS 媒体查询和弹性单位在不同屏幕呈现合适布局。不是为每种设备写一套 HTML。'));

// ====== JS 异步宝石 (25) ======
const G8='js-async';
Q.push(q(G8,1,'normal',1,'setTimeout 中 1000 的单位？',['秒','毫秒','帧','微秒'],1,'setTimeout/setInterval 时间单位是毫秒(ms)。1000ms=1 秒。'));
Q.push(q(G8,1,'normal',1,'setInterval 和 setTimeout 核心区别？',['相同','setInterval 重复执行 setTimeout 执行一次','setInterval 更快','setTimeout 重复'],1,'setInterval 每隔指定时间重复执行(需 clearInterval 停止)。setTimeout 只执行一次。'));
Q.push(q(G8,1,'normal',1,'clearTimeout 做什么？',['清除所有定时器','取消指定的 setTimeout','重启定时器','加速定时器'],1,'clearTimeout(id)取消尚未执行的 setTimeout。clearInterval(id)同理。'));
Q.push(q(G8,1,'normal',1,'Promise 的三种状态？',['开始/进行中/结束','pending/fulfilled/rejected','成功/失败/重试','创建/执行/销毁'],1,'pending(进行中)→fulfilled(成功)或 rejected(失败)。状态一旦改变不可逆。'));
Q.push(q(G8,1,'normal',1,'fetch("/api")返回什么？',['数据对象','Promise 对象','JSON 字符串','原始数据'],1,'fetch()返回 Promise resolve 后得 Response 对象。需.json()或.text()提取数据。'));
// elite 8
Q.push(q(G8,2,'elite',2,'then 和 catch 分别处理什么？',['then 失败 catch 成功','then 成功 catch 失败','都处理成功','都处理失败'],1,'then 处理 fulfilled 状态。catch 处理 rejected 状态。finally 不论成败都执行。'));
Q.push(q(G8,2,'elite',2,'Promise 链式调用 then 返回值怎么传？',['无法传递','每个 then 返回的值会自动传为下一个 then 的参数','用全局变量','用闭包'],1,'then 回调的返回值被包装为 Promise 传为下一个 then 的参数。这是链式调用的核心。'));
Q.push(q(G8,2,'elite',2,'async 函数返回什么？',['原始值','始终返回 Promise','undefined','取决于内部'],1,'async function f(){return 1}→f()返回 Promise{1}。async 函数始终返回 Promise。'));
Q.push(q(G8,2,'elite',2,'await 只能在什么函数中使用？',['任何','async 函数','箭头函数','普通函数'],1,'await 只能在 async 函数内使用。顶层 await 在某些环境(ES模块)中也支持。'));
Q.push(q(G8,2,'elite',2,'fetch 返回 404 会进 catch 吗？',['会','不会 404 仍是成功的 HTTP 响应只有网络错误才进 catch','有时会','一定会'],1,'fetch 只有网络故障(断网 DNS 失败)时 reject。404/500 等 HTTP 错误仍 resolve 需手动检查 res.ok。'));
Q.push(q(G8,2,'elite',2,'Promise.all([p1,p2,p3])何时 resolve？',['第一个完成','全部完成','任何一个 reject','B 和 C'],3,'全部 resolve→返回所有结果数组。任何一个 reject→立即 reject。'));
Q.push(q(G8,2,'elite',2,'try{await fetch(url)}catch(e){} 能捕获什么？',['HTTP 404','网络错误(断网等)','所有 JS 错误','A 和 B'],1,'只能捕获网络错误。HTTP 404 不是异常不触发 catch。需手动检查 response.ok。'));
Q.push(q(G8,2,'elite',2,'回调地狱是什么？怎么解决？',['性能问题','多层嵌套回调难以阅读和维护→用 Promise 或 async/await 解决','JS 引擎 bug','一种设计模式'],1,'回调嵌套导致代码横向增长("金字塔")难以理解和调试。Promise.then 链和 async/await 将异步代码拉平。'));
// boss 12
Q.push(q(G8,3,'boss',3,'async/await 如何做错误处理？',['无法处理','用 try/catch 包裹 await','用 .catch()','自动处理'],1,'try{await fetch(url)}catch(e){处理错误}。和同步代码错误处理写法一致。'));
Q.push(q(G8,3,'boss',3,'多个独立 await 可以并行吗？怎么提高性能？',['不能','用 Promise.all 同时发起而非串行 await','自动并行','并行会出错'],1,'const[a,b]=await Promise.all([fetch(u1),fetch(u2)])同时发出两个请求而非等待第一个完成再发第二个。'));
Q.push(q(G8,3,'boss',3,'防抖(debounce)是什么？什么时候用？',['防代码崩溃','连续触发只执行最后一次。搜索框输入时减少请求次数','加密技术','防止重复提交'],1,'用户输入"贝多芬"→连续触发 3 次→防抖后只发最后一次请求。用 setTimeout+clearTimeout 实现。'));
Q.push(q(G8,3,'boss',3,'`console.log(1);setTimeout(()=>console.log(2),0);console.log(3)`顺序？',['1,2,3','1,3,2','2,1,3','3,2,1'],1,'同步代码先跑:1→3。setTimeout(fn,0)中 fn 入宏任务队列等同步执行完→2。'));
Q.push(q(G8,3,'boss',3,'`new Promise(r=>{r(1);r(2)}).then(console.log)`输出？',['1 和 2','只有 1(Promise 状态一旦改变不可逆)','只有 2','报错'],1,'Promise 状态一旦从 pending→fulfilled 就不可再变。第二次 r(2)被忽略。'));
Q.push(q(G8,3,'boss',3,'`fetch(url).then(r=>r.json())`为什么需要两步？',['设计缺陷','第一步得 Response 对象第二步解析 JSON 体(异步)','可以直接一步','json()是同步的'],1,'fetch 先返回 Response(含状态码头信息)再调用.json()(本身返回 Promise)解析响应体。'));
Q.push(q(G8,3,'boss',3,'async 函数中不加 await 会怎样？',['报错','Promise 不会等待直接返回 Promise 对象而非结果','自动 await','函数同步执行'],1,'不加 await 拿到的是 Promise 对象而非实际值。常见错误：以为拿到了数据实际拿到了 Promise。'));
Q.push(q(G8,3,'boss',3,'`setTimeout(fn,1000)`能保证 fn 在 1000ms 时准时执行吗？',['能','不能——延迟是最小等待时间实际可能更长(取决于事件队列)','只在 Chrome 准时','1000ms 误差±1ms'],1,'setTimeout 的延迟是最小等待时间。如果主线程忙(有长时间同步任务)fn 会延后执行。'));
Q.push(q(G8,3,'boss',3,'用 setTimeout 模拟 setInterval 有什么好处？',['无区别','避免回调堆积：前一个没执行完后一个已经到时间→用 setTimeout 递归可确保执行完再设下一次','setTimeout 更快','不需要 clear'],1,'setInterval 不管回调是否执行完到时间就触发→可能堆积。用 setTimeout 递归：每次执行完再设下一个。'));
Q.push(q(G8,3,'boss',3,'事件循环：宏任务和微任务哪个先执行？',['宏任务','微任务(如 Promise.then)在当前宏任务结束后立即执行优先于下一个宏任务','同时执行','随机'],1,'每轮事件循环：执行一个宏任务→清空所有微任务队列→渲染→下一轮宏任务。微任务优先于下一个宏任务。'));
Q.push(q(G8,3,'boss',3,'为什么 JS 是单线程却可以处理异步？',['JS 不是单线程','事件循环+Web API(定时器/网络)在浏览器其他线程执行完成后回调入 JS 线程','JS 多线程','异步是假的'],1,'JS 引擎单线程但浏览器提供 Web API(定时器/网络请求等)在其他线程执行。完成后回调推入 JS 任务队列等执行。'));
Q.push(q(G8,3,'boss',3,'addEventListener("click",async(e)=>{await fetch(...)})这样写对吗？',['对回调可以是 async','错 addEventListener 不支持 async','对但 e 不能传','必须用.then'],0,'事件回调可以是 async 函数。但需要注意：如果用户快速多次点击会有多个并发 fetch。可能需要防抖。'));

// ====== 工程化宝石 (20) ======
const G9='engineering';
Q.push(q(G9,1,'normal',1,'Node.js 是什么？',['浏览器插件','让 JS 脱离浏览器在电脑上独立运行的环境','JS 框架','数据库'],1,'Node.js 是 JS 运行环境使 JS 可在服务器/本地运行不依赖浏览器。有了它才能用 npm/Vite。'));
Q.push(q(G9,1,'normal',1,'npm 全称和作用？',['Node Package Manager 管理 JS 包的下载依赖','New Project Maker','Network Protocol','Node Program'],0,'npm 用来安装第三方包管理项目依赖运行脚本。'));
Q.push(q(G9,1,'normal',1,'import/export 作用？',['装饰代码','模块化：拆分代码到不同文件通过 import 引入 export 导出','提升性能','语法糖'],1,'ES6 模块系统。export 导出供其他文件使用 import 引入其他文件的导出。'));
Q.push(q(G9,1,'normal',1,'Git 是什么？',['代码编辑器','分布式版本控制系统记录代码修改历史','编程语言','部署工具'],1,'Git 记录代码每次修改可随时回到历史版本。是程序员的基本工具。'));
Q.push(q(G9,1,'normal',1,'npm run dev 和 npm run build 区别？',['相同','dev 启动开发服务器(热更新不压缩)，build 生产构建(压缩优化)','build 更快','dev 已废弃'],1,'dev=开发模式(热更新不压缩方便调试)。build=生产构建(压缩 tree-shaking 输出到 dist)。'));
// elite 7
Q.push(q(G9,2,'elite',2,'npm install 做了什么？',['删除 node_modules','读取 package.json 下载所有依赖到 node_modules','发布项目','初始化 Git'],1,'npm install 根据 package.json 中的 dependencies 和 devDependencies 从 npm 仓库下载包。'));
Q.push(q(G9,2,'elite',2,'dependencies 和 devDependencies 区别？',['相同','dependencies=运行时需要；devDependencies=只开发时需要(如 Vite)','dev 更快','dependencies 已废弃'],1,'dependencies：项目运行时必需的包(如 Vue)。devDependencies：只开发时需要(如 Vite/ESLint 构建工具)。'));
Q.push(q(G9,2,'elite',2,'ES6 import 和 CommonJS require 区别？',['完全相同','import 静态编译时加载可 tree-shaking；require 运行时动态加载','require 更新','import 已废弃'],1,'import 是 ES6 标准编译时确定依赖支持 tree-shaking。require 是 Node 传统方式运行时加载。'));
Q.push(q(G9,2,'elite',2,'git add/commit/push 各做什么？',['add=保存 commit=上传 push=删除','add=暂存到Stage commit=提交到本地仓库 push=推送到远程','全部上传','add 是 commit 的别名'],1,'add→暂存区(Stage)。commit→本地仓库记录快照。push→推送到远程(GitHub)。'));
Q.push(q(G9,2,'elite',2,'.gitignore 作用？node_modules 该在里面吗？',['记录 Git 配置','指定不纳入版本控制的文件。node_modules 必须加进去','记录依赖','不重要的文件'],1,'node_modules 体积大且可通过 npm install 还原→不应提交到 Git。必须写入.gitignore。'));
Q.push(q(G9,2,'elite',2,'默认导出 vs 命名导出区别？',['相同','默认导出 import xx from；命名导出 import{xx}from。一个模块可多个命名导出但只能一个默认导出','默认导出更多','命名导出已废弃'],1,'export default xxx→import xxx from。export const xxx→import{xxx}from。命名导出可多个。'));
Q.push(q(G9,2,'elite',2,'Git branch 的作用？',['备份文件','创建独立开发线不影响主线可并行开发后合并','删除文件','替代 commit'],1,'分支=代码的独立开发线。在主分支外创建分支开发新功能不影响主线完成后合并(merge)回去。'));
// boss 8
Q.push(q(G9,3,'boss',3,'git pull 和 git fetch 区别？',['相同','pull=fetch+merge(拉取并合并)；fetch 只拉取不合并','fetch 更强','pull 已废弃'],1,'fetch 从远程下载最新代码但不修改本地工作区。pull=fetch+merge 一步完成可能产生冲突。'));
Q.push(q(G9,3,'boss',3,'npm install -g 和普通 install 区别？',['完全相同','-g=全局安装(命令行工具如 create-vite)可在任何目录使用','-g 更快','-g 已废弃'],1,'普通安装→当前项目 node_modules。-g 全局安装→系统级供命令行直接调用。'));
Q.push(q(G9,3,'boss',3,'Vite 做了什么？和直接打开 .html 文件有什么区别？',['无区别','Vite 提供开发服务器+模块热更新+打包。直接打开文件无法用 import/处理路径','Vite 只是打包工具','Vite 代替浏览器'],1,'Vite 开发服务器处理模块解析/HMR/TypeScript 编译。直接打开 .html 无法用 import 模块。'));
Q.push(q(G9,3,'boss',3,'tree-shaking 是什么？前提条件？',['删除文件','打包时移除未使用的代码。需要 ES6 模块(静态分析)','压缩图片','优化 CSS'],1,'构建工具分析 import/export 静态依赖移除未被引用的代码减小包体积。前提是 ES6 模块(编译时确定依赖)。'));
Q.push(q(G9,3,'boss',3,'合并冲突(merge conflict)怎么处理？',['忽略','手动编辑冲突文件选择保留哪部分→标记已解决→commit','自动解决','删除文件重来'],1,'Git 无法自动合并时标记冲突区域(<<<<<<< ======= >>>>>>>)。手动选择保留内容→删除标记→add→commit。'));
Q.push(q(G9,3,'boss',3,'部署到 GitHub Pages 基本流程？',['复制粘贴文件','npm run build→配置 base→推送 gh-pages 分支或设置 GitHub Actions','直接上传 HTML','自动部署'],1,'1.设 base 路径 2.npm run build 3.将 dist 推送到 gh-pages 分支 4.GitHub Settings 开启 Pages。'));
Q.push(q(G9,3,'boss',3,'npx 和 npm 的区别？',['完全相同','npx 可直接运行 npm 包中的命令不必全局安装','npx 更快','npx 已废弃'],1,'npm 安装包。npx 临时执行包中的命令(如 npx create-vite)不必先全局安装。'));
Q.push(q(G9,3,'boss',2,'package.json 的 scripts 字段做什么？',['记录作者信息','定义可通过 npm run 执行的快捷命令','存储配置','已废弃'],1,'scripts 定义项目常用命令如"dev":"vite"→npm run dev 执行 vite。可自定义任意脚本。'));

// Append
const closing = src.lastIndexOf('\n]');
fs.writeFileSync('src/configs/quiz-questions.ts', src.substring(0,closing)+',\n'+Q.join(',\n')+'\n]','utf-8');
console.log('Added',Q.length,'Total:',id-1);

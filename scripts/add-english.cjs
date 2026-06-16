const fs = require('fs');

async function main() {
  const { glossary } = await import('../src/configs/glossary.ts');

  // Using backtick template literals to avoid quote escaping issues
  const toAdd = [
    ["ease", `CSS 动画的默认时间函数——动画速度曲线为慢→快→慢，让过渡看起来更自然。英文原意是「轻松、缓和」。`],
    ["linear", `CSS 动画的时间函数值——动画从头到尾保持匀速。英文原意是「线性的、直线的」。`],
    ["forwards", `CSS animation-fill-mode 的值——动画结束后保留最后一帧的样式，不弹回初始状态。英文原意是「向前」。`],
    ["backwards", `CSS animation-fill-mode 的值——在动画开始前就应用第一帧的样式。英文原意是「向后」。`],
    ["both", `CSS animation-fill-mode 的值——同时应用 forwards 和 backwards 的效果。英文原意是「两者都」。`],
    ["none", `CSS 中多个属性的默认值——表示「无、没有」。英文原意是「没有、无」。`],
    ["infinite", `CSS animation-iteration-count 的值——动画无限循环播放。英文原意是「无限的、无穷的」。`],
    ["alternate", `CSS animation-direction 的值——动画在奇数遍正向播放、偶数遍反向播放。英文原意是「交替的」。`],
    ["absolute", `CSS position 的值——元素脱离正常文档流，相对于最近的非 static 定位祖先定位。英文原意是「绝对的」。`, `就像独奏者从乐队中走出来站在前面。`],
    ["relative", `CSS position 的值——元素相对于自己原本的位置偏移，但仍占据原来的空间。英文原意是「相对的」。`],
    ["sticky", `CSS position 的值——元素滚动到指定位置后固定在屏幕上。英文原意是「粘性的」。`],
    ["center", `CSS 中常用的对齐值——让元素在容器中居中。英文原意是「中心、中间」。`, `就像指挥站在乐团正中央。`],
    ["solid", `CSS border-style 的值——边框为实线。英文原意是「实心的、固体的」。`],
    ["text", `input 的 type="text"——普通文本输入框。英文原意是「文本」。`],
    ["password", `input 的 type="password"——密码输入框，输入时显示为圆点。英文原意是「密码」。`],
    ["email", `input 的 type="email"——邮箱地址输入框。英文原意是「电子邮件」。`],
    ["date", `input 的 type="date"——日期选择器。英文原意是「日期」。`],
    ["submit", `button 的 type="submit"——提交表单的按钮。英文原意是「提交」。`],
    ["file", `input 的 type="file"——文件上传按钮。英文原意是「文件」。`],
    ["search", `input 的 type="search"——搜索输入框。英文原意是「搜索」。`],
    ["const", `JavaScript 声明常量的关键字——声明后不能重新赋值。英文原意是「常量」（constant 的缩写）。`, `就像扬琴的定弦——固定好之后就不变了。`],
    ["let", `JavaScript 声明变量的关键字——声明的变量可以重新赋值。英文原意是「让、允许」。`],
    ["function", `JavaScript 定义函数的关键字——一段可重复调用的代码块。英文原意是「功能、函数」。`, `就像乐曲的主题动机——写好一次，全曲反复出现。`],
    ["return", `JavaScript 函数返回值的关键字——把结果「返回」给调用方。英文原意是「返回」。`],
    ["true", `JavaScript 布尔值——表示「真、是、成立」。英文原意是「真的」。`],
    ["false", `JavaScript 布尔值——表示「假、否、不成立」。英文原意是「假的」。`],
    ["null", `JavaScript 特殊值——表示「空、什么都没有」。null 是主动设置为空。英文原意是「空的」。`],
    ["undefined", `JavaScript 特殊值——变量声明了但没赋值时的默认值，表示「未定义」。英文原意是「未定义的」。`],
    ["this", `JavaScript 关键字——指向当前执行上下文的对象。英文原意是「这个」。`],
    ["new", `JavaScript 创建对象实例的关键字。英文原意是「新的」。`],
    ["try", `JavaScript 错误处理关键字——try 块放可能出错的代码。英文原意是「尝试」。`, `就像排练时尝试一段高难度段落。`],
    ["catch", `JavaScript 错误处理关键字——catch 块放错误发生时的处理逻辑。英文原意是「捕获」。`],
    ["throw", `JavaScript 主动抛出错误的关键字。英文原意是「抛出」。`],
    ["await", `JavaScript 等待异步操作完成的关键字——必须在 async 函数中使用。英文原意是「等待」。`, `就像指挥等待独奏家完成华彩乐段再继续。`],
    ["async", `JavaScript 声明异步函数的关键字。英文原意是「异步的」。`],
    ["import", `JavaScript ES6 模块语法——从其他文件导入变量或函数。英文原意是「导入」。`],
    ["export", `JavaScript ES6 模块语法——将变量或函数导出供其他文件使用。英文原意是「导出」。`],
    ["from", `JavaScript ES6 模块语法配合 import 的关键字——指定从哪个文件导入。英文原意是「从、来自」。`],
    ["of", `JavaScript for...of 循环关键字——遍历数组的每个元素。英文原意是「...的」。`],
    ["in", `JavaScript for...in 循环关键字——遍历对象的属性。英文原意是「在...里面」。`],
    ["clone", `Git 命令——将远程仓库完整复制到本地。英文原意是「克隆」。`],
    ["pull", `Git 命令——从远程仓库拉取最新代码。英文原意是「拉」。`],
    ["pushCmd", `Git 命令——将本地提交推送到远程仓库。英文原意是「推」。`],
    ["branch", `Git 概念——分支，代码的独立开发线。英文原意是「树枝、分支」。`, `就像一首曲子的不同编曲版本，互不影响。`],
    ["merge", `Git 命令——将两个分支的代码合并。英文原意是「合并」。`],
    ["init", `Git/npm 命令——初始化新仓库或项目。英文原意是「初始化」（initialize 的缩写）。`],
    ["string", `JavaScript 数据类型——用引号包裹的文本。英文原意是「字符串」。`],
    ["object", `JavaScript 数据类型——键值对的集合。英文原意是「对象」。`],
    ["boolean", `JavaScript 数据类型——只有 true 和 false 两个值。以数学家 George Boole 的名字命名。`],
    ["rem", `CSS 相对长度单位——相对于根元素(html)的字体大小。全称 root em。`],
    ["vw", `CSS 相对长度单位——相对于视口宽度的百分比。1vw=视口宽度的1%。全称 viewport width。`],
    ["vh", `CSS 相对长度单位——相对于视口高度的百分比。1vh=视口高度的1%。全称 viewport height。`],
    ["rgb", `CSS 颜色函数——用红(Red)绿(Green)蓝(Blue)三原色值表示颜色。如 rgb(139,46,46)。`],
    ["hsl", `CSS 颜色函数——用色相(Hue)饱和度(Saturation)亮度(Lightness)表示颜色，比 rgb 更直观。`],
    ["https", `HTTP 协议的安全加密版本——网址开头的 https:// 表示数据传输是加密的，不会被窃听。全称 HyperText Transfer Protocol Secure。`],
    ["http", `超文本传输协议——浏览器和服务器通信的规则。网址开头的 http:// 就在声明用这个协议。全称 HyperText Transfer Protocol。`],
    ["url", `统一资源定位符——网页在互联网上的「地址」。全称 Uniform Resource Locator。`, `就像扬琴谱上的页码——指向一个确定的位置。`],
    ["cubic", `CSS cubic-bezier() 函数的一部分——可自定义动画速度曲线。英文原意是「三次的、立方的」。`],
    ["bezier", `CSS cubic-bezier() 函数——用四个控制点自定义动画速度曲线。以法国工程师 Pierre Bezier 命名。`],
    ["ease-in", `CSS 动画时间函数——动画慢速开始然后加速。英文原意是「缓入」。`, `就像扬琴曲从弱拍逐渐加速。`],
    ["ease-out", `CSS 动画时间函数——动画快速开始然后减速。英文原意是「缓出」。`, `就像扬琴曲渐慢收尾。`],
    ["ease-in-out", `CSS 动画时间函数——动画慢速开始和结束、中间加速。英文原意是「缓入缓出」。`],
    ["query", `编程中表示「查询」——如 media query 根据屏幕条件查询并应用样式。英文原意是「查询」。`],
    ["token", `编程中表示「令牌」——一小段代表身份的数据，常用于 API 认证。英文原意是「令牌」。`],
    ["debug", `调试——查找和修复代码中的错误。英文原意是「去除虫子」（计算机先驱 Grace Hopper 造的词，因为真有虫子卡在继电器里）。`],
    ["syntax", `语法——编程语言的书写规则，就像自然语言的语法规则。英文原意是「语法」。`],
    ["server", `服务器——为客户端提供数据或服务的计算机。英文原意是「服务者」。`],
    ["client", `客户端——向服务器请求数据的程序，如浏览器。英文原意是「客户」。`],
    ["render", `渲染——浏览器将 HTML/CSS/JS 代码转成用户在屏幕上看到的页面。英文原意是「渲染」。`],
    ["UI", `User Interface（用户界面）——用户能看到和交互的所有视觉元素，如按钮、输入框、文字。`],
    ["CLI", `Command Line Interface（命令行界面）——通过输入文本命令操作电脑的方式。`]
  ];

  const existing = new Set(glossary.map(e => e[0]));
  let added = 0;
  const skipped = [];
  for (const [key, exp, ana] of toAdd) {
    if (existing.has(key)) { skipped.push(key); continue; }
    glossary.push([key, { explanation: exp, analogy: ana || undefined }]);
    existing.add(key);
    added++;
  }

  console.log("Added:", added);
  console.log("Skipped (already exist):", skipped.join(", "));

  // Sort by key length desc
  glossary.sort((a, b) => b[0].length - a[0].length || a[0].localeCompare(b[0]));

  // Check prefix conflicts
  let bugs = 0;
  for (let i = 0; i < glossary.length; i++)
    for (let j = i + 1; j < glossary.length; j++)
      if (glossary[j][0].startsWith(glossary[i][0]) && glossary[j][0].length > glossary[i][0].length) {
        console.error("PREFIX:", glossary[i][0], "(" + glossary[i][0].length + ") before", glossary[j][0], "(" + glossary[j][0].length + ")");
        bugs++;
      }
  console.log("Prefix bugs:", bugs);

  // Serialize
  function esc(s) {
    return s.replace(/\\/g, '\\\\').replace(/'/g, "\\'").replace(/\n/g, '\\n');
  }
  const src = fs.readFileSync('src/configs/glossary.ts', 'utf-8');
  const marker = 'export const glossary: [string, TermDef][] = [';
  const header = src.substring(0, src.indexOf(marker) + marker.length);

  const lines = [header];
  for (let i = 0; i < glossary.length; i++) {
    const [key, def] = glossary[i];
    const comma = i < glossary.length - 1 ? ',' : '';
    lines.push("  ['" + esc(key) + "', {");
    lines.push("    explanation: '" + esc(def.explanation) + "',");
    if (def.analogy) {
      lines.push("    analogy: '" + esc(def.analogy) + "'");
    }
    const last = lines[lines.length - 1];
    lines[lines.length - 1] = last.replace(/,$/, '');
    lines.push("  }]" + comma);
  }
  lines.push(']\n');
  fs.writeFileSync('src/configs/glossary.ts', lines.join('\n'), 'utf-8');
  console.log('Total:', glossary.length, '| Longest:', glossary[0][0], '(' + glossary[0][0].length + ') | Shortest:', glossary[glossary.length - 1][0], '(' + glossary[glossary.length - 1][0].length + ')');
}

main().catch(e => console.error(e));

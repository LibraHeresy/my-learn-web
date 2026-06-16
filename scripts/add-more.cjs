const fs = require('fs');

async function main() {
  const { glossary } = await import('../src/configs/glossary.ts');

  // Batch 2: CSS transforms + key CSS properties + JS methods + misc
  const toAdd = [
    // CSS transforms
    ["translate", `CSS transform 函数——将元素沿 X/Y 轴平移（移动位置）。如 translate(100px, 0) 表示向右移动100像素。英文原意是「平移、移动」。`],
    ["rotate", `CSS transform 函数——将元素旋转指定角度。如 rotate(45deg) 表示顺时针旋转45度。英文原意是「旋转」。`],
    ["scale", `CSS transform 函数——将元素按比例缩放。如 scale(1.5) 放大1.5倍，scale(0.5) 缩小一半。英文原意是「缩放、比例」。`],
    ["skew", `CSS transform 函数——将元素倾斜变形。如 skew(10deg) 表示水平倾斜10度。英文原意是「倾斜、歪斜」。`],
    ["opacity", `CSS 属性——设置元素的透明度。0 完全透明（看不见），1 完全不透明（正常），0.5 半透明。英文原意是「不透明度」。`],
    ["cursor", `CSS 属性——设置鼠标悬停在元素上时显示的光标样式。如 pointer（手型）、crosshair（十字）。英文原意是「光标、指针」。`],
    ["pointer", `鼠标指针——cursor: pointer 让鼠标悬停时变成手型，暗示「这里可以点击」。英文原意是「指针、指示器」。`],
    ["overflow", `CSS 属性——控制元素内容超出容器时的处理方式。常用值：visible（可见）、hidden（隐藏）、scroll（滚动条）、auto（自动）。英文原意是「溢出」。`],
    ["hover", `CSS 伪类——:hover 表示鼠标悬停在元素上时的状态。如 button:hover { } 定义鼠标放在按钮上时的样式。英文原意是「盘旋、悬停」。`],
    ["focus", `CSS 伪类——:focus 表示元素获得焦点时的状态（如输入框被点击后）。英文原意是「焦点、聚焦」。`],
    ["active", `CSS 伪类——:active 表示元素被点击但尚未松开时的状态。英文原意是「激活的、活动的」。`],
    ["visited", `CSS 伪类——:visited 表示用户已经点击过的链接的样式。英文原意是「已访问的」。`],
    ["scroll", `CSS overflow 的值——内容超出时总是显示滚动条。也是 JS 的滚动相关方法。英文原意是「滚动」。`],
    ["auto", `CSS 中多个属性的值——浏览器自动计算。如 width:auto、overflow:auto。英文原意是「自动的」。`],
    ["normal", `CSS 中多个属性的默认值——如 font-weight:normal（正常粗细）、line-height:normal（默认行高）。英文原意是「正常的、常规的」。`],
    ["bold", `CSS font-weight 的值——文字加粗。英文原意是「粗的、大胆的」。`],
    ["italic", `CSS font-style 的值——文字斜体。英文原意是「斜体的」。`],
    ["underline", `CSS text-decoration 的值——文字下划线。英文原意是「下划线」。`],
    ["uppercase", `CSS text-transform 的值——将所有字母转为大写。英文原意是「大写字母」。`],
    ["lowercase", `CSS text-transform 的值——将所有字母转为小写。英文原意是「小写字母」。`],
    ["capitalize", `CSS text-transform 的值——每个单词首字母大写。英文原意是「首字母大写」。`],
    ["shadow", `CSS 视觉效果——box-shadow 给元素加投影阴影，text-shadow 给文字加阴影。英文原意是「阴影、影子」。`],
    ["background", `CSS 简写属性——设置元素的背景色、背景图等。英文原意是「背景」。`],
    ["repeat", `CSS background-repeat 的值——背景图片是否重复平铺。no-repeat 表示不重复。英文原意是「重复」。`],
    ["cover", `CSS background-size 的值——背景图片等比缩放至完全覆盖容器，可能裁剪。英文原意是「覆盖」。`],
    ["contain", `CSS background-size 的值——背景图片等比缩放至完全被容器包含，不裁剪。英文原意是「包含」。`],
    ["visible", `CSS visibility 和 overflow 的值——元素可见。visibility:hidden 让元素不可见但仍占空间。英文原意是「可见的」。`],
    // JS array/string methods
    ["map", `JavaScript 数组方法——对数组每个元素执行同一个操作，返回一个新数组。英文原意是「映射」。`, `就像给每份乐谱都复印一份并标上调号——每份都经过同样的处理。`],
    ["filter", `JavaScript 数组方法——筛选数组中满足条件的元素，返回新数组。英文原意是「过滤、筛选」。`, `就像从一堆乐谱中挑出所有快板曲目。`],
    ["reduce", `JavaScript 数组方法——将数组中所有元素累积计算为一个值（如求和）。英文原意是「减少、归纳」。`],
    ["find", `JavaScript 数组方法——查找数组中第一个满足条件的元素并返回。英文原意是「查找、找到」。`],
    ["pushArr", `JavaScript 数组方法——向数组末尾添加一个元素。英文原意是「推入」。`, `就像在曲目单最后加一首新曲子。`],
    ["pop", `JavaScript 数组方法——移除并返回数组最后一个元素。英文原意是「弹出」。`, `就像从曲目单最底下抽走一首。`],
    ["splice", `JavaScript 数组方法——从数组中删除或插入元素，会修改原数组。英文原意是「拼接、接合」。`],
    ["slice", `JavaScript 数组/字符串方法——截取数组或字符串的一部分，返回新数组但不修改原数组。英文原意是「切片、切下」。`],
    ["join", `JavaScript 数组方法——将数组所有元素用指定分隔符连接成字符串。英文原意是「连接、汇合」。`, `就像把散页乐谱装订成一本。`],
    ["split", `JavaScript 字符串方法——将字符串按指定分隔符切分成数组。英文原意是「分割、分裂」。`],
    // JS objects & concepts
    ["Math", `JavaScript 内置对象——提供数学常量和函数，如 Math.PI（圆周率）、Math.random()（随机数）、Math.floor()（向下取整）。`],
    ["Date", `JavaScript 内置对象——处理日期和时间，如 new Date() 获取当前时间。英文原意是「日期」。`],
    ["JSON", `JavaScript Object Notation——轻量级数据交换格式，人类易读、机器易解析。用 JSON.parse() 解析、JSON.stringify() 序列化。已有词条覆盖。`],
    ["template", `模板——预先定义好的结构框架，填入具体内容即可生成最终结果。HTML 中 template 标签存放可复用的 HTML 片段。英文原意是「模板、样板」。`],
    ["script", `HTML script 标签——用于在页面中嵌入或引用 JavaScript 代码。英文原意是「脚本」。`],
    // Git/Dev
    ["markdown", `轻量级标记语言——用纯文本格式写文档，可转换为 HTML。.md 文件就是用 Markdown 写的。英文原意是「标记下来」。`],
    ["readme", `项目说明文件——通常命名为 README.md，是别人打开你的项目时最先看到的说明文档。英文原意是「读我」。`],
    ["config", `配置文件——config 是 configuration（配置）的缩写，存储项目或工具的设置参数。英文原意是「配置」。`],
    ["router", `路由——前端中管理页面跳转的机制，根据 URL 路径显示不同的页面内容。英文原意是「路由器、路径分配器」。`],
    ["store", `前端状态管理中的「仓库」——集中存储应用的所有数据。如 Vue 的 Pinia store。英文原意是「商店、仓库」。`],
    // JS core
    ["window", `浏览器中的全局对象——代表浏览器窗口，所有全局变量和函数都是 window 的属性。英文原意是「窗口」。`],
    ["document", `浏览器中的文档对象——代表整个 HTML 页面，JS 通过 document 来操作页面上的元素。英文原意是「文档」。`],
    ["target", `事件对象中的 target 属性——指向触发事件的具体元素。如用户点击哪个按钮，evt.target 就是那个按钮。英文原意是「目标」。`],
    // HTTP methods
    ["GET", `HTTP 请求方法——从服务器获取数据。对应 CRUD 中的 Read。英文原意是「获取」。`],
    ["POST", `HTTP 请求方法——向服务器提交新数据。对应 CRUD 中的 Create。英文原意是「投递、发布」。`],
    ["PUT", `HTTP 请求方法——更新服务器上的已有数据。对应 CRUD 中的 Update。英文原意是「放置」。`],
    ["DELETE", `HTTP 请求方法——删除服务器上的数据。对应 CRUD 中的 Delete。英文原意是「删除」。`],
    ["PATCH", `HTTP 请求方法——部分更新服务器上的数据。英文原意是「修补、打补丁」。`],
    // Misc
    ["XML", `可扩展标记语言——一种类似 HTML 的数据格式，用于存储和传输数据。全称 eXtensible Markup Language。`],
    ["YAML", `一种人类友好的数据序列化格式——用缩进表示层级，比 JSON 更易读写。常用于配置文件。全称 YAML Ain't Markup Language。`],
    ["npx", `npm 附带的命令执行工具——可以直接运行 npm 包中的命令，不必全局安装。英文原意是「执行 npm 包」。`],
    ["aside", `HTML 语义化标签——表示侧边栏或补充内容，与主体内容相关但非核心。英文原意是「在...旁边、旁白」。`],
    ["license", `开源许可证——声明代码的使用、修改和分发规则。常见的有 MIT、Apache 等。英文原意是「许可证、执照」。`],
  ];

  const existing = new Set(glossary.map(e => e[0]));
  let added = 0, skipped = [];
  for (const [key, exp, ana] of toAdd) {
    if (existing.has(key)) { skipped.push(key); continue; }
    glossary.push([key, { explanation: exp, analogy: ana || undefined }]);
    existing.add(key); added++;
  }
  console.log("Added:", added, "| Skipped:", skipped.length ? skipped.join(', ') : 'none');

  // Sort
  glossary.sort((a, b) => b[0].length - a[0].length || a[0].localeCompare(b[0]));

  // Prefix check
  let bugs = 0;
  for (let i = 0; i < glossary.length; i++)
    for (let j = i + 1; j < glossary.length; j++)
      if (glossary[j][0].startsWith(glossary[i][0]) && glossary[j][0].length > glossary[i][0].length) {
        console.error("PREFIX:", glossary[i][0], "before", glossary[j][0]); bugs++;
      }
  console.log("Prefix bugs:", bugs);

  // Serialize
  function esc(s) { return s.replace(/\\/g, '\\\\').replace(/'/g, "\\'").replace(/\n/g, '\\n'); }
  const src = fs.readFileSync('src/configs/glossary.ts', 'utf-8');
  const marker = 'export const glossary: [string, TermDef][] = [';
  const header = src.substring(0, src.indexOf(marker) + marker.length);
  const lines = [header];
  for (let i = 0; i < glossary.length; i++) {
    const [key, def] = glossary[i];
    const comma = i < glossary.length - 1 ? ',' : '';
    lines.push("  ['" + esc(key) + "', {");
    lines.push("    explanation: '" + esc(def.explanation) + "',");
    if (def.analogy) lines.push("    analogy: '" + esc(def.analogy) + "'");
    lines[lines.length - 1] = lines[lines.length - 1].replace(/,$/, '');
    lines.push("  }]" + comma);
  }
  lines.push(']\n');
  fs.writeFileSync('src/configs/glossary.ts', lines.join('\n'), 'utf-8');
  console.log('Total:', glossary.length, '| Longest:', glossary[0][0], '(' + glossary[0][0].length + ')');
}

main().catch(e => console.error(e));

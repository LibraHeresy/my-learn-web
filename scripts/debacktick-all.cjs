const fs = require('fs');
let src = fs.readFileSync('src/configs/lessons.ts', 'utf-8');
let changed = 0;
const NL = '\\n\\n'; // literal \n\n for JS string escaping in output

const fixes = [
  [`\x60font-family\x60 决定文字使用什么字体：`,
   `font-family 属性设置字体，font-size 设置字号，font-weight 设置粗细，line-height 设置行高，text-align 设置对齐方式。就像扬琴演奏中不同竹法带来不同音色——字体选择决定了文字的「气质」。${NL}\x60font-family\x60 决定文字使用什么字体：`],

  [`从内到外，每个元素有四层空间：`,
   `盒模型是 CSS 最重要的概念——每个元素从外到内由 margin（外边距）、border（边框）、padding（内边距）、content（内容区）四层组成。就像扬琴包装——外箱是 margin，箱壁是 border，内衬是 padding，琴本身是 content。记住顺序：margin > border > padding > content。${NL}从内到外，每个元素有四层空间：`],

  [`选择器告诉 CSS「对谁生效」。三种最基础的选择器：`,
   `选择器（selector）告诉 CSS「这条规则对谁生效」。元素选择器选中所有同名标签，类选择器（.class名）选中一组元素，ID 选择器（#id名）选中唯一元素。就像指挥指定——「所有小提琴」（元素）、「第一排木管」（类）、「首席演奏者」（ID）。三种最基础的选择器：`],

  [`多条 CSS 规则都指向同一个元素时，浏览器按以下顺序决定：`,
   `当多条 CSS 规则都指向同一个元素时，浏览器按权重决定谁说了算——就像协奏曲中独奏段落盖过乐队伴奏。!important 最高优先级，其次是内联 style，然后 ID 选择器、类选择器、元素选择器。具体规则：`],

  [`还记得 transition 吗？它只能在两个状态之间平滑过渡`,
   `@keyframes 定义动画关键帧（每个阶段的状态），比 transition 更强大——可定义任意多个步骤。animation-duration 设时长，animation-timing-function 设速度曲线（ease/linear），animation-fill-mode 控制播放前后状态（forwards保留结束状态、none回到初始）。还记得 transition 吗？它只能在两个状态之间平滑过渡`],

  [`CSS 变量以 \x60--\x60 开头，在 \x60var()\x60 中引用：`,
   `CSS 变量以 -- 开头，在 var() 中引用——定义一次，全页面使用。就像扬琴的调号标记——定义一次调性，全曲所有的 fa 都自动升高。例如：`],
];

// For the NOT FOUND ones, search by lesson title context
const altFixes = [
  // Flexbox - search for the unique start of the flexbox explain
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
    console.log('OK:', oldStr.substring(0, 40));
  } else {
    console.log('SKIP (not found):', oldStr.substring(0, 50));
  }
}

for (const [oldStr, newStr] of altFixes) {
  if (src.includes(oldStr)) {
    src = src.replace(oldStr, newStr);
    changed++;
    console.log('OK (alt):', oldStr.substring(0, 40));
  } else {
    console.log('SKIP (alt not found):', oldStr.substring(0, 50));
  }
}

fs.writeFileSync('src/configs/lessons.ts', src, 'utf-8');
console.log('Changed:', changed);

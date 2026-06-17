const fs = require('fs');

// Intro sentences for each lesson's first explain section
// Key = lesson id, Value = plain-text intro to prepend
const intros = {
  // ===== CSS 样式章 =====
  'css-bg-border': 'background-color 属性设置背景色，border 设置边框，border-radius 设置圆角，box-shadow 设置阴影。就像给扬琴谱选暖色纸、加装饰边框——让页面更有层次感。\n\n',
  'css-font-spacing': 'font-family 属性设置字体，font-size 设置字号，font-weight 设置粗细，line-height 设置行高，text-align 设置对齐方式。就像扬琴演奏中不同竹法带来不同音色——字体选择决定了文字的"气质"。\n\n',
  'css-box-model': '盒模型是 CSS 最重要的概念之一：每个元素从外到内由 margin（外边距）、border（边框）、padding（内边距）、content（内容区）四层组成。就像扬琴包装——外箱是 margin，箱壁是 border，内衬是 padding，琴本身是 content。\n\n',
  'css-selectors': '选择器（selector）告诉 CSS "这条规则对谁生效"。元素选择器选中所有同名标签，类选择器（.class名）选中一组元素，ID 选择器（#id名）选中唯一元素。就像指挥指定——"所有小提琴"（元素）、"第一排木管"（类）、"首席演奏者"（ID）。\n\n',
  'css-cascade': '当多条 CSS 规则都指向同一个元素时，浏览器按权重决定谁说了算：!important > 内联 style > ID 选择器 > 类选择器 > 元素选择器。就像协奏曲的独奏段落——独奏（!important）盖过整个乐队的伴奏。\n\n',
  'css-transitions': 'transition 属性让 CSS 变化变得平滑——比如鼠标悬停时颜色渐变而不是瞬间跳变。ease 是默认的时间曲线（慢→快→慢），linear 是匀速。就像扬琴曲的渐快或渐慢，不是突然切换速度。\n\n',
  'css-animations': '@keyframes 定义动画的关键帧（每个阶段的状态），比 transition 更强大——可以定义任意多个步骤。animation-duration 设置时长，animation-timing-function 设置速度曲线，animation-fill-mode 控制播放前后的状态。就像扬琴曲中每个小节的力度变化——keyframe 就是每一拍的"表情"。\n\n',
  'css-variables': 'CSS 变量以 -- 开头，在 var() 中引用——定义一次，全页面使用。就像扬琴的调号标记——定义一次调性，全曲所有的 fa 都自动升高。\n\n',
  // ===== CSS 布局章 =====
  'css-flexbox': 'Flexbox（弹性布局）让元素在一行或一列中灵活排列。display:flex 启用弹性容器，justify-content 控制横向对齐，align-items 控制纵向对齐，flex-direction 决定排列方向。就像扬琴合奏时确定每个演奏者的位置和间距。\n\n',
  'css-centering': '居中看似简单，实则有很多种方式——text-align:center 居中文字，margin:auto 居中块级元素，flexbox 居中任意元素。就像舞台上独奏者站位的不同调度方式。\n\n',
  'css-position': 'position 属性控制元素的定位方式——static（默认，正常排列）、relative（相对自身偏移）、absolute（相对父级定位）、fixed（固定在屏幕上）、sticky（滚动时吸附）。就像舞台上不同角色的站法——伴奏原位、独奏跨前一步、指挥固定不动。\n\n',
  'css-grid': 'Grid（网格布局）同时控制行和列——display:grid 启用网格容器，grid-template-columns 定义列宽，gap 设置间距。就像交响乐团在舞台上的座次表——有行有列，每个位置都有明确安排。\n\n',
  'css-responsive': '响应式设计让网页在不同屏幕上都好看——@media 媒体查询根据屏幕宽度应用不同样式，min-width 和 max-width 设定断点。就像根据演出场地大小调整乐队编制——音乐厅一个方案，小舞台另一个方案。\n\n',
  'css-layout-capstone': '综合前面学过的所有 CSS 知识——用 Flexbox/Grid 布局、Position 定位、盒模型间距、响应式媒体查询，设计一张完整的音乐会宣传页。\n\n',
};

async function main() {
  const { lessons } = await import('../src/configs/lessons.ts');
  const fs = require('fs');
  let src = fs.readFileSync('src/configs/lessons.ts', 'utf-8');
  let changed = 0;

  for (const [id, intro] of Object.entries(intros)) {
    const lesson = lessons.find(l => l.id === id);
    if (!lesson) { console.log('NOT FOUND:', id); continue; }
    const firstExplain = lesson.sections.find(s => s.type === 'explain');
    if (!firstExplain) { console.log('NO EXPLAIN:', id); continue; }

    // Get the original content (exact string from file)
    const content = firstExplain.content;
    if (!content || content.startsWith(intro.trim())) {
      console.log('SKIP (already has intro):', id);
      continue;
    }

    // Replace the first occurrence of this exact content in the file
    // Escape for regex
    const escaped = content.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const newContent = intro + content;
    // Replace with single-quote safe approach
    if (src.includes(content)) {
      src = src.split(content).join(newContent);
      changed++;
      console.log('OK:', id);
    } else {
      console.log('NO MATCH:', id);
    }
  }

  fs.writeFileSync('src/configs/lessons.ts', src, 'utf-8');
  console.log('Changed', changed, 'lessons');
}

main().catch(e => console.error(e));

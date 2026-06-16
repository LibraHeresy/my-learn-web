const fs = require('fs');

const missing = [
  ['animation-timing-function', {
    explanation: 'CSS 动画的时间函数——控制动画在时间轴上的速度曲线。常用值：ease（默认，慢→快→慢）、linear（匀速）、ease-in（慢→快）、ease-out（快→慢）。',
    analogy: '就像扬琴曲中的速度变化——渐快（accelerando）或渐慢（ritardando），决定了音乐推进的"感觉"是平滑均匀还是起伏变化。'
  }],
  ['animation-fill-mode', {
    explanation: 'CSS 动画的填充模式——控制动画执行前后元素的状态。常用值：none（默认，不保留）、forwards（保留结束状态）、backwards（动画开始前就应用初始状态）、both（同时保留前后状态）。',
    analogy: '就像演奏前先摆好起始手型（backwards），弹完后保持最后的余音姿势（forwards）——不让元素"弹回"到动画前的样子。'
  }],
  ['unordered', {
    explanation: '无序的——在 HTML 中，ul（unordered list）就是无序列表，列表项前面是圆点而非数字。',
    analogy: '就像随手写的练琴备选曲目——先弹哪首都行，没有固定的先后顺序。'
  }],
  ['checkbox', {
    explanation: '复选框——input 的 type="checkbox" 用来创建多选按钮。用户可以同时勾选多个选项。',
    analogy: '就像报名表上的"你会的乐器：扬琴□ 钢琴□ 古筝□"——可以多选。和 radio（单选）不同，checkbox 是互不排斥的。'
  }],
  ['details', {
    explanation: 'HTML 原生折叠面板标签——配合 summary 标签使用，用户点击 summary 文字可以展开/收起 details 里的内容。',
    analogy: '就像乐谱上可折叠的附录——默认只显示标题，点击后才展开详细内容，保持页面整洁。'
  }],
  ['ordered', {
    explanation: '有序的——在 HTML 中，ol（ordered list）就是有序列表，列表项前面是数字序号。',
    analogy: '就像练琴步骤——必须先练音阶，再练练习曲，最后才是乐曲。顺序固定，不能乱。'
  }],
  ['summary', {
    explanation: 'HTML 折叠面板的标题标签——放在 details 标签内部，作为折叠面板的可点击标题。点击 summary 文字会展开/收起后面隐藏的内容。',
    analogy: '就像乐谱附录的章节标题——"演奏提示"四个字点一下，下面展开详细说明。'
  }],
  ['Comment', {
    explanation: '注释——代码中写给人类看的说明文字，浏览器会完全忽略不执行。HTML 注释写法：<!-- 注释内容 -->。',
    analogy: '就像乐谱上用铅笔写的排练备忘——演奏者自己看，观众永远不会看到。'
  }],
  ['padding', {
    explanation: 'CSS 内边距——元素内容与边框之间的空白区域。像快递盒里的泡沫填充物，保护内容不被边框挤压。',
    analogy: '就像扬琴箱子里的海绵内衬——隔在琴面和箱壁之间，保护乐器不磕碰。'
  }],
  ['margin', {
    explanation: 'CSS 外边距——元素边框与相邻元素之间的空白距离。控制元素之间的"社交距离"。',
    analogy: '就像舞台上两个演奏者之间的距离——太近了互相干扰，margin 就是乐手之间的"安全间距"。'
  }],
  ['inline', {
    explanation: '内联——指不换行的元素或样式。span、a、strong 是内联元素，在文字流中不打断行。',
    analogy: '就像装饰音/加花——不打断主旋律的进行，在乐句内部轻巧地穿插。'
  }],
  ['block', {
    explanation: '块级——指独占一行的元素。div、h1、p 是块级元素，自动换行，占满父容器宽度。',
    analogy: '就像独奏段落——演奏者独占舞台中央，伴奏暂停或退到背景，一个人占据整个视觉焦点。'
  }],
  ['radio', {
    explanation: '单选按钮——input 的 type="radio" 用来创建单选按钮。同一组 radio 中只能选一个。同 name 的 radio 互斥。',
    analogy: '就像考级报名只能选一个级别——初级、中级、高级，选了中级就不能同时选高级。'
  }],
  ['range', {
    explanation: '范围滑块——input 的 type="range" 创建滑块控件，用户拖动滑块选择一个范围内的数值。配合 min 和 max 属性限制范围。',
    analogy: '就像音量旋钮——从最小到最大之间滑动，不是输入具体数字，而是直观地拖到一个位置。'
  }],
  ['color', {
    explanation: '颜色——input 的 type="color" 创建颜色选择器，用户点击后从调色板中选择一个颜色。返回十六进制色值如 #8B2E2E。',
    analogy: '就像调音时选的音色风格——不是打字，而是在色板中"挑选"一个。'
  }],
  ['timing-function', {
    explanation: 'CSS 动画的时间函数——控制动画在时间轴上的速度曲线。常用值：ease（慢→快→慢）、linear（匀速）、ease-in（慢→快）、ease-out（快→慢）。',
    analogy: '就像扬琴曲中的速度变化——渐快或渐慢，决定了音乐推进的"感觉"是平滑均匀还是起伏变化。'
  }],
  ['fill-mode', {
    explanation: 'CSS 动画的填充模式——控制动画执行前后元素的状态。常用值：none（不保留）、forwards（保留结束状态）、backwards（开始前应用初始状态）、both。',
    analogy: '就像演奏前先摆好起始手型，弹完后保持最后的余音姿势——不让元素"弹回"到动画前的样子。'
  }],
  ['tag', {
    explanation: '标签——HTML 中用尖括号包裹的标记符号，如 <h1>、<p>。英文原意是"标签、贴纸"。',
    analogy: '就像贴在琴盒上的标签——标明这是什么乐器、属于谁。HTML 标签"贴"在内容上，标明这是什么类型的内容。'
  }],
  ['list', {
    explanation: '列表——一组有序或无序的数据条目。HTML 中 ul/ol 创建列表容器，li 创建列表项。英文原意是"清单、目录"。',
    analogy: '就像音乐会节目单——一行一条曲目，整张单子就是一个 list。'
  }],
  ['row', {
    explanation: '行——表格中横向的一排单元格。HTML 中 tr（table row）定义表格的一行。英文原意是"一排、一行"。',
    analogy: '就像练琴记录表横向的一排——"6月1日 | 春到清江 | 60分钟"——这就是一行（row）。'
  }],
  ['px', {
    explanation: '像素单位——CSS 中最常用的长度单位。1px 是屏幕上最小的一个点。英文全称 pixel（像素）。',
    analogy: '就像五线谱上最小的一个音符点——它是组成所有视觉大小的基本单位。'
  }],
];

async function main() {
  const { glossary } = await import('../src/configs/glossary.ts');

  // Only add if key doesn't exist
  const existingKeys = new Set(glossary.map(e => e[0]));
  let added = 0;
  for (const [key, def] of missing) {
    if (!existingKeys.has(key)) {
      glossary.push([key, def]);
      existingKeys.add(key);
      added++;
    }
  }
  console.log('Added', added, 'new entries. Total:', glossary.length);

  // Sort by key length desc
  glossary.sort((a, b) => b[0].length - a[0].length || a[0].localeCompare(b[0]));

  // Check prefix
  let bugs = 0;
  for (let i = 0; i < glossary.length; i++) {
    for (let j = i + 1; j < glossary.length; j++) {
      if (glossary[j][0].startsWith(glossary[i][0]) && glossary[j][0].length > glossary[i][0].length) {
        console.error('PREFIX:', glossary[i][0], 'before', glossary[j][0]);
        bugs++;
      }
    }
  }
  console.log('Prefix bugs:', bugs);

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
    // Remove trailing comma from last property
    const last = lines[lines.length - 1];
    lines[lines.length - 1] = last.replace(/,$/, '');
    lines.push("  }]" + comma);
  }
  lines.push(']\n');
  fs.writeFileSync('src/configs/glossary.ts', lines.join('\n'), 'utf-8');
  console.log('Written. Longest:', glossary[0][0], '(' + glossary[0][0].length + ')');
  console.log('Shortest:', glossary[glossary.length - 1][0], '(' + glossary[glossary.length - 1][0].length + ')');
}

main().catch(e => console.error(e));

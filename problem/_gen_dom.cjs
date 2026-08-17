// 生成阶段3 DOM交互题的HTML
const fs = require('fs');
const path = require('path');
const { editorScript } = require('./_editor.cjs');
const { getNext } = require('./_index.cjs');

// 通用 CSS
const CSS = `    * { margin: 0; padding: 0; box-sizing: border-box; }
    html, body { height: 100%; }
    body { font-family: -apple-system, "Segoe UI", "PingFang SC", "Microsoft YaHei", sans-serif; background: #f5f5f5; color: #1f2328; padding: 16px; margin: 0; display: flex; flex-direction: column; height: 100vh; overflow: hidden; }
    .header { margin-bottom: 12px; flex-shrink: 0; }
    .header .tag { display: inline-block; background: #e7f0ff; color: #0969da; padding: 2px 10px; border-radius: 12px; font-size: 13px; margin-bottom: 6px; }
    .header h1 { font-size: 20px; margin-bottom: 4px; }
    .header .difficulty { color: #2da44e; font-size: 13px; font-weight: 600; }
    .layout { display: flex; gap: 16px; flex: 1; min-height: 0; }
    .panel { width: 50%; min-width: 0; display: flex; flex-direction: column; }
    .panel-left { overflow-y: auto; }
    .panel-right { height: 100%; }
    .card { background: #fff; border: 1px solid #d0d7de; border-radius: 8px; padding: 20px; margin-bottom: 16px; }
    .card h2 { font-size: 16px; margin-bottom: 12px; color: #0969da; }
    .card.code-card { flex: 1; display: flex; flex-direction: column; margin-bottom: 0; }
    .card.code-card textarea { flex: 1; }
    .left-card { flex: none; overflow-y: auto; }
    .left-card-big { flex: none; overflow-y: auto; }
    @media (max-width: 900px) {
      body { height: auto; overflow: auto; }
      .layout { flex-direction: column; }
      .panel { width: 100%; }
      .panel-right { height: auto; }
    }
    .desc { line-height: 1.7; font-size: 15px; }
    .desc p { margin-bottom: 10px; }
    .checklist { background: #fff8c5; border: 1px solid #d4a72c; border-radius: 6px; padding: 12px 16px; margin: 10px 0; font-size: 14px; }
    .checklist li { margin-left: 20px; margin-bottom: 6px; }
    .demo {
      border: 1px solid #e1e4e8; border-radius: 12px; padding: 24px; margin: 12px 0;
      background: linear-gradient(135deg, #fafbfc 0%, #f0f4f8 100%);
      box-shadow: 0 1px 3px rgba(0,0,0,0.06);
      min-height: 120px;
    }
    .demo-title { font-size: 12px; color: #8b949e; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 14px; font-weight: 600; }
    textarea { width: 100%; min-height: 200px; border: 1px solid #d0d7de; border-radius: 6px; padding: 12px; font-family: "SF Mono", Consolas, monospace; font-size: 14px; line-height: 1.6; resize: none; background: #fff; }
    textarea:focus { outline: 2px solid #0969da; border-color: transparent; }
    .btn-row { display: flex; gap: 8px; align-items: center; margin-top: 12px; flex-shrink: 0; }
    .btn { background: #1f883d; color: #fff; border: none; padding: 10px 20px; border-radius: 6px; font-size: 15px; font-weight: 600; cursor: pointer; text-decoration: none; display: inline-block; }
    .btn:hover { background: #1a7f37; }
    .btn.reset { background: #d0d7de; color: #1f2328; }
    .btn.next { background: #0969da; }
    .hint { font-size: 13px; color: #57606a; margin-top: 8px; }

    /* ===== 演示区内的原生元素美化 ===== */
    .demo button {
      background: #0969da; color: #fff; border: none; padding: 8px 16px;
      border-radius: 6px; font-size: 14px; font-weight: 500; cursor: pointer;
      transition: all 0.15s ease; margin-right: 6px;
    }
    .demo button:hover { background: #0860c0; box-shadow: 0 2px 6px rgba(9,105,218,0.3); }
    .demo button:active { transform: scale(0.97); }
    .demo input[type="text"], .demo input:not([type]) {
      padding: 8px 12px; border: 1px solid #d0d7de; border-radius: 6px;
      font-size: 14px; transition: border-color 0.15s ease, box-shadow 0.15s ease;
      outline: none;
    }
    .demo input:focus { border-color: #0969da; box-shadow: 0 0 0 3px rgba(9,105,218,0.12); }
    .demo ul { list-style: none; padding-left: 0; margin-top: 12px; }
    .demo ul li {
      padding: 10px 14px; background: #fff; border: 1px solid #e1e4e8;
      border-radius: 8px; margin-bottom: 8px; cursor: pointer;
      transition: all 0.15s ease; font-size: 14px;
    }
    .demo ul li:hover { border-color: #0969da; box-shadow: 0 2px 6px rgba(0,0,0,0.06); }
    .demo ul li.done { text-decoration: line-through; color: #8b949e; }
    .demo p { margin: 6px 0; font-size: 15px; min-height: 20px; }
    .demo #box {
      width: 100px; height: 100px; background: #0969da; border-radius: 8px;
      margin-top: 12px; transition: all 0.3s ease;
      box-shadow: 0 4px 12px rgba(9,105,218,0.25);
    }
    .demo #count {
      font-size: 28px; font-weight: 700; min-width: 48px; text-align: center;
      color: #0969da;
    }
    .demo #timer {
      font-size: 44px; font-weight: 700; margin-top: 12px; color: #0969da;
      font-variant-numeric: tabular-nums;
    }
    .demo form { display: flex; align-items: center; gap: 8px; }
    .demo form input { padding: 8px 12px; border: 1px solid #d0d7de; border-radius: 6px; font-size: 14px; outline: none; }
    .demo form input:focus { border-color: #0969da; box-shadow: 0 0 0 3px rgba(9,105,218,0.12); }
    .demo form button[type="submit"] { background: #1f883d; color: #fff; border: none; padding: 8px 16px; border-radius: 6px; cursor: pointer; font-size: 14px; }
    .demo form button[type="submit"]:hover { background: #1a7f37; }`;

function buildDomHtml(meta) {
  const { num, title, desc, checklist, demoHtml, defaultCode } = meta;
  const nextUrl = getNext(num);
  return `<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${num} - ${title}</title>
  <style>
${CSS}
  </style>
</head>
<body>
  <div class="header">
    <span class="tag">阶段 4 · DOM 与浏览器</span>
    <h1>${num}. ${title}</h1>
    <span class="difficulty">难度：简单</span>
  </div>

  <div class="layout">
    <div class="panel panel-left">
      <div class="card left-card">
        <h2>题目描述</h2>
        <div class="desc">
          ${desc}
        </div>
      </div>
      <div class="card left-card">
        <h2>验收清单</h2>
        <div class="checklist" style="margin:0;">
          <ul>${checklist.map(c => `<li>${c}</li>`).join('')}</ul>
        </div>
      </div>
      <div class="card left-card-big">
        <h2>效果演示区</h2>
        <p class="hint" style="margin-bottom:10px;">下面是写好后能直接操作的页面，你的 JS 要让它按验收清单工作。</p>
        <div class="demo" id="app">
          ${demoHtml}
        </div>
      </div>
    </div>

    <div class="panel panel-right">
      <div class="card code-card">
        <h2>你的代码</h2>
        <p class="hint" style="margin-bottom:8px;">在下方编写 JS 代码，点击"运行"生效。</p>
        <textarea id="code" spellcheck="false">${defaultCode}</textarea>
        <div class="btn-row">
          <button class="btn" onclick="runCode()">运行</button>
          <button class="btn reset" onclick="resetCode()">重置</button>
          <button class="btn" onclick="markDone()" style="background:#d4a72c;">我完成了</button>
          <span id="nextArea" style="display:none;">
            ${nextUrl ? `<a href="${nextUrl}" class="btn next">下一题 →</a>` : '<span style="color:#2da44e;font-weight:600;">🎉 已全部完成</span>'}
          </span>
        </div>
        <div id="msg"></div>
      </div>
    </div>
  </div>

  <script>
    const defaultCode = ${JSON.stringify(defaultCode)};

    function runCode() {
      const code = document.getElementById('code').value;
      const msg = document.getElementById('msg');
      // 重新构建演示区，清除上一次运行的事件监听
      const demo = document.getElementById('app');
      const demoHtml = ${JSON.stringify(demoHtml)};
      demo.innerHTML = demoHtml;

      try {
        const fn = new Function(code);
        fn();
        msg.innerHTML = '<p style="color:#2da44e;margin-top:10px;">✓ 代码已运行，请在演示区测试效果。</p>';
      } catch (e) {
        msg.innerHTML = '<p style="color:#cf222e;margin-top:10px;">✗ 代码错误：' + e.message + '</p>';
      }
    }

    function resetCode() {
      document.getElementById('code').value = defaultCode;
      document.getElementById('msg').innerHTML = '';
    }

    function markDone() {
      const nextArea = document.getElementById('nextArea');
      nextArea.style.display = 'block';
      document.getElementById('msg').innerHTML = '<p style="color:#2da44e;margin-top:10px;">✓ 已完成！继续下一题吧。</p>';
    }
${editorScript}
  </script>
</body>
</html>
`;
}

const stage3 = [
  {
    num: 21, title: '点击显示文字',
    desc: '<p>页面上有一个按钮和一个空的 <code>&lt;p&gt;</code>。编写 JS，点击按钮时在 <code>&lt;p&gt;</code> 里显示文字"你好，前端！"。</p>',
    checklist: ['点击按钮，页面出现"你好，前端！"', '可以反复点击'],
    demoHtml: '<button id="btn">点击我</button><p id="output"></p>',
    defaultCode: `// TODO: 编写你的代码
// 点击 #btn，让 #output 显示 "你好，前端！"

const btn = document.querySelector('#btn');
const output = document.querySelector('#output');

btn.addEventListener('click', () => {
  // 在这里写
});`,
  },
  {
    num: 22, title: '切换显示/隐藏',
    desc: '<p>页面上有一个按钮和一个方块。编写 JS，点击按钮时切换方块的显示/隐藏。</p>',
    checklist: ['点击按钮，方块隐藏', '再点击，方块显示', '可以反复切换'],
    demoHtml: '<button id="btn">切换显示/隐藏</button><div id="box"></div>',
    defaultCode: `// TODO: 编写你的代码
// 点击 #btn，切换 #box 的显示/隐藏

const btn = document.querySelector('#btn');
const box = document.querySelector('#box');

btn.addEventListener('click', () => {
  // 提示：可以修改 box.style.display，或用 classList.toggle
});`,
  },
  {
    num: 23, title: '实时显示输入',
    desc: '<p>页面上有一个输入框和一个 <code>&lt;p&gt;</code>。编写 JS，让输入框的内容实时显示在 <code>&lt;p&gt;</code> 里。</p>',
    checklist: ['在输入框打字，下方实时同步显示', '清空输入框，下方也清空'],
    demoHtml: '<input id="input" type="text" placeholder="在这里输入..." /><p id="output"></p>',
    defaultCode: `// TODO: 编写你的代码
// 输入框 #input 的内容实时显示到 #output

const input = document.querySelector('#input');
const output = document.querySelector('#output');

input.addEventListener('input', () => {
  // 在这里写
});`,
  },
  {
    num: 24, title: '添加列表项',
    desc: '<p>页面上有一个输入框、一个"添加"按钮和一个 <code>&lt;ul&gt;</code>。编写 JS，点击按钮把输入框内容添加为列表项，并清空输入框。</p>',
    checklist: ['输入内容点添加，出现在列表里', '添加后输入框清空', '可以连续添加多项'],
    demoHtml: '<div style="display:flex;gap:8px;"><input id="input" type="text" placeholder="输入内容" /><button id="add">添加</button></div><ul id="list"></ul>',
    defaultCode: `// TODO: 编写你的代码
// 点击 #add，把 #input 的值添加为 #list 的 li，并清空输入框

const input = document.querySelector('#input');
const addBtn = document.querySelector('#add');
const list = document.querySelector('#list');

addBtn.addEventListener('click', () => {
  // 提示：createElement('li') + appendChild
});`,
  },
  {
    num: 25, title: '标记完成',
    desc: '<p>页面上有一个预置的待办列表。编写 JS，点击某个列表项时给它加上删除线（再次点击取消删除线）。</p>',
    checklist: ['点击列表项，出现删除线', '再次点击，删除线取消'],
    demoHtml: '<ul id="list"><li>学习 HTML</li><li>学习 CSS</li><li>学习 JavaScript</li></ul>',
    defaultCode: `// TODO: 编写你的代码
// 点击 #list 里的 li，切换删除线

const list = document.querySelector('#list');

list.addEventListener('click', (e) => {
  // 提示：判断 e.target.tagName === 'LI'，然后切换样式
});`,
  },
  {
    num: 26, title: '计数器',
    desc: '<p>页面上有"+"、"-"、"归零"三个按钮和一个显示数字的区域。编写 JS 实现计数器。</p>',
    checklist: ['点"+"数字加 1', '点"-"数字减 1', '点"归零"数字归 0', '数字实时更新'],
    demoHtml: '<div style="display:flex;align-items:center;gap:12px;"><button id="inc">+</button><span id="count">0</span><button id="dec">-</button><button id="reset">归零</button></div>',
    defaultCode: `// TODO: 编写你的代码
// 实现计数器：+ / - / 归零

let count = 0;
const display = document.querySelector('#count');
const inc = document.querySelector('#inc');
const dec = document.querySelector('#dec');
const reset = document.querySelector('#reset');

// 在这里写三个按钮的事件
`,
  },
  {
    num: 27, title: '随机背景色',
    desc: '<p>页面上有一个按钮。编写 JS，每次点击按钮随机改变整个页面的背景色。</p>',
    checklist: ['点击按钮，页面背景色随机变化', '每次颜色都不同'],
    demoHtml: '<button id="btn">换个颜色</button>',
    defaultCode: `// TODO: 编写你的代码
// 点击 #btn，随机改变 document.body 背景色

const btn = document.querySelector('#btn');

btn.addEventListener('click', () => {
  // 提示：Math.random() 生成 0-255 的 r、g、b
});`,
  },
  {
    num: 28, title: '表单验证',
    desc: '<p>页面上有一个表单（一个输入框 + 提交按钮）。编写 JS，提交时验证输入框是否为空，为空则提示，非空则提示提交成功。</p>',
    checklist: ['输入框为空时提交，有"不能为空"提示', '输入内容后提交，提示成功', '提交后页面不刷新'],
    demoHtml: '<form id="form"><input id="name" type="text" placeholder="请输入姓名" /><button type="submit">提交</button></form>',
    defaultCode: `// TODO: 编写你的代码
// 表单 #form 提交时验证 #name 是否为空

const form = document.querySelector('#form');
const input = document.querySelector('#name');

form.addEventListener('submit', (e) => {
  // 提示：e.preventDefault() 阻止刷新，然后判断 input.value
});`,
  },
  {
    num: 29, title: '延时提示',
    desc: '<p>页面上有一个按钮和一个 <code>&lt;p&gt;</code>。编写 JS，点击按钮 3 秒后，在 <code>&lt;p&gt;</code> 里显示提示文字。</p>',
    checklist: ['点击按钮，3 秒后才出现提示文字', '3 秒内不显示'],
    demoHtml: '<button id="btn">点击开始计时</button><p id="msg"></p>',
    defaultCode: `// TODO: 编写你的代码
// 点击 #btn，3 秒后在 #msg 显示 "3 秒到了！"

const btn = document.querySelector('#btn');
const msg = document.querySelector('#msg');

btn.addEventListener('click', () => {
  // 提示：setTimeout(fn, 3000)
});`,
  },
  {
    num: 30, title: '倒计时',
    desc: '<p>页面上有一个显示数字的区域和一个"开始"按钮。编写 JS，点击按钮从 10 倒数到 0，到 0 停止。</p>',
    checklist: ['点击开始，数字从 10 开始每秒减 1', '到 0 停止'],
    demoHtml: '<button id="start">开始倒计时</button><div id="timer">10</div>',
    defaultCode: `// TODO: 编写你的代码
// 点击 #start，从 10 倒数到 0，到 0 停止

const startBtn = document.querySelector('#start');
const display = document.querySelector('#timer');

startBtn.addEventListener('click', () => {
  let count = 10;
  // 提示：setInterval，到 0 时 clearInterval
});`,
  },
];

const dir = path.join(__dirname, 'stage4-dom');
if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

stage3.forEach(q => {
  const meta = { ...q, num: q.num + 10 };
  const html = buildDomHtml(meta);
  const num = String(meta.num).padStart(2, '0');
  const safeTitle = q.title.replace(/[\\/:*?"<>|]/g, '-');
  fs.writeFileSync(path.join(dir, `${num}-${safeTitle}.html`), html, 'utf8');
  console.log('生成:', `${num}-${safeTitle}.html`);
});

console.log('\n阶段4 DOM 完成，共', stage3.length, '题');

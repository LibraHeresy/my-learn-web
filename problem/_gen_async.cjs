// 生成阶段4 异步/进阶题的HTML
const fs = require('fs');
const path = require('path');
const { editorScript } = require('./_editor.cjs');
const { getNext } = require('./_index.cjs');

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
    .example { background: #f6f8fa; border-left: 3px solid #0969da; padding: 12px 16px; border-radius: 4px; margin: 10px 0; font-size: 14px; }
    .example code { font-family: "SF Mono", Consolas, monospace; }
    .checklist { background: #fff8c5; border: 1px solid #d4a72c; border-radius: 6px; padding: 12px 16px; margin: 10px 0; font-size: 14px; }
    .checklist li { margin-left: 20px; margin-bottom: 6px; }
    textarea { width: 100%; min-height: 200px; border: 1px solid #d0d7de; border-radius: 6px; padding: 12px; font-family: "SF Mono", Consolas, monospace; font-size: 14px; line-height: 1.6; resize: none; background: #fff; }
    textarea:focus { outline: 2px solid #0969da; border-color: transparent; }
    .btn-row { display: flex; gap: 8px; align-items: center; margin-top: 12px; flex-shrink: 0; }
    .btn { background: #1f883d; color: #fff; border: none; padding: 10px 20px; border-radius: 6px; font-size: 15px; font-weight: 600; cursor: pointer; text-decoration: none; display: inline-block; }
    .btn:hover { background: #1a7f37; }
    .btn.reset { background: #d0d7de; color: #1f2328; }
    .btn.next { background: #0969da; }
    .console { background: #0d1117; color: #c9d1d9; border-radius: 6px; padding: 16px; margin-top: 16px; font-family: "SF Mono", Consolas, monospace; font-size: 13px; line-height: 1.6; min-height: 60px; white-space: pre-wrap; flex-shrink: 0; }
    .console .label { color: #8b949e; }
    .console .out { color: #58a6ff; }
    .console .err { color: #f85149; }
    .hint { font-size: 13px; color: #57606a; margin-top: 8px; }`;

function buildAsyncHtml(meta) {
  const { num, title, difficulty, desc, example, checklist, defaultCode, testScript } = meta;
  const nextUrl = getNext(num);

  const exampleHtml = example ? `
      <div class="example">
        <strong>示例：</strong><br />
        ${example}
      </div>` : '';

  const checklistHtml = checklist ? `
      <div class="checklist">
        <strong>验收清单：</strong>
        <ul>${checklist.map(c => `<li>${c}</li>`).join('')}</ul>
      </div>` : '';

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
    <span class="tag">阶段 5 · JS 进阶（异步）</span>
    <h1>${num}. ${title}</h1>
    <span class="difficulty">难度：${difficulty}</span>
  </div>

  <div class="layout">
    <div class="panel panel-left">
      <div class="card left-card">
        <h2>题目描述</h2>
        <div class="desc">
          ${desc}
        </div>
      </div>
      <div class="card left-card-big">
        <h2>示例与说明</h2>
        ${exampleHtml}${checklistHtml}
      </div>
      <div class="card left-card">
        <h2>控制台输出</h2>
        <div class="console" id="console"><span class="label">// 点击"运行"后，console.log 的输出会显示在这里</span></div>
      </div>
    </div>

    <div class="panel panel-right">
      <div class="card code-card">
        <h2>你的代码</h2>
        <p class="hint" style="margin-bottom:8px;">在下方编写代码，点击"运行"查看控制台输出。</p>
        <textarea id="code" spellcheck="false">${defaultCode}</textarea>
        <div class="btn-row">
          <button class="btn" onclick="runCode()">运行</button>
          <button class="btn reset" onclick="resetCode()">重置</button>
          <button class="btn" onclick="markDone()" style="background:#d4a72c;">我完成了</button>
          <span id="nextArea" style="display:none;">
            ${nextUrl ? `<a href="${nextUrl}" class="btn next">下一题 →</a>` : '<span style="color:#2da44e;font-weight:600;">🎉 已全部完成</span>'}
          </span>
        </div>
      </div>
    </div>
  </div>

  <script>
    const defaultCode = ${JSON.stringify(defaultCode)};

    function runCode() {
      const code = document.getElementById('code').value;
      const consoleEl = document.getElementById('console');
      consoleEl.innerHTML = '<span class="label">// 运行中...</span>';

      // 用 new Function 执行（浏览器打开无 CSP 限制），同步重写 console.log 捕获输出
      const logs = [];
      const origLog = console.log;
      console.log = function (...args) {
        const parts = args.map(a => {
          if (typeof a === 'object' && a !== null) {
            try { return JSON.stringify(a); } catch (e) { return String(a); }
          }
          return String(a);
        });
        logs.push(parts.join(' '));
        origLog.apply(console, args);
      };

      try {
        const fn = new Function(code);
        fn();
      } catch (e) {
        console.log = origLog;
        consoleEl.innerHTML = '<span class="err">代码错误：' + escapeHtml(e.message) + '</span>';
        return;
      }

      // 延迟一段时间后收集（给异步代码留出时间）
      setTimeout(() => {
        console.log = origLog;
        if (logs.length === 0) {
          consoleEl.innerHTML = '<span class="label">// 没有输出。请确认代码里有 console.log，且异步逻辑已触发。</span>';
        } else {
          consoleEl.innerHTML = logs.map(l => '<span class="out">' + escapeHtml(l) + '</span>').join('\\n');
        }
      }, 1500);
    }

    function escapeHtml(str) {
      return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    }

    function resetCode() {
      document.getElementById('code').value = defaultCode;
      document.getElementById('console').innerHTML = '<span class="label">// 点击"运行"后，console.log 的输出会显示在这里</span>';
    }

    function markDone() {
      document.getElementById('nextArea').style.display = 'block';
    }
${editorScript}
  </script>
</body>
</html>
`;
}

const stage4 = [
  {
    num: 31, title: 'Promise 延时', difficulty: '中等',
    desc: '<p>编写一个函数 <code>delay(ms)</code>，返回一个 Promise，在 <code>ms</code> 毫秒后 resolve。</p>',
    example: '<code>delay(1000).then(() => console.log("1 秒后打印"))</code>',
    checklist: ['调用 delay(1000)，1 秒后触发 then', '返回的是 Promise 对象'],
    defaultCode: `// TODO: 编写 delay 函数

function delay(ms) {
  // 返回一个 Promise
}

// 测试代码（写完后运行）
delay(1000).then(() => {
  console.log('1 秒后打印：成功！');
});`,
    testScript: ``,
  },
  {
    num: 32, title: 'async/await 延时', difficulty: '中等',
    desc: '<p>编写一个 <code>async</code> 函数 <code>wait(ms)</code>，内部用 <code>await delay(ms)</code> 等待指定时间后返回字符串 <code>"done"</code>。</p>',
    example: '<code>await wait(500) // 返回 "done"</code>',
    checklist: ['wait 是 async 函数', '内部用 await 等待 delay', '最终返回 "done"'],
    defaultCode: `// 先复用上一题的 delay 函数
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// TODO: 编写 async 函数 wait
async function wait(ms) {
  // 在这里写：await delay(ms)，然后返回 "done"
}

// 测试代码（写完后运行）
wait(500).then((result) => {
  console.log('结果：' + result);
});`,
  },
  {
    num: 33, title: 'fetch 请求', difficulty: '中等',
    desc: '<p>用 <code>fetch</code> 请求公开接口 <code>https://jsonplaceholder.typicode.com/posts</code>，获取数据后打印前 3 条数据的标题。</p>',
    example: '<code>fetch(url).then(r => r.json())</code>',
    checklist: ['成功请求接口', '正确解析 JSON', '打印前 3 条标题'],
    defaultCode: `// TODO: 用 fetch 请求数据并打印前 3 条标题

async function getPosts() {
  const url = 'https://jsonplaceholder.typicode.com/posts';
  // 在这里写：fetch + json 解析
}

getPosts();`,
  },
  {
    num: 34, title: '防抖 debounce', difficulty: '中等',
    desc: '<p>编写一个函数 <code>debounce(fn, delay)</code>，返回一个新函数。连续调用时，只在停止调用 <code>delay</code> 毫秒后才执行一次 <code>fn</code>。</p>',
    example: '<code>const f = debounce(() => console.log("执行"), 500); f(); f(); f(); // 只打印一次</code>',
    checklist: ['连续多次调用只执行最后一次', '间隔超过 delay 后重新计时'],
    defaultCode: `// TODO: 编写 debounce 函数

function debounce(fn, delay) {
  // 提示：闭包保存 timer，clearTimeout + setTimeout
}

// 测试代码（写完后运行）
const f = debounce(() => console.log('执行了'), 500);
f();
f();
f(); // 连续调用 3 次，应该只打印一次
`,
  },
  {
    num: 35, title: '节流 throttle', difficulty: '中等',
    desc: '<p>编写一个函数 <code>throttle(fn, interval)</code>，返回一个新函数，在 <code>interval</code> 毫秒内最多执行一次 <code>fn</code>。</p>',
    example: '<code>const f = throttle(() => console.log("执行"), 500); // 每 500ms 最多一次</code>',
    checklist: ['规定时间内最多执行一次', '第一次调用立即执行'],
    defaultCode: `// TODO: 编写 throttle 函数

function throttle(fn, interval) {
  // 提示：闭包记录上次执行时间戳
}

// 测试代码（写完后运行）
const f = throttle(() => console.log('执行了：' + new Date().toLocaleTimeString()), 500);
f();
setTimeout(f, 100);
setTimeout(f, 200);
setTimeout(f, 600); // 前几次应被节流，600ms 后再执行
`,
  },
  {
    num: 36, title: '发布订阅', difficulty: '中等',
    desc: '<p>实现一个事件总线类 <code>EventBus</code>，包含 <code>on(name, fn)</code>（订阅）、<code>emit(name, ...args)</code>（触发）、<code>off(name, fn)</code>（取消订阅）三个方法。</p>',
    example: '<code>bus.on("hello", fn); bus.emit("hello", "world");</code>',
    checklist: ['on 能注册回调', 'emit 能触发所有回调', 'off 能移除指定回调'],
    defaultCode: `// TODO: 实现 EventBus 类

class EventBus {
  constructor() {
    this.events = {};
  }
  on(name, fn) {
    // 在这里写
  }
  emit(name, ...args) {
    // 在这里写
  }
  off(name, fn) {
    // 在这里写
  }
}

// 测试代码（写完后运行）
const bus = new EventBus();
const handler = (msg) => console.log('收到：' + msg);
bus.on('hello', handler);
bus.emit('hello', 'world'); // 应打印：收到：world
bus.off('hello', handler);
bus.emit('hello', 'again'); // 不应打印
`,
  },
  {
    num: 37, title: '闭包计数器', difficulty: '简单',
    desc: '<p>编写一个函数 <code>createCounter()</code>，返回一个计数器函数，每次调用返回递增的数字（从 1 开始）。</p>',
    example: '<code>const c = createCounter(); c(); // 1, c(); // 2</code>',
    checklist: ['每次调用数字 +1', '不同计数器互不影响'],
    defaultCode: `// TODO: 编写 createCounter 函数

function createCounter() {
  // 提示：外层变量 + 返回内层函数（闭包）
}

// 测试代码（写完后运行）
const c = createCounter();
console.log(c()); // 1
console.log(c()); // 2
console.log(c()); // 3
`,
  },
  {
    num: 38, title: '手写 bind', difficulty: '中等',
    desc: '<p>实现 <code>Function.prototype.myBind(ctx, ...args)</code>，功能同原生 <code>bind</code>，返回绑定了 this 的新函数。</p>',
    example: '<code>fn.myBind(obj)(1, 2)</code>',
    checklist: ['返回新函数', 'this 指向正确', '支持预传参数'],
    defaultCode: `// TODO: 实现 myBind

Function.prototype.myBind = function (ctx, ...args) {
  const fn = this;
  // 返回一个函数，内部用 fn.apply(ctx, ...)
};

// 测试代码（写完后运行）
function greet(greeting, name) {
  console.log(greeting + ', ' + name + '! 我是 ' + this.title);
}
const obj = { title: '老师' };
const bound = greet.myBind(obj, '你好');
bound('学员'); // 应打印：你好, 学员! 我是 老师
`,
  },
  {
    num: 39, title: 'Promise.all', difficulty: '中等',
    desc: '<p>用 <code>Promise.all</code> 并行请求两个接口，全部完成后打印两个结果。</p>',
    example: '<code>Promise.all([fetch1, fetch2])</code>',
    checklist: ['两个请求并行', '全部完成后打印结果'],
    defaultCode: `// TODO: 用 Promise.all 并行请求

async function getAll() {
  const url1 = 'https://jsonplaceholder.typicode.com/posts/1';
  const url2 = 'https://jsonplaceholder.typicode.com/posts/2';
  // 在这里写：并行请求两个接口，返回两个结果
}

getAll().then(([a, b]) => {
  console.log('第一个标题：' + a.title);
  console.log('第二个标题：' + b.title);
});
`,
  },
  {
    num: 40, title: '手写 Promise', difficulty: '困难',
    desc: '<p>实现一个简化版 <code>MyPromise</code>，支持 <code>then</code> 和 <code>catch</code>，能链式调用。</p>',
    example: '<code>new MyPromise(resolve => resolve(1)).then(v => console.log(v))</code>',
    checklist: ['支持 then', '支持链式调用', '异步 resolve 能正确触发'],
    defaultCode: `// TODO: 实现简化版 MyPromise（这是最难的一题，可先尝试）

class MyPromise {
  constructor(executor) {
    this.state = 'pending';
    this.value = undefined;
    this.callbacks = [];
    // 在这里写 resolve 和 reject
  }
  then(onFulfilled) {
    // 在这里写
  }
}

// 测试代码（写完后运行）
new MyPromise((resolve) => {
  setTimeout(() => resolve('成功'), 1000);
}).then((value) => {
  console.log('结果：' + value);
});
`,
  },
];

const dir = path.join(__dirname, 'stage5-异步');
if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

stage4.forEach(q => {
  const meta = { ...q, num: q.num + 10 };
  const html = buildAsyncHtml(meta);
  const num = String(meta.num).padStart(2, '0');
  const safeTitle = q.title.replace(/[\\/:*?"<>|]/g, '-');
  fs.writeFileSync(path.join(dir, `${num}-${safeTitle}.html`), html, 'utf8');
  console.log('生成:', `${num}-${safeTitle}.html`);
});

console.log('\n阶段5 异步 完成，共', stage4.length, '题');

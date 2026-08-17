// 临时生成脚本：批量生成纯函数题（阶段1、2、4）的 HTML
// 用法：node _generate.js
const fs = require('fs');
const path = require('path');
const { editorScript } = require('./_editor.cjs');
const { getNext } = require('./_index.cjs');

// ============ 通用模板 ============
function buildHtml(meta) {
  const {
    stage, stageName, num, title, fnName, desc, examples, hint,
    testCases, params,
  } = meta;

  const nextUrl = getNext(num);

  const examplesHtml = examples.map(e => `
      <div class="example">
        <strong>${e.title}：</strong><br />
        ${e.body}
      </div>`).join('');

  const hintHtml = hint ? `      <p style="color:#cf222e;">提示：${hint}</p>` : '';

  const paramList = params || '';
  const defaultCode = `function ${fnName}(${paramList}) {\n  // TODO: 在这里写你的代码\n  \n}`;

  return `<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${num} - ${title}</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
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
    .desc { line-height: 1.7; font-size: 15px; }
    .desc p { margin-bottom: 10px; }
    .example { background: #f6f8fa; border-left: 3px solid #0969da; padding: 12px 16px; border-radius: 4px; margin: 10px 0; font-size: 14px; }
    .example code { font-family: "SF Mono", Consolas, monospace; }
    textarea { width: 100%; min-height: 300px; border: 1px solid #d0d7de; border-radius: 6px; padding: 12px; font-family: "SF Mono", Consolas, monospace; font-size: 14px; line-height: 1.6; resize: none; background: #fff; }
    textarea:focus { outline: 2px solid #0969da; border-color: transparent; }
    .btn-row { display: flex; gap: 8px; align-items: center; margin-top: 12px; flex-shrink: 0; }
    .btn { background: #1f883d; color: #fff; border: none; padding: 10px 20px; border-radius: 6px; font-size: 15px; font-weight: 600; cursor: pointer; text-decoration: none; display: inline-block; }
    .btn:hover { background: #1a7f37; }
    .btn.reset { background: #d0d7de; color: #1f2328; }
    .btn.next { background: #0969da; }
    .results { margin-top: 16px; flex-shrink: 0; overflow-y: auto; }
    .result-item { display: flex; align-items: center; padding: 10px 12px; border-radius: 6px; margin-bottom: 8px; font-size: 14px; }
    .result-item.pass { background: #e6ffec; border: 1px solid #2da44e; }
    .result-item.fail { background: #ffebe9; border: 1px solid #cf222e; }
    .result-item .icon { font-weight: 700; margin-right: 10px; font-size: 16px; }
    .result-item.pass .icon { color: #2da44e; }
    .result-item.fail .icon { color: #cf222e; }
    .result-item .detail { font-family: Consolas, monospace; font-size: 13px; color: #57606a; margin-left: auto; }
    .hint { font-size: 13px; color: #57606a; margin-top: 8px; }
    @media (max-width: 900px) {
      body { height: auto; overflow: auto; }
      .layout { flex-direction: column; }
      .panel { width: 100%; }
      .panel-right { height: auto; }
    }
  </style>
</head>
<body>
  <div class="header">
    <span class="tag">阶段 ${stage} · ${stageName}</span>
    <h1>${num}. ${title}</h1>
    <span class="difficulty">难度：简单</span>
  </div>

  <div class="layout">
    <div class="panel panel-left">
      <div class="card">
        <h2>题目描述</h2>
        <div class="desc">
          ${desc}
${examplesHtml}${hintHtml}
        </div>
      </div>
    </div>

    <div class="panel panel-right">
      <div class="card code-card">
        <h2>你的代码</h2>
        <p class="hint" style="margin-bottom:8px;">在下方编写 <code>${fnName}</code> 函数，然后点击"运行测试"。</p>
        <textarea id="code" spellcheck="false">${defaultCode}</textarea>
        <div class="btn-row">
          <button class="btn" onclick="runTests()">运行测试</button>
          <button class="btn reset" onclick="resetCode()">重置</button>
          <span id="nextArea" style="display:none;">
            ${nextUrl ? `<a href="${nextUrl}" class="btn next">下一题 →</a>` : '<span style="color:#2da44e;font-weight:600;">🎉 已全部完成</span>'}
          </span>
        </div>
        <div class="results" id="results"></div>
      </div>
    </div>
  </div>

  <script>
    const testCases = ${JSON.stringify(testCases)};
    const defaultCode = ${JSON.stringify(defaultCode)};
    function compileUserFn(code, fnName) {
      return new Function(code + '\\n; return ' + fnName + ';')();
    }
    function runUserCode(code, fnName, args) {
      return new Promise((resolve) => {
        const iframe = document.createElement('iframe');
        iframe.style.display = 'none';
        document.body.appendChild(iframe);
        const win = iframe.contentWindow;
        const script =
          'try {\\n' + code + '\\n' +
          'var __result = { ok: true, value: ' + fnName + '.apply(null, ' + JSON.stringify(args) + ') };\\n' +
          '} catch (e) { var __result = { ok: false, error: e.message }; }\\n' +
          'window.parent.postMessage(__result, "*");';
        const blob = new Blob([script], { type: 'text/javascript' });
        const url = URL.createObjectURL(blob);
        const s = win.document.createElement('script');
        s.src = url;
        s.onerror = () => { URL.revokeObjectURL(url); resolve({ ok: false, error: '脚本加载失败' }); };
        win.document.body.appendChild(s);
        const handler = (e) => {
          if (e.source !== win) return;
          window.removeEventListener('message', handler);
          document.body.removeChild(iframe);
          URL.revokeObjectURL(url);
          resolve(e.data);
        };
        window.addEventListener('message', handler);
        setTimeout(() => {
          window.removeEventListener('message', handler);
          document.body.removeChild(iframe);
          resolve({ ok: false, error: '执行超时' });
        }, 3000);
      });
    }
    async function runTests() {
      const code = document.getElementById('code').value;
      const resultsEl = document.getElementById('results');
      resultsEl.innerHTML = '';
      let fn;
      let useIframe = false;
      try { fn = compileUserFn(code, ${JSON.stringify(fnName)}); }
      catch (e) { useIframe = true; }
      let allPass = true;
      for (let i = 0; i < testCases.length; i++) {
        const tc = testCases[i];
        let pass = false, actualText = '';
        if (!useIframe) {
          try {
            const actual = fn(...tc.args);
            pass = JSON.stringify(actual) === JSON.stringify(tc.expected);
            actualText = JSON.stringify(actual);
          } catch (e) { actualText = '报错：' + e.message; }
        } else {
          const r = await runUserCode(code, ${JSON.stringify(fnName)}, tc.args);
          pass = r.ok && JSON.stringify(r.value) === JSON.stringify(tc.expected);
          actualText = r.ok ? JSON.stringify(r.value) : '报错：' + r.error;
        }
        const item = document.createElement('div');
        item.className = 'result-item ' + (pass ? 'pass' : 'fail');
        const icon = pass ? '✓' : '✗';
        const inputStr = tc.args.map(JSON.stringify).join(', ');
        const detail = '输入(' + inputStr + ') → 期望 ' + JSON.stringify(tc.expected) + '，实际 ' + actualText;
        item.innerHTML = '<span class="icon">' + icon + '</span><span>测试用例 ' + (i + 1) + '</span><span class="detail">' + detail + '</span>';
        resultsEl.appendChild(item);
        if (!pass) allPass = false;
      }
      if (allPass) {
        const ok = document.createElement('div');
        ok.className = 'result-item pass';
        ok.innerHTML = '<span class="icon">✓</span><span>全部通过！做得好！</span>';
        resultsEl.appendChild(ok);
        // 显示"下一题"按钮
        const nextArea = document.getElementById('nextArea');
        if (nextArea) nextArea.style.display = 'block';
      } else {
        const nextArea = document.getElementById('nextArea');
        if (nextArea) nextArea.style.display = 'none';
      }
    }
    function resetCode() { document.getElementById('code').value = defaultCode; document.getElementById('results').innerHTML = ''; }
${editorScript}
  </script>
</body>
</html>
`;
}

module.exports = { buildHtml };

import { ref, type Ref } from 'vue'
import type { UserCode } from '../types'

// 组合 HTML/CSS/JS 为完整的 HTML 文档
function buildDocument(code: UserCode): string {
  // 错误捕获脚本 — 独立 <script> 标签，用户代码的语法错误不影响它的注册
  const errorGuard = `<script>
(function() {
  var hintMap = [
    [/queryselector/i, '注意大小写：应该写成 querySelector（大写 S）'],
    [/querySelectorAll/i, '注意大小写：应该写成 querySelectorAll（大写 S 和 A）'],
    [/getElementById|getElementsByClassName|getElementsByTagName/i, '试试用 document.querySelector() 或 document.querySelectorAll() 代替'],
    [/docuemnt|doucment|docment|documnet/i, '你是不是想打 document？检查拼写'],
    [/addeventlistener/i, '注意大小写：应该写成 addEventListener（大写 E 和 L）'],
    [/textcontent/i, '注意大小写：应该写成 textContent（大写 C）'],
    [/innerhtml/i, '注意大小写：应该写成 innerHTML（大写 HTML）'],
    [/Cannot read propert.* of null|Cannot read propert.* of undefined/i, '选择器没找到元素——请检查 HTML 中的 id 或 class 名称是否一致，或者 JS 代码是否在元素创建之前执行了'],
    [/is not a function/i, '检查函数名拼写和大小写，确认括号是英文的 () 而不是中文的（）'],
    [/is not defined/i, '这个变量或函数还没有声明——检查名字是否拼错了，或者是否在声明之前就使用了它'],
    [/Unexpected token|Unexpected identifier|missing \\)|unterminated/i, '可能漏了括号、引号或花括号——检查符号是否成对出现，中文符号和英文符号不能混用'],
    [/Cannot set propert.* of null/i, '你想修改一个不存在的元素——先确认 querySelector 找到了目标元素'],
    [/null is not an object/i, '你在试图操作一个不存在的元素——先检查 querySelector 的返回值'],
    [/SyntaxError/i, '语法错误——检查是否有漏掉的括号、引号、分号或逗号。特别注意：模板字符串用反引号而不是普通引号'],
    [/setTimeout|setInterval/i, '定时器函数拼写检查——是 setInterval 和 setTimeout，注意大小写'],
    [/addEventListener.*not.*function/i, 'addEventListener 的第一个参数是事件类型字符串（如 "click"），第二个参数才是函数——检查参数顺序']
  ];

  function reportError(msg, lineno) {
    var hint = '';
    for (var i = 0; i < hintMap.length; i++) {
      if (hintMap[i][0].test(msg)) {
        hint = hintMap[i][1];
        break;
      }
    }
    if (!hint) {
      hint = '仔细检查报错行附近的代码——大小写、拼写、符号是否成对';
    }
    var err = {
      type: 'code-error',
      error: {
        message: String(msg),
        lineno: lineno || 0,
        hint: hint
      }
    };
    try { parent.postMessage(err, '*'); } catch(e) {}
  }

  // 运行时错误
  window.onerror = function(msg, source, lineno) {
    reportError(msg, lineno);
  };

  // 也监听 error 事件（可捕获部分语法错误场景）
  window.addEventListener('error', function(e) {
    if (e.message) {
      reportError(e.message, e.lineno);
    }
  });
})();\n<\/script>`

  // 用户 JS — 独立 <script> 标签，代码错误不影响错误守卫
  const userScript = code.js ? `<script>\n${code.js}\n<\/script>` : ''

  return `<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    *, *::before, *::after {
      box-sizing: border-box;
    }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
      line-height: 1.6;
      color: #333;
    }
    h1 { color: #8B2E2E; }
    img { max-width: 100%; border-radius: 8px; }
    a { color: #8B2E2E; }
    ul, ol { padding-left: 1.5em; }
    li { margin: 0.5em 0; }
  </style>
  <style>${code.css}</style>
</head>
<body>
  ${code.html}
  ${errorGuard}
  ${userScript}
</body>
</html>`
}

export function useCodePreview(code: Ref<UserCode>) {
  const previewSrc = ref('')

  function triggerPreview() {
    previewSrc.value = buildDocument(code.value)
  }

  // 初始自动渲染
  triggerPreview()

  return { previewSrc, triggerPreview }
}

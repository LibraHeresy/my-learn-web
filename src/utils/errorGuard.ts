export const errorGuardScript = `<script>
(function() {
  var hintMap = [
    // ── 拼写/大小写 ──
    [/queryselector/i, '注意大小写：应该写成 querySelector（大写 S）'],
    [/querySelectorAll/i, '注意大小写：应该写成 querySelectorAll（大写 S 和 A）'],
    [/getElementById|getElementsByClassName|getElementsByTagName/i, '试试用 document.querySelector() 或 document.querySelectorAll() 代替'],
    [/docuemnt|doucment|docment|documnet/i, '你是不是想打 document？检查拼写'],
    [/addeventlistener/i, '注意大小写：应该写成 addEventListener（大写 E 和 L）'],
    [/textcontent/i, '注意大小写：应该写成 textContent（大写 C）'],
    [/innerhtml/i, '注意大小写：应该写成 innerHTML（大写 HTML）'],
    [/classlist/i, '注意大小写：应该写成 classList（大写 L）'],
    [/parentnode/i, '注意大小写：应该写成 parentNode（大写 N）'],
    [/nextsibling|previoussibling/i, '注意大小写：应该写成 nextSibling 或 previousSibling（大写 S）'],
    [/createelement/i, '注意大小写：应该写成 createElement（大写 E）'],
    [/appendchild/i, '注意大小写：应该写成 appendChild（大写 C）；或者试试更简洁的 .append()'],
    [/console\.log\(/i, 'console.log 拼写正确，但注意：console 的首字母小写（不是 Console）'],
    [/consle|consoel|conosle|cnosole/i, '你是不是想写 console？检查拼写'],
    [/funtion|functon|fucntion/i, '你是不是想写 function？检查拼写'],
    [/retrun|retun/i, '你是不是想写 return？检查拼写'],
    [/docuemnt\.getElementById|document\.getelementbyid/i, '注意大小写：getElementById（大写 B 和 I，不是 Id）'],
    // ── 中文符号混入 ──
    [/[\\uFF08\\uFF09]/, '你用了中文括号（）——代码中必须用英文括号 ()'],
    [/[\\u201C\\u201D\\u300C\\u300D]/, '你用了中文引号""或「」——代码中必须用英文引号 ""'],
    [/[\\uFF0C]/, '你用了中文逗号，——代码中必须用英文逗号 ,'],
    [/[\\uFF1B]/, '你用了中文分号；——代码中必须用英文分号 ;'],
    [/[\\uFF1A]/, '你用了中文冒号：——代码中必须用英文冒号 :'],
    // ── 常见运行时错误 ──
    [/Cannot read propert.* of null|Cannot read propert.* of undefined/i, '选择器没找到元素——检查 HTML 中的 id 或 class 名称是否一致，或 JS 代码是否在元素创建之前执行了'],
    [/is not a function/i, '你调用了一个不是函数的东西——检查函数名拼写，确认括号是英文的 () 而不是中文的（）'],
    [/is not defined/i, '这个变量或函数还没有声明——检查名字是否拼错了，或者是否在声明之前就使用了它'],
    [/Cannot set propert.* of null/i, '你想修改一个不存在的元素——先确认 querySelector 找到了目标元素'],
    [/null is not an object/i, '你在操作一个不存在的东西——先检查 querySelector 的返回值是否为空'],
    [/Unexpected token|Unexpected identifier|missing \\)|unterminated/i, '可能漏了括号、引号或花括号——检查符号是否成对出现'],
    [/Unexpected end of input/i, '代码块没有正确结束——检查是否少了一个 } 花括号'],
    [/Assignment to constant variable/i, '你试图修改一个 const 声明的常量——如果想重新赋值，改用 let 声明'],
    [/Missing initializer in const/i, 'const 声明变量时必须同时赋值——例如 const name = "小明"'],
    [/Cannot find module|Failed to resolve/i, '找不到引用的文件或模块——检查 import 路径是否正确'],
    // ── 逻辑错误 ──
    [/Maximum call stack size exceeded/i, '无限递归/死循环——检查函数是否在不断调用自己，或者循环条件是否能结束'],
    [/is not iterable/i, '你试图遍历一个不可遍历的值——可能把普通对象当成数组了，试试用 for...in 或 Object.keys()'],
    [/expected.*assignment|Invalid left-hand side/i, '等号左边不能是值——你是不是把 =（赋值）和 ===（比较）搞混了？'],
    // ── 语法兜底 ──
    [/SyntaxError/i, '语法错误——检查是否漏了括号、引号或分号。特别注意：字符串要用引号包裹'],
    [/TypeError/i, '类型错误——你可能对错误的数据类型执行了操作，比如把数字当函数调用'],
    [/ReferenceError/i, '引用错误——这个变量或函数还没有声明，检查拼写和大小写'],
    [/RangeError/i, '范围错误——比如数组长度设为负数，或递归次数过多'],
    // ── 特定 API ──
    [/addEventListener.*not.*function/i, 'addEventListener 的第一个参数是事件类型（如 "click"），第二个参数才是函数'],
    [/querySelector.*not.*function/i, 'querySelector 不是函数——确认你写的是 document.querySelector()，而且 document 没拼错'],
    [/forEach.*not.*function/i, 'forEach 只能用在数组上——你尝试遍历的可能不是数组，试试先把它转成数组'],
    [/setTimeout.*not defined|setInterval.*not defined/i, '定时器函数名检查——应该是 setInterval 和 setTimeout，你写的名字和这两个完全一样吗？注意大小写']
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

  window.onerror = function(msg, source, lineno) {
    reportError(msg, lineno);
  };

  window.addEventListener('error', function(e) {
    if (e.message) {
      reportError(e.message, e.lineno);
    }
  });
})();\n<\/script>`

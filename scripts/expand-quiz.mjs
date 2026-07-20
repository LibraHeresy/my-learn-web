import fs from 'fs';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const yaml = require('js-yaml');
import path from 'path';

const BASE = 'D:/MyWorkspace/my-learn-web/src/content/quiz';

function loadYaml(file) {
  const raw = fs.readFileSync(file, 'utf8');
  return yaml.load(raw);
}

function dumpYaml(file, data) {
  // Write YAML manually to preserve structure, but use js-yaml dump as base
  const gem = data.gem;
  let out = '';
  if (file.includes('html-tags')) out += '# HTML 标签宝石\n\n';
  else if (file.includes('html-ability')) out += '# HTML 能力宝石\n\n';
  else if (file.includes('css-style')) out += '# CSS 样式宝石\n\n';
  else if (file.includes('css-layout')) out += '# CSS 布局宝石\n\n';
  else if (file.includes('web-foundation')) out += '# Web 基石宝石\n\n';
  else if (file.includes('a11y')) out += '# 无障碍宝石\n\n';

  out += 'gem:\n';
  for (const [k, v] of Object.entries(gem)) {
    if (typeof v === 'string') {
      out += `  ${k}: ${v}\n`;
    } else {
      out += `  ${k}: ${v}\n`;
    }
  }
  out += '\nlevels:\n';

  for (const level of data.levels) {
    out += `  - level: ${level.level}\n`;
    out += `    type: ${level.type}\n`;
    out += `    threshold: ${level.threshold}\n`;
    out += `    name: ${level.name}\n`;
    out += '    questions:\n';
    for (const q of level.questions) {
      out += `      - id: ${q.id}\n`;
      out += `        difficulty: ${q.difficulty}\n`;
      out += `        question: ${JSON.stringify(q.question)}\n`;
      out += '        options:\n';
      for (const o of q.options) {
        out += `          - ${JSON.stringify(o)}\n`;
      }
      out += `        answer: ${q.answer}\n`;
      out += `        explanation: ${JSON.stringify(q.explanation)}\n`;
    }
    out += '\n';
  }

  fs.writeFileSync(file, out, 'utf8');
}

// ============================================================
// 1. html-tags.yaml
// ============================================================
function expandHtmlTags(data) {
  // Add to level 1 (认识标签)
  data.levels[0].questions.push(
    {
      id: 26, difficulty: 1,
      question: '<a> 标签的 href 属性作用是什么？',
      options: ['设置文字颜色', '指定链接跳转的目标地址', '设置字体大小', '定义锚点名称'],
      answer: 1,
      explanation: 'href（Hypertext REFerence）指定链接的目标 URL。没有 href 的 <a> 只是锚点占位符，不是真正的超链接。'
    },
    {
      id: 27, difficulty: 1,
      question: '下面哪个标签用于显示图片？',
      options: ['<image>', '<img>', '<pic>', '<photo>'],
      answer: 1,
      explanation: '<img> 是标准图片标签。注意是 img 不是 image。<image> 在 SVG 中使用，HTML 中不是标准图片标签。'
    },
    {
      id: 28, difficulty: 1,
      question: '<ol> 列表项用什么标签？',
      options: ['<li>', '<ol>', '<dl>', '<dt>'],
      answer: 0,
      explanation: 'ol（ordered list）和 ul 的子项都是 <li>。ol 自动加数字序号，ul 加圆点。'
    },
    {
      id: 29, difficulty: 1,
      question: '<head> 和 <body> 的关系？',
      options: ['head 在 body 里面', '两者并列，head 放元信息，body 放可见内容', 'head 已废弃', '只有 body 是必须的'],
      answer: 1,
      explanation: '<html> 根元素下 head 和 body 并列。head 放 title/meta/link 等元信息，body 放页面可见内容。'
    },
    {
      id: 30, difficulty: 1,
      question: '标题标签 h1~h6 应该在页面中如何使用？',
      options: ['h1 越大越好', 'h1 是页面主标题（通常一个），h2~h6 按层级嵌套使用', '随便用', 'h6 最重要'],
      answer: 1,
      explanation: 'h1 代表页面最高级标题，通常一个页面只有一个。h2 是 h1 的子标题，以此类推，形成文档大纲（Document Outline），对 SEO 和无障碍都重要。'
    }
  );

  // Add to level 2 (场景选择)
  data.levels[1].questions.push(
    {
      id: 31, difficulty: 2,
      question: '<figure> 和 <figcaption> 配合使用，下面哪个场景最合适？',
      options: ['包裹导航菜单', '包裹带说明文字的图片/图表/代码块', '包裹表单', '包裹页脚'],
      answer: 1,
      explanation: 'figure 用于包裹独立的内容单元（图片、图表、代码片段等），figcaption 为其提供标题/说明。两者配合构成语义化的"图文组合"。'
    },
    {
      id: 32, difficulty: 2,
      question: '<time> 标签的 datetime 属性做什么？',
      options: ['设置时区', '提供机器可读的标准化时间格式', '定时刷新页面', '设置超时'],
      answer: 1,
      explanation: 'datetime 属性提供 ISO 8601 格式的标准化时间（如 "2024-01-15"），方便搜索引擎和浏览器解析。显示内容可以是 "2024年1月15日" 等人性化格式。'
    },
    {
      id: 33, difficulty: 2,
      question: '<video> 标签不写 controls 会怎样？和 audio 一样吗？',
      options: ['无法播放', '能播放但没有控制条，和 audio 行为一致', '自动播放', 'video 必须有 controls'],
      answer: 1,
      explanation: '和 audio 一样，controls 是布尔属性。不写=没有播放/暂停/音量等控制条。通常应加上 controls 让用户能操作。'
    },
    {
      id: 34, difficulty: 2,
      question: '<details> 和 <summary> 组合的效果？',
      options: ['弹窗', '可展开/折叠的内容区域，summary 为标题', 'Tab 切换', '已废弃'],
      answer: 1,
      explanation: 'details 创建原生展开/折叠组件无需 JS。summary 是始终可见的标题，点击展开 details 内其他内容。open 属性默认展开。'
    },
    {
      id: 35, difficulty: 2,
      question: '<abbr> 标签配合 title 属性的作用？',
      options: ['加粗文字', '标记缩写并提供全称提示', '改变字体', '已废弃'],
      answer: 1,
      explanation: 'abbr 标记缩写词如 <abbr title="HyperText Markup Language">HTML</abbr>。悬停时 title 显示全称，屏幕阅读器也可读出。'
    }
  );

  // Add to level 3 (结构纠错)
  data.levels[2].questions.push(
    {
      id: 36, difficulty: 3,
      question: '下面代码有什么语义问题？<div class="header"><div class="nav"><ul>...</ul></div></div>',
      options: ['完全没问题', '应该用 <header> 包裹 <nav>，两个 div 都可以替换为语义化标签', 'ul 不能放在 div 中', '应该全部用 section'],
      answer: 1,
      explanation: '<header> 替代 div.header，<nav> 替代 div.nav。语义化标签比 div+class 更明确地告诉机器"这是页头+导航"。'
    },
    {
      id: 37, difficulty: 3,
      question: '<blockquote> 和 <q> 区别？什么时候用哪个？',
      options: ['完全相同', 'blockquote 块级引用（长引用），q 行内引用（短引用）会自动加引号', 'q 已废弃', 'blockquote 只用于代码'],
      answer: 1,
      explanation: 'blockquote 是块级元素用于较长引用（整段话），通常缩进显示。q 是行内元素用于短引用（句子内），浏览器自动加引号。两者都可配合 cite 属性标注来源。'
    },
    {
      id: 38, difficulty: 2,
      question: '<pre> 和 <code> 区别？组合使用呢？',
      options: ['完全相同', 'pre 保留空格和换行，code 标记代码语义。pre>code 组合显示格式化代码块', 'pre 已废弃', 'code 只能放一行'],
      answer: 1,
      explanation: 'pre=预格式化保留空格和换行。code=标记这是代码（语义）。<pre><code>组合</code></pre> 是标准代码块写法。单用 code 适合行内代码片段。'
    },
    {
      id: 39, difficulty: 3,
      question: '<dl>/<dt>/<dd> 三件套的使用场景？',
      options: ['无序列表', '描述列表：术语(dt)与描述(dd)的配对，如词汇表、FAQ、元数据展示', '有序列表', '已废弃'],
      answer: 1,
      explanation: 'dl=description list。dt=term 定义术语。dd=description 描述内容。常用于：词汇表、FAQ（Q=dt, A=dd）、商品参数表、元数据（键=dt, 值=dd）。'
    },
    {
      id: 40, difficulty: 3,
      question: '<script> 放在 <head> 中 vs 放在 </body> 前有什么区别？',
      options: ['完全一样', '在 head 中会阻塞 HTML 解析（除非加 defer/async），在 body 底部HTML先渲染用户更快看到页面', 'head 更快', '不能放在 body 中'],
      answer: 1,
      explanation: 'head 中的 script 默认同步加载执行会阻塞页面渲染→白屏时间变长。body 底部=先渲染 HTML 再加载 JS→用户感知更快。现代做法：head+defer 或 type="module"。'
    }
  );

  // Add level 4 "表单与交互"
  data.levels.push({
    level: 4,
    type: 'boss',
    threshold: 60,
    name: '表单与交互',
    questions: [
      {
        id: 41, difficulty: 2,
        question: '<form> 的 action 和 method 属性各做什么？',
        options: ['action=动画 method=方法', 'action=提交目标URL method=HTTP请求方式(GET/POST)', 'action=操作 method=格式', '都不需要'],
        answer: 1,
        explanation: 'action 指定表单数据发送到哪个 URL。method 指定 HTTP 方法：GET（数据在 URL 中，适合搜索/筛选）或 POST（数据在请求体中，适合登录/提交）。'
      },
      {
        id: 42, difficulty: 2,
        question: '<input> 的 type 属性有哪些常用值？（选最全的）',
        options: ['text, password, submit', 'text, password, email, number, date, tel, url, search, range, color, file, checkbox, radio, submit, reset, button', '只有 text 和 password', 'type 属性已废弃'],
        answer: 1,
        explanation: 'HTML5 提供了丰富的 input type：text/password/email/number/date/tel/url/search/range/color/file/checkbox/radio/submit/reset/button 等。不同 type 会触发不同的虚拟键盘（移动端）和浏览器内置验证。'
      },
      {
        id: 43, difficulty: 2,
        question: '<input type="email"> 和 type="text" 有什么区别？',
        options: ['完全相同', 'email 类型浏览器会自动校验 @ 格式，移动端弹出含 @ 键的键盘', 'email 更慢', 'email 类型已废弃'],
        answer: 1,
        explanation: 'type="email" 触发浏览器内置邮箱格式验证（需含 @ 和域名），提交时自动校验。移动端键盘会显示 @ 和 . 键方便输入。还可搭配 multiple 属性允许多个邮箱。'
      },
      {
        id: 44, difficulty: 2,
        question: '<input required> 和 <input pattern="[A-Z]{3}\\d{4}"> 的验证时机？',
        options: ['只在服务端', '表单提交时浏览器自动校验，不通过则阻止提交并显示提示', '输入时实时校验', '不校验'],
        answer: 1,
        explanation: 'required 和 pattern 是 HTML5 原生表单验证。提交时浏览器自动检查，不符合则阻止提交并弹出默认提示信息（可用 title 属性自定义提示）。配合 :invalid 和 :valid 伪类可做视觉反馈。'
      },
      {
        id: 45, difficulty: 2,
        question: '<select> 和 <datalist> 区别？',
        options: ['完全相同', 'select 限定选项（下拉选择），datalist 提供建议列表但允许自由输入（自动补全）', 'datalist 已废弃', 'select 只能单选'],
        answer: 1,
        explanation: 'select>option 是严格的下拉选择，用户只能选列表中的值。datalist 配合 input list 属性使用，提供自动补全建议但用户可以输入任意值。'
      },
      {
        id: 46, difficulty: 2,
        question: '<textarea> 和 <input type="text"> 什么时候用 textarea？',
        options: ['完全相同', 'textarea 用于多行文本（留言、简介），input text 用于单行（用户名、搜索）', 'textarea 已废弃', '任何时候都可以'],
        answer: 1,
        explanation: 'textarea 支持多行输入，可用 rows/cols 设置尺寸（推荐用 CSS width/height）。input text 只能单行。textarea 的默认值写在标签之间而非 value 属性。'
      },
      {
        id: 47, difficulty: 3,
        question: '<button type="submit"> vs type="button"> vs type="reset"> 区别？',
        options: ['完全相同', 'submit 提交表单（默认type！）/ button 普通按钮不提交 / reset 重置所有输入为初始值', 'reset 提交表单', 'type 不区分'],
        answer: 1,
        explanation: '关键点：button 的默认 type 是 submit！如果 form 中的 button 不写 type且不想提交，必须显式写 type="button"。reset 清空用户输入恢复初始值（很少使用因容易误点）。'
      },
      {
        id: 48, difficulty: 3,
        question: '<input autocomplete> 和 autofocus 各做什么？',
        options: ['自动完成和自动聚焦', 'autocomplete 控制浏览器是否保存/自动填写（on/off/具体类型），autofocus 页面加载后自动聚焦该元素', '两者相同', '已废弃'],
        answer: 1,
        explanation: 'autocomplete="off" 可关闭浏览器自动填充（对敏感字段有用）。autocomplete="email" 提示浏览器用邮箱类型填充。autofocus 页面加载后自动聚焦（一个页面最好只有一个）。'
      },
      {
        id: 49, difficulty: 3,
        question: '表单中 name 属性为什么重要？',
        options: ['不重要', 'name 是提交时数据的键名。没有 name 的字段不会出现在提交数据中', 'name 设置样式', 'name 和 id 完全相同'],
        answer: 1,
        explanation: '表单提交时，name=键，value=值，组成键值对发送给服务器。没有 name 属性=该字段不参与提交。name 和 id 不同：name 用于表单提交，id 用于关联 label 和 JS 选取。'
      },
      {
        id: 50, difficulty: 2,
        question: '<input min="1" max="100" step="5"> 各属性含义？',
        options: ['最小值/最大值/步长，允许输入 1,6,11,...96', '最小值/最大值/标题', '已废弃', 'min/max 只用于 date'],
        answer: 0,
        explanation: 'min/max 限定数值范围，step 规定每次增减的步长。step="5" 表示只接受 5 的倍数（配合 min="1"=1,6,11...）。适用于 type="number" 和 type="range"。'
      },
      {
        id: 51, difficulty: 3,
        question: '<input type="checkbox"> 的 value 和 checked 属性如何协作？',
        options: ['value 总被提交', '勾选时提交 name=value，未勾选时不提交任何数据', 'checked 决定 value', '不需要 value'],
        answer: 1,
        explanation: 'checked 控制是否选中。value 定义选中时提交的值。未勾选时该字段完全不发送（HTTP 请求中无此项）。如需"未勾选也传值"，可配合隐藏 input 用同一 name。'
      },
      {
        id: 52, difficulty: 3,
        question: '关于表单无障碍，以下哪个做法是错的？',
        options: ['用 <label> 关联每个输入框', '用 placeholder 代替 label', '错误提示用颜色+文字双重标识', 'fieldset+legend 分组相关字段'],
        answer: 1,
        explanation: 'placeholder 不能替代 label！placeholder 在输入后消失、颜色浅对比度低、屏幕阅读器支持不一致。始终用 <label> 关联每个输入框。placeholder 是辅助提示不是标签。'
      }
    ]
  });

  return data;
}

// ============================================================
// 2. html-ability.yaml
// ============================================================
function expandHtmlAbility(data) {
  // Add to level 1 (属性识别)
  data.levels[0].questions.push(
    {
      id: 53, difficulty: 1,
      question: 'lang 属性写在哪个标签？作用是什么？',
      options: ['<body>', '<html lang="zh-CN">，声明页面语言帮助搜索引擎和屏幕阅读器', '<head>', '不需要'],
      answer: 1,
      explanation: 'lang 属性声明页面主语言。zh-CN=简体中文，en=英语。屏幕阅读器据此选择正确的语音引擎，搜索引擎据此判断目标受众。'
    },
    {
      id: 54, difficulty: 2,
      question: 'tabindex 属性接受哪些值？各代表什么？',
      options: ['0/1/2', '-1（不可Tab到达但可JS聚焦）/ 0（按DOM顺序）/ 正数（手动指定顺序，不推荐）', '只有 true/false', '已废弃'],
      answer: 1,
      explanation: 'tabindex="-1"：不能用 Tab 到达但可用 JS focus() 聚焦。tabindex="0"：按 DOM 自然顺序。tabindex="1,2,3..."：手动控制顺序→难以维护且破坏自然阅读顺序，强烈不推荐。'
    },
    {
      id: 55, difficulty: 2,
      question: 'contenteditable 属性做什么？',
      options: ['让元素可被用户直接编辑（所见即所得编辑器基础）', '设置内容', '加密内容', '复制内容'],
      answer: 0,
      explanation: 'contenteditable="true" 让元素变为可编辑区域，用户可直接在页面上修改文字。富文本编辑器（如 Quill、ProseMirror）底层依赖此属性。'
    }
  );

  // Add to level 2 (属性应用)
  data.levels[1].questions.push(
    {
      id: 56, difficulty: 2,
      question: '<input type="number"> 的 value 是字符串还是数字？',
      options: ['数字', '始终是字符串。JS 读取时需用 parseInt/parseFloat 转换', '取决于浏览器', '自动转换'],
      answer: 1,
      explanation: 'HTML 属性值始终是字符串。input.value 返回字符串 "42" 而非数字 42。需要数值计算时必须用 parseInt/parseFloat/Number 转换。'
    },
    {
      id: 57, difficulty: 2,
      question: 'spellcheck 属性做什么？',
      options: ['检查 JS 错误', '控制浏览器是否对元素内容进行拼写检查（默认对可编辑区域开启）', '检查链接', '已废弃'],
      answer: 1,
      explanation: 'spellcheck="true/false" 控制浏览器拼写检查。在 input/textarea/contenteditable 元素上生效。对姓名、代码、邮箱等字段可设为 false 避免红色波浪线。'
    },
    {
      id: 58, difficulty: 2,
      question: 'translate 属性有什么用？',
      options: ['自动翻译页面', 'translate="no" 告诉翻译工具不要翻译该元素内容（如品牌名、代码）', '设置语言', '已废弃'],
      answer: 1,
      explanation: 'translate="no" 指示 Google 翻译等工具跳过该元素。常用于：品牌名称、代码片段、专有名词、诗歌等不应被机器翻译的内容。'
    }
  );

  // Add to level 3 (表单实战)
  data.levels[2].questions.push(
    {
      id: 59, difficulty: 3,
      question: '<form novalidate> 什么场景下使用？',
      options: ['总是使用', '需要自定义验证逻辑或分步保存草稿时，关闭浏览器默认验证', '移动端专用', '已废弃'],
      answer: 1,
      explanation: 'novalidate 禁用浏览器原生表单验证。场景：1) 使用自定义 JS 验证库（如 Validator.js）替代浏览器默认样式；2) "保存草稿"功能允许用户暂存不完整数据；3) 多步骤表单需在不同步骤校验不同字段。'
    },
    {
      id: 60, difficulty: 3,
      question: '表单提交时，<input type="file"> 需要什么特殊设置？',
      options: ['不需要', 'form 必须设置 enctype="multipart/form-data"，method 必须是 POST', '只能用 GET', 'type="file" 已废弃'],
      answer: 1,
      explanation: '上传文件必须：1) method="POST"（GET 有 URL 长度限制）；2) enctype="multipart/form-data"（将文件二进制数据分割成多部分发送）。缺一不可。'
    },
    {
      id: 61, difficulty: 3,
      question: '<input list="cities"><datalist id="cities">——这两个元素怎么关联？',
      options: ['用 class', 'input 的 list 属性值等于 datalist 的 id 值', '用 name', '自动关联'],
      answer: 1,
      explanation: 'input 的 list 属性值和 datalist 的 id 值必须一致。这和 label for / input id 的关联方式类似。datalist 提供建议选项但允许用户自由输入。'
    }
  );

  // Add level 4 "实战场景"
  data.levels.push({
    level: 4,
    type: 'boss',
    threshold: 60,
    name: '实战场景',
    questions: [
      {
        id: 62, difficulty: 2,
        question: '<title> 标签对 SEO 的作用？',
        options: ['不重要', 'title 是搜索结果中最显眼的元素，也是浏览器标签页文字。应包含关键词且每页唯一', '标题越长越好', 'title 只显示在浏览器'],
        answer: 1,
        explanation: 'title 是 SEO 最重要的元素之一：1) 搜索结果标题（约50-60字符截断）；2) 浏览器标签页显示；3) 社交分享默认标题。每个页面应有唯一、描述性强、含关键词的 title。'
      },
      {
        id: 63, difficulty: 2,
        question: '<meta name="description"> 有什么作用？',
        options: ['没有任何作用', '搜索结果标题下方的描述摘要，影响点击率（非直接排名因素）', '必须和 title 一样', '定义页面关键词排名'],
        answer: 1,
        explanation: 'meta description 是搜索结果标题下方的描述文字。虽然不是直接排名因素，但好的描述能提高点击率（CTR）→间接影响 SEO。建议 120-160 字符，每页唯一，自然包含关键词。'
      },
      {
        id: 64, difficulty: 3,
        question: '<meta name="robots"> 有哪些常用值？',
        options: ['index/follow', 'index/noindex（是否收录） 和 follow/nofollow（是否跟踪链接）的组合', '只有 allow/deny', '已废弃'],
        answer: 1,
        explanation: 'robots meta 控制搜索引擎行为：index（收录）/noindex（不收录），follow（跟踪链接）/nofollow（不跟踪）。常见组合：noindex,nofollow（完全隐藏），index,follow（默认全开放）。'
      },
      {
        id: 65, difficulty: 3,
        question: 'Open Graph（OG）meta 标签做什么？举例。',
        options: ['设置字体', '控制页面在社交平台（微信/Facebook/Twitter）分享时的标题、描述、缩略图预览', '优化加载速度', '已废弃'],
        answer: 1,
        explanation: 'OG 标签控制社交分享卡片：og:title（分享标题）、og:description（分享描述）、og:image（分享缩略图 1200x630px 最佳）、og:url（规范 URL）、og:type（内容类型 article/website）。Twitter 需额外 twitter:card 标签。'
      },
      {
        id: 66, difficulty: 2,
        question: '<link rel="canonical"> 解决什么问题？',
        options: ['加快加载', '解决重复内容问题：多个 URL 指向相同内容时，告诉搜索引擎哪个是"主版本"', '定义样式', '已废弃'],
        answer: 1,
        explanation: '同一内容可能被多个 URL 访问（如 ?sort=price、/product/123、/product/123?ref=ad）。canonical URL 告诉搜索引擎哪个是"规范版本"，集中排名权重避免被判定为重复内容。'
      },
      {
        id: 67, difficulty: 2,
        question: '<nav> 里应该放什么？什么不该放？',
        options: ['放所有链接', '放主导航链接块（网站菜单/目录）。页面底部链接、社交媒体链接等次要导航可用 footer 包裹', '只放 ul', '放表单'],
        answer: 1,
        explanation: 'nav 用于"主要导航块"。一个页面可有多个 nav（如主导航+面包屑+分页）。不重要链接群不需要 nav 包裹。用 aria-label 区分多个 nav（如 "主导航" "面包屑"）。'
      },
      {
        id: 68, difficulty: 3,
        question: '一个博客文章页，从 SEO 角度语义结构应该怎样？',
        options: ['全部用 div', '<article> 包裹文章 → 内有 <header>（标题/日期/作者）→ <h1> → 正文用 <p>/<section> → <footer>（标签/版权）。外层 <main> 放核心内容', '只需要 <p>', '语义化不重要'],
        answer: 1,
        explanation: '标准博客结构：<main><article>→<header>（h1+time+作者）→正文内容（用 section/h2 分隔章节）→<footer>（标签/分享）。搜索引擎据此理解：这是文章、这是标题、这是作者、这是发布时间。'
      },
      {
        id: 69, difficulty: 3,
        question: '<h1> 可以多次出现吗？h1 和 title 可以不同吗？',
        options: ['不可以', 'HTML5 允许每个 sectioning 元素（article/section）有自己的 h1。实际建议一个页面一个 h1。h1 和 title 可以不同（title 更侧重搜索点击，h1 是页面主标题）', '必须完全相同', 'h1 已废弃'],
        answer: 1,
        explanation: 'HTML5 规范允许 article/section 内有各自的 h1-h6 层级，但屏幕阅读器和 SEO 工具支持不完美→实际最佳实践仍是每页一个 h1。title（搜索结果标题）和 h1（页面显示标题）可略有不同：title 更精简含品牌名，h1 更具体。'
      },
      {
        id: 70, difficulty: 2,
        question: '<link rel="preload"> 和 <link rel="prefetch"> 区别？',
        options: ['完全相同', 'preload 预加载当前页面需要的资源（高优先级）。prefetch 预取未来导航可能需要的资源（低优先级空闲时加载）', 'prefetch 更快', 'preload 已废弃'],
        answer: 1,
        explanation: 'preload=当前页面必须的资源，尽快加载（如首屏字体、关键 CSS）。prefetch=用户下一步可能访问的页面资源，浏览器空闲时才加载。preconnect=提前建立连接（DNS+TCP+TLS），适合第三方域名。'
      },
      {
        id: 71, difficulty: 3,
        question: '移动端页面缺少 viewport meta 标签会怎样？',
        options: ['完全正常', '手机浏览器会以桌面宽度(约980px)渲染后缩小显示→文字极小用户需放大才能阅读', '页面崩溃', '只在 iOS 有问题'],
        answer: 1,
        explanation: '缺 <meta name="viewport" content="width=device-width, initial-scale=1"> 时，手机浏览器默认以 980px（iPad/桌面宽度）渲染页面再缩小→用户看到的是迷你桌面版网站文字小如蚂蚁必须双指放大。这是移动端最常见的问题之一。'
      }
    ]
  });

  return data;
}

// ============================================================
// 3. css-style.yaml
// ============================================================
function expandCssStyle(data) {
  // Add to level 1 (选择器基础)
  data.levels[0].questions.push(
    {
      id: 76, difficulty: 1,
      question: '属性选择器怎么写？选中所有 type="text" 的 input。',
      options: ['input.type=text', 'input[type="text"]', 'input(type="text")', 'input::type(text)'],
      answer: 1,
      explanation: '属性选择器 [attr="value"]：input[type="text"] 精确匹配。还有 [attr^="val"]（开头匹配）、[attr$="val"]（结尾匹配）、[attr*="val"]（包含匹配）、[attr~="val"]（空格分隔词匹配）。'
    },
    {
      id: 77, difficulty: 1,
      question: '通配选择器 * 做什么？',
      options: ['选中所有类', '选中页面所有元素（通常用于 reset：* {margin:0;padding:0;box-sizing:border-box}）', '选中第一个元素', '已废弃'],
      answer: 1,
      explanation: '* 选中所有元素。常用于全局重置。注意：* 选择器性能开销较大，大量使用时优先考虑直接设置 html/body 或使用 inherit。'
    },
    {
      id: 78, difficulty: 2,
      question: '伪类选择器和伪元素选择器语法区别？',
      options: ['完全相同', '伪类用单冒号(:hover :first-child)，伪元素用双冒号(::before ::after)。但历史原因伪元素也支持单冒号', '伪元素用单冒号', '语法相反'],
      answer: 1,
      explanation: '伪类=选择元素特定状态（:hover, :focus, :nth-child）。伪元素=创建虚拟子元素（::before, ::after, ::placeholder）。CSS3 规范伪元素用双冒号区分，但浏览器兼容性允许单冒号。推荐新代码用双冒号。'
    }
  );

  // Add to level 2 (盒模型计算)
  data.levels[1].questions.push(
    {
      id: 79, difficulty: 2,
      question: '浏览器默认样式（User Agent Stylesheet）是什么？为什么需要 CSS Reset？',
      options: ['不需要关心', '浏览器自带默认样式（如 body 有 8px margin）。不同浏览器默认值不同导致跨浏览器表现不一致→用 Reset/Normalize 统一起点', '默认样式都一样', 'Reset 已过时'],
      answer: 1,
      explanation: '每个浏览器有自己的默认样式表：Chrome body margin:8px，h1 有默认字号等。不同浏览器默认值不同→同一页面可能跨浏览器表现不同。CSS Reset 清零所有默认值，Normalize.css 统一为合理默认值。'
    },
    {
      id: 80, difficulty: 2,
      question: 'line-height 默认值约多少？设 1.5 和 150% 有什么区别？',
      options: ['完全相同', '默认约 1.2。无单位值(1.5)作为乘数被子元素继承；百分比(150%)计算后固定值被子元素继承→可能导致意外重叠', '150% 更好', 'line-height 已废弃'],
      answer: 1,
      explanation: 'line-height:1.5（推荐）→子元素继承乘数 1.5 并基于自身 font-size 计算。line-height:150%→先基于父元素计算出 px 值再继承→子元素字号变大时行高不够而重叠。无单位值更安全。'
    }
  );

  // Add to level 3 (样式排错)
  data.levels[2].questions.push(
    {
      id: 81, difficulty: 3,
      question: ':root 和 html 选择器有什么区别？为什么 CSS 变量通常定义在 :root？',
      options: ['完全相同', ':root 是伪类指向文档根（HTML文档=html元素，但 SVG 文档=svg 元素）。:root 权重(0,1,0)高于 html(0,0,1)，变量声明用 :root 更通用', 'html 选择器更好', '已废弃'],
      answer: 1,
      explanation: ':root 和 html 在 HTML 文档中选中的是同一个元素，但 :root 是伪类权重(0,1,0)比 html(0,0,1)高。CSS 变量习惯定义在 :root 因为它是伪类层级高点且语义更明确（"全局根级别"）。'
    },
    {
      id: 82, difficulty: 3,
      question: 'z-index 为什么有时设 9999 也不生效？',
      options: ['z-index 坏了', 'z-index 只在定位元素（position 非 static）上生效。且受"层叠上下文"影响——父子元素的 z-index 在不同层级无法比较', '永远有效', '需要配合 opacity'],
      answer: 1,
      explanation: 'z-index 生效条件：1) 元素 position 非 static（relative/absolute/fixed/sticky）；2) z-index 只在同一层叠上下文内比较。父元素创建了新层叠上下文（如 opacity<1, transform, flex/grid 容器等）→子元素 z-index 只在该上下文内排序无法跳出。'
    },
    {
      id: 83, difficulty: 3,
      question: 'CSS 自定义属性（变量）如何在子元素中覆盖？',
      options: ['不能覆盖', '在更具体的选择器中重新定义 --变量名 即可。子元素继承父元素值但可用新值覆盖', '只能用 JS 修改', '需要 !important'],
      answer: 1,
      explanation: 'CSS 变量遵循继承和层叠规则。子元素可以重新定义同名变量覆盖继承值：:root {--color: blue} .card {--color: red}（后者生效）。组件级覆盖是 CSS 变量的核心优势之一。'
    },
    {
      id: 84, difficulty: 2,
      question: 'text-overflow:ellipsis 需要配合哪些属性才能生效？',
      options: ['单独使用即可', '需要 white-space:nowrap + overflow:hidden + 容器有固定宽度（或 max-width）', '需要 display:flex', '已废弃'],
      answer: 1,
      explanation: '单行省略三件套：1) white-space:nowrap（不换行）；2) overflow:hidden（溢出隐藏）；3) text-overflow:ellipsis（省略号）。缺一不可。多行省略需用 -webkit-line-clamp。'
    }
  );

  // Add level 4 "动画与变量"
  data.levels.push({
    level: 4,
    type: 'boss',
    threshold: 60,
    name: '动画与变量',
    questions: [
      {
        id: 85, difficulty: 2,
        question: 'CSS 变量（自定义属性）怎么定义和使用？',
        options: ['定义：--变量名:值；使用：var(--变量名)', '定义：$变量名:值；使用：$变量名', '定义：@变量名:值', 'CSS 不支持变量'],
        answer: 0,
        explanation: 'CSS 变量（Custom Properties）定义：--color-primary: #3b82f6；使用：color: var(--color-primary)。通常在 :root 中定义全局变量。var() 可接受第二个参数作为回退值：var(--color, red)。'
      },
      {
        id: 86, difficulty: 2,
        question: 'CSS 变量相比 Sass/Less 变量的核心优势？',
        options: ['完全相同', 'CSS 变量是浏览器原生支持，运行时动态变化（可被 JS 修改、media query 内重定义）；预处理器变量编译后固定', 'Sass 变量更好', 'CSS 变量不能用于 color'],
        answer: 1,
        explanation: 'CSS 变量最大优势：1) 运行时生效可通过 JS 动态修改（setProperty）；2) 响应式变化（@media 内可重新定义）；3) 继承+层叠（子元素覆盖）。Sass 变量编译后就"凝固"了。两者可配合使用。'
      },
      {
        id: 87, difficulty: 2,
        question: 'transition 和 animation 各自适用场景？',
        options: ['随便用', 'transition 适合简单 A→B 过渡（hover 变色、展开菜单）。animation 适合复杂多阶段动画（加载动画、循环效果）', '完全相同', 'transition 更好'],
        answer: 1,
        explanation: 'transition=被动触发（用户交互），简单两态过渡。animation=主动播放（页面加载即运行），可定义多个关键帧、循环、暂停。规则：简单交互用 transition，复杂叙事用 animation。'
      },
      {
        id: 88, difficulty: 2,
        question: 'transition 四个子属性的顺序是？',
        options: ['随便顺序', 'property duration timing-function delay。如 transition: opacity 0.3s ease 0.1s', 'duration property delay timing', '没有固定顺序'],
        answer: 1,
        explanation: 'transition 简写顺序：property → duration → timing-function → delay。duration 必须在前两个位置之一否则会被误认为 delay。多个过渡用逗号分隔：transition: opacity 0.3s, transform 0.5s。'
      },
      {
        id: 89, difficulty: 2,
        question: '@keyframes 中 from/to 和百分比写法有什么区别？',
        options: ['from=0% to=100%，百分比可定义任意阶段（0%,25%,50%,75%,100%）', '百分比更快', 'from/to 已废弃', '完全相同'],
        answer: 0,
        explanation: 'from=0%，to=100%，是百分比的语法糖。百分比写法更强大：可定义任意中间状态如 0%→25%→50%→75%→100%，每个节点设不同样式，实现复杂动画路径。'
      },
      {
        id: 90, difficulty: 3,
        question: 'animation-fill-mode: forwards 和 backwards 和 both 的区别？',
        options: ['完全相同', 'forwards 保留最后一帧 / backwards 动画前应用第一帧 / both=两者兼有', '只 forwards 有效', '已废弃'],
        answer: 1,
        explanation: 'none（默认）=动画前后都不保留关键帧样式。forwards=动画结束后保持最后一帧（常用！防止闪回）。backwards=动画延迟期间应用第一帧样式。both=forwards+backwards（最常用：开始时就用第一帧，结束时保持最后一帧）。'
      },
      {
        id: 91, difficulty: 3,
        question: 'animation-play-state 的实际应用场景？',
        options: ['没有实际用途', '暂停/播放动画。常用于：hover 时暂停轮播动画，或在 prefers-reduced-motion 时暂停所有动画', '只用于视频', '已废弃'],
        answer: 1,
        explanation: 'animation-play-state: paused/running。实用场景：1) 用户 hover 轮播/滚动动画时暂停（让用户看清内容）；2) 配合 prefers-reduced-motion 媒体查询，用户偏好减少动画时暂停。'
      },
      {
        id: 92, difficulty: 3,
        question: '@media (prefers-reduced-motion: reduce) 用途？',
        options: ['检测网速', '检测用户系统偏好（辅助功能中设置了"减少动效"），应禁用或简化不必要的动画', '检测屏幕尺寸', '已废弃'],
        answer: 1,
        explanation: '这是一项无障碍媒体查询。部分用户因前庭功能障碍对动画敏感会在系统设置中开启"减少动效"。开发者应响应此查询：关闭非必要动画、缩短过渡时间或只保留透明度变化。'
      },
      {
        id: 93, difficulty: 2,
        question: 'will-change 属性做什么？什么时候应该用？',
        options: ['改变元素内容', '提前告知浏览器该元素即将发生什么变化（如 transform），让浏览器提前优化（GPU 合成层）避免动画卡顿。仅在动画前临时设置', '改变所有属性', '已废弃'],
        answer: 1,
        explanation: 'will-change: transform/opacity 提前通知浏览器准备优化。注意：1) 不要给所有元素用（占用 GPU 内存）；2) 动画开始前添加、结束后移除；3) 不要作为"性能万能药"滥用——只对确实卡顿的动画用。'
      },
      {
        id: 94, difficulty: 3,
        question: '为什么推荐用 transform:translate() 代替 left/top 做位移动画？',
        options: ['完全相同', 'transform 触发 Composite（合成阶段，GPU），left/top 触发 Layout（重排，CPU）→transform 性能远超 left/top', 'left/top 更好', 'transform 已废弃'],
        answer: 1,
        explanation: '浏览器渲染流程：JS→Style→Layout（重排）→Paint（重绘）→Composite（合成）。left/top 从头触发全流程。transform/opacity 只触发 Composite（GPU 加速），跳过 Layout 和 Paint。做动画只改 transform 和 opacity 是性能黄金法则。'
      },
      {
        id: 95, difficulty: 2,
        question: 'CSS 中如何定义一个响应式的间距系统（用变量）？',
        options: ['用固定 px', ':root {--space-xs:0.25rem;--space-sm:0.5rem;--space-md:1rem;--space-lg:1.5rem;--space-xl:2rem} 配合媒体查询调整', '用百分比', 'CSS 做不到'],
        answer: 1,
        explanation: '使用 CSS 变量建立间距体系：在 :root 定义基础值，移动端媒体查询中缩小间距变量（--space-md 从 1rem 变 0.75rem）→所有使用该变量的元素自动适配，无需逐个修改。'
      },
      {
        id: 96, difficulty: 3,
        question: '如何用 CSS 变量实现暗色模式切换？',
        options: ['不可能', ':root 定义浅色变量 → [data-theme="dark"] 或 @media(prefers-color-scheme:dark) 中重新定义变量值 → 全站颜色自动切换', '需要 Sass', '需要 JS 全部重写'],
        answer: 1,
        explanation: 'CSS 变量是暗色模式最优雅的实现方式：:root{--bg:white;--text:black} → [data-theme="dark"]{--bg:#1a1a2e;--text:#e0e0e0}。所有元素使用 var(--bg) var(--text)→只需切换 data 属性即可全局换色。配合 JS 一行代码切换。'
      }
    ]
  });

  return data;
}

// ============================================================
// 4. css-layout.yaml
// ============================================================
function expandCssLayout(data) {
  // Add to level 1 (布局概念)
  data.levels[0].questions.push(
    {
      id: 101, difficulty: 1,
      question: 'block 元素和 inline 元素的核心区别？',
      options: ['完全相同', 'block 独占一行可设宽高（div/p/h1），inline 不换行宽高由内容决定不可设宽高（span/a）', 'inline 占更多空间', 'block 已废弃'],
      answer: 1,
      explanation: 'block：独占整行、可设 width/height/margin/padding（四向）。inline：不换行、width/height 无效、margin/padding 仅水平方向生效垂直方向不影响布局。inline-block 兼顾：不换行但可设宽高。'
    },
    {
      id: 102, difficulty: 1,
      question: 'float 布局现在还用吗？',
      options: ['是主流布局方式', '已基本被 Flexbox/Grid 取代。float 仅用于其原始目的：文字环绕图片', 'float 已废弃', 'float 最快'],
      answer: 1,
      explanation: 'float 设计初衷是文字环绕图片，后来被滥用于整体页面布局（清浮动、等高列等问题）。现代布局用 Flexbox（一维）和 Grid（二维），float 回归本职：图文混排。'
    },
    {
      id: 103, difficulty: 2,
      question: 'display:inline-block 和 display:inline-flex 区别？',
      options: ['完全相同', 'inline-block=自身是块级盒子但在行内排列。inline-flex=弹性容器在行内排列，内部子元素参与 flex 布局', 'inline-flex 已废弃', '无区别'],
      answer: 1,
      explanation: 'inline-block：元素自身不换行但内部按正常文档流排列。inline-flex：元素自身不换行（行内级弹性容器），内部子元素参与 flex 布局。同理由有 inline-grid。'
    }
  );

  // Add to level 2 (Flex/Grid)
  data.levels[1].questions.push(
    {
      id: 104, difficulty: 2,
      question: 'align-items 和 align-content 区别？（Flex/Grid 都适用）',
      options: ['完全相同', 'align-items 单行/单列内对齐；align-content 多行/多列的整体分布（需 flex-wrap:wrap 或多行 grid 才生效）', 'align-content 已废弃', '只用于 Grid'],
      answer: 1,
      explanation: 'align-items=交叉轴上每行/列内部的对齐（stretch/center/flex-start）。align-content=多行/列在交叉轴上的分布方式（space-between/center/stretch）。单行时 align-content 不生效。'
    },
    {
      id: 105, difficulty: 2,
      question: 'justify-self 和 align-self 的作用？在 Flex 和 Grid 中都生效吗？',
      options: ['都生效', 'align-self 在 Flex 和 Grid 都生效（覆盖父容器 align-items 对单个子元素的设置）。justify-self 仅在 Grid 中生效，Flex 中无效果', 'justify-self 都生效', '已废弃'],
      answer: 1,
      explanation: 'align-self 在 Flex 和 Grid 中都可单独控制某子元素的交叉轴对齐。justify-self 只在 Grid 中生效（控制某个 grid item 的主轴对齐），在 Flex 中无效（Flex 中主轴子项位置需用 margin:auto 技巧）。'
    },
    {
      id: 106, difficulty: 3,
      question: 'grid-template-areas 的用法？举例：header/sidebar+content/footer 三行布局。',
      options: ['head/content/foot', '用命名网格区域：grid-template-areas:"header header" "sidebar content" "footer footer" + grid-template-columns:200px 1fr + grid-template-rows:auto 1fr auto', '和 flex 一样', '已废弃'],
      answer: 1,
      explanation: 'grid-template-areas 用可视化 ASCII 方式定义布局，然后各元素用 grid-area:名称 归位。这是 Grid 最直观的特性：像在纸上画格子，所见即所得。'
    },
    {
      id: 107, difficulty: 2,
      question: 'place-items 和 place-content 是什么？',
      options: ['没有这些属性', 'place-items = align-items + justify-items 的简写。place-content = align-content + justify-content 的简写。如 place-items:center = 居中', '只用于 inline', '已废弃'],
      answer: 1,
      explanation: 'place-* 系列是简写属性：place-items、place-content、place-self。语法：place-items: <align-items> <justify-items>。只写一个值则两者同值。place-items:center 是快速居中技巧。'
    }
  );

  // Add to level 3 (响应式实战) - add more questions
  data.levels[2].questions.push(
    {
      id: 108, difficulty: 3,
      question: 'min-width 和 max-width 在响应式设计中各自的作用？',
      options: ['完全相同', 'max-width 限制最大宽度（防止大屏过宽）。min-width 确保最小宽度（小屏时配合滚动）。响应式中 max-width 更常用', '只用 min-width', '已废弃'],
      answer: 1,
      explanation: 'max-width 限制元素最大宽度（如文章正文 max-width:65ch 保持最佳阅读行长）。min-width 设定最小宽度。移动优先设计中常用 min-width 媒体查询（从小屏开始逐级增强）。'
    },
    {
      id: 109, difficulty: 3,
      question: '移动优先（Mobile First）设计策略是什么意思？CSS 怎么写？',
      options: ['先做桌面版', '基础 CSS 为移动端写（无媒体查询=默认移动布局），然后用 min-width 媒体查询逐级为更大屏幕添加增强样式', '只做手机', '先做平板'],
      answer: 1,
      explanation: '移动优先=默认样式是移动端布局（最简），用 @media(min-width:768px) 逐步添加平板样式，@media(min-width:1024px) 添加桌面增强。优点：代码更简洁、性能更好（移动端不加载桌面 CSS）、内容优先。'
    },
    {
      id: 110, difficulty: 3,
      question: 'clamp() 函数的作用？举例 clamp(1rem, 2vw, 2rem)。',
      options: ['取平均值', '设定最小值、首选值、最大值。clamp(1rem, 2vw, 2rem)=字体最小1rem，最大2rem，中间按视口2vw缩放但不超过上下限', '和 min() 相同', '已废弃'],
      answer: 1,
      explanation: 'clamp(MIN, VAL, MAX) 是 min/max 的组合：取 VAL 但限制在 MIN~MAX 之间。实现流畅的响应式排版无需媒体查询断点。配合 CSS 变量可打造完善的流畅排版系统。'
    }
  );

  // Add level 4 "响应式布局进阶"
  data.levels.push({
    level: 4,
    type: 'boss',
    threshold: 60,
    name: '响应式布局进阶',
    questions: [
      {
        id: 111, difficulty: 2,
        question: '@media 媒体查询常见断点有哪些？',
        options: ['只有 768px', '常见断点：576px（大手机）/ 768px（平板）/ 992px（小平板横屏）/ 1024px（桌面）/ 1200px（大桌面）/ 1400px（超大屏）。但应根据内容需求而非设备定义断点', '只有 1024px', '没有标准'],
        answer: 1,
        explanation: '断点应根据内容需要而非特定设备。"当布局开始变丑时"就是该加断点的时候。经典做法：先缩小浏览器窗口，当内容挤在一起/文字过长时在那里加断点。内容驱动断点 > 设备驱动断点。'
      },
      {
        id: 112, difficulty: 2,
        question: 'min-width 和 max-width 媒体查询分别对应什么设计策略？',
        options: ['完全相同', 'min-width=移动优先（从小屏向大屏增强）。max-width=桌面优先（从大屏向小屏降级）。推荐移动优先', 'max-width 更好', '只用一个'],
        answer: 1,
        explanation: '移动优先用 min-width：/* 基础=移动 */ → @media(min-width:768px){/* 平板增强 */} → @media(min-width:1024px){/* 桌面增强 */}。桌面优先用 max-width。移动优先代码更简洁且强制你设计核心内容。'
      },
      {
        id: 113, difficulty: 3,
        question: 'Container Queries（容器查询）和 Media Queries 有什么区别？',
        options: ['完全相同', 'Media Query 基于视口宽度。Container Query 基于父容器宽度→组件根据自身所在容器自适应而非整个页面宽度', 'Container Query 已废弃', '只用于 Firefox'],
        answer: 1,
        explanation: 'Container Queries（@container）是 CSS 新特性：@media(width<768px) 基于整个窗口；@container(min-width:300px) 基于某容器的宽度。这让组件独立响应式化——同一个卡片组件在侧边栏（窄）和主内容区（宽）自动展示不同布局。'
      },
      {
        id: 114, difficulty: 3,
        question: '如何启用 Container Queries？',
        options: ['直接用 @container', '先给容器设 container-type（inline-size/normal/size），再用 @container 查询。如：.card-container{container-type:inline-size} + @container(min-width:400px){...}', '不需要设置', '已废弃'],
        answer: 1,
        explanation: '两步：1) 容器定义 container-type:inline-size（只监听宽度）/ size（监听宽高）/ normal（不查询尺寸但可查询 style）；2) @container(min-width:400px){...} 写查询规则。还可命名容器：container-name:"card"，然后用 @container card(...) 精确查询。'
      },
      {
        id: 115, difficulty: 2,
        question: '<picture> 和 <img srcset> 在响应式图片中怎么用？',
        options: ['不可用', 'srcset 根据屏幕像素密度（1x/2x）或宽度自动切换不同分辨率图片。picture 基于媒体查询切换不同比例/裁切的图片（Art Direction 艺术指导）', '只用于视频', '已废弃'],
        answer: 1,
        explanation: 'srcset=同一图片不同分辨率（根据屏幕宽度或 DPR 切换）。picture>source media=不同裁切/构图的图片（如手机上方形图桌面宽图）。两者配合：手机加载小图+竖构图，桌面加载大图+横构图，节省带宽且展示最佳。'
      },
      {
        id: 116, difficulty: 2,
        question: '响应式字体大小怎么写？（三种方法）',
        options: ['只用 px', '1) clamp()+vw（流体排版）；2) 媒体查询断点；3) CSS 变量+媒体查询组合。如 font-size:clamp(0.875rem,0.8rem+0.5vw,1.25rem)', '只用 em', '不需要'],
        answer: 1,
        explanation: '三种方法：1) 流体排版 clamp()+vw（优雅流畅无断点）；2) 经典媒体查询（精确控制）；3) CSS 变量：:root{--fs-body:1rem} @media(...){:root{--fs-body:1.125rem}}（集中管理）。推荐用 clamp 或变量方案。'
      },
      {
        id: 117, difficulty: 3,
        question: 'aspect-ratio 属性解决了什么痛点？',
        options: ['没有痛点', '以前保持元素宽高比需用 padding-top 百分比 hack（padding-top:56.25%=16:9）。aspect-ratio:16/9 直接声明比例，浏览器自动计算高度', '设置颜色', '已废弃'],
        answer: 1,
        explanation: 'aspect-ratio 是现代 CSS 最受欢迎的特性之一。以前保持 16:9 视频容器需设 padding-top:56.25% 这种魔法数字 hack。现在直接 aspect-ratio:16/9（或 1/1、4/3），浏览器自动处理。配合 img 时建议加 object-fit:cover。'
      },
      {
        id: 118, difficulty: 2,
        question: 'dvh/svh/lvh 和 vh 有什么区别？',
        options: ['完全相同', 'vh 是视口高度的 1%（含地址栏但移动端地址栏收放导致跳动）。dvh=动态视口高度（地址栏收放时实时变化）。svh=最小视口（地址栏展开时）。lvh=最大视口（地址栏收起时）', 'vh 已废弃', '只 iOS 支持'],
        answer: 1,
        explanation: '移动端 100vh 经典问题：地址栏展开/收起时视口高度变化导致页面跳动。dvh（dynamic）动态跟随变化。svh（small）假设地址栏展开。lvh（large）假设地址栏收起。全屏英雄区用 dvh/svh 避免内容被截。'
      },
      {
        id: 119, difficulty: 3,
        question: '常见响应式布局模式？网格→堆叠模式怎么做？',
        options: ['只堆叠', '桌面：grid-template-columns:repeat(3,1fr)（三列网格）。平板：repeat(2,1fr)（两列）。手机：1fr（单列堆叠）。用 auto-fill+minmax 更智能：repeat(auto-fill,minmax(250px,1fr)) 自动计算列数', '用 position:absolute', '响应式不需要'],
        answer: 1,
        explanation: '最优雅的方案是 repeat(auto-fill, minmax(250px, 1fr))：每个格子最小 250px，空间不够自动折行，无需手动写断点。这个一行代码的自适应网格是 Grid 最强大的特性之一。'
      },
      {
        id: 120, difficulty: 2,
        question: '响应式设计中"内容决定断点"是什么意思？',
        options: ['不知道', '不按 iPhone/iPad 等特定设备设断点，而是不断缩小浏览器窗口，当内容溢出/换行异常/需要调整布局时才在那里加断点。断点服务于内容而非设备', '按设备设置', '断点不重要'],
        answer: 1,
        explanation: '实践做法：打开 DevTools 响应式模式，从桌面宽度慢慢缩小。当某组件开始"挤压"或文字变得过长时→记录此时宽度→这就是一个断点。每个项目断点不同因为内容不同。'
      },
      {
        id: 121, difficulty: 3,
        question: '如何实现一个响应式导航菜单（桌面横向，手机汉堡菜单）？核心 CSS 思路？',
        options: ['两种 HTML', '桌面：flex 横向排列 + 所有链接可见。手机：display:none 隐藏链接 + 汉堡按钮 visible + 点击展开（可用 checkbox hack 或少量 JS）。切换由媒体查询控制', '只用 JS', '不可能用 CSS'],
        answer: 1,
        explanation: '纯 CSS 思路：@media(max-width:768px){nav ul{display:none;flex-direction:column} #menu-toggle:checked~ul{display:flex}}。桌面端 nav ul 默认 flex 横向。关键：HTML 结构一套，CSS 控制两种布局的显示/隐藏和方向切换。'
      }
    ]
  });

  return data;
}

// ============================================================
// 5. web-foundation.yaml
// ============================================================
function expandWebFoundation(data) {
  // This file has only 1 level (初级大决战). Add more questions to it.
  data.levels[0].questions.push(
    {
      id: 171, difficulty: 3,
      question: 'HTTP 和 HTTPS 的核心区别？为什么 HTTPS 重要？',
      options: ['HTTPS 更快', 'HTTPS 在 HTTP 基础上加 TLS/SSL 加密→数据在传输过程中加密不可被窃听或篡改。浏览器标记 HTTP 为"不安全"', '完全相同', 'HTTPS 只用于银行'],
      answer: 1,
      explanation: 'HTTPS=HTTP+TLS加密。三个核心保障：1) 加密（防窃听）；2) 完整性（防篡改）；3) 身份验证（防冒充）。现代浏览器对 HTTP 页面显示"不安全"警告，且许多 Web API（如 Geolocation、Service Worker）仅在 HTTPS 下可用。'
    },
    {
      id: 172, difficulty: 2,
      question: 'DNS 是什么？输入网址到看到页面经历了什么？（简述）',
      options: ['不需要知道', 'DNS 域名解析（域名→IP地址）→TCP 连接→TLS 握手（HTTPS）→发送 HTTP 请求→服务器响应 HTML→浏览器解析渲染。DNS 相当于互联网的电话本', '只涉及 HTTP', 'DNS 已过时'],
      answer: 1,
      explanation: '完整流程：1) DNS 查询（域名→IP）；2) TCP 三次握手建立连接；3) TLS 握手（HTTPS加密）；4) HTTP 请求→服务器处理→响应；5) 浏览器解析 HTML→构建 DOM 树→CSSOM 树→渲染树→布局→绘制。每一步都可能成为性能瓶颈。'
    },
    {
      id: 173, difficulty: 2,
      question: '浏览器如何渲染一个页面？简述关键渲染路径。',
      options: ['直接显示', 'HTML→DOM树 + CSS→CSSOM树 + JavaScript执行 → 合并为渲染树(Render Tree) → 布局(Layout/Reflow)计算位置 → 绘制(Paint)填充像素 → 合成(Composite)显示到屏幕', '只需一步', 'JS 先执行'],
      answer: 1,
      explanation: '关键渲染路径（CRP）：1) 解析 HTML 构建 DOM；2) 解析 CSS 构建 CSSOM；3) 两者合并为 Render Tree；4) Layout 计算每个元素的几何位置和大小；5) Paint 将每个像素填充到图层；6) Composite 将图层合并显示。优化 CRP 是性能核心。'
    },
    {
      id: 174, difficulty: 3,
      question: '什么是回流（Reflow）和重绘（Repaint）？哪个开销更大？',
      options: ['完全相同', '回流（Reflow）=元素尺寸/位置/布局改变需要重新计算（开销巨大）。重绘（Repaint）=仅颜色/背景等视觉改变不涉及布局（开销较小）。回流必然触发重绘。', '重绘开销更大', '不需要关心'],
      answer: 1,
      explanation: '回流：修改 width/height/padding/margin/position/display → 重新计算布局→影响大量元素→最昂贵。重绘：修改 color/background/box-shadow → 只重画像素→较便宜。合成：transform/opacity → 只 GPU 合并图层→最便宜。动画只应修改 transform 和 opacity。'
    },
    {
      id: 175, difficulty: 2,
      question: '<script> 加 defer 和 async 的区别？',
      options: ['完全相同', '都异步下载不阻塞 HTML 解析。defer 等 DOM 解析完再按顺序执行（推荐）。async 下载完立即执行（顺序不确定）适合独立脚本', 'defer 阻塞解析', 'async 按顺序执行'],
      answer: 1,
      explanation: '默认 script 同步阻塞→下载+执行都阻塞 HTML 解析。defer：异步下载，HTML 解析完（DOMContentLoaded 前）按文档顺序执行→最常用。async：异步下载，下载完立即执行不保证顺序→适合独立第三方脚本（如统计代码）。type="module" 默认 defer 行为。'
    },
    {
      id: 176, difficulty: 3,
      question: 'CSS 放在 <head> 和 JS 放在 </body> 前的原因？（从渲染角度解释）',
      options: ['随意放', 'CSS 放 head：尽早加载解析构建 CSSOM，避免"无样式内容闪烁"（FOUC）。JS 放 body 底部：等 DOM 构建完成再执行，避免操作尚不存在的 DOM 元素且不阻塞首次渲染', 'CSS 放底部', 'JS 必须在 head'],
      answer: 1,
      explanation: 'CSS 放 <head>：浏览器尽快获取 CSS 构建 CSSOM，否则渲染树无法构建→白屏或 FOUC（先显示无样式内容再闪变）。JS 放 </body> 前：此时 DOM 已构建完→JS 可安全操作 DOM；且不阻塞首屏渲染→用户更快看到页面。'
    },
    {
      id: 177, difficulty: 2,
      question: '浏览器的同源策略（Same-Origin Policy）是什么？',
      options: ['同网站策略', '协议+域名+端口三者完全相同才算"同源"。不同源的页面不能读取对方的 DOM/Cookie/localStorage 等→防止恶意网站窃取信息', '只检查域名', '已废弃'],
      answer: 1,
      explanation: '同源=协议(https)+域名(example.com)+端口(443)三者都相同。同源策略限制：不同源的 JS 不能读对方页面的数据（DOM/Cookie/Storage），但可发送请求（需服务端 CORS 允许）。这是 Web 安全基石。'
    },
    {
      id: 178, difficulty: 3,
      question: '浏览器的缓存策略有哪些？强缓存和协商缓存的区别？',
      options: ['没有缓存', '强缓存(Cache-Control/Expires)：缓存期内直接使用不发请求(200 from disk cache)。协商缓存(ETag/Last-Modified)：发请求问服务器资源变了没，304 未修改用缓存，200 返回新内容', '只有一种缓存', '缓存不重要'],
      answer: 1,
      explanation: '强缓存：Cache-Control:max-age=3600（3600秒内直接用本地缓存不发请求）。协商缓存：ETag（文件指纹）+ If-None-Match 或 Last-Modified + If-Modified-Since → 服务器回复 304 Not Modified 用缓存或 200 返回新文件。合理缓存策略是性能优化最重要的一步。'
    },
    {
      id: 179, difficulty: 3,
      question: 'DOMContentLoaded 和 load 事件的区别？',
      options: ['完全相同', 'DOMContentLoaded=HTML 解析完成 DOM 构建完毕（CSS/图片可能未加载完）。load=所有资源（图片/CSS/JS/字体）全部加载完成', 'load 更早', '没区别'],
      answer: 1,
      explanation: 'DOMContentLoaded：HTML 已完全解析，DOM 可操作了（但图片可能还在加载）。适合：初始化 JS 交互。load：页面完全加载包括所有图片/样式/iframe。适合：需要图片尺寸的场景。实际开发中 DOMContentLoaded 更常用。'
    }
  );

  // Add level 2 "浏览器原理"
  data.levels.push({
    level: 2,
    type: 'boss',
    threshold: 65,
    name: '浏览器原理',
    questions: [
      {
        id: 180, difficulty: 2,
        question: '浏览器是多进程还是多线程架构？主要有哪些进程？',
        options: ['单进程', '多进程架构。主要进程：浏览器进程（UI）、渲染进程（每个标签页一个，沙箱隔离）、GPU 进程、网络进程、插件进程。一个标签页崩溃不影响其他标签页', '单线程', '只有两个进程'],
        answer: 1,
        explanation: 'Chrome 多进程架构：1) 浏览器进程（地址栏/书签/前进后退）；2) 渲染进程（每个标签页独立，负责 HTML/CSS/JS 渲染，沙箱隔离→一个标签崩溃不影响其他）；3) GPU 进程（3D 绘制）；4) 网络进程（资源加载）；5) 插件进程。'
      },
      {
        id: 181, difficulty: 2,
        question: 'JavaScript 是单线程的吗？为什么这样设计？',
        options: ['多线程', 'JS 主线程是单线程（一个时间只做一件事）。设计原因：避免多线程同时操作 DOM 导致的竞态条件（谁先改？怎么合并？）。通过事件循环（Event Loop）+ 异步任务实现并发', '无法回答', 'JS 可以多线程操作 DOM'],
        answer: 1,
        explanation: 'JS 单线程简化编程模型（不用处理多线程同步问题）。但单线程不够用→引入事件循环（Event Loop）：同步代码在主线程执行，异步任务（定时器/网络请求/事件）在任务队列等待，主线程空闲时取出执行。Web Worker 可开子线程但不共享 DOM。'
      },
      {
        id: 182, difficulty: 3,
        question: '浏览器的 Event Loop（事件循环）机制简述？',
        options: ['不需要知道', '主线程执行栈 → 遇到异步任务交给 Web API → 异步完成后回调进入任务队列（宏任务队列/微任务队列）→ 主线程清空执行栈 → 先清空微任务队列（Promise.then）→ 再取一个宏任务（setTimeout/setInterval）→ 循环', '只在 Node.js 有', '已过时'],
        answer: 1,
        explanation: '执行顺序：同步代码 → 微任务（Promise.then, MutationObserver, queueMicrotask）→ 渲染 → 宏任务（setTimeout, setInterval, I/O, UI事件）。关键：每个宏任务执行完都要清空微任务队列。这就是为什么 Promise.then 比 setTimeout 0 先执行。'
      },
      {
        id: 183, difficulty: 3,
        question: '如何减少回流（Reflow）？举几种方法。',
        options: ['无法避免', '1) 批量修改 DOM（用 DocumentFragment 或 display:none 修改完再显示）；2) 避免逐个读取布局属性（读写分离）；3) 用 transform 代替 left/top；4) 动画用 requestAnimationFrame；5) 用 CSS class 代替逐个 style 修改', '回流无法优化', '用更多 JS'],
        answer: 1,
        explanation: '减少回流的最佳实践：1) 批量 DOM 操作（DocumentFragment/cloneNode）；2) 读写分离：先一次性读完所有布局属性，再一次性修改，避免强制同步布局（Forced Synchronous Layout）；3) 涉及动画的属性只用 transform/opacity；4) 用 will-change 提前通知浏览器。'
      },
      {
        id: 184, difficulty: 2,
        question: '浏览器的渲染进程内部有哪些线程？',
        options: ['只有一个线程', '主线程（JS执行+样式计算+布局+绘制）、合成线程（GPU 合成图层）、光栅化线程（将绘制指令转为位图）。主线程最繁忙→优化以减少主线程工作量为主', '没有线程', '线程随意'],
        answer: 1,
        explanation: '渲染进程内部：1) 主线程：运行 JS → 计算样式 → 布局 → 绘制 → 合成帧 → 交给合成器线程；2) 合成器线程：将图层分块交给光栅化线程 → 组装图层帧 → 提交给 GPU；3) 光栅化线程池。长时间 JS 执行会阻塞主线程→页面卡顿。'
      },
      {
        id: 185, difficulty: 3,
        question: '什么是强制同步布局（Forced Synchronous Layout）？如何避免？',
        options: ['特殊布局', '先读布局属性(offsetHeight)→立即修改样式→浏览器必须同步计算布局才能返回正确的读取值→性能杀手。避免：先批量读取所有布局值，再批量写样式（读写分离）', '一种布局算法', '不需要避免'],
        answer: 1,
        explanation: '强制同步布局=读→写→读的顺序问题。如：el.style.width="100px"; console.log(el.offsetHeight); el.style.height="50px"; console.log(el.offsetWidth)。每次读取都迫使浏览器立即重新布局。解决方案：FastDOM 库或手动"先批量读完→再批量写"。'
      },
      {
        id: 186, difficulty: 2,
        question: '浏览器的图层（Layer）概念？哪些操作会创建新图层？',
        options: ['没有图层', '浏览器将页面分解为多个图层→独立绘制→GPU 合成。创建新图层：3D transform、video/canvas、will-change、CSS 动画/过渡的 opacity/transform、iframe。过多图层→内存开销大', '图层有百害无一利', '只 Chrome 支持'],
        answer: 1,
        explanation: '图层=独立的绘制单元。优势：图层变化只需重新合成无需重绘整个页面。触发新图层：1) 3D transform(translateZ(0))；2) <video>/<canvas>；3) will-change；4) CSS 动画的 transform/opacity。注意：图层不是越多越好→每层消耗 GPU 内存。'
      },
      {
        id: 187, difficulty: 3,
        question: '浏览器的垃圾回收（GC）机制基本原理？内存泄漏常见原因？',
        options: ['自动不需要关心', '标记清除法：从根对象(全局/window)出发标记所有可达对象→清除不可达的。常见内存泄漏：1) 全局变量忘记清理；2) 定时器/事件监听未清除；3) 闭包引用；4) 已移除 DOM 的引用（Detached DOM）', 'JS 没有 GC', '内存泄漏不影响'],
        answer: 1,
        explanation: '浏览器使用标记-清除（Mark and Sweep）GC：定期从根对象遍历所有引用→标记可达对象→清除未标记的。常见泄漏：1) 全局意外变量（未用 var/let/const）；2) setInterval 忘记 clearInterval；3) addEventListener 未 remove；4) 闭包持有大对象引用；5) DOM 移除了但 JS 变量仍引用它。'
      },
      {
        id: 188, difficulty: 2,
        question: '浏览器的跨域（CORS）是什么？怎么解决跨域问题？',
        options: ['不允许跨域', 'CORS（跨域资源共享）：浏览器安全机制限制跨域请求。解决方案：1) 服务端设 Access-Control-Allow-Origin 响应头(主流)；2) JSONP（仅 GET 老方案）；3) 代理服务器（开发环境 proxy）；4) WebSocket（不受同源限制）', '跨域是 bug', '只能同域'],
        answer: 1,
        explanation: '跨域=协议/域名/端口任一不同。浏览器为安全限制跨域请求读取响应（请求可能发送了但响应被阻止）。解决：1) 服务端设 CORS 头（最标准）；2) 开发时用 Vite/Webpack Proxy 代理；3) 生产环境 Nginx 反向代理；4) 纯展示用 img/script/link 标签不受跨域限制。'
      },
      {
        id: 189, difficulty: 3,
        question: '如何用 Chrome DevTools Performance 面板分析页面性能？',
        options: ['不需要', '录制页面加载或操作→查看火焰图分析：1) 看 Summary 饼图（Scripting/Rendering/Painting 占比）；2) 找长任务（Long Tasks>50ms 红色标记）；3) 检查 Layout 强制回流（紫色条）；4) 看 FPS 帧率是否达 60fps', 'DevTools 没用', '只用 Lighthouse'],
        answer: 1,
        explanation: 'Performance 面板使用流程：1) 点击录制→操作页面→停止；2) 看火焰图（Call Tree）自下而上找耗时函数；3) 检查 Summary 四个耗时类型占比；4) 关注红色三角标记的长任务；5) 紫色=回流、绿色=重绘→减少这些；6) GPU 帧率条看是否掉帧。配合 Lighthouse 审计更全面。'
      },
      {
        id: 190, difficulty: 2,
        question: '浏览器缓存位置：Service Worker、Memory Cache、Disk Cache、Push Cache 区别？',
        options: ['完全一样', 'Service Worker（最上层，开发者控制）+ Memory Cache（内存，当前标签页，关闭清除）+ Disk Cache（硬盘，持久化跨会话）+ Push Cache（HTTP/2 Server Push，会话级）', '只有 Disk Cache', 'Memory Cache 持久'],
        answer: 1,
        explanation: '缓存优先级（从高到低）：1) Service Worker（开发者完全控制，可离线）；2) Memory Cache（内存中，速度最快但标签关闭释放）；3) Disk Cache（硬盘持久化，HTTP 缓存头控制）；4) Push Cache（HTTP/2 推送专用，会话结束释放）。SW+disk 是最常打交道的两级。'
      }
    ]
  });

  return data;
}

// ============================================================
// 6. a11y.yaml
// ============================================================
function expandA11y(data) {
  // Add to level 1 (WCAG 概念)
  data.levels[0].questions.push(
    {
      id: 391, difficulty: 1,
      question: 'WCAG 2.1 有三个符合级别 A / AA / AAA，分别代表什么？',
      options: ['分数等级', 'A=最低要求（否则部分用户无法访问）。AA=推荐标准（大多数无障碍法规要求，如 WCAG 2.1 AA）。AAA=最高标准（最难达到，不是所有内容都需要）', 'AAA 最简单', '只有 AA 有效'],
      answer: 1,
      explanation: 'A=基础无障碍（如非文本内容有替代文本）。AA=全球公认标准（法律诉讼和多数法规以此为基准，如对比度 4.5:1）。AAA=最高级别（如对比度 7:1、手语翻译等）→理想但不必所有内容强制。目标：满足 AA 并尽可能达到部分 AAA。'
    },
    {
      id: 392, difficulty: 1,
      question: '为什么"跳过导航"（Skip to Content）链接对键盘用户重要？',
      options: ['不重要', '键盘用户每次访问新页面都需要 Tab 通过所有导航链接才能到达正文→极其耗时。跳过导航链接让用户直接跳到主要内容区域', '只用于移动端', '自动生效'],
      answer: 1,
      explanation: '视障/键盘用户每访问一个新页面要从头 Tab 过数十个导航链接→数十次按键后才能看到正文。Skip Link=页面第一个可聚焦元素，点击跳转到 main 内容区。实现：<a href="#main-content" class="skip-link">跳到内容</a>，目标区加 id="main-content"。'
    },
    {
      id: 393, difficulty: 2,
      question: 'WCAG 的"可操作"原则包含哪些具体要求？',
      options: ['只键盘', '1) 所有功能可通过键盘操作；2) 给用户足够时间阅读和使用内容；3) 不设计会导致癫痫发作的内容（闪烁≤3次/秒）；4) 帮助用户导航、找到内容、知道当前位置；5) 除键盘外支持其他输入方式（触摸、语音等）', '只鼠标', '可操作=power'],
      answer: 1,
      explanation: '可操作（Operable）=四个准则：1) 键盘可访问（所有交互不用鼠标也能完成）；2) 充足时间（可调整时限、暂停滚动）；3) 防癫痫（不设计>3次/秒闪烁）；4) 可导航（有方法知道"我在哪""我能去哪"如面包屑、清晰标题、多个导航方式）。'
    }
  );

  // Add to level 2 (ARIA 与语义)
  data.levels[1].questions.push(
    {
      id: 394, difficulty: 2,
      question: 'role 属性有哪些常用的 Landmark（地标）角色？',
      options: ['没有', 'banner（页头）/ navigation（导航）/ main（主要内容）/ complementary（侧边栏）/ contentinfo（页脚）/ search（搜索）/ form（表单）/ region（通用区域）', '只有 button', 'role 已废弃'],
      answer: 1,
      explanation: 'Landmark roles 帮助屏幕阅读器快速跳转：role="banner"=页头（通常<header>）、role="navigation"（<nav>）、role="main"（<main>）、role="complementary"=侧边栏（<aside>）、role="contentinfo"=页脚（<footer>）。用原生语义标签时会自动获得这些 role 无需手动添加。'
    },
    {
      id: 395, difficulty: 2,
      question: 'aria-expanded、aria-pressed、aria-current 各自什么场景使用？',
      options: ['不需要', 'aria-expanded="true/false" 用于展开/折叠元素（菜单、手风琴）。aria-pressed="true/false" 用于切换按钮（如加粗按钮）。aria-current="page" 标记当前导航页（面包屑/分页）', '全部相同', '已废弃'],
      answer: 1,
      explanation: '三个常用状态 ARIA：1) aria-expanded 用于可展开组件（下拉菜单/FAQ折叠→告诉阅读器当前是开是关）；2) aria-pressed 用于切换按钮（toggle button 如文字加粗按钮 On/Off 状态）；3) aria-current 标示当前位置（导航当前页、面包屑当前级、步骤条当前步）。'
    },
    {
      id: 396, difficulty: 3,
      question: 'aria-hidden="true" 做什么？和 display:none 的区别？',
      options: ['完全相同', 'aria-hidden="true" 仅对屏幕阅读器隐藏（视觉上仍可见）。display:none 对视觉和阅读器都隐藏。aria-hidden 用于：纯装饰性图标、重复内容、modal 背景等。视觉可见但阅读器应忽略的内容', 'aria-hidden 隐藏元素', '两者相同'],
      answer: 1,
      explanation: 'aria-hidden="true"=告诉屏幕阅读器忽略此元素（但视觉上仍显示）。display:none=视觉隐藏+阅读器跳过。典型场景：1) 装饰图标（图标字体旁边已有文字说明→图标应 aria-hidden）；2) Modal 打开时背景内容应 aria-hidden="true" 避免阅读器读到后方内容。'
    },
    {
      id: 397, difficulty: 3,
      question: 'aria-live 区域如何使用？polite 和 assertive 区别？',
      options: ['不需要', 'aria-live="polite"=等屏幕阅读器说完当前内容再播报（适合状态更新）。aria-live="assertive"=立即打断播报（适合紧急错误通知）。配合 aria-atomic="true" 播报整个区域而非仅变化部分', 'assive 已废弃', '只用于输入框'],
      answer: 1,
      explanation: 'aria-live 让动态内容变化被阅读器自动播报。polite=等待用户空闲时播报→适合：搜索结果更新、购物车数量变化。assertive=立即打断→适合：表单提交失败、会话即将过期等紧急通知。aria-atomic=true=播报整个区域内容而非只变化部分。role="alert"=隐式 aria-live="assertive"+aria-atomic="true"。'
    }
  );

  // Add to level 3 (实践检测) - add more
  data.levels[2].questions.push(
    {
      id: 398, difficulty: 3,
      question: '关于 ARIA 的"命名计算"（Accessible Name Computation），以下哪项理解正确？',
      options: ['不重要', '元素的"无障碍名称"有优先级：aria-labelledby > aria-label > 原生标签机制(label for/id) > title > placeholder。阅读器读出的名字来自这个计算链', '任何属性都行', '只看 aria-label'],
      answer: 1,
      explanation: '无障碍名称（Accessible Name）决定了屏幕阅读器"叫这个元素什么"。优先级：1) aria-labelledby（引用其他元素文字，最高）；2) aria-label（直接写在元素上）；3) 原生机制（<label for>关联、alt 属性、按钮内文字）；4) title 属性（最低、最不可靠）。placeholder 不应作为唯一标签来源。'
    },
    {
      id: 399, difficulty: 3,
      question: '前端如何测试无障碍？（选不合适的做法）',
      options: ['只用颜色区分错误（如红框标记必填字段）是最不合适的做法', '使用 axe DevTools / Lighthouse 自动检测 + 手动键盘 Tab 测试 + 屏幕阅读器(NVDA/VoiceOver)手动测试', '检查颜色对比度', '测试键盘完整操作流程'],
      answer: 0,
      explanation: '只用颜色传达信息是无障碍大忌→色盲用户无法区分。正确测试流程：1) 自动检测（axe DevTools / Lighthouse）→覆盖 ~30% 问题；2) 键盘全流程测试（Tab/Enter/Esc/方向键）；3) 屏幕阅读器实测（免费 NVDA for Windows / VoiceOver for Mac）；4) 颜色对比度检查工具。'
    },
    {
      id: 400, difficulty: 3,
      question: '以下 HTML 有什么问题：<span class="btn" onclick="submit()">提交</span>？',
      options: ['完全没问题', '用 span 做按钮→键盘无法聚焦（tabindex 缺失）、Enter/Space 不触发、屏幕阅读器不识别为按钮。应该用 <button type="submit"> 获得原生键盘+语义支持', '缺少颜色', '只要 onclick 就行'],
      answer: 1,
      explanation: 'div/span 做按钮是无障碍"重灾区"：1) 不可聚焦（需添加 tabindex="0"）；2) Enter/Space 键不触发（需手动监听 keydown）；3) 阅读器读作"点击此处"不知道是按钮（需 role="button"）；4) 提交表单无效。原生 <button> 自动获得全部→始终优先用原生标签。'
    }
  );

  // Add level 4 "ARIA与实战"
  data.levels.push({
    level: 4,
    type: 'boss',
    threshold: 60,
    name: 'ARIA与实战',
    questions: [
      {
        id: 401, difficulty: 2,
        question: '屏幕阅读器（如 NVDA/VoiceOver）是如何"阅读"网页的？',
        options: ['读源代码', '基于无障碍树（Accessibility Tree）→浏览器从 DOM 构建一棵简化的语义树，阅读器遍历这棵树逐元素读出名称、角色、状态、值。语义化的 HTML 产出更准确的树', '读 CSS', '随机朗读'],
        answer: 1,
        explanation: '浏览器为每个页面构建无障碍树（Accessibility Tree）=DOM 的语义化简化版（类似 DOM 的影子版本）。阅读器导航这棵树：读出元素角色（按钮/链接/标题）+名称（标签/文字）+状态（已展开/已选中）+值（输入框内容）。语义化 HTML 产出准确的树，div+ARIA 容易漏→No ARIA is better than bad ARIA。'
      },
      {
        id: 402, difficulty: 2,
        question: 'WAI-ARIA 的五个规则中最重要的是哪条？为什么？',
        options: ['随便用 ARIA', '第一条最重要：能用原生 HTML 就不用 ARIA。因为原生标签免费赠送键盘交互+语义角色+状态管理，ARIA 只是"补充剂"不是"替代品"', '所有规则平等', 'ARIA 规则不重要'],
        answer: 1,
        explanation: 'ARIA 五规则：1) 优先用原生 HTML（最重要！）；2) 不要改变原生语义除非必须；3) 所有交互元素必须键盘可操作；4) 不要对可聚焦元素用 role="presentation" 或 aria-hidden="true"；5) 所有交互元素必须有可访问名称。规则1核心："ARIA 是拐杖不是翅膀"。'
      },
      {
        id: 403, difficulty: 3,
        question: '用 div 模拟一个自定义 Select 组件，需要添加哪些 ARIA 属性？（最少集合）',
        options: ['只要 role="listbox"', 'role="combobox" + aria-expanded + aria-haspopup="listbox" + aria-controls + aria-activedescendant（或 roving tabindex 管理选项） + 每个 option 设 role="option" + aria-selected', '只要 tabindex', '不需要 ARIA'],
        answer: 1,
        explanation: '自定义 Select 的 ARIA 清单：1) 触发器 role="combobox"；2) aria-expanded 表示弹出状态；3) aria-haspopup="listbox"；4) aria-controls 指向弹出列表 ID；5) 弹出列表 role="listbox"；6) 选项 role="option"+aria-selected；7) 键盘管理（上下键/Enter/Esc）。如此复杂的 ARIA→强烈建议直接使用原生 <select>。'
      },
      {
        id: 404, difficulty: 3,
        question: '表单错误信息的无障碍最佳实践？',
        options: ['用红色文字', '1) 错误信息和字段关联 aria-describedby；2) 错误列表放在表单顶部并设 role="alert"+tabindex="-1" 聚焦；3) 字段设 aria-invalid="true"；4) 错误信息文字具体（"邮箱格式不正确"而非"输入错误"）', '不需要处理', '只用 placeholder'],
        answer: 1,
        explanation: '表单错误无障碍完整方案：1) aria-describedby="email-error" 关联错误信息到输入框→聚焦输入框时阅读器播报错误；2) 表单顶部错误摘要 role="alert"（自动播报）；3) aria-invalid="true" 标记无效字段；4) 错误信息具体、有帮助（"密码需要至少8个字符"不是"格式错误"）；5) 视觉提示不只用颜色（红色框+错误图标+文字）。'
      },
      {
        id: 405, difficulty: 2,
        question: '焦点管理（Focus Management）在 SPA（单页应用）中的重要性？',
        options: ['不重要', 'SPA 页面切换无整页刷新→路由变化后焦点仍停留在原位置→阅读器/键盘用户不知道页面已变化。需手动将焦点移到新页面标题或主要内容区', '自动处理', '只影响键盘'],
        answer: 1,
        explanation: 'SPA 路由切换不会触发浏览器默认的"新页面焦点重置"。解决方案：路由变化后 → 1) 将焦点发送到新页面的 h1 或 main 容器（需 tabindex="-1" 使其可编程聚焦但不参与 Tab 顺序）；2) 更新 document.title；3) 如果原触发元素在 DOM 中已不存在→焦点跳到 body。'
      },
      {
        id: 406, difficulty: 3,
        question: '如何测试屏幕阅读器的实际效果？推荐工具？',
        options: ['无法测试', 'Windows：NVDA（免费开源最常用）+ Firefox/Chrome。Mac/iOS：VoiceOver（内置 Cmd+F5 开启）。操作：Tab/方向键导航→听播报内容→验证语义正确。同时用 Chrome DevTools 无障碍面板查看无障碍树', '只需 Lighthouse', '只需要自动测试'],
        answer: 1,
        explanation: '推荐测试流程：1) 自动工具（axe DevTools 浏览器扩展+Lighthouse）→快速发现 30-40% 问题；2) 键盘手动测试（Tab/Shift+Tab/Enter/Esc/方向键完整流程）；3) 屏幕阅读器实测（NVDA 免费 for Windows/Cmd+F5 开启 VoiceOver for Mac）；4) DevTools 无障碍面板（Elements>Accessibility 查看每个元素的无障碍属性）。自动工具无法替代手动测试。'
      },
      {
        id: 407, difficulty: 2,
        question: '什么是焦点陷阱（Focus Trap）？何时需要？',
        options: ['永远不需要', '焦点陷阱=Tab 键在某个容器内循环无法跳出（Modal/对话框/下拉菜单打开时）。需要时：Modal 打开时焦点应在 Modal 内循环→防止键盘用户 Tab 到背景内容。关闭时释放焦点回触发按钮', 'Bug 需要修复', '只在表单中'],
        answer: 1,
        explanation: 'Modal 对话框核心无障碍特性：打开时焦点移入→Tab 在 Modal 内循环（第一个→最后一个→第一个）→Shift+Tab 反向→Esc 关闭→焦点回到触发按钮。实现要点：查询所有可聚焦子元素、监听 keydown Tab、首尾元素间循环。有现成库（如 focus-trap、@reach/dialog）但了解原理重要。'
      },
      {
        id: 408, difficulty: 3,
        question: '关于无障碍的常见误区，哪个说法是正确的？',
        options: ['无障碍只对盲人有用', '无障碍覆盖多类残障：视觉（盲/低视力/色盲）、听觉（聋/重听）、运动（无法使用鼠标/精细动作困难）、认知（阅读障碍/注意力障碍/记忆力障碍）。约15%人口有某种形式的残障，但无障碍实际上改善所有人的体验', '无障碍让网站变丑', '无障碍只需 alt 属性'],
        answer: 1,
        explanation: '无障碍（a11y）覆盖广泛：1) 视觉障碍（屏幕阅读器/放大/高对比度）；2) 听觉障碍（字幕/文字替代音频）；3) 运动障碍（键盘/语音/开关输入）；4) 认知障碍（清晰布局/简单语言/一致性）。临时性障碍（手臂骨折）和情境限制（阳光下看不清屏幕/嘈杂环境听不到音频）也受益。设计 for 极端→改善所有体验。'
      },
      {
        id: 409, difficulty: 2,
        question: '图片的 alt 文本应该怎么写？描述性、装饰性、信息性图片有何不同？',
        options: ['只写"图片"', '信息性图片（传达内容）：描述图片传达的信息而非外观（"柱状图显示2024年销售额增长20%"）。装饰性图片（纯视觉装饰）：alt=""（空字符串）让阅读器跳过。功能性图片（链接/按钮内图片）：描述功能（"返回首页"）', '全部 alt=""', 'alt 不重要'],
        answer: 1,
        explanation: 'alt 文本写得好=替代图片传达同样信息。信息性图片：描述图中"什么信息"而非"图长什么样"。装饰性图片：alt=""（null，不是空格！）让阅读器跳过。功能性图片（如 logo 链接到首页）：alt="首页"（描述功能不是"Logo 图片"）。图片包含文字时 alt 必须包含同样的文字。'
      },
      {
        id: 410, difficulty: 3,
        question: '如何实现一个无障碍的 Tabs（标签切换）组件？核心 ARIA 属性有哪些？',
        options: ['只用 div', 'role="tablist" 包裹 → 每个标签 role="tab"+aria-selected+aria-controls 指向面板ID → 每个面板 role="tabpanel"+aria-labelledby 指向标签ID → 键盘支持左右方向键切换标签', '只需要 CSS', 'Tabs 不需要无障碍'],
        answer: 1,
        explanation: '无障碍 Tabs 完整方案：1) 容器 role="tablist"+aria-label；2) 每个标签 role="tab"+aria-selected="true/false"+aria-controls="panel1"+tabindex（选中=0 未选=-1）+id="tab1"；3) 每个面板 role="tabpanel"+aria-labelledby="tab1"+tabindex="0"（面板可聚焦）；4) 键盘：左右箭头切换标签、Home/End 首尾、Tab 进入面板内容。'
      }
    ]
  });

  return data;
}

// ============================================================
// Main execution
// ============================================================
const files = [
  { path: path.join(BASE, 'html-tags.yaml'), fn: expandHtmlTags },
  { path: path.join(BASE, 'html-ability.yaml'), fn: expandHtmlAbility },
  { path: path.join(BASE, 'css-style.yaml'), fn: expandCssStyle },
  { path: path.join(BASE, 'css-layout.yaml'), fn: expandCssLayout },
  { path: path.join(BASE, 'web-foundation.yaml'), fn: expandWebFoundation },
  { path: path.join(BASE, 'a11y.yaml'), fn: expandA11y },
];

for (const { path: filePath, fn } of files) {
  console.log(`Processing: ${filePath}`);
  const original = loadYaml(filePath);
  const expanded = fn(original);

  // Verify structure
  let totalQuestions = 0;
  for (const level of expanded.levels) {
    const ids = level.questions.map(q => q.id);
    // Check for duplicate IDs within level
    const idSet = new Set(ids);
    if (idSet.size !== ids.length) {
      console.warn(`  WARNING: Duplicate IDs in level ${level.level}!`);
    }
    totalQuestions += level.questions.length;
    console.log(`  Level ${level.level} (${level.name}): ${level.questions.length} questions`);
  }
  console.log(`  Total: ${totalQuestions} questions`);

  dumpYaml(filePath, expanded);
  console.log(`  Written successfully.\n`);
}

console.log('All files processed!');

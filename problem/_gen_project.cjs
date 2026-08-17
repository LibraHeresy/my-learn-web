// 生成阶段6 综合项目的HTML（起始骨架 + 需求 + 验收清单）
const fs = require('fs');
const path = require('path');
const { editorScript } = require('./_editor.cjs');
const { getNext } = require('./_index.cjs');

const CSS = `    * { margin: 0; padding: 0; box-sizing: border-box; }
    html, body { height: 100%; }
    body { font-family: -apple-system, "Segoe UI", "PingFang SC", "Microsoft YaHei", sans-serif; background: #f5f5f5; color: #1f2328; padding: 16px; margin: 0; display: flex; flex-direction: column; height: 100vh; overflow: hidden; }
    .header { margin-bottom: 12px; flex-shrink: 0; }
    .header .tag { display: inline-block; background: #d4a72c; color: #fff; padding: 2px 10px; border-radius: 12px; font-size: 13px; margin-bottom: 6px; }
    .header h1 { font-size: 20px; margin-bottom: 4px; }
    .header .difficulty { color: #d4a72c; font-size: 13px; font-weight: 600; }
    .layout { display: flex; gap: 16px; flex: 1; min-height: 0; }
    .panel { width: 50%; min-width: 0; display: flex; flex-direction: column; }
    .panel-left { overflow-y: auto; }
    .panel-right { height: 100%; }
    .card { background: #fff; border: 1px solid #d0d7de; border-radius: 8px; padding: 20px; margin-bottom: 16px; }
    .card h2 { font-size: 16px; margin-bottom: 12px; color: #d4a72c; }
    .card.code-card { flex: 1; display: flex; flex-direction: column; margin-bottom: 0; }
    .card.code-card textarea { flex: 1; }
    .left-card { flex: none; overflow-y: auto; }
    @media (max-width: 900px) {
      body { height: auto; overflow: auto; }
      .layout { flex-direction: column; }
      .panel { width: 100%; }
      .panel-right { height: auto; }
    }
    .desc { line-height: 1.7; font-size: 15px; }
    .desc p { margin-bottom: 10px; }
    .req { background: #e7f0ff; border: 1px solid #0969da; border-radius: 6px; padding: 12px 16px; margin: 10px 0; font-size: 14px; }
    .req li { margin-left: 20px; margin-bottom: 6px; }
    .checklist { background: #fff8c5; border: 1px solid #d4a72c; border-radius: 6px; padding: 12px 16px; margin: 10px 0; font-size: 14px; }
    .checklist li { margin-left: 20px; margin-bottom: 6px; }
    textarea { width: 100%; min-height: 300px; border: 1px solid #d0d7de; border-radius: 6px; padding: 12px; font-family: "SF Mono", Consolas, monospace; font-size: 14px; line-height: 1.6; resize: none; background: #fff; }
    textarea:focus { outline: 2px solid #d4a72c; border-color: transparent; }
    .btn-row { display: flex; gap: 8px; align-items: center; margin-top: 12px; flex-shrink: 0; }
    .btn { background: #d4a72c; color: #fff; border: none; padding: 10px 20px; border-radius: 6px; font-size: 15px; font-weight: 600; cursor: pointer; text-decoration: none; display: inline-block; }
    .btn:hover { background: #bf9425; }
    .btn.reset { background: #d0d7de; color: #1f2328; }
    .btn.next { background: #0969da; }
    .btn.preview { background: #0969da; }
    .hint { font-size: 13px; color: #57606a; margin-top: 8px; }`;

function buildProjectHtml(meta) {
  const { num, title, desc, requirements, checklist, starterCode, needVue, needRouter } = meta;
  const nextUrl = getNext(num);
  // 转义 < 为 \x3c，彻底避免 starterCode 字符串中的 <script>/</script> 干扰 HTML 解析
  const safeCode = JSON.stringify(starterCode).replace(/</g, '\\x3c');

  const vueScript = needVue ? '  <script src="https://unpkg.com/vue@3/dist/vue.global.prod.js"></script>\n' : '';
  const routerScript = needRouter ? '  <script src="https://unpkg.com/vue-router@4/dist/vue-router.global.prod.js"></script>\n' : '';

  return `<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${num} - ${title}</title>
${vueScript}${routerScript}  <style>
${CSS}
  </style>
</head>
<body>
  <div class="header">
    <span class="tag">阶段 7 · 综合项目</span>
    <h1>${num}. ${title}</h1>
    <span class="difficulty">难度：综合</span>
  </div>

  <div class="layout">
    <div class="panel panel-left">
      <div class="card left-card">
        <h2>项目需求</h2>
        <div class="desc">
          ${desc}
        </div>
      </div>
      <div class="card left-card">
        <h2>功能要求与验收</h2>
        <div class="req" style="margin-top:0;">
          <strong>功能要求：</strong>
          <ul>${requirements.map(r => `<li>${r}</li>`).join('')}</ul>
        </div>
        <div class="checklist" style="margin-bottom:0;">
          <strong>验收清单：</strong>
          <ul>${checklist.map(c => `<li>${c}</li>`).join('')}</ul>
        </div>
      </div>
    </div>

    <div class="panel panel-right">
      <div class="card code-card">
        <h2>你的项目代码</h2>
        <p class="hint" style="margin-bottom:8px;">在下方编写完整代码，点击"预览"查看运行效果。</p>
        <textarea id="code" spellcheck="false">${starterCode}</textarea>
        <div class="btn-row">
          <button class="btn preview" onclick="preview()">预览</button>
          <button class="btn reset" onclick="resetCode()">重置</button>
          <button class="btn" onclick="markDone()" style="background:#d4a72c;">我完成了</button>
          <span id="nextArea" style="display:none;">
            ${nextUrl ? `<a href="${nextUrl}" class="btn next">下一题 →</a>` : '<span style="color:#2da44e;font-weight:600;">🎉 已全部完成</span>'}
          </span>
        </div>
        <div id="msg"></div>
      </div>

      <div class="card" id="previewCard" style="display:none;">
        <h2>预览</h2>
        <iframe id="previewFrame" style="width:100%;height:400px;border:1px solid #d0d7de;border-radius:6px;"></iframe>
      </div>
    </div>
  </div>

  <script>
    const defaultCode = ${safeCode};

    function preview() {
      const code = document.getElementById('code').value;
      const msg = document.getElementById('msg');
      const frame = document.getElementById('previewFrame');
      const card = document.getElementById('previewCard');

      try {
        card.style.display = 'block';
        frame.srcdoc = code;
        msg.innerHTML = '<p style="color:#2da44e;margin-top:10px;">✓ 已在下方预览，请在预览区测试功能。</p>';
        card.scrollIntoView({ behavior: 'smooth' });
      } catch (e) {
        msg.innerHTML = '<p style="color:#cf222e;margin-top:10px;">✗ 错误：' + e.message + '</p>';
      }
    }

    function resetCode() {
      document.getElementById('code').value = defaultCode;
      document.getElementById('msg').innerHTML = '';
      document.getElementById('previewCard').style.display = 'none';
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

const stage6 = [
  {
    num: 51, title: '天气查询', needVue: true,
    desc: '<p>做一个天气查询应用：输入城市名，调用公开天气 API 显示天气信息。</p>',
    requirements: ['输入框输入城市名', '点击查询调用天气 API', '显示温度、天气描述', '错误处理（城市不存在时提示）'],
    checklist: ['能查询真实天气', '显示温度', '城市不存在有提示'],
    starterCode: `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <title>天气查询</title>
  <script src="https://unpkg.com/vue@3/dist/vue.global.prod.js"></script>
</head>
<body>
  <div id="app">
    <!-- 在这里写你的页面结构和逻辑 -->
  </div>
  <script>
    // 提示：可以用免费的 Open-Meteo API（无需 key）
    // 先根据城市名获取经纬度：https://geocoding-api.open-meteo.com/v1/search?name=北京
    // 再获取天气：https://api.open-meteo.com/v1/forecast?latitude=..&longitude=..&current_weather=true
    Vue.createApp({}).mount('#app');
  </script>
</body>
</html>`,
  },
  {
    num: 52, title: '购物车', needVue: true,
    desc: '<p>做一个购物车：商品列表 + 加入购物车 + 修改数量 + 计算总价。</p>',
    requirements: ['商品列表展示', '点击加入购物车', '购物车可修改数量、删除', '计算总价'],
    checklist: ['能加入购物车', '能改数量', '能删除', '总价正确'],
    starterCode: `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <title>购物车</title>
  <script src="https://unpkg.com/vue@3/dist/vue.global.prod.js"></script>
</head>
<body>
  <div id="app">
    <!-- 商品列表 + 购物车 -->
  </div>
  <script>
    // 提示：用 ref 保存商品列表和购物车，computed 计算总价
    Vue.createApp({}).mount('#app');
  </script>
</body>
</html>`,
  },
  {
    num: 53, title: '记账本', needVue: true,
    desc: '<p>做一个记账本：记录收入/支出，分类，统计总收入、总支出、结余。</p>',
    requirements: ['添加记录（类型：收入/支出，金额，备注）', '列表展示', '删除记录', '统计总收入/总支出/结余'],
    checklist: ['能添加记录', '能删除', '统计正确'],
    starterCode: `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <title>记账本</title>
  <script src="https://unpkg.com/vue@3/dist/vue.global.prod.js"></script>
</head>
<body>
  <div id="app">
    <!-- 记账表单 + 记录列表 + 统计 -->
  </div>
  <script>
    // 提示：记录结构 { type: 'income'|'expense', amount, note }
    Vue.createApp({}).mount('#app');
  </script>
</body>
</html>`,
  },
  {
    num: 54, title: '待办完整版', needVue: true,
    desc: '<p>做一个完整的待办应用，用 <code>localStorage</code> 持久化，刷新不丢失。</p>',
    requirements: ['添加/删除/标记完成', '用 localStorage 保存', '刷新后数据还在'],
    checklist: ['增删改正常', '刷新不丢数据'],
    starterCode: `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <title>待办完整版</title>
  <script src="https://unpkg.com/vue@3/dist/vue.global.prod.js"></script>
</head>
<body>
  <div id="app">
    <!-- Todo List + localStorage -->
  </div>
  <script>
    // 提示：localStorage.setItem('todos', JSON.stringify(...))
    // 读取：JSON.parse(localStorage.getItem('todos') || '[]')
    Vue.createApp({}).mount('#app');
  </script>
</body>
</html>`,
  },
  {
    num: 55, title: '随机名言', needVue: true,
    desc: '<p>做一个随机名言应用：点击按钮随机显示一条名言。</p>',
    requirements: ['点击按钮获取随机名言', '显示名言和作者', '可重复获取'],
    checklist: ['能随机显示名言', '显示作者'],
    starterCode: `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <title>随机名言</title>
  <script src="https://unpkg.com/vue@3/dist/vue.global.prod.js"></script>
</head>
<body>
  <div id="app">
    <!-- 随机名言展示 -->
  </div>
  <script>
    // 提示：可用 https://api.quotable.io/random 获取随机名言
    Vue.createApp({}).mount('#app');
  </script>
</body>
</html>`,
  },
  {
    num: 56, title: '个人简历页', needVue: false,
    desc: '<p>用纯 HTML + CSS 做一个精美的个人简历页面（可作为求职作品）。</p>',
    requirements: ['个人信息、教育、技能、项目经历', '用 flex/grid 布局', '语义化标签', '响应式（手机也能看）'],
    checklist: ['排版美观', '语义化', '响应式'],
    starterCode: `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>个人简历</title>
  <style>
    /* 在这里写你的样式 */
  </style>
</head>
<body>
  <!-- 在这里写简历内容：header、个人信息、教育、技能、项目 -->
</body>
</html>`,
  },
  {
    num: 57, title: '组件库按钮弹窗', needVue: true,
    desc: '<p>封装可复用的按钮组件和弹窗组件。</p>',
    requirements: ['按钮组件支持不同样式（props）', '弹窗组件支持显示/隐藏', '支持 slot 自定义内容'],
    checklist: ['组件可复用', 'props 生效', '弹窗能开关'],
    starterCode: `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <title>组件库</title>
  <script src="https://unpkg.com/vue@3/dist/vue.global.prod.js"></script>
</head>
<body>
  <div id="app">
    <!-- 使用你封装的按钮和弹窗组件 -->
  </div>
  <script>
    // 提示：定义 MyButton、MyModal 组件，用 props 和 emit
    Vue.createApp({}).mount('#app');
  </script>
</body>
</html>`,
  },
  {
    num: 58, title: '多页面应用', needVue: true, needRouter: true,
    desc: '<p>用 <code>vue-router</code> 做一个多页面应用（首页 + 关于页）。</p>',
    requirements: ['配置两个路由', '导航切换', '显示对应页面'],
    checklist: ['能切换页面', 'URL 变化', '内容对应'],
    starterCode: `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <title>多页面应用</title>
  <script src="https://unpkg.com/vue@3/dist/vue.global.prod.js"></script>
  <script src="https://unpkg.com/vue-router@4/dist/vue-router.global.prod.js"></script>
</head>
<body>
  <div id="app">
    <!-- 导航 + router-view -->
  </div>
  <script>
    // 提示：用 VueRouter.createRouter + createWebHashHistory
    // 定义 Home 和 About 两个组件
  </script>
</body>
</html>`,
  },
  {
    num: 59, title: 'GitHub 用户搜索', needVue: true,
    desc: '<p>做一个 GitHub 用户搜索：输入用户名，显示用户头像、昵称、仓库数等信息。</p>',
    requirements: ['输入用户名搜索', '显示头像、昵称、仓库数、followers', '用户不存在时提示'],
    checklist: ['能搜索用户', '显示用户信息', '错误处理'],
    starterCode: `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <title>GitHub 用户搜索</title>
  <script src="https://unpkg.com/vue@3/dist/vue.global.prod.js"></script>
</head>
<body>
  <div id="app">
    <!-- 搜索框 + 用户信息卡片 -->
  </div>
  <script>
    // 提示：https://api.github.com/users/{username}
    Vue.createApp({}).mount('#app');
  </script>
</body>
</html>`,
  },
  {
    num: 60, title: '毕业项目', needVue: true,
    desc: '<p>综合运用所学，做一个完整的小应用（建议：结合前几题的 2-3 个功能），可作为求职作品。</p>',
    requirements: ['选择一个主题（如待办+记账+天气的组合）', '综合运用 Vue、fetch、localStorage', '界面美观', '部署到线上（GitHub Pages / Vercel）'],
    checklist: ['功能完整', '代码规范', '能线上访问'],
    starterCode: `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <title>我的毕业项目</title>
  <script src="https://unpkg.com/vue@3/dist/vue.global.prod.js"></script>
</head>
<body>
  <div id="app">
    <!-- 你的完整应用 -->
  </div>
  <script>
    // 自由发挥！综合运用所学。
    Vue.createApp({}).mount('#app');
  </script>
</body>
</html>`,
  },
];

const dir = path.join(__dirname, 'stage7-项目');
if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

stage6.forEach(q => {
  const meta = { ...q, num: q.num + 10 };
  const html = buildProjectHtml(meta);
  const num = String(meta.num).padStart(2, '0');
  const safeTitle = q.title.replace(/[\\/:*?"<>|]/g, '-');
  fs.writeFileSync(path.join(dir, `${num}-${safeTitle}.html`), html, 'utf8');
  console.log('生成:', `${num}-${safeTitle}.html`);
});

console.log('\n阶段7 项目 完成，共', stage6.length, '题');

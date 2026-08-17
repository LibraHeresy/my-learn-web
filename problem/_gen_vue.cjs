// 生成阶段5 Vue基础题的HTML（CDN 引入 Vue 3）
const fs = require('fs');
const path = require('path');
const { editorScript } = require('./_editor.cjs');
const { getNext } = require('./_index.cjs');

const CSS = `    * { margin: 0; padding: 0; box-sizing: border-box; }
    html, body { height: 100%; }
    body { font-family: -apple-system, "Segoe UI", "PingFang SC", "Microsoft YaHei", sans-serif; background: #f5f5f5; color: #1f2328; padding: 16px; margin: 0; display: flex; flex-direction: column; height: 100vh; overflow: hidden; }
    .header { margin-bottom: 12px; flex-shrink: 0; }
    .header .tag { display: inline-block; background: #42b883; color: #fff; padding: 2px 10px; border-radius: 12px; font-size: 13px; margin-bottom: 6px; }
    .header h1 { font-size: 20px; margin-bottom: 4px; }
    .header .difficulty { color: #2da44e; font-size: 13px; font-weight: 600; }
    .layout { display: flex; gap: 16px; flex: 1; min-height: 0; }
    .panel { width: 50%; min-width: 0; display: flex; flex-direction: column; }
    .panel-left { overflow-y: auto; }
    .panel-right { height: 100%; }
    .card { background: #fff; border: 1px solid #d0d7de; border-radius: 8px; padding: 20px; margin-bottom: 16px; }
    .card h2 { font-size: 16px; margin-bottom: 12px; color: #42b883; }
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
    .checklist { background: #fff8c5; border: 1px solid #d4a72c; border-radius: 6px; padding: 12px 16px; margin: 10px 0; font-size: 14px; }
    .checklist li { margin-left: 20px; margin-bottom: 6px; }
    .demo { border: 1px dashed #d0d7de; border-radius: 8px; padding: 20px; margin: 12px 0; background: #fafbfc; }
    textarea { width: 100%; min-height: 200px; border: 1px solid #d0d7de; border-radius: 6px; padding: 12px; font-family: "SF Mono", Consolas, monospace; font-size: 14px; line-height: 1.6; resize: none; background: #fff; }
    textarea:focus { outline: 2px solid #42b883; border-color: transparent; }
    .btn-row { display: flex; gap: 8px; align-items: center; margin-top: 12px; flex-shrink: 0; }
    .btn { background: #42b883; color: #fff; border: none; padding: 10px 20px; border-radius: 6px; font-size: 15px; font-weight: 600; cursor: pointer; text-decoration: none; display: inline-block; }
    .btn:hover { background: #3aa876; }
    .btn.reset { background: #d0d7de; color: #1f2328; }
    .btn.next { background: #0969da; }
    .hint { font-size: 13px; color: #57606a; margin-top: 8px; }
    #app { padding: 8px; }
    button { cursor: pointer; padding: 6px 14px; border: 1px solid #d0d7de; border-radius: 4px; background: #f6f8fa; }
    input { padding: 8px; border: 1px solid #d0d7de; border-radius: 4px; }
    ul { padding-left: 20px; }`;

function buildVueHtml(meta) {
  const { num, title, desc, checklist, templateHtml, scriptCode } = meta;
  const nextUrl = getNext(num);
  // 转义 < 为 \x3c，彻底避免字符串中的 <script>/</script> 干扰 HTML 解析
  const safeCode = JSON.stringify(scriptCode).replace(/</g, '\\x3c');
  return `<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${num} - ${title}</title>
  <script src="https://unpkg.com/vue@3/dist/vue.global.prod.js"></script>
  <style>
${CSS}
  </style>
</head>
<body>
  <div class="header">
    <span class="tag">阶段 6 · Vue 基础</span>
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
      <div class="card left-card">
        <h2>效果演示区</h2>
        <p class="hint" style="margin-bottom:10px;">完成代码后，在下方"运行"即可看到效果。</p>
        <div class="demo">
          <div id="app"></div>
        </div>
      </div>
    </div>

    <div class="panel panel-right">
      <div class="card code-card">
        <h2>你的代码</h2>
        <p class="hint" style="margin-bottom:8px;">在下方编写 Vue 代码（模板 + 脚本），点击"运行"。</p>
        <textarea id="code" spellcheck="false">${scriptCode}</textarea>
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
    const defaultCode = ${safeCode};

    function runCode() {
      const code = document.getElementById('code').value;
      const msg = document.getElementById('msg');
      const appEl = document.getElementById('app');

      // 清空之前的应用
      appEl.innerHTML = '';

      try {
        // 提取 template 和 script 部分
        const templateMatch = code.match(/<template>([\\s\\S]*)<\\/template>/);
        const scriptMatch = code.match(/<script>([\\s\\S]*)<\\/script>/);

        const template = templateMatch ? templateMatch[1] : '';
        const scriptBody = scriptMatch ? scriptMatch[1] : '';

        // 执行 script 拿到组件选项
        let options = {};
        if (scriptBody.trim()) {
          const fn = new Function('Vue', scriptBody);
          const result = fn(Vue);
          if (result) options = result;
        }

        // 合并 template
        options.template = template || '<div>请在代码中提供 &lt;template&gt; 部分</div>';

        const app = Vue.createApp(options);
        app.mount('#app');
        msg.innerHTML = '<p style="color:#2da44e;margin-top:10px;">✓ 应用已运行，请在演示区查看效果。</p>';
      } catch (e) {
        msg.innerHTML = '<p style="color:#cf222e;margin-top:10px;">✗ 代码错误：' + e.message + '</p>';
      }
    }

    function resetCode() {
      document.getElementById('code').value = defaultCode;
      document.getElementById('msg').innerHTML = '';
      document.getElementById('app').innerHTML = '';
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

const stage5 = [
  {
    num: 41, title: '计数器',
    desc: '<p>用 Vue 3 的 <code>ref</code> 实现一个计数器，点击按钮数字 +1。</p>',
    checklist: ['页面显示一个数字，初始为 0', '点击按钮数字 +1'],
    scriptCode: `<template>
  <div>
    <h3>{{ count }}</h3>
    <!-- TODO: 给按钮加点击事件，让 count +1 -->
    <button>+1</button>
  </div>
</template>

<script>
const { ref } = Vue;
return {
  setup() {
    // TODO: 创建一个响应式变量 count，初始值 0
    // 并返回 count
  }
};
</script>`,
  },
  {
    num: 42, title: '渲染列表',
    desc: '<p>用 <code>v-for</code> 渲染一个数组列表。</p>',
    checklist: ['页面渲染出 3 个水果', '使用 v-for + :key'],
    scriptCode: `<template>
  <div>
    <ul>
      <!-- TODO: 用 v-for 渲染 list -->
    </ul>
  </div>
</template>

<script>
const { ref } = Vue;
return {
  setup() {
    // TODO: 创建 list，包含三个水果：苹果、香蕉、橘子
  }
};
</script>`,
  },
  {
    num: 43, title: '条件渲染',
    desc: '<p>用 <code>v-if</code> 和 <code>v-show</code> 分别控制两个元素的显示，并用按钮切换。</p>',
    checklist: ['按钮能切换显示状态', '理解 v-if 和 v-show 的区别'],
    scriptCode: `<template>
  <div>
    <!-- TODO: 用 v-if 和 v-show 分别控制两个 p 的显示 -->
    <p>我是 v-if 控制的</p>
    <p>我是 v-show 控制的</p>
    <!-- TODO: 给按钮加点击事件切换 show -->
    <button>切换</button>
  </div>
</template>

<script>
const { ref } = Vue;
return {
  setup() {
    // TODO: 创建 show，初始值 true
  }
};
</script>`,
  },
  {
    num: 44, title: '双向绑定',
    desc: '<p>用 <code>v-model</code> 实现输入框和数据的双向绑定。</p>',
    checklist: ['输入框内容实时同步', '下方实时显示输入内容'],
    scriptCode: `<template>
  <div>
    <!-- TODO: 给输入框加 v-model -->
    <input placeholder="输入内容" />
    <!-- TODO: 下方显示输入内容 -->
    <p style="margin-top:10px;"></p>
  </div>
</template>

<script>
const { ref } = Vue;
return {
  setup() {
    // TODO: 创建 text，初始值空字符串
  }
};
</script>`,
  },
  {
    num: 45, title: 'Todo List',
    desc: '<p>实现一个简单的 Todo List：能添加、删除、标记完成。</p>',
    checklist: ['能添加待办', '能删除待办', '能标记完成（删除线）'],
    scriptCode: `<template>
  <div>
    <div style="display:flex;gap:8px;margin-bottom:12px;">
      <!-- TODO: 给输入框加 v-model 和回车事件 -->
      <input placeholder="输入待办" />
      <!-- TODO: 给按钮加点击事件 -->
      <button>添加</button>
    </div>
    <ul>
      <!-- TODO: 用 v-for 渲染 todos，支持标记完成和删除 -->
    </ul>
  </div>
</template>

<script>
const { ref } = Vue;
return {
  setup() {
    // TODO: 创建 todos 数组和 text 输入
    // TODO: 实现 add 添加、remove 删除
  }
};
</script>`,
  },
  {
    num: 46, title: '父传子 props',
    desc: '<p>创建一个子组件，接收父组件传入的数据并显示。</p>',
    checklist: ['父组件传数据给子组件', '子组件正确显示'],
    scriptCode: `<template>
  <div>
    <!-- TODO: 使用子组件，并把 msg 传给它 -->
  </div>
</template>

<script>
const { ref } = Vue;
// TODO: 定义子组件 Child，用 props 接收 message，并在模板中显示
const Child = {
  // props 和 template 在这里写
};
return {
  // TODO: 注册 Child 组件，创建 msg 数据
  setup() {
  }
};
</script>`,
  },
  {
    num: 47, title: '子传父 emit',
    desc: '<p>创建一个子组件，点击按钮通过 <code>emit</code> 触发父组件的方法。</p>',
    checklist: ['子组件能触发事件', '父组件收到事件并处理'],
    scriptCode: `<template>
  <div>
    <p>父组件收到的消息：{{ received }}</p>
    <!-- TODO: 使用子组件，并监听它的 send 事件 -->
  </div>
</template>

<script>
const { ref } = Vue;
// TODO: 定义子组件 Child，按钮点击时 $emit('send', 消息)
const Child = {
  // emits 和 template 在这里写
};
return {
  // TODO: 注册 Child，创建 received 和 handle 方法
  setup() {
  }
};
</script>`,
  },
  {
    num: 48, title: '搜索过滤 computed',
    desc: '<p>用 <code>computed</code> 实现列表的搜索过滤：输入关键字，实时过滤列表。</p>',
    checklist: ['输入关键字实时过滤', '使用 computed 计算过滤结果'],
    scriptCode: `<template>
  <div>
    <!-- TODO: 给输入框加 v-model -->
    <input placeholder="输入关键字过滤" />
    <ul style="margin-top:10px;">
      <!-- TODO: 用 v-for 渲染 filtered 结果 -->
    </ul>
  </div>
</template>

<script>
const { ref, computed } = Vue;
return {
  setup() {
    // TODO: 创建 list（几个英文水果名）
    // TODO: 创建 keyword
    // TODO: 用 computed 计算 filtered（根据 keyword 过滤 list）
  }
};
</script>`,
  },
  {
    num: 49, title: '监听 watch',
    desc: '<p>用 <code>watch</code> 监听数据变化，数据变化时显示提示。</p>',
    checklist: ['数据变化触发 watch', '页面显示变化记录'],
    scriptCode: `<template>
  <div>
    <!-- TODO: 给按钮加点击事件，让 count +1 -->
    <button>+1</button>
    <span style="margin-left:8px;">当前值：{{ count }}</span>
    <p style="margin-top:10px;color:#42b883;">{{ message }}</p>
  </div>
</template>

<script>
const { ref, watch } = Vue;
return {
  setup() {
    // TODO: 创建 count 和 message
    // TODO: 用 watch 监听 count，变化时更新 message
  }
};
</script>`,
  },
  {
    num: 50, title: '待办统计',
    desc: '<p>在 Todo List 基础上，用 <code>computed</code> 统计已完成和未完成数量。</p>',
    checklist: ['显示已完成数量', '显示未完成数量', '数量实时更新'],
    scriptCode: `<template>
  <div>
    <div style="display:flex;gap:8px;margin-bottom:12px;">
      <!-- TODO: 输入框和添加按钮 -->
      <input placeholder="输入待办" />
      <button>添加</button>
    </div>
    <!-- TODO: 显示已完成/未完成数量 -->
    <p></p>
    <ul style="margin-top:10px;">
      <!-- TODO: 渲染 todos -->
    </ul>
  </div>
</template>

<script>
const { ref, computed } = Vue;
return {
  setup() {
    // TODO: 创建 todos、text、add、remove
    // TODO: 用 computed 计算 doneCount 和 undoneCount
  }
};
</script>`,
  },
];

const dir = path.join(__dirname, 'stage6-vue');
if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

stage5.forEach(q => {
  const meta = { ...q, num: q.num + 10 };
  const html = buildVueHtml(meta);
  const num = String(meta.num).padStart(2, '0');
  const safeTitle = q.title.replace(/[\\/:*?"<>|]/g, '-');
  fs.writeFileSync(path.join(dir, `${num}-${safeTitle}.html`), html, 'utf8');
  console.log('生成:', `${num}-${safeTitle}.html`);
});

console.log('\n阶段6 Vue 完成，共', stage5.length, '题');

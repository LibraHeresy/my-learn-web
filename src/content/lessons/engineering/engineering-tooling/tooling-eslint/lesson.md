# ESLint 与 Prettier — 代码的调音师

:::music-analogy
乐团上台前需要调音——每把乐器校准到标准音高 A=440Hz。代码也需要调音：ESLint 是音准仪——检查有没有错音（语法错误、不良模式）；Prettier 是节拍器——确保节奏统一（缩进、引号、分号风格一致）。两个工具配合使用，让你的代码像专业乐团一样整齐统一。
:::

:::explain{title="为什么需要代码规范？"}
你有没有遇到过这些问题：
- 队友用 2 空格缩进，你用 4 空格——代码合并时满屏冲突
- 有人用单引号，有人用双引号——整个项目风格混乱
- 定义了一个变量但从未使用，自己都没注意到
- console.log 忘记删就提交了
团队协作时，代码风格的统一比个人偏好重要得多。就像交响乐团——每个乐手可以有不同的演奏风格，但在同一个乐队里，必须听指挥的统一调度。
**ESLint** 负责代码质量（有没有 bug）
**Prettier** 负责代码格式（好不好看）
两者配合使用：ESLint 抓错误，Prettier 管风格。
:::

:::explain{title="ESLint — 代码质量检查"}
ESLint 是 JS/TS 生态中最主流的代码检查工具。它定义了一套规则，不符合规则就报错或警告。
**安装与初始化：**
```bash
npm init @eslint/config
# 按提示选择：Vue、TypeScript、ESM 等
# 会在项目根目录生成 eslint.config.js
```
**常见规则举例：**
```js
// eslint.config.js
export default [
  {
    rules: {
      'no-unused-vars': 'warn',     // 定义了但没用的变量 → 警告
      'no-console': 'warn',          // console.log → 警告
      'no-undef': 'error',           // 未定义的变量 → 报错
      'eqeqeq': 'error',             // 必须用 === 而不是 ==
    }
  }
]
```
**VSCode 集成：** 安装 ESLint 插件后，错误会在编辑器中直接标红下划线，保存时自动修复部分问题。
> 🎯 ESLint 就像排练时的指挥——等一下，第二小提琴，你这里有个音不准（变量未定义），重来。
:::

:::explain{title="Prettier — 代码格式化"}
Prettier 是一个有强迫症的代码格式化工具——它不检查 bug，只负责让代码**看起来**一致。
**安装：**
```bash
npm install -D prettier
```
**配置文件 .prettierrc：**
```json
{
  "semi": false,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "es5",
  "printWidth": 100
}
```
保存文件时，Prettier 自动把：
```js
// 格式化前
const x=1;const y=2;function foo(a,b){return a+b}
// 格式化后
const x = 1
const y = 2
function foo(a, b) {
  return a + b
}
```
**让 ESLint 和 Prettier 和平共处：**
安装 eslint-config-prettier，关闭 ESLint 中与 Prettier 冲突的规则。
> 📐 Prettier 就像乐谱排版师——音符是对的（ESLint 验证过了），但间距、对齐、换行要美观统一。
:::

:::example{title="看例子：在 Vite + Vue 项目中配置"}
在你的 music-collection-vue 项目中：
```bash
# 安装依赖
npm install -D eslint prettier eslint-plugin-vue eslint-config-prettier
# ESLint 配置（eslint.config.js）
import pluginVue from 'eslint-plugin-vue'
export default [
  ...pluginVue.configs['flat/recommended'],
  {
    rules: {
      'vue/multi-word-component-names': 'off',
      'no-console': 'warn'
    }
  }
]
# VS Code 设置（.vscode/settings.json）
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  }
}
```
配置完成后，每次保存文件：Prettier 先格式化，ESLint 再检查和自动修复。你的代码会像印刷出来的乐谱一样整齐。
:::

:::task{title="动手试试 ✨"}
在你的 music-collection-vue 项目中：
1. 安装 ESLint + Prettier + eslint-config-prettier
2. 创建 eslint.config.js 和 .prettierrc 配置文件
3. 在 VS Code 中安装 ESLint 和 Prettier 插件
4. 故意写一些不规范的代码——不统一的引号、缺少空格、定义未使用的变量
5. 保存文件，观察自动格式化效果
6. 运行 npx eslint . 在终端中查看所有警告和错误
:::

:::listen-to
柏林爱乐乐团音乐会前的调音 — 各乐器组依次校准，双簧管给出标准音 A，其他乐器与之对齐。ESLint 就是那个标准音——所有代码都要对齐到它的规则。
:::


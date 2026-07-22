# ESLint 与 Prettier — 代码的调音师

:::analogy
ESLint 是代码的**质检员**——它检查你的代码有没有 bug（未定义的变量、写错的关键字、定义了但没用过的函数）。Prettier 是**自动排版师**——统一缩进、引号、分号、换行，让代码看起来像印刷品一样整齐。两人配合：一个抓错，一个美容。你只需要写逻辑，格式和低级错误交给它们。
:::

:::explain{title="问题：没有 Lint 和格式化的代码长什么样？"}
看看下面这段代码。它**能运行**，但你能一眼看出几个问题？

```js
// 一个简单的购物车功能——不经任何工具处理的原始代码
const cart=[]
function addToCart(product,quantity){
cart.push({product,quantity})
console.log("added",product)
}
function getTotal(products){
let total=0
for(let i=0;i<products.length;i++){
total+=products[i].price
}
return total
}
var unusedVariable="没人用到我"
function getUserName(user){
return user.Name
}
```

这段代码的问题清单：
1. **空格不一致** — `cart=[]` 没有空格，但 `let total=0` 有，读起来忽紧忽松
2. **缺少分号** — 有的行以分号结尾（`};`），有的行没有（`return user.Name`）
3. **双引号换单引号** — `"added"` 用了双引号（通常约定用单引号）
4. **var 而不是 let/const** — `var unusedVariable` 是旧的声明方式，`let`/`const` 是现代的
5. **定义但未使用的变量** — `unusedVariable` 和 `getUserName` 定义了但从未被调用
6. **可能的 bug** — `user.Name` 大概率应该是 `user.name`（JS 的常规命名是小驼峰）
7. **缺少尾逗号** — `{product,quantity}` 如果再加属性，diff 会多一行（尾逗号让 git diff 更干净）

这些问题不会让你的代码"崩掉"，但它们就是 bug 的温床。`unusedVariable` 占着内存；`user.Name` 可能是 `undefined` 的一个坑；不一致的格式让同事（和一个月后的你自己）阅读时大脑要做额外的格式转换。
:::

:::explain{title="解决方案：ESLint 抓错误 + Prettier 管格式"}
**ESLint 的职责：代码质量**

ESLint 分析你的代码结构，检查规则。不符合规则就报错或警告：

```js
// ESLint 会在这段代码中标记的问题：
let x = 1
//      ⚠ no-unused-vars: 'x' is assigned but never used（定义了但没用过）

console.log(result)
//           ❌ no-undef: 'result' is not defined（用了没定义的变量）
```

**Prettier 的职责：代码格式**

Prettier 不关心你的代码有没有 bug，它只关心"看起来整齐"：

```js
// Prettier 格式化前
const x=1;const y=2;function foo(a,b){return a+b}

// Prettier 格式化后（自动）
const x = 1
const y = 2
function foo(a, b) {
  return a + b
}
```

**两者配合的流水线：保存文件 → Prettier 先格式化 → ESLint 再检查质量和自动修复**
:::

:::example{title="逐行详解：配置 ESLint + Prettier 并看效果"}
以下在 `music-collection` 项目中完成配置（项目已在上一课创建）。

**第一步：安装依赖**

```bash
npm install -D prettier
```
- `-D` — 安装为开发依赖（用户不需要格式化工具）
- `prettier` — 代码格式化工具本身

**第二步：创建 Prettier 配置文件 .prettierrc**

在项目根目录新建 `.prettierrc`（JSON 格式）：

```json
{
  "semi": false,              // 不在语句末尾加分号（Vue 官方风格就是无分号）
  "singleQuote": true,        // 用单引号而不是双引号（'hello' 而不是 "hello"）
  "tabWidth": 2,              // 缩进宽度为 2 个空格
  "trailingComma": "es5",     // 在对象/数组最后一项加逗号（ES5 允许的位置）
  "printWidth": 100           // 每行最多 100 个字符（超过就自动换行）
}
```

每个选项的含义：
- `semi: false` — 不加分号。JS 会自动插入分号（ASI 机制）。如果不习惯可以改成 `true`。
- `singleQuote: true` — 统一用单引号。项目中所有字符串都用 `'hello'` 而不是 `"hello"`。
- `tabWidth: 2` — 缩进 2 格。不是为了省空间，而是为了嵌套层级深时不至于每行都超出屏幕。
- `trailingComma: "es5"` — 尾逗号。`{ a: 1, b: 2, }` 最后那个逗号，让以后添加属性时 git diff 只显示新增的那一行。
- `printWidth: 100` — 一行太长了 Prettier 会自动换行，保证代码在任何屏幕上可读。

**第三步：创建 .prettierignore**

在项目根目录新建 `.prettierignore`：
```
node_modules/
dist/
```
告诉 Prettier 忽略这些文件夹——它们是自动生成或第三方的，格式化它们没有意义。

**第四步：体验格式化效果**

在 `src/App.vue` 中故意写一些乱格式的代码：
```js
const x=1;const y=2;const z={a:1,b:2,c:3}
function foo(a,b,c){return a+b+c}
```

保存文件（如果你装了 Prettier VS Code 扩展并开启了 `formatOnSave`），代码自动变成：
```js
const x = 1
const y = 2
const z = { a: 1, b: 2, c: 3 }
function foo(a, b, c) {
  return a + b + c
}
```

你什么都没做，只是按了 `Ctrl+S`——Prettier 帮你完成了所有排版工作。
:::

:::hint{title="ESLint + Prettier 的常见踩坑配置"}
**踩坑 1：装了 ESLint 和 Prettier 但不生效**

只装 npm 包不够，还需要 VS Code 扩展来驱动：
1. 打开 VS Code 扩展商店（`Ctrl+Shift+X`）
2. 搜索并安装 **Prettier - Code formatter**（作者：Prettier）
3. 按 `Ctrl+,` 打开设置，搜索 `default formatter`，选择 Prettier
4. 搜索 `format on save`，确保勾选
5. 现在每次 `Ctrl+S` 保存时，Prettier 自动格式化

**踩坑 2：ESLint 和 Prettier 的规则打架**

ESLint 某些规则也管格式（如缩进），和 Prettier 的规则冲突。解决：安装 `eslint-config-prettier`，它会把 ESLint 中所有和 Prettier 冲突的规则关掉。
```bash
npm install -D eslint-config-prettier
```

**踩坑 3：.prettierrc 没生效**

检查：文件名前面**有**一个点（`.prettierrc`，不是 `prettierrc`）。文件要放在**项目根目录**（和 `package.json` 同级）。改配置后需要重新保存文件才能看到新格式效果。

**踩坑 4：团队每个人的格式不一样**

把 `.prettierrc` 提交到 Git——团队成员拉取代码后，VS Code 会自动读取这个配置，保证所有人的格式完全一致。从此代码审查不再讨论"这里缩进该用几个空格"。
:::

:::explain{title="现实工作连接：Lint + Formatter 是团队协作的硬性要求"}
- 几乎所有公司的项目都有 ESLint + Prettier 配置，且 Git 提交前会自动检查（通过 husky + lint-staged）
- 如果代码不合规范，CI/CD 流水线直接拒绝合并——连提交都过不去
- 统一的格式消除了代码审查中的"格式争议"——reviewer 只关注逻辑，不关心缩进
- Prettier 的口号：**"Opinionated"（有主见的）**——它不让你选格式，它直接替你做决定。这反而减少了团队争论

你不需要记住每一条规则。你只需要知道：保存文件 = 自动格式化，红色波浪线 = 有错误要改。工具帮你记规则，你只需要写逻辑。
:::

:::task{title="为你的项目配置代码质量工具"}
::::step{purpose="Prettier 的核心理念：你写代码，它管格式。`.prettierrc` 是团队的格式宪法——提交到 Git 后，所有人共享同一套格式标准。" expected="npm install 成功，.prettierrc 和 .prettierignore 文件创建在 music-collection/ 根目录。"}
安装 Prettier 并创建配置

1. 在 VS Code 终端中，确保在 `music-collection` 目录：
   ```bash
   cd music-collection
   npm install -D prettier
   ```
2. 在项目根目录创建 `.prettierrc` 文件，写入：
   ```json
   {
     "semi": false,
     "singleQuote": true,
     "tabWidth": 2,
     "trailingComma": "es5",
     "printWidth": 100
   }
   ```
3. 在项目根目录创建 `.prettierignore` 文件，写入：
   ```
   node_modules/
   dist/
   ```
::::

::::step{purpose="VS Code 的 formatOnSave + Prettier 扩展 = 保存即排版。你不需要记得运行什么命令——这个操作绑定在 Ctrl+S 上，形成肌肉记忆。" expected="按 Ctrl+S 后，代码自动从混乱格式变成整齐格式。"}
配置 VS Code 保存时自动格式化

1. 在 VS Code 中按 `Ctrl+Shift+X` 打开扩展商店
2. 搜索 `Prettier`，安装 **Prettier - Code formatter**（esbenp.prettier-vscode）
3. 按 `Ctrl+,` 打开设置，搜索 `default formatter`，选择 **Prettier - Code formatter**
4. 搜索 `format on save`，确保是勾选状态
5. 打开 `src/App.vue`，故意在 `<script setup>` 里写一段乱格式代码：
   ```js
   const x=1;const y=2;const z={a:1,b:2}
   ```
6. 按 `Ctrl+S` 保存——观察代码自动变为整齐格式
::::

::::step{purpose="npx prettier --check 可以检查整个项目是否都符合格式规范，而不用打开每个文件手动验证。这在 CI/CD 中很有用。" expected="npx prettier --check 显示所有文件格式正确（All matched files use Prettier code style!）。"}
用命令行验证格式

```bash
npx prettier --check src/
```
- `npx` — 运行 `node_modules` 里的命令（不需要全局安装）
- `prettier --check` — 检查文件是否已格式化，不改动任何文件
- `src/` — 只检查 src 目录下的文件

如果输出 "All matched files use Prettier code style!"，所有文件格式正确。

尝试格式化整个项目（这次真的改写文件）：
```bash
npx prettier --write src/
```
`--write` 会真正修改文件——所有不符合 `.prettierrc` 规则的格式都会被纠正。
::::
:::

:::recap
ESLint 负责代码质量（检查 bug），Prettier 负责代码格式（统一排版）。在 VS Code 中安装 Prettier 扩展、开启 formatOnSave 后，每次 `Ctrl+S` 自动格式化代码。`.prettierrc` 是格式规则的出处，提交到 Git 后团队共享统一风格。`npx prettier --check` 可以验证格式合规性。
:::

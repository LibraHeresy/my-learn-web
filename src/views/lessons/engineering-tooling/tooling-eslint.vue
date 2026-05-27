<script setup lang="ts">
import type { Lesson } from '../../../types'
import { parseContent, parseInline } from '../../../utils/markdown'

defineProps<{ lessonMeta: Lesson }>()
defineEmits<{ complete: [] }>()

const sections = [
  { type: 'explain', title: "为什么需要代码规范？", content: "你有没有遇到过这些问题：\n\n- 队友用 2 空格缩进，你用 4 空格——代码合并时满屏冲突\n- 有人用单引号，有人用双引号——整个项目风格混乱\n- 定义了一个变量但从未使用，自己都没注意到\n- console.log 忘记删就提交了\n\n团队协作时，代码风格的统一比个人偏好重要得多。就像交响乐团——每个乐手可以有不同的演奏风格，但在同一个乐队里，必须听指挥的统一调度。\n\n**ESLint** 负责代码质量（有没有 bug）\n**Prettier** 负责代码格式（好不好看）\n\n两者配合使用：ESLint 抓错误，Prettier 管风格。" },
  { type: 'explain', title: "ESLint — 代码质量检查", content: "ESLint 是 JS/TS 生态中最主流的代码检查工具。它定义了一套规则，不符合规则就报错或警告。\n\n**安装与初始化：**\n```bash\nnpm init @eslint/config\n# 按提示选择：Vue、TypeScript、ESM 等\n# 会在项目根目录生成 eslint.config.js\n```\n\n**常见规则举例：**\n```js\n// eslint.config.js\nexport default [\n  {\n    rules: {\n      'no-unused-vars': 'warn',     // 定义了但没用的变量 → 警告\n      'no-console': 'warn',          // console.log → 警告\n      'no-undef': 'error',           // 未定义的变量 → 报错\n      'eqeqeq': 'error',             // 必须用 === 而不是 ==\n    }\n  }\n]\n```\n\n**VSCode 集成：** 安装 ESLint 插件后，错误会在编辑器中直接标红下划线，保存时自动修复部分问题。\n\n> 🎯 ESLint 就像排练时的指挥——等一下，第二小提琴，你这里有个音不准（变量未定义），重来。" },
  { type: 'explain', title: "Prettier — 代码格式化", content: "Prettier 是一个有强迫症的代码格式化工具——它不检查 bug，只负责让代码**看起来**一致。\n\n**安装：**\n```bash\nnpm install -D prettier\n```\n\n**配置文件 .prettierrc：**\n```json\n{\n  \"semi\": false,\n  \"singleQuote\": true,\n  \"tabWidth\": 2,\n  \"trailingComma\": \"es5\",\n  \"printWidth\": 100\n}\n```\n\n保存文件时，Prettier 自动把：\n```js\n// 格式化前\nconst x=1;const y=2;function foo(a,b){return a+b}\n\n// 格式化后\nconst x = 1\nconst y = 2\nfunction foo(a, b) {\n  return a + b\n}\n```\n\n**让 ESLint 和 Prettier 和平共处：**\n安装 eslint-config-prettier，关闭 ESLint 中与 Prettier 冲突的规则。\n\n> 📐 Prettier 就像乐谱排版师——音符是对的（ESLint 验证过了），但间距、对齐、换行要美观统一。" },
  { type: 'example', title: "📝 看例子：在 Vite + Vue 项目中配置", content: "在你的 music-collection-vue 项目中：\n\n```bash\n# 安装依赖\nnpm install -D eslint prettier eslint-plugin-vue eslint-config-prettier\n\n# ESLint 配置（eslint.config.js）\nimport pluginVue from 'eslint-plugin-vue'\nexport default [\n  ...pluginVue.configs['flat/recommended'],\n  {\n    rules: {\n      'vue/multi-word-component-names': 'off',\n      'no-console': 'warn'\n    }\n  }\n]\n\n# VS Code 设置（.vscode/settings.json）\n{\n  \"editor.formatOnSave\": true,\n  \"editor.defaultFormatter\": \"esbenp.prettier-vscode\",\n  \"editor.codeActionsOnSave\": {\n    \"source.fixAll.eslint\": true\n  }\n}\n```\n\n配置完成后，每次保存文件：Prettier 先格式化，ESLint 再检查和自动修复。你的代码会像印刷出来的乐谱一样整齐。" },
  { type: 'task', title: "🎯 动手试试 ✨", content: "在你的 music-collection-vue 项目中：\n\n1. 安装 ESLint + Prettier + eslint-config-prettier\n2. 创建 eslint.config.js 和 .prettierrc 配置文件\n3. 在 VS Code 中安装 ESLint 和 Prettier 插件\n4. 故意写一些不规范的代码——不统一的引号、缺少空格、定义未使用的变量\n5. 保存文件，观察自动格式化效果\n6. 运行 npx eslint . 在终端中查看所有警告和错误" }
]

const analogy = "乐团上台前需要调音——每把乐器校准到标准音高 A=440Hz。代码也需要调音：ESLint 是音准仪——检查有没有错音（语法错误、不良模式）；Prettier 是节拍器——确保节奏统一（缩进、引号、分号风格一致）。两个工具配合使用，让你的代码像专业乐团一样整齐统一。"

const listen = "柏林爱乐乐团音乐会前的调音 — 各乐器组依次校准，双簧管给出标准音 A，其他乐器与之对齐。ESLint 就是那个标准音——所有代码都要对齐到它的规则。"
</script>

<template>
  <div class="content-panel">
    <div class="content-header">
      <span class="lesson-number">第七章：工程入门 · 第 7 课</span>
      <h2 class="lesson-title">ESLint 与 Prettier — 代码的调音师</h2>
    </div>

    <div class="content-body">
      <div v-if="analogy" class="analogy-box">
        <span class="analogy-icon">🎵</span>
        <p class="analogy-text" v-html="parseInline(analogy)"></p>
      </div>

      <section
        v-for="(sec, i) in sections" :key="i"
        :class="['content-section', 'section-' + sec.type]"
      >
        <h3 v-if="sec.title" class="section-title" v-html="parseInline(sec.title)"></h3>
        <div class="section-content" v-html="parseContent(sec.content)"></div>
      </section>

      <div v-if="listen" class="listen-box">
        <span class="listen-icon">🎧</span>
        <div>
          <p class="listen-label">推荐聆听</p>
          <p class="listen-text" v-html="parseInline(listen)"></p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.content-panel {
  height: 100%;
  display: flex;
  flex-direction: column;
  background: var(--color-panel);
}

.content-header {
  padding: var(--sp-4) var(--sp-5);
  border-bottom: 1px solid var(--color-border-light);
  flex-shrink: 0;
}

.lesson-number {
  font-size: var(--fs-xs);
  color: var(--color-gold);
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.1em;
}

.lesson-title {
  margin-top: var(--sp-1);
  font-size: var(--fs-xl);
}

.content-body {
  flex: 1;
  overflow-y: auto;
  padding: var(--sp-4) var(--sp-5);
}

.analogy-box {
  display: flex;
  gap: var(--sp-3);
  padding: var(--sp-4);
  background: var(--color-bg-warm);
  border-left: 3px solid var(--color-gold);
  border-radius: 0 var(--radius-sm) var(--radius-sm) 0;
  margin-bottom: var(--sp-6);
}

.analogy-icon {
  font-size: 1.3rem;
  flex-shrink: 0;
}

.analogy-text {
  font-size: var(--fs-sm);
  line-height: 1.7;
  color: var(--color-text-light);
}

.content-section {
  margin-bottom: var(--sp-5);
}

.section-title {
  font-size: var(--fs-base);
  color: var(--color-accent);
  margin-bottom: var(--sp-2);
  padding-bottom: var(--sp-1);
  border-bottom: 1px solid var(--color-border-light);
}

.section-content {
  font-size: var(--fs-sm);
  line-height: 1.8;
  color: var(--color-text);
}

.section-task {
  padding: var(--sp-4);
  background: #FFF8F0;
  border: 1px solid var(--color-gold-light);
  border-radius: var(--radius-md);
}

.section-hint {
  padding: var(--sp-3) var(--sp-4);
  background: #F5F0FF;
  border-radius: var(--radius-sm);
  font-size: var(--fs-sm);
}

.section-example {
  padding: var(--sp-3);
  background: var(--color-bg-warm);
  border-radius: var(--radius-sm);
}

:deep(.code-block) {
  background: #2D2520;
  color: #E8DCC8;
  padding: var(--sp-3) var(--sp-4);
  border-radius: var(--radius-sm);
  overflow-x: auto;
  font-family: var(--font-code);
  font-size: var(--fs-xs);
  line-height: 1.6;
  margin: var(--sp-2) 0;
}

:deep(.inline-code) {
  background: var(--color-bg-warm);
  padding: 1px 6px;
  border-radius: 3px;
  font-family: var(--font-code);
  font-size: 0.9em;
  color: var(--color-accent);
}

:deep(p) {
  margin-bottom: var(--sp-2);
}

.listen-box {
  display: flex;
  gap: var(--sp-3);
  padding: var(--sp-4);
  background: #F5F9F0;
  border-radius: var(--radius-md);
  margin-top: var(--sp-6);
}

.listen-icon {
  font-size: 1.3rem;
  flex-shrink: 0;
}

.listen-label {
  font-size: var(--fs-xs);
  font-weight: 600;
  color: var(--color-success);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.listen-text {
  font-size: var(--fs-sm);
  color: var(--color-text-light);
  margin-top: var(--sp-1);
}

:deep(.term-tip) {
  border-bottom: 1.5px dashed var(--color-gold);
  color: var(--color-accent);
  cursor: help;
  transition: all 0.15s;
  position: relative;
}

:deep(.term-tip:hover) {
  background: rgba(201, 169, 110, 0.12);
  border-bottom-color: var(--color-gold-light);
}
</style>

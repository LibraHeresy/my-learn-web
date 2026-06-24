<script setup lang="ts">
import { ref, watch, onMounted, onBeforeUnmount, nextTick } from 'vue'
import { EditorView, keymap, lineNumbers, highlightActiveLine, placeholder } from '@codemirror/view'
import { EditorState } from '@codemirror/state'
import { html } from '@codemirror/lang-html'
import { css } from '@codemirror/lang-css'
import { javascript } from '@codemirror/lang-javascript'
import { oneDark } from '@codemirror/theme-one-dark'
import { defaultKeymap, history, historyKeymap } from '@codemirror/commands'
import { autocompletion, closeBrackets } from '@codemirror/autocomplete'
import { lintGutter, setDiagnostics } from '@codemirror/lint'
import type { UserCode } from '../types'

// ─── 字体大小 ─────────────────────────────────────────────────────────────

// ─── Props / Emits ────────────────────────────────────────────────────────
const props = defineProps<{
  modelValue: UserCode
  showReset?: boolean
  livePreview?: boolean
  errorLine?: number            // Wave 2.3: 预览错误行号
  isMaximized?: boolean         // Wave 1.4: 全屏状态
}>()

const emit = defineEmits<{
  'update:modelValue': [value: UserCode]
  run: []
  reset: []
  'update:livePreview': [value: boolean]
  maximize: []                  // Wave 1.4: 请求全屏
  format: []                    // Wave 4.2: 格式化（父层处理）
}>()

// ─── 标签页 ───────────────────────────────────────────────────────────────
type Tab = 'html' | 'css' | 'js'
const activeTab = ref<Tab>('html')
const tabs: { key: Tab; label: string }[] = [
  { key: 'html', label: 'HTML' },
  { key: 'css', label: 'CSS' },
  { key: 'js', label: 'JS' }
]

// ─── 历史快照下拉 ─────────────────────────────────────────────────────────

// ─── 编辑器核心 ───────────────────────────────────────────────────────────
const editorHost = ref<HTMLDivElement>()
let editorView: EditorView | null = null

function getLangExtension(tab: Tab) {
  switch (tab) {
    case 'html': return [html()]
    case 'css':  return [css(), closeBrackets()]
    case 'js':   return [javascript({ typescript: false }), closeBrackets()]
  }
}

function createEditorView(code: UserCode, tab: Tab) {
  if (!editorHost.value) return

  const tabLabels: Record<Tab, string> = {
    html: '本课程无 HTML 代码',
    css:  '本课程无 CSS 代码',
    js:   '本课程无 JS 代码'
  }

  editorView = new EditorView({
    state: EditorState.create({
      doc: code[tab],
      extensions: [
        lineNumbers(),
        highlightActiveLine(),
        lintGutter(),
        history(),
        keymap.of([
          ...defaultKeymap,
          ...historyKeymap,
          // Wave 1.1: 快捷键运行
          { key: 'Ctrl-Enter', mac: 'Cmd-Enter', run: () => { emit('run'); return true } },
          { key: 'Ctrl-s',     mac: 'Cmd-s',     run: () => { emit('run'); return true },
            preventDefault: true },
        ]),
        ...getLangExtension(tab),
        oneDark,
        EditorView.lineWrapping,
        autocompletion(),           // Wave 1.3: 自动补全 UI
        ...(code[tab].trim() === '' ? [placeholder(tabLabels[tab])] : []),
        EditorView.updateListener.of((update) => {
          if (update.docChanged) {
            emit('update:modelValue', {
              ...props.modelValue,
              [tab]: update.state.doc.toString()
            })
          }
        })
      ]
    }),
    parent: editorHost.value
  })
}

function createEditor() {
  createEditorView(props.modelValue, activeTab.value)
}

function destroyEditor() {
  if (editorView) {
    editorView.destroy()
    editorView = null
  }
}

function switchTab(tab: Tab) {
  if (tab === activeTab.value) return
  const oldTab = activeTab.value
  if (editorView) {
    emit('update:modelValue', {
      ...props.modelValue,
      [oldTab]: editorView.state.doc.toString()
    })
  }
  destroyEditor()
  activeTab.value = tab
  nextTick(() => createEditorView({ ...props.modelValue }, tab))
}

// Wave 2.3: 错误行高亮
watch(() => props.errorLine, (lineno) => {
  if (!editorView) return
  if (!lineno || lineno <= 0) {
    editorView.dispatch(setDiagnostics(editorView.state, []))
    return
  }
  // JS tab 才高亮（错误来自 <script>），其他 tab 清空
  if (activeTab.value !== 'js') return
  try {
    const doc = editorView.state.doc
    const line = doc.line(Math.min(lineno, doc.lines))
    editorView.dispatch(setDiagnostics(editorView.state, [{
      from: line.from,
      to: line.to,
      severity: 'error',
      message: `运行时错误（约 ${lineno} 行）`,
    }]))
  } catch { /* 行号越界时忽略 */ }
})

// 切换 tab 时清除诊断
watch(activeTab, () => {
  if (editorView) {
    editorView.dispatch(setDiagnostics(editorView.state, []))
  }
})

watch(() => props.modelValue, (newVal) => {
  if (editorView && activeTab.value) {
    const editorContent = editorView.state.doc.toString()
    const modelContent = newVal[activeTab.value]
    if (editorContent !== modelContent) {
      editorView.dispatch({
        changes: { from: 0, to: editorContent.length, insert: modelContent }
      })
    }
  }
})

onMounted(() => { nextTick(() => createEditor()) })
onBeforeUnmount(() => { destroyEditor() })

// ─── 格式化状态 ───────────────────────────────────────────────────────────
const formatting = ref(false)

async function doFormat() {
  if (formatting.value || !editorView) return
  formatting.value = true
  try {
    const currentCode = editorView.state.doc.toString()
    const { format } = await import('prettier/standalone')
    const parserMap: Record<Tab, string> = { html: 'html', css: 'css', js: 'babel' }
    const pluginMap: Record<Tab, () => Promise<unknown>> = {
      html: () => import('prettier/plugins/html'),
      css:  () => import('prettier/plugins/postcss'),
      js:   () => import('prettier/plugins/babel').then(async (b) => {
        const e = await import('prettier/plugins/estree')
        return [b.default ?? b, e.default ?? e]
      }),
    }
    const rawPlugin = await pluginMap[activeTab.value]()
    const plugins = Array.isArray(rawPlugin) ? rawPlugin : [rawPlugin]
    const result = await format(currentCode, {
      parser: parserMap[activeTab.value],
      plugins,
      printWidth: 80,
      tabWidth: 2,
      singleQuote: true,
    })
    emit('update:modelValue', { ...props.modelValue, [activeTab.value]: result })
  } catch (err) {
    console.warn('[Prettier] 格式化失败:', err)
  } finally {
    formatting.value = false
  }
}
</script>

<template>
  <div class="editor-panel">
    <div class="editor-tabs">
      <!-- 语言标签 -->
      <button
        v-for="tab in tabs"
        :key="tab.key"
        :class="['editor-tab', { active: activeTab === tab.key }]"
        @click="switchTab(tab.key)"
      >
        {{ tab.label }}
      </button>

      <div class="editor-action-btns">
        <button class="editor-action-btn editor-action-btn--primary" title="运行代码 (Ctrl+Enter)" @click="emit('run')">
          ▶ 运行
        </button>
        <button v-if="showReset" class="editor-action-btn" title="重置为初始代码" @click="emit('reset')">
          ↺ 重置
        </button>
        <button class="editor-action-btn" title="格式化代码 (Prettier)" @click="doFormat">
          ✨ 格式化
        </button>
        <button
          class="editor-action-btn"
          :title="isMaximized ? '退出全屏 (Esc)' : '全屏编辑器'"
          @click="emit('maximize')"
        >
          {{ isMaximized ? '↙️ 退出全屏' : '↗️ 全屏' }}
        </button>
      </div>

      <!-- 实时预览开关 -->
      <div
        class="live-toggle-wrap"
        :title="livePreview ? '实时预览：开（编辑后自动刷新预览）' : '实时预览：关（需手动点击运行）'"
        @click="emit('update:livePreview', !livePreview)"
      >
        <span :class="['live-label', { 'live-label--on': livePreview }]">实时</span>
        <div :class="['live-toggle', { 'live-toggle--on': livePreview }]">
          <span class="live-toggle-thumb" />
        </div>
      </div>
    </div>

    <div ref="editorHost" class="editor-host" />
  </div>
</template>

<style scoped>
.editor-panel {
  display: flex;
  flex-direction: column;
  height: 100%;
  background: var(--color-editor-bg);
}

.editor-tabs {
  display: flex;
  gap: 0;
  align-items: center;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  flex-shrink: 0;
  overflow-x: auto;
  overflow-y: hidden;
  scrollbar-width: none;
}
.editor-tabs::-webkit-scrollbar { display: none; }

.editor-tab {
  padding: var(--sp-2) var(--sp-5);
  font-size: var(--fs-sm);
  font-weight: 500;
  font-family: var(--font-code);
  color: rgba(255, 255, 255, 0.45);
  background: transparent;
  border-bottom: 2px solid transparent;
  border-radius: 0;
  transition: all var(--transition);
  flex-shrink: 0;
}
.editor-tab:hover { color: rgba(255, 255, 255, 0.7); background: rgba(255, 255, 255, 0.04); }
.editor-tab.active { color: var(--color-gold-light); border-bottom-color: var(--color-gold); }

/* ─── 按钮组 ─── */
.editor-action-btns {
  display: flex;
  margin-left: auto;
  margin-right: var(--sp-2);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: var(--radius-sm);
  overflow: hidden;
  flex-shrink: 0;
  align-self: center;
}

.editor-action-btn {
  display: flex;
  align-items: center;
  gap: 3px;
  padding: var(--sp-1) var(--sp-3);
  font-size: var(--fs-xs);
  color: rgba(255, 255, 255, 0.6);
  background: transparent;
  border: none;
  border-right: 1px solid rgba(255, 255, 255, 0.1);
  transition: all var(--transition);
  line-height: 1;
  white-space: nowrap;
}
.editor-action-btn:last-child {
  border-right: none;
}
.editor-action-btn:hover {
  color: #fff;
  background: rgba(255, 255, 255, 0.08);
}

.editor-action-btn--primary {
  color: #fff;
  background: var(--color-gold);
}
.editor-action-btn--primary:hover {
  background: var(--color-gold-light);
  color: var(--color-bg);
}

/* ─── 通用图标按钮 ─── */
.editor-icon-btn {
  padding: 0 var(--sp-2);
  height: 26px;
  font-size: var(--fs-xs);
  background: transparent;
  border-radius: var(--radius-sm);
  align-self: center;
  transition: all var(--transition);
  flex-shrink: 0;
  white-space: nowrap;
}
.editor-icon-btn:hover { color: rgba(255, 255, 255, 0.9); background: rgba(255, 255, 255, 0.08); }
.editor-icon-btn.loading { opacity: 0.5; cursor: wait; }

/* ─── 实时预览开关 ─── */
.live-toggle-wrap {
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 0 var(--sp-3);
  cursor: pointer;
  user-select: none;
  border-left: 1px solid rgba(255, 255, 255, 0.06);
  flex-shrink: 0;
}
.live-label {
  font-size: 11px;
  color: rgba(255, 255, 255, 0.35);
  font-family: var(--font-code);
  transition: color 0.2s;
  white-space: nowrap;
}
.live-label--on { color: var(--color-gold-light); }
.live-toggle-wrap:hover .live-label { color: rgba(255, 255, 255, 0.65); }
.live-toggle-wrap:hover .live-label--on { color: var(--color-gold-light); }

.live-toggle {
  position: relative;
  width: 30px;
  height: 17px;
  border-radius: 9px;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.15);
  flex-shrink: 0;
  transition: background 0.2s, border-color 0.2s;
}
.live-toggle--on { background: var(--color-gold); border-color: transparent; }
.live-toggle-thumb {
  position: absolute;
  top: 2px;
  left: 2px;
  width: 11px;
  height: 11px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.4);
  transition: transform 0.2s ease, background 0.2s;
}
.live-toggle--on .live-toggle-thumb { transform: translateX(13px); background: #fff; }

/* ─── 编辑器主体 ─── */
.editor-host {
  flex: 1;
  overflow: auto;
}

/* ─── Wave 2.3: lint 沟槽颜色在 dark 主题下微调 ─── */
:deep(.cm-lint-marker-error) { color: #E06C75; }
:deep(.cm-diagnosticText) { color: #F0C0B8; }
</style>

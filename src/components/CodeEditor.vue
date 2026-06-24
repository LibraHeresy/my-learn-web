<script setup lang="ts">
import { ref, watch, onMounted, onBeforeUnmount, nextTick } from 'vue'
import { EditorView, keymap, lineNumbers, highlightActiveLine, placeholder } from '@codemirror/view'
import { EditorState } from '@codemirror/state'
import { html } from '@codemirror/lang-html'
import { css } from '@codemirror/lang-css'
import { javascript } from '@codemirror/lang-javascript'
import { oneDark } from '@codemirror/theme-one-dark'
import { defaultKeymap, history, historyKeymap } from '@codemirror/commands'

const props = defineProps<{
  modelValue: { html: string; css: string; js: string }
  showReset?: boolean
  livePreview?: boolean
}>()

const emit = defineEmits<{
  'update:modelValue': [value: { html: string; css: string; js: string }]
  run: []
  reset: []
  'update:livePreview': [value: boolean]
}>()

type Tab = 'html' | 'css' | 'js'
const activeTab = ref<Tab>('html')
const tabs: { key: Tab; label: string }[] = [
  { key: 'html', label: 'HTML' },
  { key: 'css', label: 'CSS' },
  { key: 'js', label: 'JS' }
]

const editorHost = ref<HTMLDivElement>()
let editorView: EditorView | null = null

// 获取当前激活标签的语言扩展
function getLangExtension(tab: Tab) {
  switch (tab) {
    case 'html': return [html()]
    case 'css': return [css()]
    case 'js': return [javascript()]
  }
}

function createEditorView(code: { html: string; css: string; js: string }, tab: Tab) {
  if (!editorHost.value) return

  const tabLabels: Record<Tab, string> = {
    html: '本课程无 HTML 代码',
    css: '本课程无 CSS 代码',
    js: '本课程无 JS 代码'
  }

  editorView = new EditorView({
    state: EditorState.create({
      doc: code[tab],
      extensions: [
        lineNumbers(),
        highlightActiveLine(),
        history(),
        keymap.of([...defaultKeymap, ...historyKeymap]),
        ...getLangExtension(tab),
        oneDark,
        EditorView.lineWrapping,
        ...(code[tab].trim() === '' ? [placeholder(tabLabels[tab])] : []),
        EditorView.updateListener.of((update) => {
          if (update.docChanged) {
            // 使用 props.modelValue 而非闭包变量 code：
            // 切换课程时 code 是旧课程的快照，而 props.modelValue 始终是最新值，
            // 避免将过时的 CSS/JS 混入当前 HTML 更新导致预览丢失样式。
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

watch(() => props.modelValue, (newVal) => {
  if (editorView && activeTab.value) {
    const editorContent = editorView.state.doc.toString()
    const modelContent = newVal[activeTab.value]
    if (editorContent !== modelContent) {
      editorView.dispatch({
        changes: {
          from: 0,
          to: editorContent.length,
          insert: modelContent
        }
      })
    }
  }
})

onMounted(() => {
  nextTick(() => createEditor())
})

onBeforeUnmount(() => {
  destroyEditor()
})
</script>

<template>
  <div class="editor-panel">
    <div class="editor-tabs">
      <button
        v-for="tab in tabs"
        :key="tab.key"
        :class="['editor-tab', { active: activeTab === tab.key }]"
        @click="switchTab(tab.key)"
      >
        {{ tab.label }}
      </button>
      <button class="editor-run-btn" @click="emit('run')" title="运行代码">
        ▶ 运行
      </button>
      <button v-if="showReset" class="editor-reset-btn" @click="emit('reset')" title="重置为初始代码">
        ↺ 重置
      </button>

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
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  flex-shrink: 0;
}

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
}

.editor-tab:hover {
  color: rgba(255, 255, 255, 0.7);
  background: rgba(255, 255, 255, 0.04);
}

.editor-tab.active {
  color: var(--color-gold-light);
  border-bottom-color: var(--color-gold);
}

.editor-run-btn {
  margin-left: auto;
  margin-right: var(--sp-2);
  padding: var(--sp-1) var(--sp-4);
  font-size: var(--fs-xs);
  font-weight: 600;
  color: #fff;
  background: var(--color-gold);
  border-radius: var(--radius-sm);
  align-self: center;
  transition: all var(--transition);
  flex-shrink: 0;
}

.editor-run-btn:hover {
  background: var(--color-gold-light);
  color: var(--color-bg);
}

.editor-reset-btn {
  margin-right: var(--sp-2);
  padding: var(--sp-1) var(--sp-4);
  font-size: var(--fs-xs);
  font-weight: 600;
  color: rgba(255, 255, 255, 0.6);
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: var(--radius-sm);
  align-self: center;
  transition: all var(--transition);
  flex-shrink: 0;
}

.editor-reset-btn:hover {
  color: #fff;
  border-color: rgba(255, 255, 255, 0.4);
  background: rgba(255, 255, 255, 0.05);
}

/* ===== 实时预览开关 ===== */
.live-toggle-wrap {
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 0 var(--sp-3);
  cursor: pointer;
  user-select: none;
  border-left: 1px solid rgba(255, 255, 255, 0.06);
}

.live-label {
  font-size: 11px;
  color: rgba(255, 255, 255, 0.35);
  font-family: var(--font-code);
  transition: color 0.2s;
  white-space: nowrap;
}

.live-label--on {
  color: var(--color-gold-light);
}

.live-toggle-wrap:hover .live-label {
  color: rgba(255, 255, 255, 0.65);
}

.live-toggle-wrap:hover .live-label--on {
  color: var(--color-gold-light);
}

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

.live-toggle--on {
  background: var(--color-gold);
  border-color: transparent;
}

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

.live-toggle--on .live-toggle-thumb {
  transform: translateX(13px);
  background: #fff;
}

.editor-host {
  flex: 1;
  overflow: auto;
}
</style>

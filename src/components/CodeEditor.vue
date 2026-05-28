<script setup lang="ts">
import { ref, watch, onMounted, onBeforeUnmount, nextTick } from 'vue'
import { EditorView, keymap, lineNumbers, highlightActiveLine } from '@codemirror/view'
import { EditorState } from '@codemirror/state'
import { html } from '@codemirror/lang-html'
import { css } from '@codemirror/lang-css'
import { javascript } from '@codemirror/lang-javascript'
import { oneDark } from '@codemirror/theme-one-dark'
import { defaultKeymap, history, historyKeymap } from '@codemirror/commands'

const props = defineProps<{
  modelValue: { html: string; css: string; js: string }
}>()

const emit = defineEmits<{
  'update:modelValue': [value: { html: string; css: string; js: string }]
  run: []
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
        EditorView.updateListener.of((update) => {
          if (update.docChanged) {
            emit('update:modelValue', {
              ...code,
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

  // 保存当前编辑器内容到旧 tab
  const code = editorView
    ? { ...props.modelValue, [oldTab]: editorView.state.doc.toString() }
    : props.modelValue

  destroyEditor()
  activeTab.value = tab
  nextTick(() => createEditorView(code, tab))
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
}, { deep: true })

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
}

.editor-run-btn:hover {
  background: var(--color-gold-light);
  color: var(--color-bg);
}

.editor-host {
  flex: 1;
  overflow: auto;
}
</style>

<script setup lang="ts">
import { ref, watch, onMounted, onBeforeUnmount } from 'vue'

const props = defineProps<{
  srcdoc: string
}>()

const iframeRef = ref<HTMLIFrameElement>()
const errorState = ref<{
  message: string
  lineno: number
  hint: string
  typeLabel: string
} | null>(null)

const errorExpanded = ref(false)

function getErrorType(msg: string): string {
  if (msg.includes('ReferenceError')) return '引用错误'
  if (msg.includes('SyntaxError')) return '语法错误'
  if (msg.includes('TypeError')) return '类型错误'
  if (msg.includes('RangeError')) return '范围错误'
  return '运行时错误'
}

function onMessage(e: MessageEvent) {
  if (e.data && e.data.type === 'code-error') {
    const err = e.data.error
    errorState.value = {
      message: err.message,
      lineno: err.lineno,
      hint: err.hint || '',
      typeLabel: getErrorType(err.message)
    }
    errorExpanded.value = false
  }
}

function loadPreview(doc: string) {
  if (!iframeRef.value) return
  const iframe = iframeRef.value
  const blob = new Blob([doc], { type: 'text/html' })
  const url = URL.createObjectURL(blob)
  iframe.src = url
  iframe.onload = () => {
    URL.revokeObjectURL(url)
  }
}

onMounted(() => {
  window.addEventListener('message', onMessage)
  // 初始加载：watch immediate 在挂载前触发，那时 iframeRef 还不存在，所以 onMounted 补一次
  if (props.srcdoc) {
    loadPreview(props.srcdoc)
  }
})

onBeforeUnmount(() => {
  window.removeEventListener('message', onMessage)
})

watch(
  () => props.srcdoc,
  (doc) => {
    // 每次更新源码时清除旧错误
    errorState.value = null
    errorExpanded.value = false

    loadPreview(doc)
  },
  { immediate: true }
)
</script>

<template>
  <div class="preview-panel">
    <div class="preview-header">
      <span class="preview-label">预览</span>
      <span v-if="errorState" class="error-indicator">⚠ 有错误</span>
    </div>
    <div class="preview-frame-wrap">
      <iframe
        ref="iframeRef"
        class="preview-iframe"
        sandbox="allow-scripts allow-same-origin"
        title="实时预览"
      />
    </div>

    <!-- 可展开的错误面板 -->
    <Transition name="error-slide">
      <div v-if="errorState" :class="['error-panel', { expanded: errorExpanded }]">
        <div class="error-summary" @click="errorExpanded = !errorExpanded">
          <span class="error-type-badge">{{ errorState.typeLabel }}</span>
          <span class="error-msg-preview">{{ errorState.message }}</span>
          <span class="error-expand-icon">{{ errorExpanded ? '▾' : '▸' }}</span>
          <button class="error-dismiss" @click.stop="errorState = null" title="关闭">✕</button>
        </div>

        <div v-if="errorExpanded" class="error-detail">
          <div class="error-line">
            <span class="error-label">错误详情</span>
            <code class="error-code">{{ errorState.message }}</code>
          </div>
          <div v-if="errorState.lineno > 0" class="error-line">
            <span class="error-label">大约行号</span>
            <span class="error-value">{{ errorState.lineno }}</span>
          </div>
          <div class="error-line error-hint-line">
            <span class="error-label">💡 试试这样改</span>
            <span class="error-hint">{{ errorState.hint }}</span>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.preview-panel {
  display: flex;
  flex-direction: column;
  height: 100%;
  background: var(--color-panel);
}

.preview-header {
  padding: var(--sp-2) var(--sp-4);
  border-bottom: 1px solid var(--color-border-light);
  flex-shrink: 0;
  display: flex;
  align-items: center;
  gap: var(--sp-3);
}

.preview-label {
  font-size: var(--fs-xs);
  font-weight: 600;
  color: var(--color-text-light);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.error-indicator {
  font-size: var(--fs-xs);
  color: #D4534A;
  font-weight: 600;
  animation: error-blink 1.5s ease-in-out 3;
}

@keyframes error-blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.35; }
}

.preview-frame-wrap {
  flex: 1;
  background: #fff;
  position: relative;
}

.preview-iframe {
  width: 100%;
  height: 100%;
  border: none;
}

/* ===== 错误面板 ===== */
.error-panel {
  flex-shrink: 0;
  border-top: 1px solid #D4534A;
  background: #3D1F1F;
  cursor: pointer;
  user-select: none;
}

.error-summary {
  display: flex;
  align-items: center;
  gap: var(--sp-2);
  padding: var(--sp-2) var(--sp-3);
  min-height: 36px;
}

.error-type-badge {
  font-size: 11px;
  font-weight: 700;
  background: #D4534A;
  color: #fff;
  padding: 1px 8px;
  border-radius: 3px;
  flex-shrink: 0;
  letter-spacing: 0.03em;
}

.error-msg-preview {
  flex: 1;
  font-size: 12px;
  color: #F0C0B8;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-family: var(--font-code);
}

.error-expand-icon {
  font-size: 12px;
  color: #C08078;
  flex-shrink: 0;
}

.error-dismiss {
  background: none;
  border: none;
  color: #C08078;
  font-size: 14px;
  cursor: pointer;
  padding: 0 4px;
  flex-shrink: 0;
  line-height: 1;
}

.error-dismiss:hover {
  color: #F0C0B8;
}

.error-detail {
  padding: var(--sp-2) var(--sp-3) var(--sp-3);
  border-top: 1px solid rgba(212, 83, 74, 0.2);
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.error-line {
  display: flex;
  gap: var(--sp-2);
  align-items: baseline;
}

.error-label {
  font-size: 11px;
  font-weight: 600;
  color: #C08078;
  flex-shrink: 0;
  min-width: 56px;
}

.error-code {
  font-size: 12px;
  color: #F0C0B8;
  font-family: var(--font-code);
  word-break: break-all;
  background: rgba(0, 0, 0, 0.2);
  padding: 2px 6px;
  border-radius: 3px;
}

.error-value {
  font-size: 12px;
  color: #E8DCC8;
  font-family: var(--font-code);
}

.error-hint-line {
  margin-top: 2px;
}

.error-hint {
  font-size: 12px;
  color: #FFD580;
  line-height: 1.5;
}

/* ===== 错误面板动画 ===== */
.error-slide-enter-active {
  transition: all 0.35s var(--ease-out);
  max-height: 200px;
}
.error-slide-leave-active {
  transition: all 0.2s var(--ease-in);
  max-height: 200px;
}

.error-slide-enter-from {
  max-height: 0;
  opacity: 0;
  transform: translateY(100%);
}
.error-slide-leave-to {
  max-height: 0;
  opacity: 0;
}

.error-type-badge {
  animation: pulse-glow 1.5s ease-in-out 1;
  animation-delay: 0.3s;
}
</style>

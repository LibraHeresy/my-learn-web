<script setup lang="ts">
import { ref, watch, onMounted, onBeforeUnmount } from "vue";

const props = defineProps<{
  srcdoc: string;
  isMaximized?: boolean; // Wave 1.4: 外部控制全屏状态
}>();

const emit = defineEmits<{
  maximize: []; // Wave 1.4
  "preview-error": [info: { lineno: number; message: string }]; // Wave 2.3
}>();

const iframeRef = ref<HTMLIFrameElement>();
const loading = ref(false);

function goBack() {
  iframeRef.value?.contentWindow?.history.back();
}

function goForward() {
  iframeRef.value?.contentWindow?.history.forward();
}

function refresh() {
  if (props.srcdoc) {
    loadPreview(props.srcdoc);
  }
}

const errorState = ref<{
  message: string;
  lineno: number;
  hint: string;
  typeLabel: string;
} | null>(null);

const errorExpanded = ref(false);

function getErrorType(msg: string): string {
  if (msg.includes("SyntaxError")) return "语法错误";
  if (msg.includes("ReferenceError")) return "引用错误";
  if (msg.includes("TypeError")) return "类型错误";
  if (msg.includes("RangeError")) return "范围错误";
  if (msg.includes("URIError")) return "地址编码错误";
  if (msg.includes("InternalError")) return "引擎内部错误";
  return "运行时错误";
}

function onMessage(e: MessageEvent) {
  if (e.data && e.data.type === "code-error") {
    const err = e.data.error;
    errorState.value = {
      message: err.message,
      lineno: err.lineno,
      hint: err.hint || "",
      typeLabel: getErrorType(err.message),
    };
    errorExpanded.value = false;
    // Wave 2.3: 通知父组件错误行号，用于编辑器高亮
    emit("preview-error", { lineno: err.lineno, message: err.message });
  }
}

let prevUrl: string | null = null;

function loadPreview(doc: string) {
  if (!iframeRef.value) return;
  const iframe = iframeRef.value;
  // Revoke previous blob URL to prevent memory leaks on rapid updates
  if (prevUrl) {
    URL.revokeObjectURL(prevUrl);
    prevUrl = null;
  }
  loading.value = true;
  const blob = new Blob([doc], { type: "text/html" });
  prevUrl = URL.createObjectURL(blob);
  iframe.src = prevUrl;
  iframe.onload = () => {
    loading.value = false;
    if (prevUrl) URL.revokeObjectURL(prevUrl);
    prevUrl = null;
  };
}

onMounted(() => {
  window.addEventListener("message", onMessage);
  // 初始加载：watch immediate 在挂载前触发，那时 iframeRef 还不存在，所以 onMounted 补一次
  if (props.srcdoc) {
    loadPreview(props.srcdoc);
  }
});

onBeforeUnmount(() => {
  window.removeEventListener("message", onMessage);
});

watch(
  () => props.srcdoc,
  (doc) => {
    // 每次更新源码时清除旧错误
    errorState.value = null;
    errorExpanded.value = false;

    loadPreview(doc);
  },
  { immediate: true },
);
</script>

<template>
  <div class="preview-panel">
    <div class="preview-header">
      <div class="preview-header-right">
        <span v-if="errorState" class="error-indicator">⚠ 有错误</span>
        <span class="preview-label">预览</span>
      </div>
      <div class="preview-nav-btns">
        <button class="preview-nav-btn" @click="goBack" title="后退">
          <span class="nav-icon">←</span>
          <span class="nav-text">后退</span>
        </button>
        <button class="preview-nav-btn" @click="goForward" title="前进">
          <span class="nav-icon">→</span>
          <span class="nav-text">前进</span>
        </button>
        <button class="preview-nav-btn" @click="refresh" title="刷新">
          <span class="nav-icon">↻</span>
          <span class="nav-text">刷新</span>
        </button>
        <!-- Wave 1.4: 全屏按钮 -->
        <button
          class="preview-nav-btn"
          :title="isMaximized ? '退出全屏 (Esc)' : '全屏预览'"
          @click="emit('maximize')"
        >
          {{ isMaximized ? "↙️ 退出全屏" : "↗️ 全屏" }}
        </button>
      </div>
    </div>
    <div class="preview-frame-wrap">
      <Transition name="loading-fade">
        <div v-if="loading" class="preview-loading">
          <span class="loading-notes">🎵</span>
          <span class="loading-text">运行中…</span>
        </div>
      </Transition>
      <iframe
        ref="iframeRef"
        class="preview-iframe"
        sandbox="allow-scripts allow-same-origin"
        title="实时预览"
      />
    </div>

    <!-- 可展开的错误面板 -->
    <Transition name="error-slide">
      <div
        v-if="errorState"
        :class="['error-panel', { expanded: errorExpanded }]"
      >
        <div class="error-summary" @click="errorExpanded = !errorExpanded">
          <span class="error-type-badge">{{ errorState.typeLabel }}</span>
          <span class="error-msg-preview">{{ errorState.message }}</span>
          <span class="error-expand-icon">{{ errorExpanded ? "▾" : "▸" }}</span>
          <button
            class="error-dismiss"
            @click.stop="errorState = null"
            title="关闭"
          >
            ✕
          </button>
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
  padding: var(--sp-1) var(--sp-3);
  border-bottom: 1px solid var(--color-border-light);
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.preview-nav-btns {
  display: flex;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  overflow: hidden;
}

.preview-nav-btn {
  display: flex;
  align-items: center;
  gap: var(--sp-1);
  padding: var(--sp-1) var(--sp-2);
  font-size: var(--fs-xs);
  color: var(--color-text-light);
  background: transparent;
  border: none;
  border-right: 1px solid var(--color-border);
  cursor: pointer;
  transition: all var(--transition);
  line-height: 1;
  white-space: nowrap;
}

.preview-nav-btn .nav-icon {
  font-size: 13px;
}

.preview-nav-btn .nav-text {
  font-size: var(--fs-xs);
}

.preview-nav-btn:last-child {
  border-right: none;
}

.preview-nav-btn:hover {
  background: var(--color-bg-warm);
  color: var(--color-text);
}

.preview-header-right {
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
  flex-shrink: 0;
}

.preview-maximize-btn {
  padding: 0 4px;
  font-size: 14px;
  color: var(--color-text-light);
  background: transparent;
  border-radius: var(--radius-sm);
  flex-shrink: 0;
}

.error-indicator {
  font-size: var(--fs-xs);
  color: var(--color-error-accent);
  font-weight: 600;
  animation: error-blink 1.5s ease-in-out 3;
}

@keyframes error-blink {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.35;
  }
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

/* ─── 加载动画 ─── */
.preview-loading {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: var(--sp-2);
  background: rgba(255, 255, 255, 0.85);
  z-index: 2;
}

.loading-notes {
  font-size: 2rem;
  animation: notes-bounce 0.6s ease-in-out infinite alternate;
}

.loading-text {
  font-size: var(--fs-xs);
  color: var(--color-text-light);
}

@keyframes notes-bounce {
  from { transform: translateY(0); }
  to { transform: translateY(-6px); }
}

.loading-fade-leave-active {
  transition: opacity 0.3s var(--ease-out);
}
.loading-fade-leave-to {
  opacity: 0;
}

/* ===== 错误面板 ===== */
.error-panel {
  flex-shrink: 0;
  border-top: 1px solid var(--color-error-accent);
  background: var(--color-error-panel-bg);
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
  font-size: var(--fs-xs);
  font-weight: 700;
  background: var(--color-error-accent);
  color: var(--color-text-inverse);
  padding: 1px 8px;
  border-radius: var(--radius-xs);
  flex-shrink: 0;
  letter-spacing: 0.03em;
}

.error-msg-preview {
  flex: 1;
  font-size: 12px;
  color: var(--color-error-text);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-family: var(--font-code);
}

.error-expand-icon {
  font-size: 12px;
  color: var(--color-error-muted);
  flex-shrink: 0;
}

.error-dismiss {
  background: none;
  border: none;
  color: var(--color-error-muted);
  font-size: 14px;
  cursor: pointer;
  padding: 0 4px;
  flex-shrink: 0;
  line-height: 1;
}

.error-dismiss:hover {
  color: var(--color-error-text);
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
  color: var(--color-error-muted);
  flex-shrink: 0;
  min-width: 56px;
}

.error-code {
  font-size: var(--fs-xs);
  color: var(--color-error-text);
  font-family: var(--font-code);
  word-break: break-all;
  background: rgba(0, 0, 0, 0.2);
  padding: 2px var(--sp-2);
  border-radius: var(--radius-xs);
}

.error-value {
  font-size: var(--fs-xs);
  color: var(--color-editor-text);
  font-family: var(--font-code);
}

.error-hint-line {
  margin-top: 2px;
}

.error-hint {
  font-size: var(--fs-xs);
  color: var(--color-error-hint);
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

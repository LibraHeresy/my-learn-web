<script setup lang="ts">
import { ref, watch, onMounted, onBeforeUnmount } from "vue";

const props = defineProps<{
  srcdoc: string;
  isMaximized?: boolean; // 外部控制全屏状态
}>();

const emit = defineEmits<{
  maximize: []; // 请求全屏
  "preview-error": [info: { lineno: number; message: string }];
  "task-assert": [passed: string[]]; // 任务自动验收：通过断言的 key 列表
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
    // 通知父组件错误行号，用于编辑器高亮
    emit("preview-error", { lineno: err.lineno, message: err.message });
  }
  if (e.data && e.data.type === "console-output") {
    const level = ["log", "warn", "error", "info"].includes(e.data.level) ? e.data.level : "log";
    consoleLogs.value.push({ level, text: String(e.data.text ?? "") });
    if (consoleLogs.value.length > MAX_CONSOLE_LOGS) {
      consoleLogs.value.splice(0, consoleLogs.value.length - MAX_CONSOLE_LOGS);
    }
  }
  if (e.data && e.data.type === "task-assert") {
    emit("task-assert", Array.isArray(e.data.passed) ? e.data.passed : []);
  }
}

// ─── 控制台输出面板 ───────────────────────────────────────────────────────
const MAX_CONSOLE_LOGS = 100;
const consoleLogs = ref<Array<{ level: "log" | "warn" | "error" | "info"; text: string }>>([]);
const consoleOpen = ref(false);

function toggleConsole() {
  consoleOpen.value = !consoleOpen.value;
}

function clearConsole() {
  consoleLogs.value = [];
}

let prevUrl: string | null = null;

function loadPreview(doc: string) {
  const iframe = iframeRef.value;
  if (!iframe) return;
  // 每次重载清空控制台输出
  consoleLogs.value = [];
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
        </button>
        <button class="preview-nav-btn" @click="goForward" title="前进">
          <span class="nav-icon">→</span>
        </button>
        <button class="preview-nav-btn" @click="refresh" title="刷新">
          <span class="nav-icon">↻</span>
        </button>
        <button
          :class="['preview-nav-btn', { 'is-active': consoleOpen }]"
          @click="toggleConsole"
          title="控制台输出"
        >
          <span class="nav-icon">🖥</span>
          <span v-if="consoleLogs.length" class="console-count">{{ consoleLogs.length }}</span>
        </button>
        <!-- 全屏按钮 -->
        <button
          class="preview-nav-btn"
          :title="isMaximized ? '退出全屏 (Esc)' : '全屏预览'"
          @click="emit('maximize')"
        >
          {{ isMaximized ? "↙️" : "↗️" }}
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

    <!-- 控制台输出面板 -->
    <Transition name="error-slide">
      <div v-if="consoleOpen" class="console-panel">
        <div class="console-header">
          <span class="console-title">控制台输出</span>
          <span class="console-hint">console.log / warn / error 都会显示在这里</span>
          <button class="console-clear" @click="clearConsole" title="清空">清空</button>
        </div>
        <div class="console-body">
          <div v-if="!consoleLogs.length" class="console-empty">
            还没有输出——试试在 JS 里写 console.log("你好") 再运行
          </div>
          <div
            v-for="(entry, i) in consoleLogs"
            :key="i"
            :class="['console-line', `console-line--${entry.level}`]"
          >
            <span class="console-level">{{ entry.level === "log" ? "" : entry.level === "warn" ? "⚠ " : entry.level === "error" ? "✗ " : "ℹ " }}</span>
            <pre class="console-text">{{ entry.text }}</pre>
          </div>
        </div>
      </div>
    </Transition>

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
  position: relative;
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

.preview-nav-btn.is-active {
  background: var(--color-bg-warm);
  color: var(--color-accent);
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

/* ─── 控制台输出面板 ─────────────────────────────────────────────────────── */
.console-panel {
  border-top: 1px solid var(--color-border-light);
  background: #1e1e2e;
  display: flex;
  flex-direction: column;
  max-height: 40%;
  min-height: 120px;
}

.console-header {
  display: flex;
  align-items: center;
  gap: var(--sp-2);
  padding: 6px var(--sp-3);
  background: rgba(255, 255, 255, 0.04);
  flex-shrink: 0;
}

.console-title {
  font-size: var(--fs-xs);
  font-weight: 600;
  color: #cdd6f4;
}

.console-hint {
  font-size: 11px;
  color: #6c7086;
  flex: 1;
}

.console-clear {
  font-size: 11px;
  color: #89b4fa;
  background: none;
  border: none;
  cursor: pointer;
  padding: 2px 6px;
}

.console-clear:hover {
  text-decoration: underline;
}

.console-body {
  overflow-y: auto;
  padding: 6px var(--sp-3);
  flex: 1;
  font-family: var(--font-code);
}

.console-empty {
  font-size: var(--fs-xs);
  color: #6c7086;
  padding: 8px 0;
}

.console-line {
  display: flex;
  gap: 6px;
  align-items: flex-start;
  padding: 2px 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.03);
}

.console-level {
  flex-shrink: 0;
  font-size: var(--fs-xs);
  color: #6c7086;
}

.console-line--warn .console-text { color: #f9e2af; }
.console-line--warn .console-level { color: #f9e2af; }
.console-line--error .console-text { color: #f38ba8; }
.console-line--error .console-level { color: #f38ba8; }
.console-line--info .console-level { color: #89b4fa; }

.console-text {
  margin: 0;
  font-size: var(--fs-xs);
  color: #a6adc8;
  white-space: pre-wrap;
  word-break: break-all;
  font-family: var(--font-code);
  flex: 1;
}

.console-count {
  position: absolute;
  top: 2px;
  right: 2px;
  background: var(--color-gold);
  color: #fff;
  font-size: 9px;
  line-height: 1;
  padding: 2px 4px;
  border-radius: 8px;
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

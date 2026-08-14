import { ref, watch, onBeforeUnmount, type Ref } from 'vue'
import type { UserCode } from '../types'
import { errorGuardScript } from '../utils/errorGuard'
import { safeGetItem, safeSetItem } from '../utils/storage'

const LIVE_MODE_KEY = 'code-preview-live-mode'
const LIVE_DEBOUNCE_MS = 700

// 把步骤断言编译成 iframe 内可执行的检查表达式
// 语法："h1"（存在）｜".card:text:巴赫"（文本包含）｜"#gallery:count:3"（子元素数量）
function compileAssert(assert: string): string {
  const parts = assert.split(':')
  const selector = parts[0]
  if (parts.length === 1) {
    return `!!document.querySelector(${JSON.stringify(selector)})`
  }
  const kind = parts[1]
  if (kind === 'text') {
    const text = parts.slice(2).join(':')
    return `(document.querySelector(${JSON.stringify(selector)})||{textContent:''}).textContent.indexOf(${JSON.stringify(text)})!==-1`
  }
  if (kind === 'count') {
    const n = Number(parts[2])
    return `document.querySelectorAll(${JSON.stringify(selector)}).length===${Number.isFinite(n) ? n : 0}`
  }
  return `!!document.querySelector(${JSON.stringify(selector)})`
}

function buildAssertScript(asserts: string[]): string {
  if (!asserts.length) return ''
  const entries = asserts
    .map((a) => `[${JSON.stringify(a)}, function(){ return (${compileAssert(a)}); }]`)
    .join(',')
  return `<script>
(function(){
  var asserts = [${entries}];
  function runChecks(){
    var passed = [];
    for (var i = 0; i < asserts.length; i++) {
      try { if (asserts[i][1]()) passed.push(asserts[i][0]); } catch (e) {}
    }
    try { parent.postMessage({ type: 'task-assert', passed: passed }, '*'); } catch (e) {}
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', runChecks);
  } else { runChecks(); }
})();
<\/script>`
}

function buildDocument(code: UserCode, asserts: string[]): string {
  const userScript = code.js ? `<script>\n${code.js}\n<\/script>` : ''

  return `<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    *, *::before, *::after {
      box-sizing: border-box;
    }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
      line-height: 1.6;
      color: #333;
    }
    h1 { color: #8B2E2E; }
    img { max-width: 100%; border-radius: 8px; }
    a { color: #8B2E2E; }
    ul, ol { padding-left: 1.5em; }
    li { margin: 0.5em 0; }
  </style>
  <style>${code.css}</style>
</head>
<body>
  ${code.html}
  ${errorGuardScript}
  ${buildAssertScript(asserts)}
  ${userScript}
</body>
</html>`
}

export function useCodePreview(code: Ref<UserCode>, assertsRef?: Ref<string[]>) {
  const previewSrc = ref('')

  // 从 localStorage 读取用户的实时预览偏好
  const savedLive = safeGetItem(LIVE_MODE_KEY)
  const livePreviewMode = ref(savedLive.value !== '0')

  let debounceTimer: ReturnType<typeof setTimeout> | null = null

  function triggerPreview() {
    if (debounceTimer) {
      clearTimeout(debounceTimer)
      debounceTimer = null
    }
    previewSrc.value = buildDocument(code.value, assertsRef?.value ?? [])
  }

  // 实时模式：代码变更后防抖触发预览
  watch(
    code,
    () => {
      if (!livePreviewMode.value) return
      if (debounceTimer) clearTimeout(debounceTimer)
      debounceTimer = setTimeout(triggerPreview, LIVE_DEBOUNCE_MS)
    },
    { deep: true },
  )

  // 断言列表变化（切换课程/步骤）时也重建预览
  watch(
    assertsRef ?? ref([]),
    () => {
      if (debounceTimer) clearTimeout(debounceTimer)
      debounceTimer = setTimeout(triggerPreview, LIVE_DEBOUNCE_MS)
    },
    { deep: true },
  )

  // 开启实时模式时立即同步一次，并持久化偏好
  watch(livePreviewMode, (val) => {
    safeSetItem(LIVE_MODE_KEY, val ? '1' : '0')
    if (val) triggerPreview()
  })

  // 初始自动渲染
  triggerPreview()

  onBeforeUnmount(() => {
    if (debounceTimer) {
      clearTimeout(debounceTimer)
      debounceTimer = null
    }
  })

  return { previewSrc, triggerPreview, livePreviewMode }
}

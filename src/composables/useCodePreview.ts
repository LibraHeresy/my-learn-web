import { ref, watch, type Ref } from 'vue'
import type { UserCode } from '../types'
import { errorGuardScript } from '../utils/errorGuard'
import { safeGetItem, safeSetItem } from '../utils/storage'

const LIVE_MODE_KEY = 'code-preview-live-mode'
const LIVE_DEBOUNCE_MS = 700

function buildDocument(code: UserCode): string {
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
  ${userScript}
</body>
</html>`
}

export function useCodePreview(code: Ref<UserCode>) {
  const previewSrc = ref('')

  // 从 localStorage 读取用户的实时预览偏好
  const savedLive = safeGetItem(LIVE_MODE_KEY)
  const livePreviewMode = ref(savedLive.value === '1')

  let debounceTimer: ReturnType<typeof setTimeout> | null = null

  function triggerPreview() {
    if (debounceTimer) {
      clearTimeout(debounceTimer)
      debounceTimer = null
    }
    previewSrc.value = buildDocument(code.value)
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

  // 开启实时模式时立即同步一次，并持久化偏好
  watch(livePreviewMode, (val) => {
    safeSetItem(LIVE_MODE_KEY, val ? '1' : '0')
    if (val) triggerPreview()
  })

  // 初始自动渲染
  triggerPreview()

  return { previewSrc, triggerPreview, livePreviewMode }
}

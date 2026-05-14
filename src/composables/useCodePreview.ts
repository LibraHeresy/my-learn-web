import { ref, watch, type Ref } from 'vue'
import type { UserCode } from '../types'

// 组合 HTML/CSS/JS 为完整的 HTML 文档
function buildDocument(code: UserCode): string {
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
  <script>${code.js}<\/script>
</body>
</html>`
}

export function useCodePreview(code: Ref<UserCode>) {
  const previewSrc = ref('')

  let timer: ReturnType<typeof setTimeout> | null = null

  function updatePreview() {
    previewSrc.value = buildDocument(code.value)
  }

  // 防抖更新
  watch(
    code,
    () => {
      if (timer) clearTimeout(timer)
      timer = setTimeout(updatePreview, 300)
    },
    { deep: true, immediate: true }
  )

  return { previewSrc }
}

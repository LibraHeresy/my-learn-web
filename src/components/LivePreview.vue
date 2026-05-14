<script setup lang="ts">
import { ref, watch } from 'vue'

const props = defineProps<{
  srcdoc: string
}>()

const iframeRef = ref<HTMLIFrameElement>()

watch(
  () => props.srcdoc,
  (doc) => {
    if (!iframeRef.value) return
    const iframe = iframeRef.value
    const blob = new Blob([doc], { type: 'text/html' })
    const url = URL.createObjectURL(blob)
    iframe.src = url
    // 释放旧的 blob URL（在 iframe 加载后）
    iframe.onload = () => {
      URL.revokeObjectURL(url)
    }
  },
  { immediate: true }
)
</script>

<template>
  <div class="preview-panel">
    <div class="preview-header">
      <span class="preview-label">预览</span>
    </div>
    <div class="preview-frame-wrap">
      <iframe
        ref="iframeRef"
        class="preview-iframe"
        sandbox="allow-scripts"
        title="实时预览"
      />
    </div>
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
}

.preview-label {
  font-size: var(--fs-xs);
  font-weight: 600;
  color: var(--color-text-light);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.preview-frame-wrap {
  flex: 1;
  background: #fff;
}

.preview-iframe {
  width: 100%;
  height: 100%;
  border: none;
}
</style>

<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps<{
  language: string
  code: string
}>()

const copied = ref(false)

async function doCopy() {
  try {
    await navigator.clipboard.writeText(props.code)
    copied.value = true
    setTimeout(() => { copied.value = false }, 2000)
  } catch { /* clipboard denied */ }
}
</script>

<template>
  <div class="code-block-wrap">
    <span class="code-lang-tag">{{ language.toUpperCase() }}</span>
    <button class="code-copy-btn" @click="doCopy">{{ copied ? '✓ 已复制' : '📋 复制' }}</button>
    <pre class="code-block"><code :class="`language-${language}`" v-text="code" /></pre>
  </div>
</template>

<style scoped>
.code-block-wrap {
  position: relative;
}

.code-lang-tag {
  position: absolute;
  top: 0;
  left: 0;
  padding: 1px 8px;
  font-size: 11px;
  font-weight: 700;
  font-family: var(--font-code);
  color: var(--color-text-inverse);
  background: rgba(255, 255, 255, 0.04);
  border-radius: 0 0 var(--radius-xs) 0;
  letter-spacing: 0.05em;
  pointer-events: none;
}

.code-copy-btn {
  position: absolute;
  top: 2px;
  right: 4px;
  padding: 1px 6px;
  font-size: 12px;
  color: var(--color-text-inverse);
  background: rgba(255, 255, 255, 0.06);
  border-radius: var(--radius-xs);
  opacity: 1;
  transition: opacity var(--transition), color var(--transition);
}

.code-copy-btn:hover {
  color: var(--color-text-inverse);
  background: rgba(255, 255, 255, 0.12);
}

.code-block {
  margin: 0;
  padding: var(--sp-3);
  padding-top: 1.6em; /* room for lang tag */
  border-radius: var(--radius-md);
  background: var(--color-editor-bg);
  border: 1px solid var(--color-editor-border);
  overflow-x: auto;
}

.code-block code {
  font-family: var(--font-code);
  font-size: var(--fs-xs);
  color: var(--color-editor-text);
  white-space: pre-wrap;
  word-break: break-word;
}

@media (max-width: 900px) {
  .code-block {
    padding: var(--sp-2);
    padding-top: 1.6em;
    border-radius: var(--radius-sm);
  }
  .code-block code {
    font-size: 0.7rem;
  }
}
</style>

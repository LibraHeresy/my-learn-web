<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

function goHome() {
  router.push('/')
}
</script>

<template>
  <header class="app-header">
    <div class="header-left" @click="goHome">
      <span class="header-logo">🎼</span>
      <span class="header-title">代码乐章</span>
      <span class="header-subtitle">从乐谱到代码</span>
    </div>
  </header>
</template>

<style scoped>
.app-header {
  height: var(--header-height);
  display: flex;
  align-items: center;
  padding: 0 var(--sp-6);
  background: var(--color-panel);
  border-bottom: 1px solid var(--color-border-light);
  z-index: 100;
  flex-shrink: 0;
}

.header-left {
  display: flex;
  align-items: center;
  gap: var(--sp-3);
  cursor: pointer;
  user-select: none;
  transition: opacity var(--dur-fast);
}

.header-left:active {
  opacity: 0.7;
}

.header-logo {
  font-size: 1.5rem;
  display: inline-block;
  transition: transform var(--dur-normal) var(--ease-spring);
}

.header-left:hover .header-logo {
  transform: scale(1.15) rotate(-3deg);
}

.header-title {
  font-family: var(--font-heading);
  font-size: var(--fs-lg);
  font-weight: 700;
  color: var(--color-text);
}

.header-subtitle {
  font-size: var(--fs-xs);
  color: var(--color-text-light);
  padding-left: var(--sp-2);
  border-left: 2px solid var(--color-gold);
}
</style>

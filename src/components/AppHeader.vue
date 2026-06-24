<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import GlobalSearch from './GlobalSearch.vue'

const router = useRouter()
const route = useRoute()
const searchRef = ref<InstanceType<typeof GlobalSearch> | null>(null)

const activeTab = computed(() => {
  if (route.path.startsWith('/quiz')) return 'quiz'
  return 'learn'
})

function goHome() {
  router.push('/')
}

function goQuiz() {
  router.push('/quiz')
}

function openSearch() {
  searchRef.value?.openSearch()
}
</script>

<template>
  <header class="app-header">
    <div class="header-left" @click="goHome">
      <span class="header-logo">🎼</span>
      <span class="header-title">代码乐章</span>
      <span class="header-subtitle">从乐谱到代码</span>
    </div>
    <nav class="header-nav">
      <button class="search-btn" title="搜索课程 (Ctrl+K)" @click="openSearch">
        🔍 <span class="search-label">搜索</span>
        <kbd class="search-kbd">Ctrl K</kbd>
      </button>
      <button
        :class="['nav-tab', { active: activeTab === 'learn' }]"
        @click="goHome"
      >
        📖 学习
      </button>
      <button
        :class="['nav-tab', { active: activeTab === 'quiz' }]"
        @click="goQuiz"
      >
        ✏️ 测验
      </button>
    </nav>
    <GlobalSearch ref="searchRef" />
  </header>
</template>

<style scoped>
.app-header {
  height: var(--header-height);
  display: flex;
  align-items: center;
  justify-content: space-between;
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

/* ===== 右侧导航 ===== */
.header-nav {
  display: flex;
  gap: var(--sp-1);
  align-items: center;
}

.search-btn {
  display: flex;
  align-items: center;
  gap: var(--sp-1);
  padding: var(--sp-2) var(--sp-3);
  font-size: var(--fs-sm);
  color: var(--color-text-light);
  border-radius: var(--radius-sm);
  cursor: pointer;
  transition: all var(--dur-fast);
}

.search-btn:hover {
  color: var(--color-text);
  border-color: var(--color-accent);
}

.search-label {
  font-weight: 500;
}

.search-kbd {
  font-size: 0.65rem;
  padding: 1px 4px;
  background: var(--color-panel);
  border: 1px solid var(--color-border-light);
  border-radius: 3px;
  color: var(--color-text-light);
  letter-spacing: 0.04em;
}

.nav-tab {
  padding: var(--sp-2) var(--sp-5);
  font-size: var(--fs-sm);
  font-weight: 500;
  font-family: var(--font-heading);
  color: var(--color-text-light);
  background: transparent;
  border: none;
  border-radius: var(--radius-sm);
  cursor: pointer;
  transition: all var(--dur-fast);
}

.nav-tab:hover {
  color: var(--color-text);
  background: rgba(201, 169, 110, 0.08);
}

.nav-tab.active {
  color: var(--color-accent);
  background: rgba(201, 169, 110, 0.15);
  font-weight: 600;
}

@media (max-width: 640px) {
  .header-subtitle {
    display: none;
  }

  .nav-tab {
    padding: var(--sp-1) var(--sp-3);
    font-size: var(--fs-xs);
  }
}
</style>

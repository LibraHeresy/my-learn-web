<script setup lang="ts">
import { ref, watch, onMounted, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'
import Fuse, { type FuseResult } from 'fuse.js'
import searchIndexData from '../generated/search-index.json'
import { useFocusTrap } from '../composables/useFocusTrap'
import { useScrollLock } from '../composables/useScrollLock'

interface SearchItem {
  id: string
  title: string
  track: string
  chapter: string
  bodyText: string
}

const router = useRouter()
const open = ref(false)
const query = ref('')
const results = ref<FuseResult<SearchItem>[]>([])
const activeIdx = ref(0)
const inputRef = ref<HTMLInputElement | null>(null)
const dialogRef = ref<HTMLElement | null>(null)

useScrollLock(open)
useFocusTrap(open, dialogRef, inputRef as unknown as typeof dialogRef)

const fuse = new Fuse(searchIndexData as SearchItem[], {
  keys: [
    { name: 'title', weight: 2 },
    { name: 'bodyText', weight: 1 },
  ],
  threshold: 0.4,
  includeScore: true,
})

watch(query, (q) => {
  if (!q.trim()) {
    results.value = []
    activeIdx.value = 0
    return
  }
  doSearch(q)
})

function doSearch(q: string) {
  if (!fuse) return
  results.value = fuse.search(q).slice(0, 8)
  activeIdx.value = 0
}

function openSearch() {
  open.value = true
}

function closeSearch() {
  open.value = false
  query.value = ''
  results.value = []
}

function goToResult(item: SearchItem) {
  router.push(`/lesson/${item.id}`)
  closeSearch()
}

function onKeydown(e: KeyboardEvent) {
  if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
    e.preventDefault()
    openSearch()
  }
  if (!open.value) return
  if (e.key === 'Escape') { closeSearch(); return }
  if (e.key === 'ArrowDown') {
    e.preventDefault()
    activeIdx.value = Math.min(activeIdx.value + 1, results.value.length - 1)
  }
  if (e.key === 'ArrowUp') {
    e.preventDefault()
    activeIdx.value = Math.max(activeIdx.value - 1, 0)
  }
  if (e.key === 'Enter' && results.value.length > 0) {
    goToResult(results.value[activeIdx.value].item)
  }
}

onMounted(() => document.addEventListener('keydown', onKeydown))
onBeforeUnmount(() => document.removeEventListener('keydown', onKeydown))

// 暴露 open 方法供 AppHeader 调用
defineExpose({ openSearch })
</script>

<template>
  <Teleport to="body">
    <Transition name="gs-fade">
      <div v-if="open" class="gs-backdrop" @click.self="closeSearch">
        <div ref="dialogRef" class="gs-dialog" role="dialog" aria-modal="true" aria-label="全局搜索" tabindex="-1">
          <div class="gs-search-row">
            <span class="gs-icon">🔍</span>
            <input
              ref="inputRef"
              v-model="query"
              class="gs-input"
              placeholder="搜索课程…"
              autocomplete="off"
              spellcheck="false"
            />
            <kbd class="gs-esc" @click="closeSearch">Esc</kbd>
          </div>

          <ul v-if="results.length > 0" class="gs-results">
            <li
              v-for="(r, i) in results"
              :key="r.item.id"
              class="gs-result-item"
            >
              <button
                type="button"
                :class="['gs-result', { active: i === activeIdx }]"
                @mouseenter="activeIdx = i"
                @focus="activeIdx = i"
                @click="goToResult(r.item)"
              >
                <div class="gs-result-title">{{ r.item.title }}</div>
                <div class="gs-result-meta">{{ r.item.track }} / {{ r.item.chapter }}</div>
              </button>
            </li>
          </ul>
          <div v-else-if="query.trim()" class="gs-empty">未找到相关课程</div>
          <div v-else class="gs-hint">输入关键词搜索所有课程（支持标题和正文）</div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.gs-backdrop {
  position: fixed;
  inset: 0;
  z-index: 9000;
  background: rgba(0, 0, 0, 0.45);
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding-top: 12vh;
}

.gs-dialog {
  background: var(--color-panel);
  border: 1px solid var(--color-border-light);
  border-radius: var(--radius-md);
  width: min(600px, 90vw);
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.25);
  overflow: hidden;
}

/* ── 搜索行 ── */
.gs-search-row {
  display: flex;
  align-items: center;
  gap: var(--sp-3);
  padding: var(--sp-4) var(--sp-4);
  border-bottom: 1px solid var(--color-border-light);
}

.gs-icon {
  font-size: 1rem;
  flex-shrink: 0;
  color: var(--color-text-light);
}

.gs-input {
  flex: 1;
  background: transparent;
  border: none;
  outline: none;
  font-size: var(--fs-md);
  color: var(--color-text);
  font-family: var(--font-body);
  caret-color: var(--color-accent);
}

.gs-input::placeholder {
  color: var(--color-text-light);
}

.gs-esc {
  font-size: var(--fs-xs);
  padding: 2px 6px;
  background: var(--color-bg-warm);
  border: 1px solid var(--color-border-light);
  border-radius: 4px;
  color: var(--color-text-light);
  cursor: pointer;
  flex-shrink: 0;
  user-select: none;
}

/* ── 结果列表 ── */
.gs-results {
  list-style: none;
  max-height: 380px;
  overflow-y: auto;
}

.gs-result-item {
  list-style: none;
}

.gs-result {
  width: 100%;
  text-align: left;
  background: transparent;
  display: flex;
  flex-direction: column;
  gap: 2px;
  padding: var(--sp-3) var(--sp-4);
  cursor: pointer;
  border-bottom: 1px solid var(--color-border-light);
  transition: background var(--dur-fast);
}

.gs-result:last-child { border-bottom: none; }

.gs-result.active,
.gs-result:hover {
  background: var(--color-bg-warm);
}

.gs-result-title {
  font-size: var(--fs-sm);
  font-weight: 500;
  color: var(--color-text);
}

.gs-result-meta {
  font-size: var(--fs-xs);
  color: var(--color-text-light);
}

/* ── 空/提示 ── */
.gs-empty,
.gs-hint {
  padding: var(--sp-5) var(--sp-4);
  font-size: var(--fs-sm);
  color: var(--color-text-light);
  text-align: center;
}

/* ── 动画 ── */
.gs-fade-enter-active,
.gs-fade-leave-active {
  transition: opacity 0.15s ease, transform 0.15s ease;
}
.gs-fade-enter-from,
.gs-fade-leave-to {
  opacity: 0;
}
.gs-fade-enter-from .gs-dialog {
  transform: scale(0.97) translateY(-8px);
}
</style>

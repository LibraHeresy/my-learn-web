<script setup lang="ts">
defineProps<{
  prevLabel: string
  nextLabel: string
  prevNavTitle?: string
  nextNavTitle?: string
  centerLabel?: string
  prevDisabled?: boolean
  nextDisabled?: boolean
  showComplete?: boolean
  isCompleted?: boolean
}>()

defineEmits<{
  prev: []
  next: []
  complete: []
}>()
</script>

<template>
  <div class="player-footer">
    <div class="footer-side">
      <button
        v-if="!prevDisabled"
        class="footer-btn"
        @click="$emit('prev')"
      >
        ← {{ prevLabel }}<span v-if="prevNavTitle" class="nav-sep"> · </span><span v-if="prevNavTitle" class="nav-title">{{ prevNavTitle }}</span>
      </button>
    </div>

    <div class="footer-center-wrap">
      <button
        v-if="showComplete"
        class="footer-btn footer-complete"
        @click="$emit('complete')"
      >
        <span v-if="isCompleted">✓ 已完成</span>
        <span v-else>标记完成</span>
      </button>
      <span v-if="centerLabel" class="footer-center">{{ centerLabel }}</span>
    </div>

    <div class="footer-side footer-side-right">
      <button
        v-if="!nextDisabled"
        class="footer-btn"
        @click="$emit('next')"
      >
        <span v-if="nextNavTitle" class="nav-title">{{ nextNavTitle }}</span><span v-if="nextNavTitle" class="nav-sep"> · </span>{{ nextLabel }} →
      </button>
    </div>
  </div>
</template>

<style scoped>
.player-footer {
  display: flex;
  align-items: center;
  width: 100vw;
  padding: 6px var(--sp-6);
  background: var(--color-panel);
  border-top: 1px solid var(--color-border-light);
  flex-shrink: 0;
  box-sizing: border-box;
}

.footer-side {
  flex: 1;
  display: flex;
  align-items: center;
}

.footer-side-right {
  justify-content: flex-end;
}

.footer-center-wrap {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.footer-btn {
  padding: var(--sp-1) var(--sp-4);
  background: transparent;
  color: var(--color-text);
  font-size: var(--fs-sm);
  border-radius: var(--radius-sm);
  white-space: nowrap;
  transition: all 0.15s;
}

.footer-btn:hover:not(.disabled) {
  background: var(--color-bg-warm);
}

.footer-complete {
  color: var(--color-success);
  font-weight: 600;
  transition: color var(--dur-fast),
              background var(--dur-fast),
              transform 0.1s;
}

.footer-complete:hover {
  background: var(--color-success-bg);
}

.footer-complete:active {
  transform: scale(0.95);
}

.footer-center {
  font-size: var(--fs-xs);
  color: var(--color-text-light);
  font-family: var(--font-code);
}

.nav-title {
  color: #8B2E2E;
}

@media (max-width: 640px) {
  .nav-title,
  .nav-sep {
    display: none;
  }
}
</style>

<script setup lang="ts">
defineProps<{
  boundary: string
}>()

defineEmits<{
  dragStart: [e: MouseEvent]
}>()
</script>

<template>
  <div class="resizer" @mousedown="$emit('dragStart', $event)">
    <div class="resizer-handle" />
  </div>
</template>

<style scoped>
.resizer {
  width: 8px;
  cursor: col-resize;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color-border-light);
  flex-shrink: 0;
  transition: background var(--dur-fast) var(--ease-out),
              width 0.15s var(--ease-spring);
  user-select: none;
}

.resizer:hover {
  background: var(--color-gold);
  width: 10px;
}

.resizer-handle {
  width: 2px;
  height: 32px;
  border-radius: 1px;
  background: rgba(0, 0, 0, 0.15);
  transition: background var(--dur-fast);
}

.resizer:hover .resizer-handle {
  background: rgba(255, 255, 255, 0.6);
}
</style>

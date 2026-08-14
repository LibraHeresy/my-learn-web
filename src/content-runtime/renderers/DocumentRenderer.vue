<script setup lang="ts">
import type { CompiledLesson } from '../types'
import DocumentBodyRenderer from './DocumentBodyRenderer.vue'

defineProps<{
  lesson: CompiledLesson
}>()
</script>

<template>
  <DocumentBodyRenderer :nodes="lesson.body" />
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { getAllLessonsV2 } from '../content-v2/lessons'
import { isContentV2Enabled } from '../content-v2/feature'
import DocumentRenderer from '../content-runtime/renderers/DocumentRenderer.vue'

const router = useRouter()
const enabled = computed(() => isContentV2Enabled())
const lessons = computed(() => getAllLessonsV2())
const firstLesson = computed(() => lessons.value[0] || null)
</script>

<template>
  <div class="v2-wrap">
    <h1 class="v2-title">内容系统 V2</h1>
    <p class="v2-text" v-if="enabled">
      V2 已启用：这是 P0 占位页，用于验证新旧内容链路可并行与可回滚。
    </p>
    <p class="v2-text" v-else>
      V2 已禁用。设置环境变量 VITE_CONTENT_V2=1 或删除该变量后刷新即可启用。
    </p>
    <p class="v2-text" v-if="enabled && firstLesson">
      当前渲染样板课：`{{ firstLesson.id }}`。这一页用于验证 JSON 文档树 -> Vue 渲染器链路。
    </p>
    <div v-if="enabled && firstLesson" class="v2-preview">
      <DocumentRenderer :lesson="firstLesson" />
    </div>
    <div class="v2-actions">
      <button class="v2-btn" @click="router.push('/')">返回首页</button>
    </div>
  </div>
</template>

<style scoped>
.v2-wrap {
  max-width: 1080px;
  margin: 0 auto;
  padding: var(--sp-6);
}

.v2-title {
  margin: 0 0 var(--sp-3) 0;
  font-size: var(--fs-xl);
}

.v2-text {
  margin: 0 0 var(--sp-4) 0;
  color: var(--color-text-light);
  line-height: 1.7;
}

.v2-actions {
  display: flex;
  gap: var(--sp-3);
  margin-top: var(--sp-4);
}

.v2-preview {
  margin-top: var(--sp-4);
  background: var(--color-panel);
  border: 1px solid var(--color-border-light);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-sm);
}

.v2-btn {
  padding: var(--sp-2) var(--sp-4);
  border-radius: var(--radius-sm);
  background: var(--color-accent);
  color: #fff;
  font-weight: 600;
}
</style>

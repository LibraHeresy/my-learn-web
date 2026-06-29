<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import AppHeader from './components/AppHeader.vue'
import AiSelectionAssistant from './components/ai/AiSelectionAssistant.vue'

const route = useRoute()
const showAiAssistant = computed(() => ['lesson', 'quiz'].includes(route.name as string))
</script>

<template>
  <div class="app-layout">
    <AppHeader />
    <main class="app-main">
      <RouterView v-slot="{ Component }">
        <Transition name="slide-fade" mode="out-in">
          <component :is="Component" />
        </Transition>
      </RouterView>
    </main>
    <AiSelectionAssistant v-if="showAiAssistant" />
  </div>
</template>

<style scoped>
.app-layout {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.app-main {
  flex: 1;
  overflow: hidden;
  padding: 0 8px;
}

@media (max-width: 900px) {
  .app-main {
    padding: 0;
  }
}
</style>

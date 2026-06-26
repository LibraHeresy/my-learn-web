<script setup lang="ts">
import AppHeader from './components/AppHeader.vue'
import AiSelectionAssistant from './components/ai/AiSelectionAssistant.vue'
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
    <AiSelectionAssistant />
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

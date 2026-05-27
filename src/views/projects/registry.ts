import { defineAsyncComponent } from 'vue'
import type { Component } from 'vue'

const projectComponentMap: Record<string, Component> = {
  'music-showcase': defineAsyncComponent(() => import('./music-showcase.vue')),
  'music-collection-v1': defineAsyncComponent(() => import('./music-collection-v1.vue')),
  'music-searcher': defineAsyncComponent(() => import('./music-searcher.vue')),
  'music-collection-v2': defineAsyncComponent(() => import('./music-collection-v2.vue')),
  'music-collection-v3': defineAsyncComponent(() => import('./music-collection-v3.vue')),
}

export function hasProjectComponent(projectId: string): boolean {
  return projectId in projectComponentMap
}

export function getProjectComponent(projectId: string): Component | null {
  return projectComponentMap[projectId] || null
}

import { defineAsyncComponent } from 'vue'
import type { Component } from 'vue'

/**
 * 课程组件注册表
 * 使用 defineAsyncComponent 实现懒加载
 * key: 课程 ID (lessonId)
 * value: 异步加载的组件
 *
 * 新增课程组件时，在此注册即可
 */
const lessonComponentMap: Record<string, Component> = {
  // ===== 第一章：HTML 基础 =====
  'html-intro': defineAsyncComponent(() => import('./html-basics/html-intro.vue')),
  'html-doc-structure': defineAsyncComponent(() => import('./html-basics/html-doc-structure.vue')),
  'html-emphasis': defineAsyncComponent(() => import('./html-basics/html-emphasis.vue')),
  'html-lists': defineAsyncComponent(() => import('./html-basics/html-lists.vue')),
  'html-images-links': defineAsyncComponent(() => import('./html-basics/html-images-links.vue')),
  'html-div-span': defineAsyncComponent(() => import('./html-basics/html-div-span.vue')),
  'html-semantic': defineAsyncComponent(() => import('./html-basics/html-semantic.vue')),
  'html-audio-video': defineAsyncComponent(() => import('./html-basics/html-audio-video.vue')),
  'html-tables': defineAsyncComponent(() => import('./html-basics/html-tables.vue')),
  'html-forms': defineAsyncComponent(() => import('./html-basics/html-forms.vue')),
  'html-input-types': defineAsyncComponent(() => import('./html-basics/html-input-types.vue')),
  'html-capstone': defineAsyncComponent(() => import('./html-basics/html-capstone.vue')),

  // ===== 第二章：CSS 样式 =====
  'css-intro': defineAsyncComponent(() => import('./css-style/css-intro.vue')),
  'css-bg-border': defineAsyncComponent(() => import('./css-style/css-bg-border.vue')),
  'css-font-spacing': defineAsyncComponent(() => import('./css-style/css-font-spacing.vue')),
  'css-box-model': defineAsyncComponent(() => import('./css-style/css-box-model.vue')),
  'css-selectors': defineAsyncComponent(() => import('./css-style/css-selectors.vue')),
  'css-cascade': defineAsyncComponent(() => import('./css-style/css-cascade.vue')),
  'css-transitions': defineAsyncComponent(() => import('./css-style/css-transitions.vue')),
  'css-animations': defineAsyncComponent(() => import('./css-style/css-animations.vue')),
  'css-variables': defineAsyncComponent(() => import('./css-style/css-variables.vue')),

  // ===== 第三章：CSS 布局 =====
  'css-flexbox': defineAsyncComponent(() => import('./css-layout/css-flexbox.vue')),
  'css-centering': defineAsyncComponent(() => import('./css-layout/css-centering.vue')),
  'css-position': defineAsyncComponent(() => import('./css-layout/css-position.vue')),
  'css-grid': defineAsyncComponent(() => import('./css-layout/css-grid.vue')),
  'css-responsive': defineAsyncComponent(() => import('./css-layout/css-responsive.vue')),
  'css-layout-capstone': defineAsyncComponent(() => import('./css-layout/css-layout-capstone.vue')),

  // ===== 第四章：JavaScript 入门 =====
  'js-intro': defineAsyncComponent(() => import('./js-basics/js-intro.vue')),
  'js-variables': defineAsyncComponent(() => import('./js-basics/js-variables.vue')),
  'js-types': defineAsyncComponent(() => import('./js-basics/js-types.vue')),
  'js-functions': defineAsyncComponent(() => import('./js-basics/js-functions.vue')),
  'js-events': defineAsyncComponent(() => import('./js-basics/js-events.vue')),
  'js-events-more': defineAsyncComponent(() => import('./js-basics/js-events-more.vue')),
  'js-conditions': defineAsyncComponent(() => import('./js-basics/js-conditions.vue')),
  'js-arrays': defineAsyncComponent(() => import('./js-basics/js-arrays.vue')),
  'js-loops': defineAsyncComponent(() => import('./js-basics/js-loops.vue')),
  'js-array-methods': defineAsyncComponent(() => import('./js-basics/js-array-methods.vue')),
  'js-querySelectorAll': defineAsyncComponent(() => import('./js-basics/js-querySelectorAll.vue')),
  'js-objects': defineAsyncComponent(() => import('./js-basics/js-objects.vue')),
  'js-dom-advanced': defineAsyncComponent(() => import('./js-basics/js-dom-advanced.vue')),
  'js-timers': defineAsyncComponent(() => import('./js-basics/js-timers.vue')),
  'js-capstone': defineAsyncComponent(() => import('./js-basics/js-capstone.vue')),

  // ===== 第五章：JavaScript 进阶 =====
  'workflow-three-step': defineAsyncComponent(() => import('./js-advanced/workflow-three-step.vue')),
  'workflow-plan-first': defineAsyncComponent(() => import('./js-advanced/workflow-plan-first.vue')),
  'workflow-console-intro': defineAsyncComponent(() => import('./js-advanced/workflow-console-intro.vue')),
  'workflow-console-log': defineAsyncComponent(() => import('./js-advanced/workflow-console-log.vue')),
  'workflow-debugger': defineAsyncComponent(() => import('./js-advanced/workflow-debugger.vue')),
  'workflow-naming': defineAsyncComponent(() => import('./js-advanced/workflow-naming.vue')),
  'workflow-decompose': defineAsyncComponent(() => import('./js-advanced/workflow-decompose.vue')),
  'workflow-create-element': defineAsyncComponent(() => import('./js-advanced/workflow-create-element.vue')),
  'workflow-event-delegation': defineAsyncComponent(() => import('./js-advanced/workflow-event-delegation.vue')),
  'workflow-data-driven': defineAsyncComponent(() => import('./js-advanced/workflow-data-driven.vue')),
  'js-es6-syntax': defineAsyncComponent(() => import('./js-advanced/js-es6-syntax.vue')),
  'js-error-handling': defineAsyncComponent(() => import('./js-advanced/js-error-handling.vue')),

  // ===== 第六章：异步与数据 =====
  'workflow-localstorage': defineAsyncComponent(() => import('./async-data/workflow-localstorage.vue')),
  'async-event-loop': defineAsyncComponent(() => import('./async-data/async-event-loop.vue')),
  'async-promise': defineAsyncComponent(() => import('./async-data/async-promise.vue')),
  'async-await': defineAsyncComponent(() => import('./async-data/async-await.vue')),
  'async-fetch': defineAsyncComponent(() => import('./async-data/async-fetch.vue')),
  'async-api-client': defineAsyncComponent(() => import('./async-data/async-api-client.vue')),
  'async-search-debounce': defineAsyncComponent(() => import('./async-data/async-search-debounce.vue')),
  'async-capstone': defineAsyncComponent(() => import('./async-data/async-capstone.vue')),

  // ===== 第七章：工程入门 =====
  'tooling-nodejs': defineAsyncComponent(() => import('./engineering-tooling/tooling-nodejs.vue')),
  'tooling-vscode': defineAsyncComponent(() => import('./engineering-tooling/tooling-vscode.vue')),
  'tooling-terminal': defineAsyncComponent(() => import('./engineering-tooling/tooling-terminal.vue')),
  'tooling-modules': defineAsyncComponent(() => import('./engineering-tooling/tooling-modules.vue')),
  'tooling-npm': defineAsyncComponent(() => import('./engineering-tooling/tooling-npm.vue')),
  'tooling-vite': defineAsyncComponent(() => import('./engineering-tooling/tooling-vite.vue')),
  'tooling-eslint': defineAsyncComponent(() => import('./engineering-tooling/tooling-eslint.vue')),
  'tooling-git-init': defineAsyncComponent(() => import('./engineering-tooling/tooling-git-init.vue')),
  'tooling-github': defineAsyncComponent(() => import('./engineering-tooling/tooling-github.vue')),
  'tooling-build-deploy': defineAsyncComponent(() => import('./engineering-tooling/tooling-build-deploy.vue')),
  'tooling-env': defineAsyncComponent(() => import('./engineering-tooling/tooling-env.vue')),

  // ===== 第八章：Vue 实战 =====
  'tooling-sfc': defineAsyncComponent(() => import('./vue-framework/tooling-sfc.vue')),
  'vue-directives': defineAsyncComponent(() => import('./vue-framework/vue-directives.vue')),
  'vue-lifecycle': defineAsyncComponent(() => import('./vue-framework/vue-lifecycle.vue')),
  'tooling-ref-reactive': defineAsyncComponent(() => import('./vue-framework/tooling-ref-reactive.vue')),
  'tooling-props-emits': defineAsyncComponent(() => import('./vue-framework/tooling-props-emits.vue')),
  'vue-philosophy': defineAsyncComponent(() => import('./vue-framework/vue-philosophy.vue')),
  'vue-computed-watch': defineAsyncComponent(() => import('./vue-framework/vue-computed-watch.vue')),
  'vue-vmodel-deep': defineAsyncComponent(() => import('./vue-framework/vue-vmodel-deep.vue')),
  'vue-slots': defineAsyncComponent(() => import('./vue-framework/vue-slots.vue')),
  'vue-router-intro': defineAsyncComponent(() => import('./vue-framework/vue-router-intro.vue')),
  'tooling-capstone': defineAsyncComponent(() => import('./vue-framework/tooling-capstone.vue')),
}

/**
 * 检查某个课程是否有组件实现
 */
export function hasLessonComponent(lessonId: string): boolean {
  return lessonId in lessonComponentMap
}

/**
 * 获取课程组件
 */
export function getLessonComponent(lessonId: string): Component | null {
  return lessonComponentMap[lessonId] || null
}

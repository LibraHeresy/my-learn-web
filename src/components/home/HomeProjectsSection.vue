<script setup lang="ts">
import type { HomeProjectCardItem } from '../../content-runtime/types'
import DocumentBodyRenderer from '../../content-runtime/renderers/DocumentBodyRenderer.vue'

defineProps<{
  projects: HomeProjectCardItem[]
}>()

const emit = defineEmits<{
  'go-to-project': [id: string]
}>()
</script>

<template>
  <section id="projects-section" class="projects-section">
    <h2 class="section-title">🎁 作品集</h2>
    <hr class="staff-divider" />
    <p class="projects-intro">
      每个阶段结束，你都会完成一个音乐收藏库的新版本——从手稿到乐团，一步步见证成长。
    </p>

    <div class="project-cards">
      <div
        v-for="project in projects"
        :key="project.id"
        :class="['project-card', { draft: project.stepCount === 0 }]"
      >
        <div class="project-card-header">
          <span class="project-icon">{{ project.icon }}</span>
          <div class="project-info">
            <h3 class="project-title">
              {{ project.title }}
              <span v-if="project.stepCount === 0" class="project-soon-tag">即将推出</span>
            </h3>
            <p class="project-subtitle">{{ project.subtitle }}</p>
          </div>
        </div>

        <div class="project-analogy">
          <DocumentBodyRenderer
            v-if="project.analogyBody?.length"
            :nodes="project.analogyBody"
          />
        </div>

        <div class="project-meta">
          <span v-if="project.stepCount > 0" class="project-steps">{{ project.stepCount }} 个步骤</span>
        </div>

        <div class="project-actions">
          <button
            v-if="project.stepCount > 0"
            class="btn-project-start"
            @click="emit('go-to-project', project.id)"
          >
            开始项目
          </button>
          <span v-else class="project-soon-text">内容制作中，敬请期待</span>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.projects-section {
  padding: var(--sp-6) 0;
  scroll-margin-top: 28px;
}

.section-title {
  text-align: center;
  margin-bottom: var(--sp-2);
  font-size: var(--fs-xl);
}

.staff-divider {
  border: none;
  height: 3px;
  background: repeating-linear-gradient(
    90deg,
    var(--color-border) 0px,
    var(--color-border) 20px,
    transparent 20px,
    transparent 30px
  );
  margin: 0 auto var(--sp-6) auto;
  max-width: 200px;
}

.projects-intro {
  text-align: center;
  color: var(--color-text-light);
  font-size: var(--fs-sm);
  margin-bottom: var(--sp-5);
  line-height: 1.6;
}

.project-cards {
  display: flex;
  flex-direction: column;
  gap: var(--sp-4);
}

.project-card {
  background: var(--color-panel);
  border: 1px solid var(--color-border-light);
  border-left: 3px solid var(--color-gold);
  border-radius: var(--radius-lg);
  padding: var(--sp-5);
  transition:
    border-color var(--dur-fast) var(--ease-out),
    box-shadow var(--dur-fast) var(--ease-out),
    transform var(--dur-fast) var(--ease-out);
  animation: reveal-up var(--dur-reveal) var(--ease-out) backwards;
}

.project-card:nth-child(1) { animation-delay: 0.15s; }
.project-card:nth-child(2) { animation-delay: 0.25s; }
.project-card:nth-child(3) { animation-delay: 0.35s; }
.project-card:nth-child(4) { animation-delay: 0.45s; }
.project-card:nth-child(5) { animation-delay: 0.55s; }

.project-card:not(.draft):hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(139, 46, 46, 0.12);
}

.project-card.draft {
  border-left-color: var(--color-border);
  opacity: 0.7;
}

.project-card-header {
  display: flex;
  align-items: center;
  gap: var(--sp-3);
  margin-bottom: var(--sp-2);
}

.project-icon { font-size: 1.6rem; flex-shrink: 0; }
.project-info { flex: 1; }

.project-title {
  margin: 0;
  font-size: var(--fs-base);
  display: flex;
  align-items: center;
  gap: var(--sp-2);
}

.project-subtitle {
  color: var(--color-text-light);
  font-size: var(--fs-sm);
  margin: var(--sp-1) 0 0 0;
}

.project-soon-tag {
  font-size: var(--fs-xs);
  font-weight: 400;
  color: var(--color-gold);
  background: var(--color-gold-bg);
  border: 1px solid var(--color-gold-light);
  padding: 1px 8px;
  border-radius: 10px;
}

.project-analogy {
  font-size: var(--fs-sm);
  color: var(--color-text-light);
  line-height: 1.6;
  margin: var(--sp-3) 0;
}

:deep(.project-analogy .content-doc) {
  max-width: none;
  margin: 0;
  padding: 0;
}

:deep(.project-analogy .doc-body) {
  gap: var(--sp-2);
}

:deep(.project-analogy .doc-paragraph),
:deep(.project-analogy .doc-term) {
  color: var(--color-text-light);
}

.project-meta {
  display: flex;
  gap: var(--sp-4);
  font-size: var(--fs-xs);
  color: var(--color-text-light);
  margin-bottom: var(--sp-3);
}

.project-steps {
  background: var(--color-bg-warm);
  padding: 2px 10px;
  border-radius: 12px;
  flex-shrink: 0;
  height: min-content;
  width: max-content;
}

.project-actions { display: flex; justify-content: flex-end; }

.btn-project-start {
  padding: var(--sp-2) var(--sp-6);
  background: var(--color-accent);
  color: #fff;
  font-size: var(--fs-sm);
  font-weight: 600;
  border-radius: var(--radius-sm);
  transition: background var(--dur-fast), transform var(--dur-fast);
}

.btn-project-start:hover {
  background: var(--color-accent-light);
  transform: translateY(-1px);
}

.project-soon-text {
  font-size: var(--fs-xs);
  color: var(--color-text-light);
  font-style: italic;
}

@media (max-width: 640px) {
  .project-card { padding: var(--sp-4); }
  .project-meta { flex-direction: column; gap: var(--sp-1); }
}
</style>

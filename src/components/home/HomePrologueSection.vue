<script setup lang="ts">
import type { PrologueCard } from '../../content-loaders/prologues'

defineProps<{
  cards: PrologueCard[]
}>()

const emit = defineEmits<{
  'go-to-lesson': [id: string]
}>()
</script>

<template>
  <section id="prologue-section" class="prologue-section">
    <h2 class="section-title">🏮 筚路蓝缕</h2>
    <hr class="staff-divider" />
    <p class="section-intro">
      从 1989 年日内瓦的一间办公室，到 2026 年的 AI 协作——回望 Web 三十六年筚路蓝缕。
    </p>
    <div class="prologue-grid">
      <div
        v-for="card in cards"
        :key="card.id"
        class="prologue-card"
        @click="emit('go-to-lesson', card.lessonId)"
      >
        <div class="prologue-card-thumb">
          <img :src="card.thumbnailSrc" :alt="card.title" loading="lazy" />
        </div>
        <div class="prologue-card-body">
          <h3 class="prologue-card-title">{{ card.title }}</h3>
          <p class="prologue-card-subtitle">{{ card.subtitle }}</p>
          <p class="prologue-card-tagline">{{ card.tagline }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.prologue-section {
  padding: var(--sp-8) 0 var(--sp-6);
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

.section-intro {
  text-align: center;
  color: var(--color-text-light);
  font-size: var(--fs-sm);
  margin-bottom: var(--sp-5);
  line-height: 1.6;
}

.prologue-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--sp-4);
  margin-bottom: var(--sp-6);
}

.prologue-card {
  background: var(--color-panel);
  border: 1px solid var(--color-border-light);
  border-radius: var(--radius-md);
  overflow: hidden;
  cursor: pointer;
  transition:
    transform var(--dur-fast) var(--ease-out),
    box-shadow var(--dur-fast) var(--ease-out),
    border-color var(--dur-fast) var(--ease-out);
  animation: reveal-up var(--dur-reveal) var(--ease-out) backwards;
}

.prologue-card:nth-child(1) { animation-delay: 0.1s; }
.prologue-card:nth-child(2) { animation-delay: 0.18s; }
.prologue-card:nth-child(3) { animation-delay: 0.26s; }
.prologue-card:nth-child(4) { animation-delay: 0.34s; }
.prologue-card:nth-child(5) { animation-delay: 0.42s; }
.prologue-card:nth-child(6) { animation-delay: 0.5s; }

.prologue-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 6px 20px rgba(139, 46, 46, 0.12);
  border-color: var(--color-gold);
}

.prologue-card:active {
  transform: scale(0.97);
  transition: transform 0.05s var(--ease-in);
}

.prologue-card-thumb { line-height: 0; }

.prologue-card-thumb img {
  display: block;
  width: 100%;
  height: auto;
}

.prologue-card-body { padding: var(--sp-4); }

.prologue-card-title {
  font-size: var(--fs-base);
  color: var(--color-accent);
  margin-bottom: var(--sp-1);
  font-family: var(--font-heading);
}

.prologue-card-subtitle {
  font-size: var(--fs-xs);
  color: var(--color-accent);
  margin-bottom: var(--sp-2);
}

.prologue-card-tagline {
  font-size: var(--fs-xs);
  color: var(--color-text-light);
  line-height: 1.5;
  font-style: italic;
}

@media (max-width: 640px) {
  .prologue-grid { grid-template-columns: 1fr; }
}
</style>

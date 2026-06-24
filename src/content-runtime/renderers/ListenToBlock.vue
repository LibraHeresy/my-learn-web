<script setup lang="ts">
import type { BlockNode } from '../types'
import InlineText from './InlineText.vue'
import { computed } from 'vue'

const props = defineProps<{
  node: BlockNode
}>()

// 提取曲名：取引号内或冒号后的文字
const songName = computed(() => {
  const text = props.node.content || ''
  // 尝试匹配中文《》引号或「」引号或英文引号
const m1 = text.match(/[《》“”"](.*?)[》」"]/)
  if (m1) return m1[1]
  // 尝试取冒号后第一个词组或句子
  const m2 = text.match(/[：：:](.*)/)
  if (m2) return m2[1].trim().slice(0, 50)
  return text.replace(/\{\{term:[^}]+\}\}/g, '').trim().slice(0, 60)
})

const ytUrl = computed(() =>
  `https://www.youtube.com/results?search_query=${encodeURIComponent(songName.value)}`,
)
const neteaseUrl = computed(() =>
  `https://music.163.com/#/search/m/?s=${encodeURIComponent(songName.value)}&type=1`,
)
</script>

<template>
  <section class="listen-box">
    <span class="listen-icon">🎧</span>
    <div class="listen-body">
      <p class="listen-label">推荐聆听</p>
      <p class="listen-text">
        <InlineText :text="node.content || ''" />
      </p>
      <div class="listen-links">
        <a :href="ytUrl" target="_blank" rel="noopener noreferrer" class="listen-link listen-link--yt">
          🔍 YouTube 搜索
        </a>
        <a :href="neteaseUrl" target="_blank" rel="noopener noreferrer" class="listen-link listen-link--ne">
          🎵 网易云音乐
        </a>
      </div>
    </div>
  </section>
</template>

<style scoped>
.listen-box {
  display: flex;
  gap: var(--sp-3);
  padding: var(--sp-4);
  background: #f5f9f0;
  border-radius: var(--radius-md);
}

.listen-body {
  display: flex;
  flex-direction: column;
  gap: var(--sp-1);
  min-width: 0;
}

.listen-links {
  display: flex;
  gap: var(--sp-2);
  flex-wrap: wrap;
  margin-top: var(--sp-1);
}

.listen-link {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: var(--fs-xs);
  font-weight: 500;
  padding: 3px 8px;
  border-radius: var(--radius-sm);
  text-decoration: none;
  transition: opacity var(--dur-fast), transform var(--dur-fast);
}

.listen-link:hover {
  opacity: 0.8;
  transform: translateY(-1px);
}

.listen-link--yt {
  background: rgba(255, 0, 0, 0.1);
  color: #c00;
  border: 1px solid rgba(255, 0, 0, 0.2);
}

.listen-link--ne {
  background: rgba(229, 25, 20, 0.08);
  color: #c41f28;
  border: 1px solid rgba(229, 25, 20, 0.18);
}

.listen-icon {
  font-size: 1.3rem;
  flex-shrink: 0;
}

.listen-label {
  font-size: var(--fs-xs);
  font-weight: 600;
  color: var(--color-success);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.listen-text {
  margin-top: var(--sp-1);
  font-size: var(--fs-sm);
  color: var(--color-text-light);
}
</style>


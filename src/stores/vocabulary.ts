import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { safeSetItem, safeGetItem } from '../utils/storage'

const STORAGE_KEY = 'vocab-cards'

export interface VocabCard {
  term: string
  explanation: string
  analogy?: string
  nextReview: number   // timestamp
  interval: number     // days
  easeFactor: number   // SM-2 EF, default 2.5
  createdAt: number
}

// SM-2 算法
function sm2(card: VocabCard, quality: 1 | 2 | 3): VocabCard {
  const q = quality * (10 / 3) // 映射到 0-10 范围 → 3.33, 6.67, 10
  const ef = Math.max(1.3, card.easeFactor + 0.1 - (5 - q) * (0.08 + (5 - q) * 0.02))
  let interval: number
  if (quality === 1) {
    interval = 1  // 再次练习
  } else if (card.interval < 1) {
    interval = 1
  } else if (card.interval === 1) {
    interval = 6
  } else {
    interval = Math.round(card.interval * ef)
  }
  return {
    ...card,
    interval,
    easeFactor: ef,
    nextReview: Date.now() + interval * 86_400_000,
  }
}

export const useVocabularyStore = defineStore('vocabulary', () => {
  const cards = ref<Record<string, VocabCard>>({})

  function load() {
    try {
      const r = safeGetItem(STORAGE_KEY)
      if (r.value) cards.value = JSON.parse(r.value)
    } catch {
      cards.value = {}
    }
  }

  function save() {
    safeSetItem(STORAGE_KEY, JSON.stringify(cards.value))
  }

  function addCard(term: string, explanation: string, analogy?: string) {
    if (cards.value[term]) return  // 已存在
    cards.value[term] = {
      term,
      explanation,
      analogy,
      nextReview: Date.now(),  // 立即可复习
      interval: 0,
      easeFactor: 2.5,
      createdAt: Date.now(),
    }
    save()
  }

  function hasCard(term: string): boolean {
    return term in cards.value
  }

  // 今日到期的卡片
  const dueCards = computed(() =>
    Object.values(cards.value).filter((c) => c.nextReview <= Date.now()),
  )

  function reviewCard(term: string, quality: 1 | 2 | 3) {
    const card = cards.value[term]
    if (!card) return
    cards.value[term] = sm2(card, quality)
    save()
  }

  function removeCard(term: string) {
    delete cards.value[term]
    save()
  }

  load()

  return {
    cards,
    dueCards,
    addCard,
    hasCard,
    reviewCard,
    removeCard,
  }
})

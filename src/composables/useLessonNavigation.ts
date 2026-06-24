import { computed } from 'vue'
import type { ComputedRef } from 'vue'
import { useRouter } from 'vue-router'
import type { CompiledLesson } from '../content-runtime/types'
import type { LessonMetaItem } from '../content-loaders/lessons'
import { getChapterOrder, getTrack, getChapter } from '../content-loaders/taxonomy'

/**
 * 封装课程页导航与面包屑逻辑：
 * - 课程排序、上一课/下一课、章节位置
 * - 标签文本（上一课/上一章/上一篇…）
 * - 面包屑轨道/章节信息
 */
export function useLessonNavigation(
  lessonId: ComputedRef<string>,
  lesson: ComputedRef<CompiledLesson | null | undefined>,
  all: ComputedRef<LessonMetaItem[]>,
) {
  const router = useRouter()

  const isPrologue = computed(() => lesson.value?.meta.track === 'prologue')
  const currentTrackId = computed(() => lesson.value?.meta.track || 'fundamentals')
  const currentChapterId = computed(() => lesson.value?.meta.chapter)

  // 面包屑信息
  const currentTrack = computed(() => getTrack(currentTrackId.value))
  const currentChapter = computed(() => getChapter(currentChapterId.value))

  // 当前轨道的有序课程列表
  const orderedLessons = computed(() =>
    all.value
      .filter((l) => l.meta.track === currentTrackId.value)
      .slice()
      .sort((a, b) => {
        const ai = getChapterOrder(a.meta.chapter)
        const bi = getChapterOrder(b.meta.chapter)
        if (ai !== bi) return ai - bi
        return a.meta.order - b.meta.order
      }),
  )

  const currentIndex = computed(() => orderedLessons.value.findIndex((l) => l.id === lessonId.value))
  const prevLesson = computed(() => (currentIndex.value > 0 ? orderedLessons.value[currentIndex.value - 1] : null))
  const nextLesson = computed(() =>
    currentIndex.value >= 0 && currentIndex.value < orderedLessons.value.length - 1
      ? orderedLessons.value[currentIndex.value + 1]
      : null,
  )

  const currentChapterLessons = computed(() => {
    if (!currentChapterId.value) return []
    return orderedLessons.value.filter((l) => l.meta.chapter === currentChapterId.value)
  })

  const positionInChapter = computed(() => currentChapterLessons.value.findIndex((l) => l.id === lessonId.value) + 1)
  const totalInChapter = computed(() => currentChapterLessons.value.length)

  const centerLabel = computed(() => {
    if (positionInChapter.value <= 0) return ''
    if (isPrologue.value) return `第 ${positionInChapter.value}/${totalInChapter.value} 篇`
    return `第 ${positionInChapter.value}/${totalInChapter.value} 课`
  })

  const prevLabel = computed(() => {
    if (isPrologue.value) return prevLesson.value ? '上一篇' : ''
    if (!prevLesson.value) return '上一课'
    return prevLesson.value.meta.chapter !== currentChapterId.value ? '上一章' : '上一课'
  })

  const nextLabel = computed(() => {
    if (isPrologue.value) return nextLesson.value ? '下一篇' : ''
    if (!nextLesson.value) return '下一课'
    return nextLesson.value.meta.chapter !== currentChapterId.value ? '下一章' : '下一课'
  })

  const prevNavTitle = computed(() => (isPrologue.value ? '' : (prevLesson.value?.meta.title ?? '')))
  const nextNavTitle = computed(() => (isPrologue.value ? '' : (nextLesson.value?.meta.title ?? '')))
  const prevDisabled = computed(() => !prevLesson.value)
  const nextDisabled = computed(() => !nextLesson.value)

  function goPrev() {
    if (prevLesson.value) router.push(`/lesson/${prevLesson.value.id}`)
  }

  function goNext() {
    if (nextLesson.value) router.push(`/lesson/${nextLesson.value.id}`)
  }

  return {
    isPrologue,
    currentTrackId,
    currentChapterId,
    currentTrack,
    currentChapter,
    orderedLessons,
    currentIndex,
    prevLesson,
    nextLesson,
    currentChapterLessons,
    positionInChapter,
    totalInChapter,
    centerLabel,
    prevLabel,
    nextLabel,
    prevNavTitle,
    nextNavTitle,
    prevDisabled,
    nextDisabled,
    goPrev,
    goNext,
  }
}

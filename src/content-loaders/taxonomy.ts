import taxonomyJson from '../generated/taxonomy.json' with { type: 'json' }

export type Track = {
  id: string
  title: string
  subtitle: string
  icon: string
  order: number
}

export type Chapter = {
  id: string
  title: string
  subtitle: string
  icon: string
  order: number
  /** 关联的测验 gem id 列表（taxonomy.yaml 维护） */
  quizGems?: string[]
}

const taxonomy = taxonomyJson as { tracks: Track[]; chapters: Chapter[] }

export const tracks: Track[] = taxonomy.tracks
export const chapters: Chapter[] = taxonomy.chapters

export function getTrack(trackId: string): Track | null {
  return tracks.find((t) => t.id === trackId) ?? null
}

export function getChapter(chapterId: string | null | undefined): Chapter | null {
  if (!chapterId) return null
  return chapters.find((c) => c.id === chapterId) ?? null
}

export function getChapterOrder(chapterId: string): number {
  return chapters.find((c) => c.id === chapterId)?.order ?? Number.MAX_SAFE_INTEGER
}

// 章节 → 关联测验 gem（LessonPlayer 的"去测验"引导用）
export function getGemsForChapter(chapterId: string | null | undefined): string[] {
  return getChapter(chapterId)?.quizGems ?? []
}

// gem → 关联章节（QuizPage 的"关联课程"用）
export function getChaptersForGem(gemId: string): Chapter[] {
  return chapters.filter((c) => c.quizGems?.includes(gemId))
}

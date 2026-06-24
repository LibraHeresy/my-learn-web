import lessonsMeta from '../generated/lessons-meta.json'
import type { CompiledLesson, ContentMeta } from '../content-runtime/types'

export type LessonMetaItem = { id: string; meta: ContentMeta }

const metaItems = lessonsMeta as LessonMetaItem[]
const lessonModules = import.meta.glob('../generated/lessons/*.json')

export function getAllLessons(): LessonMetaItem[] {
  return metaItems
}

export async function getLesson(lessonId: string): Promise<CompiledLesson | null> {
  const loader = lessonModules[`../generated/lessons/${lessonId}.json`]
  if (!loader) return null
  const mod = await loader()
  return (mod as { default?: CompiledLesson }).default ?? (mod as CompiledLesson)
}

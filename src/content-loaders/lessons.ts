import generatedLessons from '../generated/lessons-index.json'
import type { CompiledLesson } from '../content-runtime/types'

const compiledLessons = generatedLessons as CompiledLesson[]

export function getAllLessonsV2(): CompiledLesson[] {
  return compiledLessons
}

export function getLessonV2(lessonId: string): CompiledLesson | null {
  return compiledLessons.find((lesson) => lesson.id === lessonId) ?? null
}

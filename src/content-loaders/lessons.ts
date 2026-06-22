import generatedLessons from '../generated/lessons-index.json'
import type { CompiledLesson } from '../content-runtime/types'

const compiledLessons = generatedLessons as CompiledLesson[]

export function getAllLessons(): CompiledLesson[] {
  return compiledLessons
}

export function getLesson(lessonId: string): CompiledLesson | null {
  return compiledLessons.find((lesson) => lesson.id === lessonId) ?? null
}

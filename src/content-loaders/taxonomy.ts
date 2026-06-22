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

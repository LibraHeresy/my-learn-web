import taxonomyJson from '../generated/taxonomy.json' with { type: 'json' }

export type TrackV2 = {
  id: string
  title: string
  subtitle: string
  icon: string
  order: number
}

export type ChapterV2 = {
  id: string
  title: string
  subtitle: string
  icon: string
  order: number
}

const taxonomy = taxonomyJson as { tracks: TrackV2[]; chapters: ChapterV2[] }

export const tracksV2: TrackV2[] = taxonomy.tracks
export const chaptersV2: ChapterV2[] = taxonomy.chapters

export function getTrackV2(trackId: string): TrackV2 | null {
  return tracksV2.find((t) => t.id === trackId) ?? null
}

export function getChapterV2(chapterId: string | null | undefined): ChapterV2 | null {
  if (!chapterId) return null
  return chaptersV2.find((c) => c.id === chapterId) ?? null
}

export function getChapterOrder(chapterId: string): number {
  return chaptersV2.find((c) => c.id === chapterId)?.order ?? Number.MAX_SAFE_INTEGER
}

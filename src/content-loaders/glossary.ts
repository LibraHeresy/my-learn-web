import glossary from '../generated/glossary.json'

export type GlossaryEntry = {
  key: string
  explanation: string
  analogy?: string
  priority?: 'core' | 'important' | 'extended'
  related?: string[]
}

const entries = glossary as GlossaryEntry[]

// Sorted by key length descending (for longest-match-first in markdown)
const sortedEntries = [...entries].sort((a, b) => b.key.length - a.key.length)

export function getGlossaryEntry(key: string): GlossaryEntry | null {
  return entries.find((e) => e.key === key) ?? null
}

/** Returns [key, { explanation, analogy }][] tuples sorted by key length descending */
export function getGlossaryTuples(): Array<[string, Omit<GlossaryEntry, 'key'>]> {
  return sortedEntries.map(({ key, ...rest }) => [key, rest])
}


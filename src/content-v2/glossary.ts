import glossary from '../generated/glossary.json'

export type GlossaryEntry = {
  key: string
  explanation: string
  analogy?: string
}

const entries = glossary as GlossaryEntry[]

export function getGlossaryEntry(key: string): GlossaryEntry | null {
  return entries.find((e) => e.key === key) ?? null
}


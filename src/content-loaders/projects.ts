import projectsMeta from '../generated/projects-meta.json'
import type { CompiledProject, ProjectListItem } from '../content-runtime/types'

const metaItems = projectsMeta as ProjectListItem[]
const projectModules = import.meta.glob('../generated/projects/*.json')

export function getAllProjects(): ProjectListItem[] {
  return metaItems
}

export async function getProject(projectId: string): Promise<CompiledProject | null> {
  const loader = projectModules[`../generated/projects/${projectId}.json`]
  if (!loader) return null
  const mod = await loader()
  return (mod as { default?: CompiledProject }).default ?? (mod as CompiledProject)
}

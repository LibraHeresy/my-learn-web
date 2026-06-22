import generatedProjects from '../generated/projects-index.json'
import type { CompiledProject } from '../content-runtime/types'

const compiledProjects = generatedProjects as CompiledProject[]

export function getAllProjectsV2(): CompiledProject[] {
  return compiledProjects
}

export function getProjectV2(projectId: string): CompiledProject | null {
  return compiledProjects.find((p) => p.id === projectId) ?? null
}

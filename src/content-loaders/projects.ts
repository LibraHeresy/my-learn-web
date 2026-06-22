import generatedProjects from '../generated/projects-index.json'
import type { CompiledProject } from '../content-runtime/types'

const compiledProjects = generatedProjects as CompiledProject[]

export function getAllProjectsV2(): CompiledProject[] {
  return compiledProjects
}

export function hasProjectV2(projectId: string): boolean {
  return compiledProjects.some((p) => p.id === projectId)
}

export async function getProjectV2(projectId: string): Promise<CompiledProject | null> {
  return compiledProjects.find((p) => p.id === projectId) ?? null
}


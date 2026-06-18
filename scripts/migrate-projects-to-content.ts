import { mkdir, writeFile, access, readFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { projects } from '../src/configs/projects.ts'
import type { Project, ProjectStep } from '../src/types/index.ts'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const projectRoot = path.resolve(__dirname, '..')

type Options = {
  outputRoot: string
  projectId?: string
  overwrite: boolean
  limit?: number
}

function readArgValue(name: string): string | null {
  const idx = process.argv.findIndex((a) => a === `--${name}`)
  if (idx === -1) return null
  return process.argv[idx + 1] ?? null
}

function hasFlag(name: string): boolean {
  return process.argv.includes(`--${name}`)
}

function parseOptions(): Options {
  const outputRoot = readArgValue('output') || path.join(projectRoot, 'content', 'projects')
  const projectId = readArgValue('project') || undefined
  const overwrite = hasFlag('overwrite')
  const limitRaw = readArgValue('limit')
  const limit = limitRaw ? Number(limitRaw) : undefined

  if (limitRaw && (!Number.isFinite(limit) || limit <= 0)) {
    throw new Error('--limit must be a positive number')
  }

  return {
    outputRoot,
    projectId,
    overwrite,
    limit,
  }
}

function yamlEscape(value: string): string {
  const normalized = value.replace(/\r?\n/g, '\\n')
  const needsQuotes = /[:#\t]|^\s|\s$|"/.test(normalized)
  if (!needsQuotes) return normalized
  return `"${normalized.replace(/\\/g, '\\\\').replace(/"/g, '\\"')}"`
}

function buildMetaYaml(project: Project): string {
  const lines: string[] = []
  lines.push(`id: ${yamlEscape(project.id)}`)
  lines.push(`title: ${yamlEscape(project.title)}`)
  lines.push(`subtitle: ${yamlEscape(project.subtitle)}`)
  lines.push(`icon: ${yamlEscape(project.icon)}`)
  lines.push(`track: ${yamlEscape(project.trackId)}`)
  lines.push(`order: ${project.order}`)
  lines.push(`mode: ${yamlEscape(project.mode)}`)
  lines.push(`musicAnalogy: ${yamlEscape(project.musicAnalogy)}`)
  if (project.listenTo) lines.push(`listenTo: ${yamlEscape(project.listenTo)}`)

  lines.push(`prerequisiteTrackIds:`)
  for (const id of project.prerequisiteTrackIds || []) {
    lines.push(`  - ${yamlEscape(id)}`)
  }

  lines.push(`estimatedMinutes: 0`)
  return `${lines.join('\n')}\n`
}

function toStepJson(step: ProjectStep) {
  return {
    title: step.title,
    content: step.content,
    task: step.task,
    hint: step.hint,
    purpose: step.purpose,
    expectedResult: step.expectedResult,
    starterCode: step.starterCode,
  }
}

async function exists(filePath: string): Promise<boolean> {
  try {
    await access(filePath)
    return true
  } catch {
    return false
  }
}

async function writeFileSafe(filePath: string, content: string, overwrite: boolean): Promise<boolean> {
  const already = await exists(filePath)
  if (already && !overwrite) return false
  await mkdir(path.dirname(filePath), { recursive: true })
  await writeFile(filePath, content, 'utf8')
  return true
}

async function writeJsonSafe(filePath: string, data: unknown, overwrite: boolean): Promise<boolean> {
  return writeFileSafe(filePath, `${JSON.stringify(data, null, 2)}\n`, overwrite)
}

async function migrateOne(project: Project, options: Options): Promise<'created' | 'skipped'> {
  const dir = path.join(options.outputRoot, project.trackId, project.id)
  const metaPath = path.join(dir, 'meta.yaml')
  const jsonPath = path.join(dir, 'project.json')

  const wroteMeta = await writeFileSafe(metaPath, buildMetaYaml(project), options.overwrite)
  const wroteJson = await writeJsonSafe(jsonPath, { steps: project.steps.map(toStepJson) }, options.overwrite)

  if (!wroteMeta && !wroteJson) return 'skipped'
  return 'created'
}

async function cleanLegacyProjectMd(outputRoot: string, project: Project, overwrite: boolean) {
  const dir = path.join(outputRoot, project.trackId, project.id)
  const mdPath = path.join(dir, 'project.md')
  if (!overwrite) return
  if (!(await exists(mdPath))) return
  const raw = await readFile(mdPath, 'utf8')
  if (raw.trim().length === 0) return
}

async function main() {
  const options = parseOptions()
  const sorted = projects.slice().sort((a, b) => a.order - b.order)
  const filtered = sorted.filter((p) => (options.projectId ? p.id === options.projectId : true))
  const picked = typeof options.limit === 'number' ? filtered.slice(0, options.limit) : filtered

  let created = 0
  let skipped = 0
  for (const project of picked) {
    const r = await migrateOne(project, options)
    await cleanLegacyProjectMd(options.outputRoot, project, options.overwrite)
    if (r === 'created') created += 1
    else skipped += 1
  }

  console.log(`Migrated projects: created=${created}, skipped=${skipped}, total=${picked.length}`)
  console.log(`Output root: ${options.outputRoot}`)
  if (options.projectId) console.log(`Project filter: ${options.projectId}`)
  if (!options.overwrite) console.log('Tip: pass --overwrite to update existing files')
}

main().catch((err) => {
  console.error(err)
  process.exitCode = 1
})


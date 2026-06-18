import { mkdir, writeFile, access } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { prologueLessons } from '../src/configs/prologues.ts'
import type { Lesson, LessonSection } from '../src/types/index.ts'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const projectRoot = path.resolve(__dirname, '..')

type Options = {
  outputRoot: string
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
  const outputRoot = readArgValue('output') || path.join(projectRoot, 'content', 'lessons')
  const overwrite = hasFlag('overwrite')
  const limitRaw = readArgValue('limit')
  let limit: number | undefined

  if (limitRaw) {
    const parsed = Number(limitRaw)
    if (!Number.isFinite(parsed) || parsed <= 0) {
      throw new Error('--limit must be a positive number')
    }
    limit = parsed
  }

  return { outputRoot, overwrite, limit }
}

function yamlEscape(value: string): string {
  const normalized = value.replace(/\r?\n/g, '\\n')
  const needsQuotes = /[:#\t]|^\s|\s$|"/.test(normalized)
  if (!needsQuotes) return normalized
  return `"${normalized.replace(/\\/g, '\\\\').replace(/"/g, '\\"')}"`
}

function buildMetaYaml(lesson: Lesson): string {
  const lines: string[] = []
  lines.push(`id: ${yamlEscape(lesson.id)}`)
  lines.push(`title: ${yamlEscape(lesson.title)}`)
  lines.push(`track: prologue`)
  lines.push(`chapter: ${yamlEscape(lesson.chapterId)}`)
  lines.push(`order: ${lesson.order}`)
  lines.push(`mode: ${yamlEscape(lesson.mode)}`)
  lines.push(`musicAnalogy: ${yamlEscape(lesson.musicAnalogy)}`)
  if (lesson.listenTo) lines.push(`listenTo: ${yamlEscape(lesson.listenTo)}`)
  lines.push(`estimatedMinutes: 0`)
  return `${lines.join('\n')}\n`
}

function directive(name: string, attrs?: Record<string, string | undefined>): string {
  if (!attrs) return `::${name}`
  const parts = Object.entries(attrs)
    .filter(([, v]) => typeof v === 'string' && v.length > 0)
    .map(([k, v]) => `${k}="${String(v).replace(/"/g, '\\"')}"`)
  if (!parts.length) return `::${name}`
  return `::${name}{${parts.join(' ')}}`
}

function buildSectionMd(section: LessonSection): string {
  if (section.type === 'task') {
    const titleAttr = section.title ? { title: section.title } : undefined
    const out: string[] = []
    out.push(directive('task', titleAttr))
    if (section.subSteps?.length) {
      for (const step of section.subSteps) {
        const attrs: Record<string, string | undefined> = {
          purpose: step.purpose,
          expected: step.expectedResult,
        }
        const attrStr = Object.entries(attrs)
          .filter(([, v]) => v)
          .map(([k, v]) => `${k}="${String(v).replace(/"/g, '\\"')}"`)
          .join(' ')
        out.push(`:::step{${attrStr}}`)
        out.push(step.content.trim())
        out.push(':::')
        out.push('')
      }
    } else {
      out.push(section.content.trim())
    }
    out.push('::')
    return `${out.join('\n')}\n`
  }

  const blockName = section.type
  const titleAttr = section.title ? { title: section.title } : undefined
  const out: string[] = []
  out.push(directive(blockName, titleAttr))
  out.push(section.content.trim())
  out.push('::')
  return `${out.join('\n')}\n`
}

function buildLessonMd(lesson: Lesson): string {
  const out: string[] = []
  out.push(`# ${lesson.title}`)
  out.push('')
  out.push(directive('music-analogy'))
  out.push(lesson.musicAnalogy.trim())
  out.push('::')
  out.push('')
  for (const section of lesson.sections) {
    out.push(buildSectionMd(section).trimEnd())
    out.push('')
  }
  if (lesson.listenTo) {
    out.push(directive('listen-to'))
    out.push(lesson.listenTo.trim())
    out.push('::')
    out.push('')
  }
  return `${out.join('\n')}\n`
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

async function migrateOne(lesson: Lesson, options: Options): Promise<'created' | 'skipped'> {
  const lessonDir = path.join(options.outputRoot, 'prologue', lesson.chapterId, lesson.id)
  const metaPath = path.join(lessonDir, 'meta.yaml')
  const mdPath = path.join(lessonDir, 'lesson.md')
  const wroteMeta = await writeFileSafe(metaPath, buildMetaYaml(lesson), options.overwrite)
  const wroteMd = await writeFileSafe(mdPath, buildLessonMd(lesson), options.overwrite)
  if (!wroteMeta && !wroteMd) return 'skipped'
  return 'created'
}

async function main() {
  const options = parseOptions()
  const sorted = prologueLessons.slice().sort((a, b) => a.order - b.order)
  const picked = typeof options.limit === 'number' ? sorted.slice(0, options.limit) : sorted

  let created = 0
  let skipped = 0
  for (const lesson of picked) {
    const r = await migrateOne(lesson, options)
    if (r === 'created') created += 1
    else skipped += 1
  }

  console.log(`Migrated prologues: created=${created}, skipped=${skipped}, total=${picked.length}`)
  console.log(`Output root: ${options.outputRoot}`)
  if (!options.overwrite) console.log('Tip: pass --overwrite to update existing files')
}

main().catch((err) => {
  console.error(err)
  process.exitCode = 1
})

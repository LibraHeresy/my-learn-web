import { mkdir, writeFile, access } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { lessons } from '../src/configs/lessons.ts'
import type { Lesson, LessonSection } from '../src/types/index.ts'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const projectRoot = path.resolve(__dirname, '..')

type Options = {
  outputRoot: string
  chapterId?: string
  trackId?: string
  lessonId?: string
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
  const chapterId = readArgValue('chapter') || undefined
  const trackId = readArgValue('track') || undefined
  const lessonId = readArgValue('lesson') || undefined
  const overwrite = hasFlag('overwrite')
  const limitRaw = readArgValue('limit')
  const limit = limitRaw ? Number(limitRaw) : undefined

  if (limitRaw && (!Number.isFinite(limit) || limit <= 0)) {
    throw new Error('--limit must be a positive number')
  }

  return {
    outputRoot,
    chapterId,
    trackId,
    lessonId,
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

function buildMetaYaml(lesson: Lesson): string {
  const mode = (lesson.mode || 'sandbox') as 'sandbox' | 'local'
  const track = lesson.trackId || 'fundamentals'
  const lines: string[] = []
  lines.push(`id: ${yamlEscape(lesson.id)}`)
  lines.push(`title: ${yamlEscape(lesson.title)}`)
  lines.push(`track: ${yamlEscape(track)}`)
  lines.push(`chapter: ${yamlEscape(lesson.chapterId)}`)
  lines.push(`order: ${lesson.order}`)
  lines.push(`mode: ${yamlEscape(mode)}`)
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
        out.push(`:::step{${Object.entries(attrs).filter(([, v]) => v).map(([k, v]) => `${k}="${String(v).replace(/"/g, '\\"')}"`).join(' ')}}`)
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
  const track = options.trackId ?? lesson.trackId ?? 'fundamentals'
  const lessonDir = path.join(options.outputRoot, track, lesson.chapterId, lesson.id)

  const metaPath = path.join(lessonDir, 'meta.yaml')
  const mdPath = path.join(lessonDir, 'lesson.md')
  const wroteMeta = await writeFileSafe(metaPath, buildMetaYaml({ ...lesson, trackId: track }), options.overwrite)
  const wroteMd = await writeFileSafe(mdPath, buildLessonMd(lesson), options.overwrite)

  const mode = (lesson.mode || 'sandbox') as 'sandbox' | 'local'
  if (mode === 'sandbox') {
    const starterDir = path.join(lessonDir, 'starter')
    const wroteHtml = await writeFileSafe(path.join(starterDir, 'index.html'), lesson.starterCode?.html ?? '', options.overwrite)
    const wroteCss = await writeFileSafe(path.join(starterDir, 'style.css'), lesson.starterCode?.css ?? '', options.overwrite)
    const wroteJs = await writeFileSafe(path.join(starterDir, 'script.js'), lesson.starterCode?.js ?? '', options.overwrite)
    if (!wroteMeta && !wroteMd && !wroteHtml && !wroteCss && !wroteJs) return 'skipped'
  } else {
    if (!wroteMeta && !wroteMd) return 'skipped'
  }

  return 'created'
}

async function main() {
  const options = parseOptions()
  const sorted = lessons.slice().sort((a, b) => a.order - b.order)

  const filtered = sorted.filter((l) => {
    if (options.lessonId && l.id !== options.lessonId) return false
    if (options.chapterId && l.chapterId !== options.chapterId) return false
    const track = l.trackId || 'fundamentals'
    if (options.trackId && track !== options.trackId) return false
    return true
  })

  const picked = typeof options.limit === 'number' ? filtered.slice(0, options.limit) : filtered

  let created = 0
  let skipped = 0
  for (const lesson of picked) {
    const r = await migrateOne(lesson, options)
    if (r === 'created') created += 1
    else skipped += 1
  }

  console.log(`Migrated lessons: created=${created}, skipped=${skipped}, total=${picked.length}`)
  console.log(`Output root: ${options.outputRoot}`)
  if (options.chapterId) console.log(`Chapter filter: ${options.chapterId}`)
  if (options.trackId) console.log(`Track filter: ${options.trackId}`)
  if (options.lessonId) console.log(`Lesson filter: ${options.lessonId}`)
  if (!options.overwrite) console.log('Tip: pass --overwrite to update existing files')
}

main().catch((err) => {
  console.error(err)
  process.exitCode = 1
})


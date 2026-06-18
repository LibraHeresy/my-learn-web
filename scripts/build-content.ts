import { mkdir, readFile, readdir, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import type {
  BlockName,
  BlockNode,
  BlockType,
  CompiledLesson,
  CompiledProject,
  ContentBodyNode,
  ContentMeta,
  ProjectMeta,
  ProjectStepV2,
} from '../src/content-runtime/types'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const projectRoot = path.resolve(__dirname, '..')
const lessonsRoot = path.join(projectRoot, 'content', 'lessons')
const projectsRoot = path.join(projectRoot, 'content', 'projects')
const generatedDir = path.join(projectRoot, 'src', 'generated')
const generatedFile = path.join(generatedDir, 'lessons-index.json')
const generatedProjectsFile = path.join(generatedDir, 'projects-index.json')
const glossarySourceFile = path.join(projectRoot, 'content', 'glossary', 'terms.yaml')
const glossaryGeneratedFile = path.join(generatedDir, 'glossary.json')

const allowedModes = new Set(['sandbox', 'local'])
const allowedBlockNames = new Set<BlockName>([
  'music-analogy',
  'explain',
  'example',
  'task',
  'hint',
  'listen-to',
  'callout',
  'tabs',
  'compare',
  'code-group',
  'file-tree',
])

function isBlockName(value: string): value is BlockName {
  return allowedBlockNames.has(value as BlockName)
}

function toBlockType(name: BlockName): BlockType {
  return `block:${name}` as BlockType
}

function createBlockNode(
  name: BlockName,
  rawAttrs: string | undefined,
  content: string,
): BlockNode {
  return {
    type: toBlockType(name),
    name,
    attrs: parseAttrs(rawAttrs),
    content,
    steps: name === 'task' ? parseTaskBlock(content) : undefined,
  }
}

function parseScalar(value: string): string | number {
  const trimmed = value.trim()
  if (/^-?\d+$/.test(trimmed)) return Number(trimmed)
  return trimmed
}

function parseSimpleYaml(input: string): Record<string, string | number | string[]> {
  const result: Record<string, string | number | string[]> = {}
  let currentArrayKey: string | null = null

  for (const rawLine of input.split(/\r?\n/)) {
    const line = rawLine.trimEnd()
    if (!line || line.trimStart().startsWith('#')) continue

    if (/^\s*-\s+/.test(rawLine)) {
      if (!currentArrayKey) {
        throw new Error(`Invalid YAML array item: ${rawLine}`)
      }
      const arr = (result[currentArrayKey] as string[]) || []
      arr.push(rawLine.replace(/^\s*-\s+/, '').trim())
      result[currentArrayKey] = arr
      continue
    }

    const match = rawLine.match(/^([A-Za-z][A-Za-z0-9]*):\s*(.*)$/)
    if (!match) {
      throw new Error(`Invalid YAML line: ${rawLine}`)
    }

    const [, key, value] = match
    if (value === '') {
      result[key] = []
      currentArrayKey = key
    } else {
      result[key] = parseScalar(value)
      currentArrayKey = null
    }
  }

  return result
}

type GlossaryEntry = {
  key: string
  explanation: string
  analogy?: string
}

function parseGlossaryYaml(input: string): GlossaryEntry[] {
  const entries: GlossaryEntry[] = []
  const lines = input.split(/\r?\n/)

  let current: Partial<GlossaryEntry> | null = null
  for (const rawLine of lines) {
    const line = rawLine.trimEnd()
    if (!line || line.trimStart().startsWith('#')) continue

    const start = rawLine.match(/^\s*-\s+key:\s*(.*)\s*$/)
    if (start) {
      if (current?.key && typeof current.explanation === 'string') {
        entries.push({
          key: String(current.key),
          explanation: String(current.explanation),
          analogy: current.analogy ? String(current.analogy) : undefined,
        })
      }
      current = { key: start[1].trim() }
      continue
    }

    if (!current) throw new Error(`Invalid glossary YAML line: ${rawLine}`)
    const field = rawLine.match(/^\s+([A-Za-z][A-Za-z0-9]*):\s*(.*)\s*$/)
    if (!field) throw new Error(`Invalid glossary YAML line: ${rawLine}`)
    const [, key, value] = field
    if (key === 'explanation') current.explanation = value.trim()
    if (key === 'analogy') current.analogy = value.trim()
  }

  if (current?.key && typeof current.explanation === 'string') {
    entries.push({
      key: String(current.key),
      explanation: String(current.explanation),
      analogy: current.analogy ? String(current.analogy) : undefined,
    })
  }

  return entries
}

function parseAttrs(raw?: string): Record<string, string | string[]> | undefined {
  if (!raw) return undefined
  const attrs: Record<string, string | string[]> = {}
  const regex = /([A-Za-z][\w-]*)="([^"]*)"|([A-Za-z][\w-]*)='([^']*)'/g

  for (const match of raw.matchAll(regex)) {
    const key = (match[1] || match[3]) as string
    const value = (match[2] || match[4] || '').trim()
    if (value.includes(',')) {
      attrs[key] = value.split(',').map((item) => item.trim()).filter(Boolean)
    } else {
      attrs[key] = value
    }
  }

  return Object.keys(attrs).length ? attrs : undefined
}

function escapeTermKey(key: string): string {
  return key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

function injectTerms(text: string, termKeys: string[]): string {
  if (!text) return text
  if (!termKeys.length) return text

  const protectRegex = /```[\s\S]*?```|`[^`]*`|\[[^\]]+\]\([^)]+\)/g
  const protectedParts: Array<{ start: number; end: number; value: string }> = []

  for (const match of text.matchAll(protectRegex)) {
    const index = match.index ?? 0
    protectedParts.push({ start: index, end: index + match[0].length, value: match[0] })
  }

  let output = ''
  let cursor = 0
  for (const part of protectedParts) {
    if (part.start > cursor) {
      output += injectTermsInPlain(text.slice(cursor, part.start), termKeys)
    }
    output += part.value
    cursor = part.end
  }
  if (cursor < text.length) output += injectTermsInPlain(text.slice(cursor), termKeys)
  return output
}

function injectTermsInPlain(text: string, termKeys: string[]): string {
  let out = text
  for (const key of termKeys) {
    const escaped = escapeTermKey(key)
    const regex = new RegExp(`\\b${escaped}\\b`, 'g')
    out = out.replace(regex, `{{term:${key}}}`)
  }
  return out
}

function applyGlossaryToBody(body: ContentBodyNode[], termKeys: string[]): ContentBodyNode[] {
  if (!termKeys.length) return body

  return body.map((node) => {
    if (node.type === 'paragraph') {
      return { ...node, text: injectTerms(node.text, termKeys) }
    }
    if (node.type === 'heading') return node
    if (node.type === 'term') return node

    const next: BlockNode = {
      ...node,
      content: typeof node.content === 'string' ? injectTerms(node.content, termKeys) : node.content,
      steps: node.steps?.map((step) => ({
        ...step,
        content: injectTerms(step.content, termKeys),
        purpose: step.purpose ? injectTerms(step.purpose, termKeys) : undefined,
        expected: step.expected ? injectTerms(step.expected, termKeys) : undefined,
      })),
    }
    return next
  })
}

function parseTaskBlock(content: string): Array<{ content: string; purpose?: string; expected?: string }> {
  const steps: Array<{ content: string; purpose?: string; expected?: string }> = []
  const lines = content.split(/\r?\n/)
  let i = 0

  while (i < lines.length) {
    const line = lines[i]
    const start = line.match(/^:::step(?:\{(.*)\})?\s*$/)
    if (!start) {
      i += 1
      continue
    }

    const attrs = parseAttrs(start[1])
    i += 1
    const contentLines: string[] = []
    while (i < lines.length && lines[i].trim() !== ':::') {
      contentLines.push(lines[i])
      i += 1
    }
    if (i >= lines.length) throw new Error('Unclosed :::step block')
    steps.push({
      content: contentLines.join('\n').trim(),
      purpose: typeof attrs?.purpose === 'string' ? attrs.purpose : undefined,
      expected: typeof attrs?.expected === 'string' ? attrs.expected : undefined,
    })
    i += 1
  }

  return steps
}

function parseLessonMarkdown(input: string): ContentBodyNode[] {
  const body: ContentBodyNode[] = []
  const lines = input.split(/\r?\n/)
  let i = 0

  while (i < lines.length) {
    const line = lines[i].trim()
    if (!line) {
      i += 1
      continue
    }

    const heading = line.match(/^(#{1,6})\s+(.+)$/)
    if (heading) {
      body.push({
        type: 'heading',
        depth: heading[1].length,
        text: heading[2].trim(),
      })
      i += 1
      continue
    }

    const blockStart = lines[i].match(/^::([A-Za-z][\w-]*)(?:\{(.*)\})?\s*$/)
    if (blockStart) {
      const [, name, rawAttrs] = blockStart
      if (!isBlockName(name)) {
        throw new Error(`Unsupported block ::${name}`)
      }
      i += 1
      const contentLines: string[] = []
      while (i < lines.length && lines[i].trim() !== '::') {
        contentLines.push(lines[i])
        i += 1
      }
      if (i >= lines.length) throw new Error(`Unclosed block ::${name}`)
      const content = contentLines.join('\n').trim()
      body.push(createBlockNode(name, rawAttrs, content))
      i += 1
      continue
    }

    const paragraphLines = [lines[i].trim()]
    i += 1
    while (i < lines.length && lines[i].trim() && !lines[i].trim().startsWith('::') && !lines[i].trim().startsWith('#')) {
      paragraphLines.push(lines[i].trim())
      i += 1
    }
    body.push({
      type: 'paragraph',
      text: paragraphLines.join(' '),
    })
  }

  return body
}

function toMeta(data: Record<string, string | number | string[]>): ContentMeta {
  const required = ['id', 'title', 'track', 'chapter', 'order', 'mode', 'musicAnalogy'] as const
  for (const key of required) {
    if (!(key in data)) throw new Error(`Missing required meta field: ${key}`)
  }

  if (typeof data.order !== 'number') throw new Error('meta.order must be a number')
  if (typeof data.mode !== 'string' || !allowedModes.has(data.mode)) throw new Error('meta.mode must be sandbox or local')

  return {
    id: String(data.id),
    title: String(data.title),
    track: String(data.track),
    chapter: String(data.chapter),
    order: Number(data.order),
    mode: data.mode as ContentMeta['mode'],
    musicAnalogy: String(data.musicAnalogy),
    listenTo: typeof data.listenTo === 'string' ? data.listenTo : undefined,
    tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
    estimatedMinutes: typeof data.estimatedMinutes === 'number' ? data.estimatedMinutes : 0,
  }
}

async function collectLessonDirs(root: string): Promise<string[]> {
  const result: string[] = []

  async function walk(dir: string): Promise<void> {
    const entries = await readdir(dir, { withFileTypes: true })
    const hasMeta = entries.some((entry) => entry.isFile() && entry.name === 'meta.yaml')
    const hasLesson = entries.some((entry) => entry.isFile() && entry.name === 'lesson.md')
    if (hasMeta && hasLesson) {
      result.push(dir)
      return
    }
    for (const entry of entries) {
      if (entry.isDirectory()) await walk(path.join(dir, entry.name))
    }
  }

  await walk(root)
  return result
}

async function compileLesson(lessonDir: string): Promise<CompiledLesson> {
  const metaPath = path.join(lessonDir, 'meta.yaml')
  const [metaRaw, lessonRaw] = await Promise.all([
    readFile(metaPath, 'utf8'),
    readFile(path.join(lessonDir, 'lesson.md'), 'utf8'),
  ])

  let meta: ContentMeta
  try {
    meta = toMeta(parseSimpleYaml(metaRaw))
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e)
    throw new Error(`Failed to parse ${path.relative(projectRoot, metaPath)}: ${msg}`)
  }
  const body = parseLessonMarkdown(lessonRaw)

  let html = ''
  let css = ''
  let js = ''
  if (meta.mode === 'sandbox') {
    ;[html, css, js] = await Promise.all([
      readFile(path.join(lessonDir, 'starter', 'index.html'), 'utf8'),
      readFile(path.join(lessonDir, 'starter', 'style.css'), 'utf8'),
      readFile(path.join(lessonDir, 'starter', 'script.js'), 'utf8'),
    ])
  }

  return {
    contentSchemaVersion: 1,
    id: meta.id,
    meta,
    body,
    starter: {
      html,
      css,
      js,
    },
    assets: {},
  }
}
function toProjectMeta(data: Record<string, string | number | string[]>): ProjectMeta {
  const required = ['id', 'title', 'subtitle', 'icon', 'track', 'order', 'mode', 'musicAnalogy'] as const
  for (const key of required) {
    if (!(key in data)) throw new Error(`Missing required project meta field: ${key}`)
  }
  if (typeof data.order !== 'number') throw new Error('project meta.order must be a number')
  if (typeof data.mode !== 'string' || !allowedModes.has(data.mode)) throw new Error('project meta.mode must be sandbox or local')

  const prerequisiteTrackIds = Array.isArray(data.prerequisiteTrackIds)
    ? data.prerequisiteTrackIds.map(String)
    : []

  return {
    id: String(data.id),
    title: String(data.title),
    subtitle: String(data.subtitle),
    icon: String(data.icon),
    track: String(data.track),
    order: Number(data.order),
    mode: data.mode as ProjectMeta['mode'],
    musicAnalogy: String(data.musicAnalogy),
    listenTo: typeof data.listenTo === 'string' ? data.listenTo : undefined,
    prerequisiteTrackIds,
    estimatedMinutes: typeof data.estimatedMinutes === 'number' ? data.estimatedMinutes : 0,
  }
}

async function collectProjectDirs(root: string): Promise<string[]> {
  const result: string[] = []

  async function walk(dir: string): Promise<void> {
    const entries = await readdir(dir, { withFileTypes: true })
    const hasMeta = entries.some((entry) => entry.isFile() && entry.name === 'meta.yaml')
    const hasProjectJson = entries.some((entry) => entry.isFile() && entry.name === 'project.json')
    if (hasMeta && hasProjectJson) {
      result.push(dir)
      return
    }
    for (const entry of entries) {
      if (entry.isDirectory()) await walk(path.join(dir, entry.name))
    }
  }

  await walk(root)
  return result
}

async function compileProject(projectDir: string): Promise<CompiledProject> {
  const metaPath = path.join(projectDir, 'meta.yaml')
  const jsonPath = path.join(projectDir, 'project.json')
  const [metaRaw, jsonRaw] = await Promise.all([
    readFile(metaPath, 'utf8'),
    readFile(jsonPath, 'utf8'),
  ])

  let meta: ProjectMeta
  try {
    meta = toProjectMeta(parseSimpleYaml(metaRaw))
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e)
    throw new Error(`Failed to parse ${path.relative(projectRoot, metaPath)}: ${msg}`)
  }

  const parsed = JSON.parse(jsonRaw) as { steps?: ProjectStepV2[] }
  if (!Array.isArray(parsed.steps)) {
    throw new Error(`Invalid project.json: missing steps array in ${path.relative(projectRoot, jsonPath)}`)
  }

  return {
    contentSchemaVersion: 1,
    id: meta.id,
    meta,
    steps: parsed.steps,
  }
}

async function main() {
  let glossary: GlossaryEntry[] = []
  try {
    const glossaryRaw = await readFile(glossarySourceFile, 'utf8')
    glossary = parseGlossaryYaml(glossaryRaw)
  } catch {
    glossary = []
  }
  const termKeys = glossary.map((g) => g.key).filter(Boolean)

  const lessonDirs = await collectLessonDirs(lessonsRoot)
  const compiledRaw = await Promise.all(lessonDirs.map((dir) => compileLesson(dir)))
  const compiled = compiledRaw.map((lesson) => ({
    ...lesson,
    body: applyGlossaryToBody(lesson.body, termKeys),
  }))
  compiled.sort((a, b) => a.meta.order - b.meta.order)

  const projectDirs = await collectProjectDirs(projectsRoot)
  const compiledProjectsRaw = await Promise.all(projectDirs.map((dir) => compileProject(dir)))
  const compiledProjects = compiledProjectsRaw.map((project) => ({
    ...project,
    steps: project.steps.map((step) => ({
      ...step,
      content: injectTerms(step.content, termKeys),
      task: injectTerms(step.task, termKeys),
      hint: step.hint ? injectTerms(step.hint, termKeys) : undefined,
      purpose: step.purpose ? injectTerms(step.purpose, termKeys) : undefined,
      expectedResult: step.expectedResult ? injectTerms(step.expectedResult, termKeys) : undefined,
    })),
  }))
  compiledProjects.sort((a, b) => a.meta.order - b.meta.order)

  await mkdir(generatedDir, { recursive: true })
  await writeFile(generatedFile, `${JSON.stringify(compiled, null, 2)}\n`, 'utf8')
  await writeFile(generatedProjectsFile, `${JSON.stringify(compiledProjects, null, 2)}\n`, 'utf8')
  await writeFile(glossaryGeneratedFile, `${JSON.stringify(glossary, null, 2)}\n`, 'utf8')
  console.log(
    `Compiled ${compiled.length} lesson(s), ${compiledProjects.length} project(s) to ${path.relative(projectRoot, generatedDir)}`,
  )
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})

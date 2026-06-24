import { mkdir, readFile, readdir, rename, writeFile } from 'node:fs/promises'
import { createHash } from 'node:crypto'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import type {
  BlockAttrs,
  BlockName,
  BlockNode,
  BlockType,
  CompiledLesson,
  CompiledProject,
  ContentBodyNode,
  ContentMeta,
  ProjectMeta,
  ProjectStep,
} from '../src/content-runtime/types'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const projectRoot = path.resolve(__dirname, '..')
const lessonsRoot = path.join(projectRoot, 'src', 'content', 'lessons')
const prologueRoot = path.join(projectRoot, 'src', 'content', 'prologue')
const projectsRoot = path.join(projectRoot, 'src', 'content', 'projects')
const generatedDir = path.join(projectRoot, 'src', 'generated')
const lessonsMetaFile = path.join(generatedDir, 'lessons-meta.json')
const lessonsOutDir = path.join(generatedDir, 'lessons')
const projectsMetaFile = path.join(generatedDir, 'projects-meta.json')
const projectsOutDir = path.join(generatedDir, 'projects')
const legacyLessonsIndex = path.join(generatedDir, 'lessons-index.json')
const legacyProjectsIndex = path.join(generatedDir, 'projects-index.json')
const generatedTaxonomyFile = path.join(generatedDir, 'taxonomy.json')
const glossarySourceFile = path.join(projectRoot, 'src', 'content', 'glossary', 'terms.yaml')
const glossaryGeneratedFile = path.join(generatedDir, 'glossary.json')
const taxonomySourceFile = path.join(projectRoot, 'src', 'content', 'taxonomy.yaml')
const quizSourceDir = path.join(projectRoot, 'src', 'content', 'quiz')
const generatedQuizFile = path.join(generatedDir, 'quiz.json')
const buildCacheFile = path.join(generatedDir, '.build-cache.json')

// ---------- 增量编译：文件 Hash 缓存 ----------

interface BuildCache {
  glossary: string
  taxonomy: string
  lessons: Record<string, string>   // lessonDir 相对路径 -> hash
  projects: Record<string, string>  // projectDir 相对路径 -> hash
  quiz: Record<string, string>      // 文件名 -> hash
}

async function loadBuildCache(): Promise<BuildCache> {
  try {
    const raw = await readFile(buildCacheFile, 'utf8')
    return JSON.parse(raw) as BuildCache
  } catch {
    return { glossary: '', taxonomy: '', lessons: {}, projects: {}, quiz: {} }
  }
}

async function saveBuildCache(cache: BuildCache): Promise<void> {
  await writeFile(buildCacheFile, JSON.stringify(cache, null, 2) + '\n', 'utf8')
}

async function hashFiles(filePaths: string[]): Promise<string> {
  const hash = createHash('md5')
  for (const fp of filePaths) {
    try {
      const content = await readFile(fp, 'utf8')
      hash.update(content)
    } catch {
      hash.update('')
    }
  }
  return hash.digest('hex')
}

async function hashLessonDir(lessonDir: string, mode: string): Promise<string> {
  const files = [
    path.join(lessonDir, 'meta.yaml'),
    path.join(lessonDir, 'lesson.md'),
  ]
  if (mode === 'sandbox') {
    files.push(
      path.join(lessonDir, 'starter', 'index.html'),
      path.join(lessonDir, 'starter', 'style.css'),
      path.join(lessonDir, 'starter', 'script.js'),
    )
  }
  return hashFiles(files)
}

async function hashProjectDir(projectDir: string): Promise<string> {
  return hashFiles([
    path.join(projectDir, 'meta.yaml'),
    path.join(projectDir, 'project.json'),
  ])
}

async function atomicWriteFile(filePath: string, data: string): Promise<void> {
  const tmpPath = filePath + '.tmp'
  await writeFile(tmpPath, data, 'utf8')
  await rename(tmpPath, filePath)
}

const allowedModes = new Set(['sandbox', 'local'])
const allowedBlockNames = new Set<BlockName>([
  'music-analogy',
  'explain',
  'example',
  'task',
  'hint',
  'listen-to',
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
    attrs: parseAttrs(rawAttrs) as BlockAttrs | undefined,
    content,
    steps: name === 'task' ? parseTaskBlock(content) : undefined,
  }
}

function parseScalar(value: string): string | number {
  const trimmed = value.trim()
  if (/^-?\d+$/.test(trimmed)) return Number(trimmed)
  // Handle YAML double-quoted strings: strip quotes, unescape \" \\ \n
  if (trimmed.startsWith('"') && trimmed.endsWith('"')) {
    const inner = trimmed.slice(1, -1)
    return inner.replace(/\\(.)/g, (_, c: string) => {
      if (c === 'n') return '\n'
      if (c === 't') return '\t'
      return c
    })
  }
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
  const regex = /([A-Za-z][\w-]*)="((?:[^"\\]|\\.)*)"|([A-Za-z][\w-]*)='((?:[^'\\]|\\.)*)'/g

  for (const match of raw.matchAll(regex)) {
    const key = (match[1] || match[3]) as string
    const value = (match[2] || match[4] || '').trim().replace(/\\(.)/g, '$1')
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

  const protectRegex = /\{\{term:[^}]+\}\}|```[\s\S]*?```|`[^`\n]*`|\[[^\]]+\]\([^)]+\)/g
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
  // Sort by length descending: process longer keys first to minimize nesting
  const sorted = [...termKeys].sort((a, b) => b.length - a.length)

  // Protected regions: {{term:...}} markers and backtick code
  const markerRegex = /\{\{term:[^}]+\}\}|`[^`\n]*`/g

  function replaceInUnprotected(input: string, regex: RegExp, replacement: string): string {
    const markers: Array<{ start: number; end: number }> = []
    for (const m of input.matchAll(markerRegex)) {
      markers.push({ start: m.index!, end: m.index! + m[0].length })
    }
    let out = ''
    let cursor = 0
    for (const mk of markers) {
      if (mk.start > cursor) {
        out += input.slice(cursor, mk.start).replace(regex, replacement)
      }
      out += input.slice(mk.start, mk.end)
      cursor = mk.end
    }
    if (cursor < input.length) {
      out += input.slice(cursor).replace(regex, replacement)
    }
    return out
  }

  let out = text
  for (const key of sorted) {
    const escaped = escapeTermKey(key)
    const useWordBoundary = /^[A-Za-z0-9_]+$/.test(key)
    const regex = useWordBoundary ? new RegExp(`\\b${escaped}\\b`, 'g') : new RegExp(escaped, 'g')
    out = replaceInUnprotected(out, regex, `{{term:${key}}}`)
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
    if (node.type === 'code') return node

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

    const fence = line.match(/^```\s*([\w-]+)?\s*$/)
    if (fence) {
      const language = fence[1] || 'text'
      i += 1
      const codeLines: string[] = []
      while (i < lines.length && !lines[i].trim().startsWith('```')) {
        codeLines.push(lines[i])
        i += 1
      }
      if (i >= lines.length) throw new Error('Unclosed ``` code fence')
      body.push({
        type: 'code',
        language,
        code: codeLines.join('\n').trimEnd(),
      })
      i += 1
      continue
    }

    const singleLineCode = lines[i].trim().match(/^`([^`]+)`$/) ?? lines[i].trim().match(/^``([^`]+)``$/)
    if (singleLineCode) {
      const raw = singleLineCode[1].trim()
      const langMatch = raw.match(/^(html|css|js|ts|tsx|jsx|json|yaml|yml|bash|sh)\s+(.*)$/i)
      const language = langMatch ? langMatch[1].toLowerCase() : 'text'
      const code = langMatch ? langMatch[2] : raw
      body.push({ type: 'code', language, code })
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
    while (
      i < lines.length &&
      lines[i].trim() &&
      !lines[i].trim().startsWith('::') &&
      !lines[i].trim().startsWith('#') &&
      !lines[i].trim().startsWith('```')
    ) {
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
  const lessonPath = path.join(lessonDir, 'lesson.md')
  const [metaRaw, lessonRaw] = await Promise.all([
    readFile(metaPath, 'utf8'),
    readFile(lessonPath, 'utf8'),
  ])

  let meta: ContentMeta
  try {
    meta = toMeta(parseSimpleYaml(metaRaw))
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e)
    throw new Error(`Failed to parse ${path.relative(projectRoot, metaPath)}: ${msg}`)
  }
  let body: ContentBodyNode[]
  try {
    body = parseLessonMarkdown(lessonRaw)
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e)
    throw new Error(`Failed to parse ${path.relative(projectRoot, lessonPath)}: ${msg}`)
  }

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
    id: meta.id,
    meta,
    body,
    starter: {
      html,
      css,
      js,
    },
  }
}
function toProjectMeta(data: Record<string, string | number | string[]>): ProjectMeta {
  const required = ['id', 'title', 'subtitle', 'icon', 'track', 'order', 'mode', 'musicAnalogy'] as const
  for (const key of required) {
    if (!(key in data)) throw new Error(`Missing required project meta field: ${key}`)
  }
  if (typeof data.order !== 'number') throw new Error('project meta.order must be a number')
  if (typeof data.mode !== 'string' || !allowedModes.has(data.mode)) throw new Error('project meta.mode must be sandbox or local')

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

  const parsed = JSON.parse(jsonRaw) as { steps?: ProjectStep[] }
  if (!Array.isArray(parsed.steps)) {
    throw new Error(`Invalid project.json: missing steps array in ${path.relative(projectRoot, jsonPath)}`)
  }

  return {
    id: meta.id,
    meta,
    steps: parsed.steps,
  }
}

// ---------- Taxonomy ----------

type TaxonomyTrack = { id: string; title: string; subtitle: string; icon: string; order: number }
type TaxonomyChapter = { id: string; title: string; subtitle: string; icon: string; order: number }
type Taxonomy = { tracks: TaxonomyTrack[]; chapters: TaxonomyChapter[] }

function parseTaxonomyYaml(input: string): Taxonomy {
  const tracks: TaxonomyTrack[] = []
  const chapters: TaxonomyChapter[] = []
  let target: 'tracks' | 'chapters' | null = null
  let current: Partial<TaxonomyTrack> | null = null

  function commitCurrent() {
    if (!current?.id) return
    const item = { id: String(current.id), title: String(current.title || ''), subtitle: String(current.subtitle || ''), icon: String(current.icon || ''), order: Number(current.order || 0) }
    if (target === 'tracks') tracks.push(item)
    else if (target === 'chapters') chapters.push(item)
    current = null
  }

  for (const line of input.split(/\r?\n/)) {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith('#')) continue

    if (trimmed === 'tracks:') {
      if (current?.id) commitCurrent()
      target = 'tracks'
      continue
    }
    if (trimmed === 'chapters:') {
      if (current?.id) commitCurrent()
      target = 'chapters'
      continue
    }

    if (trimmed.startsWith('- id:')) {
      if (current?.id) commitCurrent()
      current = { id: trimmed.replace(/- id:\s*/, '').trim() }
      continue
    }

    if (current) {
      const fm = trimmed.match(/^(\w+):\s*(.+)/)
      if (fm) {
        const [, key, value] = fm
        if (key === 'order') current.order = parseInt(value.trim(), 10)
        else (current as any)[key] = value.trim()
      }
    }
  }

  if (current?.id) commitCurrent()

  return { tracks, chapters }
}

async function buildTaxonomy(): Promise<void> {
  const raw = await readFile(taxonomySourceFile, 'utf8')
  const taxonomy = parseTaxonomyYaml(raw)
  await atomicWriteFile(generatedTaxonomyFile, JSON.stringify(taxonomy, null, 2) + '\n')
}

// ---------- Quiz ----------

type CompiledGem = {
  id: string
  name: string
  icon: string
  achievement: string
  order: number
  levels: CompiledQuizLevel[]
}

type CompiledQuizLevel = {
  level: number
  type: string
  threshold: number
  name: string
  count: number
  questions: CompiledQuizQuestion[]
}

type CompiledQuizQuestion = {
  id: number
  difficulty: number
  question: string
  options: string[]
  answer: number
  explanation: string
}

async function compileQuiz(): Promise<void> {
  const gems: CompiledGem[] = []

  let entries: string[]
  try {
    entries = await readdir(quizSourceDir)
  } catch {
    // No quiz dir — skip
    await atomicWriteFile(generatedQuizFile, JSON.stringify({ gems: [], questions: [] }, null, 2) + '\n')
    return
  }

  for (const entry of entries.sort()) {
    if (!entry.endsWith('.yaml')) continue
    const raw = await readFile(path.join(quizSourceDir, entry), 'utf8')

    // Parse gem metadata from YAML header (before "levels:")
    const header = raw.split('levels:')[0] || ''
    const gemMeta: Record<string, string | number> = {}
    let inGem = false
    for (const rawLine of header.split(/\r?\n/)) {
      const line = rawLine.trim()
      if (!line || line.startsWith('#')) continue
      if (line === 'gem:') { inGem = true; continue }
      if (!inGem) continue
      const m = line.match(/^(\w+):\s*(.*)/)
      if (m) {
        const val = m[2].trim()
        gemMeta[m[1]] = m[1] === 'order' ? parseInt(val, 10) : val.replace(/^"(.*)"$/, '$1')
      }
    }

    const gem: CompiledGem = {
      id: String(gemMeta.id || entry.replace('.yaml', '')),
      name: String(gemMeta.name || ''),
      icon: String(gemMeta.icon || ''),
      achievement: String(gemMeta.achievement || ''),
      order: Number(gemMeta.order || 0),
      levels: [],
    }

    // Parse levels from the structured YAML
    const levelBlocks = raw.split(/\n  - level:/).slice(1)
    for (const block of levelBlocks) {
      const lines = block.split(/\r?\n/)
      // First line after split is the level number
      const levelNumber = parseInt(lines[0].trim(), 10)
      const levelData: Record<string, any> = { level: levelNumber }
      let inQuestions = false
      let currentQ: Record<string, any> = {}
      const questions: CompiledQuizQuestion[] = []
      let optionsList: string[] = []

      for (let li = 1; li < lines.length; li++) {
        const rawLine = lines[li]
        const line = rawLine.trim()
        if (!line || line.startsWith('#')) continue

        // Parse level metadata
        if (!inQuestions && !line.startsWith('questions:')) {
          const m = line.match(/^(\w+):\s*(.*)/)
          if (m) {
            const [, key, value] = m
            if (key === 'threshold') levelData[key] = parseInt(value, 10)
            else levelData[key] = value.trim()
          }
          continue
        }

        if (line.startsWith('questions:')) {
          inQuestions = true
          continue
        }

        // Parse question entries
        if (inQuestions) {
          if (line.startsWith('- id:')) {
            if (currentQ.id !== undefined) {
              questions.push({
                id: Number(currentQ.id),
                difficulty: Number(currentQ.difficulty || 1),
                question: String(currentQ.question || ''),
                options: [...optionsList],
                answer: Number(currentQ.answer || 0),
                explanation: String(currentQ.explanation || ''),
              })
              optionsList = []
            }
            currentQ = { id: parseInt(line.replace('- id:', '').trim(), 10) }
            continue
          }

          if (line.startsWith('- ') && !line.startsWith('- id:')) {
            // This is an option value
            const optVal = line.replace(/^\s*-\s*/, '').trim()
            // Remove YAML quotes if present
            optionsList.push(optVal.replace(/^"(.*)"$/, '$1'))
            continue
          }

          const m = line.match(/^(\w+):\s*(.*)/)
          if (m) {
            const [, key, value] = m
            if (key === 'difficulty') currentQ[key] = parseInt(value, 10)
            else if (key === 'answer') currentQ[key] = parseInt(value, 10)
            else if (key === 'question') {
              // Multi-line question (block scalar indicator)
              currentQ[key] = value === '|' ? '' : value.trim()
            } else if (key === 'explanation') {
              currentQ[key] = value === '|' ? '' : value.trim()
            } else {
              currentQ[key] = value.trim()
            }
          } else if (currentQ.question === '' || currentQ.explanation === '') {
            // Continuation of multi-line value
            const trimmedLine = rawLine.replace(/^\s+/, '')
            if (currentQ.question === '') currentQ.question = trimmedLine
            else if (currentQ.explanation === '') currentQ.explanation = trimmedLine
            else {
              // Append to whichever was last set to empty
              if (currentQ._lastField === 'question') currentQ.question += '\n' + trimmedLine
              else currentQ.explanation += '\n' + trimmedLine
            }
          }
        }
      }

      // Push last question
      if (currentQ.id !== undefined) {
        questions.push({
          id: Number(currentQ.id),
          difficulty: Number(currentQ.difficulty || 1),
          question: String(currentQ.question || ''),
          options: [...optionsList],
          answer: Number(currentQ.answer || 0),
          explanation: String(currentQ.explanation || ''),
        })
      }

      gem.levels.push({
        level: Number(levelData.level || 1),
        type: String(levelData.type || 'normal'),
        threshold: Number(levelData.threshold || 60),
        name: String(levelData.name || ''),
        count: questions.length,
        questions,
      })
    }

    gems.push(gem)
  }

  gems.sort((a, b) => a.order - b.order)

  // Flatten questions for backward compatibility — add gem/level fields
  const allQuestions = gems.flatMap(g =>
    g.levels.flatMap(l => l.questions.map(q => ({ ...q, gem: g.id, level: l.level })))
  )

  await atomicWriteFile(generatedQuizFile, JSON.stringify({ gems, questions: allQuestions }, null, 2) + '\n')
}

// ---------- Main ----------

export async function main() {
  await mkdir(generatedDir, { recursive: true })
  await mkdir(lessonsOutDir, { recursive: true })
  await mkdir(projectsOutDir, { recursive: true })

  // 加载增量编译缓存
  const cache = await loadBuildCache()
  const newCache: BuildCache = {
    glossary: cache.glossary,
    taxonomy: cache.taxonomy,
    lessons: { ...cache.lessons },
    projects: { ...cache.projects },
    quiz: { ...cache.quiz },
  }

  // --- 术语表 ---
  let glossary: GlossaryEntry[] = []
  let glossaryChanged = false
  try {
    const glossaryRaw = await readFile(glossarySourceFile, 'utf8')
    const glossaryHash = createHash('md5').update(glossaryRaw).digest('hex')
    if (glossaryHash !== cache.glossary) {
      glossary = parseGlossaryYaml(glossaryRaw)
      newCache.glossary = glossaryHash
      glossaryChanged = true
    } else {
      glossary = parseGlossaryYaml(glossaryRaw)
    }
  } catch {
    glossaryChanged = cache.glossary !== ''
    newCache.glossary = ''
  }
  const termKeys = glossary.map((g) => g.key).filter(Boolean)

  // --- 课程编译（增量）---
  const [lessonDirs, prologueDirs] = await Promise.all([
    collectLessonDirs(lessonsRoot),
    collectLessonDirs(prologueRoot).catch(() => [] as string[]),
  ])
  const allLessonDirs = [...lessonDirs, ...prologueDirs]

  // 先读取所有 meta.yaml 以确定 mode
  const lessonModes: Record<string, string> = {}
  await Promise.all(
    allLessonDirs.map(async (dir) => {
      try {
        const raw = await readFile(path.join(dir, 'meta.yaml'), 'utf8')
        const data = parseSimpleYaml(raw)
        lessonModes[dir] = String(data.mode || 'local')
      } catch {
        lessonModes[dir] = 'local'
      }
    }),
  )

  // 计算哪些课程需要重编译
  const lessonHashes = await Promise.all(
    allLessonDirs.map((dir) => hashLessonDir(dir, lessonModes[dir]))
  )

  const dirtyLessonDirs = allLessonDirs.filter((dir, i) => {
    const key = path.relative(projectRoot, dir)
    return glossaryChanged || lessonHashes[i] !== cache.lessons[key]
  })

  // 重编译有变化的课程
  let compiledAll: ReturnType<typeof applyGlossaryToBody> extends infer _ ? any[] : never
  if (dirtyLessonDirs.length === allLessonDirs.length) {
    // 全量重编译
    const compiledRaw = await Promise.all(allLessonDirs.map((dir) => compileLesson(dir)))
    compiledAll = compiledRaw.map((lesson) => ({
      ...lesson,
      body: applyGlossaryToBody(lesson.body, termKeys),
    }))
    allLessonDirs.forEach((dir, i) => {
      newCache.lessons[path.relative(projectRoot, dir)] = lessonHashes[i]
    })
  } else {
    // 增量：只重编译有变化的课程
    const dirtyCompiled = await Promise.all(dirtyLessonDirs.map((dir) => compileLesson(dir)))
    const dirtyMap = new Map(dirtyCompiled.map((l) => [l.id, l]))

    // 读取没有变化的课程（从已生成 JSON 加载）
    const unchangedDirs = allLessonDirs.filter((dir) => {
      const key = path.relative(projectRoot, dir)
      return !glossaryChanged && lessonHashes[allLessonDirs.indexOf(dir)] === cache.lessons[key]
    })
    const unchangedLoaded = await Promise.all(
      unchangedDirs.map(async (dir) => {
        try {
          const meta = parseSimpleYaml(await readFile(path.join(dir, 'meta.yaml'), 'utf8'))
          const id = String(meta.id)
          const json = await readFile(path.join(lessonsOutDir, `${id}.json`), 'utf8')
          return JSON.parse(json)
        } catch {
          return null
        }
      })
    )

    compiledAll = [
      ...dirtyCompiled.map((l) => ({
        ...l,
        body: applyGlossaryToBody(l.body, termKeys),
      })),
      ...unchangedLoaded.filter(Boolean),
    ]

    // 更新有变化课程的 hash
    dirtyLessonDirs.forEach((dir, i) => {
      newCache.lessons[path.relative(projectRoot, dir)] = lessonHashes[allLessonDirs.indexOf(dir)]
    })

    if (dirtyLessonDirs.length > 0) {
      const skipped = allLessonDirs.length - dirtyLessonDirs.length
      console.log(`[incremental] ${dirtyLessonDirs.length} lesson(s) changed, ${skipped} skipped`)
    }
  }

  const compiled = compiledAll
  compiled.sort((a, b) => a.meta.order - b.meta.order)

  // --- 项目编译（增量）---
  const projectDirs = await collectProjectDirs(projectsRoot)
  const projectHashes = await Promise.all(projectDirs.map(hashProjectDir))

  const dirtyProjectDirs = projectDirs.filter((dir, i) => {
    const key = path.relative(projectRoot, dir)
    return glossaryChanged || projectHashes[i] !== cache.projects[key]
  })

  let compiledProjects
  if (dirtyProjectDirs.length === projectDirs.length) {
    const raw = await Promise.all(projectDirs.map((dir) => compileProject(dir)))
    compiledProjects = raw.map((project) => ({
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
    projectDirs.forEach((dir, i) => {
      newCache.projects[path.relative(projectRoot, dir)] = projectHashes[i]
    })
  } else {
    const dirtyRaw = await Promise.all(dirtyProjectDirs.map((dir) => compileProject(dir)))
    const dirtyMapped = dirtyRaw.map((project) => ({
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

    const unchangedProjects = projectDirs.filter((dir) => {
      const key = path.relative(projectRoot, dir)
      return !glossaryChanged && projectHashes[projectDirs.indexOf(dir)] === cache.projects[key]
    })
    const unchangedProjectsLoaded = await Promise.all(
      unchangedProjects.map(async (dir) => {
        try {
          const meta = parseSimpleYaml(await readFile(path.join(dir, 'meta.yaml'), 'utf8'))
          const id = String(meta.id)
          const json = await readFile(path.join(projectsOutDir, `${id}.json`), 'utf8')
          return JSON.parse(json)
        } catch {
          return null
        }
      })
    )

    compiledProjects = [...dirtyMapped, ...unchangedProjectsLoaded.filter(Boolean)]
    dirtyProjectDirs.forEach((dir, i) => {
      newCache.projects[path.relative(projectRoot, dir)] = projectHashes[projectDirs.indexOf(dir)]
    })

    if (dirtyProjectDirs.length > 0) {
      const skipped = projectDirs.length - dirtyProjectDirs.length
      console.log(`[incremental] ${dirtyProjectDirs.length} project(s) changed, ${skipped} skipped`)
    }
  }
  compiledProjects.sort((a: any, b: any) => a.meta.order - b.meta.order)

  // --- 打单输出 ---
  const lessonsMeta = compiled.map(({ id, meta }: any) => ({ id, meta }))
  const projectsMetaList = compiledProjects.map(({ id, meta, steps }: any) => ({ id, meta, stepCount: steps.length }))

  const { rm } = await import('node:fs/promises')
  await Promise.all([
    rm(legacyLessonsIndex, { force: true }),
    rm(legacyProjectsIndex, { force: true }),
  ])

  await Promise.all([
    atomicWriteFile(lessonsMetaFile, `${JSON.stringify(lessonsMeta, null, 2)}\n`),
    ...compiled.map((l: any) =>
      writeFile(path.join(lessonsOutDir, `${l.id}.json`), `${JSON.stringify(l, null, 2)}\n`),
    ),
    atomicWriteFile(projectsMetaFile, `${JSON.stringify(projectsMetaList, null, 2)}\n`),
    ...compiledProjects.map((p: any) =>
      writeFile(path.join(projectsOutDir, `${p.id}.json`), `${JSON.stringify(p, null, 2)}\n`),
    ),
    atomicWriteFile(glossaryGeneratedFile, `${JSON.stringify(glossary, null, 2)}\n`),
    buildTaxonomy(),
    compileQuiz(),
  ])

  await saveBuildCache(newCache)

  const quizData = JSON.parse(await readFile(generatedQuizFile, 'utf8'))
  console.log(
    `Compiled ${compiled.length} lesson(s), ${compiledProjects.length} project(s), ${quizData.gems?.length || 0} quiz gem(s) to ${path.relative(projectRoot, generatedDir)}`,
  )
}

const isDirectRun = process.argv[1]?.replace(/\\/g, '/').endsWith('scripts/build-content.ts')
if (isDirectRun) {
  main().catch((error) => {
    console.error(error)
    process.exitCode = 1
  })
}

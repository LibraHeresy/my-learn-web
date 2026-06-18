import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { readFile, readdir, stat, writeFile } from 'node:fs/promises'

type CompiledLesson = {
  contentSchemaVersion: 1
  id: string
  meta: {
    id: string
    title: string
    track: string
    chapter: string
    order: number
    mode: 'sandbox' | 'local'
    musicAnalogy: string
  }
}

type CompiledProject = {
  contentSchemaVersion: 1
  id: string
  meta: {
    id: string
    title: string
    subtitle: string
    icon: string
    track: string
    order: number
    mode: 'sandbox' | 'local'
    musicAnalogy: string
  }
  steps: Array<{
    title: string
    content: string
    task: string
    starterCode?: { html: string; css: string; js: string }
  }>
}

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const projectRoot = path.resolve(__dirname, '..')

const lessonsFile = path.join(projectRoot, 'src', 'generated', 'lessons-index.json')
const projectsFile = path.join(projectRoot, 'src', 'generated', 'projects-index.json')
const contentRoot = path.join(projectRoot, 'content')

function assert(condition: unknown, message: string): asserts condition {
  if (!condition) throw new Error(message)
}

function fixMarkdownFences(input: string): { output: string; changed: boolean; fixes: number; appendedClosingFence: boolean } {
  const normalizedInput = input.replace(/\r\n/g, '\n')
  const lines = normalizedInput.split('\n')
  const out: string[] = []

  const knownLang = new Set(['html', 'css', 'js', 'jsx', 'ts', 'tsx', 'vue', 'json', 'yaml', 'yml', 'bash', 'sh', 'text'])

  let inFence = false
  let fenceLen = 0
  let openOutIndex = -1
  let sawContentSinceOpen = false
  let fixes = 0

  const fenceLine = (len: number) => '`'.repeat(Math.max(3, len))

  for (let i = 0; i < lines.length; i += 1) {
    const rawLine = lines[i]
    const match = rawLine.match(/^(\s*)(`{3,})(.*)$/)
    if (!match) {
      if (inFence && rawLine.trim() !== '') sawContentSinceOpen = true
      out.push(rawLine)
      continue
    }

    const [, indent, ticks, rest] = match
    const tickCount = ticks.length
    const restTrim = rest.trim()

    if (!inFence) {
      if (restTrim) {
        const parts = restTrim.split(/\s+/)
        const first = parts[0]?.toLowerCase()
        const remainder = restTrim.slice(parts[0].length).trim()
        if (first && knownLang.has(first) && remainder) {
          fixes += 1
          out.push(`${indent}${ticks}${first}`)
          out.push(`${indent}${remainder}`)
          inFence = true
          fenceLen = tickCount
          openOutIndex = out.length - 2
          sawContentSinceOpen = remainder.trim() !== ''
          continue
        }
      }

      inFence = true
      fenceLen = tickCount
      openOutIndex = out.length
      sawContentSinceOpen = false
      out.push(rawLine)
      continue
    }

    if (tickCount >= fenceLen) {
      const normalizedClose = `${indent}${fenceLine(fenceLen)}`
      if (!restTrim) {
        inFence = false
        fenceLen = 0
        openOutIndex = -1
        sawContentSinceOpen = false

        if (rawLine !== normalizedClose) {
          fixes += 1
          out.push(normalizedClose)
        } else {
          out.push(rawLine)
        }

        const next = lines[i + 1]
        if (typeof next === 'string') {
          const nextTrim = next.trim()
          const nextLang = nextTrim.toLowerCase()
          if (knownLang.has(nextLang)) {
            const after = lines[i + 2]
            const laterHasClose = lines.slice(i + 2, Math.min(lines.length, i + 40)).some((l) => l.trim().startsWith('```'))
            if (typeof after === 'string' && after.trim() && laterHasClose) {
              fixes += 1
              out.push(`${indent}${fenceLine(3)}${nextLang}`)
              i += 1
              inFence = true
              fenceLen = 3
              openOutIndex = out.length - 1
              sawContentSinceOpen = false
            }
          }
        }
        continue
      }

      fixes += 1
      inFence = false
      fenceLen = 0
      openOutIndex = -1
      sawContentSinceOpen = false
      out.push(normalizedClose)
      out.push(`${indent}${rest.trimStart()}`)
      continue
    }

    if (inFence && rawLine.trim() !== '') sawContentSinceOpen = true
    out.push(rawLine)
  }

  let appendedClosingFence = false
  if (inFence) {
    if (!sawContentSinceOpen && openOutIndex >= 0 && openOutIndex < out.length) {
      fixes += 1
      out.splice(openOutIndex, 1)
    } else {
      appendedClosingFence = true
      fixes += 1
      out.push(fenceLine(fenceLen))
    }
  }

  const output = out.join('\n')
  return { output, changed: output !== normalizedInput, fixes, appendedClosingFence }
}

async function collectFiles(dir: string): Promise<string[]> {
  const entries = await readdir(dir, { withFileTypes: true })
  const out: string[] = []
  for (const ent of entries) {
    const p = path.join(dir, ent.name)
    if (ent.isDirectory()) {
      out.push(...(await collectFiles(p)))
      continue
    }
    if (ent.isFile() && p.endsWith('.md')) out.push(p)
  }
  return out
}

async function fixContentMarkdown(): Promise<{ filesChanged: number; totalFixes: number; filesWithAppendedFence: number }> {
  const mdFiles = await collectFiles(contentRoot)
  let filesChanged = 0
  let totalFixes = 0
  let filesWithAppendedFence = 0

  for (const filePath of mdFiles) {
    const raw = await readFile(filePath, 'utf8')
    const fixed = fixMarkdownFences(raw)
    totalFixes += fixed.fixes
    if (fixed.appendedClosingFence) filesWithAppendedFence += 1
    if (!fixed.changed) continue
    filesChanged += 1
    await writeFile(filePath, fixed.output, 'utf8')
  }

  return { filesChanged, totalFixes, filesWithAppendedFence }
}

function validateUniqueIds<T extends { id: string }>(items: T[], label: string) {
  const seen = new Set<string>()
  for (const item of items) {
    assert(item.id, `${label}: missing id`)
    assert(!seen.has(item.id), `${label}: duplicate id "${item.id}"`)
    seen.add(item.id)
  }
}

function validateLessonOrdering(lessons: CompiledLesson[]) {
  const byGroup = new Map<string, CompiledLesson[]>()
  for (const l of lessons) {
    const key = `${l.meta.track}::${l.meta.chapter}`
    const arr = byGroup.get(key) ?? []
    arr.push(l)
    byGroup.set(key, arr)
  }

  for (const [key, arr] of byGroup) {
    const orders = new Set<number>()
    for (const l of arr) {
      assert(Number.isFinite(l.meta.order), `lessons: ${l.id} meta.order must be number`)
      assert(!orders.has(l.meta.order), `lessons: duplicate order ${l.meta.order} in group ${key}`)
      orders.add(l.meta.order)
    }
  }
}

function validateProjectSteps(projects: CompiledProject[]) {
  for (const p of projects) {
    assert(p.meta.title, `projects: ${p.id} missing meta.title`)
    assert(Array.isArray(p.steps), `projects: ${p.id} missing steps array`)
    if (p.meta.mode === 'sandbox') {
      const anyStarter = p.steps.some((s) => s.starterCode && (s.starterCode.html || s.starterCode.css || s.starterCode.js))
      assert(anyStarter, `projects: ${p.id} sandbox mode requires at least one step with starterCode`)
    }
    for (const [i, s] of p.steps.entries()) {
      assert(s.title, `projects: ${p.id} step ${i + 1} missing title`)
      assert(typeof s.content === 'string', `projects: ${p.id} step ${i + 1} content must be string`)
      assert(typeof s.task === 'string', `projects: ${p.id} step ${i + 1} task must be string`)
    }
  }
}

async function main() {
  if (process.argv.includes('--fix-md')) {
    const { filesChanged, totalFixes, filesWithAppendedFence } = await fixContentMarkdown()
    console.log(
      `Fixed markdown fences under content/: filesChanged=${filesChanged}, fixes=${totalFixes}, appendedClosingFence=${filesWithAppendedFence}`,
    )
  }

  const [lessonsRaw, projectsRaw] = await Promise.all([
    readFile(lessonsFile, 'utf8'),
    readFile(projectsFile, 'utf8'),
  ])

  const lessons = JSON.parse(lessonsRaw) as CompiledLesson[]
  const projects = JSON.parse(projectsRaw) as CompiledProject[]

  assert(Array.isArray(lessons), 'lessons-index.json must be an array')
  assert(Array.isArray(projects), 'projects-index.json must be an array')

  validateUniqueIds(lessons, 'lessons')
  validateUniqueIds(projects, 'projects')
  validateLessonOrdering(lessons)
  validateProjectSteps(projects)

  console.log(`Content lint OK: lessons=${lessons.length}, projects=${projects.length}`)
}

main().catch((err) => {
  console.error(err)
  process.exitCode = 1
})

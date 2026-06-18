import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { readFile } from 'node:fs/promises'

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

function assert(condition: unknown, message: string): asserts condition {
  if (!condition) throw new Error(message)
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


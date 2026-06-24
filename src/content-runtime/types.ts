export type LessonMode = 'sandbox' | 'local'

export type ContentMeta = {
  id: string
  title: string
  track: string
  chapter: string
  order: number
  mode: LessonMode
  musicAnalogy: string
  listenTo?: string
}

export type HeadingNode = {
  type: 'heading'
  depth: number
  text: string
}

export type ParagraphNode = {
  type: 'paragraph'
  text: string
}

export type TermNode = {
  type: 'term'
  key: string
  text: string
}

export type CodeBlockNode = {
  type: 'code'
  language: string
  code: string
}

export type BlockType =
  | 'block:music-analogy'
  | 'block:explain'
  | 'block:example'
  | 'block:task'
  | 'block:hint'
  | 'block:listen-to'

export type BlockName = BlockType extends `block:${infer Name}` ? Name : never

export type BlockNode = {
  type: BlockType
  name: BlockName
  attrs?: Record<string, string | string[]>
  content?: string
  steps?: Array<{
    content: string
    purpose?: string
    expected?: string
  }>
}

export type ContentBodyNode = HeadingNode | ParagraphNode | TermNode | CodeBlockNode | BlockNode

export type CompiledLesson = {
  id: string
  meta: ContentMeta
  body: ContentBodyNode[]
  starter: {
    html: string
    css: string
    js: string
  }
}

export type ProjectMeta = {
  id: string
  title: string
  subtitle: string
  icon: string
  track: string
  order: number
  mode: LessonMode
  musicAnalogy: string
  listenTo?: string
}

export type ProjectStep = {
  title: string
  content: string
  task: string
  hint?: string
  purpose?: string
  expectedResult?: string
  starterCode?: { html: string; css: string; js: string }
}

export type CompiledProject = {
  id: string
  meta: ProjectMeta
  steps: ProjectStep[]
}

export type ProjectListItem = {
  id: string
  meta: ProjectMeta
  stepCount: number
}

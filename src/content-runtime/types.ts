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

/** Block 支持的公共属性（可选标题） */
export type BlockAttrs = {
  title?: string
}

/** task 块内单条步骤 */
export type TaskStep = {
  content: string
  purpose?: string
  expected?: string
}

// ---- 各块专属类型（判别联合成员）---- //

export type MusicAnalogyBlockNode = {
  type: 'block:music-analogy'
  name: 'music-analogy'
  content: string
  attrs?: BlockAttrs
  steps?: never
}

export type ExplainBlockNode = {
  type: 'block:explain'
  name: 'explain'
  content: string
  attrs?: BlockAttrs
  steps?: never
}

export type ExampleBlockNode = {
  type: 'block:example'
  name: 'example'
  content: string
  attrs?: BlockAttrs
  steps?: never
}

/** task 块：steps 为必填，缺少时视为数据异常 */
export type TaskBlockNode = {
  type: 'block:task'
  name: 'task'
  content: string
  attrs?: BlockAttrs
  steps: TaskStep[]
}

export type HintBlockNode = {
  type: 'block:hint'
  name: 'hint'
  content: string
  attrs?: BlockAttrs
  steps?: never
}

export type ListenToBlockNode = {
  type: 'block:listen-to'
  name: 'listen-to'
  content: string
  attrs?: BlockAttrs
  steps?: never
}

/**
 * 课程正文中的块节点（判别联合）。
 * 通过 `.type` 或 `.name` 字段收窄后可获得精确类型，例如：
 * `if (node.type === 'block:task') { node.steps // TaskStep[] }`
 */
export type BlockNode =
  | MusicAnalogyBlockNode
  | ExplainBlockNode
  | ExampleBlockNode
  | TaskBlockNode
  | HintBlockNode
  | ListenToBlockNode

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

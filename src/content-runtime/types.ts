export type LessonMode = 'sandbox' | 'local'

import type { UserCode } from '../types'

export type ContentMeta = {
  id: string
  title: string
  track: string
  chapter: string
  order: number
  mode: LessonMode
  analogy: string
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

export type ListItemNode = {
  text: string
  children?: ListItemNode[]
}

export type ListNode = {
  type: 'list'
  ordered: boolean
  items: ListItemNode[]
}

export type TableNode = {
  type: 'table'
  headers: string[]
  rows: string[][]
}

export type BlockType =
  | 'block:analogy'
  | 'block:explain'
  | 'block:example'
  | 'block:task'
  | 'block:hint'
  | 'block:listen-to' // 已废弃，仅用于兼容旧课程内容
  | 'block:recap'

export type BlockName = BlockType extends `block:${infer Name}` ? Name : never

/** Block 支持的公共属性（可选标题） */
export type BlockAttrs = {
  title?: string
  emoji?: string
}

/** task 块内单条步骤 */
export type TaskStep = {
  content: string
  purpose?: string
  expected?: string
}

// ---- 各块专属类型（判别联合成员）---- //

export type AnalogyBlockNode = {
  type: 'block:analogy'
  name: 'analogy'
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

export type RecapBlockNode = {
  type: 'block:recap'
  name: 'recap'
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
  | AnalogyBlockNode
  | ExplainBlockNode
  | ExampleBlockNode
  | TaskBlockNode
  | HintBlockNode
  | ListenToBlockNode // 已废弃，仅用于兼容旧课程
  | RecapBlockNode

export type ContentBodyNode = HeadingNode | ParagraphNode | TermNode | CodeBlockNode | ListNode | TableNode | BlockNode

export type CompiledLesson = {
  id: string
  meta: ContentMeta
  body: ContentBodyNode[]
  starter: UserCode
}

export type CompiledProjectMeta = {
  id: string
  title: string
  subtitle: string
  icon: string
  track: string
  order: number
  mode: LessonMode
  analogy: string
  analogyBody: ContentBodyNode[]
}

export type CompiledProjectStep = {
  title: string
  starterCode?: UserCode
  contentBody: ContentBodyNode[]
  taskBody: ContentBodyNode[]
  hintBody?: ContentBodyNode[]
  purposeBody?: ContentBodyNode[]
  expectedResultBody?: ContentBodyNode[]
}

export type CompiledProject = {
  id: string
  meta: CompiledProjectMeta
  steps: CompiledProjectStep[]
}

export type ProjectListItem = {
  id: string
  meta: CompiledProjectMeta
  stepCount: number
}

export type HomeProjectCardItem = {
  id: string
  title: string
  subtitle: string
  icon: string
  analogyBody: ContentBodyNode[]
  stepCount: number
}

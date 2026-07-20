import type { Component } from 'vue'
import type { BlockName } from './types'
import ExplainBlock from './renderers/ExplainBlock.vue'
import ExampleBlock from './renderers/ExampleBlock.vue'
import ListenToBlock from './renderers/ListenToBlock.vue'
import AnalogyBlock from './renderers/AnalogyBlock.vue'
import TaskBlock from './renderers/TaskBlock.vue'
import HintBlock from './renderers/HintBlock.vue'
import RecapBlock from './renderers/RecapBlock.vue'
import UnsupportedBlock from './renderers/UnsupportedBlock.vue'

const blockRegistry: Partial<Record<BlockName, Component>> = {
  analogy: AnalogyBlock,
  explain: ExplainBlock,
  example: ExampleBlock,
  task: TaskBlock,
  hint: HintBlock,
  'listen-to': ListenToBlock, // 已废弃，仅兼容旧内容
  recap: RecapBlock,
}

export function resolveBlockComponent(name: BlockName): Component {
  return blockRegistry[name] || UnsupportedBlock
}


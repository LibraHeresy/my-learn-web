import type { Component } from 'vue'
import type { BlockName } from './types'
import ExplainBlock from './renderers/ExplainBlock.vue'
import ExampleBlock from './renderers/ExampleBlock.vue'
import ListenToBlock from './renderers/ListenToBlock.vue'
import MusicAnalogyBlock from './renderers/MusicAnalogyBlock.vue'
import TaskBlock from './renderers/TaskBlock.vue'
import UnsupportedBlock from './renderers/UnsupportedBlock.vue'

const blockRegistry: Partial<Record<BlockName, Component>> = {
  'music-analogy': MusicAnalogyBlock,
  explain: ExplainBlock,
  example: ExampleBlock,
  task: TaskBlock,
  'listen-to': ListenToBlock,
}

export function resolveBlockComponent(name: BlockName): Component {
  return blockRegistry[name] || UnsupportedBlock
}


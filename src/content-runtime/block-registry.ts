import type { Component } from 'vue'
import type { BlockName } from './types'
import ExplainBlock from './renderers/ExplainBlock.vue'
import ExampleBlock from './renderers/ExampleBlock.vue'
import AnalogyBlock from './renderers/AnalogyBlock.vue'
import TaskBlock from './renderers/TaskBlock.vue'
import HintBlock from './renderers/HintBlock.vue'
import RecapBlock from './renderers/RecapBlock.vue'
import PrerequisiteBlock from './renderers/PrerequisiteBlock.vue'
import DiagramBlock from './renderers/DiagramBlock.vue'
import PredictBlock from './renderers/PredictBlock.vue'
import UnsupportedBlock from './renderers/UnsupportedBlock.vue'

const blockRegistry: Partial<Record<BlockName, Component>> = {
  analogy: AnalogyBlock,
  prerequisite: PrerequisiteBlock,
  explain: ExplainBlock,
  example: ExampleBlock,
  task: TaskBlock,
  hint: HintBlock,
  recap: RecapBlock,
  diagram: DiagramBlock,
  predict: PredictBlock,
}

export function resolveBlockComponent(name: BlockName): Component {
  return blockRegistry[name] || UnsupportedBlock
}


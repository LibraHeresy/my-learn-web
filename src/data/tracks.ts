import type { Track } from '../types'

export const tracks: Track[] = [
  {
    id: 'fundamentals',
    title: '乐理篇',
    subtitle: 'HTML/CSS/JS 基础——从识谱到演奏，写出你的第一段旋律',
    icon: '🎼',
    order: 1
  },
  {
    id: 'framework',
    title: '合奏篇',
    subtitle: 'JS 进阶与异步编程——从独奏到协奏，从回调到 Promise',
    icon: '🎻',
    order: 2
  },
  {
    id: 'engineering',
    title: '登台篇',
    subtitle: '工程化工具与 Vue 框架——让你的作品登上舞台，像交响乐团一样组织代码',
    icon: '🎤',
    order: 3
  },
  {
    id: 'ai-collaboration',
    title: '指挥篇',
    subtitle: 'AI 协作——从演奏者到指挥家，一个人就是一支乐团',
    icon: '🤖',
    order: 4
  },
]

import type { Track } from '../types'

export const tracks: Track[] = [
  {
    id: 'fundamentals',
    title: '乐理篇',
    subtitle: '像学音乐先学读谱，写网页先学 HTML/CSS/JS',
    icon: '🎼',
    order: 1
  },
  {
    id: 'framework',
    title: '合奏篇',
    subtitle: 'JS 进阶与异步编程——从独奏到协奏',
    icon: '🎻',
    order: 2
  },
  {
    id: 'engineering',
    title: '登台篇',
    subtitle: '工程化工具与 Vue 框架——让你的作品登上舞台',
    icon: '🎤',
    order: 3
  },
]

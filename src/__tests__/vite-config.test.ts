import { afterEach, describe, expect, it, vi } from 'vitest'
import { mkdir, mkdtemp, rm, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join, resolve } from 'node:path'
import type { ModuleNode } from 'vite'
import {
  collectGeneratedJsonFiles,
  createSingleReloader,
  invalidateModulesByFiles,
} from '../../vite.config'

describe('vite content watch helpers', () => {
  afterEach(() => {
    vi.useRealTimers()
  })

  it('collectGeneratedJsonFiles 递归收集 generated 下的 json 文件', async () => {
    const root = await mkdtemp(join(tmpdir(), 'generated-json-'))
    const nestedDir = join(root, 'lessons')

    await mkdir(nestedDir, { recursive: true })
    await writeFile(join(root, 'lessons-meta.json'), '{}')
    await writeFile(join(root, '.build-cache.json'), '{}')
    await writeFile(join(nestedDir, 'demo.json'), '{}')
    await writeFile(join(nestedDir, 'ignore.txt'), 'x')

    const files = await collectGeneratedJsonFiles(root)

    expect(files.sort()).toEqual([
      resolve(root, '.build-cache.json'),
      resolve(root, 'lessons', 'demo.json'),
      resolve(root, 'lessons-meta.json'),
    ].sort())

    await rm(root, { recursive: true, force: true })
  })

  it('invalidateModulesByFiles 按文件失效模块并自动去重', () => {
    const modA = {} as ModuleNode
    const modB = {} as ModuleNode
    const normalizedPath = 'D:/repo/src/generated/lessons-meta.json'

    const getModulesByFile = vi.fn((file: string) => {
      if (file === normalizedPath) return new Set([modA, modB])
      return undefined
    })
    const invalidateModule = vi.fn()

    const count = invalidateModulesByFiles(
      {
        moduleGraph: { getModulesByFile, invalidateModule },
        ws: { send: vi.fn() },
      },
      ['D:\\repo\\src\\generated\\lessons-meta.json', 'D:\\repo\\src\\generated\\lessons-meta.json'],
    )

    expect(count).toBe(2)
    expect(invalidateModule).toHaveBeenCalledTimes(2)
    expect(invalidateModule).toHaveBeenCalledWith(modA)
    expect(invalidateModule).toHaveBeenCalledWith(modB)
  })

  it('createSingleReloader 在短时间内多次触发也只发送一次 reload', () => {
    vi.useFakeTimers()
    const send = vi.fn()
    const reload = createSingleReloader(send, 100)

    reload()
    reload()
    reload()
    expect(send).not.toHaveBeenCalled()

    vi.advanceTimersByTime(99)
    expect(send).not.toHaveBeenCalled()

    vi.advanceTimersByTime(1)
    expect(send).toHaveBeenCalledTimes(1)
    expect(send).toHaveBeenCalledWith({ type: 'full-reload', path: '*' })
  })
})

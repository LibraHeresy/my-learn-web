/// <reference types="vitest/config" />
import { defineConfig, normalizePath, type ModuleNode, type Plugin } from 'vite'
import vue from '@vitejs/plugin-vue'
import { VitePWA } from 'vite-plugin-pwa'
import { watch, type FSWatcher } from 'node:fs'
import { readdir } from 'node:fs/promises'
import { resolve } from 'node:path'
import { spawn, type ChildProcess } from 'node:child_process'

type ReloadPayload = {
  type: 'full-reload'
  path: string
}

type HmrServerLike = {
  moduleGraph: {
    getModulesByFile: (file: string) => Set<ModuleNode> | undefined
    invalidateModule: (mod: ModuleNode) => void
  }
  ws: {
    send: (payload: ReloadPayload) => void
  }
}

export async function collectGeneratedJsonFiles(dir: string): Promise<string[]> {
  const entries = await readdir(dir, { withFileTypes: true })
  const nested = await Promise.all(
    entries.map(async (entry) => {
      const fullPath = resolve(dir, entry.name)
      if (entry.isDirectory()) return collectGeneratedJsonFiles(fullPath)
      if (entry.isFile() && entry.name.endsWith('.json')) return [fullPath]
      return []
    }),
  )
  return nested.flat()
}

export function invalidateModulesByFiles(server: HmrServerLike, filePaths: string[]): number {
  const invalidated = new Set<ModuleNode>()

  for (const filePath of filePaths) {
    const normalized = normalizePath(filePath)
    const modules = server.moduleGraph.getModulesByFile(normalized) ?? server.moduleGraph.getModulesByFile(filePath)
    if (!modules) continue
    for (const mod of modules) {
      if (invalidated.has(mod)) continue
      invalidated.add(mod)
      server.moduleGraph.invalidateModule(mod)
    }
  }

  return invalidated.size
}

export function createSingleReloader(
  send: (payload: ReloadPayload) => void,
  delayMs = 80,
): () => void {
  let timer: ReturnType<typeof setTimeout> | null = null

  return () => {
    if (timer) return
    timer = setTimeout(() => {
      timer = null
      send({ type: 'full-reload', path: '*' })
    }, delayMs)
  }
}

function contentWatchPlugin(): Plugin {
  let watcher: FSWatcher | null = null
  let running: ChildProcess | null = null
  let queued = false
  let debounceTimer: ReturnType<typeof setTimeout> | null = null
  let serverRef: HmrServerLike | null = null
  let generatedDir = ''
  const scheduleReload = createSingleReloader((payload) => serverRef?.ws.send(payload))

  function runBuild() {
    if (running) {
      queued = true
      return
    }
    console.log('[content-watch] Rebuilding content...')
    running = spawn(process.execPath, ['--experimental-strip-types', 'scripts/build-content.ts'], {
      stdio: 'inherit',
    })
    running.on('close', async (code) => {
      running = null
      if (code === 0) {
        const generatedFiles = await collectGeneratedJsonFiles(generatedDir)
        const extraModules = [
          resolve(generatedDir, '..', 'content-loaders', 'lessons.ts'),
          resolve(generatedDir, '..', 'content-loaders', 'projects.ts'),
        ]
        const invalidated = serverRef
          ? invalidateModulesByFiles(serverRef, [...generatedFiles, ...extraModules])
          : 0
        console.log('[content-watch] Build complete.')
        console.log(`[content-watch] Invalidated ${invalidated} module(s).`)
        scheduleReload()
      } else {
        console.error(`[content-watch] Build failed (exit ${code}).`)
      }
      if (queued) {
        queued = false
        runBuild()
      }
    })
  }

  return {
    name: 'content-watch',
    apply: (_config, env) => {
      if (env.command !== 'serve') return false
      if (env.mode === 'test') return false
      return true
    },
    configureServer(server) {
      serverRef = server
      const contentDir = resolve(server.config.root, 'src/content')
      generatedDir = resolve(server.config.root, 'src/generated')

      watcher = watch(contentDir, { recursive: true }, (_event, filename) => {
        if (!filename) return
        const fullPath = resolve(contentDir, filename)
        if (fullPath.startsWith(generatedDir)) return
        if (debounceTimer) clearTimeout(debounceTimer)
        debounceTimer = setTimeout(runBuild, 200)
      })

      server.httpServer?.on('close', () => {
        watcher?.close()
        if (debounceTimer) clearTimeout(debounceTimer)
      })
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  base: '/my-learn-web/',
  // CodeEditor chunk（CodeMirror 6 本体，约 520KB）已在课程页按需加载，
  // 属编辑器功能的合理体积，此处调高阈值避免构建警告噪音
  build: {
    chunkSizeWarningLimit: 550,
  },
  server: {
    watch: {
      ignored: ['**/src/generated/**'],
    },
  },
  plugins: [
    vue(),
    contentWatchPlugin(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: '代码乐章',
        short_name: '代码乐章',
        description: '从乐谱到代码，用音乐思维学 Web 开发',
        theme_color: '#c9a96e',
        background_color: '#faf7f0',
        display: 'standalone',
        icons: [
          { src: 'favicon.svg', sizes: 'any', type: 'image/svg+xml' },
        ],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,woff2}'],
        runtimeCaching: [
          {
            urlPattern: /\/src\/generated\//,
            handler: 'NetworkFirst',
            options: { cacheName: 'generated-content' },
          },
        ],
      },
    }),
  ],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/__tests__/setup.ts'],
    exclude: ['.claude/**', '**/node_modules/**'],
  },
})

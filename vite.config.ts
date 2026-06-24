/// <reference types="vitest/config" />
import { defineConfig, type Plugin } from 'vite'
import vue from '@vitejs/plugin-vue'
import { watch, type FSWatcher } from 'node:fs'
import { resolve } from 'node:path'
import { spawn, type ChildProcess } from 'node:child_process'

function contentWatchPlugin(): Plugin {
  let watcher: FSWatcher | null = null
  let running: ChildProcess | null = null
  let queued = false
  let debounceTimer: ReturnType<typeof setTimeout> | null = null

  function runBuild() {
    if (running) {
      queued = true
      return
    }
    console.log('[content-watch] Rebuilding content...')
    running = spawn(process.execPath, ['--experimental-strip-types', 'scripts/build-content.ts'], {
      stdio: 'inherit',
    })
    running.on('close', (code) => {
      running = null
      if (code === 0) {
        console.log('[content-watch] Build complete.')
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
    apply: 'serve',
    configureServer(server) {
      const contentDir = resolve(server.config.root, 'src/content')
      const generatedDir = resolve(server.config.root, 'src/generated')

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
  plugins: [vue(), contentWatchPlugin()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/__tests__/setup.ts'],
    exclude: ['.claude/**', '**/node_modules/**'],
  },
})

/// <reference types="vitest/config" />
import { defineConfig, type Plugin } from 'vite'
import vue from '@vitejs/plugin-vue'
import { VitePWA } from 'vite-plugin-pwa'
import { watch, type FSWatcher } from 'node:fs'
import { resolve } from 'node:path'
import { spawn, type ChildProcess } from 'node:child_process'

function contentWatchPlugin(): Plugin {
  let watcher: FSWatcher | null = null
  let running: ChildProcess | null = null
  let queued = false
  let debounceTimer: ReturnType<typeof setTimeout> | null = null
  let serverRef: any = null

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
        serverRef?.ws?.send({ type: 'full-reload', path: '*' })
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
      serverRef = server
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

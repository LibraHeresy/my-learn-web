import type { UserCode } from '../types'

/**
 * 将 UserCode 编码为 URL-safe base64 字符串。
 * 用于生成可分享的课程链接。
 */
export function encodeCode(code: UserCode): string {
  try {
    return btoa(encodeURIComponent(JSON.stringify(code)))
  } catch {
    return ''
  }
}

/**
 * 从 URL-safe base64 字符串解码 UserCode。
 * 解码失败时返回 null。
 */
export function decodeCode(hash: string): UserCode | null {
  try {
    const json = decodeURIComponent(atob(hash))
    const obj = JSON.parse(json)
    if (
      typeof obj === 'object' &&
      obj !== null &&
      typeof obj.html === 'string' &&
      typeof obj.css === 'string' &&
      typeof obj.js === 'string'
    ) {
      return { html: obj.html, css: obj.css, js: obj.js }
    }
    return null
  } catch {
    return null
  }
}

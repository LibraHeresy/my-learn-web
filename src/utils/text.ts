export function safeSlice(text: string, start: number, end?: number): string {
  let adjustedStart = start
  let adjustedEnd = end

  if (adjustedStart > 0 && adjustedStart < text.length) {
    // 低位代理 (0xDC00-0xDFFF)，高位代理在 start-1 处
    if (text.charCodeAt(adjustedStart) >= 0xdc00 && text.charCodeAt(adjustedStart) <= 0xdfff) {
      adjustedStart = adjustedStart - 1
    }
  }

  if (adjustedEnd !== undefined && adjustedEnd > 0 && adjustedEnd < text.length) {
    if (text.charCodeAt(adjustedEnd) >= 0xdc00 && text.charCodeAt(adjustedEnd) <= 0xdfff) {
      // 高位代理在 end-1 处已被包含，低位代理在 end 处被排除 → 孤立高位代理
      // 将 end 后退一位，让整个代理对被排除
      adjustedEnd = adjustedEnd - 1
    }
  }

  return adjustedEnd !== undefined ? text.slice(adjustedStart, adjustedEnd) : text.slice(adjustedStart)
}

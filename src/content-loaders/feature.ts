export function isContentV2Enabled(): boolean {
  const v = import.meta.env.VITE_CONTENT_V2
  if (v === '0' || v === 'false') return false
  return true
}

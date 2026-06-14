const cfg = (typeof window !== 'undefined' && window.__CFG__) || {}
export const config = cfg
export function get(key, fallback = '') {
  return cfg[key] !== undefined ? cfg[key] : fallback
}

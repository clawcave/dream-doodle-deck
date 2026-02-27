/**
 * Tiny localStorage helpers with safe JSON parsing.
 */

export function safeJsonParse<T>(raw: string | null): T | null {
  if (!raw) return null
  try {
    return JSON.parse(raw) as T
  } catch {
    return null
  }
}

export function loadJson<T>(key: string): T | null {
  return safeJsonParse<T>(localStorage.getItem(key))
}

export function saveJson<T>(key: string, value: T): void {
  localStorage.setItem(key, JSON.stringify(value))
}

export function removeKey(key: string): void {
  localStorage.removeItem(key)
}

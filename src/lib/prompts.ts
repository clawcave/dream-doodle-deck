const PROMPTS = [
  'What was the most vivid detail you remember?',
  'Who showed up unexpectedly, and how did it feel?',
  'If the dream had a soundtrack, what would it be?',
  'Describe the setting in three words.',
  'What object felt important, even if it made no sense?',
  'What changed right before you woke up?',
  'If you could re-enter the dream, what would you ask?',
  'What was the mood of the dream—and did it shift?',
  'Was there a door, hallway, or vehicle? Where did it lead?',
  'What color dominated the dream?',
]

function xmur3(str: string) {
  // small string hash for deterministic seeding
  let h = 1779033703 ^ str.length
  for (let i = 0; i < str.length; i++) {
    h = Math.imul(h ^ str.charCodeAt(i), 3432918353)
    h = (h << 13) | (h >>> 19)
  }
  return () => {
    h = Math.imul(h ^ (h >>> 16), 2246822507)
    h = Math.imul(h ^ (h >>> 13), 3266489909)
    h ^= h >>> 16
    return h >>> 0
  }
}

function mulberry32(a: number) {
  return () => {
    let t = (a += 0x6d2b79f5)
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

export function shuffle<T>(arr: T[], rng = Math.random): T[] {
  const out = [...arr]
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1))
    ;[out[i], out[j]] = [out[j], out[i]]
  }
  return out
}

/**
 * Deterministic daily prompt based on YYYY-MM-DD in the user's local time.
 */
export function getDailyPrompt(date = new Date()): { prompt: string; key: string } {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  const key = `${y}-${m}-${d}`

  const seed = xmur3(key)()
  const rng = mulberry32(seed)
  const idx = Math.floor(rng() * PROMPTS.length)
  return { prompt: PROMPTS[idx], key }
}

export function getRandomPrompt(): string {
  return PROMPTS[Math.floor(Math.random() * PROMPTS.length)]
}

export function getShuffledPrompts(date = new Date()): { prompts: string[]; key: string } {
  const { key } = getDailyPrompt(date)
  const seed = xmur3(`${key}:shuffle`)()
  const rng = mulberry32(seed)
  return { prompts: shuffle(PROMPTS, rng), key }
}

import type { DreamCard, Mood } from '@/types/dream'

type WeightedCounts<T extends string> = {
  total: number
  counts: Record<T, number>
}

export type RemixData = {
  mood: WeightedCounts<Mood>
  tags: {
    total: number
    counts: Record<string, number>
  }
}

function inc<T extends string>(rec: Record<T, number>, key: T, by = 1) {
  rec[key] = (rec[key] ?? 0) + by
}

export function buildRemixData(dreams: DreamCard[]): RemixData {
  const moodCounts = {} as Record<Mood, number>
  const tagCounts: Record<string, number> = {}

  let moodTotal = 0
  let tagTotal = 0

  for (const d of dreams) {
    moodTotal += 1
    inc(moodCounts, d.mood, 1)

    for (const raw of d.tags) {
      const tag = raw.trim()
      if (!tag) continue
      tagTotal += 1
      tagCounts[tag] = (tagCounts[tag] ?? 0) + 1
    }
  }

  return {
    mood: { total: moodTotal, counts: moodCounts },
    tags: { total: tagTotal, counts: tagCounts },
  }
}

export function topEntries(
  counts: Record<string, number>,
  limit = 24,
): Array<{ key: string; count: number }> {
  return Object.entries(counts)
    .map(([key, count]) => ({ key, count }))
    .sort((a, b) => b.count - a.count || a.key.localeCompare(b.key))
    .slice(0, limit)
}

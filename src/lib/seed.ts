import type { DreamCard, Mood } from '@/types/dream'

function iso(d: Date) {
  return d.toISOString()
}

function makeDream(partial: {
  id: string
  title: string
  mood: Mood
  tags: string[]
  doodleDataUrl?: string
  createdAt: string
}): DreamCard {
  return {
    id: partial.id,
    title: partial.title,
    mood: partial.mood,
    tags: partial.tags,
    doodleDataUrl: partial.doodleDataUrl,
    createdAt: partial.createdAt,
    updatedAt: partial.createdAt,
  }
}

/**
 * A small set of sample dreams for first-run demo content.
 * (No images included; doodleDataUrl can be added later.)
 */
export function getSampleDreams(now = new Date()): DreamCard[] {
  const dayMs = 24 * 60 * 60 * 1000
  return [
    makeDream({
      id: 'sample_1',
      title: 'Walking through a library that rearranged itself',
      mood: 'weird',
      tags: ['library', 'maze', 'books'],
      createdAt: iso(new Date(now.getTime() - 2 * dayMs)),
    }),
    makeDream({
      id: 'sample_2',
      title: 'Flying over a city made of paper',
      mood: 'excited',
      tags: ['flight', 'city', 'paper'],
      createdAt: iso(new Date(now.getTime() - 1 * dayMs)),
    }),
    makeDream({
      id: 'sample_3',
      title: 'A calm conversation with a whale in shallow water',
      mood: 'peaceful',
      tags: ['ocean', 'whale', 'conversation'],
      createdAt: iso(new Date(now.getTime() - 6 * 60 * 60 * 1000)),
    }),
  ]
}

export function shouldSeedDreams(existingCount: number) {
  return existingCount === 0
}

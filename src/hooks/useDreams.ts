import { useCallback, useEffect, useMemo, useState } from 'react'
import type { DreamCard, Mood, Tag } from '@/types/dream'
import { loadJson, saveJson } from '@/lib/storage'

const STORAGE_KEY = 'dream-doodle-deck:dreams:v1'

type DreamsState = {
  dreams: DreamCard[]
}

function nowIso() {
  return new Date().toISOString()
}

function newId() {
  // good enough for local-only app; avoids adding deps
  return `dream_${Math.random().toString(16).slice(2)}_${Date.now()}`
}

export type CreateDreamInput = {
  title: string
  mood: Mood
  tags: Tag[]
  doodleDataUrl?: string
}

export function useDreams() {
  const [dreams, setDreams] = useState<DreamCard[]>([])

  // initial load
  useEffect(() => {
    const loaded = loadJson<DreamsState>(STORAGE_KEY)
    if (loaded?.dreams?.length) setDreams(loaded.dreams)
  }, [])

  // persist
  useEffect(() => {
    saveJson<DreamsState>(STORAGE_KEY, { dreams })
  }, [dreams])

  const createDream = useCallback((input: CreateDreamInput) => {
    const ts = nowIso()
    const dream: DreamCard = {
      id: newId(),
      title: input.title.trim(),
      mood: input.mood,
      tags: input.tags.map(t => t.trim()).filter(Boolean),
      doodleDataUrl: input.doodleDataUrl,
      createdAt: ts,
      updatedAt: ts,
    }
    setDreams(prev => [dream, ...prev])
    return dream
  }, [])

  const updateDream = useCallback(
    (id: string, patch: Partial<Omit<DreamCard, 'id' | 'createdAt'>>) => {
      setDreams(prev =>
        prev.map(d =>
          d.id === id
            ? {
                ...d,
                ...patch,
                updatedAt: nowIso(),
              }
            : d,
        ),
      )
    },
    [],
  )

  const deleteDream = useCallback((id: string) => {
    setDreams(prev => prev.filter(d => d.id !== id))
  }, [])

  const getDreamById = useCallback(
    (id: string) => dreams.find(d => d.id === id),
    [dreams],
  )

  const allTags = useMemo(() => {
    const set = new Set<string>()
    dreams.forEach(d => d.tags.forEach(t => set.add(t)))
    return Array.from(set).sort((a, b) => a.localeCompare(b))
  }, [dreams])

  return {
    dreams,
    setDreams,
    createDream,
    updateDream,
    deleteDream,
    getDreamById,
    allTags,
  }
}

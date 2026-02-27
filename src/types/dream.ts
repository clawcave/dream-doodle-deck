export type Mood =
  | 'peaceful'
  | 'happy'
  | 'excited'
  | 'weird'
  | 'anxious'
  | 'scary'
  | 'sad'
  | 'neutral'

export type Tag = string

export type DreamCard = {
  id: string
  title: string
  mood: Mood
  tags: Tag[]
  doodleDataUrl?: string
  createdAt: string // ISO
  updatedAt: string // ISO
}

export const MOODS: Mood[] = [
  'peaceful',
  'happy',
  'excited',
  'weird',
  'anxious',
  'scary',
  'sad',
  'neutral',
]

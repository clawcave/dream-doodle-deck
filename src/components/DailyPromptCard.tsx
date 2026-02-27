import { useMemo, useState } from 'react'
import { getDailyPrompt, getRandomPrompt } from '@/lib/prompts'

type Props = {
  /**
   * Optional override if you want to display a prompt for a specific date.
   */
  date?: Date
}

export default function DailyPromptCard({ date }: Props) {
  const base = useMemo(() => getDailyPrompt(date ?? new Date()), [date])
  const [prompt, setPrompt] = useState(base.prompt)

  return (
    <section className="rounded-lg border bg-background p-4">
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-1">
          <h3 className="text-sm font-medium text-muted-foreground">Daily prompt</h3>
          <p className="text-base leading-relaxed">{prompt}</p>
          <p className="text-xs text-muted-foreground">Key: {base.key}</p>
        </div>

        <button
          type="button"
          className="rounded-md border px-3 py-2 text-sm hover:bg-muted"
          onClick={() => setPrompt(getRandomPrompt())}
          aria-label="Refresh prompt"
          title="Refresh"
        >
          Refresh
        </button>
      </div>
    </section>
  )
}

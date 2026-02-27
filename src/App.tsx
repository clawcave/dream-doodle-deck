export default function App() {
  return (
    <div className="min-h-dvh bg-background text-foreground">
      <header className="border-b">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-4 py-4">
          <h1 className="text-lg font-semibold">Dream Doodle Deck</h1>
          <nav className="text-sm text-muted-foreground">Capture · Gallery · Remix</nav>
        </div>
      </header>
      <main className="mx-auto max-w-4xl px-4 py-8">
        <p className="text-muted-foreground">Scaffolded. Next: routing + dream capture UI.</p>
      </main>
    </div>
  )
}

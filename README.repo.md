# Dream Doodle Deck

A playful mini journaling app where you capture dreams as swipeable “cards” with a title, mood, tags, and a quick doodle on a simple canvas. It includes a daily prompt generator, a searchable/filterable card gallery, and a “remix” view that creates a lightweight collage/word-cloud from your saved tags and moods. Everything runs client-side with localStorage, built as a single React + Vite SPA styled with Tailwind and shadcn/ui components.

## Tech Constraints (WebContainer-Compatible)

This project runs live in spectators' browsers via StackBlitz WebContainers. Use only WebContainer-compatible dependencies:

- **Database**: PGlite (`@electric-sql/pglite`) — Postgres compiled to WASM
- **ORM**: Drizzle ORM (`drizzle-orm/pglite`)
- **No Turbopack**: Next.js MUST use `next dev --no-turbopack` (set in package.json scripts). Turbopack requires native bindings unavailable in WebContainers.
- **No native addons**: Avoid `sharp`, `bcrypt`, `better-sqlite3`, `prisma`, etc.
- **No external services**: No TCP sockets (no hosted Postgres, Redis, MongoDB)
- **Node.js only**: No Python, Go, Rust, etc.

## Seed Data

If this project uses a database, include a `seed.ts` file with realistic demo data that runs on every app boot. Each spectator gets their own isolated instance, so seeding on boot is the correct pattern.

## Built by AI Agents on [ClawCave](https://claw-cave.com)

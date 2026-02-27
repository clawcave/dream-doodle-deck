import { NavLink } from 'react-router-dom'

const linkBase =
  'rounded-md px-3 py-2 text-sm transition-colors hover:bg-muted hover:text-foreground'

const linkActive = 'bg-muted text-foreground'
const linkInactive = 'text-muted-foreground'

export default function HeaderNav() {
  return (
    <nav className="flex items-center gap-1">
      <NavLink
        to="/capture"
        className={({ isActive }) =>
          [linkBase, isActive ? linkActive : linkInactive].join(' ')
        }
      >
        Capture
      </NavLink>
      <NavLink
        to="/gallery"
        className={({ isActive }) =>
          [linkBase, isActive ? linkActive : linkInactive].join(' ')
        }
      >
        Gallery
      </NavLink>
      <NavLink
        to="/remix"
        className={({ isActive }) =>
          [linkBase, isActive ? linkActive : linkInactive].join(' ')
        }
      >
        Remix
      </NavLink>
    </nav>
  )
}

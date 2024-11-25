import { NavLink } from 'react-router'
import { Logo } from './logo'
import { Separator } from './ui/separator'
import { CalendarClock, Home } from 'lucide-react'
import { ThemeToggle } from './theme/theme-toggle'
import { AccountMenu } from './account-menu'

export function Header() {
  return (
    <div className="border-b">
      <div className="flex h-16 items-center gap-6 px-6">
        <Logo />
        <Separator orientation="vertical" className="h-6" />

        <nav className="flex items-center space-x-4 lg:space-x-6">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `flex items-center gap-1.5 text-sm font-medium ${
                isActive ? 'text-foreground' : 'text-muted-foreground'
              } hover:text-foreground`
            }
          >
            <Home className="h-4 w-4" />
            Início
          </NavLink>
          <NavLink
            to="/rides"
            className={({ isActive }) =>
              `flex items-center gap-1.5 text-sm font-medium ${
                isActive ? 'text-foreground' : 'text-muted-foreground'
              } hover:text-foreground`
            }
          >
            <CalendarClock className="h-4 w-4" />
            Histórico
          </NavLink>
        </nav>
        <div className="ml-auto flex items-center gap-2">
          <ThemeToggle />
          <AccountMenu />
        </div>
      </div>
    </div>
  )
}

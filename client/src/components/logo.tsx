import { Navigation } from 'lucide-react'

export function Logo() {
  return (
    <div className="flex items-center gap-1 text-lg text-foreground">
      <Navigation className="h-5 w-5" />
      <div>
        <span className="font-bold text-emerald-400">m</span>
        <span className="font-semibold">ove</span>
      </div>
    </div>
  )
}

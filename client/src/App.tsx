import './index.css'

import { Toaster } from 'sonner'

import { Router } from './routes'
import { ThemeProvider } from './components/theme/theme-provider'

export function App() {
  return (
    <ThemeProvider storageKey="shopper-move-theme">
      <Toaster richColors />
      <Router />
    </ThemeProvider>
  )
}

import './index.css'

import { Toaster } from 'sonner'

import { Router } from './routes'
import { ThemeProvider } from './components/theme/theme-provider'
import { AuthProvider } from './context/auth-context'

export function App() {
  return (
    <ThemeProvider storageKey="shopper-move-theme">
      <AuthProvider>
        <Toaster richColors />
        <Router />
      </AuthProvider>
    </ThemeProvider>
  )
}

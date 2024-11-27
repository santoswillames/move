import './index.css'

import { Toaster } from 'sonner'

import { Router } from './routes'
import { ThemeProvider } from './components/theme/theme-provider'
import { AuthProvider } from './context/auth-context'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

export function App() {
  return (
    <ThemeProvider storageKey="shopper-move-theme">
      <AuthProvider>
        <QueryClientProvider client={queryClient}>
          <Toaster richColors />
          <Router />
        </QueryClientProvider>
      </AuthProvider>
    </ThemeProvider>
  )
}

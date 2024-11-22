import './index.css'

import { Toaster } from 'sonner'

import { Router } from './routes'

export function App() {
  return (
    <>
      <Toaster richColors />
      <Router />
    </>
  )
}

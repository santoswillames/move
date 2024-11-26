import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'

import { App } from './app'

// biome-ignore lint/style/noNonNullAssertion: <explanation>
createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
)

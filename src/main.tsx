import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import AuthProvider from './context/AuthProvider'
import FavouritesProvider from './context/FavouritesProvider'
import './index.css'

// BASE_URL is '/' in dev and '/gujvista/' in the production build (see vite.config.ts)
const basename = import.meta.env.BASE_URL.replace(/\/$/, '')

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter basename={basename}>
      <AuthProvider>
        <FavouritesProvider>
          <App />
        </FavouritesProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
)
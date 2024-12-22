// import { StrictMode } from 'react'
// import img from './assets/images/earbuds-prod-1.webp'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { AuthProvider } from './hooks/useAuth.tsx'

createRoot(document.getElementById('root')!).render(
    <AuthProvider>

        <App />
    </AuthProvider>

)

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/index.css'
import App from './App.tsx'
import { QueryProvider } from './app/provider/QueryProvider.tsx'
import {router} from './app/router/index.ts'
import { RouterProvider } from '@tanstack/react-router'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryProvider>
      <RouterProvider router={router}/>
      <App />
    </QueryProvider>  
  </StrictMode>,
)

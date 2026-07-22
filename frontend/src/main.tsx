import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/index.css'
import App from './App.tsx'
import { QueryProvider } from './app/provider/QueryProvider.tsx'
import {router} from './app/router/index.ts'
import { RouterProvider } from '@tanstack/react-router'
import { ToastContainer } from "react-toastify";
import { TooltipProvider } from './components/ui/tooltip.tsx'
import "react-toastify/dist/ReactToastify.css";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryProvider>
      <TooltipProvider>
      <ToastContainer></ToastContainer>
      <RouterProvider router={router}/>
      <App />
      </TooltipProvider>
    </QueryProvider>  
  </StrictMode>
)

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {BrowserRouter} from 'react-router'
import './index.css'
import App from './App.jsx'
<<<<<<< HEAD
import NavBarContext from './context/NavBarContext.jsx'
=======
import { AuthProvider } from './context/AuthContext.jsx'
>>>>>>> upstream/main

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
<<<<<<< HEAD
    <NavBarContext>
    <App />
    </NavBarContext>
=======
    <AuthProvider>
    <App />

    </AuthProvider>
>>>>>>> upstream/main
    </BrowserRouter>
  </StrictMode>,
)

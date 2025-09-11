import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {BrowserRouter} from 'react-router'
import './index.css'
import App from './App.jsx'
import NavBarContext from './context/NavBarContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <NavBarContext>
    <App />
    </NavBarContext>
    </BrowserRouter>
  </StrictMode>,
)

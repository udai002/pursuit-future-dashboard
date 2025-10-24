import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import './index.css'
import App from './App.jsx'
import NavBarContext from './context/NavBarContext.jsx'
import { AuthProvider } from './context/AuthContext.jsx'
import { Provider } from 'react-redux'
import { store } from './store.js'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
     <Provider store={store}>
      <AuthProvider>
    <NavBarContext>
    <App />
    </NavBarContext>
    </AuthProvider>
    </Provider>
      </BrowserRouter>


  </StrictMode>
)

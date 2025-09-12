import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Route, Routes } from 'react-router'
import Home from './pages/Home/Home'
import Signin from './pages/Home/Authentication/Signin'
import { Toaster } from 'react-hot-toast'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <Routes>
      <Route path='/' Component={Home} />
      <Route path='/login' Component={Signin} />
     </Routes>
     <Toaster></Toaster>
    </>
  )
}

export default App

import { useState } from 'react'

import './App.css'
import { Route, Routes } from 'react-router'
import Home from './pages/Home/Home'
import { Sidenavbar } from './components/Navigation/Sidenavbar'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <Routes>
      <Route path='/' Component={Home} />
      <Route path='/sidebar' Component={Sidenavbar}/>
     </Routes>
    </>
  )
}

export default App

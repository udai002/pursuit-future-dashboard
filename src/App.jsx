import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Route, Routes } from 'react-router'
import Home from './pages/Home/Home'
import Announcements from './components/announcements'
import Teaminformation from "./pages/Teaminformation"
import EmployeeTable from './components/Teaminfo/EmployeeTable'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <Routes>
      <Route path='/' Component={Home} />
      <Route path='/announcements' Component={Announcements} />
      <Route path='/teaminfo' Component={Teaminformation}/>
           <Route path='/teams/:teamid/employees' Component={EmployeeTable}/>
     </Routes>
    </>
  )
}

export default App

import { useState } from 'react'
import './App.css'
import { Route, Routes } from 'react-router'
import Home from './pages/Home/Home'
import Announcements from './components/announcements'
import Teaminformation from "./pages/Teaminformation"
import EmployeeTable from './components/Teaminfo/EmployeeTable'
import { Sidenavbar } from './components/Navigation/Sidenavbar'
import MembersInfo from './pages/Home/MembersInfo'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <Routes>
      <Route path='/' Component={Home} />
      <Route path='/members' Component={MembersInfo}/>
      <Route path='/announcements' Component={Announcements} />
      <Route path='/teaminfo' Component={Teaminformation}/>
      <Route path='/teams/:teamid/employees' Component={EmployeeTable}/>
      <Route path='/sidebar' Component={Sidenavbar}/>
     </Routes>
    </>
  )
}

export default App

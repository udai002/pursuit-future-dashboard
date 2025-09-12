import { useState } from 'react'
import './App.css'
import { Route, Routes } from 'react-router'
import Home from './pages/Home/Home'
import Signin from './pages/Home/Authentication/Signin'
import { Toaster } from 'react-hot-toast'
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
     <Toaster></Toaster>
    </>
  )
}

export default App

import { useState } from 'react'
import './App.css'
import { Route, Routes } from 'react-router'
import Home from './pages/Home/Home'
import Signin from './pages/Home/Authentication/Signin'
import { Toaster } from 'react-hot-toast'
import Announcements from './components/announcements'
import Teaminformation from "./pages/Teaminformation"
import EmployeeTable from './components/Teaminfo/EmployeeTable'
import Attendence from "./components/Attendence"
import AddAttendence from './components/AddAttendence'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Routes>
        <Route path='/' Component={Home} />
        <Route path='/announcements' Component={Announcements} />
        <Route path='/teaminfo' Component={Teaminformation} />
        <Route path='/teams/:teamid/employees' Component={EmployeeTable} />
        <Route path='/attendence' Component={Attendence} />
        <Route path="/login" Component={Signin} />
                <Route path="/addattendence" Component={AddAttendence} />
        
      </Routes>
      <Toaster></Toaster>
    </>
  )
}

export default App

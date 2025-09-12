import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Route, Routes } from 'react-router'
import Home from './pages/Home/Home'
import Signin from './pages/Home/Authentication/Signin'
import { Toaster } from 'react-hot-toast'
import Announcements from './components/announcements'
import Teaminformation from "./pages/Teaminformation"
import EmployeeTable from './components/Teaminfo/EmployeeTable'
import ForgotPassword from './pages/Home/Authentication/ForgotPassword'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <Routes>
      <Route path='/' Component={Home} />
      <Route path='/login' Component={Signin} />
      <Route path='/announcements' Component={Announcements} />
      <Route path='/teaminfo' Component={Teaminformation}/>
      <Route path='/teams/:teamid/employees' Component={EmployeeTable}/>
      <Route path='/forgotPassword' Component={ForgotPassword}/>
     </Routes>
     <Toaster></Toaster>
    </>
  )
}

export default App

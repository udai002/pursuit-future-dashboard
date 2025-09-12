import { useState } from 'react'
import './App.css'
import { Route, Routes } from 'react-router'
import Home from './pages/Home/Home'
import Signin from './pages/Home/Authentication/Signin'
import { Toaster } from 'react-hot-toast'
import Announcements from './components/announcements'
import Teaminformation from "./pages/Teaminformation"
import EmployeeTable from './components/Teaminfo/EmployeeTable'
import OverView from './pages/Home/OverView'
import RoleBasedAccess from '../RoleBasedAccess'
import UnAuthorized from './pages/UnAuthorized'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <Routes>
           <Route path='/login' Component={Signin}/>
      <Route path='/' Component={Home} />
      <Route path='/announcements' Component={Announcements} />
      <Route path='/teaminfo' Component={Teaminformation}/>
           <Route path='/teams/:teamid/employees' Component={EmployeeTable}/>
           <Route path='/overview' Component={OverView}/>
           <Route path='/role' element={<RoleBasedAccess requiredRoles={["user","Team Lead","Post Sales"]}>
            <OverView/>
           </RoleBasedAccess>}/>
           <Route path='/UnAuthorized' Component={UnAuthorized}/>

     </Routes>
     <Toaster></Toaster>
    </>
  )
}

export default App

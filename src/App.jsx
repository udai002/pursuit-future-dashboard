
import { useState } from 'react'
import './App.css'
import { Route, Routes, useLocation, useParams } from 'react-router'
import Home from './pages/Home/Home'
import Signin from './pages/Home/Authentication/Signin'
import { Toaster } from 'react-hot-toast'
import Announcements from './components/announcements'
import Teaminformation from "./pages/Teaminformation"
import EmployeeTable from './components/Teaminfo/EmployeeTable'
import EmployeeTable from "./components/Teaminfo/EmployeeTable";
import OverView from "./pages/Overview/Teamlead";
import DigitalMarketing from "./pages/Overview/DigitalMarketing";
import Operations from "./pages/Overview/Operations";
import HR from "./pages/Overview/HR";
import HROverView from "./pages/Overview/HR";
import PostSales from "./pages/Overview/PostSales";
import Intern from "./pages/Overview/Intern";
import OverViewPage from "./pages/Overview/Teamlead";
import Teamlead from "./pages/Overview/Teamlead";
import Superadmin from "./pages/Overview/Superadmin";
import RoleBasedAccess from "../RoleBasedAccess";
import UnAuthorized from "./pages/UnAuthorized";


import Attendence from "./components/Attendence"
import AddAttendence from './components/AddAttendence'

import Dps from './pages/Home/dps';
import Payment from './pages/Home/pay';
import Lead from './pages/Home/lead';
import ForgotPassword from './pages/Home/Authentication/ForgotPassword'
import { Sidenavbar } from './components/Navigation/Sidenavbar'

const siderBarAvoiders = [
  "/login",
  "/forgotPassword"

]




function App() {
  const [count, setCount] = useState(0);

  const {pathname} = useLocation()
  console.log("this is location" , pathname)

  return (
    <>

  {!siderBarAvoiders.includes(pathname) && <Sidenavbar/> }
     <Routes>
      <Route path='/' Component={Home} />
      <Route path="/login" Component={Signin}/>
      <Route path='/forgotPassword' Component={ForgotPassword}/>
      <Route path='/lead' Component={Lead}/>
      <Route path='/pay' Component={Payment}/>
      <Route path='/dps' Component={Dps}/>
             <Route path="/addattendence" Component={AddAttendence} />

        
        
        <Route path="/announcements" Component={Announcements} />
        <Route path="/teaminfo" Component={Teaminformation} />
        <Route path="/teams/:teamid/employees" Component={EmployeeTable} />
        
        <Route path="/overview" Component={OverViewPage} />

        <Route path="/DigitalMarketing" Component={DigitalMarketing} />
        <Route path="/intern" Component={Intern} />

        <Route path="/leamlead" Component={Teamlead} />

        <Route path="/operations" Component={Operations} />

        <Route path="/HROverView" Component={HROverView} />

        <Route path="/postsales" Component={PostSales} />

        <Route path="/admin" Component={Superadmin} />
        <Route path="/unauthorized" Component={UnAuthorized} />
        <Route path='role' element={<RoleBasedAccess requiredRoles={["Admin","Post Sales","Team Lead"]}>
          <Teaminformation/>
        </RoleBasedAccess>}/>


       
      </Routes>
      <Toaster></Toaster>
    </>
  );
}

export default App;
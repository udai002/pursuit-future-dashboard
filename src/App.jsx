
import { useEffect, useState } from 'react'
import './App.css'
import { Route, Routes, useLocation, useNavigate, useParams } from 'react-router'
import Home from './pages/Home/Home'
import Signin from './pages/Home/Authentication/Signin'
import { Toaster } from 'react-hot-toast'
import Announcements from './components/announcements'
import Teaminformation from "./pages/Teaminformation"
import EmployeeTable from './components/Teaminfo/EmployeeTable'
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
import useAuth from './context/AuthContext'
import TopNavBar from './components/TopNavBar'

const siderBarAvoiders = [
  "/login",
  "/forgotPassword"

]

const options = {
  admin: "Admin",
  operations: "Operations",
  HR: "HR",
  teamLead: "Team Lead",
  intern: "Intern",
  postSales: "Post Sales",
  DigitalMarketing: "Digital Marteking",
  roleLoading: "LOADING"
}


function App() {
  const [count, setCount] = useState(0);

  const { pathname } = useLocation()
  console.log("this is location", pathname)
  const navigate = useNavigate()

  const { userDetails, isLoggedIn, loadingAuth } = useAuth()
  const [roleAccess, setRoleAccess] = useState(options.roleLoading)

  console.log("this is from app", userDetails, isLoggedIn)

  useEffect(() => {
    function checkLogin() {
      if (!loadingAuth) {
        if (!userDetails || !isLoggedIn) {
          navigate("/login")
        }
      }

      if(userDetails){
        setRoleAccess(userDetails.role)
      }
    }

    checkLogin()
  }, [userDetails])

  //admin routes 
  function AdminDashboard() {
    return <Routes>
      <Route path="/" Component={Superadmin} />
      <Route path="/teaminfo" Component={Teaminformation} />
      <Route path='/lead' Component={Lead} />
      <Route path='/pay' Component={Payment} />
      <Route path='/dps' Component={Dps} />
      <Route path="/announcements" Component={Announcements} />
    </Routes>
  }


  //operation routes 
  function OperationDashboard(){
    return <Routes>
      {/* student 
      attends */}
      <Route path='/pay' Component={Payment} />
      <Route path='/dps' Component={Dps} />
    </Routes>
  }

  //HR routes 
  function HRDashBoard(){
    return <Routes>
      <Route path="/" Component={HROverView} />
       <Route path="/addattendence" Component={AddAttendence} />
      {/* attends  */}
      {/* Emplooyee info  */}
    </Routes>
  }

  //TL routs 
function TLDashboard(){
  return <Routes>
      <Route path="/" Component={Teamlead} />
      <Route path='/pay' Component={Payment} />
      <Route path='/dps' Component={Dps} />

      {/* attends  */}
      {/* member info  */}
  
{/* attends  */}

  </Routes>
}

  //interns routes 
  function InterDashboard(){
    return <Routes>
        <Route path="/" Component={Intern} />
      {/* student info  */}
      {/* sales lead info  */}
      <Route path='/lead' Component={Lead} />

      <Route path='/pay' Component={Payment} />
      <Route path='/dps' Component={Dps} />

    </Routes>
  }

  //post sales
  function PostSalesDashboard(){
    return <Routes>
        <Route path="/" Component={PostSales} />
        {/* attends */}
        {/* student info  */}
      <Route path='/pay' Component={Payment} />
      <Route path='/dps' Component={Dps} />

    </Routes>
  }

  //Digital marketing
  function DigitalMarketingDashboard(){
    return <Routes>
        <Route path="/" Component={DigitalMarketing} />
        {/* attendance  */}
      <Route path="/announcements" Component={Announcements} />

    </Routes>
  }


  function renderRoleBased() {
    
    switch (userDetails?.role) {
      case options.admin:
        return <AdminDashboard />
      case options.operations:
        return <OperationDashboard />
        case options.HR:
        return <HRDashBoard />
      case options.teamLead:
        return <TLDashboard />
      case options.intern:
        return <InterDashboard />
      case options.postSales:
        return <PostSalesDashboard />
      case options.DigitalMarketing:
        return <DigitalMarketingDashboard />
    }
  }

  if(loadingAuth){
    return <div>loading....</div>
  }

  return (
    <>
          

    <div className='flex'>
      {!siderBarAvoiders.includes(pathname) && <Sidenavbar />}
      <div className='flex flex-col'>
        <div>
        {!siderBarAvoiders.includes(pathname) &&<TopNavBar/>}
      </div>
        {renderRoleBased()}
        <Routes>
        {/* <Route path='/' Component={Home} /> */}
        <Route path="/login" Component={Signin} />
        <Route path='/forgotPassword' Component={ForgotPassword} />
        <Route Component={<div>Your lost...</div>} />
      </Routes>
        {/* <Routes>
        <Route path='/' Component={Home} />
        <Route path="/login" Component={Signin} />
        <Route path='/forgotPassword' Component={ForgotPassword} />
      </Routes> */}
      {/*
        <Route path="/teams/:teamid/employees" Component={EmployeeTable} />

        <Route path="/operations" Component={Operations} />
        <Route path="/admin" Component={Superadmin} />
        <Route path="/unauthorized" Component={UnAuthorized} />
        <Route path='role' element={<RoleBasedAccess requiredRoles={["Admin", "Post Sales", "Team Lead"]}>
          <Teaminformation />
        </RoleBasedAccess>} /> */}

      <Toaster></Toaster>
      </div>
      
    </div>
    </>
    
  );
}

export default App;
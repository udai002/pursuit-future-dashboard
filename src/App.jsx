import { useState } from "react";
import "./App.css";
import { Route, Routes } from "react-router";
import Home from "./pages/Home/Home";
import Signin from "./pages/Home/Authentication/Signin";
import { Toaster } from "react-hot-toast";
import Announcements from "./components/announcements";
import Teaminformation from "./pages/Teaminformation";
import EmployeeTable from "./components/Teaminfo/EmployeeTable";
import OverView from "./pages/Overview/Teamlead";
import DigitalMarketing from "./pages/Overview/DigitalMarketing";
import TL from "./pages/Overview/Teamlead";
import Operations from "./pages/Overview/Operations";
import HR from "./pages/Overview/HR";
import HROverView from "./pages/Overview/HR";
import PostSales from "./pages/Overview/PostSales";
import Intern from "./pages/Overview/Intern";
import OverViewPage from "./pages/Overview/Teamlead";
import Teamlead from "./pages/Overview/Teamlead";
import Superadmin from "./pages/Overview/Superadmin";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
    
      <Routes>
        
        
        <Route path="/" Component={Home} />
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


       
      </Routes>
      <Toaster></Toaster>
    </>
  );
}

export default App;

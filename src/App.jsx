import { useState } from "react";
import "./App.css";
import { Route, Routes } from "react-router";
import Home from "./pages/Home/Home";
import Signin from "./pages/Home/Authentication/Signin";
import { Toaster } from "react-hot-toast";
import Announcements from "./components/announcements";
import Teaminformation from "./pages/Teaminformation";
import EmployeeTable from "./components/Teaminfo/EmployeeTable";
import OverView from "./pages/Overview/OverViewPage";
import DigitalMarketing from "./pages/Overview/DigitalMarketing";
import TL from "./pages/Overview/TL";
import Operations from "./pages/Overview/Operations";
import HR from "./pages/Overview/HR";
import HROverView from "./pages/Overview/HR";
import PostSales from "./pages/Overview/PostSales";
import Intern from "./pages/Overview/Intern";
import OverViewPage from "./pages/Overview/OverViewPage";

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

        <Route path="/overview" Component={DigitalMarketing} />
        <Route path="/overview" Component={Intern} />

        <Route path="/overview" Component={TL} />

        <Route path="/overview" Component={Operations} />

        <Route path="/overview" Component={HROverView} />

        <Route path="/overview" Component={PostSales} />

        <Route path="/overview" Component={OverView} />
      </Routes>
      <Toaster></Toaster>
    </>
  );
}

export default App;

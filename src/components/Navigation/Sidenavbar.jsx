import React,{useContext} from "react";

import { Store } from "../../context/NavBarContext";
import { Navheader } from "./Navheader";
import Scrollbody from "./Scrollbody";
import { Bottomnav } from "./Bottomnav";

export const Sidenavbar = () => {

const {open,setOpen}=useContext(Store)

  function handleToggle() {
    setOpen(!open);
  }

  return (
    <div className="flex h-screen ">
      <div

        className={`bg-[#004aad] ml-1 my-2 pt-2 rounded-[20px] transition-all duration-300 ease-in-out
        ${open ? "w-76 pl-3" : "w-20 p-2"} overflow-hidden`}
      >
       <Navheader/>
       <Scrollbody/>
       <Bottomnav />  
       
      </div>

      <img
        className={`cursor-pointer p-1 rounded-full transition-transform duration-300 
          ${
            open
              ? "w-10 h-10 top-6 right-6 relative"
              : "w-8 h-8 relative right-3 top-6 rotate-180"
          }`}
        src="/sidebar.png"
        onClick={handleToggle}
        alt="toggle"
      />
    </div>
  );
};

import React,{useContext} from "react";
// import { Store } from "../../context/NavBarContext";

export const Navheader = () => {
//   const { open, setOpen } = useContext(Store);
  return (
    <div className="relative border-b flex items-center justify-between p-2  ">
      <div className="flex items-center gap-2">
        <h1 className="text-[#004aad] bg-white rounded-[15px] px-2 py-1 text-[25px] font-semibold text-center md:p-2 w-14">
          PF
        </h1>
        {open && (
          <div className="text-white leading-tight">
            <h1 className="font-bold">PURSUIT FUTURE</h1>
            <h1 className="text-sm">Dashboard</h1>
          </div>
        )}
      </div>
    </div>
  );
};

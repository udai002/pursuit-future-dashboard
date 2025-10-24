import React from "react";
import Button from "./Button";
import { IoIosLogOut } from "react-icons/io";
import { IoSettingsOutline } from "react-icons/io5";
import { MdOutlineSupportAgent } from "react-icons/md";
import useAuth from "../../context/AuthContext";

export const Bottomnav = () => {
    const { logout } = useAuth();

  function handleLogout() {
    logout();
  }

  return (
    <div className="flex flex-col  border-t mt-3 md:p-2">
      <Button
        className="bg-[#004aad]"
        onclick={() => {}}
        title="Support"
        icon={<MdOutlineSupportAgent className="h-7 w-7" />}
      />
      <Button
        className="bg-[#004aad] rounded-md "
        onclick={() => {handleLogout()}}
        title="Log Out"
        icon={<IoIosLogOut className="h-7 w-7" />}
      />
    </div>
  );
};

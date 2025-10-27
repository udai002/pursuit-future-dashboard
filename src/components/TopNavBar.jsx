import React, { useState } from "react";
import useAuth from "../context/AuthContext";

export default function TopNavBar() {
  const { userDetails } = useAuth()
  console.log(userDetails)
  const [loc, setLoc] = useState("No Location Added")
  return (
    <div className="w-full">

      <div className="flex  p-5 gap-72 w-full ">
        <div className="flex  flex-1 gap-6">
          <div className="border border-[#004AAD]  rounded-xl">
            <h1 className="text-[#004AAD] m-2">{userDetails.role ? userDetails.role : "No role added"}</h1>
          </div>

          <div className="p-2">
            <h1>{userDetails._id ? userDetails._id : "No id found "}</h1>
          </div>

        </div>

        <div className="flex gap-6">
          <div className="border bg-[#004AAD] rounded-xl text-white p-2">
            <h1>{userDetails.officeLocation ? userDetails.officeLocation : "No Location added"}</h1>
          </div>
          <div className="border bg-[#004AAD] rounded-xl text-white p-2">
            <h1>{userDetails.username ? userDetails.username : "No Username added"}</h1>
          </div>
        </div>
      </div>

    </div>

  );
}

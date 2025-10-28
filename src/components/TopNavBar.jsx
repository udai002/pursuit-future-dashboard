import React, { useState } from "react";
import useAuth from "../context/AuthContext";
import toast from "react-hot-toast";

export default function TopNavBar() {
  const { userDetails } = useAuth();
  const [open, setOpen] = useState(false);

  const safe = (v) => (v === undefined || v === null || v === "" ? "—" : v);

  const onOpen = () => {
    if (!userDetails || !userDetails._id) {
      toast.error("No user logged in");
      return;
    }
    setOpen(true);
  };

  if (!userDetails) return null; // Wait for data to load

  return (
    <div className="w-full">
      <div className="flex p-5 items-center justify-between">
        <div className="flex items-center gap-6">
          <div className="border border-[#004AAD] rounded-xl px-3 py-1">
            <h1 className="text-[#004AAD] m-0">{safe(userDetails?.role)}</h1>
          </div>
          <div>
            <p>{userDetails?.employeeId || "Emp001"}</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="border bg-[#004AAD] rounded-xl text-white p-2">
            <h1 className="m-0">{safe(userDetails?.officeLocation)}</h1>
          </div>

          <div
            onClick={onOpen}
            title="Click to view profile"
            style={{ cursor: "pointer" }}
            className="border bg-[#004AAD] rounded-xl text-white p-2"
          >
            <h1 className="m-0">{safe(userDetails?.username)}</h1>
          </div>
        </div>
      </div>

      {open && (
        <div
          aria-modal
          className="fixed right-6 top-20 z-50 w-[360px] bg-white rounded-xl shadow-lg p-5"
          role="dialog"
        >
          <div className="flex justify-between items-start">
            <h3 className="text-lg font-semibold">User Profile</h3>
            <button
              onClick={() => setOpen(false)}
              className="text-gray-500 hover:text-gray-700 text-xl font-bold"
            >
              ×
            </button>
          </div>

          <div className="mt-4 flex gap-4 items-center">
            <img
              src={userDetails?.profileImage ?? "/default-avatar.png"}
              alt="Profile"
              className="w-20 h-20 rounded-lg object-cover border"
            />
            <div className="flex flex-col gap-1">
              <strong className="text-lg">{safe(userDetails?.username)}</strong>
              <span className="text-gray-600">EID: {safe(userDetails?._id)}</span>
              <span className="text-gray-600">{safe(userDetails?.role)}</span>
              <span className="text-gray-600">{safe(userDetails?.email)}</span>
              <span className="text-gray-600">{safe(userDetails?.phone)}</span>
              <span className="text-gray-600">{safe(userDetails?.officeLocation)}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

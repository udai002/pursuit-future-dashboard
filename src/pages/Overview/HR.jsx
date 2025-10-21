import React, { useState } from 'react';
import OverviewComp from '../../components/Overview'
import AnnouncementsOverView from '../../components/AnnouncementsOverView'
import MarkAttendence from '../../components/Attendence/MarkAttendence'

export default function HROverView() {
  const [showAttendance, setShowAttendance] = useState(false);

  return (
    <div className=' w-[100%] flex flex-col gap-4 p-4 sm:p-6'>
      <div className='flex flex-wrap gap-2'>

        <OverviewComp title="Total Employees" revenue="50" />
        <OverviewComp title="Present Employees" revenue="40" />
        <OverviewComp title="Employees on Leave" revenue="2" />
        <OverviewComp title="Absent" revenue="2" />

        <div className="p-5 border-[#004AAD] flex-grow bg-[#004AAD] text-white  w-64  rounded-md border  items-center " onClick={() => setShowAttendance(true)}>
          <div className="flex gap-3">
            <div className="flex-col ml-12 mt-4">
              <h1 className='text-center'>Mark Attendance</h1>
              <h1 className='text-center'>of Employees</h1>
            </div>
          </div>
        </div>
      </div>
      <div className='h-auto'>
        <AnnouncementsOverView />
      </div>
      {showAttendance && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
        <div className="bg-white p-6 rounded-lg w-full max-w-md relative max-h-[80vh] overflow-y-auto">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
              onClick={() => setShowAttendance(false)}
            >
              ✖
            </button>
            <div className="">
              <MarkAttendence />
            </div>
          </div>
        </div>
      )}
    </div>
  ) 
}

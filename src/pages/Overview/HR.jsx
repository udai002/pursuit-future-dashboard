import React from 'react'
import OverviewComp from '../../components/Overview'
import AnnouncementsOverView from '../../components/AnnouncementsOverView'

export default function HROverView() {
  return (
    <div className=''>
      <div className='flex gap-2'>

        <OverviewComp title="Total Employees" revenue="50"/>
        <OverviewComp title="Present Employees" revenue="40"/>
        <OverviewComp title="Employees on Leave" revenue="2"/>
        <OverviewComp title="Absent" revenue="2"/>
        
        <div className="p-5 border-[#004AAD] bg-[#004AAD] text-white  w-64  rounded-md border  items-center cursor-pointer">
      <div className="flex gap-3">
     
        <div className="flex-col ml-12 mt-4">
          <h1 className='text-center'>Mark Attendance</h1>
          <h1 className='text-center'>of Employees</h1>
          </div>
      </div>

     
    </div>
       

      </div>
      <AnnouncementsOverView/>

      
    </div>
  )
}

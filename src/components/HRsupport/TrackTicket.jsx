import React, { useState } from 'react'
import TrackIssuecomp from './TrackIssuecomp'
import { RxCrossCircled } from "react-icons/rx";
import IssueTicket from './IssueTicket';

export default function () {
   const [isModalOpen, setIsModalOpen] = useState(false);
  return (

  <>
    <div className='h-[650px] w-[540px] border-2 border-[#00499d] rounded-xl p-2'>
<div className='flex  justify-between'>
       <h1 className='p-2 text-[#666666] text-[15px] font-semibold '>Track Issue Tickets</h1>
     <h1 className=" border-[1.5px] border-[#00499a] text-white bg-[#00499d] w-[170px] h-17px rounded-xl m-1 mb-2 text-center p-2 text-[15px]" onClick={()=>setIsModalOpen(true)}>
            Raise New Issue Ticket
            </h1>
</div>


  <div className='grid grid-rows-3 gap-1 mt-2'>
    <TrackIssuecomp year="#TCK-2023" reason="“Order not syncing with inventory”" Category="System" AssignedTeam="Tech Team" Priority="high" DateTime="12 Sep 2025 12:30PM" Status="In Progress"/>
        <TrackIssuecomp year="#TCK-2023" reason="“Order not syncing with inventory”" Category="System" AssignedTeam="Tech Team" Priority="low" DateTime="12 Sep 2025 12:30PM" Status="In Progress"/>
            <TrackIssuecomp year="#TCK-2023" reason="“Order not syncing with inventory”" Category="System" AssignedTeam="Tech Team" Priority="medium" DateTime="12 Sep 2025 12:30PM" Status="In Progress"/>
  </div>
  </div>
    {isModalOpen && (
              <div className="fixed inset-0 z-40 flex items-center justify-center shadow-lg bg-black bg-opacity-50">
                <div className=" bg-white  max-w-6xl p-4 rounded-lg relative shadow-lg max-h-[90vh]">
                  <RxCrossCircled
                    onClick={() => setIsModalOpen(false)}
                    className=" text-[#00499d] absolute top-6 right-4  text-[24px] font-bold"
                  />
                 <IssueTicket/>
                </div>
              </div>
            )}
  </>
 
  )
}

import React from 'react'
import TrackIssuecomp from './TrackIssuecomp'

export default function () {
  return (
  <>
    <div className='h-[650px] w-[540px] border-2 border-[#00499d] rounded-xl p-2'>
<div className='flex  justify-between'>
       <h1 className='p-2 text-[#666666] text-[15px] font-semibold '>Track Issue Tickets</h1>
     <h1 className=" border-[1.5px] border-[#00499a] text-white bg-[#00499d] w-[170px] h-17px rounded-xl m-1 mb-2 text-center p-2 text-[15px]">
            Raise New Issue Ticket
            </h1>
</div>


  <div className='grid grid-rows-3 gap-1 mt-2'>
    <TrackIssuecomp year="#TCK-2023" reason="“Order not syncing with inventory”" Category="System" AssignedTeam="Tech Team" Priority="high" DateTime="12 Sep 2025 12:30PM" Status="In Progress"/>
        <TrackIssuecomp year="#TCK-2023" reason="“Order not syncing with inventory”" Category="System" AssignedTeam="Tech Team" Priority="low" DateTime="12 Sep 2025 12:30PM" Status="In Progress"/>
            <TrackIssuecomp year="#TCK-2023" reason="“Order not syncing with inventory”" Category="System" AssignedTeam="Tech Team" Priority="medium" DateTime="12 Sep 2025 12:30PM" Status="In Progress"/>
  </div>
  </div>
  </>
 
  )
}

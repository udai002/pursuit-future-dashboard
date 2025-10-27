import React from 'react'
import Ticketcomponent from './Ticketcomponent'

export default function ManageTicket() {
  return (
  <>
  <div className='h-[650px] w-[540px] border-2 border-[#00499d] rounded-xl p-2'>
    <h1 className='p-2 text-[#666666] text-[15px] font-semibold '>Manage Issue Tickets</h1>
  <div className='grid grid-rows-3 gap-1 mt-2'>
<Ticketcomponent year=" #TCK-2021"reason="“Order not syncing with inventory”" Type="System"RaisedBy="Full Name"  Priority="high"DateTime="12 Sep 2025 12:30PM"Status="In Progress"/>
<Ticketcomponent year="#TCK-2021"reason="“Order not syncing with inventory”" Type="System"RaisedBy="Full Name" Priority="low" DateTime="12 Sep 2025 12:30PM"Status="In Progress"/>
<Ticketcomponent year="  #TCK-2021"reason="“Order not syncing with inventory”" Type="System"RaisedBy="Full Name"  Priority="medium"DateTime="12 Sep 2025 12:30PM"Status="In Progress"/>
</div>
</div>
</>
  )
}

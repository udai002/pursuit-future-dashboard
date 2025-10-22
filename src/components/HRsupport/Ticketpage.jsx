import React from 'react'
import ManageTicket from './ManageTicket'
import TrackTicket from './TrackTicket'

export default function Ticketpage() {
  return (
<>
<div className='flex gap-3'>
    <ManageTicket/>
    <TrackTicket/>

</div>

</>
  )
}

import React from 'react'
import OverviewComp from '../../components/Overview'
import Payment from '../../components/Payment'
import AnnouncementsOverView from '../../components/AnnouncementsOverView'

export default function Operations() {
  return (
    <div className='flex flex-row'>
      <div className=''>
        <OverviewComp title="Total Payment counts" revenue="50"/>
           <Payment/>


      </div>
      <div className='w-screen '>
        <AnnouncementsOverView/>
     
      </div>

    
      
    </div>
  )
}

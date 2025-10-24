import React, { useEffect, useState } from 'react'
import OverviewComp from '../../components/Overview'
import Payment from '../../components/Payment'
import AnnouncementsOverView from '../../components/AnnouncementsOverView'

import useFetchTotal from '../../utils/useFetchTotal'

export default function Operations() {
  const {total}=useFetchTotal()
  console.log(total)
  return (
    <div className='flex flex-row gap-4'>
      <div className=''>
        <OverviewComp title="Total Payment counts" revenue={total}/>
           <Payment/>


      </div>
      <div className='w-[74%] '>
        <AnnouncementsOverView/>
     
      </div>

    
      
    </div>
  )
}

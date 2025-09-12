import React from 'react'
import OverviewComp from '../../components/Overview'

import pending from '../../../public/OverViewImg/pending.png'
import Payment from '../../components/Payment'
import AnnouncementsOverView from '../../components/AnnouncementsOverView'
export default function PostSales() {
  return (
    <div>
       <div className='flex p-2 gap-2' >
              <div className=''>
                  
                                      <OverviewComp title="Pending Revenue" revenue="Rs 1,00,000" img={pending} className=""></OverviewComp> 
              <Payment></Payment>
      
              </div>
              <div className='w-screen'>
                  <AnnouncementsOverView></AnnouncementsOverView>
      
              </div>
      
          </div>
    </div>
  )
}
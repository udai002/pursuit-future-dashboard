import React from 'react'
import OverviewComp from '../../components/Overview'
import total from '../../../public/OverViewImg/Total.png'
import revenue from '../../../public/OverViewImg/revenue.png'
import pending from '../../../public/OverViewImg/pending.png'
import Announcements from '../Announcements'
import Payment from '../../components/Payment'
import Assign_leads from '../../components/Assign_leads'
import AnnouncementsOverView from '../../components/AnnouncementsOverView'


export default function Teamlead() {
  return (
    <div className='overflow-y-auto h-[80vh] no-scrollbar '>
    <div className=''>

      <div className='flex gap-2'>
        <OverviewComp title="Total Target" revenue="Rs 80,00,000" img={total} className=""></OverviewComp>
        <OverviewComp title="Projected Revenue" revenue="Rs 3,00,000" img={total}></OverviewComp>
        <OverviewComp title="Revenue Credited" revenue="Rs 2,00,000" img={revenue}></OverviewComp>
        <OverviewComp title="Pending Revenue" revenue="Rs 6,00,000" img={pending}></OverviewComp>
      </div>
      <div className=' flex  mt-3 gap-3 '>
        <div>
          <div>
            <OverviewComp title="Total Payment Counts" revenue=" 50" img="" />
          </div>

          <div className='flex '>
            <Payment />
          </div>
        </div>
        <div className='w-full'>
          <AnnouncementsOverView></AnnouncementsOverView>
        </div>
      </div>
       </div>
          <div className='mt-[4px]'>
        <Assign_leads />
      </div>
      </div>
  )
}





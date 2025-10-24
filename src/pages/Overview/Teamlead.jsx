import React from 'react'
import OverviewComp from '../../components/Overview'
import total from '../../../public/OverViewImg/Total.png'
import revenue from '../../../public/OverViewImg/revenue.png'
import pending from '../../../public/OverViewImg/pending.png'
import Announcements from '../Announcements'
import Payment from '../../components/Payment'
import Assign_leads from '../../components/Assign_leads'
import AnnouncementsOverView from '../../components/AnnouncementsOverView'
import { useGetProjectedRevenueQuery } from '../../Slice/OverviewSlice'


export default function Teamlead() {
  const { data, isLoading, error } = useGetProjectedRevenueQuery();
   
     if (isLoading) return <p>Loading revenue data...</p>;
     if (error) return <p>Error: {error?.data?.msg || "Failed to fetch data"}</p>;
   
     const {
       totalStudents,
       totalProjectedRevenue,
       totalCreditedRevenue,
       totalPendingRevenue,
       creditedCount,
       pendingCount,
       
     } = data || {};
   
   
  return (
    <div className='overflow-y-auto h-[80vh] no-scrollbar '>
    <div className=''>

      <div className='flex gap-2'>
        <OverviewComp title="Total Target" revenue="Rs 80,00,000" img={total} className=""></OverviewComp>
        <OverviewComp title="Projected Revenue" revenue={totalProjectedRevenue} img={total}></OverviewComp>
        <OverviewComp title="Revenue Credited" revenue={totalCreditedRevenue} img={revenue}></OverviewComp>
        <OverviewComp title="Pending Revenue" revenue={totalPendingRevenue} img={pending}></OverviewComp>
      </div>
      <div className=' flex  mt-3 gap-3 '>
        <div>
          <div>
            <OverviewComp title="Total Payment Counts" revenue={totalStudents} img="" />
          </div>

          <div className='flex '>
            <Payment  creditedCount={creditedCount} pendingCount={pendingCount} />
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





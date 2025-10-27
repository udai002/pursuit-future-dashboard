import React from 'react'
import OverviewComp from '../../components/Overview'
import total from '../../../public/OverViewImg/Total.png'
import revenue from '../../../public/OverViewImg/revenue.png'
import pending from '../../../public/OverViewImg/pending.png'
import Credit from '../../../public/OverViewImg/Credit.png'
import Payment from '../../components/Payment'
import AnnouncementsOverView from '../../components/AnnouncementsOverView'
import { useGetProjectedRevenueQuery } from '../../Slice/OverviewSlice'


export default function Intern() {
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
     <div className='w-full hpx-4 py-6'>
       <div className='flex gap-2'>
         <OverviewComp title="Total Target" revenue="Rs 1,00,000" img={total} className="  "></OverviewComp>
         <OverviewComp title="Projected Revenue" revenue={`Rs ${totalProjectedRevenue}`} img={total}></OverviewComp>
         <OverviewComp title="Revenue Credited" revenue={`Rs ${totalCreditedRevenue}`} img={revenue}></OverviewComp>
         {/* for pending amount  the subtraction of projected revenue and revenue credited */}
         <OverviewComp title="Pending Revenue" revenue={`Rs ${totalPendingRevenue}`} img={pending}></OverviewComp>
       </div>
       <div className='flex  mt-3 gap-3'>
         <div className='flex-col'>
           <OverviewComp title="Total Payment counts" revenue={totalStudents}
  />
           <Payment  creditedCount={creditedCount} pendingCount={pendingCount} />
 
         </div>
         <div className='w-full'>
           <AnnouncementsOverView />
         </div>
       </div>
 
 
     </div>
   )
 }
 
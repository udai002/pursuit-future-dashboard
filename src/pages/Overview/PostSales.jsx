import React from 'react'
import OverviewComp from '../../components/Overview'

import pending from '../../../public/OverViewImg/pending.png'
import Payment from '../../components/Payment'
import AnnouncementsOverView from '../../components/AnnouncementsOverView'
import { useGetProjectedRevenueQuery } from '../../Slice/OverviewSlice'
export default function PostSales() {
  const { data, isLoading, error } = useGetProjectedRevenueQuery();

  if (isLoading) return <p>Loading revenue data...</p>;
  if (error) return <p>Error: {error?.data?.msg || "Failed to fetch data"}</p>;

  const {
    totalStudents,
    
    totalPendingRevenue,
    creditedCount,
    pendingCount,
    
  } = data || {};

  return (
    <div>
      <div className='flex p-2 gap-2' >
        <div className=''>

          <OverviewComp title="Pending Revenue" revenue={totalPendingRevenue} img={pending} className=""></OverviewComp>
          <Payment creditedCount={creditedCount}  pendingCount={pendingCount}/>

        </div>
        <div className='w-screen'>
          <AnnouncementsOverView></AnnouncementsOverView>

        </div>

      </div>
    </div>
  )
}
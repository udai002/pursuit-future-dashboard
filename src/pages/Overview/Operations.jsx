import React, { useEffect, useState } from 'react'
import OverviewComp from '../../components/Overview'
import Payment from '../../components/Payment'
import AnnouncementsOverView from '../../components/AnnouncementsOverView'
import { useGetProjectedRevenueQuery } from '../../Slice/OverviewSlice';


export default function Operations() {
    const { data, isLoading, error } = useGetProjectedRevenueQuery();
     
       if (isLoading) return <p>Loading revenue data...</p>;
       if (error) return <p>Error: {error?.data?.msg || "Failed to fetch data"}</p>;
     
       const {
         totalStudents,
         creditedCount,
         pendingCount,
        
       } = data || {};
     
  return (
    <div className='flex flex-row gap-4'>
      <div className=''>
        <OverviewComp title="Total Payment counts" revenue={totalStudents}/>
           <Payment creditedCount={creditedCount} pendingCount={pendingCount}/>


      </div>
      <div className='w-[74%] '>
        <AnnouncementsOverView/>
     
      </div>

    
      
    </div>
  )
}

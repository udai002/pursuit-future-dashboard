// import React from 'react'
// import OverviewComp from '../../components/Overview'
// import total from '../../../public/OverViewImg/Total.png'
// import revenue from '../../../public/OverViewImg/revenue.png'
// import pending from '../../../public/OverViewImg/pending.png'
// import Announcements from '../Announcements'
// import Payment from '../../components/Payment'
// import Assign_leads from '../../components/Assign_leads'
// import AnnouncementsOverView from '../../components/AnnouncementsOverView'
// import { useGetProjectedRevenueQuery } from '../../Slice/OverviewSlice'


// export default function Teamlead() {
//   const { data, isLoading, error } = useGetProjectedRevenueQuery();
   
//      if (isLoading) return <p>Loading revenue data...</p>;
//      if (error) return <p>Error: {error?.data?.msg || "Failed to fetch data"}</p>;
   
//      const {
//        totalStudents,
//        totalProjectedRevenue,
//        totalCreditedRevenue,
//        totalPendingRevenue,
//        creditedCount,
//        pendingCount,
       
//      } = data || {};
   
   
//   return (
//     <div className='overflow-y-auto h-[80vh] no-scrollbar '>
//     <div className=''>

//       <div className='flex gap-2'>
//         <OverviewComp title="Total Target" revenue="Rs 80,00,000" img={total} className=""></OverviewComp>
//         <OverviewComp title="Projected Revenue" revenue={totalProjectedRevenue} img={total}></OverviewComp>
//         <OverviewComp title="Revenue Credited" revenue={totalCreditedRevenue} img={revenue}></OverviewComp>
//         <OverviewComp title="Pending Revenue" revenue={totalPendingRevenue} img={pending}></OverviewComp>
//       </div>
//       <div className=' flex  mt-3 gap-3 '>
//         <div>
//           <div>
//             <OverviewComp title="Total Payment Counts" revenue={totalStudents} img="" />
//           </div>

//           <div className='flex '>
//             <Payment  creditedCount={creditedCount} pendingCount={pendingCount} />
//           </div>
//         </div>
//         <div className='w-full'>
//           <AnnouncementsOverView></AnnouncementsOverView>
//         </div>
//       </div>
//        </div>
//           <div className='mt-[4px]'>
//         <Assign_leads />
//       </div>
//       </div>
//   )
// }



import React, { useEffect, useState } from 'react'
import OverviewComp from '../../components/Overview'
import total from '../../../public/OverViewImg/Total.png'
import revenue from '../../../public/OverViewImg/revenue.png'
import pending from '../../../public/OverViewImg/pending.png'
import Announcements from '../Announcements'
import Payment from '../../components/Payment'
import Assign_leads from '../../components/Assign_leads'
import AnnouncementsOverView from '../../components/AnnouncementsOverView'
import { useGetProjectedRevenueQuery } from '../../Slice/OverviewSlice'
import useAuth from '../../context/AuthContext'

export default function Teamlead() {
  const { userDetails } = useAuth();
  const token = JSON.parse(localStorage.getItem("session_token"));

  const { data, isLoading, error } = useGetProjectedRevenueQuery();
  const [employeeCount, setEmployeeCount] = useState(0);
  const [totalTarget, setTotalTarget] = useState(0);


  const fetchEmployeeCount = async () => {
    try {
      const res = await fetch(
        `http://localhost:3000/team/team/${userDetails.teamId[0]}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const result = await res.json();
      const count = result?.employees?.length || 0;
      setEmployeeCount(count);

     
      setTotalTarget(count * 100000);
    } catch (err) {
      console.error("Error fetching employee count:", err);
    }
  };

  useEffect(() => {
    if (userDetails?.teamId?.length > 0) {
      fetchEmployeeCount();
    }
  }, [userDetails]);

  if (isLoading) return <p>Loading revenue data...</p>;
  if (error) return <p>Error: {error?.data?.msg || "Failed to fetch data"}</p>;

  const {
    totalStudents,
    totalProjectedRevenue,
    totalCreditedRevenue,
    totalPendingRevenue,
    creditedCount,
    pendingCount,
    partialPaymentCount
  } = data || {};

  return (
    <>
    <div className='text-[24px]'>
      <h1>Team Name</h1>
    </div>
    <div className='overflow-y-auto h-[80vh] no-scrollbar'>
      <div>
        <div className='flex gap-2'>
   
          <OverviewComp
            title="Total Target"
            revenue={`Rs ${totalTarget.toLocaleString()}`}
            img={total}
          />
          <OverviewComp
            title="Projected Revenue"
            revenue={totalProjectedRevenue}
            img={total}
          />
          <OverviewComp
            title="Revenue Credited"
            revenue={totalCreditedRevenue}
            img={revenue}
          />
          <OverviewComp
            title="Pending Revenue"
            revenue={totalPendingRevenue}
            img={pending}
          />
        </div>

        <div className='flex mt-3 gap-3'>
          <div>
            <div>
              <OverviewComp
                title="Total Payment Counts"
                revenue={totalStudents}
              />
            </div>

            <div className='flex'>
              <Payment creditedCount={creditedCount} pendingCount={pendingCount} partialPaymentCount={partialPaymentCount}/>
            </div>
          </div>

          <div className='w-full'>
            <AnnouncementsOverView />
          </div>
        </div>
      </div>

      <div className='mt-[4px]'>
        <Assign_leads />
      </div>
    </div>
    </>
  );
}




import React, { useState, useEffect } from 'react'
import OverviewComp from '../../components/Overview'
import total from '../../../public/OverView/Total.png'
import revenue from '../../../public/OverView/revenue.png'
import pending from '../../../public/OverView/pending.png'
import Payment from '../../components/Payment'
import AnnouncementsOverView from '../../components/AnnouncementsOverView'
import { useGetProjectedRevenueQuery } from '../../Slice/OverviewSlice'

export default function Superadmin() {

  // Local state
  const [revenueData, setRevenueData] = useState(0);
  const [paidData, setPaidData] = useState(0);
  const [studentCount, setStudentCount] = useState(0);
  const [internCount, setInternCount] = useState(0);

  // Fetch projected revenue
  useEffect(() => {
    async function fetchRevenueData() {
      try {
        const response = await fetch('http://localhost:3000/api/pitched/alternative')
        const data = await response.json()
        setRevenueData(data.projectedRevenue || 0)
      } catch (error) {
        console.error("Error fetching revenue data:", error)
      }
    }
    fetchRevenueData();
  }, []);

  // Fetch paid revenue
  useEffect(() => {
    async function fetchPaidData() {
      try {
        const response = await fetch('http://localhost:3000/api/paid/amount')
        const data = await response.json()
        setPaidData(data.paidAmount || 0)
      } catch (error) {
        console.error("Error fetching paid data:", error)
      }
    }
    fetchPaidData();
  }, []);

  // Fetch student count
  useEffect(() => {
    async function fetchStudentCount() {
      try {
        const response = await fetch('http://localhost:3000/api/student/count')
        const data = await response.json()
        setStudentCount(data.count || 0)
      } catch (error) {
        console.error("Error fetching student count:", error)
      }
    }
    fetchStudentCount();
  }, []);

  // Fetch intern count
  useEffect(() => {
    async function fetchInternCount() {
      try {
        const response = await fetch('http://localhost:3000/api/interncount')
        const data = await response.json()
        setInternCount(data.total || 0)
      } catch (error) {
        console.error("Error fetching intern count:", error)
      }
    }
    fetchInternCount();
  }, []);

  // Custom RTK Query hook
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
    partialPaymentCount,
  } = data || {};

const interntarget = internCount*100000
  return (
    <>
    <div>
        <h1 className='text-[26px]'>
      Statistics
    </h1>
    </div>
    <div className='w-full hpx-4 py-6'>
      <div className='flex gap-2'>
        <OverviewComp title="Total Target" revenue={interntarget} img={total} />
        <OverviewComp title="Projected Revenue" revenue={`Rs ${totalProjectedRevenue}`} img={total} />
        <OverviewComp title="Revenue Credited" revenue={`Rs ${totalCreditedRevenue}`} img={revenue} />
        <OverviewComp title="Pending Revenue" revenue={`Rs ${totalPendingRevenue}`} img={pending} />
      </div>

      <div className='flex mt-3 gap-3'>
        <div className='flex-col'>
          <OverviewComp title="Total Payment Counts" revenue={totalStudents} />
          <Payment
            creditedCount={creditedCount}
            pendingCount={pendingCount}
            partialPaymentCount={partialPaymentCount}
          />
        </div>
        <div className='w-full'>
          <AnnouncementsOverView />
        </div>
      </div>
    </div>
    </>
  )
}

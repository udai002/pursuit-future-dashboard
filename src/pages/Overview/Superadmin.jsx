import React,{useState,useEffect} from 'react'
import OverviewComp from '../../components/Overview'
import total from '../../../public/OverView/Total.png'
import revenue from '../../../public/OverView/revenue.png'
import pending from '../../../public/OverView/pending.png'
import Payment from '../../components/Payment'
import AnnouncementsOverView from '../../components/AnnouncementsOverView'
import { useGetProjectedRevenueQuery } from '../../Slice/OverviewSlice'

export default function Superadmin() {
// fetch the revenue data from backend api and display in the overview component
  const [revenueData,setRevenueData]=useState(0);
  const [paidData,setpaidData]=useState(0);
  const [studentCount,setStudentCount]=useState(0);


  useEffect(()=>{
    async function fetchRevenueData(){
      try{
        const response=await fetch('http://localhost:3000/api/pitched/alternative')
        const data =await response.json()
        setRevenueData(data.projectedRevenue|| 0 )
      }catch(error){
        console.error("Error fetching revenue data:",error) 

      }
    }
    fetchRevenueData()

  },[]) 
  useEffect(()=>{
    async function fetchPaidData(){
      try{
        const response=await fetch('http://localhost:3000/api/paid/amount')
        const data =await response.json()
        setpaidData(data.paidAmount|| 0 )
      }catch(error){
        console.error("Error fetching paid data:",error)

      }
    }
    fetchPaidData()

  },[])
// total student count 
useEffect(()=>{
  async function fetchStudentCount(){
    try{
      const response=await fetch('http://localhost:3000/api/student/count')
      const data =await response.json()
      setStudentCount(data.count|| 0 )
    }catch(error){
      console.error("Error fetching student count:",error)
    }
  }
  fetchStudentCount()

})

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
    perStudent = [],
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

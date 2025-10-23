import React, { useEffect, useState } from 'react';
import OverviewComp from '../../components/Overview'
import AnnouncementsOverView from '../../components/AnnouncementsOverView'
import MarkAttendence from '../../components/Attendence/MarkAttendence'

export default function HROverView() {
  const [showAttendance, setShowAttendance] = useState(false);
  let getCurrentDate=new Date();
  let day=getCurrentDate.getDate();
  let month=getCurrentDate.getMonth()+1;
  let year=getCurrentDate.getFullYear();
  let currentDate=`${year}-${month}-${day}`;
  console.log(currentDate)
  const [employeeData,setEmployeeData]=useState({
    totalEmployee:"",
    presentEmployee:"",
    employeeOnLeaves:"",
    absent:""
  })
  const [error,setError]=useState();
  useEffect(()=>{
    const fetchData=async () => {
      try{
        const response=await fetch()
        if(!response.ok){
          throw new Error(`http error! status:${response.status}`)
        }
        const data=response.json();
        setEmployeeData(data)
      }
      catch(error){
        setError(error)
      }
    }
    fetchData()
  },[])
  return (

    <div className=' w-[100%]  flex flex-col gap-4 p-4 sm:p-6 sm:w-[100%] md:w-[100%] lg:w-[100%]'>
      <div className=' flex justify-between '>
        <div>
          <h1 className='text-2xl h-full'>Team Name</h1>
        </div>
        <div>
          <input type="date" name="" id="" className=' h-full p-2 rounded-xl text-white bg-[#004AAD] ' defaultValue={currentDate}/>
        </div>
      </div>
      <div className='flex  flex-wrap gap-2 sm-grid-1 md:grid-2 lg:grid-4'>

        <OverviewComp title="Total Employees" revenue={employeeData.totalEmployee} />
        <OverviewComp title="Present Employees" revenue={employeeData.presentEmployee} />
        <OverviewComp title="Employees on Leave" revenue={employeeData.employeeOnLeaves} />
        <OverviewComp title="Absent" revenue={employeeData.absent} />

        <div className="p-5 border-[#004AAD] flex-grow bg-[#004AAD] text-white  w-64  rounded-md border  items-center " onClick={() => setShowAttendance(true)}>
          <div className="flex gap-3">
            <div className="flex-col ml-12 mt-4">
              <h1 className='text-center'>Mark Attendance</h1>
              <h1 className='text-center'>of Employees</h1>
            </div>
          </div>
        </div>
      </div>
      <div className='h-auto'>
        <AnnouncementsOverView />
      </div>
      {showAttendance && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
        <div className="bg-white p-6 rounded-lg w-full max-w-md relative max-h-[80vh] overflow-y-auto">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
              onClick={() => setShowAttendance(false)}
            >
              ✖
            </button>
            <div className="">
              <MarkAttendence />
            </div>
          </div>
        </div>
      )}
    </div>
  ) 
}

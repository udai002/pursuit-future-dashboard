import React from 'react'
import Table from '../../components/table'
import { GoArrowUpRight } from "react-icons/go";


const EmployeesInfo = () => {

const data=[
        { name:"rahulkumar", email:"pft@gmail.com",phonenumber:"9876543210",working:"20",leave:"2",absent:"2"},
        { name:"rahulkumar", email:"pft@gmail.com",phonenumber:"9876543210",working:"20",leave:"2",absent:"2"},
        { name:"rahulkumar", email:"pft@gmail.com",phonenumber:"9876543210",working:"20",leave:"2",absent:"2"},
        { name:"rahulkumar", email:"pft@gmail.com",phonenumber:"9876543210",working:"20",leave:"2",absent:"2"},
        { name:"rahulkumar", email:"pft@gmail.com",phonenumber:"9876543210",working:"20",leave:"2",absent:"2"},
        { name:"rahulkumar", email:"pft@gmail.com",phonenumber:"9876543210",working:"20",leave:"2",absent:"2"},
        { name:"rahulkumar", email:"pft@gmail.com",phonenumber:"9876543210",working:"20",leave:"2",absent:"2"},
        
    ]
    const columns=[
             {id:"name", header:"Employee Name",cell:(row)=>(
                         <>
                         <div className='flex gap-1 justify-center items-center'>
                         <h1>{row.name}</h1>
                         <GoArrowUpRight className='hover:cursor-pointer' />
                         </div>
                         </>
                     )},
             {id:"email", header:"Email ID"},
             {id:"phonenumber", header:"Contact Number"},
             {id:"working", header:"Working Days"},
             {id:"leave", header:"Leave Day"},
             {id:"absent", header:"Absent"},   
    ]
  return (
        <>
        <div className='mt-[5%]'>
    <Table columns={columns} data={data}/>
    </div>
       </>
  )
}

export default EmployeesInfo
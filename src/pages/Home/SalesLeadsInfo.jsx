import React from 'react'
import Table from '../../components/table'
const SalesLeadsInfo = () => {

     const data=[
        { name:"rahulkumar", email:"pft@gmail.com",phonenumber:"9876543210",Dept:"CSE",college:"LPU",courseinterest:"Web Dev",batch:"2024", status:"Not Interested"},
        { name:"rahulkumar", email:"pft@gmail.com",phonenumber:"9876543210",Dept:"CSE",college:"LPU",courseinterest:"Web Dev",batch:"2024", status:"Not Interested"},
        { name:"rahulkumar", email:"pft@gmail.com",phonenumber:"9876543210",Dept:"CSE",college:"LPU",courseinterest:"Web Dev",batch:"2024", status:"Not Interested"},
        { name:"rahulkumar", email:"pft@gmail.com",phonenumber:"9876543210",Dept:"CSE",college:"LPU",courseinterest:"Web Dev",batch:"2024", status:"Not Interested"},
        { name:"rahulkumar", email:"pft@gmail.com",phonenumber:"9876543210",Dept:"CSE",college:"LPU",courseinterest:"Web Dev",batch:"2024", status:"Not Interested"},
        { name:"rahulkumar", email:"pft@gmail.com",phonenumber:"9876543210",Dept:"CSE",college:"LPU",courseinterest:"Web Dev",batch:"2024", status:"Not Interested"},
    ]
     const columns=[
             {id:"name", header:"Lead Name"},
             {id:"email", header:"Email ID"},
             {id:"phonenumber", header:"Phone Number"},
             {id:"Dept", header:"Department/Branch"},
             {id:"college", header:"College"},
             {id:"courseinterest", header:"Course Interest"},   
             {id:"batch", header:"Batch"},   
             {id:"status", header:"Status",cell:(row)=>(
                <>
                <div className='border-2 rounded border-blue-700 p-2'>
                <select className='w-50  '>
                    <option value="Not Interested">Not Interested</option>
                    <option value="Answered">Answered</option>
                    <option value="Follow Up">Follow Up</option>
                    <option value="Parents Update">Parents Update</option>
                </select>
                </div>
                </>
             )},   
         ]
  return (
   <>
   <div className='mt-[5%]'>
    <Table columns={columns} data={data}/>
    </div>
   </>
  )
}

export default SalesLeadsInfo
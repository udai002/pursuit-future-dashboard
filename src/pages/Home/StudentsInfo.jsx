import React from 'react'
import Table from '../../components/table'

const StudentsInfo = () => {
    const data=[
            { name:"rahulkumar", email:"pft@gmail.com",phonenumber:"9876543210",price:"8000",course:"Web Dev",registration:"01-04-2025",due:"01-01-2025" ,status:"status"},
            { name:"rahulkumar", email:"pft@gmail.com",phonenumber:"9876543210",price:"8000",course:"Web Dev",registration:"01-04-2025",due:"01-01-2025"  ,status:"status"},
            { name:"rahulkumar", email:"pft@gmail.com",phonenumber:"9876543210",price:"8000",course:"Web Dev",registration:"01-04-2025",due:"01-01-2025"  ,status:"status"},
            { name:"rahulkumar", email:"pft@gmail.com",phonenumber:"9876543210",price:"8000",course:"Web Dev",registration:"01-04-2025",due:"01-01-2025"  ,status:"status"},
            { name:"rahulkumar", email:"pft@gmail.com",phonenumber:"9876543210",price:"8000",course:"Web Dev",registration:"01-04-2025",due:"01-01-2025" ,status:"status"},
            { name:"rahulkumar", email:"pft@gmail.com",phonenumber:"9876543210",price:"8000",course:"Web Dev",registration:"01-04-2025",due:"01-01-2025" ,status:"status"},
            { name:"rahulkumar", email:"pft@gmail.com",phonenumber:"9876543210",price:"8000",course:"Web Dev",registration:"01-04-2025",due:"01-01-2025",status:"status"},
         
            
        ]
        const columns=[
                 {id:"name", header:"Student Name"},
                 {id:"email", header:"Email ID"},
                 {id:"phonenumber", header:"Contact Number"},
                 {id:"price", header:"Price Pitched"},
                 {id:"course", header:"Course Opted"},
                 {id:"registration", header:"Registration Date"},
                 {id:"due", header:"Due Date"},
                 {id:"status", header:"Payment Status",cell:(row)=>(
                <>
                <div className='border-2 rounded border-blue-700 p-2'>
                <select className='w-50  '>
                    <option value="status">Status</option>
                    <option value="Paid">Paid</option>
                    <option value="Not Paid">Not Paid</option>
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

export default StudentsInfo
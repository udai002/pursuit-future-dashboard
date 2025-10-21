import React from 'react'
import Table from '../../components/table'
import CustomSelect from '../../components/button/CustomSelect';
// const data=()=>{
//   const [month, setMonth] = useState('August');
//   const [team, setTeam] = useState('Team Name');
//   const [member, setMember] = useState('Member');

// }


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
                <div className='border-2 rounded-xl border-blue-700 p-2'>
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
   <div className="mt-6 px-6">
    {/* title -leadinfo */}
    <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-sans">Leads Info</h2>
        {/* Month dropdown */}
        <div className="flex gap-3 ">
                <CustomSelect title="Month" 
                options={["January","February","March","April","May","June","July","August","September","October","November","December"]} />
        
           
            {/* team name dropdown */}

             <CustomSelect title="Team Name" 
                options={["Team A","Team B","Team C","Team D"]} />

            {/* member dropdown */}


            <CustomSelect title="Team Member" 
                options={["Member 1","Member 2","Member 3","Member 4"]} />

        </div>


   </div>
   {/* table */}
   <div className='mt-[0.5%]'>
    <Table columns={columns} data={data}/>
    </div>
    </div>
   </>
  )
}

export default SalesLeadsInfo
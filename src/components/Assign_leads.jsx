import React, { useState } from "react";
import { FaFileCsv } from "react-icons/fa6";

export default function Assign_leads() {

    const [file , setFile]=useState('');

    function handleFile(e)
    {
        console.log("this is my file from asign leads ",e.target.files)
        setFile(e.target.files[0])
    }


  return (
    <div className="p-2 m-6 w-96  border-[#004AAD]   h-auto rounded-md border items-center cursor-pointer">
      <h1>Assign Leads to Members</h1>
      <div className="flex justify-between">

        <div>
           <div>
             <select name="leavstatus" className="border-2 rounded-lg p-1 ">
          <option value="">Lead Type</option>
        </select>

        </div>
      </div>
      <div className="flex gap-2 border-[#004AAD] rounded-md border-2 bg-[#004AAD] items-center cursor-pointenr text-white p-1" onClick={handleFile}>
        <h1>Import CSV File</h1>
        <FaFileCsv />
        <input type="file" name="file" className="hidden" onChange={handleFile}/>
     
                      {/* <div className=""> */}
                       
                        {/* <MdUploadFile className="size-8" /> */}
                      </div>
                      {/* <span className="">
                        Import CSV
                      </span> */}
                       {/* <FaFileCsv /> */}
                      {/* <input
                        type="file"
                        onChange={handleFile}
                        name="imageUrl"
                        className="hidden"
                      /> */}
                  
      {/* </div> */}
      </div>
      <div className="flex  justify-between mt-2">
        <div>
             <select name="leavstatus" className="border-2 rounded-lg p-1 ">
          <option value="">Member Name</option>
        </select>

        </div>
<div className="flex gap-2 border-[#004AAD] rounded-md border-2 bg-[#004AAD] items-center cursor-pointenr text-white p-1">
        <h1>Assign</h1>      
      </div>       
      </div>
    </div>
  );
}




                    // <label className="">
                    //   <div className="">
                    //     <FaFileCsv />
                    //     {/* <MdUploadFile className="size-8" /> */}
                    //   </div>
                    //   <span className="">
                    //     Upload Prescription
                    //   </span>
                    //   <input
                    //     type="file"
                    //     onChange={handleFileChange}
                    //     name="imageUrl"
                    //     className="hidden"
                    //   />
                    // </label>






//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     setData((prev) => ({
//       ...prev,
//       imageUrl: file
//     }));
//   };
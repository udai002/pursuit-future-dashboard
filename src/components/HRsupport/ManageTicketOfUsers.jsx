import React, { useRef } from "react";
import uploadProfile from "../../assets/Teaminfo/uploadProfile.png";
export default function ManageTicketOfUsers() {
    let upload=useRef()
    const handleSubmit=()=>{
        upload.current.click()
    }
  return (
    <div className=" w-[470px] h-[260px]  flex justify-center items-center ">
      <div className="  rounded-2xl flex flex-col gap-2  ]">
        <div className=" flex justify-between">
          <h1 className="color-[#444444] text-[20px] font-semibold">Manage Ticket</h1>
        
        </div>
        <div className=" flex gap-2">
          <input
            className="border-2 border-[#004AAD] rounded-xl w-[300px] h-[47px] placeholder:text-[17px] p-2"
            type="text"
            name=""
            id=""
            placeholder="Ticket Subject"
          />
          <input
            className="border-2 border-[#004AAD] rounded-xl w-[160px] h-[47px] placeholder:text-xl p-2"
            type="date"
            name=""
            id=""
            placeholder="Resolved Date"
          /> 
          {/* <DatePicker  label="Resolve Date" ></DatePicker> */}
          {/* <DatePickerComponent placeholder="Enter"></DatePickerComponent> */}
                </div>
        <div className=" flex gap-3 ">
          <div className="  ">
            <textarea
              className="border-2 border-[#004AAD] w-[206px] h-[125px] rounded-2xl placeholder:text-[17px] p-3"
              name=""
              id=""
              placeholder="Description"
            ></textarea>
          </div>
          <div className=" flex flex-col justify-center items-center border-2 border-[#004AAD] w-[250px] h-[125px]  rounded-xl">
            <input type="file" name="" id="" hidden ref={upload}/>
            <div className="flex flex-col justify-center items-center " onClick={handleSubmit}>
                <div className=" flex justify-center align-center">
                <img src={uploadProfile} alt="" className=" w-8 h-8" />
              </div>
              <p className="#444444 text-[16px] text-[#004AAD]">Upload Photo/File</p>
              
              <p className="text-[#444444] font-normal text-center">Supported format <br /> png,jpg,or pdf</p>
            </div>
          </div>
        </div>
        <div className=" flex justify-between mb-4">
            <button className="border-2 border-[#004AAD] px-2 py-2 text-[15px] text-[#004AAD] rounded-xl"> Reset Form</button>
            <button className="border-2 border-[#004AAD] px-2 py-2 text-[15px] text-white bg-[#004AAD] rounded-xl"> Submit</button>
        </div>
      </div>
    </div>
  );
}

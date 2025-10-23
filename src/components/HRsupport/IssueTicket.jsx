import React, { useRef } from "react";
import uploadProfile from "../../assets/Teaminfo/uploadProfile.png";
const IssueTicket = () => {
  let upload = useRef();
  const handleSubmit = () => {
    upload.current.click();
  };
  return (
    <div className=" flex justify-center  w-[450px] h-[390px]">
      <div className="p-1 rounded-2xl flex flex-col gap-2 ">
        <div className="  flex justify-between">
          <h1 className="color-[#444444] text-[20px]">Raise a Issue Ticket</h1>
        </div>
        <div className=" flex gap-2 ">
          <select className="border-2 border-[#004AAD] rounded-xl  w-[200px] h-[45px] text-[#004AAD]">
            <option value="" className="">
              Select Department
            </option>
            
          </select>
          <select className="border-2 border-[#004AAD] rounded-xl w-[235px] h-[45px]   text-[16px] p-2  text-[#004AAD]">
            <option value="">Issue Type</option>
            
          </select>
        </div>
        <div className=" flex gap-2 ">
          <input
            className="border-2 border-[#004AAD] rounded-xl  placeholder:text-[16px] p-3 w-[280px] h-[45px]"
            type="text"
            name=""
            id=""
            placeholder="Ticket Subject"
          />
          <input
            className="border-2 border-[#004AAD] rounded-xl  placeholder:text-[16px] p-3 w-[155px] h-[45px]"
            type="date"
            name=""
            id=""
            placeholder="Resolved Date"
          />
        </div>
        <div className="  flex gap-3">
          <div className=" ">
            <textarea
              className="border-2 border-[#004AAD] rounded-2xl  h-[190px] placeholder:text-[16px] p-3 "
              name=""
              id=""
              placeholder="Description"
            ></textarea>
          </div>
          <div className="  flex flex-col gap-2">
            <div className=" ">
                <select className="border-2 border-[#004AAD] w-[240px] h-[45px] rounded-xl   text-[16px] p-1  text-[#004AAD]">
            <option value="">Priority</option>
            
          </select>
            </div>
            <div className=" flex flex-col justify-center items-center border-2 border-[#004AAD]  w-[240px] h-[140px]  p-2  rounded-xl">
              <input type="file" name="" id="" hidden ref={upload} />
              <div
                className="flex flex-col justify-center items-center  "
                onClick={handleSubmit}
              >
                <div className=" flex justify-center align-center">
                  <img src={uploadProfile} alt="" className=" w-8 h-8" />
                </div>
                <p className="#444444 text-[16px] text-[#004AAD]">
                  Upload Photo/File
                </p>

                <p className="text-[#444444] font-normal text-center">
                  Supported format <br /> png,jpg,or pdf
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className=" flex justify-between">
          <button className="border-2 border-[#004AAD] p-2 text-[16px] text-[#004AAD] rounded-xl">
      
            Reset Form
          </button>
          <button className="border-2 border-[#004AAD] p-2 text-[16px] text-white bg-[#004AAD] rounded-xl">
    
           Create Ticket
          </button>
        </div>
      </div>
    </div>
  );
};

export default IssueTicket;

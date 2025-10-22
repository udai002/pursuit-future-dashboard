import React, { useRef } from "react";
import uploadProfile from "../../assets/Teaminfo/uploadProfile.png";
import cross from "../../assets/cross.png";
const IssueTicket = () => {
  let upload = useRef();
  const handleSubmit = () => {
    upload.current.click();
  };
  return (
    <div className=" w-[95%] flex justify-center items-center h-[80vh]">
      <div className="border-2 border-[#004AAD] w-[80%]  py-7 px-7 rounded-2xl flex flex-col gap-4 ]">
        <div className=" p-4 flex justify-between">
          <h1 className="color-[#444444] text-4xl">Raise a Issue Ticket</h1>
          <img src={cross} alt="" />
        </div>
        <div className=" flex gap-3 ">
          <select className="border-2 border-[#004AAD] rounded-2xl w-1/2 text-xl px-2 py-3 text-[#004AAD]">
            <option value="" className="">
              Select Department
            </option>
            
          </select>
          <select className="border-2 border-[#004AAD] rounded-2xl w-1/2 text-xl px-2 py-3 text-[#004AAD]">
            <option value="">Issue Type</option>
            
          </select>
        </div>
        <div className=" flex gap-3 ">
          <input
            className="border-2 border-[#004AAD] rounded-xl w-4/5 placeholder:text-xl p-3"
            type="text"
            name=""
            id=""
            placeholder="Ticket Subject"
          />
          <input
            className="border-2 border-[#004AAD] rounded-xl w-2/5 placeholder:text-xl p-3"
            type="date"
            name=""
            id=""
            placeholder="Resolved Date"
          />
        </div>
        <div className=" flex gap-3">
          <div className=" w-1/2 ">
            <textarea
              className="border-2 border-[#004AAD] w-full rounded-2xl placeholder:text-xl p-3 h-full"
              name=""
              id=""
              placeholder="Description"
            ></textarea>
          </div>
          <div className=" w-1/2 flex flex-col gap-2">
            <div className=" w-full">
                <select className="border-2 border-[#004AAD] rounded-2xl w-full text-xl px-2 py-3 text-[#004AAD]">
            <option value="">Priority</option>
            
          </select>
            </div>
            <div className=" flex flex-col justify-center items-center h-full border-2 border-[#004AAD]  p-4 w-full rounded-xl">
              <input type="file" name="" id="" hidden ref={upload} />
              <div
                className="flex flex-col justify-center items-center w-full "
                onClick={handleSubmit}
              >
                <div className=" flex justify-center align-center">
                  <img src={uploadProfile} alt="" className=" w-10 h-10" />
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
          <button className="border-2 border-[#004AAD] px-6 py-3 text-2xl text-[#004AAD] rounded-2xl">
            {" "}
            Reset Form
          </button>
          <button className="border-2 border-[#004AAD] px-6 py-3 text-2xl text-white bg-[#004AAD] rounded-2xl">
            {" "}
           Create Ticket
          </button>
        </div>
      </div>
    </div>
  );
};

export default IssueTicket;

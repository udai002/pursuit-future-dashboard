import React, { useState } from "react";
import { MdCircle } from "react-icons/md";
import { RxCrossCircled } from "react-icons/rx";
import ManageTicketOfUsers from "./ManageTicketOfUsers";

export default function Ticketcomponent({
  year,
  reason,
  Type,
  RaisedBy,
  DateTime,
  Status,
  Priority,
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <>
      <div className="h-[134px] w-[520px] border-2 border-[#a2c1ea7c] rounded-xl p-2">
        <div className="">
          <h1 className="p-[0.5px]  text-[15px] font-semibold flex">
            {Priority === "medium" ? (
              <h1 className="text-[#ff7800] flex">
                <MdCircle className=" mt-1" />
                {year}
              </h1>
            ) : Priority === "low" ? (
              <h1 className="text-[#B50000] flex">
                <MdCircle className=" mt-1" />
                {year}
              </h1>
            ) : (
              <h1 className="text-[#8A38F5] flex">
                <MdCircle className=" mt-1" />
                {year}
              </h1>
            )}

            <span className="font-DM text-[#666666]  Sans ml-3  ">
              {reason}
            </span>
          </h1>
        </div>
        <div className="flex gap-3">
          <h1 className="p-[0.5px] text-[#666666] text-[15px] font-semibold">
            Type:{" "}
            <span className="font-DM text-[#444444] p-1 Sans">{Type}</span>
          </h1>
          <h1 className="p-[0.5px] text-[#666666] text-[15px] font-semibold">
            Raised by:{" "}
            <spam className="font-DM text-[#444444] p-1 Sans ">{RaisedBy}</spam>
          </h1>
        </div>
        <h1 className="p-[0.5px] text-[#666666] text-[15px] font-semibold">
          Priority:
          <spam className="font-DM text-[#444444] p-1 Sans ">{Priority}</spam>
        </h1>
        <div className="flex justify-between">
          <div className="flex-col">
            <h1 className="p-[0.5px] text-[#666666] text-[15px] font-semibold">
              Date & Time:
              <span className="font-DM text-[#444444] p-1 Sans ">
                {DateTime}
              </span>
            </h1>
            <h1 className="p-[0.5px] text-[#666666] text-[15px] font-semibold">
              Status:
              <span className="font-DM text-[#444444] p-1 Sans ">{Status}</span>
            </h1>
          </div>

          <h1
            className=" border-[1.5px] border-[#00499a] text-white bg-[#00499d] w-[130px] h-17px rounded-xl m-1 mb-2 text-center p-1 text-[15px]"
            onClick={() => setIsModalOpen(true)}
          >
            Manage Ticket
          </h1>
        </div>
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 z-40 flex items-center justify-center shadow-lg bg-black bg-opacity-50">
          <div className=" bg-white  max-w-6xl p-4 rounded-lg relative shadow-lg max-h-[90vh]">
            <RxCrossCircled
              onClick={() => setIsModalOpen(false)}
              className=" text-[#00499d] absolute top-2 right-4  text-[24px] font-bold"
            />
            <ManageTicketOfUsers />
          </div>
        </div>
      )}
    </>
  );
}

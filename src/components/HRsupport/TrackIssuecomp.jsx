import React, { useState } from "react";
import { MdCircle } from "react-icons/md";


export default function TrackIssuecomp({
  year,
  reason,
  Category,
  AssignedTeam,
  Priority,
  DateTime,
  Status,
}) {
  
  return (
    <>
      <div className="h-[134px] w-[520px] border-2 border-[#a2c1ea7c] rounded-xl p-2">
        <div>
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
              Category:{" "}
              <span className="font-DM text-[#444444] p-1 Sans">
                {Category}
              </span>
            </h1>
            <h1 className="p-[0.5px] text-[#666666] text-[15px] font-semibold">
              Assigned to:{" "}
              <spam className="font-DM text-[#444444] p-1 Sans ">
                {AssignedTeam}
              </spam>
            </h1>
            <h1 className="p-[0.5px] text-[#666666] text-[15px] font-semibold">
              Priority:
              <spam className="font-DM text-[#444444] p-1 Sans ">
                {Priority}
              </spam>
            </h1>
          </div>
          <div className="flex justify-between">
            <div className="flex">
              <h1 className="p-[0.5px] text-[#666666] text-[15px] font-semibold">
                Last Updated:
                <span className="font-DM text-[#444444] p-1 Sans ">
                  {DateTime}
                </span>
              </h1>
              <h1 className="p-[0.5px] text-[#666666] text-[15px] font-semibold">
                Status:
                <span className="font-DM text-[#444444] p-1 Sans ">
                  {Status}
                </span>
              </h1>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
